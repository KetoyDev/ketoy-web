import DocPage from '@/modules/docs/components/DocPage';
import Content from '@/modules/docs/content/tooling/mcp.mdx';

export const metadata = {
  alternates: { canonical: '/docs/mcp' },
  title: 'Ketoy MCP',
  description:
    'The Ketoy MCP is a read-only knowledge layer for AI coding agents. It tells your agent what Ketoy supports, by what mechanism, and how to bridge the rest, so generated code compiles to KBC.',
};

export default function Page() {
  return (
    <DocPage
      eyebrow={'Tooling'}
      title={'Ketoy MCP'}
      lede={'A knowledge layer for AI coding agents. It tells your agent what Ketoy supports before it writes a line.'}
    >
      <Content />
    </DocPage>
  );
}
