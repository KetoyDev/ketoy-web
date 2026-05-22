export const heroStats = [
  { v: <>&lt; 50<small>ms</small></>, l: 'Bundle load + verify + parse' },
  { v: <>&lt; 100<small>ms</small></>, l: 'To first frame, cold' },
  { v: <>~4<small>KB</small></>, l: 'Full checkout flow bundle' },
  { v: <>20<small>×</small></>, l: 'Smaller than JSON SDUI' },
];

export const aiFeatures = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 2v3M12 19v3M5 12H2M22 12h-3M19.07 4.93l-2.12 2.12M7.05 16.95l-2.12 2.12M19.07 19.07l-2.12-2.12M7.05 7.05 4.93 4.93" />
        <circle cx="12" cy="12" r="4" />
      </svg>
    ),
    h: 'Prompt-driven update workflows',
    p: '"Move the trust badges above the price on Checkout for India users." Ketoy plans the diff, regenerates the bundle, and queues it behind your approval gate.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M3 7h18M3 12h18M3 17h12" />
        <circle cx="19" cy="17" r="2" />
      </svg>
    ),
    h: 'Experiments without the orchestration tax',
    p: 'Roll a variant to 5% of users, watch the metrics roll in, ramp or revert from the same console. No PM-eng-design ping-pong for every percentage bump.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="9" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
    h: 'Humans still own the merge',
    p: 'AI proposes, you approve. Every bundle still gets Ed25519-signed by your release key. The autonomy lives in the planning, not in the deploy.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z" />
      </svg>
    ),
    h: 'One workflow, instead of four',
    p: 'Dev, release, ops and ticketing for a copy change is six tickets, two reviews, and a calendar event. Ketoy collapses it into a single prompt + approval.',
  },
];

export const supportCards = [
  { tag: 'UI', h: 'Jetpack Compose & Material 3', p: <>All 35 Material3 composables with <em>every</em> parameter. Text, TextField, Button, Scaffold, LazyColumn - the works.</>, chips: ['Scaffold','LazyColumn','OutlinedTextField','Button','TopAppBar','AlertDialog','+29 more'] },
  { tag: 'Language', h: 'Plain Kotlin', p: 'K2-compatible. Sealed classes, data classes, extension functions, lambdas with captures, top-level functions - all of it, compiled to KBC bytecode.', chips: ['data class','sealed','when','extensions','closures'] },
  { tag: 'Async', h: 'Coroutines & Flow', p: <>First-class. <code style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}>launch</code>, <code style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}>async</code>, <code style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}>withContext</code>, structured concurrency, 9 Flow operators. <code style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}>GlobalScope</code> stays banned - you’re welcome.</>, chips: ['launch','async','StateFlow','collectAsState','debounce'] },
  { tag: 'State', h: 'ViewModel', p: <>Real Android <code style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}>ViewModel</code>. Real <code style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}>viewModelScope</code>. Survives config changes. <code style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}>SavedStateHandle</code> for process death. Hilt-friendly.</>, chips: ['viewModelScope','SavedStateHandle','@HiltViewModel','dispatch()'] },
  { tag: 'I/O', h: 'Networking, Storage, Navigation', p: 'HTTP (Ktor/OkHttp), DataStore KV, Room queries, NavController push/pop/deep-link. 67 built-in capabilities. Register your own for app-specific stuff.', chips: ['HTTP','DataStore','Room','NavController','+ your SDKs'] },
  { tag: 'DI', h: 'Hilt', p: <>Drop-in. <code style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}>ketoy-hilt</code> wires everything. <code style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}>@Inject</code> in your ViewModels exactly like before. We added a debug overlay too - you’ll like it.</>, chips: ['@Inject','@HiltViewModel','@Module','dev overlay'] },
];

