# System Interfaces – NewEra POS

| | |
| --- | --- |
| **Maintainer** | Alfonso Pinto |
| **Version** | 0.8 (draft for review; UC2 design sequence diagrams) |
| **Last updated** | W11 |
| **Part of** | Increment 2 – Design (milestone W11); step 2 of the architecture process |
| **Inputs** | [System sequence diagrams](system_sequence_diagrams.md), [operation contracts](operation_contracts.md), [SRS](../requirements/SRS.md) §3.1 and §3.2, [architecture](architecture.md) AD-01 to AD-10; [UI design](ui_design.md) §1 |

> **Status: draft.** The operations of all five use cases have the names of the [system sequence diagrams](system_sequence_diagrams.md) v0.10, and each one refers to its [operation contract](operation_contracts.md) (contracts 1 to 29).
>
> **v0.8 (W11, UC2 design sequence diagrams):** `findSale` answers `SALE_NOT_AVAILABLE` (`409`); `TransactionRepository.returnedQuantities(receiptNumber)`.
>
> **v0.7 (W11, design class diagram, review #65):** `SessionRepository.open` and `close` take the `CashierSession` that `Register` creates (UC4); `selectRentalPeriod` has the line number (UC3); `CatalogFileInfo` in the `settings` of the data model v1.0; customers and open rentals in `TransactionRepository` and `StoreDatabaseSync` (UC3, UC5), with `409` for a sale or rental of another register when the store database is not available; `CARD_NOT_READ` answer of `makePayment`; timeout of `CatalogSource`; open points 9 and 11 closed.
>
> **v0.6 (W11, Contract 16):** catalog import at start-up in the background (IR-17, NFR-02): `CatalogImport` with `NO_NEW_FILE`, `VALID`, `REJECTED` and `NOT_AVAILABLE`; the last imported file is kept with the catalog; `writeCatalog` without a store manager at start-up; rejected files in the `EventLog`.
>
> **v0.5 (review #60, data model v0.2):** pending refunds with their kind and a *pending refund* mode of S-07 and S-09; S-05 with `getAvailableTenders()` and cancel for the three use cases; `reprintLastReceipt()`; session and settings repositories, catalog import and rental conflicts; the local disable of an employee kept after a refresh; `UNKNOWN` status and the time of the last call; `REJECTED` records of the Accounting System; retention of pending refunds; store manager lists and session review read the store database (`409` when it is not available); `sendWaitingRecordsUp`, `refund_status`, `open_authorization`; screens M-03 to M-06 (ui_design.md v0.2).
>
> **v0.4 (W10):** storage interfaces (§4.3) from AD-05 and AD-06; `getSystemStatus()` and `listPendingRefunds()` (§3.8, NFR-15, FR-76, FR-77); names of the store manager operations as proposed in ui_design.md §4.3, and their lists sent with `POST` so that the PIN is never in a URL (§3.6); table of the screens and their requests (§3.9).
>
> **v0.3 (review #55):** contract numbers of UC4 and UC5; the same store manager parameters (`managerID`, `pin`) in every operation that needs approval; `selectRental` with its own sub-resource; answers for a second payment and for a card or check amount that does not match; table of the refund results (§3.7); `NOT_AVAILABLE` for every external system and a status for the card reader and the cash drawer; `voidAuthorization` with the transaction ID (AD-07).
>
> **v0.2:** sections 3.1 and 3.5 follow the SSDs of UC4 and UC5 (close session in three operations; `findRentalsOfCustomer`, `selectRental`, `recordCondition`, `confirmDamage`; `makePayment` for the amount still due); `approveCashRefund(managerID, reason)` and the session review use the SSD names.

## 1. Purpose

The architecture process has three steps: identify the drivers ([architecture_drivers.md](architecture_drivers.md)), **define the system interfaces**, and create the structure ([architecture.md](architecture.md)). This document is step 2. It treats NewEra POS as a black box and says how the rest of the world talks to it, and how it talks to the rest of the world:

1. **System API** (section 3): the system operations of the SSDs, offered by the POS application to the cashier screens. Because the POS is a local web application (AD-02), the screens in the browser call the POS application on the same register with HTTP and JSON. Each system operation is one request.
2. **Interfaces of the technical services** (section 4): one Java interface for each external system (DC-02) and each device (AD-10), used by the application layer. The real system and the stub implement the same interface.
3. **Protocol with the stubs** (section 5): how the adapters talk to the four simulated external systems in our project (DC-01).

## 2. Design rules

These rules apply to every request of the system API.

| Rule | Detail | Source |
| --- | --- | --- |
| Resources | One resource for each kind of transaction (`sales`, `returns`, `rentals`, `rental-returns`) and for the cashier session. URIs are hierarchical: a line belongs to its transaction (`/api/sales/{saleID}/lines`). | Course, step 2 (REST) |
| Methods | `POST` creates or runs a step of the use case, `GET` reads, `PUT` sets a value, `DELETE` removes a line or cancels an open transaction. A step that is not a simple change of data has its own sub-resource (`/end`, `/confirm`, `/payment`). | Course, step 2 |
| Format | JSON in UTF-8. Money is a string with two decimals (`"37.90"`), never a floating-point number, so amounts are exact. Dates and times in ISO 8601. | DR-17 |
| Only on the register | The POS application accepts requests only from `localhost`. Every request applies to the open cashier session of the register, so every transaction is linked to its cashier without sending the employee ID again. | AD-02, BR-13, FR-01 |
| Card data | The screens never send or receive card data. For a card payment the POS application reads the card through the card reader and passes it only to the Payment Service adapter. The answers show only the last 4 digits. | IR-12, DC-06, NFR-11 |
| Store manager approval | Every operation that needs a store manager has the parameters `managerID` and `pin`, and its request carries them as `"manager": {"employeeID": "...", "pin": "..."}`. The PIN is checked like a login (HR System, or the local employee list when the HR System is not available) and is never logged or returned. | FR-06, FR-45, NFR-07 |
| Business results | An expected business result is an answer, not an error: a payment returns `200` with `"result": "APPROVED"`, `"DECLINED"` or `"NOT_AVAILABLE"`. | IR-02, FR-11 |
| Errors | `400` invalid input (for example a quantity that is not a whole number) · `403` store manager approval missing or wrong · `404` unknown item, sale, rental or customer · `409` not allowed in the current state (item not *Available*, sale not ended, transaction already paid, customer with an overdue rental) · `422` against a business rule (cash amount lower than the total, card or check amount different from the total). The body is `{"error": "<code>", "message": "<text for the cashier>"}`. | FR-03, FR-18, FR-31, FR-33, BR-18 |
| Idempotent retry | A payment or refund keeps the transaction ID of the first attempt. Sending the same request again (retry after *Card payment not available*) never charges the customer twice. | IR-02, FR-26 |
| Lists | Lists are paginated: `"limit": 20, "offset": 0` (in the body of a store manager request, otherwise `?limit=20&offset=0`). A list that only a store manager may read is sent with `POST`, because the PIN is never put in a URL. | Course, step 2; AD-09 |

## 3. System API (screens → POS application)

The column *Operation* gives the name of the system operation in the SSD; *Contract* the operation contract that describes its effect.

### 3.1 Cashier session – UC4 Start Up and close session

| Operation | Request | Answer | Contract | Requirements |
| --- | --- | --- | --- | --- |
| `startUp()` | `POST /api/startup` (sent once by the POS program when it starts, before any session) | Register ID and the login screen; or an error and no login when the catalog or the stored data are not available (2a). Records waiting for the Accounting System are sent or stay in the queue; a session interrupted by a crash is ended; a new catalog export file is imported in the background (IR-17) | 16 | FR-41, FR-42, FR-48, FR-63, IR-15, IR-17 |
| `logIn(employeeID, pin)` | `POST /api/sessions` `{"employeeID", "pin"}` | `201` session ID, cashier name, request for the opening cash; a warning when the local employee list was used (6c). `403` not found or not an active cashier (6a), or wrong PIN (6b) | 17 | FR-40, FR-43–FR-46, FR-49, IR-08, IR-09 |
| `enterOpeningCash(amount)` | `PUT /api/sessions/current/opening-cash` `{"amount"}` | Session open, main screen. `400` amount not valid (8a) | 18 | FR-47 |
| `closeSession()` | `POST /api/sessions/current/close` | The cash drawer opens for the closing count. `409` a sale, return, rental or rental return is still open (2a) | 19 | FR-60, IR-14 |
| `enterClosingCash(amount)` | `PUT /api/sessions/current/closing-cash` `{"amount"}` | Expected cash and difference. `400` amount not valid (3a) | 20 | FR-61, FR-62 |
| `confirmCloseSession()` | `POST /api/sessions/current/confirm-close` | Session closed, login screen; `"toReview": true` and a warning when the difference is larger than 5.00 (4b) | 21 | FR-62, FR-74, BR-17 |

### 3.2 Sale – UC1 Process Sale

| Operation | Request | Answer | Contract | Requirements |
| --- | --- | --- | --- | --- |
| `makeNewSale()` | `POST /api/sales` | `201` sale ID | 1 | FR-01 |
| `enterItem(itemID, quantity)` | `POST /api/sales/{saleID}/lines` `{"itemID", "quantity"}` | Line number, description, unit price, line subtotal, running subtotal. `404` unknown item · `400` quantity not valid · a warning when the stock level falls below zero | 2 | FR-02–FR-04, FR-18, FR-19 |
| `removeItem(lineNumber)` | `DELETE /api/sales/{saleID}/lines/{lineNumber}` | New running subtotal | – | FR-05 |
| `overridePrice(lineNumber, newPrice, managerID, pin)` | `PUT /api/sales/{saleID}/lines/{lineNumber}/price` `{"newPrice", "manager"}` | New line subtotal and running subtotal. `403` not a store manager | – | FR-06, BR-04 |
| `endSale()` | `POST /api/sales/{saleID}/end` | Subtotal, tax, total; `"taxToBeCorrected": true` when the default tax rate was used. `409` sale without lines | 3 | FR-08, FR-18, IR-04, IR-05 |
| `makePayment(amount, tenderType)` | `POST /api/sales/{saleID}/payment` `{"tenderType": "CASH" \| "CREDIT_CARD" \| "CHECK", "amount"}` | `"result"`: `APPROVED` (with change due for cash, last 4 digits and authorization code for a card, receipt number) · `DECLINED` (reason) · `NOT_AVAILABLE` (retry allowed) · `CARD_NOT_READ` (card reader error: read the card again or use another tender; no payment and no void needed, 9b1a). `422` cash lower than the total, or a card or check amount different from the total · `409` sale not ended or already paid | 4 | FR-09–FR-16, FR-71, IR-01, IR-02, IR-06, BR-18 |
| `cancelSale()` | `DELETE /api/sales/{saleID}` | Sale cancelled, no change in the stock levels. `409` already paid | – | FR-07 |
| `reprintReceipt()` | `POST /api/receipts/{receiptNumber}/print` | Printer status | – | FR-17, FR-29, IR-13 |
| `reprintLastReceipt()` | `POST /api/receipts/last/print` | The last receipt of this register is printed again (kept in `register_state`); printer status. `404` no receipt yet in this session | – | FR-17, IR-13 |
| `getAvailableTenders()` | `GET /api/tenders` | The tenders of the configuration (AD-08): cash, credit card and, if enabled, check, each one with `available` (false for a card when the Payment Service is `NOT_AVAILABLE` in `getSystemStatus()`, so the cashier sees it but can still retry). The same answer for a sale, a rental and a rental return | – | FR-09–FR-12, AD-08 |

One payment per sale (BR-18): after `DECLINED` or `NOT_AVAILABLE` no payment is created, and the screen sends a new `makePayment` with the same or another tender; the sale keeps the same transaction ID. When the cashier gives up a card payment after `NOT_AVAILABLE` (another tender or `cancelSale`), the POS first sends `voidAuthorization` with that transaction ID, so a late approval can never charge the customer (AD-07, IR-15).

### 3.3 Return – UC2 Handle Returns

| Operation | Request | Answer | Contract | Requirements |
| --- | --- | --- | --- | --- |
| `makeNewReturn()` | `POST /api/returns` | `201` return ID | 5 | FR-20 |
| `findSale(receiptNumber)` | `PUT /api/returns/{returnID}/sale` `{"receiptNumber"}` | Lines of the sale with the quantity bought and already returned, and the tender. `404` no sale · `409` older than 30 days, or `SALE_NOT_AVAILABLE`: the sale is from another register and the store database is not available ("try again later") | 6 | FR-21, BR-07 |
| `enterReturnItem(itemID, quantity, condition)` | `POST /api/returns/{returnID}/lines` `{"itemID", "quantity", "condition": "RESELLABLE" \| "NOT_RESELLABLE"}` | Return line, refund total, tender of the sale. `409` not in the sale or quantity too large | 7 | FR-22, FR-23 |
| `removeReturnItem(lineNumber)` | `DELETE /api/returns/{returnID}/lines/{lineNumber}` | New refund total | – | FR-22 |
| `confirmReturn()` | `POST /api/returns/{returnID}/confirm` | `"refund"`: `CASH_PAID` (drawer opens) · `CARD_REFUNDED` · `NEEDS_APPROVAL` · `PENDING` (see §3.7); receipt number when the return is complete | 8 | FR-25–FR-29, IR-03, BR-08 |
| `approveCashRefund(managerID, pin, reason)` | `POST /api/returns/{returnID}/cash-approval` `{"reason", "manager"}` | Refund paid in cash, receipt number. `403` not a store manager · `409` the refund is not `NEEDS_APPROVAL` | 9 | FR-25 |
| `checkRefundStatus()` | `GET /api/returns/{returnID}/refund` | `CARD_REFUNDED`, `NEEDS_APPROVAL` or still `PENDING` (see §3.7) | – | FR-26 |
| `cancelReturn()` | `DELETE /api/returns/{returnID}` | Return cancelled, nothing changed | – | FR-24 |

### 3.4 Rental – UC3 Process Rental

| Operation | Request | Answer | Contract | Requirements |
| --- | --- | --- | --- | --- |
| `makeNewRental()` | `POST /api/rentals` | `201` rental ID | 10 | FR-30 |
| `enterCustomerID(customerID)` | `PUT /api/rentals/{rentalID}/customer` `{"customerID"}` | Customer accepted. `404` unknown ID · `409` overdue rental | 11 | FR-31, BR-12 |
| `registerCustomer()` | `POST /api/rentals/{rentalID}/customer` | `201` new customer ID, linked to the rental (no other personal data) | 12 | FR-31, DR-18 |
| `enterRentalItem(serialNumber)` | `POST /api/rentals/{rentalID}/lines` `{"serialNumber"}` | Description, item status, rental fee per day, deposit. `404` unknown serial number · `409` item not *Available* | 13 | FR-32, FR-33, BR-11 |
| `selectRentalPeriod(lineNumber, days)` | `PUT /api/rentals/{rentalID}/lines/{lineNumber}/period` `{"days": 1 \| 3 \| 7}` | Rental fee, due date, deposit. `400` other period | 14 | FR-34, BR-15 |
| `endRental()` | `POST /api/rentals/{rentalID}/end` | Rental fee, tax, deposit (not taxed), total, due date; `"taxToBeCorrected": true` when the default tax rate was used | 15 | FR-35, BR-10, IR-05 |
| `makePayment(amount, tenderType)` | `POST /api/rentals/{rentalID}/payment` (same body and answer as for a sale) | As in UC1; after `APPROVED` the item becomes *Rented* | 4 | FR-37–FR-39, FR-64–FR-67, BR-18 |
| `cancelRental()` | `DELETE /api/rentals/{rentalID}` | Rental cancelled, item status unchanged | – | FR-36 |

### 3.5 Rental return – UC5 Return Rental

| Operation | Request | Answer | Contract | Requirements |
| --- | --- | --- | --- | --- |
| `makeNewRentalReturn()` | `POST /api/rental-returns` | `201` rental return ID | 22 | FR-50 |
| `findRental(code)` | `PUT /api/rental-returns/{id}/rental` `{"code"}` (serial number of the item or rental receipt number) | Customer, item, rental date, due date, deposit, tender. `404` no open rental for this item (5a) · `409` the rental is from another register and the store database is not available ("try again later") | 23 | FR-51 |
| `findRentalsOfCustomer(customerID)` | `GET /api/rentals?customerID=...&open=true` | Open rentals of the customer (5b). `409` store database not available (only the rentals of this register can be found) | 24 | FR-51 |
| `selectRental(rentalID)` | `PUT /api/rental-returns/{id}/selected-rental` `{"rentalID"}` | As `findRental`. `409` the rental is not open | 25 | FR-51 |
| `recordCondition(condition, damageNote)` | `PUT /api/rental-returns/{id}/condition` `{"condition": "UNDAMAGED" \| "DAMAGED", "damageNote"}` | On time: full deposit as refund. Late: days late, late fee, its tax and the refund (7a), or the amount still due when the late fee is larger than the deposit (7b); `"taxToBeCorrected": true` when the default tax rate was used. Damaged: request for a store manager (6a) | 26 | FR-52–FR-54, FR-73, BR-16, IR-05 |
| `confirmDamage(managerID, pin)` | `POST /api/rental-returns/{id}/damage-confirmation` `{"manager"}` | Damage confirmed, refund zero. `403` not a store manager | 27 | FR-52, FR-72 |
| `makePayment(amount, tenderType)` | `POST /api/rental-returns/{id}/payment` (same body and answer as for a sale; only in 7b, for the amount still due) | As in UC1. `409` no amount still due | 4 | FR-73, BR-18 |
| `confirmRentalReturn()` | `POST /api/rental-returns/{id}/confirm` | As `confirmReturn` of UC2 (§3.7); item becomes *Available* or *Under maintenance*; rental return receipt | 28 | FR-55, FR-57–FR-59, IR-03 |
| `approveCashRefund(managerID, pin, reason)` | `POST /api/rental-returns/{id}/cash-approval` `{"reason", "manager"}` | As in UC2 (same operation) | 9 | FR-55 |
| `checkRefundStatus()` | `GET /api/rental-returns/{id}/refund` | As in UC2 (§3.7) | – | FR-55 |
| `cancelRentalReturn()` | `DELETE /api/rental-returns/{id}` | Rental and item status unchanged (8a) | – | FR-56 |

### 3.6 Store manager functions

There is no session of the store manager. The menu S-02 has the entry *Manager functions*; the dialog D-01 asks for the employee ID and the PIN, which stay in the memory of the browser only while a screen M-01 to M-06 is open, and every request below carries them (BR-04, AD-09; ui_design.md §1.6, point 2).

The operations that only read (the lists and the queue status) are sent with `POST`, not `GET`: they change nothing, but the PIN goes in the body, because a URL can end up in the browser history or in a log (AD-09, §2).

The store database is the master of the settings, the catalog, the stock differences, the rental conflicts and the session reviews (AD-05). The operations marked * read or write it through `StoreDatabaseSync` and answer `409` *store database not available* when it cannot be reached.

| Operation | Request | Answer | Requirements |
| --- | --- | --- | --- |
| `listFlaggedProducts(managerID, pin)` | `POST /api/manager/flagged-products` `{"manager", "limit", "offset"}` | Products below the reorder threshold, from the local copy (the stock level is an estimate until the next synchronisation); and the products to check for stock, with the missing quantity, from `stock_difference` in the store database. When the store database is not available, only the first part is returned, with `"stockCheckAvailable": false` | FR-68, FR-19, BR-09 |
| `listRentalConflicts(managerID, pin)` * | `POST /api/manager/rental-conflicts` `{"manager", "limit", "offset"}` | Two rentals of the same item found after an offline register sent its transactions (`sync_conflict`): item, both transactions, when found | AD-05, SRS §5.3 Q6, BR-11 |
| `resolveRentalConflict(conflictID, managerID, pin, reason)` * | `POST /api/manager/rental-conflicts/{conflictID}/resolve` `{"reason", "manager"}` | Conflict marked as resolved, by whom and when; neither rental is changed (DR-04) | AD-05 |
| `changeDefaultTaxRate(rate, managerID, pin)` * | `PUT /api/settings/default-tax-rate` `{"rate", "manager"}` | New rate, who changed it and when. `409` store database not available (AD-05) | FR-69, IR-05 |
| `disableEmployee(employeeID, managerID, pin)` | `PUT /api/employees/{employeeID}/local-status` `{"active": false, "manager"}` | Employee disabled in the local list, who did it and when. The mark is kept after a refresh of the list (§4.3) | FR-70, IR-09 |
| `enableEmployee(employeeID, managerID, pin)` | `PUT /api/employees/{employeeID}/local-status` `{"active": true, "manager"}` | The local mark is removed; the employee is active again if the HR System says so | FR-70, IR-09 |
| `listSessionsToReview(managerID, pin)` * | `POST /api/manager/sessions-to-review` `{"manager", "limit", "offset"}` | Sessions of all registers with a cash difference larger than 5.00 | FR-74 |
| `confirmSessionReview(sessionID, managerID, pin, reason)` * | `POST /api/sessions/{sessionID}/review` `{"reason", "manager"}` | Review recorded (Contract 29) | FR-75 |
| `getAccountingQueueStatus(managerID, pin)` | `POST /api/manager/accounting-queue` `{"manager"}` | Number of records waiting for the Accounting System, time the oldest has waited, and the warning when it is older than the configured limit; if the first record was refused (`REJECTED`, §4.1), its transaction ID and the reason, because it blocks the queue | FR-76, AD-06 |
| `importCatalog(file, managerID, pin)` * | `POST /api/catalog/imports` (file + `"manager"`) | Number of products imported, or the fields that are missing or not valid (the previous catalog is kept). `409` store database not available (AD-05) | IR-17 |

### 3.7 Card refund results (UC2 and UC5)

The handler turns the answer of the Payment Service (§4.1) into the refund state of the system API. Cash is paid only after a confirmed failure and with a store manager (UC2 and UC5 ext. 9b2a, 9b2b, 9c; FR-25, FR-26, FR-55).

| Tender of the original transaction | Answer of the Payment Service | Refund state in the API | What the handler does |
| --- | --- | --- | --- |
| Cash | – | `CASH_PAID` | Opens the cash drawer (IR-14) and completes the return |
| Credit card | `refund` → `APPROVED` | `CARD_REFUNDED` | Records the refund with its reference and completes the return |
| Credit card | `refund` → `DECLINED` | `NEEDS_APPROVAL` | No cash; waits for `approveCashRefund` (9b2a) |
| Credit card | `refund` → `NOT_AVAILABLE` | `PENDING` | No cash; asks `refundStatus` with the same transaction ID (9b2b) |
| Credit card | `refundStatus` → `APPROVED` | `CARD_REFUNDED` | As above: the refund was made |
| Credit card | `refundStatus` → `DECLINED` (refund failed or unknown to the Payment Service) | `NEEDS_APPROVAL` | Confirmed failure; cash only with `approveCashRefund` |
| Credit card | `refundStatus` → `NOT_AVAILABLE` | `PENDING` | The return is saved with the refund *pending*; nothing is paid; the cashier can ask again later with `checkRefundStatus` |
| Check | – | `NEEDS_APPROVAL` | Cash only with `approveCashRefund` (9c) |

### 3.8 System status and pending refunds

| Operation | Request | Answer | Requirements |
| --- | --- | --- | --- |
| `getSystemStatus()` | `GET /api/status` (sent by S-02 when it opens, and every 30 s while it is open) | For each external system (Payment Service, Tax Calculator, Accounting System, HR System): `AVAILABLE`, `NOT_AVAILABLE` or `UNKNOWN` (no call since the start-up), with the time of its last call; `defaultTaxRateInUse`; the store database reachable or not, and the time of the last synchronisation; `accountingWarning` (true when the oldest waiting record is older than the configured limit; the numbers are only for the store manager, §3.6) | NFR-15, FR-76, AD-05, AD-06 |
| `listPendingRefunds()` | `GET /api/refunds?status=PENDING&limit=20&offset=0` | Returns and rental returns of this register with a card refund still *pending* (§3.7, current row of `refund_status`): `kind` (`RETURN` or `RENTAL_RETURN`), `id` (the ID of the return or rental return, which is its transaction ID), date, amount. S-02 opens S-07 (`RETURN`) or S-09 (`RENTAL_RETURN`) in *pending refund* mode with that ID | FR-77, FR-26, FR-55 |

`getSystemStatus()` does not call the external systems: it reports the result of their last call, so it is answered at once and never makes the menu wait (NFR-02, NFR-18). The time of the last call shows how old the status is; a status older than 5 minutes is shown as `UNKNOWN`.

**Pending refund mode.** When S-07 or S-09 is opened from the list of pending refunds, it shows the saved return or rental return with its refund and sends only `GET /api/returns/{id}/refund` (or `/api/rental-returns/{id}/refund`) and, when the answer is `NEEDS_APPROVAL`, `POST …/cash-approval` with D-01. No new return is created (ui_design.md §1.6, point 3).

### 3.9 Screens and their requests

The screens are those of the [UI design](ui_design.md) §1. Each screen sends only the requests of its row.

| Screen | Requests |
| --- | --- |
| S-01 Login | `POST /api/sessions` · `PUT /api/sessions/current/opening-cash`. It shows the result of `POST /api/startup`, which the POS program sends when it starts (§3.1); no screen sends it |
| S-02 Menu | `GET /api/status` · `GET /api/refunds?status=PENDING` · `POST /api/receipts/last/print` (*Reprint last receipt*) · opens S-03, S-04, S-07, S-08, S-09, S-07 and S-09 in *pending refund* mode, and, through D-01, M-01 to M-06 |
| S-03 Close session | `POST /api/sessions/current/close` · `PUT /api/sessions/current/closing-cash` · `POST /api/sessions/current/confirm-close` |
| S-04 Sale | `POST /api/sales` · `POST`, `DELETE /api/sales/{saleID}/lines…` · `PUT …/lines/{lineNumber}/price` (with D-01) · `POST /api/sales/{saleID}/end` · `DELETE /api/sales/{saleID}` |
| S-05 Payment | `GET /api/tenders` when it opens · `POST /api/sales/{saleID}/payment`, `POST /api/rentals/{rentalID}/payment` or `POST /api/rental-returns/{id}/payment` · *Cancel*: `DELETE /api/sales/{saleID}`, `DELETE /api/rentals/{rentalID}` or `DELETE /api/rental-returns/{id}`, for the transaction that opened it |
| S-06 Receipt | `POST /api/receipts/{receiptNumber}/print` |
| S-07 Return | *Pending refund* mode: only `GET …/refund` and `POST …/cash-approval` · otherwise `POST /api/returns` · `PUT …/sale` · `POST`, `DELETE …/lines…` · `POST …/confirm` · `POST …/cash-approval` (with D-01) · `GET …/refund` · `DELETE /api/returns/{returnID}` |
| S-08 Rental | `POST /api/rentals` · `PUT`, `POST …/customer` · `POST …/lines` · `PUT …/lines/{lineNumber}/period` · `POST …/end` · `DELETE /api/rentals/{rentalID}` |
| S-09 Rental return | *Pending refund* mode: only `GET …/refund` and `POST …/cash-approval` · otherwise `POST /api/rental-returns` · `PUT …/rental`, `GET /api/rentals?customerID=…`, `PUT …/selected-rental` · `PUT …/condition` · `POST …/damage-confirmation` and `POST …/cash-approval` (with D-01) · `POST …/confirm` · `GET …/refund` · `DELETE /api/rental-returns/{id}` |
| D-01 Manager approval | None: it gives `managerID`, `pin` and `reason` to the request of the screen that opened it |
| M-01 Reorder and stock-check list | `POST /api/manager/flagged-products` · `POST /api/manager/rental-conflicts` · `POST …/rental-conflicts/{conflictID}/resolve` |
| M-02 Sessions to review | `POST /api/manager/sessions-to-review` · `POST /api/sessions/{sessionID}/review` |
| M-03 Default tax rate | `PUT /api/settings/default-tax-rate` |
| M-04 Catalog import | `POST /api/catalog/imports` |
| M-05 Local employees | `PUT /api/employees/{employeeID}/local-status` (disable or enable) |
| M-06 Accounting queue | `POST /api/manager/accounting-queue` |

## 4. Interfaces of the technical services (application layer → adapters)

The application layer only knows these interfaces (AD-01, DC-02). Each one has a real implementation (out of scope in our project), a stub implementation for the tests and the demo (DC-01), and the timeout of SRS §3.1.3. Every method that calls an external system returns `NOT_AVAILABLE` after its timeout instead of an error; the adapter applies the timeout and the handler decides the fallback (AD-07). The signatures are in Java (AD-03); the classes of the parameters are listed under each interface.

### 4.1 External systems

```java
public interface PaymentService {                                   // timeout 10 s (IR-02)
    PaymentResult authorize(PaymentRequest request);                // IR-01, IR-16
    PaymentResult refund(RefundRequest request);                    // IR-03
    PaymentResult refundStatus(String transactionID);               // FR-26, FR-55
    PaymentResult voidAuthorization(String transactionID);          // IR-15, AD-07: after a crash or a payment given up
}

public interface TaxCalculator {                                    // timeout 5 s (IR-05)
    TaxResult calculateTax(TaxRequest request);                     // IR-04
}

public interface AccountingSystem {                                 // called only from the local queue (IR-06, IR-07)
    Acknowledgement send(AccountingRecord record);                  // timeout 5 s (AD-07)
}

public interface HRSystem {                                         // timeout 5 s (IR-09)
    EmployeeCheck checkEmployee(String employeeID, String pin);     // IR-08
    EmployeeListResult employeeList();                              // IR-09, FR-46
}

public interface CatalogSource {                                    // timeout: import timeout of the Settings (proposed 10 s, AD-07)
    CatalogImport importCatalog(Path exportFile, CatalogFileInfo lastImported); // IR-17: lastImported is null for M-04 (always imported)
}
```

| Class | Content |
| --- | --- |
| `PaymentRequest` | transaction ID (the same in every retry), register ID, amount, tender (`CREDIT_CARD` or `CHECK`), card token from the card reader (never stored) |
| `RefundRequest` | transaction ID of the refund, payment reference of the original payment (DR-19), amount; no card number |
| `PaymentResult` | `APPROVED`, `DECLINED` or `NOT_AVAILABLE` (timeout, error or connection lost); authorization code, payment reference, last 4 digits, reason |
| `TaxRequest` / `TaxResult` | transaction ID and type, lines (item ID, quantity, line subtotal), date / tax per line and total, or `NOT_AVAILABLE` |
| `AccountingRecord` | the fields of the [external interfaces](../requirements/external_interfaces.md) §3.3, with the transaction ID and the mark *tax to be corrected* |
| `Acknowledgement` | `RECEIVED` with the transaction ID; `REJECTED` with a reason, when the Accounting System answers but refuses the record (for example a field it cannot read); or `NOT_AVAILABLE`. The queue removes the record only after `RECEIVED` (FR-42) and keeps it otherwise (IR-07); a `REJECTED` record stays first, is marked with the reason and is shown in M-06 |
| `EmployeeCheck` | `VALID` (with name and role, *cashier* or *store manager*), `INVALID` (not found, not active or wrong PIN) or `NOT_AVAILABLE`, after which the handler checks the local employee list (UC4 6c, IR-09) |
| `EmployeeListResult` | `OK` with the list of `EmployeeEntry` (employee ID, name, role, active, PIN as a salted hash only, DR-11), or `NOT_AVAILABLE`, after which the local copy is kept as it is |
| `CatalogImport` | `NO_NEW_FILE` (no file, or the same name and date as `lastImported`), `VALID` with the `Catalog` and its `CatalogFileInfo`, `REJECTED` with the list of missing or invalid fields, or `NOT_AVAILABLE` (the file location cannot be reached within the timeout) |
| `CatalogFileInfo` | name and date of the export file; written with the catalog to the store database (`settings` keys `catalog_file_name` and `catalog_file_date`, data model v1.0) and copied to every register, so that no register imports the same file twice |

### 4.2 Devices (AD-10)

```java
public interface CardReader {
    CardReadResult read();                  // IR-12: OK with a CardToken (token, last 4 digits, expiry; passed only to PaymentService) or ERROR
}

public interface ReceiptPrinter {
    PrinterStatus print(Receipt receipt);   // IR-13: READY, NO_PAPER or ERROR
}

public interface CashDrawer {
    DrawerStatus open(DrawerReason reason, String employeeID);   // IR-14: CASH_PAYMENT, CASH_REFUND, OPENING_COUNT, CLOSING_COUNT; OPENED or ERROR; every opening is logged
}
```

When a device fails, the register goes on with the fallback of SRS §3.1.2:

| Result | What the screen shows | Source |
| --- | --- | --- |
| `CardReader.read()` → `ERROR` (reader error or no card read) | "Card could not be read": `makePayment` answers `CARD_NOT_READ`; read the card again or use another tender. No payment is created and the Payment Service is not called, so no `voidAuthorization` is needed | UC1 ext. 9b1a, contract 4, IR-12 |
| `ReceiptPrinter.print()` → `NO_PAPER` or `ERROR` | The printer message; the transaction is already saved and the receipt can be reprinted (`reprintReceipt`) | IR-13, FR-17 |
| `CashDrawer.open()` → `ERROR` | "The cash drawer did not open": open it with the key; the opening is logged as manual | IR-14 |

The barcode scanner works as a keyboard and has no interface (AD-10, IR-11).

### 4.3 Storage (AD-05, AD-06)

The repositories of `technical.storage` read and write **only the local database** of the register (SQLite). Only `StoreDatabaseSync` talks to the store database (PostgreSQL). The tables are those of the [data model](data_model.md). Money is in whole cents (DR-17).

```java
public interface TransactionRepository {
    String nextTransactionID();                                   // register ID + counter, e.g. R02-000153 (AD-05, DC-09)
    void saveCompleted(Transaction t, AccountingRecord record);   // ONE database transaction: the transaction with its lines, payments and refunds,
                                                                  // the stock changes, the record of AccountingQueue and the entry of store_sync_list (DR-13)
    Optional<Transaction> find(String transactionID);             // local copy only; see StoreDatabaseSync.findTransaction
    void addRefundStatus(String refundID, RefundState state, String reference);  // new row of refund_status (insert only); also queued in store_sync_list
    List<PendingRefund> findPendingRefunds(int limit, int offset);// current refund_status = PENDING; kind and ID of the return (FR-77)
    void saveOpenAuthorization(String transactionID, String paymentReference);  // open_authorization (IR-15)
    void deleteOpenAuthorization(String transactionID);           // in saveCompleted, or after voidAuthorization
    List<String> findOpenAuthorizations();                        // voided at start-up (IR-15)
    Optional<Receipt> lastReceipt();                              // register_state (FR-17)
    Map<Integer, Integer> returnedQuantities(String receiptNumber); // quantity already returned per line number, returns of this register (UC2, FR-22)
    Optional<Customer> findCustomer(String customerID);           // local copy of the customers (UC3 step 4)
    String nextCustomerID();                                      // register ID + counter, like the transaction ID (UC3 4a, question 5)
    List<Rental> findOpenRentalsOfCustomer(String customerID);    // local copy: overdue check (BR-12), UC5 5b
    Optional<Rental> findOpenRentalOfItem(String serialNumber);   // local copy (UC5 step 5)
}

public interface SessionRepository {                              // cashier_session (DR-09)
    void open(CashierSession s);                                   // created by Register (Contract 18); also queued in store_sync_list
    void close(CashierSession s);                                  // closing cash, difference and review mark set by the session (FR-61, FR-62, FR-74); queued again
    Optional<CashierSession> findOpen();                          // an open session found at start-up is ended as interrupted (FR-63)
}

public interface SettingsRepository {                             // settings: local copy of the store database (AD-05)
    Settings current();                                           // default tax rate, reorder threshold, currency, timeouts
}

public interface ItemRepository {
    Optional<ProductDescription> findProduct(String itemID);      // NFR-01: local copy, no external call
    Optional<Item> findItem(String serialNumber);
    List<FlaggedProduct> listBelowThreshold(int limit, int offset); // FR-68: stock estimate of the local copy
}

public interface EmployeeList {
    Optional<EmployeeEntry> find(String employeeID);              // PIN only as a salted hash (DR-11)
    void replaceAll(List<EmployeeEntry> fromHRSystem);            // after every successful employeeList() (FR-46); keeps the local disable marks
    void setLocallyDisabled(String employeeID, boolean disabled, String managerID);  // FR-70
}

public interface AccountingQueue {                                // table accounting_queue, only on the register (AD-06)
    void add(AccountingRecord record);                            // inside saveCompleted, in the same database transaction
    Optional<QueuedRecord> takeFirst();                           // lowest sequence number; the record stays in the queue
    void delete(long seq);                                        // only after RECEIVED (DR-12)
    void markFailedAttempt(long seq, String rejectedReason);      // number and time of the attempts; the reason when REJECTED
    QueueStatus status();                                         // number waiting, age of the oldest, first record rejected or not (FR-76)
}

public interface StoreDatabaseSync {                              // the only class that knows the store database (AD-05)
    SyncResult copyMasterDataDown();                              // catalog, items and status, stock levels, settings, customers:
                                                                  // at start-up (never waited for), every 5 min, and when the connection is back
    SyncResult sendWaitingRecordsUp();                            // store_sync_list in order (kind, record_id): transactions, cashier sessions,
                                                                  // refund statuses, hold removals; INSERT … ON CONFLICT DO NOTHING; then mark as sent
    HoldResult putHold(String serialNumber, String transactionID);// UC3 step 7: HELD, HELD_BY_OTHER (ext. 7b) or NOT_AVAILABLE (rent from the local copy)
    void removeHold(String serialNumber, String transactionID);   // queued in store_sync_list when the store database is not available
    TransactionResult findTransaction(String transactionID);      // return of a transaction of another register: FOUND, NOT_FOUND or NOT_AVAILABLE (FR-21)
    RentalsResult findOpenRentalsOfCustomer(String customerID);   // rentals of the other registers: FOUND, NOT_FOUND or NOT_AVAILABLE (BR-12, UC5 5b)
    RentalResult findOpenRentalOfItem(String serialNumber);       // rental of another register: FOUND, NOT_FOUND or NOT_AVAILABLE (UC5 step 5)
    // Store manager functions marked * in §3.6; each answers NOT_AVAILABLE when the store database cannot be reached
    Page<StockDifference> listStockDifferences(int limit, int offset);         // FR-68, FR-19
    Page<SessionToReview> listSessionsToReview(int limit, int offset);         // FR-74
    StoreResult recordSessionReview(String sessionID, String managerID, String reason);   // FR-75, Contract 29
    Page<RentalConflict> listRentalConflicts(int limit, int offset);           // sync_conflict
    StoreResult resolveRentalConflict(String conflictID, String managerID, String reason);
    StoreResult changeSetting(String key, String value, String managerID);     // FR-69
    StoreResult writeCatalog(Catalog catalog, CatalogFileInfo file, String managerID); // IR-17: one store database transaction; the old catalog is kept on error;
                                                                               // managerID is null for the import at start-up
}
```

| Rule | Detail | Source |
| --- | --- | --- |
| One save | `saveCompleted` is one database transaction: everything or nothing, also after a power cut. | AD-05, DR-13, IR-07 |
| Background jobs | `AccountingSender` (application) calls `takeFirst`, `send`, then `delete` or `markFailedAttempt` (also for `REJECTED`, which keeps the record first and is shown in M-06), and waits 5 s, 10 s, 30 s, 60 s and then 5 min between attempts; it never skips a record. A background job of `StoreDatabaseSync` sends the waiting records (`sendWaitingRecordsUp`). Both are started by `SessionHandler` and never delay the start-up. The catalog import of the start-up is a third background job: `importCatalog` with the last imported file, `writeCatalog` when `VALID`, and the `EventLog` when `REJECTED` or `NOT_AVAILABLE`; the register gets the new catalog with the next `copyMasterDataDown`. | AD-06, AD-05, NFR-02, IR-17 |
| Store database down | The repositories keep working on the local copy. `putHold`, `findTransaction`, `findOpenRentalsOfCustomer` and `findOpenRentalOfItem` answer `NOT_AVAILABLE`; the operations marked * in §3.6 answer `409`, because the store database is the master of settings and catalog. | AD-05, DC-09 |
| Conflicts | Stock levels are changed by quantities and transactions never change, so the only conflict is two offline rentals of the same item; it is recorded in `sync_conflict` and the store manager sees and resolves it in M-01 (`listRentalConflicts`, `resolveRentalConflict`). | AD-05, SRS §5.3 Q6 |
| Employee list | `replaceAll` replaces the copy with the list of the HR System but keeps the local disable mark of a store manager, until the HR System also marks the employee inactive or a store manager enables the employee again. | FR-70, IR-09 |
| Retention | The register deletes acknowledged transactions after 90 days (AD-05), but never a transaction with a pending refund or an open authorization. | AD-05, FR-77, IR-15 |

`SessionRepository` and `SettingsRepository` are new in v0.5; they are proposed for the logical view (architecture.md §4.2, `technical.storage`).

## 5. Protocol with the stubs (DC-01)

In our project the four external systems are stubs: small HTTP servers that answer in JSON. Each adapter of section 4.1 calls its stub with these requests. The real systems would have their own protocol; only the adapter changes (DC-02, QA-14).

| Stub | Requests | Answer |
| --- | --- | --- |
| Payment Service | `POST /payments/authorizations` · `POST /payments/refunds` · `GET /payments/refunds/{transactionID}` · `POST /payments/voids` | `{"result", "authorizationCode", "paymentReference", "last4", "reason"}` |
| Tax Calculator | `POST /tax` | `{"lines": [{"itemID", "tax"}], "totalTax"}` |
| Accounting System | `POST /records` (a record with a transaction ID already received is acknowledged again, not stored twice) | `{"transactionID"}` |
| HR System | `POST /employees/check` · `GET /employees` | `{"valid", "active", "name", "role"}` · the employee list |

**Simulated answers.** Every stub has a mode for the tests and the demo, set with `PUT /stub/mode` `{"mode": "APPROVED" | "DECLINED" | "TIMEOUT" | "NOT_AVAILABLE"}` (the Payment Service has all four; the other stubs have `APPROVED`, `TIMEOUT` and `NOT_AVAILABLE`). In `TIMEOUT` the stub waits 15 seconds, longer than every timeout of the POS (10 s and 5 s). This covers the integration tests of SRS §4 (IR-01 to IR-10, IR-15 to IR-17).

## 6. Open points

1. ~~**Contracts of UC4 and UC5**~~ Closed (W09): contracts 16 to 28 are referenced in sections 3.1 and 3.5; contracts 4 and 9 also cover the rental return.
2. ~~**Card deposit of a rental**~~ Closed (SRS §5.3, question 2, W09): the deposit is charged and refunded, so `PaymentService` needs no `hold` or `release` operation.
3. ~~**Offline card authorization**~~ Closed (SRS §5.3, question 4, W09): not allowed, so `authorize` has no deferred result.
4. ~~**Timeouts and fallbacks**~~ Closed (AD-07, W09): the adapter applies the timeout and returns `NOT_AVAILABLE`; the handler decides the fallback.
5. ~~**Storage interfaces**~~ Closed (W10): §4.3, from AD-05 and AD-06.
6. ~~**Names of the store manager operations**~~ (ui_design.md §4.3, point 1): the names proposed by Josué are used in §3.6; `getAccountingQueueStatus` is new (FR-76).
7. ~~**`startUp()` and S-01**~~ (ui_design.md §4.3, point 2): no screen sends `startUp()`; S-01 shows its result (§3.9). To align ui_design.md §1.2 (Yasmine).
8. ~~**Status of the external systems**~~ (ui_design.md §1.6 point 1 and §4.3 point 3): `getSystemStatus()` (§3.8). The tax warning of S-08 and S-09 comes from the answers of `endRental()` and `recordCondition()`, which carry `taxToBeCorrected` like `endSale()`.
9. ~~**Accounting record refused**~~ Closed (W11, AD-06 by Borja) (review #60, finding 8): `REJECTED` keeps the order of the queue (IR-07), so a refused record blocks the others until it is fixed. AD-06 has only `RECEIVED` and `NOT_AVAILABLE`; to add `REJECTED` there (Borja).
10. **Repositories in the logical view**: `SessionRepository` and `SettingsRepository` (Haifa, architecture.md §4.2).
11. ~~**Catalog import at start-up**~~ Closed (W11): `CatalogFileInfo` in the `settings` of the data model v1.0 (Borja); the `EventLog` also logs rejected catalog files (architecture.md §4.2, Haifa).
