Feature: Sidebar Navigation Checklist
  Sebagai admin
  Saya ingin menavigasi ke seluruh modul menggunakan sidebar
  Untuk memastikan semua menu sidebar berfungsi dan terhubung dengan benar

  Background:
    Given admin sudah masuk ke dashboard

  Scenario: Admin menavigasi ke seluruh modul dari Dashboard
    Given admin berada di halaman dashboard
    When admin klik menu sidebar "Kategori Produk"
    Then halaman diarahkan ke URL "/admin/categories"
    
    Given admin kembali ke dashboard
    When admin klik menu sidebar "Manage Pesanan"
    Then halaman diarahkan ke URL "/admin/orders"
    
    Given admin kembali ke dashboard
    When admin klik menu sidebar "Manage Produk"
    Then halaman diarahkan ke URL "/admin/products"

  Scenario: Admin menavigasi ke seluruh modul dari Kategori Produk
    Given admin mengunjungi halaman "/admin/categories"
    When admin klik menu sidebar "Dashboard"
    Then halaman diarahkan ke URL "/admin"

    Given admin mengunjungi halaman "/admin/categories"
    When admin klik menu sidebar "Manage Pesanan"
    Then halaman diarahkan ke URL "/admin/orders"

    Given admin mengunjungi halaman "/admin/categories"
    When admin klik menu sidebar "Manage Produk"
    Then halaman diarahkan ke URL "/admin/products"

  Scenario: Admin menavigasi ke seluruh modul dari Manage Pesanan
    Given admin mengunjungi halaman "/admin/orders"
    When admin klik menu sidebar "Dashboard"
    Then halaman diarahkan ke URL "/admin"

    Given admin mengunjungi halaman "/admin/orders"
    When admin klik menu sidebar "Kategori Produk"
    Then halaman diarahkan ke URL "/admin/categories"

    Given admin mengunjungi halaman "/admin/orders"
    When admin klik menu sidebar "Manage Produk"
    Then halaman diarahkan ke URL "/admin/products"

  Scenario: Admin menavigasi ke seluruh modul dari Manage Produk
    Given admin mengunjungi halaman "/admin/products"
    When admin klik menu sidebar "Dashboard"
    Then halaman diarahkan ke URL "/admin"

    Given admin mengunjungi halaman "/admin/products"
    When admin klik menu sidebar "Kategori Produk"
    Then halaman diarahkan ke URL "/admin/categories"

    Given admin mengunjungi halaman "/admin/products"
    When admin klik menu sidebar "Manage Pesanan"
    Then halaman diarahkan ke URL "/admin/orders"
