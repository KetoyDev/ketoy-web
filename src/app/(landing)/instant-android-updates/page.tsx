import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import styles from './landing.module.css'

export const metadata: Metadata = {
  title: 'Instant Android App Updates with Kotlin Runtime Execution | Ketoy',
  description:
    'Ship Android app updates instantly in 60 seconds without Play Store approval. Use Ketoy to deliver Kotlin business logic, Jetpack Compose UI, and bug fixes directly to users.',
  keywords: [
    'instant android updates',
    'android app updates',
    'android runtime',
    'kotlin runtime execution',
    'android ota updates',
    'instant bug fixes android',
    'android hot updates',
    'skip play store',
  ],
  openGraph: {
    title: 'Instant Android App Updates with Kotlin Runtime | Ketoy',
    description:
      'Ship Android updates in 60 seconds without Play Store delays using Ketoy\'s Kotlin runtime.',
    type: 'website',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Ship Instant Android Updates',
  description: 'Learn how to ship Android app updates instantly without Play Store review using Ketoy.',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Write Kotlin Code',
      description: 'Write your update as plain Kotlin with Jetpack Compose UI.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Build Bundle',
      description: 'Run ./gradlew ketoyBundle to compile Kotlin to .ktx bytecode.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Upload to Ketoy',
      description: 'Upload the bundle to Ketoy Cloud via CLI or dashboard.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Live in 60 Seconds',
      description: 'All devices fetch and execute the new bundle automatically—no Play Store review required.',
    },
  ],
}

