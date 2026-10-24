# User Stories: OrangeHRM Application

---

## US-HRM-001 — Automate Login Flow

- **Story ID**: US-HRM-001
- **Epic**: Authentication & Authorization
- **Priority**: High
- **Estimation**: 3 story points

### Description
As an automated QA Engineer / System,
I want to automate the OrangeHRM application login flow,
so that I can efficiently execute regression suites and verify authentication stability without manual intervention.

### Acceptance Criteria
- User can log in with valid credentials (Admin / admin123)
- User sees an error message with invalid credentials
- User is redirected to the Dashboard after a successful login
- Login page displays username and password fields and a Login button

---

## US-HRM-002 — Employee Management: Add New Employee

- **Story ID**: US-HRM-002
- **Epic**: Employee Management (PIM)
- **Priority**: High
- **Estimation**: 5 story points

### Description
As an HR Admin,
I want to add a new employee to the system,
so that I can maintain an up-to-date employee directory.

### Acceptance Criteria
- Admin can navigate to PIM > Add Employee
- Admin can fill in First Name, Last Name, and Employee ID
- Admin can optionally upload a profile photo
- System saves the employee and redirects to the employee profile page
- Duplicate Employee ID should show a validation error

---

## US-HRM-003 — Leave Management: Apply for Leave

- **Story ID**: US-HRM-003
- **Epic**: Leave Management
- **Priority**: Medium
- **Estimation**: 4 story points

### Description
As an Employee,
I want to apply for leave from the Leave module,
so that my manager is notified and can approve or reject my request.

### Acceptance Criteria
- Employee can navigate to Leave > Apply
- Employee can select leave type, from date, to date, and add a comment
- System validates that the to-date is not before the from-date
- System shows an error if the employee has insufficient leave balance
- Submitted leave request appears under My Leave with status "Pending Approval"

---

## US-HRM-004 — My Info: Update Personal Details

- **Story ID**: US-HRM-004
- **Epic**: Employee Self-Service
- **Priority**: Medium
- **Estimation**: 3 story points

### Description
As an Employee,
I want to update my personal information (e.g., contact details, date of birth),
so that the HR system always has my current and accurate information.

### Acceptance Criteria
- Employee can navigate to My Info > Personal Details
- Employee can update fields: Nationality, Date of Birth, Gender, Marital Status
- Changes are saved successfully with a confirmation toast message
- Mandatory fields cannot be left blank

---

## US-HRM-005 — Search Employee

- **Story ID**: US-HRM-005
- **Epic**: Employee Management (PIM)
- **Priority**: Low
- **Estimation**: 2 story points

### Description
As an HR Admin,
I want to search for an employee by name or employee ID,
so that I can quickly access their profile without scrolling through the full list.

### Acceptance Criteria
- Admin can navigate to PIM > Employee List
- Admin can search by Employee Name or Employee ID
- Results are filtered in real-time as the user types
- Clicking on a search result navigates to that employee's profile
- No results found message is displayed when the search yields nothing
