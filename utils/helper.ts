import dotenv from 'dotenv';

dotenv.config();

export class Helper {
    /**
     * Removes all non-numeric characters except the decimal point and converts to number.
     * @param price - Price string (e.g. "$602.00")
     * @returns The numeric value
     */
    static convertPriceToNumber(price: string): number {
        return Number(price.replace(/[^0-9.]/g, ''));
    }

    /**
     * Returns OrangeHRM admin login credentials from environment variables.
     * @returns Object with username and password
     */
    static getLoginDetails() {
        return {
            username: process.env.ADMIN_USERNAME || 'Admin',
            password: process.env.ADMIN_PASSWORD || 'admin123',
        };
    }
}
