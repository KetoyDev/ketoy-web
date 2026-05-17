# Ketoy — Product Information

## What Is Ketoy

Ketoy is a **server-driven execution runtime for Android**. You write plain Kotlin — full Jetpack Compose UI, coroutines, ViewModels, Navigation — annotate your entry points, run one Gradle task, upload the exported binary file to our CDN, and every user gets the new flow within seconds. No Play Store release. No app update. No DSL. No schema.

It is not a component library. It is not a remote config system. It is not a Canvas serializer. It is a **Kotlin bytecode runtime** — the Hermes VM for the Kotlin/Compose ecosystem.

**Current release: `0.3-alpha` — available on Maven Central under `dev.ketoy.vm`.**

---

## The One-Line Pitch

Write `CheckoutScreen.kt` in Kotlin/Compose. Run `./gradlew ketoyBundle`. Upload `checkout.ktx` to your CDN. Done. Every user gets the updated screen within 60 seconds — with full coroutine semantics, reactive ViewModel state, and native Compose rendering. Every single parameter of every single Material3 component, exactly as it works in native code.

---

## No DSL. No Heavy Migration. Your Existing Kotlin and Compose Code.

This is the part most server-driven UI tools get wrong.

Ketoy requires **zero changes to how you write Kotlin or Compose**. You do not learn a new component model. You do not replace `Text(...)` with `RemoteText(config = ...)`. You do not map JSON keys to Compose parameters. You do not write serialization logic.

```kotlin
// This is valid Ketoy code. It is also valid Jetpack Compose.
// You write this. Ketoy compiles and ships it.

@KetoyEntryPoint
@Composable
fun CheckoutScreen() {
    val vm    = ketoyViewModel<CheckoutViewModel>()
    val state by vm.state.collectAsState()

    Scaffold(
        topBar = { TopAppBar(title = { Text("Checkout") }) }
    ) { padding ->
        LazyColumn(modifier = Modifier.padding(padding)) {
            items(state.cartItems) { item ->
                ProductCard(
                    name     = item.name,
                    price    = item.price,
                    quantity = item.quantity,
                    onRemove = { vm.dispatch("remove_item", item.id) },
                )
            }
        }
        Button(
            onClick  = { vm.dispatch("place_order", null) },
            modifier = Modifier.fillMaxWidth().padding(16.dp),
            enabled  = !state.isLoading,
            shape    = RoundedCornerShape(12.dp),
        ) {
            Text("Place Order — \$${state.total}", fontWeight = FontWeight.SemiBold)
        }
    }
}
```

**What you never write:**
- Manual component registrations
- Parameter encoding or mapping
- Type converters or JSON schema
- Adapter code
- Anything in a capability registry for standard UI
- Migration shims for existing Compose screens

The only annotation is `@KetoyEntryPoint` on your screen function. Everything else is your existing Kotlin.

---

## How It Works — The Five-Layer Stack

```
┌──────────────────────────────────────────────────────────────┐
│  1. Kotlin Source (.kt)                                      │
│     Write plain Kotlin + Compose with @KetoyEntryPoint       │
├──────────────────────────────────────────────────────────────┤
│  2. Compiler Plugin (IR → KBC)                               │
│     K2-compatible IR visitor compiles to KBC bytecode        │
│     Validates Android API access, reflection, GlobalScope     │
│     at compile time — forbidden calls are build errors        │
├──────────────────────────────────────────────────────────────┤
│  3. .ktx Bundle                                              │
│     Brotli-compressed KBC bytecode                           │
│     Ed25519-signed — tamper-evident, server-to-device trust  │
│     String pool deduplication, modifier table, entry points   │
├──────────────────────────────────────────────────────────────┤
│  4. KBC VM Interpreter (register-based)                      │
│     104 opcodes — logic, coroutines, Compose semantics       │
│     Structured concurrency via viewModelScope                 │
│     Tier-1 on-device DEX JIT for hot functions               │
├──────────────────────────────────────────────────────────────┤
│  5. Compose Renderer                                         │
│     KSP-generated typed adapters call real Compose APIs      │
│     Every TextStyle, KeyboardOptions, Shape — real JVM object │
│     Native slot table / recomposition / layout / GPU         │
└──────────────────────────────────────────────────────────────┘
```

