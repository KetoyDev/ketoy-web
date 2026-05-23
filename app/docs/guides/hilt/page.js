import DocPage from '@/modules/docs/components/DocPage';
import Content from '@/modules/docs/content/guides/hilt.mdx';

export const metadata = {
  title: 'Hilt · Ketoy Docs',
  description: 'The `dev.ketoy.vm:ketoy-hilt` AAR wires Ketoy into Hilt\'s',
};

export default function Page() {
  return (
    <DocPage eyebrow={"Guides"} title={"Hilt"} lede={"The `dev.ketoy.vm:ketoy-hilt` AAR wires Ketoy into Hilt's"}>
      <Content />
    </DocPage>
  );
}
