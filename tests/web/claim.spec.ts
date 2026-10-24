/**
 * Test Suite: Claim Management
 *
 * User Story: US-HRM-010 — Claims: Submit an Expense Claim
 * Tags: @master @sanity @regression @web
 *
 * Test Cases:
 * TC-HRM-036 — Submit Claim with Empty Mandatory Fields
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
// TC-HRM-036 — Submit Claim with Empty Mandatory Fields
// ─────────────────────────────────────────────────────────────────────────────
test('TC-HRM-036 — Submit Claim with Empty Mandatory Fields @master @regression @web',
    async ({ loginPage, dashboardPage, claimPage }) => {

    // TC-HRM-036
    await test.step('1) Log in as Admin', async () => {
        await loginAsAdmin(loginPage, dashboardPage);
    });

    await test.step('2) Navigate to Claim > Submit Claim', async () => {
        await claimPage.navigateToSubmitClaim();
    });

    await test.step('3) Click Create with empty mandatory fields', async () => {
        await claimPage.clickCreate();
    });

    await test.step('4) Verify required field validation errors appear', async () => {
        const hasErrors = await claimPage.areRequiredErrorsVisible();
        expect(hasErrors).toBeTruthy();
    });

    console.log('✅ TC-HRM-036 — Submit Claim with Empty Mandatory Fields: PASSED');
});
