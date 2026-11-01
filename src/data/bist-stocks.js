/**
 * Borsa İstanbul (BIST) Hisse Senetleri Listesi
 * 
 * DİKKAT / ÖNEMLİ:
 * Bu liste resmi Borsa İstanbul (BIST) ve Kamuyu Aydınlatma Platformu (KAP) kayıtlarıyla doğrulanmalıdır.
 * This list must be verified against official Borsa Istanbul listings.
 * 
 * Veriler BIST 100 endeksi hisseleri ve işlem hacmi yüksek Borsa İstanbul şirketlerini içerir.
 */

export const BIST_STOCKS = [
  // BIST 30 & BIST 100 Önde Gelen Hisseler
  { code: 'THYAO', name: 'Türk Hava Yolları A.O.' },
  { code: 'GARAN', name: 'Türkiye Garanti Bankası A.Ş. (Garanti BBVA)' },
  { code: 'AKBNK', name: 'Akbank T.A.Ş.' },
  { code: 'ISCTR', name: 'Türkiye İş Bankası A.Ş. (C Grubu)' },
  { code: 'YKBNK', name: 'Yapı ve Kredi Bankası A.Ş.' },
  { code: 'KCHOL', name: 'Koç Holding A.Ş.' },
  { code: 'SAHOL', name: 'Hacı Ömer Sabancı Holding A.Ş.' },
  { code: 'SISE', name: 'Türkiye Şişe ve Cam Fabrikaları A.Ş. (Şişecam)' },
  { code: 'BIMAS', name: 'BİM Birleşik Mağazalar A.Ş.' },
  { code: 'TUPRS', name: 'Tüpraş - Türkiye Petrol Rafinerileri A.Ş.' },
  { code: 'FROTO', name: 'Ford Otomotiv Sanayi A.Ş.' },
  { code: 'TOASO', name: 'Tofaş Türk Otomobil Fabrikası A.Ş.' },
  { code: 'PGSUS', name: 'Pegasus Hava Taşımacılığı A.Ş.' },
  { code: 'TCELL', name: 'Turkcell İletişim Hizmetleri A.Ş.' },
  { code: 'PETKM', name: 'Petkim Petrokimya Holding A.Ş.' },
  { code: 'EREGL', name: 'Ereğli Demir ve Çelik Fabrikaları T.A.Ş. (Erdemir)' },
  { code: 'ASELS', name: 'Aselsan Elektronik Sanayi ve Ticaret A.Ş.' },
  { code: 'EKGYO', name: 'Emlak Konut Gayrimenkul Yatırım Ortaklığı A.Ş.' },
  { code: 'ENKAI', name: 'Enka İnşaat ve Sanayi A.Ş.' },
  { code: 'MGROS', name: 'Migros Ticaret A.Ş.' },

  // BIST Banka, Sigorta & Finans
  { code: 'VAKBN', name: 'Türkiye Vakıflar Bankası T.A.O.' },
  { code: 'HALKB', name: 'Türkiye Halk Bankası A.Ş.' },
  { code: 'TSKB', name: 'Türkiye Sınai Kalkınma Bankası A.Ş.' },
  { code: 'ALBRK', name: 'Albaraka Türk Katılım Bankası A.Ş.' },
  { code: 'SKBNK', name: 'Şekerbank T.A.Ş.' },
  { code: 'ISMEN', name: 'İş Yatırım Menkul Değerler A.Ş.' },
  { code: 'ANSGR', name: 'Anadolu Anonim Türk Sigorta Şirketi' },
  { code: 'TURSG', name: 'Türkiye Sigorta A.Ş.' },

  // Sanayi, Otomotiv & Demir Çelik
  { code: 'ARCLK', name: 'Arçelik A.Ş.' },
  { code: 'VESTL', name: 'Vestel Elektronik Sanayi ve Ticaret A.Ş.' },
  { code: 'VESBE', name: 'Vestel Beyaz Eşya Sanayi ve Ticaret A.Ş.' },
  { code: 'KRDMD', name: 'Kardemir Karabük Demir Çelik Sanayi A.Ş. (D Grubu)' },
  { code: 'KRDMA', name: 'Kardemir Karabük Demir Çelik Sanayi A.Ş. (A Grubu)' },
  { code: 'KRDMB', name: 'Kardemir Karabük Demir Çelik Sanayi A.Ş. (B Grubu)' },
  { code: 'BRSAN', name: 'Borusan Birleşik Boru Fabrikaları Sanayi ve Ticaret A.Ş.' },
  { code: 'BRYAT', name: 'Borusan Yatırım ve Pazarlama A.Ş.' },
  { code: 'BFREN', name: 'Bosch Fren Sistemleri Sanayi ve Ticaret A.Ş.' },
  { code: 'OTKAR', name: 'Otokar Otomotiv ve Savunma Sanayi A.Ş.' },
  { code: 'DOAS', name: 'Doğuş Otomotiv Servis ve Ticaret A.Ş.' },
  { code: 'TTKOM', name: 'Türk Telekomünikasyon A.Ş.' },
  { code: 'TAVHL', name: 'TAV Havalimanları Holding A.Ş.' },
  { code: 'CLEBI', name: 'Çelebi Hava Servisi A.Ş.' },
  { code: 'TMSN', name: 'Tümosan Motor ve Traktör Sanayi A.Ş.' },
  { code: 'EGEEN', name: 'Ege Endüstri ve Ticaret A.Ş.' },
  { code: 'KARTN', name: 'Kartonsan Karton Sanayi ve Ticaret A.Ş.' },
  { code: 'KCAER', name: 'Kocaer Çelik Sanayi ve Ticaret A.Ş.' },
  { code: 'CEMTS', name: 'Çemtaş Çelik Makina Sanayi ve Ticaret A.Ş.' },
  { code: 'PARSN', name: 'Parsan Makina Parçaları Sanayii A.Ş.' },
  { code: 'JANTS', name: 'Jantsa Jant Sanayi ve Ticaret A.Ş.' },
  { code: 'BRISA', name: 'Brisa Bridgestone Sabancı Lastik Sanayi ve Ticaret A.Ş.' },
  { code: 'GOODY', name: 'Good-Year Lastikleri T.A.Ş.' },

  // Holdingler & Yatırım
  { code: 'AGHOL', name: 'AG Anadolu Grubu Holding A.Ş.' },
  { code: 'ALARK', name: 'Alarko Holding A.Ş.' },
  { code: 'DOHOL', name: 'Doğan Şirketler Grubu Holding A.Ş.' },
  { code: 'TKFEN', name: 'Tekfen Holding A.Ş.' },
  { code: 'GLYHO', name: 'Global Yatırım Holding A.Ş.' },
  { code: 'GSDHO', name: 'GSD Holding A.Ş.' },
  { code: 'VERUS', name: 'Verusa Holding A.Ş.' },
  { code: 'INVES', name: 'Investco Holding A.Ş.' },
  { code: 'ECZYT', name: 'Eczacıbaşı Yatırım Holding Ortaklığı A.Ş.' },
  { code: 'IHLAS', name: 'İhlas Holding A.Ş.' },

  // Enerji & Elektrik
  { code: 'ASTOR', name: 'Astor Enerji A.Ş.' },
  { code: 'ENJSA', name: 'Enerjisa Enerji A.Ş.' },
  { code: 'AKSEN', name: 'Aksa Enerji Üretim A.Ş.' },
  { code: 'AKSA', name: 'Aksa Akrilik Kimya Sanayii A.Ş.' },
  { code: 'ODAS', name: 'Odaş Elektrik Üretim Sanayi Ticaret A.Ş.' },
  { code: 'ZOREN', name: 'Zorlu Enerji Elektrik Üretim A.Ş.' },
  { code: 'CANTE', name: 'Çan2 Termik A.Ş.' },
  { code: 'GWIND', name: 'Galata Wind Enerji A.Ş.' },
  { code: 'AKFYE', name: 'Akfen Yenilenebilir Enerji A.Ş.' },
  { code: 'AYDEM', name: 'Aydem Yenilenebilir Enerji A.Ş.' },
  { code: 'CWENE', name: 'CW Enerji Mühendislik Ticaret ve Sanayi A.Ş.' },
  { code: 'EUPWR', name: 'Europower Enerji ve Otomasyon Teknolojileri Sanayi Ticaret A.Ş.' },
  { code: 'GESAN', name: 'Girişim Elektrik Sanayi Taahhüt ve Ticaret A.Ş.' },
  { code: 'KONTR', name: 'Kontrolmatik Teknoloji Enerji ve Mühendislik A.Ş.' },
  { code: 'SMRTG', name: 'Smart Güneş Enerjisi Teknolojileri A.Ş.' },
  { code: 'YEOTK', name: 'YEO Teknoloji Enerji ve Endüstri A.Ş.' },
  { code: 'ALFAS', name: 'Alfa Solar Enerji Sanayi ve Ticaret A.Ş.' },
  { code: 'BIOEN', name: 'Biotrend Çevre ve Enerji Yatırımları A.Ş.' },
  { code: 'CATES', name: 'Çates Elektrik Üretim A.Ş.' },
  { code: 'ENERY', name: 'Enerya Enerji A.Ş.' },
  { code: 'AHGAZ', name: 'Ahlatcı Doğal Gaz Dağıtım Enerji ve Yatırım A.Ş.' },
  { code: 'MOGAN', name: 'Mogan Enerji Yatırım Holding A.Ş.' },
  { code: 'ENTRA', name: 'IC Enterra Yenilenebilir Enerji A.Ş.' },

  // Kimya, Gübre & Madencilik
  { code: 'SASA', name: 'SASA Polyester Sanayi A.Ş.' },
  { code: 'HEKTS', name: 'Hektaş Ticaret T.A.Ş.' },
  { code: 'GUBRF', name: 'Gübre Fabrikaları T.A.Ş.' },
  { code: 'KOZAL', name: 'Koza Altın İşletmeleri A.Ş.' },
  { code: 'KOZAA', name: 'Koza Anadolu Metal Madencilik İşletmeleri A.Ş.' },
  { code: 'IPEKE', name: 'İpek Doğal Enerji Kaynakları Araştırma ve Üretim A.Ş.' },
  { code: 'KORDS', name: 'Kordsa Teknik Tekstil A.Ş.' },
  { code: 'KMPUR', name: 'Kimteks Poliüretan Sanayi ve Ticaret A.Ş.' },
  { code: 'POLHO', name: 'Polisan Holding A.Ş.' },
  { code: 'BAGFS', name: 'Bagfaş Bandırma Gübre Fabrikaları A.Ş.' },
  { code: 'CVKMD', name: 'CVK Maden İşletmeleri Sanayi ve Ticaret A.Ş.' },
  { code: 'PRKME', name: 'Park Elektrik Üretim Madencilik Sanayi ve Ticaret A.Ş.' },

  // Çimento, Seramik & Cam
  { code: 'OYAKC', name: 'OYAK Çimento Fabrikaları A.Ş.' },
  { code: 'CIMSA', name: 'Çimsa Çimento Sanayi ve Ticaret A.Ş.' },
  { code: 'BUCIM', name: 'Bursa Çimento Fabrikası A.Ş.' },
  { code: 'BTCIM', name: 'Batıçim Batı Anadolu Çimento Sanayii A.Ş.' },
  { code: 'BSOKE', name: 'Batısöke Söke Çimento Sanayii T.A.Ş.' },
  { code: 'KONYA', name: 'Konya Çimento Sanayii A.Ş.' },
  { code: 'QUAGR', name: 'Qua Granite Hayal Yapı ve Ürünleri Sanayi Ticaret A.Ş.' },
  { code: 'BIENY', name: 'Bien Yapı Ürünleri Sanayi Turizm ve Ticaret A.Ş.' },
  { code: 'GENTS', name: 'Gentaş Dekoratif Yüzeyler Sanayi ve Ticaret A.Ş.' },

  // Gıda, İçecek & Perakende
  { code: 'CCOLA', name: 'Coca-Cola İçecek A.Ş.' },
  { code: 'AEFES', name: 'Anadolu Efes Biracılık ve Malt Sanayii A.Ş.' },
  { code: 'ULKER', name: 'Ülker Bisküvi Sanayi A.Ş.' },
  { code: 'SOKM', name: 'Şok Marketler Ticaret A.Ş.' },
  { code: 'TABGD', name: 'TAB Gıda Sanayi ve Ticaret A.Ş.' },
  { code: 'TUKAS', name: 'Tukaş Gıda Sanayi ve Ticaret A.Ş.' },
  { code: 'TATGD', name: 'Tat Gıda Sanayi A.Ş.' },
  { code: 'KAYSE', name: 'Kayseri Şeker Fabrikası A.Ş.' },
  { code: 'YYLGD', name: 'Yayla Agro Gıda Sanayi ve Ticaret A.Ş.' },
  { code: 'GOKNR', name: 'Göknur Gıda Maddeleri Enerji A.Ş.' },
  { code: 'OBAMS', name: 'Oba Makarnacılık Sanayi ve Ticaret A.Ş.' },
  { code: 'DMRGD', name: 'DMR Unlu Mamuller (Simit Sarayı) A.Ş.' },
  { code: 'EFORC', name: 'Efor Çay Sanayi ve Ticaret A.Ş.' },
  { code: 'EBEBK', name: 'Ebebek Mağazacılık A.Ş.' },
  { code: 'MAVI', name: 'Mavi Giyim Sanayi ve Ticaret A.Ş.' },
  { code: 'VAKKO', name: 'Vakko Tekstil ve Hazır Giyim Sanayi A.Ş.' },

  // Sağlık, İlaç & Biyoteknoloji
  { code: 'MPARK', name: 'MLP Sağlık Hizmetleri A.Ş. (Medical Park)' },
  { code: 'DEVA', name: 'Deva Holding A.Ş.' },
  { code: 'GENIL', name: 'Gen İlaç ve Sağlık Ürünleri Sanayi ve Ticaret A.Ş.' },
  { code: 'SELEC', name: 'Selçuk Ecza Deposu Ticaret ve Sanayi A.Ş.' },
  { code: 'ECILC', name: 'Eczacıbaşı İlaç Sınai ve Finansal Yatırımlar A.Ş.' },

  // Teknoloji, Yazılım & Savunma
  { code: 'MIATK', name: 'Mia Teknoloji A.Ş.' },
  { code: 'REEDR', name: 'Reeder Teknoloji Sanayi ve Ticaret A.Ş.' },
  { code: 'SDTTR', name: 'SDT Uzay ve Savunma Teknolojileri A.Ş.' },
  { code: 'LOGO', name: 'Logo Yazılım Sanayi ve Ticaret A.Ş.' },
  { code: 'NETAS', name: 'Netaş Telekomünikasyon A.Ş.' },
  { code: 'PENTA', name: 'Penta Teknoloji Ürünleri Dağıtım Ticaret A.Ş.' },

  // Gayrimenkul Yatırım Ortaklıkları (GYO)
  { code: 'ISGYO', name: 'İş Gayrimenkul Yatırım Ortaklığı A.Ş.' },
  { code: 'TRGYO', name: 'Torunlar Gayrimenkul Yatırım Ortaklığı A.Ş.' },
  { code: 'KZBGY', name: 'Kızılbük Gayrimenkul Yatırım Ortaklığı A.Ş.' },
  { code: 'PSGYO', name: 'Pasifik Gayrimenkul Yatırım Ortaklığı A.Ş.' },
  { code: 'DGGYO', name: 'Doğuş Gayrimenkul Yatırım Ortaklığı A.Ş.' },
  { code: 'OZKGY', name: 'Özak Gayrimenkul Yatırım Ortaklığı A.Ş.' },
  { code: 'SNGYO', name: 'Sinpaş Gayrimenkul Yatırım Ortaklığı A.Ş.' },
  { code: 'RGYAS', name: 'Rönesans Gayrimenkul Yatırım A.Ş.' },
  { code: 'ASGYO', name: 'Asce Gayrimenkul Yatırım Ortaklığı A.Ş.' },
  { code: 'SURGY', name: 'Sur Tatil Evleri Gayrimenkul Yatırım Ortaklığı A.Ş.' },
  { code: 'SEGYO', name: 'Şeker Gayrimenkul Yatırım Ortaklığı A.Ş.' },
  { code: 'KGYO', name: 'Koray Gayrimenkul Yatırım Ortaklığı A.Ş.' },
  { code: 'HLGYO', name: 'Halk Gayrimenkul Yatırım Ortaklığı A.Ş.' },
  { code: 'KLGYO', name: 'Kiler Gayrimenkul Yatırım Ortaklığı A.Ş.' },

  // Diğer Sanayi, Üretim & Lojistik
  { code: 'KBORU', name: 'Kuzey Boru A.Ş.' },
  { code: 'MEGMT', name: 'Mega Metal Sanayi ve Ticaret A.Ş.' },
  { code: 'HATSN', name: 'Hatsan Gemi İnşaa Bakım Onarım Sanayi A.Ş.' },
  { code: 'HOROZ', name: 'Horoz Lojistik Kargo Hizmetleri A.Ş.' },
  { code: 'LILAK', name: 'Lila Kağıt Sanayi ve Ticaret A.Ş.' },
  { code: 'TARKM', name: 'Tarkim Bitki Koruma Sanayi ve Ticaret A.Ş.' },
  { code: 'BNTAS', name: 'Bantaş Bandırma Ambalaj Sanayi ve Ticaret A.Ş.' },
  { code: 'ARTMS', name: 'Artemis Halı A.Ş.' }
];

