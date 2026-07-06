const { Given, When, Then } = require("@badeball/cypress-cucumber-preprocessor");

// ============================================================
// CUSTOMER PURCHASE HISTORY STEP DEFINITIONS
//
// Berdasarkan file history.blade.php dan show.blade.php
// Route index: /purchase/history
// Route show: /purchase/{order:code}
// ============================================================

// ============================================================
// BACKGROUND / GIVEN STANDAR (Akun dengan riwayat belanja)
// ============================================================
Given("customer sudah login dan berada di halaman riwayat pembelian", () => {
  cy.visit("/login");
  
  // Menggunakan kredensial dari pengujian sebelumnya
  cy.get('input[name="email"]').type("user@gmail.com");
  cy.get('input[name="password"]').type("user1234");
  cy.get('button[type="submit"]').click();
  
  // Memastikan login berhasil
  cy.url().should('not.include', '/login');
  
  // Akses route riwayat pembelian
  cy.visit("/purchase/history");
  
  // Memastikan halaman dirender dengan benar
  cy.get('h1').contains('Riwayat Pembelian').should('exist');
});

// ============================================================
// SCENARIO 1: Customer dapat melihat history pembelian
// ============================================================
When("customer melihat daftar pesanan di halaman riwayat", () => {
  cy.get('#order-container').should('exist');
});

Then("sistem menampilkan list kartu riwayat pembelian", () => {
  // Mengecek keberadaan elemen dengan class 'order-card'
  cy.get('.order-card').should('have.length.greaterThan', 0);
});

// ============================================================
// SCENARIO 2: Customer dapat melihat detail history pembelian
// ============================================================
When("customer mengklik salah satu kartu pesanan", () => {
  // Klik pesanan pertama dari daftar riwayat
  cy.get('.order-card').first().click();
});

Then("sistem berhasil mengarahkan ke halaman detail history pembelian", () => {
  // Pastikan URL mengarah ke detail purchase (mengandung /purchase/KodeOrder)
  cy.url().should('match', /\/purchase\/[a-zA-Z0-9_-]+/);
  
  // Pastikan elemen UI di halaman detail muncul
  cy.get('h1').contains('Detail Riwayat Pembelian').should('exist');
  cy.contains("Detial Pembelian").should('exist');
});

// ============================================================
// SCENARIO 3: History kosong (Test Case 3)
// ============================================================
Given("customer baru yang belum pernah belanja sudah login dan berada di halaman riwayat pembelian", () => {
  cy.visit("/login");
  
  // Menggunakan akun dummy yang dipastikan tidak memiliki data di tabel Order
  // (Pastikan Anda menyiapkan akun ini di seeder database test Anda)
  cy.get('input[name="email"]').clear().type("user_baru@gmail.com"); 
  cy.get('input[name="password"]').clear().type("user1234");
  cy.get('button[type="submit"]').click();
  
  cy.visit("/purchase/history");
});

Then("sistem menampilkan pesan riwayat kosong {string}", (message) => {
  cy.contains(message).should('exist');
});
