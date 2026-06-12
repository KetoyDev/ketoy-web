import Link from 'next/link';
import { SDK_VERSION_FULL } from '@/constants';
import Subnav from '@/components/Subnav';
import CodeWindow from '@/components/CodeWindow';
import Callout from '@/modules/features/components/Callout';
import { subnavItems, requirements, continueCards } from '@/modules/get-started/data';

export const metadata = {
  title: 'Get started · Ketoy',
  description:
    'From an empty Android project to a working KBC screen in three commands with the Ketoy AI CLI.',
};

const AUTH_PROVIDERS = `$ ketoy auth anthropic         # Anthropic Claude
$ ketoy auth openai            # OpenAI
$ ketoy auth google            # Google Gemini
$ ketoy auth mistral           # Mistral
$ ketoy auth groq              # Groq
$ ketoy auth xai               # xAI
$ ketoy auth openrouter        # 200+ models via one key
$ ketoy auth ollama            # local - no API key, just a base URL

$ ketoy auth --list            # see what's configured (redacted)`;

const PICK_MODEL = `# Set a default model used by every command.
$ ketoy config set model anthropic:claude-sonnet-4-5
$ ketoy config set model openai:gpt-4o
$ ketoy config set model google:gemini-2.0-flash-exp
$ ketoy config set model openrouter:meta-llama/llama-3.1-405b-instruct

# Or override per-command.
$ ketoy chat --model anthropic:claude-sonnet-4-5`;

const INIT_FLAGS = `$ ketoy init                        # interactive, asks before each edit
$ ketoy init -y                     # accept defaults, no prompts
$ ketoy init --dry-run              # show the plan, write nothing
$ ketoy init --hilt                 # opt into Hilt wiring
$ ketoy init --no-install-screen    # skip the MainActivity wrap`;

const INIT_OUTPUT = `Detected: namespace=com.example.myapp, applicationId=com.example.myapp,
          minSdk=26, Hilt=no, Application=none, MainActivity=present

Plan (6 edits, 4 new files):
  edit  app/build.gradle.kts        + Ketoy plugin, dependencies, ketoy {} block
  edit  app/src/main/AndroidManifest.xml   + android:name=".MyApplication"
  edit  app/src/main/.../MainActivity.kt   wrap setContent { … } with KetoyScreen
  edit  gradle/libs.versions.toml          pin Kotlin 2.0.21, AGP 8.13.2, Compose BOM
  edit  .gitignore                         + **/keys/*-private.key
  new   app/src/main/.../MyApplication.kt
  new   app/src/main/.../ketoyscreens/HelloKetoyScreen.kt
  new   app/ketoy-capabilities.json
  new   .ketoy/state.json

Apply? [y/N]`;

const RUN_COMMANDS = `$ ketoy build`

const CHAT_EXAMPLES = `$ ketoy chat
> add a settings screen with a dark-mode switch and version row

$ ketoy chat "convert app/src/main/.../HomeScreen.kt to a KetoyComposable"

$ ketoy migrate app/src/main/.../HomeScreen.kt app/src/main/.../ProfileScreen.kt

$ ketoy doctor                # runs default build, diagnoses failures
$ ketoy doctor :app:ketoyBundle

$ ketoy analyze app/src/main/assets/ketoy/main.ktx --manifest --strings`;