export default function InstantUpdatesPage() {
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
          <h1 className={styles.heading}>Instant Android App Updates</h1>
          <p className={styles.subheading}>
            Ship Kotlin code, Compose UI, bug fixes, and new features to every Android device in 60 seconds. No Play Store delays. No binary releases.
          </p>
          <div className={styles.stats}>
            <div className={styles.stat}>
              <strong>60 seconds</strong>
              <span>to production</span>
            </div>
            <div className={styles.stat}>
              <strong>0 days</strong>
              <span>Play Store review</span>
            </div>
            <div className={styles.stat}>
              <strong>100%</strong>
              <span>device coverage</span>
            </div>
          </div>
        </section>

        {/* The Problem */}
        <section className={styles.section}>
          <h2>The Android Update Problem</h2>
          <div className={styles.timeline}>
            <div className={styles.timelineItem}>
              <span className={styles.day}>Day 1</span>
              <p>Developers discover critical bug in production</p>
            </div>
            <div className={styles.timelineItem}>
              <span className={styles.day}>Day 2-3</span>
              <p>Team builds fix, compiles APK, runs tests</p>
            </div>
            <div className={styles.timelineItem}>
              <span className={styles.day}>Day 4-7</span>
              <p>Waiting for Play Store review and approval</p>
            </div>
            <div className={styles.timelineItem}>
              <span className={styles.day}>Day 8+</span>
              <p>Users gradually download and install update</p>
            </div>
          </div>
          <p className={styles.timelineCaption}>
            Meanwhile, your users are seeing the bug, posting 1-star reviews, and churning to competitors.
          </p>
        </section>

        {/* The Solution */}
        <section className={styles.section}>
          <h2>Instant Updates with Ketoy</h2>
          <div className={styles.solutionFlow}>
            <div className={styles.flowStep}>
              <div className={styles.stepNumber}>1</div>
              <h3>Code in Kotlin</h3>
              <p>Write plain Kotlin with Jetpack Compose—no DSL, no schema.</p>
            </div>
            <div className={styles.flowArrow}>→</div>
            <div className={styles.flowStep}>
              <div className={styles.stepNumber}>2</div>
              <h3>Build & Bundle</h3>
              <p>Compile to .ktx bytecode with a single Gradle command.</p>
            </div>
            <div className={styles.flowArrow}>→</div>
            <div className={styles.flowStep}>
              <div className={styles.stepNumber}>3</div>
              <h3>Deploy</h3>
              <p>Upload to Ketoy Cloud (or self-host).</p>
            </div>
            <div className={styles.flowArrow}>→</div>
            <div className={styles.flowStep}>
              <div className={styles.stepNumber}>4</div>
              <h3>Live</h3>
              <p>Update reaches all users in ~60 seconds. Instant.</p>
            </div>
          </div>
        </section>

        {/* Why It Works */}
        <section className={styles.section}>
          <h2>Why Instant Updates Matter</h2>
          <div className={styles.benefitsGrid}>
            <div className={styles.benefit}>
              <h3>🐛 Critical Bug Fixes</h3>
              <p>
                Don't wait for Play Store review. Push a hotfix in minutes. Stop the bleeding on user retention and reviews.
              </p>
            </div>
            <div className={styles.benefit}>
              <h3>🎯 A/B Testing</h3>
              <p>
                Experiment with different UI/UX without Play Store deploys. Run tests for weeks, roll back in seconds if needed.
              </p>
            </div>
            <div className={styles.benefit}>
              <h3>🚀 Feature Rollouts</h3>
              <p>
                Launch features to 1% of users, monitor metrics, and gradually roll out to 100%. Reduce risk dramatically.
              </p>
            </div>
            <div className={styles.benefit}>
              <h3>💡 Dynamic Behavior</h3>
              <p>
                Update business logic, algorithms, and workflows without shipping binary updates. Respond to market changes instantly.
              </p>
            </div>
            <div className={styles.benefit}>
              <h3>📊 Real-Time Personalization</h3>
              <p>
                Push personalized experiences and UI layouts based on user segments, behavior, and analytics.
              </p>
            </div>
            <div className={styles.benefit}>
              <h3>🔧 Faster Iteration</h3>
              <p>
                Ship 10x faster than traditional mobile development. Validate ideas weekly, not monthly.
              </p>
            </div>
          </div>
        </section>

        {/* What You Can Update */}
        <section className={styles.section}>
          <h2>What Can You Ship with Ketoy?</h2>
          <div className={styles.capabilitiesGrid}>
            <div className={styles.capability}>
              <span className={styles.icon}>🎨</span>
              <h3>Jetpack Compose UI</h3>
              <p>Entire screens, layouts, animations, and themed interfaces.</p>
            </div>
            <div className={styles.capability}>
              <span className={styles.icon}>⚙️</span>
              <h3>Business Logic</h3>
              <p>Kotlin algorithms, workflows, and feature implementations.</p>
            </div>
            <div className={styles.capability}>
              <span className={styles.icon}>🔄</span>
              <h3>ViewModels</h3>
              <p>State management and lifecycle-aware components.</p>
            </div>
            <div className={styles.capability}>
              <span className={styles.icon}>🌊</span>
              <h3>Coroutines</h3>
              <p>Async operations, networking, and reactive streams.</p>
            </div>
            <div className={styles.capability}>
              <span className={styles.icon}>🔗</span>
              <h3>Navigation</h3>
              <p>Screen routing, deep linking, and navigation flows.</p>
            </div>
            <div className={styles.capability}>
              <span className={styles.icon}>📱</span>
              <h3>Native APIs</h3>
              <p>Hilt dependencies, Room databases, and platform APIs.</p>
            </div>
          </div>
        </section>

        {/* Real-World Examples */}
        <section className={styles.section}>
          <h2>Real-World Use Cases</h2>
          <div className={styles.useCaseExamples}>
            <div className={styles.useCase}>
              <h3>E-Commerce: Checkout Flow Fix</h3>
              <p>
                Payment processing bug discovered at 10 PM. Fix pushed live by 10:15 PM. Users don't even know there was a problem.
              </p>
            </div>
            <div className={styles.useCase}>
              <h3>Fintech: Compliance Update</h3>
              <p>
                New regulation requires UI change across the app. Update all users in minutes instead of waiting for Apple and Google reviews.
              </p>
            </div>
            <div className={styles.useCase}>
              <h3>Gaming: Event Launch</h3>
              <p>
                Push seasonal events and limited-time content without app store deploys. Enable live events that change daily.
              </p>
            </div>
            <div className={styles.useCase}>
              <h3>Social Media: Algorithm Rollout</h3>
              <p>
                Test new feed ranking algorithms with 5% of users, measure engagement, and scale to 100% if successful—all in days.
              </p>
            </div>
          </div>
        </section>

        {/* Technical Details */}
        <section className={styles.section}>
          <h2>How It Works Technically</h2>
          <div className={styles.techDetails}>
            <div className={styles.techCard}>
              <h3>Kotlin Bytecode Compilation</h3>
              <p>
                Ketoy compiles your Kotlin to a custom bytecode format (KBC) that's optimized for mobile. Same semantics as standard Kotlin but designed for constraints of Android devices.
              </p>
            </div>
            <div className={styles.techCard}>
              <h3>.ktx Bundle Format</h3>
              <p>
                Bundles are compressed (~10-15x smaller than raw Kotlin) and encrypted. Signature verification ensures authenticity and prevents tampering.
              </p>
            </div>
            <div className={styles.techCard}>
              <h3>Runtime Execution</h3>
              <p>
                Ketoy's on-device VM unpacks and executes bytecode with full access to Jetpack Compose, Coroutines, and native APIs.
              </p>
            </div>
            <div className={styles.techCard}>
              <h3>Host App Integration</h3>
              <p>
                Your main app (host) remains unchanged. Ketoy bundles run inside a container that shares Hilt dependency injection and Room databases.
              </p>
            </div>
          </div>
        </section>

        {/* Comparison with Alternatives */}
        <section className={styles.section}>
          <h2>Why Not Firebase Remote Config?</h2>
          <div className={styles.comparisonGrid}>
            <div className={styles.comparisonItem}>
              <strong>Firebase Remote Config</strong>
              <p>✅ Feature flags and A/B tests</p>
              <p>❌ No code execution</p>
              <p>❌ No UI changes</p>
              <p>❌ Limited to config JSON</p>
            </div>
            <div className={styles.comparisonItem}>
              <strong>Ketoy</strong>
              <p>✅ Feature flags and A/B tests</p>
              <p>✅ Full Kotlin code execution</p>
              <p>✅ Update entire Compose screens</p>
              <p>✅ No limitations—write any Kotlin</p>
            </div>
          </div>
        </section>

        {/* Performance */}
        <section className={styles.section}>
          <h2>Performance & Security</h2>
          <div className={styles.performanceGrid}>
            <div className={styles.perf}>
              <h3>⚡ Fast</h3>
              <p>Bytecode execution is efficient. Startup overhead is typically &lt;100ms.</p>
            </div>
            <div className={styles.perf}>
              <h3>🔒 Secure</h3>
              <p>End-to-end encryption, signature verification, and sandboxed execution.</p>
            </div>
            <div className={styles.perf}>
              <h3>📊 Observable</h3>
              <p>Built-in analytics and crash reporting. Know exactly how updates perform.</p>
            </div>
            <div className={styles.perf}>
              <h3>🎯 Reliable</h3>
              <p>Rollback mechanism ensures you can revert any update instantly.</p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className={styles.cta}>
          <h2>Ready to Ship Updates in 60 Seconds?</h2>
          <p>Join the Ketoy waitlist and be among the first Android teams to go live with instant updates.</p>
          <a href="/#waitlist" className={styles.ctaButton}>
            Join the Waitlist
          </a>
        </section>
      </main>
      <Footer />
    </>
  )
}
