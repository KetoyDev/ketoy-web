import React from 'react';

export default function Docs() {
  return (
    <>
      <section className="section page-section">
        <div className="container">
          <div className="page-header">
            <h1>Documentation</h1>
            <p className="section-lead">Everything you need to get started with Ketoy</p>
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
                <p>Design screens in Kotlin using familiar Compose‑style APIs.</p>
              </div>
              <div className="card">
                <h3>Direct JSON</h3>
                <p>Generate and version JSON layouts from your backend or CMS.</p>
              </div>
              <div className="card">
                <h3>Hybrid</h3>
                <p>Prototype with K‑DSL, export to JSON, and push to production instantly.</p>
              </div>
            </div>
          </div>

          {/* Render example */}
          <div className="docs-section">
            <h2>Render a server‑driven screen</h2>
            <div className="card">
              <pre className="code-block">
                <code>{`// 1. Receive JSON from your server
val serverJson = """
{
  "type": "Column",
  "children": [
    {
      "type": "Text",
      "props": {
        "text": "Dynamic UI from server!",
        "color": "#FF2196F3"
      }
    },
    {
      "type": "Button",
      "props": { "containerColor": "#FF4CAF50" }
    }
  ]
}
""".trimIndent()

// 2. Render it anywhere in Compose
@Composable
fun DynamicScreen() {
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
