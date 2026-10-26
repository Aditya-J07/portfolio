import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

interface GameProps {
  game: {
    name: string;
    description: string;
    tech: string[];
    playUrl: string;
    embedUrl?: string;
  };
  index: number;
}

export default function GameCard({ game, index }: GameProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="enchanted-card group relative flex flex-col justify-between bg-surface-1 border-4 border-border p-5 shadow-brutal transition-transform hover:-translate-y-1"
    >
      <div>
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-accent-purple border-3 border-border flex items-center justify-center text-2xl shadow-[2px_2px_0px_var(--shadow)] select-none">
              🎮
            </div>
            <div>
              <span className="inline-block font-pixel text-[8px] uppercase px-2 py-0.5 bg-accent-yellow text-accent-ink border-2 border-border mb-1 font-bold">
                ITCH.IO LOOT
              </span>
              <h3 className="font-heading text-lg text-ink leading-tight group-hover:text-focus transition-colors">
                {game.name}
              </h3>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="font-body text-ink text-sm mb-4 line-clamp-3 leading-relaxed">
          {game.description}
        </p>

        {/* Optional Embed or Frame */}
        {game.embedUrl && (
          <div className="mb-4 overflow-hidden border-3 border-border bg-surface-deep shadow-inner p-1">
            <iframe
              src={game.embedUrl}
              width="208"
              height="167"
              frameBorder="0"
              className="mx-auto block"
              title={game.name}
            >
              <a href={game.playUrl}>{game.name}</a>
            </iframe>
          </div>
        )}

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {game.tech.map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 bg-surface-2 text-ink font-mono text-xs border-2 border-border font-medium shadow-[1px_1px_0px_var(--shadow)]"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Play Action Button */}
      <div className="pt-3 border-t-3 border-border/30 mt-auto">
        <a
          href={game.playUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full min-h-[44px] px-3 py-2.5 bg-accent-green text-accent-ink border-3 border-border font-pixel text-[10px] uppercase flex items-center justify-center gap-2 hover:bg-accent-yellow transition-all shadow-[2px_2px_0px_var(--shadow)] active:translate-x-0.5 active:translate-y-0.5"
        >
          <ExternalLink size={14} />
          <span>Play on itch.io ↗</span>
        </a>
      </div>
    </motion.div>
  );
}
