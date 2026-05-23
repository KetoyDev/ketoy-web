'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import ThemeToggle from './ThemeToggle';
import Search from './Search';

const NAV = [
  { href: '/get-started', label: 'Get started' },
  { href: '/features', label: 'Supported features' },
  { href: '/architecture', label: 'Architecture' },
  { href: '/docs', label: 'Docs', prefetch: false },
  { href: '/updates', label: 'What’s new', match: /^\/updates/ },
];

export default function Topbar() {
  const pathname = usePathname() || '/';
  const [open, setOpen] = useState(false);

  const isActive = (item) =>
    item.match ? item.match.test(pathname) : pathname === item.href;

  // Close mobile menu when route changes
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  // Close on escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

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
              {...(item.prefetch === false ? { prefetch: false } : {})}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="nav-right">
          <Search />
          <ThemeToggle />
          <Link className="btn btn-primary nav-cta" href="/get-started">
            Get started
          </Link>
          <button
            type="button"
            className="nav-burger"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {open && (
        <div
          className="mobile-menu-backdrop"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}
      <nav
        className={`mobile-menu${open ? ' open' : ''}`}
        aria-hidden={!open}
      >
        {NAV.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={isActive(item) ? 'active' : undefined}
            onClick={() => setOpen(false)}
            {...(item.prefetch === false ? { prefetch: false } : {})}
          >
            {item.label}
          </Link>
        ))}
        <Link
          href="/get-started"
          className="btn btn-primary mobile-menu-cta"
          onClick={() => setOpen(false)}
        >
          Get started
        </Link>
      </nav>
    </header>
  );
}
