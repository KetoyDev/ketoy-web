# Navigation

Navigation in a Ketoy app has two layers:

1. **Host-side Navigation-Compose**, your `NavHost` + `NavController`,
   same as any normal Compose app. Each route is either a native
   `@Composable` or a `KetoyScreen` that loads a `.ktx` entry point.
2. **KBC-side navigation capabilities**, `NAV_PUSH`, `NAV_POP`,
   `NAV_REPLACE`, etc., let KBC code drive the host's `NavController`
   without owning it.

The bridge is `KetoyNavigator`, an interface with one production
implementation, `ComposeKetoyNavigator`, that wraps a `NavController`.

---

## 1. Host-side `NavHost`

```kotlin
@Composable
fun AppNavGraph() {
    val navController = rememberNavController()
    val navigator = remember(navController) { ComposeKetoyNavigator(navController) }

    CompositionLocalProvider(LocalKetoyNavigator provides navigator) {
        NavHost(navController = navController, startDestination = "home") {

            composable("home") {
                KetoyScreen(
                    bundleSource = KetoyBundleSource.Asset("ketoy/main.ktx"),
                    entryPoint = "HomeScreen",
                    nativeFallback = { HomeNativeFallback() }
                )
            }

            composable("settings") {
                SettingsNativeScreen()      // native, no KBC
            }

            composable(
                route = "product/{id}",
                arguments = listOf(navArgument("id") { type = NavType.LongType })
            ) { backStack ->
                val id = backStack.arguments?.getLong("id") ?: 0L
                KetoyScreen(
                    bundleSource = KetoyBundleSource.Asset("ketoy/main.ktx"),
                    entryPoint = "ProductDetailScreen",
                    extras = mapOf("productId" to id),
                    nativeFallback = { ProductNativeFallback(id) }
                )
            }
        }
    }
}
```

Key points:

- **`ComposeKetoyNavigator` lifetime = the surrounding composition.**
  Use `remember(navController)` to reuse it across recompositions.
- **`LocalKetoyNavigator`** is the bridge, `registerNavigationCapabilities`
  reads from it on the host side. (Or pass the navigator directly into
  your `KetoyCapabilityProvider`.)
- **`extras = mapOf("productId" to id)`** seeds the KBC ViewModel's state
  map on first creation only.

---

## 2. Register navigation capabilities

In your `KetoyCapabilityProvider`:

```kotlin
@Singleton
class TodoCapabilityProvider @Inject constructor(
    @ApplicationContext private val context: Context,
    private val navigatorHolder: AppNavigatorHolder,
    // ...
) : KetoyCapabilityProvider {
    override fun buildRegistry(): CapabilityRegistry = CapabilityRegistry().apply {
        registerCoreCapabilities(context = context, dataStore = preferences)
        registerNavigationCapabilities(navigatorHolder)
        // ...
    }
}
```

`navigatorHolder` is a small late-bound holder so the registry can be
built before the `NavController` exists:

```kotlin
@Singleton
class AppNavigatorHolder @Inject constructor() : KetoyNavigator {
    @Volatile private var delegate: KetoyNavigator? = null

    fun attach(navigator: KetoyNavigator) { delegate = navigator }
    fun detach() { delegate = null }

    override fun push(route: String) { delegate?.push(route) }
    override fun pop(): Boolean = delegate?.pop() ?: false
    override fun replace(route: String) { delegate?.replace(route) }
    override fun popTo(route: String, inclusive: Boolean): Boolean =
        delegate?.popTo(route, inclusive) ?: false
    override fun deepLink(uri: String) { delegate?.deepLink(uri) }
    override fun setResult(key: String, value: Any?) { delegate?.setResult(key, value) }
    override fun getCurrentRoute(): String? = delegate?.getCurrentRoute()
    override fun canPop(): Boolean = delegate?.canPop() ?: false
}
```

Then in your nav graph:

```kotlin
val composeNavigator = remember(navController) { ComposeKetoyNavigator(navController) }
DisposableEffect(composeNavigator) {
    navigatorHolder.attach(composeNavigator)
    onDispose { navigatorHolder.detach() }
}
```

---

## 3. Use it from KBC

Declare the navigation capability stubs in your KBC source:

```kotlin
@KetoyCapabilityStub(id = 0x0700, name = "NAV_PUSH")
fun navPush(route: String): Unit = error(STUB_MSG)

@KetoyCapabilityStub(id = 0x0701, name = "NAV_POP")
fun navPop(): Unit = error(STUB_MSG)
```

(The full set is in
[capability-registry reference](../reference/capability-registry.md).)

