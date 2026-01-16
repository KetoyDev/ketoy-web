import React from 'react';

export default function Docs() {
  return (
    <>
      <section className="section page-section">
        <div className="container">
          <div className="page-header">
            <h1>Documentation</h1>
            <p className="section-lead">Learn how to use K-DSL → JSON → Compose UI for server-driven interfaces</p>
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
                <p>Write type-safe UI code in K-DSL, convert to JSON with .toJson(), render as Compose UI.</p>
              </div>
              <div className="card">
                <h3>Direct JSON</h3>
                <p>Generate and version JSON layouts from your backend, CMS, or AI - render as native Compose UI.</p>
              </div>
              <div className="card">
                <h3>Hybrid</h3>
                <p>Prototype with K‑DSL, export to JSON, deploy to server, and render as Compose UI instantly.</p>
              </div>
            </div>
          </div>

          {/* Render example */}
          <div className="docs-section">
            <h2>The Flow: DSL → JSON → Compose UI</h2>
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

// Step 2: Convert to JSON
val json = screen.toJson()
// Send this JSON to your server

// Step 3: Receive JSON from server & render as Compose UI
@Composable
fun DynamicScreen() {
    // Fetch JSON from your API
    val serverJson = viewModel.fetchUILayout()
    
    // Render as native Jetpack Compose UI
    JSONStringToUI(serverJson)
}`}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
