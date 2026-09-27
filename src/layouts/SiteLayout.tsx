import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Footer } from '../components/Footer';
import { Navbar } from '../components/Navbar';

export function SiteLayout() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return (
    <div className="site">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
