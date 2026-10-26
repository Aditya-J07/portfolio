import { useTheme, type Theme } from '../context/ThemeContext';

interface ThemeOption {
  id: Theme;
  label: string;
  icon: string;
  desc: string;
}

const THEME_OPTIONS: ThemeOption[] = [
  { id: 'light', label: 'LIGHT', icon: '☀️', desc: 'Overworld Sky' },
  { id: 'middle', label: 'STONE', icon: '🪨', desc: 'Canon Parchment' },
  { id: 'dark', label: 'DARK', icon: '🌙', desc: 'Bedrock Cave' },
];

interface ThemeToggleProps {
  compact?: boolean;
}

export default function ThemeToggle({ compact = false }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();

  if (compact) {
    return (
      <div
        role="radiogroup"
        aria-label="Theme selector"
        className="inline-flex items-center p-0.5 bg-surface-deep border-2 border-border shadow-[2px_2px_0px_var(--shadow)] gap-0.5"
      >
        {THEME_OPTIONS.map((opt) => {
          const isActive = theme === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              role="radio"
              aria-checked={isActive}
              aria-label={opt.desc}
              title={`${opt.label}: ${opt.desc}`}
              onClick={() => setTheme(opt.id)}
              className={`w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-xs transition-all select-none cursor-pointer ${
                isActive
                  ? 'bg-accent-yellow text-accent-ink border-2 border-border font-bold shadow-[1px_1px_0px_var(--shadow)] -translate-y-0.5'
                  : 'bg-surface-1 text-ink border-2 border-transparent hover:bg-surface-2 hover:border-border/60'
              }`}
            >
              <span aria-hidden="true">{opt.icon}</span>
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div
      role="radiogroup"
      aria-label="Theme selector"
      className="space-y-1.5 w-full"
    >
      {THEME_OPTIONS.map((opt) => {
        const isActive = theme === opt.id;
        return (
          <button
            key={opt.id}
            type="button"
            role="radio"
            aria-checked={isActive}
            aria-label={`${opt.label} - ${opt.desc}`}
            title={`${opt.label}: ${opt.desc}`}
            onClick={() => setTheme(opt.id)}
            className={`w-full flex items-center justify-between px-3 py-2 border-2 transition-all select-none cursor-pointer ${
              isActive
                ? 'bg-accent-yellow text-accent-ink border-border font-bold shadow-[2px_2px_0px_var(--shadow)] -translate-y-0.5'
                : 'bg-surface-1 text-ink border-border/40 hover:border-border hover:bg-surface-2'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <span className="text-base shrink-0 select-none" aria-hidden="true">
                {opt.icon}
              </span>
              <span className="font-pixel text-[9px] uppercase tracking-wide font-bold">
                {opt.label}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[8px] opacity-75">
                {opt.desc}
              </span>
              {isActive && (
                <span className="font-pixel text-[7px] bg-surface-deep text-accent-yellow px-1.5 py-0.5 border border-border">
                  ON
                </span>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}
