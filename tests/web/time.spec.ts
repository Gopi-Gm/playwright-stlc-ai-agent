/**
 * Test Suite: Time Management
 *
 * User Story: US-HRM-008 — Time: Submit Weekly Timesheet
 * Tags: @master @sanity @regression @web
 *
 * Test Cases:
 * TC-HRM-021 — Log Working Hours Against Project and View Timesheet
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
// TC-HRM-021 — Navigate to My Timesheets and Verify Page Elements
// ─────────────────────────────────────────────────────────────────────────────
test('TC-HRM-021 — Navigate to My Timesheets and Verify Page Elements @master @sanity @regression @web',
    async ({ loginPage, dashboardPage, timePage }) => {

    // TC-HRM-021
    await test.step('1) Log in as Admin', async () => {
        await loginAsAdmin(loginPage, dashboardPage);
    });

    await test.step('2) Navigate to Time module', async () => {
        await timePage.navigateToMyTimesheets();
    });

    await test.step('3) Verify timesheet view is displayed', async () => {
        const isDisplayed = await timePage.isTimesheetPageDisplayed();
        expect(isDisplayed).toBeTruthy();
    });

    console.log('✅ TC-HRM-021 — Navigate to My Timesheets and Verify Page Elements: PASSED');
});
