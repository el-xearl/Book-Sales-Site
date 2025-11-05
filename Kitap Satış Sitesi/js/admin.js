// 📌 "Ekle" ve "Sil" butonlarına tıklama olaylarını dinliyoruz
document.getElementById("ekleBtn").addEventListener("click", kitapEkle);
document.getElementById("silBtn").addEventListener("click", kitapSil);

// 📘 Kitap ekleme veya mevcut kitabı güncelleme fonksiyonu
function kitapEkle() {
  // Form alanlarından verileri alıyoruz
  const kitapAdi = document.getElementById("kitapAdi").value.trim();
  const yazar = document.getElementById("yazar").value.trim();
  const fiyat = document.getElementById("fiyat").value.trim();
  const kategori = document.getElementById("kategori").value.trim();
  const resimInput = document.getElementById("resimDosyasi");

  // Eğer zorunlu alanlar boşsa kullanıcıya uyarı ver
  if (!kitapAdi || !yazar || !fiyat) {
    alert("⚠️ Lütfen tüm alanları doldurun!");
    return; // Fonksiyonu burada durdur
  }

  // LocalStorage’dan kayıtlı kitap listesini al, yoksa boş dizi oluştur
  const kitaplar = JSON.parse(localStorage.getItem("kitaplar")) || [];

  // Aynı isimde bir kitap zaten var mı kontrol et (büyük-küçük harf duyarsız)
  const mevcut = kitaplar.find(k => k.ad.toLowerCase() === kitapAdi.toLowerCase());

  // Eğer kullanıcı yeni bir resim yüklediyse onu al, yoksa eski resmi koru veya varsayılan resmi kullan
  const resim = resimInput.files.length
    ? URL.createObjectURL(resimInput.files[0]) // Yeni resim eklendiyse URL oluştur
    : (mevcut ? mevcut.resim : "img/placeholder.jpg"); // Mevcutsa eski resmi, değilse varsayılan resmi kullan

  if (mevcut) {
    // 🔄 Kitap zaten varsa güncelle
    mevcut.yazar = yazar;
    mevcut.fiyat = fiyat;
    mevcut.kategori = kategori;
    mevcut.resim = resim;
    alert("📘 Kitap başarıyla güncellendi!");
  } else {
    // ➕ Yeni kitap ekle
    kitaplar.push({
      id: Date.now(), // Benzersiz bir ID oluşturmak için zaman damgası
      ad: kitapAdi,
      yazar,
      fiyat,
      kategori: kategori || "Belirtilmemiş", // Kategori boşsa “Belirtilmemiş” yaz
      resim
    });
    alert("✅ Kitap eklendi!");
  }

  // Güncel listeyi tekrar LocalStorage’a kaydet
  localStorage.setItem("kitaplar", JSON.stringify(kitaplar));

  // Tablodaki kitapları yenile
  kitaplariListele();

  // Form alanlarını temizle
  temizle();
}

// 📋 Kitapları listeleme fonksiyonu
function kitaplariListele() {
  // LocalStorage’dan kitapları al
  const kitaplar = JSON.parse(localStorage.getItem("kitaplar")) || [];

  // Tablo gövdesini seç
  const tablo = document.querySelector("#kitapTablosu tbody");

  // Önce tabloyu tamamen temizle
  tablo.innerHTML = "";

  // Her kitap için tabloya yeni satır ekle
  kitaplar.forEach(k => {
    tablo.innerHTML += `
      <tr>
        <td><img src="${k.resim}" width="50" height="70" style="object-fit:cover"></td>
        <td>${k.ad}</td>
        <td>${k.yazar}</td>
        <td>${k.fiyat} TL</td>
        <td>${k.kategori}</td>
        <td>
          <!-- Düzenle ve Sil butonları -->
          <button class="btn btn-warning btn-sm" onclick="duzenle(${k.id})">✏️ Düzenle</button>
          <button class="btn btn-danger btn-sm" onclick="sil(${k.id})">🗑️ Sil</button>
        </td>
      </tr>
    `;
  });
}

// 🗑️ ID’ye göre kitap silme (tablodaki “Sil” butonuna tıklayınca)
function sil(id) {
  // Kitapları LocalStorage’dan al
  const kitaplar = JSON.parse(localStorage.getItem("kitaplar")) || [];

  // Silinecek kitabın ID’sine eşit olmayanları yeni listeye koy
  const yeniListe = kitaplar.filter(k => k.id !== id);

  // Yeni listeyi LocalStorage’a kaydet
  localStorage.setItem("kitaplar", JSON.stringify(yeniListe));

  // Tablodaki görünümü güncelle
  kitaplariListele();

  alert("❌ Kitap silindi!");
}

// 🔍 Kitap adı + yazar adı ile silme işlemi (formdan sil butonuna basınca)
function kitapSil() {
  // Kullanıcıdan silinecek kitap adı ve yazarı al
  const ad = document.getElementById("silKitapAdi").value.trim().toLowerCase();
  const yazar = document.getElementById("silYazar").value.trim().toLowerCase();

  // LocalStorage’dan kitapları al
  let kitaplar = JSON.parse(localStorage.getItem("kitaplar")) || [];

  // Belirtilen ad ve yazara sahip olan kitabı hariç tut
  const yeniListe = kitaplar.filter(k => !(k.ad.toLowerCase() === ad && k.yazar.toLowerCase() === yazar));

  // Eğer hiçbir kitap silinmediyse kullanıcıya bilgi ver
  if (yeniListe.length === kitaplar.length) {
    alert("⚠️ Eşleşen kitap bulunamadı!");
  } else {
    alert("🗑️ Kitap başarıyla silindi!");
    // Güncel listeyi kaydet ve tabloyu yenile
    localStorage.setItem("kitaplar", JSON.stringify(yeniListe));
    kitaplariListele();
  }
}

// ✏️ Kitap düzenleme fonksiyonu (tablodaki “Düzenle” butonuna tıklayınca)
function duzenle(id) {
  // Kitap listesini al
  const kitaplar = JSON.parse(localStorage.getItem("kitaplar")) || [];

  // Tıklanan ID’ye sahip kitabı bul
  const kitap = kitaplar.find(k => k.id === id);

  // Bilgileri form alanlarına yerleştir
  document.getElementById("kitapAdi").value = kitap.ad;
  document.getElementById("yazar").value = kitap.yazar;
  document.getElementById("fiyat").value = kitap.fiyat;
  document.getElementById("kategori").value = kitap.kategori;
}

// 🧹 Formu temizleme fonksiyonu
function temizle() {
  document.getElementById("kitapAdi").value = "";
  document.getElementById("yazar").value = "";
  document.getElementById("fiyat").value = "";
  document.getElementById("kategori").value = "";
  document.getElementById("resimDosyasi").value = "";
}

// 🌐 Sayfa ilk yüklendiğinde kitapları otomatik olarak listele
document.addEventListener("DOMContentLoaded", kitaplariListele);
