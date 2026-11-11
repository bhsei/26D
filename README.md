# Team D - NewEra POS

Software Engineering course · Beihang University (BUAA) · Repository: https://github.com/bhsei/26D

## Project overview

**NewEra POS** is a point-of-sale system for a retail store. The cashier uses it to record a customer's purchase, calculate totals and taxes, take payment, update inventory and print a receipt. It also handles returns, equipment rentals and the return of rented equipment.

We chose this project because it is a proven object-oriented analysis and design (OOAD) teaching case: requirements, actors and business rules are already well defined, so our effort goes into the engineering process (requirements, use cases, domain model, contracts, design diagrams, design class diagram) rather than inventing a domain.

### System scope

Scope as decided in the W06 requirements analysis (see the [SRS](docs/requirements/SRS.md), section 1.3). It differs from the W01 proposal in three points: the Customer is a stakeholder and not an actor, three payment methods are supported, and returning rented equipment is a use case of its own (UC5).

| Item                 | Details                                                                                                                                             |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| Use cases (5)        | UC1 Process Sale, UC2 Handle Returns, UC3 Process Rental, UC4 Start Up, UC5 Return Rental (new in W06)                                              |
| Primary actor        | Cashier (operates the POS terminal)                                                                                                                 |
| Other users          | Customer (stakeholder: buys, returns or rents items and pays, always through the Cashier); store manager (secondary user: exceptions, reorder list) |
| External systems (4) | Payment Service (authorization), Tax Calculator, Accounting System, HR System                                                                       |
| Payment methods (3)  | Cash, credit card, check (check has priority _Could_)                                                                                               |

## Team

| Name               | Major / background                                                     | Strengths for the project                                                                | Role                                 | GitHub username    | Student ID |
| ------------------ | ---------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ------------------------------------ | ------------------ | ---------- |
| Alfonso Pinto      | Double degree in Computer Science and Business (Spain)                 | C++, Java, Python; software engineering knowledge; communication                         | Project lead · Requirements engineer | fpiinto            | 2606216    |
| Haifa Chkoundali   | Telecommunications / Computer Science, INSA Lyon (Tunisia)             | Full-stack development; coding practices; AI / LLM integration; creative problem-solving | Integration & full-stack developer   | haifachkondali     | LJ2602207  |
| Borja Nicolás      | Computer Engineering, major in Cyberspace Security                     | Java; UML modeling; teamwork; documentation and presentation                             | UML modeler · Documentation          | borjacyberesc      | LS2639207  |
| Yasmine Chkoundali | Telecommunications & Digital Services Engineering, INSA Lyon (Tunisia) | UI/UX design; system design and information-system overview; programming                 | UI/UX designer · Front-End developer | yasminechk         | LJ2606215  |
| Josué Rodríguez    | Cyberspace Security (Ecuador)                                          | Secure design, privacy and compliance; requirements traceability; risk analysis          | Quality, security & traceability     | JR-CSLAW           | LS2639203  |
| Avni Oflaz         | Computer Engineering (exchange student)                                | C/C++; ROS2 and Gazebo; Python                                                           | Developer · Testing                  | itu-itis24-oflaz23 | LJ2606211  |

Roles were confirmed by the team in W05 (see the [W05 report](weekly-reports/W05/Weekly_Report_W05.pptx)).

## Repository structure

| Folder                                   | Content                                                                                 |
| ---------------------------------------- | --------------------------------------------------------------------------------------- |
| `src/`                                   | Source code                                                                             |
| `tests/`                                 | Automated and manual test assets                                                        |
| `docs/requirements/`                     | SRS and requirement-related artifacts                                                   |
| `docs/design/`                           | Architecture and detailed design documents; `prototype/` has the clickable UI prototype |
| `docs/testing/`                          | Test plan, test cases and test report                                                   |
| `docs/release/`                          | Release notes and final pitch materials                                                 |
| `plans/`                                 | Project plan, iteration plans, schedules                                                |
| `worklogs/team/`, `worklogs/individual/` | Team and individual work logs                                                           |
| `weekly-reports/Wxx/`                    | Weekly progress-report slides (`Weekly_Report_Wxx.pptx`)                                |
| `assets/`                                | Images, diagrams, demo media, datasets                                                  |

### Key documents

**Increment 1 – Requirements**

