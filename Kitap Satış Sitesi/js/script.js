// main.js
// 🔹 Bu dosya tüm sayfalarda ortak çalışır (navbar, kullanıcı durumu vb.)

document.addEventListener("DOMContentLoaded", () => {
  // Navbar'da kullanıcı bilgilerini göstereceğimiz HTML elementi
  const kullaniciNav = document.getElementById('kullaniciNav');

  // localStorage'dan giriş yapan kullanıcının adını çekiyoruz
  const kullanici = localStorage.getItem('girisYapanKullanici');

  // Eğer sayfada navbar varsa (bazı sayfalarda olmayabilir)
  if (kullaniciNav) {

    // 🔸 Eğer kullanıcı giriş yaptıysa
    if (kullanici) {
      // Navbar'a kullanıcı adını ve profil menüsünü ekle
      kullaniciNav.innerHTML = `
        <li class="nav-item dropdown">
          <a class="nav-link text-light dropdown-toggle" href="#" id="profilDropdown" 
             role="button" data-bs-toggle="dropdown" aria-expanded="false">
            <i class="bi bi-person-circle"></i> ${kullanici}
          </a>
          <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="profilDropdown">
            <li><a class="dropdown-item" href="#">Profilim</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" href="#" id="cikisYapBtn">Çıkış Yap</a></li>
          </ul>
        </li>
      `;

      // Çıkış butonuna tıklanınca çalışacak olay
      const cikisBtn = document.getElementById('cikisYapBtn');
      if (cikisBtn) {
        cikisBtn.addEventListener('click', cikisYap);
      }

    } 
    // 🔸 Eğer kullanıcı giriş yapmamışsa
    else {
      // Navbar'a "Giriş Yap" linki ekle
      kullaniciNav.innerHTML = `
        <li class="nav-item">
          <a class="nav-link text-light" href="giriş.html">
            <i class="bi bi-box-arrow-in-right"></i> Giriş Yap
          </a>
        </li>
      `;
    }
  }
});

// 🔹 Çıkış yapma fonksiyonu
function cikisYap() {
  // localStorage'dan giriş yapan kullanıcıyı sil
  localStorage.removeItem('girisYapanKullanici');

  // Ana sayfaya yönlendir
  window.location.href = 'index.html';
}
