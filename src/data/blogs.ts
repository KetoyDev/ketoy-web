import type { AdjacentBlog, Blog, BlogSummary } from './types';

const aditya = {
  name: 'Aditya',
  role: 'Founder · Ketoy',
  bio: 'Writes about the big picture of what Ketoy does to teams and products.',
  avatar: '/team/aditya%20Small.jpeg',
};

/**
 * The single source of truth for blog content.
 * Each entry contains both summary fields (for the list page)
 * and a content block array (lazily imported for the detail page).
 */
export const blogs: Blog[] = [
  {
    id: '025',
    slug: 'introducing-ketoy',
    dispatch: 25,
    title: 'Android apps that can be <em>rewritten</em> anytime.',
    excerpt:
      'Ketoy is a Kotlin runtime for Android. Write plain Compose, ViewModels, and Navigation. Hilt and Room stay in the host app; Ketoy exposes their functions for new features because updating them requires a Play Store release. Ship it to a CDN. Every user has the new feature in 60 seconds.',
    dek:
      'Ketoy is a Kotlin runtime for Android. Write plain Compose, ViewModels, and Navigation, the whole stack. Hilt and Room stay in the host app; Ketoy exposes their functions for new features because updating them requires a Play Store release. Ship it to a CDN. Every user has the new feature within 60 seconds.',
    date: '2026-04-23',
    dateLabel: 'APR 23 · 2026',
    readingTime: '18 MIN',
    tags: ['Introducing', 'Runtime', 'KBC', 'Compose'],
    primaryTag: 'Introducing',
    author: aditya,
    featured: 'main',
    heroImage: {
      src: '/blogs/1/header.jpeg',
      caption: 'FIG 00 · INTRODUCING KETOY · APR 23 2026',
    },
    content: [
      {
        type: 'lede',
        html:
          'Today we are introducing Ketoy, a Kotlin program execution runtime for Android. You write the same Jetpack Compose you write today, full composables, full ViewModels, Hilt and Room functions exposed by the host app (updates still require a Play Store release), NavController navigation, coroutines and Flow, and you ship it as a binary bundle from your server. Your host app downloads a <code>.ktx</code> file and the Ketoy runtime executes it natively inside your app. Real Compose. Real structured concurrency. Real Room queries. Real navigation. Nothing is translated. Nothing is simulated.',
      },
      {
        type: 'pull',
        quote: 'The app is the operating system. The server ships programs. Kotlin is the language. KBC is the binary.',
      },
      {
        type: 'paragraph',
        html: 'This is our first post, so we want to use it to explain exactly what we built, how it works, and what it changes for Android teams.',
      },

      { type: 'heading', level: 2, num: '§ 01', html: 'What Ketoy is' },
      {
        type: 'paragraph',
        html:
          'Ketoy is three things working together: a Kotlin compiler plugin, a compact bytecode format called <strong>KBC</strong>, and an on-device runtime that executes it. You install the Gradle plugin in your feature module. You write Kotlin the way you always do. You run <code>./gradlew ketoyBundle</code>. You get a <code>.ktx</code> file. You upload it to your CDN. Every device running your host app fetches the new version the next time the user opens that screen.',
      },
      {
        type: 'paragraph',
        html:
          'The important thing to understand is that this is not a UI templating system. The whole Kotlin/Android stack you rely on is inside the bundle. A screen is not a tree of components, it is a program. It has state. It has a ViewModel. It injects a repository through host-exposed Hilt functions. It calls a Retrofit API and observes a Room <code>Flow</code> exposed by the host app. Hilt and Room themselves are not updated over the air because updating them requires a Play Store release. It navigates to another screen. It uses <code>LaunchedEffect</code>, <code>remember</code>, <code>derivedStateOf</code>, <code>rememberSaveable</code>. All of that ships in the bundle. All of that runs on the device.',
      },
      {
        type: 'paragraph',
        html: 'Here is a working sign-in screen, exactly as you would write it in a native Compose project:',
      },
      {
        type: 'code',
        filename: 'SignInScreen.kt',
        lang: 'Kotlin',
        html:
          '<span class="tok-k">@KetoyEntryPoint</span>\n' +
          '<span class="tok-k">@Composable</span>\n' +
          '<span class="tok-k">fun</span> <span class="tok-f">SignInScreen</span>(nav: <span class="tok-t">NavController</span>) {\n' +
          '    <span class="tok-k">val</span> vm    = <span class="tok-f">ketoyViewModel</span>&lt;<span class="tok-t">SignInViewModel</span>&gt;()\n' +
          '    <span class="tok-k">val</span> state <span class="tok-k">by</span> vm.state.<span class="tok-f">collectAsState</span>()\n' +
          '\n' +
          '    <span class="tok-f">Column</span>(\n' +
          '        modifier            = <span class="tok-t">Modifier</span>.<span class="tok-f">fillMaxSize</span>().<span class="tok-f">padding</span>(<span class="tok-n">24</span>.dp),\n' +
          '        verticalArrangement = <span class="tok-t">Arrangement</span>.Center,\n' +
          '        horizontalAlignment = <span class="tok-t">Alignment</span>.CenterHorizontally,\n' +
          '    ) {\n' +
          '        <span class="tok-f">Text</span>(<span class="tok-s">"Sign In"</span>, style = <span class="tok-t">MaterialTheme</span>.typography.headlineLarge)\n' +
          '        <span class="tok-f">Spacer</span>(<span class="tok-t">Modifier</span>.<span class="tok-f">height</span>(<span class="tok-n">32</span>.dp))\n' +
          '\n' +
          '        <span class="tok-f">OutlinedTextField</span>(\n' +
          '            value         = state.email,\n' +
          '            onValueChange = { vm.<span class="tok-f">onEmailChanged</span>(it) },\n' +
          '            label         = { <span class="tok-f">Text</span>(<span class="tok-s">"Email"</span>) },\n' +
          '            keyboardOptions = <span class="tok-f">KeyboardOptions</span>(\n' +
          '                keyboardType = <span class="tok-t">KeyboardType</span>.Email,\n' +
          '                imeAction    = <span class="tok-t">ImeAction</span>.Next,\n' +
          '            ),\n' +
          '            shape = <span class="tok-f">RoundedCornerShape</span>(<span class="tok-n">12</span>.dp),\n' +
          '        )\n' +
          '\n' +
          '        <span class="tok-f">Button</span>(\n' +
          '            onClick  = { vm.<span class="tok-f">signIn</span>(onSuccess = { nav.<span class="tok-f">navigate</span>(<span class="tok-s">"home"</span>) }) },\n' +
          '            enabled  = !state.isLoading,\n' +
          '            modifier = <span class="tok-t">Modifier</span>.<span class="tok-f">fillMaxWidth</span>().<span class="tok-f">height</span>(<span class="tok-n">52</span>.dp),\n' +
          '        ) {\n' +
          '            <span class="tok-k">if</span> (state.isLoading) <span class="tok-f">CircularProgressIndicator</span>(<span class="tok-t">Modifier</span>.<span class="tok-f">size</span>(<span class="tok-n">24</span>.dp))\n' +
          '            <span class="tok-k">else</span> <span class="tok-f">Text</span>(<span class="tok-s">"Sign In"</span>)\n' +
          '        }\n' +
          '    }\n' +
          '}\n' +
          '\n' +
          '<span class="tok-k">@HiltViewModel</span>\n' +
          '<span class="tok-k">class</span> <span class="tok-t">SignInViewModel</span> <span class="tok-k">@Inject constructor</span>(\n' +
          '    <span class="tok-k">private val</span> authRepo: <span class="tok-t">AuthRepository</span>,\n' +
          '    <span class="tok-k">private val</span> userDao:  <span class="tok-t">UserDao</span>,\n' +
          ') : <span class="tok-t">ViewModel</span>() {\n' +
          '\n' +
          '    <span class="tok-k">val</span> state = userDao.<span class="tok-f">observeCurrent</span>()\n' +
          '        .<span class="tok-f">map</span> { <span class="tok-t">UiState</span>(email = it?.email ?: <span class="tok-s">""</span>) }\n' +
          '        .<span class="tok-f">stateIn</span>(viewModelScope, <span class="tok-t">SharingStarted</span>.Lazily, <span class="tok-t">UiState</span>())\n' +
          '\n' +
          '    <span class="tok-k">fun</span> <span class="tok-f">signIn</span>(onSuccess: () -&gt; <span class="tok-t">Unit</span>) = viewModelScope.<span class="tok-f">launch</span> {\n' +
          '        authRepo.<span class="tok-f">signIn</span>(state.value.email, state.value.password)\n' +
          '            .<span class="tok-f">onSuccess</span> { onSuccess() }\n' +
          '    }\n' +
          '}',
      },
      {
        type: 'paragraph',
        html:
          "There is nothing Ketoy-specific in that code except the <code>@KetoyEntryPoint</code> annotation that marks which composable is the bundle's entry. The <code>@HiltViewModel</code> still uses the host app's Hilt graph. <code>userDao.observeCurrent()</code> returns a real <code>Flow&lt;User?&gt;</code> from the host app's Room. Ketoy does not update Hilt or Room; it exposes their functions for new features because updating them requires a Play Store release. <code>viewModelScope.launch</code> is real structured concurrency. <code>nav.navigate(\"home\")</code> is a real NavController call. The developer does not learn a new framework. The developer writes Android.",
      },

      {
        type: 'heading',
        level: 2,
        num: '§ 02',
        html: 'Everything a real feature needs, shipped in the bundle',
      },
      {
        type: 'paragraph',
        html:
          'The point of Ketoy is not "UI on the server." It is "features on the server." A feature in a modern Android app is a vertical slice: presentation, state, dependency graph, data, side effects, navigation. If any one of those pieces cannot be delivered over the air, the whole thing has to go through a Play Store release, and the exercise is meaningless. Ketoy delivers the whole slice. Here is what comes through the bundle:',
      },
      {
        type: 'capabilities',
        items: [
          {
            name: 'Jetpack Compose',
            html: 'Every composable, every parameter, every modifier. All 17 parameters of <code>Text</code>, all 22 of <code>TextField</code>. Real slot table, real recomposition, real Skia.',
          },
          {
            name: 'ViewModel',
            html: '<code>KetoyVirtualViewModel</code> hosts your logic. <code>SavedStateHandle</code> persistence. <code>onCleared</code> cancels coroutines. Config-change survival is built in.',
          },
          {
            name: 'Hilt',
            html: "Host app exposes a <code>KetoyCapabilityProvider</code>. Your bundle's <code>@HiltViewModel</code> classes get repositories, services, and DAOs injected exactly as they would natively. Hilt stays in the host app; Ketoy does not update Hilt because updates require a Play Store release.",
          },
          {
            name: 'Room',
            html: 'DAO methods exposed as Flow capabilities. A <code>Flow&lt;List&lt;User&gt;&gt;</code> crosses into KBC as a real <code>Flow</code> and connects to Compose via <code>collectAsState</code>. Room stays in the host app; Ketoy does not update Room because updates require a Play Store release.',
          },
          {
            name: 'Coroutines & Flow',
            html: 'First-class opcodes: <code>SUSPEND_POINT</code>, <code>FLOW_COLLECT</code>, <code>WITH_CONTEXT</code>. Structured concurrency with real parent/child cancellation. <code>Dispatchers.IO</code> and friends.',
          },
          {
            name: 'Navigation',
            html: 'NavController as a capability. Push, pop, replace, deep-link, modal. A bundle can navigate to another bundle, which loads on demand.',
          },
          {
            name: 'Network',
            html: 'HTTP, WebSocket, SSE through host-app capabilities. Use your existing OkHttp/Retrofit stack. Auth headers and interceptors are inherited automatically.',
          },
          {
            name: 'Platform',
            html: 'Analytics, permissions, clipboard, haptics, deep links, DataStore. Each is a registered capability; the bundle cannot reach raw Android APIs, only what you expose.',
          },
        ],
      },
      {
        type: 'paragraph',
        html:
          'This is why we keep saying <em>programs</em> instead of <em>layouts</em>. When you ship a Ketoy bundle, you are not patching the UI and leaving the logic stuck at the last Play Store version. You are replacing the feature end-to-end. A new onboarding flow. A new ViewModel with a new signup path. A new host-exposed dependency. A change to the host-exposed Room query that drives the home screen. Hilt and Room stay in the host app; Ketoy exposes their functions for new features because updating them requires a Play Store release. All of it in one file.',
      },

      {
        type: 'heading',
        level: 2,
        num: '§ 03',
        html: 'What the build pipeline actually does',
      },
      {
        type: 'paragraph',
        html:
          'When you run <code>./gradlew ketoyBundle</code>, here is what happens. Our Kotlin compiler plugin hooks into the K2 IR phase and lowers your Compose IR into KBC, a register-based bytecode built for this specific purpose. Register-based because that is what DEX is, and because register-based VMs issue roughly 30% fewer instructions than stack-based ones, the same decision ART made, for the same reason.',
      },
      {
        type: 'paragraph',
        html:
          "KBC has opcodes that speak Kotlin natively: <code>SUSPEND_POINT</code>, <code>RESUME_VALUE</code>, <code>FLOW_COLLECT</code>, <code>COMPOSE_REMEMBER</code>, <code>LAUNCHED_EFFECT</code>, <code>COLLECT_AS_STATE</code>. And two more that do the heavy lifting for Compose interop: <code>COMPOSABLE_CALL</code>, which invokes a composable via a KSP-generated adapter, and <code>CONSTRUCT_JVM</code>, which builds real Compose objects like <code>TextStyle</code>, <code>KeyboardOptions</code>, and <code>Shape</code> into runtime registers. The adapters are auto-generated against the Compose and Material3 classpath, which is how we cover <strong>every parameter of every component</strong>, including the ones that shipped in last week's Material3 release, without maintaining a component registry by hand.",
      },
      {
        type: 'paragraph',
        html:
          'The bundle is Brotli-compressed, signed with Ed25519, and carries a manifest of every adapter, constructor, and capability it references. At load time the runtime verifies the signature, checks that every referenced adapter and capability exists on this device, and only then begins execution. If anything is missing, you get a single <code>KetoyMissingAdapterException</code> with the list of missing IDs, fail-fast, before a single line of KBC runs.',
      },
      {
        type: 'paragraph',
        html:
          'On-device, for hot functions, a tiered JIT generates DEX locally from KBC. This is the same thing ART does constantly, and it is explicitly legal under Play Store policy because the DEX is generated on the device, not downloaded from a server. We never ship executable code. We ship Kotlin programs.',
      },

      {
        type: 'heading',
        level: 2,
        num: '§ 04',
        html: 'The numbers we engineered this to hit',
      },
      {
        type: 'paragraph',
        html:
          "These are the performance targets Ketoy's architecture is designed to meet. They are architectural commitments, wired into the repo as CI benchmarks, not press-release numbers. Every PR that regresses one has to justify it:",
      },
      {
        type: 'metrics',
        items: [
          { key: 'Bundle load + parse + verify', value: '< 50', unit: 'ms', sub: '50 KB <code>.ktx</code>, Ed25519 verified, adapter manifest checked.' },
          { key: 'First frame', value: '< 100', unit: 'ms', sub: 'From bundle ready to first Compose draw.' },
          { key: 'Interpreter throughput', value: '> 50M', unit: 'ops/sec', sub: 'Register-based dispatch on a mid-range device.' },
          { key: 'Composable call overhead', value: '< 0.5', unit: 'ms', sub: 'VM → adapter → real composable.' },
          { key: 'Bundle size vs equivalent JSON', value: '20×', unit: ' smaller', sub: 'Brotli-compressed KBC for the same screen.' },
          { key: 'Memory per active screen', value: '< 5', unit: 'MB', sub: 'Registers, coroutine state, adapter cache.' },
          { key: 'Tier-1 JIT speedup', value: '2×', unit: ' on hot paths', sub: 'On-device DEX from KBC for hot functions.' },
          { key: 'Default parameter cost', value: '0', unit: ' bytes', sub: 'Unspecified params are not encoded. Real Compose defaults apply at render time.' },
        ],
      },

      {
        type: 'heading',
        level: 2,
        num: '§ 05',
        html: 'What this does to a sprint',
      },
      {
        type: 'paragraph',
        html:
          'Everything above is infrastructure. Here is what the infrastructure is in service of. If you are a tech lead or engineering manager, this is the section that matters, because it changes the arithmetic of how your team plans work.',
      },
      {
        type: 'paragraph',
        html:
          'Think about your last twelve months. How many updates did your Android team ship? For a moderately active consumer or SaaS app, twenty is a reasonable estimate, roughly one meaningful release every two to three weeks, counting minor and mid-size features. Now look at where the time actually went:',
      },
      {
        type: 'math',
        rows: [
          { label: 'Updates shipped in the year', val: '20' },
          { label: 'Play Store review, per update', val: '1–3 days' },
          { label: 'Staged rollout (5% → 20% → 50% → 100%)', val: '3–7 days' },
          { label: 'Tail of users on old versions', val: 'weeks' },
          { label: 'Calendar days waiting on Google, per update', val: '~4–10 days', variant: 'hr' },
          { label: 'Waiting, per year', val: '~80–200 days', variant: 'total' },
        ],
        note:
          'That is not engineering time. That is the time between <em>we are done</em> and <em>users have it</em>. With Ketoy, that number falls to the time your CDN edge takes to warm, measured in seconds.',
      },
      {
        type: 'paragraph',
        html:
          'And this math only counts the formal wait. It does not count the quieter tax: the features that never get shipped because they are not big enough to justify taking up a release slot, the copy fixes a PM asked for three weeks ago that are still waiting for the next train, the onboarding tweak a designer wants to try that is not worth starting a staged rollout for. Every batching decision is a small deferral, and those deferrals compound.',
      },
      {
        type: 'paragraph',
        html:
          'The quieter consequence is what this does to your sprint cadence. When every merged feature sits in a review queue, teams batch. They combine a copy change, a small bug fix, a new onboarding step, and a checkout tweak into one release so the fixed review overhead amortizes across multiple units of work. Batching <em>feels</em> efficient but it is actually expensive: it delays small wins behind big ones, and it couples unrelated risks into one rollback decision. When you remove the queue, the batching goes away. Sprints stop being "what can we land in the next release train" and start being "what can we build, test, and ship this week." The grain of planning shrinks from sprints to afternoons.',
      },
      {
        type: 'paragraph',
        html:
          'The second-order effect is even better. Because shipping is cheap, <em>you ship more</em>. An experiment that would not have justified the fixed cost of a release now justifies a bundle upload. A copy change a PM has been asking about for three weeks goes out in ten minutes. A host-exposed Room query that is slow for power users gets patched on Tuesday instead of in the next release. Twenty updates a year becomes forty, then sixty, without adding engineers, because the engineers you already have stop waiting.',
      },

      {
        type: 'heading',
        level: 2,
        num: '§ 06',
        html: 'What Android teams can do on day one',
      },
      {
        type: 'paragraph',
        html:
          'These are the concrete shifts teams see when they put their first screen on Ketoy. None of them are theoretical, they are direct consequences of what the runtime does.',
      },

      { type: 'heading', level: 3, html: 'Ship features, not just UI, without a Play Store release' },
      {
        type: 'paragraph',
        html:
          "A Ketoy bundle is a feature. If you change your ViewModel, the Hilt- or Room-backed calls exposed by the host app, your navigation flow, or your Compose tree, all of it goes out in the same <code>.ktx</code>. Hilt and Room themselves stay in the host app; Ketoy exposes their functions for new features because updating them requires a Play Store release. The only thing you cannot change over the air is the host app's set of registered capabilities, the Android APIs the bundle is allowed to call, and in practice those stabilize early in a project and rarely change. Everything else ships from CDN.",
      },

      { type: 'heading', level: 3, html: 'Faster sprints, because "done" actually means "shipped"' },
      {
        type: 'paragraph',
        html:
          'The end of a sprint should be the end of the work, not the start of a ten-day wait for Google. When bundle upload is the last step, sprint demos become live rollouts. A bug caught in code review gets fixed and redeployed in the same afternoon. A design tweak that lands on a Wednesday reaches users on a Wednesday. Teams we have talked to describe this as <em>the first time mobile has felt like web</em>.',
      },

      { type: 'heading', level: 3, html: 'Rollback that is the same operation as roll-forward' },
      {
        type: 'paragraph',
        html:
          'A P0 in a native release is a four-day recovery. In Ketoy, you re-point the bundle URL to the previous version. On the next fetch, users are on the good code. The bundle-verification guarantees (Ed25519 signature, adapter manifest, capability manifest, fail-fast on anything missing) are the same going backwards as forwards, which means rolling back is as safe as rolling forward was. This alone rewrites your incident response playbook.',
      },

      { type: 'heading', level: 3, html: 'A/B test at the grain of a single screen' },
      {
        type: 'paragraph',
        html:
          'A variant is a second <code>.ktx</code>. Route 10% of users to <code>checkout@v2.ktx</code> at the CDN edge, leave the rest on the current version, watch the funnel. No feature flag sprawl. No two code paths to maintain in the host app. When the winner is clear, promote the bundle and retire the other. The fixed cost of "running an experiment" collapses to "uploading a file," and teams that currently run three or four experiments a quarter can realistically run an order of magnitude more.',
      },

      { type: 'heading', level: 3, html: 'Personalize per user, not per segment' },
      {
        type: 'paragraph',
        html:
          'Serve different bundles to different users. Premium tier gets a richer checkout. First-time users get a guided flow. A specific cohort in a specific region gets a compliance-adjusted variant. The host app does not branch on any of this; it asks for the bundle for this user, on this screen, right now. Personalization moves out of client code, where it accumulates as tech debt and rarely gets removed, and into server-side policy you can observe, change, and retire cleanly.',
      },

      { type: 'heading', level: 3, html: 'User engagement that keeps up with your product thinking' },
      {
        type: 'paragraph',
        html:
          'Engagement on mobile dies in the gap between <em>we noticed something in the data</em> and <em>users see a change</em>. When that gap is weeks, the insight goes stale, the cohort has churned, the season has moved, the PM has three new theories. When that gap is an afternoon, engagement becomes a tight loop. You see a drop-off on step three of onboarding on Monday morning and you ship a fix that afternoon, watch the funnel on Tuesday, iterate Wednesday. That is the loop every web team has and no mobile team has. Ketoy is the shortest honest path to closing it.',
      },

      { type: 'heading', level: 3, html: 'Keep your Android team an Android team' },
      {
        type: 'paragraph',
        html:
          'We held this one for last because it is the one most leads end up caring about most. Every other "dynamic delivery" path we have watched teams take ends with the engineering org splitting into two tiers: the people who write the shell app in Kotlin, and the people who write the "dynamic content" in JSON, Lua, JavaScript, or a homegrown DSL. Two stacks, two hiring pipelines, two sets of idioms, a quiet caste system. Ketoy is the same language end-to-end. Your Android engineers stay Android engineers. Your CI stays Gradle. Your code review stays a Kotlin review. The operational burden of a dynamic-delivery system collapses into <em>another Gradle task</em>.',
      },

      {
        type: 'callout',
        tag: 'For the deck',
        html:
          'Every feature your team wanted to ship this quarter but could not justify the release overhead of is now a file you upload. Every bug you watched sit in staged rollout is now a re-deploy. Every experiment you did not run because it was not worth the release cost is now cheap. Over a year, that compounds into a different product.',
      },

      {
        type: 'heading',
        level: 2,
        num: '§ 07',
        html: 'Where we are, and what is next',
      },
      {
        type: 'paragraph',
        html:
          'Ketoy is being built in public. The compiler plugin, the VM, the KSP adapter generator, the bundle format, and the tooling are landing on GitHub as they stabilize. Every performance target above is in the repo as a CI benchmark. The architecture decision log, why register-based, why a custom bytecode instead of DEX, why KSP-generated adapters, why Ed25519, is committed next to the code. We are not running a closed beta. We are running a long, loud build.',
      },
      {
        type: 'paragraph',
        html:
          'If you lead an Android team that ships more than the release train wants to let you, if you have a PM who has been waiting two weeks on a three-line copy change, if you want to experiment more than your release cadence allows, we want to work with you. The earliest integrations will shape what the SDK looks like.',
      },
      {
        type: 'cta',
        title: 'Build on Ketoy',
        html: 'Read the docs, clone the repo, or talk to us about integrating. The early-partner program is open.',
        buttons: [
          { label: 'Read the docs →', href: '#' },
          { label: 'GitHub', href: 'https://github.com/KetoyDev', variant: 'ghost' },
          { label: 'Join the early-partner program', href: '/#early-access', variant: 'ghost' },
        ],
      },
      {
        type: 'signature',
        html: 'Thanks for reading the first one. There will be many.',
        name: 'Aditya',
        role: 'Head of Developer Relations · Ketoy',
      },
    ],
  },
];

