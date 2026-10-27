# UI Prototype – NewEra POS

| | |
| --- | --- |
| **Maintainers** | Haifa Chkoundali, Yasmine Chkoundali |
| **Version** | 0.1 |
| **Last updated** | W07 |
| **Location** | [`docs/design/prototype/`](prototype/) |
| **Used by** | SRS §3.1.1 User interfaces, §3.3 Usability requirements |

## 1. Purpose

A clickable HTML prototype of the cashier screens of NewEra POS. It is used to check the use cases with the team and the stakeholders and to show the usability needs of each screen (NFR-05, NFR-06). It is **not** the final design: there is no real backend, and every external system (Payment Service, Tax Calculator, Accounting System, HR System) is simulated in the browser.

## 2. How to open it

1. Open [`prototype/index.html`](prototype/index.html) in a web browser (double click the file). No server or installation is needed.
2. Log in with employee ID `E-1042` (Li Wei) or `E-1055` (Marta Ruiz), any PIN and an opening cash amount, then press **Start session**.
3. Choose a task in the main menu.

Each screen has a grey **Prototype** bar at the bottom. It is not part of the real POS: it lists the demo data and lets you simulate failures of the external systems.

## 3. Demo data

All data is fake (`prototype/app.js`).

| Data | Values |
| --- | --- |
| Products for sale | `1001` Hammer 500 g, `1002` Screwdriver set, `1003` Wood screws, `1004` Measuring tape, `1005` Work gloves. `9999` shows *Item not found*. |
| Rentable products | `2001` Electric drill, `2002` Pressure washer, `2003` Ladder 3 m (rental fee per day and deposit in `app.js`) |
| Rentable items (serial numbers) | `SN-2001-01` Available, `SN-2001-02` Rented, `SN-2002-01` Available, `SN-2002-05` Rented, `SN-2003-01` Under maintenance |
| Customers | `C-105` OK; `C-200` has an overdue rental (BR-12) |
| Receipts for returns | `S-10234` paid by card, `S-10180` paid in cash, `S-09001` older than the refund period |
| Open rentals | `SN-2001-02` (2 days late), `SN-2002-05` (on time) |
| Employees | `E-1042` Li Wei, `E-1055` Marta Ruiz; any other ID (for example `E-0000`) is rejected as unknown |
| Tax | 21 % (Tax Calculator and local default tax rate) |

**Example values.** The refund period (30 days), the late fee (5 € per day), the rental periods, the rental fees and the deposits are only **examples**. They are still open questions in the glossary and the SRS.

**Simulated failures.**

| Where | Prototype control | Shows |
| --- | --- | --- |
| Start Up | *HR System offline* | Warning, login checked against the local employee list (IR-09) |
| Main menu | *Tax Calculator offline* | Default tax rate used and warning on the sale and payment screens (IR-05) |
| Payment | *Payment Service result: approved / declined / service down* | Result of a card or check authorization (IR-01, IR-02) |

## 4. Screens and coverage

| Screen | File | Use case | Requirements | What to try |
| --- | --- | --- | --- | --- |
| Start Up / login | `index.html` | UC4 Start Up | FR-40, FR-43, FR-44, FR-45, FR-47, IR-08, IR-09 | Login with `E-1042`; `E-0000`; *HR System offline* |
| Main menu | `menu.html` | UC4 (end), entry to UC1–UC3, UC5 | FR-49 | Status of the 4 external systems; *Tax Calculator offline* |
| Sale | `sale.html` | UC1 Process Sale | FR-02, FR-03, FR-04, FR-05, FR-08 | Scan or type `1001`–`1005`, quantity, remove a line, `9999` |
| Payment | `payment.html` | UC1, UC3 | FR-09, FR-10, FR-11, FR-12, FR-35, FR-37, BR-05, BR-06 | Cash with change; card approved / declined / service down; check authorized by the Payment Service |
| Receipt | `receipt.html` | UC1, UC3 | FR-13, FR-16, FR-39 | Receipt with tender, change, authorization code, last 4 card digits; deposit and due date for rentals |
| Return | `return.html` | UC2 Handle Returns | BR-07, BR-08, IR-03 | `S-10234` (refund to card), `S-10180` (refund in cash), `S-09001` (too old) |
| Rental | `rental.html` | UC3 Process Rental | FR-30 to FR-36, BR-10, BR-11, BR-12 | Customer `C-200` (blocked); pick an *Available* item; rental period |
| Return rental | `return-rental.html` | UC5 Return Rental | BR-10, late fee | `SN-2001-02` (late fee taken from the deposit), `SN-2002-05` (on time); item back to *Available* |

The FRs of UC2 (FR-20…) and UC5 (FR-50…) will be added to this table when they are final in the SRS.

## 5. Usability notes

- A cash sale needs exactly **3 clicks** after the items are entered: *Pay* → *Exact* (or an amount) → *Complete* (NFR-06).
- Large buttons and fields for a touch screen; one main task per screen.
- Errors and warnings are shown on the screen where they happen, in plain words, with what the cashier can do next.
- The status of the external systems is always visible in the main menu.
