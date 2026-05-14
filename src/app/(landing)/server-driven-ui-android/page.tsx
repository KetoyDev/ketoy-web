import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import styles from './landing.module.css'

export const metadata: Metadata = {
  title: 'Server Driven UI for Android using Kotlin & Compose | Ketoy',
  description:
    'Build Server-Driven UI (SDUI) for Android with real Kotlin runtime execution and Jetpack Compose. No DSL, no JSON schema - just plain Kotlin.',
  keywords: [
    'server driven ui',
    'server driven ui android',
    'sdui',
    'sdui android',
    'dynamic ui android',
    'remote ui android',
    'jetpack compose runtime',
    'compose server driven ui',
  ],
  openGraph: {
    title: 'Server Driven UI for Android | Ketoy',
    description:
      'Build true Server-Driven UI for Android with Ketoy\'s Kotlin runtime and Jetpack Compose.',
    type: 'website',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'TechArticle',
  headline: 'Server-Driven UI (SDUI) for Android with Kotlin',
  description: 'Guide to building server-driven UIs for Android using Ketoy and Jetpack Compose.',
  articleBody: 'Server-Driven UI allows apps to fetch and render UI from the server dynamically, enabling instant updates without app store releases.',
}

export default function ServerDrivenUIPage() {
  return (
    <>
      <Nav />
      <main className={styles.container}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Hero Section */}
        <section className={styles.hero}>
          <h1 className={styles.heading}>Server-Driven UI for Android</h1>
          <p className={styles.subheading}>
            Build dynamic, remotely-controlled UIs with Ketoy. Ship Jetpack Compose screens from your server. No DSL. No schema. Just Kotlin.
          </p>
        </section>

        {/* What is SDUI */}
        <section className={styles.section}>
          <h2>What is Server-Driven UI?</h2>
          <p>
            Server-Driven UI (SDUI) is a design pattern where the server controls what appears on the app's screen. Instead of shipping UI code in the app binary, the server sends instructions on what to render. This enables:
          </p>
          <div className={styles.bulletPoints}>
            <div>✅ Instant UI changes without app updates</div>
            <div>✅ A/B testing different layouts with real users</div>
            <div>✅ Dynamic personalization per user segment</div>
            <div>✅ Server-driven experimentation and testing</div>
            <div>✅ Rapid iteration without Play Store approvals</div>
          </div>
        </section>

        {/* Traditional SDUI vs Ketoy */}
        <section className={styles.section}>
          <h2>Why Traditional SDUI Frameworks Fall Short</h2>
          <div className={styles.problemGrid}>
            <div className={styles.problem}>
              <h3>DSL Limitations</h3>
              <p>JSON-based SDUI frameworks require you to learn a new schema and define every detail in configuration.</p>
            </div>
            <div className={styles.problem}>
              <h3>No Real Logic</h3>
              <p>You can only push static UI trees. Any complex business logic must stay in the app.</p>
            </div>
            <div className={styles.problem}>
              <h3>Custom State Management</h3>
              <p>Managing state between server and client is difficult without ViewModels and Compose state.</p>
            </div>
            <div className={styles.problem}>
              <h3>No Compose Integration</h3>
              <p>Most SDUI frameworks don't support Jetpack Compose or use limiting wrapper approaches.</p>
            </div>
            <div className={styles.problem}>
              <h3>Performance Overhead</h3>
              <p>Parsing JSON, mapping to UI elements, and managing lifecycle is inefficient.</p>
            </div>
            <div className={styles.problem}>
              <h3>Developer Experience</h3>
              <p>Developers must switch between Kotlin and schema definitions, breaking productivity.</p>
            </div>
          </div>
        </section>

        {/* Ketoy's SDUI Solution */}
        <section className={styles.section}>
          <h2>Ketoy: True SDUI with Kotlin</h2>
          <div className={styles.solution}>
            <p>
              Ketoy delivers SDUI by letting you write plain Kotlin with Jetpack Compose, compile it to bytecode, and send that bytecode from your server. Your app receives and executes real Kotlin code—not a DSL.
            </p>
            <div className={styles.solutionBenefits}>
              <div className={styles.benefit}>
                <span className={styles.icon}>📝</span>
                <h3>Write Kotlin</h3>
                <p>Use the Kotlin you already know. No new DSL or schema to learn.</p>
              </div>
              <div className={styles.benefit}>
                <span className={styles.icon}>🎨</span>
                <h3>Full Compose</h3>
                <p>Access the entire Jetpack Compose ecosystem—animations, modifiers, layout systems.</p>
              </div>
              <div className={styles.benefit}>
                <span className={styles.icon}>⚙️</span>
                <h3>Real Logic</h3>
                <p>Coroutines, ViewModels, Flow, and all of Kotlin's capabilities work server-side.</p>
              </div>
              <div className={styles.benefit}>
                <span className={styles.icon}>🚀</span>
                <h3>Instant Deploy</h3>
                <p>Update the UI instantly. No app store, no binary updates.</p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className={styles.section}>
          <h2>How SDUI Works with Ketoy</h2>
          <div className={styles.workflow}>
            <div className={styles.step}>
              <div className={styles.stepNum}>1</div>
              <h3>Design on Server</h3>
              <p>Your server-side developers write Kotlin Compose UI screens.</p>
            </div>
            <div className={styles.arrow}>↓</div>
            <div className={styles.step}>
              <div className={styles.stepNum}>2</div>
              <h3>Compile to .ktx</h3>
              <p>Build Kotlin to Ketoy bytecode. Result is a compact, encrypted .ktx bundle.</p>
            </div>
            <div className={styles.arrow}>↓</div>
            <div className={styles.step}>
              <div className={styles.stepNum}>3</div>
              <h3>Deploy Bundles</h3>
              <p>Upload bundles to Ketoy Cloud or self-hosted server.</p>
            </div>
            <div className={styles.arrow}>↓</div>
            <div className={styles.step}>
              <div className={styles.stepNum}>4</div>
              <h3>App Fetches & Renders</h3>
              <p>Users' devices fetch the .ktx, Ketoy runtime executes it, Compose renders the UI.</p>
            </div>
            <div className={styles.arrow}>↓</div>
            <div className={styles.step}>
              <div className={styles.stepNum}>5</div>
              <h3>Instant Update</h3>
              <p>The new UI is live on all devices in ~60 seconds. No app update needed.</p>
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className={styles.section}>
          <h2>SDUI Use Cases with Ketoy</h2>
          <div className={styles.useCaseGrid}>
            <div className={styles.useCase}>
              <h3>🎯 A/B Testing</h3>
              <p>
                Server sends different Compose layouts to different user segments. Measure engagement, conversion, and retention. Scale the winner to 100%.
              </p>
            </div>
            <div className={styles.useCase}>
              <h3>🌍 Localization</h3>
              <p>
                Localize not just strings but entire UIs. Different markets get different layouts, information architecture, and data presentation.
              </p>
            </div>
            <div className={styles.useCase}>
              <h3>🔄 Feature Rollouts</h3>
              <p>
                Launch features to 1%, 5%, 10%, 50%, 100% of users. Monitor errors and metrics at each step.
              </p>
            </div>
            <div className={styles.useCase}>
              <h3>🎨 Theme & Branding</h3>
              <p>
                Change color schemes, typography, and branding globally without shipping app updates. Perfect for seasonal campaigns.
              </p>
            </div>
            <div className={styles.useCase}>
              <h3>💳 Dynamic Pricing</h3>
              <p>
                Show different pricing UIs, discount structures, and promotional content based on user segment and region.
              </p>
            </div>
            <div className={styles.useCase}>
              <h3>📱 Device-Specific UIs</h3>
              <p>
                Optimize for phone vs tablet, different screen sizes, and different capabilities (e.g., cameras, sensors).
              </p>
            </div>
          </div>
        </section>

        {/* Technical Comparison */}
        <section className={styles.section}>
          <h2>Ketoy vs Traditional SDUI Frameworks</h2>
          <div className={styles.tableWrapper}>
            <table className={styles.comparisonTable}>
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>Ketoy</th>
                  <th>JSON SDUI</th>
                  <th>Firebase Remote Config</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Language</strong></td>
                  <td>Plain Kotlin</td>
                  <td>JSON schema</td>
                  <td>JSON config</td>
                </tr>
                <tr>
                  <td><strong>Compose Support</strong></td>
                  <td>✅ Full</td>
                  <td>⚠️ Limited</td>
                  <td>❌ No</td>
                </tr>
                <tr>
                  <td><strong>Business Logic</strong></td>
                  <td>✅ Full Kotlin</td>
                  <td>❌ Server only</td>
                  <td>❌ No</td>
                </tr>
                <tr>
                  <td><strong>State Management</strong></td>
                  <td>✅ ViewModels, Flow</td>
                  <td>⚠️ Manual</td>
                  <td>❌ Basic flags only</td>
                </tr>
                <tr>
                  <td><strong>Animation Support</strong></td>
                  <td>✅ Full Compose animations</td>
                  <td>⚠️ Limited</td>
                  <td>❌ No</td>
                </tr>
                <tr>
                  <td><strong>Learning Curve</strong></td>
                  <td>✅ Familiar (Kotlin)</td>
                  <td>❌ New schema to learn</td>
                  <td>✅ Simple flags</td>
                </tr>
                <tr>
                  <td><strong>Flexibility</strong></td>
                  <td>✅ Unlimited</td>
                  <td>⚠️ Schema-limited</td>
                  <td>❌ Flags only</td>
                </tr>
                <tr>
                  <td><strong>Type Safety</strong></td>
                  <td>✅ Compile-time checking</td>
                  <td>❌ Runtime schema validation</td>
                  <td>⚠️ Partial</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Architecture Patterns */}
        <section className={styles.section}>
          <h2>SDUI Architecture Patterns with Ketoy</h2>
          <div className={styles.patternGrid}>
            <div className={styles.pattern}>
              <h3>1. Pure Server-Driven Screens</h3>
              <p>
                Entire screens are rendered from server-sent bundles. Perfect for content-heavy screens like feeds, details pages, and discovery.
              </p>
            </div>
            <div className={styles.pattern}>
              <h3>2. Hybrid Approach</h3>
              <p>
                Host app provides shell/chrome. Server sends content bundles. Best for consistent UI with dynamic content.
              </p>
            </div>
            <div className={styles.pattern}>
              <h3>3. Feature Modules</h3>
              <p>
                Deploy entire features as server-side bundles. Enable/disable features without app updates. Great for experiments.
              </p>
            </div>
            <div className={styles.pattern}>
              <h3>4. Dynamic Workflows</h3>
              <p>
                Multi-screen flows controlled by server. Onboarding, checkout, forms—all can be updated instantly.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className={styles.section}>
          <h2>SDUI FAQ</h2>
          <div className={styles.faqGrid}>
            <details className={styles.faqItem}>
              <summary>Is SDUI slower than native screens?</summary>
              <p>
                No. Ketoy's bytecode execution is efficient. Most SDUI updates feel instant. The compile-once, execute-many model is actually faster than runtime JSON parsing.
              </p>
            </details>
            <details className={styles.faqItem}>
              <summary>Can I access native APIs in SDUI bundles?</summary>
              <p>
                Yes, through Hilt dependency injection. Your server-side code can call Camera, GPS, Database, or any native API that's exposed in the host app.
              </p>
            </details>
            <details className={styles.faqItem}>
              <summary>What if my server goes down?</summary>
              <p>
                Apps cache bundles locally. If the server is unreachable, users still see the last cached version—no blank screens.
              </p>
            </details>
            <details className={styles.faqItem}>
              <summary>Is SDUI secure? Can the server inject malicious code?</summary>
              <p>
                Bundles are signed and encrypted. The server you control signs bundles, so only your server can push code. No MITM attacks possible.
              </p>
            </details>
            <details className={styles.faqItem}>
              <summary>Can I use SDUI for the entire app?</summary>
              <p>
                Yes, or use it selectively for parts of the app. Many teams use SDUI for content screens and native code for core features.
              </p>
            </details>
            <details className={styles.faqItem}>
              <summary>What's the performance overhead?</summary>
              <p>
                Negligible. Bytecode execution adds ~50-100ms startup time per bundle. Rendering is native Compose—same performance as hardcoded UI.
              </p>
            </details>
          </div>
        </section>

        {/* CTA */}
        <section className={styles.cta}>
          <h2>Ready to Build True Server-Driven UI?</h2>
          <p>Join Ketoy and ship dynamic UIs without Play Store delays.</p>
          <a href="/#waitlist" className={styles.ctaButton}>
            Join the Waitlist
          </a>
        </section>
      </main>
      <Footer />
    </>
  )
}
