import React from 'react';
import SpotlightCard from '../components/SpotlightCard';
import AnimatedContent from '../components/AnimatedContent';

export default function Roadmap() {
  return (
    <>
      <section id="roadmap" className="section page-section" style={{ background: '#000', position: 'relative' }}>
        <div className="container">
          <AnimatedContent distance={40} duration={0.6} delay={0}>
          <div className="page-header">
            <p className="section-eyebrow">Roadmap</p>
            <h1>What's next for Ketoy</h1>
            <p className="section-lead">Ketoy is production-ready today and evolving for multi-platform futures.</p>
          </div>
          </AnimatedContent>
          <div className="grid grid-3">
            <AnimatedContent distance={50} duration={0.7} delay={0}>
            <div className="card">
              <div className="roadmap-badge roadmap-badge-now">Now</div>
              <h3>Current Features</h3>
              <ul>
                <li>Server‑driven Compose UI for Android</li>
                <li>K‑DSL with 50+ components</li>
                <li>Actions, variables, and custom components</li>
                <li>Lazy lists &amp; advanced styling</li>
              </ul>
            </div>
            </AnimatedContent>
            <AnimatedContent distance={50} duration={0.7} delay={0.1}>
            <div className="card">
              <div className="roadmap-badge roadmap-badge-next">Q1 2026</div>
              <h3>Coming Soon</h3>
              <ul>
                <li>Animations &amp; transitions from JSON</li>
                <li>Real‑time updates via WebSockets</li>
                <li>Visual drag‑and‑drop editor</li>
                <li>Compose Multiplatform experiments</li>
              </ul>
            </div>
            </AnimatedContent>
            <AnimatedContent distance={50} duration={0.7} delay={0.2}>
            <div className="card">
              <div className="roadmap-badge roadmap-badge-future">Later</div>
              <h3>Future Plans</h3>
              <ul>
                <li>SwiftUI &amp; iOS renderer</li>
                <li>Flutter / React Native bridges</li>
                <li>Enterprise dashboard &amp; analytics</li>
                <li>AI‑assisted layout optimization</li>
              </ul>
            </div>
            </AnimatedContent>
          </div>

          <AnimatedContent distance={40} duration={0.6} delay={0}>
          <div className="testimonials-section" style={{ marginTop: '4rem' }}>
            <h2 className="testimonials-title">Community Testimonials</h2>
            <div className="testimonials-grid">
              <AnimatedContent distance={50} duration={0.7} delay={0}>
              <SpotlightCard spotlightColor="rgba(59, 130, 246, 0.2)" className="testimonial-pixel-card">
                <div className="testimonial-card-content">
                  <div className="testimonial-quote">
                    <svg className="quote-icon" width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 9.5C9 9.5 8 10 8 11.5C8 13 9 14.5 9 14.5M9 9.5C9 9.5 10 10 10 11.5C10 13 9 14.5 9 14.5M9 9.5V8.5C9 6.567 10.567 5 12.5 5H14M15 9.5C15 9.5 14 10 14 11.5C14 13 15 14.5 15 14.5M15 9.5C15 9.5 16 10 16 11.5C16 13 15 14.5 15 14.5M15 9.5V8.5C15 6.567 16.567 5 18.5 5H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <p className="testimonial-text">
                      We can now A/B test any UI change instantly and push updates without waiting for app store approval. Ketoy is a game-changer.
                    </p>
                  </div>
                  <div className="testimonial-author">
                    <div className="author-avatar">SC</div>
                    <div className="author-info">
                      <div className="author-name">Sarah Chen</div>
                      <div className="author-role">Lead Mobile Developer</div>
                    </div>
                  </div>
                </div>
              </SpotlightCard>
              </AnimatedContent>
              <AnimatedContent distance={50} duration={0.7} delay={0.15}>
              <SpotlightCard spotlightColor="rgba(168, 85, 247, 0.2)" className="testimonial-pixel-card">
                <div className="testimonial-card-content">
                  <div className="testimonial-quote">
                    <svg className="quote-icon" width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 9.5C9 9.5 8 10 8 11.5C8 13 9 14.5 9 14.5M9 9.5C9 9.5 10 10 10 11.5C10 13 9 14.5 9 14.5M9 9.5V8.5C9 6.567 10.567 5 12.5 5H14M15 9.5C15 9.5 14 10 14 11.5C14 13 15 14.5 15 14.5M15 9.5C15 9.5 16 10 16 11.5C16 13 15 14.5 15 14.5M15 9.5V8.5C15 6.567 16.567 5 18.5 5H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <p className="testimonial-text">
                      The K-DSL is pure magic. We reduced our release cycle from weeks to minutes while keeping full control of our Compose codebase.
                    </p>
                  </div>
                  <div className="testimonial-author">
                    <div className="author-avatar">AK</div>
                    <div className="author-info">
                      <div className="author-name">Alex Kumar</div>
                      <div className="author-role">Senior Android Engineer</div>
                    </div>
                  </div>
                </div>
              </SpotlightCard>
              </AnimatedContent>
            </div>
          </div>
          </AnimatedContent>
        </div>
      </section>
    </>
  );
}
