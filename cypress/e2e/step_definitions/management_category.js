const { Given, When, Then } = require("@badeball/cypress-cucumber-preprocessor");

// BACKGROUND: admin berada di halaman daftar kategori
Given("admin berada di halaman daftar kategori", () => {
  cy.visit("/admin/categories");
  cy.url().should('include', '/admin/categories');
  cy.get('h1, .fi-page-heading, [class*="fi-ta"]', { timeout: 10000 }).should('exist');
});

// SCENARIO: Admin melihat tabel daftar kategori
Then("admin melihat tabel daftar kategori", () => {
  cy.get('table', { timeout: 8000 }).should('exist');
});

// SCENARIO: Admin membuka form tambah kategori dan membatalkannya
When("admin menekan tombol {string} kategori di atas tabel", (buttonLabel) => {
  // Filament 3 header action button
  cy.get('header, .fi-header')
    .contains('a, button, span', buttonLabel)
    .first()
    .click({ force: true });
  cy.wait(1000);
});

Then("halaman diarahkan ke form tambah kategori {string}", (expectedUrl) => {
  cy.url().should('include', expectedUrl);
});

When("admin menekan tombol {string} di form kategori", (buttonLabel) => {
  // Batal button in create/edit form
  cy.get('form, body')
    .contains('a, button, span', buttonLabel)
    .first()
    .click({ force: true });
  cy.wait(1000);
});

Then("halaman diarahkan kembali ke daftar kategori {string}", (expectedUrl) => {
  cy.url().should('include', expectedUrl);
  cy.get('table', { timeout: 8000 }).should('exist');
});

// SCENARIO: Admin menggunakan breadcrumbs dari halaman tambah kategori
Given("admin membuka form tambah kategori baru", () => {
  cy.visit("/admin/categories/create");
  cy.url().should('include', '/create');
});

When("admin menekan breadcrumb {string}", (breadcrumbName) => {
  // Filament 3 breadcrumbs link
  cy.get('.fi-breadcrumbs')
    .find('a')
    .contains(breadcrumbName)
    .first()
    .click({ force: true });
  cy.wait(1000);
});

// SCENARIO: Admin membuka form ubah kategori teratas dan membatalkannya
When("admin menekan tombol aksi {string} kategori pada baris pertama", (actionLabel) => {
  // Klik link edit di baris pertama
  cy.get('table tbody tr').first()
    .find('a[href*="/edit"], button')
    .first()
    .click({ force: true });
  cy.wait(1000);
});

Then("halaman diarahkan ke form ubah kategori {string} dengan akhiran {string}", (urlPrefix, urlSuffix) => {
  cy.url().should('include', urlPrefix);
  cy.url().should('include', urlSuffix);
});

// SCENARIO: Admin menggunakan breadcrumbs dari halaman ubah kategori
Given("admin membuka form ubah kategori teratas baru", () => {
  cy.visit("/admin/categories");
  cy.get('table tbody tr').first()
    .find('a[href*="/edit"]')
    .first()
    .click({ force: true });
  cy.url().should('include', '/edit');
});

// SCENARIO: Admin mengklik baris data pada tabel kategori untuk mengedit
When("admin klik salah satu baris data kategori pada tabel", () => {
  // Klik cell pertama (misal: Nama Kategori) di baris pertama tabel untuk memicu row-click edit
  cy.get('table tbody tr').first()
    .find('td a')
    .first()
    .click({ force: true });
  cy.wait(1000);
});
