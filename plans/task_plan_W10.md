# Team D – Task plan W10

Last update: 2026-11-11 · Owner: Alfonso (project lead)

**Goals of the week**
1. Course topic W10 is *User Interface Design*. Deliverables of the week (textbook, practice 2): the **UI prototype**, the **UML class diagram of the UI** and the **navigation sequence diagram**, all based on the use cases.
2. Decide the storage of the architecture: **AD-05** (local storage and shared store database) and **AD-06** (Accounting System queue), with the **data model** of the two databases, and **AD-08** (payment methods).
3. Answer the open questions due in W10 (SRS §5.3: 6 and 8) and prepare question 5 (W11).
4. Prepare the **design milestone of W11** (architecture and detailed design).
5. W10 report on Wed 18 Nov.

**Feedback of the teacher on W09** (for the W10 slides and the W11 milestone): show at least one **large diagram** (E/R, class diagram or similar). If it is too big for a slide, show **one part** of it and write on the slide that there is more, for example *"14 of 40 classes shown, full model in docs/design/data_model.md"*. Every reduced diagram gets this note.

**Deadlines**

| When | What | Who |
|---|---|---|
| **Fri 13 Nov, 20:00** | List of screens and their use cases (D1, first part), so that the others can start | Yasmine |
| **Sat 14 Nov, 20:00** | AD-05 and AD-06 decided (B1, first part), so that the storage interfaces can be written | Borja |
| **Sun 15 Nov, 23:59** | Drafts pushed (parts A, B and C) | Everyone |
| **Mon 16 Nov, 20:00** | Internal reviews posted as GitHub Issues (part D) | Reviewers |
| **Tue 17 Nov, 23:59** | Every review comment answered and fixed | Authors |
| **Wed 18 Nov, 10:00** | Documents integrated and consistent; README updated; work logs | Alfonso · Avni · everyone |
| **Wed 18 Nov, class** | W10 report: UI design and storage | Alfonso (slides) |

**Rules (unchanged).** `git pull --rebase` before editing · **one file per commit** · `W10 - <summary>; <description>` · documents go directly to `main` · **no merge commits** · pull again before adding any new ID (AD, FR, IR…) · use the names of the domain model, the SSDs, the contracts and the system interfaces.

**Answering reviews (unchanged since W09).** We do not reject a finding: if we do not agree, we talk to the reviewer first, and the reviewer deletes it. We do not use *Partially accepted*: the answer is *Accepted*, and the reply says which part we change. The reviewer closes the Issue after checking the fix.

---

## Part A – User interface design (drafts Sun 15 Nov, 23:59)

New document `docs/design/ui_design.md` (maintainer: Yasmine), one section per deliverable. Diagrams in PlantUML in `assets/` (`.puml` + `.png`).

| # | Owner | Deliverable | Where |
|---|---|---|---|
| A1 | **Yasmine** | **Screens and navigation.** List of the screens of the cashier and of the store manager, with the use case and the system operations (system_interfaces.md §3) that each screen uses (**first part by Fri 13 Nov**). Navigation diagram between the screens for UC1 to UC5, with the error and fallback messages (*Card payment not available*, printer without paper, default tax rate). UI rules from the usability NFRs (NFR-05, NFR-06, NFR-13 to NFR-18). | `ui_design.md` §1–§3 · `assets/ui_navigation.puml` |
| A2 | **Haifa** | **UI prototype** updated to SRS v1.2 and to the screen list of A1: all five use cases and the store manager functions; the fallback messages; the store manager approval (employee ID and PIN). The prototype stays throw-away (process model); `ui_prototype.md` says what it shows and what it does not. | `docs/design/prototype/`, `ui_prototype.md` |
| A3 | **Josué** | **UML class diagram of the UI**: the screens of `ui.screens`, the controllers of `ui.api` and the data each screen shows, with their links to the system operations. Traceability of the usability NFRs to the screens. | `ui_design.md` §4 · `assets/ui_classes.puml` |
| A4 | **Avni** | **Navigation sequence diagram** of UC1 Process Sale: Cashier → screens → controller, for the main scenario and *Card payment not available*. Same names as A1 and A3 (start after A1, Fri 13 Nov). | `ui_design.md` §5 · `assets/ui_sequence_uc1.puml` |

