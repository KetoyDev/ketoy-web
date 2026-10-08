'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import ThemeToggle from './ThemeToggle';
import KetoyLogo from './KetoyLogo';
import BrandIcon from './BrandIcon';
import Search from './Search';
import { docsNav } from '@/modules/docs/lib/nav';
import { GITHUB_URL } from '@/modules/landing/data';

const NAV = [
  { href: '/get-started', label: 'Get started' },
  { href: '/features', label: 'Features' },
  { href: '/architecture', label: 'Architecture' },
  { href: '/docs', label: 'Docs', prefetch: false, menu: true, match: /^\/docs/ },
  { href: '/updates', label: "What's new", match: /^\/updates/ },
];

function Chevron() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function DocsMenu({ onNavigate }) {
  return (
    <div className="nav-menu" role="menu" aria-label="Documentation">
      <div className="nav-menu-grid">
        {docsNav.map((group) => (
          <div className="nav-menu-group" key={group.title}>
            <div className="nav-menu-title">{group.title}</div>
            {group.items.map((item) => (
              <Link key={item.href} href={item.href} prefetch={false} role="menuitem" onClick={onNavigate}>
                {item.label}
              </Link>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Topbar() {
  const pathname = usePathname() || '/';
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef(null);

  const isActive = (item) => (item.match ? item.match.test(pathname) : pathname === item.href);

  useEffect(() => { setOpen(false); setMenu(false); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') { setOpen(false); setMenu(false); } };
    const onDown = (e) => { if (menuRef.current && !menuRef.current.contains(e.target)) setMenu(false); };
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onDown);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onDown);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  // The landing page ships its own navigation inside its hero panel.
  if (pathname === '/') return null;

  return (
    <header className={`nav-bar${scrolled ? ' is-scrolled' : ''}${open ? ' is-open' : ''}`}>
      <div className="nav-bar-inner">
        <Link className="brand" href="/" aria-label="Ketoy home">
          <KetoyLogo className="brand-mark" size={24} />
          <span className="brand-name">Ketoy</span>
        </Link>

        <nav className="nav-links" aria-label="Primary">
          {NAV.map((item) => {
            if (item.menu) {
              return (
                <div
                  key={item.href}
                  ref={menuRef}
                  className={`nav-item has-menu${menu ? ' is-open' : ''}${isActive(item) ? ' is-active' : ''}`}
                  onMouseEnter={() => setMenu(true)}
                  onMouseLeave={() => setMenu(false)}
                >
                  <Link href={item.href} prefetch={false} aria-expanded={menu} aria-haspopup="menu">
                    {item.label}
                    <Chevron />
                  </Link>
                  <DocsMenu onNavigate={() => setMenu(false)} />
                </div>
              );
            }
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-item${isActive(item) ? ' is-active' : ''}`}
                {...(item.prefetch === false ? { prefetch: false } : {})}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="nav-right">
          <Search />
          <a className="nav-icon" href={GITHUB_URL} aria-label="Ketoy on GitHub">
            <BrandIcon name="github" size={17} />
          </a>
          <ThemeToggle />
          <Link className="btn btn-primary nav-cta" href="/get-started">Get started</Link>
          <button
            type="button"
            className="nav-burger"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span /><span />
          </button>
        </div>
      </div>

      <div className={`nav-sheet${open ? ' is-open' : ''}`} aria-hidden={!open}>
        <nav aria-label="Menu">
          {NAV.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              className={isActive(item) ? 'is-active' : undefined}
              style={{ '--i': i }}
              onClick={() => setOpen(false)}
              {...(item.prefetch === false ? { prefetch: false } : {})}
            >
              {item.label}
            </Link>
          ))}
          <a href={GITHUB_URL} style={{ '--i': NAV.length }} onClick={() => setOpen(false)}>GitHub</a>
        </nav>
        <div className="nav-sheet-foot">
          <ThemeToggle />
          <Link href="/get-started" className="btn btn-primary" onClick={() => setOpen(false)}>Get started</Link>
        </div>
      </div>
    </header>
  );
}
