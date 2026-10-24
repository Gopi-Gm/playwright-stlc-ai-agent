# Test Scenarios — US-HRM-001: Automate Login Flow for OrangeHRM

**User Story ID:** US-HRM-001
**Epic:** Authentication & Authorization
**Priority:** High
**Estimation:** 3 story points
**Application:** OrangeHRM demo login
**Status:** Approved & Automated (100% Pass)

---

## Acceptance Criteria (from user-story.md)

| AC ID | Acceptance Criteria |
|-------|---------------------|
| AC-01 | User can log in with valid credentials (Admin / admin123) |
| AC-02 | User sees an error message with invalid credentials |
| AC-03 | User is redirected to the Dashboard after a successful login |
| AC-04 | Login page displays username and password fields and a Login button |

---

## Traceability Matrix

| Test Case ID | Covers AC | Type | Priority |
|--------------|-----------|------|----------|
| TC-HRM-001 | AC-01, AC-03 | Positive | High |
| TC-HRM-002 | AC-04 | Positive | Medium |
| TC-HRM-003 | AC-02 | Negative | High |
| TC-HRM-004 | AC-02 | Negative | High |
| TC-HRM-005 | AC-04 | Negative | Medium |
| TC-HRM-006 | AC-04 | Edge | Medium |

---

## Summary of Test Coverage

| Category | Count |
|----------|-------|
| Positive (Happy Path) | 2 |
| Negative (Error Handling) | 3 |
| Edge Cases | 1 |
| **Total** | **6** |

---

## 1. Positive Test Cases

### TC-HRM-001 — Valid Login with Correct Credentials (AC-01, AC-03)
**Description:** Verify that a user can successfully log in to OrangeHRM with valid credentials and is redirected to the Dashboard.
**Priority:** High
**Pre-conditions:**
- Browser is launched and OrangeHRM login page is accessible.
- Valid credentials: Username = `Admin`, Password = `admin123`.

**Test Steps:**
1. Navigate to the OrangeHRM demo login URL.
2. Enter `Admin` in the Username field.
3. Enter `admin123` in the Password field.
4. Click the LOGIN button.

**Expected Result:**
- User is authenticated successfully.
- User is redirected to the Dashboard page.
- Dashboard is displayed with the main navigation menu.

---

### TC-HRM-002 — Login Page Displays Required Fields (AC-04)
**Description:** Verify that the OrangeHRM login page displays the username field, password field, and Login button.
**Priority:** Medium
**Pre-conditions:**
- Browser is launched.

**Test Steps:**
1. Navigate to the OrangeHRM demo login URL.
2. Observe the login page elements.

**Expected Result:**
- Username input field is present and editable.
- Password input field is present and editable.
- Login button is present and clickable.

---

## 2. Negative Test Cases

### TC-HRM-003 — Login with Invalid Credentials (AC-02)
**Description:** Verify that an error message is displayed when invalid username or password is provided.
**Priority:** High
**Pre-conditions:**
- Browser is on the OrangeHRM login page.

**Test Steps:**
1. Enter an invalid username in the Username field.
2. Enter an invalid password in the Password field.
3. Click the LOGIN button.

**Expected Result:**
- Login is rejected.
- An error message is displayed (e.g., "Invalid credentials").
- User remains on the login page.

---

### TC-HRM-004 — Login with Invalid Password Only (AC-02)
**Description:** Verify that an error message is displayed when the username is valid but the password is invalid.
**Priority:** High
**Pre-conditions:**
- Browser is on the OrangeHRM login page.

**Test Steps:**
1. Enter `Admin` in the Username field.
2. Enter an invalid password in the Password field.
3. Click the LOGIN button.

**Expected Result:**
- Login is rejected.
- An error message is displayed.
- User remains on the login page.

---

### TC-HRM-005 — Login with Empty Credentials (AC-04)
**Description:** Verify that login is blocked when both username and password fields are empty.
**Priority:** Medium
**Pre-conditions:**
- Browser is on the OrangeHRM login page.

**Test Steps:**
1. Leave the Username field empty.
2. Leave the Password field empty.
3. Click the LOGIN button.

**Expected Result:**
- Login is not attempted.
- Validation message indicates required fields.
- User remains on the login page.

---

## 3. Edge Case Test Cases

### TC-HRM-006 — Password Field Masks Input (AC-04)
**Description:** Verify that the password input masks characters for security.
**Priority:** Medium
**Pre-conditions:**
- Browser is on the OrangeHRM login page.

**Test Steps:**
1. Click into the Password field.
2. Type a password value.

**Expected Result:**
- Characters entered in the Password field are masked (e.g., shown as dots or asterisks).
- Actual password value is not visible in plain text.

---

## Sign-Off

| Role | Name | Decision | Date |
|------|------|----------|------|
| QA Engineer (HITL) | Human Reviewer | ☑ Approved ☐ Needs Revision | 2026-10-24 |
| Automation Lead | Automation Lead | ☑ Approved ☐ Needs Revision | 2026-10-24 |