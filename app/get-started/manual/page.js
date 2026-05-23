import Link from 'next/link';
import { SDK_VERSION_FULL } from '@/constants';
import Subnav from '@/components/Subnav';
import Tabs from '@/components/Tabs';
import CodeWindow from '@/components/CodeWindow';
import Callout from '@/modules/features/components/Callout';
import { manualSubnavItems, manualRequirements, continueCards } from '@/modules/get-started/data';

export const metadata = {
  title: 'Manual setup · Ketoy',
  description:
    'Step-by-step manual setup for adding Ketoy to an existing Android app - no CLI required.',
};

const HILT_GRADLE = `plugins {
    id("com.android.application")
    id("org.jetbrains.kotlin.android")
    id("org.jetbrains.kotlin.plugin.compose")
    id("com.google.devtools.ksp")
    id("com.google.dagger.hilt.android")
    id("dev.ketoy.compiler") version "${SDK_VERSION_FULL}"
}

dependencies {
    implementation(platform("dev.ketoy.vm:ketoy-bom:${SDK_VERSION_FULL}"))
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
}`;

const NO_HILT_GRADLE = `plugins {
    id("com.android.application")
    id("org.jetbrains.kotlin.android")
    id("org.jetbrains.kotlin.plugin.compose")
    id("dev.ketoy.compiler") version "${SDK_VERSION_FULL}"
}

dependencies {
    implementation(platform("dev.ketoy.vm:ketoy-bom:${SDK_VERSION_FULL}"))
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
}`;

const KETOY_DSL = `ketoy {
    // Required: turns on inline-source app bundle mode.
    exportFromAppModule.set(true)

    // Output filename. Bundle is written to
    // :app/src/main/assets/ketoy/<bundleId>.ktx
    bundleId.set("main")

    // Which Android variant the compiler attaches to.
    // Default = "release". The release-signed .ktx is loaded by
    // both debug and release APKs for production parity.
    bundleVariant.set("release")

    // Capability registry - empty file is fine to start.
    capabilityRegistryFile.set(file("ketoy-capabilities.json"))

    // Optional: minimum host APK versionCode for this bundle.
    minAppVersion.set(0)

    // Optional: emit source line numbers for the dev overlay.
    debugMode.set(true)

    // Optional but recommended for production: sign the bundle.
    // Without a key, the plugin emits an unsigned bundle gracefully.
    val signingKey = file("keys/release-private.key")
    if (signingKey.exists()) {
        signingKeyFile.set(signingKey)
    }
}`;

const HILT_CAPABILITY = `@Singleton
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
}`;

const HILT_CONFIG_MODULE = `@Module
@InstallIn(SingletonComponent::class)
object KetoyConfigModule {
    @Provides @Singleton
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
}`;

const HILT_APP = `@HiltAndroidApp
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
            ) { AppNavGraph() }
        }
    }
}`;

const NO_HILT_APP = `class MyApplication : Application() {
    lateinit var ketoyRuntime: KetoyRuntime private set
    lateinit var ketoyBundleLoader: KetoyBundleLoader private set

    override fun onCreate() {
        super.onCreate()

        val capabilityRegistry = CapabilityRegistry().apply {
            registerCoreCapabilities(context = this@MyApplication)
        }

        // For production, load your Ed25519 public key from assets.
        // For local dev with unsigned bundles, KetoyConfig() works as-is.
        val config = KetoyConfig(
            enableSignatureVerification = true,
            publicKey = KetoyKeystore.loadFromAsset(
                this, "ketoy/keys/release-public.key",
            ),
        )

        ketoyRuntime = KetoyRuntime(
            capabilityRegistry = capabilityRegistry,
            config = config,
        )

        // Composable + constructor adapters go on dedicated registries
        // hanging off the runtime - not on CapabilityRegistry.
        registerGeneratedAdapters(ketoyRuntime.adapterRegistry)
        registerGeneratedConstructors(ketoyRuntime.constructorRegistry)

        ketoyBundleLoader = KetoyBundleLoader(ketoyRuntime, this)
    }
}`;

