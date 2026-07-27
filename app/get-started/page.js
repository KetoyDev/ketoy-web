import Link from 'next/link';
import { SDK_VERSION_FULL } from '@/constants';
import Subnav from '@/components/Subnav';
import CodeWindow from '@/components/CodeWindow';
import Callout from '@/modules/features/components/Callout';
import { subnavItems, requirements, continueCards } from '@/modules/get-started/data';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Get started - install the Kotlin SDUI & OTA SDK',
  description:
    'Install Ketoy from Maven Central with Gradle and ship your first over the air, server-driven UI screen on Android. Works with Kotlin, Jetpack Compose, and Hilt.',
  path: '/get-started',
});

const INIT_COMMANDS = `$ ketoy init                        # from your Android project root
$ ketoy init /path/to/AndroidProject   # or point it at a folder`;

const DEPLOY_COMMANDS = `$ ketoy auth register     # create a Ketoy account
$ ketoy auth login        # log in and save credentials
$ ketoy app create        # create an app

$ ketoy push ktx <appId> main.ktx --version 1`;

export default function GetStartedPage() {
  return (
    <>
      <Subnav items={subnavItems} />

      <section className="page-head">
        <div className="container">
          <span className="eyebrow">Getting started</span>
          <h1>Get started with Ketoy.</h1>
          <p className="lede">
            Install the CLI, wire up your project, and ship a signed <code style={{ fontFamily: 'var(--font-mono)', fontSize: '0.92em' }}>.ktx</code> screen over the air. Two commands get you to a working bundle. The full workflow lives in the CLI reference.
          </p>
          <div className="hero-actions" style={{ marginTop: 28 }}>
            <a className="btn btn-primary" href="#install">Install the CLI</a>
            <Link className="btn btn-ghost" href="/get-started/manual">Set up manually</Link>
          </div>
        </div>
      </section>

      <div className="page-body">
        <div className="container">

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

          <Callout kind="info" title="These versions are a starting point, not a hard requirement">
            <p>The Ketoy compiler ships its own embedded <strong>Kotlin 2.0.21</strong> in an isolated worker, so your project&rsquo;s Kotlin, AGP, Gradle, and Compose versions stay decoupled and you can bump them freely. <code>ketoy init</code> writes a matched set into <code>gradle/libs.versions.toml</code> as a convenience. See the <Link href="/updates/sdk?update=version-compatibility">version compatibility update</Link> for the details.</p>
          </Callout>

          {/* STEP 1 */}
          <div className="step" id="install">
            <span className="step-num">Step 01</span>
            <h2>Install the CLI</h2>
            <p className="intro">The npm package is <code>ketoy-dev</code>. The installed binary is still <code>ketoy</code>.</p>

            <CodeWindow file="terminal">{`$ npm install -g ketoy-dev
$ ketoy version`}</CodeWindow>

            <p>Requires Node.js 18 or newer. The install downloads the native binary for your platform, on macOS, Linux, and Windows across x64 and arm64.</p>
          </div>

          {/* STEP 2 */}
          <div className="step" id="init">
            <span className="step-num">Step 02</span>
            <h2>Set up your project</h2>
            <p className="intro">Run <code>ketoy init</code> from your Android project root. It makes small, additive edits and is safe to run again. Completed steps are skipped.</p>

            <CodeWindow file="terminal">{INIT_COMMANDS}</CodeWindow>

            <p><code>init</code> adds the <code>dev.ketoy.compiler</code> plugin and SDK dependencies, writes the <code>ketoy {'{ }'}</code> build config, wires <code>MyApplication</code> and <code>MainActivity</code>, and drops in a sample <code>HomeScreen.kt</code> so the first build produces a bundle.</p>

            <p>Signing is on by default. <code>init</code> generates an Ed25519 keypair, keeps the private key in <code>app/keys/release-private.key</code> (gitignored), ships the public key in your APK, and the runtime verifies every bundle on device. Keep the private key in a CI secret, or pass <code>--no-sign</code> for a quick unsigned setup.</p>

            <p>Then build the signed bundle:</p>

            <CodeWindow file="terminal">{`$ ./gradlew :app:ketoyBundle`}</CodeWindow>

            <Callout kind="warn" title="Hilt projects">
              <p>Hilt wiring differs. On a Hilt project <code>init</code> applies the Gradle setup only and points you at the rest of the docs. Force this path with <code>--hilt</code>.</p>
            </Callout>
          </div>

          {/* STEP 3 */}
          <div className="step" id="deploy">
            <span className="step-num">Step 03</span>
            <h2>Ship over the air</h2>
            <p className="intro">Ketoy Cloud delivers a new bundle to every device on your app, with no Play Store release. Create an account, make an app, and push.</p>

            <CodeWindow file="terminal · ketoy cloud">{DEPLOY_COMMANDS}</CodeWindow>

            <p>Every device on that app picks up the new version over the air. Roll back the moment something looks wrong with <code>ketoy ktx rollback &lt;appId&gt;</code>, and the last good version goes live again in seconds.</p>
          </div>

          {/* THE REST */}
          <div className="step" id="more">
            <span className="step-num">Everything else</span>
            <h2>The rest of the CLI</h2>
            <p className="intro">This is the short path. The CLI also manages profiles and releases, verifies namespaces, runs <code>ketoy doctor</code>, ships shell autocomplete, and takes <code>--json</code> for CI.</p>
            <p>Every command, flag, and scripting recipe lives in the CLI reference.</p>
            <Link className="btn btn-primary" href="/docs/cli" style={{ marginTop: 8 }}>Read the CLI reference</Link>
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
              <p>Join the Ketoy community on Discord, or open an issue. We respond within a day.</p>
            </div>
            <div className="right">
              <a className="btn btn-ghost" href="/issue">Open Issue</a>
              <a className="btn btn-primary" href="https://discord.gg/jAbcPPyksf">Discord</a>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
