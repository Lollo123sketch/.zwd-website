import { AnimatePresence, motion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { siteConfig } from '../config/site';
import { Brand } from './Brand';

const links = [
  ['Home', '/'],
  ['Commands', '/commands'],
  ['Features', '/features'],
  ['Developers', '/developers'],
  ['Docs', '/docs'],
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <nav className="shell nav-inner" aria-label="Main navigation">
        <Brand />
        <div className="nav-links">
          {links.map(([label, href]) => (
            <NavLink key={href} to={href} className={({ isActive }) => (isActive ? 'active' : '')}>
              {label}
            </NavLink>
          ))}
        </div>
        <div className="nav-actions">
          <a href={siteConfig.discordUrl} target="_blank" rel="noreferrer">
            Join Discord
          </a>
          <Link className="login-link" to="/dashboard">
            Login
          </Link>
          <a
            className="button button-primary button-small"
            href={siteConfig.inviteUrl}
            target="_blank"
            rel="noreferrer"
          >
            Add to Discord
          </a>
        </div>
        <button
          className="menu-button"
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? <X /> : <Menu />}
        </button>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            {links.map(([label, href]) => (
              <NavLink key={href} to={href} onClick={() => setOpen(false)}>
                {label}
              </NavLink>
            ))}
            <NavLink to="/dashboard" onClick={() => setOpen(false)}>
              Dashboard
            </NavLink>
            <a href={siteConfig.discordUrl} target="_blank" rel="noreferrer">
              Join Discord
            </a>
            <a href={siteConfig.inviteUrl} target="_blank" rel="noreferrer">
              Add to Discord
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
