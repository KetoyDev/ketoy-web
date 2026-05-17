# Getting Started

KetoyVM lets you author Jetpack Compose screens, compile them to portable
KBC bytecode, and ship them inside your Android app as a signed `.ktx`
asset that the KetoyRuntime executes natively at run time.

This guide walks you from an empty app to a working KBC screen in four
steps. It uses the **inline-source app bundle** model (ADR-0003) — no
separate library module required.

!!! info "Alpha status"
    KetoyVM is currently **`0.3.3-alpha`**. The local path is fully
    supported: you author screens in your `:app` module, the compiler
    plugin emits a signed `.ktx` into your assets, the runtime executes
    it. **Cloud delivery — where you push the `.ktx` to a CDN and your
    users fetch updates without going through the Play Store — is under
    active development and will ship shortly.** Keep checking this page
    and the [GitHub releases](https://github.com/developerchunk/KetoyVM)
    for announcements.

!!! tip "Hilt is optional"
    Each step below offers two parallel paths. Pick **Hilt** if your
    app already uses it (recommended — less wiring). Pick **No Hilt**
    if you just want to drop KBC screens into a plain Compose app —
    no DI framework required.

---

## Prerequisites

- Android Studio Iguana (AGP 8.0+) or newer
- Kotlin **2.0.21** (Compose plugin + KetoyVM compiler plugin are pinned
  to this version during alpha)
- JDK 17
- `minSdk = 26`, `compileSdk = 35+`
- Jetpack Compose

---

## 1 — Installation

KetoyVM ships a BOM so you pin once and forget. In `:app/build.gradle.kts`:

=== "Hilt"

    ```kotlin
    plugins {
        id("com.android.application")
        id("org.jetbrains.kotlin.android")
        id("org.jetbrains.kotlin.plugin.compose")
        id("com.google.devtools.ksp")
        id("com.google.dagger.hilt.android")
        id("dev.ketoy.compiler") version "0.3.3-alpha"
    }

    dependencies {
        implementation(platform("dev.ketoy.vm:ketoy-bom:0.3.3-alpha"))
        implementation("dev.ketoy.vm:ketoy-runtime")
        implementation("dev.ketoy.vm:ketoy-hilt")
        implementation("dev.ketoy.vm:ketoy-annotations")
        implementation("dev.ketoy.vm:ketoy-capabilities-core")
        implementation("dev.ketoy.vm:ketoy-capabilities-navigation")
        implementation("dev.ketoy.vm:ketoy-adapters-material3")

        implementation(platform("androidx.compose:compose-bom:2024.10.00"))
        implementation("androidx.compose.ui:ui")
        implementation("androidx.compose.material3:material3")
        implementation("androidx.activity:activity-compose")
        implementation("androidx.navigation:navigation-compose:2.8.0")

        implementation("com.google.dagger:hilt-android:2.52")
        ksp("com.google.dagger:hilt-compiler:2.52")
    }
    ```

=== "No Hilt"

    ```kotlin
    plugins {
        id("com.android.application")
        id("org.jetbrains.kotlin.android")
        id("org.jetbrains.kotlin.plugin.compose")
        id("dev.ketoy.compiler") version "0.3.3-alpha"
    }

    dependencies {
        implementation(platform("dev.ketoy.vm:ketoy-bom:0.3.3-alpha"))
        implementation("dev.ketoy.vm:ketoy-runtime")
        implementation("dev.ketoy.vm:ketoy-annotations")
        implementation("dev.ketoy.vm:ketoy-capabilities-core")
        implementation("dev.ketoy.vm:ketoy-capabilities-navigation")
        implementation("dev.ketoy.vm:ketoy-adapters-material3")

        implementation(platform("androidx.compose:compose-bom:2024.10.00"))
        implementation("androidx.compose.ui:ui")
        implementation("androidx.compose.material3:material3")
        implementation("androidx.activity:activity-compose")
        implementation("androidx.navigation:navigation-compose:2.8.0")
    }
    ```

    No `ketoy-hilt`, no `hilt-android`, no KSP processor. You'll
    construct the runtime objects by hand in step 2.

Then configure the `ketoy { }` DSL in the same `:app/build.gradle.kts`:

```kotlin
ketoy {
    // Required: turns on ADR-0003 inline-source app bundle mode.
    // The compiler plugin attaches to `compile<bundleVariant>Kotlin`
    // and emits ONE signed `.ktx` containing every transitive
    // declaration reachable from your `@KetoyEntryPoint` /
    // `@KetoyComposable` / `@KetoyViewModel` roots.
    exportFromAppModule.set(true)

    // Output filename. Bundle is written to
    // `:app/src/main/assets/ketoy/<bundleId>.ktx`.
    bundleId.set("main")

    // Which Android variant to attach the compiler plugin to.
    // Default = "release". The release-signed `.ktx` is loaded by
    // both debug and release APKs for production parity.
    bundleVariant.set("release")

    // The capability registry — empty file is fine until you declare
    // your first `@KetoyCapabilityStub`.
    capabilityRegistryFile.set(file("ketoy-capabilities.json"))

    // Optional: minimum host APK versionCode required to activate
    // this bundle. Defaults to 0 (universally compatible).
    minAppVersion.set(0)

    // Optional: emit source line numbers for the dev overlay.
    debugMode.set(true)

    // Optional but recommended for production: sign the bundle.
    // Without a key, the plugin emits an unsigned bundle gracefully
    // (useful during initial bring-up and CI before key provisioning).
    val signingKey = file("keys/release-private.key")
    if (signingKey.exists()) {
        signingKeyFile.set(signingKey)
    }
}
```

Create a stub registry file so the build can start:

```bash
echo '{"version": 1, "capabilities": [], "allowedStdlibFqNames": []}' \
    > app/ketoy-capabilities.json
```

### Optional: generate a signing key

Bundle signing is optional during alpha bring-up — the plugin produces
unsigned bundles gracefully when no key is configured. To enable
signing, generate an Ed25519 keypair:

```bash
mkdir -p app/keys app/src/main/assets/ketoy/keys

# Private key — 32 raw bytes, gitignored, used by the Gradle plugin
# at build time.
openssl genpkey -algorithm Ed25519 -outform DER \
    | tail -c 32 > app/keys/release-private.key

# Public key — 32 raw bytes, committed alongside the APK so the
# runtime can verify the bundle signature at load time.
openssl pkey -in app/keys/release-private.key -inform DER \
    -pubout -outform DER \
    | tail -c 32 > app/src/main/assets/ketoy/keys/release-public.key
```

Add to your `.gitignore`:

```
**/keys/*-private.key
```

The Gradle DSL block above already wires `signingKeyFile` when the file
exists. To **complete the loop** — making the runtime actually *verify*
the signature against the embedded public key — see step 2 below.

!!! tip "Signature verification is opt-in"
    `KetoyConfig.enableSignatureVerification` defaults to `false` so
    unsigned local development builds Just Work. For production, set
    `enableSignatureVerification = true` AND pass `publicKey` — see
    step 2. `KetoyConfig` validates this invariant at construction:
    enabling verification without a 32-byte Ed25519 public key throws
    `IllegalArgumentException` immediately, so misconfiguration fails
    fast at app startup rather than buried inside the first bundle
    load.

---

## 2 — Wire the runtime

This is the only step where the two paths diverge meaningfully.

=== "Hilt"

    Implement `KetoyCapabilityProvider`:

    ```kotlin
    @Singleton
    class AppCapabilityProvider @Inject constructor(
        @ApplicationContext private val context: Context,
    ) : KetoyCapabilityProvider {
        override fun buildRegistry(): CapabilityRegistry =
            CapabilityRegistry().apply {
                registerCoreCapabilities(context = context)
            }
    }

    @Module
    @InstallIn(SingletonComponent::class)
    abstract class AppHiltModule {
        @Binds
        abstract fun bindCapabilityProvider(
            impl: AppCapabilityProvider,
        ): KetoyCapabilityProvider
    }
    ```

    Register the Material3 adapter set on the singleton `KetoyRuntime`
    in your `Application.onCreate`. (The `CapabilityRegistry` and the
    adapter/constructor registries are separate fields on `KetoyRuntime`
    — capabilities go through `KetoyCapabilityProvider` above; adapters
    are wired here against the injected runtime.)

    If you generated a signing keypair in step 1, also wire the public
    key by providing a `KetoyConfigCustomizer` Hilt binding so the
    `KetoyHiltModule`-managed `KetoyRuntime` verifies bundle signatures
    against your key:

    ```kotlin
    @Module
    @InstallIn(SingletonComponent::class)
    object KetoyConfigModule {
        @Provides
        @Singleton
        fun provideKetoyConfigCustomizer(
            @ApplicationContext context: Context,
        ): KetoyConfigCustomizer = KetoyConfigCustomizer { default ->
            val publicKey =
                KetoyKeystore.loadFromAsset(context, "ketoy/keys/release-public.key")
            default.copy(
                enableSignatureVerification = true,
                publicKey = publicKey,
            )
        }
    }
    ```

    ```kotlin
    @HiltAndroidApp
    class MyApplication : Application() {
        @Inject lateinit var ketoyRuntime: KetoyRuntime

        override fun onCreate() {
            super.onCreate()
            registerGeneratedAdapters(ketoyRuntime.adapterRegistry)
            registerGeneratedConstructors(ketoyRuntime.constructorRegistry)
        }
    }

    @AndroidEntryPoint
    class MainActivity : ComponentActivity() {
        @Inject lateinit var factoryBuilder: KetoyViewModelFactoryBuilder
        @Inject lateinit var bundleLoader: KetoyBundleLoader
        @Inject lateinit var runtime: KetoyRuntime

        override fun onCreate(savedInstanceState: Bundle?) {
            super.onCreate(savedInstanceState)
            setContent {
                KetoyHiltProvider(
                    factoryBuilder = factoryBuilder,
                    bundleLoader = bundleLoader,
                    runtime = runtime,
                ) {
                    AppNavGraph()
                }
            }
        }
    }
    ```

    `KetoyHiltProvider` internally publishes `LocalKetoyRuntime` and
    `LocalKetoyCapabilityRegistry` from the runtime, so every
    `KetoyScreen` in the tree resolves the adapter/constructor
    registries from the same Hilt-injected singleton.

    Don't forget `android:name=".MyApplication"` in
    `AndroidManifest.xml`.

=== "No Hilt"

    Construct `KetoyRuntime` by hand. Hold the runtime and loader as
    **instance fields on a custom `Application` subclass**, not as
    static fields on a Kotlin `object`. Static fields that hold a
    `Context` (which `KetoyBundleLoader` does) trip lint's
    `StaticFieldLeak` warning and can outlive their intended scope.
    Instance fields on `Application` are tied to the process lifecycle
    and don't leak.

    ```kotlin
    class MyApplication : Application() {
        lateinit var ketoyRuntime: KetoyRuntime
            private set
        lateinit var ketoyBundleLoader: KetoyBundleLoader
            private set

        override fun onCreate() {
            super.onCreate()

            val capabilityRegistry = CapabilityRegistry().apply {
                registerCoreCapabilities(context = this@MyApplication)
            }

            // For production, load your Ed25519 public key from APK assets
            // and pass it via KetoyConfig. For local dev with unsigned
            // bundles, KetoyConfig() / KetoyConfig.default() works as-is —
            // signature verification defaults to false.
            val config = KetoyConfig(
                enableSignatureVerification = true,
                publicKey = KetoyKeystore.loadFromAsset(
                    this,
                    "ketoy/keys/release-public.key",
                ),
            )

            ketoyRuntime = KetoyRuntime(
                capabilityRegistry = capabilityRegistry,
                config = config,
            )

            // Material3 composable + constructor adapters go on the
            // dedicated registries hanging off the runtime — not on
            // CapabilityRegistry.
            registerGeneratedAdapters(ketoyRuntime.adapterRegistry)
            registerGeneratedConstructors(ketoyRuntime.constructorRegistry)

            ketoyBundleLoader = KetoyBundleLoader(ketoyRuntime, this)
        }
    }
    ```

    Publish the runtime + loader via composition locals in
    `MainActivity`. `KetoyScreen` auto-derives the `CapabilityRegistry`,
    `KBCAdapterRegistry`, and `KBCConstructorRegistry` from
    `LocalKetoyRuntime` — no factory boilerplate required:

    ```kotlin
    class MainActivity : ComponentActivity() {
        override fun onCreate(savedInstanceState: Bundle?) {
            super.onCreate(savedInstanceState)
            val app = application as MyApplication
            setContent {
                CompositionLocalProvider(
                    LocalKetoyRuntime provides app.ketoyRuntime,
                    LocalKetoyBundleLoader provides app.ketoyBundleLoader,
                ) {
                    AppNavGraph()
                }
            }
        }
    }
    ```

    Required imports:

    ```kotlin
    import dev.ketoy.runtime.compose.LocalKetoyBundleLoader
    import dev.ketoy.runtime.compose.LocalKetoyRuntime
    ```

    Don't forget `android:name=".MyApplication"` in
    `AndroidManifest.xml`. Publishing `LocalKetoyRuntime` is the
    only thing required to make `KetoyScreen` work in the no-Hilt
    path — `KetoyScreen` raises `IllegalStateException` with explicit
    remediation guidance when neither `LocalKetoyRuntime` nor a
    `KetoyViewModelFactoryBuilder` is published, so misconfiguration
    fails fast and clearly.

---

## 3 — Write your first KBC screen and mount it

Same for both paths. Create the file directly inside your `:app` module
— no separate Gradle module needed. Convention is to group KBC screens
under `<yourapp>.ketoyscreens` to telegraph intent:

```kotlin
// app/src/main/kotlin/.../ketoyscreens/HelloScreen.kt
package com.example.myapp.ketoyscreens

import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import dev.ketoy.annotations.KetoyComposable
import dev.ketoy.annotations.KetoyEntryPoint

@KetoyEntryPoint
@KetoyComposable
@Composable
fun HelloScreen() {
    Column(modifier = Modifier.padding(24.dp)) {
        Text(text = "Hello from KetoyVM")
        Spacer(Modifier.height(12.dp))
        Text(text = "Shipped as KBC bytecode, executed natively.")
    }
}
```

**That's the entire KBC source.** Native code in the same module (your
existing screens, repositories, navigation graph) compiles to DEX as
usual — only the closure reachable from `HelloScreen` gets lowered to
KBC.

