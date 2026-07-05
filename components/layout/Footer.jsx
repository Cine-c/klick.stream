import Link from 'next/link';
import AffiliateDisclosure from '../AffiliateDisclosure';

const EXPLORE_LINKS = [
  { href: '/discover',   label: 'Discover Movies' },
  { href: '/trailers',   label: 'Trailers' },
  { href: '/tv',         label: 'TV Shows' },
  { href: '/scenes',     label: 'Scenes' },
  { href: '/red-carpet', label: 'Red Carpet' },
  { href: '/celebrity',  label: 'Celebrities' },
  { href: '/blockbuster', label: 'Blockbuster' },
  { href: '/blog',       label: 'Blog' },
];

const LIVE_LINKS = [
  { href: '/worldcup',        label: '⚽ FIFA World Cup 2026', badge: 'Live' },
  { href: '/love-island-usa', label: '🌴 Love Island USA',     badge: 'Now' },
  { href: '/tour-de-france',  label: '🚴 Tour de France',      badge: 'Jul 4' },
];

const COMPANY_LINKS = [
  { href: '/about',   label: 'About' },
  { href: '/contact', label: 'Contact' },
  { href: '/premium', label: 'Premium' },
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/terms',   label: 'Terms of Service' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      {/* ── TOP GRADIENT BAR ── */}
      <div className="footer-top-bar" />

      <div className="footer-inner">
        {/* ── BRAND COLUMN ── */}
        <div className="footer-brand">
          <Link href="/" className="footer-logo">
            <span className="footer-logo-mark">
              <svg width="14" height="14" viewBox="0 0 17 17" fill="none">
                <path d="M4 2.5v12M4 8.5l7-6M4 8.5l7 6" stroke="#080c0c" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
            Klick<span className="footer-logo-dot">.stream</span>
          </Link>
          <p className="footer-tagline">
            Your free guide to cinema. Browse 50,000+ titles, watch trailers, and find where to stream — across every platform.
          </p>
          <a
            href="https://x.com/klick4u"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-social-x"
            aria-label="Follow on X"
          >
            <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
            Follow on X
          </a>
        </div>

        {/* ── EXPLORE ── */}
        <div className="footer-col">
          <h4 className="footer-col-heading">Explore</h4>
          <nav className="footer-links">
            {EXPLORE_LINKS.map((l) => (
              <Link key={l.href} href={l.href} className="footer-link">{l.label}</Link>
            ))}
          </nav>
        </div>

        {/* ── LIVE ── */}
        <div className="footer-col">
          <h4 className="footer-col-heading">Live &amp; Events</h4>
          <nav className="footer-links">
            {LIVE_LINKS.map((l) => (
              <Link key={l.href} href={l.href} className="footer-link footer-link-live">
                {l.label}
                <span className="footer-live-badge">{l.badge}</span>
              </Link>
            ))}
          </nav>
        </div>

        {/* ── COMPANY ── */}
        <div className="footer-col">
          <h4 className="footer-col-heading">Company</h4>
          <nav className="footer-links">
            {COMPANY_LINKS.map((l) => (
              <Link key={l.href} href={l.href} className="footer-link">{l.label}</Link>
            ))}
            <button
              className="footer-link footer-cookie-btn"
              onClick={() => {
                if (window.googlefc?.showRevocationMessage) {
                  window.googlefc.showRevocationMessage();
                } else if (typeof window.__tcfapi === 'function') {
                  window.__tcfapi('showUi', 2, () => {});
                }
              }}
            >
              Cookie Settings
            </button>
          </nav>
        </div>
      </div>

      {/* ── AFFILIATE ROW ── */}
      <div className="footer-affiliate-row">
        <div className="footer-affiliate-inner">
          <AffiliateDisclosure variant="footer" />
        </div>
      </div>

      {/* ── BOTTOM BAR ── */}
      <div className="footer-bottom">
        <div className="footer-bottom-inner">
          <p className="footer-copy">&copy; {year} Klick.stream — All rights reserved.</p>
          <div className="footer-bottom-right">
            <span className="footer-tmdb">
              Data by{' '}
              <a href="https://www.themoviedb.org" target="_blank" rel="noopener noreferrer">
                <img
                  src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
                  alt="TMDB"
                  width="52"
                  height="10"
                />
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
