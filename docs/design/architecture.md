# Architecture Description – NewEra POS

| | |
| --- | --- |
| **Maintainer** | Haifa Chkoundali |
| **Version** | 0.1 (skeleton) |
| **Last updated** | W07 |
| **Part of** | Increment 2 – Design (milestone W11) |
| **Structure** | ISO/IEC/IEEE 42010:2022 – Architecture description |

> **Status: skeleton.** This document gives the structure of the architecture description and the first list of architecture decisions. The sections marked *To do (W8–W9)* are filled in during increment 2, after the architecture drivers ([architecture_drivers.md](architecture_drivers.md), Alfonso) and the domain model ([domain_model.md](domain_model.md), Borja) are ready.

## 1. Introduction

### 1.1 Purpose

This document describes the architecture of **NewEra POS**: the main parts of the system, how they work together, and why they were chosen. It is the link between the requirements ([SRS](../requirements/SRS.md)) and the detailed design (domain model, system sequence diagrams, operation contracts).

### 1.2 System of interest

NewEra POS is the application a cashier uses at a store register to process sales, returns, rentals and rental returns, and to start up the register (UC1–UC5). It runs on the registers of the store, uses four devices (barcode scanner, card reader, receipt printer, cash drawer – SRS §3.1.2) and four external systems (Payment Service, Tax Calculator, Accounting System, HR System – SRS §3.1.3).

### 1.3 Inputs

| Input | Document |
| --- | --- |
| Requirements (FR, NFR, IR, BR) | [SRS.md](../requirements/SRS.md) v1.0 |
| External interfaces | [external_interfaces.md](../requirements/external_interfaces.md) |
| Design constraints | SRS §3.6 (DC-01 to DC-08) |
| Architecture drivers | [architecture_drivers.md](architecture_drivers.md) *(W07, Alfonso)* |
| Domain model, SSD, operation contracts | [domain_model.md](domain_model.md), [system_sequence_diagrams.md](system_sequence_diagrams.md), [operation_contracts.md](operation_contracts.md) |
| UI prototype | [ui_prototype.md](ui_prototype.md) |

## 2. Stakeholders and concerns

Stakeholders from [stakeholders.md](../requirements/stakeholders.md). A *concern* is something a stakeholder cares about in the architecture.

| Stakeholder | Concerns | Related requirements |
| --- | --- | --- |
| Cashier | Fast response at the till; the system keeps working when an external system is down; clear error messages | NFR-01, NFR-05, NFR-06, IR-02, IR-05, IR-09 |
| Customer | Secure card payment; correct total and receipt | NFR-08, NFR-11, BR-01, BR-05 |
| Store manager | Control over prices, default tax rate and employees; correct stock levels | NFR-07, BR-04, IR-05, IR-09, FR-14 |
| Owner | Reasonable cost; reliable figures; system can grow (new payment methods) | NFR-03, NFR-09 |
| Accountant | Every transaction reaches the Accounting System, in order and only once | IR-06, IR-07, BR-14 |
| HR | Each transaction linked to the right employee; local employee list kept up to date | IR-08, IR-09, BR-13 |
| System administrator | Easy to install and configure; clear logs; devices and external systems easy to connect | NFR-10, IR-10, DC-02, DC-03 |
| Development team | Can build and test the system with stubs; can replace a stub by a real system later; uses known technology | DC-01, DC-02, DC-04, DC-07 |

## 3. Viewpoints

A *viewpoint* defines how a view is made: which concerns it answers and which model or notation it uses. Notation: UML (PlantUML), as in the rest of the project.

| Viewpoint | Concerns answered | Model / notation | Stakeholders |
| --- | --- | --- | --- |
| **Context** | What is inside and outside the system; which external systems and devices it talks to | Context diagram | All |
| **Logical (layers)** | Main parts of the software and their responsibilities; how the domain is separated from the UI and from the external systems | UML package diagram (layers) | Development team |
| **Interaction** | How the parts work together for the main scenarios (UC1 sale, failure of an external system) | UML sequence diagram | Development team |
| **Deployment** | Where the software runs; register, local storage, network, external systems | UML deployment diagram | System administrator, development team |
| **Data** | Which data is stored locally and which is sent to external systems; what survives a restart | Class diagram (from the domain model) | Accountant, development team |

## 4. Views

