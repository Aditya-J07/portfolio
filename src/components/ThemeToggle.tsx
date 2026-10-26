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

  return (
    <div
      role="radiogroup"
      aria-label="Theme selector"
      className="inline-flex items-center p-1 bg-surface-deep border-3 border-border shadow-brutal-sm gap-1"
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
            onClick={() => setTheme(opt.id)}
            className={`min-h-[36px] sm:min-h-[40px] px-2 sm:px-3 py-1 font-pixel text-[9px] sm:text-[10px] uppercase flex items-center gap-1.5 transition-all select-none ${
              isActive
                ? 'bg-accent-yellow text-accent-ink border-2 border-border font-bold shadow-[2px_2px_0px_var(--shadow)] -translate-y-0.5'
                : 'bg-surface-1 text-ink border-2 border-transparent hover:bg-surface-2 hover:-translate-y-0.5'
            }`}
          >
            <span className="text-xs" aria-hidden="true">
              {opt.icon}
            </span>
            {!compact && <span className="hidden xs:inline">{opt.label}</span>}
          </button>
        );
      })}
    </div>
  );
}
