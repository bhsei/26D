# Design Specification – NewEra POS

| | |
| --- | --- |
| **Team** | D (Alfonso Pinto, Borja Nicolás, Haifa Chkoundali, Yasmine Chkoundali, Avni Oflaz, Josué Rodríguez) |
| **Maintainer** | Alfonso Pinto |
| **Version** | 1.0 (design milestone, W11) |
| **Last updated** | W12 |
| **Requirements** | [SRS](../requirements/SRS.md) v1.4 |

> **Status: v1.0.** This is the entry document of the design of NewEra POS for the cross-team review of W12. It does not repeat the design: it gives the scope, the reading order and the version of each design document. Every document below is in this folder, and its diagrams are in [`assets/`](../../assets/) as PlantUML source (`.puml`) and image (`.png`).

## 1. Scope

NewEra POS is a point-of-sale system for one store with several registers: sales, returns, rentals of items and their return, and the cashier session (use cases UC1 to UC5 of the SRS). The design covers all five use cases and every system operation of the SRS (contracts 1 to 29), from the screens to the external systems (Payment Service, Tax Calculator, Accounting System, HR System, back-office catalog), the devices (card reader, receipt printer, cash drawer) and the storage (a local database on each register and a store database).

## 2. Reading order

| # | Document | Version | What it contains | Owner |
| --- | --- | --- | --- | --- |
| 1 | [Domain model](domain_model.md) | 1.0 | Concepts, attributes and associations of UC1–UC5; state diagrams of the item, the rental, the cashier session and the card refund | Borja |
| 2 | [System sequence diagrams](system_sequence_diagrams.md) | 1.0 | System operations of UC1 to UC5 | Borja |
| 3 | [Operation contracts](operation_contracts.md) | 1.0 | Contracts 1 to 29: preconditions and postconditions of each system operation | Josué |
| 4 | [Architecture drivers](architecture_drivers.md) | 1.0 | Functional drivers, quality attributes (utility tree), constraints and trade-offs | Alfonso |
| 5 | [Architecture description](architecture.md) | 1.0 | ISO/IEC/IEEE 42010: context, logical, interaction, deployment and data views, correspondences, decisions AD-01 to AD-10 (all accepted) | Haifa |
| 6 | [System interfaces](system_interfaces.md) | 1.0 | System API used by the screens, Java interfaces of the external systems, devices and storage, protocol with the stubs | Alfonso |
| 7 | [Data model](data_model.md) | 1.0 | E/R model of the store database and of the local database of each register | Borja |
| 8 | [UI design](ui_design.md) | 1.0 | Screens, navigation, UI rules, UI class diagram, navigation sequence diagrams | Yasmine, Josué |
| 9 | [UI prototype](ui_prototype.md) | 0.4 | Clickable prototype of every screen ([`prototype/`](prototype/)) | Haifa, Yasmine |
| 10 | [Detailed design](detailed_design.md) | 1.0 | 20 design sequence diagrams of UC1 to UC5 with their GRASP patterns, design class diagram in four parts, activity and state diagrams, traceability | all |

A reader who wants only the design of one use case can start in [Detailed design](detailed_design.md) §2 (one subsection per use case) and follow its links to the contracts and the interfaces.

## 3. Main decisions

The ten architecture decisions are in [architecture.md](architecture.md) §6. In short: layers on each register (AD-01); a local web application (AD-02) in Java (AD-03); one adapter for each external system, so that the stub and the real system are interchangeable (AD-04); a local database on each register and a store database, so that a register keeps working when the network is down (AD-05); a queue for the Accounting System that never loses or skips a record (AD-06); the timeout in the adapter and the fallback in the handler (AD-07); one class for each payment method (AD-08); security of card data and PINs (AD-09); and the devices (AD-10).

## 4. Traceability

- Requirements → design: [detailed_design.md](detailed_design.md) §6 (use case, contracts, sequence diagrams, main classes) and [architecture.md](architecture.md) (requirements → views and decisions).
- System operation → contract → design sequence diagram: the tables of [detailed_design.md](detailed_design.md) §2 give the contract of each diagram.
- Interfaces: every call that a design sequence diagram makes to an external system, a device or the storage is in [system_interfaces.md](system_interfaces.md) §4.

## 5. Reviews already done

Every part of the design was reviewed inside the team in GitHub Issues #51 to #69 before v1.0, and all the findings were answered and fixed. One risk is accepted on purpose: [detailed_design.md](detailed_design.md) §7.
