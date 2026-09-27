import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { SiteLayout } from './layouts/SiteLayout';

const HomePage = lazy(() => import('./pages/HomePage'));
const CommandsPage = lazy(() => import('./pages/CommandsPage'));
const FeaturesPage = lazy(() => import('./pages/FeaturesPage'));
const DevelopersPage = lazy(() => import('./pages/DevelopersPage'));
const DocsPage = lazy(() => import('./pages/DocsPage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const ServerDashboardPage = lazy(() => import('./pages/ServerDashboardPage'));
const LegalPage = lazy(() => import('./pages/LegalPage'));
const StatusPage = lazy(() => import('./pages/StatusPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

export default function App() {
  return (
    <Suspense
      fallback={
        <div className="page-loader">
          <span />
          <p>Opening .zwd</p>
        </div>
      }
    >
      <Routes>
        <Route element={<SiteLayout />}>
          <Route index element={<HomePage />} />
          <Route path="commands" element={<CommandsPage />} />
          <Route path="features" element={<FeaturesPage />} />
          <Route path="developers" element={<DevelopersPage />} />
          <Route path="docs" element={<DocsPage />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="dashboard/:guildId" element={<ServerDashboardPage />} />
          <Route path="privacy" element={<LegalPage kind="privacy" />} />
          <Route path="terms" element={<LegalPage kind="terms" />} />
          <Route path="status" element={<StatusPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
