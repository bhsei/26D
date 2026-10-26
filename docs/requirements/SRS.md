# Software Requirements Specification – NewEra POS

Team D · Software Engineering · BUAA
Structure based on ISO/IEC/IEEE 29148:2018

| Version | Date | Author | Changes |
|---|---|---|---|
| 0.1 | 2026-10-21 | Alfonso Pinto | First draft: sections 1 and 2; team decisions on actors, payment methods and UC5; links to the W06 requirement documents; UC1 Process Sale fully dressed; functional requirements FR-01 to FR-17 (UC1) |
| 0.2 | 2026-10-21 | Alfonso Pinto | Review #19 (Avni): goals in §1.2 linked to measurable requirements (NFR, FR, BR) |
| 0.3 | 2026-10-21 | Alfonso Pinto | Rest of review #19 (Avni): Customer change from the proposal explained (§1.3.1); store manager added as secondary user (§1.3.1, §1.3.3); assumption on Proposed rules and open questions rephrased (§1.5); owner of UC5 (§3.2.5) |

> **Status: draft.** Sections marked *Pending (W07)* are planned for SRS v1.0 (W07) and have an owner (see `plans/task_plan_W05-W06.md`). Terms are used as defined in the [glossary](glossary.md); business rules (BR-xx) are defined there too. Interface requirements (IR-xx) are in [external_interfaces.md](external_interfaces.md).

---

## 1. Introduction

### 1.1 Purpose

This document specifies the software requirements of **NewEra POS**, a point-of-sale system for a retail store. It describes what the system must do, the quality it must have and the constraints it must respect.

It is written for:
- the development team (Team D), as the basis for design, implementation and testing;
- the teacher and the other teams, who review it as Assignment 1;
- the (simulated) customer, the owner of the store, to confirm that the system covers the store's needs.

### 1.2 Scope

NewEra POS is the application that a cashier uses at a store register to:
- record the items a customer buys and show the running subtotal;
- calculate the tax and the total;
- take payment in cash, by credit card or by check;
- update the stock levels and send every completed transaction to the Accounting System;
- print a receipt;
- process returns of items bought in the store;
- rent equipment and process the return of rented equipment;
- start up the register and open a cashier session.

The system **does not** cover: purchasing from suppliers, full inventory management, the store's website or online shop, or payroll. Payment authorization, tax calculation, accounting and human resources are provided by external systems; NewEra POS only communicates with them.

**Goals of the system**

Each goal is refined into measurable requirements in section 3 (functional requirements in §3.2.6, NFR-xx in §3.3, §3.4 and §3.8; see [nfrs.md](nfrs.md)).

| Goal | Measured by |
|---|---|
| Fast checkout, so that customers do not wait | NFR-01 (a sale line item is registered in less than 1 second), NFR-06 (maximum number of clicks to complete a standard sale) |
| Correct taxes and payments, so that the store does not lose money | FR-08 to FR-11 (tax from the Tax Calculator, cash and card payment rules), BR-01, BR-05, BR-06 |
| Up-to-date stock levels and accounting records after every transaction | FR-14, FR-15, NFR-04 (a completed sale is saved even if the connection drops) |
| Easy to learn for new cashiers | NFR-05 (a new cashier can process a standard sale and a return after 15 minutes of training) |

### 1.3 Product overview

#### 1.3.1 Product perspective

NewEra POS runs on the registers of the store. It is a new system that replaces manual checkout. It has **one primary actor**, the Cashier, and **four supporting actors**, the external systems. The Customer is a **stakeholder**, not an actor: the customer takes part in sales, returns and rentals only through the cashier and never uses the register directly. The W01 proposal listed the Customer as a primary actor; the team changed this in W06 for that reason (see [use_case_model.md](use_case_model.md), "Decided in W06").

| External element | Type | Interaction |
|---|---|---|
| Cashier | Primary actor | Operates the register in all use cases |
| Customer | Stakeholder | Buys, returns or rents items and pays, through the cashier |
| Store manager | Secondary user | Approves price overrides (UC1 ext. 4d, BR-04) and views the reorder list (UC1 ext. 11b, BR-09) |
| Payment Service | Supporting actor (external system) | Authorizes credit card and check payments and card refunds |
| Tax Calculator | Supporting actor (external system) | Calculates the tax of a transaction |
| Accounting System | Supporting actor (external system) | Receives every completed sale, return and rental |
| HR System | Supporting actor (external system) | Confirms that an employee is a valid, active cashier |

![Use case diagram](../../assets/use_case_diagram.png)

The use case model, with a one-paragraph description of each use case, is in [use_case_model.md](use_case_model.md).

**System interfaces.** The four external systems are described in [external_interfaces.md](external_interfaces.md) (IR-01 to IR-10) and summarised in section 3.1.3.

**User interfaces.** The cashier works with a screen, a keyboard, a barcode scanner, a card reader, a receipt printer and a cash drawer. See section 3.1.1.

**Hardware interfaces.** Barcode scanner, card reader, receipt printer and cash drawer connected to the register.

**Operations.** The system is used during the store's opening hours. Each register is started at the beginning of the day (UC4) and is used by one cashier at a time, inside a cashier session.

#### 1.3.2 Product functions

| ID | Use case | Priority | Summary |
|---|---|---|---|
| UC1 | Process Sale | Must | Register the items a customer buys, calculate the tax and total, take payment (cash, credit card or check), update stock, print the receipt and report the sale |
| UC2 | Handle Returns | Must | Take back items bought in the store, check the return rules and refund the customer with the original tender |
| UC3 | Process Rental | Should | Rent available equipment to a customer for a rental period, charging the rental fee and a deposit |
| UC4 | Start Up | Must | Start the register, send pending records and open a cashier session for a valid cashier |
| UC5 | Return Rental | Should | Take back rented equipment, check its condition, apply the late fee if needed and refund the deposit |

