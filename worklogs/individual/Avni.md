# Individual Work Log – Avni Oflaz

**Team:** D · **Project:** NewEra POS · **Role:** Developer · Testing

---

## W01
- **What I did:** Took part in preparing and presenting the project proposal. 
- **Hours:** **[1]**
- **Problems:** None.
- **Next:** Follow the course topics and help set up the repository.

## W02
- **What I did:** Read the course GitHub guide and the POS case description. 
- **Hours:** **[1]**
- **Problems:** It was not clear what content had to be uploaded each week.
- **Next:** Clarify the weekly deliverables with the team.

## W03
- **What I did:** Nothing. This was a holiday week with no class.
- **Problems:** None.
- **Next:** Resume work after the holiday.

## W04
- **What I did:** Helped write the explanation letter to the teacher about the missed GitHub update and the presentation-order misunderstanding. 
- **Problems:** We had misread the presentation schedule.
- **Next:** Help prepare the first progress presentation.

## W05
- **What I did:** Helped build the W05 progress report slides following the teacher's three-part structure: technical progress, deliverables, and team management.
- **Hours:** **[2]**
- **Problems:** We had little time to prepare.
- **Next:** In W06, write the glossary and business rules list (B8) and the team work log (B10), and review the SRS sections 1–2 (B1).

## W06
- **What I did:**
  - Wrote the team work logs W02–W05 (A7) and my individual log W01–W05 (A9) and pushed them to GitHub.
  - Wrote the glossary and the first business rules list (B8): the domain terms, BR-01 to BR-14 and the open questions for the team, using the terms of the project proposal.
  - Reviewed Alfonso's SRS sections 1–2 in a GitHub Issue (#19), with one comment per finding.
  - Received Haifa's review of the glossary (#17, 5 findings).
  - Presented slides 4 (UC1 Process Sale, main success scenario) and 8 (examples of how requirements are written) in the W06 progress presentation on Wed 21 Oct.
  - Wrote the team work log W06 (B10).
- **Hours:** 6 h
- **Problems:**
  - The project proposal does not contain the store's business rules, so most rules are marked *Proposed* until the team checks them against the full case study.
  - GitHub no longer accepts account passwords for Git, so I had to set up a personal access token to push.
