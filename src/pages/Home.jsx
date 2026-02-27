import React, { useEffect } from 'react';
import Galaxy from '../components/Galaxy';

export default function Home() {
  useEffect(() => {
    if (window.lucide) {
      window.lucide.createIcons();
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animationPlayState = 'running';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.scroll-item').forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <section id="home" className="ketoy-hero">
        {/* Galaxy stars background — original props from repo */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}>
          <Galaxy
            mouseRepulsion={false}
            mouseInteraction={false}
            density={0.7}
            glowIntensity={0.2}
            saturation={0}
            hueShift={140}
            twinkleIntensity={0.2}
            rotationSpeed={0.05}
            repulsionStrength={0}
            autoCenterRepulsion={0}
            starSpeed={1}
            speed={1.2}
          />
        </div>

        <div className="hero-content">
          {/* Version pill */}
          <a
            href="https://github.com/developerstring/ketoy"
            target="_blank"
            rel="noreferrer"
            className="hero-pill scroll-item scroll-fade-up"
            style={{ animationPlayState: 'running' }}
          >
            <span className="hero-pill-badge">LIVE</span>
            <span className="hero-pill-text">Ketoy v3.0 is available now</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
            </svg>
          </a>

          {/* Main headline */}
          <h1 className="hero-headline scroll-item scroll-blur-in delay-100" style={{ animationPlayState: 'running' }}>
            Update Android apps<br />
            <span className="hero-headline-accent">in seconds, not weeks</span>
          </h1>

          {/* Subheadline */}
          <p className="hero-subheadline scroll-item scroll-fade-up delay-200" style={{ animationPlayState: 'running' }}>
            The open source, server-driven UI engine for Jetpack Compose. Write K‑DSL, convert to JSON, render native UI. No Play Store approvals needed.
          </p>

          {/* CTA Buttons */}
          <div className="hero-buttons scroll-item scroll-fade-up delay-300" style={{ animationPlayState: 'running' }}>
            <a
              href="https://github.com/developerstring/ketoy"
              target="_blank"
              rel="noreferrer"
              className="hero-btn-primary"
            >
              Get Started
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
              </svg>
            </a>
            <a
              href="https://github.com/developerstring/ketoy"
              target="_blank"
              rel="noreferrer"
              className="hero-btn-secondary"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              View on GitHub
            </a>
          </div>

          {/* Stats row */}
          <div className="hero-stats scroll-item scroll-fade-up delay-300" style={{ animationPlayState: 'running' }}>
            <div className="hero-stat">
              <span className="hero-stat-value">50+</span>
              <span className="hero-stat-label">Components</span>
            </div>
            <div className="hero-stat-divider" />
            <div className="hero-stat">
              <span className="hero-stat-value">0ms</span>
              <span className="hero-stat-label">Update Delay</span>
            </div>
            <div className="hero-stat-divider" />
            <div className="hero-stat">
              <span className="hero-stat-value">100%</span>
              <span className="hero-stat-label">Native Compose</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
