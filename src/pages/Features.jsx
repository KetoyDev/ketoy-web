import React from 'react';
import { ParticleCard, GlobalSpotlight } from '../components/MagicBento.jsx';
import AnimatedContent from '../components/AnimatedContent';

// Inline SVG illustrations for each feature
function IllustrationUpdates() {
  return (
    <svg viewBox="0 0 280 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Phone outline */}
      <rect x="100" y="10" width="80" height="140" rx="12" stroke="rgba(59,130,246,0.3)" strokeWidth="1.5" />
      <rect x="108" y="24" width="64" height="110" rx="4" fill="rgba(59,130,246,0.06)" />
      {/* UI blocks animating in */}
      <rect x="114" y="32" width="52" height="12" rx="3" fill="rgba(59,130,246,0.2)">
        <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" />
      </rect>
      <rect x="114" y="50" width="36" height="8" rx="2" fill="rgba(59,130,246,0.15)" />
      <rect x="114" y="64" width="52" height="24" rx="4" fill="rgba(59,130,246,0.12)">
        <animate attributeName="opacity" values="0.2;0.8;0.2" dur="3s" repeatCount="indefinite" />
      </rect>
      <rect x="114" y="94" width="24" height="8" rx="4" fill="rgba(59,130,246,0.3)" />
      {/* Cloud/server icon */}
      <path d="M40 80 C40 66 52 56 66 56 C72 44 86 38 98 44" stroke="rgba(59,130,246,0.25)" strokeWidth="1.5" fill="none" />
      <circle cx="40" cy="80" r="3" fill="rgba(59,130,246,0.4)" />
      {/* Arrow from server to phone */}
      <line x1="68" y1="72" x2="100" y2="72" stroke="rgba(59,130,246,0.3)" strokeWidth="1" strokeDasharray="4 3">
        <animate attributeName="stroke-dashoffset" values="14;0" dur="1.5s" repeatCount="indefinite" />
      </line>
      <polygon points="100,68 108,72 100,76" fill="rgba(59,130,246,0.3)" />
      {/* Checkmark badge */}
      <circle cx="190" cy="40" r="14" fill="rgba(16,185,129,0.15)" stroke="rgba(16,185,129,0.3)" strokeWidth="1" />
      <polyline points="184,40 188,44 196,36" stroke="rgba(16,185,129,0.6)" strokeWidth="1.5" fill="none" />
    </svg>
  );
}

function IllustrationKDSL() {
  return (
    <svg viewBox="0 0 280 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Code editor window */}
      <rect x="30" y="15" width="220" height="130" rx="10" stroke="rgba(16,185,129,0.25)" strokeWidth="1.5" fill="rgba(16,185,129,0.03)" />
      {/* Title bar dots */}
      <circle cx="48" cy="30" r="3" fill="rgba(239,68,68,0.4)" />
      <circle cx="58" cy="30" r="3" fill="rgba(245,158,11,0.4)" />
      <circle cx="68" cy="30" r="3" fill="rgba(16,185,129,0.4)" />
      {/* Code lines */}
      <rect x="48" y="48" width="80" height="5" rx="2" fill="rgba(16,185,129,0.2)" />
      <rect x="58" y="60" width="120" height="5" rx="2" fill="rgba(59,130,246,0.15)" />
      <rect x="58" y="72" width="90" height="5" rx="2" fill="rgba(168,85,247,0.15)" />
      <rect x="68" y="84" width="100" height="5" rx="2" fill="rgba(59,130,246,0.12)" />
      <rect x="68" y="96" width="60" height="5" rx="2" fill="rgba(16,185,129,0.15)" />
      <rect x="58" y="108" width="40" height="5" rx="2" fill="rgba(168,85,247,0.12)" />
      <rect x="48" y="120" width="30" height="5" rx="2" fill="rgba(16,185,129,0.2)" />
      {/* Autocomplete popup */}
      <rect x="150" y="68" width="80" height="50" rx="6" fill="rgba(16,185,129,0.08)" stroke="rgba(16,185,129,0.2)" strokeWidth="1">
        <animate attributeName="opacity" values="0;1;1;0" dur="4s" repeatCount="indefinite" />
      </rect>
      <rect x="158" y="78" width="50" height="5" rx="2" fill="rgba(16,185,129,0.25)">
        <animate attributeName="opacity" values="0;1;1;0" dur="4s" repeatCount="indefinite" />
      </rect>
      <rect x="158" y="90" width="40" height="5" rx="2" fill="rgba(16,185,129,0.12)">
        <animate attributeName="opacity" values="0;1;1;0" dur="4s" repeatCount="indefinite" />
      </rect>
      <rect x="158" y="102" width="55" height="5" rx="2" fill="rgba(16,185,129,0.12)">
        <animate attributeName="opacity" values="0;1;1;0" dur="4s" repeatCount="indefinite" />
      </rect>
    </svg>
  );
}

