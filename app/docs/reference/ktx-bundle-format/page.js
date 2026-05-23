import DocPage from '@/modules/docs/components/DocPage';
import Content from '@/modules/docs/content/reference/ktx-bundle-format.mdx';

export const metadata = {
  title: '`.ktx` Bundle Format · Ketoy Docs',
  description: '`.ktx` Bundle Format',
};

export default function Page() {
  return (
    <DocPage eyebrow={"Reference"} title={"`.ktx` Bundle Format"}>
      <Content />
    </DocPage>
  );
}
