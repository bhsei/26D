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