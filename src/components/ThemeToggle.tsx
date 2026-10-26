import { useTheme, type Theme } from '../context/ThemeContext';

interface ThemeOption {
  id: Theme;
  label: string;
  icon: string;
  title: string;
}

const THEME_OPTIONS: ThemeOption[] = [
  { id: 'light', label: 'LIGHT', icon: '☀️', title: 'Overworld Sky Blue' },
  { id: 'middle', label: 'STONE', icon: '🪨', title: 'Canon Stone & Parchment' },
  { id: 'dark', label: 'DARK', icon: '🌙', title: 'Night Bedrock Cave' },
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
              aria-label={opt.title}
              title={opt.title}
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
      className="w-full grid grid-cols-3 gap-1.5 p-1 bg-surface-deep border-3 border-border shadow-brutal-sm"
    >
      {THEME_OPTIONS.map((opt) => {
        const isActive = theme === opt.id;
        return (
          <button
            key={opt.id}
            type="button"
            role="radio"
            aria-checked={isActive}
            aria-label={opt.title}
            title={opt.title}
            onClick={() => setTheme(opt.id)}
            className={`min-h-[36px] py-1 px-1.5 font-pixel text-[9px] uppercase flex items-center justify-center gap-1 transition-all select-none cursor-pointer truncate ${
              isActive
                ? 'bg-accent-yellow text-accent-ink border-2 border-border font-bold shadow-[2px_2px_0px_var(--shadow)] -translate-y-0.5'
                : 'bg-surface-1 text-ink border-2 border-transparent hover:bg-surface-2 hover:border-border/60'
            }`}
          >
            <span className="text-xs shrink-0" aria-hidden="true">
              {opt.icon}
            </span>
            <span className="truncate">{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
}
