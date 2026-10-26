# Operation Contracts - UC1 Process Sale

An operation contract describes the behavior of a system operation (what happens when a specific event occurs), including its preconditions and postconditions. These are derived from the fully dressed UC1 in the SRS.

## Contract 1: makeNewSale
**Operation:** makeNewSale()
**Cross References:** Use Case: UC1 Process Sale (Step 2)
**Preconditions:** 
- A cashier session is currently open (UC4).
**Postconditions:** 
- A new `Sale` instance was created.
- The `Sale` was associated with the current `CashierSession`.
- The `Sale` attributes were initialized (e.g., isComplete = false, subtotal = 0).

## Contract 2: enterItem
**Operation:** enterItem(itemID: String, quantity: Integer)
**Cross References:** Use Case: UC1 Process Sale (Steps 4-5)
**Preconditions:** 
- A `Sale` is currently active.
- The `itemID` corresponds to a valid product in the catalog.
**Postconditions:** 
- A new `SaleLineItem` instance was created.
- The `SaleLineItem` was associated with the current `Sale`.
- The `itemID` and `quantity` were recorded.
- The running subtotal of the `Sale` was updated.

## Contract 3: endSale
**Operation:** endSale()
**Cross References:** Use Case: UC1 Process Sale (Steps 6-7)
**Preconditions:** 
- A `Sale` is currently active.
- The `Sale` contains at least one `SaleLineItem`.
**Postconditions:** 
- The `Sale` is marked as complete for item entry.
- The tax was requested from the `Tax Calculator` (BR-01).
- The final total (subtotal + tax) was calculated and displayed.

## Contract 4: makePayment
**Operation:** makePayment(amount: Money, tenderType: String)
**Cross References:** Use Case: UC1 Process Sale (Steps 9-10)
**Preconditions:** 
- The `Sale` is active and complete (items entered and total calculated).
- The `amount` tendered is valid for the `tenderType`.
**Postconditions:**
- A `Payment` instance was created.
- The `Payment` was associated with the `Sale`.
- If cash, the change due was calculated.
- If card/check, the authorization code was recorded (upon approval from the Payment Service).
- The `Sale` was marked as paid.