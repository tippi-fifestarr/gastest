"use client";

import React, { useState } from "react";
import { useWallet, type InputTransactionData, WalletName } from "@aptos-labs/wallet-adapter-react";
import { aptos } from "@/utils/aptosClient";

const BILLBOARD_ADDRESS = "0x24051bca580d28e80a340a17f87c99def0cc0bde05f9f9d88e8eebdfad1cfb03";

export default function Home() {
  const { account, connected, signAndSubmitTransaction, connect, disconnect, wallets } = useWallet();
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [lastTxHash, setLastTxHash] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = async () => {
    if (!account || !connected) {
      setError("Please connect your wallet first");
      return;
    }

    if (!message.trim()) {
      setError("Please enter a message");
      return;
    }

    setIsLoading(true);
    setError(null);
    setLastTxHash(null);

    try {
      const transaction: InputTransactionData = {
        data: {
          function: `${BILLBOARD_ADDRESS}::billboard::send_message`,
          functionArguments: [BILLBOARD_ADDRESS, message],
        },
      };

      console.log("Submitting transaction:", transaction);
      const response = await signAndSubmitTransaction(transaction);
      console.log("Transaction submitted:", response);

      // Ensure response.hash is a string
      const txHash = typeof response.hash === 'string' ? response.hash : String(response.hash);

      await aptos.waitForTransaction({ transactionHash: txHash });
      console.log("Transaction confirmed:", txHash);

      setLastTxHash(txHash);
      setMessage("");
    } catch (error) {
      console.error("Transaction failed:", error);
      // Ensure error is always a string
      const errorMessage = error instanceof Error
        ? error.message
        : typeof error === 'string'
        ? error
        : JSON.stringify(error);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-2 text-gray-800">
          Aptos Gas Station Test
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Test sponsored transactions with Petra and Google wallets
        </p>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Wallet Connection
          </h2>
          <div className="flex flex-col items-center space-y-4">
            {/* Custom Wallet Selector */}
            {!connected ? (
              <div className="space-y-3">
                <button
                  onClick={disconnect}
                  className="mb-4 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Connect Wallet
                </button>

                <div className="grid gap-2 min-w-[200px]">
                  {wallets?.map((wallet) => (
                    <button
                      key={wallet.name}
                      onClick={() => connect(wallet.name)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                      disabled={!wallet.readyState}
                    >
                      Connect {wallet.name}
                    </button>
                  ))}
                </div>

                <div className="text-sm text-gray-500 text-center max-w-md">
                  <p className="mb-2">Available wallet options:</p>
                  <ul className="text-xs space-y-1">
                    <li>• <strong>Petra Wallet</strong> - Browser extension wallet</li>
                    <li>• <strong>Google Login</strong> - Via Aptos Connect</li>
                    <li>• Other supported Aptos wallets</li>
                  </ul>
                </div>
              </div>
            ) : (
              <button
                onClick={disconnect}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Disconnect
              </button>
            )}

            {connected && account && (
              <div className="text-sm text-gray-600 text-center">
                <p className="font-medium">Connected Account:</p>
                <p className="font-mono text-xs break-all">{String(account.address)}</p>
                <p className="text-green-600 font-medium">✓ Connected to Testnet</p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Post Message (Sponsored)
          </h2>

          <div className="space-y-4">
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Your Message
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter your message to post on the blockchain..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                rows={3}
                disabled={!connected || isLoading}
              />
            </div>

            <button
              onClick={sendMessage}
              disabled={!connected || isLoading || !message.trim()}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-md font-medium disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
            >
              {isLoading ? "Posting Message..." : "Post Message (0 APT Gas Fee)"}
            </button>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-md p-3">
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            {lastTxHash && (
              <div className="bg-green-50 border border-green-200 rounded-md p-3">
                <p className="text-green-700 text-sm font-medium">
                  ✅ Message posted successfully!
                </p>
                <p className="text-green-600 text-xs mt-1">
                  Transaction:
                  <a
                    href={`https://explorer.aptoslabs.com/txn/${lastTxHash}?network=testnet`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline ml-1 hover:text-green-800"
                  >
                    {lastTxHash}
                  </a>
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 bg-gray-50 rounded-lg p-4">
          <h3 className="font-semibold text-gray-800 mb-2">Test Requirements:</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>✓ Petra wallet support</li>
            <li>✓ Google login support (via Aptos Connect)</li>
            <li>✓ Sponsored transactions (0 APT gas fees)</li>
            <li>✓ Contract: <code className="bg-gray-200 px-1 rounded text-xs">billboard::send_message</code></li>
            <li>✓ Network: Aptos Testnet</li>
          </ul>
        </div>

        <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h3 className="font-semibold text-yellow-800 mb-2">⚠️ Wallet Connection Notes:</h3>
          <ul className="text-sm text-yellow-700 space-y-1">
            <li>• If you don't see Google login option, try installing Petra wallet first</li>
            <li>• Some wallet options appear only when compatible extensions are installed</li>
            <li>• Gas Station sponsorship may not work if function isn't configured properly</li>
            <li>• Check browser console for detailed error messages</li>
          </ul>
        </div>
      </div>
    </div>
  );
}