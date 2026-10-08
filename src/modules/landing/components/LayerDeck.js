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

const ROUTES = [
  { name: 'Welcome', path: '/welcome', kind: 'welcome' },
  { name: 'Plan', path: '/plan', kind: 'plan' },
  { name: 'Payment', path: '/payment', kind: 'payment' },
  { name: 'Done', path: '/done', kind: 'done' },
];

function MiniScreen({ kind }) {
  if (kind === 'welcome') return (<><i className="ms-avatar" /><i className="ms-line w60" /><i className="ms-line w40" /><i className="ms-btn" /></>);
  if (kind === 'plan') return (<><i className="ms-line w50" /><i className="ms-row" /><i className="ms-row is-on" /><i className="ms-row" /></>);
  if (kind === 'payment') return (<><i className="ms-line w50" /><i className="ms-card" /><i className="ms-line w70" /><i className="ms-btn" /></>);
  return (<><i className="ms-check" /><i className="ms-line w60 c" /><i className="ms-line w40 c" /></>);
}

function VisualFlow() {
  return (
    <div className="kt-vis kt-vis--flow" aria-label="A navigation flow shipped as one bundle">
      <div className="kt-flow-head">
        <span className="kt-mono">NavGraph</span>
        <span className="kt-mono"><i className="kt-ok kt-ok--pulse" />main.ktx · v12</span>
      </div>
      <div className="kt-flow-track">
        <span className="kt-flow-rail" aria-hidden="true"><i /></span>
        {ROUTES.map((r, i) => (
          <div className="kt-flow-node" key={r.path} style={{ '--i': i }}>
            <span className="kt-flow-screen"><MiniScreen kind={r.kind} /></span>
            <b>{r.name}</b>
            <small>{r.path}</small>
          </div>
        ))}
      </div>
      <div className="kt-flow-stack" aria-hidden="true">
        <span className="kt-mono">back stack</span>
        <span className="kt-flow-chips">
          {ROUTES.map((r, i) => <i key={r.path} style={{ '--i': i }}>{r.path}</i>)}
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
