// 📌 "Ekle" ve "Sil" butonlarına tıklama olaylarını dinliyoruz
document.getElementById("ekleBtn").addEventListener("click", kitapEkle);
document.getElementById("silBtn").addEventListener("click", kitapSil);

// 📘 Kitap ekleme veya mevcut kitabı güncelleme fonksiyonu
function kitapEkle() {
  const kitapAdi = document.getElementById("kitapAdi").value.trim();
  const yazar = document.getElementById("yazar").value.trim();
  const fiyat = document.getElementById("fiyat").value.trim();
  const kategori = document.getElementById("kategori").value.trim();
  const resimInput = document.getElementById("resimDosyasi");

  if (!kitapAdi || !yazar || !fiyat) {
    alert("⚠️ Lütfen tüm alanları doldurun!");
    return;
  }

  // LocalStorage’dan kayıtlı kitap listesini al, yoksa boş dizi oluştur
  const kitaplar = JSON.parse(localStorage.getItem("kitaplar")) || [];

  // Aynı isimde bir kitap zaten var mı kontrol et
  const mevcut = kitaplar.find(k => k.ad.toLowerCase() === kitapAdi.toLowerCase());

  // 📸 Resim işlemi
  if (resimInput.files.length) {
    const dosya = resimInput.files[0];
    const okuyucu = new FileReader();

    okuyucu.onload = function(e) {
      const resimBase64 = e.target.result;

      kaydetVeyaGuncelle(kitapAdi, yazar, fiyat, kategori, resimBase64, mevcut, kitaplar);
    };

    okuyucu.readAsDataURL(dosya); // ✅ Resmi Base64 formatında okur
  } else {
    const mevcutResim = mevcut ? mevcut.resim : "img/placeholder.jpg";
    kaydetVeyaGuncelle(kitapAdi, yazar, fiyat, kategori, mevcutResim, mevcut, kitaplar);
  }
}

// 🔹 Kitap ekleme veya güncelleme işlemini yapan yardımcı fonksiyon
function kaydetVeyaGuncelle(ad, yazar, fiyat, kategori, resim, mevcut, kitaplar) {
  if (mevcut) {
    mevcut.yazar = yazar;
    mevcut.fiyat = fiyat;
    mevcut.kategori = kategori;
    mevcut.resim = resim;
    alert("📘 Kitap başarıyla güncellendi!");
  } else {
    kitaplar.push({
      id: Date.now(),
      ad,
      yazar,
      fiyat,
      kategori: kategori || "Belirtilmemiş",
      resim
    });
    alert("✅ Kitap eklendi!");
  }

  localStorage.setItem("kitaplar", JSON.stringify(kitaplar));
  kitaplariListele();
  temizle();
}

// 📋 Kitapları listeleme fonksiyonu
function kitaplariListele() {
  const kitaplar = JSON.parse(localStorage.getItem("kitaplar")) || [];
  const tablo = document.querySelector("#kitapTablosu tbody");
  tablo.innerHTML = "";

  kitaplar.forEach(k => {
    tablo.innerHTML += `
      <tr>
        <td><img src="${k.resim}" width="50" height="70" style="object-fit:cover"></td>
        <td>${k.ad}</td>
        <td>${k.yazar}</td>
        <td>${k.fiyat} TL</td>
        <td>${k.kategori}</td>
        <td>
          <button class="btn btn-warning btn-sm" onclick="duzenle(${k.id})">✏️ Düzenle</button>
          <button class="btn btn-danger btn-sm" onclick="sil(${k.id})">🗑️ Sil</button>
        </td>
      </tr>
    `;
  });
}

// 🗑️ ID’ye göre silme
function sil(id) {
  const kitaplar = JSON.parse(localStorage.getItem("kitaplar")) || [];
  const yeniListe = kitaplar.filter(k => k.id !== id);
  localStorage.setItem("kitaplar", JSON.stringify(yeniListe));
  kitaplariListele();
  alert("❌ Kitap silindi!");
}

// 🔍 Ad + yazar ile silme
function kitapSil() {
  const ad = document.getElementById("silKitapAdi").value.trim().toLowerCase();
  const yazar = document.getElementById("silYazar").value.trim().toLowerCase();
  let kitaplar = JSON.parse(localStorage.getItem("kitaplar")) || [];
  const yeniListe = kitaplar.filter(k => !(k.ad.toLowerCase() === ad && k.yazar.toLowerCase() === yazar));

  if (yeniListe.length === kitaplar.length) {
    alert("⚠️ Eşleşen kitap bulunamadı!");
  } else {
    alert("🗑️ Kitap başarıyla silindi!");
    localStorage.setItem("kitaplar", JSON.stringify(yeniListe));
    kitaplariListele();
  }
}

// ✏️ Düzenleme fonksiyonu
function duzenle(id) {
  const kitaplar = JSON.parse(localStorage.getItem("kitaplar")) || [];
  const kitap = kitaplar.find(k => k.id === id);
  document.getElementById("kitapAdi").value = kitap.ad;
  document.getElementById("yazar").value = kitap.yazar;
  document.getElementById("fiyat").value = kitap.fiyat;
  document.getElementById("kategori").value = kitap.kategori;
}

// 🧹 Formu temizle
function temizle() {
  document.getElementById("kitapAdi").value = "";
  document.getElementById("yazar").value = "";
  document.getElementById("fiyat").value = "";
  document.getElementById("kategori").value = "";
  document.getElementById("resimDosyasi").value = "";
}

// 🌐 Sayfa açılınca kitapları göster
document.addEventListener("DOMContentLoaded", kitaplariListele);
