import { useTheme, type Theme } from '../context/ThemeContext';

interface ThemeItem {
  id: Theme;
  name: string;
  desc: string;
  icon: string;
}

const THEMES: ThemeItem[] = [
  { id: 'light', name: 'LIGHT', desc: 'Overworld Sky', icon: '☀️' },
  { id: 'middle', name: 'STONE', desc: 'Canon Parchment', icon: '🪨' },
  { id: 'dark', name: 'DARK', desc: 'Bedrock Cave', icon: '🌙' },
];

export default function ThemeSelector() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="space-y-2 w-full">
      <div className="font-pixel text-[9px] text-ink/70 uppercase tracking-wider flex items-center justify-between pb-1 border-b border-border/20">
        <span>World Slots</span>
        <span className="text-accent-yellow font-bold uppercase">{theme}</span>
      </div>

      <div className="space-y-2">
        {THEMES.map((t) => {
          const isActive = theme === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setTheme(t.id)}
              className={`w-full flex items-center justify-between px-3 py-2 border-2 transition-all cursor-pointer text-left select-none ${
                isActive
                  ? 'bg-accent-yellow text-accent-ink border-border font-bold shadow-[2px_2px_0px_var(--shadow)] -translate-y-0.5'
                  : 'bg-surface-2 text-ink border-border/40 hover:border-border hover:bg-surface-1 hover:-translate-y-0.5'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="text-base select-none shrink-0" aria-hidden="true">
                  {t.icon}
                </span>
                <div className="truncate">
                  <div className="font-pixel text-[9px] uppercase leading-none truncate font-bold">
                    {t.name}
                  </div>
                  <div className="font-mono text-[8px] opacity-75 mt-0.5 truncate">
                    {t.desc}
                  </div>
                </div>
              </div>

              {isActive ? (
                <span className="font-pixel text-[7px] bg-surface-deep text-accent-yellow px-1.5 py-0.5 border border-border shrink-0 ml-1">
                  ON
                </span>
              ) : (
                <span className="font-pixel text-[7px] text-ink/40 shrink-0 ml-1">
                  SET
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
