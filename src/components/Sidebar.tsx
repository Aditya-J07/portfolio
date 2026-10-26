import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { backgroundEffect, setBackgroundEffect } = useTheme();

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
            className="fixed top-0 right-0 h-full w-80 max-w-full bg-surface-1 border-l-4 border-border shadow-[-8px_0px_0px_var(--shadow)] z-50 overflow-y-auto p-5 flex flex-col justify-between"
          >
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b-4 border-border mb-5">
                <div className="flex items-center gap-2">
                  <span className="font-pixel text-[10px] bg-surface-deep text-accent-yellow px-2 py-1 border-2 border-border">
                    NAV
                  </span>
                  <h2 className="font-heading text-lg text-ink uppercase">Menu</h2>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="w-9 h-9 bg-surface-2 border-2 border-border text-ink hover:bg-accent-red hover:text-white transition-colors flex items-center justify-center shadow-[2px_2px_0px_var(--shadow)] cursor-pointer"
                  aria-label="Close menu"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Theme & Display Options */}
              <div className="mb-5 space-y-3 bg-surface-2 p-3.5 border-3 border-border shadow-brutal-sm">
                <div className="font-pixel text-[10px] text-ink uppercase flex items-center gap-2 font-bold">
                  <span>Theme</span>
                </div>
                <ThemeToggle />

                {/* Background Effect Toggle */}
                <div className="pt-2.5 border-t-2 border-border/20 flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="bg-effect"
                    checked={backgroundEffect}
                    onChange={(e) => setBackgroundEffect(e.target.checked)}
                    className="w-4 h-4 border-2 border-border text-accent-yellow focus:ring-0 cursor-pointer"
                  />
                  <label
                    htmlFor="bg-effect"
                    className="font-pixel text-[9px] text-ink uppercase cursor-pointer select-none"
                  >
                    Dot Grid: {backgroundEffect ? 'ON' : 'OFF'}
                  </label>
                </div>
              </div>

              {/* Navigation Links */}
              <nav className="space-y-1.5 mb-5">
                <div className="font-pixel text-[9px] text-ink/70 uppercase mb-1.5">
                  // Navigation
                </div>
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={onClose}
                    className="block px-3.5 py-2.5 bg-surface-2 text-ink hover:bg-accent-yellow hover:text-accent-ink border-2 border-border font-pixel text-[10px] uppercase transition-all shadow-[2px_2px_0px_var(--shadow)] hover:translate-x-1"
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Extra Links at bottom of sidebar */}
            <div className="space-y-2 border-t-3 border-border pt-4 mt-auto">
              <div className="font-pixel text-[9px] text-ink/70 uppercase mb-1.5">// Links</div>

              <a
                href="/resume/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="block px-3.5 py-2.5 bg-surface-deep text-accent-yellow hover:bg-accent-yellow hover:text-accent-ink border-2 border-border font-pixel text-[9px] uppercase transition-all shadow-[2px_2px_0px_var(--shadow)]"
              >
                📄 Resume (PDF) ↗
              </a>

              <Link
                to="/snake"
                onClick={onClose}
                className="block px-3.5 py-2.5 bg-surface-deep text-accent-green hover:bg-accent-green hover:text-accent-ink border-2 border-border font-pixel text-[9px] uppercase transition-all shadow-[2px_2px_0px_var(--shadow)]"
              >
                🎮 Snake Game ↗
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
