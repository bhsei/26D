# Team D – Task plan W09

Last update: 2026-11-05 · Owner: Alfonso (project lead)

**Goals of the week**
1. Course topic W09 is *Software Architecture Design*. Deliverable of the week: the **architecture model** (at least the **logical view** and the **physical/deployment view**) and the architecture document (`docs/design/architecture.md`, ISO/IEC/IEEE 42010).
2. Accept the first architecture decisions as Haifa proposed them (AD-01 layered architecture on each register, AD-02 local web application, AD-03 Java) and write the system interfaces (step 2 of the architecture process).
3. Close the items of the W08 revision plan that are due in W09: open questions 1–4, 7 and 9 of SRS §5.3, SSDs of UC4 and UC5, state diagrams of the item and the rental.
4. W09 report on Wed 11 Nov: architecture progress.

The design milestone is **W11** (architecture and detailed design). W10 is *User Interface Design*, so the UI work starts next week.

**Deadlines**

| When | What | Who |
|---|---|---|
| **Sun 8 Nov, 23:59** | Drafts pushed (part A and part B) | Everyone |
| **Mon 9 Nov, 20:00** | Internal reviews posted as GitHub Issues (part C) | Reviewers |
| **Tue 10 Nov, 23:59** | Every review comment answered and fixed | Authors |
| **Wed 11 Nov, 10:00** | architecture.md integrated and consistent; README updated | Haifa · Alfonso |
| **Wed 11 Nov, class** | W09 report: architecture | Alfonso (slides) |

**Rules (unchanged).** `git pull --rebase` before editing · **one file per commit** · `W9 - <summary>; <description>` · documents go directly to `main` · **no merge commits** · pull again before adding any new ID (AD, FR, IR…), so that two people never use the same number.

---

## Part A – Architecture (drafts Sun 8 Nov, 23:59)

All views go in `docs/design/architecture.md` (maintainer: Haifa), each one in its own section. Diagrams in PlantUML in `assets/` (`.puml` + `.png`), like the domain model and the SSDs. Use the **same names** as the domain model, the SSDs and the contracts. Each person edits **only his or her section**, and pulls right before the commit, because several people work on the same file.

| # | Owner | Deliverable | Where |
|---|---|---|---|
| A1 | **Haifa** | AD-01 to AD-03 → *Accepted* in §6 and §6.1, as proposed (AD-03: Java, without the Python fallback; the framework is fixed at the start of increment 3). **Logical view** (§4.2): layers and packages with their main classes, and a package diagram. Decision records **AD-04** (one adapter per external system) and **AD-07** (timeouts and fallbacks). | architecture.md §4.2, §6 · `assets/architecture_logical.puml` |
| A2 | **Avni** | **Deployment (physical) view** (§4.4): register computer with the POS and its local copy, store database server, the four devices, the stubs of the four external systems, and the network links. Deployment diagram. Decision record **AD-10** (device access). | architecture.md §4.4, §6.1 · `assets/architecture_deployment.puml` |
| A3 | **Yasmine** | **Context view** (§4.1) as a diagram (the text sketch is already there). **Interaction view** (§4.3): two sequence diagrams through the layers of A1: UC1 Process Sale paid by card, and *Payment Service not available* (IR-02, retry with the same transaction ID). Start the interaction view after Haifa pushes the layers (Sat 7 Nov). | architecture.md §4.1, §4.3 · `assets/architecture_context.puml`, `assets/architecture_uc1.puml` |
| A4 | **Josué** | **Correspondences** (§5): view ↔ view and requirement ↔ component (which component satisfies each IR, DC and priority NFR). Decision record **AD-09** (security of card data and PINs). | architecture.md §5, §6.1 |
| A5 | **Borja** | **Data view** (§4.5): what is stored in the store database, what in the local copy of each register, and what is never stored (DC-06). | architecture.md §4.5 |
| A6 | **Alfonso** | **System interfaces** (step 2, `docs/design/system_interfaces.md`): the system operations of the SSDs and contracts grouped by interface (sale, return, rental, session), plus the interfaces of the four adapters (from IR-01 to IR-17). Update `architecture_drivers.md` with DC-09 (shared store database) and the answers to its open questions. | `docs/design/system_interfaces.md` · `architecture_drivers.md` |

