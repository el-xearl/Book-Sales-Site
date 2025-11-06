# 📚 Kitap Tanıtım ve Satış Sitesi

## Proje Hakkında 🌟

Bu proje, kullanıcıların kitapları inceleyip, yorum okuyabileceği ve satın alabileceği bir online platform sunar. Kullanıcılar kitapları filtreleyebilir, arama yapabilir, yorum bırakabilir ve sepet üzerinden satın alma işlemlerini gerçekleştirebilir. Admin paneli sayesinde site yöneticileri yeni kitap ekleme, fiyat güncelleme ve stok kontrolü gibi işlemleri kolayca yapabilir. 💻

---

## Özellikler 🛠️

* **Ürün Kataloğu:** Kitapların kapak resmi, yazar, yayınevi, kısa tanıtım yazısı ve fiyat bilgisi görüntülenir. 📖
* **Kategori Filtreleme:** Roman, bilim kurgu, kişisel gelişim, ders kitapları gibi kategorilerde filtreleme yapılabilir. 🗂️
* **Arama Özelliği:** Kitap adına veya yazara göre hızlı arama yapabilirsiniz. 🔍
* **Kullanıcı Yorumları ve Puanlama:** Kitabı satın alan kullanıcılar, görüşlerini yazabilir ve puanlama yapabilir. ⭐
* **Sepet Sistemi:** Kullanıcılar kitapları sepete ekleyip satın alma sürecini deneyimleyebilir. 🛒
* **Admin Paneli:** Yeni kitap ekleme, fiyat güncelleme ve stok kontrolü işlemleri yapılabilir. 🖥️

---

## Dosya Yapısı 📁

```
/proje-adi
│
├─ /css             # Siteye stil veren CSS dosyaları. Tüm sayfaların görünümü ve tasarımını kontrol eder. 🎨
├─ /js              # JavaScript dosyaları. Dinamik içerik, kullanıcı etkileşimleri ve LocalStorage işlemleri burada bulunur. ⚡
├─ /images          # Kitap kapakları, ikonlar ve site görselleri. 📷
├─ admingiris.html  # Admin paneline giriş yapılan sayfa. Yöneticilerin kullanıcı adı ve şifre ile giriş yapmasını sağlar. 🔑
├─ adminpanel.html  # Admin paneli sayfası. Kitap ekleme, fiyat güncelleme ve stok kontrolü gibi işlemler burada yapılır. 🖥️
├─ giriş.html       # Kullanıcıların siteye giriş yaptığı sayfa. Kullanıcı kimlik doğrulaması burada yapılır. 👤
├─ hakkimda.html    # Site veya proje hakkında bilgi verilen sayfa. ℹ️
├─ iletisim.html    # Kullanıcıların siteyle iletişim kurabileceği form ve iletişim bilgileri içerir. 📬
├─ index.html       # Anasayfa. Tüm kitaplar ve kategori filtreleri buradan görüntülenir. 🏠
├─ kitapdetay.html  # Seçilen kitabın detay sayfası. Kitap bilgileri, yorumlar ve puanlama burada gösterilir. 📖
├─ kitaplar.html    # Tüm kitapların listelendiği sayfa. Kullanıcılar buradan kitapları inceleyebilir. 📚
├─ sepet.html       # Kullanıcıların kitapları sepete ekleyip satın alma sürecini görüntülediği sayfa. 🛒
└─ README.md        # Proje hakkında bilgi, kurulum ve kullanım talimatlarını içeren dosya. 📄

```

## Kurulum 🚀

Projeyi bilgisayarınıza indirmek için önce dosyaları ZIP olarak indirebilir veya Git üzerinden klonlayabilirsiniz. 💾 İndirme veya klonlama işlemi tamamlandıktan sonra, proje klasörüne gidin ve **`index.html`** dosyasını herhangi bir web tarayıcısında açın. 🌐

Siteyi açtıktan sonra, başlık ve içerik girip **“Kaydet”** butonuna basarak yeni notlar oluşturabilirsiniz. 📝 Eklediğiniz notları düzenlemek için kalem ikonuna ✏️, silmek için çöp ikonuna 🗑️ tıklamanız yeterlidir. Düzenleme işlemleri modal penceresi üzerinden gerçekleştirilir ve yapılan tüm değişiklikler **LocalStorage** üzerinde kaydedilir, böylece sayfayı yenileseniz bile notlarınız korunur. 💾✨

---

## Kullanım 🖱️

Kullanıcılar anasayfa üzerinden tüm kitapları görüntüleyebilir ve istedikleri kitap hakkında detaylı bilgi alabilir. Kitap adına veya yazara göre arama yapabilir, kategori filtrelerini kullanarak hızlıca istedikleri türde kitapları listeleyebilirler. Kullanıcı yorumları ve puanlama sayesinde diğer okuyucuların görüşlerini görebilir ve kendi yorumlarını paylaşabilirler. Sepet sistemi ile kitapları ekleyip satın alma deneyimi yaşanabilir. Admin paneli ise site yöneticilerinin yeni kitap ekleme, fiyat güncelleme ve stok durumunu kontrol etmesine olanak sağlar. 🛒✏️

---

## Kullanılan Teknolojiler 💻

* **HTML5** – Sayfa yapısı ve içerik.
* **CSS3** – Stil ve tasarım.
* **🎨Bootstrap 5** -(responsive tasarım ve modal)
* **JavaScript** – Dinamik içerik ve kullanıcı etkileşimleri. ⚡
* **LocalStorage/JSON** – Kitap ve not verilerini saklamak için. 💾


