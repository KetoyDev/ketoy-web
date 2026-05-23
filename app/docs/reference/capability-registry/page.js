import DocPage from '@/modules/docs/components/DocPage';
import Content from '@/modules/docs/content/reference/capability-registry.mdx';

export const metadata = {
  title: 'Capability Registry · Ketoy Docs',
  description: 'The full table of standard library `CapabilityIds` plus the app-specific range. Every ID below is from',
};

export default function Page() {
  return (
    <DocPage eyebrow={"Reference"} title={"Capability Registry"} lede={"The full table of standard library `CapabilityIds` plus the app-specific range. Every ID below is from"}>
      <Content />
    </DocPage>
  );
}
