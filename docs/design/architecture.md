# Architecture Description – NewEra POS

| | |
| --- | --- |
| **Maintainer** | Haifa Chkoundali |
| **Version** | 0.2 |
| **Last updated** | W08 (first proposal for AD-01 to AD-03) |
| **Part of** | Increment 2 – Design (milestone W11) |
| **Structure** | ISO/IEC/IEEE 42010:2022 – Architecture description |

> **Status: draft.** This document gives the structure of the architecture description, the list of architecture decisions and, since W08, the options and a first proposal for AD-01 to AD-03 (§6.1). The proposals are not final until the team confirms them. The sections marked *To do (W8–W9)* are filled in during increment 2, after the architecture drivers ([architecture_drivers.md](architecture_drivers.md), Alfonso) and the domain model ([domain_model.md](domain_model.md), Borja) are ready.

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
| AD-01 | Architectural style of the POS | Layered (UI / domain / technical services); MVC; client–server | NFR-09, DC-02 | Proposed (§6.1) |
| AD-02 | Kind of application | Desktop application; web application in a browser on the register | DC-03, DC-04, NFR-02 | Proposed (§6.1) |
| AD-03 | Programming language and frameworks | Tools the team already knows (Java, Python, JavaScript…) | DC-04, team skills | Proposed (§6.1) |
| AD-04 | How the POS talks to the external systems | One adapter per system behind an interface (stubs replaceable by real systems); direct calls | DC-01, DC-02, IR-01 to IR-10 | Open |
| AD-05 | Local storage | Embedded database (e.g. SQLite); files | NFR-04, IR-07, FR-48, DC-05 | Open |
| AD-06 | Accounting System queue | Persistent local queue with acknowledgement and transaction ID (no duplicates) | IR-07, FR-42, BR-14 | Open |
| AD-07 | Timeouts and fallbacks | Where timeouts (10 s / 5 s) and fallbacks are handled: in each adapter or in a common component | IR-02, IR-05, IR-09 | Open |
| AD-08 | Payment methods | One class per tender behind a common interface, so a new method can be added easily | NFR-09, FR-09 to FR-12 | Open |
| AD-09 | Security of card data and PINs | Card data only in memory until the Payment Service answers; PINs stored as a salted hash; role check for manager actions | NFR-07, NFR-08, NFR-11, DC-06 | Open |
| AD-10 | Device access | Scanner as keyboard input; printer and drawer through a device service | NFR-10, IR-11 to IR-14 | Open |

### 6.1 Decision records
One subsection per decision, with this template. AD-01 to AD-03 have a first proposal (W08); the other decisions are filled in during W9.

```
#### AD-xx – <title>
- Context:
- Options:
- Decision:
- Rationale:
- Consequences:
- Related requirements:
```

#### AD-01 – Architectural style of the POS
- Context: The register has to keep selling when the network, the store database or an external system is down (QA-03, QA-04, DC-05, DC-09). Line entry must not wait for any external system (QA-01). A stub must be replaceable by the real system, and a new payment method must take less than 3 days (DC-02, NFR-09, QA-13, QA-14). Six students build the system part-time, so the structure must be simple and let people work in parallel (C-04).
- Options:
  1. Layered architecture on each register: UI, application/domain and technical services. Each external system and each device is reached through its own adapter in the technical services layer.
  2. MVC as the main style: views, controllers and a model for each screen.
  3. Client–server: a central server holds the logic and the data, and the register is a thin client.
- Decision (proposal): option 1. The screens inside the UI layer use MVC, so options 1 and 2 are combined. Client–server is only used for the store database of DC-09: the register is a client of it, but it keeps a local copy and its own queue, so it can work on its own.
- Rationale: The layers keep the business rules (BR-01 to BR-14) in the domain layer, apart from the screens and the external systems. The adapters answer DC-02 and QA-14 directly, because a stub and the real system implement the same interface. A thin client (option 3) stops working when the server or the network is down, which breaks QA-04 and NFR-02. MVC alone does not say where the adapters and the local storage go. Layers are also the style of the course and of our domain model, so everyone in the team knows it.
- Consequences: The domain layer calls only interfaces, never the UI or a concrete adapter. Each layer gets its own package, so the work can be split by layer and by use case. The synchronisation with the store database and the conflicts between offline registers stay in AD-05.
- Related requirements: DC-02, DC-05, DC-09, NFR-01 to NFR-04, NFR-09; QA-01, QA-03, QA-04, QA-13, QA-14.

