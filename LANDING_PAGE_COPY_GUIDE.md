# Ketoy Landing Page — Copy & Structure Playbook

A reusable guide for writing and rebuilding the Ketoy landing page. It captures
the voice, rules, and section patterns learned from **kotlinlang.org** and
**shorebird.dev**, and shows how each was applied to Ketoy. Use this whenever you
write a new headline, description, card, or section so the page stays one
consistent voice.

---

## 1. What we studied and why

Ketoy sits in the same category as **Shorebird** (over-the-air code push for
Flutter) and is built on the same language ecosystem as **Kotlin**. Both sites
are the gold standard for a short, confident developer landing page.

**Shorebird** — the closest analog. Confident outcome headline, dual CTA, a
deploy-flow motion visual, compact security + FAQ, one final CTA. Copy is short,
positive, and benefit-led.

**Kotlin** — product name plus a tight tagline, live code as the centerpiece,
short sections, credibility strip, one clear "Get started".

The takeaway: **short beats complete. Confidence beats cleverness. Positive beats
defensive.**

---

## 2. Voice & tone

1. **Calm and confident.** State the benefit, then the mechanism. Never oversell,
   never joke, never rib the reader.
2. **Positive framing only.** Say what Ketoy *does*, not what it *doesn't* make you
   do. No "No X" lists. (Kotlin/Shorebird never list negatives.)
3. **Active voice, present tense.** "Push updates." "Ketoy verifies every bundle."
4. **Direct address.** "You write real Compose." "Your private key stays on your
   server."
5. **Keep real technical nouns.** `KBC`, `Ed25519`, `.ktx`, `Material 3`, `Hilt`.
   Credibility comes from specifics, not adjectives.

**Reference DNA**
- Kotlin hero: `Kotlin` → `Concise. Multiplatform. Fun.`
- Shorebird hero: `Build Flutter apps with confidence` → `Ship on your timeline, not somebody else's.`

---

## 3. Hard formatting rules

These are strict. They are what separates our copy from the old draft.

| Rule | Do | Don't |
|---|---|---|
| **No em-dashes** | Use a period and a new sentence. | ~~"…in seconds — no Play Store release."~~ |
| **No hyphen used as a dash** | Full stop instead. | ~~"real app - now updatable"~~ |
| **Minimize hyphenated compounds** | "over the air", "on device", "Play Store safe" | ~~"over-the-air", "on-device", "Play Store-compliant"~~ |
| **Few commas** | Break into short sentences. One comma max in a heading. | Comma-chained clauses. |
| **No decorative symbols** | Plain words. | ~~"✕ No DSL", "→" arrows in text links, "· " middots in body~~ |
| **"and", not "&"** | "Compose and Material 3" | ~~"Compose & Material 3"~~ |
| **Numeric symbols are fine** | `< 50ms`, `~4KB`, `20×` | — (these live in stat *values*, not sentences) |

> Note: `over the air` is written **without hyphens** everywhere, including the
> hero and the OTA motion tagline. Shorebird writes it this way too.

---

## 4. Length patterns

- **Eyebrow:** 1–3 words. Lowercase concept label. ("Why Ketoy", "What's supported", "Security", "Quick start")
- **H1 (hero):** 4–6 word fragment, ends in a period. Names the outcome.
- **H2 (section):** 2–5 word fragment, ends in a period. ("Update without a release.", "Secure and compliant.")
- **Section body:** 1–2 sentences, each under ~15 words.
- **Card heading:** 2–4 words. ("Instant updates", "Just Kotlin", "Play Store safe")
- **Card body:** 2 short sentences, ~8–14 words each.
- **CTA / link text:** 2–4 words, verb-first, no arrow glyph. ("Get started", "How it works", "See everything Ketoy supports")

**Formula for a section:** `eyebrow (concept) → H2 (outcome fragment) → 1–2 short benefit sentences → the proof (cards / code / stats)`.

---

## 5. Page structure (6 sections, tight)

Model: Shorebird/Kotlin open confident and stay short. Ketoy stays tight. Add a
section only when it carries a distinct product capability, and fold everything
else into an existing one.

1. **Hero** — tag pill, outcome H1, one-line sub, dual CTA, product code window,
   the OTA motion, a 4-stat credibility strip.
2. **Why Ketoy** — the core promise in 3 numbered cards.
3. **What's supported** — the depth proof (6 capability cards) + one positive
   takeaway line + link to `/features`.
4. **Security** — 3 cards + one Play Store FAQ callout. Dark band.
5. **Tooling** — the CLI and MCP as two cards, each with a graphic (terminal /
   agent tool-call), a heading, one line, an install snippet, and a docs link
   (`/docs/cli`, `/docs/mcp`). Mirrors Shorebird's "opinionated platform"
   section with a CLI screenshot plus capability cards.
6. **Final CTA** — one outcome headline, one line, two buttons.

**Removed on purpose:** anything longer. No "wait-cost calculator", no "ship by
prompt / AI" section, no standalone "things you don't have to learn" section.
Fold differentiators into a single positive line.

---

## 6. Section-by-section patterns (with the live Ketoy copy)

### Hero
- **Tag pill:** version + one short concept. `v0.4` · `Kotlin OTA`.
- **H1 pattern:** `Ship <the thing> over the air.` → **"Ship Compose UI over the air."**
  Name the framework the way Shorebird names "Flutter" (here: "Compose UI").
- **Sub pattern:** `Write real <framework>. <the payoff> in seconds.` →
  **"Write real Jetpack Compose. Push updates to every device in seconds."**
