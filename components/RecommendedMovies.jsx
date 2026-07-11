import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';

export default function RecommendedMovies({ movieId, mediaType = 'movie' }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    if (!movieId) return;

    const fetchRecommendations = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/${mediaType}/${movieId}/similar`);
        const data = await res.json();
        const withYear = (data.results || [])
          .filter((m) => m.poster_path)
          .slice(0, 12)
          .map((m) => ({
            ...m,
            media_type: mediaType,
            releaseYear: m.release_date
              ? m.release_date.split('-')[0]
              : m.first_air_date
                ? m.first_air_date.split('-')[0]
                : '',
          }));
        setMovies(withYear);
      } catch {
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [movieId, mediaType]);

  if (loading || movies.length === 0) return null;

  const scroll = (dir) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === 'left' ? -360 : 360, behavior: 'smooth' });
  };

  return (
    <section className="recommended-section">
      <h2>More Like This</h2>
      <div className="hscroll-container">
        <button className="hscroll-btn hscroll-btn-left" onClick={() => scroll('left')} aria-label="Scroll left">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <div className="hscroll-track" ref={scrollRef}>
          {movies.map((movie) => (
            <button
              key={movie.id}
              className="recommended-card"
              onClick={() => router.push(`/${mediaType === 'tv' ? 'tv' : 'movies'}/${movie.id}`)}
            >
              {movie.poster_path && (
                <img
                  src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
                  alt={movie.title || movie.name}
                  loading="lazy"
                />
              )}
              <div className="recommended-info">
                <h3>{movie.title || movie.name}</h3>
                {movie.releaseYear && <span className="year">{movie.releaseYear}</span>}
              </div>
            </button>
          ))}
        </div>
        <button className="hscroll-btn hscroll-btn-right" onClick={() => scroll('right')} aria-label="Scroll right">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>
    </section>
  );
}
