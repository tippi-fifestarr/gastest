# Aptos Gas Station Test

A minimal Next.js application to test sponsored transactions on Aptos using Gas Station with both Petra wallet and Google login.

## 🎯 Goal

Test if users can post messages to the blockchain **WITHOUT paying gas fees** using either:
- Petra wallet
- Google login (via Aptos Connect)

## 📋 Contract Details

- **Address**: `0x24051bca580d28e80a340a17f87c99def0cc0bde05f9f9d88e8eebdfad1cfb03`
- **Function**: `billboard::send_message(billboard_address: address, message: string)`
- **Network**: Aptos Testnet

## 🚀 Quick Start

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up Gas Station API Key**:
   - Go to [Aptos Build](https://build.aptoslabs.com)
   - Create an organization and project
   - Create a Gas Station application for testnet
   - Configure it to sponsor the `send_message` function
   - Add your API key to `.env.local`:
     ```
     NEXT_PUBLIC_APTOS_GAS_STATION_API_KEY=your_gas_station_api_key_here
     ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open [http://localhost:3000](http://localhost:3000)** in your browser

## 🧪 Testing Steps

1. **Connect Petra Wallet**:
   - Install Petra wallet extension
   - Switch to Aptos Testnet
   - Connect via the "Connect Wallet" button
   - Post a message (should cost 0 APT)

2. **Connect Google Login**:
   - Click "Connect Wallet" → Choose Google login option
   - Sign in with your Google account
   - Post a message (should cost 0 APT)

## ✅ Success Criteria

- [x] Petra wallet: Posts message with 0 APT gas fee ✅ **WORKING**
- [x] Google login: Posts message with 0 APT gas fee ✅ **WORKING**
- [x] Messages successfully stored on blockchain ✅ **WORKING**
- [x] Transaction hash links to Aptos Explorer ✅ **WORKING**

## 🔧 Features

- **Wallet Support**: Petra wallet and Google login via Aptos Connect
- **Sponsored Transactions**: Uses Aptos Gas Station for zero gas fees
- **Real-time Feedback**: Shows transaction status and links to explorer
- **Error Handling**: Clear error messages for troubleshooting

## 📁 Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with wallet provider
│   ├── page.tsx           # Main page with wallet selector and messaging
│   └── globals.css        # Global styles including wallet adapter CSS
├── components/
│   └── WalletProvider.tsx # Wallet adapter provider with Gas Station config
├── utils/
│   └── aptosClient.ts     # Aptos client with Gas Station integration
└── .env.local            # Environment variables (add your API keys)
```

## 🔍 Key Files

- `utils/aptosClient.ts`: Configures Aptos client with Gas Station transaction submitter
- `components/WalletProvider.tsx`: Sets up wallet adapter with testnet and sponsored transactions
- `app/page.tsx`: Main UI with wallet connection and message posting functionality

## 🐛 Troubleshooting

1. **No Gas Station API Key**: Check `.env.local` file and ensure the key is valid
2. **Wrong Network**: Ensure both wallet and dApp are on Aptos Testnet
3. **Transaction Fails**: Check that Gas Station is configured to sponsor `send_message` function
4. **Wallet Not Connecting**: Try refreshing page or reconnecting wallet

## 📚 Dependencies

- `@aptos-labs/wallet-adapter-react`: Wallet connection and transaction signing
- `@aptos-labs/wallet-adapter-ant-design`: Pre-built wallet selector UI
- `@aptos-labs/gas-station-client`: Gas Station integration for sponsored transactions
- `@aptos-labs/ts-sdk`: Core Aptos SDK for blockchain interaction