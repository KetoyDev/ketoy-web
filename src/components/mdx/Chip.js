export function Chip({ children, tone }) {
  return <span className={`chip${tone ? ` chip-${tone}` : ''}`}>{children}</span>;
}

export function ChipRow({ children }) {
  return <div className="chip-row">{children}</div>;
}