function IllustrationComponents() {
  return (
    <svg viewBox="0 0 280 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Grid of component blocks */}
      <rect x="30" y="20" width="60" height="35" rx="6" fill="rgba(59,130,246,0.1)" stroke="rgba(59,130,246,0.2)" strokeWidth="1" />
      <rect x="36" y="28" width="24" height="4" rx="2" fill="rgba(59,130,246,0.3)" />
      <rect x="36" y="36" width="40" height="4" rx="2" fill="rgba(59,130,246,0.15)" />
      <rect x="36" y="44" width="16" height="6" rx="3" fill="rgba(59,130,246,0.25)" />

      <rect x="100" y="20" width="80" height="35" rx="6" fill="rgba(168,85,247,0.08)" stroke="rgba(168,85,247,0.2)" strokeWidth="1" />
      <circle cx="116" cy="37" r="8" fill="rgba(168,85,247,0.15)" />
      <rect x="130" y="30" width="40" height="4" rx="2" fill="rgba(168,85,247,0.2)" />
      <rect x="130" y="38" width="30" height="4" rx="2" fill="rgba(168,85,247,0.12)" />

      <rect x="190" y="20" width="60" height="35" rx="6" fill="rgba(16,185,129,0.08)" stroke="rgba(16,185,129,0.2)" strokeWidth="1" />
      <rect x="196" y="28" width="48" height="20" rx="4" fill="rgba(16,185,129,0.12)" />

      <rect x="30" y="65" width="100" height="35" rx="6" fill="rgba(245,158,11,0.08)" stroke="rgba(245,158,11,0.15)" strokeWidth="1" />
      <rect x="40" y="73" width="80" height="6" rx="3" fill="rgba(245,158,11,0.15)" />
      <rect x="40" y="83" width="50" height="6" rx="3" fill="rgba(245,158,11,0.1)" />

      <rect x="140" y="65" width="60" height="35" rx="6" fill="rgba(59,130,246,0.08)" stroke="rgba(59,130,246,0.15)" strokeWidth="1" />
      <rect x="148" y="73" width="20" height="20" rx="10" fill="rgba(59,130,246,0.12)" />

      <rect x="210" y="65" width="40" height="35" rx="6" fill="rgba(239,68,68,0.06)" stroke="rgba(239,68,68,0.15)" strokeWidth="1" />
      <rect x="218" y="75" width="24" height="8" rx="4" fill="rgba(239,68,68,0.15)" />

      {/* Bottom row */}
      <rect x="30" y="110" width="70" height="35" rx="6" fill="rgba(16,185,129,0.06)" stroke="rgba(16,185,129,0.15)" strokeWidth="1" />
      <rect x="110" y="110" width="90" height="35" rx="6" fill="rgba(59,130,246,0.06)" stroke="rgba(59,130,246,0.15)" strokeWidth="1" />
      <rect x="210" y="110" width="40" height="35" rx="6" fill="rgba(168,85,247,0.06)" stroke="rgba(168,85,247,0.15)" strokeWidth="1" />
    </svg>
  );
}

