import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import FloatingLogos from './FloatingLogos.jsx';

export default function Layout({ children }) {
  const location = useLocation();

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      <FloatingLogos />
      <header className="site-header">
        <div className="container header-inner">
          <Link to="/" className="logo">
            <div className="logo-mark">
              <svg width="50" height="50" viewBox="0 0 55 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="mountainGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#ff8c42', stopOpacity: 1 }} />
                    <stop offset="50%" style={{ stopColor: '#d65db1', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: '#845ec2', stopOpacity: 1 }} />
                  </linearGradient>
                </defs>
                <path d="M 0 45 Q 15 35, 30 40 Q 45 45, 55 35 L 55 50 L 0 50 Z" fill="#1e3a5f"/>
                <path d="M 0 35 Q 12 28, 25 32 Q 38 36, 50 28 Q 55 25, 55 35 L 55 50 L 0 50 Z" fill="#2d5a8f"/>
                <path d="M 0 20 Q 10 12, 20 18 Q 30 24, 40 16 Q 48 10, 55 20 L 55 50 L 0 50 Z" fill="url(#mountainGradient)"/>
              </svg>
            </div>
            <span className="logo-text">Ketoy</span>
          </Link>
          <nav className="nav">
            <Link to="/" className={isActive('/') && location.pathname === '/' ? 'active' : ''}>
              Home
            </Link>
            <Link to="/features" className={isActive('/features') ? 'active' : ''}>
              Features
            </Link>
            <Link to="/use-cases" className={isActive('/use-cases') ? 'active' : ''}>
              Use Cases
            </Link>
            <Link to="/docs" className={isActive('/docs') ? 'active' : ''}>
              Docs
            </Link>
            <Link to="/roadmap" className={isActive('/roadmap') ? 'active' : ''}>
              Roadmap
            </Link>
          </nav>
          <div className="nav-cta">
            <a className="btn btn-ghost" href="https://github.com/developerstring/ketoy" target="_blank" rel="noreferrer">
              GitHub
            </a>
            <Link className="btn btn-primary" to="/docs">
              Get started
            </Link>
          </div>
        </div>
      </header>

      <main>
        {children}
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <div className="footer-content">
            <div className="footer-brand">
              <Link to="/" className="logo">
                <div className="logo-mark">
                  <svg width="44" height="44" viewBox="0 0 55 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="mountainGradientFooter" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style={{ stopColor: '#ff8c42', stopOpacity: 1 }} />
                        <stop offset="50%" style={{ stopColor: '#d65db1', stopOpacity: 1 }} />
                        <stop offset="100%" style={{ stopColor: '#845ec2', stopOpacity: 1 }} />
                      </linearGradient>
                    </defs>
                    <path d="M 0 45 Q 15 35, 30 40 Q 45 45, 55 35 L 55 50 L 0 50 Z" fill="#1e3a5f"/>
                    <path d="M 0 35 Q 12 28, 25 32 Q 38 36, 50 28 Q 55 25, 55 35 L 55 50 L 0 50 Z" fill="#2d5a8f"/>
                    <path d="M 0 20 Q 10 12, 20 18 Q 30 24, 40 16 Q 48 10, 55 20 L 55 50 L 0 50 Z" fill="url(#mountainGradientFooter)"/>
                  </svg>
                </div>
                <span className="logo-text">Ketoy</span>
              </Link>
              <p className="footer-tagline">Server-driven UI for Android</p>
            </div>
            <div className="footer-links-grid">
              <div className="footer-links-col">
                <h4>Product</h4>
                <Link to="/features">Features</Link>
                <Link to="/use-cases">Use Cases</Link>
                <Link to="/roadmap">Roadmap</Link>
              </div>
              <div className="footer-links-col">
                <h4>Resources</h4>
                <Link to="/docs">Documentation</Link>
                <a href="https://github.com/developerstring/ketoy" target="_blank" rel="noreferrer">
                  GitHub
                </a>
                <a href="https://github.com/developerstring/ketoy/issues" target="_blank" rel="noreferrer">
                  Issues
                </a>
              </div>
              <div className="footer-links-col">
                <h4>Community</h4>
                <a href="https://discord.gg/ketoy" target="_blank" rel="noreferrer">
                  Discord
                </a>
                <a href="https://github.com/developerstring/ketoy/discussions" target="_blank" rel="noreferrer">
                  Discussions
                </a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© 2025 Ketoy · MIT License</span>
          </div>
        </div>
      </footer>
    </>
  );
}
