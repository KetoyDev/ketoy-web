import DocPage from '@/modules/docs/components/DocPage';
import Content from '@/modules/docs/content/guides/custom-adapter.mdx';

export const metadata = {
  title: 'Custom Adapter · Ketoy Docs',
  description: 'When you want KBC to render a `@Composable` that isn\'t in the standard Material3 catalog (or a Compose-domain constructor that isn\'t in the standard ctor set), you write an **adapter**.',
};

export default function Page() {
  return (
    <DocPage eyebrow={"Guides"} title={"Custom Adapter"} lede={"When you want KBC to render a `@Composable` that isn't in the standard Material3 catalog (or a Compose-domain constructor that isn't in the standard ctor set), you write an **adapter**."}>
      <Content />
    </DocPage>
  );
}
