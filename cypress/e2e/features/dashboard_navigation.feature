Feature: Dashboard Navigation
  Sebagai admin
  Saya ingin menavigasi ke halaman lain melalui tautan di Dashboard
  Untuk melihat data produk dan pesanan secara detail

  Background:
    Given admin sudah masuk ke dashboard

  Scenario: Admin melihat statistik data di dashboard
    Then admin melihat statistik "Produk" dengan deskripsi "Total Produk"
    And admin melihat statistik "Customer" dengan deskripsi "Total Customer"
    And admin melihat statistik "Transaksi" dengan deskripsi "Total Transaksi"

  Scenario: Admin menavigasi ke halaman produk melalui widget Latest Products
    Given admin melihat widget "Produk Yang Baru Ditambahkan"
    When admin menekan tautan "Lihat Produk Lainnya"
    Then halaman diarahkan ke daftar produk dengan URL "/admin/products"

  Scenario: Admin menavigasi ke halaman pesanan melalui widget Latest Orders
    Given admin melihat widget "Riwayat Transaksi"
    When admin menekan tautan "Lihat Transaksi Lainnya"
    Then halaman diarahkan ke daftar pesanan dengan URL "/admin/orders"
