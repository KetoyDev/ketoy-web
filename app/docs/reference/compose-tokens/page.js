import DocPage from '@/modules/docs/components/DocPage';
import Content from '@/modules/docs/content/reference/compose-tokens.mdx';

export const metadata = {
  alternates: { canonical: '/docs/reference/compose-tokens' },
  title: 'Compose Tokens',
  description: 'The full table of Compose property-getter reads the compiler plugin resolves into inline byte-tagged literals, no `CONSTRUCT_JVM` opcode, no host adapter call, just a few bytes in the bundle.',
};

export default function Page() {
  return (
    <DocPage eyebrow={"Reference"} title={"Compose Tokens"} lede={"The full table of Compose property-getter reads the compiler plugin resolves into inline byte-tagged literals \u2014 no `CONSTRUCT_JVM` opcode, no host adapter call, just a few bytes in the bundle."}>
      <Content />
    </DocPage>
  );
}
