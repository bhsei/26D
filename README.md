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

| Document                                                                                                      | Content                                                                                                                                                                                                             |
| ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [SRS](docs/requirements/SRS.md)                                                                               | Software Requirements Specification (ISO/IEC/IEEE 29148), draft towards v1.0 (W07); UC1, UC3, UC4 and UC5 fully dressed (UC2 pending), FR-01 to FR-59, IR-01 to IR-14, section 3.5 data requirements DR-01 to DR-18 |
| [Use case model](docs/requirements/use_case_model.md)                                                         | Use case diagram (`assets/use_case_diagram.png`) and one-paragraph description of UC1–UC5                                                                                                                           |
| [Glossary and business rules](docs/requirements/glossary.md)                                                  | Domain terms and BR-01 to BR-14                                                                                                                                                                                     |
| [External interfaces](docs/requirements/external_interfaces.md)                                               | The 4 external systems and IR-01 to IR-10                                                                                                                                                                           |
| [Non-functional requirements](docs/requirements/nfrs.md), [quality goals](docs/requirements/quality_goals.md) | NFR-01 to NFR-12 (ISO/IEC 25010)                                                                                                                                                                                    |
| [Requirement conventions](docs/requirements/requirements_conventions.md)                                      | ID scheme, MoSCoW priority and traceability matrix                                                                                                                                                                  |
| [Stakeholders](docs/requirements/stakeholders.md), [elicitation plan](docs/requirements/elicitation_plan.md)  | Stakeholder list, cashier persona and interview questions                                                                                                                                                           |
| [Domain model](docs/design/domain_model.md)                                                                   | Concepts of the store (23 classes), attributes and multiplicities for UC1–UC5 (`assets/domain_model.png`)                                                                                                           |
| [System sequence diagrams](docs/design/system_sequence_diagrams.md)                                           | System operations of UC1 Process Sale (`assets/ssd_uc1.png`)                                                                                                                                                        |
| [Operation contracts](docs/design/operation_contracts.md)                                                     | Contracts of the UC1 system operations                                                                                                                                                                              |
| [Architecture description](docs/design/architecture.md), [UI prototype](docs/design/ui_prototype.md)          | Architecture skeleton (ISO/IEC/IEEE 42010) and clickable prototype                                                                                                                                                  |
| [Project plan](plans/project_plan.md), [process model](plans/process_model.md)                                | Iterative-incremental life cycle (3 increments + release) and schedule                                                                                                                                              |

## Progress

| Week | Report                                                              | Summary                                                                                                                                                                                                                                                                                                   |
| ---- | ------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| W01  | [Weekly_Report_W01.pptx](weekly-reports/W01/Weekly_Report_W01.pptx) | Found the idea, researched feasibility, discussed roles                                                                                                                                                                                                                                                   |
| W05  | [Weekly_Report_W05.pptx](weekly-reports/W05/Weekly_Report_W05.pptx) | Foundations: use case diagram and scope, quality goals, process model chosen (iterative-incremental: 3 increments + release), requirements classification, roles and Gantt schedule                                                                                                                       |
| W06  | [Weekly_Report_W06.pptx](weekly-reports/W06/Weekly_Report_W06.pptx) | Increment 1 (Requirements) started: UC1 Process Sale fully dressed in SRS v0.3; scope corrected to 5 use cases, 3 payment methods and Customer as stakeholder; 51 requirements identified (17 FR, 10 NFR, 14 BR, 10 IR) with a traceability matrix; clickable UI prototype; peer reviews in GitHub Issues |

## Working rules

The full rules (Git workflow, file naming, branches and reviews with GitHub Issues) are in [CONTRIBUTING.md](CONTRIBUTING.md). In short:

- Run `git pull --rebase` before editing.
- One document (or one coherent change) per commit.
- Commit message format: `W<week> - <change summary>; <change description>`
  Example: `W2 - Initial project plan; completed work breakdown and milestone schedule`
- Never commit passwords, tokens, API keys or other secrets.