function IllustrationABTest() {
  return (
    <svg viewBox="0 0 280 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Variant A phone */}
      <rect x="40" y="25" width="55" height="100" rx="8" stroke="rgba(59,130,246,0.3)" strokeWidth="1.5" />
      <text x="67" y="20" textAnchor="middle" fill="rgba(59,130,246,0.5)" fontSize="11" fontWeight="600">A</text>
      <rect x="48" y="38" width="39" height="6" rx="2" fill="rgba(59,130,246,0.2)" />
      <rect x="48" y="50" width="39" height="20" rx="4" fill="rgba(59,130,246,0.1)" />
      <rect x="48" y="76" width="20" height="7" rx="3" fill="rgba(59,130,246,0.25)" />

      {/* Variant B phone */}
      <rect x="185" y="25" width="55" height="100" rx="8" stroke="rgba(168,85,247,0.3)" strokeWidth="1.5" />
      <text x="212" y="20" textAnchor="middle" fill="rgba(168,85,247,0.5)" fontSize="11" fontWeight="600">B</text>
      <rect x="193" y="38" width="39" height="6" rx="2" fill="rgba(168,85,247,0.2)" />
      <rect x="193" y="50" width="39" height="12" rx="4" fill="rgba(168,85,247,0.1)" />
      <rect x="193" y="68" width="39" height="12" rx="4" fill="rgba(168,85,247,0.08)" />
      <rect x="193" y="86" width="28" height="7" rx="3" fill="rgba(168,85,247,0.25)" />

      {/* Split arrow */}
      <line x1="130" y1="50" x2="130" y2="75" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
      <line x1="130" y1="50" x2="108" y2="60" stroke="rgba(59,130,246,0.25)" strokeWidth="1" />
      <line x1="130" y1="50" x2="152" y2="60" stroke="rgba(168,85,247,0.25)" strokeWidth="1" />
      <circle cx="130" cy="44" r="6" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />

      {/* Chart at bottom */}
      <rect x="110" y="100" width="60" height="30" rx="4" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
      <rect x="120" y="118" width="8" height="8" rx="1" fill="rgba(59,130,246,0.3)" />
      <rect x="132" y="112" width="8" height="14" rx="1" fill="rgba(168,85,247,0.3)" />
      <rect x="144" y="115" width="8" height="11" rx="1" fill="rgba(16,185,129,0.3)" />
    </svg>
  );
}

function IllustrationConversion() {
  return (
    <svg viewBox="0 0 280 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* DSL block */}
      <rect x="10" y="40" width="70" height="80" rx="8" fill="rgba(59,130,246,0.06)" stroke="rgba(59,130,246,0.2)" strokeWidth="1.5" />
      <text x="45" y="35" textAnchor="middle" fill="rgba(59,130,246,0.5)" fontSize="10" fontWeight="600">K-DSL</text>
      <rect x="20" y="52" width="40" height="4" rx="2" fill="rgba(59,130,246,0.2)" />
      <rect x="24" y="62" width="48" height="4" rx="2" fill="rgba(59,130,246,0.12)" />
      <rect x="24" y="72" width="36" height="4" rx="2" fill="rgba(59,130,246,0.15)" />
      <rect x="20" y="82" width="28" height="4" rx="2" fill="rgba(59,130,246,0.1)" />

      {/* Arrow 1 */}
      <line x1="88" y1="80" x2="106" y2="80" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="3 3">
        <animate attributeName="stroke-dashoffset" values="12;0" dur="1.5s" repeatCount="indefinite" />
      </line>
      <polygon points="106,76 114,80 106,84" fill="rgba(255,255,255,0.15)" />

      {/* JSON block */}
      <rect x="105" y="40" width="70" height="80" rx="8" fill="rgba(16,185,129,0.06)" stroke="rgba(16,185,129,0.2)" strokeWidth="1.5" />
      <text x="140" y="35" textAnchor="middle" fill="rgba(16,185,129,0.5)" fontSize="10" fontWeight="600">JSON</text>
      <text x="116" y="60" fill="rgba(16,185,129,0.3)" fontSize="8" fontFamily="monospace">{"{"}</text>
      <rect x="120" y="66" width="44" height="4" rx="2" fill="rgba(16,185,129,0.15)" />
      <rect x="120" y="76" width="36" height="4" rx="2" fill="rgba(16,185,129,0.12)" />
      <rect x="120" y="86" width="48" height="4" rx="2" fill="rgba(16,185,129,0.1)" />
      <text x="116" y="104" fill="rgba(16,185,129,0.3)" fontSize="8" fontFamily="monospace">{"}"}</text>

      {/* Arrow 2 */}
      <line x1="183" y1="80" x2="201" y2="80" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="3 3">
        <animate attributeName="stroke-dashoffset" values="12;0" dur="1.5s" repeatCount="indefinite" />
      </line>
      <polygon points="201,76 209,80 201,84" fill="rgba(255,255,255,0.15)" />

      {/* Compose UI block */}
      <rect x="200" y="40" width="70" height="80" rx="8" fill="rgba(168,85,247,0.06)" stroke="rgba(168,85,247,0.2)" strokeWidth="1.5" />
      <text x="235" y="35" textAnchor="middle" fill="rgba(168,85,247,0.5)" fontSize="10" fontWeight="600">UI</text>
      <rect x="210" y="52" width="50" height="12" rx="3" fill="rgba(168,85,247,0.12)" />
      <rect x="210" y="70" width="50" height="20" rx="4" fill="rgba(168,85,247,0.08)" />
      <rect x="210" y="96" width="26" height="8" rx="4" fill="rgba(168,85,247,0.2)" />
    </svg>
  );
}

