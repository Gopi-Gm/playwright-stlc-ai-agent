# OrangeHRM – Web Test Scenarios

**Application URL:** `https://opensource-demo.orangehrmlive.com/web/index.php/auth/login`

Implement these scenarios following the framework conventions defined in `playwright-mcp-context.md`.

---

# 1. Valid Login Flow (US-HRM-001)

Validate successful authentication into OrangeHRM with valid administrator credentials.

1. Open the OrangeHRM login page.
2. Verify that the login page is displayed with Username and Password fields, and the Login button.
3. Enter valid credentials (from `.env` or project test configuration, e.g., `Admin` / `admin123`).
4. Click the **Login** button.
5. Verify successful authentication.
6. Verify redirection to the Dashboard page (`/dashboard/index`).
7. Verify that the Dashboard header and user profile widget (`.oxd-userdropdown-tab`) are displayed.

## Expected Result

The user is authenticated successfully and redirected to the OrangeHRM Dashboard.

---

# 2. Invalid & Boundary Login Validation Flow (US-HRM-001)

Validate negative authentication and field validation scenarios on the login page.

### 2.1 Invalid Credentials
1. Open the login page.
2. Enter an invalid username and invalid password.
3. Click **Login**.
4. Verify that authentication fails and error message `"Invalid credentials"` is displayed.
5. Verify that the user remains on the login page.

### 2.2 Invalid Password Only
1. Open the login page.
2. Enter valid username with an incorrect password.
3. Click **Login**.
4. Verify error message `"Invalid credentials"`.

### 2.3 Empty Credentials Submission
1. Open the login page.
2. Leave both Username and Password fields blank.
3. Click **Login**.
4. Verify that validation messages (`"Required"`) are displayed under the empty mandatory fields.

### 2.4 Password Field Masking
1. Open the login page.
2. Verify that the Password field input element has `type="password"` to mask entered text.

## Expected Result

Invalid login attempts are rejected with clear error messages, and empty submissions trigger mandatory field validations without navigating away.

---

# 3. User Logout Flow

Validate customer/admin session termination and logout.

1. Open the application and log in with valid credentials.
2. Verify that the Dashboard is displayed.
3. Click on the user profile dropdown tab (`.oxd-userdropdown-tab`) in the top navigation bar.
4. Click **Logout** from the dropdown menu.
5. Verify redirection back to the OrangeHRM login page (`/auth/login`).
6. Verify that authenticated user controls and Dashboard are no longer accessible.

## Expected Result

The user session is terminated cleanly, and the user is redirected to the login page.

---

# 4. Admin – System User Management Flow (US-HRM-006)

Validate creation and management of system users in the Admin module.

1. Log in as an Administrator.
2. Navigate to **Admin → User Management → Users** (`/admin/viewSystemUsers`).
3. Verify that the System Users page is displayed with the User Management table and filter controls.
4. Click the **+ Add** button.
5. Verify that the Add User form is displayed.
6. **Form Validation Checks:**
   - Click **Save** with mandatory fields blank and verify `"Required"` validation messages.
   - Enter mismatching values in **Password** and **Confirm Password** and verify `"Passwords do not match"`.
   - Enter a password shorter than 8 characters and verify minimum length validation.
7. **Create New Admin User:**
   - Select **User Role** as `Admin` (or `ESS`).
   - Enter an existing employee name in **Employee Name** and select from the autocomplete list.
   - Select **Status** as `Enabled` (or `Disabled`).
   - Generate a unique username (e.g., using `dataGenerator`).
   - Enter a strong password and confirm the password.
   - Click **Save**.
8. Verify success notification (`"Successfully Saved"`).
9. Search for the newly created user in the System Users list by Username.
10. Verify that the record is displayed with the correct Role and Status.
11. **Verify New User Authentication:**
    - Log out from current session.
    - Log in using the newly created username and password.
    - Verify successful login to the Dashboard.

## Expected Result

A new system user is created with valid roles, verified in the database/table, and can successfully authenticate.

---

# 5. Leave Management Flow (US-HRM-007)

Validate viewing and filtering employee leave requests in the Leave module.

1. Log in as an Administrator / Manager.
2. Navigate to **Leave → Leave List** (`/leave/viewLeaveList`).
3. Verify that the Leave List page is displayed with filter criteria (Date Range, Show Leave with Status, Leave Type, Employee Name, Sub Unit).
4. **Filter by Leave Status:**
   - Select specific leave statuses (e.g., `Pending Approval`, `Scheduled`).
   - Click **Search**.
   - Verify that the results table updates and displays matching records or a valid `"No Records Found"` indicator.
5. **Filter by Employee Name:**
   - Enter a valid employee name hint and select from autocomplete.
   - Click **Search** and verify records belonging to that employee.
6. **Negative Date Range Validation:**
   - Enter a **To Date** that precedes the **From Date**.
   - Click **Search** or tab out.
   - Verify the error message: `"To date should be after from date"`.
7. **Non-Existent Employee Search:**
   - Enter an invalid/unregistered employee name.
   - Verify autocomplete validation warning `"Invalid"` or empty result.

## Expected Result

Leave records can be queried and filtered accurately by status, employee, and date range, with proper validation on invalid inputs.

---

# 6. Time Management – Weekly Timesheets Flow (US-HRM-008)

Validate viewing and managing timesheets in the Time module.