/**
 * Lightweight list of blogs for the /blogs page.
 * Strips the `content` field so the list route never ships block-level data to the client.
 */
export function getBlogList(): BlogSummary[] {
  return blogs
    .map(({ content: _content, heroImage: _heroImage, ...summary }) => summary)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getBlogBySlug(slug: string): Blog | undefined {
  return blogs.find((b) => b.slug === slug);
}

export function getAllSlugs(): string[] {
  return blogs.map((b) => b.slug);
}

/**
 * Returns the previous and next blog (by dispatch order, newest first) for navigation.
 * `prev` is the older dispatch; `next` is the newer dispatch.
 */
export function getAdjacentBlogs(slug: string): { prev?: AdjacentBlog; next?: AdjacentBlog } {
  const sorted = [...blogs].sort((a, b) => b.dispatch - a.dispatch);
  const idx = sorted.findIndex((b) => b.slug === slug);
  if (idx === -1) return {};
  const prev = sorted[idx + 1];
  const next = sorted[idx - 1];
  const pick = (b?: Blog): AdjacentBlog | undefined =>
    b ? { slug: b.slug, title: b.title, dispatch: b.dispatch } : undefined;
  return { prev: pick(prev), next: pick(next) };
}

export function getFeatured(): { main?: BlogSummary; sides: BlogSummary[] } {
  const summaries = getBlogList();
  const main = summaries.find((b) => b.featured === 'main');
  const sides = summaries.filter((b) => b.featured === 'side').slice(0, 3);
  return { main, sides };
}

export function getAllTags(): Array<{ name: string; count: number }> {
  const counts = new Map<string, number>();
  for (const b of blogs) {
    for (const t of b.tags) counts.set(t, (counts.get(t) ?? 0) + 1);
  }
  return Array.from(counts.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}
