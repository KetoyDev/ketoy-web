import DocsLayout from './DocsLayout';

// Render a plain string that may contain `inline code` spans, turning each
// backtick-wrapped segment into a real <code> chip (so the background box
// shows) instead of printing literal backtick characters.
function renderInline(text) {
  if (typeof text !== 'string' || !text.includes('`')) return text;
  return text.split(/(`[^`]+`)/g).map((part, i) => {
    if (part.startsWith('`') && part.endsWith('`') && part.length > 1) {
      return <code key={i}>{part.slice(1, -1)}</code>;
    }
    return part;
  });
}

export default function DocPage({ eyebrow, title, lede, hideToc = false, wide = false, children }) {
  return (
    <DocsLayout hideToc={hideToc} wide={wide}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      {title && <h1 style={{ marginTop: 8 }}>{renderInline(title)}</h1>}
      {lede && (
        <p
          className="docs-lede"
          style={{
            color: 'var(--muted)',
            fontSize: 19,
            lineHeight: 1.5,
            marginTop: 8,
            marginBottom: 32,
            maxWidth: 720,
          }}
        >
          {renderInline(lede)}
        </p>
      )}
      {children}
    </DocsLayout>
  );
}
