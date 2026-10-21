# Use Case Model (Overview) – NewEra POS

| | |
| --- | --- |
| **Maintainer** | Borja Nicolás |
| **Version** | 0.2 (draft for review; adds UC5 and the W06 team decisions) |
| **Last updated** | W06 |
| **Part of** | SRS (Assignment 1), ISO/IEC/IEEE 29148 – product functions and external interfaces |

## 1. Purpose

This document gives the **overview** of what NewEra POS does from the point of view of its users and of the systems around it: who takes part (actors) and which goals the system supports (use cases: five, since the W06 analysis). It extends the simple use case diagram presented in the W05 report with the details of the [external interfaces inventory](external_interfaces.md), and it is the starting point for the *product functions* section of the [SRS](SRS.md).

Each use case is described here in **one paragraph**. The **fully dressed use cases** (main flow, extensions, pre- and postconditions) are written in the [SRS](SRS.md): UC1 is already there and UC2–UC5 are planned for W07. Terms are used as defined in the [glossary](glossary.md) and business rules are referred to by their ID (for example, BR-05). The data exchanged with the external systems is described in [external_interfaces.md](external_interfaces.md).

## 2. Use case diagram

![NewEra POS use case diagram](../../assets/use_case_diagram.png)

*Editable source: [`assets/use_case_diagram.puml`](../../assets/use_case_diagram.puml) (PlantUML).*

## 3. Actors

| Actor | Type | Description |
| --- | --- | --- |
| **Cashier** | Primary actor | Store employee who operates the register and starts all four use cases. |
| **Payment Service** | Supporting actor (external system) | Authorizes or declines credit card payments and card refunds. Called *Payment Authorization* in the W05 slides; the glossary term is used here. |
| **Tax Calculator** | Supporting actor (external system) | Calculates the tax of a transaction (BR-01). |
| **Accounting System** | Supporting actor (external system) | Receives the completed transactions for bookkeeping (BR-14). |
| **HR System** | Supporting actor (external system) | Confirms that an employee is valid and gives the employee's role. |

**The Customer is not shown as an actor.** The customer takes part in the sale, return and rental at the till, but only through the cashier: the customer does not use the POS terminal directly. The team decided this in W06 (see section 6 and the [SRS](SRS.md), section 1.3.2): an actor interacts directly with the system, and the customer only does so through the cashier. The W01 scope of 2 actors therefore becomes 1 primary actor and 4 supporting actors. The customer's interests are described in [stakeholders.md](stakeholders.md).

## 4. Use case list

The use cases are numbered as in the [project overview](../project_overview.md). The *External systems* column follows the [external interfaces inventory](external_interfaces.md).

| ID | Use case | Priority | Primary actor | External systems involved | Main business rules | Build order\* |
| --- | --- | --- | --- | --- | --- | --- |
| UC1 | Process Sale | Must | Cashier | Payment Service, Tax Calculator, Accounting System | BR-01 to BR-03, BR-05, BR-06, BR-09, BR-13, BR-14 | 1 |
| UC2 | Handle Returns | Must | Cashier | Payment Service, Tax Calculator, Accounting System | BR-01, BR-07, BR-08, BR-13, BR-14 | 2 |
| UC3 | Process Rental | Should | Cashier | Payment Service, Tax Calculator, Accounting System | BR-01, BR-05, BR-10 to BR-14 | 3 |
| UC4 | Start Up | Must | Cashier | HR System, Accounting System (pending records) | BR-13 | 4 |
| UC5 | Return Rental | Should | Cashier | Payment Service, Tax Calculator, Accounting System | BR-01, BR-10, BR-11, BR-13, BR-14 | 5 (to be confirmed) |

Priorities are those of the [SRS](SRS.md), section 1.3.2 (MoSCoW). \* Planned order of implementation in increment 3 (W12–W15), as decided in W05: Process Sale first, then Returns, Rental and Start Up. The place of UC5, which is new, is still to be confirmed.

## 5. Use case descriptions

### UC1 – Process Sale

**Goal:** sell items to a customer and give the customer a receipt. **Primary actor:** Cashier. **External systems:** Payment Service, Tax Calculator, Accounting System.

A customer comes to the register with the items to buy. The cashier starts a new sale and enters each item by its item identifier (for example, by scanning it); for each one, the POS shows the product description and the price and adds a sale line item (BR-03). When the last item has been entered, the POS asks the Tax Calculator for the tax (BR-01; if it is not available, the default tax rate is used, BR-02) and shows the total. The customer pays by cash (the POS checks that the amount tendered covers the total and calculates the change due, BR-06), by credit card (the payment must be authorized by the Payment Service first, BR-05) or, with priority *Could*, by check (also authorized by the Payment Service). When the payment is accepted, the POS completes the sale, updates the stock levels (a product that falls below the reorder threshold must be reordered, BR-09), prints the receipt, links the sale to the cashier of the current session (BR-13) and sends the sale to the Accounting System (BR-14).

### UC2 – Handle Returns

**Goal:** take back items that a customer bought and refund the customer. **Primary actor:** Cashier. **External systems:** Payment Service, Tax Calculator, Accounting System.

