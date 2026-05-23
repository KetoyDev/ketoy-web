'use client';

import { useEffect, useState } from 'react';

export default function TocNav() {
  const [items, setItems] = useState([]);
  const [activeId, setActiveId] = useState('');
  const [openMobile, setOpenMobile] = useState(false);

  // Extract headings from the rendered doc body
  useEffect(() => {
    const body = document.querySelector('.docs-body');
    if (!body) return;
    const headings = Array.from(body.querySelectorAll('h2[id], h3[id]'));
    const built = headings.map((el) => ({
      id: el.id,
      text: (el.querySelector('.doc-heading-text')?.textContent || el.textContent || '').trim(),
      level: el.tagName === 'H3' ? 3 : 2,
    })).filter((i) => i.id && i.text);
    setItems(built);

    if (built.length === 0) return;

    // scroll-spy
    const visible = new Map();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) visible.set(e.target.id, e.intersectionRatio);
          else visible.delete(e.target.id);
        });
        if (visible.size > 0) {
          let bestId = '';
          let bestTop = Infinity;
          headings.forEach((h) => {
            if (visible.has(h.id)) {
              const top = h.getBoundingClientRect().top;
              if (top < bestTop) { bestTop = top; bestId = h.id; }
            }
          });
          if (bestId) setActiveId(bestId);
        }
      },
      { rootMargin: '-88px 0px -70% 0px', threshold: [0, 1] }
    );
    headings.forEach((h) => observer.observe(h));

    // Hash sync on mount
    if (window.location.hash) {
      setActiveId(window.location.hash.slice(1));
    } else {
      setActiveId(built[0].id);
    }

    return () => observer.disconnect();
  }, []);

  if (items.length === 0) return null;

  return (
    <aside className="docs-toc" aria-label="On this page">
      <button
        type="button"
        className="docs-toc-mobile-toggle"
        aria-expanded={openMobile}
        onClick={() => setOpenMobile((v) => !v)}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M4 6h16M4 12h10M4 18h7" />
        </svg>
        <span>On this page</span>
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`docs-toc-chev${openMobile ? ' open' : ''}`}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      <div className={`docs-toc-inner${openMobile ? ' open' : ''}`}>
        <div className="docs-toc-title">On this page</div>
        <ul className="docs-toc-list">
          {items.map((item) => (
            <li
              key={item.id}
              className={`docs-toc-item lvl-${item.level}${activeId === item.id ? ' active' : ''}`}
            >
              <a
                href={`#${item.id}`}
                onClick={() => {
                  setActiveId(item.id);
                  setOpenMobile(false);
                }}
              >
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
