# Design System: Ketoy.dev

Server-Driven UI for Jetpack Compose. A landing page that pitches Ketoy to
engineering leads, executives and investors, and reads as a funded, production
grade developer platform.

Reference feel (feel only, never cloned UI): **stac.dev** for calm developer
confidence and product tiles that show the real thing, **shorebird.dev** for the
dark hero that opens onto bright, rounded content sheets and for its short
outcome-first headlines. Ketoy keeps its own brand: Ketoy Ink Navy, the Urbanist
wordmark and the 18-ray shutter mark.

**Taste dials:** Density 5 (Daily App Balanced) · Variance 4 (Offset, mostly
symmetric) · Motion 5 (Fluid, scroll-choreographed).
Variance is set below the skill default on purpose. A pitch to executives reads
as trustworthy when it is orderly, which is why the hero is centered (see 5.1).

---

## 1. Visual Theme & Atmosphere

Confident, quiet and expensive. The page opens on a deep **Ink Navy** hero, the
same colour as the Ketoy logo, then hands off to **bright paper-white sheets**
with large, softly rounded corners sitting on a cool cloud-grey canvas. The
rhythm alternates dark anchor, bright sheet, bright sheet, dark anchor. The page
feels lit like a product keynote: high contrast, generous air, and nothing
glowing.

The product does the talking. Every visual is real Ketoy UI built in HTML and
CSS: a Kotlin editor, a terminal running Gradle tasks, and a bare app screen
that changes when the code changes. There are no photographs, mascots, stock
illustrations or abstract particle art. Typography is bold and tight like the
Ketoy wordmark, and body copy is short and calm.

Mood words: precise, bright, engineered, calm, credible.

---

## 2. Color Palette & Roles

One brand dark, one accent, one functional status colour. All neutrals share the
same cool blue-grey hue (about 205°) as the navy, so greys never drift warm.

