# Veri kaynakları ve Vercel ayarı

## Sağlayıcılar

- Hisse ve endeks fiyatları `api/market.js` üzerinden Yahoo Finance'in resmî olmayan chart uç noktasından alınır. Erişim, doğruluk ve güncellik garantisi yoktur; uç nokta değişebilir veya sınırlandırılabilir.
- Haberler `api/news.js` ile Google News RSS aramasından alınır. Kartlar yayıncıya bağlantı verir ve RSS yayın zamanını gösterir.
- OpenAI yanıtları `api/assistant.js` üzerinden Responses API'ye gider. Model: `gpt-6-luna`.
- KAP'ın resmî veri dağıtım servisi sözleşme ve yetkilendirme gerektirir. KAP ile kurumsal/finansal haber kaynağı istenirse ayrı erişim gerekir.

## Yerel çalıştırma

Vercel CLI ile frontend ve function rotalarını birlikte başlatın:

```sh
npx vercel dev
```

OpenAI kullanımı için yerel ortamda `OPENAI_API_KEY` tanımlayın. `.env.example` yalnızca değişken adını içerir; gerçek anahtar eklemeyin.

## Production ayarı

Vercel projesinde **Settings → Environment Variables** yolundan `OPENAI_API_KEY` ekleyin. Değişkeni Production (ve gerekiyorsa Preview/Development) ortamlarına atayıp yeni deployment oluşturun. Anahtarı GitHub'a, kaynak dosyalarına veya tarayıcı tarafına koymayın.

AI uç noktasında sunucu örneği başına geçici 12 istek / 10 dakika sınırı bulunur. Vercel instances arasında ortak sayaç değildir; daha büyük/kamusal kullanımda kalıcı dağıtık rate limiting ayrıca kurulmalıdır.
