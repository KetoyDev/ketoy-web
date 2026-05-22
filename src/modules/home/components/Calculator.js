'use client';

import { useMemo, useState } from 'react';

const fmt = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

function verdict(days) {
  if (days < 30) return 'Not bad, comparatively. Still - what would your team ship with that month back?';
  if (days < 90) return 'That’s a quarter of a year, gone. Refreshing the Play Console. We’re sure your team enjoyed it.';
  if (days < 180) return 'That’s more than half a year your team spent waiting on someone else’s queue.';
  if (days < 365) return 'That’s most of a calendar year staring at a progress bar. Every. Single. Release.';
  return 'At this point the waiting is the job. Genuinely - install Ketoy.';
}

export default function Calculator() {
  const [rpm, setRpm] = useState(2);
  const [wpd, setWpd] = useState(1.5);
  const [eng, setEng] = useState(3);
  const [rate, setRate] = useState(500);

  const derived = useMemo(() => {
    const releases = rpm * 12;
    const totalDays = releases * wpd;
    const dollars = totalDays * eng * rate;
    const ketoyMinutes = Math.round(releases * 4);
    return { totalDays, dollars, ketoyMinutes };
  }, [rpm, wpd, eng, rate]);

  return (
    <div className="calc-wrap">
      <div className="calc-card">
        <div>
          <div className="control-label">
            <span>Releases per month <small style={{ fontWeight: 300, color: 'var(--muted-2)' }}>(across all your Android apps)</small></span>
            <b>{rpm}</b>
          </div>
          <input type="range" min="1" max="30" value={rpm} onChange={(e) => setRpm(+e.target.value)} />
        </div>
        <div>
          <div className="control-label">
            <span>Average review wait - days per release</span>
            <b>{wpd}</b>
          </div>
          <input type="range" min="1" max="14" step="0.5" value={wpd} onChange={(e) => setWpd(+e.target.value)} />
        </div>
        <div>
          <div className="control-label">
            <span>Engineers blocked on a release going out</span>
            <b>{eng}</b>
          </div>
          <input type="range" min="1" max="20" value={eng} onChange={(e) => setEng(+e.target.value)} />
        </div>
        <div>
          <div className="control-label">
            <span>Loaded engineer cost per day, USD</span>
            <b>${fmt(rate)}</b>
          </div>
          <input type="range" min="200" max="3000" step="100" value={rate} onChange={(e) => setRate(+e.target.value)} />
        </div>
        <div style={{ fontFamily: 'var(--font-ui)', fontSize: 13, color: 'var(--muted)', lineHeight: 1.5, paddingTop: 8, borderTop: '1px solid var(--border)' }}>
          Yes, of course this is back-of-the-napkin. Use real numbers from{' '}
          <code style={{ fontFamily: 'var(--font-mono)', fontSize: 12.5, background: 'var(--surface)', padding: '1px 6px', borderRadius: 4 }}>play.google.com</code>{' '}
          if you want a worse number.
        </div>
      </div>

      <div className="calc-out">
        <div className="verdict">Total this year</div>
        <div className="big-num">
          <span>{fmt(derived.totalDays)}</span><small>days lost waiting for review</small>
        </div>
        <div className="blocked-line">
          <span className="blocked-pill">
            <span className="blk-dot" aria-hidden="true"></span>
            <b>{eng}</b>&nbsp;engineers blocked for <b>{fmt(derived.totalDays)}</b>&nbsp;days
          </span>
        </div>
        <p className="verdict-line">{verdict(derived.totalDays)}</p>
        <div className="ketoy-line">
          <span>Same updates, shipped via Ketoy</span>
          <b>~ {derived.ketoyMinutes} min</b>
        </div>
        <div style={{ marginTop: 14, fontFamily: 'var(--font-mono)', fontSize: 13, color: '#9d9b95' }}>
          Annual cost of waiting: <span style={{ color: '#3DDC84', fontWeight: 500 }}>${fmt(derived.dollars)}</span>
        </div>
      </div>
    </div>
  );
}
