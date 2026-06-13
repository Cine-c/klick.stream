const SEARCH_QUERIES = [
  'FIFA World Cup 2026 match highlights',
  'World Cup 2026 goals highlights official',
  'FIFA World Cup 2026 highlights today',
];

export default async function handler(req, res) {
  const apiKey = process.env.YOUTUBE_API_KEY;

  if (!apiKey) {
    return res.status(200).json({ items: [], missing: true });
  }

  const { q, maxResults = '12' } = req.query;
  const query = q || SEARCH_QUERIES[0];

  try {
    const params = new URLSearchParams({
      part: 'snippet',
      type: 'video',
      order: 'date',
      q: query,
      maxResults,
      key: apiKey,
      relevanceLanguage: 'en',
      videoDuration: 'short',
    });

    const response = await fetch(`https://www.googleapis.com/youtube/v3/search?${params}`);
    const data = await response.json();

    if (data.error) {
      return res.status(500).json({ items: [], error: data.error.message });
    }

    const items = (data.items || [])
      .filter((item) => item.id?.videoId)
      .map((item) => ({
        id: item.id.videoId,
        title: item.snippet.title,
        channelTitle: item.snippet.channelTitle,
        publishedAt: item.snippet.publishedAt,
        thumbnail:
          item.snippet.thumbnails?.maxres?.url ||
          item.snippet.thumbnails?.high?.url ||
          item.snippet.thumbnails?.medium?.url ||
          null,
      }));

    res.setHeader('Cache-Control', 'public, max-age=900, stale-while-revalidate=3600');
    return res.status(200).json({ items });
  } catch {
    return res.status(500).json({ items: [], error: 'Failed to fetch highlights' });
  }
}
