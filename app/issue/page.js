import Link from 'next/link';
import IssueForm from '@/modules/issue/IssueForm';

export const metadata = {
  title: 'Report an issue · Ketoy',
  description:
    'Report a bug in the Ketoy SDK, CLI, or compiler plugin - or disclose a security vulnerability privately.',
};

const TRIAGE_CARDS = [
  {
    tag: 'Bug',
    h: 'Something is broken',
    p: 'A crash, a stack trace, a Gradle task that fails, a screen that renders wrong, a CLI command that hangs. Anything reproducible.',
    cta: 'Open a bug report',
    href: '#report',
  },
  {
    tag: 'Question',
    h: "Behavior doesn't match the docs",
    p: "The docs claim X but the SDK does Y. Either it's a bug or the docs are wrong, either way we want to know.",
    cta: 'Open a docs report',
    href: '#report',
  },
  {
    tag: 'Security',
    h: 'You found a vulnerability',
    p: 'Signature bypass, sandbox escape, anything that could harm Ketoy users. Please do not open it here, email us instead.',
    cta: 'Email security',
    href: '#security',
  },
];

const BEFORE_YOU_SUBMIT = [
  {
    h: 'Include versions',
    p: 'The SDK version, the Gradle plugin version, and (for CLI bugs) the ketoy CLI version. Run `ketoy version` if you have the CLI.',
  },
  {
    h: 'Tell us what you expected',
    p: 'A one-line description of what should have happened beats a five-paragraph description of the workaround you tried.',
  },
  {
    h: 'Paste the failure',
    p: 'Stack trace, build output, KBC error message - whatever the tooling printed. Truncate noise, keep the relevant lines.',
  },
  {
    h: 'A repro helps, not required',
    p: 'A minimal sample is gold, but never required to open a report. If we need one to make progress, we\'ll ask.',
  },
];

export default function IssuePage() {
  return (
    <>
      {/* Page header */}
      <section className="page-head">
        <div className="container">
          <span className="eyebrow">Support · open report</span>
          <h1>
            Something went wrong?{' '}
            <em style={{
              fontStyle: 'normal',
              background: 'linear-gradient(135deg,#3DDC84 0%,#4285F4 100%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
            }}>
              Tell us.
            </em>
          </h1>
          <p className="lede">
            Real engineers read every report - no Tier-1 ticket triage, no chatbots. Bugs in the SDK, CLI, compiler plugin, or docs go through the form below. Security vulnerabilities get a private channel.
          </p>
        </div>
      </section>

      {/* Triage cards */}
      <section>
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">First - pick the right channel</span>
            <h2>Three kinds of reports, two places to send them.</h2>
            <p>
              We split security from everything else for one reason: public bug reports get fixed in the open, security reports don&rsquo;t. If you&rsquo;re not sure which bucket your report falls in, default to the form. We&rsquo;ll move it if it needs the private channel.
            </p>
          </div>

          <div className="cards-grid">
            {TRIAGE_CARDS.map((c) => (
              <div className="card" key={c.h}>
                <span className="support-tag">{c.tag}</span>
                <h3>{c.h}</h3>
                <p>{c.p}</p>
                {c.tag === 'Security' ? (
                  <a className="link" href="#security">{c.cta}</a>
                ) : (
                  <Link className="link" href={c.href}>{c.cta}</Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Before you submit */}
      <section className="surface">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Before you submit · 30 seconds of prep saves a day of back-and-forth</span>
            <h2>What makes a report we can actually act on.</h2>
            <p>
              None of this is required - empty reports still get read - but the more of these you include, the faster we get from &ldquo;received&rdquo; to &ldquo;fixed in the next release.&rdquo;
            </p>
          </div>

          <div className="cards-grid cols-2">
            {BEFORE_YOU_SUBMIT.map((c) => (
              <div className="card" key={c.h}>
                <h3>{c.h}</h3>
                <p>{c.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Report form */}
      <section id="report">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">The form · this goes to a real inbox</span>
            <h2>File a bug or issue report.</h2>
            <p>
              Submissions go directly to engineering. You&rsquo;ll usually hear back within a business day - worst case, the morning after.
            </p>
          </div>

          <div className="issue-form-card">
            <IssueForm />
          </div>
        </div>
      </section>

      {/* Security disclosure */}
      <section className="ink" id="security">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow" style={{ color: '#4AE389' }}>Security · responsible disclosure</span>
            <h2>Found a vulnerability? Don&rsquo;t open an issue. Email us.</h2>
            <p>
              Signature-verification bypass, sandbox escape, capability boundary violation, anything that could compromise Ketoy users - we want to know <em style={{ fontStyle: 'normal' }}>privately</em>, before it&rsquo;s on a public tracker. We&rsquo;ll fix it, ship the patch, and only then write it up.
            </p>
          </div>

          <div className="security-panel">
            <div className="security-panel-main">
              <span className="security-pill">PGP-optional · private</span>
              <a className="security-email-big" href="mailto:security@ketoy.dev">
                security@ketoy.dev
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </a>
              <p className="security-panel-sub">
                Include a description of the issue, your reproduction steps, and the affected version. PGP welcome but not required.
              </p>
            </div>

            <div className="security-panel-promises">
              <div className="security-promise">
                <div className="security-promise-num">48h</div>
                <div className="security-promise-text">Acknowledgement of every report, weekends included.</div>
              </div>
              <div className="security-promise">
                <div className="security-promise-num">5d</div>
                <div className="security-promise-text">Triage and a remediation timeline back to you.</div>
              </div>
              <div className="security-promise">
                <div className="security-promise-num">∞</div>
                <div className="security-promise-text">Credit in release notes - unless you ask to stay anonymous.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </>
  );
}
