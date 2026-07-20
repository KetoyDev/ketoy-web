'use client';

import Link from 'next/link';

export default function UpdateCard({ update, onOpen }) {
  return (
    <Link
      href={`/updates/${update.section}/${update.id}`}
      className="update-card"
      data-update-id={update.id}
      data-update-section={update.section}
      data-kind={update.section}
      onClick={(e) => {
        // Crawlers and no-JS visitors follow the real href to the full
        // update page; JS-enabled clicks stay in-page via the drawer.
        e.preventDefault();
        onOpen?.(update);
      }}
    >
      <div className="row1">
        <span className={`uchip ${update.chipClass}`}>
          <span className="uchip-dot"></span>
          {update.chip}
        </span>
      </div>
      <h3>{update.title}</h3>
      <p>{update.summary}</p>
      <div className="meta">
        <span>{update.date}</span>
        <span className="dot"></span>
        <span>{update.metaTag || update.tag}</span>
      </div>
    </Link>
  );
}
