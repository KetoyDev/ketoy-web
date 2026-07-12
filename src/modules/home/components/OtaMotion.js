// Hero device animation — a phone mockup that cross-fades between its
// current screen and the OTA-patched screen, with a signal beam / patch
// pill / update toast layered on top. Pure CSS keyframes (see the
// hero-phone-* rules in home.css), so this needs no client-side JS.

export default function OtaMotion() {
  return (
    <div
      className="hero-phone-stage"
      role="img"
      aria-label="Over-the-air delivery: the Aurora app updates live from v2.4.1 to v2.4.2 without a Play Store release."
    >
      <div className="hero-phone-packet p1" aria-hidden="true"><span>ktx</span></div>
      <div className="hero-phone-packet p2" aria-hidden="true"><span>4KB</span></div>

      <div className="hero-phone-frame">
        <div className="hero-phone-glow" aria-hidden="true" />
        <div className="hero-phone-ring" aria-hidden="true" />
        <div className="hero-phone-ring delay" aria-hidden="true" />

        <div className="hero-phone" aria-hidden="true">
          <div className="hero-phone-notch" />
          <div className="hero-phone-screen">
            <div className="hero-phone-head">
              <div className="hero-phone-brand">
                <span className="hero-phone-mark">A</span>
                <span>Aurora</span>
              </div>
              <div className="hero-phone-version">
                <span className="v old"><i />v2.4.1</span>
                <span className="v new"><i />v2.4.2</span>
              </div>
            </div>

            <div className="hero-phone-body">
              <div className="hero-phone-state before">
                <div className="hero-card-header">
                  <div className="eyebrow">HOME</div>
                  <div className="title">Your orders</div>
                </div>
                <div className="hero-row">
                  <span className="icon">📦</span>
                  <span className="meta">
                    <span className="title">Order #4821</span>
                    <span className="sub">Delivered · Fri</span>
                  </span>
                  <span className="price">$42.10</span>
                </div>
                <div className="hero-row">
                  <span className="icon">🚚</span>
                  <span className="meta">
                    <span className="title">Order #4820</span>
                    <span className="sub">In transit · ETA Tue</span>
                  </span>
                  <span className="price">$18.00</span>
                </div>
                <div className="hero-row">
                  <span className="icon">📦</span>
                  <span className="meta">
                    <span className="title">Order #4818</span>
                    <span className="sub">Delivered · Mon</span>
                  </span>
                  <span className="price">$63.75</span>
                </div>
              </div>

              <div className="hero-phone-state after">
                <div className="hero-checkout-card">
                  <div className="top">
                    <span className="badge">NEW · OTA</span>
                    <span className="cart">2 in cart</span>
                  </div>
                  <div className="headline">Checkout, redesigned</div>
                  <div className="pay">
                    <span>Pay $147</span>
                    <span>→</span>
                  </div>
                </div>
                <div className="hero-row accent">
                  <span className="icon">👕</span>
                  <span className="meta">
                    <span className="title">Nimbus Tee</span>
                    <span className="sub">Sage · M · Qty 1</span>
                  </span>
                  <span className="price">$29</span>
                </div>
                <div className="hero-row accent">
                  <span className="icon">👟</span>
                  <span className="meta">
                    <span className="title">Aero Runners</span>
                    <span className="sub">White · 10 · Qty 1</span>
                  </span>
                  <span className="price">$118</span>
                </div>
              </div>
            </div>

            <div className="hero-phone-wipe" />

            <div className="hero-phone-patch">
              <span className="spinner" />
              <span>Patching UI…</span>
            </div>

            <div className="hero-phone-toast">
              <div className="row">
                <span className="check">✓</span>
                <span className="label">Updated to v2.4.2</span>
                <span className="time">1.2s</span>
              </div>
              <div className="bar-track"><div className="bar-fill" /></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
