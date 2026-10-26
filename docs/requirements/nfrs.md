# Non-Functional Requirements (NFRs)

These requirements are derived from our Quality Goals (ISO/IEC 25010) and are mapped to sections 3.3, 3.4, 3.7 and 3.8 of the SRS.

## 1. Performance Requirements (SRS 3.4)
- **NFR-01 (Performance Efficiency):** The system shall register a sale line item in less than 1 second.
- **NFR-02 (Performance Efficiency):** The system shall start up and be ready for use in less than 30 seconds.

## 2. Usability Requirements (SRS 3.3)
- **NFR-05 (Usability):** A new cashier shall be able to process a standard sale and a return after 15 minutes of basic training.
- **NFR-06 (Usability):** A standard sale shall be completed with 3 clicks or fewer after items are entered.

## 3. Software System Attributes (SRS 3.8)
### Reliability & Availability
- **NFR-03 (Reliability):** The system shall have an uptime of 99.9% during store hours.
- **NFR-04 (Reliability):** A completed sale shall be saved locally even if the internet connection drops, ensuring no data loss.

### Security
- **NFR-07 (Security):** The system shall enforce role-based access control (e.g., only Store Managers can override prices).
- **NFR-08 (Security):** All user passwords and payment data shall be encrypted. Card data shall not be stored after the transaction.

### Maintainability & Compatibility
- **NFR-09 (Maintainability):** Adding a new payment method shall take less than 3 development days.
- **NFR-10 (Compatibility):** The system shall be fully compatible with standard thermal receipt printers and USB barcode scanners without custom drivers.

## 4. Standards Compliance (SRS 3.7)
- **NFR-11 (Security):** The system shall comply with standard payment card data security (PCI-DSS) by masking card numbers on receipts (showing only last 4 digits).
- **NFR-12 (Legal):** The system shall comply with data protection regulations (GDPR) by not storing unnecessary personal data.