export type CommandCategory =
  | 'Administration'
  | 'Moderation'
  | 'AutoMod'
  | 'Tickets'
  | 'Music'
  | 'Levels'
  | 'Economy'
  | 'Community'
  | 'Utility'
  | 'Fun'
  | 'Owner';

export interface CommandRecord {
  id: string;
  name: string;
  group: string;
  category: CommandCategory;
  description: string;
  syntax: string;
  permissions: string;
  examples: string[];
  cooldown?: string;
  aliases: string[];
}

export interface DemoServer {
  id: string;
  name: string;
  initials: string;
  installed: boolean;
  permission: 'Owner' | 'Administrator' | 'Manage Server';
  accent: string;
  members?: number;
}

export interface GuildSettings {
  wordFilterEnabled: boolean;
  forbiddenWords: string[];
  whitelist: string[];
  severity: 'relaxed' | 'balanced' | 'strict';
  mockingEnabled: boolean;
  mockingCooldown: number;
  musicEnabled: boolean;
  defaultVolume: number;
  welcomeEnabled: boolean;
  levelsEnabled: boolean;
  economyEnabled: boolean;
  ticketsEnabled: boolean;
}
