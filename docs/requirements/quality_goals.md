# Quality Goals (ISO/IEC 25010)

This document defines the quality goals for our POS (Point of Sale) system, based on the Product Quality Model defined in the ISO/IEC 25010 standard. We have selected the most critical characteristics for a retail environment.

## 1. Reliability
- Why it matters: A shop cannot afford to stop selling because the system crashes. Data loss (like a half-registered sale) is unacceptable.
- Measurable target: The system must have an uptime of 99.9% during store hours. A completed sale must be saved locally (and synced later) even if the internet connection drops.

## 2. Usability
- Why it matters: Cashiers work under pressure, especially during peak hours. The system must be intuitive to reduce training time and human errors.
- Measurable target: A new cashier must be able to process a standard sale and a return after 15 minutes of basic training. A standard checkout process should require fewer than 3 clicks.

## 3. Performance Efficiency
- Why it matters: Long waiting times frustrate customers and reduce the number of sales the shop can process per hour.
- Measurable target: A sale line item must be registered in less than 1 second. The system must start up and be ready for use in less than 30 seconds.

## 4. Security
- Why it matters: The POS handles money, sensitive customer data, and employee information. Unauthorized access or fraud could ruin the business.
- Measurable target: The system must enforce role-based access control (e.g., Cashier vs. Store Manager). All user passwords and payment data must be encrypted.

## 5. Maintainability
- Why it matters: The store might need to add new features in the future (like a new payment gateway or a loyalty program).
- **Measurable target:** The codebase must have clear documentation, and adding a new payment method should take less than 3 development days.

## 6. Compatibility
- **Why it matters:** The POS must work seamlessly with the existing hardware in the store (printers, scanners) and external software (accounting, tax calculators).
- **Measurable target:** The system must be fully compatible with standard thermal receipt printers and USB barcode scanners without requiring custom drivers.