function IllustrationTheming() {
  return (
    <svg viewBox="0 0 280 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Color palette circles */}
      <circle cx="60" cy="50" r="16" fill="rgba(59,130,246,0.2)" stroke="rgba(59,130,246,0.3)" strokeWidth="1">
        <animate attributeName="r" values="16;18;16" dur="3s" repeatCount="indefinite" />
      </circle>
      <circle cx="90" cy="50" r="16" fill="rgba(168,85,247,0.2)" stroke="rgba(168,85,247,0.3)" strokeWidth="1">
        <animate attributeName="r" values="16;18;16" dur="3s" begin="0.5s" repeatCount="indefinite" />
      </circle>
      <circle cx="120" cy="50" r="16" fill="rgba(16,185,129,0.2)" stroke="rgba(16,185,129,0.3)" strokeWidth="1">
        <animate attributeName="r" values="16;18;16" dur="3s" begin="1s" repeatCount="indefinite" />
      </circle>
      <circle cx="150" cy="50" r="16" fill="rgba(245,158,11,0.2)" stroke="rgba(245,158,11,0.3)" strokeWidth="1">
        <animate attributeName="r" values="16;18;16" dur="3s" begin="1.5s" repeatCount="indefinite" />
      </circle>

      {/* Phone with theme applied */}
      <rect x="170" y="20" width="70" height="120" rx="10" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" />
      <rect x="178" y="34" width="54" height="14" rx="4" fill="rgba(59,130,246,0.15)">
        <animate attributeName="fill" values="rgba(59,130,246,0.15);rgba(168,85,247,0.15);rgba(16,185,129,0.15);rgba(59,130,246,0.15)" dur="6s" repeatCount="indefinite" />
      </rect>
      <rect x="178" y="54" width="54" height="30" rx="4" fill="rgba(59,130,246,0.08)">
        <animate attributeName="fill" values="rgba(59,130,246,0.08);rgba(168,85,247,0.08);rgba(16,185,129,0.08);rgba(59,130,246,0.08)" dur="6s" repeatCount="indefinite" />
      </rect>
      <rect x="178" y="90" width="28" height="8" rx="4" fill="rgba(59,130,246,0.25)">
        <animate attributeName="fill" values="rgba(59,130,246,0.25);rgba(168,85,247,0.25);rgba(16,185,129,0.25);rgba(59,130,246,0.25)" dur="6s" repeatCount="indefinite" />
      </rect>

      {/* Font size slider */}
      <line x1="40" y1="100" x2="140" y2="100" stroke="rgba(255,255,255,0.08)" strokeWidth="2" strokeLinecap="round" />
      <circle cx="80" cy="100" r="5" fill="rgba(59,130,246,0.4)" stroke="rgba(59,130,246,0.6)" strokeWidth="1">
        <animate attributeName="cx" values="60;110;60" dur="5s" repeatCount="indefinite" />
      </circle>
      <text x="40" y="118" fill="rgba(255,255,255,0.15)" fontSize="8">Aa</text>
      <text x="128" y="118" fill="rgba(255,255,255,0.15)" fontSize="12" fontWeight="bold">Aa</text>
    </svg>
  );
}

