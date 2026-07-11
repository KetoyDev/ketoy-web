# Kotlin Language

Ketoy executes a well-defined **subset** of Kotlin at runtime. This page
covers what you can use inside a `@KetoyComposable` / `@KetoyEntryPoint`
/ `@KetoyViewModel` and what the compiler rejects.

The shorter version: **write idiomatic Kotlin**. Data classes, sealed
classes, `when`, lambdas, coroutines, generics, extension functions,
all supported. The boundary is at the **system interface**: Android
APIs, reflection, file I/O, raw Java interop need to go through
capabilities.

---

## Primitive types

`Int`, `Long`, `Float`, `Double`, `Boolean`, `String`, `Char`, `Unit`,
`null`. Full arithmetic (`+ - * / %`), comparison (`==`, `!=`, `<`,
`<=`, `>`, `>=`, `===`), null-checks (`?:`, `?.`, `!!`). Boolean
operators (`&&`, `||`, `!`). Bitwise on Int (`or`, `and`, `xor`, `shl`,
`shr`, `ushr`). Int↔Long/Float/Double conversions. Boxing / unboxing of
nullable primitives.

---

## Strings

`String` is a first-class type. `+` concatenation (`"a" + b`), template
interpolation (`"$x $y"`), `.length`, `.substring(start, end)`. The
string pool deduplicates literals per bundle.

---

## Control flow

All standard Kotlin control flow:

```kotlin
if (x > 0) doA() else doB()

when (state) {
    is Loading -> Spinner()
    is Error -> ErrorText(state.message)
    is Success -> Content(state.value)
}

for (item in list) { process(item) }
items.forEach { process(it) }

while (active) { tick() }
do { tick() } while (active)

repeat(3) { i -> log(i) }
```

`break` / `continue` work. `return` returns from the enclosing function.

### `try` / `catch` / `finally`

```kotlin
try {
    risky()
} catch (e: NetworkException) {
    log(e)
} catch (e: Exception) {
    setState("error", e.message)
} finally {
    setState("loading", false)
}
```

**Caveat**: catch is currently catch-all. The first handler runs for any
exception type, multi-catch falls through to the first one. Always
explicitly re-throw `CancellationException` to preserve structured
cancellation:

```kotlin
} catch (e: Throwable) {
    if (e is CancellationException) throw e
    log(e)
}
```

---

## Data classes

Full support, `equals`, `hashCode`, `toString`, `copy`, `componentN`
auto-generated:

```kotlin
data class Todo(val id: Long, val title: String, val completed: Boolean)

@KetoyComposable
@Composable
fun TodoRow(todo: Todo) {
    val (id, title, completed) = todo  // destructuring works
    Row {
        Checkbox(checked = completed, onCheckedChange = { /* ... */ })
        Text(title)
    }
}
```

`copy()` creates new instances; structural equality is automatic.

---

## Sealed classes / sealed interfaces

```kotlin
sealed interface UiState {
    object Loading : UiState
    data class Error(val message: String) : UiState
    data class Content(val items: List<Item>) : UiState
}

@KetoyComposable
@Composable
fun Screen(state: UiState) {
    when (state) {
        is UiState.Loading -> CircularProgressIndicator()
        is UiState.Error -> Text("Error: ${state.message}")
        is UiState.Content -> Column { state.items.forEach { ItemRow(it) } }
    }
}
```

`is` (`INSTANCEOF`), `as` (`CAST`), `as?` (`SAFE_CAST`),
exhaustiveness checking, all work.

---

## Enum classes

```kotlin
enum class Priority { LOW, MEDIUM, HIGH }

fun colorFor(p: Priority): Color = when (p) {
    Priority.LOW -> Color.Gray
    Priority.MEDIUM -> Color.Yellow
    Priority.HIGH -> Color.Red
}
```

`values()` and `valueOf()` work via stdlib intrinsics.

---

## Objects (singletons)

