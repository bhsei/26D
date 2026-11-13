# UI Design – NewEra POS

| | |
| --- | --- |
| **Maintainer** | Yasmine Chkoundali |
| **Version** | 0.1 |
| **Last updated** | W10 (screens first part) |
| **Part of** | Increment 2 – Design (W10, user interface design) |
| **Inputs** | SRS v1.2 (§3.1.1, §3.3), [`ui_prototype.md`](ui_prototype.md), [`system_interfaces.md`](system_interfaces.md) §3, [`architecture.md`](architecture.md) §4.2 |

### Version history

| Version | Changes |
| --- | --- |
| 0.1 | §1 Screens: the screens of the cashier and of the store manager, with their use case and system operations. |

This document describes the user interface of NewEra POS: the screens, how the user moves between them, the rules that every screen follows, the classes of the UI and the navigation sequence of UC1. Each section has one owner. The names of the screens and of the controllers are those of the logical view (`ui.screens` and `ui.api`, [`architecture.md`](architecture.md) §4.2), and the operations are those of [`system_interfaces.md`](system_interfaces.md) §3.

## 1. Screens

### 1.1 How to read the table

- A **screen** is one web page of `ui.screens`, shown in the browser of the register. It shows data and sends the actions of the user. It contains no business rule (AD-01).
- The **system operations** are the requests that the screen sends to the controller of its use case (one request for each operation, system_interfaces.md §3).
- The **prototype** column gives the file of the [UI prototype](ui_prototype.md) that already shows the screen. A screen marked *new* is not in the prototype yet.
- The cashier screens are used after the cashier has logged in (UC4). Every operation that needs a store manager carries the manager ID and the PIN (BR-04), and is entered in the dialog of section 1.3.

### 1.2 Cashier screens

| ID | Screen | Use case | System operations (system_interfaces.md §3) | Controller | Prototype |
| --- | --- | --- | --- | --- | --- |
| S-01 | **Login** | UC4 Start Up | `startUp()`, `logIn(employeeID, pin)`, `enterOpeningCash(amount)` | `SessionController` | `index.html` |
| S-02 | **Menu** | UC4 (end), entry to UC1, UC2, UC3, UC5 | None. It shows the cashier, the register ID and the status of the external systems (see open point 1) | – | `menu.html` |
| S-03 | **Close session** | UC4 close session | `closeSession()`, `enterClosingCash(amount)`, `confirmCloseSession()` | `SessionController` | new |
| S-04 | **Sale** | UC1 Process Sale | `makeNewSale()`, `enterItem(itemID, quantity)`, `removeItem(lineNumber)`, `endSale()`, `cancelSale()`; price change: `overridePrice(...)` with the dialog D-01 | `SaleController` | `sale.html` |
| S-05 | **Payment** | UC1, UC3 and UC5 (amount still due) | `makePayment(amount, tenderType)` for a sale, a rental or a rental return | `SaleController`, `RentalController`, `RentalReturnController` | `payment.html` |
| S-06 | **Receipt** | UC1, UC2, UC3, UC5 | `reprintReceipt()`. The data of the receipt come from the answers of `makePayment`, `confirmReturn` and `confirmRentalReturn` | `SaleController` | `receipt.html` |
| S-07 | **Return** | UC2 Handle Returns | `makeNewReturn()`, `findSale(receiptNumber)`, `enterReturnItem(itemID, quantity, condition)`, `removeReturnItem(lineNumber)`, `confirmReturn()`, `checkRefundStatus()`, `cancelReturn()`; cash refund: `approveCashRefund(...)` with D-01 | `ReturnController` | `return.html` (without the condition of the item) |
| S-08 | **Rental** | UC3 Process Rental | `makeNewRental()`, `enterCustomerID(customerID)`, `registerCustomer()`, `enterRentalItem(serialNumber)`, `selectRentalPeriod(days)`, `endRental()`, `cancelRental()` | `RentalController` | `rental.html` |
| S-09 | **Rental return** | UC5 Return Rental | `makeNewRentalReturn()`, `findRental(code)`, `findRentalsOfCustomer(customerID)`, `selectRental(rentalID)`, `recordCondition(condition, damageNote)`, `confirmRentalReturn()`, `checkRefundStatus()`, `cancelRentalReturn()`; damage and cash refund: `confirmDamage(...)`, `approveCashRefund(...)` with D-01 | `RentalReturnController` | `return-rental.html` (without damage confirmation) |

