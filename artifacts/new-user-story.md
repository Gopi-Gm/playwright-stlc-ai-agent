# User Stories: OrangeHRM Application (New Stories)

---

## US-HRM-006 — Admin: Create System User

- **Story ID**: US-HRM-006
- **Epic**: Administration & User Management
- **Priority**: High
- **Estimation**: 5 story points

### Description
As an Admin,
I want to create a new system user and assign a specific role,
so that I can grant appropriate system access and permissions to employees.

### Acceptance Criteria
- Admin can navigate to Admin > User Management
- Admin can fill in Username, Employee Name, Status (Enabled/Disabled), and Role (Admin, ESS, etc.)
- System validates that the username is unique and does not already exist
- System prompts the Admin to set and confirm a password for the new user
- New user is successfully added to the system users list and can log in with the assigned credentials

---

## US-HRM-007 — Leave: Approve or Reject Leave Requests

- **Story ID**: US-HRM-007
- **Epic**: Leave Management
- **Priority**: High
- **Estimation**: 5 story points

### Description
As an Admin / Manager,
I want to review and approve or reject employee leave requests,
so that leave balances are accurately tracked and team availability is properly managed.

### Acceptance Criteria
- Manager/Admin can navigate to Leave > Leave List
- User can filter leave requests by date range, employee name, or leave status
- User can select one or multiple leave requests and click "Approve" or "Reject"
- System updates the leave status and automatically adjusts the employee's leave balance
- An audit trail (history/comment) is recorded for the approval/rejection action taken

---

## US-HRM-008 — Time: Submit Weekly Timesheet

- **Story ID**: US-HRM-008
- **Epic**: Time Management
- **Priority**: Medium
- **Estimation**: 4 story points

### Description
As an Employee,
I want to log my daily working hours and submit my weekly timesheet,
so that my time tracking is accurately recorded for payroll and project billing.

### Acceptance Criteria
- Employee can navigate to Time > Timesheets > My Timesheets
- Employee can select a specific week and add time against assigned projects
- System validates that total hours do not exceed 24 hours per day
- Employee can save the timesheet as "Draft" or submit it for approval
- Submitted timesheet status changes to "Submitted" and becomes read-only (cannot be edited without a recall action)

---

## US-HRM-009 — Recruitment: Add a New Vacancy

- **Story ID**: US-HRM-009
- **Epic**: Recruitment
- **Priority**: Medium
- **Estimation**: 4 story points

### Description
As an HR Admin / Hiring Manager,
I want to create a new job vacancy,
so that I can start sourcing and tracking candidates for open positions.

### Acceptance Criteria
- User can navigate to Recruitment > Vacancies
- User can fill in Vacancy Name, Job Title, Hiring Manager, Description, and Number of Positions
- System validates that Vacancy Name and Job Title are mandatory fields
- Vacancy is saved and appears in the active vacancies list
- User can toggle the "Published" status to make the vacancy visible to external candidates

---

## US-HRM-010 — Claims: Submit an Expense Claim

- **Story ID**: US-HRM-010
- **Epic**: Claim Management
- **Priority**: Low
- **Estimation**: 3 story points

### Description
As an Employee,
I want to submit an expense claim for business-related expenses,
so that I can be reimbursed by the company in the next payroll cycle.

### Acceptance Criteria
- Employee can navigate to Claim > Submit Claim
- Employee can select an expense type, enter the amount, date, and add a descriptive note
- Employee can optionally attach a receipt (image/PDF) as proof of expense
- System validates that the amount is greater than zero and the date is not in the future
- Claim is successfully submitted and its status is set to "Initiated" or "Submitted" for manager approval
