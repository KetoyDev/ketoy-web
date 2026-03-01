import React from 'react';
import Layout from '../components/Layout';
import './LegalPage.css';

export default function TermsOfService() {
  return (
    <Layout>
      <div className="legal-page">
        <h1>Terms of Service</h1>
        <p className="legal-updated">Last updated: 01 March 2026</p>

        <h3>Agreement Acceptance</h3>
        <p className="legal-caps">
          THESE TERMS OF SERVICE ("TERMS") GOVERN YOUR USE OF KETOY PRODUCTS (WEBSITE,
          APPLICATIONS, SDKS, APIS, ETC.). BY ACCESSING, USING, SUBSCRIBING TO, PURCHASING, OR
          DOWNLOADING ANY OF KETOY'S PRODUCTS OR SERVICES (COLLECTIVELY, THE "SERVICE" OR
          "SERVICES"), YOU ACKNOWLEDGE THAT YOU HAVE READ, UNDERSTOOD, AND AGREE TO BE LEGALLY
          BOUND BY THESE TERMS OF SERVICE ("TERMS") ON BEHALF OF YOURSELF AND/OR THE
          ACCOUNT HOLDER (REFERRED TO HEREIN AS "YOU" OR "YOUR"). YOU AGREE THAT YOU WILL ENSURE
          ALL USERS WHO ACCESS OR USE THE SERVICE THROUGH YOUR ACCOUNT COMPLY WITH AND
          ARE BOUND BY THESE TERMS. THESE TERMS APPLY TO ALL USE OF THE SERVICE, WHETHER OR
          NOT YOU HAVE CREATED A REGISTERED ACCOUNT.
        </p>
        <p className="legal-caps">
          IF YOU ARE ENTERING INTO THIS AGREEMENT ON BEHALF OF A COMPANY, ORGANIZATION, OR
          OTHER LEGAL ENTITY, YOU REPRESENT AND WARRANT THAT YOU HAVE THE AUTHORITY TO
          BIND THAT ENTITY, ITS AFFILIATES, AND ALL USERS WHO ACCESS THE SERVICE THROUGH
          YOUR ACCOUNT TO THESE TERMS. IN SUCH CASES, REFERENCES TO "YOU" OR "YOUR" SHALL
          REFER TO THAT ENTITY AND ITS AUTHORIZED USERS.
        </p>
        <p className="legal-caps">
          IF YOU DO NOT HAVE SUCH AUTHORITY, OR IF YOU DO NOT AGREE WITH THESE TERMS, YOU
          MUST NOT ACCEPT THIS AGREEMENT AND MAY NOT ACCESS OR USE THE SERVICE.
        </p>
        <p>
          We may update these Terms periodically. If we make material changes, we will
          notify you (for example, via email or in-app notice) before they take effect.
          Continued use of the Service after changes become effective constitutes your
          acceptance of the revised Terms.
        </p>

        <h2>1. Eligibility and Account Registration</h2>
        <ul>
          <li>You must be at least 13 years old (or the minimum legal age in your jurisdiction) and capable of forming a binding contract.</li>
          <li>You agree to provide accurate, current, and complete information when creating an account and to keep it updated.</li>
          <li>You are solely responsible for maintaining the security of your account credentials and for all activity under your account.</li>
          <li>Accounts may not be shared, transferred, or used by multiple individuals without written permission from Ketoy Studios.</li>
          <li>Ketoy Studios reserves the right to suspend or terminate accounts that violate these Terms or applicable law.</li>
        </ul>

        <h2>2. License and Use of the Service</h2>
        <p>
          Subject to your compliance with these Terms, Ketoy Studios grants you a limited, non-exclusive,
          non-transferable, non-sublicensable license to access and use the Service for your personal or
          internal business purposes.
        </p>
        <p>
          You agree not to access or use the Service for any purpose other than that for which it is
          provided, or in any way that violates these Terms or applicable law.
        </p>
        <p>All rights not expressly granted to you are reserved by Ketoy Studios and its licensors.</p>
        <p>
          The Ketoy SDK is open source and licensed under the{' '}
          <a href="https://github.com/KetoyDev/ketoy/blob/main/LICENSE" target="_blank" rel="noreferrer">
            Apache 2.0 License
          </a>
          . Cloud services and proprietary features are governed by these Terms.
        </p>

        <h2>3. Acceptable Use</h2>
        <p>You agree not to, and not to permit others to:</p>
        <ul>
          <li>Use the Service for any unlawful, fraudulent, or harmful purpose.</li>
          <li>Upload or transmit viruses, malware, or other harmful code.</li>
          <li>Infringe or misappropriate others' intellectual property, privacy, or data rights.</li>
          <li>Interfere with or disrupt the integrity or performance of the Service.</li>
          <li>Reverse engineer, decompile, disassemble, or attempt to derive source code except as permitted by law or the Apache 2.0 License.</li>
          <li>Circumvent rate limits, authentication, or other access controls.</li>
          <li>Use automated systems (e.g., bots, scrapers) except as explicitly permitted.</li>
        </ul>
        <p>Ketoy Studios may suspend or terminate your access immediately for any violation of this Section.</p>

        <h2>4. Your Content and License to Ketoy</h2>
        <p>
          You retain ownership of any data, configurations, KDSL definitions, JSON payloads, or materials
          you upload or create through the Service ("Your Content").
        </p>
        <p>
          By submitting or making Your Content available through the Service, you grant Ketoy Studios a
          worldwide, non-exclusive, royalty-free license to host, store, reproduce, process, and display
          Your Content as necessary to operate, maintain, and improve the Service.
        </p>
        <p>
          You represent and warrant that you have the necessary rights to provide Your Content and that its
          use by Ketoy Studios does not violate any laws or third-party rights.
        </p>
        <p>
          You also grant Ketoy Studios a perpetual, irrevocable license to use feedback or suggestions you
          provide for product improvement or development, without obligation or compensation.
        </p>

        <h2>5. Fees and Payments (if applicable)</h2>
        <p>If you subscribe to a paid plan or feature:</p>
        <ul>
          <li>You agree to pay all applicable fees as described on our pricing page or invoices.</li>
          <li>Fees are non-refundable unless expressly stated otherwise.</li>
          <li>Ketoy Studios may change pricing with reasonable notice.</li>
          <li>Failure to pay may result in suspension or termination of your account.</li>
        </ul>
        <p>
          Payments may be processed by third-party providers (e.g., Stripe) and are subject to their
          terms and privacy policies.
        </p>

        <h2>6. Suspension and Termination</h2>
        <p>You may terminate your account at any time through your account settings.</p>
        <p>Ketoy Studios may suspend or terminate your access if:</p>
        <ul>
          <li>You breach these Terms or applicable law;</li>
          <li>Your use causes security, performance, or legal risks; or</li>
          <li>Required by law or regulatory order.</li>
        </ul>
        <p>Upon termination:</p>
        <ul>
          <li>Your license and right to use the Service end immediately.</li>
          <li>Ketoy Studios may delete Your Content after a reasonable retention period.</li>
          <li>Sections regarding ownership, confidentiality, disclaimers, limitation of liability, and indemnification will survive termination.</li>
        </ul>

        <h2>7. Data, Privacy, and Security</h2>
        <p>
          Your use of the Service is also governed by our{' '}
          <a href="/privacy">Privacy Policy</a>.
        </p>
        <p>
          Ketoy Studios will implement and maintain reasonable administrative, technical, and physical
          safeguards to protect Your Content.
        </p>
        <p>
          You are responsible for securing your own systems and ensuring that Your Content complies with
          applicable privacy and data protection laws.
        </p>
        <p>
          You may not use the Service to process sensitive or regulated data (e.g., payment card or health
          information) unless explicitly permitted in writing by Ketoy Studios.
        </p>

        <h2>8. Disclaimers and Warranties</h2>
        <p className="legal-caps">
          THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE." KETOY STUDIOS MAKES NO WARRANTIES,
          EXPRESS OR IMPLIED, INCLUDING WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE,
          NON-INFRINGEMENT, OR ACCURACY.
        </p>
        <p>
          Ketoy Studios does not warrant that the Service will be uninterrupted, error-free, secure, or
          that data will be preserved without loss.
        </p>

        <h2>9. Limitation of Liability</h2>
        <p className="legal-caps">TO THE MAXIMUM EXTENT PERMITTED BY LAW:</p>
        <ul>
          <li className="legal-caps">
            KETOY STUDIOS AND ITS AFFILIATES, DIRECTORS, OFFICERS, AND EMPLOYEES WILL NOT BE LIABLE
            FOR INDIRECT, INCIDENTAL, CONSEQUENTIAL, SPECIAL, OR PUNITIVE DAMAGES, INCLUDING LOSS OF
            PROFITS, DATA, OR GOODWILL.
          </li>
          <li className="legal-caps">
            KETOY STUDIOS' TOTAL AGGREGATE LIABILITY UNDER THESE TERMS WILL NOT EXCEED THE GREATER OF
            (A) THE AMOUNT YOU PAID TO KETOY STUDIOS IN THE TWELVE (12) MONTHS BEFORE THE CLAIM, OR
            (B) USD $100.
          </li>
        </ul>
        <p>Some jurisdictions do not allow certain limitations, so some exclusions may not apply to you.</p>

        <h2>10. Indemnification</h2>
        <p>
          You agree to defend, indemnify, and hold harmless Ketoy Studios, its affiliates, and personnel
          from any claims, damages, losses, or expenses (including legal fees) arising out of:
        </p>
        <ul>
          <li>Your use or misuse of the Service;</li>
          <li>Your Content; or</li>
          <li>Your violation of these Terms or any applicable law.</li>
        </ul>

        <h2>11. Governing Law and Dispute Resolution</h2>
        <p>
          These Terms are governed by and construed under the laws of New Delhi, India, without regard
          to conflict-of-law principles.
        </p>
        <p>
          Any disputes arising under these Terms shall be resolved through binding arbitration in New
          Delhi, India, in English, under the Arbitration and Conciliation Act, 1996.
        </p>
        <p>
          Either party may seek injunctive or equitable relief in court to protect intellectual property
          or confidential information.
        </p>

        <h2>12. Refund Policy</h2>
        <p>
          All payments for Ketoy Studios subscriptions are non-refundable, unless required by law or we
          specifically say otherwise. You can cancel your subscription anytime through your account
          settings and cancellation takes effect at the end of your current billing cycle.
        </p>
        <p>Ketoy Studios may, at its sole discretion, issue refunds in limited cases such as:</p>
        <ul>
          <li>Duplicate payments or accidental overcharges.</li>
          <li>Technical issues that prevent access to the Service for an extended period (unrelated to user error).</li>
          <li>Unauthorized charges proven to be caused by Ketoy Studios' billing error.</li>
        </ul>
        <p>
          All refund requests must be submitted in writing to{' '}
          <a href="mailto:support@ketoy.dev">support@ketoy.dev</a> within 14 days of the original charge.
          Ketoy Studios reserves the right to deny refund requests that do not meet these conditions.
        </p>

        <h2>13. Changes to Terms</h2>
        <p>
          We may revise these Terms periodically. Updates will be posted on our website with a new
          "Last updated" date.
        </p>
        <p>
          If the changes are material, we will notify you reasonably in advance. Your continued use after
          the effective date constitutes acceptance of the revised Terms.
        </p>

        <h2>14. Miscellaneous</h2>
        <ul>
          <li><strong>Severability:</strong> If any part of these Terms is invalid or unenforceable, the rest remains in effect.</li>
          <li><strong>No Waiver:</strong> Failure to enforce any term is not a waiver of that term.</li>
          <li><strong>Assignment:</strong> You may not assign or transfer your rights or obligations without our prior written consent. We may assign these Terms to an affiliate or successor.</li>
          <li><strong>Entire Agreement:</strong> These Terms, along with the Privacy Policy and any supplemental agreements, constitute the entire agreement between you and Ketoy Studios.</li>
          <li><strong>Publicity:</strong> Ketoy Studios may identify you as a customer and use your name in our marketing materials or website, in accordance with your brand guidelines.</li>
        </ul>

        <h2>Contact</h2>
        <p>
          For questions about these Terms, contact us at{' '}
          <a href="mailto:support@ketoy.dev">support@ketoy.dev</a> or via our{' '}
          <a href="https://discord.gg/jAbcPPyksf" target="_blank" rel="noreferrer">Discord</a>.
        </p>
      </div>
    </Layout>
  );
}