### 1.3 Dialog of the store manager

| ID | Dialog | Used by | System operations | Controller | Prototype |
| --- | --- | --- | --- | --- | --- |
| D-01 | **Manager approval** (employee ID, PIN and, when needed, the reason) | S-04 price change (UC1 4d), S-07 and S-09 cash refund (UC2 9b2a, 9c; UC5), S-09 damage confirmation (UC5 6a) | Carries `managerID`, `pin` and `reason` of `overridePrice(...)`, `approveCashRefund(...)` and `confirmDamage(...)` | The controller of the screen that opens it | new |

### 1.4 Store manager screens

These are the "Manager screens" of the logical view. Each operation carries the manager ID and the PIN, because there is no manager session (system_interfaces.md §3.6, see open point 2).

| ID | Screen | Requirement | System operations (system_interfaces.md §3.6) | Controller | Prototype |
| --- | --- | --- | --- | --- | --- |
| M-01 | **Reorder and stock-check list** | FR-68, BR-09 | Reorder and stock-check list (`GET /api/products/flagged`) | `ManagerController` | new |
| M-02 | **Sessions to review** | FR-74, FR-75, BR-17 | `listSessionsToReview()`, `confirmSessionReview(sessionID, managerID, pin, reason)` | `ManagerController` | new |
| M-03 | **Settings** (default tax rate, disable an employee) | FR-69, FR-70, IR-05, IR-09 | Change the default tax rate, disable an employee in the local list | `ManagerController` | new |
| M-04 | **Catalog import** | IR-17 | Import the catalog (file and manager) | `ManagerController` | new |

### 1.5 Summary

- **9 cashier screens** (S-01 to S-09), **1 dialog** (D-01) and **4 store manager screens** (M-01 to M-04).
- Every system operation of the use cases UC1 to UC5 is used by exactly one screen, except `makePayment`, which the screen S-05 sends for three controllers, and `checkRefundStatus()` and `approveCashRefund(...)`, which UC2 and UC5 share.
- The prototype shows 8 of the 14 screens and dialogs. It does not show S-03, D-01, M-01 to M-04, and it does not show the condition of a returned item (S-07) nor the damage confirmation (S-09). The prototype stays a throw-away prototype (process model).

### 1.6 Open points

1. **Status of the external systems (NFR-15).** The menu S-02 and the warnings of S-04 and S-05 show whether each external system is available and whether the default tax rate is used. No operation of system_interfaces.md §3 returns this status. To decide with Alfonso (screen ↔ API table).
2. **How a store manager opens M-01 to M-04.** The system interfaces have no manager session. Proposal: the menu S-02 has an entry *Manager functions* that asks for the manager ID and the PIN, and each screen M-xx repeats them with its action (BR-04). To confirm.
3. **Pending card refund.** `checkRefundStatus()` needs the ID of the return or rental return. A refund that stays *pending* after the cashier has left the screen has no list to find it again. To decide with Alfonso.

## 2. Navigation between the screens

*To do (W10) – Yasmine, draft Sun 15 Nov: navigation diagram for UC1 to UC5 (`assets/ui_navigation.puml`), with the error and fallback messages.*

## 3. UI rules

*To do (W10) – Yasmine, draft Sun 15 Nov: rules from the usability NFRs (NFR-05, NFR-06, NFR-13 to NFR-18).*

## 4. UML class diagram of the UI

*To do (W10) – Josué (A3): the screens of `ui.screens`, the controllers of `ui.api` and the data each screen shows (`assets/ui_classes.puml`), traceability of the usability NFRs to the screens.*

## 5. Navigation sequence diagram of UC1

*To do (W10) – Avni (A4): Cashier → screens → controller, for the main scenario and *Card payment not available* (`assets/ui_sequence_uc1.puml`).*
