import { SDK_VERSION_FULL } from '@/constants';

// ---------------------------------------------------------------------------
// Canonical site facts. One source of truth for metadata + structured data so
// search engines and LLMs get a consistent, unambiguous description of Ketoy.
// ---------------------------------------------------------------------------

export const SITE_URL = 'https://ketoy.dev';
export const SITE_NAME = 'Ketoy';

// The positioning sentence. Kept keyword-true but human-readable.
export const SITE_TAGLINE =
  'Kotlin-native Server-Driven UI (SDUI) and over-the-air (OTA) updates for Android';

export const SITE_DESCRIPTION =
  'Ketoy is a Kotlin-native server-driven UI (SDUI) framework for Android. Write real Jetpack Compose in Kotlin, compile it to a tiny signed bundle, and push UI changes over-the-air (OTA) in seconds - no Play Store release, no JSON DSL. Fully within Play Store policies.';

// Primary search targets. Ordered by intent priority.
export const SITE_KEYWORDS = [
  'Kotlin SDUI',
  'Android SDUI',
  'Kotlin Native SDUI',
  'Android OTA',
  'Kotlin OTA',
  'server-driven UI Android',
  'Jetpack Compose SDUI',
  'over-the-air updates Android',
  'Compose server-driven UI',
  'Android instant updates',
  'Kotlin server-driven UI framework',
  'SDUI framework',
  'Ketoy',
];

export const OG_IMAGE = `${SITE_URL}/assets/ketoy_logo.png`;

/**
 * Build a Next.js `metadata` object for a page with sensible SEO defaults:
 * canonical URL, Open Graph, Twitter card, and keywords.
 */
export function pageMetadata({
  title,
  description = SITE_DESCRIPTION,
  path = '/',
  keywords,
  type = 'website',
}) {
  const url = `${SITE_URL}${path}`;
  return {
    title,
    description,
    keywords: keywords || SITE_KEYWORDS,
    alternates: { canonical: url },
    // og:image / twitter:image come from the app/opengraph-image file
    // convention (a generated 1200x630 card), so they are omitted here.
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      type,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

// ---------------------------------------------------------------------------
// JSON-LD structured data. Emitted on every page (org + website) plus the
// SoftwareApplication graph on the home page. Gives Google rich-result
// eligibility and gives LLMs clean, quotable facts about Ketoy.
// ---------------------------------------------------------------------------

export const organizationSchema = {
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/assets/ketoy_logo.png`,
  description: SITE_DESCRIPTION,
  sameAs: ['https://github.com/developerchunk/ketoy-extended'],
};

export const websiteSchema = {
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: SITE_URL,
  name: SITE_NAME,
  description: SITE_TAGLINE,
  inLanguage: 'en',
  publisher: { '@id': `${SITE_URL}/#organization` },
};

export const softwareApplicationSchema = {
  '@type': 'SoftwareApplication',
  '@id': `${SITE_URL}/#software`,
  name: 'Ketoy SDK',
  applicationCategory: 'DeveloperApplication',
  applicationSubCategory: 'Server-Driven UI (SDUI) framework',
  operatingSystem: 'Android',
  softwareVersion: SDK_VERSION_FULL,
  programmingLanguage: 'Kotlin',
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  downloadUrl: `${SITE_URL}/get-started`,
  featureList: [
    'Kotlin-native server-driven UI (SDUI)',
    'Over-the-air (OTA) UI updates for Android without a Play Store release',
    'Compiles real Jetpack Compose to a signed .ktx bytecode bundle',
    'Ed25519-signed bundles rendered natively on device',
    'No JSON DSL, no parallel component model',
  ],
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  publisher: { '@id': `${SITE_URL}/#organization` },
};

/** Wrap a list of schema nodes into a single @graph document. */
export function graph(nodes) {
  return { '@context': 'https://schema.org', '@graph': nodes };
}

/** Build a FAQPage node from [{ q, a }] pairs. */
export function faqSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };
}

/** Build a BreadcrumbList node from [{ name, path }] crumbs. */
export function breadcrumbSchema(crumbs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: `${SITE_URL}${c.path}`,
    })),
  };
}
