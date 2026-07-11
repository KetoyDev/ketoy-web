import DocPage from '@/modules/docs/components/DocPage';
import Content from '@/modules/docs/content/reference/ktx-bundle-format.mdx';

export const metadata = {
  alternates: { canonical: '/docs/reference/ktx-bundle-format' },
  title: '`.ktx` Bundle Format',
  description: '`.ktx` Bundle Format',
};

export default function Page() {
  return (
    <DocPage eyebrow={"Reference"} title={"`.ktx` Bundle Format"}>
      <Content />
    </DocPage>
  );
}
