'use client';

import { useEffect, useState } from 'react';

export default function Subnav({ items }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const sections = items
      .map((i) => document.getElementById(i.id))
      .filter(Boolean);
    function sync() {
      const y = window.scrollY + 200;
      let current = sections[0];
      sections.forEach((s) => {
        if (s.offsetTop <= y) current = s;
      });
      if (current) setActive(current.id);
    }
    window.addEventListener('scroll', sync, { passive: true });
    sync();
    return () => window.removeEventListener('scroll', sync);
  }, [items]);

  return (
    <div className="subnav">
      <div className="subnav-inner">
        {items.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={active === item.id ? 'active' : undefined}
          >
            {item.label}
          </a>
        ))}
      </div>
    </div>
  );
}
