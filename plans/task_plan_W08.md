# Team D – Task plan W08

Last update: 2026-10-29 (review groups changed in the updated online form) · Owner: Alfonso (project lead)

**Goals of the week**
1. Cross-team review of the SRS (W8 panel review): Team D reviews **Team E** and **Team F**, and is reviewed by **Team B** and **Team C**.
2. Answer every finding we receive and prepare the revision plan for SRS v1.1 (summary in the W09 presentation).
3. Continue increment 2 – Design at a lower pace.

**Who reviews whom** (W8 statistics form)

| Group | Reviewed by (reviewer 1 · reviewer 2) | Severity scale used for this group |
|---|---|---|
| **E** (DēGlitch) | C · **D** | Minor / General / Moderate |
| **F** (CampusShare) | **D** · E | Minor / General / Severe |
| **D** (NewEra POS, us) | B · C | High / Medium / Low |

**Deadlines**

| When | What | Who |
|---|---|---|
| **Thu 29 Oct, 12:00** | SRS v1.0 in GitHub, readable by the other groups (done: `docs/requirements/SRS.md`, commit 311a606) | Alfonso |
| **Sat 31 Oct, 23:59** | Review findings drafted in `reviews/W08/review_team_E.md` and `review_team_F.md` | Reviewers |
| **Sun 1 Nov, 20:00** | Findings merged (no duplicates) and checked by the consolidator | Josué (E), Haifa (F) |
| **Mon 2 Nov, 12:00** | Issues posted in `bhsei/26E` and `bhsei/26F` (**course deadline**) | Josué (E), Haifa (F) |
| **Mon 2 Nov, 18:00** | Findings received from B and C assigned to their owners | Alfonso |
| **Tue 3 Nov, 10:00** | One reply per finding received, in our Issues | Section owners |
| **Tue 3 Nov, 12:00** | Replies checked; statistics form filled in (row D) (**course deadline**) | Alfonso |
| **Tue 3 Nov, 23:59** | Part C design drafts pushed | See part C |
| **W09 class** | Presentation: feedback received and revision plan | Alfonso (slides) |

**Rules (unchanged).** `git pull --rebase` before editing · one document per commit · `W8 - <summary>; <description>` · documents go directly to `main` · **no merge commits**.

---

## Part A – Review of Teams E and F (deadline Mon 2 Nov, 12:00)

Download the SRS of each group from its repository:
- Team E: `bhsei/26E` → `docs/Requirements Specification Document.pdf`, version 1.4 (57 pages, 12 chapters).
- Team F: `bhsei/26F` → `docs/requirements/SRS.md`, version 0.3 (6 chapters + appendix).

Review the version that is in the repository on Thu 29 Oct and write it in the Issue title. Each reviewer reads **only his or her part**, so that we cover the whole document without duplicates. Team E's document is much longer, so it has four reviewers.

| # | Reviewer | Team E (DēGlitch, PDF) | Team F (CampusShare) |
|---|---|---|---|
| A1 | **Borja** | Ch. 1–3: introduction, product description, system context, use-case overview and actors | – |
| A2 | **Avni** | §4.1–4.2 interfaces and functional requirements · §4.6–4.10 | – |
| A3 | **Josué** (consolidator E) | §4.3–4.5, §4.11–4.12 · ch. 6 quality attributes · ch. 10 verification | – |
| A4 | **Alfonso** | Ch. 5 use-case specifications (UC-01 to UC-10) · ch. 7–12 (check what is design or cost, not requirements) | – |
| A5 | **Yasmine** | – | Ch. 1–2 · §3.1 external interfaces · ch. 4 process flows |
| A6 | **Haifa** (consolidator F) | – | §3.2–3.5 functional, security, non-functional and data requirements · ch. 5 verification · ch. 6 and appendix A |

**What to check** (ISO/IEC/IEEE 29148, the same criteria we used in our own reviews):
- Each requirement is **unambiguous, verifiable, singular, consistent** and has an ID, a priority and a source.
- No vague words without a number ("fast", "easy", "user-friendly", "secure").
- Use cases / functions are complete: main flow, alternative flows, error cases.
- Consistency between sections (same IDs, terms and numbers everywhere), and traceability to verification.
- Missing items: constraints, interfaces, data, open questions.

**How to write a finding** (draft in our repo, then posted as one Issue comment each):

