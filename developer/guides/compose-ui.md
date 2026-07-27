# Compose UI & State

Everything you can put on screen, plus how state, modifiers, icons,
fonts, and images flow through KBC. Every example below compiles
against the standard Material3 adapter catalog shipped with
`dev.ketoy.vm:ketoy-adapters-material3:0.4.20-alpha`.

For the canonical list of supported composables / constructors /
tokens (with adapter IDs, signatures, and notes), see
[`SUPPORTED_FEATURES.md`](../../../SUPPORTED_FEATURES.md). This page is
the **how-to**; that file is the **what-exists**.

---

## What is a `@KetoyComposable`?

A function with `@KetoyComposable` + `@Composable` is a KBC composable.
The compiler plugin walks its body, validates every call against the
adapter catalog + capability registry, and lowers it to bytecode.

```kotlin
@KetoyComposable
@KetoyEntryPoint
@Composable
fun MyScreen() {
    Column(modifier = Modifier.fillMaxSize().padding(16.dp)) {
        Text("Hello")
    }
}
```

`@KetoyEntryPoint` makes it addressable by name in `KetoyScreen(entryPoint = "MyScreen")`.

You can call **other** `@KetoyComposable` functions in the same bundle:

```kotlin
@KetoyComposable @KetoyEntryPoint
@Composable
fun Root() {
    Column {
        Header()
        Body()
    }
}

@KetoyComposable @Composable
private fun Header() { Text("Header") }

@KetoyComposable @Composable
private fun Body() { Text("Body") }
```

Helper functions that aren't `@KetoyComposable` but are reachable from
one are auto-included by the compiler's closure walk (see
[Kotlin Language guide](kotlin-language.md)).

---

## Built-in composables

The standard adapter catalog covers layout, text, buttons, inputs,
images, navigation, and feedback. **Adapter IDs are stable**,
`COLUMN = 0x0002`, `BUTTON = 0x000C`, etc.

| Category | Components |
|---|---|
| **Layout** | `Column`, `Row`, `Box`, `Spacer`, `Scaffold`, `Surface`, `Card` |
| **Text** | `Text`, `TextField` |
| **Buttons** | `Button`, `IconButton`, `Checkbox`, `Switch` |
| **Media** | `AsyncImage` (Coil), `Image` (`painterResource`), `Icon` (ImageVector) |
| **Navigation** | `TopAppBar` |

Each one accepts its real Compose / Material3 signature. The
compiler-plugin picks the **canonical overload** (e.g. for `Text`, the
17-param String overload with `minLines`; for `Surface`, the
non-clickable overload; for `Card`, the 6-param non-clickable overload).

`Canvas`, `LazyColumn`, `LazyRow`, `HorizontalDivider`, and
`VerticalDivider` are catalogued as of `0.4.20-alpha`.

> **What isn't catalogued yet?** `OutlinedButton`,
> `TextButton`, `FAB`, `ExtendedFAB`, `OutlinedTextField`, `RadioButton`,
> `Slider`, `CircularProgressIndicator`, `LinearProgressIndicator`,
> `NavigationBar`, `TabRow`, `AlertDialog`, `BottomSheet`,
> `LazyVerticalGrid`, `HorizontalPager`. Their IDs are reserved in
> `KBCAdapterIds`; calling them today produces `UnregisteredComposable`.
> To add one, see [Custom Adapter](custom-adapter.md).

---

## State

Three building blocks, identical to vanilla Compose:

```kotlin
@KetoyComposable @KetoyEntryPoint
@Composable
fun CounterScreen() {
    var count by remember { mutableStateOf(0) }
    val doubled by remember { derivedStateOf { count * 2 } }

    Column(modifier = Modifier.padding(16.dp)) {
        Text("Count: $count, Doubled: $doubled")
        Button(onClick = { count++ }) { Text("Increment") }
    }
}
```

The `count++` lambda captures `count` from the outer scope. The compiler
performs **closure conversion** at emit time: it analyses each lambda,
records which outer locals it reads, lowers them to KBC function
parameters, and emits a `KBCValue.ClosureRef(fnIdx, capturedRegs)` at
the construction site that eagerly snapshots the parent register file.

### Local state factories

Beyond `mutableStateOf`, the typed factories and `rememberSaveable`
compile as of `0.4.20-alpha`:

```kotlin
var count  by remember { mutableIntStateOf(0) }
var ratio  by remember { mutableFloatStateOf(1f) }
var total  by remember { mutableLongStateOf(0L) }
var factor by remember { mutableDoubleStateOf(1.0) }

// Survives recomposition AND configuration change:
var name by rememberSaveable { mutableStateOf("") }
```

Read and write are both supported (`count++`, `total += n`). State read
inside a `Scaffold` slot or a content lambda that captures the variable
recomposes correctly.

