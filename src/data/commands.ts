import type { CommandCategory, CommandRecord } from '../types'

interface GroupDefinition {
  group: string
  category: CommandCategory
  description: string
  subcommands?: string[]
  permissions?: string
  cooldown?: string
}

const definitions: GroupDefinition[] = [
  { group: 'help', category: 'Utility', description: 'Browse commands available to you.', subcommands: [''] },
  { group: 'setup', category: 'Administration', description: 'Run the first-time server setup.', subcommands: [''], permissions: 'Manage Server' },
  { group: 'module', category: 'Administration', description: 'Inspect or toggle a server module.', subcommands: ['list', 'set'], permissions: 'Manage Server' },
  { group: 'settings', category: 'Administration', description: 'View or update guild settings.', subcommands: ['view', 'set'], permissions: 'Manage Server' },
  { group: 'server', category: 'Administration', description: 'Inspect the server and command-channel policy.', subcommands: ['info', 'stats', 'settings', 'commands set', 'commands status', 'commands disable', 'commands exempt-add', 'commands exempt-remove'], permissions: 'Manage Server' },
  { group: 'permissions', category: 'Administration', description: 'Configure .zwd user, role, and channel overrides.', subcommands: ['category', 'allow', 'deny', 'remove', 'list'], permissions: 'Manage Server' },
  { group: 'logging', category: 'Administration', description: 'Route audit categories to log channels.', subcommands: ['set', 'remove', 'status'], permissions: 'Manage Server' },
  { group: 'privacy', category: 'Utility', description: 'Read the bot privacy and retention summary.', subcommands: [''] },
  { group: 'mydata', category: 'Utility', description: 'Export or delete your stored data.', subcommands: ['export', 'delete'], cooldown: '30 seconds' },
  { group: 'moderation', category: 'Moderation', description: 'Act on a member with hierarchy-safe moderation.', subcommands: ['ban', 'softban', 'unban', 'kick', 'timeout', 'untimeout', 'mute', 'unmute', 'warn', 'warnings', 'clearwarnings', 'editwarning', 'slowmode', 'lock', 'unlock', 'lockdown', 'nickname', 'resetnickname', 'disconnect', 'move', 'purge recent', 'purge user', 'purge bots', 'purge links', 'purge attachments', 'purge embeds', 'purge contains', 'purge before', 'purge after', 'role add', 'role remove', 'role mass-add', 'role mass-remove', 'voice mute', 'voice unmute', 'voice deafen', 'voice undeafen'], permissions: 'Moderation capability + relevant Discord permission', cooldown: '2 seconds' },
  { group: 'case', category: 'Moderation', description: 'View, edit, delete, or search moderation cases.', subcommands: ['view', 'edit', 'delete', 'search'], permissions: 'Moderation capability' },
  { group: 'automod', category: 'AutoMod', description: 'Manage general AutoMod rules and raid mode.', subcommands: ['list', 'add', 'remove', 'raid-mode'], permissions: 'Manage Server' },
  { group: 'filter', category: 'AutoMod', description: 'Configure the advanced word filter and escalation.', subcommands: ['blacklist-add', 'whitelist-add', 'remove', 'list', 'exempt-add', 'exempt-remove', 'exemptions', 'config', 'escalation', 'violations', 'violations-reset'], permissions: 'Manage Server + automod.manage' },
  { group: 'ticket', category: 'Tickets', description: 'Create and operate persistent support tickets.', subcommands: ['setup', 'config', 'panel', 'open', 'close', 'reopen', 'claim', 'add', 'remove', 'rename', 'priority', 'note', 'transcript', 'blacklist', 'unblacklist', 'stats'], permissions: 'Varies by action', cooldown: '5 seconds' },
  { group: 'verification', category: 'Administration', description: 'Create verification panels and toggle raid mode.', subcommands: ['setup', 'raid-mode'], permissions: 'Manage Server' },
  { group: 'welcome', category: 'Administration', description: 'Configure welcome, goodbye, and autoroles.', subcommands: ['setup', 'goodbye'], permissions: 'Manage Server' },
  { group: 'modmail', category: 'Tickets', description: 'Operate DM-based server support.', subcommands: ['setup', 'status', 'close', 'block', 'unblock'], permissions: 'modmail.manage' },
  { group: 'level', category: 'Levels', description: 'Ranks, leaderboards, XP settings, and staff adjustments.', subcommands: ['rank', 'leaderboard', 'settings', 'xp give', 'xp remove', 'xp set', 'admin set-level'], permissions: 'Staff permissions for adjustments' },
  { group: 'economy', category: 'Economy', description: 'Use the server-local virtual economy.', subcommands: ['balance', 'deposit', 'withdraw', 'daily', 'weekly', 'work', 'pay', 'leaderboard', 'shop', 'buy', 'inventory', 'use'], cooldown: '5 seconds' },
  { group: 'stats', category: 'Administration', description: 'View member, message, voice, case, ticket, command, or XP analytics.', subcommands: ['', 'members', 'messages', 'voice', 'moderation', 'tickets', 'commands', 'xp'] },
  { group: 'counter', category: 'Administration', description: 'Configure dynamic server counters.', subcommands: ['setup', 'list', 'remove'], permissions: 'Manage Channels' },
  { group: 'playercount', category: 'Administration', description: 'Manage supported game-server status integrations.', subcommands: ['setup', 'status', 'remove', 'refresh'], permissions: 'Manage Server' },
  { group: 'invites', category: 'Community', description: 'Track invite attribution, leaderboards, bonuses, and reward roles.', subcommands: ['leaderboard', 'user', 'setup', 'bonus', 'sync', 'reward-set', 'reward-remove', 'rewards'], permissions: 'Server owner for reward roles', cooldown: '5 seconds' },
  { group: 'giveaway', category: 'Community', description: 'Run requirements-aware giveaways.', subcommands: ['start', 'end', 'reroll', 'pause', 'resume', 'list'], permissions: 'Manage Events / configured staff' },
  { group: 'poll', category: 'Community', description: 'Create timed, anonymous, or multi-choice polls.', subcommands: ['create', 'results', 'end'] },
  { group: 'suggestion', category: 'Community', description: 'Submit and review community suggestions.', subcommands: ['submit', 'status', 'list'] },
  { group: 'role-panel', category: 'Community', description: 'Create persistent button and select role panels.', subcommands: ['create', 'list'], permissions: 'Manage Roles' },
  { group: 'starboard', category: 'Community', description: 'Configure a reaction-powered starboard.', subcommands: ['setup', 'status', 'disable'], permissions: 'Manage Server' },
  { group: 'tempvoice', category: 'Community', description: 'Create and control temporary voice channels.', subcommands: ['setup', 'rename', 'limit', 'lock', 'unlock', 'hide', 'show', 'permit', 'reject', 'transfer'] },
  { group: 'announce', category: 'Administration', description: 'Compose and schedule announcements.', subcommands: ['create', 'edit', 'delete', 'schedule', 'list'], permissions: 'Manage Messages' },
  { group: 'embed', category: 'Utility', description: 'Create, edit, and clone reusable embeds.', subcommands: ['create', 'edit', 'clone'], permissions: 'Manage Messages' },
  { group: 'reminder', category: 'Utility', description: 'Create and manage personal reminders.', subcommands: ['create', 'list', 'delete'] },
  { group: 'tag', category: 'Utility', description: 'Store and retrieve reusable server content.', subcommands: ['create', 'edit', 'delete', 'view', 'list', 'search'] },
  { group: 'faq', category: 'Utility', description: 'Search or maintain the server knowledge base.', subcommands: ['search', 'create', 'list'] },
  { group: 'custom', category: 'Administration', description: 'Create server-specific custom command responses.', subcommands: ['create', 'delete', 'list', 'run'], permissions: 'Manage Server for editing' },
  { group: 'birthday', category: 'Community', description: 'Manage an optional birthday announcement profile.', subcommands: ['set', 'remove'] },
  { group: 'staff', category: 'Administration', description: 'Duty state and factual staff activity statistics.', subcommands: ['duty', 'stats', 'leaderboard'] },
  { group: 'application', category: 'Community', description: 'Submit and review staff applications.', subcommands: ['apply', 'review', 'list'] },
  { group: 'afk', category: 'Utility', description: 'Set an AFK reason and notify mentions.', subcommands: [''], cooldown: '2 seconds' },
  { group: 'play', category: 'Music', description: 'Play or queue a direct public HTTPS audio stream.', subcommands: [''], cooldown: '3 seconds' },
  { group: 'pause', category: 'Music', description: 'Pause the current track.', subcommands: [''], cooldown: '1 second' },
  { group: 'resume', category: 'Music', description: 'Resume paused playback.', subcommands: [''], cooldown: '1 second' },
  { group: 'skip', category: 'Music', description: 'Skip the current track.', subcommands: [''], cooldown: '1 second' },
  { group: 'stop', category: 'Music', description: 'Stop playback and clear the queue.', subcommands: [''], cooldown: '1 second' },
  { group: 'queue', category: 'Music', description: 'View the server music queue.', subcommands: [''], cooldown: '1 second' },
  { group: 'nowplaying', category: 'Music', description: 'Show the currently playing track.', subcommands: [''], cooldown: '1 second' },
  { group: 'volume', category: 'Music', description: 'Set playback volume from 0–200%.', subcommands: [''], cooldown: '1 second' },
  { group: 'loop', category: 'Music', description: 'Loop a track, the full queue, or disable looping.', subcommands: [''], cooldown: '1 second' },
  { group: 'shuffle', category: 'Music', description: 'Shuffle all waiting tracks.', subcommands: [''], cooldown: '1 second' },
  { group: 'remove', category: 'Music', description: 'Remove a track by queue position.', subcommands: [''], cooldown: '1 second' },
  { group: 'move', category: 'Music', description: 'Move a queued track to another position.', subcommands: [''], cooldown: '1 second' },
  { group: 'clearqueue', category: 'Music', description: 'Remove all waiting tracks.', subcommands: [''], cooldown: '1 second' },
  { group: 'disconnect', category: 'Music', description: 'Stop playback and leave voice.', subcommands: [''], cooldown: '1 second' },
  { group: 'utility', category: 'Utility', description: 'Server and user information plus everyday tools.', subcommands: ['ping', 'uptime', 'avatar', 'banner', 'userinfo', 'serverinfo', 'servericon', 'roleinfo', 'channelinfo', 'emojiinfo', 'permissions', 'membercount', 'botinfo', 'invite', 'support', 'timestamp', 'snowflake', 'calculator', 'color', 'text-stats', 'random', 'choose'], cooldown: '2 seconds' },
  { group: 'fun', category: 'Fun', description: 'Optional social and entertainment commands.', subcommands: ['coinflip', 'dice', '8ball', 'choose', 'rate', 'ship', 'rps', 'compliment', 'joke', 'truth-or-dare', 'fact', 'random-member', 'would-you-rather'], cooldown: '3 seconds' },
  { group: 'prank', category: 'Fun', description: 'Clearly labelled harmless visual jokes.', subcommands: ['fake-ban', 'fake-timeout', 'fake-levelup', 'bonk', 'boop', 'jail', 'wanted', 'achievement'], cooldown: '10 seconds' },
  { group: 'owner', category: 'Owner', description: 'Protected platform statistics and economy controls.', subcommands: ['stats', 'guilds', 'health', 'errors', 'reload', 'maintenance', 'money view', 'money set', 'money add', 'money remove', 'money ledger'], permissions: 'Configured bot owner only' },
  { group: 'owner-control', category: 'Owner', description: 'Global, guild-targeted, and two-step destructive controls.', subcommands: ['status', 'guild', 'guild-state', 'maintenance', 'module', 'automod-default', 'announce', 'leave', 'leave-all', 'shutdown', 'restart', 'confirm'], permissions: 'Configured bot owner only' },
]

