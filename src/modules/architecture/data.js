export const subnavItems = [
  { id: 'premise', label: 'Premise' },
  { id: 'stack', label: 'Five-layer stack' },
  { id: 'source', label: 'Source layer' },
  { id: 'compiler', label: 'Compiler plugin' },
  { id: 'closure', label: 'Closure walk' },
  { id: 'catalog', label: 'Adapter catalog' },
  { id: 'bundle', label: '.ktx bundle' },
  { id: 'runtime', label: 'Runtime VM' },
  { id: 'capabilities', label: 'Capabilities' },
  { id: 'modules', label: 'Modules' },
  { id: 'build', label: 'Build pipeline' },
  { id: 'testing', label: 'Testing' },
  { id: 'devtools', label: 'Dev tools' },
  { id: 'non-goals', label: 'Non-goals' },
  { id: 'pixel', label: 'A day in the life' },
];

export const stackRows = [
  { lvl: '01', name: 'Kotlin Source (.kt)', desc: <>Plain Kotlin + Compose with <code style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--accent-ink)' }}>@Ketoy*</code> annotations on entry points.</>, meta: '.kt' },
  { lvl: '02', name: 'Compiler Plugin (K2 IR → KBC)', desc: 'Walks your screens, view models, and helpers. Validates against the capability sandbox.', meta: 'IR → KBC' },
  { lvl: '03', name: '.ktx Bundle (ONE per app)', desc: 'Brotli-compressed, Ed25519-signed, string-pool deduplicated. Whole app in one signed binary.', meta: 'CDN payload', accent: true },
  { lvl: '04', name: 'KBC VM Interpreter (~107 opcodes)', desc: 'Register-based interpreter. Arithmetic, control flow, coroutines, Compose ops. Optional Tier-1 DEX JIT for hot pure-logic functions.', meta: 'runtime' },
  { lvl: '05', name: 'Compose Renderer', desc: 'KSP-generated typed adapters call real Material3. Real recomposition, real slot table, real GPU pipeline.', meta: 'Material3' },
];

export const opcodeCards = [
  { num: '5', h: 'Loads & moves', p: 'LOAD_INT, LOAD_STRING, LOAD_NULL, LOAD_UNIT, MOVE.' },
  { num: '∗', h: 'Arithmetic & compare', p: 'Signed int/long/float/double arithmetic plus CMP_EQ, CMP_LT and the rest.' },
  { num: '5', h: 'Control flow', p: 'JUMP, JUMP_IF_TRUE, JUMP_IF_FALSE, RETURN, NOP.' },
  { num: '8', h: 'Object model', p: 'NEW_INSTANCE, GET_FIELD, SET_FIELD, INSTANCEOF, CAST, SAFE_CAST, BOX, UNBOX - all on a sandboxed KBCHeap.' },
  { num: '7', h: 'Collections', p: 'LIST_NEW, LIST_GET, LIST_ADD, LIST_SIZE, MAP_NEW, MAP_PUT, MAP_GET.' },
  { num: '4', h: 'Strings', p: 'STRING_CONCAT (variadic), STRING_LENGTH, STRING_SUBSTR, INT_TO_STRING.' },
  { num: '4', h: 'Capabilities', p: 'INVOKE_CAPABILITY plus _SUSPEND, _FLOW, and _VOID variants - the only door to the host.' },
  { num: '7', h: 'Coroutines', p: 'SUSPEND_POINT, RESUME_VALUE, RESUME_EXCEPTION, LAUNCH, ASYNC, AWAIT, WITH_CONTEXT.' },
  { num: '3', h: 'Flow', p: 'FLOW_EMIT, FLOW_COLLECT, COLLECT_AS_STATE.' },
  { num: '6', h: 'Compose semantics', p: 'COMPOSE_REMEMBER, COMPOSE_STATE, COMPOSE_DERIVED_STATE, COMPOSE_LAUNCHED_EFFECT, COMPOSE_SIDE_EFFECT, COMPOSE_DISPOSABLE_EFFECT.' },
  { num: '3', h: 'Exceptions', p: 'THROW, TRY_CATCH, END_TRY - real Kotlin exception semantics, real handler stacks.' },
  { num: '2', h: 'UI dispatch', p: 'COMPOSABLE_CALL (0xB0) and CONSTRUCT_JVM (0xB1) - the two opcodes that bridge KBC and Compose.' },
];

