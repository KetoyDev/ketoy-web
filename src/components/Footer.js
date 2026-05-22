import Link from 'next/link';
import { SDK_VERSION_FULL } from '@/constants';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <Link className="brand" href="/">
              <img className="brand-mark" src="/assets/ketoy-logo.svg" alt="" />
              <span className="brand-name">Ketoy</span>
            </Link>
            <p className="footer-brand-blurb">
              A server-driven execution runtime for Android. Write Kotlin, ship bytecode, render real Compose.
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
              <li><Link href="/docs">Documentation</Link></li>
              <li><Link href="/docs">KBC spec</Link></li>
              <li><Link href="/docs">Capability registry</Link></li>
              <li><Link href="/docs">Bundle format</Link></li>
            </ul>
          </div>
          <div>
            <h4>Resources</h4>
            <ul>
              <li><a href="#">Maven Central</a></li>
              <li><a href="#">Sample apps</a></li>
              <li><a href="#">Migration guide</a></li>
              <li><a href="#">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h4>Community</h4>
            <ul>
              <li><a href="#">GitHub</a></li>
              <li><a href="#">Discord</a></li>
              <li><Link href="/issue">Report an issue</Link></li>
              <li><a href="#">Contact</a></li>
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
  );
}
