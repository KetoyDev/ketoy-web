import DocPage from '@/modules/docs/components/DocPage';
import Content from '@/modules/docs/content/faq.mdx';

export const metadata = {
  title: 'FAQ · Ketoy Docs',
  description: 'Common questions about Ketoy, what it is, what it isn\'t, and how to work with it.',
};

export default function Page() {
  return (
    <DocPage eyebrow={"Documentation"} title={"FAQ"} lede={"Common questions about Ketoy, what it is, what it isn't, and how to work with it."}>
      <Content />
    </DocPage>
  );
}
