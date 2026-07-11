export default async function handler(req, res) {
  const { id, language = 'en-US' } = req.query;
  const apiKey = process.env.TMDB_API_KEY;

  if (!id) {
    return res.status(400).json({ error: 'Missing TV series ID' });
  }

  if (!apiKey) {
    return res.status(500).json({ error: 'Missing TMDB API key' });
  }

  const url = `https://api.themoviedb.org/3/tv/${id}/recommendations?api_key=${apiKey}&language=${language}&page=1`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      return res.status(response.status).json({ error: `TMDB API error: ${response.status}` });
    }
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch recommendations' });
  }
}
