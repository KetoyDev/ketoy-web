import React from 'react';
import { ParticleCard, GlobalSpotlight } from '../components/MagicBento.jsx';

export default function Features() {
  const featuresGridRef = React.useRef(null);

  return (
    <>
      {/* Features */}
      <section id="features" className="section page-section">
        <div className="container">
          <div className="page-header">
            <h1>Kotlin DSL to JSON,<br/>Zero App Updates Forever</h1>
            <p className="section-lead">Write type-safe UI code with K-DSL, deploy as JSON, update without app store approvals.</p>
          </div>
          <GlobalSpotlight
            gridRef={featuresGridRef}
            enabled={true}
            spotlightRadius={300}
            glowColor="59, 130, 246"
          />
          <div className="features-grid bento-section" ref={featuresGridRef}>
            <ParticleCard
              className="card magic-bento-card magic-bento-card--border-glow feature-card-large"
              particleCount={10}
              glowColor="59, 130, 246"
              enableTilt={false}
              enableMagnetism={false}
              clickEffect={false}
            >
              <div className="feature-content">
                <h3>Zero App Updates</h3>
                <p>Change your UI from the server without publishing to the Play Store. Update instantly for 100% of users.</p>
                <div className="feature-visual rocket-visual">
                  <svg className="rocket-icon" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M50 10 L60 30 L80 35 L60 50 L65 70 L50 60 L35 70 L40 50 L20 35 L40 30 Z" fill="url(#rocketGradient)" opacity="0.8"/>
                    <circle cx="50" cy="50" r="3" fill="#10b981"/>
                    <defs>
                      <linearGradient id="rocketGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#10b981" />
                        <stop offset="100%" stopColor="#3b82f6" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <ul className="feature-list">
                  <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>Send JSON from your server</li>
                  <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>Update UI in milliseconds</li>
                  <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>No Play Store deployment needed</li>
                </ul>
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
                <h3>K-DSL<br/>Type-Safe API</h3>
                <div className="feature-badges">
                  <span className="feature-badge badge-cloud">✓ Kotlin Native</span>
                  <span className="feature-badge badge-license">✓ Auto-Complete</span>
                </div>
                <p>Write beautiful Jetpack Compose interfaces with full IDE support and zero runtime errors.</p>
                <a href="https://github.com/developerstring/ketoy" target="_blank" rel="noreferrer" className="feature-link">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                  View K-DSL Docs
                </a>
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
                <h3>50+ Layout<br/>&amp; UI Components</h3>
                <p>KColumn, KRow, KBox, KCard, KButton, KImage, KTextField and more ready to use.</p>
                <div className="feature-visual form-visual">
                  <div className="form-mockup">
                    <div className="form-field">
                      <div className="field-icon">▲</div>
                      <div className="field-icon">○</div>
                      <div className="field-icon">□</div>
                    </div>
                    <div className="form-input">KColumn, KRow, KBox</div>
                    <div className="form-button">KButton, KText, KImage</div>
                  </div>
                </div>
              </div>
            </ParticleCard>
            <ParticleCard
              className="card magic-bento-card magic-bento-card--border-glow feature-card-wide"
              particleCount={10}
              glowColor="59, 130, 246"
              enableTilt={false}
              enableMagnetism={false}
              clickEffect={false}
            >
              <div className="feature-content">
                <h3>Kotlin to JSON Auto-Conversion</h3>
                <p>Write UI in K-DSL, automatically convert to JSON with a single function call, deploy instantly.</p>
                <div className="feature-visual code-visual">
                  <div className="code-mockup">
                    <div className="code-header">
                      <span className="code-file">dynamic_ui.kt</span>
                      <span className="code-status">● Auto-Converted</span>
                    </div>
                    <pre className="code-content">{`val ui = KColumn {
  KText(
    "Build once.",
    fontSize = 28,
    fontWeight = Bold
  )
  KButton(
    onClick = { /* ... */ }
  ) {
    KText("Update forever")
  }
}
// ui.toJson() → Deploy!`}</pre>
                  </div>
                </div>
                <ul className="feature-list-inline">
                  <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>Type-safe conversion</li>
                  <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>Single function call</li>
                  <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>Ready to deploy</li>
                </ul>
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
                <h3>A/B Testing<br/>Made Easy</h3>
                <p>Test different UI variations instantly with feature flags and dynamic user segments.</p>
                <div className="feature-visual navigation-visual">
                  <svg viewBox="0 0 200 120" className="nav-graph">
                    <circle cx="30" cy="60" r="5" fill="#10b981" opacity="0.6"/>
                    <circle cx="100" cy="30" r="5" fill="#3b82f6" opacity="0.6"/>
                    <circle cx="100" cy="90" r="5" fill="#3b82f6" opacity="0.6"/>
                    <circle cx="170" cy="60" r="5" fill="#10b981" opacity="0.6"/>
                    <path d="M 30 60 Q 65 45, 100 30" stroke="#3b82f6" strokeWidth="1.5" fill="none" opacity="0.3"/>
                    <path d="M 30 60 Q 65 75, 100 90" stroke="#3b82f6" strokeWidth="1.5" fill="none" opacity="0.3"/>
                    <path d="M 100 30 Q 135 45, 170 60" stroke="#10b981" strokeWidth="1.5" fill="none" opacity="0.3"/>
                    <path d="M 100 90 Q 135 75, 170 60" stroke="#10b981" strokeWidth="1.5" fill="none" opacity="0.3"/>
                    <text x="30" y="50" fill="#94a3b8" fontSize="10" textAnchor="middle">Variant A/B</text>
                  </svg>
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
                <h3>Dynamic<br/>Theming &amp; Styling</h3>
                <p>Update colors, typography, gradients, and layouts instantly without releasing a new build.</p>
                <div className="feature-visual theme-visual">
                  <div className="theme-config">
                    <div className="theme-item">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                      <span>KColors.hex("#3b82f6")</span>
                    </div>
                    <div className="theme-item">
                      <span className="theme-dot"></span>
                      <span>KFontWeights.Bold</span>
                    </div>
                    <div className="theme-item">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                      <span>KGradients.linear(...)</span>
                    </div>
                  </div>
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
                <h3>Server-Side<br/>Form Management</h3>
                <p>Dynamic forms with validation, input fields, and submission actions defined server-side with K-DSL.</p>
                <div className="feature-visual form-fields-visual">
                  <div className="form-field-item">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                    <span>KTextField</span>
                    <span className="field-comment"># Input</span>
                  </div>
                  <div className="form-field-item">
                    <span className="field-line"></span>
                    <span>Validation</span>
                  </div>
                  <div className="form-field-item">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                    <span>Server Actions</span>
                    <span className="field-comment"># Callbacks</span>
                  </div>
                </div>
              </div>
            </ParticleCard>
            <ParticleCard
              className="card magic-bento-card magic-bento-card--border-glow feature-card-cli"
              particleCount={10}
              glowColor="59, 130, 246"
              enableTilt={false}
              enableMagnetism={false}
              clickEffect={false}
            >
              <div className="feature-content">
                <h3>Cross-Platform Ready</h3>
                <p>Same JSON schema works across all platforms. Write once, deploy everywhere with Ketoy's universal architecture.</p>
                <div className="feature-badges-list">
                  <span className="feature-badge-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                    One JSON Schema
                  </span>
                  <span className="feature-badge-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                    Multi-Platform
                  </span>
                  <span className="feature-badge-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                    Jetpack Compose Ready
                  </span>
                </div>
                <div className="feature-visual cli-visual">
                  <div className="cli-window">
                    <div className="cli-header">
                      <span>Android Jetpack Compose</span>
                      <div className="cli-dots">
                        <span></span><span></span><span></span>
                      </div>
                    </div>
                    <div className="cli-content">
                      <div className="cli-line">
                        <span className="cli-prompt">→</span>
                        <span className="cli-command">JSONStringToUI(json)</span>
                      </div>
                      <div className="cli-line cli-output">✓ Beautiful Compose UI rendered</div>
                      <div className="cli-line">
                        <span className="cli-prompt">→</span>
                        <span className="cli-command">No app updates needed</span>
                      </div>
                      <div className="cli-line cli-output">✓ Live for all users</div>
                    </div>
                  </div>
                </div>
                <a href="https://github.com/developerstring/ketoy" target="_blank" rel="noreferrer" className="feature-link">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                  Get Started Now
                </a>
              </div>
            </ParticleCard>
          </div>
        </div>
      </section>
    </>
  );
}
