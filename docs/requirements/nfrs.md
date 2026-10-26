# Non-Functional Requirements (NFRs)

These requirements are derived from our Quality Goals (ISO/IEC 25010) and are mapped to sections 3.4 and 3.8 of the SRS.

## 1. Performance Requirements (SRS 3.4)
- **NFR-01 (Performance Efficiency):** A sale line item must be registered in less than 1 second.
- **NFR-02 (Performance Efficiency):** The system must start up and be ready for use in less than 30 seconds.

## 2. Software System Attributes (SRS 3.8)
### Reliability & Availability
- **NFR-03 (Reliability):** The system must have an uptime of 99.9% during store hours.
- **NFR-04 (Reliability):** A completed sale must be saved locally even if the internet connection drops, ensuring no data loss.

### Usability
- **NFR-05 (Usability):** A new cashier must be able to process a standard sale and a return after 15 minutes of basic training.
- **NFR-06 (Usability):** A standard sale must be completed with 3 clicks or fewer after items are entered.

### Security
- **NFR-07 (Security):** The system must enforce role-based access control (e.g., only Store Managers can override prices).
- **NFR-08 (Security):** All user passwords and payment data must be encrypted. Card data must not be stored after the transaction.

### Maintainability & Compatibility
- **NFR-09 (Maintainability):** Adding a new payment method should take less than 3 development days.
- **NFR-10 (Compatibility):** The system must be fully compatible with standard thermal receipt printers and USB barcode scanners without custom drivers.
