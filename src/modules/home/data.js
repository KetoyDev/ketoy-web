export const heroStats = [
  { v: <>&lt; 50<small>ms</small></>, l: 'Load, verify, and parse' },
  { v: <>&lt; 100<small>ms</small></>, l: 'First frame, cold' },
  { v: <>~4<small>KB</small></>, l: 'A full checkout flow' },
  { v: <>20<small>×</small></>, l: 'Smaller than JSON SDUI' },
];

export const supportCards = [
  { tag: 'UI', h: 'Compose and Material 3', p: 'All 35 Material 3 components. Every parameter included.', chips: ['Scaffold','LazyColumn','OutlinedTextField','Button','TopAppBar','AlertDialog','+29 more'] },
  { tag: 'Language', h: 'Plain Kotlin', p: 'Data classes, sealed classes, extensions, and lambdas. Real Kotlin, compiled to bytecode.', chips: ['data class','sealed','when','extensions','closures'] },
  { tag: 'Async', h: 'Coroutines and Flow', p: 'launch, async, withContext, and 9 Flow operators. Structured concurrency included.', chips: ['launch','async','StateFlow','collectAsState','debounce'] },
  { tag: 'State', h: 'ViewModel', p: 'A real Android ViewModel. It survives config changes and works with Hilt.', chips: ['viewModelScope','SavedStateHandle','@HiltViewModel','dispatch()'] },
  { tag: 'I/O', h: 'Networking and storage', p: 'HTTP, DataStore, Room, and navigation. 67 capabilities built in.', chips: ['HTTP','DataStore','Room','NavController','+ your SDKs'] },
  { tag: 'DI', h: 'Hilt', p: 'Drop it in. @Inject works exactly as before.', chips: ['@Inject','@HiltViewModel','@Module','dev overlay'] },
];

export const whatIsCards = [
  {
    num: '01',
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 2v6m0 0 3-3m-3 3-3-3M5 13h14l-1 8H6l-1-8z" /></svg>,
    h: 'Instant updates',
    p: 'Fix a bug at 3pm. Every user has it by 3:01. The app never reinstalls.',
    cta: 'How it works',
    href: '/architecture',
  },
  {
    num: '02',
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 2 4 6v6c0 5 3.4 9.5 8 10 4.6-.5 8-5 8-10V6l-8-4z" /><path d="M9 12l2 2 4-4" /></svg>,
    h: 'Play Store safe',
    p: 'Ketoy generates code on device, the same way ART does. It stays inside Google policy.',
    cta: 'Security model',
    href: '#security',
  },
  {
    num: '03',
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 6h16M4 12h10M4 18h16" /><path d="m16 9 3 3-3 3" /></svg>,
    h: 'Just Kotlin',
    p: 'It is the Jetpack Compose you already write. Nothing new to learn.',
    cta: 'What is supported',
    href: '/features',
  },
];

export const securityCards = [
  {
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 2 4 6v6c0 5 3.4 9.5 8 10 4.6-.5 8-5 8-10V6l-8-4z" /></svg>,
    h: 'Every bundle is signed',
    p: 'An Ed25519 signature is checked before any code runs. Your private key stays on your server. Only you can ship a bundle.',
  },
  {
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="3" /><path d="M9 12l2 2 4-4" /></svg>,
    h: 'The sandbox is a build error',
    p: 'The compiler rejects file access, reflection, and any unregistered API. Unsafe code never compiles.',
  },
  {
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 12h4l3-8 4 16 3-8h4" /></svg>,
    h: 'Capabilities are the only door',
    p: 'KBC code reaches the platform through registered capabilities. Nothing else is callable.',
  },
];

export const legalCards = [
  {
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 2v20M2 12h20" /></svg>,
    quote: 'Is this allowed on the Play Store?',
    p: 'Yes. Ketoy generates code on device, exactly like ART does with bytecode. It is the same idea as Lua in a game engine. If your CDN goes down, the last signed bundle keeps running.',
  },
];
