# Stakeholders and Users – NewEra POS

|                  |                                                                                |
| ---------------- | ------------------------------------------------------------------------------ |
| **Maintainer**   | Yasmine Chkoundali                                                             |
| **Version**      | 0.2                                                                            |
| **Last updated** | W07                                                                            |
| **Part of**      | SRS (Assignment 1), ISO/IEC/IEEE 29148 – stakeholders and user characteristics |

### Version history

| Version | Changes                                                                                                                                                                                                                        |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 0.1     | First draft: stakeholder list and cashier persona.                                                                                                                                                                             |
| 0.2     | Fixes from review #20: external and regulatory stakeholders, "HR department" row, influence and elicitation technique for each stakeholder, what the cashier does alone, numeric assumptions linked to the NFRs, header table. |

This document identifies the people and organizations interested in NewEra POS and describes the main user of the system, the cashier. It is an input for the elicitation plan ([`elicitation_plan.md`](elicitation_plan.md)) and for the SRS ([`SRS.md`](SRS.md)). Terms follow the [glossary](glossary.md).

## 1. Stakeholders

A stakeholder is any person or group that is affected by the system or that can influence its requirements. The last two columns show how much each one influences the requirements and how we will get their needs, using the techniques of section 2 of the [elicitation plan](elicitation_plan.md).

### 1.1 Stakeholders inside the store

| Stakeholder              | Role                                                                                                                                                                                                                                                            | Interest in the system                                                                                                                                                                              | Influence on requirements | How we get their needs                                                                         |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- | ---------------------------------------------------------------------------------------------- |
| **Cashier**              | Operates the register in every use case (sale, return, rental, return of a rental, start up).                                                                                                                                                                   | Wants a fast, simple and reliable system that is easy to learn and does not slow down the queue. Wants few errors and clear messages when something goes wrong.                                     | High                      | Interview, observation, questionnaire                                                          |
| **Customer**             | Buys, returns or rents items and pays for them.                                                                                                                                                                                                                 | Wants a short wait at the register, correct prices and taxes, a choice of payment methods, and a correct receipt. Wants the payment to be secure.                                                   | Medium                    | Observation of the register; their needs also come from the cashier interview                  |
| **Store manager**        | Runs the store day to day and supervises the cashiers. Approves the exceptions that a cashier cannot do alone (see section 2). Is responsible for the reorder list when the stock of a product falls below 10 units (BR-09), to be confirmed in the interviews. | Wants accurate sales, returns and rental records, correct stock levels, and control over price and refund rules. Wants the store to run without interruptions.                                      | High                      | Interview, questionnaire                                                                       |
| **Owner**                | Owns the business and decides its investments.                                                                                                                                                                                                                  | Wants the system to increase sales and reduce losses and errors at a reasonable cost. Wants reliable figures about the performance of the store.                                                    | Medium                    | Interview of the store manager about the owner's goals (the owner is not interviewed directly) |
| **Accountant**           | Manages the financial records of the store.                                                                                                                                                                                                                     | Wants every sale, return, rental and rental return (with its taxes) to be recorded correctly in the Accounting System (BR-14), so that the accounts are accurate and consistent.                    | Medium                    | Document analysis                                                                              |
| **HR department**        | The people who manage the store employees. The **HR System** is the external software that this department owns, as defined in the glossary; it is not the same as this row.                                                                                    | Wants the cashiers to be identified with the information of the HR System, and every transaction to be linked to the employee who carried it out (BR-13).                                           | Low                       | Document analysis                                                                              |
| **System administrator** | Installs, configures and maintains the system.                                                                                                                                                                                                                  | Wants a system that is easy to install, configure and maintain, with clear logs, and with reliable connections to the Payment Service, the Tax Calculator, the Accounting System and the HR System. | Medium                    | Document analysis                                                                              |

### 1.2 External and regulatory stakeholders

These parties are not users of the system, but they impose rules on it. Their interests become **constraints** in the SRS.

| Stakeholder                                          | Role                                                                       | Interest in the system                                                                                                                    | Influence on requirements | How we get their needs |
| ---------------------------------------------------- | -------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- | ---------------------- |
| **Tax authority**                                    | Sets the tax law that the Tax Calculator applies.                          | Wants the tax of every transaction to be calculated according to the current tax law (BR-01) and recorded correctly.                      | High                      | Document analysis      |
| **Payment provider (card payment provider or bank)** | Runs the service behind the Payment Service that authorizes card payments. | Wants every card payment to be authorized before the transaction is completed (BR-05) and the card data to be protected (NFR-08, NFR-11). | High                      | Document analysis      |

