# Team D – Task plan W11

Last update: 2026-11-18 · Owner: Alfonso (project lead) · Details of the deliverables: [`design_milestone_W11.md`](design_milestone_W11.md)

**Goals of the week**
1. **Design milestone.** Course topic W11 is *Software Detailed Design*. We finish the design documentation: every document of `docs/design/` at **v1.0** on **Tue 24 Nov**, frozen on Wed 25 Nov.
2. **Detailed design** (new document `docs/design/detailed_design.md`): design sequence diagrams for every use case, design class diagram, activity and state diagrams, with the GRASP patterns used.
3. **W11 report on Wed 25 Nov: summary of the whole increment 2 (design)**, from W07 to W11, not only of this week (teacher's request).

**Next week (W12): reviews.** As with the SRS: W11 finishes the documentation, and W12 is for the cross-team review of the design (we review other teams, they review us, we answer and fix). The details come when the teacher confirms them.

**Deadlines**

| When | What | Who |
|---|---|---|
| **Thu 19 Nov, 20:00** | Skeleton of the design class diagram: classes, packages and names only, so that every sequence diagram uses the same names | Borja |
| **Sun 22 Nov, 23:59** | Design sequence diagrams, activity and state diagrams drafted; decisions and documents ready for review (parts A and B) | Everyone |
| **Mon 23 Nov, 12:00** | Design class diagram complete with the methods of the sequence diagrams | Borja |
| **Mon 23 Nov, 20:00** | Internal reviews posted as GitHub Issues (part C) · summary of your work in increment 2 sent to Alfonso (part D) | Reviewers · everyone |
| **Tue 24 Nov, 23:59** | Every finding answered and fixed; every document of part B at **v1.0** | Authors · maintainers |
| **Wed 25 Nov, 10:00** | Milestone frozen; README and work logs updated | Alfonso · Avni · everyone |
| **Wed 25 Nov, class** | W11 report: increment 2 | Alfonso (slides) |

**Rules (unchanged).** `git pull --rebase` before editing · **one file per commit** · `W11 - <summary>; <description>` · documents go directly to `main` · **no merge commits** · pull again before adding any new ID · use the names of the logical view, the domain model, the SSDs, the contracts and `system_interfaces.md`; a new class or method goes to Borja for the design class diagram.

**Answering reviews (unchanged).** No *Rejected* and no *Partially accepted*: if we do not agree, we talk to the reviewer first and the reviewer deletes the finding; otherwise the answer is *Accepted*, saying which part we change. The reviewer closes the Issue after checking the fix.

---

## Part A – Detailed design (drafts Sun 22 Nov, 23:59)

All in `docs/design/detailed_design.md` (maintainer: Alfonso), one section per part. Diagrams in PlantUML in `assets/` (`.puml` + `.png`), named `dsd_uc<N>_<operation>.puml` for the design sequence diagrams.

**Design sequence diagrams.** One per system operation, or one per group of small operations. Each starts with the request that the controller receives and goes through the handler, the domain classes and the interfaces of `application.interfaces`; the result must be the postconditions of the contract. Under each diagram: the GRASP patterns used (Controller, Creator, Information Expert, Low Coupling, High Cohesion, Polymorphism, Pure Fabrication, Indirection, Protected Variations).

| # | Owner | Deliverable |
|---|---|---|
| A1 | **Alfonso** | Design sequence diagrams of **UC1 Process Sale** (contracts 1–4) |
| A2 | **Yasmine** | Design sequence diagrams of **UC2 Handle Returns** (contracts 5–9). **Activity diagrams**: card refund of UC2 and UC5 (system_interfaces.md §3.7) and the background jobs (`AccountingSender`, synchronisation with the store database) |
| A3 | **Avni** | Design sequence diagrams of **UC3 Process Rental** (contracts 10–15), with the payment through `PaymentMethod` (AD-08) |
| A4 | **Josué** | Design sequence diagrams of **UC4 Start Up, close session and session review** (contracts 16–21, 29) |
| A5 | **Haifa** | Design sequence diagrams of **UC5 Return Rental** (contracts 22–28) – already started |
| A6 | **Borja** | **Design class diagram**, one per layer (UI, application/domain, technical services), with attributes, methods, visibility and navigability (**skeleton Thu 19 Nov, complete Mon 23 Nov 12:00**). **State diagrams**: item status and rental (from the domain model), cashier session and card refund (new) |

## Part B – Documents at v1.0 (ready for review Sun 22 Nov, v1.0 Tue 24 Nov)

| # | Owner | Document | What is left for v1.0 |
|---|---|---|---|
| B1 | **Haifa** | `architecture.md` | Every decision AD-01 to AD-10 *Accepted* (no proposals left); views and correspondences checked against the detailed design |
| B2 | **Borja** | `data_model.md` | Aligned with the design class diagram; `REJECTED` records in the Accounting queue (AD-06, review #60) |
| B3 | **Yasmine** | `ui_design.md` | Pending refund mode of S-07 and S-09 (review #60); open points closed |
| B4 | **Alfonso** | `system_interfaces.md`, `detailed_design.md` | Open points closed; aligned with the design sequence diagrams |
| B5 | **Avni** | SRS §5.3 question 5 | Decision on how customers are identified (proposal of W10). SRS v1.4 if it changes the requirements (version row by Alfonso) |
| B6 | **Josué** | Analysis models | Contracts, SSDs and domain model checked against the design sequence diagrams; traceability matrix up to FR-77 |

## Part C – Internal reviews (Mon 23 Nov, 20:00)

One GitHub Issue per document, title `Team D review of <document> <version> - Issue List`. First comment: Reviewer · Reviewed · Date. Then one comment per finding (Location · Type · Finding · Recommendation). Short and useful findings only.

| Reviewer | Reviews |
|---|---|
| Alfonso | Design class diagram and state diagrams (Borja, A6) · consistency of `detailed_design.md` |
| Haifa | Design sequence diagrams of UC1 and `system_interfaces.md` (Alfonso, A1, B4) |
| Avni | Design sequence diagrams of UC2 and activity diagrams (Yasmine, A2) |
| Yasmine | Design sequence diagrams of UC3 and question 5 (Avni, A3, B5) |
| Borja | Design sequence diagrams of UC4 (Josué, A4) |
| Josué | Design sequence diagrams of UC5 and `architecture.md` (Haifa, A5, B1) |

## Part D – W11 report: summary of increment 2 (Wed 25 Nov)

The teacher asked for a summary of **everything we did in increment 2**, not only this week. Alfonso prepares the slides (receipt design):
- Analysis models, architecture (drivers, interfaces, views, decisions), UI design, data model, detailed design, how the documents changed (versions and reviews #51 onwards), and the team.
- **One large diagram** (the design class diagram), reduced to one part with the note *"N of M classes shown, full diagram in …"*.
- **Simple animations** that follow the talk (items appear on click, parts of a diagram shown one by one, highlights), not decoration.
- **Timing.** The title slide and the final slides take **one short sentence each**. The time goes to the content. The script gives a time for every slide and the total fits in 10 minutes.

Each member sends Alfonso by **Mon 23 Nov, 20:00** a short summary (3–4 lines) of **everything he or she did in increment 2** (W07–W11), not only this week. Work logs: Avni (team log W11), everyone (individual W11 section) by Wed 25 Nov, 10:00.

## Still open from W10

- **#57, #58, #61**: fixed; the reviewer closes them (Borja #57, Josué #58, Avni #61).

---

## Workload summary

| Member | Part A (detailed design) | Part B (v1.0) | Review |
|---|---|---|---|
| Alfonso | DSD UC1 | `system_interfaces.md`, `detailed_design.md` · slides | Borja, `detailed_design.md` |
| Haifa | DSD UC5 | `architecture.md` | Alfonso |
| Yasmine | DSD UC2 · activity diagrams | `ui_design.md` | Avni |
| Avni | DSD UC3 | Question 5 · team log | Yasmine |
| Josué | DSD UC4 | Analysis models, traceability | Haifa |
| Borja | Design class diagram · state diagrams | `data_model.md` | Josué |
