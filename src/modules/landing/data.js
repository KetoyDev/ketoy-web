// Landing page copy. Voice and shapes follow wording.md: the product is the
// subject, headings are two phrases split by a comma, card bodies go pain,
// mechanism, outcome. Real nouns and measured numbers only. No em dashes.

export const GITHUB_URL = 'https://github.com/KetoyDev';
export const DISCORD_URL = 'https://discord.gg/jAbcPPyksf';
export const INSTALL_CMD = 'npm install -g ketoy-dev';

export const NAV = [
  { href: '/get-started', label: 'Get started' },
  { href: '/features', label: 'Features' },
  { href: '/architecture', label: 'Architecture' },
  { href: '/docs', label: 'Docs', prefetch: false },
  { href: '/updates', label: "What's new", match: /^\/updates/ },
];

export const HERO = {
  pill: 'Ketoy SDK is in alpha',
  lines: ['Releases take days.', 'Ketoy takes seconds.'],
  lead:
    'Ketoy helps Android teams ship Jetpack Compose, ViewModels and Kotlin logic to installed apps without a Play Store release. The Kotlin alternative to JSON server driven UI.',
  primary: { label: 'Get started', href: '/get-started' },
  secondary: { label: 'Star on GitHub', href: GITHUB_URL },
};

// Published, measured figures only.
export const PROOF = [
  { value: '< 100 ms', label: 'To the first frame on a cold start' },
  { value: '< 50 ms', label: 'To load, verify and parse a bundle' },
  { value: '20×', label: 'Smaller than JSON server driven UI' },
  { value: '67', label: 'Platform capabilities, built in' },
];

export const LAYERS_TITLE = ['One annotation,', 'everything over the air.'];
export const LAYERS_LEAD =
  'UI, state, logic and data. If it compiles to Kotlin, Ketoy delivers it, with no JSON schema to maintain and no second component model to learn.';

export const LAYERS = [
  {
    id: 'ui',
    tab: 'Compose UI',
    h: 'Real Compose, not a lookalike.',
    p: 'JSON driven UI hands you a subset of components drawn by a renderer. Ketoy compiles the Compose you already write, all 35 Material 3 components with every parameter. It renders natively on the device, so nothing is redrawn from a schema.',
    chips: ['Scaffold', 'LazyColumn', 'TopAppBar', 'OutlinedTextField', 'AlertDialog', '+30 more'],
    visual: 'ui',
  },
  {
    id: 'state',
    tab: 'ViewModel and state',
    h: 'Your ViewModels, shipped with the screen.',
    p: 'Most over the air tools stop at layout, so logic still waits for a release. Ketoy ships the ViewModel too. It survives configuration changes, exposes StateFlow and works with Hilt, and coroutines and Flow operators come along with it.',
    chips: ['viewModelScope', 'StateFlow', 'collectAsState', '@HiltViewModel', 'SavedStateHandle'],
    visual: 'code',
  },
  {
    id: 'io',
    tab: 'Networking and storage',
    h: '67 capabilities, one registry.',
    p: 'Dynamic code usually means either no platform access or far too much. Ketoy routes every bundle through registered capabilities, with HTTP, Room, DataStore and navigation built in. Register your own SDKs the same way and they go over the air as well.',
    chips: ['HTTP', 'Room', 'DataStore', 'Hilt', 'Your SDKs'],
    visual: 'caps',
  },
  {
    id: 'flow',
    tab: 'Navigation and flows',
    h: 'Whole flows, not just screens.',
    p: 'A new onboarding or checkout normally waits for the next release. Ketoy ships routes, back stacks and arguments together as one bundle. The flow goes live this afternoon and the APK stays untouched.',
    chips: ['NavController', 'routes', 'arguments', 'deep links'],
    visual: 'flow',
  },
];

export const STEPS_TITLE = ['Merge to every phone,', 'in four steps.'];
export const STEPS_LEAD =
  'Annotate a screen, run one Gradle task, push. Fix a bug at 3:00 and every phone has it by 3:01. The app never reinstalls.';
export const STEPS = [
  {
    n: '01',
    h: 'Write',
    p: 'Add @KetoyEntryPoint to a screen. Everything else is the Kotlin and Compose you already write, in the project you already have.',
    code: ['@KetoyEntryPoint', '@Composable', 'fun OfferScreen() {', '    OfferContent()', '}'],
  },
  {
    n: '02',
    h: 'Bundle',
    p: 'One Gradle task compiles the screen to Ketoy Bytecode. Native code keeps compiling to DEX exactly as before.',
    code: ['$ ./gradlew :app:ketoyBundle', 'BUILD SUCCESSFUL', 'main.ktx written'],
  },
  {
    n: '03',
    h: 'Push',
    p: 'The CLI signs the bundle with your key and publishes a new version. Rolling back is one command, with no release in between.',
    code: ['$ ketoy push ktx app_7f3a main.ktx', 'Signed with Ed25519', 'Version 12 is live'],
  },
  {
    n: '04',
    h: 'Verify and render',
    p: 'Each device checks the signature, resolves capabilities and renders native Compose. First frame in under 100 ms.',
    code: ['signature      ok', 'capabilities   ok', 'first frame    84 ms'],
  },
];

export const SECURITY_TITLE = ['Signed, sandboxed,', 'then rendered.'];
export const SECURITY_LEAD =
  'Code that arrives over the air is a liability until it is checked. Ketoy treats every bundle as untrusted until three checks pass on the device, before the first frame.';
