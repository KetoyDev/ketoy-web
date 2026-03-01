import React from 'react';
import Layout from '../components/Layout';
import './LegalPage.css';

export default function Security() {
  return (
    <Layout>
      <div className="legal-page">
        <h1>Security</h1>
        <p className="legal-updated">
          The Ketoy team takes security seriously. This page describes how we publish artifacts
          securely and how to report vulnerabilities.
        </p>

        {/* ── Artifact Verification ── */}
        <h2>Artifact Verification</h2>
        <p>
          All Ketoy releases are published to Maven Central and signed with a GPG key so you can
          verify their authenticity. You can browse and verify the published artifacts at:
        </p>
        <a
          href="https://central.sonatype.com/search?q=dev.ketoy"
          target="_blank"
          rel="noreferrer"
          className="security-maven-link"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
            <polyline points="15 3 21 3 21 9"/>
            <line x1="10" y1="14" x2="21" y2="3"/>
          </svg>
          Maven Central — dev.ketoy
        </a>

        {/* ── Public Signing Key ── */}
        <h2>Public Signing Key</h2>
        <p>
          Ketoy SDK artifacts are signed with the following GPG key. You can use it to verify
          that downloads have not been tampered with.
        </p>

        <div className="security-key-box">
          <div className="security-key-row">
            <span className="security-key-label">Key ID</span>
            <span className="security-key-value">1ACC8665</span>
          </div>
          <div className="security-key-row">
            <span className="security-key-label">Full Fingerprint</span>
            <span className="security-key-value">B2DC 6C74 B394 1F63 CCB2 6F64 C084 1494 1ACC 8665</span>
          </div>

          <h3 style={{ marginTop: 24 }}>Key Details</h3>
          <table className="security-key-table">
            <thead>
              <tr>
                <th>Property</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Type</td>
                <td>Ed25519 (Elliptic Curve)</td>
              </tr>
              <tr>
                <td>Key Size</td>
                <td>256-bit</td>
              </tr>
              <tr>
                <td>Security Level</td>
                <td>Equivalent to RSA 3072-bit</td>
              </tr>
              <tr>
                <td>Subkey</td>
                <td>cv25519 (Curve25519, 256-bit) for encryption</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="security-info-callout">
          <strong>Why Ed25519?</strong> Ed25519 is a modern elliptic curve algorithm that is more
          secure and efficient than RSA. It is fully supported by Maven Central and GPG verification
          tools. The 256-bit Ed25519 key provides the same security level as a 3072-bit RSA key but
          with better performance and smaller signatures.
        </div>

        {/* ── Verifying Artifacts ── */}
        <h2>Verifying Artifacts</h2>
        <p>
          To verify a downloaded artifact, you can use GPG with the public key above. First import
          the key, then verify the signature file that accompanies each Maven Central release:
        </p>
        <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.88rem', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, padding: '14px 18px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.9 }}>
          # Receive public key from key server<br />
          gpg --recv-keys 1ACC8665<br />
          <br />
          # Verify a downloaded .aar or .jar file<br />
          gpg --verify ketoy-sdk-&lt;version&gt;.aar.asc ketoy-sdk-&lt;version&gt;.aar
        </p>
        <p>
          Maven Central automatically verifies signatures during publishing. All artifacts listed on{' '}
          <a href="https://central.sonatype.com/search?q=dev.ketoy" target="_blank" rel="noreferrer">
            central.sonatype.com/artifact/dev.ketoy
          </a>{' '}
          have been verified and signed with the key above.
        </p>

        {/* ── Reporting Vulnerabilities ── */}
        <h2>Reporting Vulnerabilities</h2>
        <p>
          If you discover a security vulnerability in Ketoy, please report it responsibly. Do not
          open a public GitHub issue for security vulnerabilities.
        </p>
        <p>Instead, please send an email to:</p>
        <p>
          <a href="mailto:aditya@ketoy.dev" className="security-email-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
            aditya@ketoy.dev
          </a>
        </p>
        <p>
          We will acknowledge your report within 48 hours and work with you to understand and
          address the issue before any public disclosure.
        </p>

        {/* ── Secure Release Process ── */}
        <h2>Secure Release Process</h2>
        <p>Ketoy follows a secure release process for all SDK and Gradle plugin artifacts:</p>
        <ul>
          <li>All releases are built in a controlled CI environment.</li>
          <li>Artifacts are signed before publication with the GPG key listed above.</li>
          <li>Releases are published exclusively through Maven Central (Sonatype) — no third-party mirrors.</li>
          <li>Each release is tagged in the{' '}
            <a href="https://github.com/KetoyDev/ketoy/releases" target="_blank" rel="noreferrer">
              GitHub Releases
            </a>{' '}
            page with a corresponding changelog.
          </li>
          <li>We recommend pinning to a specific version in your Gradle configuration and updating intentionally.</li>
        </ul>

        {/* ── Related Links ── */}
        <h2>Related Links</h2>
        <ul>
          <li><a href="https://central.sonatype.com/artifact/dev.ketoy/sdk" target="_blank" rel="noreferrer">Ketoy on Maven Central</a></li>
          <li><a href="https://github.com/KetoyDev/ketoy/releases" target="_blank" rel="noreferrer">Releases on GitHub</a></li>
          <li><a href="https://github.com/KetoyDev/ketoy/blob/main/CONTRIBUTING.md" target="_blank" rel="noreferrer">Contributing to Ketoy</a></li>
          <li><a href="/terms">Terms of Service</a></li>
          <li><a href="/privacy">Privacy Policy</a></li>
        </ul>
      </div>
    </Layout>
  );
}
