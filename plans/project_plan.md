# Project Plan – NewEra POS

Team D · Software Engineering · BUAA · Version 1.0 (W05)

## 1. Objectives

1. Apply the full software engineering process (requirements, design, implementation, testing, release) to a realistic system.
2. Deliver the three course milestones on time: SRS (W7), design/architecture (W11), product launch and pitch (W16).
3. Build a working NewEra POS covering the four use cases, starting with Process Sale.
4. Keep the whole project traceable in GitHub: documents, plans, work logs and weekly reports.

## 2. Scope

**In scope**
- Use cases: Process Sale, Handle Returns, Process Rental, Start Up.
- Actors: Cashier (primary), Customer.
- Interfaces with four external systems: Payment Authorization Service, Tax Calculator, Accounting System, HR System.
- Payment methods: cash and credit card.

**Out of scope**
- Real integration with commercial payment, tax or accounting providers (they will be simulated).
- Inventory management, purchasing and supplier management beyond updating stock after a sale.
- Online shop or customer-facing app.

## 3. Life cycle

Iterative-incremental, with three increments and a release. See [process_model.md](process_model.md).

## 4. Milestones

| Week | Milestone | Deliverable |
|---|---|---|
| W1 | Project proposal | Proposal slides, team presentation |
| W5 | Process model and plan | `plans/process_model.md`, this plan, W05 report |
| **W7** | **Assignment 1 – SRS** | `docs/requirements/SRS.md` v1.0 |
| **W11** | **Design / architecture** | `docs/design/` architecture and detailed design |
| W15 | Code complete and tested | `src/`, `tests/`, `docs/testing/` test report |
| **W16** | **Product launch and investment pitch** | `docs/release/` release notes and pitch |
| Every week | Progress report | `weekly-reports/Wxx/Weekly_Report_Wxx.pptx` |

## 5. Work breakdown structure

| ID | Work package | Main tasks | Output |
|---|---|---|---|
| 1 | Project management | Planning, weekly coordination, weekly reports, work logs, contribution report | `plans/`, `weekly-reports/`, `worklogs/` |
| 2 | Requirements (increment 1) | Stakeholders, elicitation, use cases, quality attributes, business rules, external interfaces, glossary, traceability | `docs/requirements/` |
| 3 | Design (increment 2) | Architecture, domain model, interaction diagrams, design class diagram, UI design and prototype | `docs/design/`, `assets/` |
| 4 | Implementation (increment 3) | Process Sale, Handle Returns, Process Rental, Start Up, simulated external systems | `src/` |
| 5 | Testing (increment 3) | Test plan, test cases, unit and acceptance tests, test report | `tests/`, `docs/testing/` |
| 6 | Release | Release notes, demo, product launch and investment pitch | `docs/release/` |
| 7 | Quality and review (all) | Internal reviews, cross-team review through GitHub Issues | GitHub Issues |

## 6. Team and roles

| Member | Role | Main responsibility |
|---|---|---|
| Alfonso Pinto | Project lead · Requirements engineer | Planning, SRS integration, weekly reports |
| Borja Nicolás | UML modeler · Documentation | Use case model, UML diagrams |
| Josué Rodríguez | Quality, security and traceability | Quality attributes, security and privacy, traceability matrix |
| Yasmine Chkoundali | UI/UX designer | Stakeholders, users, UI design and prototype |
| Haifa Chkoundali | Integration and full-stack developer | External interfaces, technical architecture |
| Avni Oflaz | Developer · Testing | Glossary, business rules, tests |

Roles are based on each member's strengths and can change if the workload requires it.

## 7. Communication and way of working

- **WeChat group** for daily coordination.
- **Weekly sync** (online or in person) after the class to plan the week.
- **GitHub** (`bhsei/26D`) as the single source of truth. Rules in `CONTRIBUTING.md`: `git pull --rebase` before editing, one document per commit, commit message `W<week> - <summary>; <description>`.
- **Reviews** with GitHub Issues, one issue per document version and one comment per finding.
- **Weekly report slides** prepared by the project lead from the team's work; anyone can present.
- Weekly task plans in `plans/` (for example `task_plan_W05-W06.md`).

## 8. Risks

| # | Risk | Probability | Impact | Response |
|---|---|---|---|---|
| R1 | Uneven workload or missed deadlines inside the team | Medium | High | Weekly task plan with owner and deadline; work logs; deadlines one day before each presentation |
| R2 | Members with different backgrounds and schedules | Medium | Medium | Clear roles, written plans, asynchronous work through GitHub |
| R3 | Scope too big for the time left | Medium | High | Increments ordered by priority: Process Sale first; Returns, Rental and Start Up can be reduced if needed |
| R4 | Merge conflicts or lost work in GitHub | Low | Medium | One document per commit, `git pull --rebase` before editing, one owner per document |
| R5 | Language barriers in documents and presentations | Low | Medium | All documents in English; peer review of every document |
| R6 | External systems not available for real integration | High | Low | Simulate them with stubs that follow the interface specification |

## 9. Schedule

See the Gantt chart in [project_schedule.md](project_schedule.md).
