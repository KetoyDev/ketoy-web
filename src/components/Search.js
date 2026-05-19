'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

function isTypingTarget(el, input) {
  if (!el) return false;
  const tag = el.tagName;
  return tag === 'TEXTAREA' || el.isContentEditable || (tag === 'INPUT' && el !== input);
}

function buildIndex() {
  const out = [];
  const nodes = document.querySelectorAll('h1, h2, h3, h4, p, li');
  nodes.forEach((el) => {
    if (!el.textContent) return;
    if (el.closest('header, nav, footer, .topbar, .subnav, .docs-side, .search-wrap')) return;
    const text = el.textContent.replace(/\s+/g, ' ').trim();
    if (!text) return;
    out.push({ el, text: text.toLowerCase(), raw: text });
  });
  return out;
}

function makeSnippet(raw, q) {
  if (!q) return raw.slice(0, 120);
  const idx = raw.toLowerCase().indexOf(q);
  if (idx === -1) return raw.slice(0, 120);
  const start = Math.max(0, idx - 36);
  const end = Math.min(raw.length, idx + 64);
  return (start > 0 ? '...' : '') + raw.slice(start, end) + (end < raw.length ? '...' : '');
}

export default function Search() {
  const wrapRef = useRef(null);
  const inputRef = useRef(null);
  const indexRef = useRef(null);
  const hitRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [matches, setMatches] = useState([]);

  const clearHit = useCallback(() => {
    if (hitRef.current) {
      hitRef.current.classList.remove('search-hit');
      hitRef.current = null;
    }
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    setMatches([]);
    clearHit();
  }, [clearHit]);

  useEffect(() => {
    function onKey(e) {
      if (e.key === '/' && !open && !isTypingTarget(document.activeElement, inputRef.current)) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    }
    function onMouseDown(e) {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) close();
    }
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onMouseDown);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onMouseDown);
    };
  }, [open, close]);

  const render = useCallback((q) => {
    const term = (q || '').trim().toLowerCase();
    clearHit();
    if (!term) {
      setMatches([]);
      return;
    }
    if (!indexRef.current) indexRef.current = buildIndex();
    const found = indexRef.current
      .filter((item) => item.text.indexOf(term) !== -1)
      .slice(0, 20)
      .map((item) => ({
        el: item.el,
        title: item.raw.length > 80 ? item.raw.slice(0, 80) + '...' : item.raw,
        snippet: makeSnippet(item.raw, term),
      }));
    setMatches(found);
  }, [clearHit]);

  const onChange = (e) => {
    const v = e.target.value;
    setQuery(v);
    setOpen(true);
    render(v);
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      const first = matches[0];
      if (first) jumpTo(first.el);
    }
    if (e.key === 'Escape') {
      close();
      inputRef.current?.blur();
    }
  };

  const jumpTo = (el) => {
    close();
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    el.classList.add('search-hit');
    hitRef.current = el;
    setTimeout(() => {
      if (hitRef.current === el) clearHit();
    }, 2200);
  };

  return (
    <div
      ref={wrapRef}
      className={`search-wrap${open ? ' open' : ''}`}
      id="searchWrap"
    >
      <div className="search">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
        <input
          ref={inputRef}
          id="searchInput"
          type="text"
          placeholder="Search docs"
          autoComplete="off"
          value={query}
          onFocus={() => setOpen(true)}
          onChange={onChange}
          onKeyDown={onKeyDown}
        />
        <span className="kbd">/</span>
      </div>
      <div className="search-dropdown" id="searchDropdown">
        <div className="search-results" id="searchResults">
          {matches.map((m, i) => (
            <button
              key={i}
              type="button"
              className="search-result"
              data-hit="true"
              onClick={() => jumpTo(m.el)}
            >
              <span>{m.title}</span>
              <small>{m.snippet}</small>
            </button>
          ))}
        </div>
        {query && matches.length === 0 && (
          <p className="search-empty" id="searchEmpty" style={{ display: 'block' }}>
            No results. Try a different term.
          </p>
        )}
      </div>
    </div>
  );
}
