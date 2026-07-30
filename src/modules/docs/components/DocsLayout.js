import DocsSidebar from './DocsSidebar';
import TocNav from './TocNav';

// `wide` drops the prose measure on the body. Use it for pages whose content
// is card/table-shaped rather than paragraphs (the FAQ accordion), where the
// 960px reading column just leaves dead space to the right.
export default function DocsLayout({ children, hideToc = false, wide = false }) {
  return (
    <div className="docs-layout-wrap">
      <div className={`docs-layout${hideToc ? ' no-toc' : ''}`}>
        <DocsSidebar />
        <article className={`docs-body${wide ? ' docs-body--wide' : ''}`}>{children}</article>
        {!hideToc && <TocNav />}
      </div>
    </div>
  );
}
