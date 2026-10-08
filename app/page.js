import '../public/styles/landing.css';
import Link from 'next/link';
import { SDK_VERSION_FULL } from '@/constants';
import BrandIcon from '@/components/BrandIcon';
import CopyButton from '@/components/mdx/CopyButton';
import JsonLd from '@/components/JsonLd';
import LandingNav from '@/modules/landing/components/LandingNav';
import HeroStage from '@/modules/landing/components/HeroStage';
import LayerDeck from '@/modules/landing/components/LayerDeck';
import Motion from '@/modules/landing/components/Motion';
import { faqSchema, SITE_DESCRIPTION, SITE_KEYWORDS, SITE_URL } from '@/lib/seo';
import {
  HERO, PROOF, LAYERS_TITLE, LAYERS_LEAD, STEPS_TITLE, STEPS_LEAD, STEPS,
  SECURITY_TITLE, SECURITY_LEAD, SECURITY, VERIFY, VERIFY_FOOT,
  TOOLS_TITLE, TOOLS_LEAD, CLI, TOOL_TILES, AGENTS, FAQ_TITLE, FAQ, CTA, INSTALL_CMD, GITHUB_URL,
} from '@/modules/landing/data';

const TITLE = 'Ketoy - Kotlin Over-The-Air (OTA) Updates for Android';

export const metadata = {
  title: { absolute: TITLE },
  description: SITE_DESCRIPTION,
  keywords: SITE_KEYWORDS,
  alternates: { canonical: '/' },
  openGraph: { type: 'website', title: TITLE, description: SITE_DESCRIPTION, url: SITE_URL },
  twitter: { card: 'summary_large_image', title: TITLE, description: SITE_DESCRIPTION },
};

function Title({ as: Tag = 'h2', lines, id, className = '' }) {
  return (
    <Tag id={id} className={`kt-title ${className}`} data-blur>
      {lines.map((l, i) => (
        <span key={l}>{l}{i < lines.length - 1 ? ' ' : ''}</span>
      ))}
    </Tag>
  );
}

function Cmd({ text }) {
  return (
    <div className="kt-cmd">
      <code><span aria-hidden="true">$ </span>{text}</code>
      <CopyButton text={text} />
    </div>
  );
}

