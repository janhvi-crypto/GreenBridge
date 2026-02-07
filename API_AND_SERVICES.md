# GreenBridge: Where We Use What (APIs & Services)

## Gemini API (Google AI Studio)

**Model:** `gemini-2.5-flash` (default; set `GEMINI_MODEL` in `server/.env` to match your [Usage and Limits](https://aistudio.google.com) – e.g. `gemini-2.5-flash-lite`, `gemini-3-flash-preview`).

| Use | Where |
|-----|--------|
| **Report & Export** | Government Dashboard → Reports & Export. "Waste Segregation Report" generates AI text and downloads as PDF. |
| **Download waste report** | Same endpoint: "Generate & Download" for Waste Segregation Report; also Consumer Marketplace → "Download Segregation Guide" (same PDF). |
| **Product description / story** | Publish Product: "Generate with AI" → **story/description only** (Gemini). |
| **Analysing image** | Inventory Management (Add → photo) and Matching Engine (AI Analyze Photo): waste type, grade, quantity, quality (Gemini Vision). |
| **Inventory description** | Government → Add inventory: AI-generated batch description (Gemini). |

---

## Imagine Pro API

**Used only for image generation in Publish Product.**

| Use | Where |
|-----|--------|
| **Product image** | Publish Product → "Generate with AI" → **image** (Imagine Pro Flux). |

Inventory batch images use a **placeholder/asset** (no Imagine Pro) to save credits. QR codes are generated **locally** (no API).

---

## Alchemy / Ethereum

**1–2 applications only.**

| Use | Where |
|-----|--------|
| **Wallet verification** | Optional: `GET /api/blockchain/wallet/:address` uses `ETHEREUM_MAINNET_URL` (Alchemy RPC) to get ETH balance. |
| **Carbon credit certificate** | ROI Calculator → "Issue Carbon Credit NFT" → `POST /api/blockchain/certificate`. Returns certificate ID and mock tx hash (demo – not on-chain). |
| **Sign & Approve (Ethereum)** | Government → Approval Workflows → "Sign & Approve (Ethereum)" on an MOU: connects wallet (MetaMask) and uses `personal_sign` to sign the approval. No gas; no on-chain tx. |
| **Consumer purchase (test)** | Consumer Marketplace → Cart → "Purchase with wallet (test)": connects wallet and signs a message (no real payment). |

Set in `server/.env`:

- `ETHEREUM_MAINNET_URL` – Alchemy RPC URL (e.g. `https://eth-mainnet.g.alchemy.com/v2/YOUR_KEY`).
- `ALCHEMY_NFT_API_KEY` – optional for future NFT metadata.
- `GAS_POLICY_ID` – optional; use if you add Alchemy gas-sponsored transactions later.

**Compliance & Audits → Blockchain tab:** Mock records with "View on Etherscan" link (full tx hashes open Etherscan; short hashes open search).

---

## Summary

- **Gemini:** Reports & Export (waste report PDF), product story/description, image analysis (inventory + matching), inventory description.
- **Imagine Pro:** Publish Product image only.
- **Alchemy/Ethereum:** ROI Calculator certificate (demo), Approval Workflow sign, Consumer test purchase (wallet sign), Compliance blockchain links; optional wallet balance via server.
- **Rest:** Mock data where noted, existing assets, local QR.
