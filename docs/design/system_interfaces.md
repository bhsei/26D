# System Interfaces – NewEra POS

| | |
| --- | --- |
| **Maintainer** | Alfonso Pinto |
| **Version** | 0.2 (draft for review; UC4 and UC5 aligned with the SSDs v0.6) |
| **Last updated** | W09 |
| **Part of** | Increment 2 – Design (milestone W11); step 2 of the architecture process |
| **Inputs** | [System sequence diagrams](system_sequence_diagrams.md), [operation contracts](operation_contracts.md), [SRS](../requirements/SRS.md) §3.1 and §3.2, [architecture](architecture.md) AD-01 to AD-03, AD-10 |

> **Status: draft.** The operations of all five use cases have the names of the [system sequence diagrams](system_sequence_diagrams.md) v0.6. UC1, UC2 and UC3 also have their operation contracts; the contracts of UC4 and UC5 are being written (Josué, W09) and are referenced here when they are ready.
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
| Store manager approval | A request that needs a store manager carries `"manager": {"employeeID": "...", "pin": "..."}`. The PIN is checked like a login (HR System, or the local employee list when the HR System is not available) and is never logged or returned. | FR-06, FR-45, NFR-07 |
| Business results | An expected business result is an answer, not an error: a payment returns `200` with `"result": "APPROVED"`, `"DECLINED"` or `"NOT_AVAILABLE"`. | IR-02, FR-11 |
| Errors | `400` invalid input (for example a quantity that is not a whole number) · `403` store manager approval missing or wrong · `404` unknown item, sale, rental or customer · `409` not allowed in the current state (item not *Available*, sale not ended, customer with an overdue rental) · `422` against a business rule (cash amount lower than the total). The body is `{"error": "<code>", "message": "<text for the cashier>"}`. | FR-03, FR-18, FR-31, FR-33 |
| Idempotent retry | A payment or refund keeps the transaction ID of the first attempt. Sending the same request again (retry after *Card payment not available*) never charges the customer twice. | IR-02, FR-26 |
| Lists | Lists for the store manager are paginated: `?limit=20&offset=0`. | Course, step 2 |

## 3. System API (screens → POS application)

The column *Operation* gives the name of the system operation in the SSD; *Contract* the operation contract that describes its effect.

### 3.1 Cashier session – UC4 Start Up and close session

| Operation | Request | Answer | Requirements |
| --- | --- | --- | --- |
| `startUp()` | `POST /api/startup` (sent once by the POS program when it starts, before any session) | Register ID and the login screen; or an error and no login when the catalog or the stored data are not available (2a). Records waiting for the Accounting System are sent or stay in the queue; a session interrupted by a crash is ended | FR-41, FR-42, FR-48, FR-63, IR-15 |
| `logIn(employeeID, pin)` | `POST /api/sessions` `{"employeeID", "pin"}` | `201` session ID, cashier name, request for the opening cash; a warning when the local employee list was used (6c). `403` not found or not an active cashier (6a), or wrong PIN (6b) | FR-40, FR-43–FR-46, FR-49, IR-08, IR-09 |
| `enterOpeningCash(amount)` | `PUT /api/sessions/current/opening-cash` `{"amount"}` | Session open, main screen. `400` amount not valid (8a) | FR-47 |
| `closeSession()` | `POST /api/sessions/current/close` | The cash drawer opens for the closing count. `409` a sale, return or rental is still open (2a) | FR-60, IR-14 |
| `enterClosingCash(amount)` | `PUT /api/sessions/current/closing-cash` `{"amount"}` | Expected cash and difference. `400` amount not valid (3a) | FR-61, FR-62 |
| `confirmCloseSession()` | `POST /api/sessions/current/confirm-close` | Session closed, login screen; `"toReview": true` and a warning when the difference is larger than 5.00 (4b) | FR-62, FR-74, BR-17 |

### 3.2 Sale – UC1 Process Sale

