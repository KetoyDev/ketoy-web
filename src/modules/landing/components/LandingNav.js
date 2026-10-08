'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import KetoyLogo from '@/components/KetoyLogo';
import BrandIcon from '@/components/BrandIcon';
import { SDK_VERSION_FULL } from '@/constants';
import { NAV, GITHUB_URL } from '../data';

function Arrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function NavLink({ item, onClick }) {
  const external = item.href.startsWith('http');
  if (external) {
    return <a href={item.href} onClick={onClick}>{item.label}</a>;
  }
  return (
    <Link href={item.href} onClick={onClick} {...(item.prefetch === false ? { prefetch: false } : {})}>
      {item.label}
    </Link>
  );
}

/**
 * Two navs share one source of links: the one printed inside the hero panel,
 * and a compact floating bar that appears once the hero has scrolled away.
 */
export default function LandingNav() {
  const [open, setOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Tint the glass by what sits behind it: smoky over the dark panels,
  // clear over the canvas and the violet deck.
  useEffect(() => {
    let raf = 0;
    let lastRun = 0;
    const probe = () => {
      raf = 0;
      const now = performance.now();
      if (now - lastRun < 120) { raf = requestAnimationFrame(probe); return; }
      lastRun = now;
      const x = window.innerWidth / 2;
      const y = 40;
      const hit = document.elementsFromPoint(x, y).find((el) => !el.closest('.kt-nav-float'));
      const onDark = !!(hit && hit.closest('.kt-panel, .kt-layers, .kt-term, .kt-vis--flow, .kt-vis--code, .kt-sv'));
      setDark((d) => (d === onDark ? d : onDark));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(probe); };
    window.addEventListener('scroll', onScroll, { passive: true });
    probe();
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf); };
  }, []);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const sentinel = document.querySelector('[data-nav-sentinel]');
    if (!sentinel) return undefined;
    const io = new IntersectionObserver(([e]) => setCompact(!e.isIntersecting), { rootMargin: '-80px 0px 0px 0px' });
    io.observe(sentinel);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    if (!open) return undefined;
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <header className="kt-nav" data-hero="nav">
        <div className="kt-brand-row">
          <Link className="kt-brand" href="/" aria-label="Ketoy home">
            <KetoyLogo size={26} />
            <span>Ketoy</span>
          </Link>
          <Link className="kt-version" href="/updates" title="Release notes">v{SDK_VERSION_FULL}</Link>
        </div>
        <nav className="kt-nav-links" aria-label="Primary">
          {NAV.map((item) => <NavLink key={item.href} item={item} />)}
        </nav>
        <div className="kt-nav-right">
          <a className="kt-nav-gh" href={GITHUB_URL} aria-label="Ketoy on GitHub">
            <BrandIcon name="github" size={18} />
          </a>
          <Link className="kt-btn kt-btn--light kt-btn--sm" href="/get-started">
            Get started
            <span className="kt-btn-ic"><Arrow /></span>
          </Link>
          <button
            type="button"
            className={`kt-burger${open ? ' is-open' : ''}`}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span /><span />
          </button>
        </div>
      </header>

      {mounted && createPortal(
        <>
      <div className={`kt-nav-float${compact && !open ? ' is-on' : ''}${dark ? ' is-dark' : ''}`} aria-hidden={!compact}>
        <Link className="kt-brand" href="/" tabIndex={compact ? 0 : -1}>
          <KetoyLogo size={22} />
          <span>Ketoy</span>
        </Link>
        <nav aria-label="Primary, compact">
          {NAV.slice(0, 4).map((item) => <NavLink key={item.href} item={item} />)}
        </nav>
        <Link className="kt-btn kt-btn--dark kt-btn--sm" href="/get-started" tabIndex={compact ? 0 : -1}>
          Get started
        </Link>
      </div>

      <div className={`kt-menu${open ? ' is-open' : ''}`} aria-hidden={!open}>
        <nav aria-label="Menu">
          {NAV.map((item, i) => (
            <span key={item.href} className="kt-menu-item" style={{ '--i': i }}>
              <NavLink item={item} onClick={close} />
            </span>
          ))}
          <span className="kt-menu-item" style={{ '--i': NAV.length }}>
            <a href={GITHUB_URL} onClick={close}>GitHub</a>
          </span>
        </nav>
        <Link className="kt-btn kt-btn--light" href="/get-started" onClick={close}>Get started</Link>
      </div>
        </>,
        document.body,
      )}
    </>
  );
}
