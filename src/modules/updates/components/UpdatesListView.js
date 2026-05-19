'use client';

import { useMemo, useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import UpdateCard from './UpdateCard';
import UpdateDrawer from './UpdateDrawer';

const FILTERS = [
  { key: 'all', label: 'All updates' },
  { key: 'stable', label: 'Stable' },
  { key: 'beta', label: 'Beta' },
  { key: 'coming', label: 'Coming soon' },
];

const CHIP_TO_FILTER = {
  'uchip-stable': 'stable',
  'uchip-beta': 'beta',
  'uchip-coming': 'coming',
};

export default function UpdatesListView({
  sectionIcon,
  title,
  description,
  updates,
}) {
  const [filter, setFilter] = useState('all');
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

  const tagged = useMemo(
    () => updates.map((u) => ({ ...u, kind: CHIP_TO_FILTER[u.chipClass] || 'other' })),
    [updates]
  );

  const counts = useMemo(() => {
    const c = { all: tagged.length, stable: 0, beta: 0, coming: 0 };
    tagged.forEach((u) => {
      if (c[u.kind] !== undefined) c[u.kind] += 1;
    });
    return c;
  }, [tagged]);

  const visible = filter === 'all' ? tagged : tagged.filter((u) => u.kind === filter);

  return (
    <div className="container">
      <div className="updates-list-grid">
        <aside className="updates-list-side">
          <div className="crumb">
            <Link href="/updates">← What’s new</Link>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
            <div
              className="updates-col-icon"
              style={{ width: 44, height: 44, borderRadius: 12 }}
              aria-hidden="true"
            >
              {sectionIcon}
            </div>
          </div>
          <h1>{title}</h1>
          <p>{description}</p>

          <div className="filters" role="tablist" aria-label="Filter updates">
            {FILTERS.map((f) => (
              <button
                key={f.key}
                type="button"
                className={filter === f.key ? 'active' : undefined}
                data-filter={f.key}
                onClick={() => setFilter(f.key)}
              >
                {f.label} <span className="count">{counts[f.key] ?? 0}</span>
              </button>
            ))}
          </div>
        </aside>

        <main className="updates-list-feed" id="updatesFeed">
          {visible.map((u) => (
            <UpdateCard key={u.id} update={u} onOpen={openUpdate} />
          ))}
        </main>
      </div>

      <UpdateDrawer update={active} onClose={closeUpdate} />
    </div>
  );
}
