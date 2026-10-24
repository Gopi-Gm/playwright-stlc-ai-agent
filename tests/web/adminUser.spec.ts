/**
 * Test Suite: Admin User Management
 *
 * User Story: US-HRM-006 — Admin: Create System User
 * Tags: @master @sanity @regression @web
 *
 * Test Cases:
 * TC-HRM-007 — Successfully Create an Admin User with Enabled Status
 * TC-HRM-008 — Successfully Create an ESS User with Disabled Status
 * TC-HRM-009 — Verify Newly Created User Can Log In
 * TC-HRM-010 — Validation on Duplicate Username
 * TC-HRM-011 — Password and Confirm Password Mismatch
 * TC-HRM-012 — Submit Add User Form with Mandatory Fields Blank
 * TC-HRM-013 — Password Weakness / Minimum Length Validation
 */

import { test, expect } from '../../fixtures/pageFixtures';
import { Helper } from '../../utils/helper';
import { RandomDataUtil } from '../../utils/dataGenerator';

// ─────────────────────────────────────────────────────────────────────────────
// Helper login function for Admin tests
// ─────────────────────────────────────────────────────────────────────────────
async function loginAsAdmin(loginPage: any, dashboardPage: any): Promise<void> {
    const { username, password } = Helper.getLoginDetails();
    await loginPage.login(username, password);
    const isDashboard = await dashboardPage.isDashboardPageDisplayed();
    expect(isDashboard).toBeTruthy();
}

// ─────────────────────────────────────────────────────────────────────────────
// TC-HRM-007 — Successfully Create an Admin User with Enabled Status
// ─────────────────────────────────────────────────────────────────────────────
test('TC-HRM-007 — Successfully Create an Admin User with Enabled Status @master @sanity @regression @web',
    async ({ loginPage, dashboardPage, adminUserPage }) => {

    // TC-HRM-007
    const uniqueUsername = `testAdmin_${Date.now().toString().slice(-5)}`;
    const testPassword = 'OrangeHRM@2026_Secure!';

    await test.step('1) Log in as Admin', async () => {
        await loginAsAdmin(loginPage, dashboardPage);
    });

    await test.step('2) Navigate to Admin > User Management', async () => {
        await adminUserPage.navigateToUserManagement();
    });

    await test.step('3) Click + Add button to open Add User form', async () => {
        await adminUserPage.clickAddUser();
    });

    await test.step('4) Fill in user details with Admin role and Enabled status', async () => {
        await adminUserPage.selectUserRole('Admin');
        await adminUserPage.selectEmployeeName('Amelia');
        await adminUserPage.selectStatus('Enabled');
        await adminUserPage.enterUsername(uniqueUsername);
        await adminUserPage.enterPassword(testPassword);
        await adminUserPage.enterConfirmPassword(testPassword);
    });

    await test.step('5) Click Save and verify user is saved', async () => {
        await adminUserPage.clickSave();
        const toast = await adminUserPage.getToastMessage();
        expect(toast.toLowerCase()).toContain('success');
    });

    console.log('✅ TC-HRM-007 — Successfully Create an Admin User with Enabled Status: PASSED');
});

// ─────────────────────────────────────────────────────────────────────────────
// TC-HRM-008 — Successfully Create an ESS User with Disabled Status
// ─────────────────────────────────────────────────────────────────────────────
test('TC-HRM-008 — Successfully Create an ESS User with Disabled Status @master @regression @web',
    async ({ loginPage, dashboardPage, adminUserPage }) => {

    // TC-HRM-008
    const uniqueUsername = `essUser_${Date.now().toString().slice(-5)}`;
    const testPassword = 'OrangeHRM@2026_Secure!';

    await test.step('1) Log in as Admin', async () => {
        await loginAsAdmin(loginPage, dashboardPage);
    });

    await test.step('2) Navigate to Admin > User Management and click Add', async () => {
        await adminUserPage.navigateToUserManagement();
        await adminUserPage.clickAddUser();
    });

    await test.step('3) Fill in user details with ESS role and Disabled status', async () => {
        await adminUserPage.selectUserRole('ESS');
        await adminUserPage.selectEmployeeName('Amelia');
        await adminUserPage.selectStatus('Disabled');
        await adminUserPage.enterUsername(uniqueUsername);
        await adminUserPage.enterPassword(testPassword);
        await adminUserPage.enterConfirmPassword(testPassword);
    });

    await test.step('4) Click Save and verify record saved', async () => {
        await adminUserPage.clickSave();
        const toast = await adminUserPage.getToastMessage();
        expect(toast.toLowerCase()).toContain('success');
    });

    console.log('✅ TC-HRM-008 — Successfully Create an ESS User with Disabled Status: PASSED');
});

