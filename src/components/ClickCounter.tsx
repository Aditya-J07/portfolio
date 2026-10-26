import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MousePointer, MousePointerClick } from 'lucide-react';

const STORAGE_KEY = 'portfolio-global-clicks';

export default function ClickCounter() {
  const [clicks, setClicks] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setClicks(parseInt(stored, 10));
      }
    } catch {
      // ignore
    }
  }, []);

  const handleClick = () => {
    const newClicks = clicks + 1;
    setClicks(newClicks);
    try {
      localStorage.setItem(STORAGE_KEY, newClicks.toString());
    } catch {
      // ignore
    }
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 150);
  };

  return (
    <div className="bg-surface-1 border-4 border-border p-5 text-center shadow-brutal">
      <div className="flex items-center justify-between mb-4 border-b-2 border-border/30 pb-2">
        <span className="font-pixel text-[9px] uppercase text-ink flex items-center gap-1.5 font-bold">
          <MousePointerClick className="text-accent-red w-4 h-4" />
          Clicker Quest
        </span>
        <span className="font-pixel text-[8px] bg-surface-deep text-accent-yellow px-1.5 py-0.5 border border-border">
          EASTER EGG
        </span>
      </div>

      <button
        type="button"
        onClick={handleClick}
        className={`w-full py-4 min-h-[52px] font-pixel text-xs sm:text-sm uppercase font-bold border-4 border-border transition-all select-none cursor-pointer flex items-center justify-center gap-2 ${
          isAnimating
            ? 'bg-accent-green text-accent-ink translate-x-1 translate-y-1 shadow-none'
            : 'bg-accent-yellow text-accent-ink shadow-brutal hover:-translate-y-0.5'
        }`}
      >
        <MousePointer className="w-4 h-4" />
        CLICK PRESSURE PLATE
      </button>

      <motion.div
        key={clicks}
        initial={{ scale: 1.15 }}
        animate={{ scale: 1 }}
        className="mt-4 font-mono"
      >
        <span className="text-ink/80 text-xs">Total Activations: </span>
        <span className="text-2xl font-heading text-ink ml-1 block mt-1">
          {clicks.toLocaleString()}
        </span>
      </motion.div>
    </div>
  );
}
