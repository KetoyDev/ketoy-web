import DocsSidebar from './DocsSidebar';

export default function DocsLayout({ children }) {
  return (
    <div className="container">
      <div className="docs-layout">
        <DocsSidebar />
        <article className="docs-body">{children}</article>
      </div>
    </div>
  );
}
