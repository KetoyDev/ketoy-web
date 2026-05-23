import DocPage from '@/modules/docs/components/DocPage';
import Content from '@/modules/docs/content/guides/networking.mdx';

export const metadata = {
  title: 'Networking · Ketoy Docs',
  description: 'KBC bundles can\'t open sockets directly — that would defeat the capability sandbox. Instead, you call **HTTP capabilities** that the host registers against Ktor + OkHttp (built-in) or against Retrofit / your own client (custom).',
};

export default function Page() {
  return (
    <DocPage eyebrow={"Guides"} title={"Networking"} lede={"KBC bundles can't open sockets directly \u2014 that would defeat the capability sandbox. Instead, you call **HTTP capabilities** that the host registers against Ktor + OkHttp (built-in) or against Retrofit / your own client (custom)."}>
      <Content />
    </DocPage>
  );
}
