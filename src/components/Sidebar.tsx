import { motion, AnimatePresence } from 'framer-motion';
import { X, Check } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { Link } from 'react-router-dom';

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
    const { theme, setTheme, accent, setAccent, backgroundEffect, setBackgroundEffect } = useTheme();

    const themes = ['latte', 'frappe', 'mocha'] as const;
    const accents = [
        'rosewater', 'flamingo', 'pink', 'mauve', 'red', 'maroon', 'peach',
        'yellow', 'green', 'teal', 'sky', 'sapphire', 'blue', 'lavender'
    ] as const;

    const navItems = [
        { name: 'About', path: '/about' },
        { name: 'Projects', path: '/projects' },
        { name: 'Pics', path: '/pics' }, // Placeholder for future
    ];

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                    />

                    {/* Sidebar Panel */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                        className="fixed top-0 right-0 h-full w-80 bg-base border-l border-surface0 shadow-2xl z-50 overflow-y-auto p-6"
                    >
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-xl font-bold font-mono text-accent">Navigation</h2>
                            <button
                                onClick={onClose}
                                className="p-2 text-subtext0 hover:text-accent transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Theme Section */}
                        <div className="mb-8 space-y-4">
                            <div className="flex items-center gap-2 text-text font-bold text-sm">
                                <span>🎨 Theme</span>
                            </div>

                            {/* Theme Toggles */}
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

                            {/* Accent Colors */}
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

                            {/* Background Effect Toggle */}
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="bg-effect"
                                    checked={backgroundEffect}
                                    onChange={(e) => setBackgroundEffect(e.target.checked)}
                                    className="rounded border-surface1 bg-surface0 text-accent focus:ring-accent"
                                />
                                <label htmlFor="bg-effect" className="text-sm text-subtext0">Background effect: {backgroundEffect ? 'on' : 'off'}</label>
                            </div>
                        </div>

                        {/* Navigation Links */}
                        <nav className="space-y-2 mb-8 border-t border-surface0 pt-6">
                            {navItems.map((item) => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    onClick={onClose}
                                    className="block py-2 text-lg font-mono text-subtext0 hover:text-accent hover:pl-2 transition-all"
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </nav>

                        {/* More Section */}
                        <div className="space-y-4 border-t border-surface0 pt-6">
                            <h3 className="text-xs font-bold text-subtext1 uppercase tracking-wider">More</h3>

                            <a
                                href="/resume/resume.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block py-2 font-mono text-subtext0 hover:text-accent hover:pl-2 transition-all"
                            >
                                Resume
                            </a>

                            <Link
                                to="/snake"
                                onClick={onClose}
                                className="block py-2 font-mono text-subtext0 hover:text-accent hover:pl-2 transition-all"
                            >
                                Snake Game 🐍
                            </Link>
                        </div>

                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
