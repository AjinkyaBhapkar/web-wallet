import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CopyIcon } from "@radix-ui/react-icons";
import nacl from "tweetnacl";
import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
const CreateAccount = ({ phrase }) => {
  const [noOfAccounts, setNoOfAccounts] = useState(0);
  const [wallets, setWallets] = useState([]);
  const [copyText, setCopyText] = useState("Copy");
  const copyPhraseToClipboard = () => {
    const textToCopy = phrase.join(" ");
    navigator.clipboard.writeText(textToCopy);
    setCopyText("Copied!");
    setTimeout(() => {
      setCopyText("Copy");
    }, 1000);
  };

  const createWallet = () => {
    const mnemonic = phrase.join(" ");
    const seed = mnemonicToSeedSync(mnemonic);

    const path = `m/44'/501'/${noOfAccounts + 1}'/0'`; // This is the derivation path
    const derivedSeed = derivePath(path, seed.toString("hex")).key;
    const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;

    setWallets([
      ...wallets,
      Keypair.fromSecretKey(secret).publicKey.toBase58(),
    ]);
    setNoOfAccounts(noOfAccounts + 1);
  };
  return (
    <div className="flex min-h-[100vh] justify-center items-center text-center my-4 ">
      <Card>
        <CardContent className="flex flex-col py-10 items-center">
          <h2 className="text-sm sm:text-sm md:text-lg lg:text-xl xl:text-xl font-semibold text-center mt-2 mb-6">
            Generated Phrase
          </h2>
          {/* <p></p> */}
          <div className="grid grid-cols-3">
            {phrase.map((p, key) => {
              return (
                <span
                  className="text-start w-20 py-1 rounded m-2 bg-slate-700"
                  key={key}
                >
                  <span
                    className="mx-1 text-slate-500 font-extralight text-xs"
                    key={`key ${key}`}
                  >
                    {key + 1}
                  </span>
                  <span className="font-thin text-sm" key={`value ${key}`}>
                    {p}
                  </span>
                </span>
              );
            })}
          </div>
          <Button
            size="sm"
            className="my-4"
            onClick={() => copyPhraseToClipboard()}
          >
            <span className="pr-2">
              <CopyIcon />
            </span>{" "}
            {copyText}
          </Button>
          <Button size="md" className="my-5" onClick={() => createWallet()}>
            Create Wallet
          </Button>
          <div>
            {wallets.map((w, key) => {
              return (
                <div key={key}>
                  <p className="text-start mx-1 text-slate-500 font-extralight text-xs">
                    Address {key + 1}:
                  </p>
                  <p className="text-start  py-1  px-2 rounded m-2 bg-slate-700">
                    {w}
                  </p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateAccount;
