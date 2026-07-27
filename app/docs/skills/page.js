import DocPage from '@/modules/docs/components/DocPage';
import Content from '@/modules/docs/content/tooling/skills.mdx';

export const metadata = {
  alternates: { canonical: '/docs/skills' },
  title: 'Ketoy Skills',
  description:
    'Ketoy Skills ground an AI coding agent in how Ketoy actually works. Install them with the Ketoy CLI so generated code compiles to KBC.',
};

export default function Page() {
  return (
    <DocPage
      eyebrow={'Tooling'}
      title={'Ketoy Skills'}
      lede={'Ground your AI coding agent in how Ketoy actually works. Install with the CLI, before it writes a line.'}
    >
      <Content />
    </DocPage>
  );
}
