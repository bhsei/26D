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

| Req ID | Requirement Summary | Use Case | Design (UML/UI) | Test Case |
| :--- | :--- | :--- | :--- | :--- |
| FR-01 | Start a new sale inside a cashier session | UC1 (Process Sale) | Class Diagram: Sale | TC-01: Verify sale initialization |
| FR-02 | Add a product to the sale | UC1 (Process Sale) | Sequence Diagram: AddItem | TC-02: Scan barcode and add item |
| NFR-01 | Fast checkout (< 1s per line) | UC1 (Process Sale) | UI: Optimized layout | TC-03: Time processing < 1s |
| BR-01 | Calculate tax based on location | UC1 (Process Sale) | Component: TaxCalculator | TC-04: Request tax from Tax Calculator |
| IR-01 | Request payment authorization | UC1 (Process Sale) | Sequence Diagram: Payment Service | TC-05: Card payment approved |
