# Individual Work Log – Yasmine Chkoundali

**Team:** D · **Project:** NewEra POS · **Role:** Requirements · UI/UX

---

## W01

- **What I did:** Researched project ideas with the team and checked whether they were feasible for the course. Helped prepare the project proposal presentation.
- **Hours:** **[3]**
- **Problems:** Choosing one idea without knowing the course requirements in detail.
- **Next:** Help set up the repository and look into what the system needs.

## W02

- **What I did:** Looked into the functionality and interfaces the POS system would need, and took part in the discussion on how to divide the tasks.
- **Hours:** **[3]**
- **Problems:** It was not clear what content had to be uploaded each week.
- **Next:** Follow the course topics to decide which documents to produce.

## W03

- **What I did:** Nothing. This was a holiday week with no class.
- **Problems:** None.
- **Next:** Resume work after the holiday.

## W04

- **What I did:** Took part in the team discussion after the teacher's remark about the GitHub update, and in the explanation letter to the teacher.
- **Hours:** **[<1]**
- **Problems:** We had misread the presentation schedule and assumed no progress was expected in a week without new content.
- **Next:** Prepare the first progress presentation and choose a process model.

## W05

- **What I did:** Worked on my catch-up tasks: added the project proposal PDF to the repository (`docs/release/project_proposal.pdf`), wrote the project overview page (`docs/project_overview.md`) and wrote this work log.
- **Hours:** **[4]**
- **Problems:** Finding which slides were the official project proposal among the team files.
- **Next:** In W06, write the stakeholders document and the elicitation plan, and review the requirements conventions.

## W06

- **What I did:** Wrote the stakeholders and users document : stakeholder list with their interests and a cashier persona. Wrote the elicitation plan : techniques with their rationale and 14 interview questions for a cashier and a store manager. Reviewed Josué's requirements conventions and traceability template and left my comments in a GitHub Issue.
- **Hours:** **[6]**
- **Problems:** Choosing realistic details for the persona and the questions without having observed a real shop till yet.
- **Next:** In W07, write the fully dressed use case UC2 Handle Returns and help prepare the first complete SRS draft.

## W07

- **What I did:** Fixed the review findings on my two W06 documents (stakeholders v0.2 and elicitation plan v0.3, reviews #20 and #21) and answered each comment. Filled in my row of the README team table (#15). Wrote UC2 Handle Returns fully dressed in the SRS (§3.2.2) with FR-20 to FR-29, the user interfaces section (§3.1.1, one subsection per prototype screen) and the usability requirements (§3.3, NFR-13 to NFR-18). Checked the screen descriptions against the prototype.
- **Hours:** **[6]**
- **Problems:** The SRS sections were late because I started after the deadline. Some rules for returns are still open (refund period, return without receipt, card refund when the card is not present), so I listed them as open issues. The prototype does not show everything the SRS requires yet (PIN check, quantity already returned, finding a rental by receipt number).
- **Next:** Fix the findings of the SRS v0.9 review in my sections before SRS v1.0, and help with the design work in W08.

## W08

- **What I did:** Reviewed Team F's SRS v0.3 (ch. 1–2, §3.1 and ch. 4) and wrote 8 findings (Y1–Y8) for the consolidated review. Answered my 6 findings from Teams B and C (B-D06, B-D13, B-D21 in #50, and #28, #37, #48). Changed UC2 and FR-22 to FR-27 in the SRS (manager approval for cash refunds, refund status check, condition of returned items and stock, refund of the tax charged in the sale) and the usability section. Updated the elicitation plan to v0.4 (Q-06 scale, new questions for NFR-06 and NFR-13, observation checklist).
- **Hours:** **[10]**
- **Problems:** A merge conflict in the review file and a broken FR table in SRS.md, both caused by editing the same files as other teammates; I fixed them by redoing the edits from the latest version. Some answers depend on decisions that are still open (days before a check can be refunded in cash, what to do with items that are not resellable).
- **Next:** Check my sections in SRS v1.1, and take the next tasks of the W09 plan.

## W09

- **What I did:** Drew the context view (§4.1) and two sequence diagrams of the interaction view (§4.3) of the architecture: UC1 paid by credit card through the layers, and the Payment Service not answering, with a retry that reuses the same transaction ID (IR-02). Reviewed the system interfaces (v0.2) and posted 8 findings in a GitHub Issue (#55). Answered the two findings of review #56 about my views: I added the void when the cashier gives up the card payment (AD-07, IR-15) and the store database server in the context view (DC-09).
- **Hours:** **[9]**
- **Problems:** I started the views late, so Alfonso could review them only on the same day. The first version of my second diagram missed the void when the cashier gives up the card payment, and Alfonso found it in review #56.
- **Next:** W10: write the screens and navigation of the UI design (`ui_design.md`) and review Alfonso's storage interfaces.
