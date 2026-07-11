import SEOHead from '../../components/seo/SEOHead';
import Link from 'next/link';
import { AWARD_GUIDES } from '../../data/awardGuides';
import { RED_CARPET_EVENTS } from '../../data/redCarpet';

export default function AwardsPage() {
  const awards = RED_CARPET_EVENTS.filter((e) => e.type === 'Awards').sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  const now = new Date();

  return (
    <>
      <SEOHead
        title="Awards — Klick.stream"
        description="Upcoming film and television award ceremonies, predictions, and comprehensive guides."
        url="/awards"
      />

      <div className="awards-page">
        <section className="awards-hero">
          <h1>Awards Season</h1>
          <p>The campaign, the competition, and the big nights — comprehensive coverage of film's awards circuit</p>
        </section>

        <div className="awards-grid">
          {awards.map((award) => {
            const isUpcoming = new Date(award.date) > now;
            const guide = AWARD_GUIDES[award.id];
            const daysUntil = Math.ceil((new Date(award.date) - now) / (1000 * 60 * 60 * 24));

            return (
              <div key={award.id} className="award-card">
                <div className="award-card-header">
                  <h2>{award.title}</h2>
                  {isUpcoming && <span className="award-badge upcoming">Upcoming</span>}
                  {!isUpcoming && <span className="award-badge past">Passed</span>}
                </div>

                {isUpcoming && daysUntil > 0 && (
                  <div className="award-countdown">
                    {daysUntil > 365
                      ? `${Math.floor(daysUntil / 365)} year away`
                      : daysUntil > 30
                        ? `${Math.floor(daysUntil / 30)} months away`
                        : daysUntil > 0
                          ? `${daysUntil} days away`
                          : 'Today'}
                  </div>
                )}

                <div className="award-meta">
                  <time dateTime={award.date} className="award-date">
                    {new Date(award.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </time>
                  {award.location && <span className="award-location">📍 {award.location}</span>}
                </div>

                <p className="award-blurb">{award.blurb}</p>

                {award.films && award.films.length > 0 && (
                  <div className="award-highlights">
                    <strong>Key races:</strong>
                    <ul>
                      {award.films.slice(0, 3).map((film, i) => (
                        <li key={i}>{film}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {guide && (
                  <Link href={`/awards/${award.id}`} className="award-link">
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