function syntaxFor(group: string, subcommand: string): string {
  const base = `/${group}${subcommand ? ` ${subcommand}` : ''}`
  if (group === 'play') return `${base} url:<https-url> [title]`
  if (group === 'afk') return `${base} [reason]`
  if (group === 'help') return `${base} [query]`
  if (group === 'moderation' && ['ban', 'kick', 'timeout', 'warn'].includes(subcommand))
    return `${base} user:<member> [reason] [duration]`
  if (group === 'filter' && subcommand.endsWith('add')) return `${base} phrase:<text>`
  return base
}

export const commands: CommandRecord[] = definitions.flatMap((definition) =>
  (definition.subcommands ?? ['']).map((subcommand) => {
    const name = `${definition.group}${subcommand ? ` ${subcommand}` : ''}`
    const syntax = syntaxFor(definition.group, subcommand)
    return {
      id: name.replaceAll(' ', '-'),
      name,
      group: definition.group,
      category: definition.category,
      description: definition.description,
      syntax,
      permissions: definition.permissions ?? 'Available when the module and channel policy allow it',
      examples: [syntax.replaceAll('<member>', '@member').replaceAll('<text>', 'example')],
      cooldown: definition.cooldown,
      aliases: [],
    }
  }),
)

export const topLevelCommandCount = definitions.length
export const commandCategories: Array<'All' | CommandCategory> = [
  'All',
  'Moderation',
  'AutoMod',
  'Administration',
  'Music',
  'Fun',
  'Utility',
  'Economy',
  'Levels',
  'Tickets',
  'Community',
  'Owner',
]
