# Requirements Conventions
This document defines the rules for writing, prioritizing, and tracing requirements for the NewEra POS system.

1. Requirement ID Scheme
- **FR-xx:** Functional Requirements (e.g., FR-01: Start a new sale).
- **NFR-xx:** Non-Functional Requirements (e.g., NFR-01: The system shall register a sale line in less than 1 second).
- **BR-xx:** Business Rules (e.g., BR-01: The tax of every transaction is calculated by the Tax Calculator according to the current tax law).
- **IR-xx:** Interface Requirements (e.g., IR-01: The system shall request authorization of a credit card payment from the Payment Service).
+ **DR-xx:** Data Requirements (e.g., DR-08: The system shall store Return transaction data, including returned lines, refund total, tender, and link to the original sale).
- **DC-xx:** Design Constraints (e.g., DC-01: Real external systems shall be replaced by stubs).

2. Priority (MoSCoW Method)
Must have: Critical for the system to work.
Should have: Important but not critical.
Could have: Nice to have.
Won't have: Out of scope for this release.

3. Rules for Writing Good Requirements
Unambiguous: Only one interpretation. Avoid vague words.
Verifiable: Can be tested.
Consistent: No contradictions.
Complete: Contains all necessary information.

4. Traceability Matrix for Use Cases (UC1 to UC5)
This matrix links the official SRS requirements (FR-01 to FR-59) to the design and test phases for UC1 to UC5.
| Req ID | Requirement Summary (from SRS) | Use Case | Design (UML/UI) | Test Case |
| --- | --- | --- | --- | --- |
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
| FR-18 | No empty sale / invalid quantity | UC1 (Process Sale) | UI: Checkout flow | TC-18: Attempt to end empty sale, attempt invalid qty |
| FR-19 | Stock below zero handling | UC1 (Process Sale) | Inventory Database | TC-19: Sell item when stock is 0, verify flag |
| FR-20 | Start return in session | UC2 (Handle Returns) | Class Diagram: Return | TC-20: Verify return start |
| FR-21 | Find original sale by receipt | UC2 (Handle Returns) | Sequence Diagram: FindSale | TC-21: Scan valid/invalid receipt |
| FR-22 | Select items and quantities | UC2 (Handle Returns) | UI: Return selection screen | TC-22: Select items, check quantities |
| FR-23 | Calculate refund | UC2 (Handle Returns) | Interface: TaxCalculator | TC-23: Request tax, verify refund amount |
| FR-24 | Cancel return | UC2 (Handle Returns) | UI: Cancel button | TC-24: Cancel return, check stock |
| FR-25 | Pay cash refund | UC2 (Handle Returns) | UI: Payment screen, Drawer API | TC-25: Verify cash drawer opens |
| FR-26 | Pay card refund | UC2 (Handle Returns) | Interface: Payment Service | TC-26: Mock card refund, fallback to cash |
| FR-27 | Save return and update stock | UC2 (Handle Returns) | DB Schema: Returns table | TC-27: Complete return, verify DB/stock |
| FR-28 | Send to Accounting System | UC2 (Handle Returns) | Interface: Accounting API | TC-28: Verify JSON payload sent |
| FR-29 | Print return receipt | UC2 (Handle Returns) | UI: Receipt Layout | TC-29: Print receipt, verify details |
| FR-30 | Start new rental in session | UC3 (Process Rental) | Class Diagram: Rental | TC-30: Verify rental start |
| FR-31 | Check overdue rentals | UC3 (Process Rental) | Sequence Diagram | TC-31: Customer with overdue rental |
| FR-32 | Identify rentable item | UC3 (Process Rental) | Item List DB | TC-32: Scan valid/invalid serial |
| FR-33 | Only rent Available items | UC3 (Process Rental) | State Machine: Item | TC-33: Attempt to rent rented item |
| FR-34 | Calculate rental fee/due date | UC3 (Process Rental) | Component: FeeCalc | TC-34: Select period, verify fee |
| FR-35 | Obtain tax for rental | UC3 (Process Rental) | Interface: TaxCalc | TC-35: Request tax for rental fee |
| FR-36 | Cancel rental before payment | UC3 (Process Rental) | UI: Cancel button | TC-36: Cancel rental, check status |
| FR-37 | Accept payment for rental | UC3 (Process Rental) | Interface: Payment | TC-37: Pay cash/card/check |
| FR-38 | Save rental and update status | UC3 (Process Rental) | DB Schema: Rentals | TC-38: Check DB and item status |
| FR-39 | Print rental receipt | UC3 (Process Rental) | UI: Receipt Layout | TC-39: Verify rental receipt details |
| FR-40 | Open cashier session | UC4 (Start Up) | Class Diagram: Session | TC-40: Login and open session |
| FR-41 | Check catalog at start-up | UC4 (Start Up) | Startup script | TC-41: Simulate missing DB |
| FR-42 | Send queued records at start | UC4 (Start Up) | Interface: Accounting | TC-42: Check queue processing |
| FR-43 | Login with valid employee | UC4 (Start Up) | Interface: HR System | TC-43: Login active/inactive user |
| FR-44 | Require PIN for login | UC4 (Start Up) | UI: Login screen | TC-44: Verify PIN masking |
| FR-45 | Fallback for HR System | UC4 (Start Up) | Local Cache DB | TC-45: Simulate HR down, test local |
| FR-46 | Save local employee copy | UC4 (Start Up) | DB Schema: Employees | TC-46: Connect to HR, check sync |
| FR-47 | Record opening cash | UC4 (Start Up) | UI: Cash input | TC-47: Enter invalid/valid amounts |
| FR-48 | Recover data after crash | UC4 (Start Up) | Recovery Module | TC-48: Force crash, restart |
| FR-49 | Show main screen | UC4 (Start Up) | UI: Main Screen | TC-49: Verify user and register ID |
| FR-50 | Start rental return in session | UC5 (Return Rental) | Class Diagram: RentalReturn | TC-50: Verify return starts in session |
| FR-51 | Find open rental | UC5 (Return Rental) | Sequence Diagram: FindRental | TC-51: Scan valid/invalid serial/receipt |
| FR-52 | Record item condition | UC5 (Return Rental) | UI: Condition input | TC-52: Select undamaged/damaged with note |
| FR-53 | Calculate late fee | UC5 (Return Rental) | Interface: Tax Calculator | TC-53: Return late, verify fee calc |
| FR-54 | Calculate refund | UC5 (Return Rental) | Component: RefundCalc | TC-54: Verify refund = deposit - fees |
| FR-55 | Pay refund | UC5 (Return Rental) | Interface: Payment Service | TC-55: Pay cash/card refund |
| FR-56 | Cancel rental return | UC5 (Return Rental) | UI: Cancel button | TC-56: Cancel return, check item status |
| FR-57 | Save return and close rental | UC5 (Return Rental) | DB Schema: RentalReturns | TC-57: Check DB, item status, rental closed |
| FR-58 | Send return to Accounting | UC5 (Return Rental) | Interface: Accounting | TC-58: Verify JSON payload sent |
| FR-59 | Print rental return receipt | UC5 (Return Rental) | UI: Receipt Layout | TC-59: Verify receipt details |
| BR-01 | Calculated by Tax Calculator (see glossary) | UC1 (Process Sale) | Interface: TaxCalculator | TC-08: Verify tax matches external system |
| NFR-06 | Usability: <= 3 clicks for standard sale | UC1 (Process Sale) | UI: Checkout flow | TC-NFR-06: Measure clicks from item entry to sale completion (<= 3) |
| NFR-07 | Security: Role-based access control | UC1 (Process Sale) | UI: Manager authentication modal | TC-06: Attempt override as cashier (fail) and manager (pass) |

5. Verification Methods
| Req ID Range | Requirement Type | Verification Method |
| --- | --- | --- |
| FR-01 to FR-59 | Functional Requirements | Test |
| NFR-01 to NFR-12 | Non-Functional Requirements | Test / Demonstration |
| NFR-13 to NFR-18 | Non-Functional Requirements | Demonstration |
| BR-01 to BR-14 | Business Rules | Inspection / Test |
| IR-01 to IR-10 | Interface Requirements | Test / Demonstration |
| IR-11 to IR-14 | Interface Requirements | Demonstration |
| DR-01 to DR-18 | Data Requirements | Inspection |
| DC-01 to DC-08 | Design Constraints | Inspection |