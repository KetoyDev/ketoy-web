'use client';

import { useEffect } from 'react';
import UpdateArticle from './UpdateArticle';

export default function UpdateDrawer({ update, onClose }) {
  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') onClose?.();
    }
    if (update) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', onKey);
    }
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
    };
  }, [update, onClose]);

  const open = !!update;

  return (
    <div
      className={`update-modal-backdrop${open ? ' open' : ''}`}
      onClick={(e) => {
        if (e.currentTarget === e.target) onClose?.();
      }}
    >
      <aside
        className="update-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={update ? `update-${update.id}-title` : undefined}
      >
        <button
          type="button"
          className="update-modal-close"
          aria-label="Close"
          onClick={onClose}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>

        {update && <UpdateArticle update={update} headingLevel="h2" />}
      </aside>
    </div>
  );
}
