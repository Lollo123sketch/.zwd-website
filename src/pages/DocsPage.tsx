import { ChevronDown, ExternalLink, LifeBuoy, ShieldCheck, TerminalSquare } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { siteConfig } from '../config/site';
import { useDocumentMeta } from '../hooks/useDocumentMeta';

const articles = [
  {
    title: 'Get started',
    icon: TerminalSquare,
    body: 'Invite .zwd, grant only the permissions its enabled modules need, then run /setup. Guild configuration is stored in the database and survives restarts.',
  },
  {
    title: 'Permissions & command channels',
    icon: ShieldCheck,
    body: 'Discord permissions, role hierarchy and .zwd capability overrides are evaluated server-side. Use /permissions and /server commands to keep staff tools scoped.',
  },
  {
    title: 'Tickets and persistent panels',
    icon: LifeBuoy,
    body: 'Run /ticket setup before publishing a panel. Panel identifiers are saved so their buttons and selects can be restored after the bot reconnects.',
  },
];

export default function DocsPage() {
  useDocumentMeta('Documentation');
  return (
    <>
      <PageHeader
        eyebrow="Documentation"
        title="From first invite to daily operations."
        description="Concise guidance based on the current .zwd implementation. Detailed command options are available in the command index and Discord autocomplete."
      />
      <section className="shell docs-layout">
        <aside className="docs-nav">
          <strong>On this page</strong>
          {articles.map((article) => (
            <a key={article.title} href={`#${article.title.toLowerCase().replaceAll(' ', '-')}`}>
              {article.title}
            </a>
          ))}
          <a href="#faq">Common questions</a>
        </aside>
        <div className="docs-content">
          {articles.map((article, index) => (
            <article id={article.title.toLowerCase().replaceAll(' ', '-')} key={article.title}>
              <span>0{index + 1}</span>
              <article.icon />
              <h2>{article.title}</h2>
              <p>{article.body}</p>
            </article>
          ))}
          <section id="faq" className="faq-section">
            <p className="eyebrow">Common questions</p>
            <h2>Before you open a ticket.</h2>
            {[
              [
                'Does .zwd keep settings after a restart?',
                'Yes. Guild settings and persistent panel metadata are database-backed.',
              ],
              [
                'Can every server use different settings?',
                'Yes. Operational configuration is keyed by guild ID and remains isolated per server.',
              ],
              [
                'Does music search YouTube?',
                'No. The current compliant implementation plays direct public HTTPS audio streams and does not bypass third-party platform restrictions.',
              ],
              [
                'Why does the dashboard say Demo?',
                'Real changes require the separate OAuth/API service. Demo mode lets you inspect the interface without pretending to change Discord.',
              ],
            ].map(([question, answer]) => (
              <details key={question}>
                <summary>
                  {question}
                  <ChevronDown />
                </summary>
                <p>{answer}</p>
              </details>
            ))}
          </section>
          <div className="docs-support">
            <LifeBuoy />
            <div>
              <h3>Still stuck?</h3>
              <p>Bring the error ID and relevant console lines to the community support server.</p>
            </div>
            <a href={siteConfig.discordUrl} target="_blank" rel="noreferrer">
              Open Discord <ExternalLink />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
