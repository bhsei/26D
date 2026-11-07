# Domain Model – NewEra POS

| | |
| --- | --- |
| **Maintainer** | Borja Nicolás |
| **Version** | 0.4 (draft for review; one tender for each sale or rental, BR-18) |
| **Last updated** | W09 |
| **Part of** | Increment 2 (Design), input to the SRS section 3.5, the [system sequence diagram](system_sequence_diagrams.md) and the [operation contracts](operation_contracts.md) |

## 1. Purpose

The domain model shows the **concepts of the store's world** that NewEra POS must know about, their attributes and how they are related. It is a conceptual model: it describes things of the domain (a sale, a product description, a rental), not software classes, and it has no operations. It is drawn from the [fully dressed use cases](../requirements/SRS.md) UC1–UC5, the [glossary](../requirements/glossary.md) and the business rules BR-01 to BR-14, and it will be the starting point of the design class diagram in W11.

Names follow the glossary. The names used in the [operation contracts](operation_contracts.md) of UC1 (Sale, SaleLineItem, ProductDescription, CashierSession, Payment, AccountingRecord and their attributes) are kept exactly, so that the contracts do not need to change.

## 2. Diagram

![NewEra POS domain model](../../assets/domain_model.png)

*Editable source: [`assets/domain_model.puml`](../../assets/domain_model.puml) (PlantUML). A name starting with `/` is a derived attribute.*

## 3. Concepts

| Concept | Meaning | Main attributes | Source |
| --- | --- | --- | --- |
| **Store** | The store that owns the registers, the catalog and the employees. | `name`, `defaultTaxRate` | BR-02 |
| **Register** | A physical POS terminal. | `registerID` | UC4 |
| **Employee** | A person of the HR System. The role decides what he or she may do. A cashier and a store manager are employees with a different `role`. | `employeeID`, `name`, `role`, `isActive` | UC4, BR-04, BR-13 |
| **CashierSession** | Period in which one employee works at one register; every transaction belongs to a session. | `startTime`, `endTime`, `openingCash` | UC4, BR-13 |
| **ProductCatalog** | All product descriptions of the store. | – | glossary |
| **ProductDescription** | A product type: what the scanned item identifier refers to. It holds the stock level; a rentable product also has its fee per day and deposit. | `itemID`, `name`, `price`, `stockLevel`, `reorderThreshold`, `/needsReorder`, `isRentable`, `rentalFeePerDay`, `deposit` | UC1, BR-03, BR-09, UC3 |
| **Item** | One physical unit of a rentable product, identified by its serial number. Items that are only sold are not modelled one by one: they are counted by `stockLevel`. | `serialNumber`, `status` | UC3, BR-11 |
| **Customer** | Person who rents (stakeholder, not an actor). Only the data needed to find open and overdue rentals is kept. | `customerID` | UC3, UC5, BR-12 |
| **Transaction** (abstract) | General term for a sale, return, rental or rental return. | `receiptNumber`, `dateTime`, `subtotal`, `tax`, `total`, `isComplete`, `taxToBeCorrected` | glossary, BR-01, BR-02 |
| **Sale** | The customer buys items (UC1). | `isPaid` | UC1 |
| **SaleLineItem** | One line of a sale. The price is copied from the product description when the item is entered, so a later price change does not change a completed sale. | `quantity`, `unitPrice`, `/lineSubtotal` | BR-03, BR-04 |
| **Return** | The customer brings back items of an earlier sale (UC2). | `refundTotal` | UC2, BR-07, BR-08 |
| **ReturnLineItem** | One returned line of the original sale. | `quantity`, `refundAmount` | UC2 |
| **Rental** | The customer takes one or more items for a period (UC3). | `rentalDate`, `/depositTotal` | UC3, BR-10 |
| **RentalLineItem** | One rented item with its period, fee, due date and deposit. | `rentalPeriodDays`, `rentalFee`, `dueDate`, `deposit`, `/isOverdue` | UC3, BR-12 |
| **RentalReturn** | The item of one rental line comes back (UC5), with its condition, the late fee and the amount kept from the deposit. | `returnDate`, `condition`, `damageNote`, `daysLate`, `lateFee`, `lateFeeTax`, `amountKept`, `refundTotal` | UC5, BR-10, BR-11 |
| **Payment** (abstract) | Money received in one tender: **CashPayment** (`amountTendered`, `changeDue`, BR-06), **CreditCardPayment** (last 4 digits, authorization code and payment reference, BR-05, DR-19) and **CheckPayment** (*Could*, authorized by the Payment Service). | `amount`, `dateTime` | UC1, UC3, BR-05, BR-06 |
| **Refund** | Money paid back for a return or a rental return, in the tender of the original payment. | `amount`, `tender`, `reference` | BR-08, UC5 |
| **Receipt** | Printed record of a transaction; it can be printed again. | `number`, `printedAt` | FR-16, FR-17 |
| **AccountingRecord** | The record of a completed transaction sent, or queued to be sent, to the Accounting System. The transaction ID lets the Accounting System ignore a record that arrives twice. | `transactionID`, `status`, `queuedAt`, `sentAt` | BR-14, IR-06, IR-07 |

