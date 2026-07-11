import DocPage from '@/modules/docs/components/DocPage';
import Content from '@/modules/docs/content/tooling/cli.mdx';

export const metadata = {
  alternates: { canonical: '/docs/cli' },
  title: 'Ketoy CLI',
  description:
    'The ketoy CLI runs your whole Ketoy workflow from the terminal: set up a project, build a signed .ktx bundle, push it to Ketoy Cloud, and roll back a release.',
};

export default function Page() {
  return (
    <DocPage
      eyebrow={'Tooling'}
      title={'Ketoy CLI'}
      lede={'Set up a project, build a signed bundle, and ship it to Ketoy Cloud. Your whole workflow from the terminal.'}
    >
      <Content />
    </DocPage>
  );
}
