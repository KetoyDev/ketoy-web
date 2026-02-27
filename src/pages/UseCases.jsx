import React from 'react';
import AnimatedContent from '../components/AnimatedContent';

const sectors = [
  {
    label: 'E-commerce',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>,
  },
  {
    label: 'Fintech',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>,
  },
  {
    label: 'Healthcare',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>,
  },
  {
    label: 'Gaming',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><line x1="6" y1="12" x2="10" y2="12"/><line x1="8" y1="10" x2="8" y2="14"/><circle cx="15" cy="11" r="1" fill="currentColor"/><circle cx="17" cy="13" r="1" fill="currentColor"/><rect x="2" y="6" width="20" height="12" rx="2"/></svg>,
  },
  {
    label: 'Social',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>,
  },
  {
    label: 'EdTech',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/></svg>,
  },
  {
    label: 'Automotive',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="1" y="3" width="15" height="13" rx="2"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>,
  },
  {
    label: 'Travel',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M17.8 19.2L16 11l3.5-3.5C21 6 21 4 21 4s-2 0-3.5 1.5L14 9 5.8 7.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 3.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/></svg>,
  },
  {
    label: 'Food & Delivery',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/><path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32"/></svg>,
  },
  {
    label: 'Banking',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><line x1="3" y1="22" x2="21" y2="22"/><line x1="6" y1="18" x2="6" y2="11"/><line x1="10" y1="18" x2="10" y2="11"/><line x1="14" y1="18" x2="14" y2="11"/><line x1="18" y1="18" x2="18" y2="11"/><polygon points="12 2 20 7 4 7"/></svg>,
  },
  {
    label: 'Media',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="7" width="20" height="15" rx="2"/><polyline points="17 2 12 7 7 2"/></svg>,
  },
  {
    label: 'Enterprise',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/></svg>,
  },
];

export default function UseCases() {
  return (
    <>
      <section id="use-cases" className="section page-section">
        <div className="container">
          <AnimatedContent distance={40} duration={0.6} delay={0}>
          <div className="page-header">
            <p className="section-eyebrow">Universal Adoption</p>
            <h1>If it runs Compose, it runs Ketoy</h1>
            <p className="section-lead">
              Ketoy isn't built for one industry — it's built for every app that uses Jetpack Compose for UI.
              Whatever you're building, ship UI updates from your server without an app release.
            </p>
          </div>
          </AnimatedContent>

          {/* Sector pills */}
          <AnimatedContent distance={30} duration={0.6} delay={0.1}>
          <div className="usecases-sectors">
            {sectors.map((s) => (
              <div key={s.label} className="usecases-sector-pill">
                <span>{s.icon}</span>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
          </AnimatedContent>

          {/* Value prop cards */}
          <div className="usecases-value-grid">
            <AnimatedContent distance={50} duration={0.7} delay={0}>
            <div className="usecases-value-card">
              <div className="usecases-value-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
                </svg>
              </div>
              <h3>Already using Compose?</h3>
              <p>Ketoy plugs directly into your existing Jetpack Compose project. No architecture rewrites, no new rendering engine — just add the SDK and start driving UI from your server.</p>
            </div>
            </AnimatedContent>
            <AnimatedContent distance={50} duration={0.7} delay={0.1}>
            <div className="usecases-value-card">
              <div className="usecases-value-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <h3>Zero risk integration</h3>
              <p>Start with a single screen. Gradually adopt Ketoy for more surfaces — there's no big-bang migration. Roll back any change instantly if something goes wrong.</p>
            </div>
            </AnimatedContent>
            <AnimatedContent distance={50} duration={0.7} delay={0.2}>
            <div className="usecases-value-card">
              <div className="usecases-value-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                </svg>
              </div>
              <h3>Ship to millions, instantly</h3>
              <p>Update UI for every user the moment you push new JSON to your server. No Play Store review, no staggered rollout, no waiting days for approval.</p>
            </div>
            </AnimatedContent>
          </div>
        </div>
      </section>
    </>
  );
}
