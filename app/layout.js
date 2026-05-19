import '../public/styles/site.css';
import '../public/styles/shiki.css';
import Topbar from '@/components/Topbar';
import Footer from '@/components/Footer';

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
  title: 'Ketoy — AI-native app updates for Android',
  description:
    "AI-native Android update infrastructure. Ship UI changes, features, fixes and experiments in under 60 seconds — fully within Play Store policies.",
  icons: { icon: '/assets/ketoy-logo.svg' },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOT }} />
      </head>
      <body>
        <Topbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
