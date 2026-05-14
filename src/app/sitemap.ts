import type { MetadataRoute } from 'next';
import { blogs } from '@/data/blogs';

const SITE = 'https://ketoy.dev';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  return [
    // Homepage - highest priority
    {
      url: `${SITE}/`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    // Key SEO landing pages for primary keywords
    {
      url: `${SITE}/instant-android-updates`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${SITE}/compose-runtime-updates`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${SITE}/server-driven-ui-android`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${SITE}/codepush-alternative-android`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    // Core features pages
    {
      url: `${SITE}/features`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
    {
      url: `${SITE}/features/instant-updates`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${SITE}/features/kotlin-runtime`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${SITE}/features/compose-support`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${SITE}/features/zero-downtime`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    // Use cases
    {
      url: `${SITE}/use-cases`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${SITE}/use-cases/hotfixes`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${SITE}/use-cases/ab-testing`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${SITE}/use-cases/feature-rollout`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    // Competitive comparisons
    {
      url: `${SITE}/vs/codepush`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
    {
      url: `${SITE}/vs/firebase-remote-config`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
    {
      url: `${SITE}/vs/expo-updates`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
    // Documentation
    {
      url: `${SITE}/docs`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${SITE}/docs/getting-started`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${SITE}/docs/kotlin-runtime`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${SITE}/docs/compose-integration`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${SITE}/docs/api-reference`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    // Learning center
    {
      url: `${SITE}/learn`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${SITE}/learn/sdui-guide`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${SITE}/learn/kotlin-runtime-execution`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    // Blog and articles
    {
      url: `${SITE}/blogs`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    ...blogs.map((b) => ({
      url: `${SITE}/blogs/${b.slug}`,
      lastModified: b.date,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    // Community and company
    {
      url: `${SITE}/community`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${SITE}/about`,
      lastModified: now,
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    },
    {
      url: `${SITE}/changelog`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
  ];
}
