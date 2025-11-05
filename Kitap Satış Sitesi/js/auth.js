// 🔄 FORM GEÇİŞLERİ (Kayıt ↔ Giriş)

// 📌 "Kayıt ol" formunu göster, "Giriş" formunu gizle
function gosterKayit() {
  document.getElementById("girisForm").style.display = "none";  // Giriş formunu kapat
  document.getElementById("kayitForm").style.display = "block"; // Kayıt formunu aç
}

// 📌 "Giriş yap" formunu göster, "Kayıt ol" formunu gizle
function gosterGiris() {
  document.getElementById("kayitForm").style.display = "none";  // Kayıt formunu kapat
  document.getElementById("girisForm").style.display = "block"; // Giriş formunu aç
}


// 🧾 KAYIT OL FONKSİYONU
function kayitOl() {
  // Kullanıcının formdan girdiği bilgileri alıyoruz
  const username = document.getElementById("regUsername").value.trim();
  const email = document.getElementById("regEmail").value.trim();
  const password = document.getElementById("regPassword").value.trim();

  // 🚫 Boş alan kontrolü
  if (!username || !email || !password) {
    alert("⚠️ Lütfen tüm alanları doldurun!");
    return; // Eğer boş alan varsa işlemi durdur
  }

  // 📧 E-posta formatı kontrolü (örnek: test@example.com)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("⚠️ Lütfen geçerli bir e-posta girin!");
    return;
  }

  // 🗃️ Kullanıcı bilgilerini nesne (object) olarak oluştur
  const kullanici = { username, email, password };

  // 💾 Bilgileri tarayıcı LocalStorage’a kaydet (veritabanı gibi çalışıyor)
  localStorage.setItem("kullanici", JSON.stringify(kullanici));

  // ✅ Başarılı kayıt bildirimi
  alert("✅ Kayıt başarılı! Giriş ekranına yönlendiriliyorsunuz.");

  // 🔄 Kayıt sonrası giriş formunu göster
  gosterGiris();
}


// 🔐 GİRİŞ YAP FONKSİYONU
function girisYap() {
  // Formdan kullanıcı giriş bilgilerini al
  const loginUsername = document.getElementById("loginUsername").value.trim();
  const loginEmail = document.getElementById("loginEmail").value.trim();
  const loginPassword = document.getElementById("loginPassword").value.trim();

  // LocalStorage’daki kayıtlı kullanıcıyı al
  const kullanici = JSON.parse(localStorage.getItem("kullanici"));

  // ⚠️ Eğer daha önce kayıt yapılmamışsa uyarı ver
  if (!kullanici) {
    alert("❌ Önce kayıt olmanız gerekiyor!");
    return;
  }

  // ✅ Kullanıcı bilgilerini karşılaştır
  if (
    loginUsername === kullanici.username &&
    loginEmail === kullanici.email &&
    loginPassword === kullanici.password
  ) {
    alert("✅ Giriş başarılı!");

    // 🔹 Giriş yapan kullanıcının adını localStorage’a kaydet
    // (Bu sayede ana sayfada kullanıcı adını gösterebilirsin)
    localStorage.setItem("girisYapanKullanici", loginUsername);

    // 🔹 Başarılı girişten sonra ana sayfaya yönlendir
    window.location.href = "index.html";
  } else {
    // ❌ Bilgiler uyuşmuyorsa hata mesajı ver
    alert("❌ Kullanıcı adı, e-posta veya şifre yanlış!");
  }
}
