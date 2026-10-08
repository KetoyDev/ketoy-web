import { LAYERS } from '../data';

const K = ({ children }) => <span className="tk-k">{children}</span>;
const A = ({ children }) => <span className="tk-a">{children}</span>;
const S = ({ children }) => <span className="tk-s">{children}</span>;
const F = ({ children }) => <span className="tk-f">{children}</span>;

function Check() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function VisualUi() {
  return (
    <div className="kt-vis kt-vis--ui" aria-label="Material 3 components rendered by Ketoy">
      <div className="kt-m3-top">
        <span className="kt-m3-menu" aria-hidden="true" />
        <span>Plans</span>
      </div>
      <div className="kt-m3-field">
        <span className="kt-m3-label">Search plans</span>
        <span>Annual</span>
      </div>
      <div className="kt-m3-chips">
        <span className="is-on"><Check />Monthly</span>
        <span>Annual</span>
        <span>Family</span>
      </div>
      <div className="kt-m3-row">
        <span><b>Offline mode</b><small>Keep screens on device</small></span>
        <span className="kt-m3-switch is-on" aria-hidden="true"><i /></span>
      </div>
      <div className="kt-m3-row">
        <span><b>Release alerts</b><small>When a bundle goes live</small></span>
        <span className="kt-m3-switch" aria-hidden="true"><i /></span>
      </div>
      <div className="kt-m3-actions">
        <span className="kt-m3-btn">Continue</span>
        <span className="kt-m3-btn kt-m3-btn--tonal">Compare</span>
      </div>
    </div>
  );
}

function VisualCode() {
  return (
    <pre className="kt-vis kt-vis--code" aria-label="A ViewModel shipped over the air">
      <span className="kt-ln"><A>@HiltViewModel</A></span>
      <span className="kt-ln"><K>class</K> OffersViewModel <A>@Inject</A> <K>constructor</K>(</span>
      <span className="kt-ln">{'    '}<K>private val</K> repo: OffersRepository</span>
      <span className="kt-ln">) : ViewModel() {'{'}</span>
      <span className="kt-ln">{'    '}<K>val</K> state = repo.offers()</span>
      <span className="kt-ln">{'        '}.<F>map</F> {'{'} OffersUi(it) {'}'}</span>
      <span className="kt-ln">{'        '}.<F>stateIn</F>(viewModelScope, Eagerly, OffersUi())</span>
      <span className="kt-ln"> </span>
      <span className="kt-ln">{'    '}<K>fun</K> <F>claim</F>(id: String) = viewModelScope.<F>launch</F> {'{'}</span>
      <span className="kt-ln">{'        '}repo.claim(id)</span>
      <span className="kt-ln">{'    }'}</span>
      <span className="kt-ln">{'}'}</span>
    </pre>
  );
}

const CAPS = [
  ['HTTP', 'Room', 'DataStore', 'Navigation'],
  ['Hilt', 'Coroutines', 'Flow', 'Lifecycle'],
  ['Clipboard', 'Haptics', 'Share', 'Your SDK'],
];

function VisualCaps() {
  return (
    <div className="kt-vis kt-vis--caps" aria-label="Capability registry">
      <div className="kt-caps-core">
        <span>KBC</span>
        <small>bundle</small>
      </div>
      <div className="kt-caps-grid">
        {CAPS.flat().map((c) => (
          <span key={c} className={c === 'Your SDK' ? 'is-yours' : undefined}>{c}</span>
        ))}
      </div>
    </div>
  );
}

const STACK = ['/welcome', '/home', '/plan', '/payment'];

// A static nav graph in the spirit of a hand-drawn navigation diagram:
// two top-level screens, a boxed checkout flow, dashed edges with arrowheads.
function Screen({ x, y, kind, name, route }) {
  const bars = {
    welcome: [<circle key="a" cx={x + 16} cy={y + 18} r={6} fill="#a894ff" />, <rect key="b" x={x + 10} y={y + 32} width={32} height={4} rx={2} fill="rgba(255,255,255,0.35)" />, <rect key="c" x={x + 10} y={y + 41} width={22} height={4} rx={2} fill="rgba(255,255,255,0.22)" />, <rect key="d" x={x + 10} y={y + 64} width={44} height={9} rx={4.5} fill="#fff" />],
    home: [<rect key="a" x={x + 10} y={y + 12} width={44} height={6} rx={3} fill="rgba(255,255,255,0.35)" />, <rect key="b" x={x + 10} y={y + 24} width={44} height={18} rx={4} fill="rgba(124,92,255,0.45)" />, <rect key="c" x={x + 10} y={y + 48} width={44} height={12} rx={4} fill="rgba(255,255,255,0.12)" />, <rect key="d" x={x + 2} y={y + 70} width={60} height={12} rx={0} fill="rgba(255,255,255,0.1)" />, <circle key="e" cx={x + 16} cy={y + 76} r={2.5} fill="#fff" />, <circle key="f" cx={x + 32} cy={y + 76} r={2.5} fill="rgba(255,255,255,0.4)" />, <circle key="g" cx={x + 48} cy={y + 76} r={2.5} fill="rgba(255,255,255,0.4)" />],
    plan: [<rect key="a" x={x + 10} y={y + 12} width={30} height={5} rx={2.5} fill="rgba(255,255,255,0.35)" />, <rect key="b" x={x + 10} y={y + 24} width={44} height={11} rx={4} fill="rgba(255,255,255,0.1)" />, <rect key="c" x={x + 10} y={y + 39} width={44} height={11} rx={4} fill="rgba(124,92,255,0.55)" stroke="#a894ff" />, <rect key="d" x={x + 10} y={y + 54} width={44} height={11} rx={4} fill="rgba(255,255,255,0.1)" />],
    payment: [<rect key="a" x={x + 10} y={y + 12} width={30} height={5} rx={2.5} fill="rgba(255,255,255,0.35)" />, <rect key="b" x={x + 10} y={y + 24} width={44} height={20} rx={5} fill="url(#kt-card-grad)" />, <rect key="c" x={x + 10} y={y + 50} width={34} height={4} rx={2} fill="rgba(255,255,255,0.25)" />, <rect key="d" x={x + 10} y={y + 64} width={44} height={9} rx={4.5} fill="#fff" />],
    done: [<circle key="a" cx={x + 32} cy={y + 30} r={11} fill="#3ddc84" />, <path key="b" d={`M${x + 26} ${y + 30} l4 4 8 -8`} stroke="#0b2a18" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />, <rect key="c" x={x + 18} y={y + 50} width={28} height={4} rx={2} fill="rgba(255,255,255,0.35)" />, <rect key="d" x={x + 22} y={y + 59} width={20} height={4} rx={2} fill="rgba(255,255,255,0.2)" />],
  }[kind];
  return (
    <g>
      <rect x={x} y={y} width={64} height={84} rx={10} fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.16)" />
      <rect x={x + 24} y={y + 4} width={16} height={2.5} rx={1.25} fill="rgba(255,255,255,0.35)" />
      {bars}
      <text x={x + 32} y={y + 104} textAnchor="middle" fill="#fff" fontSize="11" fontWeight="600" fontFamily="var(--sans)">{name}</text>
      <text x={x + 32} y={y + 118} textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9.5" fontFamily="var(--mono)">{route}</text>
    </g>
  );
}

