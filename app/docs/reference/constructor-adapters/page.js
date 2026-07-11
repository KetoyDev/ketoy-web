import DocPage from '@/modules/docs/components/DocPage';
import Content from '@/modules/docs/content/reference/constructor-adapters.mdx';

export const metadata = {
  alternates: { canonical: '/docs/reference/constructor-adapters' },
  title: 'Constructor Adapters',
  description: 'Complex Compose-domain types (`TextStyle`, `KeyboardOptions`,',
};

export default function Page() {
  return (
    <DocPage eyebrow={"Reference"} title={"Constructor Adapters"} lede={"Complex Compose-domain types (`TextStyle`, `KeyboardOptions`,"}>
      <Content />
    </DocPage>
  );
}
