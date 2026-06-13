import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SEOHead from '../components/seo/SEOHead';
import MovieCard from '../components/trailers/MovieCard';
import { useRouter } from 'next/router';

const HIGHLIGHT_TOPICS = [
  { label: 'All Highlights', q: 'FIFA World Cup 2026 match highlights' },
  { label: 'Goals',          q: 'FIFA World Cup 2026 goals compilation' },
  { label: 'Best Moments',   q: 'FIFA World Cup 2026 best moments' },
  { label: 'Press Conferences', q: 'FIFA World Cup 2026 press conference' },
];

function timeAgo(iso) {
  const diff = Math.floor((Date.now() - new Date(iso)) / 1000);
  if (diff < 3600)  return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

function HighlightsSection() {
  const [videos, setVideos]       = useState([]);
  const [loading, setLoading]     = useState(true);
  const [missing, setMissing]     = useState(false);
  const [activeVideo, setActive]  = useState(null);
  const [activeTopic, setTopic]   = useState(0);
  const [error, setError]         = useState(null);

  const fetchHighlights = useCallback(async (topicIdx) => {
    setLoading(true);
    setError(null);
    try {
      const q = encodeURIComponent(HIGHLIGHT_TOPICS[topicIdx].q);
      const res = await fetch(`/api/worldcup/highlights?q=${q}&maxResults=12`);
      const data = await res.json();
      if (data.missing) { setMissing(true); return; }
      if (data.error)   { setError(data.error); return; }
      setVideos(data.items || []);
    } catch {
      setError('Could not load highlights.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchHighlights(0); }, [fetchHighlights]);

  const handleTopic = (idx) => {
    setTopic(idx);
    setVideos([]);
    fetchHighlights(idx);
  };

  if (missing) {
    return (
      <div className="wcp-highlights-missing">
        <div className="wcp-missing-icon">🎥</div>
        <h3>Add your YouTube API key to enable live highlights</h3>
        <p>
          Get a free key at{' '}
          <a href="https://console.cloud.google.com/" target="_blank" rel="noopener noreferrer">
            console.cloud.google.com
          </a>
          {' '}then add <code>YOUTUBE_API_KEY=your_key</code> to your <code>.env</code> file and rebuild.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Topic tabs */}
      <div className="wcp-highlights-tabs">
        {HIGHLIGHT_TOPICS.map((t, i) => (
          <button
            key={t.label}
            className={`wcp-highlights-tab${activeTopic === i ? ' active' : ''}`}
            onClick={() => handleTopic(i)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      {loading ? (
        <div className="wcp-highlights-grid">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="wcp-highlight-skeleton" />
          ))}
        </div>
      ) : error ? (
        <p className="wcp-highlights-error">{error}</p>
      ) : videos.length === 0 ? (
        <p className="wcp-highlights-error">No highlights found right now. Try a different topic.</p>
      ) : (
        <div className="wcp-highlights-grid">
          {videos.map((v) => (
            <button
              key={v.id}
              className="wcp-highlight-card"
              onClick={() => setActive(v.id)}
              aria-label={`Play: ${v.title}`}
            >
              <div className="wcp-highlight-thumb">
                {v.thumbnail ? (
                  <img src={v.thumbnail} alt="" loading="lazy" />
                ) : (
                  <div className="wcp-highlight-no-thumb" />
                )}
                <div className="wcp-highlight-play">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                </div>
              </div>
              <div className="wcp-highlight-info">
                <span className="wcp-highlight-title">{v.title}</span>
                <span className="wcp-highlight-meta">
                  {v.channelTitle} · {timeAgo(v.publishedAt)}
                </span>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Video modal */}
      {activeVideo && (
        <div className="wcp-modal-overlay" onClick={() => setActive(null)}>
          <div className="wcp-modal" onClick={(e) => e.stopPropagation()}>
            <button className="wcp-modal-close" onClick={() => setActive(null)} aria-label="Close video">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            <div className="wcp-modal-video">
              <iframe
                src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1&rel=0`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                frameBorder="0"
                title="World Cup highlight"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const HOST_CITIES = {
  USA: [
    'New York / New Jersey', 'Los Angeles', 'Dallas', 'San Francisco Bay Area',
    'Miami', 'Seattle', 'Boston', 'Kansas City', 'Philadelphia', 'Atlanta', 'Houston',
  ],
  Canada: ['Toronto', 'Vancouver'],
  Mexico: ['Mexico City', 'Guadalajara', 'Monterrey'],
};

const TOURNAMENT_STATS = [
  { num: '48', label: 'Nations' },
  { num: '104', label: 'Matches' },
  { num: '3', label: 'Host Countries' },
  { num: '16', label: 'Cities' },
  { num: '39', label: 'Days' },
  { num: '$625M', label: 'Prize Pool' },
];

const FOOTBALL_MOVIE_IDS = [785976, 621587, 455, 11770, 17360, 53190];

export default function WorldCupPage({ movies }) {
  const router = useRouter();

  return (
    <>
      <SEOHead
        title="FIFA World Cup 2026 Coverage | Klick.stream"
        description="Full FIFA World Cup 2026 coverage — results, host cities, match schedule, and the best football movies to watch during the tournament. USA · Canada · Mexico."
        url="/worldcup"
      />

      <div className="wcp-page">
        {/* ── HERO ── */}
        <section className="wcp-hero">
          <div className="wcp-hero-bg" aria-hidden="true">
            {[...Array(20)].map((_, i) => (
              <div key={i} className="wcp-hero-hex" style={{ '--i': i }} />
            ))}
          </div>
          <div className="wcp-hero-inner">
            <div className="wcp-hero-badges">
              <span className="wcp-live-badge">
                <span className="wcp-live-dot" />
                Live Now
              </span>
              <span className="wcp-edition-badge">2026 Edition</span>
            </div>
            <div className="wcp-hero-ball" aria-hidden="true">⚽</div>
            <h1 className="wcp-hero-title">FIFA World Cup™ 2026</h1>
            <p className="wcp-hero-subtitle">USA · Canada · Mexico — June 11 to July 19, 2026</p>
            <p className="wcp-hero-desc">
              The biggest World Cup in history. Forty-eight nations. One hundred and four matches.
              Three host countries across sixteen cities. The journey to the MetLife Stadium final begins now.
            </p>
            <div className="wcp-hero-actions">
              <a
                href="https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026"
                target="_blank"
                rel="noopener noreferrer"
                className="wcp-btn-primary"
              >
                Live Scores &amp; Schedule ↗
              </a>
              <Link href="/discover?genre=99" className="wcp-btn-ghost">
                Sports Documentaries →
              </Link>
            </div>
          </div>
        </section>

        {/* ── OPENING MATCH ── */}
        <div className="wcp-opening-match">
          <div className="wcp-opening-inner">
            <div className="wcp-opening-label">
              <span className="wcp-opening-dot" />
              Opening Match · June 11 · Estadio Azteca, Mexico City
            </div>
            <div className="wcp-opening-score">
              <div className="wcp-opening-team">
                <span className="wcp-opening-flag">🇲🇽</span>
                <span className="wcp-opening-name">Mexico</span>
                <span className="wcp-opening-goals">2</span>
              </div>
              <span className="wcp-opening-vs">–</span>
              <div className="wcp-opening-team wcp-opening-team-right">
                <span className="wcp-opening-goals">0</span>
                <span className="wcp-opening-name">South Africa</span>
                <span className="wcp-opening-flag">🇿🇦</span>
              </div>
            </div>
            <p className="wcp-opening-note">
              Three red cards issued — the most in a single World Cup opening match in history.
            </p>
          </div>
        </div>

        {/* ── HIGHLIGHTS ── */}
        <section className="wcp-section wcp-highlights-section">
          <div className="wcp-section-inner">
            <div className="wcp-section-eyebrow">Live from the Tournament</div>
            <h2 className="wcp-section-title">Match Highlights</h2>
            <p className="wcp-section-sub">
              Latest videos from the 2026 World Cup — goals, moments, and post-match reaction.
            </p>
            <HighlightsSection />
          </div>
        </section>

        {/* ── STATS BAR ── */}
        <div className="wcp-stats">
          {TOURNAMENT_STATS.map((s) => (
            <div key={s.label} className="wcp-stat">
              <div className="wcp-stat-num">{s.num}</div>
              <div className="wcp-stat-label">{s.label}</div>
            </div>
          ))}
        </div>

        {/* ── FORMAT EXPLAINER ── */}
        <section className="wcp-section wcp-format">
          <div className="wcp-section-inner">
            <div className="wcp-format-text">
              <div className="wcp-section-eyebrow">Tournament Format</div>
              <h2 className="wcp-section-title">Forty-eight teams. One champion.</h2>
              <p>
                For the first time in World Cup history, 48 national teams compete across 12 groups of four.
                The top two from each group, plus the eight best third-placed teams, advance to a Round of 32 — a new knockout stage created specifically for this expanded format.
              </p>
              <p>
                From the Round of 32, it's straight single-elimination football all the way to the final at MetLife Stadium, East Rutherford, New Jersey, on <strong>July 19, 2026</strong>.
              </p>
              <div className="wcp-format-stages">
                <div className="wcp-stage">
                  <div className="wcp-stage-num">12</div>
                  <div className="wcp-stage-name">Groups</div>
                </div>
                <div className="wcp-stage-arrow">→</div>
                <div className="wcp-stage">
                  <div className="wcp-stage-num">R32</div>
                  <div className="wcp-stage-name">Round of 32</div>
                </div>
                <div className="wcp-stage-arrow">→</div>
                <div className="wcp-stage">
                  <div className="wcp-stage-num">R16</div>
                  <div className="wcp-stage-name">Round of 16</div>
                </div>
                <div className="wcp-stage-arrow">→</div>
                <div className="wcp-stage">
                  <div className="wcp-stage-num">QF</div>
                  <div className="wcp-stage-name">Quarters</div>
                </div>
                <div className="wcp-stage-arrow">→</div>
                <div className="wcp-stage">
                  <div className="wcp-stage-num">SF</div>
                  <div className="wcp-stage-name">Semis</div>
                </div>
                <div className="wcp-stage-arrow">→</div>
                <div className="wcp-stage wcp-stage-final">
                  <div className="wcp-stage-num">🏆</div>
                  <div className="wcp-stage-name">Final</div>
                </div>
              </div>
            </div>
            <div className="wcp-format-card">
              <div className="wcp-format-card-title">Final Venue</div>
              <div className="wcp-format-venue-name">MetLife Stadium</div>
              <div className="wcp-format-venue-location">East Rutherford, New Jersey</div>
              <div className="wcp-format-date">July 19, 2026</div>
              <div className="wcp-format-capacity">Capacity: 82,500</div>
            </div>
          </div>
        </section>

        {/* ── HOST CITIES ── */}
        <section className="wcp-section wcp-cities">
          <div className="wcp-section-inner">
            <div className="wcp-section-eyebrow">Hosting Venues</div>
            <h2 className="wcp-section-title">16 cities across 3 nations</h2>
            <div className="wcp-cities-grid">
              {Object.entries(HOST_CITIES).map(([country, cities]) => (
                <div key={country} className="wcp-cities-country">
                  <div className="wcp-cities-country-header">
                    <span className="wcp-cities-flag">
                      {country === 'USA' ? '🇺🇸' : country === 'Canada' ? '🇨🇦' : '🇲🇽'}
                    </span>
                    <div>
                      <div className="wcp-cities-country-name">{country}</div>
                      <div className="wcp-cities-count">{cities.length} {cities.length === 1 ? 'city' : 'cities'}</div>
                    </div>
                  </div>
                  <ul className="wcp-cities-list">
                    {cities.map((city) => (
                      <li key={city} className="wcp-city-item">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        {city}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FOOTBALL MOVIES ── */}
        {movies && movies.length > 0 && (
          <section className="wcp-section">
            <div className="wcp-section-inner">
              <div className="wcp-section-eyebrow">Stream During the Tournament</div>
              <h2 className="wcp-section-title">The Beautiful Game — on screen</h2>
              <p className="wcp-section-sub">
                The best football films and documentaries to watch between matches.
              </p>
              <div className="wcp-movies-grid">
                {movies.map((movie) => (
                  <MovieCard
                    key={movie.id}
                    movie={movie}
                    onWatchTrailer={() => router.push(`/trailers?play=${movie.id}`)}
                  />
                ))}
              </div>
              <div className="wcp-movies-more">
                <Link href="/discover?genre=99&sort=vote_average.desc" className="wcp-btn-ghost">
                  Browse all Sports Documentaries →
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* ── CTA ── */}
        <div className="wcp-cta-bar">
          <div className="wcp-cta-inner">
            <div>
              <div className="wcp-cta-title">Follow every match</div>
              <div className="wcp-cta-sub">Live scores, results, and standings on FIFA.com</div>
            </div>
            <a
              href="https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026"
              target="_blank"
              rel="noopener noreferrer"
              className="wcp-btn-primary"
            >
              Go to FIFA.com ↗
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const apiKey = process.env.TMDB_API_KEY;
  let movies = [];

  if (apiKey) {
    try {
      const results = await Promise.allSettled(
        FOOTBALL_MOVIE_IDS.map((id) =>
          fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`)
            .then((r) => r.json())
        )
      );
      movies = results
        .filter((r) => r.status === 'fulfilled' && !r.value.status_code)
        .map((r) => {
          const m = r.value;
          return {
            id: m.id,
            title: m.title,
            poster_path: m.poster_path || null,
            backdrop_path: m.backdrop_path || null,
            release_date: m.release_date || '',
            vote_average: m.vote_average || 0,
            overview: m.overview || '',
          };
        });
    } catch { /* silent */ }
  }

  return {
    props: { movies },
    revalidate: 86400,
  };
}
