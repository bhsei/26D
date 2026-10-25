# Team D – Task plan W07

Last update: 2026-10-25 (dates moved: the plan was shared late) · Owner: Alfonso (project lead)

**Goals of the week**
1. Close everything still open from W06 (reviews and fixes).
2. Deliver **SRS v1.0** (ISO/IEC/IEEE 29148) for the **Assignment 1 milestone** (W07 presentation).
3. Start **increment 2 – Design** (milestone W11: architecture and detailed design, ISO/IEC/IEEE 42010).

**Deadlines**

| When | What |
|---|---|
| **Mon 26 Oct, 14:00** | Part A: W06 review fixes closed |
| **Mon 26 Oct, 23:59** | Part B: all SRS sections drafted in `SRS.md` (or in the source document, linked from the SRS) |
| **Tue 27 Oct, 14:00** | Alfonso: SRS v0.9 integrated; full review starts |
| **Tue 27 Oct, 21:00** | Review Issues posted (Borja, Haifa) |
| **Wed 28 Oct, 12:00** | Review findings fixed → **SRS v1.0**; Part C drafts pushed |
| **Wed 28 Oct, 16:00** | Alfonso: W07 report slides |
| **Wed 28 Oct** | W07 presentation (SRS milestone) |

**Rules (unchanged).** `git pull --rebase` before editing · one document per commit · `W7 - <summary>; <description>` · documents go **directly to `main`** (no PRs for documents, see `CONTRIBUTING.md`) · reviews in GitHub Issues, one comment per finding · every requirement uses the conventions (ID, MoSCoW, source).

**Functional requirement ID ranges** (to avoid collisions when several people write FRs at the same time):

| Use case | FR range | Owner |
|---|---|---|
| UC1 Process Sale | FR-01 – FR-19 | Alfonso (done: FR-01–FR-17) |
| UC2 Handle Returns | FR-20 – FR-29 | Yasmine |
| UC3 Process Rental | FR-30 – FR-39 | Avni |
| UC4 Start Up | FR-40 – FR-49 | Avni |
| UC5 Return Rental | FR-50 – FR-59 | Alfonso |

---

## Part A – Close W06 (deadline Mon 26 Oct, 14:00)