export const diagnosticRows = [
  { cat: 'DirectAndroidApiAccess', desc: 'android.* / androidx.* outside the catalog.' },
  { cat: 'ReflectionUsage', desc: 'kotlin.reflect.*, java.lang.Class.get*, java.lang.reflect.*.' },
  { cat: 'FileIoUsage', desc: 'java.io.*, java.nio.*, kotlin.io.*.' },
  { cat: 'GlobalScopeUsage', desc: 'GlobalScope.*, runBlocking, raw CoroutineScope() factory.' },
  { cat: 'UnregisteredCapability', desc: '@KetoyCapabilityStub ID not in the host’s registry.' },
  { cat: 'UnregisteredComposable', desc: '@Composable callee not in the adapter catalog.' },
  { cat: 'NonKbcConstructor', desc: 'Compose-domain constructor with no registered adapter.' },
  { cat: 'UnregisteredCall', desc: 'Everything else, with up to 3 fuzzy-match suggestions.' },
];

export const capabilityFamilies = [
  { range: '0x0500–', name: 'Network', desc: 'HTTP GET/POST/PUT/DELETE/REQUEST plus SSE subscribe via Ktor + OkHttp.' },
  { range: '0x0600–', name: 'Storage', desc: 'DataStore KV operations plus a Room bridge DSL.' },
  { range: '0x0700–', name: 'Navigation', desc: 'push / pop / replace / popTo / deepLink and the result-passing surface.' },
  { range: '0x0900–', name: 'Platform', desc: 'Toasts, vibration, clipboard, permissions, locale, app version, logging.' },
  { range: '0x0A00–', name: 'ViewModel state', desc: 'The four state operations exposed to KBC code.' },
  { range: '0x0B00–', name: 'Dispatchers', desc: 'Dispatchers.IO, Default, Main, Unconfined.' },
  { range: '0x0C00–', name: 'Flow operators', desc: 'map, filter, flatMapLatest, combine, take, debounce, distinctUntilChanged, plus MutableStateFlow / MutableSharedFlow factories.' },
  { range: '0x4000–', name: 'App-specific', desc: 'APP_SPECIFIC_START reserves the upper ID space for host registrations - your charts, your camera, your design-system primitives.' },
];

export const moduleRows = [
  { cat: 'Wire format (KMP)', small: 'shared, multiplatform', chips: ['ketoy-annotations', 'ketoy-bytecode', 'ketoy-bundle-format'], count: '3' },
  { cat: 'Compiler + tooling', small: 'build-time', chips: ['ketoy-compiler-plugin', 'ketoy-gradle-plugin', 'ketoy-ksp-processor', 'ketoy-adapter-catalog'], count: '4' },
  { cat: 'Generated adapters', small: 'KSP output', chips: ['ketoy-adapters-material3'], count: '1' },
  { cat: 'Runtime (Android AAR)', small: 'on-device', chips: ['ketoy-runtime'], count: '1' },
  { cat: 'Capabilities', small: 'host bridge', chips: ['ketoy-capabilities-core', 'ketoy-capabilities-navigation'], count: '2' },
  { cat: 'Integration', small: 'DI', chips: ['ketoy-hilt'], count: '1' },
  { cat: 'Dev experience', small: 'testing & profiling', chips: ['ketoy-devtools', 'ketoy-test', 'ketoy-closure-fixtures', 'ketoy-benchmark'], count: '4' },
  { cat: 'Packaging', small: 'release', chips: ['ketoy-bom', 'ketoy-catalog'], count: '2' },
];
