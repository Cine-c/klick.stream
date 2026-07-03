import Image from 'next/image';
import Link from 'next/link';
import SEOHead from '../../components/seo/SEOHead';
import { TVSeriesJsonLd, VideoObjectJsonLd, FAQPageJsonLd, BreadcrumbJsonLd } from '../../components/seo/JsonLd';
import TrailerModal from '../../components/trailers/TrailerModal';
import WatchProviders from '../../components/WatchProviders';
import { useWatchLater } from '../../components/WatchLaterContext';
import { useState } from 'react';
import AdSlot from '../../components/AdSlot';
import celebritiesData from '../../data/celebrities.json';
import { generateTVEditorial } from '../../lib/tvEditorial';

export default function TVDetailPage({ show, credits, videos, ratings, watchProviders, similar, celebSlugs }) {
  const [showTrailer, setShowTrailer] = useState(false);
  const { toggle, has } = useWatchLater();
  const saved = has(show?.id);

  if (!show) {
    return (
      <div className="movie-detail-page">
        <div className="empty-state">
          <h1>Show Not Found</h1>
          <Link href="/tv" className="btn btn-primary">Browse TV Shows</Link>
        </div>
      </div>
    );
  }

  const backdropUrl = show.backdrop_path
    ? `https://image.tmdb.org/t/p/w1280${show.backdrop_path}`
    : null;
  const posterUrl = show.poster_path
    ? `https://image.tmdb.org/t/p/w500${show.poster_path}`
    : null;

  const episodeRuntime = (show.episode_run_time || [])[0];
  const runtime = episodeRuntime ? `${episodeRuntime}m/ep` : null;
  const releaseYear = show.first_air_date ? show.first_air_date.split('-')[0] : '';
  const creators = show.created_by || [];
  const cast = credits?.cast?.slice(0, 12) || [];
  const trailers = (videos?.results || []).filter(
    (v) => v.site === 'YouTube' && (v.type === 'Trailer' || v.type === 'Teaser')
  );

  const imdbRating = ratings?.imdbRating;
  const rottenTomatoes = ratings?.Ratings?.find((r) => r.Source === 'Rotten Tomatoes')?.Value;
  const metacritic = ratings?.Ratings?.find((r) => r.Source === 'Metacritic')?.Value;

  const seoTitle = `${show.name} (${releaseYear}) — Trailer, Cast & Where to Stream | Klick.stream`;
  const seoDescription = `${show.name} (${releaseYear}): watch the trailer, explore the full cast, read ratings, and find where to stream on Netflix, Prime & 40+ platforms.`;

  const trailerUrl = trailers.length > 0
    ? `https://www.youtube.com/embed/${trailers[0].key}`
    : null;

  const similarShows = (similar || []).filter((s) => s.poster_path).slice(0, 12);

  const editorial = generateTVEditorial({ show, credits, ratings, watchProviders });

  const faqs = [];
  if (watchProviders) {
    const platforms = [
      ...(watchProviders.flatrate || []),
      ...(watchProviders.free || []),
      ...(watchProviders.ads || []),
    ].map((p) => p.provider_name);
    if (platforms.length > 0) {
      faqs.push({
        question: `Where can I watch ${show.name}?`,
        answer: `${show.name} is currently available to stream on ${platforms.slice(0, 4).join(', ')}.`,
      });
    }
  }
  if (show.overview) {
    faqs.push({
      question: `What is ${show.name} about?`,
      answer: show.overview,
    });
  }
  if (creators.length) {
    faqs.push({
      question: `Who created ${show.name}?`,
      answer: `${show.name} was created by ${creators.map((c) => c.name).join(', ')}.`,
    });
  }
  if (show.first_air_date) {
    faqs.push({
      question: `When did ${show.name} first air?`,
      answer: `${show.name} first aired on ${new Date(show.first_air_date + 'T00:00:00').toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}.`,
    });
  }

  return (
    <>
      <SEOHead
        title={seoTitle}
        description={seoDescription}
        image={backdropUrl}
        url={`/tv/${show.id}`}
        type="video.tv_show"
      />
      <TVSeriesJsonLd show={show} trailerUrl={trailerUrl} />
      {faqs.length > 0 && <FAQPageJsonLd faqs={faqs} />}
      <BreadcrumbJsonLd crumbs={[
        { name: 'Home', url: 'https://klick.stream/' },
        { name: 'TV Shows', url: 'https://klick.stream/tv' },
        { name: show.name, url: `https://klick.stream/tv/${show.id}` },
      ]} />
      {trailerUrl && (
        <VideoObjectJsonLd
          video={{
            name: `${show.name} — Official Trailer`,
            description: show.overview || `Watch the official trailer for ${show.name}.`,
            thumbnailUrl: show.backdrop_path
              ? `https://image.tmdb.org/t/p/w780${show.backdrop_path}`
              : `https://image.tmdb.org/t/p/w500${show.poster_path}`,
            uploadDate: show.first_air_date || undefined,
            embedUrl: trailerUrl,
          }}
        />
      )}

      <div className="movie-detail-page">
        {/* Breadcrumbs */}
        <nav className="breadcrumbs">
          <Link href="/">Home</Link>
          <span className="separator">/</span>
          <Link href="/tv">TV Shows</Link>
          <span className="separator">/</span>
          <span className="current">{show.name}</span>
        </nav>

        {/* Hero */}
        <section className="movie-detail-hero">
          {backdropUrl && (
            <Image
              src={backdropUrl}
              alt=""
              fill
              priority
              sizes="100vw"
              quality={70}
              className="movie-detail-hero-bg"
              style={{ objectFit: 'cover', objectPosition: 'center top' }}
            />
          )}
          <div className="movie-detail-hero-overlay" />
          <div className="movie-detail-hero-content">
            {posterUrl && (
              <div className="movie-detail-poster">
                <Image
                  src={posterUrl}
                  alt={show.name}
                  width={300}
                  height={450}
                  priority
                  style={{ objectFit: 'cover', borderRadius: '12px' }}
                />
              </div>
            )}
            <div className="movie-detail-hero-info">
              <h1>{show.name}</h1>
              {show.tagline && <p className="movie-detail-tagline">{show.tagline}</p>}
              <div className="movie-detail-meta">
                {releaseYear && <span>{releaseYear}</span>}
                {runtime && <span>{runtime}</span>}
                {show.genres?.map((g) => (
                  <Link key={g.id} href={`/discover?genre=${g.id}`} className="genre-tag">{g.name}</Link>
                ))}
              </div>

              {/* Ratings */}
              {(show.vote_average > 0 || imdbRating || rottenTomatoes) && (
                <div className="ratings-section">
                  {show.vote_average > 0 && (
                    <div className="rating-badge tmdb">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                      <span>{show.vote_average.toFixed(1)}</span>
                    </div>
                  )}
                  {imdbRating && imdbRating !== 'N/A' && (
                    <div className="rating-badge imdb">
                      <span className="rating-label">IMDb</span>
                      <span>{imdbRating}</span>
                    </div>
                  )}
                  {rottenTomatoes && (
                    <div className="rating-badge rotten">
                      <span>{parseInt(rottenTomatoes) >= 60 ? '🍅' : '🤢'}</span>
                      <span>{rottenTomatoes}</span>
                    </div>
                  )}
                  {metacritic && (
                    <div className={`rating-badge metacritic ${parseInt(metacritic) >= 60 ? 'good' : 'mixed'}`}>
                      <span>{metacritic.replace('/100', '')}</span>
                    </div>
                  )}
                </div>
              )}

              <div className="movie-detail-actions">
                {trailers.length > 0 && (
                  <button className="btn btn-primary btn-glow btn-large" onClick={() => setShowTrailer(true)}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                    Watch Trailer
                  </button>
                )}
                <button
                  className={`btn btn-secondary btn-large${saved ? ' saved' : ''}`}
                  onClick={() => toggle({ ...show, title: show.name, release_date: show.first_air_date, releaseYear, media_type: 'tv' })}
                >
                  <svg viewBox="0 0 24 24" width="20" height="20" fill={saved ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
                    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                  </svg>
                  {saved ? 'Saved' : 'Watch Later'}
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="movie-detail-body">
          <div className="movie-detail-main">
            {/* Where to Watch — placed first for discovery */}
            {watchProviders && (
              <div className="movie-detail-section">
                <WatchProviders
                  providers={watchProviders}
                  movieTitle={show.name}
                  movieYear={releaseYear}
                  tmdbLink={watchProviders.link}
                />
              </div>
            )}

            {/* Ad: after Where to Watch */}
            <AdSlot slot="1594520752" format="in-article" />

            {/* Overview */}
            {show.overview && (
              <div className="movie-detail-section">
                <h2>Overview</h2>
                <p className="movie-overview-text">{show.overview}</p>
              </div>
            )}

            {/* Editorial — original, data-driven analysis (verdict, reception,
                streaming guidance, season/status read) so the page adds value
                beyond the raw catalog data. */}
            {editorial.length > 0 && (
              <div className="movie-detail-section movie-editorial">
                <h2>Is {show.name} Worth Watching?</h2>
                {editorial.map((para, i) => (
                  <p key={i} className="movie-editorial-text">{para}</p>
                ))}
              </div>
            )}

            {/* Ratings extras from OMDb */}
            {ratings && ratings.Awards && ratings.Awards !== 'N/A' && (
              <div className="movie-extra-info">
                <div className="extra-item">
                  <span className="extra-icon">🏆</span>
                  <span className="extra-label">Awards</span>
                  <span className="extra-value">{ratings.Awards}</span>
                </div>
              </div>
            )}

            {/* Cast */}
            {cast.length > 0 && (
              <div className="movie-detail-section">
                <h2>Cast</h2>
                <div className="cast-grid">
                  {cast.map((person) => {
                    const celebSlug = celebSlugs?.[person.name];
                    const Wrapper = celebSlug ? Link : 'div';
                    const wrapperProps = celebSlug
                      ? { href: `/celebrity/${celebSlug}`, className: 'cast-card cast-card-link' }
                      : { className: 'cast-card' };
                    return (
                      <Wrapper key={person.id} {...wrapperProps}>
                        {person.profile_path ? (
                          <Image
                            src={`https://image.tmdb.org/t/p/w185${person.profile_path}`}
                            alt={person.name}
                            width={80}
                            height={80}
                            style={{ objectFit: 'cover', borderRadius: '50%' }}
                          />
                        ) : (
                          <div className="cast-placeholder">
                            <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor" opacity="0.3">
                              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                            </svg>
                          </div>
                        )}
                        <span className="cast-name">{person.name}</span>
                        <span className="cast-character">{person.character}</span>
                      </Wrapper>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Creators */}
            {creators.length > 0 && (
              <div className="movie-detail-section">
                <h2>Created By</h2>
                <div className="trailer-credits">
                  {creators.map((c) => (
                    <div className="credit-row" key={c.id}>
                      <span className="credit-label">Creator</span>
                      <span className="credit-value">{c.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Ad: between Cast and Trailers */}
            <AdSlot slot="1594520752" format="in-article" />

            {/* Trailers — embed first trailer for Google video indexing */}
            {trailers.length > 0 && (
              <div className="movie-detail-section">
                <h2>Trailers & Videos</h2>
                <div className="trailer-embed">
                  <iframe
                    src={`https://www.youtube.com/embed/${trailers[0].key}`}
                    title={trailers[0].name}
                    width="100%"
                    height="400"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                    style={{ borderRadius: '6px', border: 'none' }}
                  />
                </div>
                {trailers.length > 1 && (
                  <div className="trailers-list">
                    {trailers.slice(1).map((v) => (
                      <button
                        key={v.key}
                        className="trailer-thumb"
                        onClick={() => setShowTrailer(true)}
                      >
                        <Image
                          src={`https://img.youtube.com/vi/${v.key}/mqdefault.jpg`}
                          alt={v.name}
                          width={320}
                          height={180}
                          style={{ objectFit: 'cover' }}
                        />
                        <div className="trailer-thumb-overlay">
                          <svg viewBox="0 0 24 24" fill="currentColor" width="36" height="36">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                        </div>
                        <span className="trailer-thumb-title">{v.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Show Info Sidebar */}
            <div className="movie-detail-section">
              <h2>Details</h2>
              <div className="movie-info-grid">
                {show.original_name && show.original_name !== show.name && (
                  <div className="info-item">
                    <span className="info-label">Original Title</span>
                    <span className="info-value">{show.original_name}</span>
                  </div>
                )}
                {show.first_air_date && (
                  <div className="info-item">
                    <span className="info-label">First Air Date</span>
                    <span className="info-value">
                      {new Date(show.first_air_date + 'T00:00:00').toLocaleDateString('en-US', {
                        year: 'numeric', month: 'long', day: 'numeric'
                      })}
                    </span>
                  </div>
                )}
                {show.number_of_seasons > 0 && (
                  <div className="info-item">
                    <span className="info-label">Seasons</span>
                    <span className="info-value">{show.number_of_seasons}</span>
                  </div>
                )}
                {show.number_of_episodes > 0 && (
                  <div className="info-item">
                    <span className="info-label">Episodes</span>
                    <span className="info-value">{show.number_of_episodes}</span>
                  </div>
                )}
                {show.status && (
                  <div className="info-item">
                    <span className="info-label">Status</span>
                    <span className="info-value">{show.status}</span>
                  </div>
                )}
                {show.spoken_languages?.length > 0 && (
                  <div className="info-item">
                    <span className="info-label">Languages</span>
                    <span className="info-value">{show.spoken_languages.map(l => l.english_name).join(', ')}</span>
                  </div>
                )}
                {show.networks?.length > 0 && (
                  <div className="info-item">
                    <span className="info-label">Networks</span>
                    <span className="info-value">{show.networks.map(n => n.name).join(', ')}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Similar Shows */}
            {similarShows.length > 0 && (
              <div className="movie-detail-section">
                <h2>Similar Shows</h2>
                <div className="similar-movies">
                  {similarShows.map((s) => (
                    <Link key={s.id} href={`/tv/${s.id}`} className="similar-movie-card">
                      <Image
                        src={`https://image.tmdb.org/t/p/w300${s.poster_path}`}
                        alt={s.name}
                        width={150}
                        height={225}
                        style={{ objectFit: 'cover' }}
                      />
                      <div className="similar-movie-overlay">
                        <span className="similar-movie-title">{s.name}</span>
                        {s.first_air_date && (
                          <span className="similar-movie-year">{s.first_air_date.split('-')[0]}</span>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* In-article native ad */}
        <AdSlot slot="1594520752" format="in-article" />

        {/* Back link */}
        <section className="movie-detail-nav">
          <Link href="/tv" className="back-to-blog">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Back to TV Shows
          </Link>
        </section>

        {showTrailer && (
          <TrailerModal
            movie={{ ...show, title: show.name, release_date: show.first_air_date, id: show.id, backdrop_path: show.backdrop_path, overview: show.overview }}
            mediaType="tv"
            onClose={() => setShowTrailer(false)}
          />
        )}
      </div>
    </>
  );
}

export async function getServerSideProps({ params, req }) {
  const getLanguageFromCookies = (await import('../../lib/getLanguageFromCookies')).default;
  const fetchWithTimeout = (await import('../../lib/fetchWithTimeout')).default;
  const language = getLanguageFromCookies(req);
  const { id } = params;
  const apiKey = process.env.TMDB_API_KEY;

  if (!apiKey) {
    return { notFound: true };
  }

  try {
    const detailsRes = await fetchWithTimeout(
      `https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}&append_to_response=videos,credits,similar,external_ids&language=${language}`
    );

    if (!detailsRes.ok) {
      return { notFound: true };
    }

    const data = await detailsRes.json();

    // Fetch OMDb ratings + watch providers in parallel
    let ratings = null;
    let watchProviders = null;
    const omdbKey = process.env.OMDB_API_KEY;
    const imdbId = data.external_ids?.imdb_id;

    const [omdbResult, wpResult] = await Promise.allSettled([
      omdbKey && imdbId
        ? fetchWithTimeout(`https://www.omdbapi.com/?i=${imdbId}&apikey=${omdbKey}`).then(r => r.json())
        : Promise.resolve(null),
      fetchWithTimeout(`https://api.themoviedb.org/3/tv/${id}/watch/providers?api_key=${apiKey}`)
        .then(r => r.json())
        .then(d => d.results?.US || null),
    ]);

    if (omdbResult.status === 'fulfilled') ratings = omdbResult.value;
    if (wpResult.status === 'fulfilled') watchProviders = wpResult.value;

    // Build celebrity name→slug lookup for cast linking
    let celebSlugs = {};
    const castNames = new Set((data.credits?.cast || []).slice(0, 12).map(c => c.name));
    for (const c of celebritiesData.celebrities || []) {
      if (castNames.has(c.name)) {
        celebSlugs[c.name] = c.slug;
      }
    }

    return {
      props: {
        show: {
          id: data.id,
          name: data.name,
          original_name: data.original_name,
          tagline: data.tagline || '',
          overview: data.overview,
          backdrop_path: data.backdrop_path,
          poster_path: data.poster_path,
          first_air_date: data.first_air_date || '',
          episode_run_time: data.episode_run_time || [],
          vote_average: data.vote_average || 0,
          genres: data.genres || [],
          number_of_seasons: data.number_of_seasons || 0,
          number_of_episodes: data.number_of_episodes || 0,
          in_production: !!data.in_production,
          status: data.status || '',
          created_by: (data.created_by || []).map(c => ({ id: c.id, name: c.name })),
          spoken_languages: data.spoken_languages || [],
          networks: (data.networks || []).map(n => ({ name: n.name })),
          imdb_id: imdbId || null,
        },
        credits: {
          cast: (data.credits?.cast || []).slice(0, 12).map(c => ({
            id: c.id,
            name: c.name,
            character: c.character,
            profile_path: c.profile_path,
          })),
        },
        videos: {
          results: (data.videos?.results || [])
            .filter(v => v.site === 'YouTube')
            .slice(0, 6)
            .map(v => ({
              key: v.key,
              name: v.name,
              type: v.type,
              site: v.site,
            })),
        },
        ratings,
        watchProviders,
        similar: (data.similar?.results || []).slice(0, 12).map(s => ({
          id: s.id,
          name: s.name,
          poster_path: s.poster_path,
          first_air_date: s.first_air_date || '',
        })),
        celebSlugs,
      },
    };
  } catch {
    return { notFound: true };
  }
}
