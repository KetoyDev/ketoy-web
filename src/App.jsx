import React from 'react';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import Features from './pages/Features.jsx';
import Playground from './pages/Playground.jsx';
import UseCases from './pages/UseCases.jsx';
import Roadmap from './pages/Roadmap.jsx';

export default function App() {
  console.log('App component rendering');
  
  return (
    <Layout>
      {/* Single scrolling page with all sections */}
      <Home />
      <Features />
      <Playground />
      <UseCases />
      <Roadmap />
    </Layout>
  );
}
