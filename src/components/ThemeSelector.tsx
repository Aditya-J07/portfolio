import { Check } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function ThemeSelector() {
    const { theme, setTheme, accent, setAccent } = useTheme();

    const themes = ['latte', 'frappe', 'mocha'] as const;
    const accents = [
        'rosewater', 'flamingo', 'pink', 'mauve', 'red', 'maroon', 'peach',
        'yellow', 'green', 'teal', 'sky', 'sapphire', 'blue', 'lavender'
    ] as const;

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-3 gap-1 bg-surface0 p-1 rounded-lg">
                {themes.map((t) => (
                    <button
                        key={t}
                        onClick={() => setTheme(t)}
                        className={`px-2 py-1.5 rounded-md text-xs font-medium capitalize transition-all ${theme === t
                            ? 'bg-surface2 text-text shadow-sm'
                            : 'text-subtext0 hover:text-text'
                            }`}
                    >
                        {t}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-7 gap-2">
                {accents.map((c) => (
                    <button
                        key={c}
                        onClick={() => setAccent(c)}
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform hover:scale-110`}
                        style={{ backgroundColor: `var(--color-${c})` }}
                        title={c}
                    >
                        {accent === c && <Check size={14} className="text-base font-bold" />}
                    </button>
                ))}
            </div>
        </div>
    );
}
