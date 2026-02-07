# Dashboard features, analytics & AI setup

This doc explains how the **Business** and **Government** dashboards interact, how to get analytics from real data, and how to connect **AI** (image classification, insights).

---

## 1. Run the Supabase schema (required for live data)

Before the dashboards can share real data, create the tables and RLS policies:

1. Open [Supabase Dashboard](https://supabase.com/dashboard) → your project → **SQL Editor**.
2. Open the file **`supabase/schema.sql`** in this repo and copy its full contents.
3. Paste into the SQL Editor and click **Run**.

This creates:

- **inventory** – Government adds stock; Business sees available items in Marketplace & Matching Engine.
- **business_requests** – Business submits quote requests; Government sees them in Company Requests and can Approve/Reject.
- **orders** – Created when Government approves a request; both sides see orders (Business in Order Management, Government in Company Requests → Active Deliveries).
- **collaborations** – Tracks MOUs/agreements (Business sees them in Gov Collaboration).
- **activity_log** – Used for recent activity and analytics.

After the schema is applied:

- **Government** → Inventory Management: “Add New Waste Batch” (and the AI flow) writes to **inventory**.
- **Business** → Marketplace & Matching Engine: data is read from **inventory** (with mock fallback if tables are empty).
- **Business** → “Request Quote” in Matching Engine: creates a row in **business_requests**.
- **Government** → Company Requests: list comes from **business_requests**; Approve creates an **order** and updates request status.
- **Business** → Order Management & Gov Collaboration: data comes from **orders** and **collaborations** (with mock fallback).

---

## 2. Flow: Business ↔ Government interaction

| Step | Who | Where | What happens (with schema applied) |
|------|-----|--------|-----------------------------------|
| 1 | Government | Inventory Management | Add batch → row in **inventory**. |
| 2 | Business | Marketplace / Matching Engine | Sees **inventory** (available only). |
| 3 | Business | Matching Engine | “Request Quote” → row in **business_requests** (status `submitted`). |
| 4 | Government | Company Requests → New Requests | Sees **business_requests** with status `submitted`. |
| 5 | Government | Company Requests | “Approve” → request status `approved`, new row in **orders**. |
| 6 | Business | Order Management | Sees **orders** (active + history). |
| 7 | Business | Gov Collaboration | Sees **collaborations** linked to their requests. |

Analytics (overview cards, Financial Analytics, etc.) can be driven by the same tables: count requests, sum order amounts, aggregate inventory, and use **activity_log** for “Recent activity”.

---

## 3. Analytics from real data

Right now, **DashboardOverview** (Business) and **GovOverview** / **FinancialAnalytics** (Government) use static or mock data. To drive them from Supabase:

- **Source of truth**: `inventory`, `business_requests`, `orders`, `activity_log`.
- **Ideas**:
  - **Business overview**: Total waste available = sum of `inventory.quantity` (available); Active matches = count of `business_requests` in `submitted`/`approved`; Revenue = sum of `orders.amount` (parsed) for delivered orders.
  - **Government overview**: Total inventory = sum of `inventory.quantity`; Pending approvals = count of `business_requests` where `status = 'submitted'`; Completed this month = count of `orders` where `status = 'delivered'` and `updated_at` in current month.
  - **Financial Analytics**: Revenue and diversion over time from **orders** (group by month); category breakdown from **orders** / **inventory** by material type.
  - **Recent activity**: Read from **activity_log** (e.g. last 20 rows) and map to “New request”, “Request approved”, “Inventory batch added”, etc.

You can add React Query hooks (e.g. `useDashboardStats()`) that run Supabase queries/aggregates and then plug the returned values into the existing overview and analytics components.

---

## 4. Connecting real AI

Two places in the app are ready for AI:

### A. Government – Inventory “Add batch” (photo → category/grade)

- **Current behaviour**: “Add New Waste Batch” → upload step → simulated AI analysis (category, grade, suggested price) → form pre-filled → “Add to Inventory” writes to **inventory**.
- **To connect real AI**:
  1. **Image API**: Use an image-classification or vision API (e.g. **OpenAI Vision**, **Google Cloud Vision**, or a custom model) to:
     - Input: photo(s) of the waste batch.
     - Output: suggested category, grade, quantity range, and optionally price.
  2. **Env**: Add something like `VITE_AI_IMAGE_API_URL` or use a small backend that calls the AI and returns JSON.
  3. **Frontend**: In **InventoryManagement.tsx**, in the upload/analysis step, replace the `setTimeout` simulation with:
     - Upload the image (e.g. to your backend or directly to the AI API if it supports CORS and you’re okay with exposing the key via a proxy).
     - Call the AI endpoint and map the response to `analysisResults` (category, grade, suggestedPrice, quantity, quality).
  4. The rest of the flow (form, “Add to Inventory” → **inventory** table) stays the same.

### B. Business – Matching Engine “AI Waste Photo Analyzer”

- **Current behaviour**: “AI Analyze Photo” runs a local simulation and shows type, quality, quantity, suggestion.
- **To connect real AI**:
  1. Same idea as above: send the selected image to your AI/vision API.
  2. Map the API response to the existing `analysisResult` state (type, quality, quantity, suggestion).
  3. Optional: use the detected type to pre-fill the material type in the Matching Engine and/or trigger a search.

### Implemented: GreenBridge API server

- A **Node/Express backend** in **`server/`** is included. It provides:
  - `POST /api/ai/analyze-waste` – image upload → OpenAI Vision → category, grade, price, etc.
  - `POST /api/ai/generate-inventory-description` – text description for inventory.
  - `POST /api/ai/generate-inventory-image` – DALL-E image for inventory.
  - `POST /api/ai/generate-product-image` – product image for consumer marketplace.
  - `POST /api/ai/generate-product-story` – marketing story for products.
  - `POST /api/qr/generate` – QR code generation.
  - `POST /api/invoice/generate` – invoice JSON (+ optional AI image).
- **Setup**: Add `OPENAI_API_KEY` in `server/.env`, set `VITE_API_URL=http://localhost:3001` in root `.env`, then run `node server/index.js` (see **BLOCKCHAIN_AND_API_SETUP.md** for full steps and blockchain/Suna usage).

---

## 5. Summary

| Goal | Action |
|------|--------|
| **Live Business ↔ Government interaction** | Run **`supabase/schema.sql`** in Supabase SQL Editor. |
| **Analytics from real data** | Add queries/hooks that aggregate **inventory**, **business_requests**, **orders**, **activity_log** and feed overview/financial components. |
| **Real AI for inventory (Gov)** | Replace the simulated analysis in **InventoryManagement** with a call to your image/AI API and map the result to the existing form. |
| **Real AI for matching (Business)** | Use the GreenBridge API server: **MatchingEngine** calls `/api/ai/analyze-waste` when `VITE_API_URL` is set. |
| **Consumer marketplace & Publish Product** | Run the extra schema (consumer_products, inventory description/image). Companies use **Publish Product** in the dashboard; AI can generate image and story. Consumer marketplace at `/shop` reads from **consumer_products**. |
| **Invoices & QR** | Order Management “Invoice” and “QR” use the API server. See **BLOCKCHAIN_AND_API_SETUP.md** for blockchain (e.g. Suna) step-by-step. |

Once the schema is applied and API keys are set, the dashboards use live data when available and fall back to mock data when tables are empty or the API is not running.
