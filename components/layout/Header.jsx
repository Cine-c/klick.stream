import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { useWatchLater } from '../WatchLaterContext';
import { useAuth } from '../useAuth';
import { useLanguage, SUPPORTED_LANGUAGES } from '../LanguageContext';
import SearchBar from '../SearchBar';

const TOP_GENRES = [
  { id: 28, name: 'Action' },
  { id: 35, name: 'Comedy' },
  { id: 18, name: 'Drama' },
  { id: 27, name: 'Horror' },
  { id: 878, name: 'Sci-Fi' },
  { id: 53, name: 'Thriller' },
  { id: 10749, name: 'Romance' },
  { id: 16, name: 'Animation' },
];

const MOVIE_BROWSE = [
  { href: '/discover?tab=theaters', label: '🎬 In Theaters' },
  { href: '/discover?sort=popularity.desc', label: '📺 Streaming Now' },
  { href: '/discover?sort=vote_average.desc&vote_count.gte=5000', label: '⭐ Top Rated' },
  { href: '/trailers?tab=upcoming', label: '📅 Coming Soon' },
  { href: '/blockbuster', label: '🏆 Film Reviews' },
];

const TV_BROWSE = [
  { href: '/tv', label: 'Trending This Week' },
  { href: '/tv?tab=new', label: 'New Episodes Today' },
  { href: '/tv?tab=genre', label: 'Browse by Genre' },
  { href: '/tv?tab=platform', label: 'Browse by Platform' },
];

const NAV_PLATFORMS = [
  { name: 'Netflix', id: 8, color: '#E50914' },
  { name: 'Prime Video', id: 119, color: '#00A8E0' },
  { name: 'Disney+', id: 337, color: '#1139a0' },
  { name: 'Max', id: 1899, color: '#0022ff' },
  { name: 'Apple TV+', id: 350, color: '#888' },
  { name: 'Hulu', id: 15, color: '#1CE783' },
];

const LIVE_ITEMS = [
  { href: '/worldcup',        label: '⚽ World Cup 2026',  badge: 'Live',  live: true },
  { href: '/love-island-usa', label: '🌴 Love Island USA', badge: 'Now',   live: true },
  { href: '/tour-de-france',  label: '🚴 Tour de France',  badge: 'Jul 4', live: false },
];

const EXPLORE_ITEMS = [
  { href: '/blockbuster', label: 'Film Reviews' },
  { href: '/scenes',      label: 'Iconic Scenes' },
  { href: '/celebrity',   label: 'Celebrities' },
  { href: '/blog',        label: 'Blog' },
  { href: '/about',       label: 'About' },
];

function MegaMenu({ open, children }) {
  if (!open) return null;
  return <div className="nav-megamenu">{children}</div>;
}

function Dropdown({ open, children, alignRight }) {
  if (!open) return null;
  return (
    <div className={`nav-dropdown${alignRight ? ' nav-dropdown--right' : ''}`}>
      {children}
    </div>
  );
}

