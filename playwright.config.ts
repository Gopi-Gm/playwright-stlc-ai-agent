import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  timeout: 45 * 1000,
  testDir: "./tests",
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : 2,
  reporter: [
    ["list"],
    ["html", { open: "never", outputFolder: "reports" }],
    ["junit", { outputFile: "reports/results.xml" }],
    ["./utils/CustomReporter.ts"],
    ["allure-playwright", { outputFolder: "allure-results" }],
  ],
  use: {
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    headless: true,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
  },
  grep: /@master/,
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
