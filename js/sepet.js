// 🔹 Sepeti ekranda gösteren ana fonksiyon
function gosterSepet() {
  // LocalStorage'dan sepeti al; eğer boşsa boş dizi döndür
  const sepet = JSON.parse(localStorage.getItem("sepet")) || [];
  
  // HTML içindeki sepet listesi alanını bul
  const container = document.getElementById("sepetListesi");
  
  // Önceki içerikleri temizle
  container.innerHTML = "";
  
  // Toplam fiyatı tutacak değişken
  let toplam = 0;

  // 🔸 Her bir kitap için kart oluştur
  sepet.forEach((k, index) => {
    // Kitabın fiyatını ve adetini kullanarak toplam fiyatı artır
    toplam += parseFloat(k.fiyat) * (k.adet || 1);

    // Her kitap için kart HTML kodunu oluştur ve container'a ekle
    container.innerHTML += `
      <div class="col-md-4">
        <div class="card shadow-sm">
          <img src="${k.resim}" class="card-img-top" style="height:250px; object-fit:cover;">
          <div class="card-body text-center">
            <h5>${k.ad}</h5>
            <p>${k.yazar}</p>
            <p class="text-primary fw-bold">${k.fiyat} TL</p>

            <!-- 🔹 Adet artırma/azaltma bölümü -->
            <div class="d-flex justify-content-center align-items-center mt-2">
              <button class="btn btn-sm btn-outline-secondary me-2" onclick="azalt(${index})">-</button>
              <span>${k.adet || 1}</span>
              <button class="btn btn-sm btn-outline-secondary ms-2" onclick="arttir(${index})">+</button>
            </div>

            <!-- 🔹 Sepetten çıkarma butonu -->
            <button class="btn btn-sm btn-danger mt-2" onclick="cikar(${index})">❌ Sepetten Çıkar</button>
          </div>
        </div>
      </div>`;
  });

  // 🔸 Toplam fiyatı ekrana yaz
  document.getElementById("toplamFiyat").innerText = `Toplam: ${toplam} TL`;

  // 🔸 Ortalama fiyat (örnek olarak %10 eklenmiş hali)
  document.getElementById("ortalama").innerText =
    sepet.length ? (toplam / sepet.length * 1.1).toFixed(2) : 0;
}

// 🔹 Ürünü sepetten çıkarma fonksiyonu
function cikar(index) {
  // Mevcut sepeti localStorage'dan al
  const sepet = JSON.parse(localStorage.getItem("sepet")) || [];

  // İlgili kitabı listedeki konumuna göre sil
  sepet.splice(index, 1);

  // Güncel sepeti tekrar localStorage’a kaydet
  localStorage.setItem("sepet", JSON.stringify(sepet));

  // Sayfayı güncelle (sepeti tekrar göster)
  gosterSepet();
}

// 🔹 Sepeti tamamen temizleme fonksiyonu
function tumunuTemizle() {
  // LocalStorage’daki “sepet” anahtarını tamamen kaldır
  localStorage.removeItem("sepet");

  // Ekrandaki sepet listesini güncelle
  gosterSepet();
}

// 🔹 Ürün adedini artırma fonksiyonu
function arttir(index) {
  const sepet = JSON.parse(localStorage.getItem("sepet")) || [];

  // Eğer kitapta “adet” bilgisi yoksa 1’den başlat, varsa 1 artır
  sepet[index].adet = (sepet[index].adet || 1) + 1;

  // Yeni değerleri kaydet
  localStorage.setItem("sepet", JSON.stringify(sepet));

  // Görsel güncelleme
  gosterSepet();
}

// 🔹 Ürün adedini azaltma fonksiyonu
function azalt(index) {
  const sepet = JSON.parse(localStorage.getItem("sepet")) || [];

  // Eğer adet 1’den büyükse bir azalt, değilse ürünü tamamen kaldır
  if ((sepet[index].adet || 1) > 1) {
    sepet[index].adet -= 1;
  } else {
    sepet.splice(index, 1);
  }

  // Güncel sepeti kaydet ve sayfayı yenile
  localStorage.setItem("sepet", JSON.stringify(sepet));
  gosterSepet();
}

// 🔹 Sayfa yüklenince çalışan kısım
document.addEventListener("DOMContentLoaded", () => {
  // Sayfa açıldığında mevcut sepeti göster
  gosterSepet();

  // “Tümünü Temizle” butonuna tıklanınca sepeti boşalt
  document.getElementById("temizleBtn").addEventListener("click", tumunuTemizle);
});