function IllustrationExtensible() {
  return (
    <svg viewBox="0 0 280 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Central hub */}
      <circle cx="140" cy="80" r="20" fill="rgba(59,130,246,0.1)" stroke="rgba(59,130,246,0.25)" strokeWidth="1.5" />
      <text x="140" y="84" textAnchor="middle" fill="rgba(59,130,246,0.4)" fontSize="10" fontWeight="600">Core</text>

      {/* Plugin blocks connected */}
      <rect x="30" y="25" width="50" height="30" rx="6" fill="rgba(16,185,129,0.08)" stroke="rgba(16,185,129,0.2)" strokeWidth="1" />
      <rect x="38" y="33" width="28" height="4" rx="2" fill="rgba(16,185,129,0.2)" />
      <rect x="38" y="41" width="18" height="4" rx="2" fill="rgba(16,185,129,0.12)" />
      <line x1="80" y1="45" x2="122" y2="70" stroke="rgba(16,185,129,0.15)" strokeWidth="1" strokeDasharray="3 3" />

      <rect x="200" y="25" width="50" height="30" rx="6" fill="rgba(168,85,247,0.08)" stroke="rgba(168,85,247,0.2)" strokeWidth="1" />
      <rect x="208" y="33" width="28" height="4" rx="2" fill="rgba(168,85,247,0.2)" />
      <rect x="208" y="41" width="20" height="4" rx="2" fill="rgba(168,85,247,0.12)" />
      <line x1="200" y1="45" x2="158" y2="70" stroke="rgba(168,85,247,0.15)" strokeWidth="1" strokeDasharray="3 3" />

      <rect x="30" y="105" width="50" height="30" rx="6" fill="rgba(245,158,11,0.08)" stroke="rgba(245,158,11,0.2)" strokeWidth="1" />
      <rect x="38" y="113" width="32" height="4" rx="2" fill="rgba(245,158,11,0.2)" />
      <rect x="38" y="121" width="22" height="4" rx="2" fill="rgba(245,158,11,0.12)" />
      <line x1="80" y1="115" x2="122" y2="92" stroke="rgba(245,158,11,0.15)" strokeWidth="1" strokeDasharray="3 3" />

      <rect x="200" y="105" width="50" height="30" rx="6" fill="rgba(239,68,68,0.08)" stroke="rgba(239,68,68,0.2)" strokeWidth="1" />
      <rect x="208" y="113" width="30" height="4" rx="2" fill="rgba(239,68,68,0.2)" />
      <rect x="208" y="121" width="18" height="4" rx="2" fill="rgba(239,68,68,0.12)" />
      <line x1="200" y1="115" x2="158" y2="92" stroke="rgba(239,68,68,0.15)" strokeWidth="1" strokeDasharray="3 3" />

      {/* Plus icon */}
      <circle cx="140" cy="140" r="10" fill="rgba(59,130,246,0.08)" stroke="rgba(59,130,246,0.2)" strokeWidth="1">
        <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" />
      </circle>
      <line x1="136" y1="140" x2="144" y2="140" stroke="rgba(59,130,246,0.4)" strokeWidth="1.5" />
      <line x1="140" y1="136" x2="140" y2="144" stroke="rgba(59,130,246,0.4)" strokeWidth="1.5" />
    </svg>
  );
}

function IllustrationRollback() {
  return (
    <svg viewBox="0 0 280 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Timeline */}
      <line x1="40" y1="80" x2="240" y2="80" stroke="rgba(255,255,255,0.08)" strokeWidth="2" />

      {/* Version nodes */}
      <circle cx="60" cy="80" r="6" fill="rgba(59,130,246,0.15)" stroke="rgba(59,130,246,0.3)" strokeWidth="1.5" />
      <text x="60" y="100" textAnchor="middle" fill="rgba(255,255,255,0.2)" fontSize="8">v1.0</text>

      <circle cx="110" cy="80" r="6" fill="rgba(59,130,246,0.15)" stroke="rgba(59,130,246,0.3)" strokeWidth="1.5" />
      <text x="110" y="100" textAnchor="middle" fill="rgba(255,255,255,0.2)" fontSize="8">v1.1</text>

      <circle cx="160" cy="80" r="6" fill="rgba(16,185,129,0.2)" stroke="rgba(16,185,129,0.4)" strokeWidth="1.5" />
      <text x="160" y="100" textAnchor="middle" fill="rgba(16,185,129,0.4)" fontSize="8">v1.2</text>

      <circle cx="210" cy="80" r="6" fill="rgba(239,68,68,0.15)" stroke="rgba(239,68,68,0.3)" strokeWidth="1.5" />
      <text x="210" y="100" textAnchor="middle" fill="rgba(239,68,68,0.3)" fontSize="8">v1.3</text>
      <text x="210" y="112" textAnchor="middle" fill="rgba(239,68,68,0.25)" fontSize="7">bug</text>

      {/* Rollback arrow */}
      <path d="M205 65 C190 40 170 40 155 65" stroke="rgba(16,185,129,0.35)" strokeWidth="1.5" fill="none" strokeDasharray="4 3">
        <animate attributeName="stroke-dashoffset" values="14;0" dur="2s" repeatCount="indefinite" />
      </path>
      <polygon points="153,60 155,68 160,62" fill="rgba(16,185,129,0.4)" />

      {/* Safe badge */}
      <rect x="130" y="120" width="60" height="22" rx="11" fill="rgba(16,185,129,0.1)" stroke="rgba(16,185,129,0.2)" strokeWidth="1" />
      <text x="160" y="135" textAnchor="middle" fill="rgba(16,185,129,0.5)" fontSize="9" fontWeight="600">Restored</text>
    </svg>
  );
}

