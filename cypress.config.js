const { defineConfig } = require("cypress");
const allureWriter = require('@shelex/cypress-allure-plugin/writer');

module.exports = defineConfig({
  defaultCommandTimeout: 10000,
  e2e: {
    baseUrl: 'https://automationexercise.com',
    setupNodeEvents(on, config) {
      allureWriter(on, config);
      return config;
    },
    env: {
      allure: true,
      allureReuseAfterSpec: true
    },
    chromeWebSecurity: false,
    watchForFileChanges: false
  },
});
