import Link from 'next/link';
import UpdatesHero from '@/modules/updates/components/UpdatesHero';
import UpdatesSection from '@/modules/updates/components/UpdatesSection';
import { getUpdatesBySection } from '@/modules/updates/lib/updates';

export const metadata = {
  title: 'Latest updates - Ketoy',
  description:
    "Platform and Ketoy SDK updates - release notes, new features, and what's coming next.",
};

export default function UpdatesPage() {
  const platform = getUpdatesBySection('platform');
  const sdk = getUpdatesBySection('sdk');

  return (
    <>
      <UpdatesHero />

      <UpdatesSection
        section="platform"
        title="Platform Updates"
        sub="Ketoy runtime, Cloud, and developer tooling."
        viewAllHref="/updates/platform"
        updates={platform}
        paddingTop="72px"
      />

      <UpdatesSection
        section="sdk"
        title="Ketoy SDK Updates"
        sub="Compose components, adapters and capabilities."
        viewAllHref="/updates/sdk"
        updates={sdk}
      />

      <section style={{ paddingTop: 16 }}>
        <div className="container">
          <div className="cta-banner">
            <div>
              <h2>Stay ahead of the release train.</h2>
              <p>
                Get a monthly digest of platform, SDK and tooling changes - straight from the team.
              </p>
            </div>
            <div className="right">
              <Link className="btn btn-ghost" href="/docs">Read the docs</Link>
              <Link className="btn btn-primary" href="/get-started">Get started</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
