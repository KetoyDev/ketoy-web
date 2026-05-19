import { SDK_VERSION_FULL } from '@/constants';

export default function UpdatesHero({
  eyebrow = `Live · v${SDK_VERSION_FULL}`,
  title = 'What’s new in Ketoy.',
  lede = 'A running log of platform and SDK changes — what shipped, what’s in beta, and what’s coming next. Pick a card to read the full notes.',
}) {
  return (
    <section className="updates-hero">
      <div className="container">
        <div className="updates-hero-grid">
          <div>
            <span className="eyebrow">
              <span className="pulse" aria-hidden="true"></span>
              {eyebrow}
            </span>
            <h1>{title}</h1>
            <p className="lede">{lede}</p>
          </div>
          <div className="updates-illus" aria-hidden="true">
            <HeroIllustration />
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroIllustration() {
  const spokes = Array.from({ length: 18 }, (_, i) => i * 20);
  return (
    <svg viewBox="0 0 500 400" xmlns="http://www.w3.org/2000/svg">
      <g transform="translate(360, 200)" opacity="0.18">
        <g stroke="var(--accent)" strokeWidth="3" strokeLinecap="round">
          {spokes.map((deg) => (
            <line
              key={deg}
              x1="0"
              y1="-110"
              x2="0"
              y2="-78"
              transform={`rotate(${deg})`}
            />
          ))}
        </g>
      </g>
      <g transform="translate(70, 90) rotate(-6)">
        <rect width="280" height="160" rx="20" fill="var(--card-bg)" stroke="var(--border)" strokeWidth="1.5" />
        <rect x="22" y="24" width="60" height="18" rx="9" fill="var(--accent-soft)" />
        <rect x="22" y="56" width="200" height="14" rx="3" fill="var(--ink-2)" opacity="0.85" />
        <rect x="22" y="78" width="160" height="14" rx="3" fill="var(--ink-2)" opacity="0.85" />
        <rect x="22" y="112" width="120" height="9" rx="3" fill="var(--muted-2)" opacity="0.6" />
        <rect x="22" y="126" width="180" height="9" rx="3" fill="var(--muted-2)" opacity="0.6" />
      </g>
      <g transform="translate(110, 130) rotate(2)">
        <rect width="280" height="160" rx="20" fill="var(--card-bg)" stroke="var(--border)" strokeWidth="1.5" />
        <rect x="22" y="24" width="80" height="18" rx="9" fill="#eef8f0" stroke="#cfe6cf" strokeWidth="1" />
        <circle cx="32" cy="33" r="3" fill="#2bb673" />
        <rect x="22" y="56" width="220" height="14" rx="3" fill="var(--ink-2)" opacity="0.9" />
        <rect x="22" y="78" width="140" height="14" rx="3" fill="var(--ink-2)" opacity="0.9" />
        <rect x="22" y="112" width="100" height="9" rx="3" fill="var(--muted-2)" opacity="0.7" />
        <rect x="22" y="126" width="200" height="9" rx="3" fill="var(--muted-2)" opacity="0.7" />
      </g>
      <g transform="translate(150, 170) rotate(7)">
        <rect width="280" height="160" rx="20" fill="var(--card-bg)" stroke="var(--accent)" strokeOpacity="0.5" strokeWidth="1.5" />
        <rect x="22" y="24" width="86" height="18" rx="9" fill="var(--accent-soft)" />
        <circle cx="32" cy="33" r="3" fill="var(--accent)" />
        <rect x="22" y="56" width="230" height="14" rx="3" fill="var(--ink)" opacity="0.95" />
        <rect x="22" y="78" width="170" height="14" rx="3" fill="var(--ink)" opacity="0.95" />
        <rect x="22" y="112" width="110" height="9" rx="3" fill="var(--muted-2)" opacity="0.75" />
        <rect x="22" y="126" width="190" height="9" rx="3" fill="var(--muted-2)" opacity="0.75" />
      </g>
      <g fill="var(--accent)">
        <path d="M420 70 l4 10 10 4 -10 4 -4 10 -4 -10 -10 -4 10 -4 z" />
        <path d="M60 320 l3 7 7 3 -7 3 -3 7 -3 -7 -7 -3 7 -3 z" opacity="0.6" />
        <path d="M460 290 l3 7 7 3 -7 3 -3 7 -3 -7 -7 -3 7 -3 z" opacity="0.5" />
      </g>
    </svg>
  );
}
