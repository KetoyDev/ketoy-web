export function InfoCard({ title, children }) {
  return (
    <div className="info-card">
      {title && <h4>{title}</h4>}
      {children && <div className="info-card-body">{children}</div>}
    </div>
  );
}