- **Next:** In W07, fix the findings of the glossary review (#17) and update the glossary to match the SRS; write the fully dressed use cases UC3 Process Rental and UC4 Start Up and the acceptance criteria for UC1 in the SRS; and fix the review findings on my sections.

## W07
- **What I did:**
  - Fixed the 5 findings of Haifa's review of the glossary (#17) and published glossary v0.2, updated to match SRS v0.1 (the Payment Service also authorizes checks and card refunds, the Customer is a stakeholder, and UC5 Return Rental was added).
  - Closed the open W06 items: completed my W06 individual log, updated the W06 team log and started the W07 team log.
  - Wrote UC4 Start Up as a fully dressed use case (SRS section 3.2.4) with the functional requirements FR-40 to FR-49.
  - Wrote UC3 Process Rental as a fully dressed use case (SRS section 3.2.3) with the functional requirements FR-30 to FR-39.
  - Wrote the acceptance criteria for UC1 (SRS section 4.1): five Given / When / Then cases, AC-01 to AC-05, linked to the requirements and to the test cases.
  - Fixed the review findings on my sections (#23 and #24): the retry of the card payment in UC3 extension 13b2b, FR-37 and AC-05; the 10 second timeout in AC-05; UC3 extension 4a and FR-31 for an invalid or new customer ID; and glossary v0.3 with 19 new terms. I answered the findings in the review issues.
- **Hours:** 5 h
- **Problems:**
  - UC3 and UC4 depend on details that the case does not give (rental periods, rental fee and deposit amounts, where customers are registered), so I listed them as open issues in each use case.
  - My first insertion of the UC4 requirements went into the verification table instead of the requirements table. I found it when I checked the SRS and moved the rows to section 3.2.6.
  - The SRS changed several times on the last day, so I pulled before every edit to avoid conflicts.
- **Next:** Present SRS v1.0 (Wed 28 Oct) and start Increment 2 (Design) with the tasks of the W08 plan.

## W08
- **What I did:**
  - Reviewed Team E's SRS v1.4 (sections 4.1–4.2 and 4.6–4.10) and wrote 6 findings: unmeasurable words, platforms that are not defined, the Lite Mode specification, the Network Boost measurement, requirements that bundle several behaviours, and the missing locale matrix. Josué consolidated them as findings 14 to 19 of the 26 findings in our review of Team E.
  - Answered the 7 findings from Teams B and C on my sections (Issue #50: B-D04, B-D15, B-D16, B-D17; Issues #26, #27 and #36). I accepted 5 and partially accepted 2, and I gave the same decision to the findings that both teams reported.
  - Applied the changes in the SRS in 10 commits:
    - UC4: the offline login checks the PIN against the local salted hash, also for store manager approvals (ext. 6c, FR-45, FR-46).
    - A new close-session function (section 3.2.4.1, FR-60 to FR-63) with end time, closing cash and difference, so that a shift can end.
    - UC3: the accepted risk of a new customer ID (ext. 4a, BR-12, open question 5 with an owner and a date), the card reader error (13b1a), the retry that reads the card again (13b2b), and FR-37 split into FR-37 and FR-64 to FR-67.
    - Section 3.10 now holds the business rules with their status and lists the requirements that depend on a Proposed rule. The glossary is v0.4 and the companion files are marked as informative.
- **Hours:** 6 h
- **Problems:**
  - All FR numbers from FR-01 to FR-59 were already used, so I took the next free numbers (FR-60 to FR-67) and checked that no FR number is used twice.
  - Several people edited SRS.md at the same time, so I pulled before every change and made separate commits, without merge commits.
  - Teams B and C reported some of the same problems (offline PIN, ending the session), so both answers had to be consistent.
- **Next:** In W09, check the answers of Team E to our review and the SRS v1.1; start Increment 2 (Design) with the tasks of the W09 plan; and answer open question 5 (how customers are identified) before the design is closed (W11).

## W09
- **What I did:**
  - Wrote the deployment view of the architecture document (section 4.4) with a deployment diagram of the register computer, the devices, the store database server, the stubs of the external systems and the network links, and the decision record AD-10 on device access.
  - Decided the open questions 1 and 9 of SRS section 5.3: refund period of 30 days, rental periods of 1, 3 or 7 days, a late fee of one day's rental fee for each day late, no tax on the deposit, and a limit of 5.00 for the cash difference at the end of a session with a review by the store manager. I wrote BR-15 to BR-17, FR-74 and FR-75, updated UC2, UC3, UC4, UC5, section 3.10 and the glossary (v0.5), and corrected FR-60 so that the rental return also blocks the close session.
  - Reviewed Borja's system sequence diagrams of UC4 and UC5 and his state diagrams in Issue #54 (8 findings); he fixed them in the diagrams v0.8 and the domain model v0.6.
  - Answered Haifa's review of the deployment view (5 findings, all accepted): the scanner reaches the POS application through the browser, numbered links in the diagram, a row for the Accounting System, the medium of the catalog file as an open point, and the wording of IR-02.
  - Wrote the team work log W09.
- **Hours:** 7 h
- **Problems:**
  - The labels of my first deployment diagram were far from their arrows; after the review I redrew it with numbered links and a table.
  - The case does not give values for the open questions, so I chose them as proposals and the rules stay Proposed until the full case study is checked.
  - Several people edited the SRS and the architecture document at the same time, so I pulled before every change and made separate commits, without merge commits.
- **Next:** In W10, take my part of the user interface design from the W10 plan, check the architecture decisions AD-05 and AD-06 for my deployment view, and answer open question 5 (how customers are identified) before the design milestone in W11.
