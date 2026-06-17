import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import SEOHead from '../../components/seo/SEOHead';
import { ItemListJsonLd } from '../../components/seo/JsonLd';
import BlogList from '../../components/blog/BlogList';
import AdSlot from '../../components/AdSlot';


const POSTS_PER_PAGE = 9;

export default function BlogIndex({ posts, categories }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('');

  const filteredPosts = useMemo(() => {
    let result = posts;
    if (activeCategory) {
      result = result.filter((p) => p.category === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title?.toLowerCase().includes(q) ||
          p.excerpt?.toLowerCase().includes(q) ||
          p.author?.toLowerCase().includes(q)
      );
    }
    return result;
  }, [posts, activeCategory, searchQuery]);

  const featuredPost = !searchQuery && !activeCategory ? posts[0] || null : null;
  const remainingPosts = featuredPost ? filteredPosts.slice(1) : filteredPosts;

  const totalPages = Math.ceil(remainingPosts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const paginatedPosts = remainingPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  const formatDate = (dateStr) =>
    dateStr
      ? new Date(dateStr).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })
      : '';

  return (
    <>
      <SEOHead
        title="Movie News, Reviews & Streaming Guides | Klick.stream Blog"
        description="Read the latest movie news, honest reviews, and streaming guides. Actor spotlights, film analysis, and weekly what-to-watch picks from Klick.stream."
        url="/blog"
      />
      <ItemListJsonLd items={posts.slice(0, 10)} type="BlogPosting" />

      <div className="blog-header">
        <h1 className="blog-header-title">Blog</h1>
        <p className="blog-header-subtitle">
          Movie news, reviews, and entertainment articles from the Klick.stream team.
        </p>
      </div>

      {/* Filters */}
      <div className="blog-filters">
        <div className="blog-search-wrapper">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
          </svg>
          <input
            type="search"
            className="blog-search-input"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
          />
        </div>
        {categories && categories.length > 0 && (
          <div className="blog-category-filters">
            <button
              className={`blog-filter-btn${!activeCategory ? ' active' : ''}`}
              onClick={() => { setActiveCategory(''); setCurrentPage(1); }}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                className={`blog-filter-btn${activeCategory === cat ? ' active' : ''}`}
                onClick={() => { setActiveCategory(cat); setCurrentPage(1); }}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>

      {featuredPost && (
        <article className="blog-featured">
          {featuredPost.imageUrl && (
            <Link href={featuredPost.href || `/blog/${featuredPost.slug}`} className="blog-featured-image">
              <Image
                src={featuredPost.imageUrl}
                alt={featuredPost.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: 'cover' }}
                priority
              />
              {featuredPost.category && (
                <span className="blog-category-badge">{featuredPost.category}</span>
              )}
            </Link>
          )}
          <div className="blog-featured-content">
            <Link href={featuredPost.href || `/blog/${featuredPost.slug}`}>
              <h2 className="blog-featured-title">{featuredPost.title}</h2>
            </Link>
            {featuredPost.excerpt && (
              <p className="blog-featured-excerpt">{featuredPost.excerpt}</p>
            )}
            <div className="blog-card-meta">
              {formatDate(featuredPost.publishedAt) && (
                <time dateTime={featuredPost.publishedAt}>
                  {formatDate(featuredPost.publishedAt)}
                </time>
              )}
              {featuredPost.author && (
                <span className="blog-card-author">by {featuredPost.author}</span>
              )}
              {featuredPost.readingTime && (
                <span>{featuredPost.readingTime} min read</span>
              )}
            </div>
            <Link href={featuredPost.href || `/blog/${featuredPost.slug}`} className="blog-card-link">
              Read More
            </Link>
          </div>
        </article>
      )}

      {/* Ad: between featured post and post grid */}
      <AdSlot slot="3307940521" />

      <BlogList posts={paginatedPosts} />

      {totalPages > 1 && (
        <div className="pagination">
          <button
            className="pagination-btn"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              className={`pagination-btn ${currentPage === page ? 'active' : ''}`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          ))}

          <button
            className="pagination-btn"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}

      <section className="blog-topics">
        <h2 className="blog-topics-title">Explore Topics</h2>
        <div className="blog-topics-grid">
          <div className="blog-topic-card">
            <span className="blog-topic-icon">{'\uD83C\uDFAD'}</span>
            <h3 className="blog-topic-name">Acting Masterclass</h3>
            <p className="blog-topic-desc">
              Discover the techniques that made legendary performances unforgettable. From method acting to improvisation.
            </p>
          </div>
          <div className="blog-topic-card">
            <span className="blog-topic-icon">{'\uD83C\uDFA5'}</span>
            <h3 className="blog-topic-name">Cinematography</h3>
            <p className="blog-topic-desc">
              Explore how directors of photography create visual magic through lighting, framing, and camera movement.
            </p>
          </div>
          <div className="blog-topic-card">
            <span className="blog-topic-icon">{'\uD83C\uDFB5'}</span>
            <h3 className="blog-topic-name">Film Scores</h3>
            <p className="blog-topic-desc">
              The music that moves us. Learn how composers craft the emotional backbone of your favorite films.
            </p>
          </div>
          <div className="blog-topic-card">
            <span className="blog-topic-icon">{'\u2702\uFE0F'}</span>
            <h3 className="blog-topic-name">Editing Magic</h3>
            <p className="blog-topic-desc">
              The invisible art that shapes storytelling. See how editors create tension, emotion, and flow.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

const STATIC_ARTICLES = [
  {
    id: 'static-best-horror-2026',
    slug: 'best-horror-movies-2026',
    href: '/articles/best-horror-movies-2026',
    title: 'Best Horror Movies of 2026 So Far — Ranked & Reviewed',
    excerpt: 'The scariest and best-reviewed horror films of 2026, ranked by our editors — from Blumhouse surprises to franchise revivals, with where to stream each one.',
    category: 'Best Of',
    author: 'J., Editor-in-Chief',
    publishedAt: '2026-04-21T08:00:00Z',
    readingTime: 7,
  },
  {
    id: 'static-best-thriller-2026',
    slug: 'best-thriller-movies-2026',
    href: '/articles/best-thriller-movies-2026',
    title: 'Best Thriller Movies of 2026 — Ranked',
    excerpt: 'Edge-of-your-seat tension delivered. Our ranked list of the best thrillers released in 2026, from psychological slow-burns to relentless action.',
    category: 'Best Of',
    author: 'J., Editor-in-Chief',
    publishedAt: '2026-04-28T08:00:00Z',
    readingTime: 6,
  },
  {
    id: 'static-scream-7-review',
    slug: 'scream-7-2026-review',
    href: '/articles/scream-7-2026-review',
    title: 'Scream 7 (2026) Review — Does the Franchise Still Cut Deep?',
    excerpt: 'Kevin Williamson returns as director and Neve Campbell comes back to Woodsboro. Our spoiler-free review of the most anticipated slasher of the year.',
    category: 'Reviews',
    author: 'J., Editor-in-Chief',
    publishedAt: '2026-04-10T08:00:00Z',
    readingTime: 6,
  },
  {
    id: 'static-netflix-april-2026',
    slug: 'best-movies-netflix-april-2026',
    href: '/articles/best-movies-netflix-april-2026',
    title: 'Best Movies on Netflix — April 2026 Picks',
    excerpt: "This month's best films on Netflix, handpicked by our editors. New arrivals and hidden gems worth your time in April 2026.",
    category: 'Streaming Guides',
    author: 'J., Editor-in-Chief',
    publishedAt: '2026-04-01T08:00:00Z',
    readingTime: 5,
  },
  {
    id: 'static-prime-april-2026',
    slug: 'best-movies-prime-video-april-2026',
    href: '/articles/best-movies-prime-video-april-2026',
    title: 'Best Movies on Prime Video — April 2026 Picks',
    excerpt: "Amazon Prime Video's best films this April — from recent theatrical releases to long-running catalogue gems you may have missed.",
    category: 'Streaming Guides',
    author: 'J., Editor-in-Chief',
    publishedAt: '2026-04-01T09:00:00Z',
    readingTime: 5,
  },
  {
    id: 'static-anaconda-blood-coil',
    slug: 'anaconda-blood-coil',
    href: '/articles/anaconda-blood-coil',
    title: 'Anaconda: Blood Coil (2026) — Everything We Know',
    excerpt: 'Cast, release date, trailer breakdown, and plot details for the 2026 Anaconda revival. Everything confirmed so far about the summer blockbuster.',
    category: 'Upcoming',
    author: 'J., Editor-in-Chief',
    publishedAt: '2026-05-05T08:00:00Z',
    readingTime: 4,
  },
  {
    id: 'static-austin-butler',
    slug: 'austin-butler-movies-filmography',
    href: '/articles/austin-butler-movies-filmography',
    title: "Austin Butler's Movies & Career — Complete Filmography",
    excerpt: 'From Elvis to Dune: Part Two — a complete guide to Austin Butler\'s film career, ranked performances, and what\'s coming next.',
    category: 'Actor Spotlights',
    author: 'J., Editor-in-Chief',
    publishedAt: '2026-03-15T08:00:00Z',
    readingTime: 6,
  },
  {
    id: 'static-sydney-sweeney',
    slug: 'sydney-sweeney-career',
    href: '/articles/sydney-sweeney-career',
    title: "Sydney Sweeney's Rise: From Euphoria to Hollywood's A-List",
    excerpt: "How Sydney Sweeney became one of Hollywood's most in-demand actors — a deep dive into her career, best performances, and upcoming projects.",
    category: 'Actor Spotlights',
    author: 'J., Editor-in-Chief',
    publishedAt: '2026-03-22T08:00:00Z',
    readingTime: 7,
  },
  {
    id: 'static-movies-like-peaky-blinders',
    slug: 'movies-like-peaky-blinders',
    href: '/articles/movies-like-peaky-blinders',
    title: 'Movies & Shows Like Peaky Blinders — What to Watch Next',
    excerpt: 'Loved Peaky Blinders? Here are the best crime dramas, gangster films, and prestige period shows to fill the void — with where to stream each one.',
    category: 'Streaming Guides',
    author: 'J., Editor-in-Chief',
    publishedAt: '2026-02-10T08:00:00Z',
    readingTime: 6,
  },
  {
    id: 'static-new-movies-this-week',
    slug: 'new-movies-streaming-this-week',
    href: '/articles/new-movies-streaming-this-week',
    title: 'New Movies Streaming This Week — What Just Dropped',
    excerpt: "The best new arrivals across Netflix, Prime Video, Apple TV+, and more this week. Don't miss these just-added films and series.",
    category: 'Weekly Picks',
    author: 'J., Editor-in-Chief',
    publishedAt: '2026-06-09T08:00:00Z',
    readingTime: 4,
  },
  {
    id: 'static-where-to-watch-goat',
    slug: 'where-to-watch-goat-2026',
    href: '/articles/where-to-watch-goat-2026',
    title: 'Where to Watch Goat (2026) — Streaming, Rental & Cinema Guide',
    excerpt: 'Is Goat (2026) streaming yet? Here is every way to watch the film — subscription streaming, digital rental, and cinema listings.',
    category: 'Where to Watch',
    author: 'J., Editor-in-Chief',
    publishedAt: '2026-05-20T08:00:00Z',
    readingTime: 3,
  },
  {
    id: 'static-peaky-immortal-man',
    slug: 'where-to-watch-peaky-blinders-immortal-man',
    href: '/articles/where-to-watch-peaky-blinders-immortal-man',
    title: 'Where to Watch Peaky Blinders: The Immortal Man',
    excerpt: 'The Peaky Blinders film is here. Find out every way to watch The Immortal Man — streaming platforms, cinema listings, and release timeline.',
    category: 'Where to Watch',
    author: 'J., Editor-in-Chief',
    publishedAt: '2026-06-01T08:00:00Z',
    readingTime: 3,
  },
  {
    id: 'static-my-boo-2',
    slug: 'my-boo-2',
    href: '/articles/my-boo-2',
    title: 'My Boo 2 (2026) — Review & Where to Stream',
    excerpt: "The follow-up to the beloved Nigerian romantic comedy is here. Our review of My Boo 2, plus where to stream it and what to expect.",
    category: 'Reviews',
    author: 'J., Editor-in-Chief',
    publishedAt: '2026-04-18T08:00:00Z',
    readingTime: 5,
  },
  {
    id: 'static-chickenhare',
    slug: 'chickenhare-groundhog',
    href: '/articles/chickenhare-groundhog',
    title: 'Chickenhare and the Hamster of Darkness — Streaming Guide',
    excerpt: 'Where to watch Chickenhare and everything you need to know about the animated adventure film for the whole family.',
    category: 'Streaming Guides',
    author: 'J., Editor-in-Chief',
    publishedAt: '2026-03-10T08:00:00Z',
    readingTime: 3,
  },
  // Awards coverage
  {
    id: 'static-golden-globes-2026',
    slug: 'golden-globes-2026-winners',
    href: '/articles/golden-globes-2026-winners',
    title: 'Golden Globes 2026 — Every Winner from the 83rd Ceremony',
    excerpt: 'Sinners leads the night at the 83rd Golden Globe Awards. Complete winners list for film and television, plus what it means for the Oscars race.',
    category: 'Awards',
    author: 'J., Editor-in-Chief',
    publishedAt: '2026-01-06T10:00:00Z',
    readingTime: 8,
  },
  {
    id: 'static-bafta-2026',
    slug: 'bafta-2026-winners',
    href: '/articles/bafta-2026-winners',
    title: 'BAFTA Film Awards 2026 — All the Winners from the 79th Ceremony',
    excerpt: 'Hamnet sweeps the 79th BAFTA Film Awards for Chloé Zhao. Jessie Buckley wins double. Complete winners list for every category.',
    category: 'Awards',
    author: 'J., Editor-in-Chief',
    publishedAt: '2026-02-16T20:00:00Z',
    readingTime: 7,
  },
  {
    id: 'static-sag-2026',
    slug: 'sag-awards-2026',
    href: '/articles/sag-awards-2026',
    title: 'SAG Awards 2026 — Winners from the 32nd Screen Actors Guild Awards',
    excerpt: 'Sinners wins Outstanding Cast in a Motion Picture. Michael B. Jordan and Jessie Buckley take the lead acting prizes. Full winners list inside.',
    category: 'Awards',
    author: 'J., Editor-in-Chief',
    publishedAt: '2026-02-23T22:00:00Z',
    readingTime: 6,
  },
  {
    id: 'static-critics-choice-2026',
    slug: 'critics-choice-awards-2026',
    href: '/articles/critics-choice-awards-2026',
    title: "Critics' Choice Awards 2026 — Every Winner, Film & Television",
    excerpt: "One Battle After Another takes Best Picture at the Critics' Choice Awards, while Sinners claims Best Actor and the Sci-Fi/Horror prize. Full list.",
    category: 'Awards',
    author: 'J., Editor-in-Chief',
    publishedAt: '2026-01-13T22:00:00Z',
    readingTime: 7,
  },
  {
    id: 'static-emmys-2026-preview',
    slug: 'emmy-awards-2026-preview',
    href: '/articles/emmy-awards-2026-preview',
    title: 'Emmy Awards 2026 Preview — Predictions for Every Major Category',
    excerpt: 'The 78th Emmy Awards air in September. Our editors predict every major category — from Drama and Comedy to Limited Series — with full analysis.',
    category: 'Awards',
    author: 'J., Editor-in-Chief',
    publishedAt: '2026-06-10T08:00:00Z',
    readingTime: 9,
  },
  // Streaming guides June 2026
  {
    id: 'static-netflix-june-2026',
    slug: 'best-movies-netflix-june-2026',
    href: '/articles/best-movies-netflix-june-2026',
    title: "Best Movies on Netflix — June 2026 Editor's Picks",
    excerpt: 'The best films on Netflix this June: new arrivals, catalogue gems, and our honest ratings. The Woman in the Yard, Companion, Presence, and more.',
    category: 'Streaming Guides',
    author: 'J., Editor-in-Chief',
    publishedAt: '2026-06-01T08:00:00Z',
    readingTime: 6,
  },
  {
    id: 'static-prime-june-2026',
    slug: 'best-movies-prime-video-june-2026',
    href: '/articles/best-movies-prime-video-june-2026',
    title: "Best Movies on Prime Video — June 2026 Editor's Picks",
    excerpt: "Sinners finally arrives on streaming. Plus Conclave, Wolf Man, No Country for Old Men, and more of Prime Video's best films this June.",
    category: 'Streaming Guides',
    author: 'J., Editor-in-Chief',
    publishedAt: '2026-06-01T09:00:00Z',
    readingTime: 5,
  },
  {
    id: 'static-apple-tv-2026',
    slug: 'best-movies-apple-tv-plus-2026',
    href: '/articles/best-movies-apple-tv-plus-2026',
    title: "Best Movies on Apple TV+ in 2026 — Editor's Guide",
    excerpt: "Killers of the Flower Moon alone is worth a month's subscription. Our guide to the best films on Apple TV+ in 2026, with honest ratings for each.",
    category: 'Streaming Guides',
    author: 'J., Editor-in-Chief',
    publishedAt: '2026-05-15T08:00:00Z',
    readingTime: 6,
  },
];

export async function getStaticProps() {
  let firestorePosts = [];

  try {
    const { getAllPostsMeta } = await import('../../lib/firestore');
    firestorePosts = await getAllPostsMeta();
  } catch (err) {
    console.error('Error fetching posts:', err);
  }

  // Merge Firestore posts with static articles; Firestore posts take precedence
  const firestoreSlugs = new Set(firestorePosts.map((p) => p.slug));
  const uniqueStatic = STATIC_ARTICLES.filter((a) => !firestoreSlugs.has(a.slug));
  const posts = [...firestorePosts, ...uniqueStatic].sort(
    (a, b) => new Date(b.publishedAt || 0) - new Date(a.publishedAt || 0)
  );

  const categories = [...new Set(posts.map((p) => p.category).filter(Boolean))];

  return {
    props: {
      posts,
      categories,
    },
    revalidate: 3600,
  };
}
