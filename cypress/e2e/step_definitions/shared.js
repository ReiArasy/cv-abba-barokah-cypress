const { Given } = require("@badeball/cypress-cucumber-preprocessor");

// ============================================================
// SHARED STEP DEFINITIONS
//
// ROOT CAUSE DEFINITIF:
//   1. cy.session() menyimpan cookies LAMA. Saat Laravel/Livewire
//      me-regenerate session ID (setelah form submit), cookies lama
//      yang disimpan cy.session() sudah tidak valid di server.
//      Solusi: HAPUS cy.session() sepenuhnya.
//
//   2. Dengan testIsolation: false, cookies persist antar test.
//      Cukup login SEKALI jika belum login, dan session akan
//      bertahan selama spec berjalan.
//
// STRATEGI BARU:
//   - Kunjungi /admin
//   - Jika diredirect ke /login, lakukan login (session expired/belum login)
//   - Jika sudah di /admin, lanjutkan tanpa login ulang
// ============================================================

function loginAsAdmin() {
  cy.session('admin-session', () => {
    cy.visit('/admin/login');
    cy.get('[id="data.email"]', { timeout: 10000 }).should('exist')
      .clear()
      .type('abba@gmail.com', { delay: 30 });
    cy.get('[id="data.password"]')
      .clear()
      .type('abba123', { delay: 30 });
    cy.get('button[type="submit"]').click();
    cy.url({ timeout: 15000 }).should('not.include', '/login');
    cy.url().should('include', '/admin');
  }, {
    cacheAcrossSpecs: true,
    validate() {
      // Validasi apakah session masih aktif dengan mengunjungi halaman admin.
      // Jika di-redirect ke /login, validasi gagal dan cy.session akan login ulang.
      cy.visit('/admin', { failOnStatusCode: false });
      cy.url({ timeout: 8000 }).should('not.include', '/login');
    }
  });
}

// ============================================================
// SHARED: Step login yang digunakan di Background semua feature
// (management_product, management_category, management_order)
// ============================================================
Given("admin sudah masuk ke dashboard", () => {
  loginAsAdmin();
  // Kunjungi /admin karena cy.session() mereset halaman aktif ke about:blank
  cy.visit('/admin');
  cy.url({ timeout: 10000 }).should('include', '/admin');
});
