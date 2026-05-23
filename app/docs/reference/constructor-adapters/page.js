import DocPage from '@/modules/docs/components/DocPage';
import Content from '@/modules/docs/content/reference/constructor-adapters.mdx';

export const metadata = {
  title: 'Constructor Adapters · Ketoy Docs',
  description: 'Complex Compose-domain types (`TextStyle`, `KeyboardOptions`,',
};

export default function Page() {
  return (
    <DocPage eyebrow={"Reference"} title={"Constructor Adapters"} lede={"Complex Compose-domain types (`TextStyle`, `KeyboardOptions`,"}>
      <Content />
    </DocPage>
  );
}
