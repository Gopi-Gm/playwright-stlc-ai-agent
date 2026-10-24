import { Page, Locator } from '@playwright/test';

/**
 * Page Object for Admin > User Management and Add User in OrangeHRM
 * Covers: US-HRM-006 (TC-HRM-007 through TC-HRM-013)
 */
export class AdminUserPage {
    private readonly page: Page;

    // Sidebar & Navigation
    private readonly adminMenuLink: Locator;
    private readonly btnAddUser: Locator;
    private readonly userManagementNav: Locator;

    // Add User Form Locators
    private readonly userRoleDropdown: Locator;
    private readonly employeeNameInput: Locator;
    private readonly statusDropdown: Locator;
    private readonly usernameInput: Locator;
    private readonly passwordInput: Locator;
    private readonly confirmPasswordInput: Locator;
    private readonly btnSave: Locator;
    private readonly btnCancel: Locator;

    // Notifications & Validation
    private readonly toastMessage: Locator;
    private readonly fieldErrorMessages: Locator;
    private readonly usersTable: Locator;

    constructor(page: Page) {
        this.page = page;

        // Navigation
        this.adminMenuLink = page.getByRole('link', { name: 'Admin' });
        this.userManagementNav = page.getByRole('listitem').filter({ hasText: 'User Management' });
        this.btnAddUser = page.getByRole('button', { name: 'Add' });

        // Add User Form Fields
        this.userRoleDropdown = page.locator('.oxd-input-group').filter({ hasText: 'User Role' }).locator('.oxd-select-text');
        this.employeeNameInput = page.getByPlaceholder('Type for hints...');
        this.statusDropdown = page.locator('.oxd-input-group').filter({ hasText: 'Status' }).locator('.oxd-select-text');
        this.usernameInput = page.locator('.oxd-input-group').filter({ hasText: 'Username' }).locator('input');
        this.passwordInput = page.locator('.oxd-input-group').filter({ hasText: 'Password' }).filter({ hasNotText: 'Confirm' }).locator('input[type="password"]');
        this.confirmPasswordInput = page.locator('.oxd-input-group').filter({ hasText: 'Confirm Password' }).locator('input[type="password"]');

        this.btnSave = page.getByRole('button', { name: 'Save' });
        this.btnCancel = page.getByRole('button', { name: 'Cancel' });

        // Toast & Table
        this.toastMessage = page.locator('.oxd-toast-content-text');
        this.fieldErrorMessages = page.locator('.oxd-input-field-error-message');
        this.usersTable = page.locator('.oxd-table-body');
    }

    /**
     * Navigates to the Admin > User Management > Users page.
     */
    async navigateToUserManagement(): Promise<void> {
        await this.adminMenuLink.click();
        await this.page.waitForURL(/.*viewSystemUsers/, { timeout: 15000 });
    }

    /**
     * Clicks the + Add button to open the Add User page.
     */
    async clickAddUser(): Promise<void> {
        await this.btnAddUser.click();
        await this.page.waitForURL(/.*saveSystemUser/, { timeout: 15000 });
    }

    /**
     * Selects a user role from the User Role dropdown (e.g. 'Admin' or 'ESS').
     * @param role - 'Admin' or 'ESS'
     */
    async selectUserRole(role: 'Admin' | 'ESS'): Promise<void> {
        await this.userRoleDropdown.click();
        const option = this.page.getByRole('option', { name: role, exact: true });
        await option.waitFor({ state: 'visible', timeout: 5000 });
        await option.click();
    }

    /**
     * Types and selects an employee from the auto-complete dropdown.
     * @param employeeHint - Characters of employee name
     */
    async selectEmployeeName(employeeHint: string = 'Amelia'): Promise<void> {
        await this.employeeNameInput.click();
        await this.employeeNameInput.fill('');
        await this.employeeNameInput.pressSequentially(employeeHint, { delay: 100 });
        const option = this.page.locator('.oxd-autocomplete-dropdown .oxd-autocomplete-option').filter({ hasText: 'Amelia' }).first();
        await option.waitFor({ state: 'visible', timeout: 10000 });
        await option.click();
    }

    /**
     * Selects status from the Status dropdown ('Enabled' or 'Disabled').
     * @param status - 'Enabled' or 'Disabled'
     */
    async selectStatus(status: 'Enabled' | 'Disabled'): Promise<void> {
        await this.statusDropdown.click();
        const option = this.page.getByRole('option', { name: status, exact: true });
        await option.waitFor({ state: 'visible', timeout: 5000 });
        await option.click();
    }

    /**
     * Enters username in the Username field.
     * @param username - Username to create
     */
    async enterUsername(username: string): Promise<void> {
        await this.usernameInput.fill(username);
    }

    /**
     * Enters password in the Password field.
     * @param password - Password
     */
    async enterPassword(password: string): Promise<void> {
        await this.passwordInput.fill(password);
    }

    /**
     * Enters matching password in the Confirm Password field.
     * @param confirmPassword - Confirmation password
     */
    async enterConfirmPassword(confirmPassword: string): Promise<void> {
        await this.confirmPasswordInput.fill(confirmPassword);
    }

    /**
     * Clicks the Save button.
     */
    async clickSave(): Promise<void> {
        await this.btnSave.click();
    }

    /**
     * Clicks the Cancel button.
     */
    async clickCancel(): Promise<void> {
        await this.btnCancel.click();
    }

    /**
     * Performs full form completion to create a system user.
     */
    async fillUserForm(details: {
        role: 'Admin' | 'ESS';
        employeeHint: string;
        status: 'Enabled' | 'Disabled';
        username: string;
        password: string;
        confirmPassword?: string;
    }): Promise<void> {
        await this.selectUserRole(details.role);
        await this.selectEmployeeName(details.employeeHint);
        await this.selectStatus(details.status);
        await this.enterUsername(details.username);
        await this.enterPassword(details.password);
        await this.enterConfirmPassword(details.confirmPassword ?? details.password);
    }

    /**
     * Returns the toast message notification text.
     */
    async getToastMessage(): Promise<string> {
        await this.toastMessage.first().waitFor({ state: 'visible', timeout: 10000 });
        return (await this.toastMessage.first().textContent()) || '';
    }

    /**
     * Returns field validation error message by field label name.
     * @param fieldLabel - e.g. 'Username', 'Confirm Password', 'User Role'
     */
    async getFieldError(fieldLabel: string): Promise<string> {
        const fieldGroup = this.page.locator('.oxd-input-group').filter({ hasText: fieldLabel });
        const error = fieldGroup.locator('.oxd-input-field-error-message');
        await error.waitFor({ state: 'visible', timeout: 5000 });
        return (await error.textContent()) || '';
    }

    /**
     * Checks if at least one 'Required' validation error is visible on the form.
     */
    async areRequiredErrorsVisible(): Promise<boolean> {
        await this.fieldErrorMessages.first().waitFor({ state: 'visible', timeout: 5000 });
        return (await this.fieldErrorMessages.count()) > 0;
    }

    /**
     * Checks if a user is listed in the System Users table.
     * @param username - Username to verify
     */
    async isUserInTable(username: string): Promise<boolean> {
        try {
            await this.usersTable.waitFor({ state: 'visible', timeout: 10000 });
            const cell = this.page.locator('.oxd-table-card').filter({ hasText: username });
            return await cell.first().isVisible();
        } catch {
            return false;
        }
    }
}
