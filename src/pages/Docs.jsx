import React from 'react';

export default function Docs() {
  return (
    <>
      <section className="section page-section">
        <div className="container">
          <div className="page-header">
            <h1>Documentation</h1>
            <p className="section-lead">Learn how to use K-DSL → .ktw wire format → Compose UI for server-driven interfaces — 10× smaller than JSON SDUI</p>
          </div>

          {/* Quick start */}
          <div className="docs-section">
            <h2>Quick Start</h2>
            <div className="card">
              <h3>Install in your Android app</h3>
              <pre className="code-block">
                <code>{`// build.gradle.kts

dependencies {
    implementation("com.developerstring:ketoy:1.0.0")
    implementation("org.jetbrains.kotlinx:kotlinx-serialization-json:1.6.0")
}`}</code>
              </pre>
            </div>
          </div>

          {/* 3 ways to build */}
          <div className="docs-section">
            <h2>3 ways to build with Ketoy</h2>
            <div className="grid grid-3">
              <div className="card">
                <h3>K‑DSL (recommended)</h3>
                <p>Write type-safe UI code in K-DSL, compile to <strong>.ktw wire format</strong> (10× smaller than JSON), render as native Compose UI.</p>
              </div>
              <div className="card">
                <h3>Direct Wire / JSON</h3>
                <p>Send pre-compiled <strong>.ktw payloads</strong> or raw JSON from your backend, CMS, or AI — the SDK auto-detects and renders as native Compose UI.</p>
              </div>
              <div className="card">
                <h3>Hybrid</h3>
                <p>Prototype with K‑DSL, export to <strong>.ktw wire files</strong>, deploy to server, and render as Compose UI instantly — without a Play Store update.</p>
              </div>
            </div>
          </div>

          {/* Render example */}
          <div className="docs-section">
            <h2>The Flow: DSL → .ktw Wire → Compose UI</h2>
            <div className="card">
              <pre className="code-block">
                <code>{`// Step 1: Write K-DSL code
val screen = KColumn {
  KText(
    text = "Dynamic UI from server!",
    color = "#FF2196F3"
  )
  KButton(
    containerColor = "#FF4CAF50"
  ) {
    KText(text = "Click Me")
  }
}

// Step 2: Export to .ktw wire format (via ketoyExport task)
// K-DSL → key aliasing → type IDs → MessagePack → Gzip → .ktw
// Result: ~10× smaller than the equivalent JSON payload
// Run: ./gradlew ketoyExport

// Step 3: Receive .ktw bytes from server & render as Compose UI
@Composable
fun DynamicScreen() {
    // Fetch .ktw wire bytes from your API (or use KetoyCloudScreen)
    val wireBytes = viewModel.fetchUIWirePayload()

    // SDK auto-detects wire vs JSON — just pass bytes or string
    JSONStringToUI(wireBytes)
}`}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
