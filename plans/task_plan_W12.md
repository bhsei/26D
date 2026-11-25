# Team D – Task plan W12

Last update: 2026-11-25 · Owner: Alfonso (project lead)

**Goals of the week**
1. Cross-team review of the design (W12 panel review), as in W08 for the SRS: Team D reviews **Team E** and **Team F**, and is reviewed by **Team B** and **Team C** (same groups as in W08; to confirm in the statistics form).
2. Answer every finding we receive and prepare the revision plan for the design v1.1 (W12 report, Wed 2 Dec).
3. No new design work this week: only the review and the fixes.

**Deadlines**

| When | What | Who |
|---|---|---|
| **Thu 26 Nov, 10:00** | Domain model, SSDs and operation contracts at v1.0 (header and status only, no new content) | Borja, Josué |
| **Thu 26 Nov, 12:00** | Design Specification in GitHub, readable by the other groups: `docs/design/design_specification.md` (entry document with links to every design document) (**course deadline**) | Alfonso |
| **Sat 28 Nov, 23:59** | Review findings drafted in `reviews/W12/review_team_E.md` and `review_team_F.md` | Reviewers |
| **Sun 29 Nov, 20:00** | Findings merged (no duplicates) and checked by the consolidator | Josué (E), Haifa (F) |
| **Mon 30 Nov, 12:00** | Issues posted in `bhsei/26E` and `bhsei/26F` (**course deadline**) | Josué (E), Haifa (F) |
| **Mon 30 Nov, 18:00** | Findings received from B and C assigned to their owners | Alfonso |
| **Tue 1 Dec, 10:00** | One reply per finding received, in our Issues | Document owners |
| **Tue 1 Dec, 12:00** | Replies checked; statistics form filled in (row D) (**course deadline**) | Alfonso |
| **Tue 1 Dec, 23:59** | Accepted changes applied in the design documents | Document owners |
| **Wed 2 Dec, 10:00** | Design documents at v1.1 (version history, consistency) | Owners · Alfonso checks |
| **Wed 2 Dec, class** | W12 report: feedback received and revision plan | Alfonso (slides) |

**Rules (unchanged).** `git pull --rebase` before editing · one file per commit · `W12 - <summary>; <description>` · documents go directly to `main` · **no merge commits**.

---

## Part A – Design Specification for the other groups (Thu 26 Nov, 12:00)

The other groups download our design from GitHub. `docs/design/design_specification.md` is the entry document: scope, reading order, the version of each document and where the diagrams are. All design documents are already at v1.0 except the analysis models, which only need their header updated (no new content):

| Document | Now | Owner |
|---|---|---|
| `domain_model.md`, `system_sequence_diagrams.md` | 0.9, 0.10 → 1.0 | Borja |
| `operation_contracts.md` | no version → 1.0 (add the header table) | Josué |
| `architecture_drivers.md` | 0.2 → 1.0 | Alfonso |

## Part B – Review of Teams E and F (Mon 30 Nov, 12:00)

Download the design specification of each group from its repository on Thu 26 Nov after 12:00 and review **that version** (write it in the Issue title). Team E's repository has only the SRS so far, so the parts below are by topic; the consolidator adjusts them on Thursday to the real chapters.

| # | Reviewer | Team E | Team F |
|---|---|---|---|
| B1 | **Borja** | Data model, class diagrams, state diagrams | – |
| B2 | **Avni** | Architecture views and decisions | – |
| B3 | **Josué** (consolidator E) | Sequence diagrams and their GRASP patterns | – |
| B4 | **Alfonso** | Interfaces, and consistency with their SRS (every use case designed, same names) | – |
| B5 | **Yasmine** | – | UI design, architecture views and decisions |
| B6 | **Haifa** (consolidator F) | – | Sequence diagrams, class diagrams, data model, consistency with their SRS |

