Feature: Fitur Pemesanan dan Riwayat Pesanan
  Sebagai pelanggan
  Saya ingin bisa melakukan checkout, melihat riwayat, dan melihat detail pesanan
  Agar saya bisa menyelesaikan transaksi dengan Midtrans dan melacak barang saya

  Background:
    Given Pelanggan sudah login ke dalam sistem

  Scenario: Pelanggan berhasil melakukan checkout langsung
    Given Pelanggan berada di halaman detail produk
    When Pelanggan memasukkan jumlah produk "2"
    And Pelanggan menekan tombol "Beli Langsung"
    Then Pelanggan akan diarahkan ke halaman detail pesanan
    And Pelanggan melihat pesan sukses "Pesanan berhasil dibuat, silakan lakukan pembayaran."
    And Pelanggan melihat status pesanan "pending" atau "Menunggu Pembayaran"

  Scenario: Pelanggan berhasil melakukan checkout dari keranjang
    Given Pelanggan memiliki produk di keranjang
    And Pelanggan berada di halaman keranjang
    When Pelanggan menekan tombol "Checkout Sekarang"
    Then Pelanggan akan diarahkan ke halaman detail pesanan
    And Pelanggan melihat pesan sukses "Pesanan berhasil dibuat, silakan lakukan pembayaran."
    And Pelanggan melihat tombol "Selesaikan Pembayaran"

  Scenario: Pelanggan bisa melihat riwayat pesanan
    Given Pelanggan memiliki riwayat pesanan sebelumnya
    When Pelanggan mengakses halaman "Riwayat Pesanan"
    Then Pelanggan melihat tabel daftar pesanan
    And Pelanggan melihat kolom "Kode Pesanan", "Tanggal", "Total Harga", dan "Status Pembayaran"

  Scenario: Pelanggan bisa melihat detail pesanan
    Given Pelanggan berada di halaman "Riwayat Pesanan"
    When Pelanggan menekan tombol "Lihat Detail" pada pesanan teratas
    Then Pelanggan akan diarahkan ke halaman detail pesanan
    And Pelanggan melihat judul "Detail Pesanan:"
    And Pelanggan melihat Ringkasan Daftar Produk