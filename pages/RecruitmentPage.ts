import { Page, Locator } from '@playwright/test';

/**
 * Page Object for Recruitment > Vacancies in OrangeHRM
 * Covers: US-HRM-009 (TC-HRM-027 through TC-HRM-031)
 */
export class RecruitmentPage {
    private readonly page: Page;

    // Navigation
    private readonly recruitmentMenuLink: Locator;
    private readonly vacanciesTopNav: Locator;
    private readonly btnAddVacancy: Locator;

    // Add Vacancy Form
    private readonly vacancyNameInput: Locator;
    private readonly jobTitleDropdown: Locator;
    private readonly hiringManagerInput: Locator;
    private readonly positionsInput: Locator;
    private readonly descriptionTextarea: Locator;
    private readonly publishedSwitch: Locator;
    private readonly btnSave: Locator;

    // Validation & Table
    private readonly toastMessage: Locator;
    private readonly fieldErrors: Locator;
    private readonly vacanciesTable: Locator;

    constructor(page: Page) {
        this.page = page;

        this.recruitmentMenuLink = page.getByRole('link', { name: 'Recruitment' });
        this.vacanciesTopNav = page.getByRole('link', { name: 'Vacancies' });
        this.btnAddVacancy = page.getByRole('button', { name: 'Add' });

        this.vacancyNameInput = page.locator('.oxd-input-group').filter({ hasText: 'Vacancy Name' }).locator('input');
        this.jobTitleDropdown = page.locator('.oxd-input-group').filter({ hasText: 'Job Title' }).locator('.oxd-select-text');
        this.hiringManagerInput = page.getByPlaceholder('Type for hints...');
        this.positionsInput = page.locator('.oxd-input-group').filter({ hasText: 'Number of Positions' }).locator('input');
        this.descriptionTextarea = page.locator('textarea');
        this.publishedSwitch = page.locator('.oxd-switch-input');
        this.btnSave = page.getByRole('button', { name: 'Save' });

        this.toastMessage = page.locator('.oxd-toast-content-text');
        this.fieldErrors = page.locator('.oxd-input-field-error-message');
        this.vacanciesTable = page.locator('.oxd-table-body');
    }

    /**
     * Navigates to Recruitment > Vacancies.
     */
    async navigateToVacancies(): Promise<void> {
        await this.recruitmentMenuLink.click();
        await this.page.waitForURL(/.*recruitment.*/, { timeout: 15000 });
        const vacanciesLink = this.page.getByRole('link', { name: 'Vacancies' });
        await vacanciesLink.waitFor({ state: 'visible', timeout: 10000 });
        await vacanciesLink.click();
        await this.page.waitForURL(/.*viewJobVacancy.*/, { timeout: 15000 });
    }

    /**
     * Clicks + Add button to open Add Vacancy form.
     */
    async clickAddVacancy(): Promise<void> {
        await this.btnAddVacancy.click();
        await this.page.waitForURL(/.*addJobVacancy.*/, { timeout: 15000 });
    }

    /**
     * Enters vacancy name.
     */
    async enterVacancyName(name: string): Promise<void> {
        await this.vacancyNameInput.fill(name);
    }

    /**
     * Selects job title from dropdown.
     */
    async selectJobTitle(title: string): Promise<void> {
        await this.jobTitleDropdown.click();
        const option = this.page.getByRole('option', { name: title }).first();
        await option.waitFor({ state: 'visible', timeout: 5000 });
        await option.click();
    }

    /**
     * Selects hiring manager by typing hint and picking first suggestion.
     */
    async selectHiringManager(managerHint: string): Promise<void> {
        await this.hiringManagerInput.fill(managerHint);
        const suggestion = this.page.locator('.oxd-autocomplete-dropdown .oxd-autocomplete-option').first();
        await suggestion.waitFor({ state: 'visible', timeout: 8000 });
        await suggestion.click();
    }

    /**
     * Enters number of positions.
     */
    async enterPositions(positions: string): Promise<void> {
        await this.positionsInput.fill(positions);
    }

    /**
     * Enters description.
     */
    async enterDescription(desc: string): Promise<void> {
        await this.descriptionTextarea.fill(desc);
    }

    /**
     * Clicks Save button.
     */
    async clickSave(): Promise<void> {
        await this.btnSave.click();
    }

    /**
     * Returns toast message text.
     */
    async getToastMessage(): Promise<string> {
        await this.toastMessage.first().waitFor({ state: 'visible', timeout: 10000 });
        return (await this.toastMessage.first().textContent()) || '';
    }

    /**
     * Returns true if required field error is displayed.
     */
    async areRequiredErrorsVisible(): Promise<boolean> {
        await this.fieldErrors.first().waitFor({ state: 'visible', timeout: 5000 });
        return (await this.fieldErrors.count()) > 0;
    }
}
