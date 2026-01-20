import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'latte' | 'frappe' | 'macchiato' | 'mocha';
type AccentColor =
    | 'rosewater'
    | 'flamingo'
    | 'pink'
    | 'mauve'
    | 'red'
    | 'maroon'
    | 'peach'
    | 'yellow'
    | 'green'
    | 'teal'
    | 'sky'
    | 'sapphire'
    | 'blue'
    | 'lavender';

interface ThemeContextType {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    accent: AccentColor;
    setAccent: (accent: AccentColor) => void;
    backgroundEffect: boolean;
    setBackgroundEffect: (enabled: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setThemeState] = useState<Theme>(() => {
        const saved = localStorage.getItem('theme');
        return (saved as Theme) || 'mocha';
    });

    const [accent, setAccentState] = useState<AccentColor>(() => {
        const saved = localStorage.getItem('accent');
        return (saved as AccentColor) || 'peach';
    });

    const [backgroundEffect, setBackgroundEffect] = useState(true);

    useEffect(() => {
        const root = document.documentElement;
        root.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    useEffect(() => {
        const root = document.documentElement;
        // Update the CSS variable for the accent color
        root.style.setProperty('--current-accent-color', `var(--color-${accent})`);
        localStorage.setItem('accent', accent);
    }, [accent]);

    const setTheme = (newTheme: Theme) => {
        setThemeState(newTheme);
    };

    const setAccent = (newAccent: AccentColor) => {
        setAccentState(newAccent);
    };

    return (
        <ThemeContext.Provider value={{
            theme,
            setTheme,
            accent,
            setAccent,
            backgroundEffect,
            setBackgroundEffect
        }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}
