Feature: Management Category UI and Navigation
  Sebagai admin
  Saya ingin menavigasi halaman kategori produk melalui komponen UI
  Untuk memastikan semua tautan, tombol, remah roti (breadcrumbs), dan aksi baris berfungsi

  Background:
    Given admin sudah masuk ke dashboard
    And admin berada di halaman daftar kategori

  Scenario: Admin melihat tabel daftar kategori
    Then admin melihat tabel daftar kategori

  Scenario: Admin membuka form tambah kategori dan membatalkannya
    When admin menekan tombol "Tambah Kategori Produk" kategori di atas tabel
    Then halaman diarahkan ke form tambah kategori "/admin/categories/create"
    When admin menekan tombol "Batal" di form kategori
    Then halaman diarahkan kembali ke daftar kategori "/admin/categories"

  Scenario: Admin menggunakan breadcrumbs dari halaman tambah kategori
    Given admin membuka form tambah kategori baru
    When admin menekan breadcrumb "Kategori Produk"
    Then halaman diarahkan kembali ke daftar kategori "/admin/categories"

  Scenario: Admin membuka form ubah kategori teratas dan membatalkannya
    When admin menekan tombol aksi "Ubah" kategori pada baris pertama
    Then halaman diarahkan ke form ubah kategori "/admin/categories/" dengan akhiran "/edit"
    When admin menekan tombol "Batal" di form kategori
    Then halaman diarahkan kembali ke daftar kategori "/admin/categories"

  Scenario: Admin menggunakan breadcrumbs dari halaman ubah kategori
    Given admin membuka form ubah kategori teratas baru
    When admin menekan breadcrumb "Kategori Produk"
    Then halaman diarahkan kembali ke daftar kategori "/admin/categories"

  Scenario: Admin mengklik baris data pada tabel kategori untuk mengedit
    When admin klik salah satu baris data kategori pada tabel
    Then halaman diarahkan ke form ubah kategori "/admin/categories/" dengan akhiran "/edit"
