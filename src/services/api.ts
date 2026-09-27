import type { GuildSettings } from '../types';

export const apiBaseUrl =
  (import.meta.env.VITE_API_URL as string | undefined)?.replace(/\/$/, '') ?? '';
export const isApiConfigured = Boolean(apiBaseUrl);

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  if (!apiBaseUrl) throw new Error('The dashboard API is not configured');
  const response = await fetch(`${apiBaseUrl}${path}`, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    ...options,
  });
  if (!response.ok)
    throw new Error(
      response.status === 401 ? 'Discord session required' : 'The API request failed',
    );
  return response.json() as Promise<T>;
}

export const dashboardApi = {
  loginUrl: apiBaseUrl ? `${apiBaseUrl}/auth/discord` : '',
  session: () =>
    request<{ user: { id: string; username: string; avatarUrl: string }; csrfToken: string }>(
      '/api/session',
    ),
  guilds: () =>
    request<
      Array<{ id: string; name: string; iconUrl?: string; installed: boolean; permissions: string }>
    >('/api/guilds'),
  settings: (guildId: string) =>
    request<GuildSettings>(`/api/guilds/${encodeURIComponent(guildId)}/settings`),
  saveSettings: (guildId: string, settings: GuildSettings, csrfToken: string) =>
    request<GuildSettings>(`/api/guilds/${encodeURIComponent(guildId)}/settings`, {
      method: 'PUT',
      body: JSON.stringify(settings),
      headers: { 'X-CSRF-Token': csrfToken },
    }),
};
