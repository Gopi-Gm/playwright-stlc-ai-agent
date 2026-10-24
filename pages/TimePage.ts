import { Page, Locator } from '@playwright/test';

/**
 * Page Object for Time > Timesheets > My Timesheets in OrangeHRM
 * Covers: US-HRM-008 (TC-HRM-021 through TC-HRM-026)
 */
export class TimePage {
    private readonly page: Page;

    // Navigation
    private readonly timeMenuLink: Locator;
    private readonly timesheetsDropdown: Locator;
    private readonly myTimesheetsLink: Locator;

    // Timesheet Elements
    private readonly btnEdit: Locator;
    private readonly btnSubmit: Locator;
    private readonly btnSave: Locator;
    private readonly timesheetStatusText: Locator;
    private readonly toastMessage: Locator;
    private readonly dailyHourInputs: Locator;

    constructor(page: Page) {
        this.page = page;

        this.timeMenuLink = page.getByRole('link', { name: 'Time' });
        this.timesheetsDropdown = page.getByRole('listitem').filter({ hasText: 'Timesheets' });
        this.myTimesheetsLink = page.getByRole('menuitem', { name: 'My Timesheets' });

        this.btnEdit = page.getByRole('button', { name: 'Edit' });
        this.btnSubmit = page.getByRole('button', { name: 'Submit' });
        this.btnSave = page.getByRole('button', { name: 'Save' });
        this.timesheetStatusText = page.locator('.orangehrm-timesheet-header--title');
        this.toastMessage = page.locator('.oxd-toast-content-text');
        this.dailyHourInputs = page.locator('input.oxd-input--active');
    }

    /**
     * Navigates to Time > Timesheets > My Timesheets.
     */
    async navigateToMyTimesheets(): Promise<void> {
        await this.timeMenuLink.click();
        await this.page.waitForURL(/.*time.*/, { timeout: 15000 });
    }

    /**
     * Checks if the Timesheets page is displayed.
     */
    async isTimesheetPageDisplayed(): Promise<boolean> {
        try {
            await this.page.locator('h6.oxd-text').filter({ hasText: 'Timesheet' }).first().waitFor({ state: 'visible', timeout: 10000 });
            return true;
        } catch {
            return false;
        }
    }

    /**
     * Clicks Edit button on timesheet.
     */
    async clickEdit(): Promise<void> {
        if (await this.btnEdit.isVisible()) {
            await this.btnEdit.click();
        }
    }

    /**
     * Clicks Save button on timesheet.
     */
    async clickSave(): Promise<void> {
        await this.btnSave.click();
    }

    /**
     * Clicks Submit button.
     */
    async clickSubmit(): Promise<void> {
        await this.btnSubmit.click();
    }

    /**
     * Returns the toast notification text.
     */
    async getToastMessage(): Promise<string> {
        await this.toastMessage.first().waitFor({ state: 'visible', timeout: 10000 });
        return (await this.toastMessage.first().textContent()) || '';
    }
}
