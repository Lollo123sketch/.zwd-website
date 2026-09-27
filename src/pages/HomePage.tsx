import { ArrowRight, Check, Command, Radio, ShieldCheck, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { ButtonLink } from '../components/ButtonLink';
import { DiscordPreview } from '../components/DiscordPreview';
import { Reveal } from '../components/Reveal';
import { siteConfig } from '../config/site';
import { featureGroups } from '../data/features';
import { topLevelCommandCount } from '../data/commands';
import { useDocumentMeta } from '../hooks/useDocumentMeta';

export default function HomePage() {
  useDocumentMeta(siteConfig.title);
  return (
    <>
      <section className="hero shell">
        <div className="hero-orbit orbit-one" />
        <div className="hero-orbit orbit-two" />
        <motion.div
          className="hero-copy"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75 }}
        >
          <div className="hero-kicker">
            <span className="live-dot" />
            Multi-server. Built to stay.
          </div>
          <h1>
            Run your server.
            <br />
            <span>Keep its edge.</span>
          </h1>
          <p>
            .zwd brings moderation, support, community systems and a little personality into one
            configurable Discord platform.
          </p>
          <div className="hero-actions">
            <ButtonLink external href={siteConfig.inviteUrl}>
              Add to Discord <ArrowRight size={17} />
            </ButtonLink>
            <ButtonLink href="/dashboard" variant="secondary">
              Open Dashboard
            </ButtonLink>
            <ButtonLink href="/commands" variant="ghost">
              View Commands
            </ButtonLink>
          </div>
          <div className="hero-proof">
            <span>
              <Check /> Per-server configuration
            </span>
            <span>
              <Check /> Persistent data
            </span>
            <span>
              <Check /> Permission-aware
            </span>
          </div>
        </motion.div>
        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.94, x: 30 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.85, delay: 0.12 }}
        >
          <div className="visual-label">
            <Radio /> live moderation preview
          </div>
          <DiscordPreview />
          <div className="floating-chip chip-one">
            <ShieldCheck /> intercepted
          </div>
          <div className="floating-chip chip-two">
            <Sparkles /> personality: on
          </div>
        </motion.div>
      </section>

      <section className="signal-strip">
        <div className="shell signal-grid">
          <div>
            <strong>{topLevelCommandCount}</strong>
            <span>top-level command groups</span>
          </div>
          <div>
            <strong>Per guild</strong>
            <span>isolated settings and data</span>
          </div>
          <div>
            <strong>Persistent</strong>
            <span>panels survive restarts</span>
          </div>
          <div>
            <strong>24/7 ready</strong>
            <span>health checks and graceful startup</span>
          </div>
        </div>
      </section>

      <section className="section shell" id="features">
        <Reveal className="section-heading">
          <p className="eyebrow">Operational range</p>
          <h2>One bot. No patchwork.</h2>
          <p>Every module belongs to the same permission, logging and configuration system.</p>
        </Reveal>
        <div className="feature-grid">
          {featureGroups.map((feature, index) => (
            <Reveal key={feature.title} delay={(index % 3) * 0.06}>
              <article className={`feature-card tone-${feature.tone}`}>
                <feature.icon />
                <div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                  <span>{feature.proof}</span>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal className="center-action">
          <ButtonLink href="/features" variant="secondary">
            Explore every module <ArrowRight size={16} />
          </ButtonLink>
        </Reveal>
      </section>

      <section className="section shell workflow-section">
        <Reveal>
          <div className="workflow-copy">
            <p className="eyebrow">Designed as a platform</p>
            <h2>Configuration that stays where it belongs.</h2>
            <p>
              Guild settings, moderation data, tickets, XP and economy records remain isolated.
              Admins see only what their Discord permissions allow.
            </p>
            <ul>
              <li>
                <span>01</span> Invite .zwd
              </li>
              <li>
                <span>02</span> Run the guided setup
              </li>
              <li>
                <span>03</span> Enable only the modules you need
              </li>
            </ul>
          </div>
        </Reveal>
        <Reveal delay={0.12}>
          <div className="settings-schematic">
            <div className="schematic-head">
              <Command /> guild://nightshift/config
            </div>
            {['AutoMod', 'Tickets', 'Logging', 'Music'].map((item, i) => (
              <div className="schematic-row" key={item}>
                <span>{item}</span>
                <i>
                  <b style={{ width: `${88 - i * 9}%` }} />
                </i>
                <em>enabled</em>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="section shell community-cta">
        <Reveal>
          <div>
            <p className="eyebrow">Build with us</p>
            <h2>The control room is open.</h2>
            <p>Get setup help, follow updates and shape what .zwd becomes next.</p>
          </div>
          <div className="community-actions">
            <ButtonLink external href={siteConfig.discordUrl}>
              Join Discord
            </ButtonLink>
            <ButtonLink external href={siteConfig.inviteUrl} variant="secondary">
              Add .zwd
            </ButtonLink>
          </div>
        </Reveal>
      </section>
    </>
  );
}
