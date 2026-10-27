# Individual Work Log – Borja Nicolás

**Team:** D · **Project:** NewEra POS · **Role:** UML modeler · Documentation

---

## W01
- **What I did:** Took part in the team discussions to choose the project. We compared ideas and chose NewEra POS, a point-of-sale system for a retail store, because it is a proven object-oriented analysis and design teaching case. Helped check that it was feasible (scope of 4 use cases, 2 actors and 4 external systems) and talked with the team about roles according to each member's strengths (mine: UML modeling and documentation).
- **Problems:** We had several ideas and needed time to agree on one.
- **Next:** Help set up the repository and plan the requirements work.

## W02
- **What I did:** Took part in the team meeting about the NewEra POS case (sales, returns, rentals and four external systems: Payment Authorization, Tax Calculator, Accounting and HR) and about the repository structure and README. We agreed that WeChat is the main communication channel, with a weekly team meeting, and that Alfonso coordinates the project as project lead.
- **Problems:** The course GitHub guide does not say what content to upload each week, and the topics so far were general, so there was no clear requirements task yet.
- **Next:** Follow the course topics to decide which documents to produce next.

## W03
- **What I did:** Holiday week, no project work.
- **Problems:** None.
- **Next:** Restart with the next course topic.

## W04
- **What I did:** Took part in the team discussion after the teacher pointed out that our GitHub repository had not been updated. We agreed to update the repository every week, even in weeks with little new course content, and to ask the teacher directly when an instruction is unclear.
- **Problems:** The team had misunderstood the presentation schedule and what had to be uploaded.
- **Next:** Help prepare the first progress presentation and choose a process model.

## W05
- **What I did:** Helped prepare the W05 progress report slides (10-minute presentation) with the structure required by the teacher: technical progress, deliverables and team management. Took part in the choice of the process model (iterative-incremental) and in the discussion of the use case diagram of the system (Cashier, four use cases, four external systems), which is the base of my work as UML modeler.
- **Hours:** 2
- **Problems:** Fitting all the content into the 10-minute limit.
- **Next:** In W06, write the use case model overview with its UML diagram for the SRS and update the README team table.

## W06
- **What I did:** Wrote the use case model overview (`docs/requirements/use_case_model.md`) with its UML use case diagram (`assets/use_case_diagram.png` and the editable PlantUML source `assets/use_case_diagram.puml`): the Cashier, the four use cases (Process Sale, Handle Returns, Process Rental, Start Up) and the four external systems. Described each use case in one paragraph, linked to the business rules of the glossary (BR-xx) and to the external interfaces inventory, added the planned build order from the W05 plan, and compared it with the simpler W05 diagram. Updated the README team table (A5): confirmed roles from the W05 report, GitHub usernames, and W05 in the Progress table. Published both changes on GitHub (two commits, one document per commit).
Fixed the use case model after review #16 (UC5 Return Rental added to the diagram, W06 team decisions recorded, tax rule for the rental deposit) in two commits, and reviewed Yasmine's stakeholders and elicitation plan in two GitHub Issues.
- **Hours:** 4
- **Problems:** I have not been able to check the full case study yet, so the use case descriptions are first drafts based on the proposal, the glossary and the interfaces inventory. The sources disagree on three points that I recorded as open questions: whether the Customer is an actor (the scope says 2 actors, the W05 diagram shows the customer only as a note), whether there are 2 or 3 payment methods, and where the return of a rented item belongs (UC2 or UC3). The automatic layout of the diagram crossed many lines at first, and I had to change the order of the declarations in the source to get UC1–UC4 in order.
- **Next:** Review Yasmine's stakeholders and elicitation plan with GitHub Issues (Tue 20 Oct); answer Alfonso's review of the use case model; update the model and the diagram with the team's decisions on the open questions; support the fully dressed use cases in W07; complete the missing GitHub usernames and student IDs in the README.

## W07
- **What I did:** Reviewed sections 1 to 3.2 of the SRS (working draft v0.9) in a GitHub Issue with 19 findings (inconsistencies between UC1, UC3, UC4, UC5 and the NFRs, missing extensions, undefined terms, pending sections). Wrote the domain model (`docs/design/domain_model.md` with `assets/domain_model.png` and the PlantUML source): 23 classes for UC1 to UC5, attributes, multiplicities, and the same class and attribute names as Josué's operation contracts. Wrote the system sequence diagram of UC1 Process Sale (`docs/design/system_sequence_diagrams.md` with `assets/ssd_uc1.png` and source): the four system operations makeNewSale, enterItem, endSale and makePayment, with the cash, credit card and check variants. Wrote section 3.5 Logical database requirements of the SRS (DR-01 to DR-18), derived from the domain model.
- **Hours:** 2
- **Problems:** UC2 Handle Returns is not written yet, so the model for returns (Return, ReturnLineItem) is based on the glossary and BR-07/BR-08 only. Several choices depend on open questions of the SRS: one or several items per rental, split tenders, the data stored about the customer, and whether the late fee is taxed. The contracts of UC1 and my model had to use the same names, so I checked both documents against each other.
- **Next:** Answer the comments of Alfonso and Haifa on my documents; update the domain model and the SSD with the decisions of the SRS v1.0; add the SSD of the other use cases (UC2, UC3, UC5) and the contracts they need together with Josué; prepare the design class diagram for W11.
