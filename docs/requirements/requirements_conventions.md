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

| Req ID | Requirement Summary | Use Case | Design (UML/UI) | Test Case |
| :--- | :--- | :--- | :--- | :--- |
| FR-01 | Start a new sale in a session | UC1 (Process Sale) | Class Diagram: CashierSession, Sale | TC-01: Verify sale cannot start without session |
| FR-02 | Record a sale line item | UC1 (Process Sale) | Sequence Diagram: AddItem | TC-02: Scan barcode and check subtotal |
| FR-08 | Obtain tax from Tax Calculator | UC1 (Process Sale) | Interface: TaxCalculator | TC-03: Request tax from external system |
| FR-10 | Complete card payment after authorization | UC1 (Process Sale) | Sequence Diagram: Payment Service | TC-04: Verify payment blocked if not approved |
| FR-13 | Save completed sale | UC1 (Process Sale) | Database Schema: Sales table | TC-05: Check sale saved with correct tender |
| FR-16 | Print receipt (only last 4 digits) | UC1 (Process Sale) | UI: Receipt Layout | TC-06: Verify card digits masked on receipt |
