import DocPage from '@/modules/docs/components/DocPage';
import Content from '@/modules/docs/content/getting-started/bundle-and-sign.mdx';

export const metadata = {
  alternates: { canonical: '/docs/getting-started/bundle-and-sign' },
  title: 'Bundle & Sign',
  description: 'This page covers everything from key generation to remote bundle delivery: how `.ktx` is built, how it\'s signed, how the runtime verifies it, and how to ship updates to your users.',
};

export default function Page() {
  return (
    <DocPage eyebrow={"Getting started"} title={"Bundle & Sign"} lede={"This page covers everything from key generation to remote bundle delivery: how `.ktx` is built, how it's signed, how the runtime verifies it, and how to ship updates to your users."}>
      <Content />
    </DocPage>
  );
}
