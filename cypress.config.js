const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const { addCucumberPreprocessorPlugin } = require("@badeball/cypress-cucumber-preprocessor");
const { createEsbuildPlugin } = require("@badeball/cypress-cucumber-preprocessor/esbuild");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://127.0.0.1:8000",
    specPattern: "cypress/e2e/features/**/*.feature",

    // PENTING: testIsolation: true (default) membersihkan cookies & state
    // di antara setiap scenario. Kita akan menggunakan cy.session() dengan
    // cacheAcrossSpecs: true di shared.js untuk membagikan session login secara aman.
    testIsolation: true,

    async setupNodeEvents(on, config) {
      // Diperlukan agar plugin preprocessor Cucumber dapat didaftarkan
      await addCucumberPreprocessorPlugin(on, config);

      on(
        "file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      );

      return config;
    },
    viewportWidth: 1280,
    viewportHeight: 720,
    screenshotOnRunFailure: true,
    screenshotsFolder: "cypress/screenshots",
    videosFolder: "cypress/videos",
    video: false,
    chromeWebSecurity: false
  },
});
