export default async function handler(req, res) {
  const { q, language = 'en-US' } = req.query;
  const apiKey = process.env.TMDB_API_KEY;

  if (!apiKey) return res.status(500).json({ results: [] });
  if (!q || q.trim().length < 2) return res.status(200).json({ results: [] });

  try {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(q)}&language=${language}&page=1&include_adult=false`;
    const response = await fetch(url);
    if (!response.ok) return res.status(200).json({ results: [] });

    const data = await response.json();
    const results = (data.results || []).slice(0, 7).map((m) => ({
      id: m.id,
      title: m.title,
      poster_path: m.poster_path,
      release_date: m.release_date || '',
      vote_average: m.vote_average || 0,
    }));

    res.setHeader('Cache-Control', 'public, max-age=60, stale-while-revalidate=300');
    return res.status(200).json({ results });
  } catch {
    return res.status(200).json({ results: [] });
  }
}
