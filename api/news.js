function decodeXml(value = '') {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([\da-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/<[^>]*>/g, '').trim();
}

function tag(item, name) {
  const found = item.match(new RegExp(`<${name}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${name}>`, 'i'));
  return found ? decodeXml(found[1]) : '';
}

export default async function handler(request, response) {
  response.setHeader('Cache-Control', 's-maxage=180, stale-while-revalidate=600');
  if (request.method !== 'GET') return response.status(405).json({ error: 'Yalnızca GET desteklenir.' });
  const rawSymbol = String(request.query.symbol || '').toUpperCase();
  if (rawSymbol && !/^[A-Z0-9]{1,8}$/.test(rawSymbol)) return response.status(400).json({ error: 'Geçersiz hisse kodu.' });
  const query = rawSymbol ? `${rawSymbol} BIST OR Borsa İstanbul` : 'Borsa İstanbul OR BIST piyasa';
  const url = new URL('https://news.google.com/rss/search');
  url.searchParams.set('q', query);
  url.searchParams.set('hl', 'tr');
  url.searchParams.set('gl', 'TR');
  url.searchParams.set('ceid', 'TR:tr');
  try {
    const feed = await fetch(url, { headers: { accept: 'application/rss+xml, application/xml' }, signal: AbortSignal.timeout(9000) });
    if (!feed.ok) throw new Error(`Haber kaynağı ${feed.status} döndürdü.`);
    const xml = (await feed.text()).slice(0, 1_000_000);
    const items = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/gi)].map(([, item]) => {
      const dateText = tag(item, 'pubDate');
      const date = new Date(dateText);
      return {
        title: tag(item, 'title'),
        description: tag(item, 'description').slice(0, 500),
        url: tag(item, 'link'),
        source: tag(item, 'source') || 'Google News',
        publishedAt: Number.isNaN(date.getTime()) ? null : date.toISOString()
      };
    }).filter(item => item.title && /^https:\/\//.test(item.url))
      .sort((a, b) => (Date.parse(b.publishedAt || '') || 0) - (Date.parse(a.publishedAt || '') || 0));
    const seenTitles = new Set();
    const uniqueItems = items.filter(item => {
      const normalizedTitle = item.title.normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('tr-TR').replace(/[^a-z0-9]/g, '');
      if (!normalizedTitle || seenTitles.has(normalizedTitle)) return false;
      seenTitles.add(normalizedTitle);
      return true;
    }).slice(0, 15);
    return response.status(200).json({ items: uniqueItems, source: 'Google News RSS', updatedAt: new Date().toISOString() });
  } catch (error) {
    return response.status(502).json({ error: error.message || 'Haber akışı şu anda alınamıyor.' });
  }
}
