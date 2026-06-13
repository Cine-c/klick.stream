const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://klick.stream';

function urlEntry({ loc, lastmod, changefreq = 'weekly', priority = '0.5' }) {
  return `  <url>
    <loc>${loc}</loc>${lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ''}
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

const STATIC_PAGES = [
  { url: '/',                                              priority: '1.0', changefreq: 'daily' },
  { url: '/trailers',                                      priority: '0.9', changefreq: 'daily' },
  { url: '/discover',                                      priority: '0.9', changefreq: 'daily' },
  { url: '/blog',                                          priority: '0.8', changefreq: 'daily' },
  { url: '/tv',                                            priority: '0.9', changefreq: 'daily' },
  { url: '/worldcup',                                      priority: '0.95', changefreq: 'daily' },
  { url: '/tour-de-france',                                priority: '0.85', changefreq: 'daily' },
  { url: '/love-island-usa',                               priority: '0.85', changefreq: 'daily' },
  { url: '/blockbuster',                                   priority: '0.7', changefreq: 'weekly' },
  { url: '/scenes',                                        priority: '0.7', changefreq: 'weekly' },
  { url: '/celebrity',                                     priority: '0.7', changefreq: 'weekly' },
  { url: '/oscars-2026',                                   priority: '0.6', changefreq: 'monthly' },
  { url: '/academy/acting-masterclass',                    priority: '0.6', changefreq: 'monthly' },
  { url: '/academy/cinematography',                        priority: '0.6', changefreq: 'monthly' },
  { url: '/academy/editing-magic',                         priority: '0.6', changefreq: 'monthly' },
  { url: '/academy/film-scores',                           priority: '0.6', changefreq: 'monthly' },
  { url: '/articles/anaconda-blood-coil',                  priority: '0.7', changefreq: 'monthly' },
  { url: '/articles/austin-butler-movies-filmography',     priority: '0.7', changefreq: 'monthly' },
  { url: '/articles/best-horror-movies-2026',              priority: '0.8', changefreq: 'weekly' },
  { url: '/articles/best-movies-netflix-april-2026',       priority: '0.7', changefreq: 'monthly' },
  { url: '/articles/best-movies-prime-video-april-2026',   priority: '0.7', changefreq: 'monthly' },
  { url: '/articles/best-thriller-movies-2026',            priority: '0.8', changefreq: 'weekly' },
  { url: '/articles/chickenhare-groundhog',                priority: '0.6', changefreq: 'monthly' },
  { url: '/articles/movies-like-peaky-blinders',           priority: '0.7', changefreq: 'monthly' },
  { url: '/articles/my-boo-2',                             priority: '0.6', changefreq: 'monthly' },
  { url: '/articles/new-movies-streaming-this-week',       priority: '0.8', changefreq: 'weekly' },
  { url: '/articles/scream-7-2026-review',                 priority: '0.7', changefreq: 'monthly' },
  { url: '/articles/sydney-sweeney-career',                priority: '0.7', changefreq: 'monthly' },
  { url: '/articles/where-to-watch-goat-2026',             priority: '0.7', changefreq: 'monthly' },
  { url: '/articles/where-to-watch-peaky-blinders-immortal-man', priority: '0.7', changefreq: 'monthly' },
  { url: '/about',                                         priority: '0.5', changefreq: 'monthly' },
  { url: '/privacy',                                       priority: '0.3', changefreq: 'yearly' },
];

export default function Sitemap() {
  return null;
}

export async function getServerSideProps({ res }) {
  const entries = [];

  // Static pages
  for (const page of STATIC_PAGES) {
    entries.push(urlEntry({ loc: `${SITE_URL}${page.url}`, changefreq: page.changefreq, priority: page.priority }));
  }

  // Blog posts from Firestore
  try {
    const { getAllPostSlugs } = await import('../lib/firestore');
    const posts = await getAllPostSlugs();
    for (const post of posts) {
      entries.push(urlEntry({
        loc: `${SITE_URL}/blog/${post.slug}`,
        lastmod: post.updatedAt ? post.updatedAt.split('T')[0] : undefined,
        changefreq: 'weekly',
        priority: '0.7',
      }));
    }
  } catch {
    // Firebase unavailable — static pages already included
  }

  // Celebrity pages
  try {
    const data = require('../data/celebrities.json');
    for (const c of (data.celebrities || [])) {
      entries.push(urlEntry({ loc: `${SITE_URL}/celebrity/${c.slug}`, changefreq: 'monthly', priority: '0.6' }));
    }
  } catch {
    // celebrities.json missing — skip
  }

  // Scene pages
  const sceneSlugs = [
    'ill-be-back-terminator', 'heres-looking-at-you-casablanca',
    'bullet-time-matrix', 'i-am-your-father-empire-strikes-back',
    'shower-scene-psycho', 'you-talking-to-me-taxi-driver',
    'heeeeres-johnny-the-shining', 'i-could-have-gotten-more-schindlers-list',
  ];
  for (const slug of sceneSlugs) {
    entries.push(urlEntry({ loc: `${SITE_URL}/scenes/${slug}`, changefreq: 'monthly', priority: '0.6' }));
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join('\n')}
</urlset>`;

  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=3600');
  res.write(xml);
  res.end();

  return { props: {} };
}
