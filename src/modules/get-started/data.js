export const subnavItems = [
  { id: 'requirements', label: 'Requirements' },
  { id: 'install', label: '1. Install the CLI' },
  { id: 'init', label: '2. Set up your project' },
  { id: 'deploy', label: '3. Ship over the air' },
  { id: 'more', label: 'The rest of the CLI' },
];

export const manualSubnavItems = [
  { id: 'requirements', label: 'Requirements' },
  { id: 'install', label: '1. Install' },
  { id: 'wire', label: '2. Wire the runtime' },
  { id: 'screen', label: '3. First screen' },
  { id: 'build', label: '4. Build & run' },
  { id: 'whats-next', label: "What's next" },
];

export const requirements = [
  ['Node.js', '18+'],
  ['Kotlin', '2.0.21+'],
  ['Android Gradle Plugin', '8.x +'],
  ['JDK', '17'],
  ['min SDK', '26'],
  ['Jetpack Compose', 'BOM 2024.10.00 +'],
];

export const manualRequirements = [
  ['Kotlin', '2.0.21'],
  ['Android Gradle Plugin', '8.0+ (Iguana or newer)'],
  ['JDK', '17'],
  ['min SDK', '26'],
  ['compile SDK', '35+'],
  ['Jetpack Compose', 'BOM 2024.10.00'],
];

export const continueCards = [
  { h: 'Architecture overview', p: 'The five-layer stack, and why the wire format is KBC bytecode rather than JSON.', cta: 'Read the spec', href: '/architecture' },
  { h: 'Supported features', p: 'Every Material3 adapter, every capability, every Compose token Ketoy ships with.', cta: 'See coverage', href: '/features' },
  { h: 'Custom adapters', p: 'Add your own components beyond Material3. The KSP processor handles the rest.', cta: 'Read the guide', href: '/docs' },
];
