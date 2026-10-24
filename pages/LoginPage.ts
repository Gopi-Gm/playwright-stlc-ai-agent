import { Page, Locator } from '@playwright/test';

export class LoginPage {
    private readonly page: Page;

    // Locators
    private readonly txtUsername: Locator;
    private readonly txtPassword: Locator;
    private readonly btnLogin: Locator;
    private readonly alertMessage: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators - verified from live OrangeHRM application
        this.txtUsername = page.getByPlaceholder('Username');
        this.txtPassword = page.getByPlaceholder('Password');
        this.btnLogin = page.getByRole('button', { name: 'Login' });
        this.alertMessage = page.locator('.oxd-alert-content-text');
    }

    /**
     * Enters the username in the Username field.
     * @param username - The username to enter
     */
    async enterUsername(username: string): Promise<void> {
        await this.txtUsername.fill(username);
    }

    /**
     * Enters the password in the Password field.
     * @param password - The password to enter
     */
    async enterPassword(password: string): Promise<void> {
        await this.txtPassword.fill(password);
    }

    /**
     * Clicks the Login button.
     */
    async clickLogin(): Promise<void> {
        await this.btnLogin.click();
    }

    /**
     * Performs a full login action with username and password.
     * @param username - The username
     * @param password - The password
     */
    async login(username: string, password: string): Promise<void> {
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.clickLogin();
    }

    /**
     * Returns the error/alert message text displayed after a failed login or validation error.
     * Handles both .oxd-alert-content-text and .oxd-input-field-error-message.
     * @returns The alert or validation message text
     */
    async getErrorMessage(): Promise<string> {
        const alert = this.alertMessage;
        const required = this.page.locator('.oxd-input-field-error-message').first();
        const errorLocator = alert.or(required).first();
        await errorLocator.waitFor({ state: 'visible', timeout: 10000 });
        return (await errorLocator.textContent()) || '';
    }

    /**
     * Returns the required field error message text.
     * @returns The required field error text (e.g. "Required")
     */
    async getRequiredErrorMessage(): Promise<string> {
        const required = this.page.locator('.oxd-input-field-error-message').first();
        await required.waitFor({ state: 'visible', timeout: 10000 });
        return (await required.textContent()) || '';
    }

    /**
     * Checks whether the login page is currently displayed.
     * @returns true if the login page is visible
     */
    async isLoginPageDisplayed(): Promise<boolean> {
        try {
            await this.btnLogin.waitFor({ state: 'visible', timeout: 15000 });
            return await this.btnLogin.isVisible();
        } catch (error) {
            console.log(`Error checking login page: ${error}`);
            return false;
        }
    }

    /**
     * Checks whether the Username input field is visible.
     * @returns true if the username field is visible
     */
    async isUsernameFieldVisible(): Promise<boolean> {
        try {
            await this.txtUsername.waitFor({ state: 'visible', timeout: 15000 });
            return await this.txtUsername.isVisible();
        } catch (error) {
            return false;
        }
    }

    /**
     * Checks whether the Password input field is visible.
     * @returns true if the password field is visible
     */
    async isPasswordFieldVisible(): Promise<boolean> {
        try {
            await this.txtPassword.waitFor({ state: 'visible', timeout: 15000 });
            return await this.txtPassword.isVisible();
        } catch (error) {
            return false;
        }
    }

    /**
     * Checks whether the Login button is visible.
     * @returns true if the login button is visible
     */
    async isLoginButtonVisible(): Promise<boolean> {
        try {
            await this.btnLogin.waitFor({ state: 'visible', timeout: 15000 });
            return await this.btnLogin.isVisible();
        } catch (error) {
            return false;
        }
    }

    /**
     * Returns whether the password field masks input (type="password").
     * @returns true if the password field type is "password"
     */
    async isPasswordMasked(): Promise<boolean> {
        try {
            await this.txtPassword.waitFor({ state: 'visible', timeout: 15000 });
            const type = await this.txtPassword.getAttribute('type');
            return type === 'password';
        } catch (error) {
            return false;
        }
    }
}