**UC5 was added during the W06 analysis.** Returning rented equipment happens in a different visit and has a different goal and different rules (condition check, late fee, deposit refund, item becomes *Available* again). It is therefore neither an extension of UC3 (one session, one goal) nor part of UC2 (which refunds a sale). The scope of the proposal grows from 4 to 5 use cases.

**Payment methods.** Three tenders are supported: **cash**, **credit card** and **check**. The proposal counted three methods but named only two; the case's domain model includes cash, credit and check payments. Check payments are authorized through the Payment Service (no new external system) and have priority *Could*.

#### 1.3.3 User characteristics

The main user is the **cashier**: basic computer skills, often new or temporary staff, works standing at the counter with customers waiting, especially at peak hours (lunch time, evenings, weekends). The system must therefore be usable with little training and few steps per task. The full stakeholder list and the cashier persona (Li Wei) are in [stakeholders.md](stakeholders.md).

The **store manager** is a secondary user: an experienced employee who uses the register only for exceptions, such as approving a price override (BR-04) or checking the products flagged for reorder (BR-09). The manager identifies himself or herself at the cashier's register, so these actions must be quick and must not close the cashier session.

#### 1.3.4 Limitations

- Credit card and check payments depend on the Payment Service; if it is not available, only cash payments are possible (IR-02).
- Real external systems are not available to the team; they will be simulated with stubs that follow the interface specification.
- Developed by a team of six students within a 16-week course.

### 1.4 Definitions, acronyms and abbreviations

| Term | Definition |
|---|---|
| POS | Point of sale: the system used at the counter to record transactions and take payments |
| SRS | Software Requirements Specification |
| UC | Use case |
| FR / NFR / BR / IR | Functional requirement / Non-functional requirement / Business rule / Interface requirement |
| MoSCoW | Priority scale: Must, Should, Could, Won't (this time) |

All domain terms (register, sale line item, tender, cashier session…) are defined in the [glossary](glossary.md).

### 1.5 Assumptions and dependencies

- Each product has a unique item identifier (barcode) and a product description with its price in the product catalog.
- Tax rules are applied by the external Tax Calculator, not by NewEra POS (BR-01).
- The store has a network connection to the external systems during opening hours; when it fails, the fallbacks in [external_interfaces.md](external_interfaces.md) apply.
- Business rules marked *Proposed* and the open questions in the [glossary](glossary.md), section 4, still have to be confirmed against the full case study; in particular the refund period, the deposit amount, the rental period and the late fee.

## 2. References

| ID | Reference |
|---|---|
| [1] | ISO/IEC/IEEE 29148:2018 – Systems and software engineering – Life cycle processes – Requirements engineering |
| [2] | ISO/IEC 25010 – Systems and software quality models |
| [3] | C. Larman, *Applying UML and Patterns*, NextGen POS case study |
| [4] | Team D, Project proposal (W01), [`docs/release/project_proposal.pdf`](../release/project_proposal.pdf) |
| [5] | Team D, Project overview, [`docs/project_overview.md`](../project_overview.md) |
| [6] | Team D, Process model, [`plans/process_model.md`](../../plans/process_model.md) |
| [7] | Team D, Project plan, [`plans/project_plan.md`](../../plans/project_plan.md) |
| [8] | Team D, W06 requirement documents: [stakeholders](stakeholders.md), [elicitation plan](elicitation_plan.md), [use case model](use_case_model.md), [external interfaces](external_interfaces.md), [glossary and business rules](glossary.md), [quality goals](quality_goals.md) |

## 3. Specific requirements

### 3.1 External interfaces

#### 3.1.1 User interfaces
*Pending (W07) – Yasmine and Haifa: link the UI prototype (`docs/design/ui_prototype.md`) and list the usability needs of each screen.*

#### 3.1.2 Hardware interfaces
*Pending (W07) – Haifa: barcode scanner, card reader, receipt printer, cash drawer.*

#### 3.1.3 Software interfaces (external systems)

| External system | Use cases | If not available | Interface requirements |
|---|---|---|---|
| Payment Service | UC1, UC2, UC3, UC5 | Card/check payment refused; cashier offers cash; transaction stays open | IR-01, IR-02, IR-03 |
| Tax Calculator | UC1, UC2, UC3, UC5 | Default tax rate, transaction flagged for correction | IR-04, IR-05 |
| Accounting System | UC1, UC2, UC3, UC5, UC4 | Records queued locally and sent later in order | IR-06, IR-07 |
| HR System | UC4 | Local copy of the employee list | IR-08, IR-09 |
| All | – | Every failed communication is logged without card or personal data | IR-10 |

Full detail (data sent and received, timing, open questions): [external_interfaces.md](external_interfaces.md).

### 3.2 Functions

#### 3.2.1 UC1 Process Sale (fully dressed)

| | |
|---|---|
| **Use case** | UC1 Process Sale |
| **Goal** | Sell items to a customer, take payment and give the customer a receipt |
| **Level** | User goal (primary use case) |
| **Primary actor** | Cashier |
| **Supporting actors** | Payment Service, Tax Calculator, Accounting System |
| **Priority** | Must · build order 1 |
| **Trigger** | A customer arrives at the register with items to buy |

