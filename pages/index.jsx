import { useState, useEffect, useRef } from 'react';
import SEOHead from '../components/seo/SEOHead';
import { WebSiteJsonLd, FAQPageJsonLd } from '../components/seo/JsonLd';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '../components/LanguageContext';
import { useRouter } from 'next/router';
import AdSlot from '../components/AdSlot';
import NewsletterSignup from '../components/NewsletterSignup';
import MovieCard from '../components/trailers/MovieCard';
import CelebrityStrip from '../components/CelebrityStrip';
import celebritiesData from '../data/celebrities.json';

function useScrollReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    el.querySelectorAll('.reveal').forEach((child) => observer.observe(child));
    return () => observer.disconnect();
  }, []);
  return ref;
}

// Horizontal scroll row with arrow buttons
function HScrollRow({ children }) {
  const scrollRef = useRef(null);
  const scroll = (dir) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === 'left' ? -360 : 360, behavior: 'smooth' });
  };
  return (
    <div className="hscroll-container">
      <button className="hscroll-btn hscroll-btn-left" onClick={() => scroll('left')} aria-label="Scroll left">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6" /></svg>
      </button>
      <div className="hscroll-track" ref={scrollRef}>
        {children}
      </div>
      <button className="hscroll-btn hscroll-btn-right" onClick={() => scroll('right')} aria-label="Scroll right">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6" /></svg>
      </button>
    </div>
  );
}

