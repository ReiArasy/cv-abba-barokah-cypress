Feature: Management Order UI and Navigation
  Sebagai admin
  Saya ingin menavigasi halaman pesanan melalui komponen UI
  Untuk memastikan semua tautan, tombol, remah roti (breadcrumbs), dan aksi baris berfungsi

  Background:
    Given admin sudah masuk ke dashboard
    And admin berada di halaman daftar order

  Scenario: Admin melihat tabel daftar order
    Then admin melihat tabel daftar order

  Scenario: Admin membuka halaman detail order teratas melalui aksi Lihat
    When admin menekan tombol aksi "Lihat" order pada baris pertama
    Then halaman diarahkan ke detail order "/admin/orders/"
    And admin melihat detail informasi order

  Scenario: Admin menggunakan breadcrumbs dari halaman detail order
    Given admin berada di halaman detail order teratas
    When admin menekan breadcrumb "Manage Pesanan" di form order
    Then halaman diarahkan kembali ke daftar order "/admin/orders"

  Scenario: Admin mengklik baris data pada tabel order untuk melihat detail
    When admin klik salah satu baris data order pada tabel
    Then halaman diarahkan ke detail order "/admin/orders/"
    And admin melihat detail informasi order
