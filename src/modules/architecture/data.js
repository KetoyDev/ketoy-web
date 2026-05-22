export const subnavItems = [
  { id: 'overview', label: 'Overview' },
  { id: 'compiler', label: 'Compiler plugin' },
  { id: 'bytecode', label: 'KBC bytecode' },
  { id: 'bundle', label: 'Bundle format' },
  { id: 'interpreter', label: 'Interpreter' },
  { id: 'renderer', label: 'Renderer' },
  { id: 'security', label: 'Security' },
  { id: 'performance', label: 'Performance' },
];

export const stackRows = [
  { lvl: '01', name: 'Kotlin Source', desc: <>Plain Kotlin + Compose with <code style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--accent-ink)' }}>@KetoyEntryPoint</code> on screen functions.</>, meta: '.kt' },
  { lvl: '02', name: 'K2 Compiler Plugin', desc: 'IR visitor compiles to KBC. Capability validation runs here - failures are build errors.', meta: 'IR → KBC' },
  { lvl: '03', name: '.ktx Bundle', desc: 'Brotli-compressed KBC bytecode, Ed25519-signed, ETag-cached. 1.5 – 8 KB per screen.', meta: 'CDN payload', accent: true },
  { lvl: '04', name: 'KBC Interpreter', desc: '104 opcodes, register-based. Tier-1 on-device DEX JIT promotes hot functions.', meta: 'runtime' },
  { lvl: '05', name: 'Compose Renderer', desc: 'KSP-generated typed adapters call real Compose. Native slot table, recomposition, layout.', meta: 'Material3' },
];

export const opcodeCards = [
  { num: 48, h: 'Logic', p: 'Arithmetic, comparison, object model, collections, strings, exceptions, casts.' },
  { num: 11, h: 'Coroutine', p: 'SUSPEND_POINT, RESUME_VALUE, LAUNCH, ASYNC, AWAIT, FLOW_COLLECT, COLLECT_AS_STATE, WITH_CONTEXT.' },
  { num: 5, h: 'Compose state', p: 'COMPOSE_STATE, COMPOSE_REMEMBER, COMPOSE_LAUNCHED_EFFECT, COMPOSE_DISPOSABLE_EFFECT, COMPOSE_SIDE_EFFECT.' },
  { num: 2, h: 'UI dispatch', p: 'COMPOSABLE_CALL, CONSTRUCT_JVM - the two operations that bridge KBC and Compose.' },
  { num: 6, h: 'Control flow', p: 'JUMP, JUMP_IF_TRUE, JUMP_IF_FALSE, RETURN, NOP, TRY_CATCH.' },
  { num: 32, h: 'VM lifecycle', p: 'Loads, moves, field access, type ops, capability invocations.' },
];

export const perfRows = [
  { cat: 'Bundle load + verify + parse', small: '50 KB bundle', chips: ['Ed25519 verify', 'Brotli decompress', 'section parse'], count: '< 50 ms' },
  { cat: 'Time to first frame', small: 'cold path', chips: ['bundle loaded', 'first Compose draw'], count: '< 100 ms' },
  { cat: 'Interpreter throughput', small: 'mid-range Android, API 26+', chips: ['register file', 'dispatch loop'], count: '> 50M ops/s' },
  { cat: 'COMPOSABLE_CALL overhead', small: 'per call', chips: ['KBCParamSet decode', 'adapter dispatch'], count: '< 0.5 ms' },
  { cat: 'CONSTRUCT_JVM TextStyle', small: 'full nested object', chips: ['typed construction'], count: '< 0.2 ms' },
  { cat: 'Tier-1 JIT speedup', small: 'DexMaker-generated, API 26+', chips: ['hot functions'], count: '≥ 1.5×' },
  { cat: 'Memory per active screen', small: 'VM + caches', chips: ['register file', 'modifier cache', 'LRU bundle cache'], count: '< 5 MB' },
  { cat: 'Bundle size vs JSON SDUI', small: 'same screen', chips: ['typed binary', 'string pool dedup'], count: '~20× smaller' },
];