```kotlin
object AppDefaults {
    const val MAX_ITEMS = 50
    val PADDING = 16
}

fun render() = Column(modifier = Modifier.padding(AppDefaults.PADDING.dp)) { /* ... */ }
```

Companion-object properties are emitted as static-style getters and
resolved by the validator + `ComposeTokenRegistry`.

---

## Functions

### Top-level functions

```kotlin
fun formatCurrency(amount: Long): String = "$${amount / 100.0}"

@KetoyComposable @Composable
fun PriceTag(price: Long) { Text(formatCurrency(price)) }
```

Same-module top-level functions are auto-included in the closure walk.
You don't need `@KetoyComposable` on plain helpers, only on entry
points and on `@Composable` functions that participate in adapter
resolution.

### Extension functions

```kotlin
fun List<Todo>.completedCount(): Int = count { it.completed }

@KetoyComposable @Composable
fun Header(todos: List<Todo>) {
    Text("${todos.completedCount()} done")
}
```

The receiver becomes register 0 of the helper function.

### Inline functions

`inline fun` is **inlined by the Kotlin frontend** before the IR
extension runs, the compiler sees the inlined body. Reified type
parameters work if the use site is concrete.

### Higher-order functions / lambdas

```kotlin
val onClick: () -> Unit = { count++ }
items.forEach { item -> render(item) }
```

Lambdas with **captured outer-scope locals** are fully supported via
closure conversion (the compiler analyses each lambda, records the
captures, lowers them to function parameters threaded through
`KBCValue.ClosureRef`).

---

## Generics

Erased at IR time, KBC sees the same shape Kotlin would. Type checks
(`is List<String>`) only match the erased type:

```kotlin
val x: Any = listOf(1, 2, 3)
if (x is List<*>) { /* OK */ }
if (x is List<Int>) { /* same as List<*> at runtime */ }
```

This matches JVM behaviour.

---

## Collections

```kotlin
val list = listOf("a", "b", "c")
val map = mapOf("k" to "v", "q" to "r")
val mutable = mutableListOf<Int>().apply { add(1); add(2) }

list.size
list[0]
list.forEach { println(it) }
list.map { it.uppercase() }
list.filter { it.startsWith("a") }
```

`listOf`, `emptyList`, `mapOf`, `mutableListOf` are intrinsified and
lowered to KBC collection opcodes (`LIST_NEW`, `MAP_NEW`, …). Bigger
stdlib operations route through `INVOKE_VIRTUAL` against the KBC heap.

If you call a stdlib function that **isn't** in the validator's
allowlist, you'll get `UnregisteredCall` with a fuzzy-match
suggestion. Add the FQ name to your `ketoy-capabilities.json`'s
`allowedStdlibFqNames` list to permit it:

```json
"allowedStdlibFqNames": [
  "kotlin.collections.listOf",
  "kotlin.collections.emptyList",
  "kotlin.let",
  "kotlin.run",
  "kotlin.also",
  "kotlin.apply",
  "kotlin.with",
  "kotlin.takeIf",
  "kotlin.requireNotNull",
  "kotlin.error",
  "kotlin.TODO"
]
```

---

## Classes (user-defined)

```kotlin
class Counter(initial: Int = 0) {
    var value: Int = initial
        private set

    fun increment() { value++ }
    fun reset() { value = 0 }
}

val c = Counter()
c.increment()
c.value      // → 1
```

User class instances live on the KBC heap (`NEW_INSTANCE`, `GET_FIELD`,
`SET_FIELD`, `INVOKE_VIRTUAL`). Inheritance is **limited**, there's no
virtual-dispatch table beyond the immediate `INVOKE_VIRTUAL` lookup.
Adapter-routed Compose types and registered capabilities are the
supported way to reach platform behaviour. For sealed-class hierarchies
you use yourself in KBC, virtual dispatch via `INVOKE_VIRTUAL` works
fine.

---

## What you can't do

### Hard non-goals (compile errors)