### 4.1 Context view

First sketch (to be drawn as a diagram in `assets/architecture_context.puml`):

```
                 Cashier / Store manager
                          |
   Barcode scanner --+    |    +-- Receipt printer
   Card reader ------+--[ NewEra POS ]--+-- Cash drawer
                          |
     +--------------+-----+-------+--------------+
     |              |             |              |
 Payment Service  Tax Calculator  Accounting   HR System
 (card, check,    (tax of each    System       (valid cashier,
  card refund)     transaction)   (records)     role)
```

The four external systems are replaced by stubs in our project (DC-01).

### 4.2 Logical view (layers)
*To do (W9).* First proposal, to be confirmed by AD-01:
- **UI layer** – cashier screens (based on the UI prototype).
- **Application / domain layer** – Register, Sale, Rental, Return, Payment… (from the domain model); business rules BR-01 to BR-14.
- **Technical services layer** – local storage, logging, device drivers, and one **adapter per external system** (DC-02).

### 4.3 Interaction view
*To do (W9).* At least: UC1 Process Sale through the layers (from the SSD of UC1), and *Payment Service not available* (IR-02).

### 4.4 Deployment view
*To do (W9).* Register computer with the POS and its local storage, the four devices, and the network connection to the external systems (stubs).

### 4.5 Data view
*To do (W9–W10).* From SRS §3.5 and the domain model: what is stored locally (transactions, Accounting System queue, local employee list, product catalog), and what is never stored (card data, DC-06).

## 5. Correspondences

How the views are linked (ISO/IEC/IEEE 42010 *correspondences*). *To do (W9).*

| From | To | Link |
| --- | --- | --- |
| Context view – external system | Logical view – adapter | One adapter for each external system (DC-02) |
| Logical view – domain classes | Domain model | Same names as the conceptual classes |
| Logical view – components | Deployment view – nodes | Where each component runs |
| Views | SRS requirements | Traceability matrix (requirements_conventions.md) |

## 6. Architecture decisions

First list of the decisions to take in W8–W9. Each decision will be recorded with: context, options, decision, rationale, consequences, related requirements.

| ID | Decision to take | Options to compare | Drivers | Status |
| --- | --- | --- | --- | --- |
| AD-01 | Architectural style of the POS | Layered (UI / domain / technical services); MVC; client–server | NFR-09, DC-02 | Open |
| AD-02 | Kind of application | Desktop application; web application in a browser on the register | DC-03, DC-04, NFR-02 | Open |
| AD-03 | Programming language and frameworks | Tools the team already knows (Java, Python, JavaScript…) | DC-04, team skills | Open |
| AD-04 | How the POS talks to the external systems | One adapter per system behind an interface (stubs replaceable by real systems); direct calls | DC-01, DC-02, IR-01 to IR-10 | Open |
| AD-05 | Local storage | Embedded database (e.g. SQLite); files | NFR-04, IR-07, FR-48, DC-05 | Open |
| AD-06 | Accounting System queue | Persistent local queue with acknowledgement and transaction ID (no duplicates) | IR-07, FR-42, BR-14 | Open |
| AD-07 | Timeouts and fallbacks | Where timeouts (10 s / 5 s) and fallbacks are handled: in each adapter or in a common component | IR-02, IR-05, IR-09 | Open |
| AD-08 | Payment methods | One class per tender behind a common interface, so a new method can be added easily | NFR-09, FR-09 to FR-12 | Open |
| AD-09 | Security of card data and PINs | Card data only in memory until the Payment Service answers; PINs stored as a salted hash; role check for manager actions | NFR-07, NFR-08, NFR-11, DC-06 | Open |
| AD-10 | Device access | Scanner as keyboard input; printer and drawer through a device service | NFR-10, IR-11 to IR-14 | Open |

### 6.1 Decision records
*To do (W8–W9).* One subsection per decision, with this template:

```
#### AD-xx – <title>
- Context:
- Options:
- Decision:
- Rationale:
- Consequences:
- Related requirements:
```

## 7. Open issues

1. The architecture drivers and the utility tree (Alfonso) are needed to rank the decisions above.
2. The rental deposit by card (hold or charge) is still open (external_interfaces.md, open question 2) and changes the Payment Service adapter.
3. The technology (AD-02, AD-03) must be decided early in W8, because the detailed design depends on it.
