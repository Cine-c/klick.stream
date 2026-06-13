import Image from 'next/image';
import Link from 'next/link';
import SEOHead from '../components/seo/SEOHead';

const CYCLING_MOVIE_IDS = [
  271736,  // The Program (2015, Lance Armstrong biopic)
  14040,   // American Flyers (1985)
  20283,   // Breaking Away (1979, classic)
  432976,  // Icarus (2017, Netflix doping doc)
  458506,  // Tour de Pharmacy (HBO mockumentary)
  5683,    // Pee-wee's Big Adventure (1985, iconic bike scene)
];

const RACE_STATS = [
  { num: '21',    label: 'Stages' },
  { num: '~3,500', label: 'Kilometres' },
  { num: '~170',  label: 'Riders' },
  { num: '22',    label: 'Teams' },
  { num: '23',    label: 'Days' },
  { num: 'Paris', label: 'Finish Line' },
];

const STAGE_TYPES = [
  {
    icon: '🏔️',
    type: 'Mountain Stages',
    desc: 'Brutal Alpine and Pyrenean climbs where general classification battles are won and lost. Expect attacks on cols like Alpe d\'Huez and Col du Galibier.',
  },
  {
    icon: '⚡',
    type: 'Time Trials',
    desc: 'The race of truth — riders against the clock. Individual TTs reveal the true GC hierarchy and often decide the yellow jersey by seconds.',
  },
  {
    icon: '💨',
    type: 'Sprint Stages',
    desc: 'Flat routes that end in mass sprint finishes. Teams like UAE and Jumbo-Visma protect their sprinters through the peloton chaos.',
  },
  {
    icon: '🪨',
    type: 'Cobblestone Stages',
    desc: 'The punishing pavé sections in northern France. A bad crash or mechanical on the cobbles can end a GC contender\'s race in minutes.',
  },
];

const PAST_CHAMPIONS = [
  { year: 2024, rider: 'Tadej Pogačar', country: '🇸🇮', flag: 'Slovenia' },
  { year: 2023, rider: 'Jonas Vingegaard', country: '🇩🇰', flag: 'Denmark' },
  { year: 2022, rider: 'Jonas Vingegaard', country: '🇩🇰', flag: 'Denmark' },
  { year: 2021, rider: 'Tadej Pogačar', country: '🇸🇮', flag: 'Slovenia' },
  { year: 2020, rider: 'Tadej Pogačar', country: '🇸🇮', flag: 'Slovenia' },
  { year: 2019, rider: 'Egan Bernal',    country: '🇨🇴', flag: 'Colombia' },
];

