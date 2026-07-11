import DocPage from '@/modules/docs/components/DocPage';
import Content from '@/modules/docs/content/guides/room.mdx';

export const metadata = {
  alternates: { canonical: '/docs/guides/room' },
  title: 'Room',
  description: 'Room DAOs live host-side. KBC reaches them through **`KBCRoomBridge`**, a DSL that wraps a DAO method as a capability at an app-specific ID (`0x4000+`).',
};

export default function Page() {
  return (
    <DocPage eyebrow={"Guides"} title={"Room"} lede={"Room DAOs live host-side. KBC reaches them through **`KBCRoomBridge`** \u2014 a DSL that wraps a DAO method as a capability at an app-specific ID (`0x4000+`)."}>
      <Content />
    </DocPage>
  );
}