| # | Owner | Task | Where |
|---|---|---|---|
| A1 | Haifa | Fix review #14 (external interfaces) and close it | `external_interfaces.md` |
| A2 | Haifa + Yasmine | Prototype fixes: empty "Deposit" row (`.hidden { display: none !important; }`), check payment authorized by the Payment Service (FR-12), "Payment Service" instead of "Payment Authorization", refund period and late fee shown as examples, SN-2002-05 added to the data; add `docs/design/ui_prototype.md` (how to open it, demo data, which UC/FR each screen covers) | `docs/design/` |
| A3 ✅ | Avni | *Done (glossary v0.2, #17 closed).* Fix review #17; update the glossary definitions of *Payment Service* and *Authorization* (check payments and card refunds, review #19 finding 4) | `glossary.md` |
| A4 | Yasmine | Fix reviews #20 and #21 | `stakeholders.md`, `elicitation_plan.md` |
| A5 | Josué | Fix review #22; NFR-06 → "3 clicks or fewer" (a cash sale in the prototype needs exactly 3) | `requirements_conventions.md`, `nfrs.md` |
| A6 | Haifa, Yasmine, Avni | Fill the TBC fields of your row in the README and close #15 | `README.md` |
| A7 | Avni | Team work log W06: add the presentation and the reviews; start `W07.md` | `worklogs/team/` |
| A8 | Everyone | Individual work log: W06 section complete | `worklogs/individual/` |

## Part B – SRS v1.0 (drafts Mon 26 Oct 23:59, v1.0 Wed 28 Oct 12:00)

Fully dressed use cases follow the same format as UC1 (SRS §3.2.1): prologue, stakeholders, pre/postconditions, main success scenario in two columns, extensions, special requirements, open issues; then the derived FRs in §3.2.6.

| # | Owner | SRS section | Content |
|---|---|---|---|
| B1 | **Yasmine** | §3.2.2 UC2 Handle Returns + FR-20… | Fully dressed; refund rules BR-07, BR-08; card refund through the Payment Service (IR-03) |
| B2 | **Yasmine** | §3.1.1 User interfaces, §3.3 Usability | One subsection per prototype screen with its usability needs; usability requirements from the persona and NFR-05/06 |
| B3 | **Avni** | §3.2.3 UC3 Process Rental + FR-30… | Fully dressed; BR-10–BR-12; deposit not taxed (working assumption) |
| B4 | **Avni** | §3.2.4 UC4 Start Up + FR-40… | Fully dressed; HR System and local copy (IR-08, IR-09); pending accounting records; NFR-02 |
| B5 | **Avni** | §4 Verification (acceptance) | Acceptance criteria for UC1 in Given/When/Then (normal sale, invalid item, cash with change, card declined, Payment Service down) |
| B6 | **Alfonso** | §3.2.5 UC5 Return Rental + FR-50… | Fully dressed; late fee, condition check, deposit refund, item back to *Available* |
| B7 | **Josué** | §3.4 Performance, §3.7 Standards, §3.8 Attributes | Move NFR-01–NFR-10 into the SRS with a verification method each; card data handling and data protection |
| B8 | **Josué** | §4 Verification, §5.2 Traceability | Verification method (inspection / demonstration / test) for every FR and NFR; traceability matrix extended to UC2–UC5 |
| B9 | **Haifa** | §3.1.2 Hardware, §3.1.3 Software interfaces, §3.6 Design constraints | Scanner, card reader, printer, drawer; IR-01–IR-10 final; constraints (stubs for external systems, team, schedule, technology) |
| B10 | **Borja** | §3.5 Logical database requirements | Information the system must keep (from the domain model, C1) |
| B11 | **Alfonso** | Integration | Whole SRS consistent: terms from the glossary, IDs, links, open questions list; version history; **v0.9 on Tue 27 Oct 14:00, v1.0 on Wed 28 Oct 12:00** |

**Final review of SRS v0.9 (Tue 27 Oct, 14:00–21:00).** Two reviewers read the whole document, one Issue each:
Borja (sections 1–3.2) · Haifa (sections 3.3–5). Everyone fixes the findings in their own sections by Wed 28 Oct, 12:00.

## Part C – Start increment 2: Design (milestone W11)

Course topics: Software requirements analysis (W7) → Foundations of software design (W8) → Software architecture design (W9). We start with the analysis models that connect requirements and design, plus the first architecture step.

| # | Owner | Deliverable | Where | Content |
|---|---|---|---|---|
| C1 | **Borja** | Domain model (UC1–UC5) | `docs/design/domain_model.md` + `assets/domain_model.puml/.png` | Conceptual classes (Sale, SalesLineItem, ProductDescription, ProductCatalog, Register, Store, CashierSession, Payment → Cash/Credit/Check, Rental, RentalLineItem, Return…), attributes, associations with multiplicity |
| C2 | **Borja** | System sequence diagram UC1 | `docs/design/system_sequence_diagrams.md` + `assets/ssd_uc1.*` | System operations: `makeNewSale`, `enterItem(itemID, qty)`, `endSale`, `makePayment(amount)` (+ card/check variants) |
| C3 | **Josué** | Operation contracts UC1 | `docs/design/operation_contracts.md` | One contract per system operation of C2: responsibilities, cross references, preconditions, postconditions (instances created, associations formed, attributes changed) |
| C4 | **Alfonso** | Architecture drivers | `docs/design/architecture_drivers.md` | Step 1 of the architecture process: functional drivers (which use cases shape the architecture), quality attribute drivers from NFR-01–NFR-10 with a utility tree, constraints |
| C5 | **Haifa** | Architecture document skeleton | `docs/design/architecture.md` | Structure from ISO/IEC/IEEE 42010 (stakeholders and concerns, viewpoints, views, decisions/rationale); first list of architecture decisions to take in W8–W9 |

Part C is a **start**, not a final version: drafts by Wed 28 Oct 12:00, shown in the W07 report as "increment 2 started".

---

## Workload summary

| Member | Part A | Part B (SRS) | Part C (Design) |
|---|---|---|---|
| Alfonso | A8 | B6 UC5, B11 integration | C4 architecture drivers |
| Borja | A8 | B10 data requirements, final review §1–3.2 | C1 domain model, C2 SSD UC1 |
| Josué | A5, A8 | B7 NFRs, B8 verification + traceability | C3 operation contracts |
| Yasmine | A2, A4, A6, A8 | B1 UC2, B2 UI + usability | – |
| Haifa | A1, A2, A6, A8 | B9 interfaces + constraints, final review §3.3–5 | C5 architecture skeleton |
| Avni | A3, A6, A7, A8 | B3 UC3, B4 UC4, B5 acceptance criteria | – |
