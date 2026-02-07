# GreenBridge: API Keys & Blockchain (Suna / Generic) Setup

## 1. Add API keys and run the backend (ready-to-use)

### Step 1: Backend API (Gemini, QR, Invoice)

1. **Create `server/.env`** (copy from `server/.env.example`):
   ```bash
   cd server
   cp .env.example .env
   ```

2. **Add your Gemini API key** in `server/.env`:
   ```
   GEMINI_API_KEY=your-gemini-api-key
   PORT=3003
   ```
   Get a key at [Google AI Studio](https://aistudio.google.com/apikey). Default model: `gemini-2.5-flash` (match your Usage and Limits). Optional: `GEMINI_MODEL=gemini-2.5-flash-lite` or `gemini-3-flash-preview`. See **API_AND_SERVICES.md** for where Gemini, Imagine Pro, and Alchemy/Ethereum are used.

3. **Install and run the server**:
   ```bash
   cd server
   npm install
   npm start
   ```
   The API runs at `http://localhost:3001`. You should see: `GreenBridge API http://localhost:3001`.

### Step 2: Frontend env

4. **In the project root**, ensure `.env` has:
   ```
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   VITE_API_URL=http://localhost:3001
   ```

5. **Start the frontend** (from project root):
   ```bash
   npm run dev
   ```

Once both are running and `GEMINI_API_KEY` is set, you get:

- **Government – Inventory**: Upload photo → real AI analysis (category, grade, price) + optional AI description & image.
- **Business – Matching Engine**: “AI Analyze Photo” uses the same AI.
- **Business – Publish Product**: “Generate image & story with AI” for consumer marketplace.
- **Orders**: “Invoice” and “QR” buttons call the API (invoice JSON + optional AI image; QR as image).

---

## 2. Endpoints overview

| Endpoint | Purpose |
|----------|--------|
| `POST /api/ai/analyze-waste` | Upload image → category, grade, suggested price, quantity, quality (OpenAI Vision). |
| `POST /api/ai/generate-inventory-description` | Generate text description for inventory batch. |
| `POST /api/ai/generate-inventory-image` | Generate product-style image for inventory (DALL-E). |
| `POST /api/ai/generate-product-image` | Generate product image for consumer marketplace. |
| `POST /api/ai/generate-product-story` | Generate marketing story for a product. |
| `POST /api/qr/generate` | Generate QR code (payload + size) → data URL. |
| `POST /api/invoice/generate` | Generate invoice JSON (+ optional AI invoice image if `INVOICE_USE_AI_IMAGE=true`). |
| `GET /api/health` | Check API and whether OpenAI is configured. |

All AI endpoints require `GEMINI_API_KEY` in `server/.env`. QR works without it.

---

## 3. Invoices and QR codes

- **Invoice**: The API returns JSON (orderId, amount, date, supplier, `blockchainReady: true`). You can hash this payload and store it on a blockchain (see Section 4).
- **QR**: The app generates QR codes for orders and inventory. The QR payload is JSON (e.g. `{ type: "order", id, material, quantity }`). You can point the QR to a verification URL that checks a blockchain or your DB.

---

## 4. How to use a blockchain (Suna / generic) – step by step

“Suna” in a sustainability/blockchain context can mean different things (e.g. a future chain or a carbon/sustainability ledger). Below is a **generic step-by-step** you can apply to **any** blockchain (Ethereum, Polygon, or a sustainability-focused chain like Suna when available).

### Goal

- **Verify** waste/product origin and transactions (invoices, orders).
- Optionally **store** hashes of invoices or batch IDs on-chain so QR codes and “Blockchain verified” badges are backed by real data.

### Step 1: Choose the chain

- **Public chains**: Ethereum, Polygon, etc. – use for public verification.
- **Sustainability / carbon chains**: If “Suna” refers to a specific chain (e.g. a registry for carbon or waste credits), sign up on their site and get:
  - Network URL (RPC)
  - Chain ID
  - Contract addresses for “record batch” / “record transaction”

### Step 2: Get a wallet and credentials

1. Create a wallet (e.g. MetaMask) and fund it with a small amount of native token (for gas).
2. If the chain uses **API keys** (e.g. for a managed service), get:
   - API key
   - Project/App ID
   - (Optional) Webhook or callback URL for confirmations

### Step 3: Record data on-chain

Typical flow:

1. **Hash the payload** (e.g. invoice JSON or `{ batchId, category, quantity, timestamp }`):
   - Use SHA-256 or Keccak and store the hash in your DB.
2. **Send the hash to the chain**:
   - **Option A – Simple**: Use the chain’s “store hash” / “record” function (if they provide one). Call it from a small backend script or Supabase Edge Function with the wallet’s private key (or a delegated key) **never in the frontend**.
   - **Option B – Smart contract**: Deploy a tiny contract with a `recordHash(bytes32 hash, string batchId)` function; call it from your backend.
3. **Save the transaction hash** (txHash) in your DB (e.g. `orders.blockchain_tx_hash` or a new `verification` table). This is your proof.

### Step 4: Link QR and UI to the chain

1. **QR code**: Encode a URL like `https://yourapp.com/verify?id=<orderId>` (or `?hash=<txHash>`). When the user scans:
   - Your backend looks up the order/batch and its `blockchain_tx_hash`.
   - Optionally call the chain (read-only) to confirm the tx exists and get block number.
   - Return a “Verified on [Chain name]” page.
2. **“Blockchain verified” badge**: Show it only when `blockchain_tx_hash` is not null (and optionally after a read-only check).

### Step 5: If “Suna” is a specific product

- Go to the official Suna (or Suna blockchain) website.
- Sign up and get:
  - **API base URL** and **API key**
  - **Network / RPC** and **Chain ID** if it’s EVM-compatible
  - **Documentation** for “record transaction” or “register batch”
- In your backend (e.g. `server/` or Supabase Edge Function):
  - Call Suna’s API to register the invoice hash or batch ID.
  - Store the returned transaction/reference ID in your DB and use it in the QR verification flow above.

### Summary table

| Step | Action |
|------|--------|
| 1 | Choose chain (Ethereum, Polygon, or Suna-specific). |
| 2 | Get wallet + API keys / RPC. |
| 3 | Hash payload → send hash on-chain (backend only); save txHash in DB. |
| 4 | QR → verification URL → backend checks txHash on chain → show “Verified”. |
| 5 | If using Suna: use their API docs and keys in your backend. |

Once the schema is applied and API keys are set, the app is ready to use with live AI, QR, and invoices; you only need to plug in your chosen blockchain (or Suna) in the backend and DB as above.
