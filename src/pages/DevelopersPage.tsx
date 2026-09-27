import { Code2, MessageCircle, Terminal } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { Reveal } from '../components/Reveal';
import { siteConfig } from '../config/site';
import { useDocumentMeta } from '../hooks/useDocumentMeta';

export default function DevelopersPage() {
  useDocumentMeta('Developers');
  const developer = siteConfig.developer;
  return (
    <>
      <PageHeader
        eyebrow="The people behind .zwd"
        title="Meet the developer."
        description="A small project with an intentionally serious foundation—and room for the team to grow."
      />
      <section className="shell developer-stage">
        <Reveal>
          <article className="developer-card">
            <div className="developer-image-wrap">
              <img src={developer.avatar} alt="Avatar Discord di zwed" width="512" height="512" />
              <div className="developer-scan" />
            </div>
            <div className="developer-info">
              <div className="developer-badge">
                <Terminal /> Owner / Developer
              </div>
              <h2>{developer.name}</h2>
              <p>{developer.username}</p>
              <span>Building the systems, personality and operations behind .zwd.</span>
              <a href={siteConfig.discordUrl} target="_blank" rel="noreferrer">
                <MessageCircle /> Community Discord
              </a>
            </div>
          </article>
        </Reveal>
        <Reveal delay={0.12}>
          <aside className="developer-note">
            <Code2 />
            <p>
              Developer profiles live in one typed configuration object, so adding contributors
              later will not require rebuilding this layout.
            </p>
          </aside>
        </Reveal>
      </section>
    </>
  );
}
