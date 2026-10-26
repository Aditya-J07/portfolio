import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function XPBar() {
  const barRef = useRef<HTMLDivElement>(null);
  const runnerRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!barRef.current || !badgeRef.current || !runnerRef.current) return;

    const setScaleX = gsap.quickSetter(barRef.current, 'scaleX');
    const setRunnerX = gsap.quickSetter(runnerRef.current, 'xPercent');

    const updateProgress = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? Math.min(1, Math.max(0, scrollY / maxScroll)) : 0;
      const percent = Math.round(progress * 100);

      // Fast GPU updates via quickSetter
      setScaleX(progress);
      setRunnerX(progress * 100);

      // Direct DOM update without triggering React state re-render
      if (badgeRef.current) {
        badgeRef.current.textContent = `LVL 20 [${String(percent).padStart(2, '0')}%]`;
      }
    };

    // Scroll listener / trigger
    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();

    return () => {
      window.removeEventListener('scroll', updateProgress);
    };
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 h-5 bg-surface-deep border-b-2 border-border shadow-[0px_2px_0px_var(--shadow)] select-none pointer-events-none"
      role="progressbar"
      aria-label="Player XP Progress"
    >
      {/* Background track ticks */}
      <div className="absolute inset-0 flex justify-between px-2 opacity-30">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="w-0.5 h-full bg-border-on-deep" />
        ))}
      </div>

      {/* Segmented XP Fill Bar */}
      <div
        ref={barRef}
        className="h-full bg-accent-green origin-left border-r-2 border-border"
        style={{ transform: 'scaleX(0)', willChange: 'transform' }}
      />

      {/* Traveling Pixel Miner Runner */}
      <div
        ref={runnerRef}
        className="absolute top-0 left-0 -mt-0.5 text-xs select-none pointer-events-none transition-transform"
        style={{ transform: 'translateX(0)', willChange: 'transform' }}
        aria-hidden="true"
      >
        ⛏️
      </div>

      {/* Level Badge Pill in Top Right */}
      <div className="absolute top-0 right-3 h-full flex items-center">
        <span
          ref={badgeRef}
          className="font-pixel text-[8px] tracking-wider text-accent-yellow bg-surface-deep px-1.5 border-x border-border font-bold pointer-events-auto"
        >
          LVL 20 [00%]
        </span>
      </div>
    </div>
  );
}
