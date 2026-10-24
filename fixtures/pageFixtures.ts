import dotenv from 'dotenv';
import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { AdminUserPage } from '../pages/AdminUserPage';
import { LeavePage } from '../pages/LeavePage';
import { TimePage } from '../pages/TimePage';
import { RecruitmentPage } from '../pages/RecruitmentPage';
import { ClaimPage } from '../pages/ClaimPage';

dotenv.config();

const APP_URL =
    process.env.WEB_APP_URL ||
    'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login';

type PageFixtures = {
    loginPage: LoginPage;
    dashboardPage: DashboardPage;
    adminUserPage: AdminUserPage;
    leavePage: LeavePage;
    timePage: TimePage;
    recruitmentPage: RecruitmentPage;
    claimPage: ClaimPage;
};

export const test = base.extend<PageFixtures>({
    loginPage: async ({ page }, use) => {
        await page.goto(APP_URL, { waitUntil: 'domcontentloaded' });
        await use(new LoginPage(page));
    },
    dashboardPage: async ({ page }, use) => {
        await use(new DashboardPage(page));
    },
    adminUserPage: async ({ page }, use) => {
        await use(new AdminUserPage(page));
    },
    leavePage: async ({ page }, use) => {
        await use(new LeavePage(page));
    },
    timePage: async ({ page }, use) => {
        await use(new TimePage(page));
    },
    recruitmentPage: async ({ page }, use) => {
        await use(new RecruitmentPage(page));
    },
    claimPage: async ({ page }, use) => {
        await use(new ClaimPage(page));
    },
});

export { expect } from '@playwright/test';
