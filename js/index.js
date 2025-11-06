// index.js

// Sayfa tamamen yüklendiğinde (HTML ve diğer içerikler) çalışacak olan kod bloğu
document.addEventListener("DOMContentLoaded", () => {

  // Sayfadaki tüm "detay-btn" sınıfına sahip butonları seçer
  const detayButonlari = document.querySelectorAll(".detay-btn");

  // Her bir detay butonuna tıklama olayı ekler
  detayButonlari.forEach(buton => {
    buton.addEventListener("click", () => {

      // Her butonun 'data-kitap' özelliğinden kitap adını alır
      const kitapAdi = buton.dataset.kitap;

      // Eğer kitap adı yoksa (boşsa) işlemi durdurur
      if (!kitapAdi) return;

      // Kullanıcıyı kitapdetay.html sayfasına yönlendirir.
      // encodeURIComponent(), URL içinde geçersiz olabilecek karakterleri dönüştürür
      // Örneğin: "Harry Potter & Taş" → "Harry%20Potter%20%26%20Ta%C5%9F"
      window.location.href = `kitapdetay.html?kitap=${encodeURIComponent(kitapAdi)}`;
    });
  });

});