### Brand and neutrals
- **Ketoy Ink Navy** (#05141F): Hero and anchor-band backgrounds, primary text on
  light surfaces, primary button fill on light surfaces. Same value as the logo.
- **Deep Panel** (#0B1E2B): Raised surfaces inside navy sections, such as code
  editors, terminal windows and the security panel.
- **Navy Hairline** (rgba(230,237,242,0.10)): 1px borders and dividers on navy.
- **Frost Text** (#E6EDF2): Headings and primary text on navy (15.8:1).
- **Mist Text** (#93A4B1): Secondary text on navy (7.3:1 on #05141F).
- **Paper White** (#FFFFFF): Content sheets, cards and the light hero button.
- **Cloud Canvas** (#F3F6F8): Page background behind the light sheets.
- **Slate Text** (#4A5B68): Secondary text and descriptions on light (7.0:1).
- **Sheet Hairline** (#E1E7EC): 1px borders and dividers on light.

### Accent (maximum one)
- **Compose Blue** (#2563D0, saturation 70%): Eyebrow labels, text links, focus
  rings, the active tab, and the single highlighted token in a code sample.
  5.6:1 on white. Use it on at most one element group per viewport. It is never
  a large fill and never a gradient.
- **Compose Blue on navy** (#8AABE3, saturation 61%): The same role on dark
  surfaces (8.0:1 on #05141F).

### Functional status (not an accent)
- **Live Green** (#157A48 text on light, #3DDC84 as an 8px dot on navy): Only
  for "live", "pushed" and "verified" states in product UI. It is never used for
  glows, fills, buttons or decoration.

### Logo (use exactly as shipped in `src/components/KetoyLogo.js`)
- **Mark:** 18 shutter rays around an open ring. Each ray is the path
  `M-80 -240H-30V-146.97A150 150 0 0 0 -80 -126.89Z` in a `-256 -256 512 512`
  viewBox, rotated in 20° steps:
  - **Android Green #3DDC84** at -40° to 80° (7 rays)
  - **Google Blue #4285F4** at 100° to 200° (6 rays)
  - **Logo Ink** at 220° to 300° (5 rays): #0B3A4F on light surfaces and
    #E8EEF2 on navy surfaces
- **Wordmark:** "Ketoy" in Urbanist 700, set to the right of the mark with a
  10px gap. Ink Navy on light and Frost Text on navy.
- Header size is a 30px mark with 21px wordmark text.
- Never redraw, recolour, outline, add a glow to, or swap the mark for a
  generic icon.
- Android Green and Google Blue appear **only inside the mark**. They are never
  used for UI.

### Rules
- Never use pure black (#000000). The darkest value is Ink Navy #05141F.
- Never place warm greys (stone, sand, beige) next to these cool neutrals.
- Never use gradients on text. The only gradient allowed is a single, very
  subtle top-to-bottom wash on the hero (#05141F to #0A1C29). It has no colour
  hue shift and no radial glow.

---

## 3. Typography Rules

- **Display: Urbanist** (700, with 600 for H3). This is the Ketoy wordmark
  typeface, so headlines and logo speak one voice. Tracking is tight (-0.025em on
  H1, -0.02em on H2) and line height is 1.02 to 1.08. Hierarchy comes from weight
  and colour, not from oversized type.
  - H1: `clamp(2.75rem, 6vw, 4.5rem)` (44 to 72px)
  - H2: `clamp(2rem, 4vw, 3rem)` (32 to 48px)
  - H3 / tile title: 1.375rem (22px), 600
- **Body and UI: Geist** (400 body, 500 UI, 600 buttons). Body is 1.0625rem
  (17px) at line height 1.6 with a maximum measure of 62ch. Lead paragraphs under
  H1 and H2 are 1.25rem (20px) in Slate Text or Mist Text.
- **Mono: JetBrains Mono** (400/500). Used for Kotlin code, Gradle and CLI
  commands, file names (`.ktw`), versions and measured numbers. It is the Kotlin
  ecosystem's own typeface, which is a quiet credibility signal.
- **Eyebrow:** Geist 600, 0.875rem, Compose Blue, sentence case, 1 to 3 words
  ("Why Ketoy", "Security"). No numbering, no monospace and no letter-spaced
  uppercase.
- **Banned:** Inter, Bricolage Grotesque, Hanken Grotesk, Times New Roman,
  Georgia, Garamond and any serif. No all-caps headings.

---

## 4. Component Stylings

- **Primary button:** 48px tall, 22px horizontal padding, fully rounded (999px).
  On navy it is a Paper White fill with Ink Navy text. On light it is an Ink Navy
  fill with white text. Hover lifts by translateY(-1px) with a 150ms ease. Active
  presses down with translateY(1px) and scale(0.98). There are no shadows, glows
  or gradient fills.
- **Secondary button:** The same shape as the primary, with a transparent fill
  and a 1px hairline border (Navy Hairline or Sheet Hairline). It is used only
  for "View on GitHub", which shows the live star count in JetBrains Mono.
- **Text link:** Compose Blue, 500 weight, underline on hover only. Verb-first
  copy with no arrow glyphs ("See everything Ketoy supports").
- **Release pill (hero):** 32px tall, fully rounded, Navy Hairline border, Deep
  Panel fill. It holds a Live Green 8px dot, then "Ketoy SDK 0.1.3-beta.2 is out"
  in Geist 500 Frost Text.
- **Content sheet:** Paper White, 32px radius (2rem), 1px Sheet Hairline, no
  shadow. Sheets hold whole sections and are separated by Cloud Canvas.
- **Product tile (bento cell):** Paper White, 24px radius, 1px Sheet Hairline and
  28px padding. The title (Urbanist 600) and a one-line description sit at the top
  and a live product micro-demo fills the bottom 60%. On navy, tiles use a Deep
  Panel fill with a Navy Hairline border. The only shadow allowed is on a hovered
  tile: `0 12px 32px -12px rgba(5,20,31,0.18)`, tinted navy.
- **Code window:** Deep Panel fill, 16px radius and a 40px title bar holding the
  file name in JetBrains Mono (Mist Text). There are no traffic-light dots. Syntax
  colours are drawn from the palette: keywords in Compose Blue on navy (#8AABE3),
  strings #E6EDF2, comments #93A4B1, and the single edited token underlined in
  Live Green while a push is in progress.
- **Terminal:** The same shell as the code window. The prompt is `$` in Mist Text
  and output lines are Frost Text. Success lines carry a Live Green dot.
- **App screen (product surface):** A bare rounded rectangle (360×720, 28px
  radius, 1px hairline) that renders the Compose screen. There is no hardware
  bezel, notch, camera, tilt or 3D perspective.
- **Tech strip:** A row of monochrome glyphs for Kotlin, Jetpack Compose, Android,
  Gradle and Maven Central at 24px in Slate Text, labelled "Built on". It lists
  real technology only, never invented customer logos.
- **FAQ accordion:** Full-width rows separated by Sheet Hairline. The question is
  Urbanist 600 at 1.25rem and the chevron rotates 180° on open. Height animates
  through the grid-template-rows 0fr to 1fr technique.
- **Inputs (newsletter or contact):** The label sits above in Geist 500 and errors
  below in #B42318. The field is 48px tall with a 12px radius. The focus ring is
  2px Compose Blue at 2px offset. No floating labels.
- **Loading:** Skeleton blocks in #E9EEF2 matching final dimensions, with a slow
  1.6s shimmer. No circular spinners.

---

## 5. Layout Principles

- **Container:** max-width 1200px, centered, with a 24px gutter (16px on mobile).
  Sheets run edge to edge inside a 1280px frame.
- **Grid:** CSS Grid with 12 columns and 24px gaps. No flexbox percentage maths
  and no `calc()` width hacks.
- **Section rhythm:** Vertical padding of `clamp(4rem, 9vw, 7.5rem)`, with 16px of
  Cloud Canvas between sheets.
- **No overlapping:** Every element owns its own zone. Text never sits on top of
  images or other text.
- **Tiles are not three in a row.** Bento cells are always asymmetric: 7/5
  splits, 8/4 splits, or one wide tile over two stacked tiles.
- **Full-height sections** use `min-height: 100dvh`, never `100vh`.

### 5.1 Page map (seven sections, matching the copy guide)

1. **Hero (Ink Navy, centered).** This is the one deliberate centered layout,
   following both references. From top to bottom:
   - the release pill
   - the H1 "Ship ⟦Kotlin glyph chip⟧ Kotlin over the air."
   - one lead sentence
   - the primary CTA "Get started" and the secondary "View on GitHub"
   - the tech strip

   **Inline glyph chip:** a 0.9em rounded tile (Deep Panel fill, hairline
   border) holding the Kotlin logo, sitting on the text baseline inside
   the headline. It is the brand version of inline image typography, and it
   never uses a photo.
2. **Product stage (navy into canvas).** A wide 32px-radius Deep Panel stage
   sits directly under the hero. It shows a three-part live demo:
   - the Kotlin DSL editor (`ketoyExport("home") { KColumn { … } }`)
   - the terminal (`./gradlew ketoyDev`, then `pushed home.ktw · 4.1 KB · 180 ms`)
   - the app screen updating

   It collapses to editor-then-screen on mobile.
3. **Update without a release. (light sheet)** A bento grid of one wide tile
   (live push timeline) over two tiles (wire format at 10 to 15x smaller than
   JSON, and five cache strategies).
4. **If it's Compose, it's Ketoy. (light sheet)** A 7/5 split with the component
   gallery (real HTML renders of Button, TextField, LazyColumn and Card) on the
   left and the variable system (`{{data:user:name}}` resolving live) on the
   right. Ends with the link "See everything Ketoy supports".
5. **Command line and AI agents. (light sheet, zig-zag)** The terminal on the
   left with the task list (`ketoyExport`, `ketoyDev`, `ketoyServe`,
   `ketoyPush`, `ketoyRollback`) and the copy on the right. The next row mirrors
   it.
6. **Secure and compliant. (Ink Navy anchor inset in canvas)** The statement and
   three facts sit on the left (Ed25519 signed bundles, private key on your
   server, Play policy safe). A verification flow on the right animates
   signature, then verify, then render.
7. **Write Kotlin. Ship the screen. (light sheet)** A three-step vertical stepper
   (add the Gradle plugin, annotate a screen, run `ketoyDev`), each step with a
   copyable code block.
8. **Questions, answered. (light sheet)** A 4/8 split with the sticky title on
   the left and the accordion on the right. This is followed by a closing navy CTA
   band ("Ship your next screen today.", one primary button) and the footer.

### 5.2 Responsive

- Below 768px every multi-column layout collapses to a single column with no
  exceptions, and there is no horizontal scroll.
- Headlines scale through `clamp()`. Body text never drops below 1rem.
- The inline glyph chip stays inline at all sizes. The headline rewraps around it.
- Every tap target is at least 44px. The desktop nav becomes a full-sheet menu
  with 56px rows.
- The product stage stacks as editor, then terminal line, then app screen, and
  the scroll pin is disabled under 768px.

---

## 6. Motion & Interaction

Engine: **GSAP + ScrollTrigger** for choreography, **Lenis** for smooth scroll
(lerp 0.1), and **SplitText** for headline reveals. These are community
libraries, used deliberately.

- **Hero entrance:** H1 lines rise from a 100% mask (y 100% to 0, 0.9s, ease
  `power3.out`, line stagger 0.08s). Then the lead, CTAs and tech strip fade up
  with an 80ms cascade.
- **Product stage:** Pinned for about 120vh and scrubbed by scroll. A token in
  the editor changes, the terminal prints the push line, and the app screen
  cross-fades to the new UI. This is the signature moment of the page.
- **Section reveals:** Elements translate 24px and fade in at 0.6s with
  `power2.out`. Children cascade at 60ms intervals. Nothing mounts all at once.
- **Spring feel for interactive elements:** stiffness 100, damping 20. No linear
  easing anywhere.
- **Perpetual micro-loops (restrained for a pitch):** exactly two. The Live Green
  dot pulses (scale 1 to 1.35 and opacity 1 to 0.4 at 2s) and the editor caret
  blinks. Nothing else loops.
- **Performance:** Animate only `transform` and `opacity`. Never animate `top`,
  `left`, `width` or `height`. No WebGL, no canvas and no particle fields.
- **Reduced motion:** Under `prefers-reduced-motion: reduce`, disable Lenis, the
  pin, scrubbing and the loops. The final states render immediately.

---

## 7. Dark Mode Mapping

The site keeps its theme toggle. In dark mode:
- Cloud Canvas becomes #05141F.
- Paper White sheets become #0B1E2B with a Navy Hairline border.
- Slate Text becomes Mist Text.
- Compose Blue becomes #8AABE3.
- Ink Navy anchor bands become #0F2636 so they still read as a distinct band.

Light mode is the default and the primary pitch experience.

---

## 8. Copy Rules (from LANDING_PAGE_COPY_GUIDE.md)

- Headlines are 2 to 6 word fragments ending in a period, stating the outcome.
- Body is at most two sentences of about 15 words each. Use active voice and
  direct address.
- No em-dashes, no hyphen used as a dash, "over the air" without hyphens,
  "and" instead of "&", and no arrow glyphs in text.
- Positive framing only. No "No X" lists.
- Use real technical nouns and measured numbers (`~4 KB`, `180 ms`,
  `10 to 15x`), never round invented stats.

---

## 9. Anti-Patterns (Banned)

### Ketoy-specific rejected directions (never repeat)
- Near-black **green-tinted** pages, soft green glows or mint radial washes.
- Mono numbered eyebrows ("01 — THE PREMISE") and hairline spec tables inside
  cards.
- Dot fields, particle canvases, WebGL aurora backgrounds and spotlight cards.
- Material 3 pill navigation and tilted or animated 3D phone mockups.
- Bricolage Grotesque or Hanken Grotesk.
- Stock or real photography of any kind, and forced custom SVG illustrations.
- "Invest in us" or "Sponsor us" copy.
- Cloned layouts or components from stac.dev, shorebird.dev or any reference.

### General AI tells
- Emojis anywhere.
- Inter or any serif typeface.
- Pure black (#000000).
- Neon or outer-glow shadows, and purple or blue neon gradients.
- Gradient text on headings.
- Three equal cards in a row.
- More than one accent colour, or accents above 80% saturation.
- Custom mouse cursors.
- Overlapping text and media.
- Filler UI such as "Scroll to explore", bouncing chevrons or scroll arrows.
- Generic placeholder names (John Doe, Acme, Nexus) and invented customer logos
  or testimonials.
- Fake round metrics (99.99%, 10x faster, 50%).
- Copy clichés: Elevate, Seamless, Unleash, Next-Gen, Revolutionize, Supercharge.
- Circular loading spinners.
