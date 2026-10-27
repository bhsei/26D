# Elicitation Plan – NewEra POS

> Team D · Software Engineering, Beihang University (BUAA) · Version v0.2 (W7)
> Author: Yasmine Chkoundali
>
> This document explains how the team will collect the requirements of NewEra POS: which techniques we use, why, who does each activity and when, and which questions we ask. The people we want to hear from are described in [`stakeholders.md`](stakeholders.md). Terms follow the [glossary](glossary.md).

## 1. Goals of the elicitation

- Understand how a cashier works today with sales, returns, rentals and the start of a shift (UC1–UC5).
- Find the needs of the store manager, who controls the rules and the records.
- Check the assumptions we made in the cashier persona.
- **Answer the open questions** of the [glossary](glossary.md) (section 4) and of [`external_interfaces.md`](external_interfaces.md) (section 5). They are listed in section 4 of this plan, with the question that covers each one.
- Collect the functional and non-functional requirements and the business rules that will go into the SRS.

## 2. Techniques

| Technique                    | What we do                                                                                                                                                     | Why we use it                                                                                                                              | Main stakeholders                    | Limits                                                                                                   |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------ | -------------------------------------------------------------------------------------------------------- |
| **Interview**                | Talk one to one with a cashier and a store manager, using the questions in section 3.                                                                          | Gives detailed and honest answers, and allows follow-up questions. Good to understand needs, problems and business rules.                  | Cashier, store manager               | Takes time. Answers depend on the person and may not cover everything.                                   |
| **Questionnaire** (optional) | Send the short list of closed questions in section 3.3 to cashiers and store staff.                                                                            | Reaches more people quickly and gives data we can compare, for example about the payment methods used or the peak hours.                   | Cashier, store manager               | Little detail. No chance to ask follow-up questions. Only useful if we find at least 5 people to answer. |
| **Observation** (optional)   | Watch a real register during a normal period and a busy period, and note each step of a sale, a return and a rental.                                           | Shows what people really do, including things they forget to say. Good to find usability problems and the real speed needed at peak hours. | Cashier, customer                    | Needs the permission of the store. The behavior of people can change when they know they are observed.   |
| **Document analysis**        | Read the case study documents and the information about the Payment Service, the Tax Calculator, the Accounting System and the HR System, and the store rules. | Fast and cheap. Gives the first list of use cases, actors and business rules before we meet any user.                                      | Accountant, HR, system administrator | Documents can be incomplete or out of date, so we must confirm them with people.                         |

### How the techniques work together

1. **Document analysis** first, to prepare ourselves and to avoid asking questions that the case documents already answer.
2. **Interviews** next, to understand the needs and the business rules in detail.
3. **Observation** of a real register, to compare what people say with what they do (optional).
4. **Questionnaire** last, to check the main findings with more people (optional).

The results of each step go into the SRS and are checked again by the team during the review of the requirements.

### Schedule and responsibilities

This is a proposal, to be confirmed by the team in the weekly meeting. The SRS v1.0 is delivered on 28 October, so the interviews take place right after it. Until then, the open questions stay in the SRS, and the answers are added in a later version.

| Activity                                                                                | Responsible                                | Date                               | With whom                                                                                   | Fallback if not possible                                                               |
| --------------------------------------------------------------------------------------- | ------------------------------------------ | ---------------------------------- | ------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| Document analysis of the full case study; check which open questions it already answers | Yasmine                                    | by Wed 28 Oct                      | Case documents, [glossary](glossary.md), [`external_interfaces.md`](external_interfaces.md) | –                                                                                      |
| Interview of a store manager (section 3.2)                                              | Yasmine, with a second member taking notes | Thu 29 Oct – Mon 2 Nov             | A real store manager                                                                        | Role-play: a classmate with retail experience, or the teacher, plays the store manager |
| Interview of a cashier (section 3.1)                                                    | Yasmine, with a second member taking notes | Thu 29 Oct – Mon 2 Nov             | A real cashier                                                                              | Role-play: a classmate who has worked at a till plays the cashier                      |
| Observation of a real register (optional)                                               | To be assigned                             | W8                                 | A store that gives permission                                                               | Watch a shop register as a customer and note the steps, without recording anything     |
| Questionnaire (optional)                                                                | To be assigned                             | W8                                 | Cashiers and store staff (at least 5 people)                                                | Skip it; the interviews are enough for the SRS                                         |
| Summary of the answers and update of the open questions                                 | Yasmine                                    | within 2 days after each interview | The team                                                                                    | –                                                                                      |