| Operation | Request | Answer | Contract | Requirements |
| --- | --- | --- | --- | --- |
| `makeNewSale()` | `POST /api/sales` | `201` sale ID | 1 | FR-01 |
| `enterItem(itemID, quantity)` | `POST /api/sales/{saleID}/lines` `{"itemID", "quantity"}` | Line number, description, unit price, line subtotal, running subtotal. `404` unknown item · `400` quantity not valid · a warning when the stock level falls below zero | 2 | FR-02–FR-04, FR-18, FR-19 |
| `removeItem(lineNumber)` | `DELETE /api/sales/{saleID}/lines/{lineNumber}` | New running subtotal | – | FR-05 |
| `overridePrice(lineNumber, newPrice)` | `PUT /api/sales/{saleID}/lines/{lineNumber}/price` `{"newPrice", "manager"}` | New line subtotal and running subtotal. `403` not a store manager | – | FR-06, BR-04 |
| `endSale()` | `POST /api/sales/{saleID}/end` | Subtotal, tax, total; `"taxToBeCorrected": true` when the default tax rate was used. `409` sale without lines | 3 | FR-08, FR-18, IR-04, IR-05 |
| `makePayment(amount, tenderType)` | `POST /api/sales/{saleID}/payment` `{"tenderType": "CASH" \| "CREDIT_CARD" \| "CHECK", "amount"}` | `"result"`: `APPROVED` (with change due for cash, last 4 digits and authorization code for a card, receipt number) · `DECLINED` (reason) · `NOT_AVAILABLE` (retry allowed). `422` cash lower than the total | 4 | FR-09–FR-16, FR-71, IR-01, IR-02, IR-06, BR-18 |
| `cancelSale()` | `DELETE /api/sales/{saleID}` | Sale cancelled, no change in the stock levels. `409` already paid | – | FR-07 |
| `reprintReceipt()` | `POST /api/receipts/{receiptNumber}/print` | Printer status | – | FR-17, FR-29, IR-13 |

One payment per sale (BR-18): after `DECLINED` or `NOT_AVAILABLE` the screen sends a new `makePayment` with the same or another tender, and the sale keeps the same transaction ID.

### 3.3 Return – UC2 Handle Returns

| Operation | Request | Answer | Contract | Requirements |
| --- | --- | --- | --- | --- |
| `makeNewReturn()` | `POST /api/returns` | `201` return ID | 5 | FR-20 |
| `findSale(receiptNumber)` | `PUT /api/returns/{returnID}/sale` `{"receiptNumber"}` | Lines of the sale with the quantity bought and already returned, and the tender. `404` no sale · `409` older than 30 days | 6 | FR-21, BR-07 |
| `enterReturnItem(itemID, quantity, condition)` | `POST /api/returns/{returnID}/lines` `{"itemID", "quantity", "condition": "RESELLABLE" \| "NOT_RESELLABLE"}` | Return line, refund total, tender of the sale. `409` not in the sale or quantity too large | 7 | FR-22, FR-23 |
| `removeReturnItem(lineNumber)` | `DELETE /api/returns/{returnID}/lines/{lineNumber}` | New refund total | – | FR-22 |
| `confirmReturn()` | `POST /api/returns/{returnID}/confirm` | `"refund"`: `CASH_PAID` (drawer opens) · `CARD_REFUNDED` · `NEEDS_APPROVAL` (card declined or check) · `PENDING` (no answer from the Payment Service); receipt number when the return is complete | 8 | FR-25–FR-29, IR-03, BR-08 |
| `approveCashRefund(managerID, reason)` | `POST /api/returns/{returnID}/cash-approval` `{"reason", "manager"}` | Refund paid in cash, receipt number. `403` not a store manager | 9 | FR-25 |
| `checkRefundStatus()` | `GET /api/returns/{returnID}/refund` | `CARD_REFUNDED`, `FAILED` (then `NEEDS_APPROVAL`) or still `PENDING` | – | FR-26 |
| `cancelReturn()` | `DELETE /api/returns/{returnID}` | Return cancelled, nothing changed | – | FR-24 |

### 3.4 Rental – UC3 Process Rental