function Check() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function Arrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export default function HomePage() {
  return (
    <div className="kt">
      <Motion />

      {/* Hero */}
      <section className="kt-hero" data-hero="root" aria-labelledby="kt-h1">
        <div className="kt-panel kt-hero-panel">
          <div className="kt-bloom" data-hero="bloom" aria-hidden="true" />

          <LandingNav />

          <div className="kt-hero-copy" data-hero="copy">
            <Link className="kt-pill" href="/updates" data-hero="fade">
              <i className="kt-pill-dot" aria-hidden="true" />
              <span className="kt-pill-long">{HERO.pill} · </span>v{SDK_VERSION_FULL}
            </Link>
            <h1 id="kt-h1" className="kt-h1">
              {HERO.lines.map((l) => (
                <span className="kt-line" key={l}>
                  <span className="kt-line-in" data-hero="line">{l}</span>
                </span>
              ))}
            </h1>
            <p className="kt-lead kt-lead--hero" data-hero="fade">{HERO.lead}</p>
            <div className="kt-ctas" data-hero="fade">
              <Link className="kt-btn kt-btn--light" href={HERO.primary.href}>
                {HERO.primary.label}
                <span className="kt-btn-ic"><Arrow /></span>
              </Link>
              <a className="kt-btn kt-btn--ghost" href={HERO.secondary.href}>
                <BrandIcon name="github" size={18} />
                {HERO.secondary.label}
              </a>
            </div>
          </div>

          <HeroStage />
        </div>
        <div data-nav-sentinel aria-hidden="true" />

        <ul className="kt-proof" aria-label="Ketoy performance">
          {PROOF.map((p) => (
            <li key={p.label} data-rv>
              <b>{p.value}</b>
              <span>{p.label}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Layers: pinned deck */}
      <section className="kt-layers" id="layers" aria-labelledby="kt-layers-title">
        <div className="kt-layers-head">
          <Title id="kt-layers-title" lines={LAYERS_TITLE} className="kt-title--onviolet" />
          <p className="kt-lead kt-lead--onviolet" data-rv>{LAYERS_LEAD}</p>
        </div>
        <LayerDeck />
      </section>

      {/* How it works */}
      <section className="kt-how" id="how" aria-labelledby="kt-how-title">
        <div className="kt-how-head">
          <Title id="kt-how-title" lines={STEPS_TITLE} />
          <p className="kt-lead" data-rv>{STEPS_LEAD}</p>
        </div>
        <div className="kt-pipe" data-pipe="root">
          <div className="kt-pipe-rail" aria-hidden="true">
            <span className="kt-pipe-fill" data-pipe="fill" />
          </div>
          <ol className="kt-steps">
            {STEPS.map((s) => (
              <li className="kt-step" key={s.n} data-pipe="step" data-rv>
                <span className="kt-step-node" aria-hidden="true"><Check /></span>
                <span className="kt-step-n kt-mono">{s.n}</span>
                <h3>{s.h}</h3>
                <p>{s.p}</p>
                <pre className="kt-step-code">{s.code.join('\n')}</pre>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Security */}
      <section className="kt-security" id="security" aria-labelledby="kt-sec-title">
        <div className="kt-panel kt-sec-panel">
          <div className="kt-sec-grid">
            <div className="kt-sec-copy">
              <Title id="kt-sec-title" lines={SECURITY_TITLE} className="kt-title--ondark" />
              <p className="kt-lead kt-lead--ondark" data-rv>{SECURITY_LEAD}</p>
              <ul className="kt-facts">
                {SECURITY.map((f, i) => (
                  <li key={f.h} data-rv>
                    <span className="kt-mono kt-fact-n">0{i + 1}</span>
                    <div>
                      <h3>{f.h}</h3>
                      <p>{f.p}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="kt-verify-wrap" data-rv>
              <div className="kt-verify-head">
                <span className="kt-mono">on device</span>
                <span className="kt-mono">main.ktx · v12</span>
              </div>
              <ol className="kt-verify" aria-label="What happens before a bundle runs">
                {VERIFY.map((s, i) => (
                  <li key={s.h} data-verify className="is-done">
                    <span className="kt-verify-node" aria-hidden="true">
                      <span className="kt-verify-num">{i + 1}</span>
                      <Check />
                    </span>
                    <span className="kt-verify-text">
                      <b>{s.h}</b>
                      <span>{s.p}</span>
                    </span>
                  </li>
                ))}
              </ol>
              <p className="kt-verify-foot">{VERIFY_FOOT}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tooling */}
      <section className="kt-tools" id="tools" aria-labelledby="kt-tools-title">
        <div className="kt-tools-head">
          <Title id="kt-tools-title" lines={TOOLS_TITLE} />
          <p className="kt-lead" data-rv>{TOOLS_LEAD}</p>
        </div>
        <div className="kt-tools-grid">
          <div className="kt-term kt-term--tools" data-rv>
            <div className="kt-term-bar">
              <span className="kt-term-dots" aria-hidden="true"><i /><i /><i /></span>
              <span>ketoy</span>
            </div>
            <div className="kt-term-body">
              {CLI.map((l) => (
                <div className="kt-term-row" key={l.cmd} data-type>
                  <p className="kt-term-cmd"><span className="kt-term-prompt">$</span> {l.cmd}</p>
                  <p className="kt-term-out"><i className="kt-ok" />{l.out}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="kt-tools-side">
            <article className="kt-tile" data-rv>
              <span className="kt-eyebrow">{TOOL_TILES[0].eyebrow}</span>
              <h3>{TOOL_TILES[0].h}</h3>
              <p>{TOOL_TILES[0].p}</p>
              <Cmd text={TOOL_TILES[0].cmd} />
              <Link className="kt-link" href={TOOL_TILES[0].link.href} prefetch={false}>{TOOL_TILES[0].link.label} <Arrow /></Link>
            </article>
            <article className="kt-tile" data-rv>
              <span className="kt-eyebrow">{TOOL_TILES[1].eyebrow}</span>
              <h3>{TOOL_TILES[1].h}</h3>
              <p>{TOOL_TILES[1].p}</p>
              <ul className="kt-agents" aria-label="Supported agents">
                {AGENTS.map((a) => (
                  <li key={a.name}>
                    {a.icon ? <BrandIcon name={a.icon} size={16} /> : <span className="kt-agent-blank" aria-hidden="true">{a.name[0]}</span>}
                    {a.name}
                  </li>
                ))}
              </ul>
              <Cmd text={TOOL_TILES[1].cmd} />
            </article>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="kt-faq" id="faq" aria-labelledby="kt-faq-title">
        <div className="kt-faq-side">
          <Title id="kt-faq-title" lines={FAQ_TITLE} />
          <Link className="kt-link" href="/docs/faq" prefetch={false} data-rv>More in the docs <Arrow /></Link>
        </div>
        <div className="kt-faq-list" data-rv>
          {FAQ.map(({ q, a }, i) => (
            <details key={q} open={i === 0}>
              <summary>
                <span>{q}</span>
                <i className="kt-faq-plus" aria-hidden="true" />
              </summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
        <JsonLd data={faqSchema(FAQ)} />
      </section>

      {/* Final CTA */}
      <section className="kt-cta" aria-labelledby="kt-cta-title">
        <div className="kt-panel kt-cta-panel">
          <div className="kt-bloom kt-bloom--cta" aria-hidden="true" />
          <Title id="kt-cta-title" lines={CTA.lines} className="kt-title--ondark kt-title--xl" />
          <p className="kt-lead kt-lead--ondark" data-rv>{CTA.lead}</p>
          <div className="kt-cta-row" data-rv>
            <Cmd text={INSTALL_CMD} />
            <Link className="kt-btn kt-btn--light" href="/get-started">
              {CTA.primary}
              <span className="kt-btn-ic"><Arrow /></span>
            </Link>
            <a className="kt-btn kt-btn--ghost" href={GITHUB_URL}>
              <BrandIcon name="github" size={18} />
              GitHub
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
