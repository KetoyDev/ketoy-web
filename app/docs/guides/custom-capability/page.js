import DocPage from '@/modules/docs/components/DocPage';
import Content from '@/modules/docs/content/guides/custom-capability.mdx';

export const metadata = {
  title: 'Custom Capability · Ketoy Docs',
  description: 'Capabilities are the **only** way KBC reaches host code. Anything you want KBC to do that isn\'t already built-in — proprietary SDK, custom SDK call, hardware sensor, third-party API — wraps as a capability.',
};

export default function Page() {
  return (
    <DocPage eyebrow={"Guides"} title={"Custom Capability"} lede={"Capabilities are the **only** way KBC reaches host code. Anything you want KBC to do that isn't already built-in \u2014 proprietary SDK, custom SDK call, hardware sensor, third-party API \u2014 wraps as a capability."}>
      <Content />
    </DocPage>
  );
}
