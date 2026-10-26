# Operation Contracts - UC1 Process Sale

An operation contract describes the behavior of a system operation. Postconditions strictly describe state changes (instances created/deleted, associations formed/broken, attributes modified). 
*Note: Class names (Sale, SaleLineItem, etc.) will be updated to match Borja's final domain model.*

## Contract 1: makeNewSale
**Operation:** makeNewSale()
**Cross References:** Use Case: UC1 Process Sale (Step 2)
**Preconditions:** 
- A CashierSession is open.
**Postconditions:** 
- A new Sale instance was created.
- The Sale was associated with the current CashierSession.
- Sale.isComplete was set to false.
- Sale.subtotal was set to 0.
**Responsibilities:** System creates a new Sale linked to the active session.

## Contract 2: enterItem
**Operation:** enterItem(itemID: String, quantity: Integer)
**Cross References:** Use Case: UC1 Process Sale (Steps 4-5)
**Preconditions:** 
- A Sale is active.
- The itemID corresponds to a valid ProductDescription in the catalog.
**Postconditions:** 
- A new SaleLineItem instance was created.
- The SaleLineItem was associated with the current Sale.
- The SaleLineItem was associated with a ProductDescription, based on itemID match.
- SaleLineItem.quantity was set to the input quantity.
- Sale.subtotal was updated.
**Responsibilities:** System records the item and updates the running total.

## Contract 3: endSale
**Operation:** endSale()
**Cross References:** Use Case: UC1 Process Sale (Steps 6-7)
**Preconditions:** 
- A Sale is active.
- The Sale has at least one SaleLineItem.
**Postconditions:** 
- Sale.isComplete was set to true.
- Sale.tax was set to the value returned by the Tax Calculator.
- Sale.total was updated (subtotal + tax).
**Responsibilities:** System finalizes the sale for payment and calculates the final total.

## Contract 4: makePayment
**Operation:** makePayment(amount: Money, tenderType: String)
**Cross References:** Use Case: UC1 Process Sale (Steps 9-11)
**Preconditions:** 
- The Sale is complete (isComplete = true).
- The amount tendered is valid for the tenderType.
**Postconditions:**
- A new Payment instance was created.
- The Payment was associated with the current Sale.
- Payment.amount was set to the input amount.
- Sale.isPaid was set to true.
- The ProductDescription.stockLevel was reduced by the total quantity sold in the SaleLineItems (FR-14).
- An AccountingRecord instance was created and queued.
**Responsibilities:** System processes the payment, marks the sale as paid, updates stock, and notifies the accounting system.