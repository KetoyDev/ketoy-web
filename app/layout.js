import '../public/styles/site.css';
import '../public/styles/shiki.css';
import { Google_Sans_Code, Urbanist, Geist, JetBrains_Mono, Figtree } from 'next/font/google';
import Topbar from '@/components/Topbar';
import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';
import {
  SITE_URL, SITE_NAME, SITE_TAGLINE, SITE_DESCRIPTION, SITE_KEYWORDS,
  graph, organizationSchema, websiteSchema, softwareApplicationSchema,
} from '@/lib/seo';

// Material / Android type system. Google Sans Code is self-hosted via
// next/font; Google Sans Flex (display + UI + body) is pulled from Google
// Fonts in the document head because next/font does not ship it yet.
const gsCode = Google_Sans_Code({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-gscode',
  display: 'swap',
});

// Landing type (DESIGN.md): Urbanist is the Ketoy wordmark face, Geist carries
// body and UI, JetBrains Mono is the Kotlin ecosystem's own code face.
const urbanist = Urbanist({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-urbanist',
  display: 'swap',
});
const geist = Geist({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-geist',
  display: 'swap',
});
const jbMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jbmono',
  display: 'swap',
});

// Landing page type: Figtree for display and body. Labels, commands and code
// use JetBrains Mono (loaded above). Geist Mono was dropped because Turbopack
// fails to resolve it from Google's dynamic font endpoint.
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
  icons: { icon: '/assets/ketoy-icon.svg' },
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
      className={`${gsCode.variable} ${urbanist.variable} ${geist.variable} ${jbMono.variable} ${figtree.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Google Sans Flex - the Android / Material 3 Expressive typeface.
            Variable axes: optical size, weight and roundness. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Google+Sans+Flex:opsz,wght,ROND@6..144,300..800,0..100&display=swap"
        />
        <meta name="theme-color" content="#05141f" />
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