| Field | Content |
|---|---|
| Location | Section and requirement ID (e.g. `§3.2, FR-12`) |
| Type | Ambiguity · Not verifiable · Inconsistency · Missing · Traceability · Format |
| Severity | The scale of that group (E: Minor/General/Moderate · F: Minor/General/Severe) |
| Finding | One or two sentences: what is wrong and why |
| Recommendation | What they should change |

- Aim for **5–8 good findings per reviewer**, each one useful. Quality over quantity; no style nitpicks.
- Write short and natural English, like our own reviews. One finding = one problem.
- Drafts: `reviews/W08/review_team_E.md` and `reviews/W08/review_team_F.md` (this is the optional "Requirements Review Form"; it stays in our repo). Add your findings under your name.

**Posting (consolidator).** One Issue in the reviewed group's repository:
- Title: `Team D review of Team E - Software Requirements Specification v1.4 - Issue List` (Team F: v0.3).
- First comment: Reviewer: Team D · Reviewed: Team E (or F) · Document · Version · Date.
- Then **one comment per finding**, numbered, with the five fields above.

## Part B – Answer the reviews of Teams B and C (deadline Tue 3 Nov, 12:00)

Teams B and C open their Issues in `bhsei/26D` by Mon 2 Nov, 12:00.

1. **Alfonso** (Mon 18:00): reads every finding and assigns it to the owner of the section (the same owners as in SRS v1.0: §1–2 Alfonso, UC1/UC5 Alfonso, UC2 + §3.1.1 + §3.3 Yasmine, UC3/UC4 + AC Avni, §3.1.2–3.1.3 + §3.6 Haifa, §3.5 + diagrams Borja, §3.4/3.7/3.8 + §4 + traceability Josué).
2. **Owner** (Tue 10:00): **reply to each finding separately** in the Issue (quote reply), with:
   - Decision: **Accepted**, **Partially accepted** or **Rejected**.
   - Reason (always for partially accepted and rejected).
   - Planned change: section and what will change in SRS v1.1.
3. Do **not** change the SRS yet: the changes go into SRS v1.1 in W09, following the revision plan.
4. **Alfonso** (Tue 12:00): checks that every finding has a reply and fills in row D of the statistics form (issues received, severity count with our scale High/Medium/Low, accepted, partially accepted, rejected; for B and for C).

## Part C – Increment 2: Design (drafts Tue 3 Nov, 23:59)

Lower load this week because of the reviews.

| # | Owner | Deliverable | Where |
|---|---|---|---|
| C1 | Alfonso | Architecture step 2: system interfaces from the SSD and the contracts | `docs/design/architecture_drivers.md` → new section, or `system_interfaces.md` |
| C2 | Borja | SSDs of UC2 and UC3 | `docs/design/system_sequence_diagrams.md` + `assets/` |
| C3 | Josué | Operation contracts of the new system operations of UC2 and UC3 (after C2) | `docs/design/operation_contracts.md` |
| C4 | Haifa | Options and first proposal for AD-01 (style), AD-02 (desktop/web) and AD-03 (language) | `docs/design/architecture.md` |

## Statistics form and W09 presentation

- **Row D** (reviews received): Alfonso, Tue 3 Nov 12:00.
- **Yellow cells** for E (column O, we are reviewer 2) and F (column H, we are reviewer 1): "Reviewer checks whether revisions are complete". Josué (E) and Haifa (F) check it **after** E and F publish their revised SRS (W09).
- **W09 presentation** (Alfonso): only the findings on our documents and our revision plan: number of findings by severity, accepted/partially/rejected, the main changes for SRS v1.1.

---

## Workload summary

| Member | Part A (review) | Part B (answers) | Part C (design) |
|---|---|---|---|
| Alfonso | E ch. 5, 7–12 | Triage, findings on §1–2/UC1/UC5, statistics form | C1 system interfaces |
| Borja | E ch. 1–3 | Findings on §3.5 and diagrams | C2 SSD UC2–UC3 |
| Josué | E §4.3–4.5, 4.11–4.12, ch. 6, 10 · consolidates E | Findings on §3.4/3.7/3.8, §4, traceability | C3 contracts |
| Yasmine | F ch. 1–2, §3.1, ch. 4 | Findings on UC2, §3.1.1, §3.3 | – |
| Haifa | F §3.2–3.5, ch. 5–6 · consolidates F | Findings on §3.1.2–3.1.3, §3.6 | C4 decisions AD-01–03 |
| Avni | E §4.1–4.2, 4.6–4.10 | Findings on UC3, UC4, AC | – |
