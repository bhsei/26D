# Glossary and Business Rules – NewEra POS

| | |
| --- | --- |
| **Maintainer** | Avni Oflaz |
| **Version** | 0.3 |
| **Last updated** | W07 |
| **Part of** | SRS (Assignment 1), ISO/IEC/IEEE 29148 |

### Version history

| Version | Changes |
| --- | --- |
| 0.1 | First draft: glossary, BR-01 to BR-14, open questions. |
| 0.2 | Fixes from review #17: added *Serial number*, *Rental return*, *Amount tendered*, *Refund period*, *Payment*; BR-02, BR-13 and BR-14 rewritten as store policies; open question on deposit tax. Aligned with SRS v0.1: Payment Service also authorizes checks and card refunds; Customer is a stakeholder; Cashier is the primary actor of all use cases. |
| 0.3 | Review #23: added the terms that the SRS uses but the glossary did not define: *Authorization code*, *Customer ID*, *Employee ID*, *Item list*, *Local employee list*, *Local queue*, *Login*, *Main screen*, *PIN*, *Price override*, *Register ID*, *Rental receipt*, *Reorder list*, *Salted hash*, *Simulator*, *System administrator*, *Tax to be corrected*, *Timeout*, *Transaction ID*. |

## 1. Purpose

This document defines the shared vocabulary of the NewEra POS project and lists the business rules of the store. All SRS sections, use cases and design documents should use the terms exactly as defined here, and should refer to business rules by their ID (for example, "see BR-09").

Business rules describe **store policies**, not system features. Functional requirements (FR-xx) will later implement them, and the traceability matrix will link each requirement to the rules it follows.

## 2. Glossary

Terms are sorted alphabetically. Where two words mean the same thing, the preferred term is used in all documents and the other is listed as a synonym.

