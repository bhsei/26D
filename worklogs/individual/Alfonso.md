# Individual Work Log – Alfonso Pinto

**Team:** D · **Project:** NewEra POS · **Role:** Project lead · Requirements engineer

---

## W01
- **What I did:** Proposed NewEra POS, the point-of-sale case study I already know from my previous Software Engineering course at UPM. Prepared the project proposal slides and collected the team's backgrounds and strengths.
- **Hours:** 0
- **Problems:** None.
- **Next:** Set up the team repository.

## W02
- **What I did:** Set up the repository following the course GitHub guide: folder structure, README, Gantt schedule and the W01 team work log.
- **Hours:** 0
- **Problems:** The guide explains how to commit but not what content is expected each week.
- **Next:** Follow the course topics to decide the next documents.

## W03
- **What I did:** Holiday week, no project work.
- **Problems:** None.
- **Next:** Restart with the next course topic.

## W04
- **What I did:** Coordinated the team's reply to the teacher about the missing GitHub updates. Studied the software process models topic and compared the models for our project.
- **Hours:** Few
- **Problems:** We had misunderstood the presentation schedule and what had to be uploaded every week.
- **Next:** Prepare the first progress presentation.

## W05
- **What I did:** Prepared and presented the W05 progress report (process model decision, life cycle, roles). Wrote the process model document and the project plan. Organised the catch-up work and the W06 tasks for the team (`plans/task_plan_W05-W06.md`).
- **Hours:** 2 hours in class.
- **Problems:** The repository was behind the course schedule, so a catch-up plan was needed.
- **Next:** Start the SRS (W06).

