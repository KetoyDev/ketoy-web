import DocPage from '@/modules/docs/components/DocPage';
import Content from '@/modules/docs/content/guides/compose-ui.mdx';

export const metadata = {
  alternates: { canonical: '/docs/guides/compose-ui' },
  title: 'Compose UI & State',
  description: 'Everything you can put on screen, plus how state, modifiers, icons, fonts, and images flow through KBC. Every example below compiles against the standard Material3 adapter catalog shipped with',
};

export default function Page() {
  return (
    <DocPage eyebrow={"Guides"} title={"Compose UI & State"} lede={"Everything you can put on screen, plus how state, modifiers, icons, fonts, and images flow through KBC. Every example below compiles against the standard Material3 adapter catalog shipped with"}>
      <Content />
    </DocPage>
  );
}
