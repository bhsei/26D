# Requirements Review Form – Team D review of Team E

| | |
|---|---|
| **Reviewer** | Team D |
| **Reviewed** | Team E |
| **Document** | Software Requirements Specification (bhsei/26E, docs/Requirements Specification Document.pdf) |
| **Version** | 1.4 |
| **Date** | 2026-11-02 |
| **Reviewers** | Borja (ch. 1–3) · Avni (§4.1–4.2, §4.6–4.10) · Josué (§4.3–4.5, §4.11–4.12, ch. 6, ch. 10) · Alfonso (ch. 5, ch. 7–12) – consolidator: Josué |
| **Severity scale** | Minor / General / Moderate |

Criteria (ISO/IEC/IEEE 29148): unambiguous, verifiable, singular, consistent, complete, traceable; ID, priority and source for each requirement. Each finding below is posted as **one comment** in the Issue `Team D review of Team E - Software Requirements Specification v1.4 - Issue List` in bhsei/26E.

## Findings

| # | Location | Type | Severity | Finding | Recommendation | Reviewer |
|---|---|---|---|---|---|---|
| 1 | §4.3, REQ-PERF-001 | Not verifiable | General | The requirement states that response time shall be measured "against an approved threshold", but the actual threshold value is not specified (marked as TBD). A requirement without a specific number cannot be objectively verified. | Replace "approved threshold" with a specific measurable value (e.g., "in less than 2 seconds") or explicitly state in the requirement that the threshold is a fixed parameter. | Josué |
| 2 | §4.3, REQ-REL-001 | Not verifiable | General | The requirement says the system shall update visible state "within an approved timing threshold", but the specific time is missing. | Define the maximum allowed time to update the state (e.g., "within 1 second of the platform reporting the loss"). | Josué |
| 3 | §4.12, Table | Completeness | Moderate | Many "Must" and "Should" requirements (e.g., REQ-PERF-001, REQ-PERF-002, REQ-REL-001) list their priority and applicability as "Baseline / TBD". A baseline should not contain requirements with missing thresholds. | Resolve all TBD thresholds before declaring the requirements baseline as final, or move the specific values to the verification plan so they are testable. | Josué |
| 4 | Chapter 6 | Format | Moderate | Chapter 6 uses narrative paragraphs to describe quality objectives (e.g., "Performance objectives shall be established...") instead of using specific, uniquely identified requirements (like the REQ-PERF-XXX format). This makes it impossible to trace these objectives to specific test cases. | Convert the narrative objectives in Chapter 6 into formal requirements with IDs (e.g., REQ-PERF-004) so they can be traced and verified. | Josué |
| 5 | Chapter 10 & §4.12 | Traceability | Moderate | Chapter 10 lists 64 Test Cases, but the status register in §4.12 only says "Release evidence register". There is no explicit mapping showing which test case verifies which requirement. | Include a Traceability Matrix section (or table) that explicitly links every Requirement ID to its specific Test Case ID. | Josué |
| 6 | §4.5, REQ-ML-001 | Ambiguity | Minor | The requirement states the project shall document the ML acceptance threshold before performance claims, but it does not specify what constitutes a passing threshold for the ML model itself. | Add a sentence specifying that the acceptance threshold for the ML model must be defined and approved by the product owner prior to running the evaluation tests. | Josué |

<!-- Add your findings as new rows. Type: Ambiguity · Not verifiable · Inconsistency · Missing · Traceability · Format -->

## Summary (filled in by the consolidator)

| Severity | Count |
|---|---|
| Minor | 1 |
| General | 2 |
| Moderate | 3 |
| **Total** | 6 |

## Findings – Alfonso (ch. 5, ch. 7–12)

| # | Location | Type | Severity | Finding | Recommendation | Reviewer |
|---|---|---|---|---|---|---|
| A1 | §3.3 and ch. 5, UC-11 to UC-24 | Inconsistency | General | §3.3 says every use case has a diagram, but only UC-01 to UC-10 have a flow diagram. UC-11 to UC-24 also use a different template ("Main success flow", "Alternate and failure flows") from UC-01 to UC-10. | Use one template for all 24 use cases, or change §3.3 so it says which use cases have a diagram. | Alfonso |
| A2 | §3.3 and ch. 5, UC-10 | Inconsistency | Minor | UC-10 has two names and two actors: "Install, update and validate a product build" by "Release engineer / tester" in §3.3, and "Build, install and validate a product release" by "Developer / tester" in ch. 5. | Use the same title and primary actor in both places (and in the table of contents). | Alfonso |
| A3 | Ch. 5, UC-11 to UC-24, preconditions | Not verifiable | General | The 14 use cases have the same precondition: "The application is available; configuration and permissions required for the selected path are satisfied." It does not say which configuration or permission, so it cannot be checked. | Write a specific precondition for each use case (for example UC-12: identity provider configured; UC-21: administrator signed in with the admin role). | Alfonso |
| A4 | Ch. 5, all use cases | Ambiguity | General | The steps of the main flow are not numbered, and the alternative flows do not say at which step they start or where the flow continues (e.g. UC-01 A1 "Permission denied"). | Number the steps and link each alternative flow to a step, e.g. "4a. Permission denied … the use case continues at step 2". | Alfonso |
| A5 | Ch. 5, UC-03 step 4, UC-07 step 5, UC-09, UC-18 | Not verifiable | General | Some steps depend on wording such as "if those controls are implemented", "when required by the UI design", "where feasible" or "where supported". A tester cannot know what the expected behaviour is. | Decide the behaviour, or move the optional part to its own requirement with a priority (e.g. Could). | Alfonso |
| A6 | Ch. 7–8 (architecture, API routes, Firebase vs PostgreSQL, ERD) | Scope | General | These chapters contain design decisions (components, API routes, database choice), and some are still open ("a Firebase-only MVP may be selected", "the v1.2 design recommends PostgreSQL"). Design content and open design choices make the requirements baseline harder to verify. | Move the architecture and data design to a design document, and keep in the SRS only the constraints and interface requirements that are really decided. | Alfonso |
| A7 | Ch. 11–12 (delivery lifecycle, infrastructure and cost baseline) | Scope | Minor | Historical spend, server cost scenarios and the delivery lifecycle are project management and business information, not software requirements. | Move them to the project plan or a business case and reference them from the SRS. | Alfonso |
