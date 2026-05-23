import DocPage from '@/modules/docs/components/DocPage';
import Content from '@/modules/docs/content/reference/compose-adapters.mdx';

export const metadata = {
  title: 'Compose Adapters · Ketoy Docs',
  description: 'The catalogued composables KBC can render today. IDs come from',
};

export default function Page() {
  return (
    <DocPage eyebrow={"Reference"} title={"Compose Adapters"} lede={"The catalogued composables KBC can render today. IDs come from"}>
      <Content />
    </DocPage>
  );
}
