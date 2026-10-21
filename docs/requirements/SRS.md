# Software Requirements Specification – NewEra POS

Team D · Software Engineering · BUAA
Structure based on ISO/IEC/IEEE 29148:2018

| Version | Date | Author | Changes |
|---|---|---|---|
| 0.1 | 2026-10-21 | Alfonso Pinto | First draft: sections 1 and 2; team decisions on actors, payment methods and UC5; links to the W06 requirement documents; UC1 Process Sale fully dressed; functional requirements FR-01 to FR-17 (UC1) |
| 0.2 | 2026-10-21 | Alfonso Pinto | Review #19 (Avni): goals in §1.2 linked to measurable requirements (NFR, FR, BR) |

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

NewEra POS runs on the registers of the store. It is a new system that replaces manual checkout. It has **one primary actor**, the Cashier, and **four supporting actors**, the external systems. The Customer is a **stakeholder**, not an actor: the customer takes part in sales, returns and rentals only through the cashier and never uses the register directly.

| External element | Type | Interaction |
|---|---|---|
| Cashier | Primary actor | Operates the register in all use cases |
| Customer | Stakeholder | Buys, returns or rents items and pays, through the cashier |
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
- Business rules marked *Proposed* in the [glossary](glossary.md) (refund period, deposit amount, rental period, late fee) still have to be confirmed against the full case study.

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
*Pending (W07) – Avni. One-paragraph description in [use_case_model.md](use_case_model.md).*

#### 3.2.4 UC4 Start Up
*Pending (W07) – Avni. One-paragraph description in [use_case_model.md](use_case_model.md).*

#### 3.2.5 UC5 Return Rental
*Pending (W07) – to be assigned. New use case decided in W06.*

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

### 3.3 Usability requirements
*Pending (W07) – Yasmine (from the cashier persona and the UI prototype).*

### 3.4 Performance requirements
*Pending (W07) – Josué (NFR-xx from [quality_goals.md](quality_goals.md)).*

### 3.5 Logical database requirements
*Pending (W07) – Borja (from the domain model: product descriptions, sales, payments, returns, rentals).*

### 3.6 Design constraints
*Pending (W07) – Haifa.*

### 3.7 Standards compliance
*Pending (W07) – Josué (payment card data, data protection).*

### 3.8 Software system attributes
*Pending (W07) – Josué: reliability, availability, security, maintainability, compatibility (NFR-xx from [quality_goals.md](quality_goals.md)).*

### 3.9 Supporting information
Stakeholders and cashier persona: [stakeholders.md](stakeholders.md). Elicitation techniques and interview questions: [elicitation_plan.md](elicitation_plan.md).

### 3.10 Business rules
BR-01 to BR-14 are defined in the [glossary](glossary.md), section 3. Rules marked *Proposed* are still to be confirmed.

## 4. Verification
*Pending (W07) – Josué: verification method of each requirement (inspection, demonstration, test) and traceability matrix. Avni: acceptance criteria for UC1.*

## 5. Appendices

### 5.1 Glossary
See [glossary.md](glossary.md).

### 5.2 Traceability matrix
*Pending (W07) – Josué.*
