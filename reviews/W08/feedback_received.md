# W08 – Review findings received from Teams B and C

Team D · SRS v1.0 (commit 311a606) · Last update: 2026-11-02 · Owner: Alfonso

- **Team B**: one Issue, [#50](https://github.com/bhsei/26D/issues/50), 21 findings (B-D01 to B-D21), one comment each.
- **Team C**: 24 Issues, [#25](https://github.com/bhsei/26D/issues/25) to [#49](https://github.com/bhsei/26D/issues/49) (no #32), one finding each (C1 = #25, then D-01 to D-23).

**How to answer (by Tue 3 Nov, 10:00).** Team B: quote reply to the comment in #50. Team C: comment in that Issue.
Start with the decision: **Accepted**, **Partially accepted** or **Rejected**. Then give the reason (always for partially and rejected) and the planned change (section, ID) in SRS v1.1. The decisions below are proposals: change them if you disagree, but tell in the WeChat.
**Changes in the SRS:** by Tue 3 Nov, 23:59, in your own section, with the finding in the commit message (e.g. `W8 - SRS; UC4 ext. 6c checks the PIN offline (#27, B-D15)`).

Severity in our statistics form (High / Medium / Low): Severe or High → **High**, Moderate → **Medium**, Minor → **Low**.

## Team B (#50)

| ID | Severity | Topic | Owner | Proposed decision | Planned change |
|---|---|---|---|---|---|
| B-D01 | High | Data kept only on one register | Borja | Partially | §1.5 assumption + DC: one store database shared by all registers, each register keeps a local copy and queue when offline. Synchronisation details go to the design (AD-05). |
| B-D02 | Medium | No source for catalog, prices, stock deliveries | Alfonso | Accepted | §1.2/§1.5: catalog, prices and goods received come from the store's back-office system (out of scope); add an assumption and a short IR for the catalog import. |
| B-D03 | Medium | Item status lifecycle not closed | Borja | Partially | DR-02: remove _Reserved_; add the transition Under maintenance → Available (store manager); item not returned → open question with owner. State diagram in increment 2. |
| B-D04 | Medium | New customer ID bypasses overdue block | Avni | Partially | BR-12/UC3 4a: state that the store accepts the risk and relies on the deposit; customer identification stays open question 5 (with owner and date). |
| B-D05 | Medium | Card refunds need data that is not stored | Borja | Accepted | New DR: store the payment reference returned by the Payment Service (not card data under DC-06); IR-03 uses it. |
| B-D06 | Medium | Check payments refunded in cash at once | Yasmine | Accepted | UC2 and UC5 ext. 9c: cash refund of a check payment needs store manager approval (Alfonso does UC5). |
| B-D07 | Medium | Rental DRs have higher priority than rentals | Borja | Accepted | DR-02 and DR-06 → Should; rental fields of DR-01 in a separate Should DR. |
| B-D08 | Low | Drawer cannot open for the opening count | Haifa | Accepted | IR-14: the drawer also opens at session start (UC4 step 8); every opening is logged with its reason. |
| B-D09 | Low | Receipt requirements drifted apart | Alfonso | Partially | One common receipt requirement (store, register, date, cashier, transaction ID, tender, change, masked card) + specific fields per type. Other repeated families in v1.2. |
| B-D10 | Low | Compliance claims broader than requirements | Josué | Accepted | NFR-11/12 rewritten as concrete obligations; certification out of scope; checklist described in §4. |
| B-D11 | Low | Store manager missing from use case diagram | Borja | Accepted | Add Store manager as secondary actor in `use_case_diagram.puml`. |
| B-D12 | Low | Detailed design milestone week | Alfonso | Rejected | The course calendar has the design/architecture milestone in W11 (W12 is Coding). DC-07 stays. |
| B-D13 | High | Card refund with no answer treated as failed | Yasmine | Accepted | UC2 (and UC5, Alfonso) ext. 9b2: separate "declined" from "no answer"; for no answer, ask the Payment Service for the refund status before paying cash. |
| B-D14 | Medium | Damaged and late return can give a refund | Alfonso | Accepted | UC5 6a/7a and FR-54: damaged → refund is zero, the late fee is only recorded; worked example. |
| B-D15 | High | Offline login does not check the PIN | Avni | Accepted | UC4 6c, FR-45, FR-46: check the PIN against the local salted hash; same for store manager approvals offline. (Same as #27.) |
| B-D16 | Medium | Normal session closure excluded | Avni | Accepted | Add a minimal "close session" function (end time, closing cash, difference). (Same as #26.) |
| B-D17 | Low | Normative content spread across files | Avni | Partially | BR table with status moved into §3.10 (with #36); companion files marked as informative. |
| B-D18 | Medium | Baseline rests on open questions | Alfonso | Accepted | §5.3: add dependent requirements, owner and decision date for each question. (With #46.) |
| B-D19 | Low | Analysis models incomplete | Borja | Partially | SRS references the domain model and SSDs now; SSDs for UC4/UC5 and state diagrams in increment 2. |
| B-D20 | Medium | Sale completes when stock goes below zero | Alfonso | Partially | UC1 11c / FR-19: warn the cashier and record the difference; no manager approval (it would block the checkout). |
| B-D21 | Medium | Returned items go back to stock in any condition | Yasmine | Accepted | UC2/FR-27: cashier records the condition; only resellable items go back to stock. |

## Team C (#25–#49)

| Issue | ID | Severity | Topic | Owner | Proposed decision | Planned change |
|---|---|---|---|---|---|---|
| #25 | C1 | High | Prototype does not check the PIN (FR-44) | Haifa | Partially | The prototype is throw-away (process model); FR-44 already requires the PIN. Note the limitation in `ui_prototype.md`. |
| #26 | D-01 | High | No end of cashier session | Avni | Accepted | Same as B-D16. |
| #27 | D-02 | High | Offline login without PIN check | Avni | Accepted | Same as B-D15. |
| #28 | D-03 | High | Uncontrolled cash fallback for card refunds | Yasmine | Accepted | UC2/UC5 9b2a: cash fallback needs store manager approval and a recorded reason (Alfonso does UC5). |
| #29 | D-04 | High | No void of an authorization; retry without same ID | Haifa | Accepted | IR-02: retry with the same transaction ID; new IR: void an authorization not linked to a completed sale after a crash (UC1 *a, Alfonso). |
| #30 | D-05 | Medium | No FRs for store manager tasks | Alfonso | Accepted | New FRs: view reorder list, change default tax rate, disable an employee in the local list. |
| #31 | D-06 | Medium | 99.9 % uptime not verifiable | Josué | Accepted | NFR-03: system boundary (register app), measurement period, what counts as downtime; verification by analysis/monitoring. |
| #33 | D-07 | Medium | NFRs without measurement conditions | Josué | Accepted | NFR-01/02/05/09: reference setup, percentile, success criteria. |
| #34 | D-08 | Medium | Test coverage thinner than documented | Josué | Partially | Matrix: failure branches added to the TCs; worked examples for UC2/UC5 acceptance criteria in increment 3 (Avni). |
| #35 | D-09 | Medium | "Tax to be corrected" never resolved | Haifa | Accepted | IR-06: the flag is sent to the Accounting System; the correction is done there (out of POS scope), stated in IR-05. |
| #36 | D-10 | Low | Business rules not in the SRS | Avni | Accepted | §3.10: BR table with status; FRs that depend on Proposed rules are marked. |
| #37 | D-11 | Low | Contradictory tax refund logic | Yasmine | Accepted | UC2/FR-23: refund the tax charged in the original sale; no Tax Calculator call in the return. |
| #38 | D-12 | Low | Accounting timeout and print order | Haifa | Partially | Clarify that sending is queued and never blocks the receipt (print first); no timeout needed because the queue is asynchronous. |
| #39 | D-13 | Low | Card reader failure not handled | Alfonso | Accepted | UC1 ext. 9b1a (and UC3 13b1a, Avni): unreadable card or reader error → retry or another tender. |
| #40 | D-14 | Low | Retry needs card data already discarded | Alfonso | Accepted | UC1 9b2b (and UC3 13b2b, Avni): the retry continues at step 9b.1 (card read again). |
| #41 | D-15 | Low | NFR texts differ across files | Josué | Accepted | SRS is the source; `nfrs.md` and `quality_goals.md` aligned or marked informative. |
| #42 | D-16 | Low | Masking cited as NFR-08 | Josué | Accepted | Cite NFR-11 for masking; split NFR-08 into PIN hash and payment data encryption. |
| #43 | D-17 | Low | IR and FR priorities conflict | Haifa | Accepted | Apply the §3.2.6 priority rule to IR-01, IR-03, IR-09. |
| #44 | D-18 | Low | Compound FRs | Josué | Partially | Add "singular" to the writing rules; split FR-37 and FR-54 now (Avni, Alfonso), the rest in v1.2. |
| #45 | D-19 | Low | Reorder logic modelled three ways | Alfonso | Accepted | FR-14 uses the per-product threshold of DR-01 (default 10); renting does not change stock (items tracked by status). |
| #46 | D-20 | Low | Baseline on unvalidated assumptions | Alfonso | Partially | Same as B-D18 (owners and dates); v1.0 stays the baseline with the assumptions marked. |
| #47 | D-21 | Low | Cashier can keep the whole deposit alone | Alfonso | Accepted | UC5 6a/FR-52: store manager confirms the damage. |
| #48 | D-22 | Low | Questionnaire does not measure the NFRs | Yasmine | Accepted | Elicitation plan Q-06 answer options and questions for NFR-06/13/18. |
| #49 | D-23 | Low | Small editorial inconsistencies | Borja | Accepted | `use_case_model.md` updated to v1.0 (5 use cases, store manager); other small fixes by each owner. |

## Summary

| | Received | High | Medium | Low | Accepted | Partially | Rejected |
|---|---|---|---|---|---|---|---|
| Team B | 21 | 3 | 11 | 7 | 13 | 7 | 1 |
| Team C | 24 | 5 | 5 | 14 | 19 | 5 | 0 |
| **Total** | **45** | 8 | 16 | 21 | 32 | 12 | 1 |

Findings per owner: Alfonso 12 · Avni 7 · Borja 7 · Josué 7 · Haifa 6 · Yasmine 6.