AD-05 (local storage and shared database) and AD-06 (Accounting queue) are decided in **W10** (Borja), together with open questions 6 and 8.

## Part B – W08 revision plan items (Sun 8 Nov, 23:59)

| # | Owner | Deliverable | Where |
|---|---|---|---|
| B1 | **Borja** | SSDs of **UC4 Start Up** (with close session) and **UC5 Return Rental**. State diagrams of the **item status** (DR-02) and of the **rental** (B-D03, B-D19). | `system_sequence_diagrams.md`, `domain_model.md` + `assets/` |
| B2 | **Josué** | Operation contracts of the new system operations of UC4 and UC5 (**after B1**, by Tue 10 Nov). | `operation_contracts.md` |
| B3 | Owners of §5.3 | Answer the open questions due in W09 with a decision and update the requirements that depend on them. If a question cannot be decided yet, keep the working assumption and write why. | SRS §5.3 + affected requirements |

Open questions due in W09 (SRS §5.3):
- **Avni:** 1 (refund period, rental periods, late fee, tax of the deposit) · 9 (cash difference at the end of a session).
- **Haifa:** 2 (card deposit charged or held) · 4 (offline card authorization).
- **Alfonso:** 3 (more than one tender) · 7 (discounts and promotions).

SRS changes go to **v1.2**. The version history row is added only once, by Alfonso, when the changes are pushed (Wed 11 Nov).

## Part C – Internal reviews (Mon 9 Nov, 20:00)

One GitHub Issue per document, title `Team D review of <document> <version> - Issue List`, one comment per finding (Location · Type · Finding · Recommendation). Short and useful findings only.

| Reviewer | Reviews |
|---|---|
| Borja | Logical view and AD-04, AD-07 (Haifa) |
| Haifa | Deployment view and AD-10 (Avni) |
| Avni | SSDs UC4/UC5 and state diagrams (Borja) |
| Yasmine | System interfaces (Alfonso) |
| Alfonso | Context and interaction views (Yasmine), correspondences and AD-09 (Josué), consistency of the whole architecture.md |
| Josué | Data view (Borja) |

**How we answer review comments from now on** (feedback of the teacher on W08, also for the cross-team review of W11):
- We do **not reject** a finding. If we do not agree, we talk to the reviewer first, and the reviewer deletes the finding.
- We do **not use "Partially accepted"**. If we accept only part of a finding, the answer is **Accepted**, and the reply says which part we change.

## W08 items still open

- **Teams E and F revisions** (statistics form, yellow cells): Josué (E, column O) and Haifa (F, column H) check whether E and F published a complete revision, as soon as they do.
- **Issue #32**: opened by Team E by mistake → Alfonso closes it with a short comment.
- **Our review Issues** (#25–#49 and #50): they stay open until Teams B and C check our revision (their yellow cells). Do not close them ourselves.

## W09 report (Wed 11 Nov)

Alfonso prepares the slides (same receipt design), with the views of part A. Each owner sends Alfonso **one sentence** about his or her part by **Tue 10 Nov, 20:00**. Work logs: Avni (team log W09), everyone (individual W09 section) by Wed 11 Nov, 10:00.

---

## Workload summary

| Member | Part A (architecture) | Part B (revision plan) | Review |
|---|---|---|---|
| Alfonso | System interfaces, drivers update | Open questions 3, 7 · SRS v1.2 | Yasmine, Josué, architecture.md |
| Haifa | AD-01–03 accepted, logical view, AD-04, AD-07 | Open questions 2, 4 | Avni |
| Borja | Data view | SSDs UC4/UC5, state diagrams | Haifa |
| Josué | Correspondences, AD-09 | Contracts UC4/UC5 | Borja |
| Yasmine | Context view, interaction view | – | Alfonso |
| Avni | Deployment view, AD-10 | Open questions 1, 9 · team log W09 | Borja |
