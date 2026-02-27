import React from 'react';
import AnimatedContent from '../components/AnimatedContent';

const commands = [
  {
    label: 'Run local preview',
    command: './gradlew ketoyServe',
    description: 'Spins up a local Ketoy dev server that hot-reloads your SDUI screens as you edit JSON or K-DSL. See every change live on your connected device or emulator.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
        <line x1="8" y1="21" x2="16" y2="21"/>
        <line x1="12" y1="17" x2="12" y2="21"/>
      </svg>
    ),
  },
  {
    label: 'Instant cloud deploy',
    command: './gradlew ketoyDeploy',
    description: 'Validates, packages, and ships your SDUI definitions to the Ketoy cloud edge network in one command. Your users see the update live within seconds.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 16 12 12 8 16"/>
        <line x1="12" y1="12" x2="12" y2="21"/>
        <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/>
      </svg>
    ),
  },
  {
    label: 'Rollback in seconds',
    command: './gradlew ketoyRollback --tag=stable',
    description: 'Something wrong after a deploy? Roll back to any previous tagged release with a single command. Zero downtime, zero risk.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="1 4 1 10 7 10"/>
        <path d="M3.51 15a9 9 0 1 0 .49-4.95"/>
      </svg>
    ),
  },
];

export default function GradlePlugin() {
  return (
    <section id="gradle-plugin" className="gradle-plugin-section section">
      <div className="container">

        {/* Header */}
        <AnimatedContent direction="up" distance={30} duration={0.6}>
          <div className="section-header">
            <div className="section-badge">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 18 22 12 16 6"/>
                <polyline points="8 6 2 12 8 18"/>
              </svg>
              Ketoy SDK
            </div>
            <h2 className="section-title">
              Gradle Plugin
            </h2>
            <p className="section-subtitle" style={{ marginBottom: '0.25rem', fontWeight: 600, color: 'var(--text)', fontSize: '1.1rem' }}>
              Build, Test &amp; Deploy from your terminal
            </p>
            <p className="section-subtitle">
              The Ketoy Gradle plugin integrates directly into your Android build system. Serve, validate, deploy, and roll back your SDUI definitions without leaving the terminal.
            </p>
          </div>
        </AnimatedContent>

        {/* Command cards — horizontal 3-col grid */}
        <div className="gradle-cards">
          {commands.map((cmd, i) => (
            <AnimatedContent key={cmd.label} direction="up" distance={40} duration={0.6} delay={i * 0.1}>
              <div className="gradle-card card">
                <div className="gradle-card-header">
                  <div className="gradle-card-icon">{cmd.icon}</div>
                  <span className="gradle-card-label">{cmd.label}</span>
                </div>
                <div className="gradle-terminal">
                  <div className="gradle-terminal-dots">
                    <span /><span /><span />
                  </div>
                  <pre className="gradle-terminal-code"><span className="gradle-prompt">$</span>{' '}{cmd.command}</pre>
                </div>
                <p className="gradle-card-desc">{cmd.description}</p>
              </div>
            </AnimatedContent>
          ))}
        </div>

        {/* Security / trust banner — separate card below */}
        <AnimatedContent direction="up" distance={30} duration={0.6} delay={0.35}>
          <div className="gradle-banner">
            <div className="gradle-banner-left">
              <div className="gradle-banner-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <div>
                <p className="gradle-banner-title">Signed &amp; verified deploys</p>
                <p className="gradle-banner-sub">Every deploy is signed with your project key and verified before reaching the CDN. Rollbacks are atomic — users never see a partial state.</p>
              </div>
            </div>
            <a
              href="https://github.com/developerstring/ketoy"
              target="_blank"
              rel="noreferrer"
              className="gradle-banner-cta"
            >
              Read the docs
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
              </svg>
            </a>
          </div>
        </AnimatedContent>

      </div>
    </section>
  );
}
