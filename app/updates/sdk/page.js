import UpdatesListView from '@/modules/updates/components/UpdatesListView';
import { getUpdatesBySection } from '@/modules/updates/lib/updates';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'SDK updates',
  description: 'Every change to the Ketoy SDK for Kotlin server-driven UI, Compose components, adapters, and capabilities.',
  path: '/updates/sdk',
});

const SdkIcon = (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 6l-5 6 5 6" />
    <path d="M15 6l5 6-5 6" />
    <path d="M13 4l-2 16" opacity="0.6" />
  </svg>
);

export default function SdkUpdatesPage() {
  const updates = getUpdatesBySection('sdk');
  return (
    <UpdatesListView
      sectionIcon={SdkIcon}
      title="SDK updates"
      description="Every change to the Ketoy SDK - Compose components, adapters and capabilities."
      updates={updates}
    />
  );
}
