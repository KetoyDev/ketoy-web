# Compose Tokens

The full table of Compose property-getter reads the compiler plugin
resolves into inline byte-tagged literals — no `CONSTRUCT_JVM` opcode,
no host adapter call, just a few bytes in the bundle.

88 entries across 13 token families. All live in the
`ComposeTokenRegistry` (single source of truth shared by the encoder,
the modifier IR walker, and the validator).

---

## `KBCValue` tag byte space

Each token encodes as a `KBCValue.*` variant with a 1-byte tag. The
runtime decoder reads the tag, decodes the payload, dispatches the
typed value to the receiving slot.

| Tag | Variant | Encoded as |
|---|---|---|
| `0x00` | `Default` | use the adapter's source default |
| `0x01` | `Null` | `null` |
| `0x02` | `Bool` | `1 byte` |
| `0x03` | `IntVal` | `4 bytes` |
| `0x04` | `FloatVal` | `4 bytes` |
| `0x05` | `StringLiteral` | `u16 pool idx` |
| `0x06` | `Dp` | `4 bytes float` |
| `0x07` | `Sp` | `4 bytes float` |
| `0x08` | `ColorARGB` | `4 bytes` |
| `0x09` | `FontWeightInt` | `2 bytes` |
| `0x0A` | `FontStyleId` | `1 byte` |
| `0x0B` | `TextAlignId` | `1 byte` |
| `0x0C` | `TextOverflowId` | `1 byte` |
| `0x0D` | `TextDecorationId` | `1 byte` |
| `0x0E` | `TextStyleTokenId` | `1 byte` (MaterialTheme typography) |
| `0x0F` | `VerticalArrangementId` | `1 byte` |
| `0x10` | `HorizontalArrangementId` | `1 byte` |
| `0x11` | `HorizontalAlignmentId` | `1 byte` |
| `0x12` | `VerticalAlignmentId` | `1 byte` |
| `0x13` | `ContentScaleId` | `1 byte` |
| `0x14` | `ContentAlignmentId` | `1 byte` |
| `0x15` | `KeyboardTypeId` | `1 byte` |
| `0x16` | `ImeActionId` | `1 byte` |
| `0x17` | `CapitalizationId` | `1 byte` |
| `0x18` | `VisualTransformationId` | `1 byte` |
| `0x19` | `Register` | `1 byte` — pointer to runtime-constructed value |
| `0x1A` | `ListRegister` | `1 byte` |
| `0x1B` | `ModifierRef` | `2 bytes` — modifier table index |
| `0x1C` | `FontFamilyTokenId` | `1 byte` |
| `0x1F` | `FunctionRef` | `2 bytes` — function table index |
| `0x20` | `NoCallback` | tag-only |
| `0x21` | `TextUnitUnspecified` | tag-only |
| `0x22` | `DpUnspecified` | tag-only |
| `0x23` | `ColorUnspecified` | tag-only |
| `0x25` | `ClosureRef` | `2 bytes fnIdx + u8 count + u8*` |

---

## Token families (88 entries)

### Colors (12 — `KBCValue.ColorARGB`)

```
Color.Black        0xFF000000      Color.White        0xFFFFFFFF
Color.DarkGray     0xFF444444      Color.Red          0xFFFF0000
Color.Gray         0xFF888888      Color.Green        0xFF00FF00
Color.LightGray    0xFFCCCCCC      Color.Blue         0xFF0000FF
Color.Yellow       0xFFFFFF00      Color.Cyan         0xFF00FFFF
Color.Magenta      0xFFFF00FF      Color.Transparent  0x00000000
```

For any other color, use `Color(0xAARRGGBB)` literal — the encoder
inlines it as `ColorARGB(value)` via a dedicated path in
`KBCValueEncoder.colorArgFromConstructor`.

### Dimensions (2 — `Dp` / `Sp`)

```
Int.dp     → KBCValue.Dp(value)
Float.dp   → KBCValue.Dp(value)
Int.sp     → KBCValue.Sp(value)
Float.sp   → KBCValue.Sp(value)
```

Encoded as 4-byte floats. Only the `<get-dp>` / `<get-sp>` numeric
receiver pattern resolves through the registry — `Dp.Companion.Hairline`,
`TextUnit.Unspecified` etc. flow through other paths.

### Font weights (9 — `KBCValue.FontWeightInt`)

```
FontWeight.Thin        100
FontWeight.ExtraLight  200
FontWeight.Light       300
FontWeight.Normal      400
FontWeight.Medium      500
FontWeight.SemiBold    600
FontWeight.Bold        700
FontWeight.ExtraBold   800
FontWeight.Black       900
```

For other weights, use `FontWeight(450)` (constructor call — falls
through to a different code path; less compact but works).

### Font styles (2 — `KBCValue.FontStyleId`)

```
FontStyle.Normal       NORMAL
FontStyle.Italic       ITALIC
```

### Font families (5 generic + StringLiteral for custom)

```
FontFamily.Default     DEFAULT      → KBCValue.FontFamilyTokenId
FontFamily.SansSerif   SANS_SERIF
FontFamily.Serif       SERIF
FontFamily.Monospace   MONOSPACE
FontFamily.Cursive     CURSIVE
```

`FontFamily(Font(R.font.X))` is atomically collapsed to
`KBCValue.StringLiteral("X")` — the resource **name** is encoded; the
runtime resolves it through `KBCFontFamilyResolver`.

### TextAlign (6 — `KBCValue.TextAlignId`)

```
TextAlign.Start    START
TextAlign.End      END
TextAlign.Center   CENTER
TextAlign.Justify  JUSTIFY
TextAlign.Left     LEFT
TextAlign.Right    RIGHT
```

