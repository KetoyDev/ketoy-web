import DocPage from '@/modules/docs/components/DocPage';
import Content from '@/modules/docs/content/guides/viewmodel.mdx';

export const metadata = {
  alternates: { canonical: '/docs/guides/viewmodel' },
  title: 'ViewModels, State & Business Logic',
  description: 'Write idiomatic Kotlin ViewModels, data class UI state, a real StateFlow, viewModelScope.launch, constructor-injected repositories, and the full set of Compose effects, compiled into a .ktx bundle that runs natively on device.',
};

export default function Page() {
  return (
    <DocPage eyebrow={"Guides"} title={"ViewModels, State & Business Logic"} lede={"Write idiomatic Kotlin ViewModels, `data class` UI state, a real `StateFlow`, `viewModelScope.launch`, constructor-injected repositories, and the full set of Compose effects, compiled into a `.ktx` bundle that runs natively on device."}>
      <Content />
    </DocPage>
  );
}
