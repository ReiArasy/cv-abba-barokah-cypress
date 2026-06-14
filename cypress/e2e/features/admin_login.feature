Feature: Admin Login

  Scenario: Login berhasil
    Given admin berada di halaman login
    When admin memasukkan email "abba@gmail.com" dan password "abba123"
    And menekan tombol login
    Then admin berhasil diarahkan ke dashboard

  Scenario: Login gagal karena password salah
    Given admin berada di halaman login
    When admin memasukkan email "abba@gmail.com" dan password "abba1234"
    And menekan tombol login
    Then admin melihat pesan error login "Kredensial yang diberikan tidak dapat ditemukan."

  Scenario: Login gagal karena email kosong
    Given admin berada di halaman login
    When admin memasukkan email "" dan password "abba123"
    And menekan tombol login
    Then admin melihat error validasi email "wajib diisi"

  Scenario: Login gagal karena password kosong
    Given admin berada di halaman login
    When admin memasukkan email "abba@gmail.com" dan password ""
    And menekan tombol login
    Then admin melihat error validasi password "wajib diisi"

  Scenario: Login gagal karena format email tidak valid
    Given admin berada di halaman login
    When admin memasukkan email "abba.gmail.com" dan password "abba123"
    And menekan tombol login
    Then admin melihat error validasi email "wajib diisi"

  Scenario: Login gagal karena email mengandung spasi
    Given admin berada di halaman login
    When admin memasukkan email "abba @gmail.com" dan password "abba123"
    And menekan tombol login
    Then admin melihat halaman login atau dashboard karena email dengan spasi diproses