### TextOverflow (3 — `KBCValue.TextOverflowId`)

```
TextOverflow.Clip      CLIP
TextOverflow.Ellipsis  ELLIPSIS
TextOverflow.Visible   VISIBLE
```

### TextDecoration (3 — `KBCValue.TextDecorationId`)

```
TextDecoration.None         NONE
TextDecoration.Underline    UNDERLINE
TextDecoration.LineThrough  LINE_THROUGH
```

### Arrangement (12 — vertical / horizontal / both)

Unambiguous (single direction):

```
Arrangement.Top     → VerticalArrangementId(TOP)
Arrangement.Bottom  → VerticalArrangementId(BOTTOM)
Arrangement.Start   → HorizontalArrangementId(START)
Arrangement.End     → HorizontalArrangementId(END)
```

Ambiguous `HorizontalOrVertical` (dispatch on the destination param's
type FQ):

```
Arrangement.Center, Arrangement.SpaceEvenly,
Arrangement.SpaceBetween, Arrangement.SpaceAround
```

These four entries are stored as `ParamTypeDispatched` — when the
encoder sees `Arrangement.SpaceBetween` passed to a
`verticalArrangement: Arrangement.Vertical` slot, it emits
`VerticalArrangementId(SPACE_BETWEEN)`; the same source token passed to
a `horizontalArrangement: Arrangement.Horizontal` slot emits
`HorizontalArrangementId(SPACE_BETWEEN)`.

### Alignment (15)

9 content alignments (`KBCValue.ContentAlignmentId`):

```
Alignment.TopStart      Alignment.TopCenter      Alignment.TopEnd
Alignment.CenterStart   Alignment.Center         Alignment.CenterEnd
Alignment.BottomStart   Alignment.BottomCenter   Alignment.BottomEnd
```

3 vertical-only (`KBCValue.VerticalAlignmentId`):

```
Alignment.Top
Alignment.CenterVertically
Alignment.Bottom
```

3 horizontal-only (`KBCValue.HorizontalAlignmentId`):

```
Alignment.Start
Alignment.CenterHorizontally
Alignment.End
```

### ContentScale (7 — `KBCValue.ContentScaleId`)

```
ContentScale.Crop         ContentScale.Fit          ContentScale.FillBounds
ContentScale.Inside       ContentScale.None
ContentScale.FillHeight   ContentScale.FillWidth
```

### KeyboardType (8 — `KBCValue.KeyboardTypeId`)

```
KeyboardType.Text             KeyboardType.Number
KeyboardType.Phone            KeyboardType.Uri
KeyboardType.Email            KeyboardType.Password
KeyboardType.NumberPassword   KeyboardType.Decimal
```

### ImeAction (8 — `KBCValue.ImeActionId`)

```
ImeAction.Default   ImeAction.None    ImeAction.Go     ImeAction.Search
ImeAction.Send      ImeAction.Next    ImeAction.Done   ImeAction.Previous
```

### KeyboardCapitalization (4 — `KBCValue.CapitalizationId`)

```
KeyboardCapitalization.None
KeyboardCapitalization.Characters
KeyboardCapitalization.Words
KeyboardCapitalization.Sentences
```

### VisualTransformation (1 — `KBCValue.VisualTransformationId`)

```
VisualTransformation.None
```

`PasswordVisualTransformation()` is a class — flows through
`CONSTRUCT_JVM` instead.

---

## Material Icons

Icons aren't token-encoded — they use `KBCValue.StringLiteral` carrying
the canonical FQ name. The runtime resolves through a host-provided
`KBCImageVectorResolver`.

The token registry **does** know about icon style packages — it
pattern-matches `androidx.compose.material.icons.<style>.<name>` and the
`Icons.<style>` selector getters so KBC source can write
`Icons.Filled.Settings` and have it normalised to the canonical FQ.

Supported style packages:

```
androidx.compose.material.icons.filled.
androidx.compose.material.icons.rounded.
androidx.compose.material.icons.outlined.
androidx.compose.material.icons.sharp.
androidx.compose.material.icons.twotone.
androidx.compose.material.icons.automirrored.filled.
androidx.compose.material.icons.automirrored.rounded.
androidx.compose.material.icons.automirrored.outlined.
androidx.compose.material.icons.automirrored.sharp.
androidx.compose.material.icons.automirrored.twotone.
```

Plus the `Icons.<get-Default>`, `<get-Filled>`, `<get-Rounded>`, etc.
selectors used in `Icons.Default.Settings`-style chains.

See [Compose UI guide](../guides/compose-ui.md) for the resolver
registration pattern.

---

## What's not tokenised

Things you might expect to be tokens but aren't:

- **`MaterialTheme.colorScheme.primary`** etc. — these are not tokens;
  they read from `LocalColorScheme` at render time. Pass them through
  to the adapter via `Register`-bound runtime values (often via a
  `remember { MaterialTheme.colorScheme.primary }` style ceremony).
- **`Dp.Hairline`, `Dp.Unspecified`, `TextUnit.Unspecified`,
  `Color.Unspecified`** — encoded as the tag-only sentinel variants
  (`DpUnspecified`, `TextUnitUnspecified`, `ColorUnspecified`).
- **Custom material theme tokens** (`shapes.medium`, etc.) — these are
  property reads on `MaterialTheme.shapes`, resolved at render time.
- **`em` units** — deferred. There's no `KBCValue.Em` variant yet.

For tokens not in the registry that should be, file an issue or PR
adding the family — every entry is a few lines in
`ComposeTokenRegistry.kt`.

Next: [Compile Errors →](compile-errors.md)