| Operation | Request | Answer | Contract | Requirements |
| --- | --- | --- | --- | --- |
| `makeNewRental()` | `POST /api/rentals` | `201` rental ID | 10 | FR-30 |
| `enterCustomerID(customerID)` | `PUT /api/rentals/{rentalID}/customer` `{"customerID"}` | Customer accepted. `404` unknown ID · `409` overdue rental | 11 | FR-31, BR-12 |
| `registerCustomer()` | `POST /api/rentals/{rentalID}/customer` | `201` new customer ID, linked to the rental (no other personal data) | 12 | FR-31, DR-18 |
| `enterRentalItem(serialNumber)` | `POST /api/rentals/{rentalID}/lines` `{"serialNumber"}` | Description, item status, rental fee per day, deposit. `404` unknown serial number · `409` item not *Available* | 13 | FR-32, FR-33, BR-11 |
| `selectRentalPeriod(days)` | `PUT /api/rentals/{rentalID}/lines/{lineNumber}/period` `{"days": 1 \| 3 \| 7}` | Rental fee, due date, deposit. `400` other period | 14 | FR-34, BR-15 |
| `endRental()` | `POST /api/rentals/{rentalID}/end` | Rental fee, tax, deposit (not taxed), total, due date | 15 | FR-35, BR-10 |
| `makePayment(amount, tenderType)` | `POST /api/rentals/{rentalID}/payment` (same body and answer as for a sale) | As in UC1; after `APPROVED` the item becomes *Rented* | 4 | FR-37–FR-39, FR-64–FR-67, BR-18 |
| `cancelRental()` | `DELETE /api/rentals/{rentalID}` | Rental cancelled, item status unchanged | – | FR-36 |

### 3.5 Rental return – UC5 Return Rental

| Operation | Request | Answer | Requirements |
| --- | --- | --- | --- |
| `makeNewRentalReturn()` | `POST /api/rental-returns` | `201` rental return ID | FR-50 |
| `findRental(code)` | `PUT /api/rental-returns/{id}/rental` `{"code"}` (serial number of the item or rental receipt number) | Customer, item, rental date, due date, deposit, tender. `404` no open rental for this item (5a) | FR-51 |
| `findRentalsOfCustomer(customerID)` | `GET /api/rentals?customerID=...&open=true` | Open rentals of the customer (5b) | FR-51 |
| `selectRental(rentalID)` | `PUT /api/rental-returns/{id}/rental` `{"rentalID"}` | As `findRental` | FR-51 |
| `recordCondition(condition, damageNote)` | `PUT /api/rental-returns/{id}/condition` `{"condition": "UNDAMAGED" \| "DAMAGED", "damageNote"}` | On time: full deposit as refund. Late: days late, late fee, its tax and the refund (7a), or the amount still due when the late fee is larger than the deposit (7b). Damaged: request for a store manager (6a) | FR-52–FR-54, FR-73, BR-16 |
| `confirmDamage(managerID, pin)` | `POST /api/rental-returns/{id}/damage-confirmation` `{"manager"}` | Damage confirmed, refund zero. `403` not a store manager | FR-52, FR-72 |
| `makePayment(amount, tenderType)` | `POST /api/rental-returns/{id}/payment` (same body and answer as for a sale; only in 7b) | As in UC1 | FR-73, BR-18 |
| `confirmRentalReturn()` | `POST /api/rental-returns/{id}/confirm` | As `confirmReturn` of UC2 (`CASH_PAID`, `CARD_REFUNDED`, `NEEDS_APPROVAL`, `PENDING`); item becomes *Available* or *Under maintenance*; rental return receipt | FR-55, FR-57–FR-59, IR-03 |
| `approveCashRefund(managerID, reason)` | `POST /api/rental-returns/{id}/cash-approval` `{"reason", "manager"}` | As in UC2 (same operation, Contract 9) | FR-55 |
| *refund status* | `GET /api/rental-returns/{id}/refund` | As in UC2 | FR-55 |
| `cancelRentalReturn()` | `DELETE /api/rental-returns/{id}` | Rental and item status unchanged (8a) | FR-56 |

### 3.6 Store manager functions

| Operation | Request | Answer | Requirements |
| --- | --- | --- | --- |
| Reorder and stock-check list | `GET /api/products/flagged?limit=20&offset=0` | Products flagged for reorder or stock check, with stock level and threshold | FR-68, BR-09 |
| Change the default tax rate | `PUT /api/settings/default-tax-rate` `{"rate", "manager"}` | New rate, who changed it and when | FR-69, IR-05 |
| Disable an employee in the local list | `PUT /api/employees/{employeeID}/local-status` `{"active": false, "manager"}` | Employee disabled, who did it and when | FR-70, IR-09 |
| `listSessionsToReview()` | `GET /api/sessions?toReview=true&limit=20&offset=0` | Sessions with a cash difference larger than 5.00 | FR-74 |
| `confirmSessionReview(sessionID, reason)` | `POST /api/sessions/{sessionID}/review` `{"reason", "manager"}` | Review recorded | FR-75 |
| Import the catalog | `POST /api/catalog/imports` (file + `"manager"`) | Number of products imported, or the fields that are missing or not valid (the previous catalog is kept) | IR-17 |

