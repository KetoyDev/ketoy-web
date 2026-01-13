import React from 'react';

export default function Roadmap() {
  return (
    <>
      <section className="section page-section">
        <div className="container">
          <div className="page-header">
            <h1>Roadmap</h1>
            <p className="section-lead">Ketoy is production‑ready today and evolving for multi‑platform futures.</p>
          </div>
          <div className="grid grid-3">
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
          </div>

          <div className="section-alt" style={{ marginTop: '4rem', padding: '2rem', borderRadius: '16px' }}>
            <h2>Community Testimonials</h2>
            <div className="grid grid-2 testimonials">
              <blockquote>
                <p>
                  "We can now A/B test any UI change instantly and push updates without waiting for app store approval.
                  Ketoy is a game‑changer."
                </p>
                <footer>Sarah Chen · Lead Mobile Developer</footer>
              </blockquote>
              <blockquote>
                <p>
                  "The K‑DSL is pure magic. We reduced our release cycle from weeks to minutes while keeping full
                  control of our Compose codebase."
                </p>
                <footer>Alex Kumar · Senior Android Engineer</footer>
              </blockquote>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