| Term | Definition |
| --- | --- |
| **Accounting System** | External system that records the store's sales, returns, rentals and payments for bookkeeping. |
| **Amount tendered** | Amount of money the customer hands over for a cash payment. It may be higher than the total; the difference is the change due (see BR-06). |
| **Authorization** | Approval of a credit card payment, a check payment or a card refund by the Payment Service before the transaction is completed. |
| **Authorization code** | Code that the Payment Service returns when it approves a card or check payment. It is recorded with the payment. |
| **Cashier** | Store employee who operates the register and processes sales, returns, rentals and rental returns. Primary actor of all use cases. |
| **Cashier session** | The period between a cashier's login and logout on one register. Every transaction in the session is linked to that cashier. |
| **Change due** | Amount returned to the customer when the cash tendered is greater than the total. |
| **Customer** | Person who buys, returns or rents items at the store. The customer is a stakeholder, not an actor: they never use the register and act only through the cashier. |
| **Customer ID** | Unique code of a customer who rents items, entered by the cashier at the start of a rental. Of a customer, only the customer ID and the data needed to find open and overdue rentals are stored (DR-18). |
| **Default tax rate** | A tax rate stored locally and used only when the Tax Calculator is unavailable (see BR-02). |
| **Deposit** | Refundable amount paid by the customer when renting an item, kept as a guarantee until the rental return. |
| **Due date** | Date by which a rented item must be returned. |
| **Employee ID** | Unique code of an employee. The cashier enters it, together with the PIN, to log in; it is checked with the HR System. |
| **External system** | A system outside NewEra POS that the POS communicates with: the Payment Service, Tax Calculator, Accounting System and HR System. |
| **HR System** | External system that holds employee data, used to identify valid cashiers and their roles. |
| **Inventory** | The record of the store's items, with their stock levels and, for rentable items, their item status. |
| **Item** | A single physical unit of a product that can be sold or rented. A rentable item is identified by its serial number. |
| **Item identifier** | Unique code (for example, a barcode) that identifies a product description, that is, a product type, and is scanned or typed by the cashier. It does not identify one single item (see *Serial number*). |
| **Item list** | List of all rentable items, each with its serial number, description and item status. |
| **Item status** | State of one rentable item, identified by its serial number: *Available*, *Rented*, *Under maintenance* or *Reserved*. Only *Available* items can be rented. |
| **Late fee** | Charge applied when a rented item is returned after its due date (see open questions). |
| **Line item** | General term for one line of a transaction: see *Sale line item* and *Rental line item*. |
| **Local employee list** | Copy of the employee list kept on the register (employee ID, name, role, active status and PIN as a salted hash). It is refreshed at every start-up and is used when the HR System is not available (IR-09). |
| **Local queue** | Records of completed transactions that are saved on the register while the Accounting System is not available, and sent in the order in which they were made when it is available again (IR-07). Synonym: *queue*. |
| **Login** | The moment a cashier identifies himself or herself with the employee ID and the PIN to open a cashier session (UC4). |
| **Main screen** | The screen shown after a cashier session is opened, from which the cashier starts a sale, a return or a rental. |
| **Opening cash** | Amount of cash in the register drawer at the start of a cashier session. |
| **Overdue rental** | A rental whose due date has passed without the item being returned. |
| **Payment** | The money the customer pays to complete a transaction, given in one tender. Example: a cash payment of 25.00. |
| **Payment Service** | External system that authorizes or declines credit card payments, check payments and card refunds. Synonym: *payment authorization system*. |
| **PIN** | Secret number of an employee, entered together with the employee ID to log in. It is never shown or stored in plain text, only as a salted hash (DR-11). |
| **POS (Point of Sale)** | The system used at the counter to record transactions and take payments. In this project: NewEra POS. |
| **Price override** | Change of the price of a sale line item at the register, done by a store manager (BR-04). |
| **Product catalog** | The set of all product descriptions known to the store. |
| **Product description** | Information about a product: item identifier, name, price and whether it can be rented. |
| **Receipt** | Printed record of a completed transaction, given to the customer. |
| **Refund** | Money paid back to the customer for a returned item. |
| **Refund period** | Maximum time after a sale during which a purchased item can be returned for a refund (see BR-07 and open question 1). |
| **Register** | The physical POS terminal (computer, scanner, cash drawer, receipt printer) at which a cashier works. |
| **Register ID** | Identification of one register. It is shown on the login screen and stored in the cashier session. |
| **Rental** | Transaction in which a customer takes an item for a limited period, pays a rental fee and a deposit, and must return it by the due date. |
| **Rental fee** | Price charged for renting an item for the rental period. |
| **Rental line item** | One line of a rental: the item, the rental period, the rental fee and the deposit. |
| **Rental period** | The time between the start of a rental and its due date. |
| **Rental receipt** | Receipt of a rental: it shows the item and its serial number, the rental fee, the tax, the refundable deposit, the total, the tender and the due date. |
| **Rental return** | Transaction in which a customer brings back a rented item; the item is checked, the late fee is applied if needed and the deposit is refunded. Handled by UC5 Return Rental. Not the same as *Return*. |
| **Reorder list** | List of the products whose stock level is below the reorder threshold, shown to the store manager (BR-09). |
| **Reorder threshold** | Stock level below which a product must be reordered (see BR-09). |
| **Return** | Transaction in which a customer brings back a **purchased** item and receives a refund. Handled by UC2 Handle Returns. For rented items, see *Rental return*. |
| **Sale** | Transaction in which a customer buys one or more items and pays for them. |
| **Sale line item** | One line of a sale: a product description, the quantity and the line subtotal. |
| **Salted hash** | The way a PIN is stored: only a one-way scrambled value of the PIN, mixed with random data (the salt), is kept, so the PIN itself cannot be read back. |
| **Serial number** | Unique number that identifies one single physical item. Different from the item identifier, which identifies the product type (all units of the same product share one item identifier). |
| **Simulator** | Program that replaces an external system during development and tests and follows its interface specification. Synonym: *stub*. |
| **Stock level** | Number of units of a product currently in the store. |
| **Store manager** | Employee responsible for the store, who can approve exceptions (for example, price changes). |
| **Subtotal** | Sum of all line item amounts in a transaction, before tax. |
| **System administrator** | Person who installs and maintains the POS and its connections to the external systems and reads the logs of failed communications (IR-10). |
| **Tax** | Amount added to a transaction according to tax law, calculated by the Tax Calculator. |
| **Tax Calculator** | External system that calculates the tax for a transaction. |
| **Tax to be corrected** | Mark on a transaction that was charged with the default tax rate because the Tax Calculator was not available. The tax is corrected later (BR-02). |
| **Tender** | The form of a payment: cash, credit card or check. Synonym: *payment method*. |
| **Timeout** | Maximum time the POS waits for an answer from an external system: 10 seconds for the Payment Service and 5 seconds for the Tax Calculator and the HR System (IR-02, IR-05, IR-09). |
| **Total** | Amount the customer must pay: subtotal plus tax, plus deposits for rentals. Whether the deposit is taxed is still open (open question 8). |
| **Transaction** | General term for a sale, a return, a rental or a rental return. |
| **Transaction ID** | Unique number of a transaction. It is sent with the record to the Accounting System, which can then ignore a record that arrives twice (IR-07). |