### Hoisting state to a ViewModel

For state that must survive rotation or process death, use
`@KetoyViewModel`. See [ViewModel guide](viewmodel.md).

---

## Modifiers

Modifier chains are recognised at IR time and pooled into the bundle's
modifier table, one entry per unique chain, referenced by index.
Supported operations:

```
Padding(start, top, end, bottom)    PaddingAll      PaddingHorizontal
PaddingVertical                      FillMaxWidth(fraction)
FillMaxHeight(fraction)              FillMaxSize(fraction)
Size                                 WidthIn(min, max)    HeightIn(min, max)
WrapContentWidth                     WrapContentHeight    WrapContentSize
Background(color, shape)             Clip(shape)
Border(width, color, shape)          Shadow(elevation, shape)
ClipToBounds                         Blur(radiusX, radiusY)
Clickable(onClick)                   Alpha(alpha)
Offset(x, y)                         ZIndex(z)            TestTag(tag)
Weight(weight)                       (RowScope/ColumnScope only)
```

Shapes: `Rectangle`, `Circle`, `RoundedCorner(size)`,
`RoundedCornerPercent(percent)`, `CutCorner(size)`.

### Named-arg modifiers work

```kotlin
Modifier.padding(top = 48.dp, start = 16.dp, end = 16.dp)
```

K2's partial-default lowering temp-binds `Dp` args into local vals; the
IR walker follows the `IrGetValue → IrVariable.initializer` chain, so
this round-trips correctly.

### `Modifier.clickable { ... }`

```kotlin
Modifier.clickable { count++ }
```

The lambda is lowered to a KBC function; the modifier carries a function
index instead of inlining the lambda body. Captures work via the same
closure-conversion mechanism as composable arguments.

---

## Layout additions

New in `0.4.20-alpha`, these bring the common Compose layout ergonomics
into KBC.

### Scroll

```kotlin
Column(modifier = Modifier.verticalScroll(rememberScrollState())) { /* ... */ }
Row(modifier = Modifier.horizontalScroll(rememberScrollState())) { /* ... */ }
```

### `Arrangement.spacedBy`

All three overloads, on `Column` / `Row` / `LazyColumn` / `LazyRow`:

```kotlin
Column(verticalArrangement = Arrangement.spacedBy(12.dp)) { /* ... */ }
Column(verticalArrangement = Arrangement.spacedBy(12.dp, Alignment.Top)) { /* ... */ }
```

### Per-corner rounded shapes

Works as a `shape =` argument **and** inside
`Modifier.clip` / `background` / `border` / `shadow`:

```kotlin
Box(
    modifier = Modifier
        .clip(RoundedCornerShape(topStart = 16.dp, bottomEnd = 16.dp))
        .background(Color.LightGray),
)
```

### Dividers and theme colours

`HorizontalDivider` and `VerticalDivider` are now first-class adapters,
and `themeColor("name")` lets a single bundle render correctly in light
**and** dark mode:

```kotlin
Surface(color = themeColor("backgroundColor")) {
    Column {
        Text("About", color = themeColor("textColor"))
        HorizontalDivider(color = themeColor("dividerColor"))
    }
}
```

---

## Lists with `forEach`

Iterate a list and emit a composable per item. This works over literal
lists **and** lists returned by a host capability, so the host can own
the collection and add an item without republishing the bundle:

```kotlin
@KetoyComposable
fun VehicleList(options: List<VehicleOption>) {
    Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
        options.forEach { option ->
            VehicleRow(option = option)     // a reusable component per item
        }
    }
}

// forEachIndexed works too:
items.forEachIndexed { index, item ->
    Text("${index + 1}. $item")
}
```

Per-item captures are correct: a `clickable { selected = it }` inside the
loop body re-snapshots the current element on each iteration. See
[Reusable components](reusable-components.md) for the row component
pattern.

> **`forEach` vs `LazyColumn`.** `forEach` eagerly emits every row (best
> for short, known lists). For long or scrolling lists use
> `LazyColumn { items(list) { ... } }`, which is virtualized. Both are
> available.

---

## Colors, dimensions, font weights, the token system

Compose property reads like `Color.Red`, `16.dp`, `FontWeight.Bold` are
resolved at compile time into compact byte-tagged literals via the
[Compose Token Registry](../reference/compose-tokens.md):

