import '../public/styles/home.css';
import Link from 'next/link';
import { SDK_VERSION_FULL, SDK_VERSION_SHORT } from '@/constants';
import CodeWindow from '@/components/CodeWindow';
import Calculator from '@/modules/home/components/Calculator';
import SupportTrigger from '@/modules/home/components/SupportTrigger';
import {
  heroStats, aiFeatures, supportCards, nopeItems,
  whatIsCards, securityCards, legalCards,
} from '@/modules/home/data';

export const metadata = {
  title: 'Ketoy - AI-native app updates for Android',
  description:
    'AI-native Android update infrastructure. Ship UI changes, features, fixes and experiments in under 60 seconds - fully within Play Store policies.',
};

const CHECKOUT_KT = `@KetoyEntryPoint @Composable
fun CheckoutScreen() {
    val vm    = ketoyViewModel<CheckoutViewModel>()
    val state by vm.state.collectAsState()

    Scaffold(topBar = { TopAppBar(title = { Text("Checkout") }) }) { p ->
        LazyColumn(modifier = Modifier.padding(p)) {
            items(state.cartItems) { item ->
                ProductCard(name = item.name, price = item.price)
            }
        }
        Button(onClick = { vm.dispatch("place_order") }) {
            Text("Place Order - $" + state.total)
        }
    }
}
// $ ./gradlew ketoyBundle  →  checkout.ktx  ·  3.4 KB`;

const QUICK_GRADLE = `plugins {
  id("dev.ketoy.compiler") version "${SDK_VERSION_FULL}"
}

dependencies {
  implementation(platform("dev.ketoy.vm:ketoy-bom:${SDK_VERSION_FULL}"))
  implementation("dev.ketoy.vm:ketoy-runtime")
  implementation("dev.ketoy.vm:ketoy-hilt")
  implementation("dev.ketoy.vm:ketoy-adapters-material3")
  ksp("dev.ketoy.vm:ketoy-ksp-processor")
}`;

const QUICK_HOME = `// Look familiar? It should.
@KetoyEntryPoint
@Composable
fun HomeScreen() {
  val vm    = ketoyViewModel<HomeViewModel>()
  val state by vm.state.collectAsState()

  Column(modifier = Modifier.fillMaxSize().padding(16.dp)) {
    Text("Welcome, " + state["name"])
    Button(onClick = { vm.dispatch("get_started") }) {
      Text("Get Started")
    }
  }
}`;

