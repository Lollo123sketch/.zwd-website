import { ArrowUpRight } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { Reveal } from '../components/Reveal';
import { featureGroups } from '../data/features';
import { useDocumentMeta } from '../hooks/useDocumentMeta';

export default function FeaturesPage() {
  useDocumentMeta('Features');
  return (
    <>
      <PageHeader
        eyebrow="Capabilities"
        title="Systems that work together."
        description="Real modules already present in .zwd—built around one database, one permission layer, and one visual language."
      />
      <section className="shell feature-list">
        {featureGroups.map((feature, index) => (
          <Reveal key={feature.title}>
            <article className="feature-row">
              <span className="feature-index">{String(index + 1).padStart(2, '0')}</span>
              <div className={`feature-icon tone-${feature.tone}`}>
                <feature.icon />
              </div>
              <div>
                <h2>{feature.title}</h2>
                <p>{feature.description}</p>
              </div>
              <span className="feature-proof">{feature.proof}</span>
              <ArrowUpRight className="feature-arrow" />
            </article>
          </Reveal>
        ))}
      </section>
    </>
  );
}
