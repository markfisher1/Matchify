const { logError } = require('./test_utils'); // Assuming logError is defined in test_utils.js

test('example test', () => {
  try {
    // Simulate a test failure
    expect(false).toBe(true); // Simulated test failure
  } catch (e) {
    logError('example test', e.message); // Log the error details
    throw e; // Re-throw the error to ensure the test fails
  }
});
