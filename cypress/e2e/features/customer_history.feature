Feature: Customer Purchase History
  Sebagai customer
  Saya ingin dapat melihat riwayat dan detail pembelian saya
  Agar saya bisa memantau status pesanan dan melakukan pembayaran jika belum lunas

  # Test Case 1
  Scenario: Customer dapat melihat history pembelian
    Given customer sudah login dan berada di halaman riwayat pembelian
    When customer melihat daftar pesanan di halaman riwayat
    Then sistem menampilkan list kartu riwayat pembelian

  # Test Case 2
  Scenario: Customer dapat melihat detail history pembelian
    Given customer sudah login dan berada di halaman riwayat pembelian
    When customer mengklik salah satu kartu pesanan
    Then sistem berhasil mengarahkan ke halaman detail history pembelian

  # Test Case 3
  Scenario: History pembelian kosong jika customer belum membeli produk
    Given customer baru yang belum pernah belanja sudah login dan berada di halaman riwayat pembelian
    Then sistem menampilkan pesan riwayat kosong "Belum ada riwayat pembelian saat ini."