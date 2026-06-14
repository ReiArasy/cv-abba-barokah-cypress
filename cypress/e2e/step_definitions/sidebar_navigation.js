const { Given, When, Then } = require("@badeball/cypress-cucumber-preprocessor");

Given("admin berada di halaman dashboard", () => {
  cy.visit("/admin");
  cy.url().should('include', '/admin');
  cy.get('h1, .fi-page-heading', { timeout: 10000 }).should('exist');
});

When("admin klik menu sidebar {string}", (sidebarLabel) => {
  // Filament 3 sidebar items are links 'a' containing navigation label
  // Cari di aside / sidebar agar tidak salah mengklik link di konten utama
  cy.get('.fi-sidebar, aside, body').contains('a', sidebarLabel).first().click({ force: true });
  cy.wait(1500);
});

Then("halaman diarahkan ke URL {string}", (expectedUrl) => {
  cy.url().should('include', expectedUrl);
});

Given("admin kembali ke dashboard", () => {
  cy.visit("/admin");
  cy.url().should('include', '/admin');
});

Given("admin mengunjungi halaman {string}", (pageUrl) => {
  cy.visit(pageUrl);
  cy.url().should('include', pageUrl);
  cy.wait(1000);
});
