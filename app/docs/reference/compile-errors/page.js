import DocPage from '@/modules/docs/components/DocPage';
import Content from '@/modules/docs/content/reference/compile-errors.mdx';

export const metadata = {
  title: 'Compile Errors · Ketoy Docs',
  description: 'Every error the Ketoy compiler plugin can emit. Each variant follows the same shape: a one-line headline starting with `KetoyBC:`, an optional breadcrumb (`Reached via: ...`) when the violation is in a transitive helper, a one-sentence explanation, a `Fix:` block with runnable code, and a `Docs:` trailer.',
};

export default function Page() {
  return (
    <DocPage eyebrow={"Reference"} title={"Compile Errors"} lede={"Every error the Ketoy compiler plugin can emit. Each variant follows the same shape: a one-line headline starting with `KetoyBC:`, an optional breadcrumb (`Reached via: ...`) when the violation is in a transitive helper, a one-sentence explanation, a `Fix:` block with runnable code, and a `Docs:` trailer."}>
      <Content />
    </DocPage>
  );
}
