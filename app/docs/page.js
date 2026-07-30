import DocsLayout from '@/modules/docs/components/DocsLayout';
import Overview from '@/modules/docs/content/overview.mdx';
import JsonLd from '@/components/JsonLd';
import { pageMetadata, breadcrumbSchema } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Ketoy Docs - Kotlin OTA',
  description:
    'Guides and reference for Ketoy, the Kotlin-native over-the-air (OTA) update framework for Android that also covers server-driven UI (SDUI). Compose UI, ViewModel, Canvas, capabilities, bundle signing, and more.',
  path: '/docs',
});

export default function DocsPage() {
  return (
    <DocsLayout>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Documentation', path: '/docs' },
        ])}
      />
      <Overview />
    </DocsLayout>
  );
}