**What to check** (the same criteria as in our internal reviews #63 to #69):
- Every use case and system operation of their SRS has a design (sequence diagram or equivalent); nothing is missing.
- The diagrams agree with each other: same class and method names in the sequence diagrams, the class diagram and the interfaces.
- The architecture decisions have a reason and the design follows them (layers, external systems, storage, errors and timeouts).
- Error cases are designed, not only the main flow.
- Traceability to their requirements, and diagrams that can be read (size, notation).

**How to write a finding** (draft in our repo, then posted as one Issue comment each):

| Field | Content |
|---|---|
| Location | Document, section and diagram (e.g. `§3.2, sequence diagram of UC2`) |
| Type | Inconsistency · Missing · Ambiguity · Traceability · Notation |
| Severity | The scale of that group (E: Minor/General/Moderate · F: Minor/General/Severe, as in W08) |
| Finding | One or two sentences: what is wrong and why |
| Recommendation | What they should change |

- Aim for **5–8 good findings per reviewer**, each one useful. No style nitpicks.
- Short and natural English, like our own reviews. One finding = one problem.
- Drafts: `reviews/W12/review_team_E.md` and `reviews/W12/review_team_F.md` (the optional "Designments Review Form"; it stays in our repo). Add your findings under your name.

**Posting (consolidator).** One Issue in the reviewed group's repository:
- Title: `Team D review of Team E - Design Specification v<version> - Issue List` (Team F the same).
- First comment: Reviewer: Team D · Reviewed: Team E (or F) · Document · Version · Date.
- Then **one comment per finding**, numbered, with the five fields above.

## Part C – Answer the reviews of Teams B and C (Tue 1 Dec, 12:00)

Teams B and C open their Issues in `bhsei/26D` by Mon 30 Nov, 12:00.

1. **Alfonso** (Mon 18:00): reads every finding and assigns it to the owner of the document: `architecture.md` Haifa · `data_model.md`, design class diagram, state diagrams, domain model, SSDs Borja · `ui_design.md` Yasmine and Josué · operation contracts Josué · sequence diagrams of each use case its owner (UC1 Alfonso, UC2 Yasmine, UC3 Avni, UC4 Josué, UC5 Haifa) · `system_interfaces.md`, `detailed_design.md`, `design_specification.md` Alfonso.
2. **Owner** (Tue 10:00): **reply to each finding separately** in the Issue (quote reply), with the decision **Accepted** and the planned change (document, section, what changes). We do not reject and do not use "partially accepted": if a finding is wrong, talk to the reviewer first so that they delete it; if only part applies, it is still "Accepted" and the reply says which part we change.
3. **Apply the accepted changes** in your own document by **Tue 1 Dec, 23:59**, one commit per file, with the Issue number in the commit message. Do not change a document before you have replied to the finding.
4. **Alfonso** (Tue 12:00): checks that every finding has a reply and fills in row D of the statistics form (issues received, severity with our scale High/Medium/Low, accepted; for B and for C).

## Statistics form and W12 report presentation

- **Row D** (reviews received): Alfonso, Tue 1 Dec 12:00.
- **Yellow cells** for E and F ("reviewer checks whether revisions are complete"): Josué (E) and Haifa (F), after E and F publish their revised design (W13).
- **W12 report, Wed 2 Dec** (Alfonso): only the findings on our documents and our revision plan: number of findings by severity, the main changes for v1.1, one finding explained in depth and a few more briefly.

---

## Workload summary

| Member | Part A | Part B (review) | Part C (answers) |
|---|---|---|---|
| Alfonso | Design Specification · drivers v1.0 | E: interfaces, consistency with their SRS | Triage, findings on UC1, interfaces, detailed design, statistics form |
| Borja | Domain model, SSDs v1.0 | E: data, classes, states | Findings on data model, class diagram, states, domain model, SSDs |
| Josué | Contracts v1.0 | E: sequence diagrams · consolidates E | Findings on UC4, contracts, UI classes |
| Yasmine | – | F: UI, architecture | Findings on UC2, UI design, activity diagrams |
| Haifa | – | F: sequence and class diagrams, data, SRS consistency · consolidates F | Findings on architecture, UC5 |
| Avni | – | E: architecture | Findings on UC3 |
