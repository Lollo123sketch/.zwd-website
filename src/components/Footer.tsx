import { Link } from 'react-router-dom';
import { siteConfig } from '../config/site';
import { Brand } from './Brand';

const groups = [
  {
    title: 'Product',
    links: [
      ['Commands', '/commands'],
      ['Features', '/features'],
      ['Dashboard', '/dashboard'],
      ['Invite', siteConfig.inviteUrl],
    ],
  },
  {
    title: 'Resources',
    links: [
      ['Documentation', '/docs'],
      ['Support', siteConfig.discordUrl],
      ['Status', '/status'],
    ],
  },
  {
    title: 'Community',
    links: [
      ['Discord', siteConfig.discordUrl],
      ['Developers', '/developers'],
    ],
  },
  {
    title: 'Legal',
    links: [
      ['Privacy', '/privacy'],
      ['Terms', '/terms'],
    ],
  },
] as const;

export function Footer() {
  return (
    <footer className="footer">
      <div className="shell footer-grid">
        <div className="footer-intro">
          <Brand />
          <p>Server operations with a sharper point of view.</p>
          <span>© {new Date().getFullYear()} .zwd</span>
        </div>
        {groups.map((group) => (
          <div key={group.title} className="footer-group">
            <strong>{group.title}</strong>
            {group.links.map(([label, href]) =>
              href.startsWith('http') ? (
                <a key={label} href={href} target="_blank" rel="noreferrer">
                  {label}
                </a>
              ) : (
                <Link key={label} to={href}>
                  {label}
                </Link>
              ),
            )}
          </div>
        ))}
      </div>
    </footer>
  );
}
