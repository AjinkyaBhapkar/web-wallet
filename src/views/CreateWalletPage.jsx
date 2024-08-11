"use client";

import { useEffect, useState } from "react";
import { CreateWallet } from "@/components/createWallet/CreateWallet";
import CreateAccount from "@/components/createAccount/CreateAccount";
export default function CreateWalletPage() {
  const [phrase, setPhrase] = useState([]);
  const [showAccounts, setShowAccounts] = useState(false);
  useEffect(() => {
    console.log(phrase);
    console.log(phrase[10]);
  }, [phrase]);
  return (
    <>
      {showAccounts ? (
        <CreateAccount phrase={phrase} />
      ) : (
        <CreateWallet setPhrase={setPhrase} setShowAccounts={setShowAccounts} />
      )}
    </>
  );
}
