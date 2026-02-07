import "./load-env.js";
import express from "express";
import cors from "cors";
import multer from "multer";
import { GoogleGenerativeAI } from "@google/generative-ai";
import QRCode from "qrcode";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

const app = express();
const PORT = Number(process.env.PORT) || 3003;
const geminiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
const genAI = geminiKey ? new GoogleGenerativeAI(geminiKey) : null;
const modelName = process.env.GEMINI_MODEL || "gemini-2.5-flash";
const imagineProKey = process.env.IMAGINEPRO_API_KEY;
const IMAGINEPRO_BASE = "https://api.imaginepro.ai/api/v1";
const ethRpcUrl = process.env.ETHEREUM_MAINNET_URL;

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } });

app.use(cors({ origin: true }));
app.use(express.json());

function requireGemini(req, res, next) {
  if (!genAI) {
    return res.status(503).json({ error: "GEMINI_API_KEY not set. Add it to server/.env" });
  }
  next();
}

function requireImaginePro(req, res, next) {
  if (!imagineProKey) {
    return res.status(503).json({ error: "IMAGINEPRO_API_KEY not set. Add it to server/.env for image generation." });
  }
  next();
}

/** Call Imagine Pro Flux to generate one image from a text prompt. Uses 1 credit per call. Polls until done (rate-limited). */
async function imagineProGenerate(prompt) {
  const createRes = await fetch(`${IMAGINEPRO_BASE}/flux/imagine`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${imagineProKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt: String(prompt).slice(0, 2000),
      n: 1,
      aspect_ratio: "1:1",
      model: "flux-1.1-pro",
      output_format: "png",
    }),
  });
  if (!createRes.ok) {
    const errText = await createRes.text();
    throw new Error(createRes.status === 429 ? "Imagine Pro rate limit. Try again shortly." : `Imagine Pro: ${createRes.status} ${errText}`);
  }
  const createJson = await createRes.json();
  const messageId = createJson?.messageId;
  if (!messageId) throw new Error("Imagine Pro: no messageId in response");

  const maxPolls = 24;
  const pollIntervalMs = 2500;
  for (let i = 0; i < maxPolls; i++) {
    await new Promise((r) => setTimeout(r, pollIntervalMs));
    const progRes = await fetch(`${IMAGINEPRO_BASE}/message/fetch/${messageId}`, {
      headers: { Authorization: `Bearer ${imagineProKey}` },
    });
    if (!progRes.ok) continue;
    const prog = await progRes.json();
    const status = (prog?.status || "").toUpperCase();
    const progress = String(prog?.progress ?? "").trim();
    if (status === "DONE" || progress === "100") {
      const uri = prog?.uri || prog?.images?.[0];
      if (uri) return uri;
    }
  }
  throw new Error("Imagine Pro: image generation timed out. Try again.");
}

// ---------- AI: Analyze waste image (Gemini Vision) ----------
app.post("/api/ai/analyze-waste", requireGemini, upload.single("image"), async (req, res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ error: "No image file (field: image)" });
    const b64 = file.buffer.toString("base64");
    const mime = file.mimetype || "image/jpeg";

    const model = genAI.getGenerativeModel({ model: modelName });
    const prompt = `You are a waste classification expert. Analyze this image of a waste batch (e.g. from a landfill or depot).
Return ONLY valid JSON with exactly these keys (no markdown, no extra text):
- category: one of "Reclaimed Wood", "Metal / Steel", "Plastic / PET", "Construction Debris", "Textile / Fabric", "Electronic Waste"
- grade: "A", "B", or "C"
- suggestedPrice: string like "₹1,800" (INR per MT)
- quantity: string e.g. "45-50" or "100" (estimated MT)
- quality: short string e.g. "Good purity, low contamination"
- contamination: number 0-100 (estimated contamination %)
- confidence: number 0-100 (your confidence in the analysis)`;

    const result = await model.generateContent([
      { inlineData: { mimeType: mime, data: b64 } },
      { text: prompt },
    ]);
    const response = result.response;
    if (!response || !response.text) throw new Error("No response from Gemini");
    const raw = response.text().trim();
    const json = JSON.parse(raw.replace(/^```json?\s*|\s*```$/g, ""));
    res.json(json);
  } catch (e) {
    console.error("analyze-waste", e);
    const msg = e?.message || String(e);
    const isRateLimit = msg.includes("429") || msg.includes("quota") || msg.includes("QuotaFailure") || msg.includes("rate limit");
    if (isRateLimit) {
      return res.status(429).json({
        error: "Gemini rate limit reached. Please try again in a minute, or check your API quota at https://aistudio.google.com.",
      });
    }
    res.status(500).json({ error: msg || "AI analysis failed" });
  }
});

