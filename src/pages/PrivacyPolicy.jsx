import React from 'react';
import Layout from '../components/Layout';
import useSEO from '../hooks/useSEO';
import './LegalPage.css';

export default function PrivacyPolicy() {
  useSEO({
    title: 'Privacy Policy — Ketoy',
    description: 'Privacy policy for the Ketoy Server-Driven UI framework and cloud platform.',
    path: '/privacy',
  })
  return (
    <Layout>
      <div className="legal-page">
        <h1>Privacy Policy</h1>
        <p className="legal-updated">Last updated: 01 March 2026</p>

        <h2>1. Introduction</h2>
        <p>
          Ketoy Studios ("Ketoy", "we", "us", or "our") respects your privacy and is committed to
          protecting your personal information. This Privacy Policy explains what information we collect,
          how we use and share it, how long we retain it, the choices you have, and how we protect it
          when you visit or use our website, SDK, Gradle plugin, cloud services, and related products
          (collectively, the "Service").
        </p>
        <p>
          By using the Service you accept the terms of this Privacy Policy. If you do not agree, please
          do not use the Service.
        </p>

        <h2>2. Scope and Roles</h2>
        <p>
          When acting as the provider of the Service to you (for example, when you create a Ketoy account),
          Ketoy Studios is the data controller and determines how and why your personal information is processed.
        </p>
        <p>
          When we process Customer Data (data that a Ketoy customer uploads, configures, or stores in their
          account — such as KDSL screens, JSON payloads, and UI configurations) on behalf of a customer, Ketoy
          Studios typically acts as a data processor and processes that Customer Data in accordance with the
          customer's instructions and any applicable data processing addendum.
        </p>

        <h2>3. Information We Collect</h2>
        <p>We collect information you provide directly, information we collect automatically, and information we obtain from third parties.</p>

        <h3>a) Information you provide</h3>
        <ul>
          <li><strong>Account &amp; profile:</strong> name, email, password (stored securely/hashed), profile photo, company/organization, and other profile fields.</li>
          <li><strong>Customer content:</strong> KDSL screens, JSON configurations, screen metadata, UI/presentation logic, files, documents, and any inputs you provide to features.</li>
          <li><strong>Communications:</strong> support requests, feedback, messages, and correspondence you send to us.</li>
          <li><strong>Payment &amp; billing (if applicable):</strong> billing name and address, invoice history; payment processing is handled by third-party processors (we do not store raw card numbers).</li>
          <li><strong>Optional fields:</strong> any optional profile fields or preferences you choose to provide.</li>
        </ul>

        <h3>b) Information collected automatically</h3>
        <ul>
          <li><strong>Usage and device data:</strong> IP address, browser/user agent, device type, operating system, pages visited, features used, timestamps, performance and error logs, and telemetry.</li>
          <li><strong>Cookies and similar identifiers:</strong> cookie identifiers, local storage identifiers, and other tracking identifiers.</li>
          <li><strong>Analytics &amp; performance metrics:</strong> aggregated or pseudonymized metrics used to improve the Service.</li>
          <li><strong>SDK telemetry:</strong> when you integrate the Ketoy Android SDK, anonymized usage data (e.g., screen render counts, error rates) may be collected to improve SDK performance. This can be disabled via the SDK configuration.</li>
        </ul>

        <h3>c) Information from third parties</h3>
        <ul>
          <li><strong>SSO/social:</strong> when you sign in with third-party providers (e.g. Google), we may receive profile information (name, email, profile picture) in accordance with their authorization.</li>
          <li><strong>Vendors &amp; partners:</strong> information from service providers, partners, or public sources where permitted.</li>
        </ul>

        <h2>4. How We Use Information</h2>
        <p>We use personal information to:</p>
        <ul>
          <li>Provide, operate, maintain and improve the Service (including the Ketoy SDK, Gradle plugin, and cloud delivery network).</li>
          <li>Authenticate and administer accounts and access control.</li>
          <li>Process payments, bill, and prevent fraud.</li>
          <li>Provide customer support and communicate about your account and the Service.</li>
          <li>Personalize user experience (UI preferences, settings).</li>
          <li>Analyze usage, perform product research, and develop features.</li>
          <li>Maintain security, detect and prevent abuse, and enforce our Terms of Service and policies.</li>
          <li>Comply with legal obligations and respond to lawful requests.</li>
        </ul>
        <p>We may use aggregated, de-identified data for business purposes; such data is not personal information.</p>

        <h2>5. Cookies &amp; Tracking</h2>
        <ul>
          <li>We use cookies and similar technologies to provide core functionality (e.g., session cookies), to remember preferences, and to measure and improve the Service.</li>
          <li>Where required by law or for marketing/analytics uses, we obtain consent and provide opt-outs.</li>
          <li>You can control cookie settings through your browser or device; blocking certain cookies may affect Service functionality.</li>
        </ul>

        <h2>6. Data Sharing &amp; Disclosure</h2>
        <p>We may share personal information in the following ways:</p>
        <ul>
          <li><strong>Service providers &amp; subprocessors:</strong> vendors that provide hosting, storage, analytics, payment processing, email delivery, security, and support. These parties are bound by confidentiality and use limitations (see Vendor List below).</li>
          <li><strong>Affiliates &amp; subsidiaries:</strong> where applicable and subject to this Privacy Policy.</li>
          <li><strong>Legal requirements:</strong> to comply with court orders, subpoenas, law enforcement requests, or other legal obligations.</li>
          <li><strong>Protect rights and safety:</strong> to prevent fraud, security incidents, or physical harm.</li>
          <li><strong>Business transactions:</strong> in connection with mergers, acquisitions, or asset sales (with notice where required).</li>
          <li><strong>Aggregated or de-identified data:</strong> may be shared without restriction.</li>
        </ul>
        <p>We do not sell personal information for money.</p>

        <h2>7. International Transfers &amp; Safeguards</h2>
        <p>
          Your information may be transferred to, stored in, and processed in countries other than your
          residence (including India). Where required by law, we implement appropriate safeguards such as
          standard contractual clauses, adequacy mechanisms, or other lawful transfer tools.
        </p>

        <h2>8. Data Retention</h2>
        <p>
          We retain personal data for as long as necessary to provide the Service, fulfill legal or
          contractual obligations, resolve disputes, and enforce our agreements. Where possible we delete
          or anonymize data when no longer needed. Backups or archived copies may persist for an
          additional limited period for operational or legal reasons.
        </p>

        <h2>9. Security</h2>
        <p>
          We implement reasonable administrative, technical, and physical safeguards (e.g., encryption in
          transit, access controls, logging) to protect personal information. However, no system is 100%
          secure. In the event of a security breach affecting personal data, we will respond in accordance
          with applicable laws and notify affected individuals and regulators where required.
        </p>
        <p>
          For details on how Ketoy signs and verifies SDK artifacts, visit our{' '}
          <a href="/security">Security page</a>.
        </p>

        <h2>10. Children's Privacy</h2>
        <p>
          The Service is not intended for individuals below the age allowed by applicable law (typically
          13 or 16 depending on jurisdiction). We do not knowingly collect personal information from children.
          If you believe Ketoy Studios has collected data from a child without consent, contact us and we
          will promptly delete it.
        </p>

        <h2>11. Ketoy Vendor List</h2>
        <ul>
          <li><strong>GitHub</strong> — USA — Code, bug reports, contributions</li>
          <li><strong>Discord</strong> — USA — Customer support</li>
          <li><strong>Cloudflare</strong> — USA — Cloud infrastructure for our Services</li>
          <li><strong>Google</strong> — USA — Cloud infrastructure for our Website &amp; Services</li>
          <li><strong>Mailchimp</strong> — USA — Email Delivery</li>
          <li><strong>Stripe</strong> — USA — Payment processing</li>
          <li><strong>Maven Central (Sonatype)</strong> — USA — SDK artifact distribution</li>
        </ul>

        <h2>12. Your Rights &amp; Choices</h2>
        <p>Depending on your jurisdiction, you may have the right to:</p>
        <ul>
          <li>Access or obtain a copy of personal data we hold about you.</li>
          <li>Correct or update inaccurate or incomplete data.</li>
          <li>Delete or request erasure of your personal data (subject to legal limits).</li>
          <li>Restrict or object to our processing of your personal data.</li>
          <li>Port your personal information to another provider (data portability).</li>
          <li>Withdraw consent where we rely on it.</li>
          <li>Opt out of marketing communications.</li>
        </ul>
        <p>
          To exercise any rights or make a request, contact:{' '}
          <a href="mailto:support@ketoy.dev">support@ketoy.dev</a>
        </p>

        <h2>13. Changes to this Policy</h2>
        <p>
          We may update this Privacy Policy. When we make material changes we will notify you (for example,
          by email or a prominent notice on the Site) and update the "Last updated" date. Your continued use
          of the Service after notice constitutes acceptance of the updated policy.
        </p>

        <h2>14. Contact Us</h2>
        <p>If you have any questions, requests, or complaints regarding this Privacy Policy or our data practices, you can:</p>
        <ul>
          <li>Contact us via our <a href="https://discord.gg/jAbcPPyksf" target="_blank" rel="noreferrer">Discord server</a></li>
          <li>Email us at <a href="mailto:support@ketoy.dev">support@ketoy.dev</a></li>
        </ul>
      </div>
    </Layout>
  );
}
