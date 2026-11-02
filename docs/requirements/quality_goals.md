# Quality Goals (ISO/IEC 25010)

> **Informative.** This file explains the SRS (SRS.md). If it differs from the SRS, the SRS prevails.

This document defines the quality goals for our POS (Point of Sale) system, based on the Product Quality Model defined in the ISO/IEC 25010 standard.

## 1. Reliability
- **Why it matters:** A shop cannot afford to stop selling because the system crashes. Data loss is unacceptable.
- **Measurable target:** The register application must be available for at least 99.9% of store hours (defined as no downtime preventing sales). A completed sale must be saved locally even if the internet drops.

## 2. Usability
- **Why it matters:** Cashiers work under pressure, especially during peak hours. The system must be intuitive.
- **Measurable target:** At least 4 of 5 new cashiers must be able to process a standard sale and return in under 3 minutes after 15 minutes of training. Checkout should require 3 clicks or fewer.

## 3. Performance Efficiency
- **Why it matters:** Long waiting times frustrate customers and reduce sales per hour.
- **Measurable target:** On the reference setup, a sale line item must be registered in less than 1 second (95th percentile over 200 registrations). System start-up in less than 30 seconds.

## 4. Security
- **Why it matters:** The POS handles money and sensitive data. Unauthorized access could lead to fraud.
- **Measurable target:** Role-based access control (Cashier vs. Manager). PINs stored as salted hashes. Payment data encrypted in transit and at rest. Card data not stored after the transaction.

## 5. Maintainability
- **Why it matters:** The store might need to add new features in the future.
- **Measurable target:** A developer shall be able to add a new payment method in less than 3 working days.

## 6. Compatibility
- **Why it matters:** The POS must work with existing hardware and external software.
- **Measurable target:** Fully compatible with standard thermal printers and barcode scanners without custom drivers.