const NO_HILT_MAIN = `import dev.ketoy.runtime.compose.LocalKetoyBundleLoader
import dev.ketoy.runtime.compose.LocalKetoyRuntime

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        val app = application as MyApplication
        setContent {
            CompositionLocalProvider(
                LocalKetoyRuntime provides app.ketoyRuntime,
                LocalKetoyBundleLoader provides app.ketoyBundleLoader,
            ) { AppNavGraph() }
        }
    }
}`;

const HELLO_SCREEN = `package com.example.myapp.ketoyscreens

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
}`;

const NAV_GRAPH = `@Composable
fun AppNavGraph() {
    val nav = rememberNavController()
    NavHost(nav, startDestination = "home") {
        composable("home") {
            KetoyScreen(
                entryPoint = "HelloScreen",
                bundleSource = KetoyBundleSource.Asset("ketoy/main.ktx"),
            ) {
                // Native fallback - same UI, plain Compose.
                HelloScreen()
            }
        }
    }
}`;

export default function ManualGetStartedPage() {
  return (
    <>
      <Subnav items={manualSubnavItems} />

      <section className="page-head">
        <div className="container">
          <span className="eyebrow">Manual setup</span>
          <h1>Set up Ketoy by hand</h1>
          <p className="lede">
            The long-form, no-CLI path. From an empty Android app to a working KBC screen in four steps. Author Jetpack Compose screens, compile them to portable KBC bytecode, and ship them inside your APK as a signed <code style={{ fontFamily: 'var(--font-mono)', fontSize: '0.92em' }}>.ktx</code> asset that the Ketoy runtime executes natively.
          </p>
          <div className="hero-actions" style={{ marginTop: 28 }}>
            <Link className="btn btn-primary" href="/get-started">Use the CLI instead</Link>
            <Link className="btn btn-ghost" href="/docs" prefetch={false}>Read the docs</Link>
          </div>
        </div>
      </section>

      <div className="page-body">
        <div className="container">

          <Callout kind="info" title="Most people should use the CLI">
            <p>The <Link href="/get-started"><code>ketoy</code> CLI</Link> automates everything below - surgical edits to <code>build.gradle.kts</code>, key generation, Application/MainActivity wiring, the sample screen - in a single <code>ketoy init</code> command. This page exists for people who want to understand every line, or who need to integrate Ketoy into a non-standard project layout where the CLI's anchors don't apply.</p>
          </Callout>

          <Callout title={<>Alpha status - <code>{SDK_VERSION_FULL}</code></>}>
            <p>The local-asset path is fully supported: you author screens in your <code>:app</code> module, the compiler plugin emits a signed <code>.ktx</code> into your assets, and the runtime executes it at startup.</p>
            <p><strong>Cloud delivery</strong> - pushing a <code>.ktx</code> to a CDN so users get updates without going through the Play Store - is under active development and ships shortly. Track progress on the <a href="#">GitHub releases page</a>.</p>
          </Callout>

          <div id="requirements"></div>
          <div className="req-card">
            <div className="req-head">
              <h3>Requirements</h3>
              <span className="req-version-pill">Ketoy {SDK_VERSION_FULL}</span>
            </div>
            <div className="req-grid">
              {manualRequirements.map(([label, val]) => (
                <div className="req-item" key={label}>
                  <span className="label">{label}</span>
                  <span className="val">{val}</span>
                </div>
              ))}
            </div>
          </div>

          <Callout kind="warn" title="Kotlin version is pinned during alpha">
            <p>The Compose compiler plugin and the Ketoy compiler plugin are both pinned to <code>2.0.21</code> for the alpha. Broader Kotlin version support - letting you pick up newer Kotlin releases without waiting on a matched Ketoy build - is on the roadmap for the next update.</p>
          </Callout>

          <Callout kind="info" title="Hilt is optional">
            <p>Each step below has two parallel paths. Pick <strong>Hilt</strong> if your app already uses it (less wiring, recommended). Pick <strong>No&nbsp;Hilt</strong> to drop KBC screens into a plain Compose app - no DI framework required.</p>
          </Callout>

          {/* STEP 1 */}
          <div className="step" id="install">
            <span className="step-num">Step 01</span>
            <h2>Install Ketoy</h2>
            <p className="intro">Ketoy ships a BOM, so you pin once and the rest of the modules line up. Add the plugin and dependencies to <code>:app/build.gradle.kts</code>.</p>

            <Tabs
              tabs={[
                {
                  label: 'Hilt',
                  content: (
                    <CodeWindow file="app/build.gradle.kts" tag="Hilt">{HILT_GRADLE}</CodeWindow>
                  ),
                },
                {
                  label: 'No Hilt',
                  content: (
                    <>
                      <CodeWindow file="app/build.gradle.kts" tag="No Hilt">{NO_HILT_GRADLE}</CodeWindow>
                      <p style={{ fontSize: 15, color: 'var(--muted)', marginTop: 8 }}>
                        No <code>ketoy-hilt</code>, no <code>hilt-android</code>, no KSP processor. You&rsquo;ll construct the runtime objects by hand in step 2.
                      </p>
                    </>
                  ),
                },
              ]}
            />

            <h3>Configure the <code>ketoy {'{ }'}</code> block</h3>
            <p>Configure the plugin in the same <code>:app/build.gradle.kts</code>. This turns on inline-source app bundle mode - the compiler attaches to <code>compile&lt;variant&gt;Kotlin</code> and emits one signed <code>.ktx</code> containing every declaration reachable from your annotated entry points.</p>

            <CodeWindow file="app/build.gradle.kts · ketoy {} DSL">{KETOY_DSL}</CodeWindow>

            <p>Create a stub registry file so the build can start:</p>

            <CodeWindow file="terminal">{`$ echo '{"version": 1, "capabilities": [], "allowedStdlibFqNames": []}' \\
    > app/ketoy-capabilities.json`}</CodeWindow>

            <h3>Optional - generate a signing key</h3>
            <p>Bundle signing is optional during alpha bring-up; the plugin produces unsigned bundles gracefully when no key is configured. For signed builds, generate an Ed25519 keypair:</p>

            <CodeWindow file="terminal · generate Ed25519 keypair">{`$ mkdir -p app/keys app/src/main/assets/ketoy/keys

# Private key - 32 raw bytes, gitignored,
# used by the Gradle plugin at build time.
$ openssl genpkey -algorithm Ed25519 -outform DER \\
    | tail -c 32 > app/keys/release-private.key

# Public key - 32 raw bytes, committed alongside the APK
# so the runtime can verify the signature at load time.
$ openssl pkey -in app/keys/release-private.key -inform DER \\
    -pubout -outform DER \\
    | tail -c 32 > app/src/main/assets/ketoy/keys/release-public.key`}</CodeWindow>

            <p>Then add the private key to <code>.gitignore</code>:</p>
            <CodeWindow file=".gitignore">{`**/keys/*-private.key`}</CodeWindow>

            <p>The <code>ketoy {'{}'}</code> block above already wires <code>signingKeyFile</code> when the file exists. To complete the loop - making the runtime <em>verify</em> the signature against the embedded public key - see step 2.</p>

            <Callout kind="info" title="Signature verification is opt-in">
              <p><code>KetoyConfig.enableSignatureVerification</code> defaults to <code>false</code> so unsigned local-dev builds just work. For production, set it to <code>true</code> <em>and</em> pass <code>publicKey</code>. <code>KetoyConfig</code> validates this at construction - enabling verification without a 32-byte Ed25519 key throws <code>IllegalArgumentException</code> immediately, so misconfiguration fails fast at app startup, not buried inside the first bundle load.</p>
            </Callout>
          </div>

          {/* STEP 2 */}
          <div className="step" id="wire">
            <span className="step-num">Step 02</span>
            <h2>Wire the runtime</h2>
            <p className="intro">This is the only step where the two paths diverge meaningfully - Hilt does the wiring for you, the manual path is two short blocks.</p>

            <Tabs
              tabs={[
                {
                  label: 'Hilt',
                  content: (
                    <>
                      <p>Implement <code>KetoyCapabilityProvider</code>:</p>
                      <CodeWindow file="AppCapabilityProvider.kt">{HILT_CAPABILITY}</CodeWindow>
                      <p>If you generated a signing keypair in step 1, also wire the public key via a <code>KetoyConfigCustomizer</code> binding so the Hilt-managed <code>KetoyRuntime</code> verifies signatures against your key:</p>
                      <CodeWindow file="KetoyConfigModule.kt">{HILT_CONFIG_MODULE}</CodeWindow>
                      <p>Register Material3 adapters on the singleton <code>KetoyRuntime</code> in <code>Application.onCreate</code>, then publish runtime + loader in your activity via <code>KetoyHiltProvider</code>:</p>
                      <CodeWindow file="MyApplication.kt · MainActivity.kt">{HILT_APP}</CodeWindow>
                      <p><code>KetoyHiltProvider</code> internally publishes <code>LocalKetoyRuntime</code> and <code>LocalKetoyCapabilityRegistry</code>, so every <code>KetoyScreen</code> in the tree resolves its adapter and constructor registries from the same singleton.</p>
                      <p>Don&rsquo;t forget <code>android:name=&quot;.MyApplication&quot;</code> in <code>AndroidManifest.xml</code>.</p>
                    </>
                  ),
                },
                {
                  label: 'No Hilt',
                  content: (
                    <>
                      <p>Construct <code>KetoyRuntime</code> by hand. Hold it and the loader as <strong>instance fields on a custom <code>Application</code> subclass</strong> - not on a Kotlin <code>object</code>. Static fields that hold a <code>Context</code> (<code>KetoyBundleLoader</code> does) trip lint&rsquo;s <code>StaticFieldLeak</code> warning. Instance fields on <code>Application</code> are tied to the process lifecycle and don&rsquo;t leak.</p>
                      <CodeWindow file="MyApplication.kt">{NO_HILT_APP}</CodeWindow>
                      <p>Publish the runtime and loader via composition locals in <code>MainActivity</code>. <code>KetoyScreen</code> auto-derives the <code>CapabilityRegistry</code>, <code>KBCAdapterRegistry</code>, and <code>KBCConstructorRegistry</code> from <code>LocalKetoyRuntime</code> - no factory boilerplate needed.</p>
                      <CodeWindow file="MainActivity.kt">{NO_HILT_MAIN}</CodeWindow>
                      <p>Don&rsquo;t forget <code>android:name=&quot;.MyApplication&quot;</code> in <code>AndroidManifest.xml</code>. Publishing <code>LocalKetoyRuntime</code> is the only thing required for <code>KetoyScreen</code> to work without Hilt - <code>KetoyScreen</code> raises <code>IllegalStateException</code> with explicit remediation guidance when neither <code>LocalKetoyRuntime</code> nor a <code>KetoyViewModelFactoryBuilder</code> is published. Misconfiguration fails fast and clearly.</p>
                    </>
                  ),
                },
              ]}
            />
          </div>

          {/* STEP 3 */}
          <div className="step" id="screen">
            <span className="step-num">Step 03</span>
            <h2>Write your first KBC screen and mount it</h2>
            <p className="intro">Same for both paths. Create the file directly inside your <code>:app</code> module - no separate Gradle module needed. The convention is to group KBC screens under <code>&lt;yourapp&gt;.ketoyscreens</code> to telegraph intent.</p>

            <CodeWindow file="app/src/main/kotlin/.../ketoyscreens/HelloScreen.kt" tag="@KetoyEntryPoint">{HELLO_SCREEN}</CodeWindow>

            <p>That&rsquo;s the entire KBC source. Native code in the same module - your existing screens, repositories, navigation graph - compiles to DEX as usual. Only the closure reachable from <code>HelloScreen</code> gets lowered to KBC.</p>

            <h3>Mount it in your NavHost</h3>
            <p>Every <code>KetoyScreen</code> call site requires a trailing <code>nativeFallback</code> lambda - the steady-state render when the bundle is absent, still loading, or the entry point can&rsquo;t be found. It should render identically to the KBC screen, so adopting Ketoy can never introduce a regression in any non-active-bundle case.</p>

            <CodeWindow file="AppNavGraph.kt">{NAV_GRAPH}</CodeWindow>
          </div>

          {/* STEP 4 */}
          <div className="step" id="build">
            <span className="step-num">Step 04</span>
            <h2>Build, install, and run</h2>
            <p className="intro">Two Gradle commands. The <code>ketoyBundle</code> task attaches to <code>compileReleaseKotlin</code> and emits the signed <code>.ktx</code> into your assets directory.</p>

            <CodeWindow file="terminal">{`# Compile the bundle into app/src/main/assets/ketoy/main.ktx.
$ ./gradlew :app:ketoyBundle

# Build and install. assembleDebug rebuilds the bundle
# automatically when the source closure changes.
$ ./gradlew :app:installDebug`}</CodeWindow>

            <p>You should see a summary line during compilation:</p>

            <CodeWindow file="build output" tag="signed" tagStyle={{ color: '#93f0c0', borderColor: '#1f3a2d' }}>{`KetoyBC: Compilation complete - 4 functions emitted, 1 composables,
0 view models, 1 entry points. Bundle ID: main. Wrote 1832 bytes to
app/src/main/assets/ketoy/main.ktx (signed)`}</CodeWindow>

            <p>Launch the app - the KBC version of <code>HelloScreen</code> renders. Delete the <code>.ktx</code>, change the entry point to <code>&quot;DoesNotExist&quot;</code>, or toggle airplane mode - the native fallback renders identically. That&rsquo;s the production contract.</p>
            <p>You can commit the <code>.ktx</code> alongside source, or gitignore it and rebuild on CI - it&rsquo;s regenerated deterministically.</p>
          </div>

          {/* What's next */}
          <div className="step" id="whats-next">
            <span className="step-num">Roadmap</span>
            <h2>What ships next - cloud delivery</h2>
            <p className="intro">What you just built is the <strong>local-asset</strong> path: the <code>.ktx</code> ships inside the APK at compile time, and updates roll out through the Play Store like any other asset.</p>
            <p><strong>Cloud delivery</strong> - pushing a new <code>.ktx</code> to a CDN where connected devices fetch updates at the next process start (Ed25519-verified, ETag-cached, rolled back on <code>minAppVersion</code> mismatch) - uses <code>KetoyBundleSource.Remote(url)</code>. The wire format, signature verification, ETag cache, and runtime activation order are already implemented. The hosted infrastructure (signing pipeline, signed-URL distribution, telemetry) is under active development and ships shortly.</p>
            <p>Keep checking this page and the <a href="#">release announcements</a> for the rollout.</p>
          </div>

          <h2 style={{ marginTop: 80, marginBottom: 24 }}>Continue reading</h2>
          <div className="cards-grid">
            {continueCards.map((c) => (
              <div className="card" key={c.h}>
                <div className="num">→</div>
                <h3>{c.h}</h3>
                <p>{c.p}</p>
                <Link className="link" href={c.href}>{c.cta}</Link>
              </div>
            ))}
          </div>

          <div className="cta-banner" style={{ marginTop: 80 }}>
            <div>
              <h2>Need help?</h2>
              <p>Join the Ketoy community on Discord, or open an issue on GitHub. We respond within a day.</p>
            </div>
            <div className="right">
              <a className="btn btn-ghost" href="#">GitHub</a>
              <a className="btn btn-primary" href="#">Discord</a>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
