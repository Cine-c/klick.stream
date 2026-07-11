import SEOHead from '../../components/seo/SEOHead';
import Link from 'next/link';
import { FESTIVAL_GUIDES } from '../../data/festivalGuides';
import { RED_CARPET_EVENTS } from '../../data/redCarpet';

export default function FestivalsPage() {
  const festivals = RED_CARPET_EVENTS.filter((e) => e.type === 'Festival').sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  const now = new Date();

  return (
    <>
      <SEOHead
        title="Film Festivals — Klick.stream"
        description="Upcoming film festivals, event coverage, and comprehensive guides to the world's biggest cinema celebrations."
        url="/festivals"
      />

      <div className="festivals-page">
        <section className="festivals-hero">
          <h1>Film Festivals</h1>
          <p>The world's biggest celebrations of cinema — from Venice to Toronto to Sundance</p>
        </section>

        <div className="festivals-grid">
          {festivals.map((festival) => {
            const isUpcoming = new Date(festival.date) > now;
            const guide = FESTIVAL_GUIDES[festival.id];
            const daysUntil = Math.ceil((new Date(festival.date) - now) / (1000 * 60 * 60 * 24));
            const duration =
              festival.endDate &&
              Math.ceil((new Date(festival.endDate) - new Date(festival.date)) / (1000 * 60 * 60 * 24)) + 1;

            return (
              <div key={festival.id} className="festival-card">
                <div className="festival-card-header">
                  <h2>{festival.title}</h2>
                  {isUpcoming && <span className="festival-badge upcoming">Upcoming</span>}
                  {!isUpcoming && <span className="festival-badge past">Passed</span>}
                </div>

                {isUpcoming && daysUntil > 0 && (
                  <div className="festival-countdown">
                    {daysUntil > 365
                      ? `${Math.floor(daysUntil / 365)} year away`
                      : daysUntil > 30
                        ? `${Math.floor(daysUntil / 30)} months away`
                        : daysUntil > 0
                          ? `${daysUntil} days away`
                          : 'Today'}
                  </div>
                )}

                <div className="festival-meta">
                  <time dateTime={festival.date} className="festival-date">
                    {new Date(festival.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                    {duration && ` – ${duration} days`}
                  </time>
                  {festival.location && <span className="festival-location">📍 {festival.location}</span>}
                </div>

                <p className="festival-blurb">{festival.blurb}</p>

                {festival.films && festival.films.length > 0 && (
                  <div className="festival-highlights">
                    <strong>Competitions & sections:</strong>
                    <ul>
                      {festival.films.slice(0, 3).map((film, i) => (
                        <li key={i}>{film}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {guide && (
                  <Link href={`/festivals/${festival.id}`} className="festival-link">
                    Read full guide →
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
