import '../public/styles/home.css';
import Link from 'next/link';
import { SDK_VERSION_SHORT } from '@/constants';
import OtaMotion from '@/modules/home/components/OtaMotion';
import { CliGraphic, SkillsGraphic } from '@/modules/home/components/ToolingGraphics';
import CopyButton from '@/components/mdx/CopyButton';
import SupportTrigger from '@/modules/home/components/SupportTrigger';
import ScrollReveal from '@/components/ScrollReveal';
import JsonLd from '@/components/JsonLd';
import { faqSchema, SITE_DESCRIPTION, SITE_KEYWORDS, SITE_URL } from '@/lib/seo';
import {
  heroStats, supportCards,
  whatIsCards, securityCards, legalCards,
} from '@/modules/home/data';

const TITLE = 'Ketoy - Kotlin-native Server-Driven UI (SDUI) & OTA for Android';

export const metadata = {
  title: { absolute: TITLE },
  description: SITE_DESCRIPTION,
  keywords: SITE_KEYWORDS,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    title: TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
  },
  twitter: { card: 'summary_large_image', title: TITLE, description: SITE_DESCRIPTION },
};

// Answers the exact questions people (and LLMs) ask. Doubles as an on-page
// FAQ signal and a JSON-LD FAQPage for rich results / AI citation.
const HOME_FAQ = [
  {
    q: 'What is Ketoy?',
    a: 'Ketoy is a Kotlin-native server-driven UI (SDUI) framework for Android. You write real Jetpack Compose in Kotlin, compile it to a tiny signed .ktx bytecode bundle, and push UI changes over-the-air (OTA) to installed apps in seconds - no Play Store release and no JSON DSL.',
  },
  {
    q: 'How is Ketoy different from JSON-based server-driven UI?',
    a: 'Instead of a JSON schema and a parallel component model, Ketoy uses ordinary Kotlin and Jetpack Compose compiled to Ketoy Bytecode (KBC). Bundles are roughly 20x smaller than equivalent JSON SDUI, Ed25519-signed, and rendered as native Compose on device.',
  },
  {
    q: 'Does Ketoy allow over-the-air (OTA) updates on Android within Play Store policy?',
    a: 'Yes. Ketoy delivers UI and logic changes over-the-air without shipping a new APK/AAB. Bundles execute in a sandbox and render native Compose, which keeps updates within Play Store policies.',
  },
  {
    q: 'What does a developer have to learn to use Ketoy?',
    a: 'Almost nothing new. If it is Jetpack Compose, it is Ketoy. One annotation plus one Gradle task turns an in-APK screen into an OTA-updatable screen. Kotlin, Coroutines, Flow, ViewModel, and Hilt all work as usual.',
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="hero-aurora" aria-hidden="true">
          <span className="a1"></span>
          <span className="a2"></span>
          <span className="a3"></span>
        </div>
        <div className="container">
          <div className="hero-grid">
            <div className="hero-lead">
              <div className="hero-tag">
                <span className="pill">v{SDK_VERSION_SHORT}</span>
                <span>Kotlin OTA</span>
                <span className="live-dot" aria-hidden="true"></span>
              </div>
              <h1>
                Ship <strong>Kotlin</strong> over the air.
              </h1>
              <p className="lede">
                Write real Kotlin and Jetpack Compose. Push updates to every device in seconds.
              </p>
              <div className="hero-actions">
                <Link className="btn btn-primary" href="/get-started">
                  Get started
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </Link>
                <Link className="btn btn-ghost" href="/architecture">How it works</Link>
              </div>
            </div>

            {/* Over-the-air delivery motion: phone device animation */}
            <OtaMotion />
          </div>

          <div className="hero-stats" data-reveal>
            {heroStats.map((s, i) => (
              <div className="hero-stat" key={i}>
                <div className="v">{s.v}</div>
                <div className="l">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integrate: command line + AI agents */}
      <section className="surface">
        <div className="container">
          <div className="section-head" data-reveal>
            <span className="eyebrow">Integrate in minutes</span>
            <h2>Command line and AI agents.</h2>
            <p>
              The Ketoy CLI runs your whole workflow from the terminal. Ketoy Skills give
              any AI coding agent an accurate map of what Ketoy supports, before it writes a line.
            </p>
          </div>

          <div className="integrate-grid" data-reveal>
            {/* Command line */}
            <div className="integrate-card">
              <div className="integrate-head">
                <span className="integrate-kicker">Command line</span>
                <h3>Ketoy CLI</h3>
                <p>Set up a project, push to the cloud, and roll back — all from the terminal.</p>
              </div>
              <CliGraphic />
              <div className="integrate-cmd">
                <span className="prompt">$</span>
                <code>npm install -g ketoy-dev</code>
                <CopyButton text="npm install -g ketoy-dev" />
              </div>
              <Link className="integrate-link" href="/docs/cli">
                CLI docs
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* AI agents */}
            <div className="integrate-card">
              <div className="integrate-head">
                <span className="integrate-kicker">AI agents</span>
                <h3>Ketoy Skills</h3>
                <p>Install a skill pack that grounds any coding agent in how Ketoy actually works before it writes code.</p>
              </div>
              <SkillsGraphic />
              <div className="agent-row" aria-label="Works with any skills-compatible agent">
                {['Claude Code', 'Codex', 'Cursor', 'Windsurf', 'Gemini CLI'].map((a) => (
                  <span className="agent-chip" key={a}>{a}</span>
                ))}
              </div>
              <div className="integrate-cmd">
                <span className="prompt">$</span>
                <code>ketoy skills add</code>
                <CopyButton text="ketoy skills add" />
              </div>
              <Link className="integrate-link" href="/docs/skills">
                Skills docs
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Ketoy */}
      <section className="surface">
        <div className="container">
          <div className="section-head" data-reveal>
            <span className="eyebrow">Why Ketoy</span>
            <h2>Update without a release.</h2>
            <p>
              Add one annotation. Run one Gradle task. Every device gets the change in seconds.
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

      {/* What's supported */}
      <section className="surface">
        <div className="container">
          <div className="section-head" data-reveal>
            <span className="eyebrow">What’s supported</span>
            <h2>If it’s Compose, it’s Ketoy.</h2>
            <p>
              Ketoy supports the full Compose toolkit, not a curated subset. When Compose adds a parameter, one command picks it up.
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

          {/* Positive one-line takeaway */}
          <div className="diff-strip" data-reveal>
            <p className="diff-line">
              <b style={{ fontWeight: 600, color: 'var(--ink)' }}>One annotation and one Gradle task.</b> That is the whole difference.
            </p>
            <Link className="link" href="/features" style={{ fontFamily: 'var(--font-ui)', fontWeight: 600, fontSize: 15, color: 'var(--accent-ink)', whiteSpace: 'nowrap' }}>
              See everything Ketoy supports
            </Link>
          </div>
        </div>
      </section>

      {/* Security */}
      <section className="ink" id="security">
        <div className="container">
          <div className="section-head" data-reveal>
            <span className="eyebrow" style={{ color: '#4AE389' }}>Security</span>
            <h2>Secure and compliant.</h2>
            <p>
              Ketoy verifies every bundle before it runs. Here is how, in three parts.
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

          <div className="legal-row legal-row--single">
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

      {/* CTA */}
      <section style={{ paddingTop: 56 }}>
        <div className="container">
          <div className="cta-banner">
            <div>
              <h2>Write Kotlin. Ship the screen.</h2>
              <p>
                Available now on Maven Central. Hilt, Koin, dev tools, and the full Material 3 catalog are included.
              </p>
            </div>
            <div className="right">
              <Link className="btn btn-ghost" href="/docs" prefetch={false}>Read the docs</Link>
              <Link className="btn btn-primary" href="/get-started">Get started</Link>
            </div>
          </div>

          <SupportTrigger />
        </div>
      </section>

      <ScrollReveal />
      <JsonLd data={faqSchema(HOME_FAQ)} />
    </>
  );
}
