# Canvas & Drawing

Write an ordinary Compose `Canvas` with real draw commands (shapes,
paths, gradients, transforms, and text), fully sandboxed and rendered
natively from a KBC bundle.

As of `0.4.20-alpha`, KBC ships a full server-driven drawing surface.
Write an ordinary Compose `Canvas { ... }` with real draw commands
(shapes, paths, gradients, transforms, and text) and it renders natively
on device. The whole surface is **sandboxed**: there is no
`nativeCanvas` and no `android.graphics` escape hatch.

---

## A first Canvas

```kotlin
@KetoyComposable
fun PieChart() {
    Canvas(modifier = Modifier.size(160.dp)) {
        val radius = size.minDimension / 2f
        val mid = center

        drawArc(
            color = Color(0xFF6200EE),
            startAngle = 0f,
            sweepAngle = 270f,
            useCenter = false,
            style = Stroke(width = 24f, cap = StrokeCap.Round),
        )
        drawCircle(color = Color.White, radius = radius / 3f, center = mid)
    }
}
```

Everything inside the `Canvas` lambda runs against a sandboxed
`DrawScope`. Geometry reads (`size`, `center`), value types, and numeric
math all work.

---

## What's available

### Shapes

`drawRect`, `drawCircle`, `drawLine`, `drawArc`, `drawRoundRect`,
`drawOval`, and `drawPath`. Each accepts a `color` **or** a `brush`
(gradient) overload.

```kotlin
drawRect(color = Color.LightGray, size = size)
drawCircle(color = Color.Red, radius = 40f, center = center)
drawLine(color = Color.Black, start = Offset(0f, 0f), end = size.center())
drawRoundRect(color = Color.Blue, cornerRadius = CornerRadius(12f))
```

### Value types

`Offset(x, y)`, `Size(w, h)`, `CornerRadius(r)`,
`Stroke(width, cap, join, pathEffect)`, and `Color(0xAARRGGBB)`.

### Paths

Build a path, then draw it with a color or brush:

```kotlin
val triangle = Path().apply {
    moveTo(center.x, 0f)
    lineTo(size.width, size.height)
    lineTo(0f, size.height)
    close()
}
drawPath(triangle, brush = Brush.verticalGradient(listOf(Color.Cyan, Color.Blue)))
```

`moveTo`, `lineTo`, `cubicTo`, and `close` are supported inside
`Path().apply { ... }`.

### Gradients

`Brush.linearGradient(...)`, `verticalGradient`, `horizontalGradient`,
and `radialGradient`.

### Path effects

`PathEffect.dashPathEffect(...)` and `cornerPathEffect(...)`, passed
through `Stroke(pathEffect = ...)`.

### Transforms

`rotate(deg) { ... }`, `scale(...) { ... }`, `translate(...) { ... }`,
`inset(...) { ... }`, `clipRect { ... }`, and `clipPath(path) { ... }`.
Each one nests a draw block:

```kotlin
rotate(degrees = 45f) {
    drawRect(color = Color.Magenta, size = Size(80f, 80f))
}
```

### Geometry reads and math

`size.width`, `size.height`, `size.minDimension`, `size.maxDimension`,
`center.x`, `center.y`, plus `N.dp.toPx()`. `Float` / `Long` / `Double`
arithmetic (`size.height / 2f`, `radius * 0.8f`) works inside the draw
block.

---

## Text on a Canvas

Use the real `androidx.compose.ui.text.drawText` with a
`rememberTextMeasurer()`. This is idiomatic Compose, with no
Ketoy-specific import:

```kotlin
@KetoyComposable
fun LabeledCanvas() {
    val measurer = rememberTextMeasurer()
    Canvas(modifier = Modifier.size(200.dp)) {
        drawText(
            textMeasurer = measurer,
            text = "Hello",
            topLeft = Offset(16f, 16f),
        )
    }
}
```

---

## Putting it together

A donut gauge combining an arc track, a gradient progress arc, and a
centered label:

```kotlin
@KetoyComposable
fun Gauge(progress: Float) {
    val measurer = rememberTextMeasurer()
    Canvas(modifier = Modifier.size(180.dp)) {
        val stroke = Stroke(width = 20f, cap = StrokeCap.Round)

        // Track
        drawArc(
            color = Color(0xFFE0E0E0),
            startAngle = 135f,
            sweepAngle = 270f,
            useCenter = false,
            style = stroke,
        )
        // Progress
        drawArc(
            brush = Brush.sweepGradient(listOf(Color.Cyan, Color.Blue)),
            startAngle = 135f,
            sweepAngle = 270f * progress,
            useCenter = false,
            style = stroke,
        )
        drawText(
            textMeasurer = measurer,
            text = "${(progress * 100).toInt()}%",
            topLeft = Offset(center.x - 24f, center.y - 16f),
        )
    }
}
```

---

## Precautions

> **Sandboxed only.** There is no `drawContext.canvas.nativeCanvas` and
> no direct `android.graphics` access. Draw with the DrawScope surface
> above; anything outside it is a compile-time
> `DirectAndroidApiAccess` error.

> **Prefer draw-block math over captures.** Geometry reads and numeric
> math inside the `Canvas` lambda compile directly. For values computed
> outside the block, pass them in as composable parameters (like
> `progress` above) rather than relying on captured locals.

Next: [ViewModels, State & Business Logic](viewmodel.md)
