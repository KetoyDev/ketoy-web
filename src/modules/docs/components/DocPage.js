import DocsLayout from './DocsLayout';

export default function DocPage({ eyebrow, title, lede, hideToc = false, children }) {
  return (
    <DocsLayout hideToc={hideToc}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      {title && <h1 style={{ marginTop: 8 }}>{title}</h1>}
      {lede && (
        <p
          style={{
            color: 'var(--muted)',
            fontSize: 19,
            lineHeight: 1.5,
            marginTop: 8,
            marginBottom: 32,
            maxWidth: 720,
          }}
        >
          {lede}
        </p>
      )}
      {children}
    </DocsLayout>
  );
}