**Enumeration types** (not drawn): `ItemStatus` = Available, Rented, UnderMaintenance (*Reserved* was removed in W08, review #50, B-D03: no use case reserves an item); `ItemCondition` = Undamaged, Damaged; `TenderType` = Cash, CreditCard, Check; `EmployeeRole` = Cashier, StoreManager; `RecordStatus` = Queued, Sent.

The four external systems (Payment Service, Tax Calculator, Accounting System, HR System) are actors and are **not** part of the domain model. Their data appears here only as attributes (`authorizationCode`, `tax`, `AccountingRecord`, `Employee`).

## 4. Associations and multiplicities

| Association | Multiplicity | Why |
| --- | --- | --- |
| Store – Register | 1 – 1..* | A store has one or more registers. |
| Store – ProductCatalog, Store – Employee | 1 – 1, 1 – * | One catalog; the store employs many people. |
| Register – CashierSession | 1 – * | A register has many sessions, one after the other (UC4 precondition: only one open at a time). |
| Employee – CashierSession | 1 – * | A session belongs to exactly one cashier (BR-13). |
| CashierSession – Transaction | 1 – * | Every transaction is made inside one session (FR-01, FR-30, FR-50). |
| ProductCatalog – ProductDescription | 1 – * | The catalog contains the descriptions. |
| ProductDescription – Item | 1 – * | Many units (serial numbers) share one description. |
| Sale – SaleLineItem | 1 – 1..* | A sale has at least one line (contract of endSale). |
| SaleLineItem – ProductDescription | * – 1 | Each line records the sale of one product. |
| SaleLineItem – Employee | * – 0..1 | The store manager who approved a price override (BR-04, FR-06). |
| Return – Sale | * – 1 | A return refers to the original sale (BR-07). |
| Return – ReturnLineItem – SaleLineItem | 1 – 1..*, * – 1 | Each returned line refers to a line of the original sale. |
| Rental – Customer | * – 1 | Needed to find overdue rentals (BR-12). |
| Rental – RentalLineItem | 1 – 1..* | See open question 3. |
| RentalLineItem – Item | * – 1 | An item can be rented many times, one after the other (BR-11). |
| RentalReturn – RentalLineItem | 0..1 – 1 | A rented line is closed by at most one return. |
| Transaction – Payment | 1 – 0..1 | One tender for each sale or rental (BR-18, decided in W09); until it is paid, the transaction has no payment. A return has no payment but a refund. A rental return has one only when the customer pays the amount still due (UC5 ext. 7b). |
| Return / RentalReturn – Refund | 1 – 0..1 | Not every rental return has a refund (damaged item). |
| Transaction – Receipt | 1 – * | One receipt, reprints possible (FR-17). |
| Transaction – AccountingRecord | 1 – 0..1 | Created when the transaction is completed (BR-14). |

## 5. Alignment with the operation contracts and the SRS

- **Contracts of UC1** (Josué): every class and attribute they use exists with the same name: `Sale.isComplete`, `subtotal`, `tax`, `total` (inherited from `Transaction`), `Sale.isPaid`, `SaleLineItem.quantity`, `Payment.amount`, `ProductDescription.stockLevel`. `makePayment(amount, tenderType)` creates a `CashPayment`, `CreditCardPayment` or `CheckPayment` according to the tender type; I propose the contract uses `TenderType` instead of `String`.
- **SRS**: the glossary terms *customer ID*, *item list*, *rental receipt* and *item condition* are missing (see review of the SRS); here they are `Customer.customerID`, the set of `Item`, `Receipt` of a rental and `RentalReturn.condition`. The SRS section 3.5 is derived from this model.

## 6. Decisions and open questions

**Changes in version 0.2 (W08, review #50).** `ItemStatus` no longer has *Reserved*, and an item that is under maintenance becomes *Available* again when a store manager confirms it (SRS DR-02; B-D03). `CreditCardPayment` has the new attribute `paymentReference` (the transaction ID and reference number that the Payment Service returns), which a card refund needs (SRS DR-19; B-D05). The data of the store is kept in one store database shared by all registers, with a local copy and queue in each register (SRS DC-09; B-D01); this is a design decision and does not change the concepts. The state diagrams of the item status and of the rental are in section 7 (W09).

1. **Transaction as a generalization.** Sale, Return, Rental and RentalReturn share the same attributes (date, totals, session, payments, receipt, accounting record), so they are subclasses of the abstract `Transaction`, the term the glossary already uses.
2. **Items are modelled only when they are rented.** A sold product is only a stock level; a rentable unit needs an identity because it has a status (BR-11). Whether rented items count in the stock level for BR-09 is still open (glossary, open question 5).
3. **Several items per rental?** I use 1..* rental line items (as the NextGen case does). The SRS lists it as open; if the answer is "one item", the multiplicity changes to 1.
4. **Customer data.** Only `customerID` is shown. How customers are registered and which personal data is stored (NFR-12, data protection) is open (UC3 open issue).
5. **Late fee and deposit.** The attributes `lateFee`, `lateFeeTax` and `amountKept` of `RentalReturn` follow the working assumptions of UC5 (late fee taxed, deposit not taxed); they change if the team decides otherwise.
6. **One tender (decided in W09).** BR-18: a sale or a rental is paid with one tender, so the multiplicity Transaction–Payment is 1 – 0..1 and not 1 – *. A customer who cannot pay the whole total with one tender pays it with another one.
7. **Opening cash and logout.** `endTime` of the session is filled only if the team adds a way to end the session (see the review of the SRS: no function ends a cashier session).

## 7. State diagrams (W09)

The state diagrams show how the **status of an item** and the **life of a rental** change, and which use case or requirement causes each change. They answer the review findings B-D03 and B-D19 (review #50) and use the names of this model (`Item.status`, `Rental`, `RentalReturn`). Their source is the SRS: DR-02, DR-06, DR-07, UC3, UC5 and the business rules BR-11, BR-12, BR-15 and BR-16.

### 7.1 Status of an item

![State diagram of the status of a rentable item](../../assets/state_item_status.png)

*Editable source: [`assets/state_item_status.puml`](../../assets/state_item_status.puml) (PlantUML).*

| Transition | Caused by | Requirement |
| --- | --- | --- |
| Available → Rented | A rental is paid and saved (UC3 step 15) | FR-38, BR-11 |
| Rented → Available | A rental return of an undamaged item is confirmed (UC5 step 10) | FR-57 |
| Rented → Under maintenance | A rental return of a damaged item is confirmed, with the damage confirmed by a store manager (UC5 ext. 6a) | FR-52, FR-57 |
| Under maintenance → Available | A store manager confirms that the item can be rented again | DR-02 |

### 7.2 Life of a rental

![State diagram of a rental](../../assets/state_rental.png)

*Editable source: [`assets/state_rental.puml`](../../assets/state_rental.puml) (PlantUML).*

A rental is **not saved** while it is being created: it exists from the payment (UC3 step 15). *Overdue* is **calculated** from the due date and the current date and is not stored (DR-06); a customer with an overdue rental cannot start a new rental (BR-12). A rental return that is cancelled or interrupted by a failure leaves the rental as it was (UC5 ext. 8a and \*a). When the Payment Service does not answer and the refund status is not known, the rental return is saved and the rental is closed with the refund *pending* (UC5 ext. 9b2b).

### 7.3 Gaps found in the SRS

Drawing the diagrams showed three points that the SRS does not cover yet. They are proposed to the owners of the SRS for version 1.2; until then the diagrams say so in a note.

1. **Repair of an item.** DR-02 says that a store manager confirms the change from *Under maintenance* to *Available*, but no functional requirement describes this function.
2. **Pending refund.** UC5 ext. 9b2b says that a store manager completes a pending refund later, and FR-26 and FR-55 keep the refund pending, but no functional requirement describes how a store manager completes it (UC2 and UC5).
3. **Item that is never returned.** The SRS keeps it as an open point (section 3.5): the item stays *Rented* and the rental stays *Overdue*, so the customer is blocked (BR-12) and the deposit is not settled. The status transitions of a lost or stolen item depend on the answer of the store manager (interview before W11).
