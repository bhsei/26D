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

The logical view shows the main parts of the POS application and what each one is responsible for. It answers the concerns of the development team (§2): the business rules are kept apart from the screens and from the external systems, a stub can be replaced by the real system, and the work can be split between people. The style is the layered architecture of AD-01, inside the local web application of AD-02, in Java (AD-03). The names are those of the domain model, the SSDs and the system interfaces ([system_interfaces.md](system_interfaces.md)).

![NewEra POS logical view](../../assets/architecture_logical.png)

*Editable source: [`assets/architecture_logical.puml`](../../assets/architecture_logical.puml) (PlantUML).*

| Layer | Package | Main classes | Responsibility | Source |
| --- | --- | --- | --- | --- |
| **UI** | `ui.screens` | Login, Menu, Sale, Payment, Receipt, Return, Rental, RentalReturn and Manager screens | Web pages shown in the browser of the register. They show data and send the cashier's actions; they contain no business rule. Based on the UI prototype. | AD-02, NFR-05, NFR-06, NFR-13 to NFR-18 |
| | `ui.api` | `SessionController`, `SaleController`, `ReturnController`, `RentalController`, `RentalReturnController`, `ManagerController` | Receive the requests of the system API (one per system operation, system_interfaces.md §3), check the format and call the application layer. Together with the screens they form the MVC of the UI layer (AD-01). | AD-01, AD-02 |
| **Application / domain** | `application` | `SessionHandler`, `SaleHandler`, `ReturnHandler`, `RentalHandler`, `RentalReturnHandler`, `ManagerHandler` | One handler per use case (UC4, UC1, UC2, UC3, UC5) and one for the store manager functions. A handler runs the system operations of its SSD (`makeNewSale`, `enterItem`, `endSale`, `makePayment`…) as described in the operation contracts, and decides the fallback when an external system is not available (AD-07). | SSDs, contracts, AD-07 |
| | `application.interfaces` | `PaymentService`, `TaxCalculator`, `AccountingSystem`, `HRSystem`, `CatalogSource`, `CardReader`, `ReceiptPrinter`, `CashDrawer`, repositories | The Java interfaces of system_interfaces.md §4. The application layer only knows these interfaces, never their implementation. | DC-02, AD-04, AD-10 |
| | `domain.store` | `Store`, `Register`, `Employee`, `CashierSession` | The register, the employees and the cashier session with its opening and closing cash. | Domain model, BR-13, BR-17 |
| | `domain.catalog` | `ProductCatalog`, `ProductDescription`, `Item` | Products, prices, stock levels and the rentable items with their status. | Domain model, BR-09, BR-11, DR-02 |
| | `domain.transactions` | `Transaction`, `Sale`, `Return`, `Rental`, `RentalReturn`, their line items, `Customer`, `Receipt`, `AccountingRecord` | The transactions and their business rules: totals, tax, refund amount, rental fee, deposit and late fee. | Domain model, BR-01 to BR-18 |
| | `domain.payments` | `Payment`, `CashPayment`, `CreditCardPayment`, `CheckPayment`, `Refund` | One class per tender behind the abstract `Payment`, so that a new payment method is a new class (AD-08). | NFR-09, BR-05, BR-06, BR-08 |
| **Technical services** | `technical.external` | `PaymentServiceAdapter`, `TaxCalculatorAdapter`, `AccountingSystemAdapter`, `HRSystemAdapter`, `CatalogFileImport` | One adapter per external system. Each adapter implements its interface, talks to the stub of its system (DC-01), applies the timeout and returns `NOT_AVAILABLE` when there is no answer (AD-04, AD-07). | DC-01, DC-02, IR-01 to IR-17 |
| | `technical.devices` | `CardReaderDriver`, `ReceiptPrinterDriver`, `CashDrawerDriver` | The Device Service of AD-10. The scanner works as a keyboard and needs no class. | AD-10, IR-11 to IR-14 |
| | `technical.storage` | `TransactionRepository`, `ItemRepository`, `AccountingQueue`, `EmployeeList` | Read and write the local database of the register and the queue of records for the Accounting System. The synchronisation with the store database is decided in AD-05 and AD-06 (W10). | DC-05, DC-09, IR-07, IR-09 |
| | `technical.logging` | `EventLog` | Failed communications with external systems and every opening of the cash drawer, without card data or personal data. | IR-10, IR-14, NFR-11 |

