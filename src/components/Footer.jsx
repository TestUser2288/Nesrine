import { nav, profile } from '../data/content';
import { CmdKey } from './icons';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div>
          <a className="brand" href="#top">
            <span className="brand__mark" aria-hidden="true">
              {profile.initial}
            </span>
            {profile.firstName}
          </a>
          <p className="footer__note" style={{ marginTop: 'var(--sp-8)' }}>
            © {new Date().getFullYear()} {profile.name} — {profile.role}
          </p>
        </div>

        <nav className="footer__links" aria-label="Navigation de pied de page">
          {nav.map((item) => (
            <a href={`#${item.id}`} key={item.id}>
              {item.label}
            </a>
          ))}
          <a href="#contact">Contact</a>
        </nav>

        <p className="footer__note" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
          <CmdKey />
          <kbd>K</kbd> pour naviguer
        </p>
      </div>
    </footer>
  );
}
