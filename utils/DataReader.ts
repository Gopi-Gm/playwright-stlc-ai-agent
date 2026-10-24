import * as fs from 'fs';
import { parse } from 'csv-parse/sync';
import * as XLSX from 'xlsx';

export class DataProvider {
    /**
     * Reads and parses a JSON file.
     * @param filePath - Path to the JSON file
     * @returns Parsed JSON data
     */
    static readJson(filePath: string) {
        const content = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(content);
    }

    /**
     * Reads and parses a CSV file.
     * @param filePath - Path to the CSV file
     * @returns Array of row objects
     */
    static readCsv(filePath: string) {
        const content = fs.readFileSync(filePath);
        return parse(content, {
            columns: true,
            skip_empty_lines: true,
        });
    }

    /**
     * Reads and parses an Excel file (first sheet).
     * @param filePath - Path to the Excel file
     * @returns Array of row arrays
     */
    static readExcel(filePath: string) {
        const workbook = XLSX.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        return XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    }
}
