import Link from 'next/link';
import Subnav from '@/components/Subnav';
import Callout from '@/modules/features/components/Callout';
import {
  subnavItems, statusCards, compCards, reservedComps,
  constructorRows, modifierGroups, tokenCards, kotlinCards,
  typeRows, nonGoalRows, capabilityRows,
} from '@/modules/features/data';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Supported Compose features for Kotlin SDUI',
  description:
    'The full matrix of Jetpack Compose composables, modifiers, capabilities, and KBC opcodes supported by Ketoy, the Kotlin-native server-driven UI (SDUI) framework for Android with over-the-air updates.',
  path: '/features',
});

const C = ({ children, size = '0.92em' }) => (
  <code style={{ fontFamily: 'var(--font-mono)', fontSize: size }}>{children}</code>
);

const MUTED_H3 = {
  fontSize: 16,
  color: 'var(--muted)',
  fontFamily: 'var(--font-ui)',
  fontWeight: 600,
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  marginBottom: 10,
};

export default function FeaturesPage() {
  return (
    <>
      <Subnav items={subnavItems} />

      <section className="page-head">
        <div className="container">
          <span className="eyebrow">Reference · code-verified</span>
          <h1>Supported features</h1>
          <p className="lede">
            Every entry on this page is grounded in the actual source - not the plan docs.
            &ldquo;Supported&rdquo; means the path is wired end-to-end: the compiler emits, the{' '}
            <C>.ktx</C> wire format carries it, the runtime resolves it, and an adapter consumes it. Audited against HEAD on 2026-05-17.
          </p>
        </div>
      </section>

      <div className="page-body">
        <div className="container">

          <div className="cards-grid cols-4" style={{ marginBottom: 64 }}>
            {statusCards.map((c) => (
              <div className="card" key={c.h}>
                <div className="num">{c.num}</div>
                <h3>{c.h}</h3>
                <p>{c.p}</p>
              </div>
            ))}
          </div>

          {/* COMPOSE COMPONENTS */}
          <div id="components" style={{ marginBottom: 64 }}>
            <div className="section-head" style={{ marginBottom: 32 }}>
              <span className="eyebrow">01 · Compose components</span>
              <h2 style={{ marginTop: 8 }}>Fully catalogued (16)</h2>
              <p>
                KSP reads <C>adapter-scan-roots.txt</C>, resolves each FQ name against the real
                Compose / Material3 / Foundation / Coil declarations on the build classpath, and
                emits typed adapters. Every parameter on every adapter is wired - never a curated subset.
              </p>
            </div>

            <div className="comp-grid">
              {compCards.map((c) => (
                <div className="comp-card" key={c.id}>
                  <div className="comp-card-head">
                    <span className="comp-card-name">{c.name}</span>
                    <span className="chip-id">{c.id}</span>
                  </div>
                  <div className="desc">{c.desc}</div>
                  <div className="params">
                    {c.params.map((p) => (<span className="chip" key={p}>{p}</span>))}
                  </div>
                </div>
              ))}
            </div>

            <h3 style={{ marginTop: 48, marginBottom: 14, fontSize: 22 }}>Reserved but not yet routed (19)</h3>
            <p style={{ fontSize: 15.5, color: 'var(--muted)', marginBottom: 16, maxWidth: 740 }}>
              These IDs exist in <C>KBCAdapterIds</C> but aren&rsquo;t in the scan-roots manifest yet.
              KBC source referencing them fails with <C>KetoyCompilationError.UnregisteredComposable</C>.
              Adding one is a one-line change to <C>adapter-scan-roots.txt</C> followed by{' '}
              <C>./gradlew :ketoy-adapters-material3:kspRelease</C>.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24 }}>
              {reservedComps.map((r) => (
                <span className="chip chip-muted" key={r}>
                  <span className="dot-sm dot-pending"></span>{r}
                </span>
              ))}
            </div>

            <Callout title="App-specific composables - range 0x4000+">
              <p>
                The host registers custom adapters on <code>KBCAdapterRegistry</code> and supplies
                a matching FQ in its own scan-roots file. Additional adapter catalogs published by
                other Gradle modules are loaded via <code>composeAdapterCatalogPath</code>.
              </p>
            </Callout>

            <Callout title="Compose-version decoupled - since 0.4.16-alpha">
              <p>
                Every parameter on these adapters is keyed by <strong>name</strong>, not position.
                The emitter maps each argument&rsquo;s param name to the catalog&rsquo;s{' '}
                <code>sourceIndex</code> and encodes in catalog space, so a newer Compose that{' '}
                <em>adds</em>, <em>reorders</em>, or <em>removes</em> a param no longer shifts your
                arguments into the wrong slot. A param the catalog doesn&rsquo;t know is dropped to
                the Compose default with a build-time advisory - never a silent wrong render. Bump
                your Compose BOM freely; see the{' '}
                <Link href="/updates/sdk?update=version-compatibility">version compatibility update</Link>.
              </p>
            </Callout>
          </div>

          {/* CONSTRUCTORS */}
          <div id="constructors" style={{ marginBottom: 64 }}>
            <div className="section-head" style={{ marginBottom: 24 }}>
              <span className="eyebrow">02 · Constructor parameters</span>
              <h2 style={{ marginTop: 8 }}>CONSTRUCT_JVM - registered adapters</h2>
              <p>
                Complex Compose value types aren&rsquo;t encoded inline. The compiler emits a{' '}
                <C>CONSTRUCT_JVM</C> opcode that builds the object via a registered constructor
                adapter and stores it in a register; the consuming <C>COMPOSABLE_CALL</C> reads it
                as <C>KBCValue.Register(n)</C>.
              </p>
            </div>

            <div className="spec-list">
              {constructorRows.map(([hex, name, note]) => (
                <div className="spec-row" key={hex + name}>
                  <span className="hex">{hex}</span>
                  <span className="name">{name}</span>
                  <span className="note">{note}</span>
                </div>
              ))}
            </div>

            <Callout kind="warn" title="TextStyle and friends - deferred">
              <p>
                IDs are reserved for <code>TEXT_STYLE</code>, <code>SPAN_STYLE</code>,
                <code>PARAGRAPH_STYLE</code>, <code>TEXT_FIELD_VALUE</code>,
                <code>CUT_CORNER_SHAPE</code>, <code>SHADOW</code>, <code>OFFSET</code>,
                <code>BORDER_STROKE</code>, <code>ANNOTATED_STRING</code>,
                <code>VISUAL_TRANSFORM_PASSWORD</code>, <code>TEXT_SELECTION_COLORS</code>,
                <code>MUTABLE_INTERACTION_SOURCE</code>, plus a coherent <code>0x0016…0x001F</code>
                block for the remaining Material3 <code>*Defaults</code> factories.
              </p>
              <p>
                TextStyle in particular needs the classifier to model <code>FontSynthesis</code>,
                <code>BaselineShift</code>, <code>TextGeometricTransform</code>,
                <code>LocaleList</code>, <code>Shadow</code>, <code>TextDirection</code>, and
                <code>TextIndent</code> before it can ship.
              </p>
            </Callout>
          </div>

          {/* MODIFIERS */}
          <div id="modifiers" style={{ marginBottom: 64 }}>
            <div className="section-head" style={{ marginBottom: 24 }}>
              <span className="eyebrow">03 · Modifier chains</span>
              <h2 style={{ marginTop: 8 }}>27 modifier operations</h2>
              <p>
                The IR walker extracts modifier builder calls at emit time into a{' '}
                <C>KBCModifierDescriptor</C>, pools it into the bundle&rsquo;s modifier table, and
                references it via <C>KBCValue.ModifierRef(idx)</C>. Argument resolution is{' '}
                <strong>named-arg</strong> - so K2&rsquo;s partial-default lowering like{' '}
                <C>padding(top = 48.dp, start = 16.dp)</C> works correctly.
              </p>
            </div>

            {modifierGroups.map((g) => (
              <div key={g.h}>
                <h3 style={MUTED_H3}>{g.h}</h3>
                <div className="op-pills">
                  {g.ops.map((o) => (<span className="op-pill" key={o}>{o}</span>))}
                </div>
              </div>
            ))}

            <p style={{ fontSize: 14.5, color: 'var(--muted)', marginTop: 4 }}>
              <C>Weight</C> is handled at the layout-scope level by Row / Column adapters via{' '}
              <C>KBCParamSet.getWeightOrNull(idx)</C> rather than during modifier folding.
            </p>

            <p style={{ marginTop: 18 }}>
              <strong>Shapes</strong> - <C>KBCShape</C> covers:
              <span className="chip" style={{ marginLeft: 6 }}>Rectangle</span>
              <span className="chip">Circle</span>
              <span className="chip">RoundedCorner(size)</span>
              <span className="chip">RoundedCornerPercent(percent)</span>
              <span className="chip">CutCorner(size)</span>
            </p>
          </div>

          {/* TOKENS */}
          <div id="tokens" style={{ marginBottom: 64 }}>
            <div className="section-head" style={{ marginBottom: 24 }}>
              <span className="eyebrow">04 · Tokens &amp; icons</span>
              <h2 style={{ marginTop: 8 }}>88 token constants across 13 families</h2>
              <p>
                Compose value reads like <C>FontWeight.Bold</C>, <C>Color.Red</C>, <C>16.dp</C>,
                <C>Arrangement.SpaceEvenly</C> all flow through a single <C>ComposeTokenRegistry</C>
                and encode as the matching <C>KBCValue.*Id</C> byte or inline literal.
              </p>
            </div>

            <div className="cards-grid cols-4" style={{ marginBottom: 24 }}>
              {tokenCards.map((c) => (
                <div className="card" key={c.num}>
                  <div className="num">{c.num}</div>
                  <h3 style={{ fontSize: 14, color: 'var(--muted)', fontFamily: 'var(--font-ui)', fontWeight: 500, letterSpacing: 0 }}>{c.h}</h3>
                  <p style={{ fontSize: 13 }}>{c.p}</p>
                </div>
              ))}
            </div>

            <Callout title={<>Material icons - R8-safe, no <code>-keep</code> rules</>}>
              <p>
                Material icons flow through <code>KBCValue.StringLiteral</code> carrying the
                canonical FQ. The host registers a <code>MaterialIconsResolver</code> built via the
                <code>materialIconsResolver {'{ }'}</code> DSL with per-style helpers
                (<code>registerFilled</code>, <code>registerRounded</code>,
                <code>registerOutlined</code>, <code>registerSharp</code>,
                <code>registerTwoTone</code>, plus the five <code>registerAutoMirrored*</code> variants).
              </p>
              <p>
                The compiler&rsquo;s <code>ComposeTokenRegistry</code> pattern-matches all 10
                Material icon style packages and 13 <code>Icons.&lt;get-Style&gt;</code> selectors.
                Missing-icon fallback is a 24×24 transparent <code>PlaceholderImageVector</code>
                - surfaces gaps visibly rather than crashing.
              </p>
            </Callout>
          </div>

          {/* KOTLIN LANGUAGE */}
          <div id="kotlin" style={{ marginBottom: 64 }}>
            <div className="section-head" style={{ marginBottom: 24 }}>
              <span className="eyebrow">05 · Kotlin language</span>
              <h2 style={{ marginTop: 8 }}>What the KBC interpreter handles</h2>
              <p>
                The KBC interpreter is register-based with <strong>106 opcodes</strong>. The
                IR-to-KBC lowering handles every IR node listed below; everything else folds
                statically (Compose runtime infra), routes to an allowlisted intrinsic, or fails
                compilation with a typed <C>KetoyCompilationError</C>.
              </p>
            </div>

            <div className="cards-grid cols-2">
              {kotlinCards.map((c) => (
                <div className="card" key={c.num}>
                  <div className="num">{c.num}</div>
                  <h3>{c.h}</h3>
                  <p style={{ fontSize: 14.5 }}>{c.p}</p>
                  {c.extra && (
                    <p style={{ fontSize: 13.5, color: 'var(--muted)', marginTop: 6 }}>{c.extra}</p>
                  )}
                  {c.chips && (
                    <div className="params" style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginTop: 8 }}>
                      {c.chips.map((ch) => (<span className="chip" key={ch}>{ch}</span>))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <h3 style={{ marginTop: 48, marginBottom: 14, fontSize: 22 }}>Classes &amp; type system</h3>
            <div className="spec-list">
              {typeRows.map(([level, name, note]) => (
                <div className="spec-row" key={name}>
                  <span className="chip">
                    <span className={`dot-sm ${level === 'Full' ? 'dot-ok' : 'dot-pending'}`}></span>
                    {level}
                  </span>
                  <span className="name">{name}</span>
                  <span className="note">{note}</span>
                </div>
              ))}
            </div>
          </div>

          {/* VIEWMODELS */}
          <div id="viewmodels" style={{ marginBottom: 64 }}>
            <div className="section-head" style={{ marginBottom: 24 }}>
              <span className="eyebrow">06 · ViewModel support</span>
              <h2 style={{ marginTop: 8 }}>Two layers - host-side and KBC-side</h2>
              <p>Both layers are load-bearing in production. The host owns lifecycle and persistence; KBC owns business logic.</p>
            </div>

            <div className="cards-grid cols-2">
              <div className="card">
                <span className="eyebrow" style={{ color: 'var(--accent-ink)' }}>Host side</span>
                <h3 style={{ marginTop: 6 }}>KetoyVirtualViewModel</h3>
                <p style={{ fontSize: 14.5 }}>
                  Extends Android <C>ViewModel</C>, owns a <C>Ketoy</C> per screen, instantiated
                  by <C>KetoyScreen</C> via <C>viewModel(factory)</C>.
                </p>
                <h4 style={{ fontFamily: 'var(--font-ui)', fontWeight: 600, fontSize: 13, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--muted)', marginTop: 14, marginBottom: 6 }}>State API</h4>
                <div className="params" style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                  {['state: StateFlow','getState','setState','setStateAll','removeState','observeState','dispatch'].map((c) => <span className="chip" key={c}>{c}</span>)}
                </div>
                <p style={{ fontSize: 13.5, color: 'var(--muted)', marginTop: 14 }}>
                  State map is <C>Map&lt;String, Any?&gt;</C>. Persistable types - primitives + arrays - mirror to <C>SavedStateHandle</C>. Restore priority: SavedState &gt; initialExtras &gt; empty.
                </p>
              </div>

              <div className="card">
                <span className="eyebrow" style={{ color: 'var(--accent-ink)' }}>KBC side</span>
                <h3 style={{ marginTop: 6 }}>KetoyBaseViewModel</h3>
                <p style={{ fontSize: 14.5 }}>
                  Base class developers extend when writing <C>@KetoyViewModel</C>-annotated classes.
                  Exposes four <C>lateinit var</C> properties bound post-construction before <C>init()</C> fires.
                </p>
                <h4 style={{ fontFamily: 'var(--font-ui)', fontWeight: 600, fontSize: 13, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--muted)', marginTop: 14, marginBottom: 6 }}>Injected properties</h4>
                <div className="params" style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                  {['viewModelScope','getState','setState','observeState'].map((c) => <span className="chip" key={c}>{c}</span>)}
                </div>
                <p style={{ fontSize: 13.5, color: 'var(--muted)', marginTop: 14 }}>
                  <C>open fun init()</C> runs once after binding. Default no-op. Constructor parameters resolve via the host&rsquo;s <C>KetoyCapabilityProvider</C> - capability IDs only, never Hilt graph access.
                </p>
              </div>
            </div>

            <div className="code-window" style={{ marginTop: 24 }}>
              <div className="code-chrome"><div className="dots"><i></i><i></i><i></i></div><span className="file">CounterViewModel.kt</span></div>
              <div className="code-body">
                <pre>
{`@KetoyViewModel
class CounterViewModel : KetoyBaseViewModel() {
    override fun init() { setState("count", 0) }

    fun increment() {
        val current = getState("count") as? Int ?: 0
        setState("count", current + 1)
    }
}`}
                </pre>
              </div>
            </div>

            <h3 style={{ marginTop: 48, marginBottom: 14, fontSize: 22 }}>What you can and can&rsquo;t put in a KBC ViewModel</h3>
            <div className="do-dont">
              <div className="do-list">
                <h4>You can</h4>
                <ul>
                  <li><span><code>MutableStateFlow</code> / <code>MutableSharedFlow</code> via <code>STATE_FLOW_CREATE</code> / <code>SHARED_FLOW_CREATE</code></span></li>
                  <li><span><code>viewModelScope.launch {'{ }'}</code> and <code>async {'{ }'}</code></span></li>
                  <li><span><code>suspend</code> functions, <code>withContext(Dispatchers.IO)</code>, <code>Flow.collect</code></span></li>
                  <li><span>Every Flow operator - <code>map</code>, <code>filter</code>, <code>debounce</code>, <code>flatMapLatest</code>, <code>combine</code>, <code>take</code>, <code>distinctUntilChanged</code></span></li>
                  <li><span>Calls to host capabilities through <code>@KetoyCapabilityStub</code> (Room DAO, Retrofit, DataStore)</span></li>
                  <li><span>Plain Kotlin - data classes, sealed classes, branches, loops</span></li>
                  <li><span>Cross-ViewModel calls within the same bundle (via capability path)</span></li>
                </ul>
              </div>
              <div className="dont-list">
                <h4>You can&rsquo;t</h4>
                <ul>
                  <li><span><strong>Inject host dependencies directly.</strong> Hilt is host-side only - KBC never sees the graph.</span></li>
                  <li><span><strong>Hold non-persistable state across process death.</strong> Values outside the allowlist drop at save time, reappear absent on restore.</span></li>
                  <li><span><strong>Override <code>onCleared</code>.</strong> Lifecycle is owned by <code>KetoyVirtualViewModel</code>; <code>init()</code> is the only entry. Cleanup is implicit via <code>viewModelScope</code> cancellation.</span></li>
                </ul>
              </div>
            </div>
          </div>

          {/* NON-GOALS */}
          <div id="non-goals" style={{ marginBottom: 64 }}>
            <div className="section-head" style={{ marginBottom: 24 }}>
              <span className="eyebrow">07 · Hard non-goals</span>
              <h2 style={{ marginTop: 8 }}>Compile-time-rejected by CapabilityValidator</h2>
              <p>These produce typed diagnostics with the offending FQ name, a rationale, a runnable fix example, and a docs URL.</p>
            </div>

            <div className="spec-list">
              {nonGoalRows.map(([name, note]) => (
                <div className="spec-row" key={name}>
                  <span className="hex">Reject</span>
                  <span className="name">{name}</span>
                  <span className="note">{note}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CAPABILITIES */}
          <div id="capabilities" style={{ marginBottom: 64 }}>
            <div className="section-head" style={{ marginBottom: 32 }}>
              <span className="eyebrow">08 · Capabilities</span>
              <h2 style={{ marginTop: 8 }}>67 built-in IDs across 8 ranges</h2>
              <p>
                The bridge between KBC and the host platform. KBC code never sees Hilt, Retrofit,
                OkHttp, Room DAOs, DataStore, or the Android <C>Context</C> - every interaction
                routes through a Short-ID-keyed lambda registered on <C>CapabilityRegistry</C>.
              </p>
            </div>

            <div className="feat-list">
              {capabilityRows.map((r) => (
                <div className="feat-row" key={r.cat}>
                  <div className="cat">{r.cat}<small>{r.small}</small></div>
                  <div className="items">
                    {r.chips.map((c, i) => (
                      <span className="chip" key={i} style={c.includes('reserved') ? { opacity: 0.5 } : undefined}>{c}</span>
                    ))}
                  </div>
                  <span className="count">{r.count}</span>
                </div>
              ))}
            </div>

            <Callout title="The Room / Retrofit / DataStore pattern" style={{ marginTop: 24 }}>
              <p>
                There is no special generator. The host writes a normal Room <code>@Entity</code>
                + <code>@Dao</code> + <code>@Database</code>, injects the DAO into its
                <code>KetoyCapabilityProvider</code>, and registers each operation under a
                <code>0x4000+</code> ID via <code>KBCRoomBridge</code> helpers. The KBC side
                calls a <code>@KetoyCapabilityStub</code>-marked function and the compiler plugin
                rewrites the call to <code>INVOKE_CAPABILITY_SUSPEND</code>.
              </p>
              <p>Retrofit, DataStore typed flows, Bluetooth, camera, WorkManager - same pattern, same wrap-as-capability flow.</p>
            </Callout>
          </div>

          {/* BUNDLE / TOOLING */}
          <div id="bundle" style={{ marginBottom: 64 }}>
            <div className="section-head" style={{ marginBottom: 24 }}>
              <span className="eyebrow">09 · Bundle &amp; tooling</span>
              <h2 style={{ marginTop: 8 }}>.ktx format, signing, JIT, and dev tools</h2>
            </div>

            <div className="cards-grid cols-2">
              <div className="card">
                <h3>.ktx bundle format</h3>
                <p style={{ fontSize: 14.5 }}>Brotli-compressed, Ed25519-signed binary container. Format <strong>v2</strong> - additive, so pre-2.1 readers parse v2 files with one field defaulted. 10 ordered sections.</p>
                <div className="params" style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginTop: 8 }}>
                  {['STRING_POOL','ADAPTER_MANIFEST','CONSTRUCTOR_MANIFEST','CAPABILITY_MANIFEST','MODIFIER_TABLE','FUNCTION_TABLE','CODE','DEBUG_INFO','ENTRY_POINTS','BUNDLE_METADATA'].map((c) => <span className="chip" key={c}>{c}</span>)}
                </div>
              </div>
              <div className="card">
                <h3>Bundle loading</h3>
                <p style={{ fontSize: 14.5 }}><C>KetoyBundleSource</C> has 4 variants. Remote loading uses Ktor + OkHttp with on-device ETag cache; 304 serves cache; offline fallback to cache on network failure.</p>
                <div className="params" style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginTop: 8 }}>
                  {['Preloaded(bundle)','Raw(bytes)','Asset(path)','Remote(url, headers)'].map((c) => <span className="chip" key={c}>{c}</span>)}
                </div>
              </div>
              <div className="card">
                <h3>Signing &amp; key management</h3>
                <p style={{ fontSize: 14.5 }}>Ed25519 keypair generation via <C>openssl genpkey</C> (raw 32-byte seed). Signing plumbed through <C>KetoyBundleTask</C>. Verification: Ed25519 → <C>KtxReader</C> → <C>BundleValidator</C> inside <C>KetoyRuntime.parseBundle</C>.</p>
              </div>
              <div className="card">
                <h3>Tier-1 JIT</h3>
                <p style={{ fontSize: 14.5 }}>DexMaker-backed JIT for whitelisted pure-logic functions - no capabilities, no coroutines, no Compose, no DIV/MOD on Int/Long. Activated on API 26+ when <C>enableJIT = true</C>. Translation failures fall back to the interpreter silently.</p>
                <p style={{ fontSize: 13.5, color: 'var(--muted)', marginTop: 6 }}>Speed gate: ≥1.5× over the interpreter.</p>
              </div>
              <div className="card">
                <h3>Dev overlay</h3>
                <p style={{ fontSize: 14.5 }}>Auto-enabled on debug builds (<C>FLAG_DEBUGGABLE</C>). Shows COMPOSABLE_CALL / CONSTRUCT_JVM / capability dispatch logs with human-readable names. Every emit site is gated - zero overhead in release.</p>
              </div>
              <div className="card">
                <h3>Test infrastructure</h3>
                <p style={{ fontSize: 14.5 }}><C>FakeAdapterRegistry</C> + <C>FakeConstructorRegistry</C> (record-only fakes), <C>KBCBuilder</C> + <C>ParamBuilder</C> sparse-encoding DSL, <C>buildKBCBundle {'{ }'}</C> named-entry-point DSL, <C>KetoyTestRuntime</C> with descriptive entry-point errors.</p>
              </div>
            </div>
          </div>

          {/* GRADLE */}
          <div id="gradle" style={{ marginBottom: 64 }}>
            <div className="section-head" style={{ marginBottom: 24 }}>
              <span className="eyebrow">10 · Gradle plugin</span>
              <h2 style={{ marginTop: 8 }}>Two build modes</h2>
              <p><C>id(&quot;dev.ketoy.compiler&quot;)</C> from the Gradle plugin portal plus the BOM. Choose the mode that fits your project layout.</p>
            </div>

            <div className="cards-grid cols-2">
              <div className="card">
                <span className="eyebrow" style={{ color: 'var(--accent-ink)' }}>Default</span>
                <h3 style={{ marginTop: 6 }}>Bundle module mode</h3>
                <p style={{ fontSize: 14.5 }}>A separate library module holds the KetoyBC source. Produces <C>.ktx</C> in <C>build/ketoy-bundles/</C>. The consumer (<C>:app</C>) copies the asset.</p>
              </div>
              <div className="card">
                <span className="eyebrow" style={{ color: 'var(--accent-ink)' }}>ADR-0003 · sample app uses this</span>
                <h3 style={{ marginTop: 6 }}>In-tree mode</h3>
                <p style={{ fontSize: 14.5 }}><C>{`ketoy { exportFromAppModule = true; bundleVariant = "release" }`}</C> on the host APK. The compiler attaches only to the selected variant&rsquo;s <C>compile&lt;Variant&gt;Kotlin</C>; output lands in <C>src/main/assets/ketoy/&lt;bundleId&gt;.ktx</C> and the plugin auto-wires the <C>merge&lt;Variant&gt;Assets</C> dependency.</p>
              </div>
            </div>

            <p style={{ fontSize: 15, color: 'var(--muted)', marginTop: 18 }}><C>./gradlew ketoyBundle</C> produces a signed <C>.ktx</C> against the host-supplied private key. The runtime activation policy (<C>PackageInfo.longVersionCode</C> check, rollback, <C>onBundleAppVersionMismatch</C> callback) is plumbed through the format but not yet enforced at runtime - that&rsquo;s a Phase 11B/D item.</p>
          </div>

          <div className="cta-banner">
            <div>
              <h2>Ready to ship?</h2>
              <p>The local-asset path is fully supported today. Cloud delivery - push <C size="0.92em">.ktx</C> to a CDN, users get updates without a Play Store release - is in active development.</p>
            </div>
            <div className="right">
              <Link className="btn btn-ghost" href="/architecture">Read the architecture</Link>
              <Link className="btn btn-primary" href="/get-started">Get started</Link>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
