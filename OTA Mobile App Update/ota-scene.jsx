// ota-scene.jsx — Over-The-Air update animation scene.
// Reads Stage, Sprite, Easing, interpolate, clamp, useTime from window (animations.jsx).

const { Stage, Sprite, Easing, interpolate, animate, clamp, useTime } = window;

// ── palette ───────────────────────────────────────────────────────────────
const C = {
  ink:      '#e9fff4',
  inkDim:   'rgba(233,255,244,0.58)',
  violet:   '#3ddc84',
  glow:     '#1db765',
  green:    '#83e6ad',
  panel:    'rgba(10,30,20,0.55)',
  panelLine:'rgba(255,255,255,0.10)',
  mono:     "'JetBrains Mono', ui-monospace, monospace",
  sans:     "'Space Grotesk', system-ui, sans-serif",
};

// ── background: gradient + PCB traces + floating dots ───────────────────────
const TRACES = [
  "M-40,180 H260 Q320,180 320,240 V520 Q320,580 380,580 H720",
  "M-40,760 H180 Q240,760 240,700 V520 Q240,470 300,470 H520",
  "M1960,300 H1680 Q1620,300 1620,360 V560 Q1620,620 1560,620 H1300",
  "M1960,820 H1740 Q1680,820 1680,760 V600 Q1680,540 1620,540 H1420",
  "M560,-40 V120 Q560,180 620,180 H900",
  "M1360,-40 V140 Q1360,200 1300,200 H1040",
  "M-40,1000 H620 Q700,1000 700,920 V820",
  "M1960,80 H1500 Q1420,80 1420,160 V300",
];
const DOTS = [
  [430, 90], [1560, 300], [1980, 780], [500, 990], [1720, 1010],
  [150, 560], [1840, 470], [760, 60], [1180, 130],
];

function Background() {
  const t = useTime();
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      {/* gradient base */}
      <div style={{
        position: 'absolute', inset: 0,
        background:
          'radial-gradient(120% 90% at 50% 22%, #34c479 0%, #1f8a54 34%, #114a30 62%, #0a2418 82%, #05130d 100%)',
      }} />
      {/* soft top glow behind terminal */}
      <div style={{
        position: 'absolute', left: '50%', top: 120, width: 1100, height: 460,
        transform: 'translateX(-50%)',
        background: 'radial-gradient(closest-side, rgba(120,240,180,0.30), transparent)',
        filter: 'blur(8px)',
      }} />
      {/* PCB traces */}
      <svg width="1920" height="1080" viewBox="0 0 1920 1080"
        style={{ position: 'absolute', inset: 0 }}>
        {TRACES.map((d, i) => (
          <path key={i} d={d} fill="none"
            stroke="rgba(255,255,255,0.13)" strokeWidth="3.4"
            strokeLinecap="round" strokeLinejoin="round" />
        ))}
        {/* animated flow pulses on two traces */}
        {[0, 2].map((idx, k) => {
          const dash = 60, gap = 900;
          const off = -(t * 220 + k * 400) % (dash + gap);
          return (
            <path key={'p' + k} d={TRACES[idx]} fill="none"
              stroke={C.violet} strokeWidth="4.6" strokeLinecap="round"
              strokeDasharray={`${dash} ${gap}`} strokeDashoffset={off}
              style={{ opacity: 0.75, filter: 'drop-shadow(0 0 7px rgba(61,220,132,0.9))' }} />
          );
        })}
      </svg>
      {/* floating dots */}
      {DOTS.map(([x, y], i) => {
        const ph = i * 1.3;
        const dy = Math.sin(t * 0.9 + ph) * 7;
        const pulse = 0.5 + 0.5 * Math.sin(t * 1.6 + ph);
        const r = 4 + (i % 3);
        return (
          <div key={i} style={{
            position: 'absolute', left: x, top: y + dy,
            width: r * 2, height: r * 2, borderRadius: '50%',
            background: '#fff',
            opacity: 0.35 + pulse * 0.5,
            boxShadow: `0 0 ${8 + pulse * 10}px rgba(255,255,255,0.8)`,
          }} />
        );
      })}
    </div>
  );
}

