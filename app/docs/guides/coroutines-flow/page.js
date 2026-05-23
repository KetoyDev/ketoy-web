import DocPage from '@/modules/docs/components/DocPage';
import Content from '@/modules/docs/content/guides/coroutines-flow.mdx';

export const metadata = {
  title: 'Coroutines & Flow · Ketoy Docs',
  description: 'KBC has a full coroutine runtime — `suspend` functions, structured concurrency, `withContext`, `async` / `await`, `Flow` operators, and',
};

export default function Page() {
  return (
    <DocPage eyebrow={"Guides"} title={"Coroutines & Flow"} lede={"KBC has a full coroutine runtime \u2014 `suspend` functions, structured concurrency, `withContext`, `async` / `await`, `Flow` operators, and"}>
      <Content />
    </DocPage>
  );
}
