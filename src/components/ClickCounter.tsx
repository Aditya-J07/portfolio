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
    <div className="h-full bg-surface-1 border-4 border-border p-5 shadow-brutal flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between pb-3 border-b-2 border-border/30 mb-3">
          <div className="flex items-center gap-2 font-heading text-lg text-ink">
            <MousePointerClick size={20} className="text-accent-red" />
            <span>Click Counter</span>
          </div>
          <span className="font-pixel text-[8px] bg-surface-deep text-accent-yellow px-1.5 py-0.5 border border-border">
            INTERACTIVE
          </span>
        </div>
        <p className="font-body text-xs text-ink/80 mb-3 leading-relaxed">
          Smash the arcade button to rack up interactive activations.
        </p>
      </div>

      <div className="my-auto py-3">
        <button
          type="button"
          onClick={handleClick}
          className={`w-full py-3.5 px-4 font-pixel text-xs sm:text-sm uppercase font-bold border-3 border-border transition-all select-none cursor-pointer flex items-center justify-center gap-2 ${
            isAnimating
              ? 'bg-accent-green text-accent-ink translate-x-1 translate-y-1 shadow-none'
              : 'bg-accent-yellow text-accent-ink shadow-[4px_4px_0px_var(--shadow)] hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5'
          }`}
        >
          <MousePointer className="w-4 h-4" />
          <span>CLICK ME!</span>
        </button>
      </div>

      <div className="pt-3 border-t-2 border-border/20 mt-auto">
        <motion.div
          key={clicks}
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          className="bg-surface-2 border-2 border-border p-2.5 shadow-[2px_2px_0px_var(--shadow)] flex items-center justify-between"
        >
          <span className="font-pixel text-[8px] uppercase text-ink/70">
            Total Activations
          </span>
          <span className="font-pixel text-sm text-accent-ink font-bold">
            {clicks.toLocaleString()}
          </span>
        </motion.div>
      </div>
    </div>
  );
}

