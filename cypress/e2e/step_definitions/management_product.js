const { Given, When, Then } = require("@badeball/cypress-cucumber-preprocessor");

// BACKGROUND: admin berada di halaman daftar produk
Given("admin berada di halaman daftar produk", () => {
  cy.visit("/admin/products");
  cy.url().should('include', '/admin/products');
  cy.get('h1, .fi-page-heading, [class*="fi-ta"]', { timeout: 10000 }).should('exist');
});

// SCENARIO: Admin melihat tabel daftar produk
Then("admin melihat tabel daftar produk", () => {
  cy.get('table', { timeout: 8000 }).should('exist');
});

// SCENARIO: Admin membuka form tambah produk dan membatalkannya
When("admin menekan tombol {string} produk di atas tabel", (buttonLabel) => {
  // Filament 3 header action button
  cy.get('.fi-header-actions, .fi-ac, body')
    .contains('a, button, span', buttonLabel)
    .first()
    .click({ force: true });
  cy.wait(1000);
});

Then("halaman diarahkan ke form tambah produk {string}", (expectedUrl) => {
  cy.url().should('include', expectedUrl);
});

When("admin menekan tombol {string} di form produk", (buttonLabel) => {
  // Batal button in create/edit form
  cy.get('form, body')
    .contains('a, button, span', buttonLabel)
    .first()
    .click({ force: true });
  cy.wait(1000);
});

Then("halaman diarahkan kembali ke daftar produk {string}", (expectedUrl) => {
  cy.url().should('include', expectedUrl);
  cy.get('table', { timeout: 8000 }).should('exist');
});

// SCENARIO: Admin menggunakan breadcrumbs dari halaman tambah produk
Given("admin membuka form tambah produk baru", () => {
  cy.visit("/admin/products/create");
  cy.url().should('include', '/create');
});

When("admin menekan breadcrumb {string} di form produk", (breadcrumbName) => {
  // Filament 3 breadcrumbs link
  cy.get('.fi-breadcrumbs, ol, nav, body')
    .find('a')
    .contains(breadcrumbName)
    .first()
    .click({ force: true });
  cy.wait(1000);
});

// SCENARIO: Admin membuka form ubah produk teratas dan membatalkannya
When("admin menekan tombol aksi {string} produk pada baris pertama", (actionLabel) => {
  // Klik link edit di baris pertama
  cy.get('table tbody tr').first()
    .find('a[href*="/edit"], button')
    .first()
    .click({ force: true });
  cy.wait(1000);
});

Then("halaman diarahkan ke form ubah produk {string} dengan akhiran {string}", (urlPrefix, urlSuffix) => {
  cy.url().should('include', urlPrefix);
  cy.url().should('include', urlSuffix);
});

// SCENARIO: Admin menggunakan breadcrumbs dari halaman ubah produk
Given("admin membuka form ubah produk teratas baru", () => {
  cy.visit("/admin/products");
  cy.get('table tbody tr').first()
    .find('a[href*="/edit"]')
    .first()
    .click({ force: true });
  cy.url().should('include', '/edit');
});

// SCENARIO: Admin mengklik baris data pada tabel produk untuk mengedit
When("admin klik salah satu baris data produk pada tabel", () => {
  // Klik cell kedua (biasanya Nama Produk) di baris pertama tabel untuk memicu row-click edit
  cy.get('table tbody tr').first()
    .find('td a')
    .first()
    .click({ force: true });
  cy.wait(1000);
});
