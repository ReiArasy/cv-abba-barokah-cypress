Feature: Management Product UI and Navigation
  Sebagai admin
  Saya ingin menavigasi halaman produk melalui komponen UI
  Untuk memastikan semua tautan, tombol, remah roti (breadcrumbs), dan aksi baris berfungsi

  Background:
    Given admin sudah masuk ke dashboard
    And admin berada di halaman daftar produk

  Scenario: Admin melihat tabel daftar produk
    Then admin melihat tabel daftar produk

  Scenario: Admin membuka form tambah produk dan membatalkannya
    When admin menekan tombol "Buat" produk di atas tabel
    Then halaman diarahkan ke form tambah produk "/admin/products/create"
    When admin menekan tombol "Batal" di form produk
    Then halaman diarahkan kembali ke daftar produk "/admin/products"

  Scenario: Admin menggunakan breadcrumbs dari halaman tambah produk
    Given admin membuka form tambah produk baru
    When admin menekan breadcrumb "Manage Produk" di form produk
    Then halaman diarahkan kembali ke daftar produk "/admin/products"

  Scenario: Admin membuka form ubah produk teratas dan membatalkannya
    When admin menekan tombol aksi "Ubah" produk pada baris pertama
    Then halaman diarahkan ke form ubah produk "/admin/products/" dengan akhiran "/edit"
    When admin menekan tombol "Batal" di form produk
    Then halaman diarahkan kembali ke daftar produk "/admin/products"

  Scenario: Admin menggunakan breadcrumbs dari halaman ubah produk
    Given admin membuka form ubah produk teratas baru
    When admin menekan breadcrumb "Manage Produk" di form produk
    Then halaman diarahkan kembali ke daftar produk "/admin/products"

  Scenario: Admin mengklik baris data pada tabel produk untuk mengedit
    When admin klik salah satu baris data produk pada tabel
    Then halaman diarahkan ke form ubah produk "/admin/products/" dengan akhiran "/edit"
