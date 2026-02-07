/**
 * GreenBridge backend API client (AI, QR, Invoice).
 * Set VITE_API_URL in .env (e.g. http://127.0.0.1:3003). Run API: npm run api
 */

const BASE = (import.meta.env.VITE_API_URL as string) || "http://127.0.0.1:3003";

async function post<T>(path: string, body?: unknown, formData?: FormData): Promise<T> {
  const base = (BASE || "").replace(/\/$/, "");
  const url = base ? `${base}${path}` : "";
  if (!url) {
    throw new Error("VITE_API_URL not set. Add it to .env and run the API server (node server/index.js).");
  }
  const opts: RequestInit = {
    method: "POST",
    headers: formData ? {} : { "Content-Type": "application/json" },
    body: formData ?? (body != null ? JSON.stringify(body) : undefined),
  };
  let res: Response;
  try {
    res = await fetch(url, opts);
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    if (msg.includes("Failed") || msg.includes("fetch") || msg.includes("Network")) {
      throw new Error(`Cannot reach API server at ${base}. Is it running? Run: cd server && npm start`);
    }
    throw e;
  }
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error((err as { error?: string }).error || res.statusText);
  }
  return res.json() as Promise<T>;
}

export interface AnalyzeWasteResult {
  category: string;
  grade: string;
  suggestedPrice: string;
  quantity: string;
  quality: string;
  contamination: number;
  confidence: number;
}

export function analyzeWaste(imageFile: File): Promise<AnalyzeWasteResult> {
  const form = new FormData();
  form.append("image", imageFile);
  return post<AnalyzeWasteResult>("/api/ai/analyze-waste", undefined, form);
}

export function generateInventoryDescription(params: {
  category?: string;
  grade?: string;
  quantity?: number;
  location?: string;
}): Promise<{ description: string }> {
  return post("/api/ai/generate-inventory-description", params);
}

export function generateInventoryImage(params: {
  category?: string;
  description?: string;
}): Promise<{ imageUrl: string }> {
  return post("/api/ai/generate-inventory-image", params);
}

export function generateProductImage(params: {
  productName?: string;
  materials?: string;
  category?: string;
}): Promise<{ imageUrl: string }> {
  return post("/api/ai/generate-product-image", params);
}

export function generateProductStory(params: {
  productName?: string;
  materials?: string;
  category?: string;
  companyName?: string;
}): Promise<{ story: string }> {
  return post("/api/ai/generate-product-story", params);
}

export function generateQR(params: { payload: string | object; size?: number }): Promise<{ qrDataUrl: string; payload: string }> {
  return post("/api/qr/generate", params);
}

export interface InvoiceResult {
  orderId: string;
  amount: string;
  items: unknown[];
  companyName: string;
  supplier: string;
  date: string;
  blockchainReady: boolean;
  invoiceImageUrl?: string;
}

export function generateInvoice(params: {
  orderId?: string;
  amount?: string;
  items?: unknown[];
  companyName?: string;
  supplier?: string;
}): Promise<InvoiceResult> {
  return post<InvoiceResult>("/api/invoice/generate", params);
}

export async function healthCheck(): Promise<{ ok: boolean; openai: boolean }> {
  if (!BASE) return { ok: false, openai: false };
  const res = await fetch(`${BASE.replace(/\/$/, "")}/api/health`);
  const data = await res.json().catch(() => ({}));
  return { ok: res.ok, openai: !!(data as { openai?: boolean }).openai };
}

const baseUrl = () => (BASE || "").replace(/\/$/, "");

/** Waste Segregation Report PDF (Gemini-generated content). Returns blob for download. */
export async function generateWasteReportPdf(params: { dateFrom?: string; dateTo?: string }): Promise<Blob> {
  const url = baseUrl() + "/api/reports/waste-report-pdf";
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error((err as { error?: string }).error || "Report failed");
  }
  return res.blob();
}

/** Alchemy/Ethereum: get wallet balance (used in ROICalculator). */
export async function getWalletBalance(address: string): Promise<{ balanceEth: number; verified: boolean }> {
  const url = baseUrl() + "/api/blockchain/wallet/" + encodeURIComponent(address);
  const res = await fetch(url);
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error((err as { error?: string }).error || "Wallet check failed");
  }
  const data = await res.json();
  return { balanceEth: data.balanceEth ?? 0, verified: data.verified ?? false };
}

/** Carbon credit certificate (mock tx; wallet verified via Alchemy). */
export async function createCertificate(params: {
  walletAddress: string;
  co2Saved: number;
  wasteType?: string;
}): Promise<{ certificateId: string; txHash: string; message: string }> {
  return post("/api/blockchain/certificate", params);
}
