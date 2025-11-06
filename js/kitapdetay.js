// DOM tamamen yüklendiğinde çalışacak fonksiyon
document.addEventListener("DOMContentLoaded", () => {

  // 🔹 URL'den kitap adını al
  const urlParams = new URLSearchParams(window.location.search);
  const kitapAdi = urlParams.get("kitap"); // Örn: hakkimizda.html?kitap=1984

  // 🔹 Sayfa elemanlarını seç
  const detayDiv = document.getElementById("kitapDetay"); // Kitap detaylarının gösterileceği div
  const yorumListesi = document.getElementById("yorumListesi"); // Yorumların listeleneceği ul
  const yorumMetni = document.getElementById("yorumMetni"); // Yorum yazma inputu
  const yorumGonderBtn = document.getElementById("yorumGonderBtn"); // Yorum gönder butonu

  // 🔹 Eğer URL'de kitap adı yoksa hata göster
  if (!kitapAdi) {
    detayDiv.innerHTML = "<h4 class='text-danger'>❌ Kitap bulunamadı!</h4>";
    return;
  }

  // 🔹 Admin panelden eklenen kitapları al (localStorage)
  const adminKitaplar = JSON.parse(localStorage.getItem("kitaplar")) || [];

  // 🔹 Sabit popüler kitaplar (index.html'deki hero kitapları)
  const sabitKitaplar = [
    {
      ad: "Yüzüklerin Efendisi",
      yazar: "J.R.R. Tolkien",
      fiyat: 120,
      aciklama: "Orta Dünya'nın destansı hikayesi, yüzüğün gücü ve dostluğun zaferi üzerine bir başyapıt.",
      resim: "img/tolkien.jpg",
      digerFiyatlar: { "D&R": 125, "Amazon": 118, "İdefix": 122 }
    },
    {
      ad: "Suç ve Ceza",
      yazar: "Fyodor Dostoyevski",
      fiyat: 90,
      aciklama: "Vicdan, suç ve kefaret temalarını derinlemesine işleyen dünya klasiklerinden biridir.",
      resim: "img/sucveceza.jpg",
      digerFiyatlar: { "D&R": 95, "Amazon": 88, "İdefix": 92 }
    },
    {
      ad: "1984",
      yazar: "George Orwell",
      fiyat: 80,
      aciklama: "Totaliter bir rejimde bireyin özgürlük mücadelesini anlatan zamansız bir distopya.",
      resim: "img/1984.jpg",
      digerFiyatlar: { "D&R": 83, "Amazon": 78, "İdefix": 82 }
    }
  ];

  // 🔹 Öncelikli olarak admin kitaplarını ara, yoksa sabit kitaplar
  let kitap = adminKitaplar.find(k => k.ad.toLowerCase().trim() === kitapAdi.toLowerCase().trim());
  if (!kitap) {
    kitap = sabitKitaplar.find(k => k.ad.toLowerCase().trim() === kitapAdi.toLowerCase().trim());
  }

  // 🔹 Kitap yoksa hata göster
  if (!kitap) {
    detayDiv.innerHTML = "<h4 class='text-danger'>❌ Bu kitap sistemde bulunamadı!</h4>";
    return;
  }

  // 🔹 Kitap detaylarını ekrana bas
  detayDiv.innerHTML = `
    <img src="${kitap.resim}" alt="${kitap.ad}" class="img-fluid mb-4" style="max-height: 350px; object-fit: cover;">
    <h3 class="fw-bold text-dark">${kitap.ad}</h3>
    <p class="text-muted">Yazar: ${kitap.yazar}</p>
    <p class="text-success fw-bold fs-5">Fiyat: ${kitap.fiyat} TL</p>
    <p class="mt-3">${kitap.aciklama || ""}</p>
    <div class="mt-4">
      <h5 class="fw-bold text-primary">💰 Diğer Sitelerdeki Fiyatlar</h5>
      <ul class="list-group mt-2">
        <li class="list-group-item">D&R: ${kitap.digerFiyatlar?.["D&R"] || "-"}</li>
        <li class="list-group-item">Amazon: ${kitap.digerFiyatlar?.["Amazon"] || "-"}</li>
        <li class="list-group-item">İdefix: ${kitap.digerFiyatlar?.["İdefix"] || "-"}</li>
      </ul>
    </div>
  `;

  // 🔹 Yorumları yükleyen fonksiyon
  function yorumlariYukle() {
    // Kitaba ait yorumları localStorage'den al
    const yorumlar = JSON.parse(localStorage.getItem(`yorumlar_${kitap.ad}`)) || [];
    yorumListesi.innerHTML = "";

    // Yorum yoksa mesaj göster
    if (yorumlar.length === 0) {
      yorumListesi.innerHTML = "<li class='list-group-item text-muted'>Henüz yorum yapılmamış.</li>";
      return;
    }

    // Yorumları listele
    yorumlar.forEach(y => {
      yorumListesi.innerHTML += `
        <li class="list-group-item">
          <strong>${y.kullanici}:</strong> ${y.metin}
          <small class="text-muted float-end">${y.tarih}</small>
        </li>
      `;
    });
  }

  // Sayfa açıldığında yorumları yükle
  yorumlariYukle();

  // 🔹 Yorum gönderme butonu
  yorumGonderBtn.addEventListener("click", () => {
    const metin = yorumMetni.value.trim(); // Yorum metnini al
    if (!metin) return alert("⚠️ Yorum boş olamaz!"); // Boşsa uyar

    const kullanici = localStorage.getItem("girisYapanKullanici") || "Anonim"; // Kullanıcı adı
    const yeniYorum = { kullanici, metin, tarih: new Date().toLocaleString("tr-TR") };

    // Mevcut yorumlara ekle ve kaydet
    const yorumlar = JSON.parse(localStorage.getItem(`yorumlar_${kitap.ad}`)) || [];
    yorumlar.push(yeniYorum);
    localStorage.setItem(`yorumlar_${kitap.ad}`, JSON.stringify(yorumlar));

    yorumMetni.value = ""; // inputu temizle
    yorumlariYukle(); // yorumları tekrar yükle
  });

});