**Stakeholders and interests**
- *Cashier*: enter items quickly and without mistakes; clear messages when something fails; no cash shortages in the drawer.
- *Customer*: short wait, correct prices and tax, choice of tender, correct receipt, secure card payment.
- *Store manager*: every sale recorded correctly, stock levels up to date, products reordered in time.
- *Accountant*: every sale and its tax reported correctly to the Accounting System.
- *Owner*: no loss of sales or payments, even when an external system fails.

**Preconditions**
- The register has been started and a cashier session is open (UC4).

**Success guarantees (postconditions)**
- The sale is saved with its sale line items, tax, total and payment.
- The sale is linked to the cashier of the session (BR-13).
- The stock levels are updated; products below the reorder threshold are flagged for reorder (BR-09).
- The receipt is printed.
- The sale is sent, or queued to be sent, to the Accounting System (BR-14).

**Failure guarantees**
- If the sale is cancelled, nothing is saved as completed, the stock levels do not change and no payment is taken.
- No card payment is completed without authorization (BR-05).

**Main success scenario**

| Actor action | System responsibility |
|---|---|
| 1. The Customer arrives at the register with items to buy. | |
| 2. The Cashier starts a new sale. | 3. The System creates a new sale linked to the cashier session. |
| 4. The Cashier enters the item identifier (scan or keyboard). | 5. The System records a sale line item and shows the product description, price, quantity and running subtotal (BR-03). |
| *The Cashier repeats steps 4–5 until all items are entered.* | |
| 6. The Cashier indicates that the sale is complete. | 7. The System gets the tax from the Tax Calculator (BR-01) and shows the total. |
| 8. The Cashier tells the Customer the total and asks for payment. | |
| 9. The Customer pays and the Cashier enters the payment. | 10. The System handles the payment (see 9a–9c). |
| | 11. The System saves the completed sale, updates the stock levels and sends the sale to the Accounting System (BR-14). |
| | 12. The System prints the receipt. |
| 13. The Customer leaves with the receipt and the items. | |

**Extensions (alternative flows)**

- **\*a. At any time, the System fails (crash or power cut):**
  1. The Cashier restarts the register (UC4).
  2. The System recovers the open sale, or reports that it was not completed; no completed sale or payment is lost.
- **4a. The item identifier is not valid (not in the product catalog):**
  1. The System shows an error and rejects the entry.
  2. The Cashier checks the code and types it again, or puts the item aside.
- **4b. The customer buys several units of the same product:**
  1. The Cashier enters the item identifier and the quantity.
  2. The System records one sale line item with that quantity.
- **4c. The Cashier removes a line item before payment** (customer changes their mind):
  1. The Cashier selects the line and removes it.
  2. The System updates the running subtotal.
- **4d. The customer disputes the price:**
  1. The Cashier asks a store manager.
  2. The store manager identifies himself or herself and enters the new price (BR-04).
  3. The System records the override and the manager who approved it.
- **6–9a. The customer cancels the sale before paying:**
  1. The Cashier cancels the sale.
  2. The System discards the sale; stock levels do not change.
- **7a. The Tax Calculator is not available:**
  1. The System applies the default tax rate, marks the sale *tax to be corrected* and shows a short warning (BR-02, IR-05).
  2. The use case continues at step 8.
- **9a. Cash payment:**
  1. The Cashier enters the amount tendered.
  2. If the amount is lower than the total, the System rejects it and asks for the full amount (BR-06).
  3. The System shows the change due and opens the cash drawer.
  4. The Cashier puts the cash in the drawer and gives the change to the Customer.
  5. The System records the cash payment.
- **9b. Credit card payment:**
  1. The Customer gives the card; the card reader reads it.
  2. The System sends an authorization request to the Payment Service (BR-05, IR-01).
  3. The System receives the approval and records the credit card payment with the authorization code.
  - **9b2a. The payment is declined:** the System shows the reason; the Cashier asks for another tender; the use case continues at step 9.
  - **9b2b. The Payment Service does not answer:** the System shows *"Card payment not available"*, logs the failure (IR-10) and keeps the sale open; the Cashier asks for cash (IR-02).
- **9c. Check payment** *(Could)*:
  1. The Cashier enters the check data.
  2. The System asks the Payment Service to authorize the check.
  3. If approved, the System records the check payment; if not, as in 9b2a.
- **11a. The Accounting System is not available:**
  1. The System completes the sale normally and puts the record in the local queue (IR-07).
  2. The record is sent automatically when the Accounting System is back.
- **11b. The stock level of a product falls below the reorder threshold (10 units):**
  1. The System flags the product for reorder and shows it in the store manager's reorder list (BR-09).
- **12a. The receipt printer has no paper or fails:**
  1. The System warns the Cashier and keeps the receipt.
  2. The Cashier fixes the printer and reprints the receipt.

**Special requirements**
- A sale line item is registered in less than 1 second ([quality goals](quality_goals.md), performance efficiency).
- A standard sale is completed with fewer than 3 clicks after the items are entered ([quality goals](quality_goals.md), usability).
- The receipt shows only the last 4 digits of a card number.
- Large text and buttons, readable at a distance of 1 m.

**Technology and data variations**
- 4: the item identifier is read with a barcode scanner or typed on the keyboard.
- 9b: the card is read with the card reader (chip or contactless).
- 12: the receipt is printed on a thermal receipt printer.

**Frequency of occurrence:** continuous during opening hours; the most frequent use case of the system.

**Open issues**
- Discounts and promotions (glossary open question 6).
- Is an offline card authorization for small amounts allowed? ([external_interfaces.md](external_interfaces.md), open question 1)
- Can a single sale be paid with more than one tender (for example, part cash and part card)?

#### 3.2.2 UC2 Handle Returns
*Pending (W07) – Yasmine. One-paragraph description in [use_case_model.md](use_case_model.md).*

