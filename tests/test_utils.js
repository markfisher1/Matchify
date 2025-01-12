const Sentry = require('@sentry/node');
const { format } = require('date-fns');

// Initialize Sentry
Sentry.init({
  dsn: 'YOUR_SENTRY_DSN',
  tracesSampleRate: 1.0
});

function logError(testCaseName, errorDetails) {
  const timestamp = format(new Date(), 'yyyy-MM-dd HH:mm:ss'); // Format the current timestamp

  Sentry.captureMessage(
    `Test Case: ${testCaseName}\n` +
    `Timestamp: ${timestamp}\n` +
    `Error Details: ${errorDetails}`
  );
}

module.exports = { logError };
