# Design Review Form: Team D review of Team F

|                    |                                                                                                   |
| ------------------ | ------------------------------------------------------------------------------------------------- |
| **Reviewer**       | Team D                                                                                            |
| **Reviewed**       | Team F                                                                                            |
| **Document**       | Architecture and design description (bhsei/26F, docs/design/design.md)                            |
| **Version**        | v1.0 (2026-11-24, commit `c6d7e5d`)                                                               |
| **Date**           | 2026-11-28                                                                                        |
| **Reviewers**      | Yasmine (ch. 1–3, §4.1, §4.4, §4.5, ch. 6–7) · Haifa (§4.2, §4.3, §4.6–4.8, ch. 5, ch. 8–9, appendix A). Consolidator: Haifa |
| **Severity scale** | Minor / General / Severe                                                                          |

Criteria: every use case and system operation has a design; the views agree with each other (same names in the diagrams, the catalogs and the interfaces); decisions have a reason and the design follows them; error cases are designed; traceability to the SRS; diagrams can be read. Each finding below is posted as **one comment** in the Issue `Team D review of Team F - Design Specification v1.0 - Issue List` in bhsei/26F.

## Findings: Yasmine (ch. 1–3, §4.1, §4.4, §4.5, ch. 6–7)

| #   | Location | Type | Severity | Finding | Recommendation | Reviewer |
| --- | -------- | ---- | -------- | ------- | -------------- | -------- |
|     |          |      |          |         |                | Yasmine  |

## Findings: Haifa (§4.2, §4.3, §4.6–4.8, ch. 5, ch. 8–9, appendix A)

| #   | Location | Type | Severity | Finding | Recommendation | Reviewer |
| --- | -------- | ---- | -------- | ------- | -------------- | -------- |
| H1  | Header (related documents), §1.3, ch. 8 | Traceability | Severe | The header links to `SRS.md` and calls it v1.0, but that file is v0.3. The design also uses IDs that are not in `SRS.md` at all: FR-MTG-01 to 07, FR-DAT-01 and 02, FR-EXT-06 and 07. We found them only in `SRS4.0.md`, which is v0.4. So a reader who follows the link can't trace a big part of the design. | Link the SRS version the design was really checked against, with its real number. If `SRS4.0.md` is the current one, make it `SRS.md` or remove the old file, so there is only one SRS. | Haifa |
| H2  | Ch. 8 | Traceability | General | The table works by requirement group, so some requirements disappear. NFR-USE-01 to 03, NFR-MNT-01, NFR-POR-01 and FR-EXT-01, 04, 05 are not in the table and not anywhere else in the design. "FR-PAY-01 to 15" also includes FR-PAY-09 and FR-PAY-10, which the SRS withdrew. Requirements that are only partly done, like FR-MTG-04, SEC-08 and SEC-09, get an example test, so the table looks complete when it is not. | Give each requirement its own row, with the design element and a test, or "no test" when there is none. Remove the withdrawn IDs. Then the check in §4.8 (last rule) can really be done. | Haifa |
| H3  | §4.3 (value sets), §4.8 | Inconsistency | General | `payment_status` is listed with only Unpaid and Paid. But when the owner rejects a paid request, the code sets it to `Refunded` (`reject_request` in `campusshare_routes.py`), as FR-PAY-14 asks. §4.8 says the value sets were checked and are the same everywhere, so this check missed it. | Add `Refunded` to `payment_status` in §4.3, and check the other value sets against the code again. | Haifa |
| H4  | §4.3, ER diagram | Missing | General | The diagram doesn't show the whole schema. `login_attempts` and `verification_email_attempts` are not in it, although §4.8 counts ten tables. Some foreign keys in `init_db` are missing too: the receiver of a message, the rated user of a rating, and `uploaded_by` of a condition photo. Only one link to `users` is drawn for each. There are no keys or attributes, so the diagram can't be checked against the table list. | Draw all ten tables with their primary and foreign keys, and one line per foreign key, named after the column (for example `sender`, `receiver`). | Haifa |
| H5  | §4.2, §2.1 | Missing | General | §2.1 says the logical view shows "who depends on whom", but the diagram only has arrows from the whole application to the stores. You can't see that the rental workflow and administration use notifications, or that payment depends on the rental workflow (§4.6.1 says it, but only in a table). "Scheduled scripts" is a component in §4.6.1 and §4.7, but it is not in the component table of §4.2. | Draw the components as separate boxes with arrows between them, as in the "Uses" column of §4.6.1. Add the scheduled scripts to the §4.2 table. | Haifa |
| H6  | §5.3, §5.4, appendix A (`/damage-dispute/<id>/resolve`) | Inconsistency | General | The owner who reports the damage can also decide the borrower's dispute of that same charge, and the code allows it. So one party decides its own case. FR-ADM-03 and SRS question 9 say the administrator decides when the two parties don't agree, and the question is still open. §5.4 calls this design fair, and the STRIDE table has no row for this risk. | Decide question 9 first. If the owner can still decide, add the risk to §5.3 with a control (for example, the borrower can always ask the administrator). Otherwise let only the administrator resolve a dispute. | Haifa |
| H7  | §5.1, §5.2, D-13 | Missing | General | `backups/` holds a full copy of the database, with password hashes, emails and student IDs, but it is not an asset in §5.1 or a store in the trust boundary diagram. The pickup photos are listed as dispute evidence, but D-13 and limitation 7 say they are not backed up. So the most important evidence can be lost. | Add the backups as an asset, with where they are kept and who can read them. Add the photo folder to the backup, or list the lost evidence as a risk in §5.3. | Haifa |
| H8  | §4.3 (`rental_condition_photos`), §5.4 | Inconsistency | Minor | The data view says a photo stage is `pickup` or `return`, but no route saves a `return` photo. The code always writes `'pickup'`. So at the return there is no photo to compare with the pickup photo, although §5.4 makes the pickup photo the reference for damage. | Add a step and a route for the return photo, or remove `return` from the value set and say that only the pickup photo is kept. | Haifa |

## Summary (filled in by the consolidator)

| Severity  | Count |
| --------- | ----- |
| Minor     |       |
| General   |       |
| Severe    |       |
| **Total** |       |
