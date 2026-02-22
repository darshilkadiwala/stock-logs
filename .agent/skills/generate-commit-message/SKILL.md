---
name: Generate Commit Message
description: >
  A comprehensive guide and set of conventions for generating git commit messages. 
  Use this skill whenever asked to write or generate a commit message for git diffs or staged changes.
---

# Commit message conventions

A comprehensive overview of the common commit message conventions across different categories. When you are given git diff code changes and asked to write a commit message, or if no git diff is given but there are staged changes, ALWAYS follow these instructions to write the commit message.

## Instruction

### **Commit Message Format**

**Prefix format:**

- `feat(module)` — for new features
- `fix(module)` — for bug fixes
- `typings(module)` — for type/interface/schema changes
- `chore(module)` — for non-functional cleanup or tooling
- `refactor(module)` — for internal code improvements
- `docs(module)` — for documentation updates
- `test(module)` — for testing additions or changes

---

### **Commit Description Guidelines**

- All messages **must be in present tense**
  - Good: Add filtering to reports
  - Bad: Added filtering to reports
- Avoid repetition in messages
- Do NOT output any introductory paragraphs or summary text before the bullet points.
- Only output the commit header and the bulleted list.
- Keep the tone informative but concise — no fluff or dramatic language
- If the commit is complex, provide a strict, objective 1-2 sentence summary explaining the technical reason (the "Why") for the change before listing the bullet points.
- Describe known issues or limitations if any
- Use backticks (\`) for filenames, code, or API references when needed
- Commit header format will be like: `feat(module): implement a new feature under this module`
- Always use markdown format for commit message so i can do copy-paste

---

### **What to Avoid**

- No **terminal punctuation** (no `.` at the end of lines)
- Avoid using the file names or variables in the commit message header
- Avoid **fluff** or **dramatic language**
- Avoid restating the commit header in the description

---

### **Bullet Point Description Style (when needed)**

If a bullet-style description is used:

- Begin after the prefix + summary line
- Use bullet points like:

  ```plaintext
  - Add ability to filter results by category
  - Remove deprecated `xyzService` from module loader
  - Fix crash when submitting empty form
  ```
