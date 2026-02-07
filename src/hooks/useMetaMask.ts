import { useState, useEffect, useCallback } from "react";
import {
  getMetaMaskProvider,
  requestAccounts,
  signMessage as walletSignMessage,
  formatAddress,
} from "@/lib/wallet";

export function useMetaMask() {
  const [account, setAccount] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const connect = useCallback(async (): Promise<string | null> => {
    setError(null);
    setIsConnecting(true);
    try {
      const provider = getMetaMaskProvider();
      if (!provider) {
        setError("MetaMask not installed. Install the extension and refresh.");
        return null;
      }
      const addr = await requestAccounts();
      setAccount(addr);
      return addr;
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Connection failed";
      setError(msg);
      return null;
    } finally {
      setIsConnecting(false);
    }
  }, []);

  const disconnect = useCallback(() => {
    setAccount(null);
    setError(null);
  }, []);

  const signMessage = useCallback(
    async (message: string): Promise<string> => {
      if (!account) throw new Error("Wallet not connected");
      return walletSignMessage(message, account);
    },
    [account]
  );

  // Listen for account changes (e.g. user switches account in MetaMask)
  useEffect(() => {
    const provider = getMetaMaskProvider();
    if (!provider?.on) return;

    const handleAccountsChanged = (accounts: unknown) => {
      const list = accounts as string[];
      setAccount(list?.[0] ?? null);
    };

    provider.on("accountsChanged", handleAccountsChanged);
  }, []);

  return {
    account,
    formattedAddress: account ? formatAddress(account) : null,
    isConnected: !!account,
    isConnecting,
    error,
    connect,
    disconnect,
    signMessage,
    hasProvider: !!getMetaMaskProvider(),
  };
}
