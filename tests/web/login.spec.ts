/**
 * Test Suite: OrangeHRM Login Flow
 *
 * User Story: US-HRM-001 — Automate Login Flow
 * Tags: @master @sanity @regression @web
 *
 * Test Cases:
 * TC-HRM-001 — Valid Login with Correct Credentials
 * TC-HRM-002 — Login Page Displays Required Fields
 * TC-HRM-003 — Login with Invalid Credentials
 * TC-HRM-004 — Login with Invalid Password Only
 * TC-HRM-005 — Login with Empty Credentials
 * TC-HRM-006 — Password Field Masks Input
 */

// Import from custom fixtures — never from @playwright/test directly
import { test, expect } from '../../fixtures/pageFixtures';
import { Helper } from '../../utils/helper';

// ─────────────────────────────────────────────────────────────────────────────
// TC-HRM-001 — Valid Login with Correct Credentials (AC-01, AC-03)
// ─────────────────────────────────────────────────────────────────────────────

test('TC-HRM-001 — Valid Login with Correct Credentials @master @sanity @regression @web',
    async ({ loginPage, dashboardPage }) => {

    // TC-HRM-001
    const { username, password } = Helper.getLoginDetails();

    await test.step('1) Verify login page is displayed', async () => {
        const isDisplayed = await loginPage.isLoginPageDisplayed();
        expect(isDisplayed).toBeTruthy();
    });

    await test.step('2) Enter valid credentials and click Login', async () => {
        await loginPage.login(username, password);
    });

    await test.step('3) Verify user is redirected to the Dashboard', async () => {
        const isDashboard = await dashboardPage.isDashboardPageDisplayed();
        expect(isDashboard).toBeTruthy();
    });

    await test.step('4) Verify the Dashboard URL', async () => {
        const currentUrl = await dashboardPage.getCurrentUrl();
        expect(currentUrl).toContain('/dashboard/index');
    });

    console.log('✅ TC-HRM-001 — Valid Login with Correct Credentials: PASSED');
});

// ─────────────────────────────────────────────────────────────────────────────
// TC-HRM-002 — Login Page Displays Required Fields (AC-04)
// ─────────────────────────────────────────────────────────────────────────────

test('TC-HRM-002 — Login Page Displays Required Fields @master @regression @web',
    async ({ loginPage }) => {

    // TC-HRM-002

    await test.step('1) Verify Username field is present and visible', async () => {
        const isUsernameVisible = await loginPage.isUsernameFieldVisible();
        expect(isUsernameVisible).toBeTruthy();
    });

    await test.step('2) Verify Password field is present and visible', async () => {
        const isPasswordVisible = await loginPage.isPasswordFieldVisible();
        expect(isPasswordVisible).toBeTruthy();
    });

    await test.step('3) Verify Login button is present and visible', async () => {
        const isLoginBtnVisible = await loginPage.isLoginButtonVisible();
        expect(isLoginBtnVisible).toBeTruthy();
    });

    console.log('✅ TC-HRM-002 — Login Page Displays Required Fields: PASSED');
});

// ─────────────────────────────────────────────────────────────────────────────
// TC-HRM-003 — Login with Invalid Credentials (AC-02)
// ─────────────────────────────────────────────────────────────────────────────

test('TC-HRM-003 — Login with Invalid Credentials @master @sanity @regression @web',
    async ({ loginPage }) => {

    // TC-HRM-003

    await test.step('1) Enter invalid username and invalid password', async () => {
        await loginPage.login('wronguser', 'wrongpass');
    });

    await test.step('2) Verify error message is displayed', async () => {
        const errorMessage = await loginPage.getErrorMessage();
        expect(errorMessage).toContain('Invalid credentials');
    });

    await test.step('3) Verify user remains on the login page', async () => {
        const isStillOnLogin = await loginPage.isLoginPageDisplayed();
        expect(isStillOnLogin).toBeTruthy();
    });

    console.log('✅ TC-HRM-003 — Login with Invalid Credentials: PASSED');
});

// ─────────────────────────────────────────────────────────────────────────────
// TC-HRM-004 — Login with Invalid Password Only (AC-02)
// ─────────────────────────────────────────────────────────────────────────────

test('TC-HRM-004 — Login with Invalid Password Only @master @regression @web',
    async ({ loginPage }) => {

    // TC-HRM-004
    const { username } = Helper.getLoginDetails();

    await test.step('1) Enter valid username with an invalid password', async () => {
        await loginPage.login(username, 'wrongpassword123');
    });

    await test.step('2) Verify error message is displayed', async () => {
        const errorMessage = await loginPage.getErrorMessage();
        expect(errorMessage).toContain('Invalid credentials');
    });

    await test.step('3) Verify user remains on the login page', async () => {
        const isStillOnLogin = await loginPage.isLoginPageDisplayed();
        expect(isStillOnLogin).toBeTruthy();
    });

    console.log('✅ TC-HRM-004 — Login with Invalid Password Only: PASSED');
});

// ─────────────────────────────────────────────────────────────────────────────
// TC-HRM-005 — Login with Empty Credentials (AC-04)
// ─────────────────────────────────────────────────────────────────────────────

test('TC-HRM-005 — Login with Empty Credentials @master @regression @web',
    async ({ loginPage }) => {

    // TC-HRM-005

    await test.step('1) Leave both fields empty and click Login', async () => {
        await loginPage.clickLogin();
    });

    await test.step('2) Verify login is blocked (user remains on login page)', async () => {
        const isStillOnLogin = await loginPage.isLoginPageDisplayed();
        expect(isStillOnLogin).toBeTruthy();
    });

    await test.step('3) Verify required field validation appears', async () => {
        const errorMessage = await loginPage.getErrorMessage();
        expect(errorMessage.length).toBeGreaterThan(0);
    });

    console.log('✅ TC-HRM-005 — Login with Empty Credentials: PASSED');
});

// ─────────────────────────────────────────────────────────────────────────────
// TC-HRM-006 — Password Field Masks Input (AC-04)
// ─────────────────────────────────────────────────────────────────────────────

test('TC-HRM-006 — Password Field Masks Input @master @regression @web',
    async ({ loginPage }) => {

    // TC-HRM-006

    await test.step('1) Verify Password field masks input (type="password")', async () => {
        const isMasked = await loginPage.isPasswordMasked();
        expect(isMasked).toBeTruthy();
    });

    console.log('✅ TC-HRM-006 — Password Field Masks Input: PASSED');
});