---

## KBC — Ketoy Bytecode

KBC is a **custom, register-based bytecode** purpose-built for Kotlin semantics. It is not JVM bytecode. It is not DEX. It understands Kotlin-native concepts at the instruction level.

### 104 Opcodes Across 6 Categories

| Category | Opcodes | Examples |
|----------|---------|---------|
| Logic | 48 | arithmetic, comparison, object model, collections, strings, exceptions, casts |
| Coroutine | 11 | `SUSPEND_POINT`, `RESUME_VALUE`, `LAUNCH`, `ASYNC`, `AWAIT`, `FLOW_COLLECT`, `COLLECT_AS_STATE`, `WITH_CONTEXT` |
| Compose state | 5 | `COMPOSE_STATE`, `COMPOSE_REMEMBER`, `COMPOSE_LAUNCHED_EFFECT`, `COMPOSE_DISPOSABLE_EFFECT`, `COMPOSE_SIDE_EFFECT` |
| UI dispatch | 2 | `COMPOSABLE_CALL`, `CONSTRUCT_JVM` |
| Control flow | 6 | `JUMP`, `JUMP_IF_TRUE`, `JUMP_IF_FALSE`, `RETURN`, `NOP`, `TRY_CATCH` |
| VM lifecycle | 32 | loads, moves, field access, type ops, capability invocations |

### Wire Format: `.ktx` Bundle

A `.ktx` bundle is a Brotli-compressed, Ed25519-signed binary container. **Not XML. Not JSON. Not Protobuf.**

```
Header (14 bytes)
├── magic:            4 bytes   [0x4B 0x54 0x4F 0x59]  — "KTOY"
├── formatVersion:    2 bytes   — current: 2, min supported: 1
├── minRuntimeVersion:2 bytes
├── flags:            4 bytes   — DEBUG_INFO_PRESENT, UNSIGNED
└── sectionCount:     2 bytes

Sections (variable)
├── STRING_POOL        — interned strings, deduplicated across all functions
├── ADAPTER_MANIFEST   — composable adapter requirements
├── CONSTRUCTOR_MANIFEST
├── CAPABILITY_MANIFEST
├── MODIFIER_TABLE     — encoded modifier chains (lazy-resolved at render time)
├── FUNCTION_TABLE     — function metadata + suspension points + exception handlers
├── CODE               — KBC instruction stream (Brotli eligible)
├── DEBUG_INFO         — line number tables (debug builds only)
├── BUNDLE_METADATA    — bundle ID, composable descriptors, ViewModel descriptors
└── ENTRY_POINTS       — named entry point → function index map

Signature (64 bytes)
└── Ed25519 signature over all preceding bytes
```

**Typical bundle size: 1.5KB – 8KB** for a full screen with ViewModel logic. A full checkout flow with form validation, cart rendering, and order submission fits comfortably under 4KB.

---

## The Two-Layer Parameter System

The core architectural insight: Compose parameters split into two categories that require fundamentally different handling.

### Layer 1 — `KBCValue`: Static Constants in the Bundle

Parameters that are primitives, Compose constants, strings, colors, dimensions, modifiers, or function references. Encoded **statically at compile time**, decoded with a direct `when()` lookup at render time. Zero allocation. Zero string parsing.

```
Color.Red           → KBCValue.ColorARGB(0xFFFF0000)    — 5 bytes
FontWeight.Bold     → KBCValue.FontWeightInt(700)        — 3 bytes
Arrangement.Center  → KBCValue.VerticalArrangementId(2) — 2 bytes
"Hello, World"      → KBCValue.StringLiteral(poolIdx)   — 3 bytes
16.sp               → KBCValue.Sp(16f)                  — 5 bytes
Modifier.padding()  → KBCValue.ModifierRef(tableIdx)    — 3 bytes
{ vm.dispatch() }   → KBCValue.FunctionRef(fnIdx)       — 3 bytes
<not specified>     → KBCValue.Default                  — 0 bytes
product.name        → KBCValue.Register(5)              — 2 bytes
```

