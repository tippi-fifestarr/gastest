import { Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk";
import { GasStationTransactionSubmitter } from "@aptos-labs/gas-station-client";

const network = Network.TESTNET;

export function aptosClient() {
  const gasStationApiKey = process.env.NEXT_PUBLIC_APTOS_GAS_STATION_API_KEY;

  if (!gasStationApiKey) {
    console.warn("Gas Station API key not found. Transactions will not be sponsored.");
    const config = new AptosConfig({ network });
    return new Aptos(config);
  }

  const gasStationTransactionSubmitter = new GasStationTransactionSubmitter({
    network,
    apiKey: gasStationApiKey,
  });

  const config = new AptosConfig({
    network,
    pluginSettings: {
      TRANSACTION_SUBMITTER: gasStationTransactionSubmitter,
    },
  });

  return new Aptos(config);
}

export const aptos = aptosClient();