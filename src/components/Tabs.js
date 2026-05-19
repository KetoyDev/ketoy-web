'use client';

import { useState } from 'react';

export default function Tabs({ tabs, initial = 0 }) {
  const [active, setActive] = useState(initial);
  return (
    <div className="tabs">
      <div className="tabs-nav">
        {tabs.map((t, i) => (
          <button
            key={t.label}
            className={i === active ? 'active' : undefined}
            data-tab={i}
            onClick={() => setActive(i)}
            type="button"
          >
            {t.label}
          </button>
        ))}
      </div>
      {tabs.map((t, i) => (
        <div
          key={t.label}
          className={`tab-pane${i === active ? ' active' : ''}`}
        >
          {t.content}
        </div>
      ))}
    </div>
  );
}
