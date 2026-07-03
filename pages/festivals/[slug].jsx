import Link from 'next/link';
import Image from 'next/image';
import SEOHead from '../../components/seo/SEOHead';
import NewsletterSignup from '../../components/NewsletterSignup';
import { FESTIVAL_GUIDES } from '../../data/festivalGuides';
import { getEventById } from '../../data/redCarpet';

export default function FestivalGuide({ event, guide }) {
  return (
    <>
      <SEOHead
        title={`${guide.headline} | Klick.stream`}
        description={guide.standfirst}
        url={`/festivals/${event.id}`}
        image={event.image || undefined}
      />

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
            <Link href="/red-carpet" className="festguide-back">← Red Carpet Calendar</Link>
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
              <Link href="/red-carpet" className="festguide-cta-btn">
                See the Full Red Carpet Calendar →
              </Link>
            </div>
          </div>
        </div>

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

export async function getStaticPaths() {
  return {
    paths: Object.keys(FESTIVAL_GUIDES).map((slug) => ({ params: { slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const guide = FESTIVAL_GUIDES[params.slug] || null;
  const event = getEventById(params.slug);
  if (!guide || !event) {
    return { notFound: true };
  }
  return {
    props: { event, guide },
    revalidate: 3600,
  };
}
