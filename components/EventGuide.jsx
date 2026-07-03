import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import SEOHead from './seo/SEOHead';
import NewsletterSignup from './NewsletterSignup';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://klick.stream';

// JSON-LD is built inline (rather than importing the shared JsonLd components)
// to keep EventGuide's module graph self-contained.
function buildEventLd(event, guide, canonical) {
  return {
    '@context': 'https://schema.org',
    '@type': event.type === 'Festival' ? 'Festival' : 'Event',
    name: event.title,
    description: guide.standfirst || event.blurb,
    startDate: event.date,
    endDate: event.endDate || event.date,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    url: canonical,
    ...(event.image && { image: [event.image] }),
    ...(event.location && {
      location: { '@type': 'Place', name: event.location, address: event.location },
    }),
  };
}

function buildBreadcrumbLd(event, canonical) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Red Carpet', item: `${SITE_URL}/red-carpet` },
      { '@type': 'ListItem', position: 3, name: event.title, item: canonical },
    ],
  };
}

/**
 * Shared coverage-guide layout used by both /festivals/[slug] and
 * /awards/[slug]. Renders a hero (event backdrop + countdown), a quick-facts
 * sidebar, editorial body, a highlights box, and a "how to follow" note.
 */
export default function EventGuide({ event, guide, related = [], backHref = '/red-carpet' }) {
  const canonical = `${SITE_URL}${event.coverageBase || ''}/${event.id}`;
  return (
    <>
      <SEOHead
        title={`${guide.headline} | Klick.stream`}
        description={guide.standfirst}
        url={`${event.coverageBase || ''}/${event.id}`}
        image={event.image || undefined}
      />
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildEventLd(event, guide, canonical)) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildBreadcrumbLd(event, canonical)) }}
        />
      </Head>

      <article className="festguide" style={{ '--rc-accent': event.accent }}>
        {/* HERO */}
        <header className="festguide-hero">
          {event.image && (
            <Image
              src={event.image}
              alt={event.title}
              fill
              priority
              sizes="100vw"
              style={{ objectFit: 'cover' }}
            />
          )}
          <div className="festguide-hero-scrim" />
          <div className="festguide-hero-inner">
            <nav className="festguide-crumbs" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span className="festguide-crumb-sep" aria-hidden="true">›</span>
              <Link href="/red-carpet">Red Carpet</Link>
              <span className="festguide-crumb-sep" aria-hidden="true">›</span>
              <span className="festguide-crumb-current">{event.title}</span>
            </nav>
            <div className="festguide-hero-badges">
              <span className="redcarpet-type">{event.type}</span>
              <span className={`redcarpet-countdown${event.live ? ' redcarpet-countdown--live' : ''}`}>
                {event.live && <span className="redcarpet-live-dot" />}
                {event.countdownLabel}
              </span>
            </div>
            <h1 className="festguide-title">{guide.headline}</h1>
            <p className="festguide-standfirst">{guide.standfirst}</p>
            <div className="festguide-hero-meta">
              <span>📅 {event.dateRange}, {new Date(event.date).getFullYear()}</span>
              <span>📍 {event.location}</span>
            </div>
          </div>
        </header>

        <div className="festguide-body">
          {/* QUICK FACTS */}
          {guide.facts?.length > 0 && (
            <aside className="festguide-facts">
              <h2 className="festguide-facts-title">Quick Facts</h2>
              <dl className="festguide-facts-list">
                {guide.facts.map(([label, value]) => (
                  <div key={label} className="festguide-fact">
                    <dt>{label}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
            </aside>
          )}

          {/* MAIN COPY */}
          <div className="festguide-main">
            {guide.body.map((para, i) => (
              <p key={i} className="festguide-para">{para}</p>
            ))}

            {guide.highlights?.length > 0 && (
              <section className="festguide-highlights">
                <h2 className="festguide-h2">{guide.highlightsTitle}</h2>
                <ul className="festguide-highlight-list">
                  {guide.highlights.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>
            )}

            {guide.follow && (
              <p className="festguide-follow">
                <span className="festguide-follow-icon">🎬</span> {guide.follow}
              </p>
            )}

            <div className="festguide-cta">
              <Link href={backHref} className="festguide-cta-btn">
                See the Full Red Carpet Calendar →
              </Link>
            </div>
          </div>
        </div>

        {/* RELATED EVENTS */}
        {related.length > 0 && (
          <section className="festguide-related">
            <h2 className="festguide-related-title">Related on the Red Carpet</h2>
            <div className="festguide-related-grid">
              {related.map((r) => (
                <Link
                  key={r.id}
                  href={r.url}
                  className="festguide-related-card"
                  style={{ '--rc-accent': r.accent }}
                >
                  <div className="festguide-related-media">
                    {r.image && (
                      <Image
                        src={r.image}
                        alt={r.title}
                        fill
                        sizes="(max-width: 768px) 50vw, 240px"
                        style={{ objectFit: 'cover' }}
                        loading="lazy"
                      />
                    )}
                    <div className="festguide-related-grad" />
                    <span className="redcarpet-type festguide-related-type">{r.type}</span>
                  </div>
                  <div className="festguide-related-info">
                    <span className="festguide-related-name">{r.title}</span>
                    <span className="festguide-related-date">
                      {r.dateRange}, {new Date(r.date).getFullYear()}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* NEWSLETTER */}
        <div className="newsletter-section reveal">
          <h2>Never Miss a <em>Premiere.</em></h2>
          <p>Festival lineups, red carpet dates, and award-season coverage — straight to your inbox.</p>
          <NewsletterSignup variant="inline" />
        </div>
      </article>
    </>
  );
}
