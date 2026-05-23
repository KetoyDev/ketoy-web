'use client';

import { useId } from 'react';
import { slugify } from '@/modules/docs/lib/slug';

export function FaqItem({ question, id: idProp, children }) {
  const reactId = useId();
  const id = idProp || slugify(question) || reactId;

  const onAnchor = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (typeof window !== 'undefined') {
      history.replaceState(null, '', `#${id}`);
      try { navigator.clipboard?.writeText(window.location.href); } catch (_) {}
    }
  };

  return (
    <details className="faq-item" id={id}>
      <summary className="faq-q">
        <span className="faq-q-text">{question}</span>
        <a
          href={`#${id}`}
          className="faq-anchor"
          aria-label="Link to question"
          onClick={onAnchor}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
          </svg>
        </a>
        <svg className="faq-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="m6 9 6 6 6-6" />
        </svg>
      </summary>
      <div className="faq-a">{children}</div>
    </details>
  );
}

export function FaqList({ children }) {
  return <div className="faq-list">{children}</div>;
}
