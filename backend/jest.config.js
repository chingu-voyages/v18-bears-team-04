module.exports = {
  clearMocks: true,
  globalSetup: "./src/tests/setup/global-setup.js",
  globalTeardown: "./src/tests/setup/global-teardown.js",
  testEnvironment: "./src/tests/setup/mongo-environment.js",
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
};