export default function Header() {
  const [menuOpen,    setMenuOpen]    = useState(false);
  const [moviesOpen,  setMoviesOpen]  = useState(false);
  const [tvOpen,      setTvOpen]      = useState(false);
  const [liveOpen,    setLiveOpen]    = useState(false);
  const [exploreOpen, setExploreOpen] = useState(false);
  const [langOpen,    setLangOpen]    = useState(false);
  const [scrolled,    setScrolled]    = useState(false);

  const moviesRef  = useRef(null);
  const tvRef      = useRef(null);
  const liveRef    = useRef(null);
  const exploreRef = useRef(null);
  const langRef    = useRef(null);

  const { items } = useWatchLater();
  const { user, loading: authLoading } = useAuth();
  const { language, setLanguage } = useLanguage();
  const router = useRouter();

  const closeAll = () => {
    setMoviesOpen(false);
    setTvOpen(false);
    setLiveOpen(false);
    setExploreOpen(false);
    setLangOpen(false);
  };

  useEffect(() => {
    const handler = (e) => {
      if (moviesRef.current  && !moviesRef.current.contains(e.target))  setMoviesOpen(false);
      if (tvRef.current      && !tvRef.current.contains(e.target))       setTvOpen(false);
      if (liveRef.current    && !liveRef.current.contains(e.target))     setLiveOpen(false);
      if (exploreRef.current && !exploreRef.current.contains(e.target))  setExploreOpen(false);
      if (langRef.current    && !langRef.current.contains(e.target))     setLangOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    closeAll();
  }, [router.asPath]);

  const close = () => setMenuOpen(false);

  const isActive = (path) =>
    router.pathname === path || router.pathname.startsWith(path + '/');

  return (
    <header className={`site-header${scrolled ? ' header-scrolled' : ''}`}>
      <div className="header-container">

        {/* ── LOGO ── */}
        <Link href="/" className="logo">
          <span className="logo-mark" aria-hidden="true">
            <svg width="16" height="16" viewBox="0 0 17 17" fill="none">
              <path d="M4 2.5v12M4 8.5l7-6M4 8.5l7 6" stroke="#080c0c" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
          Klick<span className="logo-stream">.stream</span>
        </Link>

        {/* ── SEARCH ── */}
        <div className="header-search">
          <SearchBar />
        </div>

        {/* ── HAMBURGER (mobile) ── */}
        <button
          className="mobile-menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span className={`hamburger${menuOpen ? ' active' : ''}`} />
        </button>

        {/* ── DESKTOP NAV ── */}
        <nav className={`nav-menu${menuOpen ? ' open' : ''}`} role="navigation">

          {/* Home */}
          <Link href="/" className={`nav-link${router.pathname === '/' ? ' nav-link--active' : ''}`} onClick={close}>
            Home
          </Link>

          {/* Movies mega-menu */}
          <div className="nav-dd-wrap" ref={moviesRef}>
            <button
              className={`nav-link nav-dd-btn${isActive('/discover') ? ' nav-link--active' : ''}`}
              onClick={() => { setMoviesOpen(!moviesOpen); setTvOpen(false); setLiveOpen(false); setExploreOpen(false); }}
              aria-expanded={moviesOpen}
            >
              Movies
              <svg className={`nav-chevron${moviesOpen ? ' open' : ''}`} viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
            <MegaMenu open={moviesOpen}>
              <div className="megamenu-col">
                <div className="megamenu-col-label">Browse</div>
                {MOVIE_BROWSE.map((item) => (
                  <Link key={item.href} href={item.href} className="nav-dropdown-item" onClick={() => { setMoviesOpen(false); close(); }}>
                    {item.label}
                  </Link>
                ))}
              </div>
              <div className="megamenu-col">
                <div className="megamenu-col-label">Genres</div>
                <div className="megamenu-genre-grid">
                  {TOP_GENRES.map((g) => (
                    <Link key={g.id} href={`/discover?genre=${g.id}`} className="megamenu-genre-chip" onClick={() => { setMoviesOpen(false); close(); }}>
                      {g.name}
                    </Link>
                  ))}
                </div>
                <Link href="/discover?view=genres" className="megamenu-see-all" onClick={() => { setMoviesOpen(false); close(); }}>
                  + All Genres →
                </Link>
              </div>
              <div className="megamenu-col">
                <div className="megamenu-col-label">Platforms</div>
                {NAV_PLATFORMS.map((p) => (
                  <Link key={p.id} href={`/discover?provider=${p.id}`} className="megamenu-platform-item" onClick={() => { setMoviesOpen(false); close(); }}>
                    <span className="megamenu-platform-dot" style={{ background: p.color }} />
                    {p.name}
                  </Link>
                ))}
                <Link href="/discover" className="megamenu-see-all" onClick={() => { setMoviesOpen(false); close(); }}>
                  + More Platforms →
                </Link>
              </div>
            </MegaMenu>
          </div>

          {/* TV dropdown */}
          <div className="nav-dd-wrap" ref={tvRef}>
            <button
              className={`nav-link nav-dd-btn${isActive('/tv') ? ' nav-link--active' : ''}`}
              onClick={() => { setTvOpen(!tvOpen); setMoviesOpen(false); setLiveOpen(false); setExploreOpen(false); }}
              aria-expanded={tvOpen}
            >
              TV
              <svg className={`nav-chevron${tvOpen ? ' open' : ''}`} viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
            <Dropdown open={tvOpen}>
              {TV_BROWSE.map((item) => (
                <Link key={item.href} href={item.href} className="nav-dropdown-item" onClick={() => { setTvOpen(false); close(); }}>
                  {item.label}
                </Link>
              ))}
            </Dropdown>
          </div>

          {/* Trailers — standalone */}
          <Link href="/trailers" className={`nav-link${isActive('/trailers') ? ' nav-link--active' : ''}`} onClick={close}>
            Trailers
          </Link>

          {/* Live dropdown */}
          <div className="nav-dd-wrap" ref={liveRef}>
            <button
              className="nav-link nav-dd-btn nav-live-btn"
              onClick={() => { setLiveOpen(!liveOpen); setMoviesOpen(false); setTvOpen(false); setExploreOpen(false); }}
              aria-expanded={liveOpen}
            >
              <span className="nav-live-dot" aria-hidden="true" />
              <span className="nav-live-label">LIVE</span>
              <svg className={`nav-chevron${liveOpen ? ' open' : ''}`} viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
            <Dropdown open={liveOpen}>
              {LIVE_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="nav-dropdown-item nav-dropdown-live-item"
                  onClick={() => { setLiveOpen(false); close(); }}
                >
                  <span className="nav-dd-live-label">{item.label}</span>
                  <span className={`nav-dd-live-badge${item.live ? ' nav-dd-live-badge--live' : ''}`}>{item.badge}</span>
                </Link>
              ))}
            </Dropdown>
          </div>

          {/* Explore dropdown */}
          <div className="nav-dd-wrap" ref={exploreRef}>
            <button
              className="nav-link nav-dd-btn"
              onClick={() => { setExploreOpen(!exploreOpen); setMoviesOpen(false); setTvOpen(false); setLiveOpen(false); }}
              aria-expanded={exploreOpen}
            >
              Explore
              <svg className={`nav-chevron${exploreOpen ? ' open' : ''}`} viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
            <Dropdown open={exploreOpen} alignRight>
              {EXPLORE_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`nav-dropdown-item${isActive(item.href) ? ' nav-dropdown-item--active' : ''}`}
                  onClick={() => { setExploreOpen(false); close(); }}
                >
                  {item.label}
                </Link>
              ))}
            </Dropdown>
          </div>

          {/* ── RIGHT ACTION CLUSTER ── */}
          <div className="nav-actions">

            {/* Watchlist — labeled */}
            <Link href="/watchlater" className="nav-watchlist-btn" onClick={close}>
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0 }}>
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
              </svg>
              Watchlist
              {items.length > 0 && <span className="nav-watchlist-count">{items.length}</span>}
            </Link>

            {/* Language */}
            <div className="nav-dd-wrap" ref={langRef}>
              <button
                className="nav-icon-btn"
                onClick={() => setLangOpen(!langOpen)}
                aria-label="Change language"
                title="Language"
              >
                <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10A15.3 15.3 0 0 1 12 2z" />
                </svg>
              </button>
              {langOpen && (
                <div className="nav-dropdown nav-lang-dropdown">
                  {SUPPORTED_LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      className={`nav-dropdown-item nav-lang-item${language === lang.code ? ' active' : ''}`}
                      onClick={() => { setLanguage(lang.code); setLangOpen(false); }}
                    >
                      {lang.label}
                      {language === lang.code && (
                        <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="3">
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Premium */}
            <Link href="/premium" className="nav-premium" onClick={close}>Premium</Link>

            {/* Sign In / Avatar */}
            {!authLoading && (
              user ? (
                <Link href="/account" className="nav-user" onClick={close}>
                  {user.photoURL ? (
                    <img src={user.photoURL} alt="" className="nav-avatar" referrerPolicy="no-referrer" />
                  ) : (
                    <span className="nav-avatar-fallback">{(user.email || '?')[0].toUpperCase()}</span>
                  )}
                </Link>
              ) : (
                <Link href="/login" className="nav-signin" onClick={close}>Sign In</Link>
              )
            )}
          </div>

          {/* ── MOBILE PANEL ── */}
          <div className="nav-mobile-panel">

            <div className="nav-mobile-group">
              <div className="nav-mobile-group-label">Watch</div>
              <div className="nav-mobile-tiles">
                <Link href="/" className="nav-mobile-tile" onClick={close}>🏠 Home</Link>
                <Link href="/discover" className="nav-mobile-tile" onClick={close}>🎬 Movies</Link>
                <Link href="/tv" className="nav-mobile-tile" onClick={close}>📺 TV Shows</Link>
                <Link href="/trailers" className="nav-mobile-tile" onClick={close}>🎞 Trailers</Link>
                <Link href="/trailers?tab=upcoming" className="nav-mobile-tile" onClick={close}>📅 Coming Soon</Link>
              </div>
            </div>

            <div className="nav-mobile-group">
              <div className="nav-mobile-group-label">Browse by Genre</div>
              <div className="nav-mobile-chips">
                {TOP_GENRES.map((g) => (
                  <Link key={g.id} href={`/discover?genre=${g.id}`} className="nav-mobile-chip" onClick={close}>
                    {g.name}
                  </Link>
                ))}
                <Link href="/discover?view=genres" className="nav-mobile-chip nav-mobile-chip--more" onClick={close}>
                  + All
                </Link>
              </div>
            </div>

            <div className="nav-mobile-group">
              <div className="nav-mobile-group-label">Streaming</div>
              <div className="nav-mobile-platforms">
                {NAV_PLATFORMS.map((p) => (
                  <Link key={p.id} href={`/discover?provider=${p.id}`} className="nav-mobile-platform" onClick={close}>
                    <span className="nav-mobile-platform-dot" style={{ background: p.color }} />
                    <span className="nav-mobile-platform-name">{p.name.replace(' Video', '')}</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="nav-mobile-group">
              <div className="nav-mobile-group-label">
                <span className="nav-live-dot" style={{ display: 'inline-block', marginRight: 6, verticalAlign: 'middle' }} aria-hidden="true" />
                Live Now
              </div>
              {LIVE_ITEMS.map((item) => (
                <Link key={item.href} href={item.href} className="nav-mobile-live-item" onClick={close}>
                  <span>{item.label}</span>
                  <span className={`nav-dd-live-badge${item.live ? ' nav-dd-live-badge--live' : ''}`}>{item.badge}</span>
                </Link>
              ))}
            </div>

            <div className="nav-mobile-group">
              <div className="nav-mobile-group-label">Discover More</div>
              <div className="nav-mobile-tiles">
                {EXPLORE_ITEMS.filter((i) => i.href !== '/about').map((item) => (
                  <Link key={item.href} href={item.href} className="nav-mobile-tile" onClick={close}>
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="nav-mobile-account">
              <Link href="/watchlater" className="nav-mobile-account-btn" onClick={close}>
                <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                </svg>
                Watchlist{items.length > 0 ? ` (${items.length})` : ''}
              </Link>
              <Link href="/premium" className="nav-mobile-account-btn nav-mobile-account-btn--premium" onClick={close}>
                ⭐ Premium
              </Link>
              {!authLoading && (
                user
                  ? <Link href="/account" className="nav-mobile-account-btn" onClick={close}>👤 Account</Link>
                  : <Link href="/login" className="nav-mobile-account-btn nav-mobile-account-btn--signin" onClick={close}>Sign In</Link>
              )}
            </div>

          </div>

        </nav>
      </div>
    </header>
  );
}