/**
 * Turkish-aware and accent-insensitive text normalization function.
 * Normalizes:
 * - 'i', 'ı', 'İ', 'I' -> 'i'
 * - 'ş', 'Ş' -> 's'
 * - 'ğ', 'Ğ' -> 'g'
 * - 'ü', 'Ü' -> 'u'
 * - 'ö', 'Ö' -> 'o'
 * - 'ç', 'Ç' -> 'c'
 * - Strips combining diacritics and special punctuation
 */
export function normalizeTurkish(text) {
  if (!text) return '';
  return text
    .toString()
    .replace(/İ/g, 'i')
    .replace(/I/g, 'i')
    .replace(/ı/g, 'i')
    .replace(/i/g, 'i')
    .replace(/Ç/g, 'c')
    .replace(/ç/g, 'c')
    .replace(/Ğ/g, 'g')
    .replace(/ğ/g, 'g')
    .replace(/Ö/g, 'o')
    .replace(/ö/g, 'o')
    .replace(/Ş/g, 's')
    .replace(/ş/g, 's')
    .replace(/Ü/g, 'u')
    .replace(/ü/g, 'u')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Filter stocks matching a query string across ticker code and company name.
 * Supports partial matching, code prefixes, and multi-word company searches.
 */
export function searchStocks(query, maxResults = 10) {
  const normQuery = normalizeTurkish(query);
  if (!normQuery) return [];

  const queryTokens = normQuery.split(' ').filter(Boolean);

  const scored = [];

  for (const stock of BIST_STOCKS) {
    const normCode = normalizeTurkish(stock.code);
    const normName = normalizeTurkish(stock.name);

    let score = -1;

    // Exact code match gets top score
    if (normCode === normQuery) {
      score = 1000;
    } else if (normCode.startsWith(normQuery)) {
      // Code prefix match (e.g. "GAR" -> "GARAN")
      score = 500 + (10 - normCode.length);
    } else if (normCode.includes(normQuery)) {
      score = 300;
    } else if (normName.startsWith(normQuery)) {
      // Name starts with query
      score = 250;
    } else if (normName.includes(normQuery)) {
      // Substring in name
      score = 150;
    } else if (queryTokens.length > 1 && queryTokens.every(token => normName.includes(token) || normCode.includes(token))) {
      // Multi-token match (e.g. "turk hava", "garanti bankasi")
      score = 100;
    }

    if (score > 0) {
      scored.push({ stock, score });
    }
  }

  // Sort descending by relevance score
  scored.sort((a, b) => b.score - a.score);

  return scored.slice(0, maxResults).map(item => item.stock);
}
