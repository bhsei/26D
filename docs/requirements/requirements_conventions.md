# Requirements Conventions

This document defines the rules and conventions the team will follow for writing, prioritizing, and tracing requirements for the NewEra POS system.

## 1. Requirement ID Scheme
- **FR-xx:** Functional Requirements (e.g., FR-01: Start a new sale inside a cashier session).
- **NFR-xx:** Non-Functional Requirements (e.g., NFR-01: Fast checkout).
- **BR-xx:** Business Rules (e.g., BR-01: Tax calculation).
- **IR-xx:** Interface Requirements (e.g., IR-01: Payment gateway API).

## 2. Priority (MoSCoW Method)
- **Must have:** Critical (e.g., processing a sale).
- **Should have:** Important but not critical (e.g., generating reports).
- **Could have:** Nice to have (e.g., UI themes).
- **Won't have:** Out of scope for this release.

## 3. Rules for Writing Good Requirements
- **Unambiguous:** Only one interpretation. Avoid "fast", "user-friendly".
- **Verifiable:** Can be tested.
- **Consistent:** No contradictions.
- **Complete:** Contains all necessary info.

## 4. Traceability Matrix for UC1 (Process Sale)
*(Updated to match Alfonso's SRS FR-01 to FR-17)*.

| Req ID | Requirement Summary | Use Case | Design (UML/UI) | Test Case |
| :--- | :--- | :--- | :--- | :--- |
| FR-01 | Start a new sale inside a cashier session | UC1 (Process Sale) | Class Diagram: Sale, CashierSession | TC-01: Open session and start sale |
| NFR-01 | Fast checkout (< 1s per line) | UC1 (Process Sale) | UI: Optimized layout | TC-02: Time processing < 1s |
| BR-01 | Calculate tax based on location | UC1 (Process Sale) | Interface: TaxCalculator | TC-03: Request tax from external system |
| IR-01 | Request payment authorization | UC1 (Process Sale) | Sequence Diagram: Payment Service | TC-04: Card payment approved |
