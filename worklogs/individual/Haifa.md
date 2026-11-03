# Individual Work Log – Haifa Chkoundali

**Team:** D · **Project:** NewEra POS · **Role:** Developer · Integration and coding practices

---

## W01
- **What I did:** Looked for possible project ideas with the team and compared them. Helped check that the NewEra POS case was feasible (actors, use cases, external systems) and prepared my part of the proposal slides.
- **Hours:** 2
- **Problems:** We had several ideas and needed time to agree on one.
- **Next:** Learn how the course expects the repository to be organised.

## W02
- **What I did:** Went through the course GitHub guide and the repository structure, and noted which rules we should follow as a team (commit format, one document per commit).
- **Hours:** 1.5
- **Problems:** The guide explains how to commit but not what to deliver each week.
- **Next:** Propose common working rules for the repository.

## W03
- **What I did:** Holiday week, no project work.
- **Problems:** None.
- **Next:** Restart with the next course topic.

## W04
- **What I did:** Read the teacher's message about the missing GitHub updates and gave my input for the team's reply. Checked which documents were still missing from the repository.
- **Hours:** 1
- **Problems:** The team had misunderstood when we had to present and what had to be uploaded.
- **Next:** Help prepare the W05 presentation and plan regular repository updates.

## W05
- **What I did:** Took part in the process model discussion (we chose iterative-incremental). Wrote the contributing rules (`CONTRIBUTING.md`): Git workflow, commit format, file naming, branches and how to review documents with GitHub Issues. Linked them from the README.
- **Hours:** 3
- **Problems:** Our existing commits did not all follow the same message format.
- **Next:** Work on the external interfaces of the POS for the SRS.

## W06
- **What I did:** Wrote the external interfaces inventory (`docs/requirements/external_interfaces.md`). For the Payment Service, Tax Calculator, Accounting System and HR System it describes the data sent and received, the timing and the fallback when the system is down, plus a first draft of IR-01 to IR-10. Reviewed Avni's glossary and business rules against the proposal and the course domain model, and posted 6 findings in issue #17. Added the UI prototype to the repository (`docs/design/prototype/`) and a simulated barcode scanner to it: a Scan button on the Sale, Rental, Return and Return rental screens opens a scanner window where the cashier "scans" an example item, serial number or receipt, including an unknown barcode to show the error case (BR-11 for items that cannot be rented).
- **Hours:** 6
- **Problems:** I have not been able to check the full case study yet, so some details of the external systems are still open questions.
- **Next:** Follow up on Avni's answers to issue #17, answer Josué's review of my document and support the fully dressed use cases in W07.

## W07
- **What I did:** Fixed Josué's review of the external interfaces (#14) and closed it: timeouts for the external systems, what happens when the connection drops during a card payment, who can change the default tax rate, refresh of the HR local copy, and a proposal for the rental deposit (external_interfaces.md v0.2). Fixed the UI prototype with Yasmine (empty Deposit row, check payments authorized by the Payment Service, "Payment Service" label, example values, SN-2002-05) and wrote `docs/design/ui_prototype.md` (how to open it, demo data, which UC/FR each screen covers). Added my student ID to the README (#15). Wrote my SRS sections: hardware interfaces (§3.1.2, IR-11 to IR-14), software interfaces with the final IR-01 to IR-10 (§3.1.3) and design constraints (§3.6, DC-01 to DC-08). Reviewed SRS v0.9 sections 3.3 to 5 and posted 8 findings in issue #24. Started increment 2 with the architecture document skeleton (`docs/design/architecture.md`, ISO/IEC/IEEE 42010 structure and a first list of architecture decisions AD-01 to AD-10).
- **Hours:** 7
- **Problems:** None.
- **Next:** Fix the findings on my sections before SRS v1.0, tell Avni to update BR-02 (default tax rate changed only by a store manager), and fill in the architecture decisions in W08–W09.

## W08
- **What I did:** Reviewed sections 3.2 to 3.5, chapters 5–6 and appendix A of Team F's SRS v0.3 and wrote 6 findings. As consolidator for Team F, merged them with Yasmine's 8 findings, dropped my H2 (same problem as her Y2) and posted the 13 findings in bhsei/26F issue #6 on Monday before 12:00. Answered the 6 findings from Teams B and C on my sections (B-D08 in #50, #25, #29, #35, #38, #43): 4 accepted, 2 partially accepted. Then changed my SRS sections (§3.1.2–3.1.3) in 5 commits, one per finding: the cash drawer also opens for the opening and closing count (IR-14), a payment retry keeps the same transaction ID (IR-02), a new IR-15 voids an authorization left open after a crash, and the "tax to be corrected" flag goes to the Accounting System, where the tax is corrected (IR-05, IR-06). Records for the Accounting System are now sent in the background, so the receipt never waits for it. The IR priorities follow the §3.2.6 rule (IR-01 split, new IR-16 for checks). Added a limitations note to `ui_prototype.md`: the login does not check the PIN (#25). Started the architecture decisions in `architecture.md` with options and a first proposal for AD-01 to AD-03: a layered architecture with one adapter per external system, a local web application on each register, and Java with HTML/JS screens (Python as fallback).
- **Hours:** 7
- **Problems:** Several of us edited SRS.md on the same day, and Alfonso added IR-17 to the table I was changing. I pulled before every commit, so there was no conflict.
- **Next:** Confirm AD-01 to AD-03 with the team in W09, check Team F's revised SRS (column H of the statistics form), then AD-04 to AD-10 and the views.