- **CTAs:** primary "Get started", ghost "How it works".
- **Stats strip:** value + short label. Labels are plain: "Load, verify, and parse",
  "First frame, cold", "A full checkout flow", "Smaller than JSON SDUI".

### Why Ketoy (3 cards)
- **H2:** "Update without a release."
- **Body:** "Add one annotation. Run one Gradle task. Every device gets the change in seconds."
- **Cards** (heading = 2 words; body = 2 short sentences; one link):
  - `Instant updates` — "Fix a bug at 3pm. Every user has it by 3:01. The app never reinstalls." → *How it works*
  - `Play Store safe` — "Ketoy generates code on device, the same way ART does. It stays inside Google policy." → *Security model*
  - `Just Kotlin` — "It is the Jetpack Compose you already write. Nothing new to learn." → *What is supported*

### What's supported (6 cards + takeaway)
- **H2:** "If it's Compose, it's Ketoy."
- **Body:** "Ketoy supports the full Compose toolkit, not a curated subset. When Compose adds a parameter, one command picks it up."
- **Card body pattern:** `<the set>. <the guarantee>.` e.g. "All 35 Material 3 components. Every parameter included."
- **Takeaway line (positive, replaces any 'No X' list):**
  **"One annotation and one Gradle task. That is the whole difference."** + link
  "See everything Ketoy supports".

### Security (3 cards + FAQ)
- **H2:** "Secure and compliant." (mirrors Shorebird's "Secure and Compliant")
- **Body:** "Ketoy verifies every bundle before it runs. Here is how, in three parts."
- **Card headings are the claim:** "Every bundle is signed", "The sandbox is a
  build error", "Capabilities are the only door".
- **FAQ callout uses a real question** (Kotlin's "Why Kotlin?" move):
  "Is this allowed on the Play Store?" → answer starts with "Yes."

### Tooling (CLI + MCP)
- **H2:** "Command line and AI agents." (plain and descriptive, Kotlin register,
  not marketing; avoid possessive claims like "your terminal")
- **Body:** "The Ketoy CLI runs your whole workflow. The Ketoy MCP helps your AI agent write correct Ketoy code."
- **Two cards**, each: a graphic on top, a two-word heading, one benefit line, a
  mono install snippet, and a docs link.
  - `Ketoy CLI` — "Set up a project, push to the cloud, and roll back. All from
    the terminal." · `npm install -g ketoy-dev` · *CLI docs* → `/docs/cli`
  - `Ketoy MCP` — "Your AI agent checks what Ketoy supports before it writes a
    line." · `claude mcp add ketoy` · *MCP docs* → `/docs/mcp`
- Graphics live in [ToolingGraphics.js](src/modules/home/components/ToolingGraphics.js);
  keep them static (the only motion is the CLI caret, off under reduced motion).

### Final CTA
- **H2:** "Write Kotlin. Ship the screen."
- **Body:** "Available now on Maven Central. Hilt, dev tools, and the full Material 3 catalog are included."
- Buttons: "Read the docs", "Get started".

---

## 7. Before → after (why the rewrite works)

| Element | Before (avoid) | After (this voice) |
|---|---|---|
| Hero H1 | "Server-driven UI for Android, written in Kotlin." | "Ship Compose UI over the air." |
| Hero sub | "…push UI changes over-the-air to installed apps in seconds — no Play Store release, no JSON DSL." | "Write real Jetpack Compose. Push updates to every device in seconds." |
| Why H2 | "Still your real Android app — now updatable over-the-air." | "Update without a release." |
| Supported H2 | "If it's in Jetpack Compose, it's in Ketoy." | "If it's Compose, it's Ketoy." |
| Differentiator | "✕ No new DSL  ✕ No JSON schema  ✕ No migration…" | "One annotation and one Gradle task. That is the whole difference." |
| Security H2 | "Signed, sandboxed, Play Store-compliant." | "Secure and compliant." |
| Link text | "See the full supported-features matrix →" | "See everything Ketoy supports" |

The pattern in every row: **shorter, no em-dash, fewer hyphens, positive, ends
on a clean period.**

---

## 8. Where the copy lives (for edits)

- **Section headings, eyebrows, hero, CTA prose:** [app/page.js](app/page.js)
- **Card content** (`heroStats`, `whatIsCards`, `supportCards`, `securityCards`,
  `legalCards`): [src/modules/home/data.js](src/modules/home/data.js)
- **OTA motion tagline / log lines:** [src/modules/home/components/OtaMotion.js](src/modules/home/components/OtaMotion.js)
- Keep the same words across `app/page.js`, the JSON-LD `HOME_FAQ`, and
  `SITE_DESCRIPTION` so the on-page copy and SEO copy do not drift.

---

## 9. Pre-ship checklist

Run this on any new or edited line before committing:

- [ ] No em-dash (`—`) anywhere in visible copy.
- [ ] No hyphen used as a dash; hyphenated compounds reduced ("over the air", "on device").
- [ ] Headings are fragments, 2–5 words, ending in a period.
- [ ] Body sentences are under ~15 words; two sentences max per block.
- [ ] Framed positively — no "No X" or defensive phrasing.
- [ ] "and" instead of "&"; no decorative symbols or arrow glyphs in text.
- [ ] Real technical nouns kept for credibility.
- [ ] Section count stays tight (currently 7). Add one only for a distinct product capability.
- [ ] `next build` passes and `/` prerenders.
