import React from 'react';

export default function Playground() {
  return (
    <>
      <section className="section page-section">
        <div className="container">
          <div className="page-header">
            <h1>Playground</h1>
            <p className="section-lead">Try Ketoy in action - experiment with server-driven UI components in real-time.</p>
          </div>

          <div className="playground-container">
            <div className="playground-notice">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              <h3>Coming Soon</h3>
              <p>Our interactive playground is under development. Soon you'll be able to:</p>
              <ul>
                <li>Write K-DSL code and see live previews</li>
                <li>Experiment with all 50+ Ketoy components</li>
                <li>Test JSON serialization and rendering</li>
                <li>Share your layouts with the community</li>
              </ul>
              <a href="https://github.com/developerstring/ketoy" target="_blank" rel="noreferrer" className="btn btn-primary" style={{ marginTop: '1.5rem' }}>
                Star on GitHub to get notified
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