Then drive navigation from any `@KetoyComposable`:

```kotlin
@KetoyComposable @KetoyEntryPoint
@Composable
fun HomeScreen() {
    Column(modifier = Modifier.padding(16.dp)) {
        Button(onClick = { navPush("settings") }) {
            Text("Open Settings")
        }
        Button(onClick = { navPush("product/42") }) {
            Text("View Product 42")
        }
    }
}
```

Each `navPush(...)` call lowers to `INVOKE_CAPABILITY 0x0700` with the
route string. The host's registered lambda calls
`navController.navigate(route)`.

---

## 4. Reading navigation extras

The host passes navigation args via `KetoyScreen(extras = mapOf(...))`.
On first creation, the values seed the `KetoyVirtualViewModel` state
map. Read them from KBC via `VM_GET_STATE`:

```kotlin
@KetoyCapabilityStub(id = 0x0A00, name = "VM_GET_STATE")
fun vmGetState(key: String): Any? = error(STUB_MSG)

@KetoyComposable @KetoyEntryPoint
@Composable
fun ProductDetailScreen() {
    val productId = (vmGetState("productId") as? Long) ?: 0L
    Text("Product: $productId")
}
```

> **Important**: extras seed the state map **only on first creation**.
> On config change, `SavedStateHandle` restoration takes priority and
> the original extras are not re-applied. If you need an "always-fresh"
> argument, use `LaunchedEffect(Unit) { /* … */ }` to dispatch a
> reload event.

---

## 5. The full navigator API

| Method | KBC capability | Purpose |
|---|---|---|
| `push(route)` | `NAV_PUSH` (`0x0700`) | Navigate forward. |
| `pop()` | `NAV_POP` (`0x0701`) | Pop the back stack. |
| `replace(route)` | `NAV_REPLACE` (`0x0702`) | Replace current destination. |
| `popTo(route, inclusive)` | `NAV_POP_TO` (`0x0703`) | Pop up to a route. |
| `deepLink(uri)` | `NAV_DEEP_LINK` (`0x0704`) | Handle a deep-link URI. |
| `setResult(key, value)` | `NAV_SET_RESULT` (`0x0705`) | Store a result for the previous destination. |
| `getResult(key)` | `NAV_GET_RESULT` (`0x0706`) | suspend, read & consume a result. |
| `canPop()` | `NAV_CAN_POP` (`0x0707`) | Returns Boolean. |
| `getCurrentRoute()` | `NAV_CURRENT_ROUTE` (`0x0708`) | Returns String?. |

All except `getResult` are **synchronous** capabilities, they fire on
the main thread and return immediately.

---

## 6. Deep linking

```kotlin
NavHost(navController, startDestination = "home") {
    composable(
        route = "product/{id}",
        deepLinks = listOf(navDeepLink { uriPattern = "https://example.com/products/{id}" })
    ) { /* … */ }
}
```

From KBC:

```kotlin
Button(onClick = { navDeepLink("https://example.com/products/42") }) {
    Text("Open via deep link")
}
```

The standard Compose `navController.navigate(Uri.parse(uri))` handles
the resolution against the registered patterns.

---

## 7. Mixing native and KBC screens

A common pattern: **KBC for the parts that change**, native for the
parts that need full Android-API access or are too low-level to
sandbox (camera preview, ML model inference, video player surfaces).

```kotlin
NavHost(navController, startDestination = "home") {
    composable("home") { KetoyScreen(...) }            // KBC
    composable("video/{id}") { /* native */ }          // native
    composable("checkout") { KetoyScreen(...) }        // KBC
    composable("payment") { /* native */ }             // native (SDK)
}
```

Each `KetoyScreen` can navigate to a native destination via `navPush`
just like any other route. The capability sits at the host boundary;
KBC doesn't know or care whether the destination is KBC or native.

---

## 8. Back press handling

`KetoyScreen` doesn't intercept back-press by default, your host
`NavHost` handles it as usual. If you need custom back behavior inside
a KBC screen (e.g. close a dialog instead of popping), use the standard
`BackHandler` composable:

```kotlin
@KetoyComposable @KetoyEntryPoint
@Composable
fun EditScreen() {
    var dialogOpen by remember { mutableStateOf(false) }
    BackHandler(enabled = dialogOpen) { dialogOpen = false }

    // …
}
```

`BackHandler` isn't catalogued by default; either write a custom adapter
for it, or expose `backHandlerOnce` as a capability that the host wires
to `activity.onBackPressedDispatcher`.

Next: [Networking →](networking.md)
