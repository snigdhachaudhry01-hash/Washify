# Foldline / Washify — Campus Laundry Management System

A high-fidelity, responsive frontend implementation of the **Foldline Campus Laundry Management System** built strictly in accordance with **PRD Version 1.0** and inspired by the provided **Figma / Stitch** mobile cart and desktop interface designs.

---

## 🚀 Quick Start

You can run this project locally with zero third-party dependencies:

### Option 1: One-Click Windows Launcher
Double-click `run.bat` in this folder. It will start the local HTTP server and automatically open the application in your default browser at `http://localhost:3000/`.

### Option 2: PowerShell
Run the included PowerShell server script:
```powershell
powershell -ExecutionPolicy Bypass -File .\serve.ps1
```

### Option 3: Direct Browser File Opening
You can also directly open `index.html` in Chrome, Edge, Safari, or Firefox:
`file:///C:/Users/snigdha/.gemini/antigravity/scratch/foldline-laundry-frontend/index.html`

---

## 📱 Dual Experience: Desktop SaaS + Mobile Cart PWA Simulator

The application includes a prominent **"Mobile Cart View / Switch to Desktop"** toggle in the header:
1. **Desktop View** (matches PDF Pages 1, 2, 3, 4, 6, 8):
   - Deep navy sidebar navigation (`#0e1726`) with campus logo, collection schedule badge, and owner-gated settings.
   - High-density operational tables, multi-column layouts, and wide ledger views.
2. **Mobile Cart PWA View** (matches Figma stitch screens 1–4 and PDF Pages 5 & 7):
   - Realistic 390px mobile phone simulator with dynamic notch, status bar, and native-feeling bottom navigation bar (`Home`, `Intake`, `Delivery`, `Orders`, `Residents`).
   - Large tap targets designed for one-handed operation while standing at the hostel cart.

---

## 📋 PRD Requirements & Business Rules Coverage

| PRD Section | Feature / Rule | Implementation Detail in Frontend |
|---|---|---|
| **FR-01, FR-02** | Customer Profiles & Packages | Searchable resident database with unique ID (`CUS-0086`), hostel/room, college year, and package terms. |
| **FR-03, FR-06, BR-03** | Append-Only Package Ledger | Chronological ledger table with date, time, order reference, usage delta, and live derived balance. No silent edits. |
| **FR-04, BR-01, BR-02** | Automatic Weight & Value Calculation | `Remaining = Purchased - Usage + Adjustments`. Shows remaining kilograms, ₹ remaining value, and percentage used. |
| **FR-05, BR-04** | Low-Balance Warning & Blocked Shortfall Safeguard | Intake dynamically tests weight against remaining balance. Balance $\le 5.00$ kg triggers an amber warning. Weight $>$ balance blocks submission and flags shortfall in red. |
| **FR-07** | Atomic Order Creation & Package Deduction | Submitting intake creates both the `ORD-xxxx` order and its corresponding negative usage ledger debit simultaneously. |
| **FR-08** | Order Lifecycle Statuses | Supports `Received`, `In Laundry`, `Ready`, `Delivered`, and `Cancelled` with colored badges. |
| **FR-09, FR-10, BR-05** | Cart Delivery Handover Checklist | Dedicated handover screen with multi-select checkboxes, live accumulated weight tally, confirmation summary, and staff audit stamp. |
| **FR-11, BR-11** | Automatic Carry-Forward Logic | Undelivered orders carry into subsequent days automatically with original received date and an amber `Carried forward` flag without duplicating orders. |
| **FR-12, FR-15** | Daily Report & CSV Export | Date-selectable daily reconciliation showing Received Today, Delivered Today, Outstanding, Receipts by Status, and Handovers Breakdown with real CSV download. |
| **FR-14, BR-12** | Audited Adjustments & Reversals | Admin-only audited adjustment modal (`REV-xxx`) for tare corrections and approved reversals with mandatory reason. |
| **FR-16** | Role-Based Access Control | Header/Settings role switcher between `Anika Rao (Owner / Admin)` and `Sunil K. / Meera Nair (Laundry Staff)` with owner-only access controls. |

---

## 🎨 Screen-by-Screen Visual Alignment

- **Page 4 & Figma Screen 1 (Dashboard / Shift Tally)**: 4 core metric cards (Received today, Ready for handover, Delivered today, Outstanding), carried-forward amber alert strip, order queue with status tabs and multi-select banner, package attention list, and recent activity feed.
- **Page 2 (Customers Directory)**: Stat summary counters (128 Total, 104 Active, 18 Low balance, 6 Exhausted), search bar, hostel dropdown, status pills, table with remaining kg and badges, pagination.
- **Page 1 & Figma Screen 4 (Customer Detail & Package Ledger)**: Arun Shah (`CUS-0086`) profile card, notification banner for today's intake, append-only ledger table, active `Campus 90` card with progress bar, assign package card, and audited adjustment trigger.
- **Page 7, 8 & Figma Screen 2 (New Intake Flow)**: Resident selector, package terms, large numeric weight input with presets (2.5, 3.5, 4.5, 6.0, 8.0 kg), real-time before/after calculation preview, item summary, and balance safeguard alerts.
- **Page 5, 6 & Figma Screen 3 (Cart Delivery Check)**: Ready checklist, multi-select checkboxes, Handover Review summary box, Delivered Today register, and sticky bottom confirmation bar.
- **Page 3 (Daily Report & Reconciliation)**: Service date selector, snapshot counts, Today's receipts by status progress distribution, Today's handovers breakdown (today's vs carried forward), delivery register, CSV export, and print layout.
