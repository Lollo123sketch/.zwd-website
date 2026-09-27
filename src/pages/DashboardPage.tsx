import { ArrowRight, Bot, CheckCircle2, LogIn, Server, ShieldCheck } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ButtonLink } from '../components/ButtonLink';
import { PageHeader } from '../components/PageHeader';
import { siteConfig } from '../config/site';
import { demoServers } from '../data/demo';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { dashboardApi, isApiConfigured } from '../services/api';

type LiveGuild = {
  id: string;
  name: string;
  iconUrl?: string;
  installed: boolean;
  permissions: string;
  members?: number;
};

export default function DashboardPage() {
  useDocumentMeta('Dashboard');
  const [session, setSession] = useState<{ username: string; avatarUrl: string } | null>(null);
  const [liveGuilds, setLiveGuilds] = useState<LiveGuild[]>([]);
  const [loading, setLoading] = useState(isApiConfigured);
  const [apiError, setApiError] = useState('');

  useEffect(() => {
    if (!isApiConfigured) return;
    Promise.all([dashboardApi.session(), dashboardApi.guilds()])
      .then(([result, guilds]) => {
        setSession(result.user);
        setLiveGuilds(guilds);
      })
      .catch((error: unknown) =>
        setApiError(error instanceof Error ? error.message : 'Unable to load Discord servers'),
      )
      .finally(() => setLoading(false));
  }, []);

  const demo = !isApiConfigured || (!loading && !session);
  return (
    <>
      <PageHeader
        eyebrow="Control room"
        title="Your servers."
        description="Manage .zwd only where your Discord account has permission. Access is verified again by the API for every request."
      />
      <section className="shell dashboard-page">
        {demo && (
          <div className="demo-banner">
            <span>Demo</span>
            <div>
              <strong>Interface preview</strong>
              <p>No Discord settings will be modified from this environment.</p>
            </div>
            {isApiConfigured ? (
              <a className="button button-primary button-small" href={dashboardApi.loginUrl}>
                <LogIn /> Login with Discord
              </a>
            ) : (
              <button className="button button-secondary button-small" disabled>
                <LogIn /> OAuth API not connected
              </button>
            )}
          </div>
        )}
        {loading && (
          <div className="dashboard-empty">
            <span className="inline-loader" />
            <div>
              <h2>Reading your Discord servers…</h2>
              <p>Only manageable servers will be returned.</p>
            </div>
          </div>
        )}
        {apiError && isApiConfigured && (
          <div className="demo-banner">
            <span>Login</span>
            <div>
              <strong>Discord session required</strong>
              <p>{apiError}</p>
            </div>
            <a className="button button-primary button-small" href={dashboardApi.loginUrl}>
              <LogIn /> Login with Discord
            </a>
          </div>
        )}
        <div className="dashboard-user">
          {session ? (
            <img className="demo-user-avatar" src={session.avatarUrl} alt="Discord avatar" />
          ) : (
            <div className="demo-user-avatar">Z</div>
          )}
          <div>
            <span>Viewing as</span>
            <strong>{session?.username ?? 'Demo Administrator'}</strong>
          </div>
          <div className="security-note">
            <ShieldCheck /> Permissions are rechecked by the API
          </div>
        </div>
        <div className="server-grid">
          {session
            ? liveGuilds.map((server) => <LiveServerCard key={server.id} server={server} />)
            : demoServers.map((server) => (
                <article className="server-card" key={server.id}>
                  <div className="server-icon" style={{ background: server.accent }}>
                    {server.initials}
                  </div>
                  <div className="server-card-copy">
                    <h2>{server.name}</h2>
                    <p>{server.permission}</p>
                    <span className={server.installed ? 'installed' : 'not-installed'}>
                      {server.installed ? (
                        <>
                          <CheckCircle2 /> .zwd installed
                        </>
                      ) : (
                        <>
                          <Bot /> .zwd not installed
                        </>
                      )}
                    </span>
                  </div>
                  {server.installed ? (
                    <Link className="button button-secondary" to={`/dashboard/${server.id}`}>
                      Manage <ArrowRight />
                    </Link>
                  ) : (
                    <ButtonLink className="server-add" external href={siteConfig.inviteUrl}>
                      Add .zwd
                    </ButtonLink>
                  )}
                </article>
              ))}
        </div>
        {!loading && session && liveGuilds.length === 0 && (
          <div className="dashboard-empty">
            <Server />
            <div>
              <h2>No manageable servers found.</h2>
              <p>You need the Manage Server permission to configure a guild through .zwd.</p>
            </div>
          </div>
        )}
        {demo && (
          <div className="dashboard-empty">
            <Server />
            <div>
              <h2>Real servers appear after Discord login.</h2>
              <p>
                The production API returns only guilds where the session user has Manage Server
                permission and validates access again for every settings request.
              </p>
            </div>
          </div>
        )}
      </section>
    </>
  );
}

function LiveServerCard({ server }: { server: LiveGuild }) {
  return (
    <article className="server-card">
      {server.iconUrl ? (
        <img className="server-icon" src={server.iconUrl} alt="" />
      ) : (
        <div className="server-icon">{server.name.slice(0, 2).toUpperCase()}</div>
      )}
      <div className="server-card-copy">
        <h2>{server.name}</h2>
        <p>
          {server.permissions}
          {server.members ? ` · ${server.members.toLocaleString()} members` : ''}
        </p>
        <span className={server.installed ? 'installed' : 'not-installed'}>
          {server.installed ? (
            <>
              <CheckCircle2 /> .zwd installed
            </>
          ) : (
            <>
              <Bot /> .zwd not installed
            </>
          )}
        </span>
      </div>
      {server.installed ? (
        <Link className="button button-secondary" to={`/dashboard/${server.id}`}>
          Manage <ArrowRight />
        </Link>
      ) : (
        <ButtonLink external href={siteConfig.inviteUrl}>
          Add .zwd
        </ButtonLink>
      )}
    </article>
  );
}
