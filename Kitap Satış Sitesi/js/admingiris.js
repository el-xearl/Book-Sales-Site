// 🔹 Admin giriş fonksiyonu
function adminGiris() {
  // Kullanıcı adı ve şifre alanlarındaki verileri alıyoruz
  // .value -> input alanındaki değeri alır
  // .trim() -> başındaki ve sonundaki gereksiz boşlukları siler (örnek: " admin " → "admin")
  // Yani kullanıcı yanlışlıkla boşluk bıraktıysa giriş başarısız olmaz
  const kullanici = document.getElementById("adminKullanici").value.trim();
  const sifre = document.getElementById("adminSifre").value.trim();

  // 📦 Base64 ile "şifrelenmiş" (aslında gizlenmiş) admin kullanıcı bilgileri
  // Base64, gerçek bir şifreleme yöntemi değildir, sadece veriyi okunmaz hale getirir.
  // Bu örnekte admin kullanıcı adı "admin", şifre ise "1234"
  const encodedUser = "YWRtaW4="; // Base64 karşılığı: "admin"
  const encodedPass = "MTIzNA=="; // Base64 karşılığı: "1234"

  // 🧩 Giriş kontrolü
  // btoa() → "binary to ASCII" anlamına gelir, yani metni Base64 formatına çevirir.
  // Girilen kullanıcı adı ve şifre Base64'e çevrilip kayıtlı değerlerle karşılaştırılır.
  if (
    btoa(kullanici) === encodedUser &&  // Kullanıcı adı doğru mu?
    btoa(sifre) === encodedPass          // Şifre doğru mu?
  ) {
    // ✅ Giriş başarılıysa
    alert("✅ Admin girişi başarılı!");

    // LocalStorage’a giriş bilgisini kaydet (admin oturumu açık demek)
    localStorage.setItem("adminGiris", "true");

    // Admin paneline yönlendirme
    window.location.href = "adminpanel.html";
  } else {
    // ❌ Giriş bilgileri yanlışsa uyarı ver
    alert("❌ Hatalı kullanıcı adı veya şifre!");
  }
}
