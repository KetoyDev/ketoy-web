import DocPage from '@/modules/docs/components/DocPage';
import Content from '@/modules/docs/content/guides/navigation.mdx';

export const metadata = {
  alternates: { canonical: '/docs/guides/navigation' },
  title: 'Navigation',
  description: 'Navigation in a Ketoy app has two layers:',
};

export default function Page() {
  return (
    <DocPage eyebrow={"Guides"} title={"Navigation"} lede={"Navigation in a Ketoy app has two layers:"}>
      <Content />
    </DocPage>
  );
}
