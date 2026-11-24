## Canli Yayin Linkleri
- **Cloudflare Workers (Birincil):** bist-analiz-ai.bayerbatuhan4.workers.dev
- **Vercel (Yedek):** https://bist-analiz-ai.vercel.app

## Canli Yayin Linkleri
- **Cloudflare Workers (Birincil):** 
- **Vercel (Yedek):** https://bist-analiz-ai.vercel.app

# Piyasa PusulasÄ±



Borsa Ä°stanbul iÃ§in gecikmeli fiyat grafikleri, kaynak baÄŸlantÄ±lÄ± haberler ve Gemini destekli asistan sunan Piyasa PusulasÄ±.



\*\*CanlÄ± site (production):\*\* https://bist-analiz-ai.vercel.app

\*\*GitHub:\*\* https://github.com/bayerbatuhan4-beep/bist-analiz-ai



> Piyasa fiyatlarÄ± Yahoo Finance'in resmÃ® olmayan uÃ§ noktasÄ±ndan gelir ve gecikmeli olabilir. Haberler Google News RSS Ã¼zerinden alÄ±nÄ±r. Bu site yatÄ±rÄ±m tavsiyesi deÄŸildir.



\## AmaÃ§



Borsa Ä°stanbul'u takip etmek isteyenlere tek ekranda fiyat grafiÄŸi, kaynaklÄ± haber ve veri baÄŸlamÄ±yla Ã§alÄ±ÅŸan bir asistan sunmak.



\## Hedef kullanÄ±cÄ±



Borsa Ä°stanbul'u Ã¶ÄŸrenmek ve takip etmek isteyen bireysel yatÄ±rÄ±mcÄ± adaylarÄ± ve Ã¶ÄŸrenciler.



\## Ã–zellikler



\- Åirket adÄ± veya koduyla hisse arama (TÃ¼rkÃ§e karakter duyarlÄ±: "bim" yazÄ±nca BIMAS bulunur)

\- 20 popÃ¼ler hisse iÃ§in hÄ±zlÄ± seÃ§im

\- \*\*Basit\*\* (Ã§izgi) ve \*\*DetaylÄ±\*\* (mum grafiÄŸi, hacim, hareketli ortalama, ayrÄ±ntÄ± kutusu) grafik gÃ¶rÃ¼nÃ¼mÃ¼

\- ÃœÃ§ renk temasÄ±: Lacivert, AltÄ±n, AÃ§Ä±k (seÃ§im tarayÄ±cÄ±da hatÄ±rlanÄ±r)

\- Gemini API ile Ã§alÄ±ÅŸan piyasa asistanÄ± (sunucu tarafÄ±nda API anahtarÄ± gerekir)

\- Mobil uyumlu dÃ¼zen, klavye ile eriÅŸilebilirlik



\## KullanÄ±lan AI coding agent



Google Antigravity CLI (Gemini 3.8 Flash). DaÄŸÄ±tÄ±m iÅŸ akÄ±ÅŸÄ± iÃ§in depoda `.agents/skills/vercel-web-deployment/SKILL.md` dosyasÄ± bulunur.



\## KullanÄ±lan teknolojiler



HTML, CSS, JavaScript (Vite). Grafikler SVG ile Ã§izilir. Piyasa, haber ve AI istekleri Vercel Functions Ã¼zerinden sunulur.



\## Local Ã§alÄ±ÅŸtÄ±rma



```

npm install

npx vercel dev

npm run build

```



`npx vercel dev` komutu arayÃ¼zÃ¼ ve api/ uÃ§ noktalarÄ±nÄ± birlikte Ã§alÄ±ÅŸtÄ±rÄ±r. Gemini iÃ§in yerelde GEMINI_API_KEY ortam deÄŸiÅŸkenini tanÄ±mlayÄ±n.



\## YayÄ±nlama akÄ±ÅŸÄ±



Yerel deÄŸiÅŸiklik â†’ `git commit` â†’ `git push` (main) â†’ Vercel otomatik build ve production deployment.



