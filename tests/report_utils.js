const Sentry = require('@sentry/node');

// Initialize Sentry with your DSN
Sentry.init({
  dsn: 'YOUR_SENTRY_DSN',
  tracesSampleRate: 1.0,
});

// Log error to Sentry with test case name, timestamp, and error details
function logError(testCaseName, errorDetails) {
  const timestamp = new Date().toISOString(); // Current timestamp in ISO format
  const message = `Test Case: ${testCaseName}\nTimestamp: ${timestamp}\nError Details: ${errorDetails}`;

  Sentry.captureMessage(message);
}

// Example usage
logError('Example Test Case', 'An error occurred during the test.');
