document.querySelectorAll(".detay-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const kitapAdi = btn.getAttribute("data-kitap");

    // Kartın DOM'unu bul
    const kart = btn.closest(".card");
    const kitap = {
      ad: kitapAdi,
      yazar: kart.querySelector("p.text-muted")?.innerText || "",
      fiyat: kart.querySelector(".price")?.innerText.replace(" TL", "") || "",
      resim: kart.querySelector("img")?.src || "",
      aciklama: kart.querySelector("p.lead")?.innerText || "Bu kitap için açıklama bulunamadı."
    };

    // localStorage'a kaydet
    localStorage.setItem("seciliKitap", JSON.stringify(kitap));

    // Kitap detay sayfasına yönlendir
    window.location.href = "kitapdetay.html";
  });
});
