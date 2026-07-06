import {
    Given,
    When,
    Then
} from "@badeball/cypress-cucumber-preprocessor";

let qtyBefore = 0;

Given('saya login sebagai user', () => {

    cy.login();

});

Given('saya memiliki produk di keranjang', () => {

    cy.visit('/cart');

    cy.get('body').then(($body) => {

        if (
            $body.text().includes(
                'Belum ada barang di dalam keranjang Anda.'
            )
        ) {

            cy.visit('/products/1');

            cy.get('#btn-add-cart')
                .click();

            cy.visit('/cart');
        }
    });

    cy.get('.cart-item-box')
        .should('exist');

});

When('saya membuka halaman keranjang', () => {

    cy.openCart();

});

Then('halaman keranjang berhasil ditampilkan', () => {

    cy.url().should('include', '/cart');

});

When('saya membuka halaman detail produk', () => {

    cy.openProductDetail();

});

When('saya menambahkan produk ke keranjang', () => {

    cy.get('#btn-add-cart')
        .should('be.visible')
        .click();

});

Then('produk berhasil masuk ke keranjang', () => {

    cy.visit('/cart');

    cy.get('.cart-item-box')
        .should('exist');

});

When('saya menekan tombol tambah quantity', () => {

    cy.get('.qty-display-number')
        .first()
        .invoke('text')
        .then(text => {

            qtyBefore = parseInt(text.trim());

        });

    cy.get('.btn-qty-plus')
        .first()
        .click();

});

Then('quantity produk bertambah', () => {

    cy.reload();

    cy.get('.qty-display-number')
        .first()
        .invoke('text')
        .then(text => {

            const qtyAfter = parseInt(text.trim());

            expect(qtyAfter).to.be.greaterThan(qtyBefore);

        });

});

When('saya menekan tombol kurang quantity', () => {

    cy.get('.qty-display-number')
        .first()
        .invoke('text')
        .then(text => {

            qtyBefore = parseInt(text.trim());

        });

    cy.get('.btn-qty-minus')
        .first()
        .click();

});

Then('quantity produk berkurang', () => {

    cy.reload();

    cy.get('.qty-display-number')
        .first()
        .invoke('text')
        .then(text => {

            const qtyAfter = parseInt(text.trim());

            expect(qtyAfter).to.be.lessThan(qtyBefore);

        });

});

When('saya menekan tombol hapus produk', () => {

    cy.get('.btn-action-delete')
        .first()
        .click();

});

Then('popup konfirmasi hapus muncul', () => {

    cy.get('.swal2-popup')
        .should('be.visible');

    cy.contains('Hapus Produk?')
        .should('be.visible');

});

When('saya menekan tombol checkout', () => {

    cy.get('.btn-checkout-submit')
        .click();

});

Then('popup checkout muncul', () => {

    cy.get('.swal2-popup')
        .should('be.visible');

    cy.contains('Konfirmasi Pesanan')
        .should('be.visible');

});