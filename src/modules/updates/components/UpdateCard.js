'use client';

export default function UpdateCard({ update, onOpen }) {
  return (
    <button
      className="update-card"
      type="button"
      data-update-id={update.id}
      data-update-section={update.section}
      data-kind={update.section}
      onClick={() => onOpen?.(update)}
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
    </button>
  );
}