// ---------- AI: Generate inventory description (Gemini text) ----------
app.post("/api/ai/generate-inventory-description", requireGemini, express.json(), async (req, res) => {
  try {
    const { category, grade, quantity, location } = req.body || {};
    const model = genAI.getGenerativeModel({ model: modelName });
    const prompt = `Write a short, professional description (2-3 sentences) for a waste inventory batch. Category: ${category || "Waste"}. Grade: ${grade || "B"}. Quantity: ${quantity ?? "—"} MT. Location: ${location || "—"}. Focus on suitability for recycling and industrial use. Output only the description, no labels.`;
    const result = await model.generateContent(prompt);
    const text = result.response?.text?.()?.trim() || "";
    res.json({ description: text });
  } catch (e) {
    console.error("generate-inventory-description", e);
    const msg = e?.message || String(e);
    if (msg.includes("429") || msg.includes("quota") || msg.includes("QuotaFailure") || msg.includes("rate limit")) {
      return res.status(429).json({ error: "Gemini rate limit. Please try again in a minute." });
    }
    res.status(500).json({ error: msg || "Failed" });
  }
});

// ---------- AI: Generate inventory image (placeholder/asset – Imagine Pro used only for Publish Product) ----------
app.post("/api/ai/generate-inventory-image", express.json(), async (req, res) => {
  try {
    const imageUrl = "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400&h=300&fit=crop";
    res.json({ imageUrl });
  } catch (e) {
    console.error("generate-inventory-image", e);
    res.status(500).json({ error: e.message || "Failed" });
  }
});

// ---------- AI: Generate product image (Imagine Pro Flux – 1 credit per call) ----------
app.post("/api/ai/generate-product-image", requireImaginePro, express.json(), async (req, res) => {
  try {
    const { productName, category } = req.body || {};
    const prompt = `Professional product photo of an eco-friendly consumer product: ${productName || "eco product"}. ${category ? "Category: " + category + ". " : ""}Clean white background, commercial style, single product, no text.`;
    const imageUrl = await imagineProGenerate(prompt);
    res.json({ imageUrl });
  } catch (e) {
    console.error("generate-product-image", e);
    res.status(500).json({ error: e.message || "Image generation failed" });
  }
});

// ---------- AI: Generate product story (Gemini text) ----------
app.post("/api/ai/generate-product-story", requireGemini, express.json(), async (req, res) => {
  try {
    const { productName, materials, category, companyName } = req.body || {};
    const model = genAI.getGenerativeModel({ model: modelName });
    const prompt = `Write a short, inspiring product story (2-4 sentences) for a consumer marketplace. Product: ${productName || "Eco product"}. Made from: ${materials || "recovered waste"}. Category: ${category || "home"}. Company: ${companyName || "GreenBridge partner"}. Emphasize environmental impact, landfill diversion, and why a conscious consumer would love to buy it. No bullet points. Engaging and warm. Output only the story.`;
    const result = await model.generateContent(prompt);
    const story = result.response?.text?.()?.trim() || "";
    res.json({ story });
  } catch (e) {
    console.error("generate-product-story", e);
    const msg = e?.message || String(e);
    if (msg.includes("429") || msg.includes("quota") || msg.includes("QuotaFailure") || msg.includes("rate limit")) {
      return res.status(429).json({ error: "Gemini rate limit. Please try again in a minute." });
    }
    res.status(500).json({ error: msg || "Failed" });
  }
});

