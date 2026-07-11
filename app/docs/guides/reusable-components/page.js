import DocPage from '@/modules/docs/components/DocPage';
import Content from '@/modules/docs/content/guides/reusable-components.mdx';

export const metadata = {
  alternates: { canonical: '/docs/guides/reusable-components' },
  title: 'Reusable Components',
  description: 'Extract non-entry @KetoyComposable helpers and call them with callback lambdas, content slots, data class params, lists, and enums to keep KBC screens DRY.',
};

export default function Page() {
  return (
    <DocPage eyebrow={"Guides"} title={"Reusable Components"} lede={"Extract a non-entry `@KetoyComposable` helper and call it with callback lambdas, content slots, `data class` params, and lists to keep KBC screens DRY."}>
      <Content />
    </DocPage>
  );
}