**35 KBCValue variants** covering every Compose primitive: colors, dimensions (Dp, Sp), font weights, font styles, text alignment, text overflow, text decoration, text style tokens, arrangement, alignment, content scale, keyboard type, IME action, keyboard capitalization, visual transformation, modifier references, function references, register references, and closure references for captured lambdas.

**88 Compose constant tokens** mapped in the `ComposeTokenRegistry` across 13 token families: `FontWeight.*`, `FontStyle.*`, `TextAlign.*`, `TextOverflow.*`, `TextDecoration.*`, `Arrangement.*`, `Alignment.*`, `ContentScale.*`, `KeyboardType.*`, `ImeAction.*`, `KeyboardCapitalization.*`, `VisualTransformation.*`, `Color.*`.

### Layer 2 — `CONSTRUCT_JVM`: Complex Objects at Runtime

Parameters that are instances of complex types: `TextStyle`, `KeyboardOptions`, `KeyboardActions`, `RoundedCornerShape`, `Shadow`, `Offset`, `AnnotatedString`, `PasswordVisualTransformation`, etc. The compiler emits `CONSTRUCT_JVM` instructions. The interpreter constructs the real JVM object. The object lands in a register. `KBCValue.Register(n)` references it at the call site.

```
// You write:
OutlinedTextField(
    textStyle = TextStyle(fontSize = 16.sp, fontWeight = FontWeight.Bold),
    keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Email),
    shape = RoundedCornerShape(12.dp),
)

// Compiler emits:
CONSTRUCT_JVM r5  TEXT_STYLE
  param[0]: Sp(16f)           ← fontSize
  param[3]: FontWeightInt(700) ← fontWeight
CONSTRUCT_JVM r6  KEYBOARD_OPTIONS
  param[2]: KeyboardTypeId(EMAIL) ← keyboardType
CONSTRUCT_JVM r7  ROUNDED_CORNER_SHAPE
  param[0]: Dp(12f)           ← corner radius
COMPOSABLE_CALL OUTLINED_TEXT_FIELD
  param[5]:  Register(5)      ← textStyle = real TextStyle object
  param[9]:  Register(6)      ← keyboardOptions = real KeyboardOptions
  param[21]: Register(7)      ← shape = real RoundedCornerShape

// Runtime:
regs[5] = TextStyle(fontSize = 16.sp, fontWeight = FontWeight.Bold)
regs[6] = KeyboardOptions(keyboardType = KeyboardType.Email)
regs[7] = RoundedCornerShape(12.dp)
adapter.invoke(params)
  → OutlinedTextField(textStyle = regs[5], keyboardOptions = regs[6], shape = regs[7])
```

**17 built-in constructor adapters**: `TextStyle`, `SpanStyle`, `ParagraphStyle`, `KeyboardOptions`, `KeyboardActions`, `TextFieldValue`, `RoundedCornerShape`, `CutCornerShape`, `Shadow`, `Offset`, `BorderStroke`, `AnnotatedString`, `TextFieldDefaults.colors()`, `OutlinedTextFieldDefaults.colors()`, `PasswordVisualTransformation`, `TextSelectionColors`, `MutableInteractionSource`.

Nested construction is handled recursively: `TextStyle(shadow = Shadow(color = Color.Black, offset = Offset(2f, 2f)))` emits `CONSTRUCT_JVM OFFSET` → `CONSTRUCT_JVM SHADOW` → `CONSTRUCT_JVM TEXT_STYLE`, inside-out exactly as Kotlin evaluates it.

---

## KSP-Generated Adapter System

Ketoy uses **KSP (Kotlin Symbol Processing)** to generate typed adapters for every Material3 component — all parameters, never hardcoded, regenerated automatically when Compose updates.

