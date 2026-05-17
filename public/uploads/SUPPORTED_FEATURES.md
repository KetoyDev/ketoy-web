# KetoyVM — Supported Features (Code-Verified)

> Audited against HEAD on 2026-05-17. Every entry below is grounded in
> the actual source under `ketoy-*` and `app/` — not the plan docs.
> "Supported" means the path is wired end-to-end: compiler emits → wire
> format carries → runtime resolves → an adapter consumes.

Coordinates: `dev.ketoy.vm:* :0.2.1-alpha` (vanniktech, atomic publish).
Annotation surface (jvm + android + iOS KMP):
[`@KetoyComposable`](ketoy-annotations/src/commonMain/kotlin/dev/ketoy/annotations/KetoyComposable.kt),
[`@KetoyEntryPoint`](ketoy-annotations/src/commonMain/kotlin/dev/ketoy/annotations/KetoyEntryPoint.kt),
[`@KetoyViewModel`](ketoy-annotations/src/commonMain/kotlin/dev/ketoy/annotations/KetoyViewModel.kt),
[`@KetoyCapabilityStub(id, name)`](ketoy-annotations/src/commonMain/kotlin/dev/ketoy/annotations/KetoyCapabilityStub.kt),
`@KetoyCapability`, `@KetoyModule`, plus opt-in markers
`@KetoyStableApi` / `@KetoyInternalApi` / `@KetoyExperimentalApi`.

---

## 1. Compose components

The catalog of fully-routed composables lives in
[`ketoy-adapters-material3/src/main/resources/adapter-scan-roots.txt`](ketoy-adapters-material3/src/main/resources/adapter-scan-roots.txt).
KSP reads it, resolves each FQ name against the real Compose /
Material3 / Foundation / Coil declarations on the build classpath, and
emits `GeneratedAdapters.kt` + `META-INF/ketoy/adapter-catalog.bin`. The
stable Short IDs live in
[`KBCAdapterIds`](ketoy-bytecode/src/commonMain/kotlin/dev/ketoy/bytecode/KBCAdapterIds.kt).

### 1.1 Fully catalogued (KSP-generated adapters, ID < 0x4000)

| Component | ID | Catalogued signature | Notes |
|-----------|----|----|---|
| `androidx.compose.material3.Text` | `0x0001` | 15-param canonical String overload (post-1.5; `minLines: Int` at position 14) | `modifier`, `color`, `fontSize`, `fontStyle`, `fontWeight`, `fontFamily`, `letterSpacing`, `textDecoration`, `textAlign`, `lineHeight`, `overflow`, `softWrap`, `maxLines`, `minLines`. `softWrap`/`maxLines`/`minLines` flow through `paramHonourDefault=` + `paramTransform=value.coerceAtLeast(1)`. AnnotatedString overload + 16-arg deprecated overload deliberately not picked. |
| `androidx.compose.foundation.layout.Column` | `0x0002` | content slot resolves via `KBCParamSet.getContentSlot` | `modifier`, `verticalArrangement`, `horizontalAlignment`. |
| `androidx.compose.foundation.layout.Row` | `0x0003` | same shape as Column | `modifier`, `horizontalArrangement`, `verticalAlignment`. |
| `androidx.compose.foundation.layout.Box` | `0x0004` | content slot at source-position 3 | `modifier`, `contentAlignment`, `propagateMinConstraints` (defaults to `false` via `paramDefault=`). |
| `androidx.compose.material3.Scaffold` | `0x0007` | full Material3 signature | `topBar`, `bottomBar`, `snackbarHost`, `floatingActionButton`, `floatingActionButtonPosition`, `containerColor`, `contentColor`, `contentWindowInsets`, and the trailing `content: @Composable (PaddingValues) -> Unit` slot which resolves through `KBCParamSet.getPaddingValuesContentSlot`. |
| `androidx.compose.material3.Surface` | `0x0008` | non-clickable overload (`(modifier: Modifier, …)`) — the clickable overload is explicitly excluded | modifier, shape, color, contentColor, tonalElevation, shadowElevation, border, content. |
| `androidx.compose.material3.Card` | `0x0009` | 6-param non-clickable overload spelt out in scan-roots | `modifier`, `shape` (registered passthrough), `colors: CardColors` (built via `CardDefaults.cardColors` objectFactory), `elevation: CardElevation` (via `CardDefaults.cardElevation`), `border`, content slot. |
| `androidx.compose.foundation.layout.Spacer` | `0x000B` | `modifier` only | The width/height are part of the modifier chain (`Modifier.height(20.dp)`). |
| `androidx.compose.material3.Button` | `0x000C` | full Material3 shape | `onClick` (Lambda), `modifier`, `enabled` (honour-default → true), `shape`, `colors: ButtonColors` (via `ButtonDefaults.buttonColors` objectFactory), `elevation`, `border`, `contentPadding`, `interactionSource`, content slot at source position 9. |
| `androidx.compose.material3.IconButton` | `0x000F` | full signature | `onClick`, `modifier`, `enabled` (honour-default), `colors`, `interactionSource`, content. |
| `androidx.compose.material3.TextField` | `0x0012` | String overload picked explicitly | `value: String`, `onValueChange: (String) -> Unit`, `modifier`, `enabled`, `readOnly`, `textStyle`, `label`, `placeholder`, `leadingIcon`, `trailingIcon`, `prefix`, `suffix`, `supportingText`, `isError`, `visualTransformation`, `keyboardOptions`, `keyboardActions`, `singleLine`, `maxLines`, `minLines`, `interactionSource`, `shape`, `colors`. |
| `androidx.compose.material3.Checkbox` | `0x0014` | full signature | `checked`, `onCheckedChange: ((Boolean) -> Unit)?`, `modifier`, `enabled` (honour-default), `colors`, `interactionSource`. |
| `androidx.compose.material3.Switch` | `0x0016` | full signature | `checked`, `onCheckedChange`, `modifier`, `thumbContent`, `enabled`, `colors`, `interactionSource`. |
| `coil.compose.AsyncImage` | `0x0018` | 16-arg post-1.x overload (`clipToBounds: Boolean` at pos 14, `equalityDelegate` at 15) | `model`, `contentDescription`, `modifier`, `placeholder`, `error`, `fallback`, `onLoading`, `onSuccess`, `onError`, `alignment`, `contentScale`, `alpha`, `colorFilter`, `filterQuality`, `clipToBounds`. |
| `androidx.compose.material3.TopAppBar` | `0x001D` | post-1.2 overload (5-position prefix ending in `Dp` for `expandedHeight`) | `title: @Composable () -> Unit`, `modifier`, `navigationIcon: @Composable () -> Unit`, `actions: @Composable RowScope.() -> Unit` (currently treated as a plain content slot — `RowScope` typing is the Phase A·E item), `expandedHeight` (honour-default → `TopAppBarDefaults.TopAppBarExpandedHeight`). `TopAppBarColors` / `WindowInsets` / `TopAppBarScrollBehavior?` fall through to `UnsupportedFallback` and use Compose-source defaults. Requires `@OptIn(ExperimentalMaterial3Api::class)` in KBC source. |
| `androidx.compose.material3.Icon` | `0x0019` | ImageVector overload (picked via nullability-aware disambiguator over the Painter / ImageBitmap variants) | `imageVector: ImageVector`, `contentDescription: String?`, `modifier`, `tint: Color`. Resolved at runtime through a host-provided `KBCImageVectorResolver` — see §1.5. |

