export default async function handler(req, res) {
  const {
    page = 1,
    genre,
    year,
    yearFrom,
    yearTo,
    sort = 'popularity.desc',
    provider,
    region = 'US',
    rating,
    runtimeMin,
    runtimeMax,
    search,
    language = 'en-US',
  } = req.query;
  const apiKey = process.env.TMDB_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'Missing TMDB API key' });
  }

  try {
    let url;

    if (search) {
      url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&page=${page}&query=${encodeURIComponent(search)}&language=${language}`;
    } else {
      url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&page=${page}&sort_by=${sort}&language=${language}`;

      if (genre) url += `&with_genres=${genre}`;

      // Year: exact year takes precedence, then range
      if (year) {
        url += `&primary_release_year=${year}`;
      } else {
        if (yearFrom) url += `&primary_release_date.gte=${yearFrom}-01-01`;
        if (yearTo) url += `&primary_release_date.lte=${yearTo}-12-31`;
      }

      if (provider) {
        const providerIds = provider.replace(/,/g, '|');
        url += `&with_watch_providers=${providerIds}&watch_region=${region}`;
      }

      if (rating) url += `&vote_average.gte=${rating}`;
      if (runtimeMin) url += `&with_runtime.gte=${runtimeMin}`;
      if (runtimeMax) url += `&with_runtime.lte=${runtimeMax}`;
    }

    const response = await fetch(url);
    if (!response.ok) {
      return res.status(response.status).json({ error: `TMDB API error: ${response.status}` });
    }
    const data = await response.json();
    res.status(200).json(data);
  } catch {
    res.status(500).json({ error: 'Failed to discover movies' });
  }
}
