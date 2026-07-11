import DocPage from '@/modules/docs/components/DocPage';
import Content from '@/modules/docs/content/reference/compose-adapters.mdx';

export const metadata = {
  alternates: { canonical: '/docs/reference/compose-adapters' },
  title: 'Compose Adapters',
  description: 'The catalogued composables KBC can render today. IDs come from',
};

export default function Page() {
  return (
    <DocPage eyebrow={"Reference"} title={"Compose Adapters"} lede={"The catalogued composables KBC can render today. IDs come from"}>
      <Content />
    </DocPage>
  );
}
