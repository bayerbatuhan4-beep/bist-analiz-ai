\# BIST Analiz AI



Borsa İstanbul için gecikmeli fiyat grafikleri, kaynak bağlantılı haberler ve OpenAI destekli bir asistan sunan Vite/Vercel paneli.



\*\*Canlı site (production):\*\* https://bist-analiz-ai.vercel.app

\*\*GitHub:\*\* https://github.com/bayerbatuhan4-beep/bist-analiz-ai



> Piyasa fiyatları Yahoo Finance'in resmî olmayan uç noktasından gelir ve gecikmeli olabilir. Haberler Google News RSS üzerinden alınır. Bu site yatırım tavsiyesi değildir.



\## Amaç



Borsa İstanbul'u takip etmek isteyenlere tek ekranda fiyat grafiği, kaynaklı haber ve veri bağlamıyla çalışan bir asistan sunmak.



\## Hedef kullanıcı



Borsa İstanbul'u öğrenmek ve takip etmek isteyen bireysel yatırımcı adayları ve öğrenciler.



\## Özellikler



\- Şirket adı veya koduyla hisse arama (Türkçe karakter duyarlı: "bim" yazınca BIMAS bulunur)

\- 20 popüler hisse için hızlı seçim

\- \*\*Basit\*\* (çizgi) ve \*\*Detaylı\*\* (mum grafiği, hacim, hareketli ortalama, ayrıntı kutusu) grafik görünümü

\- Üç renk teması: Lacivert, Altın, Açık (seçim tarayıcıda hatırlanır)

\- OpenAI Responses API ile çalışan piyasa asistanı (sunucu tarafında API anahtarı gerekir)

\- Mobil uyumlu düzen, klavye ile erişilebilirlik



\## Kullanılan AI coding agent



Google Antigravity CLI (Gemini 3.8 Flash). Dağıtım iş akışı için depoda `.agents/skills/vercel-web-deployment/SKILL.md` dosyası bulunur.



\## Kullanılan teknolojiler



HTML, CSS, JavaScript (Vite). Grafikler SVG ile çizilir. Piyasa, haber ve AI istekleri Vercel Functions üzerinden sunulur.



\## Local çalıştırma



```

npm install

npx vercel dev

npm run build

```



`npx vercel dev` komutu arayüzü ve api/ uç noktalarını birlikte çalıştırır. OpenAI için yerelde OPENAI_API_KEY ortam değişkenini tanımlayın.



\## Yayınlama akışı



Yerel değişiklik → `git commit` → `git push` (main) → Vercel otomatik build ve production deployment.

