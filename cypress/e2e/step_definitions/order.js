import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

// --- Background ---
Given("Pelanggan sudah login ke dalam sistem", () => {
  // Asumsi ada custom command untuk login atau hit endpoint login
  cy.login('user@gmail.com', 'user12345678'); 
});

// --- Scenario 1: Checkout Langsung ---
Given("Pelanggan berada di halaman detail produk", () => {
  cy.visit('/products/1'); // Sesuaikan dengan route detail produk Anda
});

When("Pelanggan memasukkan jumlah produk {string}", (qty) => {
  cy.get('input[name="quantity"]').clear().type(qty);
});

When("Pelanggan menekan tombol {string}", (buttonText) => {
  cy.contains('button', buttonText).click();
});

Then("Pelanggan akan diarahkan ke halaman detail pesanan", () => {
  // Route setelah berhasil checkout adalah /orders/{code}
  cy.url().should('include', '/orders/ORD-');
});

Then("Pelanggan melihat pesan sukses {string}", (message) => {
  cy.contains('.bg-green-100', message).should('be.visible');
});

Then("Pelanggan melihat status pesanan {string}", (statusText) => {
  cy.contains(statusText, { matchCase: false }).should('be.visible');
});

// --- Scenario 2: Checkout dari Keranjang ---
Given("Pelanggan memiliki produk di keranjang", () => {
  // Setup data: hit API direct add to cart via request
  cy.request('POST', '/cart/add/1', { quantity: 1 });
});

Given("Pelanggan berada di halaman keranjang", () => {
  cy.visit('/cart'); // Sesuai dengan route keranjang
});

Then("Pelanggan melihat tombol {string}", (buttonText) => {
  cy.get('#pay-button').should('contain', buttonText).and('be.visible');
});

// --- Scenario 3: Melihat Riwayat Pesanan ---
Given("Pelanggan memiliki riwayat pesanan sebelumnya", () => {
  // Bisa dengan seed database atau hit endpoint pembuatan pesanan di background
  cy.request('POST', '/orders/direct', { product_id: 1, quantity: 1 });
});

When("Pelanggan mengakses halaman {string}", (pageName) => {
  if (pageName === "Riwayat Pesanan") {
    cy.visit('/orders/history');
  }
});

Then("Pelanggan melihat tabel daftar pesanan", () => {
  cy.get('table').should('be.visible');
  cy.get('tbody tr').should('have.length.greaterThan', 0);
});

Then("Pelanggan melihat kolom {string}, {string}, {string}, dan {string}", (col1, col2, col3, col4) => {
  cy.get('thead th').should('contain', col1);
  cy.get('thead th').should('contain', col2);
  cy.get('thead th').should('contain', col3);
  cy.get('thead th').should('contain', col4);
});

// --- Scenario 4: Melihat Detail Pesanan ---
When("Pelanggan menekan tombol {string} pada pesanan teratas", (buttonText) => {
  cy.get('tbody tr').first().within(() => {
    cy.contains('a', buttonText).click();
  });
});

Then("Pelanggan melihat judul {string}", (titleText) => {
  cy.get('h1').should('contain', titleText);
});

Then("Pelanggan melihat Ringkasan Daftar Produk", () => {
  cy.contains('h2', 'Daftar Produk').should('be.visible');
  cy.contains('Total').should('be.visible');
});