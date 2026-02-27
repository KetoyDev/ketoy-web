import React, { useState, useEffect } from 'react';
import AnimatedContent from '../components/AnimatedContent';
import Layout from '../components/Layout';

const tiers = [
  {
    name: 'Free',
    badge: null,
    price: '$0',
    period: '/ month',
    description: 'Self-hosted. Perfect for open source projects, side-projects, and solo developers evaluating Ketoy.',
    cta: 'Get started',
    ctaHref: 'https://github.com/developerstring/ketoy',
    ctaClass: 'pricing-cta-secondary',
    features: [
      'Self-hosted deployment',
      'Up to 1\u00a0000 monthly active users',
      '10 SDUI screens',
      'Community support',
      'K-DSL + JSON export',
      'Basic analytics',
      'Open source SDK',
    ],
    missing: [
      'Cloud edge delivery',
      'A/B testing',
      'Team collaboration',
      'Priority support',
    ],
  },
  {
    name: 'Pro',
    badge: 'Most popular',
    price: '$29',
    period: '/ month',
    description: 'Managed cloud. Everything you need to ship, iterate, and scale your SDUI-powered app.',
    cta: 'Start free trial',
    ctaHref: 'https://github.com/developerstring/ketoy',
    ctaClass: 'pricing-cta-primary',
    features: [
      'Ketoy cloud edge delivery',
      'Up to 100\u00a0000 monthly active users',
      'Unlimited SDUI screens',
      'A/B testing & feature flags',
      'Team collaboration (up to 5 seats)',
      'Advanced analytics dashboard',
      'Instant rollback (unlimited history)',
      'Email & Discord priority support',
      'Gradle plugin \u2014 full access',
      'CI / CD pipeline integration',
    ],
    missing: [],
  },
  {
    name: 'Enterprise',
    badge: null,
    price: 'Custom',
    period: '',
    description: 'Dedicated infrastructure, SLAs, and a hands-on onboarding team for large-scale production apps.',
    cta: 'Contact sales',
    ctaHref: 'mailto:support@ketoy.dev?subject=Enterprise%20Pricing',
    ctaClass: 'pricing-cta-secondary',
    features: [
      'Unlimited monthly active users',
      'Dedicated cloud region',
      'SAML / SSO &amp; RBAC',
      'Unlimited team seats',
      'Custom SLA (up to 99.99\u00a0% uptime)',
      'Dedicated solutions engineer',
      'On-premise deployment option',
      'Custom contract &amp; invoicing',
      'Security audit &amp; compliance reports',
    ],
    missing: [],
  },
];

const faqs = [
  {
    question: 'What counts as a monthly active user?',
    answer: 'A monthly active user (MAU) is any unique device that fetches or renders at least one SDUI screen within a calendar month. Bots, crawlers, and internal preview requests are excluded.',
  },
  {
    question: 'Can I self-host the Pro tier?',
    answer: 'The Free tier is fully self-hostable. Pro includes managed Ketoy cloud delivery. If you need a self-hosted Pro or air-gapped setup, reach out to us about an Enterprise arrangement.',
  },
  {
    question: 'Is there a free trial for Pro?',
    answer: 'Yes\u2014every new Pro account starts with a 14-day free trial. No credit card required until the trial ends.',
  },
  {
    question: 'What happens if I exceed my MAU limit on Free?',
    answer: 'Screens continue to render normally. You\'ll receive a notification and be prompted to upgrade. We don\'t cut off traffic without warning.',
  },
  {
    question: 'Which platforms does the SDK support?',
    answer: 'Ketoy targets Jetpack Compose on Android. Multi-platform (iOS via Compose Multiplatform, Web) support is on the roadmap for a future release.',
  },
  {
    question: 'How does rollback work?',
    answer: 'Each deploy is versioned and stored. On Pro and Enterprise you can roll back to any prior release via the dashboard or `./gradlew ketoyRollback --tag=<version>`. On Free, you manage rollbacks manually through your self-hosted server.',
  },
  {
    question: 'Do you offer discounts for open source projects?',
    answer: 'Yes\u2014verified open source projects (public repo, OSI-approved licence) can apply for a free Pro plan. Email us at support@ketoy.dev with a link to your repository.',
  },
  {
    question: 'How secure are my SDUI definitions in the cloud?',
    answer: 'All data is encrypted in transit (TLS 1.3) and at rest (AES-256). Each deploy is cryptographically signed. Enterprise plans include dedicated regional storage and optional customer-managed encryption keys.',
  },
];

