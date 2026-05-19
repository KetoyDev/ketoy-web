const ICONS = {
  info: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8v5M12 16h.01" />
    </svg>
  ),
  warn: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 3 2 21h20L12 3z" />
      <path d="M12 10v5M12 18h.01" />
    </svg>
  ),
};

export default function Callout({ kind = 'info', title, children, style }) {
  return (
    <div className={`callout callout-${kind}`} style={style}>
      <span className="callout-ico" aria-hidden="true">{ICONS[kind]}</span>
      <div>
        {title && <h4>{title}</h4>}
        {children}
      </div>
    </div>
  );
}
