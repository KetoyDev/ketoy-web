/**
 * Ketoy SEO Configuration
 * 
 * This configuration defines the SEO strategy for Ketoy across all pages
 * targeting Google, Bing, Yahoo, Brave, and other search engines.
 * 
 * Strategy:
 * 1. Primary positioning: "Kotlin Runtime Infrastructure for Android"
 * 2. Secondary keywords: Instant updates, SDUI, OTA, CodePush alternative
 * 3. Long-tail keywords: Pain-based, competitive, and developer-focused
 */

export const SEO_CONFIG = {
  // Site metadata
  site: {
    name: 'Ketoy',
    description: 'Instant Android app updates with Kotlin runtime execution',
    url: 'https://ketoy.dev',
    mainImage: 'https://ketoy.dev/assets/vol-img.png',
    twitterHandle: '@KetoyDev',
    email: 'support@ketoy.dev',
  },

  // Primary keywords - highest priority for SEO
  primaryKeywords: [
    'android instant updates',
    'instant app updates android',
    'android runtime updates',
    'kotlin runtime',
    'android code push',
    'android hot updates',
  ],

  // Secondary keywords - SDUI and Compose
  sdkeywords: [
    'server driven ui android',
    'android sdui',
    'sdui kotlin',
    'jetpack compose runtime',
    'compose ui updates',
    'dynamic compose ui',
  ],

  // Competitive keywords - beat competitors
  competitiveKeywords: [
    'codepush alternative android',
    'expo updates alternative',
    'firebase remote config alternative',
    'android hotfix system',
    'native android codepush',
  ],

  // Pain-based keywords - high conversion
  painKeywords: [
    'play store approval delay',
    'android app review delays',
    'faster android app updates',
    'ship android updates faster',
    'avoid play store delays',
    'instant bug fixes android',
  ],

  // Developer infrastructure keywords
  infraKeywords: [
    'android release infrastructure',
    'mobile deployment infrastructure',
    'android deployment platform',
    'android release automation',
    'android release engineering',
  ],

  // Landing pages for SEO
  landingPages: [
    {
      slug: 'instant-android-updates',
      title: 'Instant Android App Updates with Kotlin Runtime Execution',
      description: 'Ship Android app updates instantly without Play Store reviews using Ketoy\'s Kotlin runtime.',
      keywords: ['android instant updates', 'kotlin runtime', 'app updates', 'android ota'],
      priority: 0.95,
    },
    {
      slug: 'compose-runtime-updates',
      title: 'Jetpack Compose Runtime Updates Without Play Store Releases',
      description: 'Update Jetpack Compose UI instantly with Ketoy\'s server-side rendering and runtime execution.',
      keywords: ['compose runtime', 'jetpack compose updates', 'dynamic ui', 'compose server driven'],
      priority: 0.9,
    },
    {
      slug: 'server-driven-ui-android',
      title: 'Server Driven UI for Android using Kotlin & Compose',
      description: 'Implement Server-Driven UI (SDUI) with Ketoy for dynamic, remotely-controlled Android interfaces.',
      keywords: ['server driven ui', 'sdui android', 'dynamic ui android', 'remote rendering'],
      priority: 0.9,
    },
    {
      slug: 'codepush-alternative-android',
      title: 'CodePush Alternative for Native Android Apps',
      description: 'Ketoy is the native Android CodePush alternative with full Kotlin support and Compose integration.',
      keywords: ['codepush alternative', 'native codepush', 'android hotfix', 'ota updates'],
      priority: 0.95,
    },
    {
      slug: 'android-ota-updates',
      title: 'Android OTA Updates: Skip Play Store with Ketoy Runtime',
      description: 'Deliver instant OTA updates to Android devices without waiting for Play Store approval.',
      keywords: ['android ota updates', 'over the air updates', 'skip play store', 'instant updates'],
      priority: 0.88,
    },
    {
      slug: 'kotlin-runtime-android',
      title: 'Kotlin Runtime Execution for Android Apps',
      description: 'Execute Kotlin code at runtime with Ketoy\'s bytecode VM for dynamic app features.',
      keywords: ['kotlin runtime', 'kotlin execution', 'runtime bytecode', 'dynamic kotlin'],
      priority: 0.85,
    },
  ],

  // FAQ structured data
  faqs: [
    {
      question: 'What is Ketoy?',
      answer: 'Ketoy is a Kotlin execution runtime for Android that lets you ship plain Kotlin code with Jetpack Compose, coroutines, and ViewModels as over-the-air bundles without Play Store releases.',
    },
    {
      question: 'How is Ketoy different from CodePush?',
      answer: 'CodePush is for React Native JavaScript. Ketoy is a native Kotlin runtime with full Jetpack Compose support, real coroutines, and ViewModels—delivering faster updates without a JavaScript bridge.',
    },
    {
      question: 'Is Ketoy a Server-Driven UI framework?',
      answer: 'Ketoy is stronger than traditional SDUI frameworks. It executes real Kotlin on-device with native rendering, full coroutine semantics, and ViewModel lifecycles—no DSL needed.',
    },
    {
      question: 'Can I avoid Play Store delays with Ketoy?',
      answer: 'Yes! Update your app in 60 seconds without Play Store review. Ship bug fixes, features, and UI changes instantly to all devices.',
    },
    {
      question: 'Does Ketoy work with existing Android projects?',
      answer: 'Absolutely. Ketoy integrates with existing projects. Hilt and Room stay in the host app, while Ketoy exposes their functions for your remote features.',
    },
  ],

  // Blog article topics for organic SEO
  blogTopics: [
    'Why Android Updates Still Take Days in 2026',
    'How to Push Android UI Updates Instantly',
    'Building Server Driven UI with Jetpack Compose',
    'CodePush for Native Android Apps',
    'Runtime Kotlin Execution on Android',
    'How Companies Ship Android Updates Faster',
    'Play Store Delays Are Killing Mobile Iteration',
    'Compose UI Without App Releases',
    'Android OTA Updates: Best Practices',
    'Feature Flags in Jetpack Compose',
  ],

  // YouTube content ideas
  youtubeTopics: [
    'Ship Android Updates Instantly with Kotlin',
    'We Built CodePush for Native Android',
    'Android Updates in Under 10 Seconds',
    'No More Play Store Waiting',
    'Runtime Kotlin Execution on Android',
    'Instant Compose UI Updates',
    'Server-Driven UI with Jetpack Compose',
  ],

  // GitHub keywords (for open-source discoverability)
  githubKeywords: [
    'android',
    'kotlin',
    'jetpack-compose',
    'android-runtime',
    'sdui',
    'server-driven-ui',
    'compose-ui',
    'android-updates',
    'dynamic-ui',
    'hot-update',
    'ota-updates',
    'runtime-execution',
    'mobile-infrastructure',
    'developer-tools',
  ],

  // Schema.org structured data types
  schemaTypes: [
    'SoftwareApplication',
    'Organization',
    'FAQPage',
    'BreadcrumbList',
    'WebSite',
    'Product',
    'HowTo',
  ],

  // Canonical URLs for main pages
  canonicalUrls: {
    home: 'https://ketoy.dev/',
    docs: 'https://ketoy.dev/docs',
    blog: 'https://ketoy.dev/blogs',
    community: 'https://ketoy.dev/community',
  },

  // Open Graph image dimensions
  ogImage: {
    width: 1200,
    height: 630,
    type: 'image/png',
  },

  // Twitter card defaults
  twitterCard: 'summary_large_image',

  // Indexing rules
  robots: {
    index: true,
    follow: true,
    googlebot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },

  // Alternate language support (for future expansion)
  languages: ['en-US'],

  // Performance hints
  preloadResources: [
    '/assets/ketoy_logo.png',
    '/fonts/inter.woff2',
  ],
} as const;

/**
 * Generate SEO metadata for a page
 */
export function generatePageSEO(page: {
  title: string;
  description: string;
  keywords?: string[];
  path?: string;
}) {
  return {
    title: page.title,
    description: page.description,
    keywords: page.keywords?.join(', ') || '',
    canonical: `${SEO_CONFIG.site.url}${page.path || '/'}`,
    openGraph: {
      title: page.title,
      description: page.description,
      url: `${SEO_CONFIG.site.url}${page.path || '/'}`,
    },
    twitter: {
      title: page.title,
      description: page.description,
    },
  };
}

export default SEO_CONFIG;