// ── terminal panel ──────────────────────────────────────────────────────────
const LOG = [
  { t: 0.7,  mark: '✓', text: 'Compiling Kotlin source with Jetpack Compose and Ketoy annotations' },
  { t: 1.3,  mark: '✓', text: 'Lowering @Ketoy closures into KBC bytecode on the build server' },
  { t: 1.9,  mark: '✓', text: 'Packaging a signed .ktx bundle of compressed bytecode and manifest' },
  { t: 2.5,  mark: '✓', text: 'Verifying signature and executing KBC opcodes on-device' },
  { t: 3.1,  mark: '✓', text: 'Rendering KBC output into real Jetpack Compose UI' },
  { t: 3.7,  mark: '🚀', text: 'Ready to publish a new patch!' },
];

function Terminal() {
  const t = useTime();
  // panel presence: fade in 0.3, fade out 6.8→7.6
  const appear = animate({ from: 0, to: 1, start: 0.3, end: 0.9, ease: Easing.easeOutCubic })(t);
  const leave  = animate({ from: 0, to: 1, start: 6.9, end: 7.6, ease: Easing.easeInCubic })(t);
  const op = appear * (1 - leave);
  const ty = (1 - appear) * 24 - leave * 30;
  if (op <= 0.01) return null;

  return (
    <div style={{
      position: 'absolute', left: '50%', top: 96, width: 1280,
      transform: `translate(-50%, ${ty}px)`, opacity: op,
      padding: '26px 34px 30px',
      borderRadius: 20,
      background: C.panel,
      border: `1px solid ${C.panelLine}`,
      boxShadow: '0 30px 80px rgba(10,8,30,0.45), inset 0 1px 0 rgba(255,255,255,0.06)',
      backdropFilter: 'blur(12px)',
      fontFamily: C.mono,
    }}>
      {/* window dots */}
      <div style={{ display: 'flex', gap: 9, marginBottom: 20 }}>
        {['#ff5f57', '#febc2e', '#28c840'].map((c) => (
          <span key={c} style={{ width: 13, height: 13, borderRadius: '50%', background: c, opacity: 0.85 }} />
        ))}
        <span style={{ marginLeft: 14, color: C.inkDim, fontSize: 15, letterSpacing: '0.02em' }}>
          Ketoy OTA Updates Channel
        </span>
      </div>
      {/* command line */}
      <div style={{ color: C.violet, fontSize: 21, marginBottom: 14, opacity: clamp((t - 0.5) * 3, 0, 1) }}>
        <span style={{ color: C.inkDim }}>$ </span>We handle it all for you!
      </div>
      {LOG.map((l, i) => {
        const lo = clamp((t - l.t) / 0.4, 0, 1);
        const e = Easing.easeOutCubic(lo);
        const isRocket = l.mark === '🚀';
        return (
          <div key={i} style={{
            display: 'flex', gap: 14, alignItems: 'baseline',
            fontSize: 21, lineHeight: 1.75,
            opacity: lo, transform: `translateX(${(1 - e) * 10}px)`,
            color: isRocket ? C.ink : 'rgba(234,231,255,0.9)',
            fontWeight: isRocket ? 600 : 400,
          }}>
            <span style={{ color: isRocket ? C.violet : C.green, fontSize: isRocket ? 20 : 22, width: 24 }}>
              {l.mark}
            </span>
            <span>{l.text}</span>
          </div>
        );
      })}
    </div>
  );
}