#### 3.2.3 UC3 Process Rental

| | |
|---|---|
| **Use case** | UC3 Process Rental |
| **Goal** | Rent an available item to a customer for a limited rental period, charging the rental fee and a refundable deposit, and give the customer a receipt with the due date |
| **Level** | User goal |
| **Primary actor** | Cashier |
| **Supporting actors** | Payment Service, Tax Calculator, Accounting System |
| **Priority** | Should · build order 3 |
| **Trigger** | A customer comes to the register and wants to rent an item instead of buying it |

**Stakeholders and interests**
- *Cashier*: finds the item and the customer quickly; gets a clear message when the item or the customer cannot be accepted; knows the exact amounts to tell the customer.
- *Customer*: knows the rental fee, the deposit and the due date before paying; gets a correct receipt; a secure card payment; the deposit back when the item returns undamaged (BR-10).
- *Store manager*: an item is never rented twice (BR-11); customers with an overdue rental cannot rent again (BR-12); fee and deposit are recorded correctly.
- *Accountant*: every rental reaches the Accounting System, with fee, tax and deposit shown separately (BR-14).
- *Owner*: equipment is not lost, and the deposit protects the store.

**Preconditions**
- The register has been started and a cashier session is open (UC4).
- The product catalog contains the rentable products with their rental fee per day and deposit, and the item list contains each rentable item with its serial number and item status.

**Success guarantees (postconditions)**
- The rental is saved with its rental line item (item, rental period, rental fee, due date and deposit), tax, total, payment, customer and cashier (BR-13).
- The item status is changed from *Available* to *Rented* (BR-11).
- The rental receipt is printed, with the due date and the refundable deposit.
- The rental is sent, or queued to be sent, to the Accounting System (BR-14).

**Failure guarantees**
- If the rental is cancelled or the payment fails, the item stays *Available*, nothing is saved as completed and no payment is taken.
- No card payment is completed without authorization (BR-05).
- An item is never rented to two customers at the same time (BR-11).

**Main success scenario**

| Actor action | System responsibility |
|---|---|
| 1. The Customer arrives at the register and asks to rent an item. | |
| 2. The Cashier starts a new rental. | 3. The System creates a new rental linked to the cashier session. |
| 4. The Cashier enters the customer ID. | 5. The System checks that the customer has no overdue rental (BR-12). |
| 6. The Cashier identifies the item by its serial number (scan or keyboard). | 7. The System checks that the item status is *Available* (BR-11) and shows the description, the status, the rental fee per day and the deposit. |
| 8. The Cashier selects the rental period. | 9. The System calculates the rental fee and the due date and records a rental line item with the item, the rental period, the rental fee, the due date and the deposit (BR-10). |
| 10. The Cashier indicates that the rental is complete. | 11. The System gets the tax of the rental fee from the Tax Calculator (BR-01) and shows the total: rental fee plus tax plus deposit. |
| 12. The Cashier tells the Customer the total and the due date, explains that the deposit is refunded when the item comes back undamaged, and asks for payment. | |
| 13. The Customer pays and the Cashier enters the payment. | 14. The System handles the payment (see 13a–13c). |
| | 15. The System saves the completed rental, changes the item status to *Rented* and sends the rental to the Accounting System (BR-14, IR-06). |
| | 16. The System prints the rental receipt. |
| 17. The Customer leaves with the item and the receipt. | |

**Extensions (alternative flows)**

- **\*a. At any time, the System fails (crash or power cut):**
  1. The Cashier restarts the register (UC4).
  2. The System recovers the open rental, or reports that it was not completed. No completed rental or payment is lost, and the item status changes only for a completed rental.
- **5a. The customer has an overdue rental:**
  1. The System shows the message *"This customer has an overdue rental and cannot start a new one"* (BR-12).
  2. The Cashier asks the Customer to return the overdue item first (UC5). The use case ends and no rental is made.
- **7a. The serial number is not in the item list:**
  1. The System shows an error and rejects the entry.
  2. The Cashier checks the number and enters it again, or chooses another item.
- **7b. The item status is not *Available* (*Rented*, *Under maintenance* or *Reserved*):**
  1. The System rejects the item and shows the status as the reason (BR-11).
  2. The Cashier chooses another item, or ends the use case.
- **8a. The customer changes the rental period before paying:**
  1. The Cashier selects another rental period.
  2. The System recalculates the rental fee and the due date.
- **10–13a. The customer cancels the rental before paying:**
  1. The Cashier cancels the rental.
  2. The System discards the rental. The item status does not change.
- **11a. The Tax Calculator is not available:**
  1. The System applies the default tax rate to the rental fee, marks the rental *tax to be corrected* and shows a short warning (BR-02, IR-05).
  2. The use case continues at step 12.
- **13a. Cash payment:**
  1. The Cashier enters the amount tendered.
  2. If the amount is lower than the total, the System rejects it and asks for the full amount (BR-06).
  3. The System shows the change due and opens the cash drawer.
  4. The Cashier puts the cash in the drawer and gives the change to the Customer.
  5. The System records the cash payment.
- **13b. Credit card payment:**
  1. The Customer gives the card; the card reader reads it.
  2. The System sends an authorization request for the total to the Payment Service (BR-05, IR-01).
  3. The System receives the approval and records the credit card payment with the authorization code.
  - **13b2a. The payment is declined:** the System shows the reason; the Cashier asks for another tender; the use case continues at step 13.
  - **13b2b. The Payment Service does not answer:** the System shows *"Card payment not available"*, logs the failure (IR-10) and keeps the rental open; the Cashier asks for cash (IR-02).
