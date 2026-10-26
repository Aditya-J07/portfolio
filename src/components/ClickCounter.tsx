import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MousePointer, MousePointerClick } from 'lucide-react';

const STORAGE_KEY = 'portfolio-global-clicks';

interface ClickParticle {
  id: number;
  x: number;
  y: number;
  dx: number;
  dy: number;
  size: number;
  color: string;
  rotate: number;
  text?: string;
}

const PARTICLE_COLORS = ['#FFD93D', '#6BCB77', '#FF6B6B', '#4D96FF', '#FFA116', '#9D4EDD'];

export default function ClickCounter() {
  const [clicks, setClicks] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [particles, setParticles] = useState<ClickParticle[]>([]);

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

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const newClicks = clicks + 1;
    setClicks(newClicks);
    try {
      localStorage.setItem(STORAGE_KEY, newClicks.toString());
    } catch {
      // ignore
    }
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 150);

    // Spawn burst particles
    const rect = e.currentTarget.getBoundingClientRect();
    const parent = e.currentTarget.parentElement?.getBoundingClientRect();
    const originX = parent ? e.clientX - parent.left : rect.width / 2;
    const originY = parent ? e.clientY - parent.top : rect.height / 2;

    const newBatch: ClickParticle[] = [];
    const timestamp = Date.now();

    // Floating '+1' particle
    newBatch.push({
      id: timestamp + Math.random(),
      x: originX,
      y: originY - 12,
      dx: (Math.random() - 0.5) * 16,
      dy: -42 - Math.random() * 18,
      size: 14,
      color: '#6BCB77',
      rotate: (Math.random() - 0.5) * 20,
      text: '+1',
    });

    // 10 colorful pixel spark particles
    const count = 10;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.5;
      const distance = 28 + Math.random() * 42;
      newBatch.push({
        id: timestamp + i + Math.random(),
        x: originX,
        y: originY,
        dx: Math.cos(angle) * distance,
        dy: Math.sin(angle) * distance + 6,
        size: 5 + Math.floor(Math.random() * 5),
        color: PARTICLE_COLORS[i % PARTICLE_COLORS.length],
        rotate: Math.random() * 360,
      });
    }

    setParticles((prev) => [...prev.slice(-20), ...newBatch]);

    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => !newBatch.some((nb) => nb.id === p.id)));
    }, 700);
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

      <div className="my-auto py-3 relative overflow-visible">
        {/* Particle Overlay */}
        <AnimatePresence>
          {particles.map((p) => (
            <motion.div
              key={p.id}
              initial={{
                x: p.x,
                y: p.y,
                opacity: 1,
                scale: p.text ? 1.2 : 1,
                rotate: 0,
              }}
              animate={{
                x: p.x + p.dx,
                y: p.y + p.dy,
                opacity: 0,
                scale: p.text ? 1.4 : 0.2,
                rotate: p.rotate,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.65, ease: 'easeOut' }}
              className="pointer-events-none absolute select-none z-30"
              style={{
                left: 0,
                top: 0,
              }}
            >
              {p.text ? (
                <span
                  className="font-pixel font-bold text-xs px-1 border border-border shadow-[1px_1px_0px_#000]"
                  style={{
                    backgroundColor: p.color,
                    color: '#000',
                  }}
                >
                  {p.text}
                </span>
              ) : (
                <div
                  style={{
                    width: `${p.size}px`,
                    height: `${p.size}px`,
                    backgroundColor: p.color,
                  }}
                  className="border border-border/80 shadow-[1px_1px_0px_#000]"
                />
              )}
            </motion.div>
          ))}
        </AnimatePresence>

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


