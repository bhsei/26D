# Contributing to NewEra POS (Team D)

This page explains how the team works with the repository: how to get the latest version, how to name files, how to write commits and how to review each other's documents. It follows the course GitHub guide. If a rule here and the course guide disagree, the course guide wins and this page must be updated.

| | |
| --- | --- |
| **Maintainer** | Haifa Chkoundali |
| **Version** | 1.0 |
| **Last updated** | W05 |

## 1. Before you start

- Clone the repository once: `git clone https://github.com/bhsei/26D.git`
- Set your name and e-mail so that commits are linked to your GitHub account:
  ```bash
  git config user.name  "<your GitHub username>"
  git config user.email "<the e-mail of your GitHub account>"
  ```
- All documents are written in **English** and in **Markdown** (`.md`), except the weekly report slides (`.pptx`) and exported PDFs.

## 2. Daily Git workflow

Always follow these steps, in this order:

```bash
git pull --rebase          # 1. get the latest version BEFORE you edit anything
# 2. edit ONE document
git add <that file>        # 3. add only that file (never "git add ." blindly)
git commit -m "W6 - <summary>; <description>"
git pull --rebase          # 4. get changes others pushed while you worked
git push                   # 5. publish
```

**If `git pull --rebase` reports a conflict:**

1. Open the file(s) Git lists and keep the right content between the `<<<<<<<`, `=======` and `>>>>>>>` markers (delete the markers).
2. `git add <file>` and then `git rebase --continue`.
3. If you are not sure, run `git rebase --abort` (this brings you back to where you were) and ask in the WeChat group.

**Never** use `git push --force` on `main`, and never rewrite commits that are already pushed.

## 3. Commits

### One document per commit

Each commit changes **one document** (or one document plus its own image, e.g. a diagram `.png` and its `.drawio` source). Do not mix, for example, a work log and an SRS section in the same commit. This keeps the history readable and lets the teacher see who did what.

### Message format

```
W<week> - <change summary>; <change description>
```

- `<week>` is the course week **without a leading zero**: `W5`, `W6`, `W12`.
- **Catch-up work** for earlier weeks uses the week in which it was planned (Part A of the W05–W06 task plan uses `W5`).
- `<change summary>`: a few words, starting with a verb or the name of the document.
- `<change description>`: what the commit contains, in one line.

Examples:

```
W6 - External interfaces inventory; data sent/received and fallback for the 4 external systems
W5 - Team work log W03; holiday week
W6 - Fix glossary order; sort terms alphabetically after review #4
```

Write messages in English. Do not use messages like `update`, `fix` or `Update README.md` without a description.

## 4. Branches and pull requests

- **Documents (increments 1 and 2):** we work directly on `main`, using the workflow in section 2. Each document has one owner, so conflicts are rare.
- **Code (increment 3):** each feature is developed on its own branch and merged with a pull request:
  - Branch name: `<type>/<short-description>`, for example `feature/process-sale`, `fix/receipt-total`, `test/tax-calculator`.
  - Open a pull request to `main`; at least **one other team member** reviews and approves it before merging.
  - Delete the branch after the merge.
- Never push code that does not build to `main`.

## 5. File and folder naming

| What | Where | Name | Example |
| --- | --- | --- | --- |
| Documents | `docs/<area>/`, `plans/` | lowercase, words separated by `_`, `.md` | `docs/requirements/external_interfaces.md` |
| Main SRS file | `docs/requirements/` | `SRS.md` | `docs/requirements/SRS.md` |
| Team work log | `worklogs/team/` | `Wxx.md` (two digits) | `worklogs/team/W06.md` |
| Individual work log | `worklogs/individual/` | `<FirstName>.md` | `worklogs/individual/Haifa.md` |
| Weekly report slides | `weekly-reports/Wxx/` | `Weekly_Report_Wxx.pptx` | `weekly-reports/W06/Weekly_Report_W06.pptx` |
| Diagrams and images | `assets/` | lowercase with `_`; the editable source has the **same name** | `assets/use_case_diagram.png` + `assets/use_case_diagram.drawio` |

Other rules:

- No spaces, accents or special characters in file names.
- Link documents with **relative links**, for example `[Glossary](docs/requirements/glossary.md)`.
- In every document, use the terms of the [glossary](docs/requirements/glossary.md) and refer to requirements and business rules by their ID (`FR-03`, `BR-09`).

## 6. What must never be committed

- Passwords, tokens, API keys, `.env` files or private keys (the `.gitignore` already blocks the most common ones).
- Personal data other than **name, GitHub username and student ID** (no phone numbers, addresses, WeChat IDs or screenshots of private chats).
- Temporary or generated files (Office `~$` files, `node_modules/`, build output).

If you committed something secret by mistake, tell the team **at once**; deleting the file in a new commit is not enough, because it stays in the history.

## 7. Reviewing documents with GitHub Issues

Every document is reviewed by another team member (the review pairs are in the weekly task plan). We use the same format later for the cross-team review.

### 7.1 Opening the review issue

The **reviewer** opens one issue per reviewed document:

- **Title:** `Team <X> review of Team <Y> - <Document Name> <Version> - Issue List`
  Example: `Team D review of Team D - Glossary and Business Rules v0.1 - Issue List`
- **Assignee:** the author of the document.
- **Label:** `review`.
- **Description:** use this template:

```markdown
Reviewer: <reviewer name>
Reviewed: <author name>
Document: <document name>
Version: <version, for example v0.1>
Review date: YYYY-MM-DD

Please use one comment per finding so that each finding can be discussed and resolved independently.
```

### 7.2 One comment per finding

Each finding is a **separate comment** in the issue, so that each one can be answered and closed on its own. Use this template:

```markdown
**Location:** <section, ID, figure or line>
**Type:** Ambiguity | Consistency | Completeness | Verifiability | Other
**Finding:** <what is wrong, in one or two sentences>
**Recommendation:** <how to fix it>
```

Tips: be specific and point to the exact place; explain *why* it is a problem (for example, a requirement that cannot be tested); be polite and comment on the document, not the person.

### 7.3 Answering and closing

1. The **author** answers each comment with `Fixed in <commit>`, `Not changed: <reason>` or `Moved to open questions`.
2. The fix is a normal commit that mentions the issue, for example `W6 - Fix glossary order; review #4`.
3. When every finding is answered, the **reviewer** closes the issue.

## 8. Questions

Ask in the team WeChat group or in the weekly meeting. If you think a rule here should change, propose it in the meeting and update this page in its own commit.
