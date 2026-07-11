import DocPage from '@/modules/docs/components/DocPage';
import Content from '@/modules/docs/content/guides/datastore.mdx';

export const metadata = {
  alternates: { canonical: '/docs/guides/datastore' },
  title: 'DataStore',
  description: 'DataStore-backed key-value storage is exposed to KBC through six built-in capabilities. Higher-typed flows (e.g. `Flow<Boolean>` for a "dark mode" toggle) go through custom app-specific capabilities.',
};

export default function Page() {
  return (
    <DocPage eyebrow={"Guides"} title={"DataStore"} lede={"DataStore-backed key-value storage is exposed to KBC through six built-in capabilities. Higher-typed flows (e.g. `Flow<Boolean>` for a \"dark mode\" toggle) go through custom app-specific capabilities."}>
      <Content />
    </DocPage>
  );
}
