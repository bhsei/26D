# Operation Contracts - NewEra POS

An operation contract describes the behavior of a system operation. Postconditions strictly describe state changes (instances created/deleted, associations formed/broken, attributes modified). 
*Note: Class names match Borja's `domain_model.md`.*

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

### Contract 4: makePayment (Shared by UC1, UC3 and UC5)
**Operation:** makePayment(amount: Money, tenderType: TenderType)
**Cross References:** Use Case: UC1 Process Sale (Steps 9-11), UC3 Process Rental (Steps 13-16), UC5 Return Rental (Extension 7b)
**Preconditions:**
- The transaction to pay is the current `Sale`, `Rental` or `RentalReturn`.
  - A `Sale` or `Rental` is complete (`isComplete` = true).
  - A `RentalReturn` has a recorded condition and an amount still due greater than zero (the late fee and its tax are larger than the deposit, UC5 7b).
- The transaction has no `Payment` yet (one tender per sale or rental, BR-18).
- The `amount` tendered is valid for the `tenderType`: for cash, at least the total (or the amount still due); for credit card and check, exactly that amount.
**Postconditions:**
- A new `Payment` instance was created (cash, credit card or check, according to `tenderType`).
- The `Payment` was associated with the current `Sale`, `Rental` **or** `RentalReturn`.
- `Payment.amount` was set to the input amount.
- `Sale.isPaid` (or `Rental.isPaid`) was set to true. For a `RentalReturn`, `RentalReturn.amountDue` was set to zero.
- If a `Sale`: `ProductDescription.stockLevel` was reduced by the quantity sold.
- If a `Rental`: The associated `Item.status` was changed to `Rented`.
- If a `Sale` or `Rental`: an `AccountingRecord` instance was created and queued.
- If a `RentalReturn`: the item status and the `AccountingRecord` are not changed here; `confirmRentalReturn` does both.
- A failed attempt (card declined, no answer from the Payment Service, card reader error) creates no `Payment`; the Cashier can use another tender (BR-18).
**Responsibilities:** System processes the payment, marks the transaction as paid (or the amount due of a rental return as settled), updates stock or item status, and notifies the accounting system.


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
- No manager approval is needed to confirm the return. A refund that needs approval (a declined card refund, or an original payment by check) is approved afterwards with `approveCashRefund` (Contract 9, UC2 ext. 9b2a, 9c).
**Postconditions:** 
- If the original sale was paid in cash: a `Refund` instance (cash) was created and associated with the `Return`, and the completion below applies.
- If the original sale was paid by credit card: a `Refund` instance (credit card) was created, and the Payment Service refund confirmation and its reference were recorded with it (DR-19, IR-03). If the Payment Service confirmed the refund, the completion below applies.
  - If the refund was declined, or the status of a refund without answer is _failed_: no cash was paid and the `Refund` stayed unpaid, until `approveCashRefund`.
  - If the Payment Service did not answer and the status cannot be obtained: the `Return` was saved with the refund marked _pending_ and no cash was paid.
- If the original sale was paid by check: a `Refund` instance was created and stayed unpaid, until `approveCashRefund`.
- **Completion:** `Return.isComplete` was set to true; `ProductDescription.stockLevel` was increased for items with condition `Undamaged` (resellable); an `AccountingRecord` instance was created and queued.
**Responsibilities:** System pays the refund with the tender of the original sale, saves the return, updates stock for resellable items and notifies accounting. A refund that is declined or paid by check waits for the manager's approval (Contract 9). A card refund is never paid twice.

### Contract 9: approveCashRefund (Shared by UC2 and UC5)
**Operation:** approveCashRefund(managerID: String, pin: String, reason: String)
**Cross References:** Use Case: UC2 Handle Returns (Step 9b2a, 9c), UC5 Return Rental (Step 9b2a, 9c)
**Preconditions:**
- A `Return` or a `RentalReturn` is active, and its `Refund` has not been paid.
- A card refund was declined, or the original payment (of the `Sale` or the `Rental`) was by check.
- `managerID` is an active store manager and `pin` is correct (HR System or local employee list).
**Postconditions:**
- The `Refund` of the `Return` or `RentalReturn` was marked as `isApproved` = true.
- The `Refund` was associated with the `Employee` whose `employeeID` is `managerID`, as the approving store manager (`approvedBy`).
- `Refund.approvalReason` was set to `reason`.
- `Refund.tender` was changed to cash.
- The `pin` was not stored, logged or shown (NFR-08).
- The `Return` or `RentalReturn` was completed as in `confirmReturn` (Contract 8) or `confirmRentalReturn` (Contract 28): `isComplete` was set to true, stock or item status was updated, and an `AccountingRecord` was created and queued.
**Responsibilities:** System records the manager's authorization for an exceptional cash refund, for a return or for a rental return, and completes the transaction with the cash refund.


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


