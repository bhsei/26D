# Operation Contracts - NewEra POS

An operation contract describes the behavior of a system operation. Postconditions strictly describe state changes (instances created/deleted, associations formed/broken, attributes modified). 
*Note: Class names match Borja's `domain_model.md`.*

---

## UC1 Process Sale

### Contract 1: makeNewSale
**Operation:** makeNewSale()
**Cross References:** Use Case: UC1 Process Sale (Step 2)
**Preconditions:** 
- A `CashierSession` is open.
**Postconditions:** 
- A new `Sale` instance was created.
- The `Sale` was associated with the current `CashierSession`.
- `Sale.isComplete` was set to false.
- `Sale.subtotal` was set to 0.
**Responsibilities:** System creates a new Sale linked to the active session.

### Contract 2: enterItem
**Operation:** enterItem(itemID: String, quantity: Integer)
**Cross References:** Use Case: UC1 Process Sale (Steps 4-5)
**Preconditions:** 
- A `Sale` is active.
- The `itemID` corresponds to a valid `ProductDescription` in the catalog.
**Postconditions:** 
- A new `SaleLineItem` instance was created.
- The `SaleLineItem` was associated with the current `Sale`.
- The `SaleLineItem` was associated with a `ProductDescription`, based on `itemID` match.
- `SaleLineItem.quantity` was set to the input quantity.
- `Sale.subtotal` was updated.
**Responsibilities:** System records the item and updates the running total.

### Contract 3: endSale
**Operation:** endSale()
**Cross References:** Use Case: UC1 Process Sale (Steps 6-7)
**Preconditions:** 
- A `Sale` is active.
- The `Sale` has at least one `SaleLineItem`.
**Postconditions:** 
- `Sale.isComplete` was set to true.
- `Sale.tax` was set to the value returned by the Tax Calculator.
- `Sale.total` was updated (subtotal + tax).
**Responsibilities:** System finalizes the sale for payment and calculates the final total.

### Contract 4: makePayment (Shared with UC3)
**Operation:** makePayment(amount: Money, tenderType: TenderType)
**Cross References:** Use Case: UC1 Process Sale (Steps 9-11), UC3 Process Rental (Steps 13-16)
**Preconditions:** 
- The current `Sale` or `Rental` is complete (`isComplete` = true).
- The `amount` tendered is valid for the `tenderType`.
**Postconditions:**
- A new `Payment` instance was created.
- The `Payment` was associated with the current `Sale` **or** `Rental`.
- `Payment.amount` was set to the input amount.
- `Sale.isPaid` (or `Rental.isPaid`) was set to true.
- If a `Sale`: `ProductDescription.stockLevel` was reduced by the quantity sold.
- If a `Rental`: The associated `Item.status` was changed to `Rented`.
- An `AccountingRecord` instance was created and queued.
**Responsibilities:** System processes the payment, marks the transaction as paid, updates stock or item status, and notifies the accounting system.

---

## UC2 Handle Returns

### Contract 5: makeNewReturn
**Operation:** makeNewReturn()
**Cross References:** Use Case: UC2 Handle Returns (Step 2)
**Preconditions:** 
- A `CashierSession` is open.
**Postconditions:** 
- A new `Return` instance was created.
- The `Return` was associated with the current `CashierSession`.
- `Return.isComplete` was set to false.
**Responsibilities:** System creates a new Return transaction linked to the active session.

### Contract 6: findSale
**Operation:** findSale(receiptNumber: String)
**Cross References:** Use Case: UC2 Handle Returns (Steps 4-5)
**Preconditions:** 
- A `Return` is active.
- A `Sale` with the given `receiptNumber` exists and is within the refund period.
**Postconditions:** 
- The `Sale` instance was found and associated with the current `Return`.
**Responsibilities:** System retrieves the original sale and links it to the return.

### Contract 7: enterReturnItem
**Operation:** enterReturnItem(itemID: String, quantity: Integer, condition: ItemCondition)
**Cross References:** Use Case: UC2 Handle Returns (Steps 6-7)
**Preconditions:** 
- A `Return` is active and associated with a `Sale`.
- The item exists in the original sale and `quantity` <= quantity available to return.
**Postconditions:** 
- A new `ReturnLineItem` instance was created.
- The `ReturnLineItem` was associated with the `Return`.
- The `ReturnLineItem` was associated with the corresponding `SaleLineItem` from the original sale.
- `ReturnLineItem.quantity` and `ReturnLineItem.condition` were set.
- `Return.refundTotal` was updated (price paid + tax charged in original sale).
**Responsibilities:** System records the returned item, its condition, and updates the refund total.

