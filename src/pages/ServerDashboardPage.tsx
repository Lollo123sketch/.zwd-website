import {
  AlertCircle,
  Bot,
  ChevronLeft,
  CircleDollarSign,
  Gift,
  Headphones,
  LayoutDashboard,
  ListChecks,
  MessageSquareWarning,
  Music,
  Save,
  Shield,
  SlidersHorizontal,
  Sparkles,
  Ticket,
  Volume2,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { DiscordPreview } from '../components/DiscordPreview';
import { demoServers, initialDemoSettings } from '../data/demo';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { dashboardApi, isApiConfigured } from '../services/api';
import type { GuildSettings } from '../types';

const nav = [
  ['Overview', LayoutDashboard],
  ['AutoMod', Shield],
  ['Moderation', ListChecks],
  ['Word Filter', MessageSquareWarning],
  ['Mocking', Sparkles],
  ['Music', Music],
  ['Welcome', Bot],
  ['Logging', SlidersHorizontal],
  ['Levels', Gift],
  ['Economy', CircleDollarSign],
  ['Tickets', Ticket],
  ['Giveaways', Gift],
  ['Commands', Headphones],
  ['Permissions', Shield],
  ['Settings', SlidersHorizontal],
] as const;

export default function ServerDashboardPage() {
  const { guildId } = useParams();
  const demoServer = demoServers.find((item) => item.id === guildId);
  const live = isApiConfigured && Boolean(guildId) && !guildId?.startsWith('demo-');
  const server = demoServer ?? {
    id: guildId ?? '',
    name: 'Discord Server',
    initials: 'DS',
    installed: true,
    permission: 'Manage Server' as const,
    accent: '#9a82ff',
  };
  useDocumentMeta(`${server.name} Dashboard`);
  const [settings, setSettings] = useState<GuildSettings>(initialDemoSettings);
  const [baseline, setBaseline] = useState<GuildSettings>(initialDemoSettings);
  const [active, setActive] = useState('Word Filter');
  const [word, setWord] = useState('');
  const [notice, setNotice] = useState('');
  const [csrfToken, setCsrfToken] = useState('');
  const [loading, setLoading] = useState(live);
  const [error, setError] = useState('');
  const dirty = useMemo(
    () => JSON.stringify(settings) !== JSON.stringify(baseline),
    [baseline, settings],
  );
  const update = <K extends keyof GuildSettings>(key: K, value: GuildSettings[K]) =>
    setSettings((current) => ({ ...current, [key]: value }));
  function addWord() {
    const value = word.trim();
    if (!value || settings.forbiddenWords.includes(value)) return;
    update('forbiddenWords', [...settings.forbiddenWords, value]);
    setWord('');
  }
  useEffect(() => {
    if (!live || !guildId) return;
    Promise.all([dashboardApi.session(), dashboardApi.settings(guildId)])
      .then(([session, value]) => {
        setCsrfToken(session.csrfToken);
        setSettings(value);
        setBaseline(value);
      })
      .catch((cause: unknown) =>
        setError(cause instanceof Error ? cause.message : 'Unable to load settings'),
      )
      .finally(() => setLoading(false));
  }, [guildId, live]);
  async function save() {
    if (!live || !guildId) {
      setBaseline(settings);
      setNotice('Demo only — no Discord server was changed.');
      window.setTimeout(() => setNotice(''), 3500);
      return;
    }
    try {
      const saved = await dashboardApi.saveSettings(guildId, settings, csrfToken);
      setSettings(saved);
      setBaseline(saved);
      setNotice('Changes saved to Discord.');
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Unable to save settings');
    }
    window.setTimeout(() => setNotice(''), 3500);
  }

  return (
    <section className="server-dashboard shell-wide">
      <aside className="dashboard-sidebar">
        <Link to="/dashboard" className="back-link">
          <ChevronLeft /> Your servers
        </Link>
        <div className="sidebar-server">
          <span style={{ background: server.accent }}>{server.initials}</span>
          <div>
            <strong>{server.name}</strong>
            <small>{live ? 'Live configuration' : 'Demo workspace'}</small>
          </div>
        </div>
        <nav aria-label="Server settings">
          {nav.map(([label, Icon]) => (
            <button
              className={active === label ? 'active' : ''}
              key={label}
              onClick={() => setActive(label)}
            >
              <Icon />
              {label}
            </button>
          ))}
        </nav>
      </aside>
      <div className="dashboard-main">
        <header className="dashboard-header">
          <div>
            {!live && <span className="demo-pill">Demo</span>}
            <p>Server / {active}</p>
            <h1>{active}</h1>
          </div>
          <div className="save-zone">
            {dirty && (
              <span>
                <AlertCircle /> Unsaved changes
              </span>
            )}
            <button
              className="button button-primary"
              disabled={!dirty || loading}
              onClick={() => void save()}
            >
              <Save /> Save Changes
            </button>
          </div>
        </header>
        {loading && (
          <div className="module-placeholder">
            <span className="inline-loader" />
            <h2>Loading secure guild settings…</h2>
          </div>
        )}
        {error && (
          <div className="demo-banner">
            <AlertCircle />
            <div>
              <strong>Dashboard request failed</strong>
              <p>{error}</p>
            </div>
          </div>
        )}
        {!loading && !error && (
          <>
            {active === 'Word Filter' || active === 'Mocking' ? (
              <div className="settings-preview-grid">
                <div className="settings-panel">
                  <SettingToggle
                    title="Enable Word Filter"
                    description="Check new messages against this guild's blacklist."
                    value={settings.wordFilterEnabled}
                    onChange={(value) => update('wordFilterEnabled', value)}
                  />
                  <div className="setting-block">
                    <div className="setting-title">
                      <div>
                        <h2>Forbidden words</h2>
                        <p>Phrases are normalized server-side before matching.</p>
                      </div>
                    </div>
                    <div className="tag-editor">
                      {settings.forbiddenWords.map((item) => (
                        <button
                          key={item}
                          onClick={() =>
                            update(
                              'forbiddenWords',
                              settings.forbiddenWords.filter((entry) => entry !== item),
                            )
                          }
                          aria-label={`Remove ${item}`}
                        >
                          {item}
                          <span>×</span>
                        </button>
                      ))}
                    </div>
                    <div className="add-field">
                      <label>
                        <span className="sr-only">Add forbidden word</span>
                        <input
                          value={word}
                          onChange={(event) => setWord(event.target.value)}
                          onKeyDown={(event) => {
                            if (event.key === 'Enter') addWord();
                          }}
                          placeholder="Add a word or phrase"
                        />
                      </label>
                      <button onClick={addWord}>Add word</button>
                    </div>
                  </div>
                  <div className="setting-block">
                    <div className="setting-title">
                      <div>
                        <h2>Filter severity</h2>
                        <p>Controls how aggressively simple bypasses are normalized.</p>
                      </div>
                    </div>
                    <div className="segmented">
                      {(['relaxed', 'balanced', 'strict'] as const).map((value) => (
                        <button
                          className={settings.severity === value ? 'active' : ''}
                          key={value}
                          onClick={() => update('severity', value)}
                        >
                          {value}
                        </button>
                      ))}
                    </div>
                  </div>
                  <SettingToggle
                    title="Mocking response"
                    description={`Send a short response after a filtered message. Cooldown: ${settings.mockingCooldown}s.`}
                    value={settings.mockingEnabled}
                    onChange={(value) => update('mockingEnabled', value)}
                  />
                  <div className="setting-block">
                    <div className="setting-title">
                      <div>
                        <h2>Whitelist</h2>
                        <p>Exact safe terms that should remain untouched.</p>
                      </div>
                    </div>
                    <div className="tag-editor quiet">
                      {settings.whitelist.map((item) => (
                        <span key={item}>{item}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <aside className="preview-panel">
                  <div className="preview-heading">
                    <span>Live Discord Preview</span>
                    <em>local preview</em>
                  </div>
                  <DiscordPreview
                    response={
                      settings.mockingEnabled
                        ? '@User that one did not survive the trip.'
                        : 'Message removed by AutoMod.'
                    }
                    live={false}
                  />
                  <p>
                    <MessageSquareWarning /> This preview updates locally. It does not represent
                    live guild activity.
                  </p>
                </aside>
              </div>
            ) : active === 'Music' ? (
              <MusicSettings settings={settings} update={update} />
            ) : (
              <ModulePlaceholder module={active} />
            )}
          </>
        )}
        {notice && (
          <div className="toast" role="status">
            <Sparkles /> {notice}
          </div>
        )}
      </div>
    </section>
  );
}

function SettingToggle({
  title,
  description,
  value,
  onChange,
}: {
  title: string;
  description: string;
  value: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <div className="setting-block setting-toggle">
      <div className="setting-title">
        <div>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
        <button
          role="switch"
          aria-checked={value}
          className={value ? 'toggle on' : 'toggle'}
          onClick={() => onChange(!value)}
        >
          <span />
        </button>
      </div>
    </div>
  );
}

function MusicSettings({
  settings,
  update,
}: {
  settings: GuildSettings;
  update: <K extends keyof GuildSettings>(key: K, value: GuildSettings[K]) => void;
}) {
  return (
    <div className="module-card">
      <Music />
      <div>
        <p className="eyebrow">Music module</p>
        <h2>Direct HTTPS audio playback</h2>
        <p>
          .zwd maintains a separate queue for each guild. The current implementation does not search
          or bypass platform restrictions.
        </p>
      </div>
      <SettingToggle
        title="Music enabled"
        description="Allow voice playback commands in this server."
        value={settings.musicEnabled}
        onChange={(value) => update('musicEnabled', value)}
      />
      <label className="range-setting">
        <span>
          Default volume <b>{settings.defaultVolume}%</b>
        </span>
        <input
          type="range"
          min="0"
          max="100"
          value={settings.defaultVolume}
          onChange={(event) => update('defaultVolume', Number(event.target.value))}
        />
      </label>
      <div className="now-playing-empty">
        <Volume2 />
        <span>No live connection</span>
        <p>Now Playing becomes available when the API exposes an active voice session.</p>
      </div>
    </div>
  );
}

function ModulePlaceholder({ module }: { module: string }) {
  return (
    <div className="module-placeholder">
      <SlidersHorizontal />
      <p className="eyebrow">{module}</p>
      <h2>Module interface prepared.</h2>
      <p>
        This demo exposes only settings already mapped to the public API contract. Additional
        controls will appear as their validated endpoints are connected.
      </p>
    </div>
  );
}
