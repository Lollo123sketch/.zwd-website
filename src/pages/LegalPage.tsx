import { PageHeader } from '../components/PageHeader';
import { useDocumentMeta } from '../hooks/useDocumentMeta';

const privacy = [
  [
    'What .zwd stores',
    'Guild configuration, moderation and ticket records, feature profiles, command usage and identifiers required to provide enabled functionality. The bot is designed not to store persistent production data in flat JSON files.',
  ],
  [
    'Why data is used',
    'Data is used only to operate requested server features, enforce permissions, diagnose failures and maintain abuse controls.',
  ],
  [
    'Your controls',
    'Use /mydata export to inspect linked personal data and /mydata delete to request removal where retention is not operationally or legally required. Guild administrators control server-specific configuration.',
  ],
  [
    'Security & retention',
    'Secrets are kept outside the client and source repository. Public errors use reference IDs instead of exposing stack traces. Retention should be kept to the minimum required by active modules.',
  ],
];

const terms = [
  [
    'Acceptable use',
    'Do not use .zwd to harass people, evade Discord enforcement, distribute harmful content, collect credentials or perform destructive actions disguised as jokes.',
  ],
  [
    'Administrator responsibility',
    'Server administrators remain responsible for configuring roles, channels, moderation thresholds and Discord permissions appropriately.',
  ],
  [
    'Service availability',
    '.zwd is provided without a guarantee of uninterrupted availability. Hosting limits, Discord outages and maintenance may temporarily affect the service.',
  ],
  [
    'Changes and support',
    'Features and these terms may evolve. Material operational updates are communicated through the official community when practical.',
  ],
];

export default function LegalPage({ kind }: { kind: 'privacy' | 'terms' }) {
  const isPrivacy = kind === 'privacy';
  const sections = isPrivacy ? privacy : terms;
  useDocumentMeta(isPrivacy ? 'Privacy' : 'Terms');
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title={isPrivacy ? 'Privacy, without the fog.' : 'Terms of use.'}
        description={
          isPrivacy
            ? 'A readable summary of how .zwd approaches data. This page should be reviewed before a public production launch.'
            : 'Rules for using .zwd responsibly. This page should receive a final owner/legal review before broad public launch.'
        }
      />
      <section className="shell legal-page">
        <div className="legal-meta">
          <span>Last updated</span>
          <strong>September 2026</strong>
          <p>
            Contact support through the official Discord community for privacy or service questions.
          </p>
        </div>
        <div className="legal-sections">
          {sections.map(([title, body], index) => (
            <article key={title}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h2>{title}</h2>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
