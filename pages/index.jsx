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
import dynamic from 'next/dynamic';
import { useAuth } from '../components/useAuth';

const AuthModal = dynamic(() => import('../components/AuthModal'), { ssr: false });

const HOME_ARTICLES = [
  {
    href: '/articles/best-tv-shows-streaming-june-2026',
    category: 'Streaming Guide',
    title: 'Best TV Shows to Watch Right Now — June 2026',
    excerpt: 'Severance Season 2, The Last of Us Season 2, and Andor Season 2 lead an exceptional month for TV. Plus The Bear, Tulsa King, and the best new limited series hitting Netflix and Max right now.',
    date: 'Jun 17, 2026',
    author: 'J., Editor-in-Chief',
    readTime: '8 min',
  },
  {
    href: '/articles/best-sci-fi-movies-streaming-2026',
    category: 'Genre Guide',
    title: 'Best Sci-Fi Movies Streaming Right Now — 2026 Guide',
    excerpt: 'From Dune: Part Two to Arrival, Annihilation, and the entire Alien franchise — our ranked guide to the best science fiction you can stream tonight across every platform.',
    date: 'Jun 12, 2026',
    author: 'Editorial Team',
    readTime: '9 min',
  },
  {
    href: '/articles/summer-blockbusters-2026-where-to-watch',
    category: 'Preview',
    title: 'Summer Blockbusters 2026 — Full Preview & Streaming Dates',
    excerpt: 'Superman, The Fantastic Four, Mission: Impossible – The Final Reckoning, and Jurassic World Rebirth. Every major summer 2026 release with expected streaming arrival dates.',
    date: 'Jun 8, 2026',
    author: 'J., Editor-in-Chief',
    readTime: '11 min',
  },
  {
    href: '/articles/best-action-movies-streaming-2026',
    category: 'Genre Guide',
    title: 'Best Action Movies on Netflix, Prime & Max Right Now',
    excerpt: 'Mad Max: Fury Road, John Wick 4, Extraction 2, and the complete Mission: Impossible series — our curated picks for the best action films streaming across every major platform.',
    date: 'Jun 5, 2026',
    author: 'Editorial Team',
    readTime: '8 min',
  },
  {
    href: '/articles/what-to-watch-this-weekend-june-20',
    category: 'Weekend Picks',
    title: 'What to Watch This Weekend — June 20–22 Picks',
    excerpt: 'Short on time? Our editors picked one film for Friday night, one for Saturday, and a hidden gem for Sunday. No browsing required — just press play.',
    date: 'Jun 19, 2026',
    author: 'Editorial Team',
    readTime: '4 min',
  },
  {
    href: '/articles/best-documentaries-streaming-2026',
    category: 'Genre Guide',
    title: 'Best Documentaries Streaming Right Now — 2026 List',
    excerpt: 'From true crime to music docs and nature epics — our ranked guide to the 20 best documentaries currently on Netflix, Prime, Apple TV+, and Max. Updated monthly.',
    date: 'Jun 3, 2026',
    author: 'Editorial Team',
    readTime: '7 min',
  },

  {
    href: '/articles/new-movies-streaming-this-week',
    category: 'Weekly Roundup',
    title: 'New Movies Streaming This Week — June 2026',
    excerpt: 'Every new movie hitting Netflix, Prime Video, Disney+, Apple TV+, and more this week. Updated every Monday with honest picks, hidden gems, and where to find them. This week: Sinners on Prime, Lilo & Stitch in theaters, and The Studio Season 2 on Apple TV+.',
    date: 'Jun 16, 2026',
    author: 'J., Editor-in-Chief',
    readTime: '6 min',
  },
  {
    href: '/articles/best-movies-netflix-june-2026',
    category: 'Streaming Guide',
    title: "Best Movies on Netflix Right Now — June 2026 Editor's Picks",
    excerpt: 'The Woman in the Yard, Companion, and Presence headline a strong month. Plus 12 catalogue gems our editors recommend watching before they leave.',
    date: 'Jun 1, 2026',
    author: 'Editorial Team',
    readTime: '9 min',
  },
  {
    href: '/articles/best-movies-prime-video-june-2026',
    category: 'Streaming Guide',
    title: "Best on Prime Video — June 2026 Editor's Picks",
    excerpt: 'Sinners finally arrives on streaming. Plus Conclave, Wolf Man, No Country for Old Men, and Hereditary — all reviewed with honest ratings and streaming context.',
    date: 'Jun 1, 2026',
    author: 'Editorial Team',
    readTime: '8 min',
  },
  {
    href: '/articles/best-movies-disney-plus-june-2026',
    category: 'Streaming Guide',
    title: "Best Movies on Disney+ — June 2026 Editor's Picks",
    excerpt: 'Inside Out 2, Moana 2, and the Deadpool & Wolverine extended cut lead a strong month. Plus our deep-cut picks from the Pixar and Marvel back catalogue worth revisiting.',
    date: 'Jun 1, 2026',
    author: 'Editorial Team',
    readTime: '7 min',
  },
  {
    href: '/articles/best-movies-2026-so-far',
    category: 'Best Of',
    title: 'Best Movies of 2026 So Far — Our Midyear Ranking',
    excerpt: 'Sinners, One Battle After Another, Novocaine, Black Bag, and A Complete Unknown — our ranked guide to the strongest films through June, with where to stream each one.',
    date: 'Jun 10, 2026',
    author: 'J., Editor-in-Chief',
    readTime: '10 min',
  },
  {
    href: '/articles/best-horror-movies-2026',
    category: 'Best Of',
    title: 'Best Horror Movies of 2026 So Far — Ranked & Reviewed',
    excerpt: 'From Blumhouse slow-burns to franchise revivals: our ranked list of the scariest and best-reviewed horror films of 2026, with where to stream each one.',
    date: 'May 28, 2026',
    author: 'Editorial Team',
    readTime: '7 min',
  },
  {
    href: '/articles/best-thriller-movies-2026',
    category: 'Best Of',
    title: 'Best Thriller Movies of 2026 — Our Ranked Guide',
    excerpt: 'Edge-of-your-seat picks across psychological thrillers, crime dramas, and espionage films from this year\'s strongest releases. With streaming info for each.',
    date: 'May 14, 2026',
    author: 'Editorial Team',
    readTime: '7 min',
  },
  {
    href: '/oscars-2026',
    category: 'Awards',
    title: 'Oscars 2026 — All Winners From the 98th Academy Awards',
    excerpt: 'One Battle After Another won Best Picture and Best Director for Paul Thomas Anderson. Michael B. Jordan made history with 16 nominations. Here are all the winners.',
    date: 'Mar 15, 2026',
    author: 'J., Editor-in-Chief',
    readTime: '12 min',
  },
  {
    href: '/articles/emmy-awards-2026-preview',
    category: 'Awards',
    title: 'Emmy Awards 2026 — Predictions for Every Major Category',
    excerpt: 'The 78th Emmys air in September. Severance is the Drama frontrunner, The Bear dominates Comedy, and Zendaya chases a third prize for Euphoria.',
    date: 'May 8, 2026',
    author: 'J., Editor-in-Chief',
    readTime: '5 min',
  },
];

