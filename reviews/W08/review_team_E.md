# Requirements Review Form - Team D review of Team E

| | |
|---|---|
| **Reviewer** | Team D |
| **Reviewed** | Team E |
| **Document** | Software Requirements Specification (bhsei/26E, docs/Requirements Specification Document.pdf) |
| **Version** | 1.4 |
| **Date** | 2026-11-02 |
| **Reviewers** | Borja (ch. 1-3) · Avni (§4.1-4.2, §4.6-4.10) · Josué (§4.3-4.5, §4.11-4.12, ch. 6, ch. 10) · Alfonso (ch. 5, ch. 7-12) - consolidator: Josué |
| **Severity scale** | Minor / General / Moderate |

Criteria (ISO/IEC/IEEE 29148): unambiguous, verifiable, singular, consistent, complete, traceable; ID, priority and source for each requirement. Each finding below is posted as **one comment** in the Issue `Team D review of Team E - Software Requirements Specification v1.4 - Issue List` in bhsei/26E.

## Findings

| # | Location | Type | Severity | Finding | Recommendation | Reviewer |
|---|---|---|---|---|---|---|
| 1 | §4.3, REQ-PERF-001 | Not verifiable | General | The requirement states that response time shall be measured "against an approved threshold", but the actual threshold value is not specified (marked as TBD). | Replace "approved threshold" with a specific measurable value (e.g., "in less than 2 seconds"). | Josué |
| 2 | §4.3, REQ-REL-001 | Not verifiable | General | The requirement says the system shall update visible state "within an approved timing threshold", but the specific time is missing. | Define the maximum allowed time to update the state (e.g., "within 1 second"). | Josué |
| 3 | §4.12, Table | Completeness | Moderate | Many requirements (e.g., REQ-PERF-001, REQ-REL-001) list their priority as "Baseline / TBD". A baseline should not contain requirements with missing thresholds. | Resolve all TBD thresholds before declaring the requirements baseline as final. | Josué |
| 4 | Chapter 6 | Format | Moderate | Chapter 6 uses narrative paragraphs to describe quality objectives instead of specific, uniquely identified requirements (REQ-XXX). | Convert the narrative objectives into formal requirements with IDs so they can be traced and verified. | Josué |
| 5 | Ch. 10 & §4.12 / §3.5 | Traceability | Moderate | The document lacks an explicit traceability matrix. §4.12 just points to a "Release evidence register", and §3.5 delegates to a file (`Requirement_Traceability_Matrix.md`) not present in the document. | Include a Traceability Matrix section mapping Requirement IDs to Test Case IDs, or include the referenced file in the repository. | Josué & Borja |
| 6 | §4.5, REQ-ML-001 | Ambiguity | Minor | The requirement states the project shall document the ML acceptance threshold, but does not specify what constitutes a passing threshold. | Add a sentence specifying that the threshold must be defined and approved by the product owner. | Josué |
| 7 | §3.3 and ch. 5, UC-11 to UC-24 | Inconsistency | General | §3.3 says every use case has a diagram, but only UC-01 to UC-10 have a flow diagram. UC-11 to UC-24 also use a different template. | Use one template for all 24 use cases, or change §3.3 to reflect the actual format. | Alfonso |
| 8 | §3.3 and ch. 5, UC-10 | Inconsistency | Minor | UC-10 has two names and two actors: "Install, update and validate a product build" in §3.3 vs "Build, install and validate a product release" in ch. 5. | Use the same title and primary actor in both places. | Alfonso |
| 9 | Ch. 5, UC-11 to UC-24 | Not verifiable | General | The 14 use cases have the exact same generic precondition which cannot be checked. | Write a specific precondition for each use case (e.g., identity provider configured; administrator signed in). | Alfonso |
| 10 | Ch. 5, all use cases | Ambiguity | General | The steps of the main flow are not numbered, and alternative flows do not indicate at which step they start or continue. | Number the steps and link each alternative flow to a step (e.g., "4a. Permission denied..."). | Alfonso |
| 11 | Ch. 5, UC-03 step 4, UC-07 step 5, UC-09, UC-18 | Not verifiable | General | Some steps depend on vague wording like "if those controls are implemented", "where feasible". | Decide the behavior, or move the optional part to its own requirement with a priority. | Alfonso |
| 12 | Ch. 7-8 (architecture, ERD) | Scope | General | These chapters contain design decisions (components, API routes, database choice) which belong in a design document, not the SRS. | Move the architecture and data design to a separate design document. | Alfonso |
| 13 | Ch. 11-12 (infrastructure) | Scope | Minor | Historical spend, server cost scenarios, and delivery lifecycle are project management info, not software requirements. | Move them to the project plan or a business case. | Alfonso |
| 14 | §4.2, §4.6, §4.7, §4.10 | Not verifiable | General | Several requirements use unmeasurable words: "understandable error", "safe, actionable feedback", "when practical", "no blocker". | Define exactly what an error message must contain and give a clear pass/fail rule. | Avni |
| 15 | §4.2, REQ-FUNC-002 · §4.1, REQ-INT-002 | Ambiguity | General | Requirements say "where supported by the platform", but no section defines which platform supports which function (only "intended targets" are listed). | Add a table of function by platform (supported, not supported) and write acceptance criteria for each. | Avni |
| 16 | §4.2, REQ-FUNC-008 | Not verifiable | General | Lite Mode reduces activities "listed in the implementation specification", but this spec is not in the SRS. | List the background activities that Lite Mode reduces in the SRS and write a test for each one. | Avni |
| 17 | §4.9, REQ-NETOPT-001 | Not verifiable | General | The requirement compares measurements "under comparable conditions" but does not define comparable conditions, min samples, or what is a pass. | Define comparable conditions, state which result counts as success, and define "Network Boost". | Avni |
| 18 | §4.6, §4.7, §4.8, §4.10 | Not verifiable | Moderate | Several requirements bundle multiple separate behaviors into one ID, making it impossible to test them individually (e.g., REQ-AUTH-002 covers sign-out, expiry, reauth, recovery). | Split them into one requirement per behavior, each with its own ID and acceptance criterion. | Avni |
| 19 | §4.10, REQ-I18N-001 | Missing | General | The requirement refers to a "release locale matrix" which is not in the SRS. | Add the locale matrix (locale, status, fallback) to §4.10 or an appendix. | Avni |
| 20 | §1.2 and §2.1-2.2 | Inconsistency | Moderate | The scope is not clear. §1.2 says the production service footprint is a target capability, but §2.2 says it is "not assumed deployed". | Add a table with each capability and its status for the first release (in scope, conditional, out of scope). | Borja |
| 21 | §3.2 vs §4 and §4.12 | Inconsistency | General | §3.2 claims every requirement has a rationale, source/need, and dependencies. The tables in §4 do not show these fields. | Add rationale and dependencies to the tables, or reduce the list in §3.2 to match reality. | Borja |
| 22 | Document Control, §4 intro, §4.12 | Inconsistency | General | The text says the baseline has 62 requirements, but counting the IDs in §4.1-4.11 yields 63. | Recount the IDs and correct the number in all three places. | Borja |
| 23 | §2.2 vs §3.3 and §3.4 | Inconsistency | General | The actor list in §2.2 does not match the primary actors used in §3.3 and §3.4 (e.g., "New user", "Account holder" are missing from §2.2). | Use one single actor list in §2.2 and stick to it throughout. | Borja |
| 24 | §3.1 vs §3.4 | Inconsistency | General | The context figure in §3.1 is missing key actors described in §3.4 (Identity provider, Notification service, Admin). | Add the missing actors to the figure and use the exact same names. | Borja |
| 25 | §3.3 Table vs Figure | Inconsistency | Minor | The titles of the use cases differ between the table and the overview figure (e.g., UC-04 "Generate and review..." vs "Review a context-aware..."). | Use the exact title from the table in the figure and in chapter 5. | Borja |
| 26 | §1.4 and Appendix C | Ambiguity | General | Lifecycle states ("Implemented", "Verified") are defined twice with different wording. | Keep one definition of each state in §1.4 and remove the duplicates. | Borja |

## Summary (filled in by the consolidator)

| Severity | Count |
|---|---|
| Minor | 4 |
| General | 17 |
| Moderate | 5 |
| **Total** | 26 |