- **13c. Check payment** *(Could)*:
  1. The Cashier enters the check data.
  2. The System asks the Payment Service to authorize the check.
  3. If approved, the System records the check payment; if not, as in 13b2a.
- **15a. The Accounting System is not available:**
  1. The System completes the rental normally and puts the record in the local queue (IR-07).
  2. The record is sent automatically when the Accounting System is available again.
- **16a. The receipt printer has no paper or fails:**
  1. The System warns the Cashier and keeps the receipt.
  2. The Cashier fixes the printer and reprints the receipt.

**Special requirements**
- The rental fee is the rental fee per day multiplied by the number of days of the rental period. The due date is the day of the rental plus the rental period.
- The deposit is not taxed (working assumption, to be confirmed; see open issues).
- The rental receipt shows the item and its serial number, the rental fee, the tax, the deposit marked as refundable, the total, the tender, the due date, and the instruction to return the item by the due date.
- The receipt shows only the last 4 digits of a card number (NFR-08).

**Technology and data variations**
- 6: the serial number is read with a barcode scanner, or typed or picked from the item list.
- 13b: the card is read with the card reader (chip or contactless).
- 16: the receipt is printed on a thermal receipt printer (NFR-10).

**Frequency of occurrence:** occasional during opening hours; much less frequent than UC1.

**Open issues**
- What are the available rental periods, the rental fee per day and the deposit of each product? Is there a maximum rental period? (The prototype uses 1, 3 and 7 days as examples; glossary, open questions 2 and 3.)
- Is the deposit taxed? The working assumption is that only the rental fee is taxed (glossary, open question 8).
- For a card payment, is the deposit charged, or only held and released at the rental return? This changes steps 13b and UC5 ([external_interfaces.md](external_interfaces.md), open question 2).
- How is a customer identified? Where are the customer IDs registered, and which customer data is stored (data protection)?
- Can one rental include several items, possibly with different rental periods?
- What happens if two registers try to rent the same item at the same time?
- Does the Accounting System receive the deposit, or only the rental fee? (glossary, open question 7)

#### 3.2.4 UC4 Start Up

| | |
|---|---|
| **Use case** | UC4 Start Up |
| **Goal** | Start the register, send the records that are waiting from the previous session and open a cashier session for a valid cashier, so that the cashier can start working |
| **Level** | User goal (UC1, UC2, UC3 and UC5 need an open cashier session) |
| **Primary actor** | Cashier |
| **Supporting actors** | HR System, Accounting System |
| **Priority** | Must · build order 4 |
| **Trigger** | A cashier switches on the register at the beginning of the working day or of a shift, or restarts it after a failure |

**Stakeholders and interests**
- *Cashier*: a register that is ready in a few seconds; a simple login; a clear message when the login is rejected.
- *Store manager*: only valid cashiers work at the registers; the opening cash is recorded; nothing from the previous day is lost.
- *HR*: every later transaction is linked to the right employee (BR-13).
- *Accountant*: the records waiting from the previous session reach the Accounting System in order and without loss (BR-14).
- *System administrator*: clear logs of failed connections to the external systems (IR-10).
- *Customer*: the register is ready when the store opens, so there is no waiting.

**Preconditions**
- The register is switched on and has a register ID.
- No cashier session is open on this register.

**Success guarantees (postconditions)**
- A cashier session is open on this register for a valid, active cashier.
- The opening cash is recorded in the session.
- Every record waiting from the previous session has been sent to the Accounting System, or is still in the local queue in its original order.
- The main screen is shown, ready for UC1, UC2, UC3 and UC5.
- Every transaction made in the session will be linked to this cashier (BR-13).

**Failure guarantees**
- If the start-up fails, no cashier session is opened and no transaction can be made.
- No record in the queue is lost: a record leaves the queue only when the Accounting System has acknowledged it (IR-07).
- The PIN is never shown, logged or stored in plain text.

**Main success scenario**

| Actor action | System responsibility |
|---|---|
| 1. The Cashier switches on the register and starts the POS program. | 2. The System checks that the product catalog and the stored data are available. |
| | 3. The System sends the records waiting from the previous session to the Accounting System, in the order in which they were made, and removes each record from the queue when it is acknowledged (BR-14, IR-06, IR-07). |
| | 4. The System shows the login screen with the register ID. |
| 5. The Cashier enters his or her employee ID and PIN. | 6. The System checks with the HR System that the employee is a valid, active cashier (IR-08) and checks the PIN. |
| | 7. The System shows the name of the cashier and asks for the opening cash in the drawer. |
| 8. The Cashier counts the cash in the drawer and enters the amount. | 9. The System opens a cashier session for this cashier on this register (BR-13), records the opening cash and shows the main screen. |
| 10. The Cashier is ready to serve the first customer (UC1, UC2, UC3 or UC5). | |

**Extensions (alternative flows)**

- **\*a. At any time, the System fails (crash or power cut):**
  1. The Cashier restarts the register and the use case starts again at step 1.
  2. The System recovers the stored data, including the queue of records waiting for the Accounting System and any sale that was open (see UC1, extension \*a).
  3. No cashier session is open after the restart, so the Cashier logs in again (step 5).
- **2a. The product catalog or the stored data is not available (missing or damaged):**
  1. The System shows an error message and does not show the login screen.
  2. The Cashier calls the store manager or the system administrator. The use case ends and no cashier session is opened.
- **3a. The Accounting System is not available:**
  1. The System keeps the records in the local queue, in their original order, and logs the failed communication (IR-07, IR-10).
  2. The use case continues at step 4. The records are sent automatically when the Accounting System is available again.
