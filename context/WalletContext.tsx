"use client";
import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { TransactionBuilder } from "@stellar/stellar-sdk";
import { rpc, NETWORK } from "@/lib/stellar";
import { walletAdapters, type WalletProvider } from "@/lib/walletAdapters";

const STORAGE_KEY = "wallet_session";

interface WalletContextValue {
  publicKey: string | null;
  isAuthenticated: boolean;
  xlmBalance: string | null;
  walletProvider: WalletProvider | null;
  isConnecting: boolean;
  connect: () => Promise<void>;
  connectWithProvider: (provider: WalletProvider) => Promise<void>;
  disconnect: () => void;
  signAndSubmit: (xdr: string) => Promise<unknown>;
}

const WalletContext = createContext<WalletContextValue | null>(null);

async function sep10Auth(publicKey: string, signXdr: (xdr: string) => Promise<string>) {
  const challengeRes = await fetch(`/api/auth/sep10?account=${publicKey}`);
  if (!challengeRes.ok) throw new Error("SEP-10 challenge failed");
  const { transaction } = await challengeRes.json();

  const signed = await signXdr(transaction);

  const tokenRes = await fetch("/api/auth/sep10", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ transaction: signed }),
  });
  if (!tokenRes.ok) throw new Error("SEP-10 token exchange failed");
  return tokenRes.json();
}

export function WalletProvider({ children }: { children: ReactNode }) {
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [xlmBalance, setXlmBalance] = useState<string | null>(null);
  const [walletProvider, setWalletProvider] = useState<WalletProvider | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const { key, provider } = JSON.parse(saved);
        setPublicKey(key);
        setWalletProvider(provider);
        setIsAuthenticated(true);
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  const loadBalance = useCallback(async (key: string) => {
    try {
      const account = await rpc.getAccount(key);
      const native = (account.balances as { asset_type: string; balance: string }[])
        .find((b) => b.asset_type === "native");
      setXlmBalance(native?.balance ?? null);
    } catch {
      setXlmBalance(null);
    }
  }, []);

  const connectWithProvider = useCallback(async (provider: WalletProvider) => {
    setIsConnecting(true);
    try {
      const adapter = walletAdapters[provider];
      const key = await adapter.getPublicKey();

      await sep10Auth(key, (xdr) => adapter.signTransaction(xdr, NETWORK));

      setPublicKey(key);
      setWalletProvider(provider);
      setIsAuthenticated(true);
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ key, provider }));
      await loadBalance(key);
    } finally {
      setIsConnecting(false);
    }
  }, [loadBalance]);

  const connect = useCallback(() => connectWithProvider("freighter"), [connectWithProvider]);

  const disconnect = useCallback(() => {
    setPublicKey(null);
    setIsAuthenticated(false);
    setXlmBalance(null);
    setWalletProvider(null);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const signAndSubmit = useCallback(async (xdr: string) => {
    if (!publicKey || !walletProvider) throw new Error("Wallet not connected");
    const adapter = walletAdapters[walletProvider];
    const signed = await adapter.signTransaction(xdr, NETWORK);
    const tx = TransactionBuilder.fromXDR(signed, NETWORK);
    return rpc.sendTransaction(tx);
  }, [publicKey, walletProvider]);

  return (
    <WalletContext.Provider
      value={{
        publicKey,
        isAuthenticated,
        xlmBalance,
        walletProvider,
        isConnecting,
        connect,
        connectWithProvider,
        disconnect,
        signAndSubmit,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export function useWalletContext() {
  const ctx = useContext(WalletContext);
  if (!ctx) throw new Error("useWalletContext must be used inside WalletProvider");
  return ctx;
}