export const SECURITY = [
  {
    h: 'Every bundle is signed',
    p: 'Ketoy checks an Ed25519 signature before any code runs. Your private key stays on your server, so only you can ship a bundle.',
  },
  {
    h: 'The sandbox is a build error',
    p: 'The compiler rejects file access, reflection and any unregistered API. Unsafe code never compiles, so it never ships and never needs catching at runtime.',
  },
  {
    h: 'Capabilities are the only door',
    p: 'Bytecode reaches the platform through registered capabilities and nothing else. What is not registered is not callable, by design.',
  },
];
export const VERIFY = [
  { h: 'Bundle received', p: 'main.ktx, version 12' },
  { h: 'Signature verified', p: 'Ed25519, against your public key' },
  { h: 'Capabilities resolved', p: 'Registered APIs only' },
  { h: 'Rendered', p: 'Native Jetpack Compose' },
];
export const VERIFY_FOOT =
  'Ketoy fails closed. A bundle that does not verify is ignored and the last good version keeps running.';

export const TOOLS_TITLE = ['Built for terminals,', 'and the agents inside them.'];
export const TOOLS_LEAD =
  'The Ketoy CLI runs the whole workflow from your terminal or your CI. Ketoy Skills hand Claude Code, Cursor or any coding agent an accurate map of the framework before it writes a line.';
export const CLI = [
  { cmd: 'ketoy init', out: 'Compiler plugin added. App wired.' },
  { cmd: './gradlew :app:ketoyBundle', out: 'main.ktx built' },
  { cmd: 'ketoy push ktx app_7f3a main.ktx --version 12', out: 'Live on every device' },
  { cmd: 'ketoy ktx rollback app_7f3a', out: 'Version 11 is live again' },
];
export const TOOL_TILES = [
  {
    eyebrow: 'Ketoy CLI',
    h: 'Init, bundle, push, roll back.',
    p: 'One binary runs the whole workflow, so a release is a command and not a calendar event.',
    cmd: INSTALL_CMD,
    link: { label: 'CLI docs', href: '/docs/cli' },
  },
  {
    eyebrow: 'Ketoy Skills',
    h: 'Your agent already knows Ketoy.',
    p: 'A skill pack that grounds coding agents in how Ketoy works, so they write a KetoyScreen correctly the first time.',
    cmd: 'ketoy skills add',
  },
];
export const AGENTS = [
  { name: 'Claude Code', icon: 'claude' },
  { name: 'Codex', icon: null },
  { name: 'Cursor', icon: 'cursor' },
  { name: 'Windsurf', icon: 'windsurf' },
  { name: 'Gemini CLI', icon: 'gemini' },
];

export const FAQ_TITLE = ['Questions,', 'answered.'];

// Rendered on the page and emitted as JSON-LD FAQPage. Keep both in sync.
export const FAQ = [
  {
    q: 'What is Ketoy?',
    a: 'Ketoy is a Kotlin over the air update framework for Android. You write real Jetpack Compose, ViewModels and business logic. Ketoy compiles it to a small signed .ktx bundle and delivers it to installed apps in seconds, with no Play Store release.',
  },
  {
    q: 'Is this allowed on the Play Store?',
    a: 'Yes. Ketoy generates code on device, the same way ART does with bytecode. Bundles run in a sandbox and render native Compose, which keeps updates inside Google Play policy.',
  },
  {
    q: 'What can Ketoy update over the air?',
    a: 'Jetpack Compose UI, ViewModels and state, navigation, coroutines and Flow, networking, Room and DataStore. Plain Kotlin works too, including data classes, objects and functions.',
  },
  {
    q: 'How is Ketoy different from JSON server driven UI?',
    a: 'There is no JSON schema and no parallel component model. Ketoy compiles ordinary Kotlin to Ketoy Bytecode (KBC). Bundles are about 20 times smaller than equivalent JSON SDUI and render as native Compose.',
  },
  {
    q: 'What happens if my server goes down?',
    a: 'The last signed bundle keeps running. Every KetoyScreen also takes a native fallback, so a missing bundle never breaks a screen.',
  },
];

export const CTA = {
  lines: ['Built by Android devs,', 'for Android devs.'],
  lead: 'For us, over the air is not an add-on to a config service. It is the product. Install the CLI, annotate one screen and push. Your first update takes about ten minutes.',
  primary: 'Get started',
};

export const FOOTER_BLURB =
  'Kotlin over the air updates for Android. Built by Android engineers, for Android engineers.';

export const FOOTER = [
  {
    h: 'Product',
    links: [
      { label: 'Get started', href: '/get-started' },
      { label: 'Supported features', href: '/features' },
      { label: 'Architecture', href: '/architecture' },
      { label: 'Changelog', href: '/updates' },
    ],
  },
  {
    h: 'Docs',
    links: [
      { label: 'Documentation', href: '/docs' },
      { label: 'CLI', href: '/docs/cli' },
      { label: 'KBC spec', href: '/docs/reference/kbc-opcodes' },
      { label: 'Bundle format', href: '/docs/reference/ktx-bundle-format' },
    ],
  },
  {
    h: 'Community',
    links: [
      { label: 'GitHub', href: GITHUB_URL },
      { label: 'Discord', href: DISCORD_URL },
      { label: 'Sample apps', href: 'https://github.com/KetoyDev/demos' },
      { label: 'Report an issue', href: '/issue' },
    ],
  },
];
