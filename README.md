# Washify Ops — Campus Laundry Frontend (Vite + React + TypeScript)

Frontend for the Foldline / Washify campus laundry system, rebuilt from the **Stitch "Washify System" designs** (15 screens) with Vite, React 18, TypeScript and Tailwind CSS. Frontend only: data is mock data held in memory, so a page refresh resets it.

## Run it locally

**Windows:** double-click `run.bat`.
- With Node.js 18+ installed, it runs `npm install` the first time, then starts Vite and opens **http://localhost:5173/**.
- Without Node.js, it serves the prebuilt copy in `dist\` at **http://localhost:3000/** (PowerShell, no install needed).

**Any OS (terminal):**

```bash
npm install
npm run dev        # http://localhost:5173/
npm run build      # type-check + production build into dist/
npm run preview    # serve the production build at http://localhost:4173/
npm test           # business-rule self-checks (needs Node 22.6+)
```

## Three views, one app

Use the **devices** button (top bar on desktop, floating button on mobile) to switch view and to sign in as **Owner** or **Staff**. Phones open the mobile app automatically.

| View | URL | Screens (Stitch source) |
|---|---|---|
| Desktop portal | `#/desktop/dashboard` | Operations Command Center, Intake Station, Delivery Management, Customer Accounts & Ledgers, Packages & Plans, Reports |
| Ops mobile app | `#/ops/home` | Owner Portal *or* Staff Portal (by role), Staff Intake, Staff Dispatch, Packages & Pricing, Analytics & Audits |
| Hostel cart app | `#/cart/dashboard` | Cart Dashboard, Record Intake, Cart Delivery Checklist, Orders, Customer Ledger |

## What works

- **Intake** (5 screens share one form): customer search by name / CUST ID / phone, manual weight entry (no scale readout or increment pills, per the design notes), bags, Standard/Express, services, live ledger preview with low-balance and billable-excess warnings. Confirming creates the order **and** the ledger debit together. Desktop Intake Station supports **F2** (search) and **F4** (confirm).
- **Dispatch**: bulk order range push (date → from/to sequence → order count and KG load) into cart runs; per-order dispatch; verified handover (single or multi-select checklist with audit stamp).
- **Ledgers**: append-only history, owner-only audited adjustments with a mandatory reason, package renewal, student registration, filters (plan / quota status / year), CSV export.
- **Packages**: quick package builder with auto price, publish new plans, edit rates.
- **Reports**: CSV export of shift and throughput figures.

Buttons that need a backend or hardware (printing tags, notifications, invoices, settings) show a short "will work once the backend is connected" message.

## Project layout

```
src/
  logic.ts         data model, mock seed data, business rules (pure TS)
  logic.test.ts    self-checks for the rules (npm test)
  store.tsx        React state + actions + toasts
  ui.tsx           routing, shared hooks (intake form, range dispatch, package builder), modals
  shells.tsx       desktop sidebar/top bar, mobile frame and bottom navs
  pages/desktop/   desktop screens
  pages/ops/       owner / staff mobile screens
  pages/cart/      hostel cart PWA screens
tailwind.config.js design tokens copied from the Stitch design system
legacy/            the previous vanilla-JS version (kept for reference)
```

When the backend arrives, replace the seed data and the transition functions in `logic.ts` / `store.tsx` with API calls; the pages only talk to the store.
