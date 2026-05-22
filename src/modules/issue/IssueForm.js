'use client';

import { useState } from 'react';

export default function IssueForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setError('');
    if (!name.trim() || !email.trim() || !query.trim()) {
      setError('Please fill out all fields.');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/issue', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          name: name.trim(),
          query: query.trim(),
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

  if (success) {
    return (
      <div className="issue-success">
        <div className="check" aria-hidden="true">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="m5 12 5 5L20 7" />
          </svg>
        </div>
        <h4>Report received - thank you.</h4>
        <p>We'll investigate and follow up at the email you provided. You'll usually hear back within a business day.</p>
        <button type="button" className="btn btn-ghost" onClick={() => setSuccess(false)}>
          Submit another report
        </button>
      </div>
    );
  }

  return (
    <form className="issue-form" onSubmit={onSubmit} noValidate>
      {error && (
        <p className="form-error" role="status" aria-live="polite">{error}</p>
      )}
      <div className="field">
        <label htmlFor="iName">Name</label>
        <input
          type="text"
          id="iName"
          name="name"
          required
          autoComplete="name"
          placeholder="Ada Lovelace"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="field">
        <label htmlFor="iEmail">Email</label>
        <input
          type="email"
          id="iEmail"
          name="email"
          required
          autoComplete="email"
          placeholder="ada@yourapp.dev"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="field">
        <label htmlFor="iQuery">Describe the issue</label>
        <textarea
          id="iQuery"
          name="query"
          required
          rows={5}
          placeholder="What happened, what did you expect, and which SDK / plugin version are you on? Paste a stack trace if you have one."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <div className="issue-form-actions">
        <button type="submit" className="btn btn-primary" disabled={loading} aria-busy={loading}>
          {loading ? 'Submitting...' : (
            <>
              Submit report
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
