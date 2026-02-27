import React from 'react';
import { Link } from 'react-router-dom';
import AnimatedContent from '../components/AnimatedContent';

export default function Playground() {
  return (
    <>
      <section id="playground" className="section page-section" style={{ background: '#000', position: 'relative' }}>
        <div className="container">
          <AnimatedContent distance={40} duration={0.6} delay={0}>
          <div className="page-header">
            <p className="section-eyebrow">Playground</p>
            <h1>DSL &rarr; JSON &rarr; Compose UI</h1>
            <p className="section-lead">Write type-safe K-DSL code, convert to portable JSON, and render as native Compose UI — all in real-time.</p>
          </div>
          </AnimatedContent>

          {/* Flow steps */}
          <AnimatedContent distance={30} duration={0.6} delay={0.1}>
          <div className="playground-flow">
            <div className="playground-flow-step">
              <span className="playground-flow-num">1</span>
              <span>Write K-DSL</span>
            </div>
            <svg className="playground-flow-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            <div className="playground-flow-step">
              <span className="playground-flow-num">2</span>
              <span>Convert to JSON</span>
            </div>
            <svg className="playground-flow-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            <div className="playground-flow-step">
              <span className="playground-flow-num">3</span>
              <span>Render Compose UI</span>
            </div>
          </div>
          </AnimatedContent>

          {/* Playground preview card */}
          <AnimatedContent distance={50} duration={0.7} delay={0.2}>
          <div className="playground-card" style={{ padding: 0, overflow: 'hidden' }}>
            <div className="playground-preview-container">
              {/* Window chrome */}
              <div className="playground-preview-topbar">
                <div style={{ display: 'flex', gap: '6px' }}>
                  <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f57' }}></span>
                  <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#febc2e' }}></span>
                  <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#28c840' }}></span>
                </div>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>ketoy-playground</span>
                <div style={{ width: 48 }}></div>
              </div>
              {/* Stylized preview */}
              <div className="playground-preview-body">
                <div className="playground-preview-split">
                  {/* Left: K-DSL snippet */}
                  <div className="playground-preview-pane">
                    <div style={{ fontSize: '0.7rem', fontWeight: 600, color: 'var(--accent)', marginBottom: '0.75rem', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>K-DSL</div>
                    <pre className="playground-preview-code">
{`KColumn {
  KCard(
    shape = kRounded(20),
    containerColor = "#FFe1eaf7"
  ) {
    KText(
      text = "Hello Ketoyies!",
      fontSize = 24,
      fontWeight = Bold
    )
  }
  KButton(text = "Submit")
}`}
                    </pre>
                  </div>
                  {/* Divider */}
                  <div className="playground-preview-divider">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </div>
                  {/* Right: Compose UI mockup */}
                  <div className="playground-preview-pane">
                    <div style={{ fontSize: '0.7rem', fontWeight: 600, color: '#10b981', marginBottom: '0.75rem', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Compose UI</div>
                    <div className="playground-preview-ui">
                      <div className="playground-ui-card">
                        <span style={{ fontSize: '1rem', fontWeight: 700, color: '#2196F3' }}>Hello Ketoyies!</span>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>Server Based UI Development</span>
                      </div>
                      <button className="playground-ui-button">Submit</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </AnimatedContent>

          {/* CTA */}
          <AnimatedContent distance={30} duration={0.6} delay={0.1}>
          <div style={{ marginTop: '2.5rem', textAlign: 'center' }}>
            <Link to="/playground" className="hero-btn-primary" style={{ padding: '0.85rem 2rem' }}>
              Try in Playground
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
              </svg>
            </Link>
          </div>
          </AnimatedContent>
        </div>
      </section>
    </>
  );
}
