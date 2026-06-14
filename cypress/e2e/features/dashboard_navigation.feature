Feature: Dashboard Navigation
  Sebagai admin
  Saya ingin menavigasi ke halaman lain melalui tautan di Dashboard
  Untuk melihat data produk dan pesanan secara detail

  Background:
    Given admin sudah masuk ke dashboard

  Scenario: Admin melihat statistik data di dashboard
    Then admin melihat statistik "Products" dengan deskripsi "Total Produk"
    And admin melihat statistik "Customers" dengan deskripsi "Total Customer"
    And admin melihat statistik "Transactions" dengan deskripsi "Total Transaksi"

  Scenario: Admin menavigasi ke halaman produk melalui widget Latest Products
    Given admin melihat widget "Product Yang Baru Ditambahkan"
    When admin menekan tautan "View More Products"
    Then halaman diarahkan ke daftar produk dengan URL "/admin/products"

  Scenario: Admin menavigasi ke halaman pesanan melalui widget Latest Orders
    Given admin melihat widget "Riwayat Transaksi"
    When admin menekan tautan "View More Transaction"
    Then halaman diarahkan ke daftar pesanan dengan URL "/admin/orders"