A customer brings back one or more items that were bought in the store. The cashier starts a return, identifies the original sale (normally with the receipt) and enters the items that are being returned. The POS checks that the return is allowed (a refund is given only for an item with a valid receipt, returned within the refund period, BR-07) and calculates the refund, using the Tax Calculator for the tax of the returned items (BR-01). The refund is paid with the same tender that was used in the original sale (BR-08): cash from the drawer, or a refund to the credit card through the Payment Service. The POS then updates the stock levels, prints a return receipt, links the return to the cashier (BR-13) and sends it to the Accounting System (BR-14).

### UC3 – Process Rental

**Goal:** rent equipment to a customer for a limited period. **Primary actor:** Cashier. **External systems:** Payment Service, Tax Calculator, Accounting System.

A customer wants to rent an item instead of buying it. The cashier starts a rental and identifies the item. The POS checks that the item has the status *Available* (BR-11) and that the customer has no overdue rental (BR-12). The cashier sets the rental period, and the POS records a rental line item with the rental fee, the due date and the deposit that is required for every rental (BR-10). The POS gets the tax from the Tax Calculator (BR-01) and shows the total, which includes the deposit. The customer pays by cash, by credit card (authorized by the Payment Service, BR-05) or by check (*Could*). The POS then changes the item status to *Rented*, prints the rental receipt, links the rental to the cashier (BR-13) and sends it to the Accounting System (BR-14). Bringing the item back is a separate use case (UC5).

### UC4 – Start Up

**Goal:** start the POS so that it is ready for the cashier to work. **Primary actor:** Cashier. **External systems:** HR System, Accounting System.

At the beginning of the working day, the cashier starts the register. The POS checks that it can work (for example, that the product catalog and the stored data are available) and sends to the Accounting System any record that is still waiting from the previous session. The cashier then identifies himself or herself with the employee ID, and the POS asks the HR System whether the employee is a valid, active cashier; if the HR System is not available, the POS uses the local copy of the employee list from the last successful connection (see [external_interfaces.md](external_interfaces.md), section 3.4). When the cashier is accepted, the POS opens a cashier session, so that every transaction made afterwards is linked to this cashier (BR-13), and shows the main screen, ready for UC1, UC2 and UC3.

### UC5 – Return Rental

**Goal:** take back rented equipment and close the rental. **Primary actor:** Cashier. **External systems:** Payment Service, Tax Calculator, Accounting System.

*New in W06 (see section 6).* A customer brings back equipment that was rented earlier, in a different visit from the one in which it was rented. The cashier starts a rental return and identifies the rental (normally with the rental receipt or the item), and the POS shows the rental, its due date and its deposit. The cashier checks the condition of the item. If the item is returned after its due date, the POS calculates the late fee (the amount is still an open question). If the item is returned undamaged, the deposit is refunded (BR-10), minus the late fee if there is one; when a card is involved the amount goes through the Payment Service, and the tax of any charge is obtained from the Tax Calculator (BR-01). The POS then changes the item status to *Available* again (BR-11), prints a receipt, links the return to the cashier (BR-13) and sends it to the Accounting System (BR-14).

## 6. Decisions and open questions

Source checked so far: project proposal (W01), W05 report, W06 team decisions (SRS v0.1), glossary and external interfaces inventory. The full case study has not been checked yet, so the descriptions above are **first drafts** and will be corrected in W07.

### 6.1 Decided in W06

These were open questions in version 0.1 of this document. The team decided them in W06 and applied them in the [SRS](SRS.md) (section 1.3).

| # | Question | Decision |
| --- | --- | --- |
| 1 | Is the Customer an actor? | **No**: the customer is a stakeholder who acts only through the Cashier (as in the NextGen POS case). 1 primary actor + 4 supporting actors. |
| 2 | Where does the return of a rented item go? | **New use case UC5 Return Rental**: it happens in a different visit, with a different goal and rules (condition check, late fee, deposit refund). It is neither part of UC2 nor an extension of UC3. Scope: 4 → 5 use cases. |
| 3 | How many payment methods? | **Three**: cash, credit card and check. Check is authorized by the Payment Service and has priority *Could*. |

### 6.2 Still open

1. **Content of UC4 Start Up.** Which steps belong to the start up (for example, entering the opening cash, loading the catalog and tax data) and whether the cashier login is part of UC4 or a separate step. To be decided with the fully dressed use case.
2. **Who starts UC4?** Here the cashier starts the system. If the system administrator can also do it (see [stakeholders.md](stakeholders.md)), the System Administrator would be a second primary actor of UC4.
3. **Rental and return rules** (refund period, deposit amount, rental period, late fee) are still open in the glossary and will change the details of UC2, UC3 and UC5.
4. **Deposit and late fee in UC5.** How the late fee is calculated and whether it is taken from the deposit or paid separately; whether the Accounting System receives the deposit (glossary, open question 7).
5. **Order of construction of UC5** in increment 3 (it is new, with priority *Should*).

## 7. Next steps (W07)

- Write the fully dressed use cases UC2–UC5 in the [SRS](SRS.md) (UC2 Handle Returns – Yasmine, UC3 Process Rental and UC4 Start Up – Avni, UC5 Return Rental – to be assigned), using this overview and the [external interfaces inventory](external_interfaces.md).
- Add the system sequence diagram of UC1 and the domain model (SRS section 3.5), which are my part of the UML work.
- Link each use case to its functional requirements (FR-xx) in the traceability matrix.
