'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const SECTIONS = ['how', 'features', 'code', 'origin'] as const;

export default function Nav() {
  const pathname = usePathname();
  const isBlogs = pathname.startsWith('/blogs');
  const [activeSection, setActiveSection] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isBlogs) { setActiveSection(''); return; }

    const ratios: Record<string, number> = {};

    function pick() {
      let best = '';
      let top = 0;
      for (const [id, r] of Object.entries(ratios)) {
        if (r > top) { top = r; best = id; }
      }
      setActiveSection(best);
    }

    const observers = SECTIONS.flatMap(id => {
      const el = document.getElementById(id);
      if (!el) return [];
      const obs = new IntersectionObserver(
        ([e]) => { ratios[id] = e.intersectionRatio; pick(); },
        { threshold: [0, 0.25, 0.5, 0.75, 1] },
      );
      obs.observe(el);
      return [obs];
    });

    return () => observers.forEach(o => o.disconnect());
  }, [isBlogs]);

  function cls(section: string) {
    return !isBlogs && activeSection === section ? 'active' : '';
  }

  return (
    <nav className="nav">
      <Link href="/" className="brand">
        <img src="/assets/ketoy_logo.png" alt="Ketoy" />
        <div className="name">Ketoy</div>
      </Link>

      <button
        type="button"
        className="mobile-menu-toggle"
        aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={mobileOpen}
        aria-controls="mobile-nav-panel"
        onClick={() => setMobileOpen((v) => !v)}
      >
        <span />
        <span />
        <span />
      </button>

      <div className="nav-links">
        <a href="/#how"      className={cls('how')}>How it works</a>
        <a href="/#features" className={cls('features')}>Runtime</a>
        <a href="/#code"     className={cls('code')}>Code</a>
        <a href="/#origin"   className={cls('origin')}>Origin</a>
        <Link href="/blogs"  className={isBlogs ? 'active' : ''}>Blogs</Link>
      </div>

      <div className="nav-cta">
        <span className="pill">
          <span className="dot pulse" />
          ALPHA
        </span>
        <a href="/#waitlist" className="pill solid">Early Access →</a>
      </div>

      <div id="mobile-nav-panel" className={`mobile-nav-panel ${mobileOpen ? 'open' : ''}`}>
        <a href="/#how" onClick={() => setMobileOpen(false)} className={cls('how')}>How it works</a>
        <a href="/#features" onClick={() => setMobileOpen(false)} className={cls('features')}>Runtime</a>
        <a href="/#code" onClick={() => setMobileOpen(false)} className={cls('code')}>Code</a>
        <a href="/#origin" onClick={() => setMobileOpen(false)} className={cls('origin')}>Origin</a>
        <Link href="/blogs" onClick={() => setMobileOpen(false)} className={isBlogs ? 'active' : ''}>Blogs</Link>

        <div className="mobile-nav-cta">
          <span className="pill">
            <span className="dot pulse" />
            ALPHA
          </span>
          <a href="/#waitlist" className="pill solid" onClick={() => setMobileOpen(false)}>Early Access →</a>
        </div>
      </div>
    </nav>
  );
}
