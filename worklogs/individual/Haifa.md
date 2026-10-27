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
- **Problems:** Our existing commits did not all follow the same message format, so I had to define one clear rule with examples.
- **Next:** Work on the external interfaces of the POS for the SRS.

## W06
- **What I did:** Wrote the external interfaces inventory (`docs/requirements/external_interfaces.md`). For the Payment Service, Tax Calculator, Accounting System and HR System it describes the data sent and received, the timing and the fallback when the system is down, plus a first draft of IR-01 to IR-10. Reviewed Avni's glossary and business rules against the proposal and the course domain model, and posted 6 findings in issue #17. Added the UI prototype to the repository (`docs/design/prototype/`) and a simulated barcode scanner to it: a Scan button on the Sale, Rental, Return and Return rental screens opens a scanner window where the cashier "scans" an example item, serial number or receipt, including an unknown barcode to show the error case (BR-11 for items that cannot be rented).
- **Hours:** 6
- **Problems:** I have not been able to check the full case study yet, so some details of the external systems are still open questions.
- **Next:** Follow up on Avni's answers to issue #17, answer Josué's review of my document and support the fully dressed use cases in W07.
