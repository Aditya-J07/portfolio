import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Terminal, MoreHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from './Sidebar';
import ThemeToggle from './ThemeToggle';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Projects', path: '/projects' },
  { name: 'About', path: '/about' },
  { name: 'Pics', path: '/pics' },
  { name: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-40 bg-surface-1 border-b-4 border-border shadow-brutal-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo & HUD Status */}
            <div className="flex items-center gap-3">
              <Link to="/" className="flex items-center gap-2 group select-none">
                <div className="w-9 h-9 sm:w-10 sm:h-10 bg-surface-deep border-3 border-border flex items-center justify-center shadow-[2px_2px_0px_var(--shadow)] group-hover:bg-accent-yellow transition-colors">
                  <Terminal className="w-5 h-5 text-accent-yellow group-hover:text-accent-ink" />
                </div>
                <div>
                  <span className="font-heading text-base sm:text-lg text-ink group-hover:text-focus transition-colors block leading-tight">
                    ~/aditya
                  </span>
                  <span className="font-pixel text-[8px] text-accent-green flex items-center gap-1">
                    <span className="inline-block w-1.5 h-1.5 bg-accent-green" />
                    LVL 20 DEV
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-3 lg:gap-4">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`font-pixel text-[11px] uppercase px-3 py-2 border-2 transition-all select-none ${
                      isActive
                        ? 'bg-accent-yellow text-accent-ink border-border font-bold shadow-[2px_2px_0px_var(--shadow)] -translate-y-0.5'
                        : 'bg-surface-2 text-ink border-transparent hover:border-border hover:bg-surface-1 hover:-translate-y-0.5'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}

              <button
                type="button"
                onClick={() => setIsSidebarOpen(true)}
                className="font-pixel text-[11px] uppercase px-3 py-2 bg-surface-2 text-ink border-2 border-transparent hover:border-border hover:bg-surface-1 transition-all flex items-center gap-1 select-none"
              >
                More...
              </button>

              {/* Theme Toggle HUD */}
              <div className="ml-2 pl-2 border-l-2 border-border/30">
                <ThemeToggle compact />
              </div>
            </div>

            {/* Mobile Menu & Theme Buttons */}
            <div className="md:hidden flex items-center gap-2">
              <ThemeToggle compact />
              <button
                type="button"
                onClick={() => setIsSidebarOpen(true)}
                className="p-2 min-h-[44px] min-w-[44px] bg-surface-2 border-2 border-border text-ink hover:bg-accent-yellow hover:text-accent-ink transition-colors flex items-center justify-center shadow-[2px_2px_0px_var(--shadow)]"
                aria-label="Open sidebar"
              >
                <MoreHorizontal className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 min-h-[44px] min-w-[44px] bg-surface-2 border-2 border-border text-ink hover:bg-accent-yellow hover:text-accent-ink transition-colors flex items-center justify-center shadow-[2px_2px_0px_var(--shadow)]"
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
              >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-surface-1 border-t-4 border-border px-4 py-4 space-y-2 shadow-brutal"
            >
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`block font-pixel text-xs uppercase px-4 py-3 border-3 transition-all ${
                      isActive
                        ? 'bg-accent-yellow text-accent-ink border-border font-bold shadow-[3px_3px_0px_var(--shadow)]'
                        : 'bg-surface-2 text-ink border-border hover:bg-surface-1'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Sidebar Component */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </>
  );
}
