import {
    Reporter,
    TestCase,
    TestResult,
    FullConfig,
    Suite,
    FullResult,
} from '@playwright/test/reporter';
import * as fs from 'fs';
import * as path from 'path';

export default class CustomReporter implements Reporter {
    private reportLines: string[] = [];
    private outputDir = 'custom-report';
    private startTime: Date = new Date();

    onBegin(config: FullConfig, suite: Suite): void {
        this.startTime = new Date();
        fs.mkdirSync(this.outputDir, { recursive: true });
        this.reportLines.push(`=== OrangeHRM Test Run Report ===`);
        this.reportLines.push(`Started: ${this.startTime.toISOString()}`);
        this.reportLines.push(`Total Tests: ${suite.allTests().length}`);
        this.reportLines.push('');
    }

    onTestEnd(test: TestCase, result: TestResult): void {
        const status = result.status.toUpperCase().padEnd(7);
        const duration = `${result.duration}ms`;
        this.reportLines.push(`[${status}] ${test.title} (${duration})`);

        if (result.status === 'failed' && result.error) {
            this.reportLines.push(`  ❌ Error: ${result.error.message}`);
        }
    }

    onEnd(result: FullResult): void {
        const endTime = new Date();
        this.reportLines.push('');
        this.reportLines.push(`Finished: ${endTime.toISOString()}`);
        this.reportLines.push(`Overall Status: ${result.status.toUpperCase()}`);

        const reportFile = path.join(
            this.outputDir,
            `report-${this.startTime.toISOString().replace(/[:.]/g, '-')}.txt`
        );
        fs.writeFileSync(reportFile, this.reportLines.join('\n'), 'utf8');
        console.log(`\n📋 Custom report saved to: ${reportFile}`);
    }
}