### 35 Composable Adapters

| Range | Components |
|-------|-----------|
| Layout | `Column`, `Row`, `Box`, `Spacer`, `LazyColumn`, `LazyRow`, `LazyVerticalGrid`, `HorizontalPager` |
| Containers | `Surface`, `Card`, `ElevatedCard`, `Scaffold` |
| Typography | `Text`, `TextField`, `OutlinedTextField` |
| Actions | `Button`, `OutlinedButton`, `TextButton`, `IconButton`, `FloatingActionButton`, `ExtendedFAB` |
| Selection | `Checkbox`, `RadioButton`, `Switch`, `Slider` |
| Media | `AsyncImage` (Coil), `Icon` |
| Feedback | `CircularProgressIndicator`, `LinearProgressIndicator`, `Divider` |
| Navigation | `TopAppBar`, `NavigationBar`, `TabRow` |
| Dialogs | `AlertDialog`, `BottomSheet` |
| App-specific | `0x4000+` — your custom components |

Every adapter covers **all parameters** of the corresponding Compose function — not a subset, not a hardcoded list. `Text` carries all 17 parameters. `OutlinedTextField` carries all 22. When Compose adds a new parameter, you run one command: `./gradlew :ketoy-adapters-material3:kspRelease`. Done.

---

## Runtime Capabilities (Non-UI)

Standard Material3 components use the adapter path. Everything else — network, storage, navigation, platform — uses the **Capability Registry**: a typed dispatch table that maps `Short` IDs to Kotlin functions.

### 67 Built-in Capability IDs Across 13 Ranges

| Range | IDs | Capabilities |
|-------|-----|-------------|
| Layout (legacy) | `0x0001–0x00FF` | 9 layout capabilities |
| Text (legacy) | `0x0100–0x01FF` | 2 text capabilities |
| Network | `0x0500–0x05FF` | `HTTP_GET`, `HTTP_POST`, `HTTP_PUT`, `HTTP_DELETE`, `HTTP_REQUEST`, `SSE_SUBSCRIBE`, `WEBSOCKET_CONNECT` |
| Storage KV | `0x0600–0x060F` | `KV_GET`, `KV_SET`, `KV_DELETE`, `KV_OBSERVE`, `KV_GET_ALL`, `KV_CLEAR` |
| Storage Room | `0x0610–0x061F` | `DB_QUERY`, `DB_INSERT`, `DB_UPDATE`, `DB_DELETE`, `DB_OBSERVE` |
| Navigation | `0x0700–0x07FF` | `NAV_PUSH`, `NAV_POP`, `NAV_REPLACE`, `NAV_POP_TO`, `NAV_DEEP_LINK`, `NAV_SET_RESULT`, `NAV_GET_RESULT`, `NAV_CAN_POP`, `NAV_CURRENT_ROUTE` |
| Platform | `0x0900–0x09FF` | analytics, toast, vibration, clipboard, open URL, permissions, device locale, app version, logging |
| ViewModel state | `0x0A00–0x0AFF` | `VM_GET_STATE`, `VM_SET_STATE`, `VM_OBSERVE_STATE`, `VM_DISPATCH` |
| Dispatchers | `0x0B00–0x0BFF` | `DISPATCHER_IO`, `DISPATCHER_DEFAULT`, `DISPATCHER_MAIN`, `DISPATCHER_UNCONFINED` |
| Flow operators | `0x0C00–0x0CFF` | `FLOW_MAP`, `FLOW_FILTER`, `FLOW_FLAT_MAP_LATEST`, `FLOW_COMBINE`, `FLOW_TAKE`, `FLOW_DEBOUNCE`, `FLOW_DISTINCT_UNTIL_CHANGED`, `STATE_FLOW_CREATE`, `SHARED_FLOW_CREATE` |
| App-specific | `0x4000–0x7FFF` | your domain capabilities — analytics, Room DAOs, camera, maps, payments |

Capabilities are registered once at startup. KBC code invokes them by ID. The sandbox validator rejects any call that isn't a registered capability or standard adapter at **compile time** — not at runtime, not on user devices.

