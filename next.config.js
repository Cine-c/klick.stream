/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // 'standalone' for Docker builds, omit for Cloudflare Pages
  ...(process.env.STANDALONE === 'true' ? { output: 'standalone' } : {}),
  images: {
    // Serve modern formats — AVIF first (smaller), WebP fallback. Big CWV win
    // for an image-heavy poster/backdrop site.
    formats: ['image/avif', 'image/webp'],
    // Cache optimized images at the edge for 24h before re-optimizing.
    minimumCacheTTL: 86400,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.tmdb.org',
        pathname: '/t/p/**',
      },
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
        pathname: '/vi/**',
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
        pathname: '/**',
      },
    ],
  },
  // Tree-shake large libraries so only the icons/modules actually used ship.
  experimental: {
    optimizePackageImports: ['firebase'],
  },
  async rewrites() {
    return [
      { source: '/sitemap.xml', destination: '/api/sitemap.xml' },
      {
        source: '/__/auth/:path*',
        destination: 'https://klick-a2f4e.firebaseapp.com/__/auth/:path*',
      },
      {
        source: '/__/firebase/:path*',
        destination: 'https://klick-a2f4e.firebaseapp.com/__/firebase/:path*',
      },
    ];
  },
  async redirects() {
    return [
      { source: '/trailer', destination: '/trailers', permanent: true },
      { source: '/index.html', destination: '/', permanent: true },
      { source: '/trailer.html', destination: '/trailers', permanent: true },
      { source: '/trailers.html', destination: '/trailers', permanent: true },
      { source: '/privacy.html', destination: '/privacy', permanent: true },
      { source: '/reviews', destination: '/blog', permanent: true },
      { source: '/reviews.html', destination: '/blog', permanent: true },
      { source: '/blockbuster/:slug.html', destination: '/blockbuster', permanent: true },
      // Branded APK download — on-brand URL that redirects to the current GitHub
      // release asset. Temporary (307) so it can be re-pointed on a new release
      // without browsers caching the old target. GitHub still counts the download.
      {
        source: '/download/klick.apk',
        destination: 'https://github.com/Cine-c/klick.stream/releases/download/app-v1.0.0/klick.apk',
        permanent: false,
      },
      { source: '/download', destination: '/app', permanent: false },
    ];
  },
  async headers() {
    return [
      // Immutable static assets — 1 year
      {
        source: '/_next/static/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      // Optimised images — 24h at edge
      {
        source: '/_next/image',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800' },
          { key: 'Vary', value: 'Accept' },
        ],
      },
      // API routes — never cache at CDN
      {
        source: '/api/:path*',
        headers: [
          { key: 'Cache-Control', value: 'no-store' },
        ],
      },
      // Auth / account pages — no CDN cache
      {
        source: '/:path(login|account|watchlater|premium)',
        headers: [
          { key: 'Cache-Control', value: 'private, no-store' },
        ],
      },
      // Articles & blog — 15 min CDN, 2h SWR
      {
        source: '/articles/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, s-maxage=900, stale-while-revalidate=7200' },
        ],
      },
      {
        source: '/blog/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, s-maxage=900, stale-while-revalidate=7200' },
        ],
      },
      // Movie / TV detail pages — 10 min CDN, 1h SWR
      {
        source: '/movies/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, s-maxage=600, stale-while-revalidate=3600' },
        ],
      },
      {
        source: '/tv/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, s-maxage=600, stale-while-revalidate=3600' },
        ],
      },
      // Blockbuster / scenes / celebrity — 1h CDN, 24h SWR
      {
        source: '/:path(blockbuster|scenes|celebrity|oscars-2026)/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, s-maxage=3600, stale-while-revalidate=86400' },
        ],
      },
      // Homepage — 3 min CDN, 15 min SWR (TMDB data refreshes)
      {
        source: '/',
        headers: [
          { key: 'Cache-Control', value: 'public, s-maxage=180, stale-while-revalidate=900' },
        ],
      },
      // Everything else — security headers, 5 min CDN
      {
        source: '/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, s-maxage=300, stale-while-revalidate=3600' },
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
