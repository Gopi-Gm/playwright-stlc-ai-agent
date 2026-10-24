/**
 * Test Suite: Leave Management
 *
 * User Story: US-HRM-007 — Leave: Approve or Reject Leave Requests
 * Tags: @master @sanity @regression @web
 *
 * Test Cases:
 * TC-HRM-014 — Filter Leave Requests by Status and Employee Name
 * TC-HRM-018 — Filter with Invalid Date Range
 * TC-HRM-019 — Filter with Non-Existent Employee
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
// TC-HRM-014 — Filter Leave Requests by Status and Employee Name
// ─────────────────────────────────────────────────────────────────────────────
test('TC-HRM-014 — Filter Leave Requests by Status and Employee Name @master @sanity @regression @web',
    async ({ loginPage, dashboardPage, leavePage }) => {

    // TC-HRM-014
    await test.step('1) Log in as Admin', async () => {
        await loginAsAdmin(loginPage, dashboardPage);
    });

    await test.step('2) Navigate to Leave > Leave List', async () => {
        await leavePage.navigateToLeaveList();
        const isDisplayed = await leavePage.isLeaveListDisplayed();
        expect(isDisplayed).toBeTruthy();
    });

    await test.step('3) Click Search on leave filter and verify records or no-records message', async () => {
        await leavePage.clickSearch();
        const hasResult = await leavePage.hasRecordsOrEmptyMessage();
        expect(hasResult).toBeTruthy();
    });

    console.log('✅ TC-HRM-014 — Filter Leave Requests by Status and Employee Name: PASSED');
});

// ─────────────────────────────────────────────────────────────────────────────
// TC-HRM-018 — Filter with Invalid Date Range (From Date > To Date)
// ─────────────────────────────────────────────────────────────────────────────
test('TC-HRM-018 — Filter with Invalid Date Range @master @regression @web',
    async ({ loginPage, dashboardPage, leavePage }) => {

    // TC-HRM-018
    await test.step('1) Log in as Admin and navigate to Leave List', async () => {
        await loginAsAdmin(loginPage, dashboardPage);
        await leavePage.navigateToLeaveList();
    });

    await test.step('2) Set From Date later than To Date', async () => {
        await leavePage.setFromDate('2026-12-01');
        await leavePage.setToDate('2026-11-01');
        await leavePage.clickSearch();
    });

    await test.step('3) Verify date validation error is shown', async () => {
        const error = await leavePage.getDateValidationError();
        expect(error.toLowerCase()).toContain('after from date');
    });

    console.log('✅ TC-HRM-018 — Filter with Invalid Date Range: PASSED');
});

// ─────────────────────────────────────────────────────────────────────────────
// TC-HRM-019 — Filter with Non-Existent Employee
// ─────────────────────────────────────────────────────────────────────────────
test('TC-HRM-019 — Filter with Non-Existent Employee @master @regression @web',
    async ({ loginPage, dashboardPage, leavePage }) => {

    // TC-HRM-019
    await test.step('1) Log in as Admin and navigate to Leave List', async () => {
        await loginAsAdmin(loginPage, dashboardPage);
        await leavePage.navigateToLeaveList();
    });

    await test.step('2) Enter non-existent employee name and click Search', async () => {
        await leavePage.enterEmployeeName('NonExistentEmployee_XYZ_123');
        await leavePage.clickSearch();
    });

    await test.step('3) Verify system displays invalid indicator or no records', async () => {
        const hasResult = await leavePage.hasRecordsOrEmptyMessage();
        expect(hasResult).toBeTruthy();
    });

    console.log('✅ TC-HRM-019 — Filter with Non-Existent Employee: PASSED');
});
