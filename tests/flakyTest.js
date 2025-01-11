const { exec } = require('child_process');
const fs = require('fs');

const testFile = 'profileCreation.test.js';
const iterations = 10; // Number of times to run the test
const logFile = 'flakyTestAnalysis.log';

fs.writeFileSync(logFile, ''); // Clear log file

for (let i = 0; i < iterations; i++) {
    exec(`npx mocha ${testFile}`, (error, stdout, stderr) => {
        const result = {
            iteration: i + 1,
            passed: !error,
            stdout: stdout,
            stderr: stderr
        };

        fs.appendFileSync(logFile, JSON.stringify(result, null, 2) + '\n\n');

        if (i === iterations - 1) {
            console.log(`Flaky test analysis completed. Check ${logFile} for details.`);
        }
    });
}