### 1.2 Reserved but NOT yet routed end-to-end

These IDs exist in [`KBCAdapterIds`](ketoy-bytecode/src/commonMain/kotlin/dev/ketoy/bytecode/KBCAdapterIds.kt)
but are **not** present in `adapter-scan-roots.txt`. KBC source
referencing them today fails with
`KetoyCompilationError.UnregisteredComposable`:

- Layout / lists: `LAZY_COLUMN (0x0005)`, `LAZY_ROW (0x0006)`,
  `ELEVATED_CARD (0x000A)` — LazyColumn/Row blocked on
  [KNOWN_ISSUES #10](KNOWN_ISSUES.md) (LazyListScope DSL bridging).
- Buttons: `OUTLINED_BUTTON (0x000D)`, `TEXT_BUTTON (0x000E)`,
  `FAB (0x0010)`, `EXTENDED_FAB (0x0011)`.
- Inputs: `OUTLINED_TEXT_FIELD (0x0013)`, `RADIO_BUTTON (0x0015)`,
  `SLIDER (0x0017)`.
- Feedback: `DIVIDER (0x001A)`, `CIRCULAR_PROGRESS (0x001B)`,
  `LINEAR_PROGRESS (0x001C)`.
- Navigation: `NAVIGATION_BAR (0x001E)`, `TAB_ROW (0x001F)`.
- Sheets / dialogs: `ALERT_DIALOG (0x0020)`, `BOTTOM_SHEET (0x0021)`.
- Grids / pagers: `LAZY_VERTICAL_GRID (0x0022)`,
  `HORIZONTAL_PAGER (0x0023)`.

Adding any of these is the standard recipe: add the matching
`composable=<fq>(<sig>):0x00XX` line to `adapter-scan-roots.txt` and
run `./gradlew :ketoy-adapters-material3:kspRelease`.

### 1.3 Custom (app-specific) composables

Range `0x4000+` is reserved for host-app adapters. The host registers
them on `KBCAdapterRegistry` and supplies a matching FQ in its own
scan-roots file. The compiler-plugin catalog is loaded via
`-Pplugin:dev.ketoy.compiler:composeAdapterCatalogPath=…`, so additional
adapter catalogs published by other Gradle modules are honoured.

### 1.4 Constructor parameters (`CONSTRUCT_JVM`)

Complex Compose value types are not encoded inline. Instead the
compiler emits a `CONSTRUCT_JVM` opcode that builds the object via a
registered constructor adapter and stores it in a register; the
consuming `COMPOSABLE_CALL` reads it as `KBCValue.Register(n)`.

IDs from
[`KBCConstructorIds`](ketoy-bytecode/src/commonMain/kotlin/dev/ketoy/bytecode/KBCConstructorIds.kt):

| Constructor / factory | ID | Source |
|---|---|---|
| `KeyboardOptions(…)` constructor | `0x0004` | `constructor=` line |
| `KeyboardActions(…)` constructor | `0x0005` | `constructor=` line |
| `RoundedCornerShape(corner: Dp)` factory | `0x0007` | `factory=` |
| `RoundedCornerShape(percent: Int)` factory | `0x0021` | `factory=` |
| `RoundedCornerShape(Dp, Dp, Dp, Dp)` per-corner factory | `0x0022` | `factory=` |
| `RoundedCornerShape(Int, Int, Int, Int)` percent-per-corner factory | `0x0023` | `factory=` |
| `CardDefaults.cardColors(Color, Color, Color, Color)` | `0x0012` | `objectFactory=` (@Composable, runs in composition via `KBCComposeEngine.applyComposableConstruct`) |
| `CardDefaults.cardElevation(Dp×6)` | `0x0013` | `objectFactory=` |
| `ButtonDefaults.buttonColors(Color×4)` | `0x0014` | `objectFactory=` |
| `ButtonDefaults.buttonElevation(Dp×5)` | `0x0015` | `objectFactory=` |
| `TopAppBarDefaults.topAppBarColors(Color×5)` | `0x0020` | `objectFactory=` |

Reserved but unused IDs: `TEXT_STYLE (0x0001)`, `SPAN_STYLE (0x0002)`,
`PARAGRAPH_STYLE (0x0003)`, `TEXT_FIELD_VALUE (0x0006)`,
`CUT_CORNER_SHAPE (0x0008)`, `SHADOW (0x0009)`, `OFFSET (0x000A)`,
`BORDER_STROKE (0x000B)`, `ANNOTATED_STRING (0x000C)`,
`TF_COLORS (0x000D)`, `OUTLINED_TF_COLORS (0x000E)`,
`VISUAL_TRANSFORM_PASSWORD (0x000F)`,
`TEXT_SELECTION_COLORS (0x0010)`,
`MUTABLE_INTERACTION_SOURCE (0x0011)`, plus a coherent block at
`0x0016…0x001F` for the remaining Material3 `*Defaults` color/elevation
factories. **TextStyle is deferred** — multiple overloads share an
8-param prefix and the classifier doesn't yet model
`FontSynthesis` / `BaselineShift` / `TextGeometricTransform` /
`LocaleList` / `Shadow` / `TextDirection` / `TextIndent` (scan-roots
comment).

### 1.5 Token / property-getter constants

Compose value reads like `FontWeight.Bold`, `Color.Red`, `16.dp`,
`Arrangement.SpaceEvenly`, `Alignment.CenterVertically`,
`ContentScale.Crop`, `KeyboardType.Email`, `ImeAction.Done`,
`TextAlign.Center`, `TextOverflow.Ellipsis`, `TextDecoration.Underline`,
`FontStyle.Italic`, `MaterialTheme.typography.bodyLarge` — all flow
through a single
[`ComposeTokenRegistry`](ketoy-compiler-plugin/src/main/kotlin/dev/ketoy/compiler/emit/ComposeTokenRegistry.kt)
(88 seeded entries across 13 families) and encode as the matching
`KBCValue.*Id` byte or `KBCValue.ColorARGB(Int)` / `KBCValue.Dp(Float)`
/ `KBCValue.Sp(Float)` inline literal. The full list of resolved
`KBCValue` variants is in
[`KBCValue.kt`](ketoy-bytecode/src/commonMain/kotlin/dev/ketoy/bytecode/KBCValue.kt)
(33 variants total including `Default` / `Null` / `NoCallback` /
`TextUnitUnspecified` / `DpUnspecified` / `ColorUnspecified` markers
and the `Register` / `ListRegister` / `ModifierRef` / `FunctionRef` /
`ClosureRef` reference variants).

**Material icons** flow through `KBCValue.StringLiteral` carrying the
canonical FQ (e.g. `androidx.compose.material.icons.filled.Settings`);
the host registers a
[`MaterialIconsResolver`](ketoy-adapters-material3/src/main/kotlin/dev/ketoy/adapters/material3/MaterialIconsResolver.kt)
built via the `materialIconsResolver { … }` DSL with per-style
helpers `registerFilled` / `registerRounded` / `registerOutlined` /
`registerSharp` / `registerTwoTone` (plus the five
`registerAutoMirrored*`). The KetoyBC compiler's
`ComposeTokenRegistry` pattern-matches all 10 Material icon style
packages + 13 `Icons.<get-Style>` selectors. R8-safe: each
`register*` takes a direct compile-time reference, so the icon class
is kept transitively with no `-keep` rules. Missing-icon fallback is
a 24×24 transparent `PlaceholderImageVector` — surfaces gaps
visibly instead of crashing.

### 1.6 `Modifier` chains

The IR walker
[`KBCModifierIRWalker`](ketoy-compiler-plugin/src/main/kotlin/dev/ketoy/compiler/emit/KBCModifierIRWalker.kt)
extracts modifier builder calls at emit time into a
[`KBCModifierDescriptor`](ketoy-runtime/src/main/kotlin/dev/ketoy/runtime/compose/KBCModifierDescriptor.kt)
(a list of `KBCModifierOp` variants) that's pooled into the bundle's
modifier table and referenced via `KBCValue.ModifierRef(tableIndex)`.
Argument resolution is **named-arg**, not positional, so K2's
partial-default lowering (`padding(top = 48.dp, start = 16.dp, end =
16.dp)`) is handled correctly via the three-shape `dpArgByName`
resolver (`IrCall(<get-dp>)` ⊕ `IrConst<Float>` ⊕
`IrGetValue → IrVariable.initializer`).

Supported `KBCModifierOp` variants
(27 total, from the compiled symbol set):

`Padding` (4-arg start/top/end/bottom), `PaddingAll`,
`PaddingHorizontal`, `PaddingVertical`, `PaddingValuesRef`
(register-bound `PaddingValues`, used by `Scaffold` content lambdas);
`FillMaxWidth(fraction)`, `FillMaxHeight(fraction)`,
`FillMaxSize(fraction)`; `Size`, `WidthIn(min, max)`,
`HeightIn(min, max)`; `WrapContentWidth`, `WrapContentHeight`,
`WrapContentSize`; `Background(color, shape)`, `Clip(shape)`,
`Border(width, color, shape)`, `Shadow(elevation, shape)`,
`ClipToBounds`, `Blur(radiusX, radiusY)`; `Clickable(onClickFnIdx)`,
`Alpha(alpha)`, `Offset(xDp, yDp)`, `ZIndex(zIndex)`, `TestTag(tag)`;
and `Weight(weight)` — handled at the layout-scope level by Row/Column
adapters via `KBCParamSet.getWeightOrNull(idx)` rather than during
modifier folding.

`KBCShape` covers `Rectangle`, `Circle`, `RoundedCorner(size)`,
`RoundedCornerPercent(percent)`, `CutCorner(size)`.

### 1.7 Layout scopes (`RowScope`, `ColumnScope`, `BoxScope`)

Scope-receivered content lambdas (e.g.
`Row { Spacer(Modifier.weight(1f)) }` where `weight` is a `RowScope`
extension) are recognised by
[`SlotScope`](ketoy-adapter-catalog/src/main/kotlin/dev/ketoy/adapters/catalog/SlotScope.kt)
in the catalog. The runtime resolves them via `getContentSlot` (plain),
`getItemContentSlot` (LazyListScope-style per-item with iter arg —
exists in the runtime but the LazyColumn adapter that would consume it
is not yet catalogued), and `getPaddingValuesContentSlot` (Scaffold).
`LazyListScope` is the open work item.

---

## 2. Supported Kotlin language / business logic

The KBC interpreter is register-based with **106 opcodes** (see
[`KBCOpcode.kt`](ketoy-bytecode/src/commonMain/kotlin/dev/ketoy/bytecode/KBCOpcode.kt)).
The IR-to-KBC lowering in
[`KBCEmitter.kt`](ketoy-compiler-plugin/src/main/kotlin/dev/ketoy/compiler/emit/KBCEmitter.kt)
handles every IR node listed below; everything else either folds
statically (Compose runtime infra), routes to an allowlisted intrinsic,
or fails compilation with a typed
[`KetoyCompilationError`](ketoy-compiler-plugin/src/main/kotlin/dev/ketoy/compiler/diagnostics/KetoyCompilationError.kt).

### 2.1 IR shapes the emitter consumes

`IrConst<*>` (Boolean, Byte, Short, Int, Long, Float, Double, Char,
String, Null), `IrGetValue`, `IrSetValue`, `IrCall`,
`IrConstructorCall`, `IrGetField`, `IrSetField`, `IrWhen`, `IrBlock`,
`IrComposite` (Compose-plugin's slot-table bookkeeping wrapper),
`IrTypeOperatorCall` (cast / safe-cast / `is`), `IrStringConcatenation`,
`IrFunctionExpression` (lambdas, with full closure conversion — see
§2.5), `IrGetObjectValue`, `IrVararg`, `IrTry` (both statement and
expression position, with shared result register patching), `IrReturn`,
`IrThrow`, `IrWhileLoop`, `IrDoWhileLoop`, `IrBreak`, `IrContinue`.

### 2.2 Primitive types + arithmetic

Int, Long, Float, Double, Boolean, String, `Unit`, `null`, and `Char`
(added in ADR-0002 Phase A·E item 4). Full arithmetic
(`ADD_INT`/`SUB_INT`/`MUL_INT`/`DIV_INT`/`MOD_INT`/`NEG_INT` and the
matching `_LONG`/`_FLOAT`/`_DOUBLE` opcodes, no `DIV_INT`/`MOD_INT`
through the Tier-1 JIT because of the divide-by-zero `KBCRuntimeException`
wrap contract). Comparison (`==`, `!=`, `<`, `<=`, `>`, `>=`, `===`,
null-checks). Boolean `!`. Int↔Long/Float/Double conversions. Boxing /
unboxing for nullable primitives.

### 2.3 Strings

`STRING_CONCAT` (variadic — every `+` / interpolation / multi-arg
concat collapses to one opcode), `STRING_LENGTH`, `STRING_SUBSTR`,
`INT_TO_STRING`, and a string pool deduplicated per bundle.

### 2.4 Control flow

`if` / `when` / `while` / `do-while` / `break` / `continue` / `return`
/ `throw`. `try { … } catch { … }` works — but the catch is currently
**catch-all** (KNOWN_ISSUES #2): the `catchTypeIndex` is carried in
frame metadata but not matched against the thrown value's type, so
multi-catch collapses to the first handler. Rethrow inside a catch
works correctly.

### 2.5 Higher-order functions, closures, lambdas

`val onClick = { … }`, `list.forEach { … }`, lambda parameters to
adapters — all supported. **Closures with captured outer-scope
locals are fully supported** via `KBCValue.ClosureRef(fnIdx,
capturedRegs)` (tag `0x25`). The
[`ClosureAnalyzer`](ketoy-compiler-plugin/src/main/kotlin/dev/ketoy/compiler/emit/ClosureAnalyzer.kt)
walks the lambda body and records `IrValueSymbol`s resolving to
outer-scope bindings; `KBCEmitter.emitFunction(fn, captures)` lays out
the lambda's KBC function with captures in registers `0..K-1` and
formal params at `K..K+N-1`. Runtime resolvers
(`KBCParamSet.getLambda` / `getValueChangeLambda` / `getContentSlot` /
`getItemContentSlot`) snapshot capture values **eagerly** at slot
resolution time from the parent frame's register file, so the lambda
sees parent state as of the `COMPOSABLE_CALL` site. Audited by
`ClosureFixturesAuditTest` against
[`:ketoy-closure-fixtures`](ketoy-closure-fixtures/) with 6 capture
patterns (single, multi, navigation-onClick, nested two-level, branch,
non-capturing baseline).

Compose's `ComposableSingletons$X.<get-lambda-N>()` extraction (Compose
plugin pulls non-capturing lambdas into singleton getters) is unwrapped
by `KBCValueEncoder.extractComposableSingletonLambda` — it walks the
backing-field initializer of `composableLambdaInstance(...)` and emits
the inner `IrFunctionExpression` as a normal `FunctionRef`.

### 2.6 Suspend functions / coroutines

`suspend fun foo()` lowers via
[`SuspendStateMachineBuilder`](ketoy-compiler-plugin/src/main/kotlin/dev/ketoy/compiler/emit/SuspendStateMachineBuilder.kt)
into a state machine using `INVOKE_CAPABILITY_SUSPEND` →
`SUSPEND_POINT(contId)` → `RESUME_VALUE(dst)` chains. Each suspend
call site gets a unique continuation ID; the runtime continuation
table dispatches resumption. Other coroutine opcodes:
- `LAUNCH(fnIdx, args, scope)` for `viewModelScope.launch { ... }`
- `ASYNC(dst, fnIdx, args, scope)` + `AWAIT(dst, deferredReg)` for
  `async { } / await()`
- `WITH_CONTEXT(dispatcherCapId, fnIdx, args)` for
  `withContext(Dispatchers.IO) { ... }`
- `FLOW_EMIT(flowReg, valueReg)`,
  `FLOW_COLLECT(flowReg, collectorFnIdx, dst)`,
  `COLLECT_AS_STATE(dst, flowReg, initialReg)` for Flow / StateFlow
  consumption.

Structured concurrency: VM owns a `SupervisorJob(parentScope)`-backed
child scope; `vm.cancel()` cascades. CancellationException is
preserved. Non-CancellationException failures inside
`viewModelScope.launch` swallow per `viewModelScope` semantics. Notes:
KBC→KBC suspend goes through the capability path (KNOWN_ISSUES #1 —
extra continuation alloc but functionally correct).

### 2.7 Classes, data classes, sealed classes, objects

- **Data class**: `equals` / `hashCode` / `toString` / `copy` /
  `componentN` flow through the `GENERATED_DATA_CLASS_MEMBER`
  IR-origin allowlist. Constructor calls work for user-defined
  data classes via the KBC heap (`NEW_INSTANCE`, `GET_FIELD`,
  `SET_FIELD`).
- **Sealed classes / enums**: `is` (`INSTANCEOF`), `as`
  (`CAST`), `as?` (`SAFE_CAST`), `when` exhaustiveness, branching
  all work. Type filtering on the runtime side, however, is
  limited (KNOWN_ISSUES #2 affects `catch` only — instance-of
  checks work fine).
- **Object declarations** (`object Foo { … }`):
  `IrGetObjectValue` is handled; `kotlin.Unit`, `kotlin.collections.*`
  passthroughs work.
- **Inheritance / interfaces**: limited — there is no virtual-dispatch
  table beyond `INVOKE_VIRTUAL` for stdlib methods. Adapter-routed
  Compose types and registered capabilities are the supported way to
  reach platform behaviour. User-class member functions are reachable
  through `INVOKE_VIRTUAL` against the `KBCHeap` object model.
- **Generics**: erased at IR time, so KBC sees the same shape Kotlin
  would. Type checks (`is List<String>` etc.) only match the erased
  type.
- **Companion objects**: properties are emitted as static-style getters
  (`<get-X>`) and resolved by the validator's allowlists +
  `ComposeTokenRegistry`.
- **Extension functions**: top-level extensions (defined in user code,
  reachable transitively from a `@KetoyComposable` root) are walked
  per Phase 11D's closure walk. Receiver becomes register 0 of the
  helper function.
- **Top-level helpers**: any unannotated same-module top-level
  `fun foo()` is auto-included via `CapabilityValidator`'s transitive
  closure walk (ADR-0003 §3.4). Validation walks into the helper and
  any errors carry a `Reached via: root → helper1 → helper2` breadcrumb.

### 2.8 Collections

`LIST_NEW`, `LIST_ADD`, `LIST_GET(idx)`, `LIST_SIZE`,
`LIST_FOR_EACH(elemReg, bodyEndPC)`, `MAP_NEW`, `MAP_PUT(key, value)`,
`MAP_GET(key)`. `listOf(...)` / `mapOf(...)` / `mutableListOf(...)`
stdlib calls are intrinsified — recognised by the validator's
`isKotlinBuiltIn` allowlist and lowered to KBC collection opcodes.
Bigger stdlib collection operations (`map`, `filter`, `reduce`) flow
through the stdlib via `INVOKE_VIRTUAL`/`INVOKE_STATIC` against the KBC
heap.

### 2.9 Hard non-goals (compile-time-rejected by `CapabilityValidator`)

These produce typed diagnostics with FQ name + rationale + fix example
+ docs URL:

- `android.*` / `androidx.*` direct calls outside the catalog →
  `DirectAndroidApiAccess`.
- `kotlin.reflect.*`, `java.lang.Class.get*`,
  `java.lang.reflect.*` → `ReflectionUsage`.
- `java.io.*`, `java.nio.*`, `kotlin.io.*` (file I/O) →
  `FileIoUsage`.
- `kotlinx.coroutines.GlobalScope.*`, `runBlocking`, raw
  `CoroutineScope()` factory → `GlobalScopeUsage`.
- `@KetoyCapabilityStub` referencing an ID not in the host's
  registry JSON → `UnregisteredCapability` (with `id=0x4001`-style
  hex formatting).
- `@Composable` callee not in the catalog or `AdapterFqNameRegistry`
  → `UnregisteredComposable`.
- Compose-domain constructor without a registered adapter →
  `NonKbcConstructor`.
- Anything else → `UnregisteredCall` with up to 3 fuzzy-match
  suggestions.

---

## 3. ViewModel support

Two layers, both load-bearing in production:

### 3.1 Runtime-side: `KetoyVirtualViewModel`

[`KetoyVirtualViewModel`](ketoy-runtime/src/main/kotlin/dev/ketoy/runtime/lifecycle/KetoyVirtualViewModel.kt)
extends Android `ViewModel`, owns a `KetoyVM` per screen, and is what
`KetoyScreen` instantiates via `viewModel(factory = …)`. It exposes
exactly four state operations + one event-dispatch entry point:

- `state: StateFlow<Map<String, Any?>>` — the entire flat KBC state
  map, collected by Compose for recomposition.
- `getState(key: String): Any?` — thread-safe snapshot read.
- `setState(key, value)` — atomic single-key update; triggers one
  StateFlow emission and mirrors the persistable subset to
  `SavedStateHandle`.
- `setStateAll(updates: Map<String, Any?>)` — atomic multi-key
  update, single emission.
- `removeState(key)` — atomic key removal.
- `observeState(key: String): Flow<Any?>` — keyed observation with
  `distinctUntilChanged`.
- `dispatch(eventName: String, payload: Any? = null)` — calls the KBC
  function index registered for `eventName` in the bundle's
  `KBCViewModelDescriptor.eventHandlers` map, passing the payload +
  `setState` + `getState` lambdas as the first three arguments.
  Unknown events log a warning and no-op; handler exceptions log but
  don't crash.

**State model**: `Map<String, Any?>`. Persistable types (mirrored to
`SavedStateHandle`): `String`, `Int`, `Long`, `Float`, `Double`,
`Boolean`, and the matching primitive arrays + `Array<*>`. Non-
persistable values are kept in memory but skipped during persistence
(filtered out on save, restored as missing). Restore priority on
construction: `savedStateHandle[SAVED_STATE_KEY]` > `initialExtras`
constructor arg > empty.

`Factory(bundle, registry, initialExtras, adapterRegistry,
constructorRegistry)` is the standard `ViewModelProvider.Factory`
implementation. Hilt-wired hosts get this for free via
`KetoyViewModelFactoryBuilder.build(bundle, extras)`.

### 3.2 KBC-side: `KetoyBaseViewModel`

[`KetoyBaseViewModel`](ketoy-runtime/src/main/kotlin/dev/ketoy/runtime/lifecycle/KetoyBaseViewModel.kt)
is the **base class developers extend when writing
`@KetoyViewModel`-annotated classes** that compile to KBC. It exposes
four `lateinit var` properties with `internal set`:

```kotlin
@KetoyViewModel
class CounterViewModel : KetoyBaseViewModel() {
    override fun init() { setState("count", 0) }
    fun increment() {
        val current = getState("count") as? Int ?: 0
        setState("count", current + 1)
    }
}
```

- `viewModelScope: CoroutineScope` — the same scope as the host
  `KetoyVirtualViewModel`. Coroutines launched here cancel when the
  screen leaves the back stack.
- `getState`, `setState`, `observeState` lambdas — bind directly to
  `KetoyVirtualViewModel` methods.
- `open fun init()` — runs once after the runtime binds the `lateinit`
  properties. Default no-op.

Constructor parameters of `@KetoyViewModel` classes are resolved
**via the host's `KetoyCapabilityProvider`** — the KBC binding layer
treats them as capability lookups, so they must be registered IDs or
app-specific registrations.

### 3.3 What you can put in a KBC ViewModel

- `MutableStateFlow<T>(initial)` / `MutableSharedFlow<T>(replay)` via
  `STATE_FLOW_CREATE` / `SHARED_FLOW_CREATE` capabilities.
- `viewModelScope.launch { … }` / `viewModelScope.async { … }`.
- Suspend functions, `withContext(Dispatchers.IO)`, `Flow.collect { }`,
  `flow.map { } / filter { } / debounce { } / flatMapLatest { } /
  combine { } / take { } / distinctUntilChanged()` — every operator
  exists as a `FLOW_*` capability (§5.5).
- Calls to host capabilities through `@KetoyCapabilityStub`-marked
  declarations (Room DAO, Retrofit service, DataStore, etc.).
- Plain Kotlin business logic: data classes, sealed classes,
  conditional branches, loops.
- Calls into other `@KetoyViewModel` classes' methods within the same
  bundle (KBC→KBC dispatch via the capability path; same caveat as
  §2.6 KNOWN_ISSUES #1).

### 3.4 What KBC ViewModels can NOT do

- **Inject host dependencies directly.** Hilt is host-side only.
  Constructor params resolve through `KetoyCapabilityProvider`; the
  KBC class never sees a Hilt graph.
- **Hold non-persistable state across process death.** Any value
  outside the `isPersistable` allowlist is dropped at save time and
  reappears as absent on restore.
- **Override `onCleared`.** Lifecycle is owned by
  `KetoyVirtualViewModel`; the `KetoyBaseViewModel.init()` hook is the
  only lifecycle entry. Cleanup happens implicitly via
  `viewModelScope` cancellation.

---

## 4. Business logic / Kotlin code at large

Anything reachable from a `@KetoyComposable` / `@KetoyEntryPoint` /
`@KetoyViewModel`-annotated root, via the transitive closure walk in
[`CapabilityValidator`](ketoy-compiler-plugin/src/main/kotlin/dev/ketoy/compiler/CapabilityValidator.kt),
is exported to KBC and can be updated by shipping a new `.ktx`. Code
that is **not** reachable from any KBC root compiles to DEX as plain
Kotlin and ships with the next APK release — that's ADR-0003 §3.4 in
action (Phase 11D landed the closure walk).

| Feature | Status | Notes |
|---|---|---|
| `data class` | Full | `copy`, `componentN`, structural equality auto-generated. |
| `sealed class` / `sealed interface` | Full | `when` exhaustiveness, `is`-checks, `as` / `as?`. |
| `object` declarations | Full | `IrGetObjectValue` handled; companion property reads route through `ComposeTokenRegistry` or stdlib allowlist. |
| `enum class` | Full | Reads route through the same allowlists; `values()` / `valueOf()` work via stdlib intrinsics. |
| `inline class` / value class | Compose `Dp`, `Sp`, `Color`, `TextUnit` handled via `ComposeTokenRegistry` + value-class `<get-value>` unbox in `KBCModifierIRWalker`. User-defined value classes are not specially handled — they reach the emitter as their unboxed primitive form. |
| `inline fun` | Inlined by frontend; the emitter sees the inlined body. Reified type parameters work as long as the use site is concrete. |
| Top-level functions | Full | Auto-included in the closure walk. |
| Extension functions | Full | Receiver becomes register 0. |
| Suspend functions | Full | State-machine lowering, structured concurrency, `withContext`, async/await. |
| Higher-order / lambdas | Full | Closure conversion via `ClosureRef` (§2.5). |
| Generics | Erased at IR; behaves like erased JVM generics. |
| Coroutine `Flow` / `StateFlow` / `SharedFlow` | Full via capabilities at `0x0C00–0x0C08`. |
| `try { } catch { } finally { }` | Catch is catch-all (KNOWN_ISSUES #2); rethrow works. |
| `throw` / custom exceptions | Full as long as the exception type can be constructed via the KBC heap. |
| Reflection | **Compile-error** (`ReflectionUsage`). |
| File I/O | **Compile-error** (`FileIoUsage`). |
| `GlobalScope` / `runBlocking` | **Compile-error** (`GlobalScopeUsage`). |
| Direct Android API access | **Compile-error** (`DirectAndroidApiAccess`). |
| Java interop beyond allowlisted stdlib | Rejected via `UnregisteredCall`. |
| Repository pattern with DAOs / Retrofit | Supported **by wrapping them as capabilities** in the host's `KetoyCapabilityProvider`, then calling stubs from KBC. The repository class itself stays in the host APK. |

---

## 5. Host bridge: how Hilt, Room, DataStore, navigation, network reach KBC

KBC code never sees Hilt, Retrofit, OkHttp, Room DAOs, DataStore,
SharedPreferences, the Android `Context`, or any of the Android
framework directly. The bridge is exactly two things:

1. **Capabilities** — Short-ID-keyed lambdas registered on
   [`CapabilityRegistry`](ketoy-runtime/src/main/kotlin/dev/ketoy/runtime/capability/CapabilityRegistry.kt)
   in four flavours: sync, suspend, flow, and `@Composable`.
2. **`@KetoyCapabilityStub(id, name)`** — KBC source-side
   placeholder that the compiler plugin replaces with the
   matching `INVOKE_CAPABILITY*` opcode at the call site.

The host wires both via a `KetoyCapabilityProvider` injected by Hilt;
the registry JSON lives in `ketoy-capabilities.json` so the compiler
plugin can validate stub IDs at compile time.

### 5.1 Standard library capabilities (built-in, no host work)

Defined in
[`CapabilityIds`](ketoy-capabilities-core/src/main/kotlin/dev/ketoy/capabilities/core/CapabilityIds.kt)
and registered via `registerCoreCapabilities(context, dataStore?,
analyticsTracker?)` in
[`CoreCapabilityModule`](ketoy-capabilities-core/src/main/kotlin/dev/ketoy/capabilities/core/CoreCapabilityModule.kt).
67 IDs total, broken down by range:

**Network (0x0500–0x0506)** via Ktor + OkHttp:
- `HTTP_GET` / `POST` / `PUT` / `DELETE` (suspend, `(url, body?): String`)
- `HTTP_REQUEST` (suspend, generic, returns `KetoyHttpResponse`)
- `SSE_SUBSCRIBE` (returns `Flow<String>`)
- `WEBSOCKET_CONNECT` (reserved — not registered in
  `NetworkCapabilities.registerNetworkCapabilities`; the 6 active
  ones are GET/POST/PUT/DELETE/REQUEST/SSE).

**Storage — DataStore KV (0x0600–0x0605)** via
`PreferenceDataStoreFactory`:
- `KV_GET` / `KV_SET` / `KV_DELETE` / `KV_GET_ALL` / `KV_CLEAR`
  (suspend) plus `KV_OBSERVE` (returns `Flow<Any?>`).
- Supported value types: `String`, `Int`, `Long`, `Float`, `Double`,
  `Boolean`. Anything else throws `KetoyException`.

**Storage — Room bridge (0x0610–0x0614, generic)** plus
[`KBCRoomBridge`](ketoy-capabilities-core/src/main/kotlin/dev/ketoy/capabilities/core/KBCRoomBridge.kt)
DSL that the **host** uses to register typed Room operations at
`0x4000+`. The bridge ships three convenience helpers
(`suspendCapability` / `flowCapability` / `syncCapability` plus the
typed `observeList` / `mutate` / `findOne`). Every method validates
`id >= APP_SPECIFIC_START` (0x4000).

**Navigation (0x0700–0x0708)** via
[`KetoyNavigator`](ketoy-capabilities-navigation/src/main/kotlin/dev/ketoy/capabilities/navigation/KetoyNavigator.kt)
+ `ComposeKetoyNavigator` wrapping a Compose `NavController`:
- `NAV_PUSH(route)`, `NAV_POP()`, `NAV_REPLACE(route)`,
  `NAV_POP_TO(route, inclusive)`, `NAV_DEEP_LINK(uri)`,
  `NAV_SET_RESULT(key, value)`, `NAV_GET_RESULT(key)` (suspend),
  `NAV_CAN_POP()`, `NAV_CURRENT_ROUTE()`.

**Platform (0x0900–0x090A)**: `ANALYTICS_TRACK(event, props)`,
`TOAST(text)`, `VIBRATE(durationMs)`, `CLIPBOARD_SET(text)` /
`CLIPBOARD_GET()` (suspend), `OPEN_URL(url)`,
`REQUEST_PERMISSION(perm)` (suspend) /
`CHECK_PERMISSION(perm)`, `DEVICE_LOCALE()`, `APP_VERSION()`,
`LOG(level, tag, msg)`.

**ViewModel state (0x0A00–0x0A03)**: `VM_GET_STATE(key)`,
`VM_SET_STATE(key, value)`, `VM_OBSERVE_STATE(key)` (Flow),
`VM_DISPATCH(event, payload)`. These are how KBC code reads/writes the
`KetoyVirtualViewModel` state map — `vmSetState("count", 5)` from
inside a `@KetoyComposable` works end-to-end.

**Coroutine dispatchers (0x0B00–0x0B03)**: `DISPATCHER_IO`,
`DISPATCHER_DEFAULT`, `DISPATCHER_MAIN`, `DISPATCHER_UNCONFINED` —
returned to `WITH_CONTEXT(dispatcherCapId, fnIdx)` as the dispatcher
argument.

**Flow operators (0x0C00–0x0C08)**: `FLOW_MAP`, `FLOW_FILTER`,
`FLOW_FLAT_MAP_LATEST`, `FLOW_COMBINE`, `FLOW_TAKE`, `FLOW_DEBOUNCE`,
`FLOW_DISTINCT_UNTIL_CHANGED`, `STATE_FLOW_CREATE`,
`SHARED_FLOW_CREATE`.

### 5.2 Hilt integration ([`ketoy-hilt`](ketoy-hilt/src/main/kotlin/dev/ketoy/hilt/))

Five public types make up the integration:

- **`KetoyCapabilityProvider`** (interface) — what the host
  implements to expose its capability graph. One method:
  `fun buildRegistry(): CapabilityRegistry`. Real-world
  implementation in the sample app:
  [`TodoCapabilityProvider`](app/src/main/java/dev/ketoy/ketoyapp/di/TodoCapabilityProvider.kt)
  — calls `registerCoreCapabilities` (network + storage +
  platform + dispatchers) then `registerNavigationCapabilities`
  then a `KBCRoomBridge { observeList(…); suspendCapability(…) }`
  block for app-specific Room operations + `registerFlow` /
  `registerSuspend` calls for DataStore-backed settings flows.
- **`KetoyHiltModule`** (`@Module @InstallIn(SingletonComponent::class)`)
  — `@Provides @Singleton` for `CapabilityRegistry` (delegates to
  the bound `KetoyCapabilityProvider`), `KetoyRuntime`,
  `KetoyBundleLoader`, and `KetoyViewModelFactoryBuilder`. The
  runtime provider auto-wires `dexCacheDir` from
  `Context.codeCacheDir` and `enableDevOverlay` from the host
  APK's `FLAG_DEBUGGABLE`.
- **`KetoyHiltEntryPoint`** (`@EntryPoint`) — for non-injected
  contexts (custom Views, Services, BroadcastReceivers).
  Companion `get(context)` extracts via
  `EntryPointAccessors.fromApplication`.
- **`KetoyHiltProvider`** (`@Composable`) — wraps composition
  tree, publishes `LocalKetoyViewModelFactoryBuilder` +
  `LocalKetoyBundleLoader` for `KetoyScreen` to consume.
- **`KetoyConfigCustomizer`** (`fun interface`) — optional
  binding (`@BindsOptionalOf`) that mutates `KetoyConfig` before
  the runtime constructs. Used by the sample app to load the
  Ed25519 public key from assets and inject the
  `MaterialIconsResolver`.

### 5.3 Room

There is **no special Room generator**. The bridge is the standard
flow:

1. Host writes a normal Room `@Entity` + `@Dao` + `@Database`.
2. Host injects the DAO into `TodoCapabilityProvider` (or your
   equivalent).
3. Host registers each DAO operation under a `0x4000+` capability ID
   via `KBCRoomBridge` helpers — typically `observeList(id) {
   dao.observeAll() }` for `Flow<List<Entity>>`, `findOne(id) { args ->
   dao.find(args[0] as Long) }` for `suspend (Long) -> Entity?`,
   `mutate(id) { args -> dao.update(...) }` for `suspend (...) ->
   Unit`, `suspendCapability(id) { args -> dao.insert(...) }` for
   `suspend (...) -> ReturnType`.
4. Host writes `@KetoyCapabilityStub(id = 0x4001, name = "FIND_TODO")
   suspend fun findTodo(id: Long): List<Any?>? = error(STUB_MSG)` so
   KBC source can call `findTodo(42L)` and the compiler plugin
   replaces it with `INVOKE_CAPABILITY_SUSPEND 0x4001`.

Real example: every Todo operation in the sample app
([`AppCapabilityIds.kt`](app/src/main/java/dev/ketoy/ketoyapp/di/AppCapabilityIds.kt)
+ [`TodoCapabilityProvider.kt`](app/src/main/java/dev/ketoy/ketoyapp/di/TodoCapabilityProvider.kt)
+ [`Capabilities.kt`](app/src/main/java/dev/ketoy/ketoyapp/ketoyscreens/Capabilities.kt)).

### 5.4 DataStore

Same pattern as Room. The bridge layer (`registerCoreCapabilities`
with a `dataStore` arg) gives KBC `KV_*` for free against a preference
DataStore. For typed flows (`Flow<String>`, `Flow<Boolean>`), the host
registers app-specific Flow capabilities — the sample app exposes
`OBSERVE_PROFILE_NAME` / `SET_PROFILE_NAME` / `OBSERVE_DARK_MODE` /
`SET_DARK_MODE` at `0x4010..0x4013`.

### 5.5 Network — Retrofit/OkHttp/Ktor

The built-in `HTTP_*` capabilities use Ktor with the OkHttp engine.
For a full Retrofit setup, the host wraps each endpoint as a suspend
capability under `0x4000+`, exactly like the Room flow above. KBC sees
domain-shaped function calls; networking concerns stay in the host.

### 5.6 Other Android APIs

Any Android API can be reached by registering a capability for it.
This is the **only** way — direct `android.*` / `androidx.*` calls
from KBC fail compilation. Examples shipped today: clipboard,
permissions, vibration, locale, app version, toast, opening URLs,
logging. The Bluetooth / camera / WorkManager / location pattern is
identical: wrap as a suspend / flow / sync capability and stub on the
KBC side.

---

## 6. Runtime configuration, bundle format, dev tooling (other supported)

### 6.1 `.ktx` bundle format

`.ktx` is a Brotli-compressed, Ed25519-signed binary container. Format
version is **2** (additive — pre-2.1 readers parse v2 files with one
field defaulted). 10 ordered sections: STRING_POOL, ADAPTER_MANIFEST,
CONSTRUCTOR_MANIFEST, CAPABILITY_MANIFEST, MODIFIER_TABLE (optional),
FUNCTION_TABLE, CODE, DEBUG_INFO (optional), ENTRY_POINTS,
BUNDLE_METADATA (carries bundle ID, composable descriptors, view-model
descriptors, and the additive trailing `minAppVersion: Int`).
[`KtxReader`](ketoy-bundle-format/src/jvmAndAndroidMain/kotlin/dev/ketoy/bundle/KtxReader.kt)
+ [`KtxWriter`](ketoy-bundle-format/src/jvmMain/kotlin/dev/ketoy/bundle/KtxWriter.kt).

### 6.2 Bundle loading

[`KetoyBundleSource`](ketoy-runtime/src/main/kotlin/dev/ketoy/runtime/bundle/KetoyBundleSource.kt)
has four variants:
- `Preloaded(bundle)` — direct pass-through.
- `Raw(bytes)` — through `runtime.parseBundle`.
- `Asset(path)` — read via `context.assets`.
- `Remote(url, headers)` — Ktor + OkHttp, with on-device ETag cache at
  `context.cacheDir/ketoy_bundles/<sha256(url)>.ktx` and
  `.etag` sidecar; 304 serves cache; offline fallback to cache on
  network failure. HTTPS + signature verify is the production
  contract.

### 6.3 Signing + key management

Ed25519 keypair generation via `openssl genpkey -algorithm Ed25519`
(raw 32-byte seed); signing is plumbed through
[`KetoyBundleTask`](ketoy-gradle-plugin/src/main/kotlin/dev/ketoy/gradle/KetoyBundleTask.kt)
(`ketoy { signingKeyFile = file("keys/sample-private.key") }`). Public
key loads via
[`KetoyKeystore.loadFromAsset`](ketoy-runtime/src/main/kotlin/dev/ketoy/runtime/security/KetoyKeystore.kt)
or `.loadFromRawResource`. Verification: Ed25519 → `KtxReader` →
`BundleValidator` chain inside `KetoyRuntime.parseBundle`.

### 6.4 JIT

[`KBCTier1JIT`](ketoy-runtime/src/main/kotlin/dev/ketoy/runtime/vm/KBCTier1JIT.kt)
+
[`KBCToDexTranslator`](ketoy-runtime/src/main/kotlin/dev/ketoy/runtime/vm/KBCToDexTranslator.kt)
— DexMaker-backed Tier-1 JIT for whitelisted pure-logic functions (no
capabilities, no coroutines, no compose, no DIV/MOD on Int/Long).
Activated on API 26+ when `enableJIT = true` + `dexCacheDir` is non-
null. Translation failures are swallowed and logged; the interpreter
is always the fallback. Speed gate ≥1.5× over interpreter
(`JitSpeedupTest`).

### 6.5 Dev overlay (debug builds only)

`KetoyDevEvents` + `KBCAdapterNameResolver` in the runtime; reverse-
lookup name maps + `KetoyDevOverlay` `@Composable` panel in
[`ketoy-devtools`](ketoy-devtools/). Auto-enabled by `KetoyHiltModule`
when host APK has `FLAG_DEBUGGABLE`. Zero-overhead in release builds
— every emit site is `if (devEvents != null) … else 0L`-gated. Shows
COMPOSABLE_CALL / CONSTRUCT_JVM / CAPABILITY dispatch logs with
human-readable names.

### 6.6 Test infrastructure

[`ketoy-test`](ketoy-test/src/main/kotlin/dev/ketoy/test/) ships
`FakeAdapterRegistry` + `FakeConstructorRegistry` (record-only fakes
extending the production registries), `KBCBuilder.composableCall` /
`constructJvm` + `ParamBuilder` sparse-encoding DSL, `buildKBCBundle {
function(name) { … } }` named-entry-point DSL, and `KetoyTestRuntime`
with descriptive entry-point error messages on
`execute(bundle, entryPoint)`.

---

## 7. Gradle plugin / build pipeline

`id("dev.ketoy.compiler")` from the Gradle plugin portal +
`dev.ketoy.vm:ketoy-bom:0.2.1-alpha`. Two modes:

- **Bundle module mode** (default): library module with KetoyBC source,
  produces `.ktx` in `build/ketoy-bundles/`. Consumer (`:app`) copies
  the asset.
- **In-tree mode (ADR-0003)**: `ketoy { exportFromAppModule = true;
  bundleVariant = "release"; minAppVersion = N }` on the **host APK**.
  The compiler plugin attaches only to the selected variant's
  `compile<Variant>Kotlin`; output lands directly in
  `src/main/assets/ketoy/<bundleId>.ktx` and the plugin auto-wires
  `merge<Variant>Assets` dependency. The sample app uses this mode —
  the entire KBC source for the home screen lives in
  [`app/src/main/kotlin/dev/ketoy/ketoyapp/ketoyscreens/`](app/src/main/kotlin/dev/ketoy/ketoyapp/ketoyscreens/)
  alongside native code; the closure walk keeps the two compilation
  contracts disjoint.

`./gradlew ketoyBundle` produces a signed `.ktx` against the
host-supplied private key. The runtime activation policy
(`PackageInfo.longVersionCode` check, rollback, `onBundleAppVersionMismatch`
callback) is plumbed through the format but not yet enforced at
runtime — that's Phase 11B/11D.

---

## 8. Where to look next

- Active workstreams + known limits: [`KNOWN_ISSUES.md`](KNOWN_ISSUES.md)
- Architecture deep-dive: [`ARCHITECTURE.md`](ARCHITECTURE.md)
- Phase-by-phase implementation history + decisions: [`CLAUDE.md`](CLAUDE.md)
- Two-layer parameter system + KBC value catalogue: [`docs/architecture/two-layer-parameter-system.md`](docs/architecture/two-layer-parameter-system.md)
- Full capability reference table: [`docs/capabilities/reference.md`](docs/capabilities/reference.md)
- Real-world sample (Todo app with KBC home screen + native fallbacks): [`app/`](app/)
