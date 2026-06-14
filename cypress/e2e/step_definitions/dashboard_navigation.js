const { Given, When, Then } = require("@badeball/cypress-cucumber-preprocessor");

Then("admin melihat statistik {string} dengan deskripsi {string}", (statTitle, description) => {
  // Filament 3 StatsOverviewStat renders as cards
  cy.contains('body', statTitle).should('be.visible');
  cy.contains('body', description).should('be.visible');
});

Given("admin melihat widget {string}", (widgetTitle) => {
  cy.contains('h2', widgetTitle, { timeout: 8000 }).should('be.visible');
});

When("admin menekan tautan {string}", (linkLabel) => {
  // Klik link/tautan berdasarkan label teks
  cy.contains('a', linkLabel).should('be.visible').click();
  cy.wait(1000);
});

Then("halaman diarahkan ke daftar produk dengan URL {string}", (expectedUrl) => {
  cy.url().should('include', expectedUrl);
  cy.get('table', { timeout: 8000 }).should('exist');
});

Then("halaman diarahkan ke daftar pesanan dengan URL {string}", (expectedUrl) => {
  cy.url().should('include', expectedUrl);
  cy.get('table', { timeout: 8000 }).should('exist');
});
