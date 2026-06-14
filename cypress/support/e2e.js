// Import commands.js jika diperlukan
import './commands';

// Mencegah test gagal jika terdapat unhandled error JavaScript dari aplikasi Laravel / Filament 3
Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
});

// Hook global setelah setiap skenario testing
afterEach(function () {
    const test = this.currentTest;
    // Jika skenario berhasil (passed), ambil screenshot sebagai bukti (success evidence)
    if (test && test.state === 'passed') {
        const scenarioName = (test.title || 'scenario').replace(/[^a-zA-Z0-9]/g, '_');
        cy.screenshot(`success-${scenarioName}`, { capture: 'viewport' });
    }
    // Jika gagal (failed), Cypress secara otomatis mengambil screenshot kegagalan.
});