| Source | KBC encoding |
|---|---|
| `Color.Red` | `KBCValue.ColorARGB(0xFFFF0000)` |
| `Color(0xFFAA00FF)` | `KBCValue.ColorARGB(0xFFAA00FF)` |
| `16.dp` | `KBCValue.Dp(16f)` |
| `16.sp` | `KBCValue.Sp(16f)` |
| `FontWeight.Bold` | `KBCValue.FontWeightInt(700)` |
| `FontStyle.Italic` | `KBCValue.FontStyleId(ITALIC)` |
| `TextAlign.Center` | `KBCValue.TextAlignId(CENTER)` |
| `Arrangement.SpaceEvenly` | `KBCValue.VerticalArrangementId(...)` or `Horizontal...` (param-type dispatched) |
| `Alignment.CenterVertically` | `KBCValue.VerticalAlignmentId(CENTER_VERTICALLY)` |
| `ContentScale.Crop` | `KBCValue.ContentScaleId(CROP)` |
| `KeyboardType.Email` | `KBCValue.KeyboardTypeId(EMAIL)` |
| `ImeAction.Done` | `KBCValue.ImeActionId(DONE)` |

88 entries across 13 token families. If you read a token the registry
doesn't know about, the compiler emits:

```
KetoyBC: Direct access to FontWeight.Companion.<get-W250> is not allowed
```

This means the token isn't seeded. Workaround: use `FontWeight(250)`
(constructor call), which is a `CONSTRUCT_JVM` path.

---

## Icons

```kotlin
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Settings

@KetoyComposable @Composable
private fun SettingsButton() {
    IconButton(onClick = { /* … */ }) {
        Icon(imageVector = Icons.Filled.Settings, contentDescription = "Settings")
    }
}
```

The compiler encodes the icon as `KBCValue.StringLiteral(
"androidx.compose.material.icons.filled.Settings")`. The runtime
resolves it via a host-provided `KBCImageVectorResolver`.

### Host-side setup

```kotlin
@Provides @Singleton
fun provideMaterialIconsResolver(): MaterialIconsResolver =
    materialIconsResolver {
        registerFilled("Settings", Icons.Filled.Settings)
        registerFilled("Home", Icons.Filled.Home)
        registerOutlined("Edit", Icons.Outlined.Edit)
        // … per icon style helper: registerFilled / registerRounded /
        //   registerOutlined / registerSharp / registerTwoTone /
        //   registerAutoMirroredFilled (and the four other AutoMirrored variants)
    }
```

Then in `KetoyConfig`:

```kotlin
default.copy(imageVectorResolver = materialIconsResolver)
```

### Why register icons manually?

R8 strips unused icon classes from your release APK. Each `register*`
call takes a **direct compile-time reference** to the icon, R8's
reachability analysis sees the field read and keeps it alive. No `-keep`
rules required.

Icons referenced from KBC source but **not registered** by the host
render as a 24×24 transparent placeholder (`PlaceholderImageVector`),
visibly broken in QA, not a runtime crash.

---

## Fonts

### Generic families

`FontFamily.Default`, `SansSerif`, `Serif`, `Monospace`, `Cursive` are
inline tokens, no host registration needed.

```kotlin
Text(text = "Mono", fontFamily = FontFamily.Monospace)
```

### Custom fonts (`R.font.X`)

```kotlin
import androidx.compose.ui.text.font.Font
import androidx.compose.ui.text.font.FontFamily
import com.example.myapp.R

@KetoyComposable @Composable
private fun Title() {
    Text(
        text = "Hello",
        fontFamily = FontFamily(Font(R.font.courgette_regular))
    )
}
```

The encoder atomically collapses `FontFamily(Font(R.font.X))` into
`KBCValue.StringLiteral("courgette_regular")`, the resource **name**,
not the Int ID. (Resource IDs can be renumbered by R8; names are
immutable.)

Host registration:

```kotlin
@Provides @Singleton
fun provideMaterialFontFamilyResolver(): MaterialFontFamilyResolver =
    materialFontFamilyResolver {
        register("courgette_regular", FontFamily(Font(R.font.courgette_regular)))
    }
```

`KetoyConfig.fontFamilyResolver = materialFontFamilyResolver`.

For multi-font families (regular + bold + italic), build the full
`FontFamily` host-side and register it under each constituent name:

```kotlin
val inter = FontFamily(
    Font(R.font.inter_regular, FontWeight.Normal),
    Font(R.font.inter_bold, FontWeight.Bold),
    Font(R.font.inter_italic, FontWeight.Normal, FontStyle.Italic),
)
register("inter_regular", inter)
register("inter_bold", inter)
register("inter_italic", inter)
```

---

## Images

### Coil, `AsyncImage` (URL / remote)

```kotlin
import coil.compose.AsyncImage

@KetoyComposable @Composable
private fun Avatar() {
    AsyncImage(
        model = "https://i.pravatar.cc/150",
        contentDescription = "Avatar",
        modifier = Modifier.size(48.dp).clip(CircleShape),
        contentScale = ContentScale.Crop,
    )
}
```

