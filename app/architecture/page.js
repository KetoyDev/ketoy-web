import Link from 'next/link';
import Subnav from '@/components/Subnav';
import {
  subnavItems,
  stackRows,
  opcodeCards,
  diagnosticRows,
  capabilityFamilies,
  moduleRows,
} from '@/modules/architecture/data';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Architecture - how Kotlin Compose compiles to OTA bundles',
  description:
    'How Ketoy compiles real Jetpack Compose in Kotlin to signed Ketoy Bytecode (KBC) and renders it natively on device, the engine behind Kotlin-native server-driven UI (SDUI) and over-the-air (OTA) updates on Android.',
  path: '/architecture',
});

export default function ArchitecturePage() {
  return (
    <>
      <Subnav items={subnavItems} />

      <section className="page-head">
        <div className="container">
          <span className="eyebrow">Technical deep dive</span>
          <h1>Architecture</h1>
          <p className="lede">
            A long-form walkthrough of how Ketoy actually works, written for the kind of developer who reads &ldquo;server-driven UI on Android&rdquo; and immediately asks <em>&ldquo;…how though?&rdquo;</em> <br></br> <br></br>A ride through a K2 IR compiler plugin, a custom register-based bytecode, an on-device DEX JIT, a KSP code generator, and roughly a hundred small engineering decisions that each looked easy until they weren&rsquo;t.
          </p>
          <p style={{ marginTop: 16 }}>
            <strong>You write plain Kotlin and Jetpack Compose; we compile every screen, every helper, every view model in your app into a single signed binary; your APK ships with that binary; and a register-based VM inside your app runs it at native speed.</strong> When you push an updated binary to your CDN, every device picks it up on the next cold start - no Play Store release, no APK update, no DSL, no JSON schema. Just Kotlin.
          </p>
        </div>
      </section>

      <div className="page-body">
        <div className="container">

          {/* 1. PREMISE */}
          <div id="premise" style={{ marginBottom: 64 }}>
            <div className="section-head" style={{ marginBottom: 24 }}>
              <span className="eyebrow">01 · Premise</span>
              <h2 style={{ marginTop: 8 }}>The premise</h2>
              <p>Server-driven UI on Android has been a rich problem space for years. Most approaches plateau the moment a real product feature introduces a loop, a conditional, a coroutine, a captured-variable lambda, or business logic that wants to live next to the UI that uses it.</p>
            </div>
            <p>At that scale the choice tends to be: invent a tiny programming language inside JSON (badly), or ship a parallel SDK that lags real Compose by six months, or write thirty bespoke adapters to make one screen work. Each of those trades has good reasons.</p>
            <p style={{ marginTop: 16 }}>Ketoy takes a different trade. Don&rsquo;t translate Kotlin into a new format and hope the format stays expressive - <strong>ship Kotlin itself.</strong> The same <code>@Composable</code> function you&rsquo;d write in a native app, compiled to a custom bytecode (KBC), packaged in a signed binary (<code>.ktx</code>), and executed on-device by a VM that talks to actual <code> androidx.compose.material3.Button</code>, actual <code>viewModelScope</code>, actual <code>SavedStateHandle</code>, actual <code>collectAsState</code>.</p>
            <p style={{ marginTop: 16 }}>The mental model is unapologetic: <strong>your host APK is the operating system, the server ships programs.</strong> Think Hermes for React Native, except scoped to a Kotlin/Compose world and built around the idea that the language you already write <em>is</em> the wire format.</p>
          </div>

          {/* 2. FIVE-LAYER STACK */}
          <div id="stack" style={{ marginBottom: 64 }}>
            <div className="section-head" style={{ marginBottom: 32 }}>
              <span className="eyebrow">02 · Overview</span>
              <h2 style={{ marginTop: 8 }}>The five-layer stack</h2>
              <p>Every layer exists because the layer above creates a problem. The rest of this page walks it top to bottom.</p>
            </div>
            <div className="stack">
              {stackRows.map((row) => (
                <div key={row.lvl} className={`stack-row${row.accent ? ' accent' : ''}`}>
                  <span className="lvl">{row.lvl}</span>
                  <div>
                    <span className="name">{row.name}</span>
                    <span className="desc">{row.desc}</span>
                  </div>
                  <span className="meta">{row.meta}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 3. SOURCE LAYER */}
          <div id="source" style={{ marginBottom: 64 }}>
            <div className="section-head" style={{ marginBottom: 24 }}>
              <span className="eyebrow">03 · Source layer</span>
              <h2 style={{ marginTop: 8 }}>Your existing app, annotated</h2>
              <p>The promise we hold tightest: you don&rsquo;t learn a new component model.</p>
            </div>
            <div className="code-window" style={{ marginBottom: 24 }}>
              <div className="code-chrome">
                <div className="dots"><i></i><i></i><i></i></div>
                <span className="file">CheckoutScreen.kt</span>
              </div>
              <div className="code-body">
                <pre>
{`@KetoyEntryPoint
@Composable
fun CheckoutScreen(vm: CheckoutViewModel = hiltViewModel()) {
    val state by vm.state.collectAsState()

    Scaffold(topBar = { TopAppBar(title = { Text("Checkout") }) }) { padding ->
        LazyColumn(modifier = Modifier.padding(padding)) {
            items(state.cart) { item ->
                ProductCard(item, onRemove = { vm.dispatch("remove", item.id) })
            }
        }
    }
}`}
                </pre>
              </div>
            </div>
            <p>That&rsquo;s a complete Ketoy screen. It would also compile as a regular Android app with no Ketoy involvement at all. The <code>collectAsState</code>, the captured <code>item.id</code> in the lambda, the <code>Modifier.padding</code> chain, the <code>Scaffold</code> content slot - those are all real Compose, validated by the real Compose compiler, then re-lowered by us into bytecode for the remoted path.</p>

            <h3 style={{ marginTop: 32, marginBottom: 12 }}>Four annotations</h3>
            <ul>
              <li><code>@KetoyEntryPoint</code> - marks a top-level screen the host can render by name.</li>
              <li><code>@KetoyComposable</code> - marks a helper composable reachable from inside the closure (a list row, a section header, a dialog).</li>
              <li><code>@KetoyViewModel</code> - marks a view model that lives in KBC land and is bridged into the host&rsquo;s Hilt graph.</li>
              <li><code>@KetoyCapabilityStub(id, name)</code> - declares a native bridge: the function shape is the KBC-side surface, the implementation is wired by the host.</li>
            </ul>
            <p style={{ marginTop: 16 }}>That&rsquo;s the entire surface for marking exportable code. Everything else in your app - data classes, sealed classes, enum classes, helper functions, extension functions, suspend functions - gets pulled into the bundle <strong>automatically</strong> by the compiler plugin&rsquo;s closure walk the moment it&rsquo;s reachable from something you marked.</p>

            <div className="cards-grid cols-2" style={{ marginTop: 24 }}>
              <div className="card">
                <h3>Things you never write</h3>
                <ul>
                  <li>Component registrations.</li>
                  <li>Parameter encoders or type converters.</li>
                  <li>JSON schemas or adapter shims.</li>
                  <li>Migration glue for existing Compose screens.</li>
                </ul>
              </div>
              <div className="card">
                <h3>Things that work the same as native</h3>
                <ul>
                  <li>Coroutines and structured concurrency.</li>
                  <li><code>Flow</code>, <code>StateFlow</code>, <code>SharedFlow</code>, all the standard operators.</li>
                  <li>ViewModels with <code>SavedStateHandle</code>.</li>
                  <li>Navigation, modifier chains, custom composables, lambdas capturing outer locals - including <code>LazyColumn</code> per-item lambdas that capture both an iterator variable <em>and</em> outer state.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 4. COMPILER PLUGIN */}
          <div id="compiler" style={{ marginBottom: 64 }}>
            <div className="section-head" style={{ marginBottom: 24 }}>
              <span className="eyebrow">04 · Compiler plugin</span>
              <h2 style={{ marginTop: 8 }}>Where Kotlin becomes KBC</h2>
              <p>K2 exposes the IR backend. By the time we get a turn, type checking and lowering are already done; the program is a tree of <code>IrFunction</code>, <code>IrCall</code>, <code>IrConst</code>, <code>IrWhen</code>, <code>IrTry</code>, <code>IrFunctionExpression</code> (lambdas), <code>IrComposite</code> (Compose&rsquo;s slot-table bookkeeping). We register an <code>IrGenerationExtension</code>, walk that tree, and emit bytecode.</p>
            </div>

            <h3 style={{ marginBottom: 12 }}>Four passes</h3>
            <ol>
              <li><strong>Collect</strong> - find every <code>@Ketoy*</code>-annotated declaration. Also collect every top-level function in the module.</li>
              <li><strong>Validate</strong> - walk the transitive closure rooted at each Ketoy declaration. Any call to a forbidden API becomes a compile error with a fix suggestion and a docs link. Sibling code that nothing reachable from KBC ever calls? Compiled to regular DEX, completely untouched.</li>
              <li><strong>Emit</strong> - lower each KBC-reachable function into KBC instructions.</li>
              <li><strong>Bundle</strong> - serialise the entire thing into one <code>.ktx</code> file and sign it with Ed25519.</li>
            </ol>

            <h3 style={{ marginTop: 32, marginBottom: 12 }}>The KBC instruction set</h3>
            <p>KBC is a <strong>register-based bytecode</strong> (think Dalvik, not the JVM stack). Each function has a register file; instructions read from and write to numbered slots. The current opcode table holds 107 entries across these families:</p>
            <div className="cards-grid cols-2" style={{ marginTop: 20 }}>
              {opcodeCards.map((c) => (
                <div key={c.h} className="card">
                  <div className="num">{c.num}</div>
                  <h3>{c.h}</h3>
                  <p>{c.p}</p>
                </div>
              ))}
            </div>
            <p style={{ marginTop: 24 }}>A register ISA was chosen because the source language is too. The JVM is stack-based, which would force a synthetic operand stack on top of Kotlin&rsquo;s locals - extra opcodes, slower interpretation, harder JIT translation. Dalvik picked registers for the same reason; we followed.</p>

            <h3 style={{ marginTop: 32, marginBottom: 12 }}>The Compose problem</h3>
            <p>An innocent-looking question:</p>
            <div className="code-window" style={{ margin: '16px 0' }}>
              <div className="code-chrome"><div className="dots"><i></i><i></i><i></i></div><span className="file">how do you encode this?</span></div>
              <div className="code-body"><pre>{`Text(text = "Hi", fontWeight = FontWeight.Bold, fontSize = 16.sp)`}</pre></div>
            </div>
            <p>How do you encode that into bytecode? A naive &ldquo;generic call with positional args&rdquo; instruction collapses the moment you remember that <code>Text</code> has 15 parameters, <code>OutlinedTextField</code> has 22, Material3 adds new ones every minor release, and half the parameter types are compound objects - a <code>TextStyle</code> containing a <code>Shadow</code> containing an <code>Offset</code>, or a <code>TextFieldColors</code> with 30+ fields.</p>
            <p style={{ marginTop: 16 }}>A flat <code>List&lt;Any?&gt;</code> argument list looks attractive until you also remember you can&rsquo;t serialise half of those values: they&rsquo;re closures, lambdas, Compose internals that only have meaning inside the composition. We tried hand-rolled adapters first. They worked for a while and then they didn&rsquo;t.</p>
            <p style={{ marginTop: 16 }}>So we built the <strong>Two-Layer Parameter System.</strong></p>

            <h3 style={{ marginTop: 32, marginBottom: 12 }}>Layer one - KBCValue: the constant vocabulary</h3>
            <p><code>KBCValue</code> is a sealed type with 35 variants, each carrying a one-byte wire tag. It models &ldquo;everything that can appear as a parameter to a Compose function, encoded statically&rdquo;: sentinels (<code>Default</code>, <code>Null</code>, <code>NoCallback</code>, …), primitives, Compose units (<code>Dp</code>, <code>Sp</code>, <code>ColorARGB</code>), Compose token IDs (<code>FontWeightInt</code>, <code>TextAlignId</code>, <code>KeyboardTypeId</code>, …), references (<code>Register</code>, <code>ModifierRef</code>, <code>FunctionRef</code>), and closures (<code>ClosureRef(fnIdx, capturedRegs)</code>).</p>
            <p style={{ marginTop: 16 }}>The tag bytes let us encode sparse parameter lists compactly. A <code>Text(&quot;Hi&quot;)</code> call doesn&rsquo;t specify all 14 other arguments - unspecified slots are simply absent on the wire, and the adapter on the runtime side fills them with Compose&rsquo;s actual defaults. Typed enum IDs preserve intent: <code>FontWeight.Bold</code> is a singleton; encoding it as <code>IntVal(700)</code> would lose the type signal at the call site.</p>

            <h3 style={{ marginTop: 32, marginBottom: 12 }}>Layer two - CONSTRUCT_JVM: when constants aren&rsquo;t enough</h3>
            <p><code>KBCValue</code> covers the bulk of UI parameters. The remaining cases are compound values - <code>TextStyle(...)</code>, <code>KeyboardOptions(...)</code>, <code>RoundedCornerShape(...)</code>, <code>ButtonDefaults.buttonColors(...)</code>. Their shapes are open.</p>
            <p style={{ marginTop: 16 }}>Enter <code>CONSTRUCT_JVM</code>. At KBC level it says: <em>&ldquo;Build me a JVM object via constructor adapter ID 0x0004 with the following parameter slots filled in. Store the result in register r5.&rdquo;</em> The runtime looks up adapter <code>0x0004</code> (which is <code>KeyboardOptions</code>), collects the supplied parameters into a <code>KBCParamSet</code>, and invokes the real constructor.</p>
            <p style={{ marginTop: 16 }}>For factories that need to read <code>MaterialTheme</code> - anything in <code>ButtonDefaults</code>, <code>CardDefaults</code>, <code>TopAppBarDefaults</code> - we have an <code>objectFactory=</code> variant in the catalog. Construction runs inside the composition phase, so theme-aware reads work correctly.</p>

            <h3 style={{ marginTop: 32, marginBottom: 12 }}>The validator&rsquo;s compile-time contract</h3>
            <p>Every forbidden API in KBC source becomes a typed compile error. Not a runtime crash, not a silent fallback - a build failure with a fix suggestion and a docs URL:</p>
            <div className="code-window" style={{ margin: '16px 0' }}>
              <div className="code-chrome"><div className="dots"><i></i><i></i><i></i></div><span className="file">build error</span></div>
              <div className="code-body">
                <pre>
{`KetoyBC: Direct access to android.content.SharedPreferences
  Reached via: CheckoutScreen → loadCachedTodos → SharedPreferences.getString
  Why: KBC bundles cannot touch Android APIs directly. Use a capability.
  Fix: Wrap SharedPreferences access as a @KetoyCapabilityStub …
  Docs: https://ketoy.dev/docs/capabilities/android-apis`}
                </pre>
              </div>
            </div>
            <div className="feat-list" style={{ marginTop: 24 }}>
              {diagnosticRows.map((d) => (
                <div key={d.cat} className="feat-row">
                  <div className="cat">
                    {d.cat}
                  </div>
                  <div className="items">
                    <span className="chip">{d.desc}</span>
                  </div>
                  <span className="count">·</span>
                </div>
              ))}
            </div>
            <p style={{ marginTop: 16 }}>The walk is breadcrumbed: when a forbidden API is six calls deep, the diagnostic points at the leaf and prints the path back to the entry point so the developer knows which screen owns the problem.</p>
          </div>

          {/* 5. CLOSURE WALK */}
          <div id="closure" style={{ marginBottom: 64 }}>
            <div className="section-head" style={{ marginBottom: 24 }}>
              <span className="eyebrow">05 · Closure walk</span>
              <h2 style={{ marginTop: 8 }}>How native and KBC coexist</h2>
              <p>The single most important property of the compiler plugin - and the thing that makes Ketoy adoption realistic for existing apps.</p>
            </div>
            <p>When you adopt Ketoy, you don&rsquo;t migrate your whole app. You annotate a few entry points, and the plugin walks the <strong>transitive closure</strong> rooted at each marker.</p>

            <div className="cards-grid cols-2" style={{ marginTop: 24 }}>
              <div className="card">
                <h3>Pulled into the bundle</h3>
                <ul>
                  <li>Every helper composable, data class, sealed class, enum, top-level function, extension function reachable from a marked declaration.</li>
                  <li>Every <code>@KetoyViewModel</code>-marked class and the plain Kotlin types it touches.</li>
                  <li>Every <code>@KetoyCapabilityStub</code>-marked declaration - becomes <code>INVOKE_CAPABILITY*</code> opcodes pointing at host-registered functions.</li>
                </ul>
              </div>
              <div className="card">
                <h3>Stays native, untouched</h3>
                <ul>
                  <li>Your Hilt-injected repositories, Room DAOs, Retrofit services.</li>
                  <li>Your <code>Application</code> class, your <code>MainActivity</code>, your Android service classes.</li>
                  <li>Any composable or function that nothing reachable from a Ketoy root ever calls.</li>
                </ul>
              </div>
            </div>

            <h3 style={{ marginTop: 32, marginBottom: 12 }}>The closure-conversion problem</h3>
            <p>Consider:</p>
            <div className="code-window" style={{ margin: '16px 0' }}>
              <div className="code-chrome"><div className="dots"><i></i><i></i><i></i></div><span className="file">capture.kt</span></div>
              <div className="code-body"><pre>{`val title = "Hello"
Column { Text(title) }`}</pre></div>
            </div>
            <p>The <code>Column &#123; Text(title) &#125;</code> lambda is a content slot - Compose inserts it into the slot table at render time. When we emit it as a KBC function, it gets its own function index. Fine. But inside the lambda, <code>Text(title)</code> reads <code>title</code> from the outer scope. A naive emit produces an unbound-local error.</p>
            <p style={{ marginTop: 16 }}>The fix is <strong>closure conversion at IR time.</strong> A <code>ClosureAnalyzer</code> walks the lambda body looking for outer-scope reads. Those become captured registers, prepended to the lambda&rsquo;s formal parameters. At the call site, we emit <code>ClosureRef(fnIdx, [r3, r7, ...])</code> - a <code>KBCValue</code> variant carrying parent-frame register indices.</p>
            <p style={{ marginTop: 16 }}>The runtime <strong>snapshots each captured register eagerly</strong> at slot-resolution time, then prepends those snapshots to the lambda&rsquo;s argument list. Compose lambdas can fire arbitrarily late; eager snapshots match Kotlin&rsquo;s actual closure semantics - the lambda sees what <code>title</code> meant at the call site.</p>
            <p style={{ marginTop: 16 }}><code>LazyColumn</code> was the bonus boss fight. <code>items(list) &#123; item -&gt; Card(item) &#125;</code> takes both an iterator variable <em>and</em> outer captures. The runtime exposes a <code>getItemContentSlot(idx)</code> resolver that snapshots captures eagerly, then appends <code>item</code> after them, then dispatches. Same mechanism, one more parameter slot.</p>
            <p style={{ marginTop: 16 }}>We keep this honest with a dedicated <code>:ketoy-closure-fixtures</code> module shipping audited capture patterns - single capture, multi-capture, navigation-onClick capture, nested two-level capture, conditional capture, non-capturing baseline - exercised on every release to catch regressions before they hit production.</p>
          </div>

          {/* 6. ADAPTER CATALOG */}
          <div id="catalog" style={{ marginBottom: 64 }}>
            <div className="section-head" style={{ marginBottom: 24 }}>
              <span className="eyebrow">06 · Adapter catalog</span>
              <h2 style={{ marginTop: 8 }}>KSP doing the heavy lifting</h2>
              <p>So a <code>COMPOSABLE_CALL(adapterId = BUTTON, paramCount = 10, …)</code> reaches the runtime. Who calls <code>androidx.compose.material3.Button</code> for real? A typed adapter.</p>
            </div>

            <div className="code-window" style={{ marginBottom: 24 }}>
              <div className="code-chrome"><div className="dots"><i></i><i></i><i></i></div><span className="file">ButtonAdapter (generated, conceptual)</span></div>
              <div className="code-body">
                <pre>
{`KBCComposableAdapter(
    id = KBCAdapterIds.BUTTON,
    fqName = "androidx.compose.material3.Button",
    paramCount = 10,
) { p ->
    Button(
        onClick  = p.getLambda(0) ?: {},
        modifier = p.getModifier(1),
        enabled  = if (p.isDefaulted(2)) true else p.getBool(2, true),
        shape    = p.getShape(3) ?: ButtonDefaults.shape,
        // ... five more typed parameters with proper defaults ...
    ) {
        p.getContentSlot(9)?.invoke()
    }
}`}
                </pre>
              </div>
            </div>

            <p><code>KBCParamSet</code> is the typed bridge between the binary <code>KBCValue</code> encoding and real Compose types. It exposes 30+ typed getters - <code>getString</code>, <code>getColor</code>, <code>getDp</code>, <code>getModifier</code>, <code>getFontWeight</code>, <code>getTextStyle</code>, <code>getShape</code>, <code>getKeyboardType</code>, <code>getImeAction</code>, <code>getLambda</code>, <code>getContentSlot</code>, <code>getItemContentSlot</code>, <code>getPaddingValuesContentSlot</code>, <code>getImageVector</code>, <code>getFontFamily</code>, and the rest - each one a sealed <code>when()</code> dispatch with no reflection, no string parsing, no positional <code>List&lt;Any?&gt;</code> contracts.</p>

            <p style={{ marginTop: 16 }}>We originally hand-rolled the adapters. That died exactly the way you&rsquo;d expect: <code>Button</code> has 10 parameters, our hand-roll had 4; <code>TextField</code> has 22, our hand-roll had 5; Material3 1.5 added <code>minLines</code>, Material3 1.7 deprecated <code>autoCorrect</code>; every time someone hand-counted <code>paramCount = 4</code>, six styling levers silently disappeared from the remoted version.</p>

            <p style={{ marginTop: 16 }}>The fix is the <strong><code>ComposeAdapterCatalog</code></strong>, generated by KSP from the real function declarations on the build classpath. The catalog knows, per adapter: adapter ID, FQ name, parameter count - all read from real KSP type info, never hand-counted. A <code>ParamDescriptor</code> per parameter: source index, name, type FQ name, classified <code>ParamKind</code>, nullability, whether the parameter has a default in the Compose source. For content slots, the receiver scope (plain, <code>ColumnScope</code>, <code>RowScope</code>, <code>BoxScope</code>, <code>PaddingValues</code>).</p>

            <p style={{ marginTop: 16 }}>Today the catalog ships full typed coverage for Text, Column, Row, Box, Scaffold, Surface, Card, Spacer, Button, IconButton, TextField, Checkbox, Switch, AsyncImage, TopAppBar, Icon, and the matching constructor adapters for KeyboardOptions, KeyboardActions, RoundedCornerShape, and the Material3 <code>*Defaults.colors()</code> / <code>*Defaults.elevation()</code> factory family.</p>
            <p style={{ marginTop: 16 }}>Adding a new component is one line in the scan-roots file plus <code>./gradlew :ketoy-adapters-material3:kspRelease</code>. We made it easier to add components than to argue about whether to add them. <code>KBCAdapterIds.APP_SPECIFIC_START</code> (<code>0x4000</code>) reserves the upper ID space for host apps to register their own.</p>
          </div>

          {/* 7. BUNDLE */}
          <div id="bundle" style={{ marginBottom: 64 }}>
            <div className="section-head" style={{ marginBottom: 24 }}>
              <span className="eyebrow">07 · .ktx bundle</span>
              <h2 style={{ marginTop: 8 }}>One file, whole app</h2>
              <p>A <code>.ktx</code> is a Brotli-compressed, Ed25519-signed binary container. <strong>Every screen, every helper, every view model, every entry point collapses into a single bundle.</strong> One file, a handful of kilobytes, signed once, shipped from your CDN to every user.</p>
            </div>

            <div className="code-window" style={{ marginBottom: 24 }}>
              <div className="code-chrome">
                <div className="dots"><i></i><i></i><i></i></div>
                <span className="file">.ktx · wire layout (format v2)</span>
              </div>
              <div className="code-body">
                <pre>
{``}<span className="tk-com">Header (14 bytes)</span>{`
  magic         = "KTOY"
  formatVersion = u16
  minRuntimeVer = u16
  flags         = u32  `}<span className="tk-com">// DEBUG_INFO_PRESENT, UNSIGNED</span>{`
  sectionCount  = u16

`}<span className="tk-com">Sections (ordered, compressed or raw per kind)</span>{`
  STRING_POOL          `}<span className="tk-com">// UTF-8, deduped, indexed by u16</span>{`
  ADAPTER_MANIFEST     `}<span className="tk-com">// every adapter ID the bundle uses</span>{`
  CONSTRUCTOR_MANIFEST `}<span className="tk-com">// every constructor ID the bundle uses</span>{`
  CAPABILITY_MANIFEST  `}<span className="tk-com">// every capability ID the bundle calls</span>{`
  MODIFIER_TABLE       `}<span className="tk-com">// modifier descriptor blobs (Brotli)</span>{`
  FUNCTION_TABLE       `}<span className="tk-com">// function metadata: name, regs, params, flags</span>{`
  CODE                 `}<span className="tk-com">// raw KBC bytecode for every function (Brotli)</span>{`
  DEBUG_INFO           `}<span className="tk-com">// source line numbers (optional)</span>{`
  ENTRY_POINTS         `}<span className="tk-com">// exported function names</span>{`
  BUNDLE_METADATA      `}<span className="tk-com">// bundle ID, descriptors, minAppVersion</span>{`

`}<span className="tk-com">Trailer</span>{`
  signature = 64 bytes  `}<span className="tk-com">// Ed25519 over everything above</span>
                </pre>
              </div>
            </div>

            <h3 style={{ marginTop: 24, marginBottom: 12 }}>Design choices</h3>
            <ul>
              <li><strong>Why not Protobuf or FlatBuffers?</strong> Both carry per-field tag overhead. A <code>LOAD_INT</code> opcode is 6 bytes total; a sparse parameter is &ldquo;one byte index plus the KBCValue payload.&rdquo; For a bundle that ships an entire app&rsquo;s worth of screens in single-digit kilobytes, every byte matters.</li>
              <li><strong>Why Brotli?</strong> Better ratios than gzip on small textual payloads, fast decode, pure-Java implementation - no JNI shipped to users. Compression is opt-in per section.</li>
              <li><strong>Why Ed25519?</strong> Small keys (32 bytes), small signatures (64 bytes), sub-millisecond verify on any phone made this decade, pure-Java verifier via BouncyCastle.</li>
              <li><strong>Additive evolution.</strong> When we added <code>minAppVersion</code> after shipping v2, instead of bumping the format version we appended an <code>Int</code> to <code>BUNDLE_METADATA</code> and made the reader fall back to <code>0</code> when fewer than 4 bytes remain. Costs you exactly four bytes.</li>
            </ul>

            <h3 style={{ marginTop: 32, marginBottom: 12 }}>Delivery</h3>
            <p>The runtime supports four bundle sources, modelled as a sealed type:</p>
            <ul>
              <li><code>Preloaded(bundle)</code> - already parsed in memory.</li>
              <li><code>Raw(bytes)</code> - parse through <code>parseBundle</code>.</li>
              <li><code>Asset(path)</code> - read from the APK assets, trust anchored to your APK.</li>
              <li><code>Remote(url, headers)</code> - HTTPS fetch with on-device ETag caching to <code>context.cacheDir/ketoy_bundles/&lt;sha256(url)&gt;.ktx</code> plus a sidecar <code>.etag</code>. 304 serves cache. Network down? Serve cache. No cache and offline? Throw cleanly.</li>
            </ul>
            <p style={{ marginTop: 16 }}>The host APK ships a 32-byte Ed25519 public key in <code>assets/</code> or <code>res/raw/</code>. The private key lives in your CI secret store and signs each bundle at build time via the <code>ketoyBundle</code> Gradle task. The runtime refuses any bundle whose signature doesn&rsquo;t verify.</p>

            <h3 style={{ marginTop: 32, marginBottom: 12 }}>Activation - the cold-start rule</h3>
            <p><strong>Bundles only activate at process start.</strong> Two slots exist per <code>bundleId</code>: an <em>active</em> slot (the bundle in memory powering every <code>KetoyScreen</code>, set once at process start, never reassigned) and a <em>staged</em> slot (downloaded, verified, validated, <code>minAppVersion</code>-checked, lives on disk, becomes active on next cold start).</p>
            <p style={{ marginTop: 16 }}>We do not hot-swap bundles mid-composition for three concrete reasons: view models carry live state (<code>viewModelScope</code> coroutines, in-flight <code>Flow</code> collectors, <code>SavedStateHandle</code> contents); capability ID stability is per-bundle; composition continuity matters more than freshness. Users tolerate &ldquo;the new screen appears next time I open the app&rdquo; far better than &ldquo;the form I was filling out reloaded and lost my input.&rdquo;</p>

            <h3 style={{ marginTop: 32, marginBottom: 12 }}>minAppVersion and last-known-good rollback</h3>
            <p>Every bundle carries a <code>minAppVersion: Int</code>. When the runtime loads a bundle, it compares against the host APK&rsquo;s <code>PackageInfo.longVersionCode</code>. If the bundle requires a newer host, the runtime <strong>does not activate it</strong>. Instead it walks the bundle cache MRU-first for the most recent last-known-good entry whose <code>minAppVersion</code> is satisfied. If none exists, every <code>KetoyScreen</code> falls through to its native fallback.</p>
          </div>

          {/* 8. RUNTIME */}
          <div id="runtime" style={{ marginBottom: 64 }}>
            <div className="section-head" style={{ marginBottom: 24 }}>
              <span className="eyebrow">08 · Runtime</span>
              <h2 style={{ marginTop: 8 }}>A register VM inside your app</h2>
              <p>When your app starts, a single <code>KetoyRuntime</code> instance gets created (typically via Hilt). It holds three registries - <code>CapabilityRegistry</code>, <code>KBCAdapterRegistry</code>, <code>KBCConstructorRegistry</code> - populated at startup with every capability and adapter the host wants to expose.</p>
            </div>

            <div className="code-window" style={{ marginBottom: 24 }}>
              <div className="code-chrome"><div className="dots"><i></i><i></i><i></i></div><span className="file">Navigation wiring</span></div>
              <div className="code-body">
                <pre>
{`composable("checkout") {
    KetoyScreen(entryPoint = "CheckoutScreen") {
        CheckoutScreenNative()   // native fallback, required trailing lambda
    }
}`}
                </pre>
              </div>
            </div>

            <p>The runtime resolves the active bundle, looks up the entry point by name, constructs a <code>KetoyVirtualViewModel</code> (a real Android <code>ViewModel</code> wrapping a <code>KetoyVM</code> tied to <code>viewModelScope</code>), and dispatches the entry-point function. Bundle absent or entry-point missing? Run the trailing lambda - no error UI, no spinner.</p>

            <h3 style={{ marginTop: 32, marginBottom: 12 }}>The interpreter loop</h3>
            <div className="code-window" style={{ margin: '16px 0' }}>
              <div className="code-chrome"><div className="dots"><i></i><i></i><i></i></div><span className="file">interpreter.kt (skeleton)</span></div>
              <div className="code-body">
                <pre>
{`while (true) {
    val opcode = code[pc].toInt() and 0xFF
    when (opcode) {
        LOAD_INT       -> regs[dst] = readInt(code, pc + 2); pc += 6
        ADD_INT        -> regs[dst] = regs[a].toInt() + regs[b].toInt(); pc += 4
        JUMP_IF_TRUE   -> pc = if (regs[r] == true) target else pc + 4
        COMPOSABLE_CALL -> dispatchComposable(...)
        SUSPEND_POINT  -> return SUSPENDED
        // ... 100+ more
    }
}`}
                </pre>
              </div>
            </div>
            <p>The real version dispatches 107 opcodes, handles exception handler stacks, suspend state machines, dev-overlay event emission, and Tier-1 JIT short-circuiting. The skeleton is honest.</p>

            <h3 style={{ marginTop: 32, marginBottom: 12 }}>Coroutines - replicating Kotlin&rsquo;s state machine</h3>
            <p>Suspend functions don&rsquo;t have a &ldquo;just call them&rdquo; representation in any bytecode. In regular Kotlin, the compiler lowers each suspend function into a class with a <code>label</code> field, a <code>switch</code> on the label, and a sequence of <code>Continuation</code> objects. We do the equivalent at KBC level - emitting <code>INVOKE_CAPABILITY_SUSPEND</code>, <code>SUSPEND_POINT</code>, and <code>RESUME_VALUE</code> opcodes.</p>
            <p style={{ marginTop: 16 }}>The <code>KBCCoroutineEngine</code> owns a real <code>SupervisorJob(viewModelScope.coroutineContext.job)</code>. This works for real coroutines all the way down: <code>launch</code>, <code>async</code>, <code>await</code>, <code>withContext(Dispatchers.IO)</code>, <code>Flow.collect</code>, <code>collectAsState</code>, <code>LaunchedEffect</code>, <code>MutableStateFlow</code>, <code>MutableSharedFlow</code>, the full Flow operator set - every one wired to genuine kotlinx primitives. Put a <code>delay(1000)</code> inside KBC and it behaves the way you&rsquo;d hope.</p>

            <h3 style={{ marginTop: 32, marginBottom: 12 }}>Compose bridge - how KBC becomes UI</h3>
            <p>Compose is opinionated: only <code>@Composable</code> functions can read snapshot state, call other composables, install effects. The KBC interpreter isn&rsquo;t <code>@Composable</code>. So we use a two-phase model:</p>
            <ul>
              <li><strong>Interpretation phase</strong> (non-composable): the interpreter walks the KBC function. When it hits <code>COMPOSE_REMEMBER</code>, <code>COMPOSE_STATE</code>, or <code>COMPOSE_DERIVED_STATE</code>, it creates real snapshot objects but queues side effects (<code>LaunchedEffect</code>, <code>SideEffect</code>, <code>DisposableEffect</code>) as <code>PendingEffect</code> records.</li>
              <li><strong>Composition phase</strong> (<code>@Composable</code>): a thin wrapper walks the pending-effect queue and registers each effect the regular way. <code>COMPOSABLE_CALL</code> reaches an adapter invocation, the adapter calls real <code>Button(...)</code> / <code>Text(...)</code>, and that participates in real recomposition.</li>
            </ul>

            <h3 style={{ marginTop: 32, marginBottom: 12 }}>The Tier-1 JIT</h3>
            <p>For hot paths, we ship an optional <strong>on-device JIT</strong> using DexMaker. A <code>KBCProfiler</code> counts function invocations; when one crosses the hot threshold (default: 100 calls), the JIT compiles it asynchronously. DexMaker generates raw DEX bytecode; <code>InMemoryDexClassLoader</code> loads it from a <code>ByteBuffer</code>. The compiled method becomes a regular reflective invocation target.</p>
            <p style={{ marginTop: 16 }}>The translator covers a whitelist of &ldquo;pure logic&rdquo; opcodes: loads, arithmetic for int/long/float/double, comparisons, jumps, basic casts. Capabilities, coroutines, Compose ops, integer DIV/MOD - those stay in the interpreter, and the JIT bails cleanly. Benchmark gate: ≥1.5× speedup on tight arithmetic loops. JIT failures never propagate. API 25 and below get no JIT (DexClassLoader requirement) - the interpreter remains the path of record.</p>
            <p style={{ marginTop: 16 }}>This is also the place where Play Store&rsquo;s DPA §4.4 stays clean - KBC is <em>not</em> downloaded executable bytecode, it&rsquo;s our own bytecode <em>interpreted</em> on-device, and the JIT generates fresh DEX on the user&rsquo;s own device (the same thing ART does constantly). We never download pre-built DEX or JVM bytecode.</p>

            <h3 style={{ marginTop: 32, marginBottom: 12 }}>ViewModels - KetoyVirtualViewModel + KetoyBaseViewModel</h3>
            <p>Two layers, both load-bearing. <strong>Runtime side</strong>: <code>KetoyVirtualViewModel</code> is a real Android <code>ViewModel</code> that owns a <code>KetoyVM</code> per screen. It exposes <code>state: StateFlow&lt;Map&lt;String, Any?&gt;&gt;</code>, the typical <code>getState</code>/<code>setState</code>/<code>observeState</code> surface, and a <code>dispatch(eventName, payload)</code> entry point that invokes the KBC function registered for that event.</p>
            <p style={{ marginTop: 16 }}><strong>KBC side</strong>: developers extend <code>KetoyBaseViewModel</code> from <code>@KetoyViewModel</code>-annotated classes. Four <code>lateinit</code> properties get bound by the runtime after construction: <code>viewModelScope</code>, plus the <code>getState</code> / <code>setState</code> / <code>observeState</code> lambda surface. The view model class compiles to KBC. Its <code>viewModelScope</code> is the same scope as the host <code>KetoyVirtualViewModel</code> - coroutines launched there cancel when the screen leaves the back stack.</p>
          </div>

          {/* 9. CAPABILITIES */}
          <div id="capabilities" style={{ marginBottom: 64 }}>
            <div className="section-head" style={{ marginBottom: 24 }}>
              <span className="eyebrow">09 · Capabilities</span>
              <h2 style={{ marginTop: 8 }}>The sandbox door</h2>
              <p>Every other piece of the runtime cooperates to enforce one property: <strong>a .ktx bundle cannot do anything the host hasn&rsquo;t explicitly sanctioned.</strong></p>
            </div>

            <p>KBC code cannot touch <code>android.*</code> / <code>androidx.*</code> directly, read files via <code>java.io</code> / <code>java.nio</code> / <code>kotlin.io</code>, use <code>kotlin.reflect.*</code>, launch coroutines outside the host-provided scope, or open sockets. If your KBC source tries, the compiler rejects it. So how does anything actually happen on-device? <strong>Capabilities.</strong></p>

            <div className="code-window" style={{ margin: '20px 0' }}>
              <div className="code-chrome"><div className="dots"><i></i><i></i><i></i></div><span className="file">capability stub</span></div>
              <div className="code-body">
                <pre>
{`@KetoyCapabilityStub(id = 0x4001, name = "ObserveTodos")
fun TodoRepository.observeTodos(): Flow<List<Todo>> = throw NotImplementedError()`}
                </pre>
              </div>
            </div>

            <p>The compiler plugin emits <code>INVOKE_CAPABILITY_FLOW 0x4001</code> instead of a direct call. The runtime dispatches to the registered Kotlin function on the host&rsquo;s actual Hilt-injected repository. Capabilities come in four flavours: sync, suspend, flow, and <code>@Composable</code>. We ship 67 built-in IDs:</p>

            <div className="feat-list" style={{ marginTop: 20 }}>
              {capabilityFamilies.map((f) => (
                <div key={f.range} className="feat-row">
                  <div className="cat">
                    {f.name}
                    <small>{f.range}</small>
                  </div>
                  <div className="items">
                    <span className="chip">{f.desc}</span>
                  </div>
                  <span className="count">·</span>
                </div>
              ))}
            </div>

            <div className="code-window" style={{ marginTop: 24 }}>
              <div className="code-chrome"><div className="dots"><i></i><i></i><i></i></div><span className="file">real wiring example</span></div>
              <div className="code-body">
                <pre>
{`override fun buildRegistry(): CapabilityRegistry =
    CapabilityRegistry().apply {
        registerCoreCapabilities(context, dataStore = settingsStore)
        registerNavigationCapabilities(navigator)
        KBCRoomBridge(this) {
            observeList(OBSERVE_TODOS) { todoDao.observeAll() }
            findOne(FIND_TODO)        { args -> todoDao.find(args[0] as Long) }
            mutate(TOGGLE_TODO)       { args -> todoDao.toggle(args[0] as Long) }
        }
        registerFlow(OBSERVE_DARK_MODE) { _ -> settings.darkModeFlow }
        registerSuspend(SET_DARK_MODE)  { args -> settings.setDarkMode(args[0] as Boolean) }
    }`}
                </pre>
              </div>
            </div>

            <p style={{ marginTop: 16 }}>Capabilities are the <em>only</em> door from KBC into the outside world. That gives you a clean security audit point: review which capabilities your host registers, and that&rsquo;s exhaustively the set of things any future bundle (signed by your CDN&rsquo;s key) can ever do. Even a perfectly valid signed bundle can only do what the host exposes.</p>
          </div>

          {/* 10. MODULES */}
          <div id="modules" style={{ marginBottom: 64 }}>
            <div className="section-head" style={{ marginBottom: 24 }}>
              <span className="eyebrow">10 · Module layout</span>
              <h2 style={{ marginTop: 8 }}>18 modules across eight buckets</h2>
              <p>The codebase is structured around the responsibility boundaries we&rsquo;ve walked through.</p>
            </div>
            <div className="feat-list">
              {moduleRows.map((r) => (
                <div key={r.cat} className="feat-row">
                  <div className="cat">
                    {r.cat}
                    <small>{r.small}</small>
                  </div>
                  <div className="items">
                    {r.chips.map((c) => (
                      <span key={c} className="chip">{c}</span>
                    ))}
                  </div>
                  <span className="count">{r.count}</span>
                </div>
              ))}
            </div>
            <p style={{ marginTop: 24 }}>A typical host app pulls <code>ketoy-runtime</code>, <code>ketoy-hilt</code>, <code>ketoy-capabilities-core</code>, <code>ketoy-capabilities-navigation</code>, and <code>ketoy-adapters-material3</code>. The BOM (<code>dev.ketoy.vm:ketoy-bom</code>) lets consumers pin one version line for the whole stack. All published modules ship to Maven Central under <code>dev.ketoy.vm</code> as a single atomic release - every module&rsquo;s coordinates land together in one Sonatype Portal staging deployment.</p>
          </div>

          {/* 11. BUILD */}
          <div id="build" style={{ marginBottom: 64 }}>
            <div className="section-head" style={{ marginBottom: 24 }}>
              <span className="eyebrow">11 · Build pipeline</span>
              <h2 style={{ marginTop: 8 }}>One Gradle task</h2>
              <p>End to end.</p>
            </div>
            <div className="code-window" style={{ marginBottom: 24 }}>
              <div className="code-chrome"><div className="dots"><i></i><i></i><i></i></div><span className="file">terminal</span></div>
              <div className="code-body"><pre>{`./gradlew :app:assembleRelease`}</pre></div>
            </div>
            <ol>
              <li>Your app applies the Gradle plugin (<code>id(&quot;dev.ketoy.compiler&quot;)</code>), declares the BOM, and configures the <code>ketoy &#123; … &#125;</code> block.</li>
              <li>The plugin attaches the K2 compiler plugin to your host APK&rsquo;s <code>compileReleaseKotlin</code> task.</li>
              <li>Your <code>@KetoyEntryPoint</code>-annotated screens trigger the closure walk: every reachable composable, helper, view model, data class, and helper function is pulled in.</li>
              <li>The emitter lowers each KBC-reachable function into KBC instructions; the validator rejects forbidden APIs with breadcrumbed diagnostics; the bundle builder accumulates the lot.</li>
              <li><code>KtxWriter</code> serialises everything to one <code>.ktx</code> file. <code>Ed25519Signer</code> appends the signature.</li>
              <li>The <code>ketoyBundle</code> task copies the signed <code>.ktx</code> into <code>src/main/assets/ketoy/main.ktx</code>. The host APK packages it like any other asset.</li>
            </ol>
            <p style={{ marginTop: 16 }}>Two modes are supported. The default for new adopters is <strong>in-tree mode</strong>: the bundle source lives inside your app module, the closure walk keeps native code and KBC code disjoint, and the plugin auto-wires asset merge dependencies. A <strong>dedicated-module mode</strong> is available for teams that want bundle source physically separated from the host. For production updates, you upload the same <code>.ktx</code> to your CDN. The runtime&rsquo;s <code>Remote</code> source picks it up on next cold start, ETag-cached, signature-verified, and rolled back automatically if it requires a newer host APK than the user has installed.</p>
          </div>

          {/* 12. TESTING */}
          <div id="testing" style={{ marginBottom: 64 }}>
            <div className="section-head" style={{ marginBottom: 24 }}>
              <span className="eyebrow">12 · Testing</span>
              <h2 style={{ marginTop: 8 }}>ketoy-test, kctfork, closure fixtures</h2>
              <p>We ship a <code>ketoy-test</code> artifact with three primitives that make KBC code unit-testable without an emulator.</p>
            </div>
            <ul>
              <li><strong><code>KBCBuilder</code></strong> - a DSL that emits raw KBC instructions (<code>loadInt(r0, 5)</code>, <code>addInt(r0, r0, r1)</code>, <code>composableCall(BUTTON) &#123; … &#125;</code>) so you can hand-author tiny bundles for tests without going through the full compiler.</li>
              <li><strong><code>FakeAdapterRegistry</code> and <code>FakeConstructorRegistry</code></strong> - record-only doubles that capture every dispatched call with its <code>KBCParamSet</code>. Assert on call count, captured parameters, or supply per-call substitutions.</li>
              <li><strong><code>KetoyTestRuntime</code></strong> - a JVM-friendly runtime wrapper using a debug <code>KetoyConfig</code> (no signature verification, JIT off, dev tools on). Most unit tests run on plain JUnit5 with no Android emulator.</li>
            </ul>
            <p style={{ marginTop: 16 }}>For end-to-end checks - real Compose lowering, real <code>.ktx</code> round-trip, real captures - we use <strong>kctfork</strong>, a library that drives the actual Kotlin compiler in-process, wired with the real Compose plugin. The dedicated <code>:ketoy-closure-fixtures</code> module ships audited capture patterns (single, multi, conditional, nested-lambda, navigation-onClick, non-capturing baseline) that get exercised on every release. Each fixture is real Kotlin source, compiled through the real pipeline, byte-inspected after.</p>
          </div>

          {/* 13. DEV TOOLS */}
          <div id="devtools" style={{ marginBottom: 64 }}>
            <div className="section-head" style={{ marginBottom: 24 }}>
              <span className="eyebrow">13 · Dev tools</span>
              <h2 style={{ marginTop: 8 }}>Live overlay, zero release overhead</h2>
              <p>For debug builds, the runtime emits a live overlay showing every <code>COMPOSABLE_CALL</code> dispatched, every <code>CONSTRUCT_JVM</code> invoked, every capability called with arguments, recomposition counts per screen, and JIT-hot function counters.</p>
            </div>
            <p>The event bus is a <code>MutableSharedFlow</code> with <code>DROP_OLDEST</code> overflow, constructed only when the host APK has <code>FLAG_DEBUGGABLE</code>. Release builds never allocate the bus - every emit site is null-guarded so the disabled path is &ldquo;not even a system clock read.&rdquo; Zero overhead is the contract, not a goal.</p>
          </div>

          {/* 14. NON-GOALS */}
          <div id="non-goals" style={{ marginBottom: 64 }}>
            <div className="section-head" style={{ marginBottom: 24 }}>
              <span className="eyebrow">14 · Non-goals</span>
              <h2 style={{ marginTop: 8 }}>The things we said no to</h2>
              <p>Half of engineering is deciding what to leave out. These aren&rsquo;t limitations - they&rsquo;re the product.</p>
            </div>
            <ul>
              <li><strong>No downloadable JVM bytecode or DEX.</strong> KBC only. Loading arbitrary executable bytecode from a server re-introduces every threat model Play Store DPA §4.4 forbids.</li>
              <li><strong>No reflection inside KBC.</strong> Reflection breaks sandboxing and defeats the validator.</li>
              <li><strong>No raw Android API access.</strong> Capabilities only. The host decides what&rsquo;s reachable.</li>
              <li><strong>No <code>GlobalScope</code> or unstructured concurrency.</strong> Every coroutine is scoped to a parent. Cancellation is contractual.</li>
              <li><strong>No general-purpose Kotlin JVM.</strong> A defined subset. We don&rsquo;t support <code>select &#123; &#125;</code>, custom <code>CoroutineContext</code> elements, Kotlin/Native intrinsics, or any of the long tail.</li>
              <li><strong>No XML, View system, or Fragments.</strong> Compose only.</li>
              <li><strong>No <code>List&lt;Any?&gt;</code> for composable parameters.</strong> Anywhere, ever. The whole Two-Layer Parameter System exists so we never recreate JSON SDUI&rsquo;s &ldquo;parse the parameter array and hope&rdquo; failure mode.</li>
              <li><strong>No implicit third-party library support.</strong> Want Coil? Ship it as a capability or adapter. The host decides what loads.</li>
              <li><strong>No mid-composition hot-swap in production.</strong> Activation is next-launch only. Hot-swap is a debug-only ergonomic surfaced through the dev tools.</li>
              <li><strong>No mutable global state in the runtime.</strong> Zero <code>object</code> singletons in execution paths. Everything is scoped to a <code>KetoyRuntime</code> instance - multi-tenant, multi-bundle ready by construction.</li>
            </ul>
            <p style={{ marginTop: 16 }}>A constrained KBC is what makes the rest of the model - fast updates, audited security, predictable performance, single-bundle delivery - work at all.</p>
          </div>

          {/* 15. DAY IN THE LIFE */}
          <div id="pixel">
            <div className="section-head" style={{ marginBottom: 24 }}>
              <span className="eyebrow">15 · A day in the life of a pixel</span>
              <h2 style={{ marginTop: 8 }}>One button, source to screen</h2>
              <p>Let&rsquo;s trace one rendered button end to end.</p>
            </div>

            <div className="code-window" style={{ marginBottom: 24 }}>
              <div className="code-chrome"><div className="dots"><i></i><i></i><i></i></div><span className="file">CheckoutScreen.kt</span></div>
              <div className="code-body">
                <pre>
{`@KetoyEntryPoint
@Composable
fun CheckoutScreen() {
    Button(
        onClick = { /* dispatch */ },
        enabled = true,
        modifier = Modifier.padding(16.dp),
    ) {
        Text("Place Order", fontWeight = FontWeight.Bold)
    }
}`}
                </pre>
              </div>
            </div>

            <h3 style={{ marginTop: 24, marginBottom: 12 }}>Compile time</h3>
            <ol>
              <li>K2 lowers your source through the Compose Compiler. The <code>IrGenerationExtension</code> registered by the Ketoy plugin sees the resulting IR.</li>
              <li>The collector finds <code>@KetoyEntryPoint CheckoutScreen</code> and seeds the closure walk.</li>
              <li>The validator walks the body, accepting <code>Button</code>, <code>Modifier.padding</code>, <code>Text</code>, and <code>FontWeight.Bold</code> via the catalog and token registry. The onClick lambda is non-capturing, so it lowers as a plain <code>FunctionRef</code>.</li>
              <li>The emitter produces a KBC function for the onClick lambda; a <code>COMPOSABLE_CALL</code> for <code>Text</code> with <code>StringLiteral(&quot;Place Order&quot;)</code> at param 0 and <code>FontWeightInt(700)</code> at the fontWeight slot; a modifier descriptor entry <code>[Padding(start=16, top=16, end=16, bottom=16)]</code> interned into the modifier table; a <code>COMPOSABLE_CALL</code> for <code>Button</code> referencing the onClick <code>FunctionRef</code>, a <code>ModifierRef</code>, <code>Bool(true)</code>, and a content slot for the inner <code>Text</code>.</li>
              <li><code>KtxWriter</code> packs sections; Brotli compresses CODE and MODIFIER_TABLE; Ed25519 signs the trailer.</li>
              <li>The signed <code>.ktx</code> lands in <code>app/src/main/assets/ketoy/main.ktx</code>.</li>
            </ol>

            <h3 style={{ marginTop: 32, marginBottom: 12 }}>Runtime, cold start</h3>
            <ol>
              <li>The host&rsquo;s <code>KetoyRuntime</code> loads on first injection. The <code>Asset(&quot;ketoy/main.ktx&quot;)</code> source is verified against the public key, parsed, validated against the registries.</li>
              <li>Navigation routes the user to <code>KetoyScreen(entryPoint = &quot;CheckoutScreen&quot;) &#123; CheckoutScreenNative() &#125;</code>. The runtime resolves the entry point, constructs the <code>KetoyVirtualViewModel</code>, and dispatches.</li>
              <li>The interpreter walks the function body. Hits <code>COMPOSABLE_CALL BUTTON</code>. Looks up the generated <code>ButtonAdapter</code>. The adapter calls real <code>androidx.compose.material3.Button(...)</code> with resolved params: onClick lambda backed by <code>vm.launchFunction(fnIdx)</code>, modifier built from the cached table entry, enabled true, content slot wired to a small recursive interpret call for the inner <code>Text</code>.</li>
              <li>Compose&rsquo;s slot table sees real Material3 calls. Layout runs. The render pipeline does its native job. Pixels appear.</li>
            </ol>
            <p style={{ marginTop: 16 }}>When the user taps the button, the onClick lambda routes through <code>vm.launchFunction</code>, the interpreter dispatches the lambda body, and any state writes flow back through <code>VM_SET_STATE</code> capabilities into the shared <code>MutableStateFlow</code>. Compose recomposes the affected slots. Everything else is exactly what would have happened in a native app.</p>
          </div>

          {/* CTA */}
          <div className="cta-banner" style={{ marginTop: 88 }}>
            <div>
              <h2>Want to see it run?</h2>
              <p>The runtime ships today on Maven Central across a BOM and the runtime / hilt / test / adapters / capabilities modules under <code>dev.ketoy.vm</code>. Kotlin is the schema, KBC is the wire format, your app is the runtime.</p>
            </div>
            <div className="right">
              <Link className="btn btn-ghost" href="/docs" prefetch={false}>Read the docs</Link>
              <Link className="btn btn-primary" href="/get-started">Get started</Link>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
