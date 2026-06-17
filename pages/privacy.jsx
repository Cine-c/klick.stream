import SEOHead from '../components/seo/SEOHead';

export default function PrivacyPage() {
  return (
    <>
      <SEOHead
        title="Privacy Policy — Klick.stream"
        description="Klick.stream's privacy policy: how we collect, use, and protect your data, including information about advertising cookies and your opt-out rights."
        url="/privacy"
      />

      <div className="static-page">
        <h1>Privacy Policy</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          Last updated: June 2026
        </p>

        <p>
          This Privacy Policy explains how Klick.stream (&ldquo;we,&rdquo; &ldquo;us,&rdquo;
          or &ldquo;our&rdquo;) collects, uses, and protects information when you use our
          website at klick.stream (the &ldquo;Site&rdquo;). Please read it carefully.
        </p>

        <h2>1. Information We Collect</h2>
        <h3>Information you provide</h3>
        <ul>
          <li>
            <strong>Account information:</strong> If you create an account, we collect your
            email address and any profile information you choose to provide. Authentication
            is handled via Google Sign-In or email/password through Firebase Authentication.
          </li>
          <li>
            <strong>Newsletter sign-up:</strong> If you subscribe to our newsletter, we
            collect your email address to send you editorial content. You can unsubscribe
            at any time via the link in any email.
          </li>
          <li>
            <strong>Payment information:</strong> If you subscribe to Klick.stream Premium,
            payment processing is handled by Stripe. We do not store your card details;
            Stripe processes and stores payment information under their own privacy policy.
          </li>
        </ul>

        <h3>Information collected automatically</h3>
        <ul>
          <li>
            <strong>Log data:</strong> Our servers automatically record information including
            your IP address, browser type, pages visited, and the date and time of your
            visit.
          </li>
          <li>
            <strong>Cookies and similar technologies:</strong> We and our third-party
            partners use cookies, web beacons, and similar tracking technologies to operate
            the Site, remember your preferences, and serve advertising. See Section 4 for
            full details.
          </li>
          <li>
            <strong>Usage data:</strong> We collect anonymised analytics data (pages
            viewed, session duration, referral source) to understand how the Site is used
            and to improve it.
          </li>
        </ul>

        <h2>2. How We Use Your Information</h2>
        <ul>
          <li>To provide, operate, and improve the Site and its features.</li>
          <li>To authenticate you when you log in to your account.</li>
          <li>To process Premium subscription payments via Stripe.</li>
          <li>To send newsletters you have opted into (you can unsubscribe at any time).</li>
          <li>To personalise your experience, such as remembering your watchlist.</li>
          <li>To display advertising that funds the free service (see Section 4).</li>
          <li>To comply with legal obligations and enforce our terms.</li>
        </ul>

        <h2>3. How We Share Your Information</h2>
        <p>
          We do not sell your personal data. We share information only in the following
          circumstances:
        </p>
        <ul>
          <li>
            <strong>Service providers:</strong> We use third-party services to operate the
            Site, including Firebase (Google LLC) for authentication and database services,
            Stripe for payment processing, and Cloudflare for hosting. These providers
            access data only as necessary to perform services on our behalf.
          </li>
          <li>
            <strong>Advertising partners:</strong> We share data with advertising partners
            as described in Section 4. This may include device identifiers, cookie data,
            and browsing behaviour on our Site.
          </li>
          <li>
            <strong>Legal requirements:</strong> We may disclose information if required
            by law, court order, or to protect the rights and safety of our users or the
            public.
          </li>
        </ul>

        <h2>4. Advertising &amp; Cookies</h2>
        <p>
          Klick.stream uses Google AdSense to display advertisements. Google, as a
          third-party vendor, uses cookies (including the DoubleClick cookie) to serve
          ads based on your prior visits to our Site and other websites on the internet.
        </p>
        <p>
          <strong>How Google uses advertising cookies:</strong> Google&rsquo;s use of
          advertising cookies enables it and its partners to serve ads to you based on
          your visit to Klick.stream and/or other sites on the internet. You can opt out
          of personalised advertising by visiting{' '}
          <a
            href="https://www.google.com/settings/ads"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google&rsquo;s Ads Settings
          </a>
          . Alternatively, you can opt out of a third-party vendor&rsquo;s use of cookies
          for personalised advertising by visiting{' '}
          <a
            href="https://www.aboutads.info"
            target="_blank"
            rel="noopener noreferrer"
          >
            www.aboutads.info
          </a>
          .
        </p>
        <p>
          <strong>Types of cookies we use:</strong>
        </p>
        <ul>
          <li>
            <strong>Strictly necessary cookies:</strong> Required for the Site to function
            (e.g., session cookies for logged-in users).
          </li>
          <li>
            <strong>Analytics cookies:</strong> Help us understand how visitors interact
            with the Site. Data is anonymised where possible.
          </li>
          <li>
            <strong>Advertising cookies:</strong> Used by Google AdSense and its partners
            to serve relevant ads. These may track your activity across websites to build
            a profile for ad targeting.
          </li>
          <li>
            <strong>Preference cookies:</strong> Remember choices you make (e.g., language
            settings).
          </li>
        </ul>
        <p>
          You can manage or withdraw consent for non-essential cookies at any time using
          the &ldquo;Cookie Settings&rdquo; link in the footer of our Site.
        </p>

        <h2>5. Affiliate Links</h2>
        <p>
          Some links on Klick.stream are affiliate links. If you click an affiliate link
          and make a purchase or sign up for a service, we may earn a commission at no
          additional cost to you. Affiliate relationships do not influence our editorial
          recommendations.
        </p>

        <h2>6. Data Retention</h2>
        <p>
          We retain account data for as long as your account is active. If you delete your
          account, we will delete or anonymise your personal data within 30 days, except
          where we are required to retain it for legal or accounting purposes.
        </p>

        <h2>7. Your Rights</h2>
        <p>
          Depending on where you live, you may have the following rights regarding your
          personal data:
        </p>
        <ul>
          <li>
            <strong>Access:</strong> Request a copy of the personal data we hold about you.
          </li>
          <li>
            <strong>Correction:</strong> Request that we correct inaccurate or incomplete
            data.
          </li>
          <li>
            <strong>Deletion:</strong> Request that we delete your personal data
            (&ldquo;right to be forgotten&rdquo;).
          </li>
          <li>
            <strong>Portability:</strong> Request your data in a structured, machine-readable
            format.
          </li>
          <li>
            <strong>Objection / Opt-out:</strong> Object to processing for direct marketing
            or opt out of personalised advertising as described in Section 4.
          </li>
        </ul>
        <p>
          <strong>California residents (CCPA):</strong> You have the right to know what
          personal information is collected, to delete it, and to opt out of the sale of
          personal information. We do not sell personal information.
        </p>
        <p>
          <strong>EEA / UK residents (GDPR):</strong> You have the rights listed above and
          the right to lodge a complaint with your local data protection authority.
        </p>
        <p>
          To exercise any of these rights, contact us at{' '}
          <a href="mailto:privacy@klick.stream">privacy@klick.stream</a>.
        </p>

        <h2>8. Children&rsquo;s Privacy</h2>
        <p>
          Klick.stream is not directed at children under 13. We do not knowingly collect
          personal information from children under 13. If you believe we have inadvertently
          collected such information, contact us and we will delete it promptly.
        </p>

        <h2>9. Third-Party Links</h2>
        <p>
          Our Site may contain links to third-party websites (such as streaming platforms,
          news sources, or YouTube). We are not responsible for the privacy practices of
          those sites and encourage you to review their privacy policies.
        </p>

        <h2>10. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. When we do, we will update
          the &ldquo;Last updated&rdquo; date at the top. We encourage you to review this
          page periodically.
        </p>

        <h2>11. Contact Us</h2>
        <p>
          For privacy-related questions or to exercise your data rights, contact us at{' '}
          <a href="mailto:privacy@klick.stream">privacy@klick.stream</a>.
        </p>
        <p>
          For general enquiries, visit our{' '}
          <a href="/contact">contact page</a> or email{' '}
          <a href="mailto:hello@klick.stream">hello@klick.stream</a>.
        </p>
      </div>
    </>
  );
}
