# Use Case Model (Overview) – NewEra POS

| | |
| --- | --- |
| **Maintainer** | Borja Nicolás |
| **Version** | 0.1 (draft for review) |
| **Last updated** | W06 |
| **Part of** | SRS (Assignment 1), ISO/IEC/IEEE 29148 – product functions and external interfaces |

## 1. Purpose

This document gives the **overview** of what NewEra POS does from the point of view of its users and of the systems around it: who takes part (actors) and which goals the system supports (use cases). It extends the simple use case diagram presented in the W05 report with the details of the [external interfaces inventory](external_interfaces.md), and it is the starting point for the *product functions* section of the [SRS](SRS.md).

Each use case is described here in **one paragraph**. The **fully dressed use cases** (main flow, alternative flows, pre- and postconditions) are planned for W07. Terms are used as defined in the [glossary](glossary.md) and business rules are referred to by their ID (for example, BR-05). The data exchanged with the external systems is described in [external_interfaces.md](external_interfaces.md).

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

**The Customer is not shown as an actor.** The customer takes part in the sale, return and rental at the till, but only through the cashier: the customer does not use the POS terminal directly. The W05 diagram shows the customer in the same way, as a note outside the system. The customer's interests are described in [stakeholders.md](stakeholders.md). The project scope counts two actors (Cashier and Customer), so if the team prefers to show the customer as an actor, the diagram can be updated without changing the use cases (see open question 1).

## 4. Use case list

The use cases are numbered as in the [project overview](../project_overview.md). The *External systems* column follows the [external interfaces inventory](external_interfaces.md).

| ID | Use case | Primary actor | External systems involved | Main business rules | Build order\* |
| --- | --- | --- | --- | --- | --- |
| UC1 | Process Sale | Cashier | Payment Service, Tax Calculator, Accounting System | BR-01 to BR-03, BR-05, BR-06, BR-09, BR-13, BR-14 | 1 |
| UC2 | Handle Returns | Cashier | Payment Service, Tax Calculator, Accounting System | BR-01, BR-07, BR-08, BR-13, BR-14 | 2 |
| UC3 | Process Rental | Cashier | Payment Service, Tax Calculator, Accounting System | BR-01, BR-05, BR-10 to BR-14 | 3 |
| UC4 | Start Up | Cashier | HR System, Accounting System (pending records) | BR-13 | 4 |

\* Planned order of implementation in increment 3 (W12–W15), as decided in W05: Process Sale first, then Returns, Rental and Start Up.

## 5. Use case descriptions

### UC1 – Process Sale

**Goal:** sell items to a customer and give the customer a receipt. **Primary actor:** Cashier. **External systems:** Payment Service, Tax Calculator, Accounting System.

A customer comes to the register with the items to buy. The cashier starts a new sale and enters each item by its item identifier (for example, by scanning it); for each one, the POS shows the product description and the price and adds a sale line item (BR-03). When the last item has been entered, the POS asks the Tax Calculator for the tax (BR-01; if it is not available, the default tax rate is used, BR-02) and shows the total. The customer pays by cash (the POS checks that the amount tendered covers the total and calculates the change due, BR-06) or by credit card (the payment must be authorized by the Payment Service first, BR-05). When the payment is accepted, the POS completes the sale, updates the stock levels (a product that falls below the reorder threshold must be reordered, BR-09), prints the receipt, links the sale to the cashier of the current session (BR-13) and sends the sale to the Accounting System (BR-14).

### UC2 – Handle Returns

**Goal:** take back items that a customer bought and refund the customer. **Primary actor:** Cashier. **External systems:** Payment Service, Tax Calculator, Accounting System.

A customer brings back one or more items that were bought in the store. The cashier starts a return, identifies the original sale (normally with the receipt) and enters the items that are being returned. The POS checks that the return is allowed (a refund is given only for an item with a valid receipt, returned within the refund period, BR-07) and calculates the refund, using the Tax Calculator for the tax of the returned items (BR-01). The refund is paid with the same tender that was used in the original sale (BR-08): cash from the drawer, or a refund to the credit card through the Payment Service. The POS then updates the stock levels, prints a return receipt, links the return to the cashier (BR-13) and sends it to the Accounting System (BR-14).

### UC3 – Process Rental

**Goal:** rent equipment to a customer for a limited period. **Primary actor:** Cashier. **External systems:** Payment Service, Tax Calculator, Accounting System.

A customer wants to rent an item instead of buying it. The cashier starts a rental and identifies the item. The POS checks that the item has the status *Available* (BR-11) and that the customer has no overdue rental (BR-12). The cashier sets the rental period, and the POS records a rental line item with the rental fee, the due date and the deposit that is required for every rental (BR-10). The POS gets the tax from the Tax Calculator (BR-01) and shows the total, which includes the deposit. The customer pays by cash or by credit card (authorized by the Payment Service, BR-05). The POS then changes the item status to *Rented*, prints the rental receipt, links the rental to the cashier (BR-13) and sends it to the Accounting System (BR-14).

### UC4 – Start Up

**Goal:** start the POS so that it is ready for the cashier to work. **Primary actor:** Cashier. **External systems:** HR System, Accounting System.

At the beginning of the working day, the cashier starts the register. The POS checks that it can work (for example, that the product catalog and the stored data are available) and sends to the Accounting System any record that is still waiting from the previous session. The cashier then identifies himself or herself with the employee ID, and the POS asks the HR System whether the employee is a valid, active cashier; if the HR System is not available, the POS uses the local copy of the employee list from the last successful connection (see [external_interfaces.md](external_interfaces.md), section 3.4). When the cashier is accepted, the POS opens a cashier session, so that every transaction made afterwards is linked to this cashier (BR-13), and shows the main screen, ready for UC1, UC2 and UC3.

## 6. Assumptions and open questions

Source checked so far: project proposal (W01), W05 report, glossary and external interfaces inventory (W06). The full case study has not been checked yet, so the descriptions above are **first drafts** and will be corrected in W07.

1. **Customer as an actor?** The project scope (README, project overview and W05 slides) counts two actors, Cashier and Customer, while this model and the W05 diagram show the customer only as a stakeholder who acts through the cashier. Which view do we use in the SRS?
2. **Return of a rented item.** Where is the return of a rented item (and the refund of the deposit, BR-10) described: as part of UC2 Handle Returns, as part of UC3 Process Rental, or as a separate use case? The proposal lists only four use cases, so for now it is not covered by any of them.
3. **Number of payment methods.** The W05 slides say 2 payment methods (cash and credit card), while the W01 notes and the glossary (open question 4) speak of 3 and assume the third is *check*. UC1 to UC3 describe only cash and credit card until the team checks the case and confirms the number.
4. **Content of UC4 Start Up.** Which steps belong to the start up (for example, entering the opening cash, loading the catalog and tax data) and whether the cashier login is part of UC4 or a separate step. To be decided with the fully dressed use cases.
5. **Who starts UC4?** Here the cashier starts the system. If the system administrator can also do it (see [stakeholders.md](stakeholders.md)), the System Administrator would be a second primary actor of UC4.
6. **Rental and return rules** (refund period, deposit amount, rental period, late fee) are still open in the glossary and will change the details of UC2 and UC3.

## 7. Next steps (W07)

- Write the fully dressed use cases UC1–UC4 (UC1 Process Sale – Alfonso, UC2 Handle Returns – Yasmine, UC3 Process Rental and UC4 Start Up – Avni), using this overview and the [external interfaces inventory](external_interfaces.md).
- Update this document and the diagram with the decisions on the open questions above.
- Link each use case to its functional requirements (FR-xx) in the traceability matrix.
