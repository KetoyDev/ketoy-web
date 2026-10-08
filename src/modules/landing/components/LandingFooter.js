import Link from 'next/link';
import KetoyLogo from '@/components/KetoyLogo';
import BrandIcon from '@/components/BrandIcon';
import { SDK_VERSION_FULL } from '@/constants';
import { FOOTER, FOOTER_BLURB, GITHUB_URL, DISCORD_URL } from '../data';

function FooterLink({ link }) {
  if (link.href.startsWith('http')) return <a href={link.href}>{link.label}</a>;
  const prefetch = link.href.startsWith('/docs') ? { prefetch: false } : {};
  return <Link href={link.href} {...prefetch}>{link.label}</Link>;
}

export default function LandingFooter() {
  return (
    <footer className="kt-footer">
      <div className="kt-footer-top">
        <div className="kt-footer-brand">
          <Link className="kt-brand kt-brand--ink" href="/">
            <KetoyLogo size={28} />
            <span>Ketoy</span>
          </Link>
          <p>{FOOTER_BLURB}</p>
          <div className="kt-footer-social">
            <a href={GITHUB_URL} aria-label="GitHub"><BrandIcon name="github" size={18} /></a>
            <a href={DISCORD_URL} aria-label="Discord"><BrandIcon name="discord" size={18} /></a>
          </div>
        </div>
        {FOOTER.map((col) => (
          <div className="kt-footer-col" key={col.h}>
            <h4>{col.h}</h4>
            <ul>
              {col.links.map((l) => <li key={l.label}><FooterLink link={l} /></li>)}
            </ul>
          </div>
        ))}
      </div>
      <div className="kt-footer-bottom">
        <span>© 2026 Ketoy</span>
        <span className="kt-mono">dev.ketoy.vm · {SDK_VERSION_FULL}</span>
        <span className="kt-footer-made">
          <BrandIcon name="kotlin" size={13} /> Kotlin
          <BrandIcon name="compose" size={14} /> Compose
          <BrandIcon name="android" size={14} /> Android
        </span>
      </div>
    </footer>
  );
}