const QUICK_TERMINAL = `# Compile to KBC
$ ./gradlew :ketoy-screens:ketoyBundle

> Task :ketoy-screens:ketoyBundle
  HomeScreen.kt        → home.ktx        2.1 KB
  CheckoutScreen.kt    → checkout.ktx    3.4 KB
  Signed:    Ed25519
  Compressed:Brotli q=11

# Upload. That's the whole release process.
$ aws s3 cp build/ketoy-bundles/ s3://cdn/ketoy/ \\
    --recursive --content-encoding br

# Total review time: 0 days. (You're welcome.)`;

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="container">
          <div className="hero-grid">
            <div>
              <div className="hero-tag">
                <span className="pill">v{SDK_VERSION_SHORT}</span>
                <span>is live</span>
              </div>
              <h1>AI-native app updates for <strong>Android</strong>.</h1>
              <p className="lede">
                Make your Android apps update <em style={{ fontStyle: 'normal', color: '#fff', fontWeight: 500 }}>themselves</em> in under 60 seconds - UI changes, features, fixes, experiments. Fully within Play Store policies. Plus AI workflows that let you ship most changes by prompt instead of spinning up a release train for every tiny edit.
              </p>
              <div className="hero-actions">
                <Link className="btn btn-primary" href="/get-started">
                  Install Ketoy
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </Link>
                <Link className="btn btn-ghost" href="/architecture">How it works</Link>
              </div>
            </div>
            <CodeWindow file="CheckoutScreen.kt" tag="@KetoyEntryPoint">{CHECKOUT_KT}</CodeWindow>
          </div>

          <div className="hero-stats">
            {heroStats.map((s, i) => (
              <div className="hero-stat" key={i}>
                <div className="v">{s.v}</div>
                <div className="l">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Wait Cost Calculator */}
      <section id="calc">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">The Play Store math · brace yourself</span>
            <h2>How many days has your team spent <em style={{ fontStyle: 'normal', background: 'linear-gradient(98deg,#4285F4 0%,#1a66cc 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>waiting</em> for review this year?</h2>
            <p>
              Update tested. Tagged. Signed. Uploaded. Now you wait. The marketing team waits. The PM refreshes the dashboard. Customer support copy-pastes &ldquo;fix is coming soon.&rdquo; Drag the sliders - be honest - and find out exactly how much of your life Play Store review has eaten.
            </p>
          </div>
          <Calculator />
        </div>
      </section>

      {/* AI-native */}
      <section className="surface">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">AI-native, by design</span>
            <h2>Ship most updates by <em style={{ fontStyle: 'normal', background: 'linear-gradient(135deg,#3DDC84 0%,#4285F4 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>prompt</em>. Skip the release train for every tiny edit.</h2>
            <p>
              Ketoy isn’t just a runtime - it’s an update <em style={{ fontStyle: 'normal' }}>infrastructure</em>. Most product changes (copy tweaks, layout shuffles, A/B variants, hotfixes) don’t need a four-person standup. Describe them. Ketoy plans the change, generates the bundle, signs it, and stages it for review - one workflow, no separate dev / release / ops coordination.
            </p>
          </div>

          <div className="ai-grid">
            <div className="ai-cards">
              {aiFeatures.map((f) => (
                <div className="ai-feat" key={f.h}>
                  <div className="ai-icon" aria-hidden="true">{f.icon}</div>
                  <div>
                    <h3>{f.h}</h3>
                    <p>{f.p}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="prompt-mock" aria-hidden="true">
              <div className="head">
                <span className="star">✦</span>
                <span>ketoy · ai workflow</span>
              </div>
              <div className="bubble user">
                On Checkout, swap the &ldquo;Apply coupon&rdquo; link for a button. Roll it to 10% of India users for 48 hours.
              </div>
              <div className="bubble ai">
                Planning change on <code>CheckoutScreen.kt</code> →
                <div className="ai-steps">
                  <div><b>✓</b> Diff resolved: 1 file, 8 lines, no breaking params</div>
                  <div><b>✓</b> Compiled <code>checkout.ktx</code> · 3.6&nbsp;KB · Ed25519 signed</div>
                  <div><b>✓</b> Cohort: <code>country=IN</code>, 10%, TTL 48h</div>
                  <div>· · · waiting on your approval to publish</div>
                </div>
              </div>
              <div className="input">
                <span>Try: &ldquo;Revert yesterday’s onboarding change for paying users&rdquo;</span>
                <span className="caret"></span>
                <span className="send" aria-hidden="true">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What is Ketoy */}
      <section className="surface">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Ketoy in one paragraph</span>
            <h2>Your app, but it can update itself. Like a website. But still your Android app.</h2>
            <p>
              You add one annotation to a screen. You run <code style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9em' }}>./gradlew ketoyBundle</code>. You upload a tiny <code style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9em' }}>.ktx</code> file to your CDN. Every user gets the change within 60 seconds. The app on their phone doesn’t update. The flow inside it does.
            </p>
          </div>

          <div className="cards-grid">
            {whatIsCards.map((c) => (
              <div className="card" key={c.num}>
                <div className="num">{c.num}</div>
                <div className="icon" aria-hidden="true">{c.icon}</div>
                <h3>{c.h}</h3>
                <p>{c.p}</p>
                <a className="link" href={c.href}>{c.cta}</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* We hate migrations */}
      <section>
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">We hate heavy migrations at Ketoy</span>
            <h2>Things you <em style={{ fontStyle: 'normal', textDecoration: 'line-through', textDecorationColor: '#ef5350', textDecorationThickness: 2 }}>have to learn</em> don’t exist.</h2>
            <p>
              Server-driven UI tools love giving you homework. New DSLs. New schemas. New component libraries that look like Compose but aren’t. Ketoy has none of that. Here’s the list of things you don’t have to do, in order of how much we don’t want you to do them:
            </p>
          </div>

          <div className="nope-grid">
            {nopeItems.map((n, i) => (
              <div className="nope" key={i}>
                <span className="x" aria-hidden="true">✕</span>
                <div>{n.h}<small>{n.s}</small></div>
              </div>
            ))}
          </div>

          <div className="yep-row">
            <span className="y" aria-hidden="true">✓</span>
            <div>
              The diff between an in-APK screen and a Ketoy screen is <b style={{ fontWeight: 600 }}>one annotation</b> and <b style={{ fontWeight: 600 }}>one Gradle task</b>. That’s it. We checked twice.
            </div>
          </div>
        </div>
      </section>

      {/* Support grid */}
      <section className="surface">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">What works · what’s in the box</span>
            <h2>If it’s in Jetpack Compose, it’s probably in Ketoy.</h2>
            <p>
              Ketoy isn’t a curated subset of &ldquo;the easy parts of Compose.&rdquo; It’s a code generator that walks your Compose classpath and writes adapters for everything it finds. When Compose adds a parameter, you run one command. Done.
            </p>
          </div>

          <div className="support-grid">
            {supportCards.map((c) => (
              <div className="support-card" key={c.h}>
                <span className="support-tag">{c.tag}</span>
                <h3>{c.h}</h3>
                <p style={{ fontSize: 14.5, color: 'var(--muted)', lineHeight: 1.55 }}>{c.p}</p>
                <div className="chips">
                  {c.chips.map((ch) => (<span className="chip" key={ch}>{ch}</span>))}
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 24, textAlign: 'center' }}>
            <Link className="link" href="/features" style={{ fontFamily: 'var(--font-ui)', fontWeight: 600, fontSize: 15, color: 'var(--accent-ink)', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              See the full supported-features matrix →
            </Link>
          </div>
        </div>
      </section>

      {/* Security */}
      <section className="ink" id="security">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow" style={{ color: '#4AE389' }}>Security · the bit you’ll have to defend to your CTO</span>
            <h2>Three things, plus a footnote for Play Store policy.</h2>
            <p>
              Server-driven UI gets the security question approximately once per conversation. Here is the answer, in three parts. You can copy-paste this into Slack.
            </p>
          </div>

          <div className="cards-grid">
            {securityCards.map((c) => (
              <div className="card dark" key={c.h}>
                <div className="icon">{c.icon}</div>
                <h3>{c.h}</h3>
                <p>{c.p}</p>
              </div>
            ))}
          </div>

          <div className="legal-row">
            {legalCards.map((c) => (
              <div className="card dark" key={c.quote}>
                <div className="icon">{c.icon}</div>
                <div className="legal-quote">{c.quote}</div>
                <p>{c.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick start */}
      <section>
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Quick start · the whole tutorial fits on a screen</span>
            <h2>Three blocks. One Gradle task. One CDN upload.</h2>
            <p>
              Add the plugin to your app module. Write your screen the way you’d write any other Compose screen. Run <code style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9em' }}>ketoyBundle</code>. Upload. Look up at the clock - yep, that fast.
            </p>
          </div>

          <div className="cards-grid">
            <CodeWindow file="build.gradle.kts">{QUICK_GRADLE}</CodeWindow>
            <CodeWindow file="HomeScreen.kt">{QUICK_HOME}</CodeWindow>
            <CodeWindow file="terminal" tag="~60s rollout">{QUICK_TERMINAL}</CodeWindow>
          </div>
        </div>
      </section>

      {/* CTA + Support trigger */}
      <section style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="cta-banner">
            <div>
              <h2>Write Kotlin. Ship the screen. Reclaim your week.</h2>
              <p>
                Available now on Maven Central. Hilt integration, dev overlay, and the full Material3 adapter catalog included. No credit card, no waitlist, no sales call - it’s a Gradle plugin.
              </p>
            </div>
            <div className="right">
              <Link className="btn btn-ghost" href="/docs">Read the docs</Link>
              <Link className="btn btn-primary" href="/get-started">Get started</Link>
            </div>
          </div>

          <SupportTrigger />
        </div>
      </section>
    </>
  );
}
