# Individual Work Log - Josué Rodríguez
Team: D · Project: NewEra POS / Role: Quality and Requirements

### W01
**What I did:** Read the initial project description and learned the team tools. Looked for possible project ideas.
**Hours:** 2
**Problems:** We had several ideas and needed time to agree on one.
**Next:** Learn how the course expects the repository to be organized.

### W02
**What I did:** Learned about software characteristics and quality models. Studied the ISO/IEC 25010 standard.
**Hours:** 1.5
**Problems:** It was difficult to turn abstract qualities into measurable targets.
**Next:** Draft the quality goals for our project.

### W03
**What I did:** Holiday week, no project work.
**Hours:** 0
**Problems:** None.
**Next:** Resume work on the requirements phase.

### W04
**What I did:** Studied software engineering overview and process models. Agreed with the team to use 3 increments.
**Hours:** 1
**Problems:** The team had some communication issues regarding deadlines.
**Next:** Start writing the quality goals document.

### W05
**What I did:** Wrote the Quality Goals document (`docs/requirements/quality_goals.md`). Defined why reliability, usability, performance efficiency, security, maintainability, and compatibility matter.
**Hours:** 3
**Problems:** Defining measurable targets is harder than it looks.
**Next:** Upload the document to GitHub and prepare for the W06 tasks.

### W06
**What I did:** 
- Created the Requirements Conventions document including the ID scheme, MoSCoW priorities, and rules for writing good requirements.
- Converted my Quality Goals into formal Non-Functional Requirements (NFR-01 to NFR-09).
- Built the Traceability Matrix for UC1, aligning it with SRS requirements (FR-01 to FR-17).
- Reviewed Haifa's external interfaces document and left feedback in a GitHub Issue.
**Hours:** 7
**Problems:** Ensuring the traceability matrix correctly linked the requirements to both the design and test phases, especially distinguishing between internal processes and external system calls.
**Next:** Finalize the remaining requirements sections for the SRS and prepare for the W07 tasks.

### W07
**What I did:**
- Fixed Issue #22 from Yasmine's review: updated the examples in `requirements_conventions.md` to use precise terminology from the glossary (NFR-01, IR-01, BR-01) and changed NFR-06 to "3 clicks or fewer" in `nfrs.md`.
- Updated `SRS.md`: integrated NFRs into sections 3.4 (Performance), 3.7 (Standards) and 3.8 (System Attributes), ensuring consistency with `nfrs.md` (using "shall").
- Completed the Verification table (§4) in the SRS for FR-01 to FR-59, NFRs, IRs and BRs, and updated the traceability reference in §5.2.
- Expanded the Traceability Matrix in `requirements_conventions.md` to cover all 5 use cases, mapping FR-20 to FR-29 (UC2), FR-30 to FR-39 (UC3), FR-40 to FR-49 (UC4) and FR-50 to FR-59 (UC5) to their respective test cases.
- Created the `docs/design/operation_contracts.md` for UC1 (makeNewSale, enterItem, endSale, makePayment) strictly following the UPM format: postconditions only describe state changes, added the "Responsibilities" field, and aligned class names and attributes with Borja's domain model (e.g., using `TenderType`).
**Hours:** 8
**Problems:** Adapting the operation contracts to the strict UPM format (where postconditions only describe state changes and not UI actions) required careful rewriting. Also, keeping all NFR texts completely identical across `nfrs.md` and `SRS.md`.
**Next:** Support the team in finalizing SRS v1.0 and start preparing for the architecture and design phase (W11).

### W08
**What I did:** 
- Consolidated the Team E review (merged 26 findings from 4 reviewers) and published them in the bhsei/26E repository.
- Responded to 7 cross-team review findings (Teams B and C) with decisions (Accepted/Partially accepted).
- Updated the SRS v1.1: split NFR-08 (PINs and encryption), added NFR-20, added measurement conditions to NFR-01/02/03/05/09, and added §1.6 Writing rules.
- Aligned the informative documents (`nfrs.md`, `quality_goals.md`, `requirements_conventions.md`) with the SRS.
- Wrote operation contracts for UC2 and UC3.
**Hours:** 8
**Problems:** Ensuring the NFR texts were completely identical across all documents without breaking the numbering used by other teammates.
**Next:** Start the architecture design (W09) and update UC4/UC5 contracts.

### W09
**What I did:** 
- Wrote the operation contracts for UC4 (Start Up / Close Session) and UC5 (Return Rental), contracts 16 to 28. Updated Contract 4 (`makePayment`) and Contract 9 (`approveCashRefund`) to cover rental returns.
- Added Contract 29 (`confirmSessionReview`) for the store manager's review of flagged sessions (FR-74, FR-75).
- Updated `architecture.md`: wrote §5 Correspondences (mapping views to views, and requirements to components) and defined decision record AD-09 (Security of card data and PINs).
- Reviewed Borja's Data View (§4.5) and published a GitHub Issue with 2 findings about local/store database synchronization.
- Resolved peer review feedback: applied Alfonso's Issue #56, Haifa's rename (`CatalogSourceAdapter`), and Borja's domain model alignments (added `pin` to Contract 9, fixed Contract 8 flow, updated Contracts 26-28 with `refundTotal` and `Employee` associations).
- Checked Team E's repository to verify their SRS revision (still pending, they haven't uploaded v1.5).
**Hours:** 9
**Problems:** Aligning the operation contracts with the updated domain model and ensuring the architectural components matched the system interfaces without causing merge conflicts while everyone edited the same files.
**Next:** Prepare for the W10 User Interface Design and continue with the design increment.

### W10
**What I did:** 
- Created the UI Class Diagram (`ui_classes.puml` and `.png`) with 22 classes (15 screens/dialogs and 6 controllers) for the User Interface Design.
- Wrote Section 4 of `ui_design.md`, detailing the class diagram and mapping all usability NFRs (NFR-05, NFR-06, NFR-13 to NFR-18) to specific UI elements and rules.
- Applied peer review feedback from Yasmine (added M-05, M-06, updated D-01) and Avni (added `cancelSale()` and `getAvailableTenders()` to S-05).
- Reviewed Avni's work (A4 Navigation sequence diagram and AD-08) for Part D, creating a GitHub Issue with 2 findings (both accepted and fixed).
- Checked the Team E's new SRS v1.5 (pending task from W09) and confirmed they applied our corrections, allowing the W09 review to be officially closed.
**Hours:** 8
**Problems:** Ensuring the PlantUML code rendered correctly due to its large size (had to use an alternative online renderer).
**Next:** Prepare for the W11 design milestone and the detailed design diagrams.

### W11
**What I did:** 
- A4: Designed the Design Sequence Diagrams (DSD) for UC4 (startUp, logIn, enterOpeningCash, closeSession, and confirmSessionReview) using PlantUML, and justified the GRASP patterns used for each one.
- B6: Aligned the analysis models with the new design. Corrected Contract 16 to include the void of open authorizations after a crash (IR-15), and updated the traceability matrix in `requirements_conventions.md` up to FR-77.
- Part C: Reviewed Haifa's Design Sequence Diagrams for UC5 and the consistency of `architecture.md`, publishing the findings in a GitHub Issue.
- Part D: Sent Alfonso the summary of my work across Increment 2 (W07-W11) for the final design milestone presentation.
**Hours:** 8
**Problems:** Ensuring the DSDs matched Borja's design class diagram method names, and handling the asynchronous voiding of card authorizations at start-up.
**Next:** Prepare for the W12 cross-team reviews and the final design milestone freeze.