export default function GetStartedPage() {
  return (
    <>
      <Subnav items={subnavItems} />

      <section className="page-head">
        <div className="container">
          <span className="eyebrow">Getting started</span>
          <h1>Get started with Ketoy</h1>
          <p className="lede">
            Three commands and Ketoy is wired into your Android project - plugin pinned, runtime bootstrapped, sample <code style={{ fontFamily: 'var(--font-mono)', fontSize: '0.92em' }}>@KetoyComposable</code> screen mounted, signed <code style={{ fontFamily: 'var(--font-mono)', fontSize: '0.92em' }}>.ktx</code> emitted into your APK. The <code style={{ fontFamily: 'var(--font-mono)', fontSize: '0.92em' }}>ketoy</code> CLI is an AI agent - bring your own model from Anthropic, OpenAI, Gemini, Mistral, Groq, xAI, OpenRouter, or local Ollama.
          </p>
          <div className="hero-actions" style={{ marginTop: 28 }}>
            <a className="btn btn-primary" href="#install">Install the CLI</a>
            <Link className="btn btn-ghost" href="/get-started/manual">Set up manually</Link>
          </div>
        </div>
      </section>

      <div className="page-body">
        <div className="container">

          <Callout title={<>Alpha status - <code>{SDK_VERSION_FULL}</code></>}>
            <p>The local-asset path is fully supported: <code>ketoy init</code> wires up your <code>:app</code> module, the compiler plugin emits a signed <code>.ktx</code> into your assets, and the runtime executes it at startup.</p>
            <p><strong>Cloud delivery</strong> - pushing a <code>.ktx</code> to a CDN so users get updates without going through the Play Store - is under active development and ships shortly. Track progress on the <a href="#">GitHub releases page</a>.</p>
          </Callout>

          <div id="requirements"></div>
          <div className="req-card">
            <div className="req-head">
              <h3>Requirements</h3>
              <span className="req-version-pill">Ketoy {SDK_VERSION_FULL}</span>
            </div>
            <div className="req-grid">
              {requirements.map(([label, val]) => (
                <div className="req-item" key={label}>
                  <span className="label">{label}</span>
                  <span className="val">{val}</span>
                </div>
              ))}
            </div>
          </div>

          <Callout kind="info" title="“Kotlin 2.0.21+ and AGP 8.x” means a known-good default, not a hard requirement">
            <p>As of <code>{SDK_VERSION_FULL}</code> the Ketoy compiler ships its own <strong>embedded Kotlin 2.0.21</strong> in an isolated worker, so your project&rsquo;s Kotlin / AGP / Gradle / Compose versions are decoupled from Ketoy&rsquo;s - you can bump them freely. <code>ketoy init</code> still writes a matched combination into your <code>gradle/libs.versions.toml</code> as a convenience starting point, which is why these rows read <em>auto-pinned</em>.</p>
            <p>Already on a newer Kotlin or Compose? It just works - the Compose surface is reconciled by name, not by version. See the <Link href="/updates/sdk?update=version-compatibility">version compatibility update</Link> for what newer/older versions mean in both directions.</p>
          </Callout>

          {/* STEP 1 */}
          <div className="step" id="install">
            <span className="step-num">Step 01</span>
            <h2>Install the CLI</h2>
            <p className="intro">The npm package is <code>ketoy-dev</code> (the bare <code>ketoy</code> name is blocked by npm's similarity heuristic). The installed binary is still <code>ketoy</code>.</p>

            <CodeWindow file="terminal">{`$ npm i -g ketoy-dev
$ ketoy version`}</CodeWindow>

            <p>Requires Node.js 20 or newer. Every command runs in the current working directory - there's nothing global to maintain beyond the API-key store at <code>~/.ketoy-cli/</code>.</p>
          </div>

          {/* STEP 2 */}
          <div className="step" id="init">
            <span className="step-num">Step 02</span>
            <h2>Run <code>ketoy init</code> in your project</h2>
            <p className="intro">From the root of your Android project (the directory containing <code>settings.gradle.kts</code> and <code>app/build.gradle.kts</code>), run <code>ketoy init</code>. The CLI inspects your project, plans every change, and asks before applying.</p>

            <CodeWindow file="terminal">{INIT_FLAGS}</CodeWindow>

            <p>A typical interactive plan looks like this:</p>

            <CodeWindow file="terminal · ketoy init">{INIT_OUTPUT}</CodeWindow>

            <h3>What it does</h3>
            <ol style={{ paddingLeft: 22, lineHeight: 1.7 }}>
              <li><strong>Detects</strong> your <code>namespace</code>, <code>applicationId</code>, <code>minSdk</code>, Hilt usage, existing <code>Application</code> class, and existing <code>MainActivity</code>.</li>
              <li><strong>Pins versions</strong> in <code>gradle/libs.versions.toml</code> to the alpha-matched combination (Kotlin 2.0.21, AGP 8.13.2, Compose BOM 2024.10.00).</li>
              <li><strong>Edits <code>app/build.gradle.kts</code></strong> - inserts the <code>dev.ketoy.compiler</code> plugin, appends the BOM + runtime + annotations + capabilities + Material3 adapters dependencies, and appends the <code>ketoy {'{ }'}</code> configuration block.</li>
              <li><strong>Edits <code>AndroidManifest.xml</code></strong> - sets <code>android:name=&quot;.MyApplication&quot;</code> on <code>&lt;application&gt;</code> when no Application class exists.</li>
              <li><strong>Creates <code>MyApplication.kt</code></strong> with the full bootstrap - <code>KetoyConfig</code>, <code>CapabilityRegistry</code>, <code>KetoyRuntime</code>, generated-adapter / constructor registration, <code>KetoyBundleLoader</code>.</li>
              <li><strong>Wraps <code>MainActivity</code>'s <code>setContent { }</code></strong> with <code>CompositionLocalProvider(LocalKetoyRuntime, LocalKetoyBundleLoader)</code> and a <code>KetoyScreen</code> entry point (use <code>--no-install-screen</code> to skip).</li>
              <li><strong>Creates <code>HelloKetoyScreen.kt</code></strong> - a sample <code>@KetoyEntryPoint @KetoyComposable</code> to confirm the pipeline works.</li>
              <li><strong>Creates <code>app/ketoy-capabilities.json</code></strong> (empty registry) and appends <code>**/keys/*-private.key</code> to <code>.gitignore</code>.</li>
              <li><strong>Saves project state</strong> to <code>.ketoy/state.json</code> so future commands know your layout.</li>
            </ol>

            <Callout kind="info" title="Hilt is opt-in via ketoy chat">
              <p>The non-Hilt setup is the default - it works in any Compose project without a DI framework. If you opt in with <code>--hilt</code>, <code>init</code> aborts with a pointer to <code>ketoy chat</code>, where the agent handles Hilt wiring against your existing modules rather than guessing at a stock template.</p>
            </Callout>
          </div>

          {/* STEP 3 */}
          <div className="step" id="auth">
            <span className="step-num">Step 03</span>
            <h2>Pick a model provider <span style={{ fontSize: '0.6em', color: 'var(--muted)', fontWeight: 400, marginLeft: 8 }}>- optional</span></h2>
            <p className="intro">This step is <strong>skippable</strong>. If you don't connect an AI provider, <code>ketoy init</code>, <code>build</code>, and <code>analyze</code> still work - they're plain tooling. You just won't have access to the AI features: <code>ketoy chat</code>, <code>ketoy migrate</code>, and <code>ketoy doctor</code> all require a configured provider.</p>

            <p>Ketoy is powered by the <a href="https://sdk.vercel.ai">Vercel AI SDK</a>, so you bring your own key from any major provider. Source code never leaves your machine except as part of the prompts you explicitly send to the provider you chose. No telemetry, no remote logging.</p>

            <CodeWindow file="terminal · authenticate a provider">{AUTH_PROVIDERS}</CodeWindow>

            <p>Then pin a default model (or override per-command with <code>--model</code>):</p>

            <CodeWindow file="terminal · pick a model">{PICK_MODEL}</CodeWindow>

            <Callout kind="info" title="Where credentials live">
              <p>API keys are stored at <code>~/.ketoy-cli/config.json</code> with mode <code>0600</code>. The CLI refuses to print them - <code>ketoy config get apiKeys</code> is intentionally blocked. Use <code>ketoy auth --list</code> for a redacted view.</p>
            </Callout>
          </div>

          {/* STEP 4 */}
          <div className="step" id="run">
            <span className="step-num">Step 04</span>
            <h2>Build and run</h2>
            <p className="intro">After <code>ketoy init</code> finishes, the project is ready to build. The compiler plugin attaches to <code>compileReleaseKotlin</code> and emits a signed <code>.ktx</code> into <code>app/src/main/assets/ketoy/main.ktx</code>.</p>

            <CodeWindow file="terminal">{RUN_COMMANDS}</CodeWindow>

            <p>Launch the app - the KBC version of <code>HelloKetoyScreen</code> renders. Delete the <code>.ktx</code>, change the entry point to <code>&quot;DoesNotExist&quot;</code>, or toggle airplane mode - the native fallback renders identically. That's the production contract.</p>
          </div>

          {/* COMMAND TOUR */}
          <div className="step" id="commands">
            <span className="step-num">Command tour</span>
            <h2>What else the CLI does</h2>
            <p className="intro">Once initialized, the agent stays useful for the day-to-day work - writing screens, migrating existing Compose UI, diagnosing build failures, and inspecting bundles.</p>

            <CodeWindow file="terminal">{CHAT_EXAMPLES}</CodeWindow>

            <div className="cmd-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, marginTop: 24 }}>
              <div className="card">
                <h3><code>ketoy chat</code></h3>
                <p>Open an AI session in the project root. The agent has tools for reading files, proposing surgical edits, running Gradle tasks, and inspecting build output.</p>
              </div>
              <div className="card">
                <h3><code>ketoy migrate</code></h3>
                <p>AI-driven per-file Compose → KBC migration. Point it at a Compose screen and it produces a <code>@KetoyComposable</code> equivalent, diff-and-confirmed.</p>
              </div>
              <div className="card">
                <h3><code>ketoy doctor</code></h3>
                <p>Runs a Gradle task and diagnoses any compiler-plugin errors. Useful when <code>:app:ketoyBundle</code> fails and you want the agent to read the failure and propose a fix.</p>
              </div>
              <div className="card">
                <h3><code>ketoy build</code></h3>
                <p>Equivalent to <code>./gradlew :app:ketoyBundle --rerun-tasks</code>, with variant selection: <code>--variant bundle|debug|release</code>.</p>
              </div>
              <div className="card">
                <h3><code>ketoy analyze</code></h3>
                <p>Inspect an existing <code>.ktx</code> bundle - view its manifest, extract the string table, or dump the full structure as JSON.</p>
              </div>
              <div className="card">
                <h3><code>ketoy config</code></h3>
                <p>List, get, or set CLI configuration. Use it to change your default model or inspect (redacted) provider settings.</p>
              </div>
            </div>
          </div>

          {/* SAFETY */}
          <div className="step" id="safety">
            <span className="step-num">Trust model</span>
            <h2>Safety &amp; privacy</h2>
            <p className="intro">The agent runs in your terminal, against your files, with your keys. The boring safety guarantees that make that workable:</p>

            <ul style={{ paddingLeft: 22, lineHeight: 1.85 }}>
              <li><strong>No file is rewritten in full.</strong> Edits to <code>build.gradle.kts</code>, <code>AndroidManifest.xml</code>, <code>MainActivity.kt</code>, and your <code>Application</code> class are surgical - single-line additions or block appends at well-identified anchors. Existing dependencies, signing configs, themes, and ProGuard rules are never touched.</li>
              <li><strong>Diff-and-confirm</strong> on every edit touching a high-risk file. The agent's <code>edit_file</code> tool always shows a unified diff and prompts before applying.</li>
              <li><strong>Idempotent.</strong> Re-running <code>ketoy init</code> on an already-configured project is a no-op.</li>
              <li><strong>Allowlisted bash</strong> with hard refusal of compound commands for auto-approval. <code>cat &amp;&amp; rm -rf /</code> looks like <code>cat</code> to a naive checker; the CLI refuses to auto-approve any command containing shell metacharacters (<code>;</code>, <code>&amp;&amp;</code>, <code>||</code>, <code>|</code>, backticks, <code>$(…)</code>, redirects).</li>
              <li><strong>No telemetry.</strong> No analytics, no usage reporting, no remote logging. The CLI talks directly to the provider you configured.</li>
            </ul>
          </div>

          {/* WHAT'S NEXT */}
          <div className="step" id="whats-next">
            <span className="step-num">Roadmap</span>
            <h2>What ships next - cloud delivery</h2>
            <p className="intro">What you just built is the <strong>local-asset</strong> path: the <code>.ktx</code> ships inside the APK at compile time, and updates roll out through the Play Store like any other asset.</p>
            <p><strong>Cloud delivery</strong> - pushing a new <code>.ktx</code> to a CDN where connected devices fetch updates at the next process start (Ed25519-verified, ETag-cached, rolled back on <code>minAppVersion</code> mismatch) - uses <code>KetoyBundleSource.Remote(url)</code>. The wire format, signature verification, ETag cache, and runtime activation order are already implemented. The hosted infrastructure (signing pipeline, signed-URL distribution, telemetry) is under active development and ships shortly.</p>
          </div>

          <h2 style={{ marginTop: 80, marginBottom: 24 }}>Continue reading</h2>
          <div className="cards-grid">
            {continueCards.map((c) => (
              <div className="card" key={c.h}>
                <div className="num">→</div>
                <h3>{c.h}</h3>
                <p>{c.p}</p>
                <Link className="link" href={c.href}>{c.cta}</Link>
              </div>
            ))}
          </div>

          <div className="cta-banner" style={{ marginTop: 80 }}>
            <div>
              <h2>Need help?</h2>
              <p>Join the Ketoy community on Discord, or open an issue on GitHub. We respond within a day.</p>
            </div>
            <div className="right">
              <a className="btn btn-ghost" href="#">GitHub</a>
              <a className="btn btn-primary" href="#">Discord</a>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
