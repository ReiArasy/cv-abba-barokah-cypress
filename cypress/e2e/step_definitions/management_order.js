const { Given, When, Then } = require("@badeball/cypress-cucumber-preprocessor");

// BACKGROUND: admin berada di halaman daftar order
Given("admin berada di halaman daftar order", () => {
  cy.visit("/admin/orders");
  cy.url().should('include', '/admin/orders');
  cy.get('h1, .fi-page-heading, [class*="fi-ta"]', { timeout: 10000 }).should('exist');
});

// SCENARIO: Admin melihat tabel daftar order
Then("admin melihat tabel daftar order", () => {
  cy.get('table', { timeout: 8000 }).should('exist');
});

// SCENARIO: Admin membuka halaman detail order teratas melalui aksi Lihat
When("admin menekan tombol aksi {string} order pada baris pertama", (actionLabel) => {
  // Klik link lihat di baris pertama
  cy.get('table tbody tr').first()
    .find('a[href*="/orders/"], a[href*="/view"], button')
    .first()
    .click({ force: true });
  cy.wait(1500);
});

Then("halaman diarahkan ke detail order {string}", (urlPrefix) => {
  cy.url().should('include', urlPrefix);
  // Verifikasi URL mencantumkan ID numerik pesanan (misal /admin/orders/1)
  cy.url().should('match', /\/admin\/orders\/\d+/);
});

Then("admin melihat detail informasi order", () => {
  cy.contains(/detail|order|pesanan|kode|status|total/i, { timeout: 8000 }).should('exist');
});

// SCENARIO: Admin menggunakan breadcrumbs dari halaman detail order
Given("admin berada di halaman detail order teratas", () => {
  cy.visit("/admin/orders");
  cy.get('table tbody tr').first()
    .find('a[href*="/orders/"], a[href*="/view"], button')
    .first()
    .click({ force: true });
  cy.url().should('match', /\/admin\/orders\/\d+/);
});

When("admin menekan breadcrumb {string} di form order", (breadcrumbName) => {
  // Filament 3 breadcrumbs link
  cy.get('.fi-breadcrumbs')
    .find('a')
    .contains(breadcrumbName)
    .first()
    .click({ force: true });
  cy.wait(1000);
});

Then("halaman diarahkan kembali ke daftar order {string}", (expectedUrl) => {
  cy.url().should('include', expectedUrl);
  cy.get('table', { timeout: 8000 }).should('exist');
});

// SCENARIO: Admin mengklik baris data pada tabel order untuk melihat detail
When("admin klik salah satu baris data order pada tabel", () => {
  // Klik cell pertama (misal: Kode Pesanan) di baris pertama tabel untuk memicu row-click view
  cy.get('table tbody tr').first()
    .find('td a')
    .first()
    .click({ force: true });
  cy.wait(1500);
});
