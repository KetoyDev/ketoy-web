import DocPage from '@/modules/docs/components/DocPage';
import Content from '@/modules/docs/content/guides/kotlin-language.mdx';

export const metadata = {
  title: 'Kotlin Language · Ketoy Docs',
  description: 'Ketoy executes a well-defined **subset** of Kotlin at runtime. This page covers what you can use inside a `@KetoyComposable` / `@KetoyEntryPoint` / `@KetoyViewModel` and what the compiler rejects.',
};

export default function Page() {
  return (
    <DocPage eyebrow={"Guides"} title={"Kotlin Language"} lede={"Ketoy executes a well-defined **subset** of Kotlin at runtime. This page covers what you can use inside a `@KetoyComposable` / `@KetoyEntryPoint` / `@KetoyViewModel` and what the compiler rejects."}>
      <Content />
    </DocPage>
  );
}
