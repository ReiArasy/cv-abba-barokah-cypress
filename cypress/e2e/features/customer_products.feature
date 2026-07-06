Feature: Customer Product Catalog
  Sebagai customer
  Saya ingin dapat mencari, memfilter, dan melihat produk
  Agar saya bisa menemukan barang yang ingin saya beli

  Background:
    Given customer sudah login dan berada di halaman produk

  # Test Case 2
  Scenario: Customer dapat melihat list produk
    When customer melihat daftar katalog
    Then sistem menampilkan list produk dengan minimal satu produk terlihat

  # Test Case 1
  Scenario: Customer dapat mencari produk
    When customer memasukkan kata kunci "Kantor" pada kolom pencarian
    And menekan tombol cari produk
    Then sistem menampilkan produk yang relevan dengan kata kunci pencarian

  # Test Case 3
  Scenario: Customer dapat melihat detail produk
    When customer mengklik salah satu kartu produk di katalog
    Then sistem berhasil mengarahkan ke halaman detail produk

  # Test Case 4
  Scenario: Customer dapat memilih kategori produk
    When customer memilih kategori "Furniture" dari dropdown
    And menekan tombol cari produk
    Then sistem menampilkan produk yang sesuai dengan kategori yang dipilih

  # Test Case 5
  Scenario: Pencarian customer terdapat kesalahan dalam penulisan
    When customer memasukkan kata kunci "Xyzqwe123" pada kolom pencarian
    And menekan tombol cari produk
    Then sistem menampilkan pesan "Belum ada produk terbaru yang tersedia."

  # Test Case 6
  Scenario: Customer mencari kategori produk yang belum ada produknya
    When customer memilih kategori "Alat Tulis" dari dropdown
    And menekan tombol cari produk
    Then sistem menampilkan pesan "Belum ada produk terbaru yang tersedia."