import DocPage from '@/modules/docs/components/DocPage';
import Content from '@/modules/docs/content/getting-started/installation.mdx';

export const metadata = {
  title: 'Installation · Ketoy Docs',
  description: 'This page walks you through adding Ketoy `0.3.4-alpha` to an Android project — either via the **`ketoy` CLI** (fastest path, recommended for new projects) or by editing Gradle files yourself.',
};

export default function Page() {
  return (
    <DocPage eyebrow={"Getting started"} title={"Installation"} lede={"This page walks you through adding Ketoy `0.3.4-alpha` to an Android project \u2014 either via the **`ketoy` CLI** (fastest path, recommended for new projects) or by editing Gradle files yourself."}>
      <Content />
    </DocPage>
  );
}