| Pattern | Error | Why |
|---|---|---|
| `android.util.Log.d(...)` | `DirectAndroidApiAccess` | Android framework, capability-bridge it. |
| `kotlin.reflect.typeOf<T>()` | `ReflectionUsage` | No class metadata in the KBC sandbox. |
| `MyClass::class.java` | `ReflectionUsage` | Same. |
| `File("...").readText()` | `FileIoUsage` | Use a storage capability. |
| `GlobalScope.launch { ... }` | `GlobalScopeUsage` | Use `viewModelScope`. |
| `runBlocking { ... }` | `GlobalScopeUsage` | Use a `suspend` function. |
| `MyCustomComposable()` (no adapter) | `UnregisteredComposable` | Write an adapter or use a built-in. |
| `MyClass()` constructor of a Compose-domain type | `NonKbcConstructor` | Add a constructor adapter. |
| `myFunction()` not in module / capabilities | `UnregisteredCall` | Either add it to your module or expose as capability. |

### Limits that produce silent surprises (no error)

- **`try / catch` is catch-all**, first handler runs for any throwable.
  Workaround: branch on `is` inside the handler.
- **Generics are erased**, `is List<Int>` matches any list. Standard
  JVM behaviour.
- **Inheritance** beyond `INVOKE_VIRTUAL` on direct method lookups
  is limited. Sealed-class + `when` is the recommended pattern.

---

## The closure walk

When the compiler sees a `@KetoyComposable` / `@KetoyEntryPoint` /
`@KetoyViewModel`, it walks the entire transitive call graph reachable
from that root, validating every call along the way. Same-module
unannotated top-level functions and extension functions are
auto-included.

Functions that are **not** reachable from any KBC root compile straight
to DEX as plain Kotlin and ship with the next APK release, the closure
walk leaves them untouched. This is how you can have a single `:app`
module containing both KBC source (e.g. `ketoyscreens/HomeScreen.kt`)
and native fallbacks (e.g. `ui/HomeNativeFallback.kt`).

### Breadcrumbs in error messages

Errors detected in a transitively-reached helper carry a call chain:

```
KetoyBC: Direct access to 'android.util.Log.d' is not allowed in KBC programs.

  Reached via: HomeScreen → renderHeader → logHelper

  Android APIs are not available in the KBC execution sandbox.
  ...
```

The chain follows the call path from the entry-point root to the
offending helper.

---

## Compose-specific Kotlin features

| Feature | Status |
|---|---|
| `@Composable` lambda parameters | Full support including content slots. |
| `@Composable` extension lambdas (`RowScope.() -> Unit`) | Resolved as plain content slots today; type-aware dispatch is a roadmap item. |
| `LaunchedEffect(key) { … }` | Lowered to `COMPOSE_LAUNCHED_EFFECT`. Cancels when `key` changes. |
| `SideEffect { … }` | Lowered to `COMPOSE_SIDE_EFFECT`. |
| `DisposableEffect(key) { … onDispose { … } }` | Lowered to `COMPOSE_DISPOSABLE_EFFECT`. |
| `remember { … }` | `COMPOSE_REMEMBER`. |
| `mutableStateOf(initial)` | `COMPOSE_STATE`. |
| `derivedStateOf { … }` | `COMPOSE_DERIVED`. |
| `produceState(initial) { … }` | Not yet, wrap as a `Flow` + `collectAsState`. |
| `rememberCoroutineScope()` | Use `viewModelScope` (preferred) or implement as a capability. |
| `Modifier.composed { … }` | Not yet, use a custom modifier op via an adapter. |

---

## What about `expect`/`actual`?

KBC source is single-target (Android). `expect`/`actual` declarations
aren't applicable, your KBC bundle is an Android-only artifact.

For sharing logic between KBC and platform-native code, prefer:
- Hoisting pure logic into a KMP module that both can depend on.
- Or duplicating tiny helpers (often clearer than a shared module for
  small surfaces).

Next: [KBC Opcodes →](../reference/kbc-opcodes.md)
