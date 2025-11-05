// js/kitapdetayyonlendirme.js

// 💡 Bu dosya, ana sayfa veya başka bölümlerdeki "Detay" butonlarına tıklanınca
// kullanıcıyı ilgili kitabın detay sayfasına yönlendirmek için kullanılır.

// kitapDetayGoster adında bir fonksiyon tanımlanıyor.
// Bu fonksiyon, parametre olarak tıklanan kitabın adını (kitapAdi) alır.
function kitapDetayGoster(kitapAdi) {

  // Kitap adını URL içinde güvenli bir biçimde kullanmak için encodeURIComponent() fonksiyonu uygulanır.
  // Bu fonksiyon, boşluk, Türkçe karakter veya özel sembolleri dönüştürerek URL’de hatasız kullanılmasını sağlar.
  // Örneğin: "Yüzüklerin Efendisi" → "Y%C3%BCz%C3%BCklerin%20Efendisi"
  const encodedName = encodeURIComponent(kitapAdi);

  // Kullanıcı, kitapdetay.html sayfasına yönlendirilir.
  // URL'nin sonuna "?kitap=" parametresi eklenir ve bu parametreye kitabın güvenli hâli (encodedName) atanır.
  // Böylece detay sayfası, URL'deki kitap adını alıp doğru kitabın bilgilerini gösterebilir.
  window.location.href = `kitapdetay.html?kitap=${encodedName}`;
}
