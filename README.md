\# BIST Analiz AI



Borsa İstanbul (BIST) için hazırlanmış, grafik, haber ve yapay zeka asistanı bir arada sunan panel tarzı bir web sitesi. YZO 205 Operasyonel Yapay Zeka dersi Assignment-1 çalışmasıdır.



\*\*Canlı site (production):\*\* https://bist-analiz-ai.vercel.app

\*\*GitHub:\*\* https://github.com/bayerbatuhan4-beep/bist-analiz-ai



> \*\*Önemli:\*\* Sitedeki fiyatlar, grafikler, haberler ve yapay zeka yanıtları şu an \*\*DEMO verisidir\*\*; gerçek piyasa verisi değildir ve yatırım tavsiyesi değildir. Demo olan her alanda "Demo veri" etiketi bulunur.



\## Amaç



Borsa İstanbul'u takip etmek isteyenlere tek ekranda hisse grafiği, piyasa haberleri ve soru sorulabilen bir asistan sunmak. Gerçek veri ve gerçek yapay zeka yorumu sonraki sürümlerde eklenecektir.



\## Hedef kullanıcı



Borsa İstanbul'u öğrenmek ve takip etmek isteyen bireysel yatırımcı adayları ve öğrenciler.



\## Özellikler



\- Şirket adı veya koduyla hisse arama (Türkçe karakter duyarlı: "bim" yazınca BIMAS bulunur)

\- 20 popüler hisse için hızlı seçim

\- \*\*Basit\*\* (çizgi) ve \*\*Detaylı\*\* (mum grafiği, hacim, hareketli ortalama, ayrıntı kutusu) grafik görünümü

\- Üç renk teması: Lacivert, Altın, Açık (seçim tarayıcıda hatırlanır)

\- Yapay zeka asistanı paneli (şu an hazır cevaplı demo)

\- Mobil uyumlu düzen, klavye ile erişilebilirlik



\## Kullanılan AI coding agent



Google Antigravity CLI (Gemini 3.8 Flash). Dağıtım iş akışı için depoda `.agents/skills/vercel-web-deployment/SKILL.md` dosyası bulunur.



\## Kullanılan teknolojiler



HTML, CSS, JavaScript (Vite). Grafikler saf SVG ile çizilir. Sunucu tarafı yoktur. Git, GitHub ve Vercel ile yayınlanır.



\## Local çalıştırma



```

npm install

npm run dev

npm run build

```



`npm run dev` komutu yerel adresi (ör. http://localhost:3000) yazdırır.



\## Yayınlama akışı



Yerel değişiklik → `git commit` → `git push` (main) → Vercel otomatik build ve production deployment.

