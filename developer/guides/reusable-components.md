# Reusable Components

Extract a non-entry `@KetoyComposable` helper and call it with callback
lambdas, content slots, `data class` params, and lists to keep KBC
screens DRY.

Keep KBC screens DRY the same way you keep native Compose DRY: extract a
non-entry `@KetoyComposable` helper and call it from another KBC
composable. As of `0.4.16-alpha` these helpers accept **callback
lambdas**, **content slots**, `data class` params, lists, and enums, so a
component can own its own layout while the caller drives its state.

---

## A reusable component

Annotate a plain composable with `@KetoyComposable` (no
`@KetoyEntryPoint`) and call it wherever you need it:

```kotlin
@KetoyComposable
fun LabeledRow(label: String, selected: Boolean, onSelect: () -> Unit) {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .clickable { onSelect() },   // the component invokes the callback
    ) {
        Text(label)
        if (selected) Text("✓")
    }
}

@KetoyEntryPoint
@KetoyComposable
fun PickerScreen() {
    var picked by remember { mutableStateOf("Alpha") }

    Column {
        LabeledRow(label = "Alpha", selected = picked == "Alpha", onSelect = { picked = "Alpha" })
        LabeledRow(label = "Beta",  selected = picked == "Beta",  onSelect = { picked = "Beta" })
    }
}
```

The `onSelect` callback captures the parent's `picked` state. Tapping a
row updates it and the whole screen recomposes.

---

## Supported parameter types

A reusable component can take any of these:

| Kind | Example | Notes |
|------|---------|-------|
| **Primitives** | `String`, `Int`, `Boolean`, `Float`, `Long`, `Double` | Passed by value |
| **Compose value types** | `Dp`, `Sp`, `Color`, `TextUnit` | e.g. `padding: Dp`, `tint: Color` |
| **Theme colours** | `themeColor("name")` | Re-resolves per light / dark mode |
| **`data class`** | `VehicleOption(name, price)` | Constructed at the call site |
| **Lists** | `List<String>`, `List<VehicleOption>` | Literal or capability-returned |
| **Enums / sealed types** | `enum class Size`, `sealed interface State` | `when` / `is` works in the body |
| **Callback lambdas** | `onClick: () -> Unit`, `onSelect: (String) -> Unit` | Invoked by the component; captures allowed |
| **Content slots** | `content: @Composable () -> Unit` | The component places the children |
| **Item slots** | `item: @Composable (T) -> Unit` | Per-item content (list rows) |

Here is a component that uses most of them at once:

```kotlin
data class VehicleOption(val name: String, val price: Int)

@KetoyComposable
fun VehicleRow(
    option: VehicleOption,                 // data class param
    selected: Boolean,                     // primitive
    accent: Color,                         // Compose value type
    onSelect: (VehicleOption) -> Unit,     // typed callback lambda
    trailing: @Composable () -> Unit,      // content slot
) {
    Row(modifier = Modifier.clickable { onSelect(option) }) {
        Text(option.name, color = if (selected) accent else Color.Gray)
        Text("$${option.price}")
        trailing()                         // the component invokes the slot
    }
}
```

---

## Content and item slots

A content slot is a `@Composable () -> Unit` parameter the component
places wherever it wants. This is how you build wrappers (cards, sheets,
sections) that own their chrome while the caller owns the body:

```kotlin
@KetoyComposable
fun SectionCard(title: String, content: @Composable () -> Unit) {
    Card(modifier = Modifier.fillMaxWidth().padding(8.dp)) {
        Column(modifier = Modifier.padding(16.dp)) {
            Text(title, fontWeight = FontWeight.Bold)
            content()                      // caller's children land here
        }
    }
}

@KetoyEntryPoint
@KetoyComposable
fun ProfileScreen() {
    SectionCard(title = "Account") {
        Text("Signed in as ketoy.dev")
        Button(onClick = { /* ... */ }) { Text("Sign out") }
    }
}
```

An **item slot** (`@Composable (T) -> Unit`) lets a list component render
each row however the caller wants:

```kotlin
@KetoyComposable
fun <T> SimpleList(items: List<T>, item: @Composable (T) -> Unit) {
    Column {
        items.forEach { item(it) }
    }
}
```

---

## Composing components

Reusable components can call other reusable components, and can be driven
from a `forEach` loop, so you assemble a screen out of small pieces:

```kotlin
@KetoyComposable
fun VehicleList(options: List<VehicleOption>, onSelect: (VehicleOption) -> Unit) {
    Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
        options.forEach { option ->
            VehicleRow(
                option = option,
                selected = false,
                accent = themeColor("accentColor"),
                onSelect = onSelect,
                trailing = { Text("›") },
            )
        }
    }
}
```

See [Compose UI & state](compose-ui.md) for `forEach`, `spacedBy`, and
`themeColor` details.

---

## Precautions

> **Not yet supported as a param.** Drawable resources
> (`painterResource(R.drawable.X)`) cannot be passed as a component
> parameter yet. Reference them directly inside the component instead.
> Function-typed params must be lambdas, not top-level function
> references.

> **Same module only.** A reusable component must live in the **same
> Gradle module** as the screen that calls it. Cross-module calls fail
> compilation with a `CrossModuleCall` error. See the
> [Kotlin language guide](kotlin-language.md).

Next: [Canvas & drawing](canvas.md)
