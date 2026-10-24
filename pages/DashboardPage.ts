import { Page, Locator } from '@playwright/test';

export class DashboardPage {
    private readonly page: Page;

    // Locators
    private readonly dashboardHeading: Locator;
    private readonly userProfileDropdown: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators - verified from live OrangeHRM application
        this.dashboardHeading = page.locator('h6.oxd-text').filter({ hasText: 'Dashboard' });
        this.userProfileDropdown = page.locator('.oxd-userdropdown-tab');
    }

    /**
     * Checks whether the Dashboard page is displayed after a successful login.
     * @returns true if the Dashboard heading is visible
     */
    async isDashboardPageDisplayed(): Promise<boolean> {
        try {
            await this.dashboardHeading.waitFor({ state: 'visible', timeout: 10000 });
            return await this.dashboardHeading.isVisible();
        } catch (error) {
            console.log(`Error checking dashboard page: ${error}`);
            return false;
        }
    }

    /**
     * Gets the page URL to verify navigation after login.
     * @returns Current page URL
     */
    async getCurrentUrl(): Promise<string> {
        return this.page.url();
    }
}