## 2. User characteristics: the cashier

The cashier is the primary actor of NewEra POS and takes part in every use case. The persona below is **fictional**. It is based on our assumptions about a typical cashier and will be checked and corrected with the interviews and the observation described in the elicitation plan.

### Persona: Li Wei, cashier

|                       |                                                                                                                                                  |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Role**              | Cashier in a retail store that sells products and also rents equipment                                                                           |
| **Age**               | 24                                                                                                                                               |
| **Education**         | High school                                                                                                                                      |
| **Experience**        | 2 years of work as a cashier                                                                                                                     |
| **Technology skills** | Uses a smartphone every day and is comfortable with simple applications. Is not an IT specialist and has had little formal training on software. |

**Working environment**

- Works at a register in a store with a customer queue, noise and frequent interruptions.
- Uses the register with a screen, a barcode scanner, a receipt printer and a cash drawer.
- Works standing for long shifts and often needs to use the system while talking to the customer.
- Needs to follow the store rules for prices, returns and rental deposits.

**Peak hours**

- Lunch time, evenings after work, and weekends.
- At the busiest time we assume about **30 customers per hour** (assumption A-1 below), so every second saved per sale matters.
- The start up of the system happens at the beginning of the shift, often under time pressure before the store opens.

**Goals**

- Serve each customer quickly and correctly.
- Avoid mistakes in prices, taxes and change.
- Handle a normal sale, a normal return with a valid receipt (BR-07) and a rental without asking the store manager for help.

**Frustrations**

- A slow system or a system that freezes while customers are waiting.
- Confusing screens, or too many steps to register a simple sale.
- Unclear error messages, for example when a payment is refused or the Tax Calculator is not available.

### What the cashier does alone and what needs the store manager

| The cashier does alone                                                                                                                         | Needs the store manager                                                                                        |
| ---------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| Log in and start up the register (UC4, BR-13)                                                                                                  | Change a product price or approve a manual price override (BR-04)                                              |
| Process a sale at the price of the product description (UC1, BR-03)                                                                            | Change the default tax rate (see [`external_interfaces.md`](external_interfaces.md))                           |
| Process a normal return with a valid receipt inside the refund period, and refund with the same payment method as the sale (UC2, BR-07, BR-08) | Return without a valid receipt or outside the refund period (to be confirmed in the interviews, question M-20) |
| Rent an available item and take the deposit (UC3, BR-10, BR-11)                                                                                | Any other exception to the business rules (to be confirmed, question M-20)                                     |
| Take back a rented item (UC5)                                                                                                                  |                                                                                                                |

The questions M-06 and M-20 of the elicitation plan check this list with a store manager.

### Assumptions to confirm

These numbers are our first assumptions. They are marked **to be confirmed** and will be checked in the interviews and the questionnaire. They link the persona to the non-functional requirements ([`nfrs.md`](nfrs.md)).

| ID  | Assumption                                                                                 | Related requirement                                           | To be confirmed with               |
| --- | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------- | ---------------------------------- |
| A-1 | At the busiest time the cashier serves about 30 customers per hour.                        | NFR-01 (a sale line item is registered in less than 1 second) | Questionnaire Q-03, interview C-06 |
| A-2 | A new cashier can process a standard sale and a return after 15 minutes of basic training. | NFR-05                                                        | Questionnaire Q-06, interview C-14 |
| A-3 | The register must be ready to use in less than 30 seconds at the start of the shift.       | NFR-02                                                        | Interview C-01                     |

### Implications for the requirements

- **Usability:** a simple screen, few steps per task and clear messages, because the cashier has little time and no IT training. See NFR-06 (a standard sale with 3 clicks or fewer) and NFR-05.
- **Performance:** quick registration of sale line items and a quick response during peak hours. See NFR-01 and NFR-02.
- **Reliability:** the system must keep working, or recover clearly, when an external system is not available. See NFR-03, NFR-04, BR-02 and BR-05.
- **Learnability:** a new cashier should be able to use the system after a short introduction. See NFR-05 and assumption A-2.
