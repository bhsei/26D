# Architecture Drivers – NewEra POS

Team D · Software Engineering · BUAA · Increment 2 (Design)

| Version | Date | Author | Changes |
|---|---|---|---|
| 0.1 | 2026-10-27 | Alfonso Pinto | First draft: functional drivers, quality attribute drivers with utility tree, constraints (linked to DC-01–DC-08), trade-offs |

> **Status: draft.** First step of the architecture process (identify the drivers → define the system interfaces → create the structure). It is the input for the architecture document (`architecture.md`, ISO/IEC/IEEE 42010) and for the W11 design milestone.

## 1. Purpose

*Architecture drivers* are the requirements that have the most influence on the structure of the system. They guide the architecture decisions; the other requirements are implemented on top of that structure. There are three kinds:

- **Functional drivers**: the use cases that shape the architecture.
- **Quality attribute drivers**: measurable quality requirements, prioritized.
- **Constraints**: decisions already taken that limit the design. All constraints are drivers.

Sources: [SRS](../requirements/SRS.md) (use cases UC1–UC5, FR-xx), [NFRs](../requirements/nfrs.md) and SRS §3.3 (NFR-01–NFR-18), [external interfaces](../requirements/external_interfaces.md) and SRS §3.1 (IR-01–IR-14), design constraints in SRS §3.6 (DC-01–DC-08), [project plan](../../plans/project_plan.md).

## 2. Functional drivers

Not every functional requirement is a driver. A use case is selected when it is important for the business goals, complex to implement, or contains a scenario that is relevant for the architecture.

| ID | Use case / scenario | Why it is a driver | Main requirements |
|---|---|---|---|
| FD-1 | **UC1 Process Sale** | Core business of the store and most frequent use case. Uses three external systems in one transaction (Tax Calculator, Payment Service, Accounting System). Sets the performance at the counter. | FR-01–FR-17, IR-01, IR-04, IR-06, NFR-01, NFR-06 |
| FD-2 | **External system failures** (extensions of UC1–UC5) | Every use case must go on when an external system is down: default tax rate, cash instead of card, local accounting queue, local employee list. This decides how the POS stores data locally and talks to the external systems. | IR-02, IR-05, IR-07, IR-09, IR-10, NFR-04 |
| FD-3 | **UC4 Start Up** | Opens the cashier session that every other use case needs; authenticates the employee with the HR System; sends the records left from the previous session. Sets security and recovery. | FR-40–FR-49, IR-08, IR-09, NFR-02, NFR-07 |
| FD-4 | **UC3 Process Rental + UC5 Return Rental** | One physical item with a state (*Available*, *Rented*, *Under maintenance*) that must be the same for every register; a deposit that is paid in one visit and refunded in another. | FR-30–FR-39, FR-50–FR-59, BR-10–BR-12 |
| FD-5 | **UC2 Handle Returns** (card refund) | Needs to find an earlier sale and to send refunds to the card of that sale through the Payment Service. | FR-20–FR-29, IR-03, BR-07, BR-08 |

Not drivers (implemented on top of the structure): reprint receipt (FR-17), remove a line item (FR-05), cancel a transaction (FR-07, FR-36, FR-56), receipt contents (FR-16, FR-39, FR-59), screen layout and messages (NFR-13–NFR-18, covered by the UI prototype).

## 3. Quality attribute drivers

### 3.1 Utility tree

Each quality attribute is refined into a measurable scenario. Every scenario has two ratings:
**(importance for the store, technical difficulty)**, each H (high), M (medium) or L (low).

| Quality attribute | ID | Scenario (stimulus → response, measure) | Source | Rating |
|---|---|---|---|---|
| **Performance** | QA-01 | The cashier scans an item during a busy hour → the line item appears with description, price and subtotal in **< 1 s**. | NFR-01 | **(H, M)** |
| | QA-02 | The cashier switches on the register → the login screen is ready in **< 30 s**, also when records are waiting for the Accounting System. | NFR-02, UC4 | (M, M) |
| **Reliability / availability** | QA-03 | During store hours the register is used continuously → it is available **99.9 %** of the time. | NFR-03 | **(H, H)** |
| | QA-04 | The network goes down in the middle of a sale → the sale is completed and saved locally; when the network is back, every record reaches the Accounting System **in order, without loss and without duplicates**. | NFR-04, IR-07 | **(H, H)** |
| | QA-05 | The Payment Service does not answer → after **10 s** the cashier is told, can retry the card payment or use another tender, and the transaction stays open; **no card payment is completed without authorization**. | IR-02, BR-05 | **(H, L)** |
| | QA-06 | The Tax Calculator does not answer → the default tax rate is applied and the transaction is flagged for correction; the cashier can go on. | IR-05, BR-02 | (M, L) |
| | QA-07 | The HR System does not answer at login → a known cashier can still log in with the local employee list (PIN kept only as a salted hash). | IR-08, IR-09, DR-11 | (M, M) |
| **Security** | QA-08 | A cashier tries to override a price → the system refuses; a store manager who identifies himself or herself can do it, and the override is recorded. | NFR-07, BR-04 | **(H, M)** |
| | QA-09 | A card payment is completed → no full card number is stored after the transaction or written to logs; receipts show only the last 4 digits; passwords and PINs are stored encrypted. | NFR-08, NFR-11, IR-10 | **(H, M)** |
| | QA-10 | Personal data of customers and employees → only the data needed for the use cases is kept. | NFR-12 | (M, L) |
| **Usability** | QA-11 | A standard sale after the items are entered → completed in **3 clicks or fewer**. | NFR-06 | (H, L) |
| | QA-12 | A new cashier → can process a standard sale and a return after **15 min** of training. | NFR-05 | (M, M) |
| **Modifiability** | QA-13 | The store wants a new payment method → it is added in **< 3 development days** without changing the sale logic. | NFR-09 | **(M, H)** |
| | QA-14 | A simulated external system is replaced by the real one → only its adapter changes, not the use cases. | Constraint C-01 (derived) | (H, M) |
| **Compatibility** | QA-15 | The store connects a standard thermal printer or USB scanner → it works without custom drivers. | NFR-10, IR-11–IR-14 | (M, L) |
| **Data consistency** | QA-16 | Two registers try to rent the same item at the same time → only one rental succeeds. | BR-11, DR-02, UC3 open issue | (M, H) |