const GENRE_DESCRIPTIONS = {
  28:    'Blockbusters, martial arts, and high-octane set pieces.',
  35:    'Sharp wit, slapstick, and the best romantic comedies.',
  18:    'Character studies, life stories, and emotional narratives.',
  27:    'Slashers, supernatural scares, and psychological chillers.',
  878:   'Space opera, dystopias, and speculative futures.',
  53:    'Edge-of-your-seat suspense from crime to espionage.',
  10749: 'Love stories across every era and every continent.',
  16:    'Pixar, Studio Ghibli, and adult animation for all ages.',
  80:    'Mob sagas, heist films, and true crime dramas.',
  36:    'Biopics, period pieces, and grand historical epics.',
  14:    'Swords, sorcery, and mythological adventures.',
  12:    'Bold journeys to remote frontiers and outer space.',
};

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

const BB_PICKS = [
  { slug: 'sinners-2025', title: 'Sinners', genre: 'Horror', accent: '#b5362a', tagline: 'Some sins can never be washed clean.', img: 'https://image.tmdb.org/t/p/w500/qTvFWCGeGXgBRaINLY1zqgTPSpn.jpg' },
  { slug: 'superman-2025', title: 'Superman', genre: 'Superhero', accent: '#3a7ae8', tagline: 'Truth. Justice. A better tomorrow.', img: 'https://image.tmdb.org/t/p/w500/oe5TVF6GQDESLsGiFrN6GyJEekh.jpg' },
  { slug: 'mission-impossible-final-reckoning-2025', title: 'Mission: Impossible – The Final Reckoning', genre: 'Action', accent: '#d44020', tagline: 'Every mission has a price. This is the final one.', img: 'https://image.tmdb.org/t/p/w500/z53D72EAOxGRqdr7KXXWp9dJiDe.jpg' },
];
const SCENE_PICKS = [
  { slug: 'ill-be-back-terminator', title: "I'll Be Back", movie: 'The Terminator', category: 'Action', image: 'https://image.tmdb.org/t/p/w500/qvktm0BHcnmDpul4Hz01GIazWPr.jpg' },
  { slug: 'heres-looking-at-you-casablanca', title: "Here's Looking at You, Kid", movie: 'Casablanca', category: 'Romance', image: 'https://image.tmdb.org/t/p/w500/5K7cOHoay2mZusSLezBOY0Qxh8a.jpg' },
  { slug: 'bullet-time-matrix', title: 'The Bullet Time', movie: 'The Matrix', category: 'Sci-Fi', image: 'https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg' },
  { slug: 'i-am-your-father-empire-strikes-back', title: 'I Am Your Father', movie: 'The Empire Strikes Back', category: 'Drama', image: 'https://image.tmdb.org/t/p/w500/nNAeTmF4CtdSgMDplXTDPOpYzsX.jpg' },
];
const PLATFORMS = [
  { name: 'Netflix', id: 8, color: '#E50914', letter: 'N' },
  { name: 'Prime Video', id: 119, color: '#00A8E0', letter: 'P' },
  { name: 'Disney+', id: 337, color: '#1139a0', letter: 'D+' },
  { name: 'Apple TV+', id: 350, color: '#555', letter: '⧖' },
  { name: 'Max', id: 1899, color: '#0022ff', letter: 'M' },
  { name: 'Hulu', id: 15, color: '#1CE783', letter: 'H' },
  { name: 'Peacock', id: 386, color: '#F4A61A', letter: '🦚' },
  { name: 'Paramount+', id: 531, color: '#1565c0', letter: 'P+' },
];
const STAFF_PICKS = [
  { id: 1160018, title: 'Sinners', reason: "The thriller of the year — Ryan Coogler at his absolute peak.", poster: 'https://image.tmdb.org/t/p/w342/qTvFWCGeGXgBRaINLY1zqgTPSpn.jpg', year: '2025' },
  { id: 762509, title: 'Mufasa: The Lion King', reason: "Surprisingly emotional. Barry Jenkins brings a warmth the original didn't expect.", poster: 'https://image.tmdb.org/t/p/w342/qBErSzgwRhVMKhoBjFAJkLCpqRc.jpg', year: '2024' },
  { id: 1064213, title: 'The Substance', reason: "Body horror that actually says something. Demi Moore is extraordinary.", poster: 'https://image.tmdb.org/t/p/w342/lqoMzCcZYEFK729d6qzt349fB4o.jpg', year: '2024' },
];
const LEAVING_SOON = [
  { id: 155,    title: 'The Dark Knight',        year: '2008', platform: 'Netflix',     platformColor: '#E50914', leaveDate: 'Jun 30 2026' },
  { id: 27205,  title: 'Inception',              year: '2010', platform: 'Netflix',     platformColor: '#E50914', leaveDate: 'Jun 30 2026' },
  { id: 546554, title: 'Knives Out',             year: '2019', platform: 'Netflix',     platformColor: '#E50914', leaveDate: 'Jul 1 2026' },
  { id: 157336, title: 'Interstellar',           year: '2014', platform: 'Prime Video', platformColor: '#00A8E0', leaveDate: 'Jul 1 2026' },
  { id: 6977,   title: 'No Country for Old Men', year: '2007', platform: 'Prime Video', platformColor: '#00A8E0', leaveDate: 'Jun 25 2026' },
  { id: 493922, title: 'Hereditary',             year: '2018', platform: 'Prime Video', platformColor: '#00A8E0', leaveDate: 'Jun 25 2026' },
];

