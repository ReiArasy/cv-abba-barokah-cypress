Cypress.Commands.add('login', () => {

    cy.visit('/login');

    cy.get('input[name="email"]')
        .clear()
        .type('user@gmail.com');

    cy.get('input[name="password"]')
        .clear()
        .type('user12345678');

    cy.contains('button', 'Masuk')
        .click();

    cy.url().should('not.include', '/login');
});

Cypress.Commands.add('openCart', () => {

    cy.visit('/cart');

});

Cypress.Commands.add('openProductDetail', () => {

    // sesuaikan id produk yang memang ada
    cy.visit('/products/1');

});