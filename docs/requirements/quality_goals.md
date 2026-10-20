# Quality Goals (ISO/IEC 25010)

This document defines the quality goals for our POS (Point of Sale) system, based on the Product Quality Model defined in the ISO/IEC 25010 standard.

## 1. Reliability
- **Why it matters:** A shop cannot afford to stop selling because the system crashes. Data loss is unacceptable.
- **Measurable target:** The system must have an uptime of 99.9% during store hours. A completed sale must be saved locally even if the internet drops.

## 2. Usability
- **Why it matters:** Cashiers work under pressure, especially during peak hours. The system must be intuitive.
- **Measurable target:** A new cashier must be able to process a standard sale after 15 minutes of training. Checkout should require fewer than 3 clicks.

## 3. Performance Efficiency
- **Why it matters:** Long waiting times frustrate customers and reduce sales per hour.
- **Measurable target:** A sale line item must be registered in less than 1 second. System start-up in less than 30 seconds.

## 4. Security
- **Why it matters:** The POS handles money and sensitive data. Unauthorized access could lead to fraud.
- **Measurable target:** Role-based access control (Cashier vs. Manager). All passwords and payment data must be encrypted.

## 5. Maintainability
- **Why it matters:** The store might need to add new features (like a loyalty program) in the future.
- **Measurable target:** Adding a new payment method should take less than 3 development days.

## 6. Compatibility
- **Why it matters:** The POS must work with existing hardware and external software.
- **Measurable target:** Fully compatible with standard thermal printers and barcode scanners without custom drivers.
