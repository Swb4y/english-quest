# English Quest — Sıfırdan İngilizce 🦉

English Quest, **hiç İngilizce bilmeyenler** için tasarlanmış, tamamı Türkçe arayüzlü, oyunlaştırılmış bir İngilizce öğrenme uygulamasıdır. Vite, React, TypeScript ve Tailwind CSS ile geliştirilmiştir.

Kayıt yok, ceza yok, stres yok: kendi hızında ilerlersin, ilerlemen cihazında saklanır ve uygulama çevrimdışı da çalışır (PWA).

## Özellikler

- 🇹🇷 **Tamamı Türkçe arayüz** — hiç İngilizce bilmeden rahatça kullanılır
- 🐣 **Sıfırdan başlayan müfredat** — 12 ünite, 96 temel kelime, 48 kalıp cümle
- 🔊 **Sesli telaffuz** — her kelime ve örnek cümle tarayıcının ses motoruyla dinlenebilir (Web Speech API)
- 📖 **Kelime kartları** — emoji, Türkçe anlam, Türkçe harflerle okunuş ve örnek cümle
- 🎯 **5 farklı alıştırma türü**:
  - Çoktan seçmeli (İngilizce → Türkçe)
  - Çoktan seçmeli (Türkçe → İngilizce)
  - Dinleme (duyduğun kelimeyi bul)
  - Eşleştirme (İngilizce–Türkçe çiftleri)
  - Cümle kurma (karışık kelimelerden cümle diz)
- 🎮 **Oyunlaştırma** — XP, seviye, günlük seri, 6 rozet, konfetili kutlamalar
- 🔁 **Tekrar modu** — öğrendiğin kelimelerden karışık hızlı tekrar turları
- 📔 **Kelime defteri** — öğrendiğin tüm kelimeler telaffuzlarıyla tek listede
- 🗺️ **Ünite haritası** — her ünite bitince yenisi açılır
- 📱 **Mobil öncelikli tasarım** — gradyanlar, animasyonlar, PWA desteği

## Üniteler

1. 👋 Selamlaşma
2. 🔢 Sayılar
3. 🎨 Renkler
4. 👨‍👩‍👧 Aile
5. 🍎 Yiyecek ve İçecek
6. 🐶 Hayvanlar
7. 📅 Günler
8. 🧍 Vücudumuz
9. 🏠 Evimiz
10. 👕 Kıyafetler
11. ☀️ Hava Durumu
12. 🏙️ Şehirde

## Teknolojiler

- Vite + React + TypeScript
- Tailwind CSS
- Web Speech API (telaffuz)
- LocalStorage (ilerleme kaydı)
- PWA (manifest + service worker)

## Geliştirme

Bağımlılıkları kur:

```bash
npm install
```

Geliştirme sunucusunu başlat:

```bash
npm run dev
```

Üretim derlemesi:

```bash
npm run build
```

Derlemeyi önizle:

```bash
npm run preview
```

## Yayınlama

### GitHub Pages (docs/ klasörü)

```bash
npm run build:pages
```

Bu komut uygulamayı `docs/` klasörüne derler. Repo ayarlarından **Settings → Pages → Deploy from a branch → /docs** seçiliyse uygulama otomatik yayınlanır.

### Vercel / Netlify

- Build komutu: `npm run build`
- Çıktı klasörü: `dist`

## Notlar

- Arka uç (backend) gerektirmez, tamamen tarayıcıda çalışır.
- Ders içerikleri `src/data/units.ts` dosyasındadır; yeni ünite eklemek için bu dosyaya ekleme yapmak yeterlidir.
- İlerleme yalnızca kullanılan cihazda, LocalStorage'da saklanır.
- Telaffuz için tarayıcının Web Speech API desteği kullanılır (tüm modern tarayıcılarda mevcuttur).
