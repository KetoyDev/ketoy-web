import '../public/styles/site.css';
import '../public/styles/shiki.css';
import { Outfit, Urbanist, JetBrains_Mono } from 'next/font/google';
import Topbar from '@/components/Topbar';
import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';
import {
  SITE_URL, SITE_NAME, SITE_TAGLINE, SITE_DESCRIPTION, SITE_KEYWORDS,
  graph, organizationSchema, websiteSchema, softwareApplicationSchema,
} from '@/lib/seo';

// Self-hosted, preloaded, non-render-blocking. Each exposes a CSS variable
// consumed by --font-display / --font-ui / --font-mono in site.css.
const outfit = Outfit({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-outfit',
  display: 'swap',
});
const urbanist = Urbanist({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-urbanist',
  display: 'swap',
});
const jbMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-jbmono',
  display: 'swap',
});

const THEME_BOOT = `
(function () {
  try {
    if (localStorage.getItem('ketoy-theme') === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  } catch (e) {}
})();
`;

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} - ${SITE_TAGLINE}`,
    template: `%s · ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: SITE_KEYWORDS,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: 'technology',
  icons: { icon: '/assets/ketoy-logo.svg' },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    title: `${SITE_NAME} - ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} - ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${urbanist.variable} ${jbMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Warm the Fontshare connection, then pull Switzer (body font).
            Self-hosted fonts above cover display/UI/mono if this is slow. */}
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=switzer@300,400,500&display=swap"
        />
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOT }} />
        <JsonLd data={graph([organizationSchema, websiteSchema, softwareApplicationSchema])} />
      </head>
      <body suppressHydrationWarning>
        <Topbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
