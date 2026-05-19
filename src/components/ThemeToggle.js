'use client';

import { useCallback } from 'react';

export default function ThemeToggle() {
  const onClick = useCallback(() => {
    const root = document.documentElement;
    const isDark = root.getAttribute('data-theme') === 'dark';
    if (isDark) {
      root.removeAttribute('data-theme');
      try {
        localStorage.setItem('ketoy-theme', 'light');
      } catch {}
    } else {
      root.setAttribute('data-theme', 'dark');
      try {
        localStorage.setItem('ketoy-theme', 'dark');
      } catch {}
    }
  }, []);

  return (
    <button
      className="theme-toggle"
      type="button"
      aria-label="Toggle theme"
      onClick={onClick}
    >
      <svg
        className="ic-sun"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
      </svg>
      <svg
        className="ic-moon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    </button>
  );
}