**Rules between the layers**
- A layer only calls the layer below it. The UI never calls the domain or a technical service directly.
- The domain classes don't depend on any other package. They can be tested without a database, a device or an external system.
- The technical services implement the interfaces of `application.interfaces` (dependency inversion). So the stub and the real system are two implementations of the same interface, and only the adapter changes when the real system comes (DC-02, QA-14).
- Card data goes from `CardReaderDriver` to `PaymentServiceAdapter` only. It is never stored, logged or sent to the screens (DC-06, NFR-11).

**Correspondence with the other views (§5).** All the packages run inside the POS application on the register computer of the deployment view (§4.4), except `ui.screens`, which runs in the browser of the same register. The interaction view (§4.3) shows UC1 through these layers.

### 4.3 Interaction view
*To do (W9).* At least: UC1 Process Sale through the layers (from the SSD of UC1), and *Payment Service not available* (IR-02).

### 4.4 Deployment view

The deployment view shows where the software runs, which devices and systems it is connected to, and what is replaced by a stub in our project. It answers the concerns of the system administrator and of the development team (§2): easy to install and configure, devices and external systems easy to connect, and a stub that can be replaced by the real system (NFR-10, DC-02, DC-03). The names are those of the logical view (AD-01), the domain model (`Register`) and the SRS.

![NewEra POS deployment view](../../assets/architecture_deployment.png)

*Editable source: [`assets/architecture_deployment.puml`](../../assets/architecture_deployment.puml) (PlantUML).*

| Node | What runs or is stored there | Source |
| --- | --- | --- |
| **Register computer** (one for each `Register`) | A standard computer. It runs the browser, the POS application and the local database, and the devices are connected to it. | DC-03, AD-01, AD-02 |
| Browser | Shows the cashier screens in full-screen mode. It talks to the POS application only on `localhost`. | AD-02 |
| POS application | The Java program that runs as a small local web server. It contains the three layers of AD-01 (UI, application / domain, technical services). The technical services layer holds one adapter for each external system, the Device Service, the local storage and the logging. | AD-01 to AD-03, DC-02 |
| Local database | The local copy of the data that the register needs (transactions, product catalog, local employee list) and the queue of records for the Accounting System. It survives a restart and a network failure. | DC-05, DC-09, NFR-04, IR-07, IR-09, FR-48 |
| **Store database server** | The one store database shared by all registers: product catalog, prices, stock levels, item status, customers and transactions. The registers are its clients. | DC-09, QA-16, BR-11 |
| **Devices** | Barcode scanner (works as a keyboard), card reader (chip and contactless), thermal receipt printer and cash drawer. They are standard devices connected to the register computer; the models are not fixed. | IR-11 to IR-14, NFR-10, AD-10 |
| **External systems** | In our project the Payment Service, Tax Calculator, Accounting System and HR System are **stubs** that follow the interfaces of SRS §3.1.3 and can simulate *approved*, *declined*, *timeout* and *not available*. The POS reaches each one through its own adapter, so the real system replaces the stub without a change in the rest of the POS. | DC-01, DC-02, IR-01 to IR-10 |
| Back-office system | Exports the product catalog as a file. The POS imports it at start-up or when a store manager starts an import. | IR-17 |

**Network links**

| Link | Medium | Notes |
| --- | --- | --- |
| Browser – POS application | `localhost` | The local server only accepts connections from the register itself (AD-02). |
| Register – devices | Cable to the register computer, standard drivers | Through the Device Service (AD-10). |
| Register – store database server | Store network | If the connection is lost, the register keeps selling with its local copy and its queue (DC-09). |
| Register – external systems | Network | Timeouts: 10 s for the Payment Service, 5 s for the Tax Calculator and the HR System (IR-02, IR-05, IR-09). |

**What the register does when something is not available**

