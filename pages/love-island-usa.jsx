import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SEOHead from '../components/seo/SEOHead';
import AdSlot from '../components/AdSlot';

const SHOW_ID = 90521;
const PEACOCK_URL = 'https://www.peacocktv.com/stream-tv/love-island';

function timeAgo(dateStr) {
  if (!dateStr) return '';
  const diff = Math.floor((Date.now() - new Date(dateStr)) / 86400000);
  if (diff === 0) return 'Today';
  if (diff === 1) return 'Yesterday';
  if (diff < 7) return `${diff} days ago`;
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function useCountdown(targetDateStr) {
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    if (!targetDateStr) return;
    const target = new Date(targetDateStr);
    target.setHours(21, 0, 0, 0); // 9 PM EST air time

    const tick = () => {
      const diff = target - Date.now();
      if (diff <= 0) { setTimeLeft(null); return; }
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setTimeLeft({ d, h, m, s });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetDateStr]);

  return timeLeft;
}

function EpisodeCard({ ep, isFuture }) {
  return (
    <div className={`li-ep-card${isFuture ? ' li-ep-future' : ''}`}>
      {ep.still_path && (
        <div className="li-ep-thumb">
          <Image
            src={`https://image.tmdb.org/t/p/w300${ep.still_path}`}
            alt={`Episode ${ep.episode_number}`}
            width={120}
            height={68}
            style={{ objectFit: 'cover', borderRadius: '6px', width: '100%', height: '100%' }}
          />
        </div>
      )}
      <div className="li-ep-num">Ep {ep.episode_number}</div>
      <div className="li-ep-info">
        <div className="li-ep-name">{ep.name || `Episode ${ep.episode_number}`}</div>
        {ep.overview && <p className="li-ep-overview">{ep.overview}</p>}
        <div className="li-ep-meta">
          {ep.air_date && (
            <span className={isFuture ? 'li-ep-upcoming' : ''}>
              {isFuture
                ? `Airs ${new Date(ep.air_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`
                : timeAgo(ep.air_date)}
            </span>
          )}
          {ep.runtime && <span>{ep.runtime} min</span>}
          {ep.vote_average > 0 && <span>★ {ep.vote_average.toFixed(1)}</span>}
        </div>
      </div>
    </div>
  );
}

function Countdown({ dateStr }) {
  const t = useCountdown(dateStr);
  if (!t) return null;
  return (
    <div className="li-countdown">
      <div className="li-countdown-label">Next episode in</div>
      <div className="li-countdown-units">
        {t.d > 0 && <div className="li-countdown-unit"><span>{t.d}</span><small>days</small></div>}
        <div className="li-countdown-unit"><span>{String(t.h).padStart(2,'0')}</span><small>hrs</small></div>
        <div className="li-countdown-unit"><span>{String(t.m).padStart(2,'0')}</span><small>min</small></div>
        <div className="li-countdown-unit"><span>{String(t.s).padStart(2,'0')}</span><small>sec</small></div>
      </div>
    </div>
  );
}