---

## Coroutine Engine

KBC has first-class coroutine semantics baked into the instruction set — not simulated, not limited, not a subset.

- **Structured concurrency** via `viewModelScope` — every launched coroutine is a child of the VM's `SupervisorJob`
- **`SUSPEND_POINT` / `RESUME_VALUE`** — first-class suspension and resumption with continuation table
- **`LAUNCH` / `ASYNC` / `AWAIT`** — full parallel execution primitives
- **`WITH_CONTEXT`** — dispatcher switching including `Dispatchers.IO` and `Dispatchers.Main`
- **`FLOW_COLLECT` / `COLLECT_AS_STATE`** — reactive data binding directly into Compose state
- **9 Flow operators** — `map`, `filter`, `flatMapLatest`, `combine`, `take`, `debounce`, `distinctUntilChanged`, `MutableStateFlow`, `MutableSharedFlow`
- **Closure conversion** — lambdas that capture outer-scope locals emit `KBCValue.ClosureRef(fnIdx, capturedRegs)` — the analyzer walks the IR, snapshots captures at call site resolution time, and forwards them as leading arguments to the KBC function

`GlobalScope` usage, `runBlocking`, and unstructured concurrency are **rejected by the capability validator at compile time** with actionable error messages pointing to the Ketoy docs.

---

## ViewModel and State

Ketoy's ViewModel model maps directly onto Android's ViewModel architecture.

- **`KetoyVirtualViewModel`** — extends `ViewModel`, owns a `Ketoy` instance scoped to `viewModelScope`
- **State** — `MutableStateFlow<Map<String, Any?>>` observable from Compose via `collectAsState()`
- **Events** — dispatched by name: `vm.dispatch("add_item", itemId)` → routes to the registered handler function in KBC
- **`SavedStateHandle`** — state is persisted and restored across process death automatically; restored state takes priority over initial extras on config change
- **`KetoyBaseViewModel`** — abstract base class for `@KetoyViewModel`-annotated classes; `viewModelScope`, `getState`, `setState`, `observeState` are injected post-construction before `init()` fires

---

## Security Model

Security is not a feature. It is the load-bearing wall of the entire architecture.

### Ed25519 Signing — Every Bundle, Every Load

Every `.ktx` bundle is signed with an Ed25519 private key (32-byte seed). The 64-byte signature covers all bytes preceding it — magic, header, every section, the string pool. Verification runs **before any parsing**. A tampered bundle is rejected before a single instruction is decoded.

```kotlin
KetoyConfig(
    enableSignatureVerification = true,
    publicKey = KetoyKeystore.loadFromAsset(context, "ketoy/keys/release-public.key"),
)
```

The public key ships inside your APK. The private key stays on your signing server. Neither Play Store nor Google can generate valid KBC bundles for your app.

### Compile-Time Capability Sandbox

The K2 compiler plugin validates **at build time** — not at runtime. Six typed error categories with actionable messages:

| Error | What it catches | Example |
|-------|----------------|---------|
| `DirectAndroidApiAccess` | `android.*`, `androidx.*` calls outside registered capabilities | `ActivityManager.getRunningTasks()` |
| `ReflectionUsage` | `kotlin.reflect.*`, `java.lang.Class` | `MyClass::class.memberProperties` |
| `FileIoUsage` | `java.io.*`, `java.nio.*`, `kotlin.io.*` | `File("/data/...").readText()` |
| `GlobalScopeUsage` | `GlobalScope.*`, `runBlocking` | `GlobalScope.launch { ... }` |
| `UnregisteredCall` | any call not in the capability registry or adapter catalog | custom SDK not registered |
| `NonKbcConstructor` | constructing Compose-domain types outside the adapter path | `TextFieldColors(...)` directly |

Every error includes the offending FQ name, why it is forbidden, a fix example with runnable code, and a link to `ketoy.dev/docs`.

### Play Store Compliance

