import SEOHead from '../components/seo/SEOHead';
import Link from 'next/link';

export default function TermsPage() {
  return (
    <>
      <SEOHead
        title="Terms of Service — Klick.stream"
        description="Klick.stream's terms of service: rules for using the platform, content policies, disclaimers, and user rights."
        url="/terms"
      />

      <div className="static-page">
        <h1>Terms of Service</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          Last updated: June 2026
        </p>
        <p>
          By accessing or using klick.stream (the &ldquo;Site&rdquo;), you agree to be
          bound by these Terms of Service. If you do not agree, please do not use the Site.
        </p>

        <h2>1. Use of the Site</h2>
        <p>
          Klick.stream provides a free movie discovery service. You may use the Site for
          personal, non-commercial purposes only. You must not:
        </p>
        <ul>
          <li>Use the Site in any way that violates applicable laws or regulations.</li>
          <li>
            Scrape, crawl, or copy content from the Site at scale without written
            permission.
          </li>
          <li>
            Attempt to gain unauthorised access to any part of the Site or its underlying
            systems.
          </li>
          <li>
            Use the Site to transmit spam, malware, or any harmful or disruptive content.
          </li>
        </ul>

        <h2>2. Accounts</h2>
        <p>
          You may create a free account to access features such as watchlists and
          personalised picks. You are responsible for maintaining the confidentiality of
          your account credentials. Notify us immediately at{' '}
          <a href="mailto:hello@klick.stream">hello@klick.stream</a> if you suspect
          unauthorised use of your account.
        </p>
        <p>
          We reserve the right to suspend or terminate accounts that violate these Terms.
        </p>

        <h2>3. Premium Subscription</h2>
        <p>
          Klick.stream Premium is a paid subscription that removes advertising. Subscriptions
          are billed through Stripe. You may cancel at any time; cancellation takes effect
          at the end of the current billing period. We do not offer refunds for partial
          billing periods.
        </p>

        <h2>4. Content & Intellectual Property</h2>
        <p>
          Movie data, cast information, and images are sourced from{' '}
          <a href="https://www.themoviedb.org" target="_blank" rel="noopener noreferrer">
            The Movie Database (TMDB)
          </a>{' '}
          and OMDB. This product uses the TMDB API but is not endorsed or certified by
          TMDB.
        </p>
        <p>
          Original editorial content — articles, reviews, and written analysis — is owned
          by Klick.stream and may not be reproduced without permission.
        </p>
        <p>
          All trademarks, logos, and brand names referenced on the Site belong to their
          respective owners.
        </p>

        <h2>5. Disclaimers</h2>
        <p>
          The Site is provided &ldquo;as is&rdquo; without warranties of any kind.
          Streaming availability information is sourced from third-party providers and may
          not always be accurate or up to date. Always verify availability on the relevant
          streaming platform before subscribing or renting.
        </p>
        <p>
          We are not responsible for the content of external websites linked from the Site,
          including streaming platforms, YouTube, or news sources.
        </p>

        <h2>6. Advertising</h2>
        <p>
          Klick.stream displays advertisements served by Google AdSense. We do not control
          the content of these ads. For information about how advertising cookies work and
          how to opt out, see our <Link href="/privacy">Privacy Policy</Link>.
        </p>

        <h2>7. Limitation of Liability</h2>
        <p>
          To the fullest extent permitted by law, Klick.stream shall not be liable for any
          indirect, incidental, or consequential damages arising from your use of the Site.
        </p>

        <h2>8. Changes to These Terms</h2>
        <p>
          We may update these Terms from time to time. When we do, we will update the
          &ldquo;Last updated&rdquo; date above. Continued use of the Site after changes
          constitutes acceptance of the new Terms.
        </p>

        <h2>9. Contact</h2>
        <p>
          Questions about these Terms? Contact us at{' '}
          <a href="mailto:hello@klick.stream">hello@klick.stream</a> or visit our{' '}
          <Link href="/contact">contact page</Link>.
        </p>
      </div>
    </>
  );
}