export default function Home({ featuredMovie, nowPlaying, popular, genres, celebrities, tvTrending, onNetflix, onPrime, upcoming, topRated, leavingSoon = [] }) {
  const { language } = useLanguage();
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const revealRef = useScrollReveal();
  const heroRef = useRef(null);
  const [heroTrailerKey, setHeroTrailerKey] = useState(featuredMovie?.trailerKey || null);
  const [showAuth, setShowAuth] = useState(false);
  const [news, setNews] = useState([]);
  const [newsLoading, setNewsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/news?limit=9')
      .then((r) => r.json())
      .then((data) => setNews(data.articles || []))
      .catch(() => {})
      .finally(() => setNewsLoading(false));
  }, []);

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

  const [topMovie, ...restMovies] = (popular || []);
  const displayGenres = (genres || []).slice(0, 8);
  const genreMap = (genres || []).reduce((acc, g) => { acc[g.id] = g.name; return acc; }, {});

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
            <p className="hero-overview">{
              featuredMovie.overview.length > 200
                ? featuredMovie.overview.slice(0, featuredMovie.overview.lastIndexOf(' ', 200)) + '…'
                : featuredMovie.overview
            }</p>
          )}
          <div className="hero-actions">
            {!authLoading && !user && (
              <div className="hero-join-wrap">
                <button className="btn-hero-primary" onClick={() => setShowAuth(true)}>
                  Join Free — Save Watchlists
                </button>
                <span className="hero-join-benefit">Track films · Build watchlists · Always free</span>
              </div>
            )}
            <Link href="/discover" className="btn-hero-ghost">
              Browse All Films →
            </Link>
            {featuredMovie && heroTrailerKey && (
              <Link href={`/trailers?play=${featuredMovie.id}`} className="btn-hero-trailer">
                <svg width="12" height="12" fill="currentColor" viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3" /></svg>
                Trailer
              </Link>
            )}
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

      {/* ── STATS BAR ── */}
      <div className="stats-bar">
        <div className="stat-item"><div className="stat-num">50K+</div><div className="stat-label">Films &amp; Series</div></div>
        <div className="stat-item"><div className="stat-num">40+</div><div className="stat-label">Streaming Platforms</div></div>
        <div className="stat-item"><div className="stat-num">10K+</div><div className="stat-label">Trailers</div></div>
        <div className="stat-item"><div className="stat-num">100%</div><div className="stat-label">Free, Always</div></div>
      </div>

      {/* ── WHAT'S STREAMING THIS WEEK ── */}
      <section className="home-streaming-blurb reveal">
        <div className="home-blurb-inner">
          <div className="home-blurb-meta">
            <span className="section-tag">Updated Weekly</span>
            <span className="home-blurb-date">Week of June 16, 2026</span>
          </div>
          <h2 className="home-blurb-heading">What&rsquo;s Streaming This Week</h2>
          <p className="home-blurb-body">
            The biggest streaming arrival this week is Ryan Coogler&rsquo;s <strong>Sinners</strong>, now on Prime Video after a record-breaking theatrical run. The supernatural thriller stars Michael B. Jordan in a dual role and is the most acclaimed film of 2026 — essential viewing for anyone who hasn&rsquo;t caught it yet. On Netflix, <strong>The Woman in the Yard</strong> delivers tense domestic horror directed by Roadrunner&rsquo;s Morgan Neville, while <strong>Lilo &amp; Stitch</strong> lands on Disney+ following its record theatrical debut. Apple TV+ adds <strong>The Studio</strong>, Seth Rogen&rsquo;s sharp Hollywood satire that has become one of the best shows of the year. In theaters, the summer season is peaking with <strong>Superman</strong> and <strong>Mission: Impossible &mdash; The Final Reckoning</strong> competing for the weekend box office crown.
          </p>
          <Link href="/articles/new-movies-streaming-this-week" className="home-blurb-link">
            Full Weekly Streaming Guide →
          </Link>
        </div>
      </section>

      {/* ── LATEST NEWS ── */}
      {(newsLoading || news.length > 0) && (
        <section className="home-section">
          <div className="section-header reveal">
            <div>
              <div className="section-tag news-tag">● Live</div>
              <h2 className="section-title">Latest <em>News</em></h2>
            </div>
          </div>
          <div className={`news-grid reveal${newsLoading ? ' news-grid--loading' : ''}`}>
            {newsLoading
              ? [...Array(9)].map((_, i) => <div key={i} className="news-skeleton" />)
              : news.map((item, i) => (
                  <a key={i} href={item.link} target="_blank" rel="noopener noreferrer" className="news-card">
                    <div className="news-card-source">{item.source}</div>
                    <div className="news-card-title">{item.title}</div>
                    {item.description && <div className="news-card-desc">{item.description}</div>}
                    {item.date && (
                      <div className="news-card-date">
                        {new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </div>
                    )}
                  </a>
                ))}
          </div>
        </section>
      )}

      {/* ── LATEST ARTICLES ── */}
      <section className="home-section">
        <div className="section-header reveal">
          <div>
            <div className="section-tag">Editorial</div>
            <h2 className="section-title">From the <em>Blog</em></h2>
          </div>
          <Link href="/blog" className="see-all">All Articles →</Link>
        </div>

        {/* Featured hero article */}
        <Link href={HOME_ARTICLES[0].href} className="home-article-hero reveal">
          <div className="home-article-hero-meta">
            <span className="home-article-category">{HOME_ARTICLES[0].category}</span>
            {HOME_ARTICLES[0].readTime && (
              <span className="home-article-read-time">{HOME_ARTICLES[0].readTime} read</span>
            )}
          </div>
          <h3 className="home-article-hero-title">{HOME_ARTICLES[0].title}</h3>
          <p className="home-article-hero-excerpt">{HOME_ARTICLES[0].excerpt}</p>
          <div className="home-article-byline">
            {HOME_ARTICLES[0].author && <span className="home-article-author">{HOME_ARTICLES[0].author}</span>}
            {HOME_ARTICLES[0].date && <span className="home-article-date">{HOME_ARTICLES[0].date}</span>}
          </div>
          <span className="home-article-cta">Read Full Guide →</span>
        </Link>

        {/* 3×3 grid of remaining articles */}
        <div className="home-articles-grid reveal">
          {HOME_ARTICLES.slice(1).map((a) => (
            <Link key={a.href} href={a.href} className="home-article-card">
              <div className="home-article-card-meta">
                <span className="home-article-category">{a.category}</span>
                {a.readTime && <span className="home-article-read-time">{a.readTime}</span>}
              </div>
              <h3 className="home-article-title">{a.title}</h3>
              <p className="home-article-excerpt">{a.excerpt}</p>
              {(a.date || a.author) && (
                <div className="home-article-byline">
                  {a.author && <span className="home-article-author">{a.author}</span>}
                  {a.date && <span className="home-article-date">{a.date}</span>}
                </div>
              )}
              <span className="home-article-cta">Read more →</span>
            </Link>
          ))}
        </div>

        <div className="home-articles-footer reveal">
          <Link href="/blog" className="home-articles-cta-btn">Read the Blog →</Link>
        </div>
      </section>

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
          <p className="theaters-intro reveal">
            June&rsquo;s theatrical slate is one of the strongest in recent memory. <strong>Sinners</strong> continues its acclaimed run after six weeks, while new blockbusters including <strong>Superman</strong>, <strong>Mission: Impossible &mdash; The Final Reckoning</strong>, and <strong>Jurassic World Rebirth</strong> are drawing record summer crowds. Here&rsquo;s what&rsquo;s worth catching on the big screen right now.
          </p>
          <div className="reveal">
            <HScrollRow>
              {nowPlaying.map((movie) => (
                <div key={movie.id} className="hscroll-card">
                  <MovieCard movie={movie} genreMap={genreMap} onWatchTrailer={() => router.push(`/trailers?play=${movie.id}`)} />
                </div>
              ))}
            </HScrollRow>
          </div>
        </section>
      )}

      {/* ── TRENDING TV ── */}
      {tvTrending.length > 0 && (
        <section className="home-section">
          <div className="section-header reveal">
            <div>
              <div className="section-tag">Binge-Worthy</div>
              <h2 className="section-title">📺 Trending <em>TV This Week</em></h2>
            </div>
            <Link href="/tv" className="see-all">See All →</Link>
          </div>
          <div className="reveal">
            <HScrollRow>
              {tvTrending.map((show) => (
                <div key={show.id} className="hscroll-card">
                  <MovieCard movie={show} genreMap={genreMap} onWatchTrailer={() => router.push(`/tv/${show.id}`)} />
                </div>
              ))}
            </HScrollRow>
          </div>
        </section>
      )}

      {/* ── NEW ON NETFLIX ── */}
      {onNetflix.length > 0 && (
        <section className="home-section">
          <div className="section-header reveal">
            <div>
              <div className="section-tag" style={{ color: '#E50914' }}>Netflix</div>
              <h2 className="section-title">New on <em>Netflix</em></h2>
            </div>
            <Link href="/discover?platform=netflix" className="see-all">See All →</Link>
          </div>
          <div className="reveal">
            <HScrollRow>
              {onNetflix.map((movie) => (
                <div key={movie.id} className="hscroll-card">
                  <MovieCard movie={movie} genreMap={genreMap} onWatchTrailer={() => router.push(`/trailers?play=${movie.id}`)} />
                </div>
              ))}
            </HScrollRow>
          </div>
        </section>
      )}

      {/* ── NEW ON PRIME VIDEO ── */}
      {onPrime.length > 0 && (
        <section className="home-section">
          <div className="section-header reveal">
            <div>
              <div className="section-tag" style={{ color: '#00A8E0' }}>Prime Video</div>
              <h2 className="section-title">New on <em>Prime Video</em></h2>
            </div>
            <Link href="/discover?platform=prime" className="see-all">See All →</Link>
          </div>
          <div className="reveal">
            <HScrollRow>
              {onPrime.map((movie) => (
                <div key={movie.id} className="hscroll-card">
                  <MovieCard movie={movie} genreMap={genreMap} onWatchTrailer={() => router.push(`/trailers?play=${movie.id}`)} />
                </div>
              ))}
            </HScrollRow>
          </div>
        </section>
      )}

      {/* ── LEAVING SOON ── */}
      {leavingSoon.length > 0 && (
        <section className="home-section">
          <div className="section-header reveal">
            <div>
              <div className="section-tag leaving-tag">⏳ Last Chance</div>
              <h2 className="section-title">Leaving <em>Soon</em></h2>
            </div>
            <Link href="/articles/best-movies-netflix-june-2026" className="see-all">Streaming Guides →</Link>
          </div>
          <div className="leaving-grid reveal">
            {leavingSoon.map((item) => (
              <Link key={item.id} href={`/movies/${item.id}`} className="leaving-card">
                <div className="leaving-card-poster">
                  {item.poster_path ? (
                    <Image
                      src={`https://image.tmdb.org/t/p/w342${item.poster_path}`}
                      alt={item.title}
                      fill
                      sizes="(max-width: 600px) 120px, 140px"
                      style={{ objectFit: 'cover' }}
                    />
                  ) : (
                    <div className="leaving-card-placeholder">{item.title[0]}</div>
                  )}
                  <div className="leaving-card-platform" style={{ background: item.platformColor }}>
                    {item.platform}
                  </div>
                </div>
                <div className="leaving-card-info">
                  <div className="leaving-card-title">{item.title}</div>
                  <div className="leaving-card-year">{item.year}</div>
                  <div className={`leaving-card-countdown${item.daysLeft <= 3 ? ' leaving-card-countdown--urgent' : ''}`}>
                    {item.daysLeft === 0 ? 'Leaving today' : item.daysLeft === 1 ? 'Leaving tomorrow' : `${item.daysLeft} days left`}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ── EARLY JOIN NUDGE ── */}
      {!authLoading && !user && (
        <div className="home-early-join reveal">
          <span className="home-early-join-text">Save watchlists, track what you&rsquo;ve seen &amp; get personalised picks.</span>
          <button className="home-early-join-btn" onClick={() => setShowAuth(true)}>Create Free Account →</button>
        </div>
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
                    <h3 className="trending-rest-title">{movie.title}</h3>
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

      {/* ── PREMIUM UPSELL SLIM BANNER ── */}
      <Link href="/premium" className="premium-slim-banner">
        <span className="premium-slim-icon">✦</span>
        <span className="premium-slim-text">Browse ad-free from <strong>$0.99/mo</strong> — try Premium</span>
        <span className="premium-slim-cta">Try Premium →</span>
      </Link>

      {/* ── LIVE & EVENTS ── */}
      <section className="home-section" style={{ paddingBottom: 0 }}>
        <div className="section-header">
          <div>
            <div className="section-tag">Happening Now</div>
            <h2 className="section-title">Live <em>&amp; Events</em></h2>
          </div>
        </div>
      </section>
      <Link href="/worldcup" className="worldcup-banner">
        <div className="worldcup-banner-bg" aria-hidden="true">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="wc-hex" style={{ '--i': i }} />
          ))}
        </div>
        <div className="worldcup-banner-inner">
          <div className="worldcup-banner-left">
            <span className="wc-live-badge"><span className="wc-live-dot" />Live Now</span>
            <div className="worldcup-banner-trophy" aria-hidden="true">⚽</div>
          </div>
          <div className="worldcup-banner-center">
            <div className="worldcup-banner-eyebrow">FIFA World Cup 2026™</div>
            <div className="worldcup-banner-title">USA · Canada · Mexico</div>
            <div className="worldcup-banner-sub">48 nations · 104 matches · June 11 – July 19, 2026</div>
          </div>
          <div className="worldcup-banner-cta">Full Coverage →</div>
        </div>
      </Link>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 24px 16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
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

      {/* ── TRAILERS TEASER ── */}
      {nowPlaying.length > 0 && (
        <section className="home-section">
          <div className="section-header reveal">
            <div>
              <div className="section-tag">Watch Now</div>
              <h2 className="section-title">🎬 New <em>Trailers This Week</em></h2>
            </div>
            <Link href="/trailers" className="see-all">All Trailers →</Link>
          </div>
          <div className="trailers-teaser-grid reveal">
            {nowPlaying.slice(0, 4).map((movie) => (
              <Link key={movie.id} href={`/trailers?play=${movie.id}`} className="trailer-teaser-card">
                {movie.backdrop_path ? (
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                    alt={movie.title}
                    fill
                    sizes="(max-width:768px) 50vw, 25vw"
                    style={{ objectFit: 'cover' }}
                  />
                ) : (
                  <div className="trailer-teaser-placeholder" />
                )}
                <div className="trailer-teaser-overlay">
                  <div className="trailer-teaser-play">
                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3" /></svg>
                  </div>
                  <div className="trailer-teaser-info">
                    <div className="trailer-teaser-title">{movie.title}</div>
                    {movie.release_date && <div className="trailer-teaser-year">{movie.release_date.split('-')[0]}</div>}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ── COMING SOON ── */}
      {upcoming.length > 0 && (
        <section className="home-section">
          <div className="section-header reveal">
            <div>
              <div className="section-tag">Opening Soon</div>
              <h2 className="section-title">Most <em>Anticipated</em></h2>
            </div>
            <Link href="/trailers?tab=upcoming" className="see-all">All Upcoming →</Link>
          </div>
          <div className="reveal">
            <HScrollRow>
              {upcoming.map((movie) => (
                <div key={movie.id} className="hscroll-card hscroll-card--upcoming">
                  <div className="upcoming-date-badge">
                    {movie.release_date ? new Date(movie.release_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'Soon'}
                  </div>
                  <MovieCard movie={movie} genreMap={genreMap} onWatchTrailer={() => router.push(`/trailers?play=${movie.id}`)} />
                </div>
              ))}
            </HScrollRow>
          </div>
        </section>
      )}

      {/* ── TOP RATED CLASSICS ── */}
      {topRated.length > 0 && (
        <section className="home-section">
          <div className="section-header reveal">
            <div>
              <div className="section-tag">All Time</div>
              <h2 className="section-title">Certified <em>Classics</em></h2>
            </div>
            <Link href="/discover?sort=vote_average.desc&vote_count.gte=5000" className="see-all">See All →</Link>
          </div>
          <div className="reveal">
            <HScrollRow>
              {topRated.map((movie) => (
                <div key={movie.id} className="hscroll-card">
                  <MovieCard movie={movie} genreMap={genreMap} onWatchTrailer={() => router.push(`/trailers?play=${movie.id}`)} />
                </div>
              ))}
            </HScrollRow>
          </div>
        </section>
      )}

      {/* ── BLOCKBUSTER REVIEWS ── */}
      <section className="home-section">
        <div className="section-header reveal">
          <div>
            <div className="section-tag">Editorial</div>
            <h2 className="section-title">🎬 In-Depth <em>Film Reviews</em></h2>
          </div>
          <Link href="/blockbuster" className="see-all">All Reviews →</Link>
        </div>
        <div className="bb-teaser-grid reveal">
          {BB_PICKS.map((film) => (
            <Link key={film.slug} href={`/blockbuster/${film.slug}.html`} className="bb-teaser-card">
              <Image src={film.img} alt={film.title} fill sizes="(max-width:768px) 100vw, 33vw" style={{ objectFit: 'cover' }} />
              <div className="bb-teaser-overlay">
                <span className="bb-teaser-genre" style={{ color: film.accent, background: `${film.accent}25` }}>{film.genre}</span>
                <div className="bb-teaser-info">
                  <h3 className="bb-teaser-title">{film.title}</h3>
                  <p className="bb-teaser-tagline">{film.tagline}</p>
                  <span className="bb-teaser-cta">Read Review →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── ICONIC SCENES ── */}
      <section className="home-section">
        <div className="section-header reveal">
          <div>
            <div className="section-tag">Cinema History</div>
            <h2 className="section-title">🎞 Iconic <em>Movie Scenes</em></h2>
          </div>
          <Link href="/scenes" className="see-all">Explore All →</Link>
        </div>
        <div className="scenes-teaser-grid reveal">
          {SCENE_PICKS.map((scene) => (
            <Link key={scene.slug} href={`/scenes/${scene.slug}`} className="scene-teaser-card">
              <Image src={scene.image} alt={`${scene.title} — ${scene.movie}`} fill sizes="(max-width:768px) 50vw, 25vw" style={{ objectFit: 'cover' }} />
              <div className="scene-teaser-overlay">
                <span className="scene-teaser-cat">{scene.category}</span>
                <div className="scene-teaser-info">
                  <div className="scene-teaser-title">&ldquo;{scene.title}&rdquo;</div>
                  <div className="scene-teaser-movie">{scene.movie}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── BROWSE BY PLATFORM ── */}
      <section className="home-section">
        <div className="section-header reveal">
          <div>
            <div className="section-tag">I Have…</div>
            <h2 className="section-title">Browse by <em>Platform</em></h2>
          </div>
          <Link href="/discover" className="see-all">All Platforms →</Link>
        </div>
        <div className="platform-grid reveal">
          {PLATFORMS.map((p) => (
            <Link key={p.id} href={`/discover?provider=${p.id}`} className="platform-tile" style={{ '--p-color': p.color }}>
              <span className="platform-tile-logo" style={{ background: p.color }}>{p.letter}</span>
              <span className="platform-tile-name">{p.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── STAFF PICKS ── */}
      <section className="home-section">
        <div className="section-header reveal">
          <div>
            <div className="section-tag">Editors&rsquo; Choice</div>
            <h2 className="section-title">Staff <em>Picks</em></h2>
          </div>
        </div>
        <div className="staff-picks-grid reveal">
          {STAFF_PICKS.map((pick) => (
            <Link key={pick.id} href={`/movies/${pick.id}`} className="staff-pick-card">
              {pick.poster && (
                <Image src={pick.poster} alt={pick.title} width={80} height={120} style={{ objectFit: 'cover', borderRadius: '6px', flexShrink: 0 }} />
              )}
              <div className="staff-pick-info">
                <div className="staff-pick-title">{pick.title} <span className="staff-pick-year">({pick.year})</span></div>
                <p className="staff-pick-reason">&ldquo;{pick.reason}&rdquo;</p>
                <span className="staff-pick-cta">Read more →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── EDITORIAL INTRO ── */}
      <section className="home-editorial-intro reveal">
        <div className="home-editorial-inner">
          <h2>What Is Klick.stream?</h2>
          <p>
            Klick.stream is a free, independent movie and TV discovery platform. We track 50,000+ films and series
            across Netflix, Prime Video, Apple TV+, Disney+, Max, Hulu, Peacock, and 35 more streaming services
            — so you always know exactly where to watch the film you&rsquo;re looking for, without paying for multiple
            app subscriptions just to check.
          </p>
          <p>
            Beyond listings, we publish original reviews, ranked lists, actor spotlights, and monthly
            streaming guides written by our editorial team. We cover awards season from the Golden Globes
            and BAFTAs through to the Oscars, and we update our picks daily as new films drop on every
            major platform.
          </p>
          <p>
            There are no paid placements, no algorithm-driven recommendations, and no subscription
            required. Just honest, editorial-led film coverage — completely free, and always will be.
          </p>

          <div className="home-how-it-works">
            <h3 className="home-how-heading">How It Works</h3>
            <div className="home-how-steps">
              <div className="home-how-step">
                <span className="home-how-num">01</span>
                <div className="home-how-text">
                  <strong>Search 50,000+ films &amp; series</strong>
                  <p>Find any movie or show by title, genre, cast member, mood, or streaming platform — all in one place.</p>
                </div>
              </div>
              <div className="home-how-step">
                <span className="home-how-num">02</span>
                <div className="home-how-text">
                  <strong>Find where it&rsquo;s streaming</strong>
                  <p>We track 40+ platforms in real time. No more Googling &ldquo;where can I watch X?&rdquo; — the answer is always here.</p>
                </div>
              </div>
              <div className="home-how-step">
                <span className="home-how-num">03</span>
                <div className="home-how-text">
                  <strong>Watch the trailer first</strong>
                  <p>Preview any film with embedded trailers before you commit to a two-hour watch. Every major release covered.</p>
                </div>
              </div>
              <div className="home-how-step">
                <span className="home-how-num">04</span>
                <div className="home-how-text">
                  <strong>Save to your watchlist</strong>
                  <p>Bookmark anything for later — your watchlist syncs across all your devices and is completely free to use.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="home-editorial-links">
            <Link href="/discover">Browse All Films →</Link>
            <Link href="/blog">Read the Blog →</Link>
            <Link href="/about">About Us →</Link>
          </div>
        </div>
      </section>

      {/* ── MOOD / VIBE ── */}
      <section className="home-section">
        <div className="section-header reveal">
          <div>
            <div className="section-tag">What Are You In the Mood For?</div>
            <h2 className="section-title">Find Films by <em>Vibe</em></h2>
          </div>
        </div>
        <div className="mood-row reveal">
          {[
            { label: '😂 Funny', q: 'genre=35' },
            { label: '😱 Scary', q: 'genre=27' },
            { label: '😊 Feel-Good', q: 'genre=10751' },
            { label: '🔥 Intense', q: 'genre=28' },
            { label: '💕 Romantic', q: 'genre=10749' },
            { label: '🚀 Sci-Fi', q: 'genre=878' },
            { label: '🔎 Thriller', q: 'genre=53' },
            { label: '🎨 Drama', q: 'genre=18' },
          ].map(({ label, q }) => (
            <Link key={q} href={`/discover?${q}`} className="mood-chip">{label}</Link>
          ))}
        </div>
      </section>

      {/* ── GENRE GRID ── */}
      {displayGenres.length > 0 && (
        <section className="home-section">
          <div className="section-header reveal">
            <div>
              <div className="section-tag">Explore</div>
              <h2 className="section-title">Browse by <em>Genre</em></h2>
            </div>
            <Link href="/discover" className="see-all">See All Genres →</Link>
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
                <div className="genre-card-text">
                  <div className="genre-name">{genre.name}</div>
                  {GENRE_DESCRIPTIONS[genre.id] && (
                    <div className="genre-desc">{GENRE_DESCRIPTIONS[genre.id]}</div>
                  )}
                </div>
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

      {/* ── JOIN CTA ── */}
      {!authLoading && !user && (
        <div className="home-join-cta reveal">
          <div className="home-join-inner">
            <div className="home-join-text">
              <div className="home-join-eyebrow">Free forever</div>
              <h2 className="home-join-heading">Your Personal <em>Film Hub</em></h2>
              <p className="home-join-sub">Save watchlists, track what you've seen, get personalised picks — no credit card needed.</p>
              <ul className="home-join-perks">
                <li><span>✓</span> Watchlist &amp; watch history</li>
                <li><span>✓</span> Personalised recommendations</li>
                <li><span>✓</span> Ad-free with Premium</li>
              </ul>
            </div>
            <div className="home-join-actions">
              <button className="home-join-btn" onClick={() => setShowAuth(true)}>
                Create Free Account
              </button>
              <button className="home-join-signin" onClick={() => setShowAuth(true)}>
                Already have an account? Sign in →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── AWARDS COVERAGE ── */}
      <section className="home-section">
        <div className="section-header reveal">
          <div>
            <div className="section-tag">Awards Season 2026</div>
            <h2 className="section-title">Awards <em>Coverage</em></h2>
          </div>
          <Link href="/oscars-2026" className="see-all">All Coverage →</Link>
        </div>
        <div className="home-awards-strip reveal">
          <div className="home-awards-inner">
            <div className="home-awards-text">
              <p>
                We tracked the 2026 awards season from the Critics&rsquo; Choice in January
                through the Golden Globes, BAFTAs, SAG Awards, and the 98th Academy Awards in
                March. <em>One Battle After Another</em> took Best Picture and Best Director for
                Paul Thomas Anderson. <em>Sinners</em> made history with 16 nominations and
                Michael B. Jordan&rsquo;s first Oscar. Read our complete coverage below.
              </p>
            </div>
            <div className="home-awards-links">
              <Link href="/oscars-2026" className="home-awards-link">
                <span className="home-awards-link-icon">🏆</span>
                <span>Oscars 2026 — All Winners</span>
              </Link>
              <Link href="/articles/bafta-2026-winners" className="home-awards-link">
                <span className="home-awards-link-icon">🎬</span>
                <span>BAFTA 2026 — All Winners</span>
              </Link>
              <Link href="/articles/golden-globes-2026-winners" className="home-awards-link">
                <span className="home-awards-link-icon">🌟</span>
                <span>Golden Globes 2026 — All Winners</span>
              </Link>
              <Link href="/articles/sag-awards-2026" className="home-awards-link">
                <span className="home-awards-link-icon">🎭</span>
                <span>SAG Awards 2026 — All Winners</span>
              </Link>
              <Link href="/articles/critics-choice-awards-2026" className="home-awards-link">
                <span className="home-awards-link-icon">✍️</span>
                <span>Critics&rsquo; Choice Awards 2026</span>
              </Link>
              <Link href="/articles/emmy-awards-2026-preview" className="home-awards-link">
                <span className="home-awards-link-icon">📺</span>
                <span>Emmy Awards 2026 — Preview</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER ── */}
      <div className="newsletter-section reveal">
        <h2>Never Miss a <em>New Release.</em></h2>
        <p>Weekly picks, streaming drops, and critical coverage — straight to your inbox.</p>
        <NewsletterSignup variant="inline" />
      </div>

      {showAuth && (
        <AuthModal onClose={() => setShowAuth(false)} defaultTab="signup" />
      )}
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
  let tvTrending = [];
  let onNetflix = [];
  let onPrime = [];
  let upcoming = [];
  let topRated = [];
  const nowMs = Date.now();
  let leavingSoon = LEAVING_SOON.map((item) => ({
    ...item,
    poster_path: null,
    daysLeft: Math.max(0, Math.ceil((new Date(item.leaveDate).getTime() - nowMs) / 86400000)),
  }));

  if (apiKey) {
    try {
      const [trendingRes, nowPlayingRes, popularRes, genresRes,
             tvRes, netflixRes, primeRes, upcomingRes, topRatedRes] = await Promise.allSettled([
        fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}&language=en-US`),
        fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&region=US&page=1`),
        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&region=US&page=1`),
        fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`),
        fetch(`https://api.themoviedb.org/3/trending/tv/week?api_key=${apiKey}&language=en-US`),
        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&with_watch_providers=8&watch_region=US&sort_by=popularity.desc&page=1`),
        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&with_watch_providers=119&watch_region=US&sort_by=popularity.desc&page=1`),
        fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US&region=US&page=1`),
        fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&region=US&page=1`),
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
        const highRated = withBackdrop.filter((m) => m.vote_average >= 7.0);
        const pool = highRated.length >= 3 ? highRated : withBackdrop;
        featuredMovie = pool.length > 0
          ? pool[Math.floor(Math.random() * Math.min(pool.length, 5))]
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
            genre_ids: m.genre_ids || [],
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

      if (tvRes.status === 'fulfilled') {
        const d = await tvRes.value.json();
        tvTrending = (d.results || []).slice(0, 8).map((m) => ({
          id: m.id, title: m.name || m.title, poster_path: m.poster_path,
          backdrop_path: m.backdrop_path, release_date: m.first_air_date || '',
          vote_average: m.vote_average || 0, overview: m.overview || '',
          genre_ids: m.genre_ids || [], media_type: 'tv',
        }));
      }
      const mapMovies = (results) => (results || []).filter((m) => m.original_language === 'en').slice(0, 8).map((m) => ({
        id: m.id, title: m.title, poster_path: m.poster_path,
        backdrop_path: m.backdrop_path, release_date: m.release_date || '',
        vote_average: m.vote_average || 0, overview: m.overview || '',
        genre_ids: m.genre_ids || [],
      }));
      if (netflixRes.status === 'fulfilled') { const d = await netflixRes.value.json(); onNetflix = mapMovies(d.results); }
      if (primeRes.status === 'fulfilled')   { const d = await primeRes.value.json();   onPrime   = mapMovies(d.results); }
      if (upcomingRes.status === 'fulfilled') {
        const d = await upcomingRes.value.json();
        upcoming = (d.results || []).filter((m) => m.original_language === 'en' && m.poster_path).slice(0, 8).map((m) => ({
          id: m.id, title: m.title, poster_path: m.poster_path,
          release_date: m.release_date || '', vote_average: m.vote_average || 0,
          overview: m.overview || '', genre_ids: m.genre_ids || [],
        }));
      }
      if (topRatedRes.status === 'fulfilled') { const d = await topRatedRes.value.json(); topRated = mapMovies(d.results); }

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

      const leavingPosterResults = await Promise.allSettled(
        LEAVING_SOON.map((item) =>
          fetch(`https://api.themoviedb.org/3/movie/${item.id}?api_key=${apiKey}&language=en-US`).then((r) => r.json())
        )
      );
      leavingSoon = LEAVING_SOON.map((item, i) => ({
        ...item,
        daysLeft: Math.max(0, Math.ceil((new Date(item.leaveDate).getTime() - nowMs) / 86400000)),
        poster_path: leavingPosterResults[i].status === 'fulfilled' ? (leavingPosterResults[i].value.poster_path || null) : null,
      }));
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
    props: { featuredMovie, nowPlaying, popular, genres, celebrities, tvTrending, onNetflix, onPrime, upcoming, topRated, leavingSoon },
    revalidate: 3600,
  };
}
