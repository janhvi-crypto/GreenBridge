/**
 * MetaMask / Web3 wallet helpers for consumer marketplace payments.
 * Uses window.ethereum (EIP-1193); no ethers/viem required.
 */

export type MetaMaskProvider = {
  request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
  on?: (event: string, handler: (...args: unknown[]) => void) => void;
};

declare global {
  interface Window {
    ethereum?: MetaMaskProvider;
  }
}

export function getMetaMaskProvider(): MetaMaskProvider | null {
  if (typeof window === "undefined") return null;
  return window.ethereum ?? null;
}

export function hasMetaMask(): boolean {
  return !!getMetaMaskProvider();
}

/** Request accounts (triggers MetaMask connect popup). Returns first account or null. */
export async function requestAccounts(): Promise<string | null> {
  const provider = getMetaMaskProvider();
  if (!provider) return null;
  const accounts = (await provider.request({ method: "eth_requestAccounts" })) as string[] | undefined;
  return accounts?.[0] ?? null;
}

/** Sign a UTF-8 message (personal_sign). Returns signature hex or throws. */
export async function signMessage(message: string, account: string): Promise<string> {
  const provider = getMetaMaskProvider();
  if (!provider) throw new Error("MetaMask not installed");
  const hexMessage = "0x" + Array.from(new TextEncoder().encode(message))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  const sig = await provider.request({
    method: "personal_sign",
    params: [hexMessage, account],
  });
  return sig as string;
}

/** Get current chain ID (e.g. "0x1" for mainnet). */
export async function getChainId(): Promise<string | null> {
  const provider = getMetaMaskProvider();
  if (!provider) return null;
  const id = (await provider.request({ method: "eth_chainId" })) as string | undefined;
  return id ?? null;
}

export function formatAddress(address: string, chars = 6): string {
  if (!address || address.length < chars * 2 + 2) return address;
  return `${address.slice(0, chars + 2)}...${address.slice(-chars)}`;
}
