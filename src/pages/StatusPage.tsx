import { Activity, Database, Globe2, Radio } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { useDocumentMeta } from '../hooks/useDocumentMeta';

export default function StatusPage() {
  useDocumentMeta('Status');
  return (
    <>
      <PageHeader
        eyebrow="System status"
        title="No made-up uptime."
        description="Live statistics require a connected production API. Until then, this page reports integration readiness without pretending to monitor services."
      />
      <section className="shell status-page">
        <div className="status-banner">
          <Radio />
          <div>
            <strong>Live telemetry not connected</strong>
            <p>
              Set VITE_API_URL and deploy the authenticated status endpoint to publish real health
              data.
            </p>
          </div>
          <span>API pending</span>
        </div>
        <div className="status-grid">
          {[
            [Globe2, 'Public website', 'Static build ready'],
            [Database, 'Dashboard API', 'Not connected'],
            [Activity, 'Discord gateway', 'Available inside bot health command'],
          ].map(([Icon, name, state]) => (
            <article key={String(name)}>
              <Icon />
              <div>
                <h2>{String(name)}</h2>
                <p>{String(state)}</p>
              </div>
              <span className={state === 'Static build ready' ? 'ready' : ''}>
                {state === 'Static build ready' ? 'ready' : 'pending'}
              </span>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
