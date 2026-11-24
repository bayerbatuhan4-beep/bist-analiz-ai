# Piyasa Pusulası

Borsa İstanbul'u tek ekranda takip etmek için: gecikmeli fiyat grafikleri, kaynak linkli haberler ve Gemini destekli piyasa asistanı.

🔗 **Canlı site:** https://bist-analiz-ai.vercel.app
🔗 **Yedek (Cloudflare):** https://bist-analiz-ai.bayerbatuhan4.workers.dev

> ⚠️ Bu site yatırım tavsiyesi değildir. Fiyatlar Yahoo Finance'in resmî olmayan uç noktasından gelir ve gecikmelidir. Haberler Google News RSS'ten alınır.

## Özellikler
- Şirket adı veya koduyla hisse arama (Türkçe karakter duyarlı: "bim" yazınca BIMAS bulunur)
- 20 popüler hisse için hızlı seçim
- Basit (çizgi) ve Detaylı (mum grafiği, hacim, hareketli ortalama) grafik
- 3 tema: Lacivert, Altın, Açık (seçim tarayıcıda hatırlanır)
- Gemini destekli piyasa asistanı
- Mobil uyumlu, klavye ile erişilebilir

## Teknolojiler
HTML, CSS, JavaScript (Vite) · SVG grafikler · Vercel Functions (`api/`) · Gemini API

## Yerelde çalıştırma
```bash
npm install
cp .env.example .env   # GEMINI_API_KEY değerini gir
npx vercel dev
```

## Yayınlama
`git push` (main) → Vercel otomatik build ve deploy eder.

## Geliştirme
Google Antigravity CLI ile geliştirildi. Dağıtım akışı: `.agents/skills/vercel-web-deployment/SKILL.md`

Geliştirici: Batuhan Bayer