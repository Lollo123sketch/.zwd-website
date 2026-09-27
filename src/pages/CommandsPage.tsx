import {
  Check,
  ChevronRight,
  Clock3,
  Command as CommandIcon,
  Copy,
  Search,
  Shield,
} from 'lucide-react';
import { useDeferredValue, useMemo, useRef, useState } from 'react';
import { PageHeader } from '../components/PageHeader';
import { commandCategories, commands, topLevelCommandCount } from '../data/commands';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import type { CommandCategory, CommandRecord } from '../types';

export default function CommandsPage() {
  useDocumentMeta('Commands');
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<'All' | CommandCategory>('All');
  const [selected, setSelected] = useState<CommandRecord | null>(null);
  const [copied, setCopied] = useState('');
  const dialogRef = useRef<HTMLDialogElement>(null);
  const deferredQuery = useDeferredValue(query.trim().toLowerCase());
  const filtered = useMemo(
    () =>
      commands.filter(
        (command) =>
          (category === 'All' || command.category === category) &&
          (!deferredQuery ||
            `${command.name} ${command.description} ${command.category}`
              .toLowerCase()
              .includes(deferredQuery)),
      ),
    [category, deferredQuery],
  );

  function open(command: CommandRecord) {
    setSelected(command);
    dialogRef.current?.showModal();
  }
  async function copy(value: string) {
    await navigator.clipboard.writeText(value);
    setCopied(value);
    window.setTimeout(() => setCopied(''), 1500);
  }

  return (
    <>
      <PageHeader
        eyebrow="Command index"
        title="Find the right control. Fast."
        description={`${topLevelCommandCount} top-level command groups, expanded into ${commands.length} searchable actions directly from the bot's real command definitions.`}
      />
      <section className="shell commands-workspace">
        <div className="command-toolbar">
          <label className="command-search">
            <Search />
            <span className="sr-only">Search commands</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search commands…"
              autoComplete="off"
            />
            <kbd>⌘ K</kbd>
          </label>
          <span className="result-count">{filtered.length} results</span>
        </div>
        <div className="category-tabs" role="tablist" aria-label="Command categories">
          {commandCategories.map((item) => (
            <button
              role="tab"
              aria-selected={category === item}
              key={item}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>
        {filtered.length ? (
          <div className="command-grid">
            {filtered.map((command) => (
              <article className="command-card" key={command.id}>
                <div className="command-card-head">
                  <span>
                    <CommandIcon />/{command.name}
                  </span>
                  <button
                    type="button"
                    aria-label={`Copy /${command.name}`}
                    onClick={(event) => {
                      event.stopPropagation();
                      void copy(`/${command.name}`);
                    }}
                  >
                    {copied === `/${command.name}` ? <Check /> : <Copy />}
                  </button>
                </div>
                <p>{command.description}</p>
                <div className="command-meta">
                  <span>{command.category}</span>
                  {command.cooldown && (
                    <span>
                      <Clock3 /> {command.cooldown}
                    </span>
                  )}
                </div>
                <button className="command-open" onClick={() => open(command)}>
                  View details <ChevronRight />
                </button>
              </article>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <Search />
            <h2>No signal found</h2>
            <p>Try another command or clear the selected category.</p>
            <button
              onClick={() => {
                setQuery('');
                setCategory('All');
              }}
            >
              Reset filters
            </button>
          </div>
        )}
      </section>
      <dialog ref={dialogRef} className="command-dialog" onClose={() => setSelected(null)}>
        {selected && (
          <div>
            <button
              className="dialog-close"
              onClick={() => dialogRef.current?.close()}
              aria-label="Close command details"
            >
              ×
            </button>
            <p className="eyebrow">{selected.category} · slash command</p>
            <h2>/{selected.name}</h2>
            <p>{selected.description}</p>
            <dl>
              <div>
                <dt>Syntax</dt>
                <dd>
                  <code>{selected.syntax}</code>
                  <button onClick={() => void copy(selected.syntax)} aria-label="Copy syntax">
                    {copied === selected.syntax ? <Check /> : <Copy />}
                  </button>
                </dd>
              </div>
              <div>
                <dt>Permissions</dt>
                <dd>
                  <Shield /> {selected.permissions}
                </dd>
              </div>
              <div>
                <dt>Cooldown</dt>
                <dd>
                  <Clock3 /> {selected.cooldown ?? 'No additional command cooldown'}
                </dd>
              </div>
              <div>
                <dt>Example</dt>
                <dd>
                  <code>{selected.examples[0]}</code>
                </dd>
              </div>
              <div>
                <dt>Aliases</dt>
                <dd>
                  {selected.aliases.length
                    ? selected.aliases.join(', ')
                    : 'No aliases — use the slash command shown above.'}
                </dd>
              </div>
            </dl>
          </div>
        )}
      </dialog>
    </>
  );
}
