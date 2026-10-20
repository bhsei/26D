# Team D – Task plan (catch-up W01–W05 + week W06)

Last update: 2026-10-17 · Owner: Alfonso (project lead)

**Where we are.** The repository has the folder structure, the README, the Gantt schedule, the W01 work log and the W01/W05 report slides. Everything the course has covered so far (W1–W4: program quality, software characteristics, SE overview, process models) still has to be written down in the repo. This week (W06) we start **increment 1 – Requirements**, whose milestone is **Assignment 1: SRS** (ISO/IEC/IEEE 29148).

**Deadlines**

| When | What |
|---|---|
| **Mon 19 Oct, 23:59** | Part A (catch-up) pushed to GitHub |
| **Wed 21 Oct, 14:00** | Part B (W06 drafts) pushed to GitHub |
| **Wed 21 Oct, 19:00** | Alfonso: W06 report slides ready |
| **Wed 21 Oct** | W06 progress presentation (Team B presents first) |

**Rules (from the course GitHub guide)**
- `git pull --rebase` before you start.
- **One document per commit**, message `W<week> - <summary>; <description>`. Part A uses `W5`, Part B uses `W6`.
- All documents in **English**, in **Markdown**, diagrams as images in `assets/` (also keep the editable source, e.g. `.drawio` or `.puml`).
- Do not commit passwords, tokens or personal data other than name, GitHub username and student ID.

---

## Part A – Catch-up: what should already be in the repo (deadline Mon 19 Oct)

| # | Owner | Deliverable | File | Content (minimum) |
|---|---|---|---|---|
| A1 | **Alfonso** | Process model selection | `plans/process_model.md` | Models compared (waterfall, prototyping, spiral/evolutionary, iterative-incremental), selection criteria, decision and rationale, our 3 increments + release, activities inside each increment. Same content as the W05 slides. |
| A2 | **Alfonso** | Project plan | `plans/project_plan.md` | Objectives, scope, milestones (W7 SRS, W11 design, W16 launch), work breakdown structure, roles, communication (WeChat + weekly meeting), main risks and how we handle them. |
| A3 | **Alfonso** | Upload W05 report | `weekly-reports/W05/Weekly_Report_W05.pptx` | Already in the folder. |
| A4 | **Josué** | Quality goals | `docs/requirements/quality_goals.md` | ISO/IEC 25010 characteristics that matter for a POS (reliability, usability, performance efficiency, security, maintainability, compatibility), why each matters for a shop, first measurable target for each (e.g. "sale line registered in < 1 s"). |
| A5 | **Borja** | README team table | `README.md` | Collect everyone's GitHub username and student ID, write the confirmed roles, add W05 to the Progress table. |
| A6 | **Haifa** | Contributing rules | `CONTRIBUTING.md` | Git workflow, commit format, one document per commit, branch/pull rules, file naming, how to review with GitHub Issues (naming of the issue, one comment per finding). Link it from the README. |
| A7 | **Avni** | Team work logs W02–W05 | `worklogs/team/W02.md` … `W05.md` | Same format as `W01.md` (Summary, Findings, Decisions, Next steps). Use the WeChat history; W03 = holiday week. |
| A8 | **Yasmine** | Project proposal in the repo | `docs/release/project_proposal.pdf` + `docs/project_overview.md` | Export the W01 proposal slides to PDF; short overview page (problem, users, scope, why this case) linked from the README. |
| A9 | **Everyone** | Individual work log | `worklogs/individual/<FirstName>.md` | One file per person, one section per week (W01–W05 now): what I did, hours, problems, next. |

---

## Part B – This week W06: start of increment 1 (Requirements) (deadline Tue 20 Oct, 14:00)

Course topic: **Software Requirements Engineering Fundamentals** (next: Elicitation, then Analysis → SRS). Goal of the week: the SRS skeleton exists and every section has an owner and a first draft.

| # | Owner | Deliverable | File | Content (minimum) |
|---|---|---|---|---|
| B1 | **Alfonso** | SRS skeleton + sections 1–2 | `docs/requirements/SRS.md` | Structure following ISO/IEC/IEEE 29148. Write §1 Introduction (purpose, scope, definitions, references, overview) and §2 Overall description (product perspective, product functions, constraints, assumptions and dependencies). Leave the other sections as headings with the owner's name. |
| B2 | **Alfonso** | W06 report slides | `weekly-reports/W06/Weekly_Report_W06.pptx` | Same 3-part structure as W05 (technical progress, deliverables, team). Built from B1–B7. |
| B3 | **Borja** | Use case model (overview) | `docs/requirements/use_case_model.md` + `assets/use_case_diagram.png` (+ source) | UML use case diagram (Cashier, 4 use cases, 4 external systems) and a **brief** description (one paragraph) of each use case. No fully dressed use cases yet. |
| B4 | **Yasmine** | Stakeholders and users | `docs/requirements/stakeholders.md` | Stakeholder list (cashier, customer, store manager, owner, accountant, HR, system admin…) with their interests; user characteristics of the cashier (experience, environment, peak hours) as a short persona. |
| B5 | **Yasmine** | Elicitation plan | `docs/requirements/elicitation_plan.md` | Which techniques we use and why (interview, questionnaire, observation of a real shop till, document analysis of the case), 10–15 interview questions for a cashier and a store manager. |
| B6 | **Josué** | Requirement conventions + traceability template | `docs/requirements/requirements_conventions.md` | ID scheme (FR-xx, NFR-xx, BR-xx, IR-xx), priority (MoSCoW), how a good requirement is written (unambiguous, verifiable, consistent, complete), and an empty traceability matrix (requirement → use case → design → test). |
| B7 | **Haifa** | External interfaces inventory | `docs/requirements/external_interfaces.md` | For each external system (Payment Authorization, Tax Calculator, Accounting, HR): what the POS sends, what it receives, when, and what happens if it is not available. |
| B8 | **Avni** | Glossary + business rules list | `docs/requirements/glossary.md` | Glossary of domain terms (sale, sale line item, product description, register, receipt, return, rental, tender…); first list of business rules (BR-xx: taxes, price rules, refund policy, reorder when stock < 10, rental deposit…). |
| B9 | **Everyone** | Individual work log W06 | `worklogs/individual/<FirstName>.md` | Add the W06 section. |
| B10 | **Avni** | Team work log W06 | `worklogs/team/W06.md` | After the Tuesday sync. |

**Review.** On Tue 20 Oct each person reads one other document and leaves comments in a GitHub Issue (same format we will use for cross-team review):
Alfonso → Borja (B3) · Borja → Yasmine (B4–B5) · Yasmine → Josué (B6) · Josué → Haifa (B7) · Haifa → Avni (B8) · Avni → Alfonso (B1).

---

## Workload summary

| Member | Part A (catch-up) | Part B (W06) |
|---|---|---|
| Alfonso | A1, A2, A3 | B1, B2, review B3 |
| Borja | A5 | B3, review B4–B5 |
| Josué | A4 | B6, review B7 |
| Yasmine | A8 | B4, B5, review B6 |
| Haifa | A6 | B7, review B8 |
| Avni | A7 | B8, B10, review B1 |
| Everyone | A9 | B9 |

## Looking ahead (W07, for planning only)
Requirements elicitation and analysis: fully dressed use cases (UC1 Process Sale – Alfonso, UC2 Handle Returns – Yasmine, UC3 Process Rental and UC4 Start Up – Avni), functional and non-functional requirements lists, first complete SRS draft → SRS v1.0 for the milestone.
