import type { Metadata } from "next";
import { WalletProvider } from "@/components/WalletProvider";
import GitHubCorner from "@/components/GitHubCorner";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aptos Gas Station Test",
  description: "Test sponsored transactions with Petra and Google wallets",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <WalletProvider>
          <GitHubCorner href="https://github.com/tippi-fifestarr/gastest" />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </WalletProvider>
      </body>
    </html>
  );
}