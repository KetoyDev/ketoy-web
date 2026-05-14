import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import styles from './landing.module.css'

export const metadata: Metadata = {
  title: 'CodePush Alternative for Native Android Apps | Ketoy',
  description:
    'Ketoy is the native Android CodePush alternative with full Kotlin support, Jetpack Compose integration, and instant OTA updates without Play Store delays.',
  keywords: [
    'codepush alternative',
    'native android codepush',
    'android hotfix system',
    'android ota updates',
    'instant android updates',
    'kotlin runtime',
  ],
  openGraph: {
    title: 'CodePush Alternative for Native Android Apps | Ketoy',
    description:
      'Ketoy is the native Android CodePush alternative with full Kotlin support, Jetpack Compose integration, and instant OTA updates without Play Store delays.',
    type: 'website',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ComparisonChart',
  name: 'Ketoy vs CodePush',
  description: 'Comparison of Ketoy (native Android runtime) vs CodePush (React Native)',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Ketoy',
      description: 'Native Kotlin runtime for Android with Jetpack Compose support',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'CodePush',
      description: 'JavaScript update service for React Native',
    },
  ],
}

export default function CodePushAlternativePage() {
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
          <h1 className={styles.heading}>CodePush Alternative for Native Android</h1>
          <p className={styles.subheading}>
            Ketoy is the native Kotlin runtime solution for instant Android app updates—what CodePush is to React Native, Ketoy is to Android.
          </p>
        </section>

        {/* Problem Section */}
        <section className={styles.section}>
          <h2>Why React Native CodePush Doesn't Work for Native Android</h2>
          <div className={styles.problemGrid}>
            <div className={styles.card}>
              <h3>JavaScript vs Kotlin</h3>
              <p>CodePush works for React Native's JavaScript layer, but native Android apps need a Kotlin runtime—not a JavaScript bridge.</p>
            </div>
            <div className={styles.card}>
              <h3>Play Store Approval Delays</h3>
              <p>Without a CodePush alternative, native Android developers must wait days for Play Store review for every update.</p>
            </div>
            <div className={styles.card}>
              <h3>Firebase Remote Config Limitations</h3>
              <p>Firebase Remote Config only handles feature flags and A/B testing—it can't ship new UI or business logic changes.</p>
            </div>
            <div className={styles.card}>
              <h3>Custom Solutions Are Expensive</h3>
              <p>Building your own OTA update system requires significant infrastructure and maintenance overhead.</p>
            </div>
          </div>
        </section>

        {/* Solution Section */}
        <section className={styles.section}>
          <h2>Ketoy: The Native Android OTA Solution</h2>
          <div className={styles.solutionGrid}>
            <div className={styles.feature}>
              <span className={styles.icon}>🚀</span>
              <h3>Instant Updates</h3>
              <p>Ship Kotlin code to production in 60 seconds without Play Store review.</p>
            </div>
            <div className={styles.feature}>
              <span className={styles.icon}>💻</span>
              <h3>Full Kotlin Runtime</h3>
              <p>Execute real Kotlin bytecode with Jetpack Compose, Coroutines, and ViewModels—not a restricted DSL.</p>
            </div>
            <div className={styles.feature}>
              <span className={styles.icon}>🎨</span>
              <h3>Compose UI Support</h3>
              <p>Update your entire UI layer dynamically with full Jetpack Compose rendering.</p>
            </div>
            <div className={styles.feature}>
              <span className={styles.icon}>🔄</span>
              <h3>Zero Migration</h3>
              <p>Works with existing Android projects. Hilt and Room stay in your host app.</p>
            </div>
            <div className={styles.feature}>
              <span className={styles.icon}>🛡️</span>
              <h3>Secure Delivery</h3>
              <p>End-to-end encrypted bundle delivery with signature verification.</p>
            </div>
            <div className={styles.feature}>
              <span className={styles.icon}>📊</span>
              <h3>Analytics Built-In</h3>
              <p>Track update success rates, crashes, and user impact metrics.</p>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className={styles.section}>
          <h2>Ketoy vs CodePush vs Firebase Remote Config</h2>
          <div className={styles.tableWrapper}>
            <table className={styles.comparisonTable}>
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>Ketoy</th>
                  <th>CodePush</th>
                  <th>Firebase Remote Config</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Platform</strong></td>
                  <td>Native Android (Kotlin)</td>
                  <td>React Native (JS)</td>
                  <td>Cross-platform (Config only)</td>
                </tr>
                <tr>
                  <td><strong>UI Updates</strong></td>
                  <td>✅ Full Jetpack Compose</td>
                  <td>✅ React Native</td>
                  <td>❌ No</td>
                </tr>
                <tr>
                  <td><strong>Business Logic</strong></td>
                  <td>✅ Full Kotlin Execution</td>
                  <td>✅ JavaScript</td>
                  <td>❌ No</td>
                </tr>
                <tr>
                  <td><strong>Coroutines Support</strong></td>
                  <td>✅ Yes</td>
                  <td>❌ No</td>
                  <td>❌ No</td>
                </tr>
                <tr>
                  <td><strong>Update Speed</strong></td>
                  <td>~60 seconds</td>
                  <td>~10-15 minutes</td>
                  <td>~15-30 seconds (config only)</td>
                </tr>
                <tr>
                  <td><strong>Play Store Approval</strong></td>
                  <td>❌ Not needed</td>
                  <td>❌ Not needed</td>
                  <td>❌ Not needed</td>
                </tr>
                <tr>
                  <td><strong>Code Execution</strong></td>
                  <td>✅ Bytecode VM</td>
                  <td>✅ JavaScript Engine</td>
                  <td>❌ N/A</td>
                </tr>
                <tr>
                  <td><strong>Native Integration</strong></td>
                  <td>✅ Full (via Hilt/Room)</td>
                  <td>❌ Bridge required</td>
                  <td>✅ Basic</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Use Cases */}
        <section className={styles.section}>
          <h2>When to Use Ketoy Instead of CodePush</h2>
          <div className={styles.useCaseGrid}>
            <div className={styles.useCase}>
              <h3>🐛 Instant Bug Fixes</h3>
              <p>Ship critical bug fixes to production immediately without waiting for Play Store review cycles.</p>
            </div>
            <div className={styles.useCase}>
              <h3>🎯 A/B Testing</h3>
              <p>Run server-driven experiments with full Kotlin logic—not just feature flags.</p>
            </div>
            <div className={styles.useCase}>
              <h3>🚀 Feature Rollouts</h3>
              <p>Deploy new features to a percentage of users, monitor metrics, and rollout safely.</p>
            </div>
            <div className={styles.useCase}>
              <h3>🔧 Hotpatching</h3>
              <p>Apply patches and minor updates without requiring a binary release.</p>
            </div>
            <div className={styles.useCase}>
              <h3>💳 Dynamic UI</h3>
              <p>Push new Compose UI screens and layouts without rebuilding the APK.</p>
            </div>
            <div className={styles.useCase}>
              <h3>📱 Server-Driven Architecture</h3>
              <p>Build a true server-driven UI system with real Kotlin execution on device.</p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className={styles.section}>
          <h2>FAQ: Ketoy vs CodePush</h2>
          <div className={styles.faqGrid}>
            <details className={styles.faqItem}>
              <summary>Can I use Ketoy with existing Android projects?</summary>
              <p>
                Yes! Ketoy integrates seamlessly. Your existing Hilt modules and Room databases stay in the host app. Ketoy bundles only the code that changes.
              </p>
            </details>
            <details className={styles.faqItem}>
              <summary>Is Ketoy as fast as CodePush?</summary>
              <p>
                Ketoy updates propagate in ~60 seconds. CodePush updates take 10-15 minutes because they trigger a re-render and restart on every device. Ketoy's Kotlin bytecode execution is more efficient than JavaScript.
              </p>
            </details>
            <details className={styles.faqItem}>
              <summary>What's the difference between Ketoy and Custom OTA?</summary>
              <p>
                Building your own OTA system requires months of engineering, security reviews, and infrastructure. Ketoy gives you battle-tested infrastructure in days.
              </p>
            </details>
            <details className={styles.faqItem}>
              <summary>Does Ketoy require root access?</summary>
              <p>
                No. Ketoy is a standard Gradle plugin + runtime library. It works on unrooted Android devices exactly like any other app.
              </p>
            </details>
            <details className={styles.faqItem}>
              <summary>Can I use Jetpack Compose with Ketoy?</summary>
              <p>
                Yes, absolutely! Jetpack Compose is Ketoy's primary UI framework. You get the full Compose ecosystem—no DSL, no JSON schemas.
              </p>
            </details>
            <details className={styles.faqItem}>
              <summary>Is Ketoy production-ready?</summary>
              <p>
                Ketoy is in alpha with active field testing. It's production-ready for teams willing to participate in early access.
              </p>
            </details>
          </div>
        </section>

        {/* CTA */}
        <section className={styles.cta}>
          <h2>Ready to Ship Android Updates Instantly?</h2>
          <p>Join thousands of Android developers using Ketoy to bypass Play Store delays.</p>
          <a href="/#waitlist" className={styles.ctaButton}>
            Join the Waitlist
          </a>
        </section>
      </main>
      <Footer />
    </>
  )
}
