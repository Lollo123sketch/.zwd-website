import { ArrowLeft, RadioTower } from 'lucide-react';
import { ButtonLink } from '../components/ButtonLink';
import { useDocumentMeta } from '../hooks/useDocumentMeta';

export default function NotFoundPage() {
  useDocumentMeta('404');
  return (
    <section className="not-found shell">
      <div className="error-code">
        <span>4</span>
        <RadioTower />
        <span>4</span>
      </div>
      <p className="eyebrow">Signal lost</p>
      <h1>This channel does not exist.</h1>
      <p>The route may have moved, or someone purged it before you arrived.</p>
      <ButtonLink href="/">
        <ArrowLeft /> Return home
      </ButtonLink>
    </section>
  );
}
