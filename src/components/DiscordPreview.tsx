import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';

export function DiscordPreview({
  response = '@User nice try. unfortunately I have eyes.',
  live = true,
}: {
  response?: string;
  live?: boolean;
}) {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    if (!live) return;
    const timer = window.setInterval(() => setPhase((value) => (value + 1) % 3), 2200);
    return () => window.clearInterval(timer);
  }, [live]);

  return (
    <div className="discord-preview" aria-label="Preview Discord del filtro parole">
      <div className="discord-preview-bar">
        <span />
        <span />
        <span />
        <b># general</b>
      </div>
      <div className="discord-chat">
        <AnimatePresence mode="popLayout">
          {phase < 1 && (
            <motion.div
              className="discord-message muted-message"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: 24, filter: 'blur(4px)' }}
            >
              <div className="discord-avatar user-avatar">U</div>
              <div>
                <strong>User</strong>
                <small> today at 18:42</small>
                <p>[blocked word]</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {phase >= 1 && (
            <motion.div
              className="deleted-line"
              initial={{ opacity: 0, scaleX: 0.6 }}
              animate={{ opacity: 1, scaleX: 1 }}
            >
              message intercepted · 34ms
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {phase >= 2 && (
            <motion.div
              className="discord-message"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="discord-avatar bot-avatar">.z</div>
              <div>
                <strong>
                  .zwd <em>APP</em>
                </strong>
                <small> today at 18:42</small>
                <p>{response}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="discord-input">Message #general</div>
    </div>
  );
}
