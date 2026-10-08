'use client';

import { useState } from 'react';
import SupportModal from '@/modules/home/components/SupportModal';

/** Footer "Contact" entry: opens the support form in a modal. */
export default function ContactLink({ label = 'Contact' }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        {label}
      </button>
      <SupportModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
