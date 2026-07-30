"use client";

import { useState } from 'react';
import Link from 'next/link';
import { SDK_VERSION_FULL } from '@/constants';
import SupportModal from '@/modules/home/components/SupportModal';

export default function Footer() {
  const [supportOpen, setSupportOpen] = useState(false);

  return (
    <>
      <footer className="site-footer">
        <div className="container">
          <div className="footer-grid">
            <div>
              <Link className="brand" href="/">
                <img className="brand-mark" src="/assets/ketoy-logo.svg" alt="" />
                <span className="brand-name">Ketoy</span>
              </Link>
              <p className="footer-brand-blurb">
                Kotlin-native over-the-air (OTA) updates for Android, server-driven UI (SDUI) included. Write Kotlin and Jetpack Compose, ship a signed bytecode bundle, render real Compose.
              </p>
            </div>
            <div>
              <h4>Product</h4>
              <ul>
                <li><Link href="/get-started">Get started</Link></li>
                <li><Link href="/features">Supported features</Link></li>
                <li><Link href="/architecture">Architecture</Link></li>
                <li><Link href="/updates">Release notes</Link></li>
              </ul>
            </div>
            <div>
              <h4>Docs</h4>
              <ul>
                <li><Link href="/docs" prefetch={false}>Documentation</Link></li>
                <li><Link href="/docs/reference/kbc-opcodes" prefetch={false}>KBC spec</Link></li>
                <li><Link href="/docs/reference/capability-registry" prefetch={false}>Capability registry</Link></li>
                <li><Link href="/docs/reference/ktx-bundle-format" prefetch={false}>Bundle format</Link></li>
              </ul>
            </div>
            <div>
              <h4>Resources</h4>
              <ul>
                <li><a href="https://central.sonatype.com/namespace/dev.ketoy.vm">Maven Central</a></li>
                <li><a href="https://github.com/KetoyDev/demos">Sample apps</a></li>
                <li><a href="#">Migration guide</a></li>
                <li><a href="/docs/faq">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4>Community</h4>
              <ul>
                <li><a href="https://github.com/KetoyDev">GitHub</a></li>
                <li><a href="https://discord.gg/jAbcPPyksf">Discord</a></li>
                <li><Link href="/issue">Report an issue</Link></li>
                <li>
                  <button
                    type="button"
                    className="footer-contact-btn"
                    onClick={() => setSupportOpen(true)}
                    aria-haspopup="dialog"
                    aria-expanded={supportOpen}
                  >
                    Contact
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer-meta">
            <span>
              © 2026 Ketoy.{' '}
              <code style={{ fontFamily: 'var(--font-mono)', fontSize: '12px' }}>
                dev.ketoy.vm
              </code>{' '}
              · v{SDK_VERSION_FULL}
            </span>
            <span>Made for Android · Kotlin 2.0 · Compose</span>
          </div>
        </div>
      </footer>
      <SupportModal open={supportOpen} onClose={() => setSupportOpen(false)} />
    </>
  );
}