## UC4 Start Up (with Close session)

*Note: attribute names of `CashierSession` follow DR-09 of the SRS (opening cash, closing cash, difference, interrupted, to review); align them with `domain_model.md`.*

### Contract 16: startUp
**Operation:** startUp()
**Cross References:** Use Case: UC4 Start Up (Steps 1-4, Extensions *a, 2a, 3a, 3b)
**Preconditions:**
- The register is switched on and has a register ID.
- No `CashierSession` is open on this register.
**Postconditions:**
- If a `CashierSession` of this register was still open after a failure: `CashierSession.endTime` was set to the time of the restart and `CashierSession.isInterrupted` was set to true (no closing cash, FR-63).
- Every `AccountingRecord` waiting in the queue that the Accounting System acknowledged was removed from the queue.
- Every `AccountingRecord` that was not acknowledged (or not sent because the Accounting System is not available) stayed in the queue, in its original order.
- No `CashierSession` was created.
**Responsibilities:** System checks that the product catalog and the stored data are available, recovers the stored data after a failure, sends the waiting records and shows the login screen with the register ID. If the catalog or the stored data are not available (2a), nothing changes and no login screen is shown.

### Contract 17: logIn
**Operation:** logIn(employeeID: String, pin: String)
**Cross References:** Use Case: UC4 Start Up (Steps 5-7, Extensions 6a, 6b, 6c)
**Preconditions:**
- `startUp` has shown the login screen and no `CashierSession` is open on this register.
- `employeeID` belongs to a valid, active cashier, and `pin` is correct. The HR System checks both; when it is not available, the local employee list is used (the PIN is compared with its salted hash, DR-11).
**Postconditions:**
- The `Employee` identified by `employeeID` was associated with the `Register` as the cashier of the session that is about to be opened (no `CashierSession` exists yet).
- The `pin` was not stored, logged or shown (NFR-08).
**Responsibilities:** System checks the employee and the PIN and asks for the opening cash. If the employee is not found or not an active cashier (6a), or the PIN is wrong (6b, 6c3), or the employee is not in the local list (6c1), nothing changes. If the HR System is not available (6c), the System shows the warning with the date of the last update of the local list.

### Contract 18: enterOpeningCash
**Operation:** enterOpeningCash(amount: Money)
**Cross References:** Use Case: UC4 Start Up (Steps 8-10, Extension 8a)
**Preconditions:**
- `logIn` was accepted for this register.
- `amount` is valid (not empty, a number, not negative); otherwise it is rejected and nothing changes (8a).
**Postconditions:**
- A new `CashierSession` instance was created.
- The `CashierSession` was associated with the `Employee` of the login and with the `Register`.
- `CashierSession.startTime` was set to the current time.
- `CashierSession.openingCash` was set to `amount`.
- `CashierSession.endTime` was not set (the session is open).
**Responsibilities:** System opens the cashier session, records the opening cash and shows the main screen. From now on every transaction of the register is linked to this session and to this cashier (BR-13); the register has at most one open session (DR-09).

### Contract 19: closeSession
**Operation:** closeSession()
**Cross References:** Use Case: UC4 Start Up, Close session (Steps 1-2, Extension 2a)
**Preconditions:**
- A `CashierSession` is open.
- No `Sale`, `Return`, `Rental` or `RentalReturn` of the session is in progress; otherwise the request is refused and nothing changes (2a, FR-60).
**Postconditions:**
- A log entry for the opening of the cash drawer, with the reason "closing count", was created (IR-14).
- No other instance was created or changed.
**Responsibilities:** System checks that the session has no open transaction and opens the cash drawer for the closing count.

### Contract 20: enterClosingCash
**Operation:** enterClosingCash(amount: Money)
**Cross References:** Use Case: UC4 Start Up, Close session (Steps 3-4, Extension 3a)
**Preconditions:**
- `closeSession` was accepted for the open `CashierSession`.
- `amount` is valid (not empty, a number, not negative); otherwise it is rejected and nothing changes (3a).
**Postconditions:**
- `CashierSession.closingCash` was set to `amount` (a value entered before was replaced).
- The expected cash was calculated: `openingCash` plus the cash `Payment` amounts minus the cash `Refund` amounts of the session.
- `CashierSession.difference` was set to `closingCash` minus the expected cash.
**Responsibilities:** System calculates the expected cash and shows the difference with the closing cash.