### 3.2 Priority drivers

The scenarios rated (H, H), (H, M) and (M, H) drive the first architecture decisions:

1. **QA-04 Offline operation without data loss** and **QA-03 availability**: the POS must work on its own and keep local, durable storage, with a queue towards the Accounting System.
2. **QA-01 Fast line entry**: entering items must not depend on any external system (tax and payment are called only at the end of the sale).
3. **QA-08 / QA-09 Security of roles and card data**.
4. **QA-13 / QA-14 Modifiability of payment methods and external systems**: each external system and each tender behind its own interface.
5. **QA-16 Item status shared between registers.**

### 3.3 Trade-offs

No architecture can maximize every attribute; these conflicts must be decided explicitly:

| Trade-off | Conflict | Current position |
|---|---|---|
| Availability vs. consistency | Working offline (QA-04, QA-07) means the Accounting System and the HR data are only *eventually* consistent; a dismissed employee could log in with the local list until the next sync. | Availability first for sales; consistency first for card payments (no offline authorization). To be confirmed (external interfaces, open questions 1 and 5). |
| Availability vs. security | Accepting card payments while the Payment Service is down would keep sales going, but breaks BR-05. | Security first: card payments always need authorization (QA-05). |
| Performance vs. integration | Calling external systems inside the sale adds latency. | Calls only at the end of the sale (tax at `endSale`, payment at `makePayment`); line entry stays local (QA-01). |
| Usability vs. security | Manager identification for price overrides and PIN login add steps for the cashier. | Accept the extra steps only for exceptions (override) and login; the standard sale stays at 3 clicks (QA-11). |

## 4. Constraints

| ID | Type | Constraint | Effect on the architecture | SRS |
|---|---|---|---|---|
| C-01 | Technical | The real Payment Service, Tax Calculator, Accounting System and HR System are not available; they are **simulated with stubs** that follow IR-01–IR-10. | Each external system behind an interface (adapter) that can be replaced (QA-14). | DC-01, DC-02 |
| C-02 | Technical | The POS runs on the store's **registers**, with barcode scanner, card reader, thermal receipt printer and cash drawer. | Device access behind its own layer; standard devices only (NFR-10). | DC-03 |
| C-03 | Legal | Payment card data (PCI-DSS) and personal data (GDPR) rules. | No storage of full card numbers; minimal personal data (NFR-11, NFR-12). | DC-06 |
| C-04 | Management | Team of **6 students** with different backgrounds, working part-time. | Simple, well-known architecture style; clear separation so that people can work in parallel. | DC-07 |
| C-05 | Management | **Schedule:** design ready in W11, build and test in W12–W15, launch in W16 (iterative-incremental process). | UC1 must work end to end first; the structure must allow adding UC2–UC5 incrementally. | DC-07 |
| C-06 | Management | No budget: free and open-source tools only. | Open-source language, database and libraries. | – |
| C-07 | Documentation | Architecture described following **ISO/IEC/IEEE 42010**. | Views and decisions recorded in `architecture.md`. | – |
| C-08 | Technical (open) | Programming language and platform **not decided yet** (team skills: Java, Python, C/C++, web; the UI prototype is HTML). | Decision to be taken in W8 with the architecture style (AD-02, AD-03 in `architecture.md`). | DC-04 |

## 5. Open questions that affect the architecture

1. Is an offline (deferred) card authorization for small amounts allowed? ([external_interfaces.md](../requirements/external_interfaces.md), open question 1)
2. For rentals paid by card, is the deposit charged or only held (pre-authorization)? (UC3, UC5)
3. How many registers does a store have, and do they share one database? (QA-16)
4. How long may a register work without the Accounting System before a manager is warned? (UC4 open issues)

Closed: the PIN is checked by the HR System; the local employee list keeps it only as a salted hash (IR-08, IR-09, review #23).

## 6. Next steps

- **Step 2 – System interfaces:** turn the system operations of the system sequence diagrams and the operation contracts (`makeNewSale`, `enterItem`, `endSale`, `makePayment`, …) into the interfaces of the system and of its components.
- **Step 3 – Structure:** choose the architecture style and the components that satisfy the priority drivers of section 3.2 (W8–W9), documented in `architecture.md`.
- Review this document with the team and confirm the ratings of the utility tree.
