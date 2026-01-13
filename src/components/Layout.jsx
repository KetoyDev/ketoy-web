import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Layout({ children }) {
  const location = useLocation();

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      <header className="site-header">
        <div className="header-container">
          <div className="header-left">
            <Link to="/" className="logo">
              <div className="logo-mark">
                <img src="/ketoy-logo.svg" alt="Ketoy Logo" width="32" height="32" />
              </div>
              <span className="logo-text">Ketoy</span>
            </Link>
          </div>

          <nav className="nav">
            <Link to="/features" className={isActive('/features') ? 'active' : ''}>
              Features
            </Link>
            <Link to="/playground" className={isActive('/playground') ? 'active' : ''}>
              Playground
            </Link>
            <Link to="/use-cases" className={isActive('/use-cases') ? 'active' : ''}>
              Use Cases
            </Link>
            <Link to="/roadmap" className={isActive('/roadmap') ? 'active' : ''}>
              Roadmap
            </Link>
          </nav>

          <div className="header-right">
            <a 
              href="https://github.com/developerstring/ketoy" 
              target="_blank" 
              rel="noreferrer"
              className="header-icon-link github-link"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              <span className="github-stars">689</span>
            </a>
            <button className="header-icon-btn" title="Theme">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <path d="M2 12h20"/>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
              </svg>
            </button>
            <a 
              href="https://discord.gg/ketoy" 
              target="_blank" 
              rel="noreferrer"
              className="header-icon-btn"
              title="Discord"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
              </svg>
            </a>
            <button className="btn-login">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
                <polyline points="10 17 15 12 10 7"/>
                <line x1="15" y1="12" x2="3" y2="12"/>
              </svg>
              <span>Login</span>
            </button>
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
