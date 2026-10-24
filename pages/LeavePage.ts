import { Page, Locator } from '@playwright/test';

/**
 * Page Object for Leave > Leave List in OrangeHRM
 * Covers: US-HRM-007 (TC-HRM-014 through TC-HRM-020)
 */
export class LeavePage {
    private readonly page: Page;

    // Navigation
    private readonly leaveMenuLink: Locator;
    private readonly leaveListTopNav: Locator;

    // Filter Form Locators
    private readonly fromDateInput: Locator;
    private readonly toDateInput: Locator;
    private readonly employeeNameInput: Locator;
    private readonly btnSearch: Locator;
    private readonly btnReset: Locator;
    private readonly statusFilterDropdown: Locator;

    // Table & Actions
    private readonly leaveTable: Locator;
    private readonly tableRows: Locator;
    private readonly btnApproveFirst: Locator;
    private readonly btnRejectFirst: Locator;
    private readonly toastMessage: Locator;
    private readonly noRecordsFoundText: Locator;

    constructor(page: Page) {
        this.page = page;

        this.leaveMenuLink = page.getByRole('link', { name: 'Leave' });
        this.leaveListTopNav = page.getByRole('listitem').filter({ hasText: 'Leave List' });

        this.fromDateInput = page.locator('.oxd-input-group').filter({ hasText: 'From Date' }).locator('input');
        this.toDateInput = page.locator('.oxd-input-group').filter({ hasText: 'To Date' }).locator('input');
        this.employeeNameInput = page.getByPlaceholder('Type for hints...');
        this.statusFilterDropdown = page.locator('.oxd-select-wrapper');

        this.btnSearch = page.getByRole('button', { name: 'Search' });
        this.btnReset = page.getByRole('button', { name: 'Reset' });

        this.leaveTable = page.locator('.oxd-table-body');
        this.tableRows = page.locator('.oxd-table-card');
        this.btnApproveFirst = page.getByRole('button', { name: 'Approve' }).first();
        this.btnRejectFirst = page.getByRole('button', { name: 'Reject' }).first();
        this.toastMessage = page.locator('.oxd-toast-content-text');
        this.noRecordsFoundText = page.getByText(/No Records Found/i);
    }

    /**
     * Navigates to Leave > Leave List page.
     */
    async navigateToLeaveList(): Promise<void> {
        await this.leaveMenuLink.click();
        await this.page.waitForURL(/.*viewLeaveList/, { timeout: 15000 });
    }

    /**
     * Sets the From Date filter.
     */
    async setFromDate(date: string): Promise<void> {
        await this.fromDateInput.fill(date);
    }

    /**
     * Sets the To Date filter.
     */
    async setToDate(date: string): Promise<void> {
        await this.toDateInput.fill(date);
    }

    /**
     * Enters employee name in the search filter.
     */
    async enterEmployeeName(name: string): Promise<void> {
        await this.employeeNameInput.fill(name);
    }

    /**
     * Clicks the Search button on the leave filter.
     */
    async clickSearch(): Promise<void> {
        await this.btnSearch.click();
    }

    /**
     * Clicks the Reset button to clear filters.
     */
    async clickReset(): Promise<void> {
        await this.btnReset.click();
    }

    /**
     * Returns whether the Leave List page table is loaded.
     */
    async isLeaveListDisplayed(): Promise<boolean> {
        try {
            await this.btnSearch.waitFor({ state: 'visible', timeout: 10000 });
            return await this.btnSearch.isVisible();
        } catch {
            return false;
        }
    }

    /**
     * Checks if "No Records Found" message or table records are displayed.
     */
    async hasRecordsOrEmptyMessage(): Promise<boolean> {
        try {
            const hasRows = (await this.tableRows.count()) > 0;
            const hasEmptyMessage = await this.noRecordsFoundText.isVisible();
            return hasRows || hasEmptyMessage;
        } catch {
            return false;
        }
    }

    /**
     * Gets validation error for date filter (e.g. To date before from date).
     */
    async getDateValidationError(): Promise<string> {
        const error = this.page.locator('.oxd-input-group').filter({ hasText: 'To Date' }).locator('.oxd-input-field-error-message');
        await error.waitFor({ state: 'visible', timeout: 5000 });
        return (await error.textContent()) || '';
    }

    /**
     * Returns the toast notification text.
     */
    async getToastMessage(): Promise<string> {
        await this.toastMessage.first().waitFor({ state: 'visible', timeout: 10000 });
        return (await this.toastMessage.first().textContent()) || '';
    }
}
