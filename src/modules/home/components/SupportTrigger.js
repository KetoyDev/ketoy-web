'use client';

import { useState } from 'react';
import SupportModal from './SupportModal';

export default function SupportTrigger() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="support-trigger-row">
        <p className="blurb">
          <b>Stuck on something, evaluating Ketoy for your team, or wondering if your weird in-house SDK is supported?</b>
          {' '}We answer every email. Usually within the same day. Sometimes faster than your Play Store review.
        </p>
        <button type="button" className="btn btn-primary" onClick={() => setOpen(true)}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
          </svg>
          Contact support
        </button>
      </div>
      <SupportModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
