import Link from 'next/link';
import SEOHead from '../components/seo/SEOHead';

export default function AboutPage() {
  return (
    <>
      <SEOHead
        title="About Klick.stream — Independent Movie Discovery & Film Guide"
        description="Klick.stream is an independent movie discovery platform. Learn about our editorial mission, how we cover cinema, and the team behind the site."
        url="/about"
      />

      <div className="static-page">
        <div className="about-card">
          <h1>About Klick.stream</h1>
          <p>
            Klick.stream is an independent entertainment guide built for people who take
            cinema seriously. We help you discover films worth watching, find out where to
            stream them, and read honest editorial coverage — without the noise of
            algorithm-driven recommendation engines designed to keep you scrolling rather
            than watching.
          </p>
          <p>
            We launched because the streaming era, for all its convenience, made film
            discovery harder. Catalogues sprawl across a dozen platforms. Titles appear and
            disappear without warning. Marketing budgets distort what surfaces in trending
            lists. Klick.stream cuts through that: one place to browse, compare, and
            actually decide what to watch tonight.
          </p>
        </div>

        <section className="about-section">
          <h2>What We Cover</h2>
          <div className="about-grid">
            <div className="about-item">
              <h3>Movie Discovery</h3>
              <p>
                Browse 50,000+ films and series filtered by genre, year, rating, runtime,
                and streaming platform. Our database is updated daily from TMDB and verified
                against real availability on Netflix, Prime Video, Apple TV+, Disney+,
                Max, Hulu, Peacock, and 35+ other services.
              </p>
            </div>
            <div className="about-item">
              <h3>Trailers &amp; Video</h3>
              <p>
                Watch trailers, teasers, and clips for new and upcoming releases. We
                surface official footage from studios so you can make an informed choice
                before investing two hours in a film.
              </p>
            </div>
            <div className="about-item">
              <h3>Editorial Coverage</h3>
              <p>
                Our writing team publishes original reviews, ranked lists, actor spotlights,
                and streaming guides. We cover what is worth your time — not what paid for
                placement. Every article reflects our editors&rsquo; genuine opinions.
              </p>
            </div>
            <div className="about-item">
              <h3>Streaming Guides</h3>
              <p>
                Monthly picks for Netflix, Prime Video, and other platforms. Weekly new
                release breakdowns. &ldquo;Where to watch&rdquo; pages for individual films
                that tell you exactly which service has it, whether it&rsquo;s included in
                a subscription or available to rent.
              </p>
            </div>
          </div>
        </section>

        <section className="about-section">
          <h2>Our Editorial Standards</h2>
          <p>
            Klick.stream is editorially independent. We do not accept payment for reviews,
            rankings, or editorial placement. When we recommend a film or a streaming
            service, it is because our editors believe it is worth your time.
          </p>
          <p>
            Movie data (titles, overviews, cast, crew, ratings) is sourced from{' '}
            <a
              href="https://www.themoviedb.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              The Movie Database (TMDB)
            </a>{' '}
            and supplemented with data from OMDB. We use these third-party databases for
            factual film information; all editorial opinions and written analysis are
            produced by our team.
          </p>
          <p>
            We correct errors promptly. If you spot a factual mistake in an article or an
            incorrect streaming listing, email us and we will review it within 48 hours.
          </p>
        </section>

        <section className="about-section">
          <h2>How Klick.stream Makes Money</h2>
          <p>
            We are a free platform, and we intend to stay that way. Klick.stream is
            supported by display advertising (via Google AdSense) and, for users who prefer
            an ad-free experience, a voluntary{' '}
            <Link href="/premium">Premium subscription</Link>.
          </p>
          <p>
            Some links on the site — particularly to streaming services and film rentals —
            may be affiliate links. If you purchase or subscribe through one of those links,
            we may receive a small commission at no extra cost to you. This never influences
            our editorial recommendations. See our{' '}
            <Link href="/privacy">Privacy Policy</Link> for full details on how advertising
            and affiliate relationships work on the site.
          </p>
        </section>

        <section className="team-section">
          <h2 className="section-title" style={{ textAlign: 'center' }}>
            The Team
          </h2>
          <p style={{ textAlign: 'center', color: 'var(--text-secondary)', maxWidth: '560px', margin: '0 auto 2rem' }}>
            Klick.stream is run by a small team of film enthusiasts. We are writers,
            developers, and cinephiles who believe great movies deserve an audience.
          </p>
          <div className="team-grid">
            <div className="team-card">
              <div className="team-avatar-placeholder">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                </svg>
              </div>
              <h3>J.</h3>
              <p>Founder &amp; Editor-in-Chief</p>
              <p className="team-bio">
                Film writer with a focus on genre cinema, international film, and the
                business of streaming. Previously covered entertainment for independent
                publications. Based in Europe.
              </p>
            </div>
          </div>
        </section>

        <section className="about-section" style={{ textAlign: 'center' }}>
          <h2>Get in Touch</h2>
          <p>
            For editorial inquiries, corrections, press, or partnership questions,
            contact us at{' '}
            <a href="mailto:hello@klick.stream">hello@klick.stream</a>.
          </p>
          <p>
            For privacy-related requests, use{' '}
            <a href="mailto:privacy@klick.stream">privacy@klick.stream</a>.
          </p>
          <p>
            <Link href="/contact" className="btn-outline" style={{ display: 'inline-block', marginTop: '0.5rem' }}>
              Contact Page →
            </Link>
          </p>
        </section>
      </div>
    </>
  );
}
