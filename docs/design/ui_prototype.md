# UI Prototype – NewEra POS

| | |
| --- | --- |
| **Maintainers** | Haifa Chkoundali, Yasmine Chkoundali |
| **Version** | 0.3 |
| **Last updated** | W10 (A2: SRS v1.2 and the screen list of ui_design.md §1) |
| **Location** | [`docs/design/prototype/`](prototype/) |
| **Used by** | SRS §3.1.1 and §3.3, [ui_design.md](ui_design.md) |

### Version history

| Version | Changes |
| --- | --- |
| 0.1 | W06–W07: cashier screens for UC1, UC2, UC3 and UC5, scanner simulation. |
| 0.2 | W08: limitations (review #25). |
| 0.3 | W10: all 14 screens and dialogs of ui_design.md §1 (new: S-03, D-01, M-01 to M-04), the fallback messages, the store manager approval, and the rules of SRS v1.2. |

## 1. Purpose

A clickable HTML prototype of the screens of NewEra POS. We use it to check the use cases and the screen list with the team, and to show the usability rules of each screen (NFR-05, NFR-06, NFR-13 to NFR-18). It is a throw-away prototype (process model): there's no backend, every external system is simulated in the browser, and the code won't be reused in increment 3. What we keep is the screen design.

The screen IDs (S-01 to S-09, D-01, M-01 to M-04) are the ones of [ui_design.md](ui_design.md) §1. Each page shows its ID in the grey bar at the bottom.

## 2. How to open it

1. Open [`prototype/index.html`](prototype/index.html) in a browser (double click). No server or installation is needed.
2. Log in with `E-1042` (Li Wei) or `E-1055` (Marta Ruiz), any PIN and an opening cash amount, then press **Start session**.
3. Choose a task in the main menu.

The grey **Prototype** bar at the bottom of each screen isn't part of the real POS. It lists the demo data and lets you simulate failures. The data of one visit (session, pending refunds, sessions to review) is kept until you close the browser tab.

## 3. Demo data

All data is fake (`prototype/app.js` and the script of each page).

| Data | Values |
| --- | --- |
| Products for sale | `1001` to `1005`. `9999` gives *Item not found*. |
| Rentable items | `SN-2001-01`, `SN-2003-02` Available. `SN-2002-01` Available but on hold at Register 01. `SN-2001-02`, `SN-2002-05`, `SN-2003-03` Rented. `SN-2003-01` Under maintenance. |
| Customers | `C-105` OK (two open rentals), `C-200` overdue rental. Any other ID is unknown, and the cashier can register a new customer. |
| Sales for returns | `R03-000120` card (one pair of gloves already returned), `R03-000098` cash, `R03-000077` check, `R01-000045` older than 30 days. |
| Open rentals | `SN-2001-02` 2 days late, `SN-2002-05` on time and paid by card, `SN-2003-03` 8 days late (late fee and tax above the deposit). Also found by rental receipt (`R03-000140`) or customer ID. |
| Employees | Cashiers `E-1042`, `E-1055`. Store manager `E-2001` (Ana Torres). Any other ID is refused. |
| Tax | 21 % (Tax Calculator and default tax rate). |

Transaction IDs follow AD-05: register ID, a dash and the counter of the register (`R03-000154`). New customer IDs are built the same way (`C-R03-0012`). The format of the customer ID is only an example.

The rental fees, deposits and product prices are examples. The refund period (30 days), the rental periods (1, 3 or 7 days) and the late fee (one day's rental fee per day late, with tax) are the values of SRS v1.2.

## 4. Screens and coverage

| ID | Screen | File | Use case | Requirements | What to try |
| --- | --- | --- | --- | --- | --- |
| S-01 | Login | `index.html` | UC4 | FR-40, FR-43 to FR-45, FR-47, IR-08, IR-09 | `E-0000`; opening cash `abc`; *HR System offline* |
| S-02 | Menu | `menu.html` | UC4, entry to all tasks | FR-49, FR-77, NFR-15 | Status of the four systems; *Tax Calculator offline*; pending card refunds and *Check status* |
| S-03 | Close session | `close.html` | UC4 close session | FR-60 to FR-63, FR-74, BR-17 | Expected cash; a difference above 5,00 €; close with a sale still open |
| S-04 | Sale | `sale.html` | UC1 | FR-02 to FR-08 | Items `1001` to `1005`, `9999`; *Price* on a line (D-01) |
| S-05 | Payment | `payment.html` | UC1, UC3, UC5 (amount still due) | FR-09 to FR-12, FR-37, FR-64 to FR-66, FR-73, BR-05, BR-06, BR-18, IR-02 | Cash with change; card approved, declined, no answer |
| S-06 | Receipt | `receipt.html` | UC1, UC2, UC3, UC5 | FR-13, FR-16, FR-17, FR-29, FR-39, FR-59, FR-71, IR-13 | One receipt of each kind; *Printer out of paper* and *Reprint receipt* |
| S-07 | Return | `return.html` | UC2 | FR-20 to FR-27, BR-07, BR-08, IR-03 | Condition of each item; card refund refunded, declined or no answer; check sale |
| S-08 | Rental | `rental.html` | UC3 | FR-30 to FR-36, BR-10 to BR-12, BR-15 | `C-200`; an unknown ID and *Register new customer*; `SN-2002-01` on hold |
| S-09 | Rental return | `return-rental.html` | UC5 | FR-50 to FR-57, FR-72, FR-73, BR-10, BR-16 | `SN-2003-03` (amount still due); `C-105`; *Damaged* with a description |
| D-01 | Manager approval | in `app.js` | UC1 4d, UC2 9b2a, UC5 6a, manager functions | FR-06, FR-25, FR-52, FR-55, BR-04, NFR-07 | `E-2001` approves; `E-1042` is refused |
| M-01 to M-04 | Manager functions | `manager.html` | Store manager | FR-68 to FR-70, FR-74 to FR-76, IR-17 | One tab per screen; *Store database offline* |

## 5. Fallback and error messages

These are the messages that the task plan asked for. Each one is shown on the screen where the problem happens, in plain words, with what the cashier can do next (NFR-14). Where ui_design.md §2.2 gives a text (E1 to E17), the prototype uses that text.

| Situation | Screen | What the cashier sees and can do | Ref | Source |
| --- | --- | --- | --- | --- |
| Payment Service doesn't answer a card payment | S-05 | "The Payment Service does not answer. Nothing was charged…" with **Retry**, **Other tender** and **Cancel sale**. After *Other tender* the screen says the card request was cancelled, so the customer isn't charged twice. | E17 | UC1 9b2b, IR-02, IR-15 |
| Card declined | S-05 | "The card was declined (reason). Choose another way to pay." | E16 | BR-18 |
| Tax Calculator not available | S-02, S-04, S-05, S-08 | "The default tax rate is used and the sale will be corrected later." The receipt marks the tax. | E7 | IR-05, NFR-15 |
| Printer out of paper | S-06 | "Load a new roll, then press Reprint receipt." The transaction is already saved. | – | IR-13, FR-17 |
| HR System not available | S-01 | "The list saved on (date and time) is used." | E2 | IR-09, FR-45 |
| Session closed with a difference above 5,00 € | S-03 | "The difference is (amount). The store manager will review this session." | E4 | BR-17, FR-74 |
| Card refund declined | S-07, S-09 | Cash refund only after a store manager approves it in D-01. | – | FR-25, FR-55 |
| Card refund without answer | S-07, S-09, S-06 | "The card refund is not confirmed yet. Nothing was paid. Ask again later from the menu." It appears on S-02 under *Card refunds pending*. | E15 | FR-26, FR-77 |
| Item on hold at another register | S-08 | "Being rented at Register 01 right now. Choose another item." | – | AD-05, UC3 7b |
| Store database not available | M-03, M-04 | The default tax rate and the catalog can't be changed; the previous values are kept. | – | AD-05 |

The other texts of ui_design.md §2.2 (E1, E3, E5, E8 to E12, E14) are used on their screens too.

## 6. Usability notes

- A cash sale needs 3 clicks after the items: *Pay*, *Exact* (or an amount), *Complete* (NFR-06).
- Large buttons and fields for a touch screen; one main task per screen (NFR-13, NFR-16).
- Before a payment or a refund, the screen shows the amount and its parts (NFR-17). The rental return shows the deposit, the late fee, its tax and the amount kept.
- The waiting message (*Waiting for the Payment Service…*) appears while a card payment or refund is open (NFR-18). In the prototype it lasts 1.5 s.
- Every store manager action goes through the same dialog D-01, so cashiers learn it once.

## 7. Limitations

The prototype only checks the screens and the flow. Some rules are faked or left out:

- **PINs.** Neither the cashier PIN nor the store manager PIN is checked. D-01 checks only the role: `E-2001` is the only store manager. In the real POS the HR System checks the PIN, or the salted hash of the local list when it doesn't answer (FR-44, IR-08, IR-09).
- **Manager functions.** The store manager enters the ID and PIN once in D-01, and the actions of M-01 to M-04 reuse them. In the real POS each request carries the ID and the PIN (system_interfaces.md §3.6).
- **External systems and storage.** Everything is simulated in the browser. The timeouts are shorter, and the Accounting queue on M-01 to M-04 shows fixed numbers. Nothing is sent to the store database.
- **Data.** The demo data is fixed. Stock levels and item status don't change after a sale or a rental.
- **Tenders.** The Payment screen shows a fixed list of three tenders. In the real POS it asks `getAvailableTenders()` (AD-08).

## 8. Open points

1. **Screens not in ui_design.md §1 yet.** The prototype adds the list of pending card refunds on S-02 (FR-77) and the Accounting queue status beside the manager screens (FR-76). Yasmine: add them to the screen list, or tell me where they should go.
2. **Customer ID format.** `C-R03-0012` is only an example. AD-05 says the customer ID is built like the transaction ID, but no format is fixed.
3. **Pending refund from the menu.** ui_design.md §2.3 point 1 opens S-07 or S-09 for the chosen refund. The prototype asks the status directly from S-02 (*Check status*), which saves one screen. To decide with Yasmine.
4. **Place of the buttons (UI-04).** ui_design.md §3 puts Confirm at the bottom right and Cancel at the bottom left. The prototype still has both in the right column, Confirm above Cancel. I'll change it once UI-04 is confirmed (ui_design.md §3.2 point 2).
