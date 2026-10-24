import { Page, Locator } from '@playwright/test';

/**
 * Page Object for Claim > Submit Claim in OrangeHRM
 * Covers: US-HRM-010 (TC-HRM-032 through TC-HRM-037)
 */
export class ClaimPage {
    private readonly page: Page;

    // Navigation
    private readonly claimMenuLink: Locator;
    private readonly submitClaimNav: Locator;

    // Form Locators
    private readonly eventDropdown: Locator;
    private readonly currencyDropdown: Locator;
    private readonly remarksTextarea: Locator;
    private readonly btnCreate: Locator;
    private readonly toastMessage: Locator;
    private readonly fieldErrors: Locator;

    constructor(page: Page) {
        this.page = page;

        this.claimMenuLink = page.getByRole('link', { name: 'Claim' });
        this.submitClaimNav = page.getByRole('link', { name: 'Submit Claim' });

        this.eventDropdown = page.locator('.oxd-input-group').filter({ hasText: 'Event' }).locator('.oxd-select-text');
        this.currencyDropdown = page.locator('.oxd-input-group').filter({ hasText: 'Currency' }).locator('.oxd-select-text');
        this.remarksTextarea = page.locator('textarea');
        this.btnCreate = page.getByRole('button', { name: 'Create' });

        this.toastMessage = page.locator('.oxd-toast-content-text');
        this.fieldErrors = page.locator('.oxd-input-field-error-message');
    }

    /**
     * Navigates to Claim > Submit Claim.
     */
    async navigateToSubmitClaim(): Promise<void> {
        await this.claimMenuLink.click();
        await this.page.waitForURL(/.*claim.*/, { timeout: 15000 });
        const submitLink = this.page.getByRole('link', { name: 'Submit Claim' });
        await submitLink.waitFor({ state: 'visible', timeout: 10000 });
        await submitLink.click();
        await this.page.waitForURL(/.*submitClaim.*/, { timeout: 15000 });
    }

    /**
     * Checks if Submit Claim form is displayed.
     */
    async isSubmitClaimFormDisplayed(): Promise<boolean> {
        try {
            await this.btnCreate.waitFor({ state: 'visible', timeout: 10000 });
            return await this.btnCreate.isVisible();
        } catch {
            return false;
        }
    }

    /**
     * Clicks Create button.
     */
    async clickCreate(): Promise<void> {
        await this.btnCreate.click();
    }

    /**
     * Returns true if required field error is displayed.
     */
    async areRequiredErrorsVisible(): Promise<boolean> {
        await this.fieldErrors.first().waitFor({ state: 'visible', timeout: 5000 });
        return (await this.fieldErrors.count()) > 0;
    }
}
