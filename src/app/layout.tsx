import type { Metadata, Viewport } from 'next';
import { Analytics } from '@vercel/analytics/next';
import { KETOYVM_VERSION } from '@/data/site';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://ketoy.dev'),
  title: {
    default: 'Ketoy — Ship Android Kotlin Updates Instantly | Runtime Updates for Compose Apps',
    template: '%s · Ketoy',
  },
  description:
    'Ship Android app updates instantly with Ketoy. Push Kotlin, Compose UI, ViewModels, Coroutines, and business logic directly to users without Play Store delays. No DSL. No migration. Works with existing Android codebases.',
  keywords: [
    'android instant updates',
    'instant app updates android',
    'android runtime updates',
    'kotlin runtime',
    'android code push',
    'android hot updates',
    'android live updates',
    'android dynamic updates',
    'compose runtime updates',
    'android ota updates',
    'jetpack compose runtime',
    'compose ui updates',
    'compose hot reload production',
    'kotlin compose runtime',
    'dynamic compose ui',
    'runtime compose rendering',
    'compose server driven ui',
    'android compose infrastructure',
    'server driven ui android',
    'android sdui',
    'sdui kotlin',
    'dynamic ui android',
    'remote ui android',
    'json ui android',
    'server rendered android ui',
    'android ui from server',
    'android release infrastructure',
    'mobile deployment infrastructure',
    'android deployment platform',
    'android release automation',
    'android ci cd updates',
    'mobile app deployment system',
    'android release engineering',
    'mobile runtime infrastructure',
    'play store approval delay',
    'android app review delays',
    'faster android app updates',
    'ship android updates faster',
    'android app rollout delay',
    'avoid play store delays',
    'android release bottleneck',
    'instant bug fixes android',
    'codepush alternative android',
    'expo updates alternative',
    'firebase remote config alternative',
    'android hotfix system',
    'android patch delivery',
    'react native codepush for android native',
    'native android codepush',
    'Ketoy',
    'Server Driven UI',
    'Server-Driven UI Android',
    'Remote Compose',
    'Jetpack Compose runtime',
    'Kotlin execution runtime',
    'Android code push',
    'OTA Android updates',
    'ship app updates in seconds',
    'ship app updates quickly',
    'skip Play Store review',
    'Android over the air updates',
    'Compose over the air',
    'Kotlin bundle',
    '.ktx bundle',
    'Ketoy Bytecode',
    'KBC',
    'Hermes for Kotlin',
    'React Native alternative Android',
    'mobile code push',
    'CodePush Kotlin',
    'SDUI',
    'server driven UI framework',
    'Kotlin DSL free',
    'Android runtime',
    'Android CI CD',
    'continuous delivery Android',
    'hot reload Android',
    'feature flags Android',
    'remote rendering Android',
  ],
  authors: [{ name: 'Ketoy' }],
  applicationName: 'Ketoy',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
  },
  alternates: {
    canonical: 'https://ketoy.dev/',
    languages: {
      'en-US': 'https://ketoy.dev/',
    },
  },
  openGraph: {
    type: 'website',
    siteName: 'Ketoy',
    title: 'Ketoy — Ship Android Kotlin Updates Instantly | Runtime Updates for Compose Apps',
    description:
      'Ship Android app updates instantly with Ketoy. Push Kotlin, Compose UI, ViewModels, Coroutines, and business logic directly to users without Play Store delays. No DSL. No migration. Works with existing Android codebases.',
    url: 'https://ketoy.dev/',
    images: [{
      url: 'https://ketoy.dev/assets/vol-img.png',
      width: 1200,
      height: 630,
      alt: 'Ketoy: Instant Android App Updates for Kotlin & Compose',
      type: 'image/png',
    }],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@KetoyDev',
    creator: '@KetoyDev',
    title: 'Ketoy — Ship Android Kotlin Updates Instantly',
    description:
      'Ship Android app updates instantly with Ketoy. Push Kotlin, Compose UI, ViewModels, and Coroutines directly to users without Play Store delays.',
    images: [{ url: 'https://ketoy.dev/assets/vol-img.png', alt: 'Ketoy: Instant Android App Updates' }],
  },
  icons: {
    icon: '/assets/ketoy_logo.png',
    apple: '/assets/ketoy_logo.png',
  },
};

export const viewport: Viewport = {
  themeColor: '#08090a',
  width: 'device-width',
  initialScale: 1,
};

const siteJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      name: 'Ketoy',
      url: 'https://ketoy.dev',
      logo: 'https://ketoy.dev/assets/ketoy_logo.png',
      description:
        'Ketoy is a Kotlin runtime infrastructure for Android that enables instant app updates without Play Store releases.',
      sameAs: [
        'https://twitter.com/KetoyDev',
        'https://github.com/KetoyDev/ketoy',
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'Developer Support',
        email: 'support@ketoy.dev',
      },
    },
    {
      '@type': 'SoftwareApplication',
      name: 'Ketoy',
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'Android',
      description:
        'Ketoy is a Kotlin execution runtime for Android that lets teams ship Jetpack Compose, Coroutines, ViewModels, and Navigation over-the-air as a .ktx bundle, updating every device in about 60 seconds without a Play Store release. Hilt and Room stay in the host app; Ketoy exposes their functions for new features because updating them requires a Play Store release.',
      url: 'https://ketoy.dev/',
      image: 'https://ketoy.dev/assets/vol-img.png',
      softwareVersion: KETOYVM_VERSION,
      keywords:
        'Android instant updates, Kotlin runtime, Server-Driven UI, Android OTA updates, Jetpack Compose runtime, Android code push, instant app updates, SDUI Android',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD', availability: 'https://schema.org/InStock' },
      publisher: { '@type': 'Organization', name: 'Ketoy', url: 'https://ketoy.dev', email: 'support@ketoy.dev' },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '5',
        bestRating: '5',
        worstRating: '1',
        ratingCount: '42',
      },
      author: { '@type': 'Organization', name: 'Ketoy' },
      isAccessibleForFree: true,
    },
    {
      '@type': 'WebSite',
      name: 'Ketoy',
      url: 'https://ketoy.dev',
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: 'https://ketoy.dev/search?q={search_term_string}',
        },
        'query-input': 'required name=search_term_string',
      },
      description: 'Instant Android app updates with Kotlin runtime execution',
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://ketoy.dev/',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Documentation',
          item: 'https://ketoy.dev/docs',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Changelog',
          item: 'https://ketoy.dev/changelog',
        },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is Ketoy?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Ketoy is a Kotlin execution runtime for Android that runs Ketoy Bytecode compiled from plain Kotlin source, including Jetpack Compose, coroutines, ViewModels, and Navigation, delivered as a .ktx bundle. Hilt and Room stay in the host app; Ketoy exposes their functions for new features because updating them requires a Play Store release.',
          },
        },
        {
          '@type': 'Question',
          name: 'How do I ship Android app updates in seconds?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Write Kotlin, run ./gradlew ketoyBundle, upload the resulting .ktx to Ketoy Cloud, and the KetoyRuntime on every device fetches and executes the new bundle in about 60 seconds without Play Store review or binary split.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is Ketoy a server-driven UI framework?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Ketoy is stronger than a server-driven UI DSL: it executes real Kotlin on device with native Jetpack Compose rendering, real coroutine semantics and real ViewModel lifecycles, so you keep full-surface Compose without a custom schema.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is this like CodePush or Hermes?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "What Hermes is to React Native's JavaScript, Ketoy is to Kotlin and Compose: a purpose-built execution runtime, not a script interpreter wedged into a different stack.",
          },
        },
        {
          '@type': 'Question',
          name: 'How is Ketoy different from CodePush for Android?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Unlike CodePush which is for JavaScript, Ketoy is a native Kotlin runtime that executes real Kotlin bytecode with full Jetpack Compose support, ViewModels, and Coroutines. It delivers faster updates without the JavaScript bridge overhead.',
          },
        },
        {
          '@type': 'Question',
          name: 'What are the benefits of Server-Driven UI with Ketoy?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Server-Driven UI (SDUI) with Ketoy provides instant UI updates without Play Store reviews, dynamic feature rollouts, A/B testing, and the ability to fix bugs in production immediately.',
          },
        },
        {
          '@type': 'Question',
          name: 'Does Ketoy work with existing Android projects?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes! Ketoy integrates seamlessly with existing Android projects. Hilt and Room stay in the host app, and Ketoy exposes their functions, so you can gradually adopt it without a complete rewrite.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can I use Kotlin Coroutines with Ketoy?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes! Ketoy supports full Kotlin Coroutines semantics within your bundled code, including suspend functions, Flow, and proper cancellation handling.',
          },
        },
      ],
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@300;400;500&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }}
        />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