- **3b. The Accounting System does not acknowledge a record:**
  1. The System keeps the record in the queue and sends it again later.
  2. The transaction ID lets the Accounting System ignore the record if it receives it twice (IR-07).
  3. The use case continues at step 4.
- **6a. The employee ID is not found or the employee is not an active cashier:**
  1. The System shows the message *"Employee ID not found or not an active cashier"* and does not open a session.
  2. The Cashier enters the data again (step 5), or asks the store manager for help.
- **6b. The PIN is wrong:**
  1. The System shows an error message and does not open a session.
  2. The Cashier enters the PIN again (step 5).
- **6c. The HR System is not available:**
  1. The System logs the failed communication (IR-10) and shows a short warning: *"HR System not available. Using the local employee list"* with the date and time of its last update.
  2. The System checks the employee ID against the local copy of the employee list (IR-09).
  3. If the employee is in the local copy, the use case continues at step 7.
  - **6c1. The employee is not in the local copy:** the System rejects the login as in 6a. The employee cannot log in until the HR System is available again.
  - **6c2. No local copy exists (first start-up):** the System shows the message *"HR System not available and no local employee list: the register cannot be started for sales"*. The use case ends and no cashier session is opened.
- **8a. The amount entered as opening cash is not valid (empty, not a number or negative):**
  1. The System rejects the amount and asks for it again.
  2. The Cashier enters the amount again (step 8).

**Special requirements**
- The register is ready for use in less than 30 seconds after the POS program starts (NFR-02). Sending the waiting records (step 3) must not delay this.
- The PIN is never shown on the screen, written to a log or stored in plain text (NFR-08).
- The role received from the HR System (*cashier* or *store manager*) decides what the employee may do in the session (NFR-07, BR-04).
- The login screen shows the register ID and, when the HR System is not available, the date and time of the last update of the local employee list.
- Failed communications with the external systems are logged without card data or other personal data (IR-10).

**Technology and data variations**
- 5: the employee ID and the PIN are typed on the keyboard.
- 8: the opening cash is typed on the keyboard.

**Frequency of occurrence:** at least once per cashier at the beginning of each shift, and after every restart of the register; much less often than UC1.

**Open issues**
- Where is the PIN checked, in the POS or in the HR System? The interface inventory ([external_interfaces.md](external_interfaces.md), section 3.4) only sends the employee ID.
- Is the login blocked after several wrong attempts?
- May a store manager open a cashier session, or only an employee with the role *cashier*?
- Is the opening cash compared with an expected amount (for example, the amount left by the previous session)?
- How long may the POS use the local employee list, and how often is it refreshed? A dismissed employee could still log in until the next synchronization ([external_interfaces.md](external_interfaces.md), open question 5).
- After a crash, should the previous cashier session continue, or must the cashier always log in again?
- There is no use case for logging out or closing the register at the end of the day. Who ends the cashier session?
- How long may the POS work without the Accounting System before a manager must be warned ([external_interfaces.md](external_interfaces.md), section 3.3)?

#### 3.2.5 UC5 Return Rental
*Pending (W07) – Alfonso. New use case decided in W06; one-paragraph description in [use_case_model.md](use_case_model.md).*

#### 3.2.6 Functional requirements

Derived from UC1. Requirements for UC2–UC5 will be added with their fully dressed use cases.