Ketoy does not download pre-built DEX or JVM bytecode. The Tier-1 JIT generates DEX **locally on the device** from KBC instructions — the same thing ART does with bytecode. This is explicitly permitted by Play Store policy. No DPA violations. No policy edge cases.

KBC bundles are **not executable code in the Play Store sense**. They are data interpreted by a runtime that ships in your APK, exactly like Lua scripts in a game engine.

### No Raw Android API Access

KBC code cannot call Android APIs directly. Every Android interaction — HTTP, DataStore, Room, NavController, clipboard, camera — goes through a registered capability. The sandbox boundary is the registry. What is not registered cannot be called. What cannot be called cannot be exploited.

### Brotli Compression + ETag Caching

Bundles are compressed with Brotli before signing. The runtime verifies the signature over the compressed bytes, then decompresses. Over-the-air delivery uses ETag / `If-None-Match` — the client sends the cached ETag, the server returns `304 Not Modified`, the cached bundle is used directly. Zero re-download for unchanged screens.

---

## Performance Targets

| Metric | Target | Notes |
|--------|--------|-------|
| Bundle load + verify + parse (50KB) | < 50ms | Includes Ed25519 verification and Brotli decompression |
| Time to first frame | < 100ms | From bundle loaded to Compose first draw |
| KBC interpreter throughput | > 50M ops/sec | On mid-range Android (API 26+) |
| `COMPOSABLE_CALL` overhead | < 0.5ms | KBCParamSet decode + adapter dispatch |
| `CONSTRUCT_JVM` TextStyle | < 0.2ms | Full typed construction including nested objects |
| `KBCParamSet.getColor()` | < 10ns | Single `when()` branch on a byte constant |
| `KBCParamSet.getString()` via register | 1 array read | No parsing, no boxing |
| Default parameter encoding | 0 bytes | Unspecified parameters are never encoded |
| Bundle size vs. equivalent JSON SDUI | 20x smaller | Typed binary vs. string-keyed JSON |
| Tier-1 JIT speedup for hot functions | ≥ 1.5x | DexMaker-generated DEX, on-device, API 26+ |
| Memory overhead per active screen | < 5MB | VM + registers + modifier cache + LRU bundle cache |
| LRU bundle cache | SHA-256 keyed | Configurable, default 5 entries |

---

## Current Status — Alpha

**`dev.ketoy.vm:ketoy-*:0.3-alpha`** is live on Maven Central.

### What Is Shipped and Working

- **K2 compiler plugin** — full IR visitor with `COMPOSABLE_CALL` and `CONSTRUCT_JVM` emission, named-arg modifier resolution, 88-token Compose constant registry, closure conversion for captured lambdas
- **KBC VM** — 104 opcodes, register-based interpreter, structured concurrency, full Flow/StateFlow support, coroutine state machine
- **Two-layer parameter system** — 35 KBCValue variants, 35 composable adapters, 17 constructor adapters, KSP-generated code
- **KSP adapter processor** — scans Compose/Material3 classpath, generates typed adapters, one command to regenerate
- **Bundle format** — Brotli compression, Ed25519 signing, ETag caching, BUNDLE_METADATA section (format v2, backward-compatible with v1)
- **Tier-1 JIT** — DexMaker-backed, on-device DEX generation for hot functions, API 26+
- **Hilt integration** — full DI wiring, debug overlay auto-enable, KetoyConfigCustomizer for per-app config
- **Capabilities** — HTTP (Ktor/OkHttp), DataStore, Room bridge, Navigation, platform APIs, dispatchers, Flow operators
- **Dev overlay** — real-time COMPOSABLE_CALL / CONSTRUCT_JVM / capability event stream, JIT status, recomposition count, zero overhead in release

### 14 Published Modules

