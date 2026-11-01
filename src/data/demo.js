/**
 * BIST Analiz AI - Demo Veri Havuzu
 * Tüm veriler simüle edilmiş demo verilerdir; gerçek piyasa verisi değildir.
 */

export const TICKER_ITEMS = [
  {
    id: 'bist100',
    name: 'BIST 100',
    value: '9.185,40',
    change: '+%1,42',
    isUp: true
  },
  {
    id: 'usdtry',
    name: 'USD/TRY',
    value: '34,28',
    change: '+%0,18',
    isUp: true
  },
  {
    id: 'altin',
    name: 'Altın (Gram)',
    value: '3.024 TL',
    change: '-%0,35',
    isUp: false
  },
  {
    id: 'bist30',
    name: 'BIST 30',
    value: '10.012,15',
    change: '+%1,65',
    isUp: true
  }
];

export const DEMO_STOCKS = {
  THYAO: {
    symbol: 'THYAO',
    name: 'Türk Hava Yolları A.O.',
    price: '288,50 TL',
    rawPrice: 288.50,
    change: '+%2,30',
    isUp: true,
    volume: '4,82 Milyar TL',
    dayHigh: '291,00 TL',
    dayLow: '282,25 TL',
    peRatio: '4,12',
    marketCap: '398 Milyar TL',
    sector: 'Havacılık / Ulaştırma',
    summary: 'Yolcu doluluk oranları ve güçlü kargo hacmiyle BIST 30 endeksinde güçlü işlem hacmini sürdüren havacılık devi.',
    series: {
      '1G': [
        { label: '10:00', value: 282.50 },
        { label: '11:00', value: 284.00 },
        { label: '12:00', value: 283.75 },
        { label: '13:00', value: 285.50 },
        { label: '14:00', value: 287.00 },
        { label: '15:00', value: 286.25 },
        { label: '16:00', value: 289.00 },
        { label: '17:00', value: 288.50 }
      ],
      '1H': [
        { label: 'Pzt', value: 278.00 },
        { label: 'Sal', value: 280.50 },
        { label: 'Çar', value: 279.00 },
        { label: 'Per', value: 284.20 },
        { label: 'Cum', value: 288.50 }
      ],
      '1A': [
        { label: '1. Hafta', value: 265.00 },
        { label: '2. Hafta', value: 272.50 },
        { label: '3. Hafta', value: 279.00 },
        { label: '4. Hafta', value: 288.50 }
      ]
    }
  },
  ASELS: {
    symbol: 'ASELS',
    name: 'Aselsan Elektronik Sanayi',
    price: '64,20 TL',
    rawPrice: 64.20,
    change: '+%1,10',
    isUp: true,
    volume: '2,15 Milyar TL',
    dayHigh: '65,00 TL',
    dayLow: '63,10 TL',
    peRatio: '11,80',
    marketCap: '292 Milyar TL',
    sector: 'Savunma & Teknoloji',
    summary: 'Savunma sanayiinde yüksek bakiye siparişleri ve ihracat kontratları ile istikrarlı büyümesini koruyan teknoloji şirketi.',
    series: {
      '1G': [
        { label: '10:00', value: 63.20 },
        { label: '11:00', value: 63.60 },
        { label: '12:00', value: 63.40 },
        { label: '13:00', value: 64.00 },
        { label: '14:00', value: 64.50 },
        { label: '15:00', value: 64.10 },
        { label: '16:00', value: 64.80 },
        { label: '17:00', value: 64.20 }
      ],
      '1H': [
        { label: 'Pzt', value: 62.10 },
        { label: 'Sal', value: 62.80 },
        { label: 'Çar', value: 63.50 },
        { label: 'Per', value: 63.90 },
        { label: 'Cum', value: 64.20 }
      ],
      '1A': [
        { label: '1. Hafta', value: 59.80 },
        { label: '2. Hafta', value: 61.20 },
        { label: '3. Hafta', value: 62.90 },
        { label: '4. Hafta', value: 64.20 }
      ]
    }
  },
  EREGL: {
    symbol: 'EREGL',
    name: 'Ereğli Demir ve Çelik Fabrikaları',
    price: '48,90 TL',
    rawPrice: 48.90,
    change: '-%0,81',
    isUp: false,
    volume: '1,74 Milyar TL',
    dayHigh: '49,80 TL',
    dayLow: '48,40 TL',
    peRatio: '9,45',
    marketCap: '171 Milyar TL',
    sector: 'Demir & Çelik Sanayi',
    summary: 'Küresel emtia fiyatları ve yeşil çelik dönüşüm yatırımları ile sektörün öncü entegre yassı çelik üreticisi.',
    series: {
      '1G': [
        { label: '10:00', value: 49.60 },
        { label: '11:00', value: 49.30 },
        { label: '12:00', value: 49.00 },
        { label: '13:00', value: 48.80 },
        { label: '14:00', value: 48.60 },
        { label: '15:00', value: 48.50 },
        { label: '16:00', value: 48.70 },
        { label: '17:00', value: 48.90 }
      ],
      '1H': [
        { label: 'Pzt', value: 50.40 },
        { label: 'Sal', value: 49.90 },
        { label: 'Çar', value: 49.50 },
        { label: 'Per', value: 49.10 },
        { label: 'Cum', value: 48.90 }
      ],
      '1A': [
        { label: '1. Hafta', value: 51.50 },
        { label: '2. Hafta', value: 50.80 },
        { label: '3. Hafta', value: 49.60 },
        { label: '4. Hafta', value: 48.90 }
      ]
    }
  },
  GARAN: {
    symbol: 'GARAN',
    name: 'Garanti BBVA',
    price: '118,40 TL',
    rawPrice: 118.40,
    change: '+%1,85',
    isUp: true,
    volume: '3,95 Milyar TL',
    dayHigh: '119,80 TL',
    dayLow: '116,20 TL',
    peRatio: '4,85',
    marketCap: '497 Milyar TL',
    sector: 'Bankacılık',
    summary: 'Yüksek aktif kalitesi ve dijital bankacılık penetrasyonu ile sektörde öncü özel banka.',
    series: {
      '1G': [
        { label: '10:00', value: 116.50 },
        { label: '11:00', value: 117.20 },
        { label: '12:00', value: 116.90 },
        { label: '13:00', value: 117.80 },
        { label: '14:00', value: 118.50 },
        { label: '15:00', value: 118.10 },
        { label: '16:00', value: 119.20 },
        { label: '17:00', value: 118.40 }
      ],
      '1H': [
        { label: 'Pzt', value: 114.00 },
        { label: 'Sal', value: 115.50 },
        { label: 'Çar', value: 116.20 },
        { label: 'Per', value: 117.40 },
        { label: 'Cum', value: 118.40 }
      ],
      '1A': [
        { label: '1. Hafta', value: 108.50 },
        { label: '2. Hafta', value: 112.00 },
        { label: '3. Hafta', value: 115.30 },
        { label: '4. Hafta', value: 118.40 }
      ]
    }
  },
  AKBNK: {
    symbol: 'AKBNK',
    name: 'Akbank T.A.Ş.',
    price: '56,75 TL',
    rawPrice: 56.75,
    change: '+%2,15',
    isUp: true,
    volume: '3,20 Milyar TL',
    dayHigh: '57,30 TL',
    dayLow: '55,40 TL',
    peRatio: '4,40',
    marketCap: '295 Milyar TL',
    sector: 'Bankacılık',
    summary: 'Güçlü sermaye yeterlilik rasyosu ve sürdürülebilir kârlılık dinamikleriyle öne çıkan banka.',
    series: {
      '1G': [
        { label: '10:00', value: 55.60 },
        { label: '11:00', value: 56.10 },
        { label: '12:00', value: 55.90 },
        { label: '13:00', value: 56.40 },
        { label: '14:00', value: 56.80 },
        { label: '15:00', value: 56.50 },
        { label: '16:00', value: 57.10 },
        { label: '17:00', value: 56.75 }
      ],
      '1H': [
        { label: 'Pzt', value: 54.20 },
        { label: 'Sal', value: 54.90 },
        { label: 'Çar', value: 55.40 },
        { label: 'Per', value: 56.10 },
        { label: 'Cum', value: 56.75 }
      ],
      '1A': [
        { label: '1. Hafta', value: 51.80 },
        { label: '2. Hafta', value: 53.40 },
        { label: '3. Hafta', value: 55.00 },
        { label: '4. Hafta', value: 56.75 }
      ]
    }
  },
  ISCTR: {
    symbol: 'ISCTR',
    name: 'Türkiye İş Bankası (C)',
    price: '13,42 TL',
    rawPrice: 13.42,
    change: '+%0,90',
    isUp: true,
    volume: '2,65 Milyar TL',
    dayHigh: '13,65 TL',
    dayLow: '13,25 TL',
    peRatio: '4,15',
    marketCap: '335 Milyar TL',
    sector: 'Bankacılık',
    summary: 'Geniş şube ağı, iştirak portföyü ve dengeli kredi büyümesiyle Türkiye’nin en köklü özel bankası.',
    series: {
      '1G': [
        { label: '10:00', value: 13.30 },
        { label: '11:00', value: 13.35 },
        { label: '12:00', value: 13.32 },
        { label: '13:00', value: 13.45 },
        { label: '14:00', value: 13.50 },
        { label: '15:00', value: 13.40 },
        { label: '16:00', value: 13.55 },
        { label: '17:00', value: 13.42 }
      ],
      '1H': [
        { label: 'Pzt', value: 13.05 },
        { label: 'Sal', value: 13.18 },
        { label: 'Çar', value: 13.25 },
        { label: 'Per', value: 13.36 },
        { label: 'Cum', value: 13.42 }
      ],
      '1A': [
        { label: '1. Hafta', value: 12.40 },
        { label: '2. Hafta', value: 12.80 },
        { label: '3. Hafta', value: 13.15 },
        { label: '4. Hafta', value: 13.42 }
      ]
    }
  },
  KCHOL: {
    symbol: 'KCHOL',
    name: 'Koç Holding A.Ş.',
    price: '184,30 TL',
    rawPrice: 184.30,
    change: '+%1,45',
    isUp: true,
    volume: '2,80 Milyar TL',
    dayHigh: '186,50 TL',
    dayLow: '181,80 TL',
    peRatio: '5,60',
    marketCap: '467 Milyar TL',
    sector: 'Holding & Yatırım',
    summary: 'Enerji, otomotiv, tüketici elektroniği ve finans sektörlerinde çeşitlendirilmiş portföy yapısıyla lider holding.',
    series: {
      '1G': [
        { label: '10:00', value: 182.00 },
        { label: '11:00', value: 183.10 },
        { label: '12:00', value: 182.80 },
        { label: '13:00', value: 184.00 },
        { label: '14:00', value: 185.20 },
        { label: '15:00', value: 184.60 },
        { label: '16:00', value: 186.00 },
        { label: '17:00', value: 184.30 }
      ],
      '1H': [
        { label: 'Pzt', value: 178.50 },
        { label: 'Sal', value: 180.20 },
        { label: 'Çar', value: 181.70 },
        { label: 'Per', value: 183.10 },
        { label: 'Cum', value: 184.30 }
      ],
      '1A': [
        { label: '1. Hafta', value: 171.00 },
        { label: '2. Hafta', value: 175.50 },
        { label: '3. Hafta', value: 179.80 },
        { label: '4. Hafta', value: 184.30 }
      ]
    }
  },
  SISE: {
    symbol: 'SISE',
    name: 'Türkiye Şişe ve Cam Fabrikaları',
    price: '42,60 TL',
    rawPrice: 42.60,
    change: '-%0,55',
    isUp: false,
    volume: '1,45 Milyar TL',
    dayHigh: '43,40 TL',
    dayLow: '42,20 TL',
    peRatio: '7,90',
    marketCap: '130 Milyar TL',
    sector: 'Cam & Kimyasallar',
    summary: 'Düzcam, cam ambalaj ve soda külü alanlarında global ölçekte faaliyet gösteren sanayi devi.',
    series: {
      '1G': [
        { label: '10:00', value: 43.10 },
        { label: '11:00', value: 42.90 },
        { label: '12:00', value: 42.75 },
        { label: '13:00', value: 42.60 },
        { label: '14:00', value: 42.45 },
        { label: '15:00', value: 42.50 },
        { label: '16:00', value: 42.80 },
        { label: '17:00', value: 42.60 }
      ],
      '1H': [
        { label: 'Pzt', value: 43.80 },
        { label: 'Sal', value: 43.40 },
        { label: 'Çar', value: 43.10 },
        { label: 'Per', value: 42.85 },
        { label: 'Cum', value: 42.60 }
      ],
      '1A': [
        { label: '1. Hafta', value: 45.20 },
        { label: '2. Hafta', value: 44.50 },
        { label: '3. Hafta', value: 43.40 },
        { label: '4. Hafta', value: 42.60 }
      ]
    }
  },
  BIMAS: {
    symbol: 'BIMAS',
    name: 'BİM Birleşik Mağazalar',
    price: '495,00 TL',
    rawPrice: 495.00,
    change: '+%0,75',
    isUp: true,
    volume: '1,88 Milyar TL',
    dayHigh: '499,50 TL',
    dayLow: '490,00 TL',
    peRatio: '14,20',
    marketCap: '300 Milyar TL',
    sector: 'Perakende Ticaret',
    summary: 'Yüksek mağaza yoğunluğu ve istikrarlı nakit akışıyla perakende gıda sektörünün amiral gemisi.',
    series: {
      '1G': [
        { label: '10:00', value: 491.00 },
        { label: '11:00', value: 493.50 },
        { label: '12:00', value: 492.00 },
        { label: '13:00', value: 494.00 },
        { label: '14:00', value: 496.50 },
        { label: '15:00', value: 494.80 },
        { label: '16:00', value: 497.00 },
        { label: '17:00', value: 495.00 }
      ],
      '1H': [
        { label: 'Pzt', value: 485.00 },
        { label: 'Sal', value: 488.50 },
        { label: 'Çar', value: 490.00 },
        { label: 'Per', value: 493.00 },
        { label: 'Cum', value: 495.00 }
      ],
      '1A': [
        { label: '1. Hafta', value: 472.00 },
        { label: '2. Hafta', value: 480.00 },
        { label: '3. Hafta', value: 489.00 },
        { label: '4. Hafta', value: 495.00 }
      ]
    }
  },
  TUPRS: {
    symbol: 'TUPRS',
    name: 'Türkiye Petrol Rafinerileri',
    price: '144,80 TL',
    rawPrice: 144.80,
    change: '+%2,40',
    isUp: true,
    volume: '2,92 Milyar TL',
    dayHigh: '146,20 TL',
    dayLow: '141,50 TL',
    peRatio: '5,30',
    marketCap: '279 Milyar TL',
    sector: 'Petrol & Enerji',
    summary: 'Akdeniz rafineri marjları ve dönüşüm yatırımlarıyla kârlılığını artıran enerji devi.',
    series: {
      '1G': [
        { label: '10:00', value: 141.80 },
        { label: '11:00', value: 142.50 },
        { label: '12:00', value: 142.90 },
        { label: '13:00', value: 143.80 },
        { label: '14:00', value: 145.00 },
        { label: '15:00', value: 144.20 },
        { label: '16:00', value: 145.80 },
        { label: '17:00', value: 144.80 }
      ],
      '1H': [
        { label: 'Pzt', value: 139.00 },
        { label: 'Sal', value: 140.80 },
        { label: 'Çar', value: 142.00 },
        { label: 'Per', value: 143.50 },
        { label: 'Cum', value: 144.80 }
      ],
      '1A': [
        { label: '1. Hafta', value: 134.00 },
        { label: '2. Hafta', value: 137.50 },
        { label: '3. Hafta', value: 141.20 },
        { label: '4. Hafta', value: 144.80 }
      ]
    }
  },
  SAHOL: {
    symbol: 'SAHOL',
    name: 'Hacı Ömer Sabancı Holding',
    price: '92,15 TL',
    rawPrice: 92.15,
    change: '+%1,20',
    isUp: true,
    volume: '1,65 Milyar TL',
    dayHigh: '93,40 TL',
    dayLow: '90,80 TL',
    peRatio: '4,90',
    marketCap: '188 Milyar TL',
    sector: 'Holding & Yatırım',
    summary: 'Enerji, bankacılık, sanayi ve yapı malzemeleri alanlarında güçlü iştirak ağına sahip köklü holding.',
    series: {
      '1G': [
        { label: '10:00', value: 91.10 },
        { label: '11:00', value: 91.60 },
        { label: '12:00', value: 91.40 },
        { label: '13:00', value: 92.00 },
        { label: '14:00', value: 92.60 },
        { label: '15:00', value: 92.20 },
        { label: '16:00', value: 92.80 },
        { label: '17:00', value: 92.15 }
      ],
      '1H': [
        { label: 'Pzt', value: 89.50 },
        { label: 'Sal', value: 90.20 },
        { label: 'Çar', value: 90.90 },
        { label: 'Per', value: 91.50 },
        { label: 'Cum', value: 92.15 }
      ],
      '1A': [
        { label: '1. Hafta', value: 86.00 },
        { label: '2. Hafta', value: 88.20 },
        { label: '3. Hafta', value: 90.40 },
        { label: '4. Hafta', value: 92.15 }
      ]
    }
  },
  FROTO: {
    symbol: 'FROTO',
    name: 'Ford Otomotiv Sanayi',
    price: '1.025,00 TL',
    rawPrice: 1025.00,
    change: '-%1,10',
    isUp: false,
    volume: '1,55 Milyar TL',
    dayHigh: '1.045,00 TL',
    dayLow: '1.015,00 TL',
    peRatio: '8,70',
    marketCap: '360 Milyar TL',
    sector: 'Otomotiv Sanayi',
    summary: 'Avrupa ticari araç pazarındaki ihracat liderliği ve elektrikli araç yatırımlarıyla öne çıkan sanayi devi.',
    series: {
      '1G': [
        { label: '10:00', value: 1038.00 },
        { label: '11:00', value: 1032.00 },
        { label: '12:00', value: 1028.00 },
        { label: '13:00', value: 1024.00 },
        { label: '14:00', value: 1020.00 },
        { label: '15:00', value: 1022.00 },
        { label: '16:00', value: 1027.00 },
        { label: '17:00', value: 1025.00 }
      ],
      '1H': [
        { label: 'Pzt', value: 1055.00 },
        { label: 'Sal', value: 1048.00 },
        { label: 'Çar', value: 1040.00 },
        { label: 'Per', value: 1030.00 },
        { label: 'Cum', value: 1025.00 }
      ],
      '1A': [
        { label: '1. Hafta', value: 1090.00 },
        { label: '2. Hafta', value: 1070.00 },
        { label: '3. Hafta', value: 1045.00 },
        { label: '4. Hafta', value: 1025.00 }
      ]
    }
  },
  TOASO: {
    symbol: 'TOASO',
    name: 'Tofaş Türk Otomobil Fabrikası',
    price: '214,50 TL',
    rawPrice: 214.50,
    change: '+%0,65',
    isUp: true,
    volume: '980 Milyon TL',
    dayHigh: '218,00 TL',
    dayLow: '212,00 TL',
    peRatio: '7,40',
    marketCap: '107 Milyar TL',
    sector: 'Otomotiv Sanayi',
    summary: 'Stellantis işbirliği ve yeni model üretim anlaşmalarıyla üretim kapasitesini artıran otomotiv üreticisi.',
    series: {
      '1G': [
        { label: '10:00', value: 213.00 },
        { label: '11:00', value: 214.20 },
        { label: '12:00', value: 213.80 },
        { label: '13:00', value: 214.50 },
        { label: '14:00', value: 215.80 },
        { label: '15:00', value: 214.90 },
        { label: '16:00', value: 216.00 },
        { label: '17:00', value: 214.50 }
      ],
      '1H': [
        { label: 'Pzt', value: 210.00 },
        { label: 'Sal', value: 211.50 },
        { label: 'Çar', value: 212.80 },
        { label: 'Per', value: 213.90 },
        { label: 'Cum', value: 214.50 }
      ],
      '1A': [
        { label: '1. Hafta', value: 204.00 },
        { label: '2. Hafta', value: 208.00 },
        { label: '3. Hafta', value: 211.50 },
        { label: '4. Hafta', value: 214.50 }
      ]
    }
  },
  PGSUS: {
    symbol: 'PGSUS',
    name: 'Pegasus Hava Taşımacılığı',
    price: '228,40 TL',
    rawPrice: 228.40,
    change: '+%2,70',
    isUp: true,
    volume: '1,42 Milyar TL',
    dayHigh: '231,50 TL',
    dayLow: '222,00 TL',
    peRatio: '6,80',
    marketCap: '114 Milyar TL',
    sector: 'Havacılık / Ulaştırma',
    summary: 'Düşük maliyetli taşıyıcı iş modeli ve genç filosuyla uluslararası uçuş ağını genişleten havacılık şirketi.',
    series: {
      '1G': [
        { label: '10:00', value: 222.50 },
        { label: '11:00', value: 224.20 },
        { label: '12:00', value: 225.00 },
        { label: '13:00', value: 226.40 },
        { label: '14:00', value: 228.00 },
        { label: '15:00', value: 227.20 },
        { label: '16:00', value: 229.50 },
        { label: '17:00', value: 228.40 }
      ],
      '1H': [
        { label: 'Pzt', value: 218.00 },
        { label: 'Sal', value: 220.50 },
        { label: 'Çar', value: 222.80 },
        { label: 'Per', value: 225.10 },
        { label: 'Cum', value: 228.40 }
      ],
      '1A': [
        { label: '1. Hafta', value: 208.00 },
        { label: '2. Hafta', value: 214.00 },
        { label: '3. Hafta', value: 221.50 },
        { label: '4. Hafta', value: 228.40 }
      ]
    }
  },
  TCELL: {
    symbol: 'TCELL',
    name: 'Turkcell İletişim Hizmetleri',
    price: '96,30 TL',
    rawPrice: 96.30,
    change: '+%1,35',
    isUp: true,
    volume: '1,38 Milyar TL',
    dayHigh: '97,40 TL',
    dayLow: '94,80 TL',
    peRatio: '9,10',
    marketCap: '212 Milyar TL',
    sector: 'Telekomünikasyon',
    summary: 'Dijital servisler, veri merkezi yatırımları ve ARPU büyümesiyle telekomünikasyon sektörünün öncüsü.',
    series: {
      '1G': [
        { label: '10:00', value: 95.00 },
        { label: '11:00', value: 95.60 },
        { label: '12:00', value: 95.40 },
        { label: '13:00', value: 96.10 },
        { label: '14:00', value: 96.80 },
        { label: '15:00', value: 96.40 },
        { label: '16:00', value: 97.10 },
        { label: '17:00', value: 96.30 }
      ],
      '1H': [
        { label: 'Pzt', value: 93.50 },
        { label: 'Sal', value: 94.20 },
        { label: 'Çar', value: 95.00 },
        { label: 'Per', value: 95.80 },
        { label: 'Cum', value: 96.30 }
      ],
      '1A': [
        { label: '1. Hafta', value: 90.00 },
        { label: '2. Hafta', value: 92.50 },
        { label: '3. Hafta', value: 94.80 },
        { label: '4. Hafta', value: 96.30 }
      ]
    }
  },
  PETKM: {
    symbol: 'PETKM',
    name: 'Petkim Petrokimya Holding',
    price: '19,85 TL',
    rawPrice: 19.85,
    change: '-%0,60',
    isUp: false,
    volume: '870 Milyon TL',
    dayHigh: '20,25 TL',
    dayLow: '19,60 TL',
    peRatio: '10,20',
    marketCap: '50 Milyar TL',
    sector: 'Petrokimya',
    summary: 'Türkiye’nin ilk ve tek entegre petrokimya tesisi; nafta-etilen makasındaki hareketleri yakından izleniyor.',
    series: {
      '1G': [
        { label: '10:00', value: 20.05 },
        { label: '11:00', value: 19.95 },
        { label: '12:00', value: 19.80 },
        { label: '13:00', value: 19.75 },
        { label: '14:00', value: 19.70 },
        { label: '15:00', value: 19.82 },
        { label: '16:00', value: 19.90 },
        { label: '17:00', value: 19.85 }
      ],
      '1H': [
        { label: 'Pzt', value: 20.40 },
        { label: 'Sal', value: 20.20 },
        { label: 'Çar', value: 20.00 },
        { label: 'Per', value: 19.90 },
        { label: 'Cum', value: 19.85 }
      ],
      '1A': [
        { label: '1. Hafta', value: 21.10 },
        { label: '2. Hafta', value: 20.70 },
        { label: '3. Hafta', value: 20.20 },
        { label: '4. Hafta', value: 19.85 }
      ]
    }
  },
  EKGYO: {
    symbol: 'EKGYO',
    name: 'Emlak Konut GMYO',
    price: '11,95 TL',
    rawPrice: 11.95,
    change: '+%3,10',
    isUp: true,
    volume: '1,55 Milyar TL',
    dayHigh: '12,20 TL',
    dayLow: '11,50 TL',
    peRatio: '6,10',
    marketCap: '45 Milyar TL',
    sector: 'Gayrimenkul Yatırım Ortaklığı',
    summary: 'Kentsel dönüşüm projeleri ve gelir paylaşımı modeliyle gayrimenkul sektörünün lider portföy yöneticisi.',
    series: {
      '1G': [
        { label: '10:00', value: 11.55 },
        { label: '11:00', value: 11.70 },
        { label: '12:00', value: 11.65 },
        { label: '13:00', value: 11.80 },
        { label: '14:00', value: 12.05 },
        { label: '15:00', value: 11.90 },
        { label: '16:00', value: 12.15 },
        { label: '17:00', value: 11.95 }
      ],
      '1H': [
        { label: 'Pzt', value: 11.20 },
        { label: 'Sal', value: 11.35 },
        { label: 'Çar', value: 11.50 },
        { label: 'Per', value: 11.75 },
        { label: 'Cum', value: 11.95 }
      ],
      '1A': [
        { label: '1. Hafta', value: 10.40 },
        { label: '2. Hafta', value: 10.90 },
        { label: '3. Hafta', value: 11.45 },
        { label: '4. Hafta', value: 11.95 }
      ]
    }
  },
  YKBNK: {
    symbol: 'YKBNK',
    name: 'Yapı ve Kredi Bankası',
    price: '29,40 TL',
    rawPrice: 29.40,
    change: '+%1,60',
    isUp: true,
    volume: '2,25 Milyar TL',
    dayHigh: '29,80 TL',
    dayLow: '28,80 TL',
    peRatio: '4,50',
    marketCap: '248 Milyar TL',
    sector: 'Bankacılık',
    summary: 'Kredi kartları ve tüketici finansmanındaki güçlü pazar payıyla özel bankacılık sektöründe öncü kurum.',
    series: {
      '1G': [
        { label: '10:00', value: 28.90 },
        { label: '11:00', value: 29.15 },
        { label: '12:00', value: 29.00 },
        { label: '13:00', value: 29.30 },
        { label: '14:00', value: 29.60 },
        { label: '15:00', value: 29.35 },
        { label: '16:00', value: 29.75 },
        { label: '17:00', value: 29.40 }
      ],
      '1H': [
        { label: 'Pzt', value: 28.10 },
        { label: 'Sal', value: 28.50 },
        { label: 'Çar', value: 28.90 },
        { label: 'Per', value: 29.20 },
        { label: 'Cum', value: 29.40 }
      ],
      '1A': [
        { label: '1. Hafta', value: 26.80 },
        { label: '2. Hafta', value: 27.60 },
        { label: '3. Hafta', value: 28.50 },
        { label: '4. Hafta', value: 29.40 }
      ]
    }
  },
  ENKAI: {
    symbol: 'ENKAI',
    name: 'Enka İnşaat ve Sanayi',
    price: '46,20 TL',
    rawPrice: 46.20,
    change: '+%0,45',
    isUp: true,
    volume: '820 Milyon TL',
    dayHigh: '46,80 TL',
    dayLow: '45,60 TL',
    peRatio: '10,80',
    marketCap: '277 Milyar TL',
    sector: 'İnşaat & Taahhüt',
    summary: 'Güçlü döviz cinsi nakit pozisyonu, uluslararası taahhüt projeleri ve gayrimenkul portföyü ile güvenli liman hisselerinden.',
    series: {
      '1G': [
        { label: '10:00', value: 45.90 },
        { label: '11:00', value: 46.10 },
        { label: '12:00', value: 46.00 },
        { label: '13:00', value: 46.30 },
        { label: '14:00', value: 46.50 },
        { label: '15:00', value: 46.25 },
        { label: '16:00', value: 46.60 },
        { label: '17:00', value: 46.20 }
      ],
      '1H': [
        { label: 'Pzt', value: 45.20 },
        { label: 'Sal', value: 45.50 },
        { label: 'Çar', value: 45.80 },
        { label: 'Per', value: 46.00 },
        { label: 'Cum', value: 46.20 }
      ],
      '1A': [
        { label: '1. Hafta', value: 44.00 },
        { label: '2. Hafta', value: 44.80 },
        { label: '3. Hafta', value: 45.50 },
        { label: '4. Hafta', value: 46.20 }
      ]
    }
  },
  MGROS: {
    symbol: 'MGROS',
    name: 'Migros Ticaret A.Ş.',
    price: '468,50 TL',
    rawPrice: 468.50,
    change: '+%1,90',
    isUp: true,
    volume: '1,15 Milyar TL',
    dayHigh: '474,00 TL',
    dayLow: '458,00 TL',
    peRatio: '12,60',
    marketCap: '85 Milyar TL',
    sector: 'Perakende Ticaret',
    summary: 'Online satış kanalları, mağaza açılış hızı ve güçlü işletme sermayesi yönetimiyle kârlılığını artıran süpermarket zinciri.',
    series: {
      '1G': [
        { label: '10:00', value: 460.00 },
        { label: '11:00', value: 463.50 },
        { label: '12:00', value: 462.00 },
        { label: '13:00', value: 465.00 },
        { label: '14:00', value: 470.00 },
        { label: '15:00', value: 467.50 },
        { label: '16:00', value: 472.00 },
        { label: '17:00', value: 468.50 }
      ],
      '1H': [
        { label: 'Pzt', value: 450.00 },
        { label: 'Sal', value: 455.00 },
        { label: 'Çar', value: 460.00 },
        { label: 'Per', value: 464.00 },
        { label: 'Cum', value: 468.50 }
      ],
      '1A': [
        { label: '1. Hafta', value: 435.00 },
        { label: '2. Hafta', value: 445.00 },
        { label: '3. Hafta', value: 458.00 },
        { label: '4. Hafta', value: 468.50 }
      ]
    }
  }
};

