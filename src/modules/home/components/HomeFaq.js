import Link from 'next/link';
import { slugify } from '@/modules/docs/lib/slug';

// Server-rendered accordion: native <details>, so the answers are in the
// static HTML for crawlers and AI assistants and cost zero client JS. Reuses
// the docs .faq-item styling so the section matches the rest of the site.
export default function HomeFaq({ items }) {
  return (
    <div className="home-faq" data-reveal>
      {items.map(({ q, a }) => (
        <details className="faq-item" key={q} id={slugify(q)}>
          <summary className="faq-q">
            <span className="faq-q-text">{q}</span>
            <svg
              className="faq-chevron"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </summary>
          <div className="faq-a">
            <p>{a}</p>
          </div>
        </details>
      ))}

      <div className="home-faq-foot">
        <p>OTA vs SDUI, bundle sizes, Play Store policy, offline behaviour, debugging.</p>
        <Link className="btn btn-ghost" href="/docs/faq" prefetch={false}>
          More questions
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M13 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
