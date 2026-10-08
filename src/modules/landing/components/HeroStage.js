// The hero's product moment, built from HTML and CSS: a phone rendering a
// Compose screen, a terminal pushing a bundle, and the screen updating.
// Markup is authored in its FINAL state. Motion.js rewinds it and plays it
// on load, so no-JS and reduced-motion visitors see the finished story.

export default function HeroStage() {
  return (
    <div className="kt-stage" data-hero="stage">
      <div className="kt-term kt-term--hero" data-hero="term">
        <div className="kt-term-bar">
          <span className="kt-term-dots" aria-hidden="true"><i /><i /><i /></span>
          <span>terminal</span>
        </div>
        <div className="kt-term-body">
          <p className="kt-term-cmd" data-stage="t1">
            <span className="kt-term-prompt">$</span> ketoy push ktx app_7f3a main.ktx --version 12
          </p>
          <p className="kt-term-out" data-stage="t2"><i className="kt-ok" />Signed with Ed25519</p>
          <p className="kt-term-out" data-stage="t3"><i className="kt-ok" />Version 12 is live on every device</p>
        </div>
      </div>

      <div className="kt-phone-wrap" data-hero="phone">
        <div className="kt-phone" data-hero="float">
        <div className="kt-phone-screen">
          <div className="kt-ph-status" aria-hidden="true">
            <span>9:41</span>
            <span className="kt-ph-sig"><i /><i /><i /></span>
          </div>
          <div className="kt-ph-toast" data-stage="toast">
            <i className="kt-ok" />Updated to version 12
          </div>
          <div className="kt-ph-appbar">
            <span className="kt-ph-back" aria-hidden="true" />
            Offers
          </div>
          <div className="kt-ph-body">
            <div className="kt-ph-hero">
              <span className="kt-ph-kicker">Annual plans</span>
              <h3 className="kt-ph-swap">
                <span data-stage="old">Summer sale</span>
                <span data-stage="new">Last day of the sale</span>
              </h3>
              <p>Save 25% when billed yearly.</p>
            </div>
            <div className="kt-ph-card is-active">
              <div>
                <b>Annual</b>
                <span>Billed once a year</span>
              </div>
              <span className="kt-ph-badge">Save 25%</span>
            </div>
            <div className="kt-ph-card">
              <div>
                <b>Monthly</b>
                <span>Cancel anytime</span>
              </div>
            </div>
            <span className="kt-ph-btn">Claim offer</span>
          </div>
        </div>
        </div>
      </div>

      <div className="kt-bundle" data-hero="bundle">
        <span className="kt-bundle-icon" aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 3 4 7v10l8 4 8-4V7l-8-4z" /><path d="M4 7l8 4 8-4M12 11v10" />
          </svg>
        </span>
        <div>
          <b>main.ktx</b>
          <span>version 12 · signed</span>
        </div>
      </div>
    </div>
  );
}
