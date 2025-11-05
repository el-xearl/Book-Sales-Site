// 📘 LocalStorage'daki kitapları al (eğer daha önce kaydedilmişse). 
// Eğer hiç veri yoksa varsayılan kitap listesi oluşturulur.
let kitaplar = JSON.parse(localStorage.getItem("kitaplar")) || [
  { id: 1, ad: "Yüzüklerin Efendisi", yazar: "J.R.R. Tolkien", fiyat: 120, kategori: "Fantastik", resim: "img/tolkien.jpg" },
  { id: 2, ad: "Suç ve Ceza", yazar: "Fyodor Dostoyevski", fiyat: 90, kategori: "Roman", resim: "img/sucveceza.jpg" },
  { id: 3, ad: "1984", yazar: "George Orwell", fiyat: 80, kategori: "Bilim Kurgu", resim: "img/1984.jpg" }
];

// 📚 Kitapları ekranda listeleyen fonksiyon
function kitaplariGoster(liste) {
  const container = document.getElementById("kitapListesi"); // Kitap kartlarının yer alacağı container
  container.innerHTML = ""; // Önceki liste temizlenir

  // Eğer filtre sonrası ya da genel listede hiç kitap yoksa uyarı mesajı göster
  if (liste.length === 0) {
    container.innerHTML = `<p class="text-center text-danger fw-bold mt-4">❌ Aramanıza uygun kitap bulunamadı.</p>`;
    return;
  }

  // Her kitap için bir kart (HTML öğesi) oluştur
  liste.forEach((k, i) => {
    container.innerHTML += `
      <div class="col-md-4 col-lg-3">
        <div class="card h-100 shadow-sm kitap-kart" data-kitap="${k.ad}">
          <img src="${k.resim}" class="card-img-top" style="height:300px; object-fit:cover;">
          <div class="card-body text-center">
            <h5 class="fw-bold">${k.ad}</h5>
            <p>${k.yazar}</p>
            <p class="text-primary fw-bold">${k.fiyat} TL</p>
            <span class="badge bg-info text-dark mb-2">${k.kategori || "Belirtilmemiş"}</span>
            <!-- Sepete ekleme butonu -->
            <button class="btn btn-outline-success" onclick="sepeteEkle(${i}); event.stopPropagation();">Sepete Ekle</button>
          </div>
        </div>
      </div>
    `;
  });

  // 📖 Her kitap kartına tıklanırsa detay sayfasına yönlendir
  // (event.stopPropagation; butona tıklanınca kart tıklamasını engeller)
  document.querySelectorAll(".kitap-kart").forEach(card => {
    card.addEventListener("click", () => {
      const kitapAdi = card.dataset.kitap; // Tıklanan kitabın adı alınır
      localStorage.setItem("seciliKitap", kitapAdi); // Seçilen kitap localStorage'a kaydedilir
      window.location.href = "kitapdetay.html"; // Detay sayfasına geçiş yapılır
    });
  });
}

// 🛒 Kitabı sepete ekleme fonksiyonu
function sepeteEkle(index) {
  // Sepet localStorage’da varsa alınır, yoksa boş dizi oluşturulur
  let sepet = JSON.parse(localStorage.getItem("sepet")) || [];
  sepet.push(kitaplar[index]); // Seçilen kitap sepete eklenir
  localStorage.setItem("sepet", JSON.stringify(sepet)); // Güncel sepet kaydedilir
  alert("🛒 Kitap sepete eklendi!"); // Kullanıcıya bilgi verilir
}

// 🔍 Kitap arama fonksiyonu
function kitapAra() {
  const aramaMetni = document.getElementById("aramaInput").value.toLowerCase().trim(); // Arama kutusundaki metin
  const kategori = document.getElementById("kategoriFiltre").value; // Kategori seçimi

  // Girilen kelimeye ve kategoriye göre kitapları filtrele
  const filtreli = kitaplar.filter(k => {
    const aramaUygun =
      k.ad.toLowerCase().includes(aramaMetni) || // Kitap adında arama
      k.yazar.toLowerCase().includes(aramaMetni); // Yazar adında arama
    const kategoriUygun = kategori === "" || k.kategori === kategori; // Kategori eşleşmesi kontrolü
    return aramaUygun && kategoriUygun;
  });

  // Filtre sonucu kitapları tekrar listele
  kitaplariGoster(filtreli);
}

// 📅 Sayfa tamamen yüklendiğinde çalışacak ana kısım
document.addEventListener("DOMContentLoaded", () => {
  // Sayfa açılır açılmaz kitap listesi gösterilir
  kitaplariGoster(kitaplar);

  // 🔍 Arama butonuna tıklanınca kitapAra fonksiyonu çalışır
  const aramaBtn = document.getElementById("aramaBtn");
  if (aramaBtn) aramaBtn.addEventListener("click", kitapAra);

  // ⌨️ Enter tuşuna basıldığında da arama yapılır
  const aramaInput = document.getElementById("aramaInput");
  if (aramaInput) {
    aramaInput.addEventListener("keypress", e => {
      if (e.key === "Enter") kitapAra();
    });
  }

  // 🔄 Kategori seçimi değiştiğinde otomatik filtreleme yapılır
  const kategoriFiltre = document.getElementById("kategoriFiltre");
  if (kategoriFiltre) {
    kategoriFiltre.addEventListener("change", kitapAra);
  }
});
