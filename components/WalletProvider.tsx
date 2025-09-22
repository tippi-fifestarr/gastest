"use client";

import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react";
import { type PropsWithChildren } from "react";
import { Network } from "@aptos-labs/ts-sdk";
import { aptosClient } from "@/utils/aptosClient";

export const WalletProvider = ({ children }: PropsWithChildren) => {
  const aptos = aptosClient();

  return (
    <AptosWalletAdapterProvider
      autoConnect={true}
      dappConfig={{
        network: Network.TESTNET,
        transactionSubmitter: aptos.config.getTransactionSubmitter(),
        aptosApiKeys: {
          testnet: process.env.NEXT_PUBLIC_APTOS_API_KEY || undefined,
        },
      }}
      onError={(error) => {
        console.log("Wallet error:", error);
      }}
    >
      {children}
    </AptosWalletAdapterProvider>
  );
};