/**
 * Deterministic pseudo-random number generator (Mulberry32)
 * Ensures repeatable, deterministic candle data on every load without external dependencies.
 */
function createSeededRandom(seed) {
  let s = seed >>> 0;
  return function() {
    s = (s + 0x6D2B79F5) >>> 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Generate deterministic demo OHLC and volume candles for a stock
 */
export function generateDemoCandles(symbol, basePrice, timeframe) {
  let seed = Math.round(basePrice * 100);
  for (let i = 0; i < symbol.length; i++) {
    seed = (seed * 31 + symbol.charCodeAt(i)) >>> 0;
  }
  if (timeframe === '1H') seed = (seed + 1013) >>> 0;
  if (timeframe === '1A') seed = (seed + 2027) >>> 0;

  const rand = createSeededRandom(seed);
  let count = 12;
  let labels = ['10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '15:00', '16:00', '17:00'];
  let volatility = 0.008;

  if (timeframe === '1H') {
    count = 10;
    labels = ['Pzt ÖÖ', 'Pzt ÖS', 'Sal ÖÖ', 'Sal ÖS', 'Çar ÖÖ', 'Çar ÖS', 'Per ÖÖ', 'Per ÖS', 'Cum ÖÖ', 'Cum ÖS'];
    volatility = 0.012;
  } else if (timeframe === '1A') {
    count = 15;
    labels = ['1. Gün', '3. Gün', '5. Gün', '7. Gün', '9. Gün', '11. Gün', '13. Gün', '15. Gün', '17. Gün', '19. Gün', '21. Gün', '23. Gün', '25. Gün', '28. Gün', '30. Gün'];
    volatility = 0.016;
  }

  const volBase = Math.round(Math.max(50000, basePrice * 15000));
  const returns = [];
  for (let i = 0; i < count; i++) {
    returns.push((rand() - 0.49) * volatility);
  }

  // Work backwards so the final close is basePrice
  const closes = new Array(count);
  closes[count - 1] = basePrice;
  for (let i = count - 2; i >= 0; i--) {
    closes[i] = closes[i + 1] / (1 + returns[i + 1]);
  }

  const candles = [];
  for (let i = 0; i < count; i++) {
    const close = closes[i];
    const prevClose = i > 0 ? closes[i - 1] : close * (1 - returns[0]);
    const open = prevClose;
    const bodyHigh = Math.max(open, close);
    const bodyLow = Math.min(open, close);
    const wickHigh = bodyHigh + (rand() * volatility * basePrice * 0.75);
    const wickLow = Math.max(0.01, bodyLow - (rand() * volatility * basePrice * 0.75));
    const volume = Math.round(volBase * (0.6 + rand() * 0.8));

    candles.push({
      label: labels[i] || (`T${i + 1}`),
      open: Number(open.toFixed(2)),
      high: Number(wickHigh.toFixed(2)),
      low: Number(wickLow.toFixed(2)),
      close: Number(close.toFixed(2)),
      volume,
      isUp: close >= open
    });
  }

  return candles;
}

// Automatically populate deterministic OHLC and volume series for every demo stock
Object.keys(DEMO_STOCKS).forEach(symbol => {
  const stock = DEMO_STOCKS[symbol];
  stock.candles = {
    '1G': generateDemoCandles(symbol, stock.rawPrice, '1G'),
    '1H': generateDemoCandles(symbol, stock.rawPrice, '1H'),
    '1A': generateDemoCandles(symbol, stock.rawPrice, '1A')
  };
});

export const DEMO_NEWS = [
  {
    id: 1,
    title: 'TCMB Para Politikası Kurulu toplantı özeti yayımlandı: Sıkı duruş kararlılıkla korunacak',
    time: '12 dakika önce',
    category: 'Makro Ekonomi'
  },
  {
    id: 2,
    title: 'THYAO, uluslararası hatlarda yolcu doluluk oranının %83,8 seviyesine ulaştığını açıkladı',
    time: '38 dakika önce',
    category: 'Şirket Haberi'
  },
  {
    id: 3,
    title: 'Borsa İstanbul\'da BIST 100 endeksi günü %1,42 primle 9.185 puandan tamamladı',
    time: '1 saat önce',
    category: 'Piyasa Özeti'
  },
  {
    id: 4,
    title: 'ASELS, yeni nesil elektro-optik ve radar sistemleri için 45 milyon dolarlık ihracat sözleşmesi imzaladı',
    time: '2 saat önce',
    category: 'Sözleşme'
  },
  {
    id: 5,
    title: 'Küresel piyasalarda merkez bankaları faiz kararları öncesinde dengeli seyir hakim',
    time: '3 saat önce',
    category: 'Küresel Piyasa'
  },
  {
    id: 6,
    title: 'EREGL, karbon nötr çelik üretimi kapsamında 3,2 milyar TL\'lik GES yatırım planını duyurdu',
    time: '4 saat önce',
    category: 'Sürdürülebilirlik'
  }
];

export const SUGGESTED_QUESTIONS = [
  'BIST 100 genel görünümü nasıl?',
  'THYAO teknik seviyeleri neler?',
  'Piyasadaki son gelişmelerin etkisi nedir?'
];

export const CANNED_AI_RESPONSES = {
  greeting: `Demo yanıt: Merhaba! Borsa İstanbul piyasaları ve hisse senetleri hakkındaki sorularınızı yanıtlamak için buradayım. Size bugün nasıl yardımcı olabilirim?`,

  fallback: `Demo yanıt: Bu soru şu anki demo sürümümüzde yer almamaktadır. BIST Analiz AI'nın gerçek yapay zeka ve canlı veri entegrasyonu sonraki sürümlerde aktif olacaktır. Şimdilik THYAO, ASELS, GARAN, EREGL gibi hisseleri ve örnek soruları inceleyebilirsiniz.`,

  bist100: `Demo yanıt: BIST 100 endeksi gün içerisinde 9.150 - 9.200 direnç bandını test etmektedir. İşlem hacminin 110 milyar TL üzerine çıkması ve bankacılık ile ulaştırma hisselerindeki alımlar yükselişi desteklemektedir. Kısa vadede 9.000 puan ana destek, 9.250 puan ise ilk güçlü direnç seviyesidir.`,

  thyao: `Demo yanıt: THYAO hissesi için 282,00 TL bandı önemli bir destek seviyesi konumundadır. Yukarı yönlü momentumun devamında 291,00 TL gün içi zirvesi ve ardından psikolojik 300,00 TL direnci hedeflenebilir. Uluslararası yolcu trafiğindeki güçlü seyir hisse çarpanlarının cazip kalmasını sağlamaktadır.`,

  asels: `Demo yanıt: ASELS hissesinde 63,10 TL destek, 65,00 TL seviyesi ise kısa vadeli direnç olarak izlenmektedir. İmzalanan yeni ihracat sözleşmeleri ve savunma bütçesindeki yerlilik payının yükselmesi orta-uzun vadeli nakit akışını olumlu desteklemektedir.`,

  eregl: `Demo yanıt: EREGL hissesinde 48,40 TL seviyesinde destek tabanı aranmaktadır; yukarıda 50,20 TL ilk direnç bölgesidir. Yeni açıklanan güneş enerjisi yatırımı enerji maliyetlerini düşürme hedefi açısından uzun vadede pozitif değerlendirilmektedir.`,

  garan: `Demo yanıt: GARAN tarafında 116,00 TL ana destek seviyesi, 120,00 TL ise psikolojik direnç eşiğidir. Güçlü sermaye yeterlilik rasyosu ve net faiz marjı toparlanması bankanın sektördeki öncü konumunu desteklemektedir.`,

  akbnk: `Demo yanıt: AKBNK hissesinde 55,00 TL seviyesi güçlü bir taban oluşturmuş durumdadır. 57,50 TL üzerinde kalıcılık sağlanması durumunda yeni zirve hareketleri test edilebilir.`,

  isctr: `Demo yanıt: ISCTR hissesinde 13,20 TL destek, 13,65 TL ise ilk direnç seviyesidir. İştirak portföyünün güçlü performansı ve dengeli bilanço yapısı hisse performansına destek vermektedir.`,

  kchol: `Demo yanıt: KCHOL için 181,00 TL önemli destek, 186,50 TL ise kısa vadeli direnç olarak öne çıkmaktadır. Otomotiv, enerji ve finans iştiraklerinden sağlanan dengeli kârlılık holdingin net aktif değer iskontosunu daraltmaktadır.`,

  sise: `Demo yanıt: SISE hissesinde 42,00 TL seviyesi uzun vadeli destek noktası olarak takip edilmektedir. Küresel talepteki toparlanma ve yeni soda külü yatırımları orta vadeli görünüm açısından belirleyici olacaktır.`,

  bimas: `Demo yanıt: BIMAS tarafında 490,00 TL destek, 505,00 TL ise psikolojik dirençtir. Güçlü nakit akışı, enflasyonist ortamda korunaklı gıda perakendesi iş modeli ve istikrarlı mağaza açılışları şirketi defansif bir hisse kılmaktadır.`,

  tuprs: `Demo yanıt: TUPRS hissesinde 141,50 TL destek, 146,50 TL ise direnç olarak izleniyor. Akdeniz rafineri marjlarındaki seyrin güçlü kalması ve stratejik dönüşüm yatırımları hisseyi desteklemektedir.`,

  sahol: `Demo yanıt: SAHOL hissesinde 90,50 TL destek, 94,00 TL ise direnç noktasıdır. Yenilenebilir enerji ve bankacılık kollarındaki yüksek performans holding getirisini yukarı taşımaktadır.`,

  froto: `Demo yanıt: FROTO hissesinde 1.015,00 TL destek, 1.050,00 TL ise direnç seviyesidir. Avrupa ticari araç talebi ve Romanya Craiova tesisindeki elektrikli model üretimi uzun vadeli katalizörlerdir.`,

  gelismeler: `Demo yanıt: Günün öne çıkan gelişmeleri arasında TCMB PPK toplantı özeti ve sanayi/bankacılık hisselerindeki şirket haberleri yer alıyor. Makro tarafta sıkı para politikası kur dengesini korurken, BIST 100 tarafında hisse bazlı bilanço ayrışmaları ön plandadır.`
};
