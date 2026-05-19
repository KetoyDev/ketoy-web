'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeToggle from './ThemeToggle';
import Search from './Search';

const NAV = [
  { href: '/get-started', label: 'Get started' },
  { href: '/features', label: 'Supported features' },
  { href: '/architecture', label: 'Architecture' },
  { href: '/docs', label: 'Docs' },
  { href: '/updates', label: 'What’s new', match: /^\/updates/ },
];

export default function Topbar() {
  const pathname = usePathname() || '/';
  const isActive = (item) =>
    item.match ? item.match.test(pathname) : pathname === item.href;

  return (
    <header className="topbar">
      <div className="topbar-inner">
        <Link className="brand" href="/">
          <img className="brand-mark" src="/assets/ketoy-logo.svg" alt="" />
          <span className="brand-name">Ketoy</span>
        </Link>
        <nav className="nav">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={isActive(item) ? 'active' : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="nav-right">
          <Search />
          <ThemeToggle />
          <Link className="btn btn-primary" href="/get-started">
            Get started
          </Link>
        </div>
      </div>
    </header>
  );
}
