# Requirements Conventions

This document defines the rules and conventions the team will follow for writing, prioritizing, and tracing requirements for the NewEra POS system.

## 1. Requirement ID Scheme
- **FR-xx:** Functional Requirements (for example, FR-01: Process a sale).
- **NFR-xx:** Non-Functional Requirements (for example, NFR-01: Fast checkout).
- **BR-xx:** Business Rules (for example, BR-01: Tax calculation).
- **IR-xx:** Interface Requirements (for example, IR-01: Payment gateway API).

## 2. Priority (MoSCoW Method)
- **Must have:** Critical (for example, processing a sale).
- **Should have:** Important but not critical (for example, generating reports).
- **Could have:** Nice to have (for example, UI themes).
- **Won't have:** Out of scope for this release.

## 3. Rules for Writing Good Requirements
- **Unambiguous:** Only one interpretation. Avoid "fast", "user-friendly".
- **Verifiable:** Can be tested.
- **Consistent:** No contradictions.
- **Complete:** Contains all necessary info.

## 4. Traceability Matrix for UC1 (Process Sale)
This matrix links the requirements directly to the design and tests for UC1.

| Req ID | Requirement Summary | Use Case | Design (UML/UI) | Test Case |
| :--- | :--- | :--- | :--- | :--- |
| FR-01 | Process a standard sale | UC1 (Process Sale) | Class Diagram: Sale, SaleLineItem | TC-01: Register item and pay |
| NFR-01 | Fast checkout (< 1s per line) | UC1 (Process Sale) | UI: Optimized layout | TC-02: Time processing < 1s |
| BR-01 | Calculate tax based on location | UC1 (Process Sale) | Component: TaxCalculator | TC-03: Calculate 21% VAT |
| IR-01 | Request payment authorization | UC1 (Process Sale) | Sequence Diagram: Payment Service | TC-04: Card payment approved |
| IR-02 | Handle Payment Service failure | UC1 (Process Sale) | Fallback UI prompt | TC-05: Cash fallback on timeout |
