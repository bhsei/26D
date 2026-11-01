# System Sequence Diagrams – NewEra POS

| | |
| --- | --- |
| **Maintainer** | Borja Nicolás |
| **Version** | 0.3 (draft for review; adds UC2 and UC3) |
| **Last updated** | W08 |
| **Part of** | Increment 2 (Design); input to the [operation contracts](operation_contracts.md) |

## 1. Purpose

A system sequence diagram (SSD) shows, for one use case scenario, the events that the actor sends to the system and the answers of the system, with the system treated as a **black box**. Each event is a **system operation**; the [operation contracts](operation_contracts.md) then describe what each operation changes in the [domain model](domain_model.md). The SSDs are drawn from the fully dressed use cases of the [SRS](../requirements/SRS.md). This version contains UC1 (W07) and UC2 and UC3 (W08); UC4 and UC5 follow in the next iterations.

## 2. UC1 Process Sale

![System sequence diagram of UC1 Process Sale](../../assets/ssd_uc1.png)

*Editable source: [`assets/ssd_uc1.puml`](../../assets/ssd_uc1.puml) (PlantUML).*

The diagram shows the **main success scenario** (UC1 steps 1–13), the three payment variants of step 9 and the retry of the card payment when the Payment Service does not answer (extension 9b2b). The only actor is the Cashier: the Customer is a stakeholder who acts through the Cashier (SRS, section 1.3.1). The external systems (Payment Service, Tax Calculator, Accounting System) are not drawn, because they are inside the black box from the point of view of the Cashier; a note shows where they are used.

### 2.1 System operations

| Operation | UC1 steps | Returns to the Cashier | Contract |
| --- | --- | --- | --- |
| `makeNewSale()` | 2–3 | Confirmation that a new sale is open | Contract 1 |
| `enterItem(itemID, quantity)` | 4–5 (repeated) | Product description, unit price, line subtotal and running subtotal | Contract 2 |
| `endSale()` | 6–7 | Subtotal, tax and total | Contract 3 |
| `makePayment(amount, tenderType)` | 9–12 | Cash: change due. Credit card or check: approval. In all cases the receipt | Contract 4 |

The names and parameters are those of the contracts. The only difference is the type of `tenderType`: the diagram uses the values `Cash`, `CreditCard` and `Check` (the `TenderType` of the domain model) instead of a free `String`.

### 2.2 What is not in the diagram

The extensions of UC1 that are not part of the main scenario are mentioned in the notes of the diagram but have no system operation of their own yet and no contract. They are candidates for the next iteration:

| Extension | Possible operation |
| --- | --- |
| 4c Remove a line item | `removeItem(lineNumber)` |
| 6a Complete a sale with no line items | none (the System refuses `endSale()`; see the precondition of Contract 3) |
| 4d Price override by the store manager | `overridePrice(lineNumber, newPrice, managerID)` |
| \*b Cancel the sale at any time before payment | `cancelSale()` |
| 12a Reprint the receipt (FR-17) | `reprintReceipt()` |

### 2.3 Open points

1. **Payment declined (9b2a).** The Cashier asks for another tender and sends a new `makePayment` with it (note in the diagram). The retry of the same card payment after "Card payment not available" (9b2b) is the loop in the card variant.
2. **Several tenders for one sale.** The SRS working assumption is one tender per transaction (SRS section 5.3, question 3), so `makePayment` is called once per successful payment. If the team changes this, the diagram needs a loop around the payment section.
3. **Tax Calculator failure (7a).** The contract of `endSale()` assumes the tax is the value returned by the Tax Calculator; the default tax rate and the flag *tax to be corrected* are not in the contract.

## 3. UC2 Handle Returns

![System sequence diagram of UC2 Handle Returns](../../assets/ssd_uc2.png)

*Editable source: [`assets/ssd_uc2.puml`](../../assets/ssd_uc2.puml) (PlantUML).*

The diagram shows the **main success scenario** (UC2 steps 1–12) and the three refund variants of step 9, which depend on the tender of the original sale (BR-08). As in UC1, the Cashier is the only actor and the external systems are inside the black box.

### 3.1 System operations

