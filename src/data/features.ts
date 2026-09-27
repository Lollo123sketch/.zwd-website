import {
  BadgeDollarSign,
  ChartNoAxesCombined,
  Headphones,
  LifeBuoy,
  ListChecks,
  Music2,
  ShieldCheck,
  Sparkles,
  TerminalSquare,
  TicketCheck,
  UserRoundCheck,
  WandSparkles,
} from 'lucide-react'

export const featureGroups = [
  {
    title: 'Advanced AutoMod',
    description:
      'Per-server rules for spam, mentions, links, Unicode, regex, blocked words, raids, and account age.',
    icon: ShieldCheck,
    tone: 'violet',
    proof: 'Delete · warn · timeout · kick · ban',
  },
  {
    title: 'Word filter with a pulse',
    description:
      'Blacklist, whitelist, exemptions, bypass-resistant matching, escalation, and 200 safe mocking variations.',
    icon: WandSparkles,
    tone: 'amber',
    proof: 'Strict · balanced · relaxed',
  },
  {
    title: 'Moderation cases',
    description:
      'Every action becomes a searchable case with moderator, reason, timestamp, duration, and evidence metadata.',
    icon: ListChecks,
    tone: 'cyan',
    proof: 'Cases · warnings · hierarchy checks',
  },
  {
    title: 'Support that survives restarts',
    description:
      'Persistent ticket panels, categories, claiming, priority, staff notes, transcripts, ratings, and auto-cleanup.',
    icon: TicketCheck,
    tone: 'violet',
    proof: '8 request types · persistent panels',
  },
  {
    title: 'Voice & music',
    description:
      'Independent queues for every guild with loop, shuffle, volume, cleanup, and direct HTTPS stream playback.',
    icon: Music2,
    tone: 'rose',
    proof: 'Guild-isolated queues',
  },
  {
    title: 'Levels & economy',
    description:
      'Anti-spam XP, leaderboards, level roles, server-local wallets, banks, rewards, shops, and inventories.',
    icon: BadgeDollarSign,
    tone: 'amber',
    proof: 'Server-owned, never real money',
  },
  {
    title: 'Community systems',
    description:
      'Giveaways, polls, suggestions, starboards, role panels, birthdays, temporary voice, and invite rewards.',
    icon: Sparkles,
    tone: 'cyan',
    proof: 'Built for active communities',
  },
  {
    title: 'Analytics & logging',
    description:
      'Message, member, voice, moderation, ticket, XP, command, and error activity with category log channels.',
    icon: ChartNoAxesCombined,
    tone: 'violet',
    proof: 'Real operational visibility',
  },
  {
    title: 'Permissions that fit',
    description:
      'Discord permissions plus user, role, channel, command, capability, and command-channel overrides.',
    icon: UserRoundCheck,
    tone: 'rose',
    proof: 'Least privilege by default',
  },
  {
    title: 'ModMail & onboarding',
    description:
      'DM support, verification panels, account-age gates, welcome flows, autoroles, and raid mode.',
    icon: LifeBuoy,
    tone: 'cyan',
    proof: 'From first join to staff support',
  },
  {
    title: 'Server operations',
    description:
      'Scheduled announcements, reminders, counters, game endpoints, tags, FAQs, applications, and custom commands.',
    icon: TerminalSquare,
    tone: 'amber',
    proof: 'Configuration lives in PostgreSQL',
  },
  {
    title: 'Safe personality',
    description:
      'Optional fun and clearly labelled prank commands that never impersonate staff or mutate moderation state.',
    icon: Headphones,
    tone: 'violet',
    proof: 'Fun without the fallout',
  },
] as const
