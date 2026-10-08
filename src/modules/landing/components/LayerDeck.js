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

function VisualFlow() {
  return (
    <div className="kt-vis kt-vis--flow" aria-label="A navigation flow shipped as one bundle">
      {['Welcome', 'Plan', 'Payment', 'Done'].map((s, i) => (
        <div className="kt-flow-node" key={s} style={{ '--i': i }}>
          <span className="kt-flow-screen">
            <i /><i /><i />
          </span>
          <b>{s}</b>
          <small>/{s.toLowerCase()}</small>
        </div>
      ))}
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