export default function LoveIslandUSA({ show, season, islanders }) {
  const [tab, setTab] = useState('aired');
  const [showAllAired, setShowAllAired] = useState(false);
  const [islandFilter, setIslandFilter] = useState('');

  const now = new Date();
  const aired = (season?.episodes || []).filter((e) => e.air_date && new Date(e.air_date) <= now);
  const upcoming = (season?.episodes || []).filter((e) => e.air_date && new Date(e.air_date) > now);
  const nextEp = upcoming[0] || null;

  const airedToShow = showAllAired ? [...aired].reverse() : [...aired].reverse().slice(0, 8);

  const filteredIslanders = islanders.filter((p) =>
    !islandFilter || p.name.toLowerCase().includes(islandFilter.toLowerCase())
  );

  const todayEp = aired.find((e) => {
    if (!e.air_date) return false;
    const d = new Date(e.air_date);
    return d.toDateString() === now.toDateString();
  });

  return (
    <>
      <SEOHead
        title={`Love Island USA Season ${season?.season_number || 8} — Live Updates | Klick.stream`}
        description={`Love Island USA Season ${season?.season_number || 8} is NOW streaming on Peacock. ${aired.length} episodes aired, ${upcoming.length} remaining. Follow all the Islanders, recaps, and villa drama. Updated live.`}
        url="/love-island-usa"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'TVSeries',
            name: 'Love Island USA',
            description: show?.overview || 'American version of the hit UK dating reality show.',
            url: 'https://klick.stream/love-island-usa',
            numberOfSeasons: show?.number_of_seasons || 8,
            startDate: '2019',
            inLanguage: 'en',
            genre: ['Reality', 'Romance'],
          }),
        }}
      />

      <div className="li-page">

        {/* ── TODAY BANNER ── */}
        {todayEp && (
          <div className="li-today-bar">
            <span className="li-today-dot" />
            <strong>New episode tonight:</strong>&nbsp;{todayEp.name || `Episode ${todayEp.episode_number}`} — streaming on Peacock
          </div>
        )}

        {/* ── HERO ── */}
        <section className="li-hero">
          {show?.backdrop_path && (
            <Image
              src={`https://image.tmdb.org/t/p/original${show.backdrop_path}`}
              alt="Love Island USA"
              fill
              priority
              sizes="100vw"
              style={{ objectFit: 'cover', objectPosition: 'center top' }}
            />
          )}
          <div className="li-hero-gradient" />
          <div className="li-hero-inner">
            <div className="li-hero-badges">
              <span className="li-live-badge">
                <span className="li-live-dot" />
                Now Streaming
              </span>
              <span className="li-network-badge">Peacock</span>
            </div>

            {show?.poster_path && (
              <div className="li-hero-poster">
                <Image
                  src={`https://image.tmdb.org/t/p/w342${show.poster_path}`}
                  alt="Love Island USA"
                  width={160}
                  height={240}
                  style={{ objectFit: 'cover', width: '100%', height: 'auto', borderRadius: '10px' }}
                />
              </div>
            )}

            <div className="li-hero-text">
              <h1 className="li-hero-title">Love Island USA</h1>
              <div className="li-hero-season">
                Season {season?.season_number || 8} · {season?.air_date?.split('-')[0] || 2026}
              </div>
              {show?.overview && (
                <p className="li-hero-desc">{show.overview.slice(0, 200)}…</p>
              )}
              <div className="li-hero-actions">
                <a href={PEACOCK_URL} target="_blank" rel="noopener noreferrer" className="li-btn-primary">
                  Watch on Peacock
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── STATS + COUNTDOWN ── */}
        <div className="li-stats-row">
          <div className="li-stats">
            <div className="li-stat">
              <div className="li-stat-num">{aired.length}</div>
              <div className="li-stat-label">Episodes Aired</div>
            </div>
            <div className="li-stat">
              <div className="li-stat-num">{islanders.length}</div>
              <div className="li-stat-label">Islanders</div>
            </div>
            <div className="li-stat">
              <div className="li-stat-num">{upcoming.length > 0 ? upcoming.length : '—'}</div>
              <div className="li-stat-label">Episodes Left</div>
            </div>
            <div className="li-stat">
              <div className="li-stat-num">S{season?.season_number || 8}</div>
              <div className="li-stat-label">Season</div>
            </div>
          </div>

          {nextEp?.air_date && <Countdown dateStr={nextEp.air_date} />}
        </div>

        {/* ── EPISODES ── */}
        {(aired.length > 0 || upcoming.length > 0) && (
          <section className="li-section li-section-dark">
            <div className="li-section-inner">
              <div className="li-section-eyebrow">Season {season?.season_number || 8}</div>
              <h2 className="li-section-title">Episode Guide</h2>

              <div className="li-tabs">
                <button
                  className={`li-tab${tab === 'aired' ? ' active' : ''}`}
                  onClick={() => setTab('aired')}
                >
                  Aired <span className="li-tab-count">{aired.length}</span>
                </button>
                {upcoming.length > 0 && (
                  <button
                    className={`li-tab${tab === 'upcoming' ? ' active' : ''}`}
                    onClick={() => setTab('upcoming')}
                  >
                    Coming Up <span className="li-tab-count">{upcoming.length}</span>
                  </button>
                )}
              </div>

              {tab === 'aired' && aired.length > 0 && (
                <>
                  <div className="li-episodes-list">
                    {airedToShow.map((ep) => (
                      <EpisodeCard key={ep.id} ep={ep} isFuture={false} />
                    ))}
                  </div>
                  {aired.length > 8 && !showAllAired && (
                    <button className="li-show-more" onClick={() => setShowAllAired(true)}>
                      Show all {aired.length} episodes
                    </button>
                  )}
                </>
              )}

              {tab === 'upcoming' && upcoming.length > 0 && (
                <div className="li-episodes-list">
                  {upcoming.slice(0, 10).map((ep) => (
                    <EpisodeCard key={ep.id} ep={ep} isFuture={true} />
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {/* ── ISLANDERS ── */}
        {islanders.length > 0 && (
          <section className="li-section">
            <div className="li-section-inner">
              <div className="li-section-eyebrow">Cast</div>
              <div className="li-islanders-header">
                <h2 className="li-section-title" style={{ margin: 0 }}>Meet the Islanders</h2>
                <div className="li-islander-search">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search islanders…"
                    value={islandFilter}
                    onChange={(e) => setIslandFilter(e.target.value)}
                  />
                </div>
              </div>
              <div className="li-islanders-grid">
                {filteredIslanders.map((person) => (
                  <div key={person.id} className="li-islander-card">
                    <div className="li-islander-photo">
                      {person.profile_path ? (
                        <Image
                          src={`https://image.tmdb.org/t/p/w185${person.profile_path}`}
                          alt={person.name}
                          width={120}
                          height={160}
                          style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                        />
                      ) : (
                        <div className="li-islander-no-photo">{person.name[0]}</div>
                      )}
                    </div>
                    <div className="li-islander-name">{person.name}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── AD ── */}
        <div className="ad-container">
          <AdSlot slot="1594520752" format="in-article" />
        </div>

        {/* ── WHERE TO WATCH ── */}
        <div className="li-watch-bar">
          <div className="li-watch-inner">
            <div>
              <div className="li-watch-title">New episodes daily on Peacock</div>
              <div className="li-watch-sub">Love Island USA Season {season?.season_number || 8} · Streaming now</div>
            </div>
            <a href={PEACOCK_URL} target="_blank" rel="noopener noreferrer" className="li-btn-primary">
              Watch Free on Peacock ↗
            </a>
          </div>
        </div>

        {/* ── RELATED ── */}
        <section className="li-section">
          <div className="li-section-inner">
            <div className="li-section-eyebrow">More to Explore</div>
            <h2 className="li-section-title">Trending on Klick.stream</h2>
            <div className="li-related-links">
              <Link href="/worldcup" className="li-related-card li-related-wc">
                <span className="li-related-emoji">⚽</span>
                <div>
                  <div className="li-related-name">FIFA World Cup 2026</div>
                  <div className="li-related-sub">Live coverage + highlights</div>
                </div>
              </Link>
              <Link href="/discover" className="li-related-card li-related-disc">
                <span className="li-related-emoji">🎬</span>
                <div>
                  <div className="li-related-name">Discover Movies</div>
                  <div className="li-related-sub">50,000+ titles to explore</div>
                </div>
              </Link>
              <Link href="/trailers" className="li-related-card li-related-tr">
                <span className="li-related-emoji">▶</span>
                <div>
                  <div className="li-related-name">Latest Trailers</div>
                  <div className="li-related-sub">What's coming to streaming</div>
                </div>
              </Link>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}

export async function getServerSideProps() {
  const apiKey = process.env.TMDB_API_KEY;
  let show = null;
  let season = null;
  let islanders = [];

  if (!apiKey) {
    return { props: { show, season, islanders } };
  }

  try {
    const showRes = await fetch(
      `https://api.themoviedb.org/3/tv/${SHOW_ID}?api_key=${apiKey}&language=en-US`
    );
    show = await showRes.json();

    const seasonNum = show.number_of_seasons || 8;

    const [seasonRes, creditsRes] = await Promise.all([
      fetch(`https://api.themoviedb.org/3/tv/${SHOW_ID}/season/${seasonNum}?api_key=${apiKey}&language=en-US`),
      fetch(`https://api.themoviedb.org/3/tv/${SHOW_ID}/season/${seasonNum}/credits?api_key=${apiKey}&language=en-US`),
    ]);

    season = await seasonRes.json();
    const credits = await creditsRes.json();

    const allGuests = new Map();
    (season.episodes || []).forEach((ep) => {
      (ep.guest_stars || []).forEach((p) => {
        if (!allGuests.has(p.id)) {
          allGuests.set(p.id, { id: p.id, name: p.name, profile_path: p.profile_path || null });
        }
      });
    });
    islanders = [...allGuests.values()].slice(0, 24);

    show = {
      id: show.id,
      name: show.name,
      overview: show.overview,
      poster_path: show.poster_path,
      backdrop_path: show.backdrop_path,
      number_of_seasons: show.number_of_seasons,
      in_production: show.in_production,
      last_air_date: show.last_air_date,
    };

    season = {
      season_number: season.season_number,
      air_date: season.air_date,
      episodes: (season.episodes || []).map((e) => ({
        id: e.id,
        episode_number: e.episode_number,
        name: e.name || `Episode ${e.episode_number}`,
        overview: e.overview || '',
        air_date: e.air_date || null,
        runtime: e.runtime || null,
        still_path: e.still_path || null,
        vote_average: e.vote_average || 0,
      })),
    };
  } catch (err) {
    console.error('Love Island SSR error:', err);
  }

  return { props: { show, season, islanders } };
}