// ─────────────────────────────────────────────────────────────────────────────
// TC-HRM-010 — Validation on Duplicate Username
// ─────────────────────────────────────────────────────────────────────────────
test('TC-HRM-010 — Validation on Duplicate Username @master @regression @web',
    async ({ loginPage, dashboardPage, adminUserPage }) => {

    // TC-HRM-010
    await test.step('1) Log in as Admin and open Add User form', async () => {
        await loginAsAdmin(loginPage, dashboardPage);
        await adminUserPage.navigateToUserManagement();
        await adminUserPage.clickAddUser();
    });

    await test.step('2) Enter existing username Admin', async () => {
        await adminUserPage.enterUsername('Admin');
    });

    await test.step('3) Verify duplicate username validation message is shown', async () => {
        const error = await adminUserPage.getFieldError('Username');
        expect(error.toLowerCase()).toContain('already exists');
    });

    console.log('✅ TC-HRM-010 — Validation on Duplicate Username: PASSED');
});

// ─────────────────────────────────────────────────────────────────────────────
// TC-HRM-011 — Password and Confirm Password Mismatch
// ─────────────────────────────────────────────────────────────────────────────
test('TC-HRM-011 — Password and Confirm Password Mismatch @master @regression @web',
    async ({ loginPage, dashboardPage, adminUserPage }) => {

    // TC-HRM-011
    await test.step('1) Log in as Admin and open Add User form', async () => {
        await loginAsAdmin(loginPage, dashboardPage);
        await adminUserPage.navigateToUserManagement();
        await adminUserPage.clickAddUser();
    });

    await test.step('2) Enter mismatching passwords', async () => {
        await adminUserPage.enterPassword('Password@123');
        await adminUserPage.enterConfirmPassword('Different@456');
    });

    await test.step('3) Verify mismatch validation message appears', async () => {
        const error = await adminUserPage.getFieldError('Confirm Password');
        expect(error.toLowerCase()).toContain('passwords do not match');
    });

    console.log('✅ TC-HRM-011 — Password and Confirm Password Mismatch: PASSED');
});

// ─────────────────────────────────────────────────────────────────────────────
// TC-HRM-012 — Submit Add User Form with Mandatory Fields Blank
// ─────────────────────────────────────────────────────────────────────────────
test('TC-HRM-012 — Submit Add User Form with Mandatory Fields Blank @master @regression @web',
    async ({ loginPage, dashboardPage, adminUserPage }) => {

    // TC-HRM-012
    await test.step('1) Log in as Admin and open Add User form', async () => {
        await loginAsAdmin(loginPage, dashboardPage);
        await adminUserPage.navigateToUserManagement();
        await adminUserPage.clickAddUser();
    });

    await test.step('2) Click Save without filling any fields', async () => {
        await adminUserPage.clickSave();
    });

    await test.step('3) Verify required validation error messages appear', async () => {
        const hasErrors = await adminUserPage.areRequiredErrorsVisible();
        expect(hasErrors).toBeTruthy();
    });

    console.log('✅ TC-HRM-012 — Submit Add User Form with Mandatory Fields Blank: PASSED');
});

// ─────────────────────────────────────────────────────────────────────────────
// TC-HRM-013 — Password Weakness / Minimum Length Validation
// ─────────────────────────────────────────────────────────────────────────────
test('TC-HRM-013 — Password Weakness / Minimum Length Validation @master @regression @web',
    async ({ loginPage, dashboardPage, adminUserPage }) => {

    // TC-HRM-013
    await test.step('1) Log in as Admin and open Add User form', async () => {
        await loginAsAdmin(loginPage, dashboardPage);
        await adminUserPage.navigateToUserManagement();
        await adminUserPage.clickAddUser();
    });

    await test.step('2) Enter short password below minimum length requirement', async () => {
        await adminUserPage.enterPassword('123');
    });

    await test.step('3) Verify minimum characters validation is displayed', async () => {
        const error = await adminUserPage.getFieldError('Password');
        expect(error.toLowerCase()).toContain('at least 7 characters');
    });

    console.log('✅ TC-HRM-013 — Password Weakness / Minimum Length Validation: PASSED');
});
