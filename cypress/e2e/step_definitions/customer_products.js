const { Given, When, Then } = require("@badeball/cypress-cucumber-preprocessor");


Given("customer sudah login dan berada di halaman produk", () => {
  // 1. Kunjungi halaman login terlebih dahulu
  cy.visit("/login");
  
  // 2. Masukkan email dan password yang Anda berikan
  cy.get('input[name="email"]').type("user@gmail.com");
  cy.get('input[name="password"]').type("user1234");
  
  // 3. Klik tombol login
  cy.get('button[type="submit"]').click();
  
  // 4. Pastikan login berhasil (misalnya mengecek URL tidak lagi di /login)
  cy.url().should('not.include', '/login');
  
  // 5. Kunjungi halaman produk setelah dipastikan berhasil login
  cy.visit("/products");
  
  // 6. Pastikan form pencarian di halaman produk sudah ter-render
  cy.get('form[action*="/products"]').should('exist');
});

// ============================================================
// SCENARIO: Customer dapat melihat list produk (Test Case 2)
// ============================================================
When("customer melihat daftar katalog", () => {
  cy.get('.grid').should('exist');
});

Then("sistem menampilkan list produk dengan minimal satu produk terlihat", () => {
  // Mengecek apakah di dalam grid terdapat elemen 'a' (kartu produk)
  cy.get('.grid').find('a[href*="/products/"]').should('have.length.greaterThan', 0);
});

// ============================================================
// SCENARIO: Customer dapat mencari produk (Test Case 1)
// ============================================================
When("customer memasukkan kata kunci {string} pada kolom pencarian", (keyword) => {
  cy.get('input[name="search"]').clear().type(keyword);
});

When("menekan tombol cari produk", () => {
  cy.get('button[type="submit"]').contains('Cari produk').click();
});

Then("sistem menampilkan produk yang relevan dengan kata kunci pencarian", () => {
  // Memastikan URL mengandung parameter query string 'search'
  cy.url().should('include', 'search=');
  cy.get('.grid').find('a[href*="/products/"]').should('exist');
});

// ============================================================
// SCENARIO: Customer dapat melihat detail produk (Test Case 3)
// ============================================================
When("customer mengklik salah satu kartu produk di katalog", () => {
  // Mengambil elemen produk pertama dan mengkliknya
  cy.get('.grid a[href*="/products/"]').first().click();
});

Then("sistem berhasil mengarahkan ke halaman detail produk", () => {
  // Route show menggunakan format /products/{product}
  cy.url().should('match', /\/products\/\d+/);
});

// ============================================================
// SCENARIO: Customer dapat memilih kategori produk (Test Case 4)
// ============================================================
When("customer memilih kategori {string} dari dropdown", (categoryName) => {
  // Cypress .select() dapat memilih berdasarkan text yang tampil di option
  cy.get('select[name="category"]').select(categoryName);
});

Then("sistem menampilkan produk yang sesuai dengan kategori yang dipilih", () => {
  // Memastikan URL mengandung query parameter category ID
  cy.url().should('include', 'category=');
  cy.get('.grid').find('a[href*="/products/"]').should('exist');
});

// ============================================================
// SCENARIO: Pencarian error typo (Test Case 5) & Kategori Kosong (Test Case 6)
// ============================================================
Then("sistem menampilkan pesan {string}", (message) => {
  // Berdasarkan kondisi @empty pada view home.blade.php
  cy.get('.col-span-full')
    .should('exist')
    .and('contain.text', message);
});