# Requirements Review Form – Team D review of Team F

| | |
|---|---|
| **Reviewer** | Team D |
| **Reviewed** | Team F |
| **Document** | Software Requirements Specification (bhsei/26F, docs/requirements/SRS.md) |
| **Version** | 0.3 |
| **Date** | 2026-11-02 |
| **Reviewers** | Yasmine (ch. 1–2, §3.1, ch. 4) · Haifa (§3.2–3.5, ch. 5–6, appendix A) – consolidator: Haifa |
| **Severity scale** | Minor / General / Severe |

Criteria (ISO/IEC/IEEE 29148): unambiguous, verifiable, singular, consistent, complete, traceable; ID, priority and source for each requirement. Each finding below is posted as **one comment** in the Issue `Team D review of Team F - Software Requirements Specification v0.3 - Issue List` in bhsei/26F.

## Findings

| # | Location | Type | Severity | Finding | Recommendation | Reviewer |
|---|---|---|---|---|---|---|
| 1 | | | | | | Yasmine |

<!-- Add your findings as new rows. Type: Ambiguity · Not verifiable · Inconsistency · Missing · Traceability · Format -->

## Summary (filled in by the consolidator)

| Severity | Count |
|---|---|
| Minor | |
| General | |
| Severe | |
| **Total** | |

## Findings – Haifa (§3.2–3.5, ch. 5–6, appendix A)

| # | Location | Type | Severity | Finding | Recommendation | Reviewer |
|---|---|---|---|---|---|---|
| H1 | §3.2.9, FR-ADM-01 to FR-ADM-04 | Inconsistency | Severe | All admin requirements are marked "Not Done", but the note just below the table says the code and tests show administration is implemented. We don't know which one is right. | Check the admin features and update the status (and the README) so they say the same thing. | Haifa |
| H2 | Appendix A, G-31 | Missing | Severe | G-31 describes a new rental process (meetup, inspection, photos, payment before approval, countdown), but these steps have no IDs and are not in section 3. Item 5 also says the owner approves after payment, while FR-REQ-07 says the owner approves while the request is Pending. | Write the steps you keep as requirements in §3.2 and update FR-REQ-07 so both parts describe the same process. | Haifa |
| H3 | §1.5 and §3.2 status column | Format | Minor | Some requirements use "Testing" or "Not Done" as status (e.g. FR-REQ-08, FR-MSG-04), but these values are not in the status list in §1.5. | Use only the statuses from §1.5, or add the new ones to the list. | Haifa |
| H4 | §3.2.4, FR-REQ-05 | Ambiguity | General | For hourly rentals the price is calculated "with minimum", but the minimum is not given, so we can't check if the total is correct. | Write the minimum rental time (e.g. 1 hour) in the requirement. | Haifa |
| H5 | §3.3, SEC-12 | Ambiguity | General | "Served over HTTPS in deployment or host on free domain" sounds like HTTPS is optional if the app is on a free domain. | Remove "or host on free domain" and keep HTTPS as the requirement. | Haifa |
| H6 | Ch. 5 | Traceability | General | The 76 automated tests are only described by topic, so it is not clear which requirement each test checks. Some Must requirements, like FR-PAY-06 and SEC-04, are not in the test cases of §5.3 either. | Add a table that links each requirement ID to its test. | Haifa |
