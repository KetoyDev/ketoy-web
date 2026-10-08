import '../public/styles/site.css';
import '../public/styles/theme.css';
import '../public/styles/shiki.css';
import { JetBrains_Mono, Figtree } from 'next/font/google';
import Topbar from '@/components/Topbar';
import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';
import {
  SITE_URL, SITE_NAME, SITE_TAGLINE, SITE_DESCRIPTION, SITE_KEYWORDS,
  graph, organizationSchema, websiteSchema, softwareApplicationSchema,
} from '@/lib/seo';

// Site type: Figtree for display, UI and body; JetBrains Mono for labels,
// commands and code. (Geist Mono was dropped because Turbopack fails to
// resolve it from Google's dynamic font endpoint.)
const jbMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jbmono',
  display: 'swap',
});
const figtree = Figtree({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-figtree',
  display: 'swap',
});

// Light is the default (DESIGN.md). Only an explicit saved "dark" preference
// opts in, applied before first paint so there is no flash.
const THEME_BOOT = `
(function () {
  try {
    if (localStorage.getItem('ketoy-theme') === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
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
  icons: { icon: '/assets/ketoy-icon.svg?v=3' },
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
      className={`${jbMono.variable} ${figtree.variable}`}
      suppressHydrationWarning
    >
      <head>
        <meta name="theme-color" content="#0d0b13" />
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
