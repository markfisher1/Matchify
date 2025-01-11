const { remote } = require('webdriverio');

let browser;

before(async function() {
    this.timeout(20000); // Increase timeout to 20 seconds

    // Initialize browser session
    browser = await remote({
        logLevel: 'error',
        path: '/',
        port: 9516, // Specify the port if needed
        capabilities: {
            browserName: 'chrome',
            'goog:chromeOptions': {
                args: ['--headless', '--disable-gpu'] // Add any additional options if needed
            }
        }
    });
});

after(async function() {
    if (browser) {
        await browser.deleteSession();
    }
});

describe('Profile Creation', function() {
    this.timeout(10000); // Increase timeout for the tests to 10 seconds

    it('should create a profile with valid inputs', async function() {
        await browser.url('http://localhost:8080'); // Adjust URL as needed

        await browser.waitUntil(
            async () => (await browser.execute(() => document.readyState)) === 'complete',
            {
                timeout: 10000,
                timeoutMsg: 'Page did not load within 10 seconds'
            }
        );

        await browser.$('#name').setValue('John Doe');
        await browser.$('#age').setValue(30);
        await browser.$('#gender').setValue('Male');
        await browser.$('#location').setValue('New York');
        await browser.$('#interests').setValue('Music, Sports');
        const filePath = 'c:/path/to/profile-picture.jpg'; // Adjust path as needed
        const remoteFilePath = await browser.uploadFile(filePath);
        await browser.$('#profilePicture').setValue(remoteFilePath);
        await browser.$('button[type="submit"]').click();

        await browser.waitUntil(
            async () => (await browser.$('#message').getText()) === 'Profile created successfully.',
            {
                timeout: 5000,
                timeoutMsg: 'Success message did not appear within 5 seconds'
            }
        );
    });

    it('should show error for missing mandatory fields', async function() {
        await browser.url('http://localhost:8080'); // Adjust URL as needed

        await browser.waitUntil(
            async () => (await browser.execute(() => document.readyState)) === 'complete',
            {
                timeout: 10000,
                timeoutMsg: 'Page did not load within 10 seconds'
            }
        );

        await browser.$('#name').setValue('John Doe');
        await browser.$('button[type="submit"]').click();

        await browser.waitUntil(
            async () => (await browser.$('#message').getText()) === 'All fields are required.',
            {
                timeout: 5000,
                timeoutMsg: 'Error message did not appear within 5 seconds'
            }
        );
    });
});