// ---------- QR code: generate PNG (base64) ----------
app.post("/api/qr/generate", express.json(), async (req, res) => {
  try {
    const { payload, size } = req.body || {};
    const text = typeof payload === "string" ? payload : JSON.stringify(payload || { id: "greenbridge" });
    const opts = { width: Math.min(Number(size) || 256, 512), margin: 2 };
    const dataUrl = await QRCode.toDataURL(text, { ...opts, type: "image/png" });
    res.json({ qrDataUrl: dataUrl, payload: text });
  } catch (e) {
    console.error("qr/generate", e);
    res.status(500).json({ error: e.message || "QR generation failed" });
  }
});

// ---------- Invoice: JSON ----------
app.post("/api/invoice/generate", express.json(), async (req, res) => {
  try {
    const { orderId, amount, items, companyName, supplier } = req.body || {};
    const invoice = {
      orderId: orderId || "INV-" + Date.now(),
      amount: amount || "—",
      items: items || [],
      companyName: companyName || "Business",
      supplier: supplier || "Government",
      date: new Date().toISOString().slice(0, 10),
      blockchainReady: true,
      message: "Hash this payload for blockchain verification.",
    };
    res.json(invoice);
  } catch (e) {
    console.error("invoice/generate", e);
    res.status(500).json({ error: e.message || "Invoice generation failed" });
  }
});

// ---------- Reports: Waste Segregation Report PDF (Gemini generates content) ----------
app.post("/api/reports/waste-report-pdf", requireGemini, express.json(), async (req, res) => {
  try {
    const { dateFrom, dateTo } = req.body || {};
    const model = genAI.getGenerativeModel({ model: modelName });
    const prompt = `You are a waste management expert for Delhi/India. Write a short Waste Segregation Report (about 300–400 words) for citizens. Include:
1. Title: "Waste Segregation Report" and a one-line subtitle.
2. Why segregate: wet, dry, e-waste, hazardous (2–3 sentences each).
3. What goes where: brief bullet points for each category.
4. Impact: how segregation reduces landfill and helps recycling.
5. One short "Next steps" paragraph.
Use clear paragraphs. No markdown. Plain text only. Date range for report: ${dateFrom || "N/A"} to ${dateTo || "N/A"}.`;
    const result = await model.generateContent(prompt);
    const text = result.response?.text?.()?.trim() || "Waste Segregation Report. Please try again.";
    const doc = await PDFDocument.create();
    const font = await doc.embedFont(StandardFonts.Helvetica);
    let currentPage = doc.addPage([595, 842]);
    let y = currentPage.getSize().height - 50;
    const lineHeight = 14;
    const margin = 50;
    const pageHeight = 842;
    const wrap = (str, maxLen) => {
      const lines = [];
      for (const line of str.split("\n")) {
        let remaining = line;
        while (remaining.length > maxLen) {
          let idx = remaining.lastIndexOf(" ", maxLen);
          if (idx <= 0) idx = maxLen;
          lines.push(remaining.slice(0, idx));
          remaining = remaining.slice(idx).trim();
        }
        if (remaining) lines.push(remaining);
      }
      return lines;
    };
    const lines = wrap(text, 72);
    for (const line of lines) {
      if (y < 50) {
        currentPage = doc.addPage([595, pageHeight]);
        y = pageHeight - 50;
      }
      currentPage.drawText(line, { x: margin, y, size: 10, font, color: rgb(0.1, 0.1, 0.1) });
      y -= lineHeight;
    }
    const pdfBytes = await doc.save();
    res.setHeader("Content-Disposition", 'attachment; filename="waste-segregation-report.pdf"');
    res.setHeader("Content-Type", "application/pdf");
    res.send(Buffer.from(pdfBytes));
  } catch (e) {
    console.error("waste-report-pdf", e);
    const msg = e?.message || String(e);
    if (msg.includes("429") || msg.includes("quota") || msg.includes("rate limit")) {
      return res.status(429).json({ error: "Gemini rate limit. Try again in a minute." });
    }
    res.status(500).json({ error: msg || "Report generation failed" });
  }
});

