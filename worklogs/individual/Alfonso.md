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
