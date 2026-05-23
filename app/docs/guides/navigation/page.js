import DocPage from '@/modules/docs/components/DocPage';
import Content from '@/modules/docs/content/guides/navigation.mdx';

export const metadata = {
  title: 'Navigation · Ketoy Docs',
  description: 'Navigation in a Ketoy app has two layers:',
};

export default function Page() {
  return (
    <DocPage eyebrow={"Guides"} title={"Navigation"} lede={"Navigation in a Ketoy app has two layers:"}>
      <Content />
    </DocPage>
  );
}
