import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import SEOHead from '../components/seo/SEOHead';
import NewsletterSignup from '../components/NewsletterSignup';
import { withCountdown } from '../data/redCarpet';

const TrailerModal = dynamic(() => import('../components/trailers/TrailerModal'), { ssr: false });

function eventToMovie(ev) {
  return {
    id: ev.tmdbId,
    title: ev.films?.[0] || ev.title,
    overview: ev.overview || ev.blurb,
    release_date: ev.date,
    backdrop_path: ev.image ? ev.image.replace('https://image.tmdb.org/t/p/w780', '') : null,
  };
}

function groupByMonth(events) {
  const groups = [];
  const seen = new Map();
  for (const ev of events) {
    const key = new Date(ev.date + 'T00:00:00').toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    if (!seen.has(key)) {
      const g = { label: key, events: [] };
      seen.set(key, g);
      groups.push(g);
    }
    seen.get(key).events.push(ev);
  }
  return groups;
}

export default function RedCarpet({ events }) {
  const groups = groupByMonth(events);
  const nextUp = events[0];
  const [trailerMovie, setTrailerMovie] = useState(null);

  return (
    <>
      <SEOHead
        title="Red Carpet & Premieres — Upcoming Film Festivals & Movie Events | Klick.stream"
        description="The complete calendar of upcoming red carpet events: film festivals, award ceremonies, and marquee world premieres. From Venice and TIFF to the winter's biggest opening nights."
        url="/red-carpet"
      />

      <div className="redcarpet-page">
        {/* HERO */}
        <section className="redcarpet-hero">
          <div className="redcarpet-hero-glow" aria-hidden="true" />
          <div className="redcarpet-hero-inner">
            <div className="redcarpet-hero-eyebrow">🎟 The Season Ahead</div>
            <h1 className="redcarpet-hero-title">Red Carpet <em>&amp; Premieres</em></h1>
            <p className="redcarpet-hero-sub">
              Every festival, ceremony, and world premiere worth watching — the full calendar of
              cinema&rsquo;s biggest nights, updated as the season unfolds.
            </p>
            {nextUp && (
              <div className="redcarpet-hero-next">
                <span className="redcarpet-hero-next-label">Next up</span>
                <span className="redcarpet-hero-next-title">{nextUp.title}</span>
                <span className="redcarpet-hero-next-when">
                  {nextUp.dateRange} · {nextUp.countdownLabel}
                </span>
              </div>
            )}
          </div>
        </section>

        {/* TIMELINE */}
        <div className="redcarpet-page-body">
          {groups.map((group) => (
            <section key={group.label} className="redcarpet-month">
              <div className="redcarpet-month-header">
                <h2 className="redcarpet-month-label">{group.label}</h2>
                <span className="redcarpet-month-count">{group.events.length} event{group.events.length !== 1 ? 's' : ''}</span>
              </div>
              <div className="redcarpet-list">
                {group.events.map((ev) => (
                  <article key={ev.id} className={`redcarpet-row${ev.image ? ' redcarpet-row--hasmedia' : ''}`} style={{ '--rc-accent': ev.accent }}>
                    {ev.image && (
                      <div className="redcarpet-row-media">
                        <Image
                          src={ev.image}
                          alt={ev.title}
                          fill
                          sizes="(max-width: 900px) 100vw, 820px"
                          style={{ objectFit: 'cover' }}
                          loading="lazy"
                        />
                        <div className="redcarpet-row-media-grad" />
                      </div>
                    )}
                    <div className="redcarpet-row-main">
                    <div className="redcarpet-row-date">
                      <span className="redcarpet-row-month">{ev.month}</span>
                      <span className="redcarpet-row-day">{ev.day}</span>
                    </div>
                    <div className="redcarpet-row-body">
                      <div className="redcarpet-row-meta">
                        <span className="redcarpet-type">{ev.type}</span>
                        <span className={`redcarpet-countdown${ev.live ? ' redcarpet-countdown--live' : ''}`}>
                          {ev.live && <span className="redcarpet-live-dot" />}
                          {ev.countdownLabel}
                        </span>
                      </div>
                      <h3 className="redcarpet-row-title">{ev.title}</h3>
                      <div className="redcarpet-row-facts">
                        <span className="redcarpet-daterange">{ev.dateRange}</span>
                        <span className="redcarpet-location">
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                          </svg>
                          {ev.location}
                        </span>
                      </div>
                      <p className="redcarpet-row-blurb">{ev.blurb}</p>
                      <div className="redcarpet-films">
                        {ev.films.map((f) => (
                          <span key={f} className="redcarpet-film-chip">{f}</span>
                        ))}
                      </div>
                      <div className="redcarpet-row-footer">
                        <span className="redcarpet-watch">📍 {ev.watch}</span>
                        {ev.tmdbId && (
                          <button
                            type="button"
                            className="redcarpet-trailer-btn"
                            onClick={() => setTrailerMovie(eventToMovie(ev))}
                          >
                            <svg width="12" height="12" fill="currentColor" viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3" /></svg>
                            Watch Trailer
                          </button>
                        )}
                        {ev.url && (
                          <Link href={ev.url} className="redcarpet-row-link">Read our coverage →</Link>
                        )}
                      </div>
                    </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))}

          {/* NEWSLETTER */}
          <div className="newsletter-section reveal" style={{ marginTop: 8 }}>
            <h2>Never Miss a <em>Premiere.</em></h2>
            <p>Festival lineups, red carpet dates, and award-season coverage — straight to your inbox.</p>
            <NewsletterSignup variant="inline" />
          </div>
        </div>
      </div>

      {trailerMovie && (
        <TrailerModal movie={trailerMovie} onClose={() => setTrailerMovie(null)} />
      )}
    </>
  );
}

export async function getStaticProps() {
  return {
    props: { events: withCountdown() },
    revalidate: 3600,
  };
}
