"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
export const LandingPage = () => {
  const router = useRouter();
  return (
    <div className="text-center h-[100vh] ">
      <div className="h-full flex flex-col items-center justify-center ">
        <div>
          <p className="text-xs sm:text-xs md:text-sm lg:text-lg xl:text-xl mb-2">
            Welcome to
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold">
            Web Wallet
          </h1>
        </div>
        <Button
          className=" my-16  "
          onClick={() => router.push("/create-wallet")}
        >
          Create new wallet
        </Button>
      </div>
    </div>
  );
};