```
dev.ketoy.vm:ketoy-bom:0.3.3-alpha
dev.ketoy.vm:ketoy-catalog:0.3.3-alpha
dev.ketoy.vm:ketoy-annotations:0.3.3-alpha       — KMP (jvm + android + iOS)
dev.ketoy.vm:ketoy-bytecode:0.3.3-alpha          — KMP (jvm + android)
dev.ketoy.vm:ketoy-bundle-format:0.3.3-alpha     — KMP (jvm + android)
dev.ketoy.vm:ketoy-runtime:0.3.3-alpha           — Android AAR
dev.ketoy.vm:ketoy-hilt:0.3.3-alpha              — Android AAR
dev.ketoy.vm:ketoy-test:0.3.3-alpha              — Android AAR
dev.ketoy.vm:ketoy-capabilities-core:0.3.3-alpha — Android AAR
dev.ketoy.vm:ketoy-capabilities-navigation:0.3.3-alpha
dev.ketoy.vm:ketoy-adapters-material3:0.3.3-alpha
dev.ketoy.vm:ketoy-compiler-plugin:0.3.3-alpha   — JVM jar
dev.ketoy.vm:ketoy-ksp-processor:0.3.3-alpha     — KSP processor
dev.ketoy.vm:ketoy-gradle-plugin:0.3.3-alpha     — Gradle plugin
```

---

## Upcoming (in Alpha)
- **`@KetoyViewModel` ↔ `KetoyBaseViewModel` lifecycle wiring** — IR-level injection of `viewModelScope`, `getState`, `setState` into the compiled class
- **Tier-2 JIT** — type-propagation register model; non-boxing arithmetic for hot numeric loops
- **Streaming bundle delivery** — parse and begin executing while decompression is still in flight; target: < 20ms to first frame on a cold CDN response
- **`ketoy.dev` Developer Console** — bundle upload, signing, CDN distribution, A/B rollout, force-refresh, version pinning per user cohort, real-time error aggregation from device telemetry

---

## Quick Start

```kotlin
// build.gradle.kts (app)
plugins {
    id("dev.ketoy.compiler") version "0.3.3-alpha"
}

dependencies {
    implementation(platform("dev.ketoy.vm:ketoy-bom:0.3.3-alpha"))
    implementation("dev.ketoy.vm:ketoy-runtime")
    implementation("dev.ketoy.vm:ketoy-hilt")
    implementation("dev.ketoy.vm:ketoy-adapters-material3")
    ksp("dev.ketoy.vm:ketoy-ksp-processor")
}
```

```kotlin
// ketoy-screens module — write plain Kotlin/Compose
@KetoyEntryPoint
@Composable
fun HomeScreen() {
    val vm    = ketoyViewModel<HomeViewModel>()
    val state by vm.state.collectAsState()
    Column(modifier = Modifier.fillMaxSize().padding(16.dp)) {
        Text(text = "Welcome, ${state["name"]}", style = MaterialTheme.typography.headlineMedium)
        Spacer(modifier = Modifier.height(24.dp))
        Button(onClick = { vm.dispatch("get_started", null) }) {
            Text("Get Started")
        }
    }
}
```

```bash
# Compile to KBC
./gradlew :ketoy-screens:ketoyBundle

# Produces: ketoy-screens/build/ketoy-bundles/ketoy-screens.ktx
# Upload to your CDN. Done.
```

```kotlin
// Host app — render the KBC screen
KetoyScreen(
    source     = KetoyBundleSource.Remote("https://cdn.your-app.com/ketoy/home.ktx"),
    entryPoint = "HomeScreen",
)
```

---

## Why Not JSON SDUI

Every JSON-based server-driven UI system eventually builds a DSL to express logic. That DSL is not Kotlin. It is not type-safe. It is not Compose. It does not have coroutines. It does not have ViewModel lifecycle. It does not have Room. It does not support every parameter of every Compose component. It requires a migration.

Ketoy is the opposite approach: **compile the real Kotlin, execute the real bytecode, render the real Compose**. No DSL. No schema. No compromise.

The only difference between a screen you ship in your APK and a screen you ship via Ketoy is the annotation on the entry point and the Gradle task that produces the bundle.

---

*Ketoy v0.3-alpha — `dev.ketoy.vm` on Maven Central — ketoy.dev*
