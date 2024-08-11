import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { generateMnemonic, mnemonicToSeedSync } from "bip39";

export const CreateWallet = ({ setPhrase, setShowAccounts }) => {
  return (
    <div className="flex h-[100vh] justify-center items-center text-center">
      <Card>
        <CardContent className="flex flex-col py-10 items-center">
          <h2 className="text-sm sm:text-sm md:text-lg lg:text-xl xl:text-xl font-semibold text-center mt-2 mb-6">
            Create new wallet
          </h2>
          <Button
            size="md"
            className="w-[80%]"
            onClick={() => {
              const mnemonic = generateMnemonic();
              let phrase = mnemonic.trim().split(/\s+/);
              setPhrase(phrase);
              setShowAccounts(true);
            }}
          >
            Generate new phrase
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
