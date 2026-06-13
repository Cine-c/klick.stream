import Image from 'next/image';
import Link from 'next/link';
import SEOHead from '../components/seo/SEOHead';
import AdSlot from '../components/AdSlot';

const TMDB_IMAGE = 'https://image.tmdb.org/t/p/';

const STREAMERS = [
  { id: 8,   name: 'Netflix',     color: '#e50914' },
  { id: 9,   name: 'Amazon',      color: '#00a8e1' },
  { id: 337, name: 'Disney+',     color: '#113ccf' },
  { id: 1899,name: 'Max',         color: '#002be7' },
  { id: 386, name: 'Peacock',     color: '#000000' },
  { id: 15,  name: 'Hulu',        color: '#1ce783' },
  { id: 531, name: 'Paramount+',  color: '#0064ff' },
];

const TV_GENRES = [
  { id: 18,   label: 'Drama' },
  { id: 35,   label: 'Comedy' },
  { id: 80,   label: 'Crime' },
  { id: 10765,label: 'Sci-Fi' },
  { id: 10759,label: 'Action' },
  { id: 9648, label: 'Mystery' },
  { id: 10764,label: 'Reality' },
  { id: 99,   label: 'Documentary' },
];

function ShowCard({ show, rank }) {
  const poster = show.poster_path
    ? `${TMDB_IMAGE}w342${show.poster_path}`
    : null;

  return (
    <Link
      href={`/discover?type=tv&search=${encodeURIComponent(show.name || show.original_name || '')}`}
      className="tv-show-card"
    >
      <div className="tv-show-poster">
        {poster ? (
          <Image
            src={poster}
            alt={show.name || ''}
            width={180}
            height={270}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
          />
        ) : (
          <div className="tv-show-no-poster">{(show.name || '?')[0]}</div>
        )}
        {rank && <span className="tv-show-rank">#{rank}</span>}
        {show.vote_average > 0 && (
          <span className="tv-show-rating">★ {show.vote_average.toFixed(1)}</span>
        )}
      </div>
      <div className="tv-show-info">
        <div className="tv-show-name">{show.name || show.original_name}</div>
        {show.first_air_date && (
          <div className="tv-show-year">{show.first_air_date.slice(0, 4)}</div>
        )}
      </div>
    </Link>
  );
}

function ShowRow({ show }) {
  const poster = show.poster_path ? `${TMDB_IMAGE}w185${show.poster_path}` : null;
  const backdrop = show.backdrop_path ? `${TMDB_IMAGE}w300${show.backdrop_path}` : null;

  return (
    <Link
      href={`/discover?type=tv&search=${encodeURIComponent(show.name || '')}`}
      className="tv-airing-row"
    >
      <div className="tv-airing-thumb">
        {backdrop || poster ? (
          <Image
            src={backdrop || poster}
            alt={show.name || ''}
            width={160}
            height={90}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
          />
        ) : (
          <div className="tv-airing-no-thumb" />
        )}
      </div>
      <div className="tv-airing-info">
        <div className="tv-airing-name">{show.name || show.original_name}</div>
        {show.overview && (
          <div className="tv-airing-overview">{show.overview.slice(0, 100)}…</div>
        )}
      </div>
      {show.vote_average > 0 && (
        <div className="tv-airing-rating">★ {show.vote_average.toFixed(1)}</div>
      )}
    </Link>
  );
}

export default function TVHub({ trending, airingToday, popularDrama, popularReality }) {
  return (
    <>
      <SEOHead
        title="TV Shows — What to Watch Now | Klick.stream"
        description="Discover the best TV shows streaming right now. Trending series, what's airing today, top dramas, reality TV, and more — all in one place."
        url="/tv"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'TV Shows Hub — Klick.stream',
            description: 'Discover trending and currently airing TV shows across all streaming platforms.',
            url: 'https://klick.stream/tv',
          }),
        }}
      />

      <div className="tv-page">

        {/* ── HERO ── */}
        <section className="tv-hero">
          <div className="tv-hero-inner">
            <div className="tv-hero-eyebrow">Updated Daily</div>
            <h1 className="tv-hero-title">What to Watch on TV</h1>
            <p className="tv-hero-desc">
              Trending series, tonight's new episodes, and every streaming platform — all in one place.
            </p>
            <div className="tv-hero-genres">
              {TV_GENRES.map((g) => (
                <Link
                  key={g.id}
                  href={`/discover?type=tv&genre=${g.id}`}
                  className="tv-genre-pill"
                >
                  {g.label}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── FEATURED SHOWS (Love Island, etc.) ── */}
        <div className="tv-featured-strip">
          <Link href="/love-island-usa" className="tv-featured-card tv-featured-li">
            <span className="tv-featured-icon">🌴</span>
            <div>
              <div className="tv-featured-name">Love Island USA S8</div>
              <div className="tv-featured-sub">Peacock · Now Streaming</div>
            </div>
            <span className="tv-featured-badge">New Episodes Daily</span>
          </Link>
        </div>

        {/* ── TRENDING THIS WEEK ── */}
        {trending.length > 0 && (
          <section className="tv-section">
            <div className="tv-section-inner">
              <div className="tv-section-header">
                <div>
                  <div className="tv-section-eyebrow">Trending</div>
                  <h2 className="tv-section-title">This Week's Biggest Shows</h2>
                </div>
                <Link href="/discover?type=tv&sort=popularity.desc" className="tv-see-all">See All →</Link>
              </div>
              <div className="tv-shows-grid">
                {trending.slice(0, 12).map((show, i) => (
                  <ShowCard key={show.id} show={show} rank={i + 1} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── AD ── */}
        <div className="ad-container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px' }}>
          <AdSlot slot="3307940521" />
        </div>

        {/* ── AIRING TODAY ── */}
        {airingToday.length > 0 && (
          <section className="tv-section tv-section-dark">
            <div className="tv-section-inner">
              <div className="tv-section-header">
                <div>
                  <div className="tv-section-eyebrow">New Episodes</div>
                  <h2 className="tv-section-title">Airing Today</h2>
                </div>
              </div>
              <div className="tv-airing-list">
                {airingToday.slice(0, 8).map((show) => (
                  <ShowRow key={show.id} show={show} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── STREAMERS ── */}
        <section className="tv-section">
          <div className="tv-section-inner">
            <div className="tv-section-eyebrow">Browse by Platform</div>
            <h2 className="tv-section-title">Every Streaming Service</h2>
            <div className="tv-streamers-grid">
              {STREAMERS.map((s) => (
                <Link
                  key={s.id}
                  href={`/discover?type=tv&provider=${s.id}`}
                  className="tv-streamer-card"
                  style={{ '--streamer-color': s.color }}
                >
                  <div className="tv-streamer-name">{s.name}</div>
                  <div className="tv-streamer-arrow">→</div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── AD ── */}
        <div className="ad-container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px' }}>
          <AdSlot slot="3891486690" />
        </div>

        {/* ── TOP DRAMAS ── */}
        {popularDrama.length > 0 && (
          <section className="tv-section tv-section-dark">
            <div className="tv-section-inner">
              <div className="tv-section-header">
                <div>
                  <div className="tv-section-eyebrow">Must-Watch</div>
                  <h2 className="tv-section-title">Top Dramas Right Now</h2>
                </div>
                <Link href="/discover?type=tv&genre=18" className="tv-see-all">All Dramas →</Link>
              </div>
              <div className="tv-shows-grid">
                {popularDrama.slice(0, 8).map((show) => (
                  <ShowCard key={show.id} show={show} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── REALITY TV ── */}
        {popularReality.length > 0 && (
          <section className="tv-section">
            <div className="tv-section-inner">
              <div className="tv-section-header">
                <div>
                  <div className="tv-section-eyebrow">Unscripted</div>
                  <h2 className="tv-section-title">Reality TV</h2>
                </div>
                <Link href="/discover?type=tv&genre=10764" className="tv-see-all">All Reality →</Link>
              </div>
              <div className="tv-shows-grid">
                {popularReality.slice(0, 8).map((show) => (
                  <ShowCard key={show.id} show={show} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── BROWSE ALL ── */}
        <div className="tv-browse-cta">
          <div className="tv-browse-inner">
            <div>
              <div className="tv-browse-title">Find your next obsession</div>
              <div className="tv-browse-sub">Filter by genre, streamer, rating, and more</div>
            </div>
            <Link href="/discover?type=tv" className="tv-browse-btn">
              Browse All TV Shows →
            </Link>
          </div>
        </div>

      </div>
    </>
  );
}

export async function getStaticProps() {
  const apiKey = process.env.TMDB_API_KEY;
  let trending = [], airingToday = [], popularDrama = [], popularReality = [];

  if (!apiKey) {
    return { props: { trending, airingToday, popularDrama, popularReality }, revalidate: 3600 };
  }

  try {
    const [trendRes, airRes, dramaRes, realityRes] = await Promise.all([
      fetch(`https://api.themoviedb.org/3/trending/tv/week?api_key=${apiKey}&language=en-US`),
      fetch(`https://api.themoviedb.org/3/tv/airing_today?api_key=${apiKey}&language=en-US&region=US`),
      fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&language=en-US&with_genres=18&sort_by=popularity.desc&vote_count.gte=100`),
      fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&language=en-US&with_genres=10764&sort_by=popularity.desc`),
    ]);

    const [trendData, airData, dramaData, realityData] = await Promise.all([
      trendRes.json(), airRes.json(), dramaRes.json(), realityRes.json(),
    ]);

    const clean = (show) => ({
      id: show.id,
      name: show.name || show.original_name || '',
      overview: show.overview || '',
      poster_path: show.poster_path || null,
      backdrop_path: show.backdrop_path || null,
      first_air_date: show.first_air_date || null,
      vote_average: show.vote_average || 0,
    });

    trending       = (trendData.results   || []).map(clean);
    airingToday    = (airData.results     || []).filter(s => s.original_language === 'en').map(clean);
    popularDrama   = (dramaData.results   || []).map(clean);
    popularReality = (realityData.results || []).map(clean);
  } catch (err) {
    console.error('TV hub SSG error:', err);
  }

  return {
    props: { trending, airingToday, popularDrama, popularReality },
    revalidate: 3600,
  };
}
