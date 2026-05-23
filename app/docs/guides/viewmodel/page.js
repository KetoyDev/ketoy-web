import DocPage from '@/modules/docs/components/DocPage';
import Content from '@/modules/docs/content/guides/viewmodel.mdx';

export const metadata = {
  title: 'ViewModel · Ketoy Docs',
  description: 'KBC ViewModels are real Android `ViewModel`s — they survive configuration change, scope coroutines to `viewModelScope`, and persist a filtered state subset across process death via `SavedStateHandle`.',
};

export default function Page() {
  return (
    <DocPage eyebrow={"Guides"} title={"ViewModel"} lede={"KBC ViewModels are real Android `ViewModel`s \u2014 they survive configuration change, scope coroutines to `viewModelScope`, and persist a filtered state subset across process death via `SavedStateHandle`."}>
      <Content />
    </DocPage>
  );
}