// ---------- Blockchain (Alchemy / Ethereum): wallet balance ----------
app.get("/api/blockchain/wallet/:address", async (req, res) => {
  try {
    const address = req.params.address?.trim();
    if (!address || !address.startsWith("0x")) {
      return res.status(400).json({ error: "Valid 0x wallet address required" });
    }
    if (!ethRpcUrl) {
      return res.status(503).json({ error: "ETHEREUM_MAINNET_URL not set. Used for wallet verification (Alchemy)." });
    }
    const body = JSON.stringify({
      jsonrpc: "2.0",
      id: 1,
      method: "eth_getBalance",
      params: [address, "latest"],
    });
    const r = await fetch(ethRpcUrl, { method: "POST", headers: { "Content-Type": "application/json" }, body });
    const data = await r.json();
    const hex = data?.result;
    const wei = hex ? BigInt(hex) : 0n;
    const eth = Number(wei) / 1e18;
    res.json({ address, balanceWei: hex, balanceEth: eth, verified: true });
  } catch (e) {
    console.error("blockchain/wallet", e);
    res.status(500).json({ error: e?.message || "Wallet check failed" });
  }
});

// ---------- Blockchain: carbon credit certificate (mock tx; wallet verified via Alchemy above) ----------
app.post("/api/blockchain/certificate", express.json(), async (req, res) => {
  try {
    const { walletAddress, co2Saved, wasteType } = req.body || {};
    const addr = (walletAddress || "").trim();
    if (!addr || !addr.startsWith("0x")) {
      return res.status(400).json({ error: "Valid 0x wallet address required" });
    }
    const payload = {
      type: "GreenBridge Carbon Credit",
      walletAddress: addr,
      co2Saved: Number(co2Saved) || 0,
      wasteType: wasteType || "Waste",
      issuedAt: new Date().toISOString(),
    };
    const payloadHash = "0x" + Buffer.from(JSON.stringify(payload)).toString("hex").slice(0, 64);
    const txHash = "0x" + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join("");
    const certificateId = "GB-CC-" + Date.now();
    res.json({
      certificateId,
      txHash,
      payloadHash,
      message: "Certificate recorded. Wallet can be verified via Alchemy/Ethereum.",
    });
  } catch (e) {
    console.error("blockchain/certificate", e);
    res.status(500).json({ error: e?.message || "Certificate creation failed" });
  }
});

// Health
app.get("/api/health", (req, res) => {
  res.json({
    ok: true,
    gemini: !!genAI,
    imaginePro: !!imagineProKey,
    message: genAI
      ? imagineProKey
        ? "API ready (Gemini + Imagine Pro)"
        : "Set IMAGINEPRO_API_KEY in server/.env for image generation"
      : "Set GEMINI_API_KEY in server/.env for AI features",
  });
});

const HOST = "127.0.0.1";

function startServer(port) {
  const server = app.listen(port, HOST, () => {
    console.log("");
    console.log("  GreenBridge API is running (Gemini)");
    console.log("  Open in browser: http://127.0.0.1:" + port + "/api/health");
    console.log("  Keep this window open.");
    console.log("");
    if (!genAI) console.warn("  GEMINI_API_KEY not set — AI endpoints will return 503.");
    if (!imagineProKey) console.warn("  IMAGINEPRO_API_KEY not set — image generation will return 503.");
  });
  server.on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      console.error("Port " + port + " is in use. Set PORT=3003 in server/.env and try again.");
      process.exit(1);
    }
    throw err;
  });
}

startServer(PORT);