| What is not available | What the register does | Source |
| --- | --- | --- |
| Network or store database server | Sells, returns and rents with the local copy; the records wait in the local queue and are sent later, in order. | DC-09, QA-04, IR-07 |
| An external system | The adapter applies the fallback of SRS §3.1.3: card payment refused and cash offered, default tax rate, local queue, local employee list. | IR-02, IR-05, IR-07, IR-09 |
| A device | The cashier sees a message and uses the fallback of SRS §3.1.2: types the identifier, uses another tender, reprints, or opens the drawer with the key. | IR-11 to IR-14 |
| The register computer (restart) | It is ready in less than 30 seconds. The queue is kept, and every approved authorization without a completed transaction is voided at the next start-up. | NFR-02, FR-48, IR-15 |

**Correspondence with the logical view (§5).** The UI layer is served by the POS application and shown in the browser; the application / domain layer and the technical services layer run inside the POS application on the register computer.

**Open points of this view**
- The number of registers in a store is not fixed (architecture drivers, open question 3); the diagram shows one register, and the store database server serves all of them.
- In our project the stubs run on a separate test computer, or on the register computer during development. The protocol and the data format between the POS and the external systems are fixed in the system interfaces (`system_interfaces.md`).
- The local database product and the synchronisation with the store database are decided in AD-05 and AD-06 (W10).

### 4.5 Data view

The data view shows **where each kind of data is stored**: in the store database that all registers share, in the local database of one register, or nowhere. It answers the concerns of the accountant (every transaction reaches the Accounting System once and in order) and of the development team (what survives a restart or a network failure, what is never stored) in §2. It is drawn from the logical database requirements of the SRS (§3.5, DR-01 to DR-20), the design constraints DC-05, DC-06 and DC-09 and the [domain model](domain_model.md), and it uses the same names. The choice of the database product and the table design belong to AD-05 and AD-06 (W10), so this view says *what* is stored where and not *how*.

![NewEra POS data view](../../assets/architecture_data.png)

*Editable source: [`assets/architecture_data.puml`](../../assets/architecture_data.puml) (PlantUML).*

**Where the data is stored**

The **master copy** of a data item is the place where its value is decided; the other place keeps a copy.

| Data (SRS §3.5) | Store database server (shared by all registers) | Local database of each register | Source |
| --- | --- | --- | --- |
| Product catalog, prices, rental fee and deposit | Master copy. The catalog comes from the back-office file (IR-17) | Copy of what the register needs, to sell without the network | DR-01, DR-20, DC-09, IR-17 |
| Stock levels | Master copy | Copy; a sale reduces the local value at once | DR-01, BR-09, DC-09 |
| Item list and item status | Master copy: an item must not be rented at two registers at the same time | Copy of the last known status | DR-02, BR-11, DC-09 |
| Customers (customer ID only) | Master copy: customer IDs are unique in the whole store | Copy of the customers the register needs, for the overdue check | DR-18, BR-12, DC-09 |
| Transactions (sales, returns, rentals, rental returns) with their lines, payments, refunds and payment references | All transactions of all registers, so that a return can be made at another register | The transactions of this register, **saved here first**; the open sale and the approved authorizations too | DR-03 to DR-08, DR-13, DR-19, FR-48, IR-15, DC-05 |
| Data of the last receipt | – | Yes, to print it again | DR-14, FR-17 |
| Cashier sessions | A copy, so that a store manager can review a session (FR-74, FR-75) | The session of this register (at most one open) | DR-09 |
| Employee list | – (the HR System is the master) | Copy of the HR System, refreshed at every start-up; the PIN only as a salted hash | DR-11, IR-09 |
| Settings (default tax rate, reorder threshold) | Master copy; only a store manager changes it | Copy | DR-15, BR-02, BR-04 |
| Queue of records for the Accounting System | – (it never goes to the store database) | **Only here**, in the order of the transactions; a record is deleted after the acknowledgement | DR-12, IR-06, IR-07, DC-05 |
| Log of failed communications | – | Yes, without card data or other personal data | IR-10 |

**What is never stored** (DR-05, DR-11, DR-18, DC-06, NFR-08, NFR-11)