## 3. Questions

The interview questions are open, so the person can explain in their own words. Each question asks **one thing**. The last column links the question to the use cases (UC1 Process Sale, UC2 Handle Returns, UC3 Process Rental, UC4 Start Up, UC5 Return Rental) and to the business rules (BR-xx), so that every answer can be traced to a requirement in the [traceability matrix](requirements_conventions.md).

### 3.1 Cashier (14 questions)

| ID   | Question                                                                                      | Related to |
| ---- | --------------------------------------------------------------------------------------------- | ---------- |
| C-01 | What do you do first when you arrive and open the register?                                   | UC4        |
| C-02 | How do you log in to the register?                                                            | UC4, BR-13 |
| C-03 | What happens if you cannot log in?                                                            | UC4        |
| C-04 | What do you do with the cash in the drawer at the beginning and at the end of your shift?     | UC4        |
| C-05 | Can you describe a normal sale from the moment the customer arrives to the moment they leave? | UC1        |
| C-06 | Which steps of the sale take the most time or cause the most mistakes?                        | UC1        |
| C-07 | What do you check before you accept an item back from a customer?                             | UC2, BR-07 |
| C-08 | How do you give the money back to the customer for a returned item?                           | UC2, BR-08 |
| C-09 | What information do you need from the customer to rent equipment?                             | UC3        |
| C-10 | What do you check when a customer brings back rented equipment?                               | UC5        |
| C-11 | What do you do when a card payment is declined?                                               | UC1, BR-05 |
| C-12 | What do you do when the Payment Service is not available?                                     | UC1, BR-05 |
| C-13 | What do you do when the system is slow or stops working in the middle of a sale?              | UC1        |
| C-14 | What would make your work at the register easier?                                             | UC1–UC5    |

### 3.2 Store manager (18 questions)

| ID   | Question                                                                                                    | Related to      |
| ---- | ----------------------------------------------------------------------------------------------------------- | --------------- |
| M-01 | What information must the system record for every sale?                                                     | UC1, BR-13      |
| M-02 | What information must the system record for every return?                                                   | UC2             |
| M-03 | What information must the system record for every rental?                                                   | UC3             |
| M-04 | Which payment methods does the store accept: cash, credit card, check, others?                              | UC1             |
| M-05 | Which discounts or promotions does the store apply?                                                         | UC1, BR-03      |
| M-06 | Who is allowed to change a price or approve a manual price change at the register?                          | UC1, BR-04      |
| M-07 | What is the refund period for returned items?                                                               | UC2, BR-07      |
| M-08 | What do you do when a customer asks for a refund to a card but does not have the card with them?            | UC2, BR-08      |
| M-09 | How is the rental deposit set: a fixed amount or a percentage of the value of the item?                     | UC3, BR-10      |
| M-10 | When the customer pays the deposit by card, is the deposit charged, or only held until the item comes back? | UC3, UC5, BR-10 |
| M-11 | What is the maximum rental period?                                                                          | UC3, BR-12      |
| M-12 | Is there a late fee for a rental, and how is it calculated?                                                 | UC5, BR-12      |
| M-13 | Is tax charged on the deposit, or only on the rental fee?                                                   | UC3, BR-01      |
| M-14 | Do rented items count in the stock level that triggers a reorder at 10 units?                               | UC3, BR-09      |
| M-15 | Does the Accounting System receive the deposit, or only the rental fee?                                     | UC3, UC5, BR-14 |
| M-16 | When the Payment Service is not available, may the store accept card payments offline for small amounts?    | UC1, BR-05      |
| M-17 | Who corrects the transactions that were taxed with the default rate?                                        | UC1, BR-02      |
| M-18 | What problems or risks have you had with a POS system before?                                               | UC1–UC5         |

