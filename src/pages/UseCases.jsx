import React from 'react';
import { ParticleCard, GlobalSpotlight } from '../components/MagicBento.jsx';

export default function UseCases() {
  const useCasesGridRef = React.useRef(null);

  return (
    <>
      <section id="use-cases" className="section page-section">
        <div className="container">
          <div className="page-header">
            <h1>Built for speed, made for scale</h1>
            <p className="section-lead">See how leading teams use Ketoy to ship faster and experiment more.</p>
          </div>
          <GlobalSpotlight
            gridRef={useCasesGridRef}
            enabled={true}
            spotlightRadius={260}
            glowColor="59, 130, 246"
          />
          <div className="grid grid-2 usecases-grid bento-section" ref={useCasesGridRef}>
            <ParticleCard
              className="card magic-bento-card magic-bento-card--border-glow"
              particleCount={10}
              glowColor="59, 130, 246"
              enableTilt={false}
              enableMagnetism={false}
              clickEffect={false}
            >
              <div className="feature-content">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                  <div className="feature-icon-wrapper" style={{ marginBottom: 0 }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                    </svg>
                  </div>
                  <h3 style={{ margin: 0 }}>E-commerce</h3>
                </div>
                <p>Instantly update product pages, launch seasonal themes, and A/B test checkout flows without app store delays.</p>
                <div className="feature-tags">
                  <span className="feature-tag">Real-time</span>
                  <span className="feature-tag">Flash Sales</span>
                  <span className="feature-tag">A/B Tests</span>
                </div>
              </div>
            </ParticleCard>
            <ParticleCard
              className="card magic-bento-card magic-bento-card--border-glow"
              particleCount={10}
              glowColor="59, 130, 246"
              enableTilt={false}
              enableMagnetism={false}
              clickEffect={false}
            >
              <div className="feature-content">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                  <div className="feature-icon-wrapper" style={{ marginBottom: 0 }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
                    </svg>
                  </div>
                  <h3 style={{ margin: 0 }}>Social & Consumer Apps</h3>
                </div>
                <p>Experiment with feed layouts, deploy feature flags, and adapt UI for trending topics—all without app releases.</p>
                <div className="feature-tags">
                  <span className="feature-tag">Feed Tests</span>
                  <span className="feature-tag">Flags</span>
                  <span className="feature-tag">Trending</span>
                </div>
              </div>
            </ParticleCard>
            <ParticleCard
              className="card magic-bento-card magic-bento-card--border-glow"
              particleCount={10}
              glowColor="59, 130, 246"
              enableTilt={false}
              enableMagnetism={false}
              clickEffect={false}
            >
              <div className="feature-content">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                  <div className="feature-icon-wrapper" style={{ marginBottom: 0 }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/>
                    </svg>
                  </div>
                  <h3 style={{ margin: 0 }}>Fintech & Banking</h3>
                </div>
                <p>Push regulatory updates, deploy critical alerts, and optimize transaction flows with instant rollback control.</p>
                <div className="feature-tags">
                  <span className="feature-tag">Compliance</span>
                  <span className="feature-tag">Security</span>
                  <span className="feature-tag">Rollback</span>
                </div>
              </div>
            </ParticleCard>
            <ParticleCard
              className="card magic-bento-card magic-bento-card--border-glow"
              particleCount={10}
              glowColor="59, 130, 246"
              enableTilt={false}
              enableMagnetism={false}
              clickEffect={false}
            >
              <div className="feature-content">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                  <div className="feature-icon-wrapper" style={{ marginBottom: 0 }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="2" y="7" width="20" height="15" rx="2" ry="2"/><polyline points="17 2 12 7 7 2"/>
                    </svg>
                  </div>
                  <h3 style={{ margin: 0 }}>Gaming & Media</h3>
                </div>
                <p>Launch seasonal events, update in-game shops, and test monetization strategies without app review delays.</p>
                <div className="feature-tags">
                  <span className="feature-tag">Events</span>
                  <span className="feature-tag">Live Ops</span>
                  <span className="feature-tag">Monetization</span>
                </div>
              </div>
            </ParticleCard>
          </div>
        </div>
      </section>
    </>
  );
}
