import DocPage from '@/modules/docs/components/DocPage';
import Content from '@/modules/docs/content/faq.mdx';
import JsonLd from '@/components/JsonLd';
import { faqSchema, breadcrumbSchema, pageMetadata } from '@/lib/seo';
import { OTA_SDUI_FAQ } from '@/lib/faq-ota';

const DESCRIPTION =
  'What is OTA, what is SDUI, is Ketoy OTA or SDUI, OTA vs SDUI, and whether you can update only Compose UI or only business logic. Answers about Kotlin over-the-air updates and server-driven UI on Android.';

export const metadata = pageMetadata({
  title: 'FAQ - Kotlin OTA and SDUI questions answered',
  description: DESCRIPTION,
  path: '/docs/faq',
});

export default function Page() {
  return (
    <DocPage
      eyebrow={'Documentation'}
      title={'FAQ'}
      wide
      hideToc
      lede={
        'What OTA and SDUI mean, where Ketoy sits between them, and how to work with it.'
      }
    >
      {/* FAQPage + breadcrumbs: rich-result eligibility on Google and clean,
          quotable Q&A pairs for AI assistants citing the OTA/SDUI answers. */}
      <JsonLd data={faqSchema(OTA_SDUI_FAQ)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Documentation', path: '/docs' },
          { name: 'FAQ', path: '/docs/faq' },
        ])}
      />
      <Content />
    </DocPage>
  );
}
