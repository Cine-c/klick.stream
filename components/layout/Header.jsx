import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
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

const LIVE_ITEMS = [
  { href: '/worldcup',       label: '⚽ World Cup 2026',   badge: 'Live' },
  { href: '/love-island-usa', label: '🌴 Love Island USA',   badge: 'Now' },
  { href: '/tour-de-france', label: '🚴 Tour de France',    badge: 'Jul 4' },
];

const MORE_ITEMS = [
  { href: '/celebrity',  label: 'Celebrities' },
  { href: '/scenes',     label: 'Scenes' },
  { href: '/blog',       label: 'Blog' },
  { href: '/blockbuster', label: 'Blockbuster' },
  { href: '/about',      label: 'About' },
];

function Dropdown({ open, children }) {
  if (!open) return null;
  return <div className="nav-dropdown">{children}</div>;
}

export default function Header() {
  const [menuOpen, setMenuOpen]   = useState(false);
  const [genresOpen, setGenresOpen] = useState(false);
  const [liveOpen, setLiveOpen]   = useState(false);
  const [moreOpen, setMoreOpen]   = useState(false);
  const [langOpen, setLangOpen]   = useState(false);
  const [scrolled, setScrolled]   = useState(false);

  const genresRef = useRef(null);
  const liveRef   = useRef(null);
  const moreRef   = useRef(null);
  const langRef   = useRef(null);

  const { items } = useWatchLater();
  const { user, loading: authLoading } = useAuth();
  const { language, setLanguage } = useLanguage();

  useEffect(() => {
    const handler = (e) => {
      if (genresRef.current && !genresRef.current.contains(e.target)) setGenresOpen(false);
      if (liveRef.current   && !liveRef.current.contains(e.target))   setLiveOpen(false);
      if (moreRef.current   && !moreRef.current.contains(e.target))   setMoreOpen(false);
      if (langRef.current   && !langRef.current.contains(e.target))   setLangOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const close = () => setMenuOpen(false);

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

          <Link href="/discover" className="nav-link" onClick={close}>Discover</Link>

          {/* Genres dropdown */}
          <div className="nav-dd-wrap" ref={genresRef}>
            <button
              className="nav-link nav-dd-btn"
              onClick={() => { setGenresOpen(!genresOpen); setLiveOpen(false); setMoreOpen(false); }}
              aria-expanded={genresOpen}
            >
              Genres
              <svg className={`nav-chevron${genresOpen ? ' open' : ''}`} viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
            <Dropdown open={genresOpen}>
              <div className="nav-dropdown-grid">
                {TOP_GENRES.map((g) => (
                  <Link
                    key={g.id}
                    href={`/discover?genre=${g.id}`}
                    className="nav-dropdown-item"
                    onClick={() => { setGenresOpen(false); close(); }}
                  >
                    {g.name}
                  </Link>
                ))}
              </div>
            </Dropdown>
          </div>

          <Link href="/tv" className="nav-link" onClick={close}>TV</Link>
          <Link href="/trailers" className="nav-link" onClick={close}>Trailers</Link>

          {/* Live dropdown */}
          <div className="nav-dd-wrap" ref={liveRef}>
            <button
              className="nav-link nav-dd-btn nav-live-btn"
              onClick={() => { setLiveOpen(!liveOpen); setGenresOpen(false); setMoreOpen(false); }}
              aria-expanded={liveOpen}
            >
              <span className="nav-live-dot" />
              Live
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
                  <span className="nav-dd-live-badge">{item.badge}</span>
                </Link>
              ))}
            </Dropdown>
          </div>

          {/* More dropdown */}
          <div className="nav-dd-wrap" ref={moreRef}>
            <button
              className="nav-link nav-dd-btn"
              onClick={() => { setMoreOpen(!moreOpen); setGenresOpen(false); setLiveOpen(false); }}
              aria-expanded={moreOpen}
            >
              More
              <svg className={`nav-chevron${moreOpen ? ' open' : ''}`} viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
            <Dropdown open={moreOpen}>
              {MORE_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="nav-dropdown-item"
                  onClick={() => { setMoreOpen(false); close(); }}
                >
                  {item.label}
                </Link>
              ))}
            </Dropdown>
          </div>

          {/* ── RIGHT ACTIONS ── */}
          <div className="nav-actions">
            {/* Watchlist */}
            <Link href="/watchlater" className="nav-icon-btn" title="Watchlist" onClick={close}>
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
              </svg>
              {items.length > 0 && <span className="nav-badge">{items.length}</span>}
            </Link>

            {/* Language */}
            <div className="nav-dd-wrap" ref={langRef}>
              <button
                className="nav-icon-btn"
                onClick={() => setLangOpen(!langOpen)}
                aria-label="Change language"
                title="Language"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
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

          {/* Mobile-only links (shown in open menu after main links) */}
          <div className="nav-mobile-extra">
            {MORE_ITEMS.map((item) => (
              <Link key={item.href} href={item.href} className="nav-link" onClick={close}>{item.label}</Link>
            ))}
            {LIVE_ITEMS.map((item) => (
              <Link key={item.href} href={item.href} className="nav-link" onClick={close}>{item.label}</Link>
            ))}
          </div>

        </nav>
      </div>
    </header>
  );
}