Mount it in your `NavHost`. Every `KetoyScreen` call site requires a
trailing `nativeFallback` lambda — the steady-state render when the
bundle is absent, still loading, or the entry point can't be found. It
should render identically to the KBC screen, so adopting KetoyVM cannot
introduce a regression in any non-active-bundle case.

```kotlin
@Composable
fun AppNavGraph() {
    val nav = rememberNavController()
    NavHost(nav, startDestination = "home") {
        composable("home") {
            KetoyScreen(
                entryPoint = "HelloScreen",
                bundleSource = KetoyBundleSource.Asset("ketoy/main.ktx"),
            ) {
                // Native fallback — same UI, plain Compose.
                HelloScreen()
            }
        }
    }
}
```

---

## 4 — Build, install, and run

```bash
# Compile the bundle: attaches to compileReleaseKotlin, emits a signed
# .ktx into app/src/main/assets/ketoy/main.ktx.
./gradlew :app:ketoyBundle

# Build and install the APK. (`assembleDebug` automatically rebuilds
# the bundle when the source closure changes — the manual call above
# is only needed when you want to inspect the bundle in isolation.)
./gradlew :app:installDebug
```

You should see a summary line during compilation:

```
KetoyBC: Compilation complete — 4 functions emitted, 1 composables,
0 view models, 1 entry points. Bundle ID: main. Wrote 1832 bytes to
app/src/main/assets/ketoy/main.ktx (signed)
```

