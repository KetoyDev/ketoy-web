# Ketoy wording guide

How the landing page is written. The patterns below were learned from
measure.sh (the open source mobile monitoring tool) and then applied to Ketoy.
Use this file whenever you write or edit a headline, description, card or
footer line so the whole site keeps one voice.

---

## 1. What measure.sh does, and why it works

Their copy, verbatim, with the pattern each line carries.

| Where | Their copy | Pattern |
|---|---|---|
| Eyebrow | "Mobile apps break, get to the root cause faster." | A problem, a comma, a promise. Nine words. |
| Headline | "Measure helps mobile teams monitor and fix crashes, ANRs, bugs, and performance issues." | Product is the subject. "helps [audience] [verb] [real nouns]". No adjectives. |
| Subheadline | "The open source alternative to Firebase Crashlytics." | Position against one thing the reader already knows. |
| Social proof | "Trusted by high growth mobile teams" | Audience named, not counted. |
| Feature heading | "One dashboard, Complete context" | Two noun phrases, split by a comma. Each phrase two or three words. |
| Feature heading | "Collect what you need, Only when you need it" | Same shape, but as a promise pair. |
| Feature body | "Most monitoring data rots away in a warehouse and runs up your costs. Our Adaptive Capture feature lets you control and dynamically change what data to collect without needing to roll out app updates." | Pain first. Then the named mechanism. Then the outcome, phrased as what you no longer have to do. |
| Feature body | "Ask about a crash, error or slow endpoint and it digs through your telemetry to find the answer." | Conversational, second person, one concrete scene. |
| Closing heading | "Built For Mobile Devs" | Who it is for, four words. |
| Closing body | "For us, Mobile is not an add-on to an observability product. It is the product. Measure is built by mobile engineers, for mobile engineers." | A belief, stated as a contrast. Then "built by X, for X". |
| Closing bullets | "Open Source. Simple Pricing. Every mobile platform." | Three bold two-word facts, each with one line of detail. |
| CTA | "Get started" | Plain. |

What makes it land:

1. **The product is the subject.** "Measure helps…", "Our Adaptive Capture feature lets you…". The reader always knows who is doing the work.
2. **Problem before mechanism, mechanism before outcome.** Every body paragraph walks the same path, so nothing has to be explained twice.
3. **Real nouns carry the credibility.** Crashes, ANRs, Slack, MCP Server, 99.99%. Adjectives are almost absent.
4. **Headings come in pairs.** "Noun phrase, Noun phrase". It gives every section a rhythm and keeps headings under seven words.
5. **The outcome is phrased as a removed chore.** "without needing to roll out app updates", "No seat limits". People feel what they stop doing more than what they gain.
6. **One known competitor, named once.** It positions the product in a sentence and is never repeated.
7. **The close is a belief, not a feature.** "It is the product." Then who built it and for whom.

---

## 2. The Ketoy voice

Ketoy borrows all seven moves and adds its own constraints.

- **Product as subject.** "Ketoy compiles…", "Ketoy ships…", "The CLI signs…". Never "we".
- **Second person for the reader.** "the Compose you already write", "your private key".
- **Real nouns only.** Jetpack Compose, ViewModel, StateFlow, Hilt, Room, DataStore, Ed25519, KBC, .ktx, Material 3, 67 capabilities, 20×, < 100 ms. Numbers must be measured and already published.
- **Positive framing.** Say what Ketoy does and what you stop doing. Avoid lists of "no X".
- **Short sentences.** Under about fifteen words. One comma at most in a heading.
- **No em dashes, no hyphen dashes, no decorative glyphs.** Use a period. "over the air", "on device" without hyphens. "and" instead of "&".
- **Android, not mobile.** Measure says "mobile"; Ketoy says "Android", "Kotlin", "Compose". Specialisation is the point.

---

## 3. Templates

**Hero headline (two lines, under 22 characters each)**
> Problem line. Promise line.
> e.g. "Releases take days." / "Ketoy takes seconds."

**Hero description (two or three sentences)**
> [Product] helps [audience] [verb] [real nouns] without [the chore]. The [Kotlin] alternative to [one known thing].
> Ketoy is not fully open source, so never claim "open source" in copy. Linking GitHub is fine.

**Section heading (two phrases, comma between)**
> [Mechanism phrase], [Outcome phrase].
> e.g. "One annotation, everything over the air."

**Section lead (one or two sentences)**
> What it covers, then the removed chore.

**Card title (two phrases, comma between, under seven words)**
> [What you get], [What it is not].
> e.g. "Real Compose, not a lookalike."

**Card body (three sentences)**
> 1. The pain, in the reader's world.
> 2. The named mechanism, with the real nouns.
> 3. The outcome, phrased as what no longer happens.

**Closing**
> "Built by [who], for [who]." Then one belief in contrast form: "X is not an add-on to Y. It is the product."

**Buttons**
> Two words, verb first. "Get started", "Star on GitHub", "Read the docs".

---

## 4. Before and after on this page

| Element | Before | After |
|---|---|---|
| Hero H1 | Ship Kotlin to every phone in seconds. | Releases take days. Ketoy takes seconds. |
| Hero description | Ketoy compiles real Jetpack Compose, ViewModels and business logic into a small signed bundle and delivers it to installed apps over the air. No Play Store release. No JSON DSL. | Ketoy helps Android teams ship Jetpack Compose, ViewModels and Kotlin logic to installed apps without a Play Store release. The Kotlin alternative to JSON server driven UI. |
| Primary CTA | Start shipping | Get started |
| Layers heading | Everything a release carries, without the release. | One annotation, everything over the air. |
| Card | Every Material 3 component. Every parameter. | Real Compose, not a lookalike. |
| Card body | Scaffold, LazyColumn… All 35 components render as native Compose on the device, not a lookalike drawn from JSON. | JSON driven UI hands you a subset of components drawn by a renderer. Ketoy compiles the Compose you already write, all 35 Material 3 components with every parameter. It renders natively on the device, so nothing is redrawn from a schema. |
| Security heading | Nothing runs until it is verified. | Signed, sandboxed, then rendered. |
| Closing heading | Stop waiting on the release train. | Built by Android devs, for Android devs. |
| Closing body | Install the CLI, annotate one screen and push. Your first over the air update takes about ten minutes. | For us, over the air is not an add-on to a config service. It is the product. Install the CLI, annotate one screen and push. Your first update takes about ten minutes. |

---

## 5. Pre-ship checklist

- [ ] Product is the subject of the first sentence.
- [ ] Headings are two phrases with a comma, under seven words.
- [ ] Each card body goes pain, mechanism, outcome.
- [ ] Outcome is phrased as a removed chore.
- [ ] Every number is measured and already published.
- [ ] No em dash, no hyphen dash, no "&", no glyphs.
- [ ] Hero headline lines are under 22 characters so they never wrap at 1440px.
- [ ] Rendered page read back in the browser.
