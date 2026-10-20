# Non-Functional Requirements (NFRs)

These requirements are derived from our Quality Goals (ISO/IEC 25010).

## Performance Efficiency
- **NFR-01:** A sale line item must be registered in less than 1 second.
- **NFR-02:** The system must start up and be ready for use in less than 30 seconds.

## Reliability
- **NFR-03:** The system must have an uptime of 99.9% during store hours.
- **NFR-04:** A completed sale must be saved locally even if the internet connection drops.

## Usability
- **NFR-05:** A new cashier must be able to process a standard sale and a return after 15 minutes of basic training.

## Security
- **NFR-06:** The system must enforce role-based access control (e.g., Cashier vs. Store Manager).
- **NFR-07:** All user passwords and payment data must be encrypted.

## Maintainability
- **NFR-08:** Adding a new payment method should take less than 3 development days.

## Compatibility
- **NFR-09:** The system must be fully compatible with standard thermal receipt printers and USB barcode scanners without custom drivers.
