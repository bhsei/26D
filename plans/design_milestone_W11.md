# Team D – Plan of the design milestone (W11)

Last update: 2026-11-16 · Owner: Alfonso (project lead) · Task C1 of `task_plan_W10.md`

**What W11 asks.** Week 11 is the second milestone of the course: *Software Design / Architecture*. The course topic of that week is *Software Detailed Design*: the textbook (practice 2, ch. 10) asks for a detailed design model that is enough to start coding: **class diagrams, sequence diagrams, activity diagrams and state diagrams**, for the use cases, the classes, the data and the subsystems. The W11 report is on **Wed 25 Nov**.

**To ask the teacher on Wed 18 Nov (Alfonso):** what exactly is delivered in W11 (one design document or the documents we have), and whether there is a cross-team review of the design as in W08.

## 1. What we deliver

Everything stays in `docs/design/`. The milestone version of each document is **v1.0**.

| Document | Content at the milestone | Maintainer |
| --- | --- | --- |
| `architecture.md` | ISO/IEC/IEEE 42010: views, correspondences, decisions AD-01 to AD-10 (all accepted or rejected, none open) | Haifa |
| `detailed_design.md` (**new**) | Design class diagram, design sequence diagrams, activity diagrams, state diagrams (sections 2 to 5 below), with the GRASP patterns used | Alfonso |
| `system_interfaces.md` | System API, interfaces of the adapters, devices and storage | Alfonso |
| `data_model.md` | E/R of the store database and the local database | Borja |
| `ui_design.md` | Screens, navigation, UI rules, UI class diagram, navigation sequence diagram | Yasmine |
| Domain model, SSDs, operation contracts | Analysis models (inputs of the design); only fixes | Borja, Josué |

## 2. Design sequence diagrams (one per system operation, or one per group of small operations)

Each diagram starts with the system operation that the controller receives and shows the objects of the logical view (`ui.api` → handler → domain → `application.interfaces`). The result must be the postconditions of the operation contract. Below each diagram: the GRASP patterns used (Controller, Creator, Information Expert, Low Coupling, High Cohesion, Polymorphism, Pure Fabrication, Indirection, Protected Variations).

| Use case | Contracts | Owner | Why this owner |
| --- | --- | --- | --- |
| UC1 Process Sale | 1–4 | Alfonso | Owner of UC1 in the SRS |
| UC2 Handle Returns | 5–9 | Yasmine | Owner of UC2 in the SRS |
| UC3 Process Rental | 10–15 | Avni | Owner of UC3 in the SRS; AD-08 payment methods |
| UC4 Start Up, close session, session review | 16–21, 29 | Josué | Wrote the contracts 16–29 |
| UC5 Return Rental | 22–28 | Haifa | Logical view and AD-07 (refund fallbacks) |

Files: `assets/dsd_uc<N>_<operation>.puml` (+ `.png`). Names of classes and messages: those of the logical view, the contracts and `system_interfaces.md`. A new class or method is added to the design class diagram by sending it to Borja (section 3).

## 3. Design class diagram

**Borja** (UML modeler). One diagram per layer (UI, application/domain, technical services), with attributes, methods, visibility and navigability. The skeleton is made first from the logical view and the domain model, so that the sequence diagrams use the same names; the methods are then added from the sequence diagrams. For the slides, one part is shown with the note *"N of M classes shown, full diagram in docs/design/detailed_design.md"* (teacher's feedback on W09).

## 4. Activity diagrams

**Yasmine**, two diagrams where the flow has decisions that a sequence diagram shows badly:
1. Card refund of UC2 and UC5: approved, declined, no answer, refund status, store manager approval (system_interfaces.md §3.7).
2. Background jobs: `AccountingSender` and the synchronisation with the store database (AD-05, AD-06).

## 5. State diagrams

**Borja**. The two of the domain model (item status, rental) stay; two new ones: the **cashier session** (open, closing, closed, to review, reviewed) and the **card refund** (requested, approved, declined, pending, paid in cash).

## 6. Calendar of W11

| When | What | Who |
|---|---|---|
| **Thu 19 Nov, 20:00** | Skeleton of the design class diagram (names only) | Borja |
| **Sun 22 Nov, 23:59** | Design sequence diagrams, activity and state diagrams drafted | Owners of sections 2, 4, 5 |
| **Mon 23 Nov, 12:00** | Design class diagram complete with the methods of the sequence diagrams | Borja |
| **Mon 23 Nov, 20:00** | Internal reviews posted (one Issue per document) | Reviewers |
| **Tue 24 Nov, 23:59** | Fixes done; every document of section 1 at v1.0 | Maintainers |
| **Wed 25 Nov, 10:00** | Milestone frozen; README updated | Alfonso |
| **Wed 25 Nov, class** | W11 report: design milestone | Alfonso (slides) |

The details (reviewers, the cross-team review if there is one) go into `task_plan_W11.md` on Thu 19 Nov.