// ── store chips (bypassed) ──────────────────────────────────────────────────
function StoreChip({ x, y, label, side }) {
  const t = useTime();
  const appear = animate({ from: 0, to: 1, start: 0.9, end: 1.5, ease: Easing.easeOutBack })(t);
  // "bypassed" strike sweeps in as the packet launches
  const strike = clamp((t - 5.0) / 0.5, 0, 1);
  const dim = 1 - strike * 0.55;
  return (
    <div style={{
      position: 'absolute', left: x, top: y,
      transform: `translate(-50%,-50%) scale(${0.7 + appear * 0.3})`,
      opacity: appear * dim,
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12,
    }}>
      <div style={{
        position: 'relative',
        width: 96, height: 96, borderRadius: 26,
        background: 'rgba(255,255,255,0.08)',
        border: `1px solid ${C.panelLine}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 12px 30px rgba(10,8,30,0.35)',
        backdropFilter: 'blur(8px)',
      }}>
        {/* generic "download to device" glyph */}
        <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
          <path d="M22 8v18m0 0l-8-8m8 8l8-8" stroke={C.ink} strokeWidth="3"
            strokeLinecap="round" strokeLinejoin="round" />
          <path d="M10 34h24" stroke={C.ink} strokeWidth="3" strokeLinecap="round" />
        </svg>
        {/* strike line */}
        <div style={{
          position: 'absolute', left: '8%', top: '50%', height: 3,
          width: `${84 * strike}%`, transformOrigin: 'left center',
          transform: 'rotate(-18deg)', background: '#ff6b81',
          borderRadius: 2, boxShadow: '0 0 10px rgba(255,107,129,0.8)',
        }} />
      </div>
      <div style={{
        fontFamily: C.mono, fontSize: 15, letterSpacing: '0.04em',
        color: C.inkDim,
        textDecoration: strike > 0.5 ? 'line-through' : 'none',
      }}>{label}</div>
      {strike > 0.6 && (
        <div style={{
          fontFamily: C.mono, fontSize: 13, letterSpacing: '0.08em',
          color: '#ff8fa0', opacity: clamp((strike - 0.6) * 3, 0, 1), textTransform: 'uppercase',
        }}>skipped</div>
      )}
    </div>
  );
}

// ── travelling patch packet + beam ──────────────────────────────────────────
const BEAM_X = 960;
const BEAM_Y0 = 300;   // near "ready to publish"
const BEAM_Y1 = 690;   // into phone screen

function Beam() {
  const t = useTime();
  // beam draws downward 4.4 → 5.4, fades 8.0 → 8.8
  const draw = animate({ from: 0, to: 1, start: 4.4, end: 5.4, ease: Easing.easeInOutCubic })(t);
  const fade = animate({ from: 0, to: 1, start: 7.8, end: 8.8, ease: Easing.easeInCubic })(t);
  const op = draw * (1 - fade);
  if (op <= 0.01) return null;
  const h = (BEAM_Y1 - BEAM_Y0) * draw;
  return (
    <div style={{
      position: 'absolute', left: BEAM_X - 2, top: BEAM_Y0, width: 4, height: h,
      opacity: op,
      background: `linear-gradient(${C.glow}, rgba(29,183,101,0.05))`,
      boxShadow: '0 0 18px rgba(29,183,101,0.7)',
      borderRadius: 2,
    }} />
  );
}

function Packet() {
  const t = useTime();
  const START = 4.5, END = 7.1;
  if (t < START - 0.3 || t > END + 0.6) return null;
  const p = clamp((t - START) / (END - START), 0, 1);
  const ease = Easing.easeInOutCubic(p);
  const y = BEAM_Y0 + (BEAM_Y1 - BEAM_Y0) * ease;
  // launch pop + arrival squash
  const appear = clamp((t - START) / 0.3, 0, 1);
  const arrive = clamp((t - (END - 0.2)) / 0.5, 0, 1);
  const scale = (0.4 + 0.6 * Easing.easeOutBack(appear)) * (1 - arrive * 0.6);
  const op = appear * (1 - arrive);
  const spin = ease * 40;
  return (
    <div style={{
      position: 'absolute', left: BEAM_X, top: y,
      transform: `translate(-50%,-50%) scale(${scale}) rotate(${spin}deg)`,
      opacity: op,
    }}>
      {/* trailing glow */}
      <div style={{
        position: 'absolute', left: '50%', top: '50%', width: 120, height: 120,
        transform: 'translate(-50%,-50%)',
        background: 'radial-gradient(closest-side, rgba(61,220,132,0.55), transparent)',
      }} />
      <div style={{
        position: 'relative', width: 68, height: 68, borderRadius: 18,
        background: 'linear-gradient(145deg, #7bf0b0, #1db765)',
        border: '1px solid rgba(255,255,255,0.5)',
        boxShadow: '0 0 30px rgba(61,220,132,0.9), inset 0 2px 6px rgba(255,255,255,0.5)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
          <path d="M17 4l11 6.5v13L17 30 6 23.5v-13L17 4z" stroke="#2b2358" strokeWidth="2.2"
            strokeLinejoin="round" fill="rgba(255,255,255,0.25)" />
          <path d="M6 10.5L17 17l11-6.5M17 17v13" stroke="#2b2358" strokeWidth="2.2" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
}

// ── phone with live-updating app ────────────────────────────────────────────
function Phone() {
  const t = useTime();
  const appear = animate({ from: 0, to: 1, start: 0.4, end: 1.1, ease: Easing.easeOutCubic })(t);
  const LAND = 7.0;
  const flash = clamp((t - LAND) / 0.5, 0, 1);       // green ripple
  const flashOut = clamp((t - LAND - 0.5) / 0.7, 0, 1);
  const updated = t > LAND + 0.15;
  const toast = clamp((t - LAND - 0.35) / 0.4, 0, 1) * (1 - clamp((t - 13.2) / 0.6, 0, 1));
  // content rebuild after the patch lands
  const chg = clamp((t - 7.8) / 0.55, 0, 1);
  const rev = (d) => {
    const s = clamp((t - 7.8 - d) / 0.4, 0, 1);
    return { opacity: s, transform: `translateY(${(1 - Easing.easeOutCubic(s)) * 18}px)` };
  };
  const settle = 1 + Easing.easeOutBack(clamp((t - LAND) / 0.45, 0, 1)) * 0 ; // reserved

  const W = 430, H = 720;
  const jolt = flash > 0 && flash < 1 ? Math.sin(flash * Math.PI * 4) * 3 * (1 - flash) : 0;

  return (
    <div style={{
      position: 'absolute', left: '50%', top: 470,
      transform: `translate(-50%, ${(1 - appear) * 40 + jolt}px)`,
      opacity: appear,
    }}>
      <div style={{
        position: 'relative', width: W, height: H,
        borderRadius: '52px 52px 0 0',
        background: '#0e0d16',
        border: '10px solid #1b1a26',
        borderBottom: 'none',
        boxShadow: '0 40px 120px rgba(8,6,24,0.6), inset 0 0 0 1px rgba(255,255,255,0.05)',
        overflow: 'hidden',
        padding: '22px 22px 0',
      }}>
        {/* notch */}
        <div style={{
          position: 'absolute', left: '50%', top: 16, transform: 'translateX(-50%)',
          width: 130, height: 30, borderRadius: 16, background: '#000',
        }} />
        {/* app header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 40 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 46, height: 46, borderRadius: 14, background: 'linear-gradient(140deg,#3ddc84,#1db765)' }} />
            <div>
              <div style={{ fontFamily: C.sans, fontWeight: 600, fontSize: 20, color: C.ink }}>Aurora</div>
              <VersionBadge updated={updated} />
            </div>
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            {[0,1,2].map(i => <span key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: 'rgba(255,255,255,0.35)' }} />)}
          </div>
        </div>
        {/* nav pills */}
        <div style={{ display: 'flex', gap: 10, marginTop: 26 }}>
          {[92, 74, 74, 74].map((w, i) => (
            <div key={i} style={{
              height: 34, width: w, borderRadius: 17,
              background: i === 0 ? 'rgba(61,220,132,0.28)' : 'rgba(255,255,255,0.06)',
              border: i === 0 ? '1px solid rgba(61,220,132,0.5)' : '1px solid rgba(255,255,255,0.05)',
            }} />
          ))}
        </div>
        {/* content area — rebuilds into the new shipped UI after the patch lands (7.8s) */}
        <div style={{ position: 'relative', marginTop: 22, height: 388 }}>
          {/* BEFORE: old layout */}
          <div style={{
            position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', gap: 14,
            opacity: 1 - chg, transform: `scale(${1 - chg * 0.05})`, transformOrigin: 'top center',
          }}>
            {[0,1,2].map(i => (
              <div key={i} style={{
                height: i === 0 ? 150 : 92, borderRadius: 20,
                background: 'rgba(255,255,255,0.045)',
                border: '1px solid rgba(255,255,255,0.05)',
                padding: 16, display: 'flex', flexDirection: 'column', gap: 10,
              }}>
                <div style={{ height: 12, width: `${60 - i*10}%`, borderRadius: 6, background: 'rgba(255,255,255,0.12)' }} />
                <div style={{ height: 10, width: `${85 - i*8}%`, borderRadius: 5, background: 'rgba(255,255,255,0.07)' }} />
                {i === 0 && <div style={{ height: 10, width: '70%', borderRadius: 5, background: 'rgba(255,255,255,0.07)' }} />}
              </div>
            ))}
          </div>

          {/* AFTER: new UI shipped over the air */}
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
            {/* hero feature card */}
            <div style={{
              ...rev(0), height: 150, borderRadius: 20, padding: 18, display: 'flex', gap: 14,
              background: 'linear-gradient(140deg, rgba(61,220,132,0.24), rgba(29,183,101,0.08))',
              border: '1px solid rgba(61,220,132,0.42)',
            }}>
              <div style={{ width: 54, height: 54, borderRadius: 15, background: 'linear-gradient(140deg,#3ddc84,#1db765)', flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <path d="M14 4l2.7 6.6L24 11l-5.5 4.6L20 23l-6-3.9L8 23l1.5-7.4L4 11l7.3-.4L14 4z" fill="#06331d"/>
                </svg>
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10, justifyContent: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ height: 13, width: '46%', borderRadius: 6, background: 'rgba(255,255,255,0.6)' }} />
                  <span style={{ fontFamily: C.mono, fontSize: 11, padding: '2px 9px', borderRadius: 8,
                    background: C.violet, color: '#06331d', fontWeight: 600, letterSpacing: '0.06em' }}>NEW</span>
                </div>
                <div style={{ height: 10, width: '82%', borderRadius: 5, background: 'rgba(255,255,255,0.22)' }} />
                <div style={{ height: 10, width: '64%', borderRadius: 5, background: 'rgba(255,255,255,0.15)' }} />
              </div>
            </div>
            {/* two-up cards */}
            <div style={{ ...rev(0.12), display: 'flex', gap: 14 }}>
              {[0,1].map(i => (
                <div key={i} style={{
                  flex: 1, height: 104, borderRadius: 18, padding: 14,
                  background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.06)',
                  display: 'flex', flexDirection: 'column', gap: 9,
                }}>
                  <div style={{ width: 34, height: 34, borderRadius: 10, background: 'rgba(61,220,132,0.3)' }} />
                  <div style={{ height: 9, width: '80%', borderRadius: 5, background: 'rgba(255,255,255,0.15)' }} />
                  <div style={{ height: 9, width: '55%', borderRadius: 5, background: 'rgba(255,255,255,0.08)' }} />
                </div>
              ))}
            </div>
            {/* list row */}
            <div style={{
              ...rev(0.24), height: 74, borderRadius: 18, padding: 14,
              background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.06)',
              display: 'flex', alignItems: 'center', gap: 14,
            }}>
              <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'rgba(61,220,132,0.3)', flexShrink: 0 }} />
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div style={{ height: 10, width: '50%', borderRadius: 5, background: 'rgba(255,255,255,0.16)' }} />
                <div style={{ height: 9, width: '70%', borderRadius: 5, background: 'rgba(255,255,255,0.08)' }} />
              </div>
            </div>
          </div>
        </div>

        {/* green update ripple */}
        {flash > 0 && flashOut < 1 && (
          <div style={{
            position: 'absolute', left: '50%', top: '46%', transform: 'translate(-50%,-50%)',
            width: 40 + flash * 900, height: 40 + flash * 900, borderRadius: '50%',
            border: `${clamp(6 - flash*6,1,6)}px solid ${C.green}`,
            opacity: (1 - flash) * 0.9,
          }} />
        )}
        {flash > 0.2 && (
          <div style={{
            position: 'absolute', inset: 0,
            background: 'radial-gradient(closest-side, rgba(131,230,173,0.25), transparent 70%)',
            opacity: (1 - flashOut) * clamp((flash-0.2)*3,0,1),
          }} />
        )}

        {/* toast */}
        {toast > 0.01 && (
          <div style={{
            position: 'absolute', left: '50%', bottom: 60,
            transform: `translate(-50%, ${(1 - toast) * 20}px)`, opacity: toast,
            display: 'flex', alignItems: 'center', gap: 12,
            padding: '14px 20px', borderRadius: 16,
            background: 'rgba(18,40,30,0.85)',
            border: '1px solid rgba(131,230,173,0.4)',
            boxShadow: '0 16px 40px rgba(0,0,0,0.4)',
            backdropFilter: 'blur(8px)',
          }}>
            <span style={{
              width: 26, height: 26, borderRadius: '50%', background: C.green,
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                <path d="M3 8l3 3 6-7" stroke="#0d2418" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <div style={{ fontFamily: C.sans, color: C.ink, fontSize: 16, fontWeight: 500 }}>
              Updated over the air · <span style={{ color: C.green }}>v2.4.1</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function VersionBadge({ updated }) {
  const t = useTime();
  const flip = clamp((t - 7.0) / 0.35, 0, 1);
  return (
    <div style={{
      fontFamily: C.mono, fontSize: 14, marginTop: 3,
      color: updated ? C.green : C.inkDim,
      transition: 'none',
    }}>
      <span style={{ display: 'inline-block', transform: `translateY(${(updated ? (1-flip) : 0) * -6}px)`, opacity: updated ? flip : 1 }}>
        {updated ? 'v2.4.1' : 'v2.4.0'}
      </span>
    </div>
  );
}

// ── kicker + final tagline ──────────────────────────────────────────────────
function Kicker() {
  const t = useTime();
  const op = animate({ from: 0, to: 1, start: 0.3, end: 1.0 })(t)
           * (1 - animate({ from: 0, to: 1, start: 8.4, end: 9.0 })(t));
  return (
    <div style={{
      position: 'absolute', left: 70, top: 60, opacity: op,
      fontFamily: C.mono, fontSize: 15, letterSpacing: '0.32em',
      color: C.inkDim, textTransform: 'uppercase',
    }}>Ketoy OTA Updates</div>
  );
}

function Tagline() {
  const t = useTime();
  const START = 9.2;
  if (t < START) return null;
  const l1 = clamp((t - START) / 0.6, 0, 1);
  const l2 = clamp((t - START - 0.4) / 0.6, 0, 1);
  const e1 = Easing.easeOutCubic(l1), e2 = Easing.easeOutCubic(l2);
  return (
    <div style={{
      position: 'absolute', left: '50%', top: 150, transform: 'translateX(-50%)',
      textAlign: 'center', width: 1100,
    }}>
      <div style={{
        fontFamily: C.sans, fontWeight: 700, fontSize: 66, lineHeight: 1.08,
        color: C.ink, opacity: e1, transform: `translateY(${(1-e1)*22}px)`,
        letterSpacing: '-0.02em',
        textShadow: '0 2px 28px rgba(3,30,18,0.6)',
      }}>
        Ship feature updates <span style={{ color: '#d9ffec', textShadow: '0 0 22px rgba(61,220,132,0.8), 0 2px 24px rgba(3,30,18,0.6)' }}>over the air.</span>
      </div>
      <div style={{
        fontFamily: C.sans, fontWeight: 500, fontSize: 27, marginTop: 20,
        color: 'rgba(240,255,248,0.94)', opacity: e2, transform: `translateY(${(1-e2)*22}px)`,
        textShadow: '0 2px 20px rgba(3,30,18,0.65)',
      }}>
        Push updates straight to devices — skip the store, skip the wait.
      </div>
    </div>
  );
}

// ── root scene ──────────────────────────────────────────────────────────────
function OTAScene() {
  return (
    <Stage width={1920} height={1080} duration={15} background="#0a0913" persistKey="ota">
      <Background />
      <Kicker />
      <Terminal />
      <Tagline />
      <Beam />
      <Phone />
      <Packet />
    </Stage>
  );
}

window.OTAScene = OTAScene;
if (typeof module !== 'undefined') module.exports = { OTAScene };
