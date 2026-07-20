export default function UpdateArticle({ update, headingLevel = 'h2' }) {
  const Heading = headingLevel;
  return (
    <>
      <header className="update-modal-head">
        <span className={`uchip ${update.chipClass}`}>
          <span className="uchip-dot"></span>
          {update.chip}
        </span>
        <Heading id={`update-${update.id}-title`}>{update.title}</Heading>
        <p className="update-modal-meta">
          {update.date} · {update.tag}
        </p>
      </header>
      <div className="update-modal-body">{update.body}</div>
    </>
  );
}
