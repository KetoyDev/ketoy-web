// The OTA / SDUI definition questions, in the exact wording people type into
// Google and ask AI assistants. Single source of truth: the FAQ page renders
// them and emits them as FAQPage JSON-LD, so the on-page text and the
// structured data can never drift apart.

export const OTA_SDUI_FAQ = [
  {
    q: 'What is OTA (over-the-air) updating in an Android app?',
    a: 'OTA stands for over-the-air. An OTA update delivers new code to an app that is already installed on a device, without publishing a new APK/AAB and without the user reinstalling anything. With Ketoy, that code is real Kotlin - Jetpack Compose UI, ViewModels, business logic, navigation, data classes, and functions - compiled to a signed bundle and fetched at runtime.',
  },
  {
    q: 'What is SDUI (server-driven UI)?',
    a: 'SDUI stands for server-driven UI: the server decides what the screen looks like and the app renders it. Traditional SDUI sends a JSON schema that the client maps onto a fixed catalog of components, so the server can only express what that schema already supports.',
  },
  {
    q: 'Is Ketoy OTA or SDUI?',
    a: 'Ketoy is an OTA framework, and SDUI is one of the things it can do. Because Ketoy ships real Kotlin and Compose over the air, a Ketoy bundle can drive the whole screen from the server - which is SDUI - and it can equally ship a ViewModel, a network call, or a pricing rule that no JSON schema could express.',
  },
  {
    q: 'OTA vs SDUI: which is better?',
    a: 'They answer different questions. SDUI is about who decides the UI; OTA is about how new code reaches an installed app. JSON SDUI is limited to the components its schema defines, so anything with a loop, a condition, or business logic falls back to a store release. OTA with Ketoy covers the SDUI use case and everything beyond it, because you are shipping compiled Kotlin instead of a schema.',
  },
  {
    q: 'Can Ketoy update only the Compose UI?',
    a: 'Yes. Ship a single @KetoyComposable screen and leave the rest of the app native - that is the classic SDUI setup, with real Compose instead of JSON. Common starting points are marketing surfaces, onboarding, settings, and A/B-tested flows.',
  },
  {
    q: 'Can I use Ketoy for business logic only, without UI?',
    a: 'Yes. A bundle does not have to render anything. Plain Kotlin - data classes, sealed classes, when expressions, extension functions, coroutines and Flow - runs on its own, so pricing rules, validation, feature gating, and parsing can all be updated over the air while the UI stays in the APK.',
  },
  {
    q: 'What can Ketoy update over the air?',
    a: 'Jetpack Compose UI, ViewModels and state, navigation graphs, coroutines and Flow, networking, Room and DataStore access, and ordinary Kotlin such as data classes, objects, sealed hierarchies, and functions. Anything that needs the host platform reaches it through registered capabilities.',
  },
  {
    q: 'Do I have to migrate my code or learn a DSL to use Ketoy?',
    a: 'No. There is no DSL and no parallel component model. It is the Jetpack Compose and Kotlin you already write - one annotation plus one Gradle task turns an in-APK screen into an OTA-updatable one, and a custom renderer draws it as native Compose on device.',
  },
  {
    q: 'Are OTA updates allowed on the Google Play Store?',
    a: 'Yes. Ketoy verifies an Ed25519 signature before any code runs and generates code on device the same way ART does with bytecode, the same idea as Lua in a game engine. Bundles are sandboxed by a capability registry, which keeps updates within Play Store policies.',
  },
];
