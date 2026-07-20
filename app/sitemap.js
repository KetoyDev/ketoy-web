import { SITE_URL } from '@/lib/seo';
import { docsNav } from '@/modules/docs/lib/nav';
import { updates } from '@/modules/updates/lib/updates';

// Dynamic sitemap served at /sitemap.xml. Enumerates every real route so
// search engines can discover and prioritise the full surface (marketing +
// docs + updates), instead of the handful of stale .html URLs before.
export default function sitemap() {
  const now = new Date();

  const top = [
    { path: '/', priority: 1.0, changeFrequency: 'weekly' },
    { path: '/get-started', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/features', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/architecture', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/docs', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/updates', priority: 0.6, changeFrequency: 'weekly' },
    { path: '/updates/platform', priority: 0.5, changeFrequency: 'weekly' },
    { path: '/updates/sdk', priority: 0.5, changeFrequency: 'weekly' },
  ];

  // Every docs page, pulled from the sidebar nav so the sitemap can never
  // drift from the actual routes.
  const docs = docsNav
    .flatMap((group) => group.items)
    .map((item) => item.href)
    .filter((href) => href && href !== '#' && href !== '/docs')
    .map((path) => ({ path, priority: 0.7, changeFrequency: 'monthly' }));

  // Every individual update, crawlable at /updates/<section>/<id>.
  const updateDetails = updates.map((u) => ({
    path: `/updates/${u.section}/${u.id}`,
    priority: 0.5,
    changeFrequency: 'monthly',
  }));

  return [...top, ...docs, ...updateDetails].map(({ path, priority, changeFrequency }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));
}
