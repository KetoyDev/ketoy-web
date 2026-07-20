import Link from 'next/link';
import { notFound } from 'next/navigation';
import UpdateArticle from '@/modules/updates/components/UpdateArticle';
import JsonLd from '@/components/JsonLd';
import { getUpdatesBySection, getSectionUpdate } from '@/modules/updates/lib/updates';
import { pageMetadata, breadcrumbSchema } from '@/lib/seo';

const SECTION = 'platform';

export function generateStaticParams() {
  return getUpdatesBySection(SECTION).map((u) => ({ id: u.id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const update = getSectionUpdate(SECTION, id);
  if (!update) return pageMetadata({ title: 'Update not found', path: `/updates/${SECTION}/${id}` });

  return pageMetadata({
    title: `${update.title} - Ketoy platform updates`,
    description: update.summary,
    path: `/updates/${SECTION}/${update.id}`,
    type: 'article',
  });
}

export default async function PlatformUpdateDetailPage({ params }) {
  const { id } = await params;
  const update = getSectionUpdate(SECTION, id);
  if (!update) notFound();

  return (
    <div className="container update-detail-page">
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Updates', path: '/updates' },
          { name: 'Platform updates', path: '/updates/platform' },
          { name: update.title, path: `/updates/${SECTION}/${update.id}` },
        ])}
      />
      <p className="crumb">
        <Link href="/updates/platform">← Platform updates</Link>
      </p>
      <article className="update-detail-card">
        <UpdateArticle update={update} headingLevel="h1" />
      </article>
    </div>
  );
}
