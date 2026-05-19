'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import UpdateCard from './UpdateCard';
import UpdateDrawer from './UpdateDrawer';

const ICONS = {
  platform: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
      <path d="M12 3 3 7.5l9 4.5 9-4.5L12 3z" />
      <path d="M3 12l9 4.5L21 12" />
      <path d="M3 16.5L12 21l9-4.5" />
    </svg>
  ),
  sdk: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 6l-5 6 5 6" />
      <path d="M15 6l5 6-5 6" />
      <path d="M13 4l-2 16" opacity="0.6" />
    </svg>
  ),
};

export default function UpdatesSection({
  section,
  title,
  sub,
  viewAllHref,
  updates,
  paddingTop,
}) {
  const [active, setActive] = useState(null);

  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get('update');
    if (id) {
      const match = updates.find((u) => u.id === id);
      if (match) setActive(match);
    }
  }, []);

  const openUpdate = useCallback((update) => {
    setActive(update);
    const url = new URL(window.location.href);
    url.searchParams.set('update', update.id);
    window.history.replaceState(null, '', url.toString());
  }, []);

  const closeUpdate = useCallback(() => {
    setActive(null);
    const url = new URL(window.location.href);
    url.searchParams.delete('update');
    window.history.replaceState(null, '', url.toString());
  }, []);

  return (
    <section
      className="updates-section"
      style={paddingTop ? { paddingTop } : undefined}
    >
      <div className="container">
        <div className="updates-col-head">
          <div
            className={`updates-col-icon${section === 'sdk' ? ' alt' : ''}`}
            aria-hidden="true"
          >
            {ICONS[section]}
          </div>
          <div>
            <h2>{title}</h2>
            <span className="sub">{sub}</span>
          </div>
          {viewAllHref && (
            <Link className="view-all" href={viewAllHref}>
              View all
            </Link>
          )}
        </div>

        <div className="update-grid">
          {updates.map((u) => (
            <UpdateCard key={u.id} update={u} onOpen={openUpdate} />
          ))}
        </div>
      </div>

      <UpdateDrawer update={active} onClose={closeUpdate} />
    </section>
  );
}
