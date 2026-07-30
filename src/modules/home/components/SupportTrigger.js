'use client';

import { useState } from 'react';
import SupportModal from './SupportModal';

export default function SupportTrigger() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="support-cta" data-reveal>
        <span className="support-cta-icon" aria-hidden="true">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
          </svg>
        </span>
        <div className="support-cta-body">
          <span className="eyebrow">Support</span>
          <h3>Talk to the people who build it.</h3>
          <p>
            Stuck on something, evaluating Ketoy for your team, or wondering whether your
            in-house SDK is supported? We answer every email, usually the same day.
          </p>
        </div>
        <button type="button" className="btn btn-primary" onClick={() => setOpen(true)}>
          Contact support
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M13 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      <SupportModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
