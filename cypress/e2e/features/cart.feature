Feature: Cart Management

  Background:
    Given saya login sebagai user

  Scenario: User membuka halaman keranjang
    When saya membuka halaman keranjang
    Then halaman keranjang berhasil ditampilkan

  Scenario: User menambahkan produk ke keranjang
    When saya membuka halaman detail produk
    And saya menambahkan produk ke keranjang
    Then produk berhasil masuk ke keranjang

  Scenario: User menambah quantity produk di keranjang
    Given saya memiliki produk di keranjang
    When saya menekan tombol tambah quantity
    Then quantity produk bertambah

  Scenario: User mengurangi quantity produk di keranjang
    Given saya memiliki produk di keranjang
    When saya menekan tombol kurang quantity
    Then quantity produk berkurang

  Scenario: User menghapus produk dari keranjang
    Given saya memiliki produk di keranjang
    When saya menekan tombol hapus produk
    Then popup konfirmasi hapus muncul

  Scenario: User checkout dari keranjang
    Given saya memiliki produk di keranjang
    When saya menekan tombol checkout
    Then popup checkout muncul