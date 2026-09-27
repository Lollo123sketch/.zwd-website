import type { DemoServer, GuildSettings } from '../types'

export const demoServers: DemoServer[] = [
  { id: 'demo-community', name: 'Nightshift Community', initials: 'NC', installed: true, permission: 'Administrator', accent: '#a78bfa' },
  { id: 'demo-studio', name: 'Pixel Workshop', initials: 'PW', installed: false, permission: 'Manage Server', accent: '#62d9c7' },
  { id: 'demo-lounge', name: 'The Afterparty', initials: 'TA', installed: true, permission: 'Manage Server', accent: '#f6cf78' },
]

export const initialDemoSettings: GuildSettings = {
  wordFilterEnabled: true,
  forbiddenWords: ['spoiler phrase', 'blocked-domain.example'],
  whitelist: ['classical'],
  severity: 'balanced',
  mockingEnabled: true,
  mockingCooldown: 8,
  musicEnabled: true,
  defaultVolume: 70,
  welcomeEnabled: true,
  levelsEnabled: true,
  economyEnabled: false,
  ticketsEnabled: true,
}