| ID | Requirement | Priority | Source |
|---|---|---|---|
| FR-01 | The system shall allow the cashier to start a new sale only inside an open cashier session. | Must | UC1 step 2–3, BR-13 |
| FR-02 | The system shall record a sale line item when the cashier enters a valid item identifier, and shall show the product description, price, quantity and running subtotal. | Must | UC1 step 4–5, BR-03 |
| FR-03 | The system shall reject an item identifier that is not in the product catalog and show an error message. | Must | UC1 ext. 4a |
| FR-04 | The system shall allow the cashier to enter a quantity for an item identifier and record one sale line item with that quantity. | Must | UC1 ext. 4b |
| FR-05 | The system shall allow the cashier to remove a sale line item before payment and update the running subtotal. | Should | UC1 ext. 4c |
| FR-06 | The system shall allow a store manager, and only a store manager, to override the price of a sale line item, and shall record who approved it. | Should | UC1 ext. 4d, BR-04 |
| FR-07 | The system shall allow the cashier to cancel a sale before payment, without changing stock levels. | Must | UC1 ext. 6–9a |
| FR-08 | When the sale is complete, the system shall obtain the tax from the Tax Calculator and show the total. | Must | UC1 step 7, BR-01, IR-04 |
| FR-09 | For a cash payment, the system shall reject an amount tendered lower than the total, show the change due and open the cash drawer. | Must | UC1 ext. 9a, BR-06 |
| FR-10 | For a credit card payment, the system shall complete the payment only after the Payment Service approves it, and shall record the authorization code. | Must | UC1 ext. 9b, BR-05, IR-01 |
| FR-11 | When a card payment is declined or the Payment Service does not answer, the system shall show the reason and keep the sale open for another tender. | Must | UC1 ext. 9b2a–b, IR-02 |
| FR-12 | The system shall accept check payments authorized by the Payment Service. | Could | UC1 ext. 9c |
| FR-13 | The system shall save every completed sale with its sale line items, tax, total, tender and cashier. | Must | UC1 step 11, BR-13 |
| FR-14 | The system shall reduce the stock level of each product sold and flag for reorder every product whose stock level falls below 10 units. | Must | UC1 step 11, ext. 11b, BR-09 |
| FR-15 | The system shall send every completed sale to the Accounting System, queueing it if the system is not available. | Must | UC1 step 11, ext. 11a, BR-14, IR-06, IR-07 |
| FR-16 | The system shall print a receipt with the store, date, cashier, sale line items, tax, total, tender and change, showing only the last 4 digits of a card. | Must | UC1 step 12 |
| FR-17 | The system shall allow the cashier to reprint the receipt of the last sale. | Should | UC1 ext. 12a |
| FR-30 | The system shall allow the cashier to start a new rental only inside an open cashier session, and shall link the rental to the cashier of the session. | Must | UC3 step 2–3, BR-13 |
| FR-31 | When the cashier enters a customer ID, the system shall check that the customer has no overdue rental, and shall refuse to start a rental for a customer who has one, with a clear message. | Must | UC3 step 4–5, ext. 5a, BR-12 |
| FR-32 | The system shall identify a rentable item by its serial number and show its description, item status, rental fee per day and deposit, and shall reject a serial number that is not in the item list. | Must | UC3 step 6–7, ext. 7a |
| FR-33 | The system shall allow only an item with the status *Available* to be rented, and shall show the status as the reason when an item cannot be rented. | Must | UC3 step 7, ext. 7b, BR-11 |
| FR-34 | The system shall let the cashier select the rental period, calculate the rental fee and the due date, and record a rental line item with the item, rental period, rental fee, due date and deposit. | Must | UC3 step 8–9, ext. 8a, BR-10 |
| FR-35 | When the rental is complete, the system shall obtain the tax of the rental fee from the Tax Calculator (the deposit is not taxed) and shall show the total: rental fee plus tax plus deposit. | Must | UC3 step 11, ext. 11a, BR-01, BR-02, IR-04, IR-05 |
| FR-36 | The system shall allow the cashier to cancel a rental before payment, without changing the item status. | Must | UC3 ext. 10–13a |
| FR-37 | The system shall accept payment of the total of a rental in cash (rejecting an amount lower than the total and showing the change due), by credit card only after authorization by the Payment Service, or by check *(Could)*. When a card payment is declined or the Payment Service does not answer, the system shall keep the rental open for another tender. | Must | UC3 step 13–14, ext. 13a–13c, BR-05, BR-06, IR-01, IR-02 |
| FR-38 | The system shall save every completed rental with its rental line item, tax, total, tender, customer and cashier, and shall change the status of the item from *Available* to *Rented*. | Must | UC3 step 15, BR-11, BR-13, IR-06, IR-07 |
| FR-39 | The system shall print a rental receipt with the item and its serial number, rental fee, tax, deposit (marked as refundable), total, tender and due date, showing only the last 4 digits of a card. | Must | UC3 step 16, ext. 16a |
| FR-40 | The system shall open a cashier session on the register for an employee identified as a valid, active cashier, and shall link every transaction made in the session to that cashier. | Must | UC4 step 9, BR-13, IR-08 |
| FR-41 | When the system starts, it shall check that the product catalog and the stored data are available, and if they are not, shall show an error message and not offer the login. | Must | UC4 step 2, ext. 2a |
| FR-42 | At start-up the system shall send the records waiting from the previous session to the Accounting System in the order in which they were made, and shall remove a record from the queue only after the Accounting System has acknowledged it. | Must | UC4 step 3, ext. 3a–3b, BR-14, IR-06, IR-07 |
| FR-43 | The system shall let the cashier log in with an employee ID, check with the HR System that the employee is a valid, active cashier, and reject an unknown or inactive employee with a clear message. | Must | UC4 step 5–6, ext. 6a, IR-08 |
| FR-44 | The system shall ask for a PIN together with the employee ID and accept the login only if the PIN is correct. The PIN shall never be shown, logged or stored in plain text. | Must | UC4 step 5–6, ext. 6b, NFR-08 |
| FR-45 | When the HR System is not available, the system shall warn the cashier, show the date and time of the last update of the local employee list and check the employee ID against that list. If no local list exists, the register shall not be started for sales. | Should | UC4 ext. 6c, IR-09, IR-10 |
| FR-46 | After every successful connection to the HR System, the system shall save a local copy of the employee list (employee ID, name, role and active status). | Should | UC4 ext. 6c, IR-09 |
| FR-47 | When the cashier session starts, the system shall ask for the opening cash in the drawer, reject an amount that is not valid and record the amount with the session. | Should | UC4 step 7–9, ext. 8a |
| FR-48 | After a restart following a failure, the system shall recover the stored data, including the queue of records waiting for the Accounting System and any open sale, and shall require the cashier to log in again. | Must | UC4 ext. \*a, UC1 ext. \*a |
| FR-49 | When a cashier session is opened, the system shall show the main screen with the name of the cashier and the register ID. | Should | UC4 step 9 |

### 3.3 Usability requirements
*Pending (W07) – Yasmine (from the cashier persona and the UI prototype).*

### 3.4 Performance requirements
- **NFR-01:** The system shall register a sale line item in less than 1 second.
- **NFR-02:** The system shall start up and be ready for use in less than 30 seconds.

### 3.5 Logical database requirements
*Pending (W07) – Borja (from the domain model: product descriptions, sales, payments, returns, rentals).*

### 3.6 Design constraints
*Pending (W07) – Haifa.*

### 3.7 Standards compliance
- **NFR-11:** The system shall comply with standard payment card data security (PCI-DSS) by masking card numbers on receipts (showing only last 4 digits).
- **NFR-12:** The system shall comply with data protection regulations (GDPR) by not storing unnecessary personal data.

