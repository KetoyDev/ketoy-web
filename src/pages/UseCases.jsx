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
              <h3>🛒 E‑commerce</h3>
              <ul>
                <li>Instantly update product and campaign pages</li>
                <li>Seasonal layouts without new releases</li>
                <li>A/B test checkout flows in production</li>
              </ul>
            </ParticleCard>
            <ParticleCard
              className="card magic-bento-card magic-bento-card--border-glow"
              particleCount={10}
              glowColor="59, 130, 246"
              enableTilt={false}
              enableMagnetism={false}
              clickEffect={false}
            >
              <h3>📱 Social &amp; consumer apps</h3>
              <ul>
                <li>Experiment with feed and profile layouts</li>
                <li>Localized onboarding for each market</li>
                <li>Fast feature flags for new UI concepts</li>
              </ul>
            </ParticleCard>
            <ParticleCard
              className="card magic-bento-card magic-bento-card--border-glow"
              particleCount={10}
              glowColor="59, 130, 246"
              enableTilt={false}
              enableMagnetism={false}
              clickEffect={false}
            >
              <h3>🏦 Fintech &amp; banking</h3>
              <ul>
                <li>Compliance‑driven content updates</li>
                <li>Emergency banners &amp; notices in minutes</li>
                <li>Controlled rollouts for sensitive flows</li>
              </ul>
            </ParticleCard>
            <ParticleCard
              className="card magic-bento-card magic-bento-card--border-glow"
              particleCount={10}
              glowColor="59, 130, 246"
              enableTilt={false}
              enableMagnetism={false}
              clickEffect={false}
            >
              <h3>🎮 Gaming &amp; media</h3>
              <ul>
                <li>Event screens and seasonal hubs</li>
                <li>In‑app shops that evolve over time</li>
                <li>Live ops without client updates</li>
              </ul>
            </ParticleCard>
          </div>
        </div>
      </section>
    </>
  );
}