## Part B – Storage and decisions (drafts Sun 15 Nov, 23:59)

| # | Owner | Deliverable | Where |
|---|---|---|---|
| B1 | **Borja** | Decision records **AD-05** (local storage and the shared store database: database product, what is copied, synchronisation, conflicts between registers) and **AD-06** (Accounting System queue) (**first part by Sat 14 Nov**). **Data model (E/R)** of the store database and of the local database, from DR-01 to DR-20 and the data view. Open questions **6** (two registers renting the same item) and **8** (retention, currency, rounding). | `architecture.md` §6.1 · `docs/design/data_model.md` · `assets/data_model.puml` · SRS §5.3 |
| B2 | **Avni** | Decision record **AD-08** (payment methods: one class per tender behind a common interface, NFR-09). First proposal for open question **5** (how customers are identified), to be decided in W11. Team work log W10. | `architecture.md` §6.1 · SRS §5.3 · `worklogs/team/W10.md` |
| B3 | **Alfonso** | **Storage interfaces** in `system_interfaces.md` §4.3 (repositories, Accounting queue, synchronisation), after AD-05 and AD-06 (Sun 15 Nov). **Screen ↔ system API** table: which requests each screen sends (with A1). | `system_interfaces.md` |

SRS changes go to **v1.3**. The version history row is added only once, by Alfonso, when the changes are pushed (Wed 18 Nov).

## Part C – Preparation of the W11 milestone (Sun 15 Nov, 23:59)

| # | Owner | Deliverable |
|---|---|---|
| C1 | **Alfonso** | Plan of the **detailed design** for W11: which diagrams (design class diagram, design sequence diagrams per use case, activity and state diagrams), who draws each one, and how the milestone document is organised (`docs/design/`). Check what the course asks for the W11 delivery and the cross-team review. |
| C2 | **Haifa** | Consistency pass of `architecture.md` with AD-05, AD-06 and AD-08 (v0.5): views, correspondences §5 and decision table. |

## Part D – Internal reviews (Mon 16 Nov, 20:00)

One GitHub Issue per document, title `Team D review of <document> <version> - Issue List`, one comment per finding (Location · Type · Finding · Recommendation). Short and useful findings only.

| Reviewer | Reviews |
|---|---|
| Borja | Screens and navigation, UI rules (Yasmine, A1) |
| Avni | UI prototype (Haifa, A2) |
| Alfonso | UI class diagram and NFR traceability (Josué, A3) · consistency of `ui_design.md` |
| Josué | Navigation sequence diagram (Avni, A4) · AD-08 (Avni, B2) |
| Haifa | AD-05, AD-06, data model, open questions 6 and 8 (Borja, B1) |
| Yasmine | Storage interfaces and screen ↔ API table (Alfonso, B3) |

## W09 items still open

- **#51, #53, #56**: fixed; the reviewer closes them (Haifa #51, Borja #53, Alfonso #56).
- **Individual work logs W09**: Borja and Yasmine.
- **Teams E and F revisions**: Josué (E) and Haifa (F) check them as soon as they publish (statistics form, yellow cells).

## W10 report (Wed 18 Nov)

Alfonso prepares the slides (receipt design). Each owner sends Alfonso **one sentence** about his or her part by **Tue 17 Nov, 20:00**. The slides include **one large diagram** (the data model of B1 or the UI class diagram of A3), reduced to one part with the note *"N of M shown, full diagram in …"*. Work logs: Avni (team log W10), everyone (individual W10 section) by Wed 18 Nov, 10:00.

---

## Workload summary

| Member | Part A (UI design) | Part B (storage, decisions) | Part C | Review |
|---|---|---|---|---|
| Alfonso | – | Storage interfaces, screen ↔ API table · SRS v1.3 | Plan of the detailed design (W11) | Josué, `ui_design.md` |
| Yasmine | Screens, navigation, UI rules | – | – | Alfonso |
| Haifa | UI prototype | – | Consistency of `architecture.md` v0.5 | Borja |
| Josué | UI class diagram, NFR traceability | – | – | Avni |
| Avni | Navigation sequence diagram UC1 | AD-08, open question 5 · team log | – | Haifa |
| Borja | – | AD-05, AD-06, data model (E/R), open questions 6 and 8 | – | Yasmine |