| Document | Content |
| --- | --- |
| [SRS](docs/requirements/SRS.md) | Software Requirements Specification (ISO/IEC/IEEE 29148), v1.2: baseline for the design, with the open questions 1–4, 7 and 9 decided in W09 (v1.1 was the baseline after the cross-team review of W08). UC1 to UC5 fully dressed, FR-01 to FR-75, NFR-01 to NFR-20, IR-01 to IR-17, DR-01 to DR-20, DC-01 to DC-09, BR-01 to BR-18 |
| [Use case model](docs/requirements/use_case_model.md) | Use case diagram (`assets/use_case_diagram.png`) and one-paragraph description of UC1–UC5 |
| [Glossary and business rules](docs/requirements/glossary.md) | Domain terms and BR-01 to BR-18 |
| [External interfaces](docs/requirements/external_interfaces.md) | The 4 external systems, first draft of IR-01 to IR-10 and the open questions (decided in W09) |
| [Non-functional requirements](docs/requirements/nfrs.md), [quality goals](docs/requirements/quality_goals.md) | NFRs (ISO/IEC 25010) and quality goals |
| [Requirement conventions](docs/requirements/requirements_conventions.md) | ID scheme, MoSCoW priority and traceability matrix |
| [Stakeholders](docs/requirements/stakeholders.md), [elicitation plan](docs/requirements/elicitation_plan.md) | Stakeholder list, cashier persona and interview questions |

**Increment 2 – Design** (milestone W11)

| Document | Content |
| --- | --- |
| [Domain model](docs/design/domain_model.md) | Concepts of the store, attributes and multiplicities for UC1–UC5 (`assets/domain_model.png`), and state diagrams of the item status and the rental |
| [System sequence diagrams](docs/design/system_sequence_diagrams.md) | System operations of UC1 to UC5 (`assets/ssd_uc1.png` to `ssd_uc5.png`) |
| [Operation contracts](docs/design/operation_contracts.md) | Contracts 1 to 29 for the system operations of UC1 to UC5 |
| [Architecture drivers](docs/design/architecture_drivers.md) | Functional drivers, quality attributes with the utility tree, constraints and trade-offs |
| [System interfaces](docs/design/system_interfaces.md) | System API used by the screens and the Java interfaces of the external systems and devices |
| [Architecture description](docs/design/architecture.md) | ISO/IEC/IEEE 42010: context, logical, interaction, deployment and data views, correspondences and architecture decisions AD-01 to AD-10 |
| [UI prototype](docs/design/ui_prototype.md) | Clickable prototype of the cashier screens (`docs/design/prototype/`) |

**Planning**

| Document | Content |
| --- | --- |
| [Project plan](plans/project_plan.md), [process model](plans/process_model.md) | Iterative-incremental life cycle (3 increments + release) and schedule |
| [Weekly task plans](plans/) | Tasks, owners and deadlines of each week |

## Progress

| Week | Report                                                              | Summary                                                                                                                                                                                                                                                                                                   |
| ---- | ------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| W01  | [Weekly_Report_W01.pptx](weekly-reports/W01/Weekly_Report_W01.pptx) | Found the idea, researched feasibility, discussed roles                                                                                                                                                                                                                                                   |
| W05  | [Weekly_Report_W05.pptx](weekly-reports/W05/Weekly_Report_W05.pptx) | Foundations: use case diagram and scope, quality goals, process model chosen (iterative-incremental: 3 increments + release), requirements classification, roles and Gantt schedule                                                                                                                       |
| W06  | [Weekly_Report_W06.pptx](weekly-reports/W06/Weekly_Report_W06.pptx) | Increment 1 (Requirements) started: UC1 Process Sale fully dressed in SRS v0.3; scope corrected to 5 use cases, 3 payment methods and Customer as stakeholder; 51 requirements identified (17 FR, 10 NFR, 14 BR, 10 IR) with a traceability matrix; clickable UI prototype; peer reviews in GitHub Issues |
| W07  | [Weekly_Report_W07.pptx](weekly-reports/W07/Weekly_Report_W07.pptx) | SRS v1.0 milestone: five fully dressed use cases and 132 requirements, each with an ID, a priority, a source and a verification method. Increment 2 (Design) started: domain model, SSD of UC1, first operation contracts, architecture drivers and architecture skeleton |
| W08  | [Weekly_Report_W08.pptx](weekly-reports/W08/Weekly_Report_W08.pptx) | Cross-team reviews: 45 findings received from Teams B and C and answered, SRS v1.1; SRS of Teams E and F reviewed (26 and 13 findings). First architecture decisions proposed (AD-01 to AD-03) |
| W09  | [Weekly_Report_W09.pptx](weekly-reports/W09/Weekly_Report_W09.pptx) | Architecture design: AD-01 to AD-03 accepted (layers on each register, local web application, Java); context, logical, interaction, deployment and data views with their correspondences; AD-04, AD-07, AD-09 and AD-10; system interfaces; SSDs and contracts of UC4 and UC5, state diagrams; open questions 1–4, 7 and 9 decided (SRS v1.2); internal reviews #51 to #56 |

## Working rules

The full rules (Git workflow, file naming, branches and reviews with GitHub Issues) are in [CONTRIBUTING.md](CONTRIBUTING.md). In short:

- Run `git pull --rebase` before editing.
- One document (or one coherent change) per commit.
- Commit message format: `W<week> - <change summary>; <change description>`
  Example: `W2 - Initial project plan; completed work breakdown and milestone schedule`
- Never commit passwords, tokens, API keys or other secrets.