export default function Pricing() {
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const toggle = (i) => setOpenFaq(openFaq === i ? null : i);

  return (
    <Layout>
      <main className="pricing-page">
        {/* Hero */}
        <section className="pricing-hero">
          <div className="container">
            <AnimatedContent direction="up" distance={30} duration={0.6}>
              <div className="section-header">
                <h1 className="section-title pricing-hero-title">
                  Simple, transparent{' '}
                  <span className="section-title-accent">pricing</span>
                </h1>
                <p className="section-subtitle">
                  Start free and self-hosted. Scale to managed cloud when you&apos;re ready. No surprise bills.
                </p>
              </div>
            </AnimatedContent>
          </div>
        </section>

        {/* Tier cards */}
        <section className="pricing-tiers-section">
          <div className="container">
            <div className="pricing-tiers">
              {tiers.map((tier, i) => (
                <AnimatedContent key={tier.name} direction="up" distance={28} duration={0.55} delay={i * 0.08}>
                  <div className={`pricing-tier-card${tier.badge ? ' pricing-tier-featured' : ''}`}>
                    {tier.badge && (
                      <div className="pricing-tier-badge">{tier.badge}</div>
                    )}

                    <div className="pricing-tier-header">
                      <h3 className="pricing-tier-name">{tier.name}</h3>
                      <div className="pricing-tier-price">
                        <span className="pricing-tier-amount">{tier.price}</span>
                        {tier.period && <span className="pricing-tier-period">{tier.period}</span>}
                      </div>
                      <p className="pricing-tier-desc">{tier.description}</p>
                    </div>

                    <a href={tier.ctaHref} target="_blank" rel="noreferrer" className={`pricing-cta ${tier.ctaClass}`}>
                      {tier.cta}
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
                      </svg>
                    </a>

                    <ul className="pricing-feature-list">
                      {tier.features.map((f) => (
                        <li key={f} className="pricing-feature-item pricing-feature-yes">
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"/>
                          </svg>
                          <span dangerouslySetInnerHTML={{ __html: f }} />
                        </li>
                      ))}
                      {tier.missing.map((f) => (
                        <li key={f} className="pricing-feature-item pricing-feature-no">
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"/>
                            <line x1="6" y1="6" x2="18" y2="18"/>
                          </svg>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </AnimatedContent>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="pricing-faq-section">
          <div className="container">
            <AnimatedContent direction="up" distance={28} duration={0.6}>
              <div className="section-header">
                <h2 className="section-title" style={{ fontSize: '1.75rem' }}>
                  Frequently asked <span className="section-title-accent">questions</span>
                </h2>
                <p className="section-subtitle" style={{ marginBottom: 0 }}>
                  Still have questions? Email us at{' '}
                  <a href="mailto:support@ketoy.dev" className="pricing-faq-link">support@ketoy.dev</a>
                </p>
              </div>
            </AnimatedContent>

            <div className="pricing-faq-list">
              {faqs.map((faq, i) => (
                <AnimatedContent key={i} direction="up" distance={20} duration={0.5} delay={i * 0.04}>
                  <div className={`pricing-faq-item${openFaq === i ? ' pricing-faq-open' : ''}`}>
                    <button className="pricing-faq-question" onClick={() => toggle(i)} aria-expanded={openFaq === i}>
                      <span>{faq.question}</span>
                      <svg className="pricing-faq-chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9"/>
                      </svg>
                    </button>
                    {openFaq === i && (
                      <div className="pricing-faq-answer">
                        <p>{faq.answer}</p>
                      </div>
                    )}
                  </div>
                </AnimatedContent>
              ))}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
