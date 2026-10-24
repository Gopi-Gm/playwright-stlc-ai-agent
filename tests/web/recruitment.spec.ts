/**
 * Test Suite: Recruitment Vacancy Management
 *
 * User Story: US-HRM-009 — Recruitment: Add a New Vacancy
 * Tags: @master @sanity @regression @web
 *
 * Test Cases:
 * TC-HRM-027 — Create a New Vacancy with All Valid Details
 * TC-HRM-029 — Leave Mandatory Fields Blank
 */

import { test, expect } from '../../fixtures/pageFixtures';
import { Helper } from '../../utils/helper';

async function loginAsAdmin(loginPage: any, dashboardPage: any): Promise<void> {
    const { username, password } = Helper.getLoginDetails();
    await loginPage.login(username, password);
    const isDashboard = await dashboardPage.isDashboardPageDisplayed();
    expect(isDashboard).toBeTruthy();
}

// ─────────────────────────────────────────────────────────────────────────────
// TC-HRM-029 — Leave Mandatory Fields Blank
// ─────────────────────────────────────────────────────────────────────────────
test('TC-HRM-029 — Leave Mandatory Fields Blank in Add Vacancy @master @regression @web',
    async ({ loginPage, dashboardPage, recruitmentPage }) => {

    // TC-HRM-029
    await test.step('1) Log in as Admin', async () => {
        await loginAsAdmin(loginPage, dashboardPage);
    });

    await test.step('2) Navigate to Recruitment > Vacancies and click Add', async () => {
        await recruitmentPage.navigateToVacancies();
        await recruitmentPage.clickAddVacancy();
    });

    await test.step('3) Click Save with blank form', async () => {
        await recruitmentPage.clickSave();
    });

    await test.step('4) Verify required field validation errors appear', async () => {
        const hasErrors = await recruitmentPage.areRequiredErrorsVisible();
        expect(hasErrors).toBeTruthy();
    });

    console.log('✅ TC-HRM-029 — Leave Mandatory Fields Blank: PASSED');
});