export const nopeItems = [
  { h: 'No new DSL', s: 'It’s just Kotlin. Same one you’ve been using since college.' },
  { h: 'No JSON schema', s: <>No mapping keys to Compose params. No <code style={{ fontFamily: 'var(--font-mono)', fontSize: 12.5 }}>&quot;fontWeight&quot;: &quot;bold&quot;</code>. Ever.</> },
  { h: 'No heavy migration', s: <>Your existing <code style={{ fontFamily: 'var(--font-mono)', fontSize: 12.5 }}>CheckoutScreen.kt</code> works as-is. Add one annotation.</> },
  { h: 'No component re-implementation', s: <>You still call <code style={{ fontFamily: 'var(--font-mono)', fontSize: 12.5 }}>Button()</code>. We render the real Material3 button.</> },
  { h: 'No serialization code', s: 'No type converters. No adapter glue. We snapshot the IR.' },
  { h: 'No new ViewModel pattern', s: <>Real <code style={{ fontFamily: 'var(--font-mono)', fontSize: 12.5 }}>androidx.lifecycle.ViewModel</code>. Real <code style={{ fontFamily: 'var(--font-mono)', fontSize: 12.5 }}>viewModelScope</code>. <code style={{ fontFamily: 'var(--font-mono)', fontSize: 12.5 }}>SavedStateHandle</code> still works.</> },
];

export const whatIsCards = [
  {
    num: '01',
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 2v6m0 0 3-3m-3 3-3-3M5 13h14l-1 8H6l-1-8z" /></svg>,
    h: 'Apps that self-update',
    p: 'Push a fix at 3pm. Every user has it by 3:01. No Play Store release. No staged rollout timeline. No "we’ll get to it next sprint."',
    cta: 'How the bytecode flow works',
    href: '/architecture',
  },
  {
    num: '02',
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 2 4 6v6c0 5 3.4 9.5 8 10 4.6-.5 8-5 8-10V6l-8-4z" /><path d="M9 12l2 2 4-4" /></svg>,
    h: 'Totally legal',
    p: 'Ketoy doesn’t download executable DEX. The JIT generates it on-device from KBC - exactly like ART does with bytecode. Same lane as Lua in a game engine. Play Store-compliant.',
    cta: 'Read the security model',
    href: '#security',
  },
  {
    num: '03',
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 6h16M4 12h10M4 18h16" /><path d="m16 9 3 3-3 3" /></svg>,
    h: 'Your existing Kotlin. Untouched.',
    p: <>No DSL to learn. No <code style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}>RemoteText(config = ...)</code> replacing your <code style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}>Text()</code>. No JSON schema. Just Compose. The way you already write it.</>,
    cta: "See what's supported",
    href: '/features',
  },
];

export const securityCards = [
  {
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 2 4 6v6c0 5 3.4 9.5 8 10 4.6-.5 8-5 8-10V6l-8-4z" /></svg>,
    h: '1 · Every bundle is signed',
    p: <>Ed25519, 64-byte signature, verified <em>before</em> a single instruction is decoded. The public key ships in your APK. The private key stays on your signing server. Neither we nor Google can produce a valid bundle for your app. That’s the design.</>,
  },
  {
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="3" /><path d="M9 12l2 2 4-4" /></svg>,
    h: '2 · The sandbox is a build error',
    p: <>The K2 plugin rejects <code style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: '#b8f0d4' }}>java.io.*</code>, <code style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: '#b8f0d4' }}>kotlin.reflect</code>, <code style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: '#b8f0d4' }}>GlobalScope</code>, and any unregistered Android API. If a malicious bundle could exist, it couldn’t compile. Forbidden calls are build errors, not surprises on a user’s phone.</>,
  },
  {
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 12h4l3-8 4 16 3-8h4" /></svg>,
    h: '3 · Capabilities are the only door',
    p: <>KBC code can’t touch an Android API directly. Every HTTP call, every DataStore read, every <code style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: '#b8f0d4' }}>NavController.navigate()</code> goes through a registered capability. Not registered, not callable. Not callable, not exploitable.</>,
  },
];

export const legalCards = [
  {
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 2v20M2 12h20" /></svg>,
    quote: '"But isn’t this against Play Store policy?"',
    p: <>No, and we have asked. Ketoy does <em>not</em> download executable DEX or JVM bytecode. The on-device JIT generates DEX <em>locally</em> from KBC - exactly the same operation ART performs on regular bytecode. Same legal lane as Lua scripts in a game engine, or JavaScript in a WebView. Explicitly permitted by Google’s Developer Program Policies.</>,
  },
  {
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" /></svg>,
    quote: '"Okay but what if you go down?"',
    p: 'Bundles are cached on-device, keyed by SHA-256. The runtime checks an ETag with your CDN; if there’s no internet, no response, no signed update - the last good bundle keeps rendering. Your app degrades to "exactly the experience it had yesterday." Acceptable, in our opinion.',
  },
];
