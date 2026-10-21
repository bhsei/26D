# Requirements Conventions

This document defines the rules for writing, prioritizing, and tracing requirements for the NewEra POS system.

## 1. Requirement ID Scheme
- **FR-xx:** Functional Requirements (e.g., FR-01: Start a new sale).
- **NFR-xx:** Non-Functional Requirements (e.g., NFR-01: Fast checkout).
- **BR-xx:** Business Rules (e.g., BR-01: Tax calculation).
- **IR-xx:** Interface Requirements (e.g., IR-01: Payment gateway API).

## 2. Priority (MoSCoW Method)
- **Must have:** Critical for the system to work.
- **Should have:** Important but not critical.
- **Could have:** Nice to have.
- **Won't have:** Out of scope for this release.

## 3. Rules for Writing Good Requirements
- **Unambiguous:** Only one interpretation. Avoid vague words.
- **Verifiable:** Can be tested.
- **Consistent:** No contradictions.
- **Complete:** Contains all necessary information.

## 4. Traceability Matrix for UC1 (Process Sale)
This matrix links the official SRS requirements (FR-01 to FR-17) to the design and test phases for UC1.

| Req ID | Requirement Summary (from SRS) | Use Case | Design (UML/UI) | Test Case |
| :--- | :--- | :--- | :--- | :--- |
| FR-01 | Start a new sale in a session | UC1 (Process Sale) | Class Diagram: CashierSession, Sale | TC-01: Verify sale cannot start without session |
| FR-02 | Record a sale line item | UC1 (Process Sale) | Sequence Diagram: AddItem | TC-02: Scan barcode and check subtotal |
| FR-03 | Reject invalid item identifier | UC1 (Process Sale) | UI: Error prompt | TC-03: Scan unknown barcode and verify error |
| FR-04 | Enter quantity for a line item | UC1 (Process Sale) | UI: Quantity input field | TC-04: Scan item and enter quantity > 1 |
| FR-05 | Remove a sale line item | UC1 (Process Sale) | UI: Remove button | TC-05: Add two items, remove one, check total |
| FR-06 | Manager price override | UC1 (Process Sale) | UI: Manager authentication modal | TC-06: Attempt override as cashier (fail) and manager (pass) |
| FR-07 | Cancel sale before payment | UC1 (Process Sale) | UI: Cancel button | TC-07: Cancel sale and verify stock unchanged |
| FR-08 | Obtain tax from Tax Calculator | UC1 (Process Sale) | Interface: TaxCalculator | TC-08: Request tax from external system |
| FR-09 | Reject cash < total, show change | UC1 (Process Sale) | UI: Payment screen, Drawer API | TC-09: Pay lower amount (fail), pay higher (open drawer) |
| FR-10 | Complete card payment after auth | UC1 (Process Sale) | Sequence Diagram: Payment Service | TC-10: Mock card approval, verify auth code saved |
| FR-11 | Handle declined or failed card payment | UC1 (Process Sale) | UI: Error state | TC-11: Mock card decline, verify sale stays open |
| FR-12 | Accept check payments | UC1 (Process Sale) | Interface: Payment Service | TC-12: Mock check authorization |
| FR-13 | Save completed sale | UC1 (Process Sale) | Database Schema: Sales table | TC-13: Complete sale and verify saved in DB |
| FR-14 | Reduce stock and flag for reorder | UC1 (Process Sale) | Inventory Database | TC-14: Sell item, verify stock drops, flag if < 10 |
| FR-15 | Send to Accounting System | UC1 (Process Sale) | Interface: Accounting API | TC-15: Complete sale, verify JSON payload sent |
| FR-16 | Print receipt (masked card) | UC1 (Process Sale) | UI: Receipt Layout | TC-16: Print receipt, verify only last 4 digits shown |
| FR-17 | Reprint last receipt | UC1 (Process Sale) | UI: Reprint button | TC-17: Click reprint and verify printer triggers |
