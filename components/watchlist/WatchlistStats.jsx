import { useEffect, useState } from 'react';

const GENRE_NAMES = {
  28: 'Action',
  12: 'Adventure',
  16: 'Animation',
  35: 'Comedy',
  80: 'Crime',
  18: 'Drama',
  27: 'Horror',
  10402: 'Music',
  9648: 'Mystery',
  10749: 'Romance',
  878: 'Sci-Fi',
  10770: 'TV Movie',
  53: 'Thriller',
  10752: 'War',
  37: 'Western',
};

export default function WatchlistStats({ items }) {
  const [platformCounts, setPlatformCounts] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (items.length === 0) {
      setPlatformCounts({});
      return;
    }

    const fetchPlatforms = async () => {
      setLoading(true);
      const counts = {};

      // Batch fetch providers for all items in parallel
      const results = await Promise.allSettled(
        items.map((item) =>
          fetch(`/api/movies/providers?movieId=${item.id}`)
            .then((r) => r.json())
            .then((d) => ({ movieId: item.id, providers: d.providers || [] }))
            .catch(() => ({ movieId: item.id, providers: [] }))
        )
      );

      results.forEach((result) => {
        if (result.status === 'fulfilled' && result.value) {
          result.value.providers.forEach((name) => {
            counts[name] = (counts[name] || 0) + 1;
          });
        }
      });

      setPlatformCounts(counts);
      setLoading(false);
    };

    fetchPlatforms();
  }, [items]);

  const genreCounts = {};
  items.forEach((item) => {
    (item.genre_ids || []).forEach((id) => {
      genreCounts[id] = (genreCounts[id] || 0) + 1;
    });
  });

  const avgRating =
    items.length > 0
      ? (items.reduce((sum, item) => sum + (item.vote_average || 0), 0) / items.length).toFixed(1)
      : 0;

  const topGenres = Object.entries(genreCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3)
    .map(([id]) => GENRE_NAMES[parseInt(id)] || `Genre ${id}`)
    .join(', ');

  const topPlatforms = Object.entries(platformCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3)
    .map(([name]) => name)
    .join(', ');

  return (
    <div className="watchlist-stats">
      <div className="stat-card">
        <div className="stat-label">Items</div>
        <div className="stat-value">{items.length}</div>
      </div>

      <div className="stat-card">
        <div className="stat-label">Avg Rating</div>
        <div className="stat-value">{avgRating}★</div>
      </div>

      {topGenres && (
        <div className="stat-card">
          <div className="stat-label">Top Genres</div>
          <div className="stat-value stat-value-small">{topGenres}</div>
        </div>
      )}

      {!loading && topPlatforms && (
        <div className="stat-card">
          <div className="stat-label">Top Platforms</div>
          <div className="stat-value stat-value-small">{topPlatforms}</div>
        </div>
      )}

      {loading && (
        <div className="stat-card stat-loading">
          <div className="stat-label">Platforms</div>
          <div className="stat-value">Loading...</div>
        </div>
      )}
    </div>
  );
}