Coil must be on the host APK's classpath (`io.coil-kt:coil-compose`).
The KBC bundle calls into it via the standard adapter.

### Local drawables, `Image` + `painterResource`

```kotlin
import androidx.compose.foundation.Image
import androidx.compose.ui.res.painterResource
import com.example.myapp.R

@KetoyComposable @Composable
private fun Banner() {
    Image(
        painter = painterResource(R.drawable.banner),
        contentDescription = null,
        modifier = Modifier.fillMaxWidth().height(120.dp),
        contentScale = ContentScale.Crop,
    )
}
```

Same R8-safe pattern as fonts. Host registration:

```kotlin
@Provides @Singleton
fun provideMaterialDrawableResolver(): MaterialDrawableResolver =
    materialDrawableResolver {
        register("banner", R.drawable.banner)
        register("logo", R.drawable.logo)
    }
```

`KetoyConfig.drawableResolver = materialDrawableResolver`.

---

## Scaffold + TopAppBar (full screen scaffolding)

```kotlin
@OptIn(ExperimentalMaterial3Api::class)
@KetoyComposable @KetoyEntryPoint
@Composable
fun TodoScreen() {
    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Todos") },
                actions = {
                    IconButton(onClick = { /* settings */ }) {
                        Icon(Icons.Filled.Settings, contentDescription = "Settings")
                    }
                }
            )
        },
        floatingActionButton = {
            // FAB adapter not yet catalogued, use IconButton or write a custom adapter.
        }
    ) { padding ->
        Column(modifier = Modifier.padding(padding)) {
            Text("Body")
        }
    }
}
```

The `content: (PaddingValues) -> Unit` slot is recognised by the
`Scaffold` adapter (id `0x0007`); the padding values are routed through
`KBCParamSet.getPaddingValuesContentSlot`.

> **Note** on `@OptIn(ExperimentalMaterial3Api::class)`: `TopAppBar` is
> still experimental in Material3. The compiler plugin honours opt-in
> markers, your KBC source must declare it.

---

## Input, `TextField` with state

```kotlin
@KetoyComposable @KetoyEntryPoint
@Composable
fun EmailField() {
    var email by remember { mutableStateOf("") }

    TextField(
        value = email,
        onValueChange = { email = it },
        label = { Text("Email") },
        leadingIcon = { Icon(Icons.Filled.Email, contentDescription = null) },
        singleLine = true,
        keyboardOptions = KeyboardOptions(
            keyboardType = KeyboardType.Email,
            imeAction = ImeAction.Done,
        ),
        modifier = Modifier.fillMaxWidth(),
    )
}
```

`KeyboardOptions(...)` is built via the registered constructor adapter
(`KBCConstructorIds.KEYBOARD_OPTIONS = 0x0004`), the compiler emits a
`CONSTRUCT_JVM` opcode that builds the object on the interpreter thread
and stores it in a register before passing it to `TextField`.

---

## Recipe: stateful list with item callbacks

```kotlin
@KetoyComposable @KetoyEntryPoint
@Composable
fun ItemList() {
    var items by remember { mutableStateOf(listOf("Apple", "Banana", "Cherry")) }

    Column(modifier = Modifier.padding(16.dp)) {
        items.forEachIndexed { index, item ->
            Row(
                modifier = Modifier.fillMaxWidth().padding(vertical = 4.dp),
                verticalAlignment = Alignment.CenterVertically,
            ) {
                Text(item, modifier = Modifier.weight(1f))
                IconButton(onClick = {
                    items = items.toMutableList().apply { removeAt(index) }
                }) {
                    Icon(Icons.Filled.Delete, contentDescription = "Delete $item")
                }
            }
        }
    }
}
```

The `onClick` lambda captures `index` and `items` from the outer scope,
again, closure conversion handles it.

> `forEachIndexed` is a stdlib extension. The compiler-plugin allowlist
> recognises it; your `ketoy-capabilities.json` `allowedStdlibFqNames`
> can list anything else you want to permit.

---

## What you can't do (compile errors)

| You write | Error |
|---|---|
| `Log.d("tag", "msg")` | `DirectAndroidApiAccess` |
| `File("/sdcard/foo.txt").readText()` | `FileIoUsage` |
| `MyClass::class.java` | `ReflectionUsage` |
| `GlobalScope.launch { ... }` | `GlobalScopeUsage` |
| `MyCustomComposable()` (no adapter) | `UnregisteredComposable` |
| `Color(redInt, greenInt, blueInt)` literal positional | OK, `CONSTRUCT_JVM` |
| Custom view-class constructor | `NonKbcConstructor` |

See [Compile Errors](../reference/compile-errors.md) for the full list
with sample messages.

Next: [ViewModel →](viewmodel.md)
