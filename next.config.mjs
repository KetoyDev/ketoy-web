import createMDX from '@next/mdx';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'mdx'],
  // Pin the tracing root so Next doesn't infer a parent workspace (silences
  // the multi-lockfile warning and keeps builds fast/deterministic).
  outputFileTracingRoot: __dirname,

  async headers() {
    return [
      {
        // Docs pages are statically generated and only change on deploy.
        // Let browsers/CDN serve them instantly and revalidate in the
        // background.
        source: '/docs/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, s-maxage=86400, stale-while-revalidate=604800',
          },
        ],
      },
      {
        // Static assets (images, scripts) are content-stable.
        source: '/assets/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/styles/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=86400, stale-while-revalidate=604800' },
        ],
      },
    ];
  },
};

const withMDX = createMDX({
  options: {
    // String form so the options are serializable for Turbopack (function
    // plugins can't be serialized). Works for the webpack build too.
    remarkPlugins: [['remark-gfm']],
  },
});

export default withMDX(nextConfig);