#### AD-02 – Kind of application
- Context: DC-03 allows a desktop or a web application on a standard register computer. The POS must print on the thermal printer and open the cash drawer (IR-13, IR-14), and be ready in less than 30 s with all external systems down (NFR-02). The UI prototype is in HTML, CSS and JavaScript and its screens were checked with the team (ui_prototype.md). Its code is throw-away, but the screen design is kept.
- Options:
  1. Desktop application installed on each register (for example JavaFX or Qt).
  2. Central web application: a server in the store and a browser on each register.
  3. Local web application: the POS program runs on each register as a small local server, and the screens are web pages shown in a full-screen browser on the same register (localhost).
- Decision (proposal): option 3.
- Rationale: Option 2 needs the network for every screen, so the register stops when the network is down (QA-04), and a browser cannot reach the cash drawer or the printer directly. Options 1 and 3 both run on the register, so they work offline and reach the devices through the local program. Option 3 lets us build the screens with the same web technology as the prototype, which Yasmine and I already used, and keeps the logic in the local program, where the devices and the local database are. Option 1 would mean learning a desktop UI toolkit that nobody in the team lists in the README.
- Consequences: The register needs a browser in full-screen (kiosk) mode that starts with the POS program. The local server only accepts connections from the register itself. The UI talks to the application layer through the system operations of the SSDs (makeNewSale, enterItem, endSale, makePayment…), which become the interface between the two.
- Related requirements: DC-03, DC-05, NFR-02, NFR-04, NFR-10, NFR-13, IR-11 to IR-14; QA-02, QA-04, QA-15.

#### AD-03 – Programming language and frameworks
- Context: DC-04 asks for tools the team already knows, and C-06 for free, open-source tools. Skills in the README: Java (Alfonso, Borja), Python (Alfonso, Avni), C/C++ (Alfonso, Avni), web and full-stack development (Yasmine, me). The design is object-oriented (domain model, operation contracts), and the code needs automated tests with stubs (DC-01).
- Options:
  1. Java for the local server with a small web framework (for example Spring Boot or Javalin), HTML, CSS and JavaScript for the screens, JUnit for the tests.
  2. Python for the local server (Flask or FastAPI), HTML, CSS and JavaScript for the screens, pytest for the tests.
  3. JavaScript or TypeScript for everything (Node.js server and web screens).
- Decision (proposal): option 1, with option 2 as the fallback if the team prefers Python.
- Rationale: Two members know Java, and it fits the class design we already have: the conceptual classes, the adapter interfaces (DC-02) and one class per tender (AD-08) map directly to Java classes and interfaces. The type checks also help when six people work on the same code. Python is known by two members too and is faster to write, but there an adapter interface is only a convention. Option 3 is known by fewer members. In all three options the screens are HTML, CSS and JavaScript (AD-02).
- Consequences: The database chosen in AD-05 needs a Java driver (SQLite has one for Java and for Python). The build tool (Maven or Gradle) and the exact framework are fixed at the start of increment 3. Members who don't know Java yet need a short setup guide in the repository.
- Related requirements: DC-01, DC-02, DC-04, DC-07, NFR-09; C-04, C-06, C-08.

## 7. Open issues

1. The architecture drivers and the utility tree (Alfonso) are needed to rank the decisions above.
2. The rental deposit by card (hold or charge) is still open (external_interfaces.md, open question 2) and changes the Payment Service adapter.
3. AD-01 to AD-03 have a first proposal (§6.1). The team must confirm them in the W9 meeting, because the detailed design and increment 3 depend on them.