### Contract 21: confirmCloseSession
**Operation:** confirmCloseSession()
**Cross References:** Use Case: UC4 Start Up, Close session (Steps 5-6, Extensions 4a, 4b)
**Preconditions:**
- `enterClosingCash` was accepted for the open `CashierSession`.
**Postconditions:**
- `CashierSession.endTime` was set to the current time; the session is closed and the register has no open session.
- If the difference is larger than 5.00 (BR-17): `CashierSession.toReview` was set to true, so the session appears in the store manager's list of sessions to review (FR-74).
- If the difference is not larger than 5.00: `CashierSession.toReview` was left false.
**Responsibilities:** System closes the session, records the end time, the closing cash and the difference, warns the Cashier when the session is to be reviewed, and shows the login screen.

### Contract 29: confirmSessionReview
**Operation:** confirmSessionReview(sessionID: String, managerID: String, pin: String, reason: String)
**Cross References:** Use Case: UC4 Start Up (Close session extension 4b), FR-74, FR-75
**Preconditions:**
- The `CashierSession` with `sessionID` exists and has `toReview` set to true.
- `managerID` is an active store manager and `pin` is correct (HR System or local employee list).
- `reason` is not empty.
**Postconditions:**
- `CashierSession.toReview` was set to false.
- The `CashierSession` was associated with the `Employee` whose `employeeID` is `managerID`, as the reviewer (`reviewedBy`).
- `CashierSession.reviewReason` was set to `reason`.
- `CashierSession.reviewedAt` was set to the current timestamp.
- The `pin` was not stored, logged or shown (NFR-08).
**Responsibilities:** System records the store manager's review of the flagged session, clears the review flag, and logs the action.

## UC5 Return Rental

### Contract 22: makeNewRentalReturn
**Operation:** makeNewRentalReturn()
**Cross References:** Use Case: UC5 Return Rental (Steps 2-3)
**Preconditions:**
- A `CashierSession` is open.
**Postconditions:**
- A new `RentalReturn` instance was created.
- The `RentalReturn` was associated with the current `CashierSession`.
- `RentalReturn.isComplete` was set to false.
**Responsibilities:** System creates a new rental return linked to the active session.

### Contract 23: findRental
**Operation:** findRental(code: String)
**Cross References:** Use Case: UC5 Return Rental (Steps 4-5, Extension 5a)
**Preconditions:**
- A `RentalReturn` is active and has no `RentalLineItem` yet.
- `code` is either the serial number of an `Item` with status `Rented`, or the receipt number of a `Rental` that is still open. The System recognises which kind of code it received.
**Postconditions:**
- The open `RentalLineItem` (with its `Rental`, `Customer` and `Item`) was found and associated with the current `RentalReturn`.
**Responsibilities:** System finds the open rental and shows the customer, the item, the rental date, the due date, the deposit and the tender of the rental. If there is no open rental for `code`, it shows "No open rental for this item" and nothing changes (5a).

### Contract 24: findRentalsOfCustomer
**Operation:** findRentalsOfCustomer(customerID: String)
**Cross References:** Use Case: UC5 Return Rental (Extension 5b)
**Preconditions:**
- A `RentalReturn` is active and has no `RentalLineItem` yet.
- A `Customer` with `customerID` exists.
**Postconditions:**
- The `Customer` was associated with the current `RentalReturn`.
**Responsibilities:** System shows the open rentals of the customer, so that the Cashier can select the one for the item (used when there is neither a receipt nor a readable serial number).

### Contract 25: selectRental
**Operation:** selectRental(rentalID: String)
**Cross References:** Use Case: UC5 Return Rental (Extension 5b)
**Preconditions:**
- `findRentalsOfCustomer` was done for the current `RentalReturn`.
- `rentalID` is one of the open rentals of that `Customer`.
**Postconditions:**
- The open `RentalLineItem` of the selected `Rental` was associated with the current `RentalReturn`.
**Responsibilities:** System links the selected rental to the rental return and shows the same data as `findRental`.

### Contract 26: recordCondition
**Operation:** recordCondition(condition: ItemCondition, damageNote: String)
**Cross References:** Use Case: UC5 Return Rental (Steps 6-7, Extensions 6a, 7a, 7a1, 7b)
**Preconditions:**
- A `RentalReturn` is active and associated with a `RentalLineItem`.
- `condition` is `Undamaged` or `Damaged`. If `Damaged`, `damageNote` is not empty.
**Postconditions:**
- `RentalReturn.condition` was set to `condition`, and `RentalReturn.damageNote` to `damageNote` (if damaged). A damaged condition is pending until `confirmDamage`.
- `RentalReturn.returnDate` was set to the current date.
- `RentalReturn.daysLate` was set to the number of whole days after the due date (zero if returned on or before it).
- If `daysLate` > 0: `RentalReturn.lateFee` was set to `daysLate` times the rental fee per day of the item (BR-16), and `RentalReturn.lateFeeTax` to the tax returned by the Tax Calculator. If the Tax Calculator is not available, the default tax rate was used and the rental return was marked _tax to be corrected_ (BR-02, IR-05).
- If `Undamaged`: `RentalReturn.refundTotal` was set to the deposit minus the late fee minus its tax, and never below zero (BR-10). If the late fee and its tax are larger than the deposit, `RentalReturn.amountDue` was set to the difference (7b).
- If `Damaged`: the late fee and its tax were only recorded, not charged; `RentalReturn.refundTotal` is set by `confirmDamage`.
- The status of the `Item` was not changed.
**Responsibilities:** System checks the due date, calculates the late fee and the refund, and shows each part of the calculation. For a damaged item it asks for a store manager.

