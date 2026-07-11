# Ketoy Developer Documentation

**Ketoy** is a server-driven execution runtime for Android. You write plain
Kotlin, including Jetpack Compose, coroutines, ViewModels, Navigation,
Room, Hilt, with a handful of `@Ketoy*` annotations. The Ketoy compiler
plugin lowers your code into a compact, signed bytecode bundle (`.ktx`)
that any APK with the Ketoy runtime can execute natively.

> **The app is the OS. The server ships programs.**

You can update screens, fix bugs, run A/B tests, and roll out features
without going through the Play Store, every bundle is Ed25519-signed,
sandboxed by capability, and rendered through real Jetpack Compose on the
device.

This site is the **developer manual** for Ketoy `0.3.4-alpha`. Every
example is verified against current code, `dev.ketoy.vm:*:0.3.4-alpha`
on Maven Central.

---

## How to read this site

| If you want to… | Read |
|---|---|
| Install Ketoy in a new or existing Android project | [Getting Started → Installation](getting-started/installation.md) |
| Write your first KBC screen | [Getting Started → First Screen](getting-started/first-screen.md) |
| Sign and ship a `.ktx` to your users | [Getting Started → Bundle & Sign](getting-started/bundle-and-sign.md) |
| Build UI with Compose, icons, fonts, images | [Guides → Compose UI & State](guides/compose-ui.md) |
| Persist state across rotation / process death | [Guides → ViewModel](guides/viewmodel.md) |
| Use coroutines, Flow, StateFlow | [Guides → Coroutines & Flow](guides/coroutines-flow.md) |
| Navigate between screens | [Guides → Navigation](guides/navigation.md) |
| Make HTTP calls | [Guides → Networking](guides/networking.md) |
| Read/write preferences | [Guides → DataStore](guides/datastore.md) |
| Use Room DAOs from KBC | [Guides → Room](guides/room.md) |
| Wire everything through Hilt | [Guides → Hilt](guides/hilt.md) |
| Bridge a custom Android API into KBC | [Guides → Custom Capability](guides/custom-capability.md) |
| Render a custom `@Composable` not in the built-in catalog | [Guides → Custom Adapter](guides/custom-adapter.md) |
| Understand what Kotlin features are supported | [Guides → Kotlin Language](guides/kotlin-language.md) |
| Look up an opcode, capability ID, or compile error | [Reference](reference/kbc-opcodes.md) |

---

## Hard non-goals

Some things Ketoy will **never** support, by design:

- No downloadable DEX / JVM bytecode (KBC only).
- No reflection inside KBC.
- No direct `android.*` / `androidx.*` API access from KBC source, every
  Android touchpoint is mediated by the capability registry.
- No `GlobalScope`, `runBlocking`, or unstructured concurrency.
- No raw I/O, file, network, prefs all go through capabilities.
- No skipping signature verification in production builds.

If you need any of those things, they belong in **native Kotlin** in your
host APK. Ketoy is for the parts you want to ship over-the-air.