| Operation | UC2 steps | Returns to the Cashier | Contract |
| --- | --- | --- | --- |
| `makeNewReturn()` | 2–3 | Confirmation that a new return is open | to be written (C3) |
| `findSale(receiptNumber)` | 4–5 | The sale line items with the quantity bought and the quantity already returned; refused if the sale is outside the refund period (BR-07) | to be written (C3) |
| `enterReturnItem(itemID, quantity)` | 6–7 (repeated) | The return line item, the refund total (price plus tax from the Tax Calculator) and the tender of the original sale | to be written (C3) |
| `confirmReturn()` | 8–11 | Cash: refund due and receipt. Credit card: card refund through the Payment Service, or, if it is declined or does not answer (9b2a), the refund in cash. Check: refund in cash. In all cases the return receipt | to be written (C3) |

The tender is not a parameter of `confirmReturn()`: the System takes it from the original sale (BR-08).

### 3.2 What is not in the diagram

| Extension | Possible operation |
| --- | --- |
| 6b Remove a returned line item before confirming | `removeReturnItem(lineNumber)` |
| 8a Cancel the return before confirming | `cancelReturn()` |

### 3.3 Open points

1. **`enterReturnItem` and the tax.** In the SRS (step 7) the System gets the tax and shows the refund total after each selection. If the team decides that the tax is calculated once, when the Cashier finishes selecting, a separate operation `endReturn()` is needed, as `endSale()` in UC1.
2. **No receipt (4b).** The SRS has no operation for a return without receipt; if the store manager may approve exceptions (UC2 open issue), a new operation or a parameter is needed.
3. **Card refund when the card is not present** (UC2 open issue) changes the card variant of `confirmReturn()`.

## 4. UC3 Process Rental

![System sequence diagram of UC3 Process Rental](../../assets/ssd_uc3.png)

*Editable source: [`assets/ssd_uc3.puml`](../../assets/ssd_uc3.puml) (PlantUML).*

The diagram shows the **main success scenario** (UC3 steps 1–17), the identification of the customer (steps 4–5 with extensions 4a and 5a) and the three payment variants of step 13, with the retry of the card payment (13b2b).

### 4.1 System operations

| Operation | UC3 steps | Returns to the Cashier | Contract |
| --- | --- | --- | --- |
| `makeNewRental()` | 2–3 | Confirmation that a new rental is open | to be written (C3) |
| `enterCustomerID(customerID)` | 4–5 | Customer accepted; or "Customer ID not found" (4a); or the overdue message and no rental (5a, BR-12) | to be written (C3) |
| `registerCustomer()` | 4a | A new customer ID (stored with no other personal data, DR-18) | to be written (C3) |
| `enterRentalItem(serialNumber)` | 6–7 | Description, item status, rental fee per day and deposit; rejected if the serial number is unknown (7a) or the item is not *Available* (7b, BR-11) | to be written (C3) |
| `selectRentalPeriod(days)` | 8–9 | The rental line item: rental fee, due date and deposit (can be repeated, 8a) | to be written (C3) |
| `endRental()` | 10–11 | Rental fee, tax of the rental fee, deposit, total and due date | to be written (C3) |
| `makePayment(amount, tenderType)` | 13–16 | Cash: change due. Credit card or check: approval. In all cases the rental receipt | Contract 4 of UC1 must also cover a rental (C3) |

`makePayment` is the **same operation as in UC1**. It applies to the transaction that is open (a sale or a rental), so Josué's contract needs to say that the `Payment` is associated with the current `Sale` **or** `Rental`, and that after a rental the item status becomes *Rented*.

### 4.2 What is not in the diagram

| Extension | Possible operation |
| --- | --- |
| 10–13a Cancel the rental before paying | `cancelRental()` |

### 4.3 Open points

1. **Several items per rental** (UC3 open issue). The diagram shows one item: if a rental can have several, `enterRentalItem` and `selectRentalPeriod` go in a loop, as `enterItem` in UC1, and the domain model already allows 1..\* rental line items.
2. **Who may register a customer** (UC3 open issue): `registerCustomer()` is a system operation of the Cashier for now.
3. **Card payment of the deposit** (UC3 open issue): if the deposit is only held, the card variant of `makePayment` changes.

## 5. Summary of the system operations

| Use case | Operations |
| --- | --- |
| UC1 Process Sale | `makeNewSale`, `enterItem`, `endSale`, `makePayment` (contracts written) |
| UC2 Handle Returns | `makeNewReturn`, `findSale`, `enterReturnItem`, `confirmReturn` |
| UC3 Process Rental | `makeNewRental`, `enterCustomerID`, `registerCustomer`, `enterRentalItem`, `selectRentalPeriod`, `endRental`, `makePayment` (shared with UC1) |
