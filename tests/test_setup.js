const Sentry = require('@sentry/node');

function initializeSentry() {
  Sentry.init({
    dsn: 'YOUR_SENTRY_DSN', // Replace with your Sentry DSN
    tracesSampleRate: 1.0,   // Adjust the sample rate as necessary
  });
}

initializeSentry();
