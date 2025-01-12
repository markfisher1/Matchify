const Sentry = require('@sentry/node');

// Initialize Sentry with your DSN
Sentry.init({
  dsn: 'YOUR_SENTRY_DSN',
  tracesSampleRate: 1.0
});

function generateErrorReport() {
  // Get the Sentry client transport queue
  const transportQueue = Sentry.getCurrentHub().getClient().getTransport()._queue;

  const report = [];
  transportQueue.forEach((event) => {
    report.push({
      test_case_name: event.message,  // Assuming event has a message
      timestamp: event.timestamp,     // Assuming event has a timestamp
      error_details: event.exception  // Assuming event has exception details
    });
  });

  return report;
}

// Generate and print the error report
const errorReport = generateErrorReport();
console.log(errorReport);
