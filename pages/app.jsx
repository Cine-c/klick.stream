import Link from 'next/link';
import SEOHead from '../components/seo/SEOHead';

// --- APK distribution config ---------------------------------------------
// Host: GitHub Releases on the public repo Cine-c/klick.stream. To publish a
// new build, upload the .apk as a release asset named klick.apk, e.g.:
//   gh release create app-vX.Y.Z klick.apk --title "Klick Android App vX.Y.Z"
// then update the /download/klick.apk redirect target in next.config.js.
// The button links to the on-brand /download/klick.apk path (307-redirects to
// the GitHub asset), so the URL stays branded and GitHub still counts each
// download. A GA `apk_download` event fires on click for per-source analytics.
const APK_URL = '/download/klick.apk';
const APK_VERSION = '1.0.0';
const APK_SIZE = '~114 MB';
const READY = APK_URL.length > 0;

export default function GetAppPage() {
  return (
    <>
      <SEOHead
        title="Get the Klick App — Movie & TV Discovery for Android"
        description="Download the Klick Android app: browse 50,000+ films and shows, watch trailers, build your watchlist, and manage Premium — all from your phone."
        url="/app"
      />

      <div className="static-page">
        <div className="about-card" style={{ textAlign: 'center' }}>
          <span
            style={{
              display: 'inline-block',
              fontSize: '0.72rem',
              fontWeight: 700,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#10b981',
              marginBottom: '0.75rem',
            }}
          >
            Android&nbsp;·&nbsp;Free
          </span>
          <h1>Get the Klick app</h1>
          <p style={{ maxWidth: '46ch', margin: '0 auto 1.75rem' }}>
            The whole of Klick.stream, built for your phone — discover films and shows,
            watch trailers, and keep your watchlist in your pocket. Signs in with the same
            account as the website.
          </p>

          {READY ? (
            <a
              href={APK_URL}
              download
              onClick={() => {
                if (typeof window !== 'undefined') {
                  window.gtag?.('event', 'apk_download', {
                    method: 'website',
                    app_version: APK_VERSION,
                    location: 'app_page',
                  });
                }
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem',
                background: '#10b981',
                color: '#04120d',
                fontWeight: 700,
                fontSize: '1.05rem',
                padding: '0.9rem 1.8rem',
                borderRadius: '999px',
                textDecoration: 'none',
                boxShadow: '0 12px 34px -12px rgba(16,185,129,0.6)',
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 3v12" />
                <path d="m7 11 5 5 5-5" />
                <path d="M5 21h14" />
              </svg>
              Download APK
            </a>
          ) : (
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem',
                border: '1px dashed rgba(255,255,255,0.25)',
                color: 'var(--text-secondary)',
                fontWeight: 600,
                padding: '0.9rem 1.8rem',
                borderRadius: '999px',
              }}
            >
              Download coming soon
            </span>
          )}

          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.9rem' }}>
            Version {APK_VERSION} · {APK_SIZE} · Android 7.0+
          </p>
        </div>

        <section className="about-section">
          <h2>How to install</h2>
          <p>
            Because this app is distributed directly (not through the Play Store), Android
            will ask you to approve the install once:
          </p>
          <ol style={{ lineHeight: 1.9, paddingLeft: '1.2rem' }}>
            <li>Tap <strong>Download APK</strong> above and open the file when it finishes.</li>
            <li>
              If prompted, allow your browser to <strong>&ldquo;install unknown apps&rdquo;</strong>{' '}
              (Settings → Apps → your browser → Install unknown apps).
            </li>
            <li>Tap <strong>Install</strong>, then <strong>Open</strong> — and sign in.</li>
          </ol>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            The app is signed and safe. This one-time prompt is standard Android behaviour for
            any app installed outside the Play Store.
          </p>
        </section>

        <section className="about-section">
          <h2>What you get</h2>
          <div className="about-grid">
            <div className="about-item">
              <h3>Discover &amp; search</h3>
              <p>Browse 50,000+ movies and TV shows, with multi-search across films, series, and people.</p>
            </div>
            <div className="about-item">
              <h3>Trailer reels</h3>
              <p>Swipe through a full-screen reel of trailers and teasers for new and upcoming releases.</p>
            </div>
            <div className="about-item">
              <h3>Your watchlist</h3>
              <p>Save titles to watch later — synced with your Klick account across phone and web.</p>
            </div>
            <div className="about-item">
              <h3>Premium</h3>
              <p>
                Upgrade to an ad-free experience. <Link href="/premium">Premium</Link> works the same
                as on the website.
              </p>
            </div>
          </div>
        </section>

        <section className="about-section" style={{ textAlign: 'center' }}>
          <h2>On iPhone?</h2>
          <p style={{ maxWidth: '44ch', margin: '0 auto' }}>
            An iOS version is on the way. In the meantime,{' '}
            <Link href="/">klick.stream</Link> works great in Safari — add it to your Home Screen
            for an app-like experience.
          </p>
        </section>
      </div>
    </>
  );
}
