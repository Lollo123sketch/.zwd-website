import { describe, expect, it } from 'vitest'
import { commands, topLevelCommandCount } from './commands'

describe('real command catalog', () => {
  it('tracks the 58 registered top-level groups', () => {
    expect(topLevelCommandCount).toBe(58)
  })

  it('includes critical real modules and detailed actions', () => {
    expect(commands.some((command) => command.name === 'moderation ban')).toBe(true)
    expect(commands.some((command) => command.name === 'filter escalation')).toBe(true)
    expect(commands.some((command) => command.name === 'ticket panel')).toBe(true)
    expect(commands.some((command) => command.name === 'play')).toBe(true)
    expect(commands.some((command) => command.name === 'owner-control confirm')).toBe(true)
  })

  it('does not publish fake aliases', () => {
    expect(commands.every((command) => command.aliases.length === 0)).toBe(true)
  })
})
