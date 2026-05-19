import DocsLayout from '@/modules/docs/components/DocsLayout';
import Overview from '@/modules/docs/content/overview.mdx';

export const metadata = {
  title: 'Docs · Ketoy',
  description:
    'Ship Android app updates instantly with Ketoy. Push Kotlin, Compose UI, ViewModels, Coroutines, and business logic directly to users without Play Store delays.',
};

export default function DocsPage() {
  return (
    <DocsLayout>
      <Overview />
    </DocsLayout>
  );
}
