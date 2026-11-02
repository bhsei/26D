# Non-Functional Requirements (NFRs)

> **Informative.** This file explains the SRS (SRS.md). If it differs from the SRS, the SRS prevails.

These requirements are derived from our Quality Goals (ISO/IEC 25010) and are mapped to sections 3.3, 3.4, 3.7 and 3.8 of the SRS.

## 1. Performance Requirements (SRS 3.4)
*Reference setup: One register computer (4 cores, 8 GB RAM), local catalog with 10,000 products, external systems simulated by stubs answering within 200 ms.*

- **NFR-01 (Performance Efficiency):** On the reference setup, registering a sale line item shall take less than 1 second in at least 95 % of 200 consecutive registrations, and less than 2 seconds in all of them.
- **NFR-02 (Performance Efficiency):** On the reference setup, with up to 50 records waiting in the Accounting System queue and all external systems unavailable, the register shall be ready for use less than 30 seconds after the POS program starts in each of 10 consecutive starts.
- **NFR-19 (Performance Efficiency):** The system shall enforce timeouts for external system calls: 10 seconds for the Payment Service, and 5 seconds for the Tax Calculator and HR System.

## 2. Usability Requirements (SRS 3.3)
- **NFR-05 (Usability):** After 15 minutes of basic training, at least 4 of 5 new cashiers (no previous use of the system) shall complete a standard sale and a standard return without help from the observer, each in less than 3 minutes.
- **NFR-06 (Usability):** A standard sale shall be completed with 3 clicks or fewer after the items are entered.
- **NFR-13 (Usability):** The text of every screen shall be readable at a distance of 1 m, and every button shall be at least 10 mm x 10 mm on the register screen.
- **NFR-14 (Usability):** Every error message shall be shown on the screen where the error happens, in plain words, and shall state what happened and what the cashier can do next, without technical codes.
- **NFR-15 (Usability):** The main menu shall always show whether each of the four external systems is available, and the screens of a transaction shall warn the cashier when the default tax rate is used.
- **NFR-16 (Usability):** Every screen shall have one main task, and the same action shall have the same label and position on all screens.
- **NFR-17 (Usability):** Before a payment or a refund is completed, the screen shall show the amount and each part of its calculation and shall ask the cashier to confirm.
- **NFR-18 (Usability):** When an operation with an external system takes longer than 1 second, the screen shall show that the system is waiting for an answer.

## 3. Software System Attributes (SRS 3.8)
### Reliability & Availability
- **NFR-03 (Reliability):** The register application shall be available for at least 99.9 % of the store hours of each calendar month. Availability = (store hours − downtime) / store hours. Downtime is any time in which the cashier cannot start or complete a sale, return or rental because the register application is not running (crash, freeze, restart). Failures of external systems, the network, planned maintenance outside store hours and hardware failures are not downtime.
- **NFR-04 (Reliability):** A completed sale shall be saved locally even if the internet connection drops, ensuring no data loss.

### Security
- **NFR-07 (Security):** The system shall enforce role-based access control (e.g., only Store Managers can override prices).
- **NFR-08 (Security):** All user PINs shall be stored only as a salted hash and shall never be shown, logged or stored in plain text.
- **NFR-20 (Security):** Payment data shall be encrypted when it is stored or sent, and card data shall not be kept after the Payment Service has answered.

### Maintainability & Compatibility
- **NFR-09 (Maintainability):** A developer who knows the code shall be able to add a new payment method in less than 3 working days (8 h each), counted from the start of the work until the new component passes its tests against a stub. The change shall be limited to the payment interface component; the sale, return and rental logic shall not change.
- **NFR-10 (Compatibility):** The system shall be fully compatible with standard thermal receipt printers and USB barcode scanners without custom drivers.

## 4. Compliance Obligations (SRS 3.7)
- **NFR-11 (Security):** The system shall show or print at most the last 4 digits of a card number on every screen, receipt, log and message sent to the Accounting System.
- **NFR-12 (Legal):** The system shall store only the personal data listed in DR-11 (employees) and DR-18 (customer ID and the data to find rentals). The receipt shall show no personal data of the customer.