export default function Home({ featuredMovie, nowPlaying, popular, genres, celebrities }) {
  const { language } = useLanguage();
  const router = useRouter();
  const revealRef = useScrollReveal();
  const heroRef = useRef(null);
  const [heroTrailerKey, setHeroTrailerKey] = useState(featuredMovie?.trailerKey || null);

  useEffect(() => {
    if (featuredMovie?.id && !featuredMovie?.trailerKey) {
      fetch(`/api/movie/${featuredMovie.id}/trailer?language=${language}`)
        .then((r) => r.json())
        .then((data) => {
          const trailer = (data.results || []).find(
            (v) => v.site === 'YouTube' && (v.type === 'Trailer' || v.type === 'Teaser')
          );
          if (trailer?.key) setHeroTrailerKey(trailer.key);
        })
        .catch(() => {});
    }
  }, [featuredMovie?.id, featuredMovie?.trailerKey, language]);

  const tickerItems = (nowPlaying || []).slice(0, 9);
  const [topMovie, ...restMovies] = (popular || []);
  const displayGenres = (genres || []).slice(0, 6);

  return (
    <div ref={revealRef} className="homepage-full">
      <SEOHead
        title="Klick.stream — Discover Movies, Trailers & Where to Stream"
        description="Your free movie guide. Browse 50,000+ titles, watch trailers, compare 40+ streaming platforms, and find exactly what to watch tonight — updated daily."
        url="/"
      />
      <WebSiteJsonLd />
      <FAQPageJsonLd
        faqs={[
          { question: 'What is Klick.stream?', answer: 'Klick.stream is a free movie discovery platform. Browse 50,000+ titles, watch trailers, compare 40+ streaming platforms, and find exactly what to watch tonight — updated daily.' },
          { question: 'Is Klick.stream free to use?', answer: 'Yes, Klick.stream is completely free. Browse films, watch trailers, and find where to stream them without creating an account.' },
          { question: 'How many streaming platforms does Klick.stream cover?', answer: 'Klick.stream covers 40+ streaming platforms including Netflix, Prime Video, Apple TV+, Disney+, Hulu, Max, and more — updated daily.' },
          { question: 'Where can I find what to watch tonight?', answer: 'Use the Discover page to filter by genre, rating, year, runtime, and streaming platform. Find your next film in seconds.' },
        ]}
      />

      <h1 className="sr-only">Klick.stream — Discover Movies, Trailers &amp; Where to Stream</h1>

      {/* ── HERO ── */}
      <section className="hero-backdrop" ref={heroRef}>
        {featuredMovie?.backdrop_path && (
          <Image
            className="hero-backdrop-image"
            src={`https://image.tmdb.org/t/p/original${featuredMovie.backdrop_path}`}
            alt={featuredMovie.title || ''}
            fill
            priority
            sizes="100vw"
            style={{ objectFit: 'cover' }}
          />
        )}
        <div className="hero-backdrop-gradient" />

        <div className="hero-content">
          <div className="hero-eyebrow">
            <span className="hero-live-dot" />
            Trending Now
          </div>
          <h2 className="hero-title">
            <em>{featuredMovie?.title || 'Discover Cinema'}</em>
          </h2>
          <div className="hero-meta">
            {featuredMovie?.release_date && (
              <span className="hero-meta-pill">{featuredMovie.release_date.split('-')[0]}</span>
            )}
            {featuredMovie?.vote_average > 0 && (
              <span className="hero-meta-pill hero-meta-rating">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                {featuredMovie.vote_average.toFixed(1)}
              </span>
            )}
          </div>
          {featuredMovie?.overview && (
            <p className="hero-overview">{featuredMovie.overview.slice(0, 200)}{featuredMovie.overview.length > 200 ? '…' : ''}</p>
          )}
          <div className="hero-actions">
            {featuredMovie && heroTrailerKey && (
              <Link href={`/trailers?play=${featuredMovie.id}`} className="btn-hero-primary">
                <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3" /></svg>
                Watch Trailer
              </Link>
            )}
            <Link href="/discover" className="btn-hero-ghost">
              Browse All Films →
            </Link>
          </div>
        </div>

        {/* Floating poster card */}
        {featuredMovie?.poster_path && (
          <div className="hero-poster-float">
            <Image
              src={`https://image.tmdb.org/t/p/w342${featuredMovie.poster_path}`}
              alt={featuredMovie.title || ''}
              width={120}
              height={180}
              style={{ objectFit: 'cover', borderRadius: '8px', width: '100%', height: 'auto' }}
            />
          </div>
        )}
      </section>

      {/* ── TICKER ── */}
      {tickerItems.length > 0 && (
        <div className="ticker">
          <div className="ticker-label">In Theaters</div>
          <div className="ticker-track">
            {[...tickerItems, ...tickerItems].map((movie, i) => (
              <div className="ticker-item" key={`${movie.id}-${i}`}>
                <span className="dot" />
                {movie.title}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── FIFA WORLD CUP 2026 BANNER ── */}
      <Link href="/worldcup" className="worldcup-banner">
        <div className="worldcup-banner-bg" aria-hidden="true">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="wc-hex" style={{ '--i': i }} />
          ))}
        </div>
        <div className="worldcup-banner-inner">
          <div className="worldcup-banner-left">
            <span className="wc-live-badge">
              <span className="wc-live-dot" />
              Live Now
            </span>
            <div className="worldcup-banner-trophy" aria-hidden="true">⚽</div>
          </div>
          <div className="worldcup-banner-center">
            <div className="worldcup-banner-eyebrow">FIFA World Cup 2026™</div>
            <div className="worldcup-banner-title">USA · Canada · Mexico</div>
            <div className="worldcup-banner-sub">48 nations · 104 matches · June 11 – July 19, 2026</div>
          </div>
          <div className="worldcup-banner-cta">
            Full Coverage →
          </div>
        </div>
      </Link>

      {/* ── SECONDARY BANNERS ── */}
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 24px 8px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <Link href="/love-island-usa" className="loveisland-banner">
          <span className="li-banner-icon">🌴</span>
          <div className="li-banner-text">
            <div className="li-banner-title">Love Island USA — Season 8</div>
            <div className="li-banner-sub">New episodes daily on Peacock · Island drama all summer</div>
          </div>
          <span className="li-banner-badge">Now Streaming</span>
        </Link>
        <Link href="/tour-de-france" className="tdf-home-banner">
          <span className="tdf-home-icon">🚴</span>
          <div className="tdf-home-text">
            <div className="tdf-home-title">Tour de France 2026</div>
            <div className="tdf-home-sub">21 stages · Starts July 4 · NBC Sports &amp; Peacock</div>
          </div>
          <span className="tdf-home-badge">Jul 4 – 26</span>
        </Link>
      </div>

      {/* ── NOW PLAYING IN THEATERS ── */}
      {nowPlaying.length > 0 && (
        <section className="home-section">
          <div className="section-header reveal">
            <div>
              <div className="section-tag">In Cinemas</div>
              <h2 className="section-title">Now Playing <em>in Theaters</em></h2>
            </div>
            <Link href="/discover?sort=primary_release_date.desc" className="see-all">See All →</Link>
          </div>
          <div className="reveal">
            <HScrollRow>
              {nowPlaying.map((movie) => (
                <div key={movie.id} className="hscroll-card">
                  <MovieCard movie={movie} onWatchTrailer={() => router.push(`/trailers?play=${movie.id}`)} />
                </div>
              ))}
            </HScrollRow>
          </div>
        </section>
      )}

      {/* ── TRENDING RANKED ── */}
      {popular.length > 0 && (
        <section className="home-section">
          <div className="section-header reveal">
            <div>
              <div className="section-tag">Right Now</div>
              <h2 className="section-title">Trending <em>This Week</em></h2>
            </div>
            <Link href="/discover" className="see-all">View All →</Link>
          </div>

          <div className="trending-ranked reveal">
            {/* #1 — large featured card */}
            {topMovie && (
              <Link href={`/movies/${topMovie.id}`} className="trending-top-card">
                {topMovie.backdrop_path && (
                  <Image
                    src={`https://image.tmdb.org/t/p/w780${topMovie.backdrop_path}`}
                    alt={topMovie.title}
                    fill
                    sizes="(max-width:768px) 100vw, 50vw"
                    style={{ objectFit: 'cover' }}
                  />
                )}
                <div className="trending-top-overlay">
                  <div className="trending-top-rank">#1</div>
                  <div className="trending-top-info">
                    <h3>{topMovie.title}</h3>
                    <div className="trending-top-meta">
                      {topMovie.release_date && <span>{topMovie.release_date.split('-')[0]}</span>}
                      {topMovie.vote_average > 0 && (
                        <span>
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                          {topMovie.vote_average.toFixed(1)}
                        </span>
                      )}
                    </div>
                    {topMovie.overview && <p>{topMovie.overview.slice(0, 140)}…</p>}
                  </div>
                </div>
              </Link>
            )}

            {/* #2–#8 — smaller ranked grid */}
            <div className="trending-rest">
              {restMovies.slice(0, 7).map((movie, idx) => (
                <Link key={movie.id} href={`/movies/${movie.id}`} className="trending-rest-card">
                  <span className="trending-rest-rank">#{idx + 2}</span>
                  {movie.poster_path ? (
                    <Image
                      src={`https://image.tmdb.org/t/p/w154${movie.poster_path}`}
                      alt={movie.title}
                      width={48}
                      height={72}
                      style={{ objectFit: 'cover', borderRadius: '4px', flexShrink: 0 }}
                    />
                  ) : (
                    <div className="trending-rest-no-poster" />
                  )}
                  <div className="trending-rest-info">
                    <span className="trending-rest-title">{movie.title}</span>
                    <span className="trending-rest-meta">
                      {movie.release_date?.split('-')[0]}
                      {movie.vote_average > 0 && ` · ★ ${movie.vote_average.toFixed(1)}`}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── AD SLOT ── */}
      <div className="ad-container" key={router.asPath + '-ad1'}>
        <AdSlot slot="3307940521" />
      </div>

      {/* ── STATS BAR ── */}
      <div className="stats-bar reveal">
        <div className="stat-item">
          <div className="stat-num">50K+</div>
          <div className="stat-label">Films &amp; Series</div>
        </div>
        <div className="stat-item">
          <div className="stat-num">40+</div>
          <div className="stat-label">Streaming Platforms</div>
        </div>
        <div className="stat-item">
          <div className="stat-num">Daily</div>
          <div className="stat-label">Updated Picks</div>
        </div>
        <div className="stat-item">
          <div className="stat-num">Free</div>
          <div className="stat-label">Always &amp; Forever</div>
        </div>
      </div>

      {/* ── GENRE GRID ── */}
      {displayGenres.length > 0 && (
        <section className="home-section">
          <div className="section-header reveal">
            <div>
              <div className="section-tag">Explore</div>
              <h2 className="section-title">Browse by <em>Genre</em></h2>
            </div>
          </div>
          <div className="genre-grid reveal">
            {displayGenres.map((genre) => (
              <Link href={`/discover?genre=${genre.id}`} className="genre-card" key={genre.id}>
                <Image
                  src={genre.image || 'https://image.tmdb.org/t/p/w780/gPbM0MK8CP8A174rmUwGsADNYKD.jpg'}
                  alt={genre.name}
                  fill
                  sizes="(max-width:768px) 50vw, 33vw"
                  style={{ objectFit: 'cover' }}
                  loading="lazy"
                />
                <div className="genre-card-overlay" />
                <div className="genre-name">{genre.name}</div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ── CELEBRITIES ── */}
      <section className="home-section">
        <div className="section-header reveal">
          <div>
            <div className="section-tag">Stars</div>
            <h2 className="section-title">Popular <em>Celebrities</em></h2>
          </div>
          <Link href="/celebrity" className="see-all">View All →</Link>
        </div>
        <div className="reveal">
          <CelebrityStrip celebrities={celebrities} />
        </div>
      </section>

      {/* ── AD SLOT 2 ── */}
      <div className="ad-container" key={router.asPath + '-ad2'}>
        <AdSlot slot="3891486690" />
      </div>

      <div className="deco-line" />

      {/* ── NEWSLETTER ── */}
      <div className="newsletter-section reveal">
        <h2>Never Miss a <em>New Release.</em></h2>
        <p>Weekly picks, streaming drops, and critical coverage — straight to your inbox.</p>
        <NewsletterSignup variant="inline" />
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const apiKey = process.env.TMDB_API_KEY;

  let featuredMovie = null;
  let nowPlaying = [];
  let popular = [];
  let genres = [];
  let celebrities = [];

  if (apiKey) {
    try {
      const [trendingRes, nowPlayingRes, popularRes, genresRes] = await Promise.allSettled([
        fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}&language=en-US`),
        fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&region=US&page=1`),
        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&region=US&page=1`),
        fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`),
      ]);

      if (trendingRes.status === 'fulfilled') {
        const trendingData = await trendingRes.value.json();
        const trending = (trendingData.results || [])
          .filter((m) => m.original_language === 'en')
          .map((m) => ({
            id: m.id, title: m.title, poster_path: m.poster_path,
            backdrop_path: m.backdrop_path, release_date: m.release_date || '',
            vote_average: m.vote_average || 0, overview: m.overview || '',
          }));
        const withBackdrop = trending.filter((m) => m.backdrop_path && m.overview);
        featuredMovie = withBackdrop.length > 0
          ? withBackdrop[Math.floor(Math.random() * Math.min(withBackdrop.length, 5))]
          : trending[0] || null;
      }

      if (nowPlayingRes.status === 'fulfilled') {
        const npData = await nowPlayingRes.value.json();
        nowPlaying = (npData.results || [])
          .filter((m) => m.original_language === 'en')
          .slice(0, 14)
          .map((m) => ({
            id: m.id, title: m.title, poster_path: m.poster_path,
            backdrop_path: m.backdrop_path, release_date: m.release_date || '',
            vote_average: m.vote_average || 0, overview: m.overview || '',
          }));
      }

      if (popularRes.status === 'fulfilled') {
        const popData = await popularRes.value.json();
        popular = (popData.results || [])
          .filter((m) => m.original_language === 'en')
          .slice(0, 8)
          .map((m) => ({
            id: m.id, title: m.title, poster_path: m.poster_path,
            backdrop_path: m.backdrop_path, release_date: m.release_date || '',
            vote_average: m.vote_average || 0, overview: m.overview || '',
            genre_ids: m.genre_ids || [],
          }));
      }

      if (genresRes.status === 'fulfilled') {
        const genData = await genresRes.value.json();
        const rawGenres = (genData.genres || []).slice(0, 12);
        const genreImageResults = await Promise.allSettled(
          rawGenres.map((g) =>
            fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${g.id}&sort_by=popularity.desc&page=1&language=en-US&with_original_language=en`)
              .then((r) => r.json())
          )
        );
        const usedBackdrops = new Set();
        genres = rawGenres.map((g, i) => {
          let image = null;
          if (genreImageResults[i].status === 'fulfilled') {
            const movies = (genreImageResults[i].value.results || []).filter((m) => m.backdrop_path);
            const unique = movies.find((m) => !usedBackdrops.has(m.backdrop_path));
            const pick = unique || movies[0];
            if (pick) {
              usedBackdrops.add(pick.backdrop_path);
              image = `https://image.tmdb.org/t/p/w780${pick.backdrop_path}`;
            }
          }
          return { id: g.id, name: g.name, image };
        });
      }

      if (featuredMovie?.id) {
        try {
          const videosRes = await fetch(
            `https://api.themoviedb.org/3/movie/${featuredMovie.id}/videos?api_key=${apiKey}`
          );
          const videosData = await videosRes.json();
          const trailer = (videosData.results || []).find(
            (v) => v.site === 'YouTube' && (v.type === 'Trailer' || v.type === 'Teaser')
          );
          if (trailer) featuredMovie.trailerKey = trailer.key;
        } catch { /* silent */ }
      }
    } catch (err) {
      console.error('Error fetching homepage data:', err);
    }
  }

  const all = celebritiesData.celebrities || [];
  const shuffled = [...all].sort(() => Math.random() - 0.5);
  celebrities = shuffled.slice(0, 12).map((c) => ({
    slug: c.slug, name: c.name, category: c.category, wikipedia_slug: c.wikipedia_slug,
  }));

  return {
    props: { featuredMovie, nowPlaying, popular, genres, celebrities },
    revalidate: 3600,
  };
}
