"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useWalletContext } from "@/context/WalletContext";

export function useRequireWallet() {
  const { isAuthenticated, isConnecting } = useWalletContext();
  const router = useRouter();

  useEffect(() => {
    if (!isConnecting && !isAuthenticated) {
      router.replace("/");
    }
  }, [isAuthenticated, isConnecting, router]);
}