### Contract 8: confirmReturn
**Operation:** confirmReturn()
**Cross References:** Use Case: UC2 Handle Returns (Steps 8-11)
**Preconditions:** 
- The `Return` has at least one `ReturnLineItem`.
- If the refund requires manager approval (e.g., cash fallback), it has been approved.
**Postconditions:** 
- `Return.isComplete` was set to true.
- `ProductDescription.stockLevel` was increased for items with condition `Undamaged` (resellable).
- A `Refund` instance was created and associated with the `Return`.
- An `AccountingRecord` instance was created and queued.
**Responsibilities:** System finalizes the return, updates stock for resellable items, processes the refund, and notifies accounting.

### Contract 9: approveCashRefund
**Operation:** approveCashRefund(managerID: String, reason: String)
**Cross References:** Use Case: UC2 Handle Returns (Step 9b2a, 9c)
**Preconditions:** 
- A `Return` is active.
- A card refund was declined, or the original payment was by check.
**Postconditions:** 
- The associated `Refund` instance was marked as `isApproved` = true.
- `Refund.approvedByID` was set to `managerID`.
- `Refund.approvalReason` was set to `reason`.
**Responsibilities:** System records the manager's authorization for an exceptional cash refund.

---

## UC3 Process Rental

### Contract 10: makeNewRental
**Operation:** makeNewRental()
**Cross References:** Use Case: UC3 Process Rental (Step 2)
**Preconditions:** 
- A `CashierSession` is open.
**Postconditions:** 
- A new `Rental` instance was created.
- The `Rental` was associated with the current `CashierSession`.
- `Rental.isComplete` was set to false.
**Responsibilities:** System creates a new Rental transaction linked to the active session.

### Contract 11: enterCustomerID
**Operation:** enterCustomerID(customerID: String)
**Cross References:** Use Case: UC3 Process Rental (Steps 4-5)
**Preconditions:** 
- A `Rental` is active.
- The `customerID` exists and has no overdue rentals.
**Postconditions:** 
- The `Customer` instance was found and associated with the current `Rental`.
**Responsibilities:** System verifies the customer and links them to the rental.

### Contract 12: registerCustomer
**Operation:** registerCustomer()
**Cross References:** Use Case: UC3 Process Rental (Step 4a)
**Preconditions:** 
- The customer ID is unknown.
**Postconditions:** 
- A new `Customer` instance was created (with only the `customerID`).
- The `Customer` was associated with the current `Rental`.
**Responsibilities:** System registers a new customer ID and links it to the rental.

### Contract 13: enterRentalItem
**Operation:** enterRentalItem(serialNumber: String)
**Cross References:** Use Case: UC3 Process Rental (Steps 6-7)
**Preconditions:** 
- A `Rental` is active.
- The `serialNumber` corresponds to an `Item` with status `Available`.
**Postconditions:** 
- A new `RentalLineItem` instance was created.
- The `RentalLineItem` was associated with the current `Rental`.
- The `RentalLineItem` was associated with the corresponding `Item`.
**Responsibilities:** System identifies the physical item and adds it to the rental.

### Contract 14: selectRentalPeriod
**Operation:** selectRentalPeriod(days: Integer)
**Cross References:** Use Case: UC3 Process Rental (Steps 8-9)
**Preconditions:** 
- A `RentalLineItem` exists without a period selected.
**Postconditions:** 
- `RentalLineItem.rentalPeriodDays` was set to `days`.
- `RentalLineItem.rentalFee` was calculated and set.
- `RentalLineItem.dueDate` was calculated and set.
- `RentalLineItem.deposit` was set (from the `ProductDescription`).
- `Rental.subtotal` was updated.
**Responsibilities:** System calculates the fee, due date, and deposit for the rented item.

### Contract 15: endRental
**Operation:** endRental()
**Cross References:** Use Case: UC3 Process Rental (Steps 10-11)
**Preconditions:** 
- The `Rental` has at least one `RentalLineItem` with a selected period.
**Postconditions:** 
- `Rental.isComplete` was set to true.
- `Rental.tax` was set to the value returned by the Tax Calculator (for the fee).
- `Rental.total` was updated (fee + tax + deposit).
**Responsibilities:** System finalizes the rental for payment and calculates the total.