export default function TourDeFrance({ movies }) {
  return (
    <>
      <SEOHead
        title="Tour de France 2026 — Coverage & Cycling Movies | Klick.stream"
        description="Tour de France 2026 coverage — race format, stage types, GC contenders, and the best cycling movies and documentaries to watch during Le Tour."
        url="/tour-de-france"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SportsEvent',
            name: 'Tour de France 2026',
            description: 'The 113th edition of the Tour de France, the world\'s most prestigious cycling race.',
            startDate: '2026-07-04',
            endDate: '2026-07-26',
            location: { '@type': 'Place', name: 'France', address: { '@type': 'PostalAddress', addressCountry: 'FR' } },
            organizer: { '@type': 'Organization', name: 'Amaury Sport Organisation (ASO)', url: 'https://www.letour.fr' },
            url: 'https://klick.stream/tour-de-france',
            sport: 'Cycling',
          }),
        }}
      />

      <div className="tdf-page">

        {/* ── HERO ── */}
        <section className="tdf-hero">
          <div className="tdf-hero-bg" aria-hidden="true">
            {[...Array(16)].map((_, i) => (
              <div key={i} className="tdf-hero-stripe" style={{ '--i': i }} />
            ))}
          </div>
          <div className="tdf-hero-inner">
            <div className="tdf-hero-badges">
              <span className="tdf-upcoming-badge">
                Starts July 4
              </span>
              <span className="tdf-edition-badge">2026 Edition</span>
            </div>
            <div className="tdf-hero-icon" aria-hidden="true">🚴</div>
            <h1 className="tdf-hero-title">Tour de France 2026</h1>
            <p className="tdf-hero-subtitle">Le Tour · July 4 – 26, 2026 · France</p>
            <p className="tdf-hero-desc">
              The world's greatest cycling race returns for its 113th edition. 21 stages, roughly 3,500 kilometres,
              and three weeks of racing through the most spectacular landscapes in France — ending
              on the Champs-Élysées in Paris.
            </p>
            <div className="tdf-hero-actions">
              <a
                href="https://www.letour.fr/en/"
                target="_blank"
                rel="noopener noreferrer"
                className="tdf-btn-primary"
              >
                Official Site ↗
              </a>
              <Link href="/discover?genre=99" className="tdf-btn-ghost">
                Sports Documentaries →
              </Link>
            </div>
          </div>
        </section>

        {/* ── RACE STATS ── */}
        <div className="tdf-stats">
          {RACE_STATS.map((s) => (
            <div key={s.label} className="tdf-stat">
              <div className="tdf-stat-num">{s.num}</div>
              <div className="tdf-stat-label">{s.label}</div>
            </div>
          ))}
        </div>

        {/* ── COUNTDOWN BANNER ── */}
        <div className="tdf-countdown-bar">
          <div className="tdf-countdown-inner">
            <div className="tdf-countdown-text">
              <span className="tdf-countdown-label">Grand Départ</span>
              <span className="tdf-countdown-date">Saturday, July 4, 2026</span>
            </div>
            <a
              href="https://www.letour.fr/en/rankings/general"
              target="_blank"
              rel="noopener noreferrer"
              className="tdf-btn-sm"
            >
              Live Standings ↗
            </a>
          </div>
        </div>

        {/* ── STAGE TYPES ── */}
        <section className="tdf-section">
          <div className="tdf-section-inner">
            <div className="tdf-section-eyebrow">The Race</div>
            <h2 className="tdf-section-title">What Makes Le Tour</h2>
            <div className="tdf-stages-grid">
              {STAGE_TYPES.map((s) => (
                <div key={s.type} className="tdf-stage-card">
                  <div className="tdf-stage-icon">{s.icon}</div>
                  <div className="tdf-stage-type">{s.type}</div>
                  <p className="tdf-stage-desc">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── GC CONTENDERS ── */}
        <section className="tdf-section tdf-section-dark">
          <div className="tdf-section-inner">
            <div className="tdf-section-eyebrow">Yellow Jersey Battle</div>
            <h2 className="tdf-section-title">Riders to Watch</h2>
            <div className="tdf-riders-grid">
              {[
                { name: 'Tadej Pogačar', team: 'UAE Team Emirates', flag: '🇸🇮', role: 'Defending favourite — 3× champion hunting back-to-back titles.' },
                { name: 'Jonas Vingegaard', team: 'Team Visma | Lease a Bike', flag: '🇩🇰', role: '2× champion and Pogačar\'s fiercest rival. Won\'t give up the polka-dot without a war.' },
                { name: 'Remco Evenepoel', team: 'Soudal Quick-Step', flag: '🇧🇪', role: 'World champion and Olympic TT gold medallist stepping up his Tour ambitions.' },
                { name: 'Carlos Rodríguez', team: 'INEOS Grenadiers', flag: '🇪🇸', role: 'Young Spanish climber with the legs and the team to challenge on any summit finish.' },
              ].map((r) => (
                <div key={r.name} className="tdf-rider-card">
                  <div className="tdf-rider-flag">{r.flag}</div>
                  <div className="tdf-rider-info">
                    <div className="tdf-rider-name">{r.name}</div>
                    <div className="tdf-rider-team">{r.team}</div>
                    <p className="tdf-rider-role">{r.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PAST CHAMPIONS ── */}
        <section className="tdf-section">
          <div className="tdf-section-inner">
            <div className="tdf-section-eyebrow">History</div>
            <h2 className="tdf-section-title">Recent Champions</h2>
            <div className="tdf-champs-list">
              {PAST_CHAMPIONS.map((c) => (
                <div key={c.year} className="tdf-champ-row">
                  <span className="tdf-champ-year">{c.year}</span>
                  <span className="tdf-champ-flag">{c.country}</span>
                  <span className="tdf-champ-name">{c.rider}</span>
                  <span className="tdf-champ-nation">{c.flag}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CYCLING MOVIES ── */}
        {movies.length > 0 && (
          <section className="tdf-section tdf-section-dark">
            <div className="tdf-section-inner">
              <div className="tdf-section-eyebrow">Watch While You Follow Le Tour</div>
              <h2 className="tdf-section-title">Cycling Films & Docs</h2>
              <div className="tdf-movies-grid">
                {movies.map((m) => (
                  <Link
                    key={m.id}
                    href={`/movie/${m.id}`}
                    className="tdf-movie-card"
                  >
                    {m.poster_path ? (
                      <Image
                        src={`https://image.tmdb.org/t/p/w342${m.poster_path}`}
                        alt={m.title}
                        width={180}
                        height={270}
                        style={{ objectFit: 'cover', width: '100%', height: 'auto', borderRadius: '8px' }}
                      />
                    ) : (
                      <div className="tdf-movie-no-poster">{m.title[0]}</div>
                    )}
                    <div className="tdf-movie-title">{m.title}</div>
                    {m.release_date && (
                      <div className="tdf-movie-year">{m.release_date.slice(0, 4)}</div>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── WHERE TO WATCH ── */}
        <div className="tdf-watch-bar">
          <div className="tdf-watch-inner">
            <div>
              <div className="tdf-watch-title">Watch Le Tour live in the USA</div>
              <div className="tdf-watch-sub">NBC Sports, Peacock, and FloBikes carry every stage</div>
            </div>
            <div className="tdf-watch-links">
              <a href="https://www.peacocktv.com" target="_blank" rel="noopener noreferrer" className="tdf-btn-sm">
                Peacock ↗
              </a>
              <a href="https://www.flobikes.com" target="_blank" rel="noopener noreferrer" className="tdf-btn-sm tdf-btn-sm-ghost">
                FloBikes ↗
              </a>
            </div>
          </div>
        </div>

        {/* ── RELATED ── */}
        <section className="tdf-section">
          <div className="tdf-section-inner">
            <div className="tdf-section-eyebrow">More Live Coverage</div>
            <h2 className="tdf-section-title">Also on Klick.stream</h2>
            <div className="tdf-related-links">
              <Link href="/worldcup" className="tdf-related-card tdf-related-wc">
                <span className="tdf-related-emoji">⚽</span>
                <div>
                  <div className="tdf-related-name">FIFA World Cup 2026</div>
                  <div className="tdf-related-sub">Live now · USA · Canada · Mexico</div>
                </div>
              </Link>
              <Link href="/tv" className="tdf-related-card tdf-related-tv">
                <span className="tdf-related-emoji">📺</span>
                <div>
                  <div className="tdf-related-name">TV Shows Hub</div>
                  <div className="tdf-related-sub">Trending series, what's airing today</div>
                </div>
              </Link>
              <Link href="/discover" className="tdf-related-card tdf-related-disc">
                <span className="tdf-related-emoji">🎬</span>
                <div>
                  <div className="tdf-related-name">Discover Movies</div>
                  <div className="tdf-related-sub">50,000+ titles to explore</div>
                </div>
              </Link>
            </div>
          </div>
        </section>

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
        CYCLING_MOVIE_IDS.map((id) =>
          fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`)
            .then((r) => r.json())
        )
      );
      movies = results
        .filter((r) => r.status === 'fulfilled' && r.value?.id)
        .map((r) => ({
          id: r.value.id,
          title: r.value.title,
          poster_path: r.value.poster_path || null,
          release_date: r.value.release_date || null,
          overview: r.value.overview || '',
        }));
    } catch (err) {
      console.error('Tour de France SSG error:', err);
    }
  }

  return {
    props: { movies },
    revalidate: 86400,
  };
}
