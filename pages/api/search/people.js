export default async function handler(req, res) {
  const { query, page = 1 } = req.query;
  const apiKey = process.env.TMDB_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'Missing TMDB API key' });
  }

  if (!query || query.trim().length < 2) {
    return res.status(400).json({ error: 'Query must be at least 2 characters' });
  }

  const url = `https://api.themoviedb.org/3/search/person?api_key=${apiKey}&query=${encodeURIComponent(query)}&page=${page}&language=en-US`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      return res.status(response.status).json({ error: `TMDB API error: ${response.status}` });
    }
    const data = await response.json();
    const people = (data.results || []).filter((p) => p.known_for_department === 'Acting' || p.known_for_department === 'Directing');
    res.status(200).json({ results: people.slice(0, 10) });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch people' });
  }
}