## W06
- **What I did:** Created the SRS following ISO/IEC/IEEE 29148: sections 1 (Introduction) and 2 (References), links to the team's W06 requirement documents, and the team decisions on actors (Customer as stakeholder), payment methods (cash, credit card, check) and the new use case UC5 Return Rental. Wrote UC1 Process Sale as a fully dressed use case and derived the functional requirements FR-01 to FR-17. Reviewed Borja's use case model in a GitHub Issue (#16) and fixed the review of my SRS (#19) in SRS v0.2. Prepared the W06 report slides. Organised extra tasks for the team (UI prototype, sequence diagram, NFRs and traceability, acceptance criteria).
- **Hours:** 4.5
- **Problems:** The teacher asked for more depth after W05, so the team added extra tasks focused on UC1 end to end.
- **Next:** Prepare the W06 report slides; W07 fully dressed use cases and SRS v1.0.

## W07
- **What I did:** Planned W07 (`plans/task_plan_W07.md`): close W06, SRS v1.0 tasks for each member and the start of increment 2 (design). Wrote UC5 Return Rental as a fully dressed use case with FR-50 to FR-59. Integrated SRS v0.9: §1 aligned with the rest of the document, verification of IR-11 to IR-14, NFR-13 to NFR-18, DR and DC in §4, and the cross-cutting open questions in §5.3. Fixed review #23 (UC1 ext. 4b1, 6a, 11c and \*b, FR-18 and FR-19, priority rule, UC5 damaged item, card payment retry) and the SRS findings of review #24 (DR-08, DR-11, NFR-08, NFR-19), and released SRS v1.0. Reviewed the work of the team and coordinated the fixes. Started increment 2 with the architecture drivers (`docs/design/architecture_drivers.md`: functional drivers, utility tree, trade-offs and constraints). Prepared the W07 report slides.
- **Hours:** 5.5
- **Problems:** The SRS v0.9 integration was late, so the reviews were done on the draft. Some fixes arrived after the 12:00 deadline for v1.0, and there were merge commits in `main` again.
- **Next:** Close issues #23 and #24. In W08, plan increment 2: architecture decisions AD-01 to AD-10 from the priority drivers, and the system interfaces (step 2 of the architecture process).

## W08
- **What I did:** Planned W08 (`plans/task_plan_W08.md`) and updated it when the review groups changed (we review Teams E and F, Teams B and C review us). Reviewed chapter 5 (UC-01 to UC-10) and chapters 7 to 12 of Team E's SRS and added my findings to `reviews/W08/review_team_E.md`. Triaged the 45 findings received from Teams B and C (`reviews/W08/feedback_received.md`): severity in our scale, proposed decision and owner for each one. Answered my 12 findings and checked that every finding had a reply by Tue 3 Nov; filled in row D of the statistics form (B: 21 findings, 13 accepted, 7 partially, 1 rejected; C: 24 findings, 19 accepted, 5 partially). Applied my changes in the SRS: catalog from the back-office (§1.2, §1.5, IR-17), void after a crash and card reader error in UC1, refund rules for damaged items and card refunds with no answer in UC5, FR-68 to FR-73, and owners and decision dates in §5.3. Integrated SRS v1.1 (version history, status, FR-29 and FR-39 use the common receipt FR-71). Prepared the W08 report slides.
- **Hours:** 4
- **Problems:** My first new FRs used FR-60 to FR-65, the same IDs as Avni's, because I added them before pulling; I renumbered them to FR-68 to FR-73 on the latest version. Some local changes were lost when the IDE pulled and discarded them, so I added them again.
- **Next:** Write the system interfaces (step 2 of the architecture process, C1), close the open questions of §5.3 that are mine before W11, and follow the pending items of the revision plan (state diagrams, SSDs of UC4 and UC5, compound FRs for v1.2).

## W09
- **What I did:** Planned W09 (`plans/task_plan_W09.md`): architecture views, the W08 revision items and the new rules for answering reviews (no rejected or partially accepted findings). Wrote the system interfaces (`docs/design/system_interfaces.md`, step 2 of the architecture process): the system API from the SSDs and the contracts, the Java interfaces of the adapters and the devices, and the protocol with the stubs; aligned it with Borja's SSDs of UC4 and UC5 and fixed the 8 findings of Yasmine's review (#55) in v0.3. Updated `architecture_drivers.md` to v0.2 (SRS v1.1, C-09 shared store database, C-08 decided). Decided open questions 3 and 7 of the SRS (one tender per sale or rental, BR-18; no discounts or promotions) and the glossary. Reviewed the correspondences and AD-09 (Josué), the context and interaction views (Yasmine) and the consistency of `architecture.md` (#56, 6 findings). Integrated SRS v1.2 and updated the README.
- **Hours:** 5
- **Problems:** Several people edited `architecture.md` and the SRS on the same days, so I had to pull again before pushing. Borja's SSDs of UC4 and UC5 came after my first version of the interfaces, so I changed my operation names to match his.
- **Next:** W10 User Interface Design, and AD-05 and AD-06 (storage and the Accounting queue) with Borja, so that the storage interfaces can be added to `system_interfaces.md` before the design milestone (W11).

## W10
- **What I did:** Planned W10 (`plans/task_plan_W10.md`) and the design milestone of W11 (`plans/design_milestone_W11.md`). Wrote the storage interfaces of `system_interfaces.md` (§4.3) from AD-05 and AD-06, the system status and the list of pending card refunds (§3.8), the names of the store manager operations and the table of the screens and their requests (§3.9), and fixed the 10 findings of Yasmine's review (#60) and the changes of the data model v0.2 in v0.5. Added FR-76 and FR-77 to the SRS and integrated SRS v1.3. Reviewed the UI class diagram and the consistency of `ui_design.md`. Updated the README and prepared the W10 report slides.
- **Hours:** 7
- **Problems:** My storage interfaces were late: I wrote them on Monday instead of Sunday, so Yasmine's review and my fixes were squeezed into two days. The data model changed after the review of AD-05 (#59), so the interfaces had to follow it.
- **Next:** W11 design milestone: design sequence diagrams of UC1, the integration of `detailed_design.md`, and every design document at v1.0 by Tue 24 Nov.

## W11
- **What I did:** Planned W11 (`plans/task_plan_W11.md`): owners of the design sequence diagrams, the documents at v1.0 and the internal reviews. Drew the design sequence diagrams of UC1 (makeNewSale and enterItem, endSale, makePayment; contracts 1 to 4) and fixed the 4 findings of Haifa's review (#64). Started `docs/design/detailed_design.md` and brought it to v1.0 with the sections of the other owners. Kept `system_interfaces.md` aligned with the diagrams and the design class diagram (v0.6 to v1.0: catalog import at start-up, customers and open rentals, store database answers) and fixed the 5 findings of Haifa's review (#65). Reviewed Borja's design class diagram and state diagrams (#69, 8 findings). SRS v1.4 (question 5, DR-02). Collected the increment 2 summaries of the team, updated the README and prepared the W11 report.
- **Hours:** 9
- **Problems:** Many diagrams changed on the same two days, so `system_interfaces.md` had to follow them several times (v0.6, v0.7, v0.8). I checked every interface call of the diagrams against the document before v1.0. Two pulls conflicted with other commits on `detailed_design.md` and had to be merged by hand.
- **Next:** W12: cross-team reviews of the design and the fixes of the findings we receive.
