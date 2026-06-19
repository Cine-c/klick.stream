/**
 * Entertainment News API — aggregates free RSS feeds, no API key needed.
 * Cached at the CDN edge for 10 minutes (stale-while-revalidate 30 min).
 * GET /api/news?limit=12
 */

const FEEDS = [
  { url: 'https://www.theguardian.com/film/rss',            source: 'The Guardian' },
  { url: 'https://www.theguardian.com/tv-and-radio/rss',    source: 'The Guardian' },
  { url: 'https://collider.com/feed/',                       source: 'Collider' },
  { url: 'https://www.slashfilm.com/feed/',                  source: '/Film' },
  { url: 'https://deadline.com/category/film/feed/',         source: 'Deadline' },
  { url: 'https://variety.com/v/film/feed/',                 source: 'Variety' },
];

function getText(xml, tag) {
  const m = xml.match(new RegExp(`<${tag}[^>]*>(?:<!\\[CDATA\\[)?([\\s\\S]*?)(?:\\]\\]>)?<\\/${tag}>`, 'i'));
  return m ? m[1].replace(/<[^>]*>/g, '').trim() : '';
}

function getLink(itemXml) {
  // Atom <link href="..."/> or RSS <link>url</link>
  const atom = itemXml.match(/<link[^>]+href="([^"]+)"/i);
  if (atom) return atom[1].trim();
  const rss = itemXml.match(/<link>([^<]+)<\/link>/i);
  return rss ? rss[1].trim() : '';
}

function parseRSS(xml, source) {
  const items = [];
  const raw = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/gi)];
  for (const match of raw.slice(0, 8)) {
    const content = match[1];
    const title = getText(content, 'title');
    const link  = getLink(content) || getText(content, 'link');
    const date  = getText(content, 'pubDate') || getText(content, 'dc:date') || '';
    const desc  = getText(content, 'description').slice(0, 160);
    if (title && link) items.push({ title, link, date, description: desc, source });
  }
  return items;
}

export default async function handler(req, res) {
  const limit = Math.min(parseInt(req.query.limit || '12', 10), 24);

  const results = await Promise.allSettled(
    FEEDS.map(({ url, source }) =>
      fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; Klickstream/1.0; +https://klick.stream)',
          'Accept': 'application/rss+xml, application/xml, text/xml, */*',
        },
        signal: AbortSignal.timeout ? AbortSignal.timeout(6000) : undefined,
      })
        .then((r) => (r.ok ? r.text() : Promise.reject(r.status)))
        .then((xml) => parseRSS(xml, source))
        .catch(() => [])
    )
  );

  const allItems = results
    .flatMap((r) => (r.status === 'fulfilled' ? r.value : []))
    .sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0))
    .slice(0, limit);

  res.setHeader('Cache-Control', 'public, s-maxage=600, stale-while-revalidate=1800');
  res.status(200).json({ articles: allItems });
}