## 3. Business rules

**Source** shows where a rule comes from: *Given* means it is stated in the case or the task plan; *Proposed* means the team still has to confirm it.

| ID | Category | Rule | Source |
| --- | --- | --- | --- |
| BR-01 | Tax | The tax of every transaction is calculated by the Tax Calculator according to the current tax law. | Given |
| BR-02 | Tax | When the exact tax cannot be determined at the time of a transaction, the store charges tax at the default tax rate and corrects the difference afterwards. | Proposed |
| BR-03 | Price | The price of an item is the price in its product description at the moment it is entered. Later price changes do not affect completed transactions. | Proposed |
| BR-04 | Price | Only a store manager may change a product's price or approve a manual price override at the register. | Proposed |
| BR-05 | Payment | A credit card payment must be authorized by the Payment Service before the transaction is completed. | Proposed |
| BR-06 | Payment | For cash payments, the amount tendered must be at least the total; the change due is the amount tendered minus the total. | Proposed |
| BR-07 | Return | A refund is given only for a purchased item with a valid receipt, returned within the refund period. | Given (period: see open questions) |
| BR-08 | Return | A refund is paid with the same tender used in the original sale. | Proposed |
| BR-09 | Inventory | When the stock level of a product falls below 10 units, the product must be reordered. | Given |
| BR-10 | Rental | Every rental requires a deposit. The deposit is refunded at the rental return if the item is undamaged. | Given (amount and tax: see open questions) |
| BR-11 | Rental | Only an item with status *Available* can be rented. A *Rented* item cannot be sold or rented again until it is returned. | Proposed |
| BR-12 | Rental | A customer with an overdue rental cannot start a new rental. | Proposed |
| BR-13 | Staff | Every transaction is the responsibility of the cashier who carries it out. A cashier may work at a register only under their own identity, never under another employee's. | Proposed |
| BR-14 | Accounting | Every completed sale, return, rental and rental return must be recorded in the store's accounts. | Proposed |

## 4. Open questions

Source checked so far: project proposal (W01). The full case study has not yet been checked.


1. What is the **refund period** for returns (BR-07)?
2. How is the **deposit amount** set: fixed, or a percentage of the item value (BR-10)?
3. What is the **maximum rental period**, and is there a **late fee**? If so, how is it calculated?
4. The proposal lists **3 payment methods**; the third is assumed to be **check**. Confirm against the case.
5. Do **rented items** count toward the stock level for the reorder threshold (BR-09)?
6. Are there **discounts or promotions** that need their own price rules?
7. Does the Accounting System receive the **deposit**, or only the rental fee (BR-14)?
8. Is **tax** charged on the **deposit**, or only on the rental fee (Total, BR-10)?
