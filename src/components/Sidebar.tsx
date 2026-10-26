import { motion, AnimatePresence } from 'framer-motion';
import { X, Check } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { accent, setAccent, backgroundEffect, setBackgroundEffect } = useTheme();

  const accents = [
    'rosewater',
    'flamingo',
    'pink',
    'mauve',
    'red',
    'maroon',
    'peach',
    'yellow',
    'green',
    'teal',
    'sky',
    'sapphire',
    'blue',
    'lavender',
  ] as const;

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Projects', path: '/projects' },
    { name: 'Pics', path: '/pics' },
    { name: 'Contact', path: '/contact' },
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
            className="fixed inset-0 bg-black/60 z-50 backdrop-blur-[2px]"
          />

          {/* Sidebar Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-84 max-w-full bg-surface-1 border-l-4 border-border shadow-[-8px_0px_0px_var(--shadow)] z-50 overflow-y-auto p-6"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b-4 border-border mb-6">
              <div className="flex items-center gap-2">
                <span className="font-pixel text-xs bg-surface-deep text-accent-yellow px-2 py-1 border-2 border-border">
                  [ESC]
                </span>
                <h2 className="font-heading text-lg text-ink uppercase">Pause Menu</h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="w-10 h-10 bg-surface-2 border-3 border-border text-ink hover:bg-accent-red hover:text-white transition-colors flex items-center justify-center shadow-[2px_2px_0px_var(--shadow)] cursor-pointer"
                aria-label="Close sidebar"
              >
                <X size={20} />
              </button>
            </div>

            {/* Theme Section */}
            <div className="mb-6 space-y-3 bg-surface-2 p-4 border-3 border-border shadow-brutal-sm">
              <div className="font-pixel text-[10px] text-ink uppercase flex items-center gap-2 font-bold">
                <span>🎨 World Theme</span>
              </div>
              <ThemeToggle />

              {/* Background Effect Toggle */}
              <div className="pt-3 border-t-2 border-border/20 flex items-center gap-3">
                <input
                  type="checkbox"
                  id="bg-effect"
                  checked={backgroundEffect}
                  onChange={(e) => setBackgroundEffect(e.target.checked)}
                  className="w-5 h-5 border-2 border-border text-accent-yellow focus:ring-0 cursor-pointer"
                />
                <label
                  htmlFor="bg-effect"
                  className="font-pixel text-[9px] text-ink uppercase cursor-pointer select-none"
                >
                  Dot Glow Grid: {backgroundEffect ? 'ON' : 'OFF'}
                </label>
              </div>
            </div>

            {/* Accent Color Palette */}
            <div className="mb-6 bg-surface-2 p-4 border-3 border-border shadow-brutal-sm">
              <div className="font-pixel text-[10px] text-ink uppercase mb-3 font-bold">
                <span>✦ Dye Accent</span>
              </div>
              <div className="grid grid-cols-7 gap-2">
                {accents.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setAccent(c)}
                    className="w-7 h-7 border-2 border-border flex items-center justify-center transition-transform hover:scale-110 shadow-[1px_1px_0px_var(--shadow)] cursor-pointer"
                    style={{ backgroundColor: `var(--color-${c})` }}
                    title={c}
                    aria-label={`Select ${c} accent`}
                  >
                    {accent === c && <Check size={12} className="text-black stroke-[3]" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Navigation Links */}
            <nav className="space-y-2 mb-6">
              <div className="font-pixel text-[10px] text-ink/70 uppercase mb-2">
                // Fast Travel
              </div>
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className="block px-4 py-3 bg-surface-2 text-ink hover:bg-accent-yellow hover:text-accent-ink border-3 border-border font-pixel text-[11px] uppercase transition-all shadow-[3px_3px_0px_var(--shadow)] hover:translate-x-1"
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Extra Quests & Easter Eggs */}
            <div className="space-y-2 border-t-4 border-border pt-6">
              <div className="font-pixel text-[10px] text-ink/70 uppercase mb-2">
                // Secret Quests
              </div>

              <a
                href="/resume/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="block px-4 py-3 bg-surface-deep text-accent-yellow hover:bg-accent-yellow hover:text-accent-ink border-3 border-border font-pixel text-[10px] uppercase transition-all shadow-[3px_3px_0px_var(--shadow)]"
              >
                📜 Player Resume (PDF) ↗
              </a>

              <Link
                to="/snake"
                onClick={onClose}
                className="block px-4 py-3 bg-surface-deep text-accent-green hover:bg-accent-green hover:text-accent-ink border-3 border-border font-pixel text-[10px] uppercase transition-all shadow-[3px_3px_0px_var(--shadow)]"
              >
                🐍 Retro Arcade Snake ↗
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