export default function Features() {
  const featuresGridRef = React.useRef(null);

  return (
    <>
      <section id="features" className="section page-section" style={{ background: '#000', position: 'relative' }}>
        <div className="container">
          <AnimatedContent distance={40} duration={0.6} delay={0}>
            <div className="page-header">
              <p className="section-eyebrow">Features</p>
              <h1>Everything you need to ship<br/>dynamic mobile UIs</h1>
              <p className="section-lead">Write type-safe K-DSL, convert to JSON, render native Compose UI — update instantly without app store approvals.</p>
            </div>
          </AnimatedContent>

          <GlobalSpotlight
            gridRef={featuresGridRef}
            enabled={true}
            spotlightRadius={300}
            glowColor="59, 130, 246"
          />
          <div className="bento-features" ref={featuresGridRef}>
            {/* Row 1: Wide + Narrow */}
            <AnimatedContent distance={50} duration={0.7} delay={0} className="bento-wide">
            <ParticleCard
              className="card magic-bento-card magic-bento-card--border-glow feature-card"
              particleCount={6}
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
              <div className="feature-illustration"><IllustrationUpdates /></div>
            </ParticleCard>
            </AnimatedContent>

            <AnimatedContent distance={50} duration={0.7} delay={0.1} className="bento-narrow">
            <ParticleCard
              className="card magic-bento-card magic-bento-card--border-glow feature-card"
              particleCount={6}
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
                <p>Write Compose UIs with full IDE support, autocomplete, and compile-time type safety.</p>
                <div className="feature-tags">
                  <span className="feature-tag">K-DSL</span>
                  <span className="feature-tag">IDE</span>
                </div>
              </div>
              <div className="feature-illustration"><IllustrationKDSL /></div>
            </ParticleCard>
            </AnimatedContent>

            {/* Row 2: Narrow + Wide */}
            <AnimatedContent distance={50} duration={0.7} delay={0} className="bento-narrow">
            <ParticleCard
              className="card magic-bento-card magic-bento-card--border-glow feature-card"
              particleCount={6}
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
              <div className="feature-illustration"><IllustrationComponents /></div>
            </ParticleCard>
            </AnimatedContent>

            <AnimatedContent distance={50} duration={0.7} delay={0.1} className="bento-wide">
            <ParticleCard
              className="card magic-bento-card magic-bento-card--border-glow feature-card"
              particleCount={6}
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
              <div className="feature-illustration"><IllustrationABTest /></div>
            </ParticleCard>
            </AnimatedContent>

            {/* Row 3: Narrow + Wide */}
            <AnimatedContent distance={50} duration={0.7} delay={0} className="bento-narrow">
            <ParticleCard
              className="card magic-bento-card magic-bento-card--border-glow feature-card"
              particleCount={6}
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
                <p>Add custom widgets, actions, and native integrations. Extend Ketoy for your product.</p>
                <div className="feature-tags">
                  <span className="feature-tag">Custom</span>
                  <span className="feature-tag">Plugins</span>
                  <span className="feature-tag">Native</span>
                </div>
              </div>
              <div className="feature-illustration"><IllustrationExtensible /></div>
            </ParticleCard>
            </AnimatedContent>

            <AnimatedContent distance={50} duration={0.7} delay={0.1} className="bento-wide">
            <ParticleCard
              className="card magic-bento-card magic-bento-card--border-glow feature-card"
              particleCount={6}
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
              <div className="feature-illustration"><IllustrationRollback /></div>
            </ParticleCard>
            </AnimatedContent>
          </div>
        </div>
      </section>
    </>
  );
}
