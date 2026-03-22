import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import Features from './pages/Features.jsx';
import Playground from './pages/Playground.jsx';
import UseCases from './pages/UseCases.jsx';
import GradlePlugin from './pages/GradlePlugin.jsx';
import Roadmap from './pages/Roadmap.jsx';
import useSEO from './hooks/useSEO';

// Heavy standalone pages — code-split so they don't block initial load
const Pricing = lazy(() => import('./pages/Pricing.jsx'));
const PlaygroundPage = lazy(() => import('./playground/PlaygroundPage.jsx'));
const TermsOfService = lazy(() => import('./pages/TermsOfService.jsx'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy.jsx'));
const Security = lazy(() => import('./pages/Security.jsx'));
const Team = lazy(() => import('./pages/Team.jsx'));
const Contact = lazy(() => import('./pages/Contact.jsx'));

const PageLoader = () => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: '#000' }}>
    <div style={{ width: 32, height: 32, border: '2px solid rgba(255,255,255,0.1)', borderTop: '2px solid #4f46e5', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
  </div>
);

function LandingPage() {
  useSEO({
    title: 'Ketoy — Server-Driven UI Framework for Android | Update Apps Instantly',
    description: 'Ketoy is an open-source Server-Driven UI (SDUI) framework for Android Jetpack Compose. Update your app\'s UI instantly from the cloud without releasing a new build.',
    path: '/',
  })
  return (
    <Layout>
      <Home />
      <Features />
      <Playground />
      <GradlePlugin />
      <UseCases />
      <Roadmap />
    </Layout>
  );
}

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/playground" element={<Suspense fallback={<PageLoader />}><PlaygroundPage /></Suspense>} />
        <Route path="/pricing" element={<Suspense fallback={<PageLoader />}><Pricing /></Suspense>} />
        <Route path="/terms" element={<Suspense fallback={<PageLoader />}><TermsOfService /></Suspense>} />
        <Route path="/privacy" element={<Suspense fallback={<PageLoader />}><PrivacyPolicy /></Suspense>} />
        <Route path="/security" element={<Suspense fallback={<PageLoader />}><Security /></Suspense>} />
        <Route path="/team" element={<Suspense fallback={<PageLoader />}><Team /></Suspense>} />
        <Route path="/contact" element={<Suspense fallback={<PageLoader />}><Contact /></Suspense>} />
      </Routes>
      <Analytics />
    </>
  );
}
