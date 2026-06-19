import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
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
    // Track client-side navigations (initial page view handled by gtag auto)
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