## 4. Interfaces of the technical services (application layer → adapters)

The application layer only knows these interfaces (AD-01, DC-02). Each one has a real implementation (out of scope in our project), a stub implementation for the tests and the demo (DC-01), and the timeout of SRS §3.1.3. Where the timeout and the fallback are handled (in each adapter or in a common component) is decided in AD-07 (Haifa). The signatures are in Java (AD-03); the classes of the parameters are listed under each interface.

### 4.1 External systems

```java
public interface PaymentService {                                   // timeout 10 s (IR-02)
    PaymentResult authorize(PaymentRequest request);                // IR-01, IR-16
    PaymentResult refund(RefundRequest request);                    // IR-03
    PaymentResult refundStatus(String transactionID);               // FR-26, FR-55
    PaymentResult voidAuthorization(String paymentReference);       // IR-15
}

public interface TaxCalculator {                                    // timeout 5 s (IR-05)
    TaxResult calculateTax(TaxRequest request);                     // IR-04
}

public interface AccountingSystem {                                 // called only from the local queue (IR-06, IR-07)
    Acknowledgement send(AccountingRecord record);
}

public interface HRSystem {                                         // timeout 5 s (IR-09)
    EmployeeCheck checkEmployee(String employeeID, String pin);     // IR-08
    List<EmployeeEntry> employeeList();                             // IR-09, FR-46
}

public interface CatalogSource {
    CatalogImport importCatalog(Path exportFile);                   // IR-17
}
```

| Class | Content |
| --- | --- |
| `PaymentRequest` | transaction ID (the same in every retry), register ID, amount, tender (`CREDIT_CARD` or `CHECK`), card token from the card reader (never stored) |
| `RefundRequest` | transaction ID of the refund, payment reference of the original payment (DR-19), amount; no card number |
| `PaymentResult` | `APPROVED`, `DECLINED` or `NOT_AVAILABLE` (timeout, error or connection lost); authorization code, payment reference, last 4 digits, reason |
| `TaxRequest` / `TaxResult` | transaction ID and type, lines (item ID, quantity, line subtotal), date / tax per line and total, or `NOT_AVAILABLE` |
| `AccountingRecord` | the fields of the [external interfaces](../requirements/external_interfaces.md) §3.3, with the transaction ID and the mark *tax to be corrected* |
| `Acknowledgement` | the transaction ID received; the queue removes the record only after it (FR-42) |
| `EmployeeCheck` / `EmployeeEntry` | valid, active, name, role (*cashier* or *store manager*) / employee ID, name, role, active, PIN as a salted hash only (DR-11) |
| `CatalogImport` | products imported, or the list of rejected fields |

### 4.2 Devices (AD-10)

```java
public interface CardReader {
    CardToken read();                       // IR-12: token, last 4 digits, expiry; passed only to PaymentService
}

public interface ReceiptPrinter {
    PrinterStatus print(Receipt receipt);   // IR-13: READY, NO_PAPER or ERROR
}

public interface CashDrawer {
    void open(DrawerReason reason, String employeeID);   // IR-14: CASH_PAYMENT, CASH_REFUND, OPENING_COUNT, CLOSING_COUNT; every opening is logged
}
```

The barcode scanner works as a keyboard and has no interface (AD-10, IR-11).

### 4.3 Storage

The local copy of the store data, the queue of accounting records and the local employee list are reached through repositories of the technical services layer (for example `TransactionRepository`, `ItemRepository`, `AccountingQueue`, `EmployeeList`). Their operations depend on the database and on the synchronisation with the store database, which are decided in AD-05 and AD-06 (W10, Borja); they are added to this document then.

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

1. **Contracts of UC4 and UC5** (Josué, W09): referenced in sections 3.1 and 3.5 when they are written. Contract 4 (`makePayment`) must also name the `RentalReturn`, and Contract 9 (`approveCashRefund`) must also cover a rental return.
2. **Card deposit of a rental** (SRS §5.3, question 2, Haifa): if the deposit is only held, `PaymentService` needs `hold` and `release` operations.
3. **Offline card authorization** (SRS §5.3, question 4, Haifa): if it is allowed for small amounts, `authorize` gets a deferred result.
4. **Timeouts and fallbacks** in the adapters or in a common component: AD-07 (Haifa).
5. **Storage interfaces**: after AD-05 and AD-06 (W10).
