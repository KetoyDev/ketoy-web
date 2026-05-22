import UpdatesListView from '@/modules/updates/components/UpdatesListView';
import { getUpdatesBySection } from '@/modules/updates/lib/updates';

export const metadata = {
  title: 'Platform updates - Ketoy',
  description:
    'Every change to the Ketoy runtime, Cloud, signing pipeline and developer tooling.',
};

const PlatformIcon = (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
    <path d="M12 3 3 7.5l9 4.5 9-4.5L12 3z" />
    <path d="M3 12l9 4.5L21 12" />
    <path d="M3 16.5L12 21l9-4.5" />
  </svg>
);

export default function PlatformUpdatesPage() {
  const updates = getUpdatesBySection('platform');
  return (
    <UpdatesListView
      sectionIcon={PlatformIcon}
      title="Platform updates"
      description="Every change to the Ketoy runtime, Cloud, signing pipeline and developer tooling."
      updates={updates}
    />
  );
}