### Contract 27: confirmDamage
**Operation:** confirmDamage(managerID: String, pin: String)
**Cross References:** Use Case: UC5 Return Rental (Extension 6a)
**Preconditions:**
- The condition of the current `RentalReturn` was recorded as `Damaged` and is pending.
- `managerID` is an active store manager and `pin` is correct (checked with the HR System, or with the local employee list when it is not available, UC4 6c4).
**Postconditions:**
- The damage of the `RentalReturn` was marked as confirmed.
- The `RentalReturn` was associated with the `Employee` whose `employeeID` is `managerID`, as the store manager who confirmed the damage (`confirmedBy`).
- `RentalReturn.amountKept` was set to the whole deposit and `RentalReturn.refundTotal` to zero (BR-10).
- `RentalReturn.amountDue` was left at zero: a late fee of a damaged item is not charged (6a.4).
- The `pin` was not stored, logged or shown (NFR-08).
**Responsibilities:** System records the manager's confirmation. Without it the item cannot be recorded as damaged (FR-52): if the manager or the PIN is not valid, the condition stays pending and nothing else changes.

### Contract 28: confirmRentalReturn
**Operation:** confirmRentalReturn()
**Cross References:** Use Case: UC5 Return Rental (Steps 8-11, Extensions 9a, 9b, 9b2a, 9b2b, 9c, 10a)
**Preconditions:**
- A `RentalReturn` is active, with a condition recorded (and confirmed, if damaged).
- If an amount is still due (7b), it has been paid with `makePayment`.
**Postconditions:**
- If `RentalReturn.refundTotal` is zero: no `Refund` instance was created, and the postconditions of the completion below apply.
- If the rental was paid in cash: a `Refund` instance (cash) was created and associated with the `RentalReturn`, and the completion below applies.
- If the rental was paid by credit card: a `Refund` instance (credit card) was created, and the Payment Service refund confirmation and its reference were recorded with it (DR-19, IR-03). If the Payment Service confirmed the refund, the completion below applies.
  - If the refund was declined, or the status of a refund without answer is _failed_: no cash was paid and the `Refund` stayed unpaid, until `approveCashRefund`.
  - If the Payment Service did not answer and the status cannot be obtained: the `RentalReturn` was saved with the refund marked _pending_ and no cash was paid.
- If the rental was paid by check: a `Refund` instance was created and stayed unpaid, until `approveCashRefund`.
- **Completion:** `RentalReturn.isComplete` was set to true; the `Rental` was closed; `Item.status` was changed from `Rented` to `Available` (undamaged) or to `Under maintenance` (damaged); an `AccountingRecord` was created and queued.
**Responsibilities:** System pays the refund with the tender of the rental, saves the rental return, closes the rental, updates the item status and notifies the accounting system. A card refund is never paid twice.



## Open points of the contracts of UC4 and UC5

1. Closed in W09: `pin` was added to `approveCashRefund` (Contract 9).
2. Closed in W09: the precondition of Contract 8 was changed; the manager approval comes after the failed card refund (9b2a), and the card and check branches are described as in Contract 28.
3. **A receipt with several rented items.** `findRental(code)` and `selectRental(rentalID)` find one `RentalLineItem`. If a rental has several items, the SRS does not say which one is returned (a rental return per line item, as in DR-07, is assumed).
4. **Cash difference.** BR-17 says "a difference larger than 5.00". Contract 21 uses the absolute value (a surplus and a shortage are both reviewed). Please confirm.
5. **Pending refund (9b2b).** No system operation completes a refund that was left _pending_ (SSD 6.2); no contract is written for it.
6. **Names.** The attribute names of `CashierSession`, `RentalReturn` and `Refund`, and the log entry of the drawer opening (IR-14), have to be aligned with `domain_model.md`.
7. **Clearing `toReview`.** Contract 29 sets `toReview` to false after the review, so that FR-74 shows only unreviewed sessions. Please confirm if this is the preferred behavior, or if `toReview` should remain a permanent mark and the list should filter by `reviewedAt`.

