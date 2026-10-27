# External Interfaces Inventory – NewEra POS

| | |
| --- | --- |
| **Maintainer** | Haifa Chkoundali |
| **Version** | 0.2 |
| **Last updated** | W07 |
| **Part of** | SRS (Assignment 1), ISO/IEC/IEEE 29148 – external interface requirements (software interfaces) |

**Changes in v0.2 (review #14):** timeouts for the Payment Service (10 s), Tax Calculator and HR System (5 s); connection lost during a card payment (cancel or retry); default tax rate changed only by a store manager; HR local copy refreshed at every start-up and employees can be disabled locally; pre-authorization (hold) proposed for the rental deposit. Also aligned with SRS v0.9 and glossary v0.2: UC5 Return Rental added, the Payment Service also authorizes checks.

## 1. Purpose

NewEra POS does not work alone: it depends on four **external systems** (see the [glossary](glossary.md)). This document lists, for each of them:

- what the POS **sends**,
- what the POS **receives**,
- **when** the exchange happens (in which use case and step),
- what the POS does if the system is **not available**.

It is the input for the *External interface requirements* section of the [SRS](SRS.md) and for the fully dressed use cases in W07. The behaviour described here is at the **logical level** (which data, when); protocols and message formats are decided in increment 2 (Design).

Terms are used as defined in the [glossary](glossary.md). The case and the task plan also call the Payment Service "Payment Authorization"; in this document we use the glossary term **Payment Service**.

## 2. Overview

| External system | Main purpose for the POS | Use cases | Direction | Timeout | Blocks the transaction if down? | Business rules |
| --- | --- | --- | --- | --- | --- | --- |
| **Payment Service** | Authorize credit card and check payments, and card refunds | UC1, UC2, UC3, UC5 | POS ⇄ system (request / response) | 10 s | **Yes**, for card and check payments only | BR-05, BR-08 |
| **Tax Calculator** | Calculate the tax of a transaction | UC1, UC2, UC3, UC5 | POS ⇄ system (request / response) | 5 s | No (default tax rate) | BR-01, BR-02 |
| **Accounting System** | Record completed transactions for bookkeeping | UC1, UC2, UC3, UC5 (+ UC4 for pending data) | POS → system (notification) | – (queued) | No (sent later) | BR-14 |
| **HR System** | Identify valid cashiers and their roles | UC4 (and cashier login) | POS ⇄ system (request / response) | 5 s | Partly (see 3.4) | BR-04, BR-13 |

**General principle.** A failure of an external system must never lose a transaction or a payment. The POS only blocks the cashier when continuing would break a store rule (for example, completing a card payment without authorization); in every other case it continues with a safe fallback and records what must be sent or corrected later. A system that does not answer within its **timeout** is treated as *not available*.

## 3. Interfaces

### 3.1 Payment Service

Authorizes or declines credit card and check payments, and card refunds (glossary v0.2). Cash does not use this interface.

| | |
| --- | --- |
| **When** | UC1 Process Sale and UC3 Process Rental: when the customer pays by credit card or check, after the total is known. UC2 Handle Returns: when a refund is paid back to a credit card (BR-08). UC5 Return Rental: when the card deposit is released or refunded. |
| **POS sends** | Card data read at the register (card number / token, expiry date) or check data, amount, currency, type of operation (*payment*, *refund*, *hold* or *release*), transaction ID, register ID, date and time. |
| **POS receives** | Result: *approved* or *declined*; authorization code (if approved); reason (if declined); reference of the operation. |
| **Timeout** | **10 seconds.** No answer within 10 s is handled as *not available*. |
| **If declined** | The payment is not accepted. The POS shows the reason and the cashier asks the customer for another tender. The transaction stays open. |
| **If not available** (no answer, timeout or error) | The POS shows *"Card payment not available"* and the cashier offers another tender (cash). The transaction stays open until it is paid or cancelled. The POS **does not** complete a card payment without authorization (BR-05) and does not store card data to retry later. The failure is logged. |
| **If the connection drops during the request** | The payment is treated as *not authorized*. The cashier can easily **retry** the payment or **cancel** it and choose another tender; the transaction stays open. A retry uses the same transaction ID, so the Payment Service can recognise it and the customer is never charged twice. |
| **Security notes** | The POS does not store the full card number after the request. Card data are never written to logs or printed on the receipt (only the last 4 digits). |

### 3.2 Tax Calculator

Calculates the tax of a transaction according to the current tax law (BR-01).

| | |
| --- | --- |
| **When** | UC1 and UC3: after the last line item is entered, before the total is shown to the customer. UC2: when the refund amount is calculated (tax of the returned items). UC5: when a late fee is charged. |
| **POS sends** | Transaction ID and type (sale, return, rental, rental return), list of line items (item identifier / tax category, quantity, line subtotal), date. |
| **POS receives** | Tax amount per line and/or for the whole transaction. |
| **Timeout** | **5 seconds.** |
| **If not available** | The POS applies the locally stored **default tax rate** (BR-02), marks the transaction as *tax to be corrected*, and continues. The flag is kept with the transaction and sent to the Accounting System so that the tax can be corrected later. The cashier sees a short warning but does not have to do anything. |
| **Default tax rate** | Part of the POS configuration. **Only a store manager** can change it (same authority as price changes, BR-04). |
| **Open points** | Who corrects the flagged transactions and how (see section 5). |

### 3.3 Accounting System

Records the store's completed sales, returns, rentals and payments for bookkeeping (BR-14).

| | |
| --- | --- |
| **When** | After each transaction is **completed** (paid and receipt printed) in UC1, UC2, UC3 and UC5. At UC4 Start Up, any record still waiting from the previous session is sent first. |
| **POS sends** | Transaction ID and type, date and time, register ID, cashier ID, line items, subtotal, tax (and the *tax to be corrected* flag, if any), total, tender used, authorization code (card and check payments), deposit received or refunded and late fee (rentals – see glossary open question 7). |
| **POS receives** | Acknowledgement that the record was received (with the transaction ID). |
| **If not available** | The transaction is completed normally; the customer is not affected. The record is kept in a local **queue** in the order the transactions happened and sent again automatically when the Accounting System is back. A record is removed from the queue only when its acknowledgement arrives. The transaction ID lets the Accounting System ignore duplicates if a record is sent twice. |
| **Open points** | How long the POS may work without the Accounting System before a manager must be warned. |

### 3.4 HR System

Holds employee data; the POS uses it to know who is a valid cashier and what each employee may do (for example, only a store manager may change a price, BR-04).

| | |
| --- | --- |
| **When** | UC4 Start Up and when a cashier logs in to start a cashier session. Also when a store manager must approve an exception at the register (BR-04). |
| **POS sends** | Employee ID entered by the cashier (and the register ID). |
| **POS receives** | Whether the employee is valid and active, the employee's name and role (*cashier*, *store manager*). |
| **Timeout** | **5 seconds.** |
| **Local copy** | The POS keeps a **local copy** of the employee list. It is **refreshed at every start-up (UC4)** when the HR System is available. |
| **If not available** | The POS uses the local copy from the last successful refresh, so that known cashiers can still log in and work. Employees not in the local copy cannot log in until the HR System is back. Every transaction is still linked to the cashier of the session (BR-13). If no local copy exists (first start-up), the POS cannot be started for sales. If the HR System stays down for a long time (for example, several days), a **store manager can disable an employee in the local copy**, so that a dismissed employee cannot log in. |
| **Security notes** | The POS only needs the ID, name, role and active status; it does not receive or keep other personal data. Passwords / PINs are never stored in plain text. |

## 4. Draft interface requirements

Interface requirements that come from this inventory. IDs follow the scheme in [requirements_conventions.md](requirements_conventions.md) (IR-xx); priority uses MoSCoW.

| ID | Requirement | System | Priority | Business rule |
| --- | --- | --- | --- | --- |
| IR-01 | The POS shall request authorization from the Payment Service for every credit card and check payment and shall complete the payment only if it is approved. | Payment Service | Must | BR-05 |
| IR-02 | When the Payment Service does not answer within 10 seconds, returns an error or the connection drops during the request, the POS shall inform the cashier, keep the transaction open and let the cashier retry the payment or cancel it and use another tender. | Payment Service | Must | BR-05 |
| IR-03 | The POS shall send card refunds of returns to the Payment Service, using the card of the original sale. | Payment Service | Should | BR-08 |
| IR-04 | The POS shall obtain the tax of every sale, return, rental and rental return from the Tax Calculator. | Tax Calculator | Must | BR-01 |
| IR-05 | When the Tax Calculator does not answer within 5 seconds, the POS shall apply the default tax rate and mark the transaction for later tax correction. Only a store manager shall be able to change the default tax rate. | Tax Calculator | Must | BR-02, BR-04 |
| IR-06 | The POS shall send every completed sale, return, rental and rental return to the Accounting System. | Accounting System | Must | BR-14 |
| IR-07 | When the Accounting System is not available, the POS shall keep the records in a local queue and send them, in order and without loss, when the system is available again. | Accounting System | Must | BR-14 |
| IR-08 | The POS shall check with the HR System that an employee is a valid, active cashier before starting a cashier session. | HR System | Must | BR-13 |
| IR-09 | The POS shall refresh the local copy of the employee list at every start-up. When the HR System does not answer within 5 seconds, the POS shall validate employees against this local copy; a store manager shall be able to disable an employee in the local copy. | HR System | Should | BR-13 |
| IR-10 | The POS shall log every failed communication with an external system (system, time, error) without logging card data or other personal data. | All | Should | – |

## 5. Open questions

1. **Card authorization when the Payment Service is down:** is an offline (deferred) authorization for small amounts allowed, or is the card payment always refused? (Current draft: always refused.)
2. **Rental deposit by card:** is the deposit charged, or only *held* (pre-authorization) and released when the item is returned? **Proposal (review #14): pre-authorization (hold)**, released or charged at UC5 Return Rental. To be confirmed in the fully dressed UC3 (W07); this changes the Payment Service interface for UC3 and UC5.
3. **Refund to card** when the original card is not present: allowed, or refund in cash? (Related to BR-08.)
4. **Tax correction:** who corrects the transactions taxed with the default rate, and does the correction go through the POS or directly in the Accounting System?
5. ~~**HR local copy:** how often is it refreshed?~~ **Resolved (review #14):** refreshed at every start-up (UC4); a store manager can disable an employee locally (see 3.4).
6. ~~**Response-time targets** for each interface.~~ **Resolved (review #14):** timeouts of 10 s (Payment Service) and 5 s (Tax Calculator, HR System). To be added to the NFRs (Josué).
7. Does the **case study** describe the real message content of these systems? Source checked so far: project proposal (W01) and glossary; the full case has not been checked yet.