1. Log in as an Administrator / Employee.
2. Navigate to **Time → Timesheets → My Timesheets** (`/time/viewMyTimesheet`).
3. Verify that the My Timesheet page is displayed.
4. Verify the presence of timesheet elements:
   - Timesheet period header / week navigation.
   - Status badge (e.g., `"Status: Not Submitted"` or `"Submitted"`).
   - Timesheet table with project and activity columns.
   - Action buttons (**Edit**, **Submit**).
5. Verify daily hours summary columns and overall weekly total calculation.

## Expected Result

Timesheet page loads correctly with all required weekly time tracking controls and calculation fields visible and accessible.

---

# 7. Recruitment – Vacancy Management Flow (US-HRM-009)

Validate creation and validation of job vacancies in the Recruitment module.

1. Log in as an Administrator / HR Manager.
2. Navigate to **Recruitment → Vacancies** (`/recruitment/viewJobVacancy`).
3. Verify that the Vacancies page is displayed.
4. Click the **+ Add** button (`/recruitment/addJobVacancy`).
5. Verify the Add Vacancy form is displayed with fields: Vacancy Name, Job Title, Description, Hiring Manager, Number of Positions, Active toggle, Publish to RSS feed toggle.
6. **Mandatory Field Validation:**
   - Click **Save** without filling mandatory fields.
   - Verify `"Required"` validation messages on **Vacancy Name**, **Job Title**, and **Hiring Manager**.
7. **Create New Vacancy:**
   - Enter a unique **Vacancy Name** (e.g., `QA_Lead_<timestamp>`).
   - Select a valid **Job Title** from the dropdown.
   - Type and select an existing employee in **Hiring Manager**.
   - Enter **Number of Positions** (e.g., `2`).
   - Click **Save**.
8. Verify success notification (`"Successfully Saved"`).
9. Navigate back to Vacancies list and verify that the newly created vacancy is listed and active.

## Expected Result

Vacancies can be created with mandatory validations enforced, and successfully saved vacancies appear in the active recruitment list.

---

# 8. Claim Management Flow (US-HRM-010)

Validate expense claim creation and field validations in the Claim module.

1. Log in as an Administrator / Employee.
2. Navigate to **Claim → Submit Claim** (`/claim/submitClaim`).
3. Verify that the Create Claim / Submit Claim page is displayed.
4. Verify required fields: **Event**, **Currency**, and **Remarks**.
5. **Mandatory Field Validation:**
   - Click **Create** without selecting an Event or Currency.
   - Verify `"Required"` validation messages.
6. **Submit Claim:**
   - Select a valid **Event** from the dropdown (e.g., `Medical Reimbursement` or `Travel Allowance`).
   - Select a valid **Currency** (e.g., `United States Dollar`).
   - Enter a descriptive remark.
   - Click **Create**.
7. Verify that the claim is created and advances to the expenses breakdown step (`/claim/submitClaim/id/...`).

## Expected Result

Mandatory validations prevent incomplete submissions, and valid claim details initialize an expense claim record.

---

# 9. End-to-End HR Admin & User Lifecycle Flow

Validate the end-to-end journey across multiple OrangeHRM modules in a single continuous scenario.

1. **Admin Master Login:**
   - Log in using Admin credentials.
   - Verify Dashboard is reached.
2. **User Provisioning:**
   - Navigate to **Admin → User Management**.
   - Create a new System User with Role `Admin`, linked to a valid employee, with status `Enabled`.
   - Verify user creation toast and record in users list.
3. **Vacancy Management:**
   - Navigate to **Recruitment → Vacancies**.
   - Create a new job vacancy and verify it appears in the vacancy list.
4. **Session Handoff & Re-Authentication:**
   - Log out of the master Admin session.
   - Log in using the newly created Admin user's credentials.
   - Verify authentication succeeds and reaches the Dashboard.
5. **Module Navigation & Verification:**
   - Navigate to **Time → My Timesheets** and verify timesheet elements load.
   - Navigate to **Leave → Leave List** and perform a search.
6. **Teardown & Clean Logout:**
   - Log out of the new user session.
   - Verify redirection to login page.

## Expected Result

User creation, recruitment setup, re-authentication, cross-module operations, and logout complete seamlessly end-to-end.

---

# 10. Login Flow (Data Driven using External File)

Validate OrangeHRM login using test data loaded from an external file (`testdata/orangehrm_logindata.csv` or `testdata/orangehrm_logindata.json`), generating one independent test per data row.

## Test Data Schema

Each row contains:
- `testName` — descriptive name of the test scenario
- `username` — login username (or empty for blank test)
- `password` — login password (or empty for blank test)
- `expected` — expected result: `success`, `invalid_credentials`, or `required_fields`

## Test Flow

For each data row:
1. Open the OrangeHRM login page: `https://opensource-demo.orangehrmlive.com/web/index.php/auth/login`.
2. Fill in `username` (leave empty if blank).
3. Fill in `password` (leave empty if blank).
4. Click the **Login** button.
5. **Validation:**
   - **When `expected: success`:**
     - Verify redirection to `/dashboard/index`.
     - Verify Dashboard heading is visible.
     - Log out to reset state for the next test.
   - **When `expected: invalid_credentials`:**
     - Verify error message `"Invalid credentials"` is displayed.
     - Verify user remains on the login page.
   - **When `expected: required_fields`:**
     - Verify `"Required"` validation indicator appears next to empty fields.
     - Verify user remains on the login page.

## Expected Result

Data-driven test execution runs each iteration independently, validating positive, negative, and empty-input conditions matching each row's expected result.
