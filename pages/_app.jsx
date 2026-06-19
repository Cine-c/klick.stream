import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Script from 'next/script';
import Layout from '../components/layout/Layout';
import ErrorBoundary from '../components/ErrorBoundary';
import { OrganizationJsonLd } from '../components/seo/JsonLd';
import { WatchLaterProvider } from '../components/WatchLaterContext';
import { LanguageProvider } from '../components/LanguageContext';
// These providers are SSR-safe (all browser/Firebase access is inside useEffect
// with deterministic initial state), so import them normally. Previously they
// were dynamic `ssr: false`, which disabled server rendering for the ENTIRE app
// tree — shipping a near-empty HTML shell that wrecked SEO and delayed LCP.
import { AuthProvider } from '../components/AuthContext';
import { AdFreeProvider } from '../components/AdFreeContext';
import '../styles/globals.css';

const GA_ID = 'G-YWRLP3SY16';

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>);
  const [splashVisible, setSplashVisible] = useState(true);
  const [splashFading, setSplashFading] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setSplashFading(true), 500);
    const t2 = setTimeout(() => setSplashVisible(false), 950);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  useEffect(() => {
    // Send initial page view
    window.gtag?.('event', 'page_view', {
      page_path: window.location.pathname,
    });

    // Track client-side navigations
    const handleRouteChange = (url) => {
      window.gtag?.('event', 'page_view', { page_path: url });
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => router.events.off('routeChangeComplete', handleRouteChange);
  }, [router.events]);

  return (
    <>
    {splashVisible && (
      <div className={`splash-screen${splashFading ? ' splash-out' : ''}`} aria-hidden="true">
        <div className="splash-logo">
          <span className="splash-k">K</span>lick<span className="splash-dot">.</span>stream
        </div>
      </div>
    )}
    <ErrorBoundary>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `gtag('js',new Date());gtag('config','${GA_ID}',{send_page_view:false});`,
        }}
      />
      <LanguageProvider>
        <AuthProvider>
          <AdFreeProvider>
            <WatchLaterProvider>
              <OrganizationJsonLd />
              {getLayout(<Component {...pageProps} />)}
            </WatchLaterProvider>
          </AdFreeProvider>
        </AuthProvider>
      </LanguageProvider>
    </ErrorBoundary>
    </>
  );
}
