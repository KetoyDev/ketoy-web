import React from 'react';
import { ParticleCard, GlobalSpotlight } from '../components/MagicBento.jsx';

export default function Features() {
  const featuresGridRef = React.useRef(null);

  return (
    <>
      {/* Features */}
      <section id="features" className="section page-section" style={{ background: '#000', position: 'relative' }}>
        <div className="container">
          <div className="page-header">
            <h1>DSL to JSON to Compose UI,<br/>Zero App Updates Forever</h1>
            <p className="section-lead">Write type-safe K-DSL code, convert to JSON, render as native Compose UI—update without app store approvals.</p>
          </div>

          <GlobalSpotlight
            gridRef={featuresGridRef}
            enabled={true}
            spotlightRadius={300}
            glowColor="59, 130, 246"
          />
          <div className="grid grid-3 bento-section" ref={featuresGridRef}>
            <ParticleCard
              className="card magic-bento-card magic-bento-card--border-glow feature-card"
              particleCount={8}
              glowColor="59, 130, 246"
              enableTilt={false}
              enableMagnetism={false}
              clickEffect={false}
            >
              <div className="feature-content">
                <div className="feature-icon-wrapper">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                  </svg>
                </div>
                <h3>Zero-Release Updates</h3>
                <p>Push UI changes instantly from your server. No app store approvals, no waiting. 100% of users get updates in real-time.</p>
                <div className="feature-tags">
                  <span className="feature-tag">Instant</span>
                  <span className="feature-tag">No APK</span>
                  
                </div>
              </div>
            </ParticleCard>
            <ParticleCard
              className="card magic-bento-card magic-bento-card--border-glow feature-card"
              particleCount={8}
              glowColor="16, 185, 129"
              enableTilt={false}
              enableMagnetism={false}
              clickEffect={false}
            >
              <div className="feature-content">
                <div className="feature-icon-wrapper feature-icon-green">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
                  </svg>
                </div>
                <h3>Type-Safe K-DSL</h3>
                <p>Write Compose UIs with full IDE support, autocomplete, and compile-time type safety. Catch errors early.</p>
                <div className="feature-tags">
                  <span className="feature-tag">K-DSL</span>
                  <span className="feature-tag">IDE</span>
                </div>
              </div>
            </ParticleCard>
            <ParticleCard
              className="card magic-bento-card magic-bento-card--border-glow feature-card"
              particleCount={8}
              glowColor="59, 130, 246"
              enableTilt={false}
              enableMagnetism={false}
              clickEffect={false}
            >
              <div className="feature-content">
                <div className="feature-icon-wrapper">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/>
                  </svg>
                </div>
                <h3>50+ Components</h3>
                <p>Complete UI library with KColumn, KRow, KBox, KCard, KButton, KImage, KTextField and more.</p>
          
                <div className="feature-tags">
                  <span className="feature-tag">Layouts</span>
                  <span className="feature-tag">Inputs</span>
                  <span className="feature-tag">Media</span>
                </div>
              </div>
            </ParticleCard>
            <ParticleCard
              className="card magic-bento-card magic-bento-card--border-glow feature-card"
              particleCount={8}
              glowColor="59, 130, 246"
              enableTilt={false}
              enableMagnetism={false}
              clickEffect={false}
            >
              <div className="feature-content">
                <div className="feature-icon-wrapper">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
                  </svg>
                </div>
                <h3>A/B Testing</h3>
                <p>Test UI variants in real-time with feature flags and user segmentation. No new builds required.</p>
                <div className="feature-tags">
                  <span className="feature-tag">Variants</span>
                  <span className="feature-tag">Segments</span>
                  <span className="feature-tag">Flags</span>
                </div>
              </div>
            </ParticleCard>
            <ParticleCard
              className="card magic-bento-card magic-bento-card--border-glow feature-card"
              particleCount={8}
              glowColor="59, 130, 246"
              enableTilt={false}
              enableMagnetism={false}
              clickEffect={false}
            >
              <div className="feature-content">
                <div className="feature-icon-wrapper">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
                  </svg>
                </div>
                <h3>DSL to JSON to UI</h3>
                <p>Write type-safe K-DSL code, convert to JSON with .toJson(), then render as native Compose UI. Deploy instantly.</p>
                <div className="feature-tags">
                  <span className="feature-tag">DSL→JSON</span>
                  
                </div>
              </div>
            </ParticleCard>
            <ParticleCard
              className="card magic-bento-card magic-bento-card--border-glow feature-card"
              particleCount={8}
              glowColor="16, 185, 129"
              enableTilt={false}
              enableMagnetism={false}
              clickEffect={false}
            >
              <div className="feature-content">
                <div className="feature-icon-wrapper feature-icon-green">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
                  </svg>
                </div>
                <h3>Dynamic Theming</h3>
                <p>Update colors, fonts, gradients, and spacing from the server. Live theme changes without updates.</p>
                <div className="feature-tags">
                  <span className="feature-tag">Colors</span>
                  <span className="feature-tag">Fonts</span>
                  <span className="feature-tag">Spacing</span>
                </div>
              </div>
            </ParticleCard>
            <ParticleCard
              className="card magic-bento-card magic-bento-card--border-glow feature-card"
              particleCount={8}
              glowColor="16, 185, 129"
              enableTilt={false}
              enableMagnetism={false}
              clickEffect={false}
            >
              <div className="feature-content">
                <div className="feature-icon-wrapper feature-icon-green">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
                  </svg>
                </div>
                <h3>Server-Side Forms</h3>
                <p>Build dynamic forms with validation and actions—all defined server-side. Deploy changes instantly.</p>
                <div className="feature-tags">
                  <span className="feature-tag">Validation</span>
                  <span className="feature-tag">Inputs</span>
                  <span className="feature-tag">Actions</span>
                </div>
              </div>
            </ParticleCard>
            <ParticleCard
              className="card magic-bento-card magic-bento-card--border-glow feature-card"
              particleCount={8}
              glowColor="59, 130, 246"
              enableTilt={false}
              enableMagnetism={false}
              clickEffect={false}
            >
              <div className="feature-content">
                <div className="feature-icon-wrapper">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                  </svg>
                </div>
                <h3>Universal Schema</h3>
                <p>One JSON format works everywhere. Write once with K-DSL, convert to JSON, render as native Compose UI.</p>
                <div className="feature-tags">
                  <span className="feature-tag">Android</span>
                  <span className="feature-tag">Compose</span>
                  <span className="feature-tag">Native</span>
                </div>
              </div>
            </ParticleCard>
            <ParticleCard
              className="card magic-bento-card magic-bento-card--border-glow feature-card"
              particleCount={8}
              glowColor="59, 130, 246"
              enableTilt={false}
              enableMagnetism={false}
              clickEffect={false}
            >
              <div className="feature-content">
                <div className="feature-icon-wrapper">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
                  </svg>
                </div>
                <h3>Real-time Analytics</h3>
                <p>Track user interactions and feature usage with built-in analytics. Monitor performance live.</p>
                <div className="feature-tags">
                  <span className="feature-tag">Events</span>
                  <span className="feature-tag">Metrics</span>
                  <span className="feature-tag">Live</span>
                </div>
              </div>
            </ParticleCard>
            <ParticleCard
              className="card magic-bento-card magic-bento-card--border-glow feature-card"
              particleCount={8}
              glowColor="16, 185, 129"
              enableTilt={false}
              enableMagnetism={false}
              clickEffect={false}
            >
              <div className="feature-content">
                <div className="feature-icon-wrapper feature-icon-green">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
                  </svg>
                </div>
                <h3>Extensible</h3>
                <p>Add custom widgets, actions, and native integrations.</p>
                <div className="feature-tags">
                  <span className="feature-tag">Custom</span>
                  <span className="feature-tag">Plugins</span>
                  <span className="feature-tag">Native</span>
                </div>
              </div>
            </ParticleCard>
            <ParticleCard
              className="card magic-bento-card magic-bento-card--border-glow feature-card"
              particleCount={8}
              glowColor="59, 130, 246"
              enableTilt={false}
              enableMagnetism={false}
              clickEffect={false}
            >
              <div className="feature-content">
                <div className="feature-icon-wrapper">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                </div>
                <h3>Secure by Design</h3>
                <p>JSON schema validation ensures only safe UI definitions render. Built-in security for all payloads.</p>
                <div className="feature-tags">
                  <span className="feature-tag">Validated</span>
                  <span className="feature-tag">Safe</span>
                  <span className="feature-tag">Trusted</span>
                </div>
              </div>
            </ParticleCard>
            <ParticleCard
              className="card magic-bento-card magic-bento-card--border-glow feature-card"
              particleCount={8}
              glowColor="16, 185, 129"
              enableTilt={false}
              enableMagnetism={false}
              clickEffect={false}
            >
              <div className="feature-content">
                <div className="feature-icon-wrapper feature-icon-green">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                  </svg>
                </div>
                <h3>Instant Rollback</h3>
                <p>Made a mistake? Roll back to any previous UI version instantly. No app update required.</p>
                <div className="feature-tags">
                  <span className="feature-tag">Versioning</span>
                  <span className="feature-tag">History</span>
                  <span className="feature-tag">Safe</span>
                </div>
              </div>
            </ParticleCard>
          </div>
        </div>
      </section>
    </>
  );
}