### 3.8 Software system attributes
- **NFR-03 (Reliability):** The system must have an uptime of 99.9% during store hours.
- **NFR-04 (Reliability):** A completed sale must be saved locally even if the internet drops.
- **NFR-07 (Security):** The system must enforce role-based access control (e.g., manager override).
- **NFR-08 (Security):** All user passwords and payment data must be encrypted.
- **NFR-09 (Maintainability):** Adding a new payment method should take less than 3 development days.
- **NFR-10 (Compatibility):** The system must be fully compatible with standard receipt printers and scanners.

### 3.9 Supporting information
Stakeholders and cashier persona: [stakeholders.md](stakeholders.md). Elicitation techniques and interview questions: [elicitation_plan.md](elicitation_plan.md).

### 3.10 Business rules
BR-01 to BR-14 are defined in the [glossary](glossary.md), section 3. Rules marked *Proposed* are still to be confirmed.

## 4. Verification
All requirements will be verified using one of three methods: **Inspection** (I), **Demonstration** (D), or **Test** (T). 

| Req ID | Verification Method | Description |
|---|---|---|
| FR-01 to FR-17 | Test / Demonstration | Functional tests using simulated external systems. |
| NFR-01, NFR-02 | Test | Automated performance testing (response time < 1s). |
| NFR-03, NFR-04 | Demonstration | Simulate internet drop and verify local storage. |
| NFR-07, NFR-08 | Inspection | Code review and security audit of authentication. |
| NFR-09, NFR-10 | Inspection | Review of documentation and hardware compatibility list. |

### 4.1 Acceptance criteria – UC1 Process Sale

The acceptance criteria below check the main scenario and the most important extensions of UC1 (section 3.2.1). Each criterion is written as **Given / When / Then**. They are verified by **Test**, with the Tax Calculator, the Payment Service and the Accounting System replaced by simulators. The detailed test cases (TC-xx) are in the traceability matrix of [requirements_conventions.md](requirements_conventions.md).

**Test data used in the examples**
- Cashier session open (UC4 completed); the Tax Calculator simulator returns 10 % of the subtotal.
- Item **1001** "Notebook": price 10.00, stock 25. Item **1002** "Pen": price 5.00, stock 40. Item **9999** is not in the product catalog.

| ID | Case | UC1 flow | Requirements | Test cases |
|---|---|---|---|---|
| AC-01 | Normal sale, credit card approved | Main scenario | FR-01, FR-02, FR-04, FR-08, FR-10, FR-13 to FR-16 | TC-01, TC-02, TC-04, TC-08, TC-10, TC-13 to TC-16 |
| AC-02 | Invalid item identifier | Ext. 4a | FR-03 | TC-03 |
| AC-03 | Cash payment with change | Ext. 9a | FR-09 | TC-09 |
| AC-04 | Credit card declined | Ext. 9b2a | FR-11 | TC-11 |
| AC-05 | Payment Service not available | Ext. 9b2b | FR-11 | TC-11 |

#### AC-01 – Normal sale, credit card approved
- **Given** a cashier session is open, the item catalog contains items 1001 and 1002, and the Tax Calculator, the Payment Service and the Accounting System are available.
- **When** the cashier starts a new sale, enters item 1001 (quantity 1) and item 1002 (quantity 2), ends the sale and pays by credit card, and the Payment Service approves the payment.
- **Then**
  - after each entry, the system shows a sale line item with description, price, quantity and running subtotal (10.00, then 20.00);
  - after the sale is ended, the system shows tax 2.00 and total 22.00 (BR-01);
  - the sale is saved with its line items, tax, total, tender, authorization code and cashier (BR-13);
  - the stock of item 1001 is 24 and the stock of item 1002 is 38;
  - the receipt is printed and shows only the last 4 digits of the card;
  - the sale is sent to the Accounting System (BR-14).

#### AC-02 – Invalid item identifier
- **Given** a sale is open and item 9999 is not in the product catalog.
- **When** the cashier enters item identifier 9999.
- **Then**
  - the system shows an error message and rejects the entry;
  - no sale line item is added and the running subtotal does not change;
  - the cashier can enter another item and continue the sale.

#### AC-03 – Cash payment with change
- **Given** a sale with total 22.00 is ready for payment.
- **When** the cashier chooses cash and enters an amount tendered of 20.00.
- **Then** the system rejects the amount, asks for at least the total and does not complete the sale (BR-06).
- **When** the cashier then enters an amount tendered of 50.00.
- **Then**
  - the system shows change due 28.00 and opens the cash drawer;
  - the cash payment is recorded, the sale is completed and the receipt is printed.

#### AC-04 – Credit card declined
- **Given** a sale with total 22.00 is ready for payment and the Payment Service simulator declines the card.
- **When** the cashier chooses credit card payment.
- **Then**
  - the system shows the reason for the refusal;
  - the sale stays open: no sale is saved as completed, the stock levels do not change, no receipt is printed and nothing is sent to the Accounting System (BR-05);
  - the cashier can ask for another tender, pay by cash as in AC-03 and complete the sale.

#### AC-05 – Payment Service not available
- **Given** a sale with total 22.00 is ready for payment and the Payment Service simulator does not answer.
- **When** the cashier chooses credit card payment.
- **Then**
  - the system shows the message *"Card payment not available"*;
  - the failed communication is logged without card data or other personal data (IR-10);
  - the sale stays open and no card payment is completed without authorization (BR-05, IR-02);
  - the cashier asks for cash and completes the sale as in AC-03.

## 5. Appendices

### 5.1 Glossary
See [glossary.md](glossary.md).

### 5.2 Traceability matrix
The full traceability matrix linking the requirements (FR-01 to FR-17), use cases, planned design elements, and test cases is maintained in the [Requirements Conventions document](requirements_conventions.md), section 4. 