| Data | What the POS does instead |
| --- | --- |
| Full card number, security code, PIN of a card | Only the last 4 digits, the authorization code and the payment reference of the Payment Service are kept (DR-05, DR-19). Card data is passed only to the Payment adapter (AD-10, AD-09) |
| PIN of an employee in plain text | The HR System checks the PIN; the local employee list keeps only a salted hash (DR-11) |
| Personal data of a customer other than the customer ID | Only the data needed to find open and overdue rentals (DR-18) |
| Card data or personal data in the logs | The log of IR-10 has the system, the time and the error only |

**What survives a restart or a network failure**

| Event | Result |
| --- | --- |
| Restart or crash of the register | The local database keeps the transactions, the open sale, the approved authorizations and the queue (DR-13, FR-48). The cashier logs in again, and every authorization without a completed transaction is voided (IR-15) |
| Network or store database not available | The register works with its local copy and its queue (DC-09). The transactions are sent to the store database when the connection is back |
| An external system not available | The adapter applies the fallback of SRS §3.1.3; the records for the Accounting System wait in the queue (IR-07) |

**Open points of this view**
1. **How the copies are kept up to date and how conflicts are solved** (stock levels that differ, an item rented at two registers while both are offline, customers registered twice) is decided in **AD-05** (W10, Borja), together with SRS open questions 6 and 8.
2. **Receipt numbers and customer IDs** must be unique in the whole store (DC-09), also when a register is offline. A proposal for AD-05 is that each register builds the number from its register ID and its own counter.
3. **Retention.** How long the transactions and the accounting records are kept after they have been sent is open (SRS §3.5, open question 8, Borja, W10); it decides the size of the local database.
4. **Where the catalog import is stored** (IR-17): the import file is read at start-up or by a store manager; whether the register or the store database server imports it is decided in AD-05.

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
| AD-10 | Device access | Scanner as keyboard input; printer and drawer through a device service | NFR-10, IR-11 to IR-14 | Proposed (§6.1) |

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

#### AD-10 – Device access
- Context: Each register has a barcode scanner, a card reader, a thermal receipt printer and a cash drawer (SRS §3.1.2). The POS runs as a local web application (AD-02): the browser shows the screens but cannot reach the printer or the cash drawer, and the card data must not be kept (IR-12, DC-06). The device models are not fixed and must be standard devices (NFR-10, QA-15). The register must go on when a device fails (SRS §3.1.2).
- Options:
  1. Every device behind its own interface in a Device Service of the technical services layer, scanner included.
  2. The scanner as keyboard input; the card reader, the printer and the cash drawer behind interfaces in the Device Service.
  3. The browser talks to the devices directly, with browser interfaces for USB or serial devices.
- Decision (proposal): option 2.
- Rationale: A standard scanner works as a keyboard, so the POS reads an item identifier, a serial number or a receipt number in the same way as typed text (IR-11). It needs no driver, and the cashier can always type the code when the scanner fails. A web page cannot control the printer and the cash drawer in a reliable way (AD-02), and the cash drawer may only be opened for the reasons of IR-14, so the Device Service on the register does it, checks the reason and logs it. The interfaces (`ReceiptPrinter`, `CashDrawer`, `CardReader`) let the team test with simulated devices and change a device model without changing the rest of the POS (QA-15, NFR-10).
- Consequences: The technical services layer has a Device Service with three interfaces. The application layer gives a reason with every request to open the cash drawer, and the Device Service logs the time, the cashier and the reason (IR-14). The card reader passes the card data only to the Payment adapter, never to the local database or to the logs (IR-12, NFR-11). The Device Service reports the printer status (ready, no paper, error), and the application layer shows the message and the fallback of SRS §3.1.2 (IR-13). The tests use simulated devices. The cabling and the operating system drivers are part of the installation of each register (system administrator).
- Related requirements: NFR-10, NFR-11; IR-11 to IR-14; DC-03, DC-06; QA-15; AD-02.

## 7. Open issues

1. The architecture drivers and the utility tree (Alfonso) are needed to rank the decisions above.
2. The rental deposit by card (hold or charge) is still open (external_interfaces.md, open question 2) and changes the Payment Service adapter.
3. AD-01 to AD-03 have a first proposal (§6.1). The team must confirm them in the W9 meeting, because the detailed design and increment 3 depend on them.