Launch the app — the KBC version of `HelloScreen` renders. Delete the
`.ktx`, change `entryPoint = "DoesNotExist"`, toggle airplane mode —
the native fallback renders identically. That's the production
contract.

You can commit the `.ktx` alongside source, or gitignore it and rebuild
on CI — it's regenerated deterministically.

---

## What ships next: cloud delivery

What's described above is the **local-asset** path: you build the `.ktx`
into your APK at compile time. Updates ship through the Play Store like
any other asset.

**Cloud delivery** — where you push a new `.ktx` to a CDN and connected
devices fetch the update at the next process start (Ed25519-verified,
ETag-cached, rolled back on `minAppVersion` mismatch) — uses the
`KetoyBundleSource.Remote(url)` source. The wire format, signature
verification, ETag cache, and runtime activation order are all already
implemented; the **hosted infrastructure** (signing pipeline + signed
URL distribution + analytics) is under active development and will ship
shortly.

Keep checking this page and the
[release announcements](https://github.com/developerchunk/KetoyVM/releases)
for the rollout.

---

## Next steps

- [Architecture overview](architecture/overview.md) — the five-layer
  stack and why KBC bytecode (not JSON) is the wire format.
- [Two-layer parameter system](architecture/two-layer-parameter-system.md) —
  the central architectural idea.
- [Capability reference](capabilities/reference.md) — every capability
  KBC code can call out of the box.
- [Custom composable adapters](adapters/custom-composable-adapters.md) —
  add your own components beyond Material3.
- [Testing](testing.md) — `FakeAdapterRegistry`, `KBCBuilder`,
  `KetoyTestRuntime`.
- [Security](security.md) — Ed25519 signing, key rotation, sandbox.