function Edge({ d }) {
  return <path d={d} fill="none" stroke="rgba(214,204,255,0.75)" strokeWidth="1.6" strokeDasharray="4 4" strokeLinecap="round" markerEnd="url(#kt-arrow)" />;
}

function VisualFlow() {
  return (
    <div className="kt-vis kt-vis--flow" aria-label="A navigation flow shipped as one bundle">
      <div className="kt-flow-head">
        <span className="kt-mono">NavGraph</span>
        <span className="kt-mono"><i className="kt-ok" />main.ktx · v12</span>
      </div>
      <svg className="kt-flow-svg" viewBox="0 0 632 212" aria-hidden="true">
        <defs>
          <marker id="kt-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0 L10 5 L0 10 z" fill="#d6ccff" />
          </marker>
          <linearGradient id="kt-card-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#6b5be6" /><stop offset="1" stopColor="#a894ff" />
          </linearGradient>
        </defs>
        {/* checkout flow group */}
        <rect x="262" y="16" width="338" height="156" rx="14" fill="rgba(124,92,255,0.07)" stroke="#a894ff" strokeOpacity="0.55" strokeDasharray="5 5" />
        <text x="278" y="33" fill="#c6b8ff" fontSize="9.5" fontFamily="var(--mono)" letterSpacing="1">CHECKOUT FLOW</text>

        <Screen x={20} y={44} kind="welcome" name="Welcome" route="/welcome" />
        <Screen x={140} y={44} kind="home" name="Home" route="/home" />
        <Screen x={290} y={44} kind="plan" name="Plan" route="/plan" />
        <Screen x={400} y={44} kind="payment" name="Payment" route="/payment" />
        <Screen x={510} y={44} kind="done" name="Done" route="/done" />

        <Edge d="M86 86 H136" />
        <Edge d="M206 86 H286" />
        <Edge d="M356 86 H396" />
        <Edge d="M466 86 H506" />
        {/* return to home after done: out the right edge, around the
            bottom, in below the forward edge */}
        <Edge d="M578 86 H614 V196 H118 V112 H136" />
      </svg>
      <div className="kt-flow-stack" aria-hidden="true">
        <span className="kt-mono">back stack</span>
        <span className="kt-flow-chips">
          {STACK.map((r, i) => <i key={r} className={i === STACK.length - 1 ? 'is-top' : undefined}>{r}</i>)}
        </span>
      </div>
    </div>
  );
}

const VISUALS = { ui: VisualUi, code: VisualCode, caps: VisualCaps, flow: VisualFlow };

export default function LayerDeck() {
  return (
    <div className="kt-deck-track" data-deck="track">
      <div className="kt-deck" data-deck="pin">
        <div className="kt-deck-tabs" role="tablist" aria-label="What Ketoy delivers">
          {LAYERS.map((l, i) => (
            <span key={l.id} className={`kt-deck-tab${i === 0 ? ' is-on' : ''}`} data-deck="tab">
              <i /><span>{l.tab}</span>
            </span>
          ))}
        </div>
        <div className="kt-deck-cards">
          {LAYERS.map((l, i) => {
            const Visual = VISUALS[l.visual];
            return (
              <article className="kt-card" data-deck="card" key={l.id} style={{ zIndex: i + 1 }}>
                <div className="kt-card-copy">
                  <span className="kt-eyebrow">{l.tab}</span>
                  <h3>{l.h}</h3>
                  <p>{l.p}</p>
                  <ul className="kt-chips" aria-label="Examples">
                    {l.chips.map((c) => <li key={c}>{c}</li>)}
                  </ul>
                </div>
                <div className="kt-card-visual">
                  <Visual />
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
