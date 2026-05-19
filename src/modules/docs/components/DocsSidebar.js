'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { docsNav } from '../lib/nav';

export default function DocsSidebar() {
  const pathname = usePathname();

  return (
    <aside className="docs-side">
      {docsNav.map((group) => (
        <div className="group" key={group.title}>
          <div className="group-title">{group.title}</div>
          {group.items.map((item) => {
            const active =
              item.active ?? (item.href !== '#' && pathname === item.href);
            return (
              <Link
                key={item.label}
                href={item.href}
                className={active ? 'active' : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      ))}
    </aside>
  );
}
