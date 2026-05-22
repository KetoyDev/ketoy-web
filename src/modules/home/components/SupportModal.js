'use client';

import { useEffect, useRef, useState } from 'react';

export default function SupportModal({ open, onClose }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const nameRef = useRef(null);

  useEffect(() => {
    if (!open) {
      setError('');
      setSuccess(false);
      return;
    }
    document.body.style.overflow = 'hidden';
    const t = setTimeout(() => nameRef.current?.focus(), 60);
    function onKey(e) { if (e.key === 'Escape') onClose?.(); }
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      clearTimeout(t);
      document.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  async function onSubmit(e) {
    e.preventDefault();
    setError('');
    if (!name.trim() || !email.trim() || !query.trim()) {
      setError('Please fill out all fields.');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to_email: email.trim(),
          name: name.trim(),
          country: query.trim(),
        }),
      });
      if (!res.ok) throw new Error('Request failed');
      await res.json().catch(() => ({}));
      setSuccess(true);
      setName(''); setEmail(''); setQuery('');
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className={`support-modal-backdrop${open ? ' open' : ''}`}
      role="dialog"
      aria-modal="true"
      onClick={(e) => { if (e.currentTarget === e.target) onClose?.(); }}
    >
      <div className="support-modal">
        <button type="button" className="close-x" aria-label="Close" onClick={onClose}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>

        {!success && (
          <div>
            <h3>Talk to a human</h3>
            <p className="modal-sub">
              Drop us a note. Real engineers read these - no Tier-1 ticket triage, no chatbots.
              (We have an AI that ships code. Not one that answers email.)
            </p>
            {error && (
              <p className="form-error" style={{ display: 'block' }} role="status" aria-live="polite">{error}</p>
            )}

            <form onSubmit={onSubmit} noValidate>
              <div className="field">
                <label htmlFor="sName">Name</label>
                <input ref={nameRef} type="text" id="sName" name="name" required autoComplete="name" placeholder="Ada Lovelace" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="field">
                <label htmlFor="sEmail">Email</label>
                <input type="email" id="sEmail" name="email" required autoComplete="email" placeholder="ada@yourapp.dev" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="field">
                <label htmlFor="sQuery">Your query</label>
                <textarea id="sQuery" name="query" required placeholder="e.g. We have a Compose Multiplatform setup with custom Material3 themeing - does Ketoy work with that?" value={query} onChange={(e) => setQuery(e.target.value)} />
              </div>
              <div className="modal-actions">
                <button type="button" className="btn btn-ghost" onClick={onClose}>Cancel</button>
                <button type="submit" className="btn btn-primary" disabled={loading} aria-busy={loading}>
                  {loading ? 'Sending...' : (
                    <>
                      Send message
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M13 5l7 7-7 7" />
                      </svg>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        {success && (
          <div className="success">
            <div className="check" aria-hidden="true">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="m5 12 5 5L20 7" />
              </svg>
            </div>
            <h4>Got it - we’ll be in touch.</h4>
            <p>You’ll usually hear back within a few hours.<br />Worst case, by tomorrow morning your time.</p>
            <button type="button" className="btn btn-ghost" onClick={onClose}>Close</button>
          </div>
        )}
      </div>
    </div>
  );
}
