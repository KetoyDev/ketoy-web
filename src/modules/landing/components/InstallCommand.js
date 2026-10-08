'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * The hero's install line. One click copies the command; the bar answers
 * with a short "Copied" state so the user never wonders if it worked.
 */
export default function InstallCommand({ command }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef(0);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), 1800);
    } catch (_) {
      // Clipboard can be unavailable; the command is still selectable.
    }
  };

  return (
    <>
      <button
        type="button"
        className={`kt-install-bar${copied ? ' is-copied' : ''}`}
        onClick={copy}
        aria-label={copied ? 'Copied' : `Copy ${command}`}
      >
        <span className="kt-install-prompt" aria-hidden="true">$</span>
        <code>{command}</code>
        <span className="kt-install-action" aria-hidden="true">
          <svg className="kt-install-ic-copy" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="9" y="9" width="11" height="11" rx="2.5" />
            <path d="M5 15V5a2 2 0 0 1 2-2h10" />
          </svg>
          <svg className="kt-install-ic-check" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </span>
        <span className="kt-install-toast" role="status" aria-live="polite">
          {copied ? 'Copied to clipboard' : ''}
        </span>
      </button>
    </>
  );
}
