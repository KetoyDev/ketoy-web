import DocPage from '@/modules/docs/components/DocPage';
import Content from '@/modules/docs/content/getting-started/first-screen.mdx';

export const metadata = {
  alternates: { canonical: '/docs/getting-started/first-screen' },
  title: 'Your First Screen',
  description: 'A Ketoy screen is a plain `@Composable` function annotated with',
};

export default function Page() {
  return (
    <DocPage eyebrow={"Getting started"} title={"Your First Screen"} lede={"A Ketoy screen is a plain `@Composable` function annotated with"}>
      <Content />
    </DocPage>
  );
}
