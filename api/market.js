const SYMBOLS = {
  BIST100: 'XU100.IS',
  BIST30: 'XU030.IS',
  USDTRY: 'USDTRY=X'
};

const INTERVALS = {
  '1d': { range: '1d', interval: '5m' },
  '5d': { range: '5d', interval: '30m' },
  '1mo': { range: '1mo', interval: '1d' }
};

async function getYahooChart(symbol, timeframe) {
  const yahooSymbol = SYMBOLS[symbol] || (symbol.endsWith('.IS') ? symbol : `${symbol}.IS`);
  if (!/^[A-Z0-9^=.-]{1,24}$/.test(yahooSymbol)) throw new Error('Geçersiz sembol.');
  const interval = INTERVALS[timeframe] || INTERVALS['1d'];
  const url = new URL(`https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(yahooSymbol)}`);
  url.searchParams.set('range', interval.range);
  url.searchParams.set('interval', interval.interval);
  url.searchParams.set('events', 'div,splits');
  const response = await fetch(url, {
    headers: { accept: 'application/json', 'user-agent': 'Mozilla/5.0 BISTAnalizAI/1.0' },
    signal: AbortSignal.timeout(9000)
  });
  if (!response.ok) throw new Error(`Piyasa verisi sağlayıcısı ${response.status} döndürdü.`);
  const payload = await response.json();
  if (payload.chart?.error) throw new Error(payload.chart.error.description || 'Piyasa verisi alınamadı.');
  const result = payload.chart?.result?.[0];
  if (!result) throw new Error('Bu sembol için veri bulunamadı.');

  const quote = result.indicators?.quote?.[0] || {};
  const timestamps = result.timestamp || [];
  const candles = timestamps.map((timestamp, index) => ({
    timestamp: timestamp * 1000,
    open: quote.open?.[index],
    high: quote.high?.[index],
    low: quote.low?.[index],
    close: quote.close?.[index],
    volume: quote.volume?.[index] || 0
  })).filter(c => [c.open, c.high, c.low, c.close].every(Number.isFinite));

  const meta = result.meta || {};
  const price = Number.isFinite(meta.regularMarketPrice) ? meta.regularMarketPrice : candles.at(-1)?.close;
  const previousClose = meta.chartPreviousClose ?? meta.previousClose ?? null;
  if (!Number.isFinite(price) || !candles.length) throw new Error('Sağlayıcı kullanılabilir fiyat serisi döndürmedi.');
  return {
    symbol,
    name: meta.longName || meta.shortName || symbol,
    price,
    previousClose,
    changePercent: Number.isFinite(meta.regularMarketChangePercent)
      ? meta.regularMarketChangePercent
      : (Number.isFinite(previousClose) && previousClose ? ((price - previousClose) / previousClose) * 100 : null),
    dayHigh: meta.regularMarketDayHigh ?? Math.max(...candles.map(c => c.high)),
    dayLow: meta.regularMarketDayLow ?? Math.min(...candles.map(c => c.low)),
    volume: meta.regularMarketVolume ?? candles.at(-1)?.volume ?? 0,
    currency: meta.currency || 'TRY',
    asOf: (meta.regularMarketTime ? meta.regularMarketTime * 1000 : candles.at(-1).timestamp),
    candles
  };
}

export default async function handler(request, response) {
  response.setHeader('Cache-Control', 's-maxage=45, stale-while-revalidate=120');
  if (request.method !== 'GET') return response.status(405).json({ error: 'Yalnızca GET desteklenir.' });
  const { symbol, symbols, timeframe = '1d' } = request.query;
  try {
    if (symbols) {
      const list = String(symbols).split(',').slice(0, 3);
      const quotes = await Promise.all(list.map(async key => {
        try {
          const data = await getYahooChart(key, '1d');
          return { symbol: key, price: data.price, previousClose: data.previousClose, changePercent: data.changePercent, currency: data.currency, asOf: data.asOf };
        } catch (error) { return { symbol: key, error: error.message }; }
      }));
      return response.status(200).json({ quotes, source: 'Yahoo Finance', delayed: true });
    }
    if (!symbol || !/^[A-Z0-9.-]{1,12}$/.test(String(symbol))) return response.status(400).json({ error: 'Geçerli bir hisse kodu gerekli.' });
    const data = await getYahooChart(String(symbol).toUpperCase(), String(timeframe));
    return response.status(200).json({ ...data, source: 'Yahoo Finance', delayed: true });
  } catch (error) {
    return response.status(502).json({ error: error.message || 'Piyasa verisi alınamadı.' });
  }
}
