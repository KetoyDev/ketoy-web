import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import Features from './pages/Features.jsx';
import UseCases from './pages/UseCases.jsx';
import Playground from './pages/Playground.jsx';
import Roadmap from './pages/Roadmap.jsx';

export default function App() {
  console.log('App component rendering');
  
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/features" element={<Features />} />
          <Route path="/use-cases" element={<UseCases />} />
          <Route path="/playground" element={<Playground />} />
          <Route path="/roadmap" element={<Roadmap />} />
        </Routes>
      </Layout>
    </Router>
  );
}