### 3.3 Questionnaire (optional, 7 closed questions)

**Who receives it:** cashiers and store staff, ideally at least 5 people, for example people with a part-time job in a shop. The questionnaire is anonymous and has no question about the person or the store.

| ID   | Question                                                      | Answers                                                                         | Related to |
| ---- | ------------------------------------------------------------- | ------------------------------------------------------------------------------- | ---------- |
| Q-01 | Which payment methods do you handle most often?               | Cash / Credit card / Check / Other (several answers possible)                   | UC1        |
| Q-02 | When is the register busiest?                                 | Morning / Lunch time / Afternoon / Evening / Weekend (several answers possible) | UC1        |
| Q-03 | How many customers do you serve per hour at the busiest time? | Fewer than 10 / 10–20 / 21–40 / More than 40                                    | UC1        |
| Q-04 | How often do you process a return?                            | Every day / Every week / Rarely / Never                                         | UC2        |
| Q-05 | Does your store rent out equipment?                           | Yes / No                                                                        | UC3, UC5   |
| Q-06 | How long does it take to train a new cashier on the register? | Less than 1 hour / Half a day / 1 day / More than 1 day                         | UC4        |
| Q-07 | How easy is the system you use now?                           | 1 (very difficult) to 5 (very easy)                                             | UC1–UC5    |

## 4. Open questions covered

Every open question already written by the team has at least one question or activity in this plan.

| Open question                                          | Source                          | Covered by        |
| ------------------------------------------------------ | ------------------------------- | ----------------- |
| Refund period (BR-07)                                  | Glossary, question 1            | M-07              |
| Deposit amount: fixed or percentage (BR-10)            | Glossary, question 2            | M-09              |
| Maximum rental period and late fee                     | Glossary, question 3            | M-11, M-12        |
| Third payment method (assumed: check)                  | Glossary, question 4            | M-04, Q-01        |
| Rented items and the reorder threshold (BR-09)         | Glossary, question 5            | M-14              |
| Discounts or promotions                                | Glossary, question 6            | M-05              |
| Deposit sent to the Accounting System (BR-14)          | Glossary, question 7            | M-15              |
| Tax on the deposit                                     | Glossary, question 8            | M-13              |
| Card authorization when the Payment Service is down    | External interfaces, question 1 | M-16, C-12        |
| Deposit by card: charge or hold                        | External interfaces, question 2 | M-10              |
| Refund to card when the card is not present (BR-08)    | External interfaces, question 3 | M-08              |
| Correction of transactions taxed with the default rate | External interfaces, question 4 | M-17              |
| Real message content of the external systems           | External interfaces, question 7 | Document analysis |

## 5. Data protection

- Voice recordings, raw notes and the filled questionnaires **stay outside the repository**, on the device of the team member who took them. They are deleted after the summary is written. We record an interview only if the person agrees.
- Only **anonymous summaries** are committed to the repository: the role of the person (cashier or store manager), the date and the findings. No names, no shop names and no contact details, as required by section 6 of [`CONTRIBUTING.md`](../../CONTRIBUTING.md).

## 6. After the elicitation

- Each interview is summarized in a short anonymous note and shared with the team.
- Every finding is converted into a requirement, a business rule or an open question. The tags in section 3 show which use case or business rule an answer belongs to.
- Answered open questions are marked as resolved in the glossary and in [`external_interfaces.md`](external_interfaces.md), and the related requirements are updated in the SRS.
- Questions that are still open are checked with the person in a second short meeting or by message.
- The requirements follow the conventions defined by the team in [`requirements_conventions.md`](requirements_conventions.md).
