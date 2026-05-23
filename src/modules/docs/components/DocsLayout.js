import DocsSidebar from './DocsSidebar';
import TocNav from './TocNav';

export default function DocsLayout({ children, hideToc = false }) {
  return (
    <div className="docs-layout-wrap">
      <div className={`docs-layout${hideToc ? ' no-toc' : ''}`}>
        <DocsSidebar />
        <article className="docs-body">{children}</article>
        {!hideToc && <TocNav />}
      </div>
    </div>
  );
}
