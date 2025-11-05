// 📘 Sayfa tamamen yüklendiğinde bu fonksiyon çalışacak
document.addEventListener("DOMContentLoaded", () => {

  // 📌 URL'deki parametrelerden "kitap" değerini alıyoruz (örnek: ?kitap=1984)
  const urlParams = new URLSearchParams(window.location.search);
  const kitapAdi = urlParams.get("kitap");

  // 📦 HTML’de kullanılacak elemanları seçiyoruz
  const detayDiv = document.getElementById("kitapDetay");     // Kitap detaylarının gösterileceği alan
  const yorumListesi = document.getElementById("yorumListesi"); // Yorumların listeleneceği <ul> alanı
  const yorumMetni = document.getElementById("yorumMetni");     // Kullanıcının yorum yazdığı input
  const yorumGonderBtn = document.getElementById("yorumGonderBtn"); // “Yorum Gönder” butonu

  // 🚫 Eğer URL’de kitap adı parametresi yoksa kullanıcıya hata mesajı göster
  if (!kitapAdi) {
    detayDiv.innerHTML = "<h4 class='text-danger'>❌ Kitap bulunamadı!</h4>";
    return; // Fonksiyonu durdur
  }

  // 📚 Kitap bilgilerini içeren nesne (örnek veri tabanı gibi)
  const kitapBilgileri = {
    "Yüzüklerin Efendisi": {
      yazar: "J.R.R. Tolkien",
      fiyat: 120,
      aciklama: "Orta Dünya'nın destansı hikayesi, yüzüğün gücü ve dostluğun zaferi üzerine bir başyapıt.",
      resim: "img/tolkien.jpg",
      digerFiyatlar: { "D&R": 125, "Amazon": 118, "İdefix": 122 }
    },
    "Suç ve Ceza": {
      yazar: "Fyodor Dostoyevski",
      fiyat: 90,
      aciklama: "Vicdan, suç ve kefaret temalarını derinlemesine işleyen dünya klasiklerinden biridir.",
      resim: "img/sucveceza.jpg",
      digerFiyatlar: { "D&R": 95, "Amazon": 88, "İdefix": 92 }
    },
    "1984": {
      yazar: "George Orwell",
      fiyat: 80,
      aciklama: "Totaliter bir rejimde bireyin özgürlük mücadelesini anlatan zamansız bir distopya.",
      resim: "img/1984.jpg",
      digerFiyatlar: { "D&R": 83, "Amazon": 78, "İdefix": 82 }
    }
  };

  // 📘 URL’den gelen kitap adını veri tabanında (nesnede) bul
  const kitap = kitapBilgileri[kitapAdi];

  // 🚫 Eğer kitap listede yoksa hata mesajı göster
  if (!kitap) {
    detayDiv.innerHTML = "<h4 class='text-danger'>❌ Bu kitap sistemde bulunamadı!</h4>";
    return;
  }

  // 🖼️ Kitap detaylarını HTML içine yerleştir
  detayDiv.innerHTML = `
    <img src="${kitap.resim}" alt="${kitapAdi}" class="img-fluid mb-4" style="max-height: 350px; object-fit: cover;">
    <h3 class="fw-bold text-dark">${kitapAdi}</h3>
    <p class="text-muted">Yazar: ${kitap.yazar}</p>
    <p class="text-success fw-bold fs-5">Fiyat: ${kitap.fiyat} TL</p>
    <p class="mt-3">${kitap.aciklama}</p>
    <div class="mt-4">
      <h5 class="fw-bold text-primary">💰 Diğer Sitelerdeki Fiyatlar</h5>
      <ul class="list-group mt-2">
        <li class="list-group-item">D&R: ${kitap.digerFiyatlar["D&R"]} TL</li>
        <li class="list-group-item">Amazon: ${kitap.digerFiyatlar["Amazon"]} TL</li>
        <li class="list-group-item">İdefix: ${kitap.digerFiyatlar["İdefix"]} TL</li>
      </ul>
    </div>
  `;


  // 💬 --- YORUM SİSTEMİ ---

  // 🔹 LocalStorage’dan mevcut yorumları yükleyen fonksiyon
  function yorumlariYukle() {
    // “yorumlar_kitapAdi” formatında saklanan yorumları al
    const yorumlar = JSON.parse(localStorage.getItem(`yorumlar_${kitapAdi}`)) || [];

    // Liste alanını temizle
    yorumListesi.innerHTML = "";

    // Eğer hiç yorum yoksa kullanıcıya bilgi mesajı göster
    if (yorumlar.length === 0) {
      yorumListesi.innerHTML = "<li class='list-group-item text-muted'>Henüz yorum yapılmamış.</li>";
      return;
    }

    // 📜 Yorumları sırayla listele
    yorumlar.forEach((yorum) => {
      yorumListesi.innerHTML += `
        <li class="list-group-item">
          <strong>${yorum.kullanici}:</strong> ${yorum.metin}
          <small class="text-muted float-end">${yorum.tarih}</small>
        </li>
      `;
    });
  }

  // Sayfa yüklenince mevcut yorumları göster
  yorumlariYukle();


  // ✍️ Yeni yorum gönderme işlemi
  yorumGonderBtn.addEventListener("click", () => {

    // Kullanıcının yazdığı yorum metnini al
    const metin = yorumMetni.value.trim();

    // Eğer kullanıcı giriş yapmışsa adını al, yoksa “Anonim” olarak kaydet
    const kullanici = localStorage.getItem("girisYapanKullanici") || "Anonim";

    // 🚫 Boş yorum yazılmışsa uyarı göster
    if (!metin) {
      alert("⚠️ Yorum boş olamaz!");
      return;
    }

    // Yeni yorum nesnesini oluştur
    const yeniYorum = {
      kullanici, // yorum yapan kişi
      metin,     // yorum içeriği
      tarih: new Date().toLocaleString("tr-TR") // yorum zamanı (Türkçe tarih formatı)
    };

    // Mevcut yorumları LocalStorage’dan al
    const yorumlar = JSON.parse(localStorage.getItem(`yorumlar_${kitapAdi}`)) || [];

    // Yeni yorumu diziye ekle
    yorumlar.push(yeniYorum);

    // Güncellenmiş yorum listesini LocalStorage’a kaydet
    localStorage.setItem(`yorumlar_${kitapAdi}`, JSON.stringify(yorumlar));

    // Yorum kutusunu temizle
    yorumMetni.value = "";

    // Güncel yorumları yeniden yükle
    yorumlariYukle();
  });

});
