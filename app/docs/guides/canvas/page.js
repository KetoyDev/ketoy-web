import DocPage from '@/modules/docs/components/DocPage';
import Content from '@/modules/docs/content/guides/canvas.mdx';

export const metadata = {
  alternates: { canonical: '/docs/guides/canvas' },
  title: 'Canvas & Drawing',
  description: 'Write an ordinary Compose Canvas with real draw commands - shapes, paths, gradients, transforms, and text - fully sandboxed and rendered natively from a KBC bundle.',
};

export default function Page() {
  return (
    <DocPage eyebrow={"Guides"} title={"Canvas & Drawing"} lede={"Write an ordinary Compose `Canvas` with real draw commands (shapes, paths, gradients, transforms, and text), fully sandboxed and rendered natively from a KBC bundle."}>
      <Content />
    </DocPage>
  );
}
