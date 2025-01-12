const Sentry = require('@sentry/node');

Sentry.init({
  dsn: 'YOUR_SENTRY_DSN', // Replace with your Sentry DSN
  tracesSampleRate: 1.0, // Adjust the sample rate as necessary
});

beforeAll(() => {
  // Setup Sentry before all tests
  console.log('Sentry initialized before tests');
});

afterAll(() => {
  // Flush Sentry after all tests to ensure all events are sent
  Sentry.flush(2000).then(() => {
    console.log('Sentry flushed after all tests');
  });
});

afterEach(() => {
  // Capture errors for failed tests and send them to Sentry
  if (expect.getState().currentTestName) {
    try {
      expect.assertions(1);  // Adjust based on the test type
    } catch (error) {
      // Send error to Sentry
      Sentry.captureException(error);
      Sentry.setExtra('Test Case Name', expect.getState().currentTestName);
      Sentry.setExtra('Timestamp', new Date().toISOString());
      Sentry.setExtra('Error Details', error.stack);
    }
  }
});
