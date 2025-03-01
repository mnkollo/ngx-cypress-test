const { defineConfig } = require('cypress');

module.exports = defineConfig({
  viewportHeight: 1080,
  viewportWidth: 1920,
  video: false,
  e2e: {
    baseUrl: 'http://localhost:4200',
    excludeSpecPattern: ['**/1-getting-started', '**/2-advanced-examples'],     //Exclude the tests
    specPattern: 'cypress/e2e/**/*.{js,jsx,tx,tsx}',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
 
