document.addEventListener("DOMContentLoaded", () => {
    const kitapListesi = document.getElementById("kitapListesi");
    const aramaInput = document.getElementById("aramaInput");
    const aramaBtn = document.getElementById("aramaBtn");
    const kategoriFiltre = document.getElementById("kategoriFiltre");

    let kitaplar = JSON.parse(localStorage.getItem("kitaplar")) || [];

    function gosterKitaplar(liste) {
        kitapListesi.innerHTML = "";
        if (liste.length === 0) {
            kitapListesi.innerHTML = `<p class="text-center text-muted">Kitap bulunamadı.</p>`;
            return;
        }

        liste.forEach((kitap, index) => {
            const col = document.createElement("div");
            col.className = "col-md-4";

            col.innerHTML = `
                <div class="card h-100 shadow-sm">
                    <img src="${kitap.resim}" class="card-img-top" style="height:250px; object-fit:cover;">
                    <div class="card-body text-center">
                        <h5 class="card-title">${kitap.ad}</h5>
                        <p class="card-text">Yazar: ${kitap.yazar}</p>
                        <p class="card-text fw-bold">${kitap.fiyat} TL</p>
                        <p class="card-text"><small class="text-muted">${kitap.kategori || "Belirtilmemiş"}</small></p>
                        <button class="btn btn-primary w-100 mb-2" onclick="seciliKitapAyarla('${kitap.ad}')">Detayları Gör</button>
                        <button class="btn btn-success w-100" onclick="sepeteEkle(${index})">🛒 Sepete Ekle</button>
                    </div>
                </div>
            `;
            kitapListesi.appendChild(col);
        });
    }

    gosterKitaplar(kitaplar);

    aramaBtn.addEventListener("click", filtreleVeGoster);
    kategoriFiltre.addEventListener("change", filtreleVeGoster);

    function filtreleVeGoster() {
        const aramaDegeri = aramaInput.value.toLowerCase().trim();
        const kategoriDegeri = kategoriFiltre.value;

        const filtrelenmis = kitaplar.filter(k => {
            const adMatch = k.ad.toLowerCase().includes(aramaDegeri);
            const yazarMatch = k.yazar.toLowerCase().includes(aramaDegeri);
            const kategoriMatch = kategoriDegeri === "" || k.kategori === kategoriDegeri;
            return (adMatch || yazarMatch) && kategoriMatch;
        });

        gosterKitaplar(filtrelenmis);
    }
});

// URL parametresi ile detay sayfasına yönlendirme
function seciliKitapAyarla(ad) {
    const encodedName = encodeURIComponent(ad); // URL güvenliği için
    window.location.href = `kitapdetay.html?kitap=${encodedName}`;
}

// 🔹 Sepete ekleme fonksiyonu
function sepeteEkle(index) {
    let kitaplar = JSON.parse(localStorage.getItem("kitaplar")) || [];
    let sepet = JSON.parse(localStorage.getItem("sepet")) || [];

    const secilenKitap = kitaplar[index];

    const mevcut = sepet.find(k => k.ad === secilenKitap.ad);
    if (mevcut) {
        mevcut.adet = (mevcut.adet || 1) + 1;
    } else {
        sepet.push({ ...secilenKitap, adet: 1 });
    }

    localStorage.setItem("sepet", JSON.stringify(sepet));
    alert(`✅ "${secilenKitap.ad}" sepete eklendi!`);
}
  