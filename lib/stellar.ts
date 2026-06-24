import { SorobanRpc, TransactionBuilder, Networks, BASE_FEE, StrKey } from "@stellar/stellar-sdk";
export { ValidationError } from "./errors";

const RPC_URL = process.env.NEXT_PUBLIC_SOROBAN_RPC!;
const NETWORK = process.env.NEXT_PUBLIC_NETWORK === "mainnet" ? Networks.PUBLIC : Networks.TESTNET;

export const rpc = new SorobanRpc.Server(RPC_URL, { allowHttp: false });

export function isValidStellarAddress(key: string): boolean {
  return StrKey.isValidEd25519PublicKey(key);
}

export { NETWORK, BASE_FEE, TransactionBuilder };
