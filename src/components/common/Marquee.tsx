import { useEffect, useRef } from 'react';

interface MarqueeProps {
  className?: string;
}

export default function Marquee({ className = '' }: MarqueeProps) {
  const track1Ref = useRef<HTMLDivElement>(null);
  const track2Ref = useRef<HTMLDivElement>(null);

  const row1Items = [
    'FULL-STACK DEVELOPER',
    'GAME DESIGNER',
    'GODOT ENGINE',
    'REACT & TYPESCRIPT',
    'PIXEL CRAFTER',
    'AI & ML RESEARCH',
    'VOXEL ARCHITECT',
    'NEO-BRUTALIST UI',
  ];

  const row2Items = [
    'BUILDING IMMERSIVE EXPERIENCES',
    'SIDDAGANGA INSTITUTE OF TECHNOLOGY',
    '4 PUBLISHED GAMES ON ITCH.IO',
    'HACKATHON FINALIST & BUILDER',
    'OPEN SOURCE ENTHUSIAST',
    'DECODERS & PATHFINDER LEAD',
  ];

  useEffect(() => {
    const track1 = track1Ref.current;
    const track2 = track2Ref.current;
    if (!track1 || !track2) return;

    let targetScroll = window.scrollY;
    let currentScroll = window.scrollY;
    let rafId: number | null = null;
    let isRunning = false;

    const render = () => {
      const diff = targetScroll - currentScroll;
      currentScroll += diff * 0.12;

      const halfWidth1 = track1.scrollWidth / 2;
      const halfWidth2 = track2.scrollWidth / 2;

      if (halfWidth1 > 0) {
        // Move track 1 left with scroll
        const x1 = -((currentScroll * 1.6) % halfWidth1);
        track1.style.transform = `translate3d(${x1.toFixed(1)}px, 0, 0)`;
      }

      if (halfWidth2 > 0) {
        // Move track 2 right with scroll
        const x2 = -halfWidth2 + ((currentScroll * 1.6) % halfWidth2);
        track2.style.transform = `translate3d(${x2.toFixed(1)}px, 0, 0)`;
      }

      // If settled close enough, stop rAF to save 0% CPU
      if (Math.abs(diff) > 0.1) {
        rafId = requestAnimationFrame(render);
      } else {
        currentScroll = targetScroll;
        isRunning = false;
        rafId = null;
      }
    };

    const handleScroll = () => {
      targetScroll = window.scrollY;
      if (!isRunning) {
        isRunning = true;
        rafId = requestAnimationFrame(render);
      }
    };

    // Initial positioning
    render();

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      className={`relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen max-w-[100vw] overflow-hidden bg-surface-deep border-y-4 border-border py-3 select-none ${className}`}
      aria-hidden="true"
    >
      {/* Track 1: Translates Left on Scroll */}
      <div className="flex overflow-hidden py-1">
        <div ref={track1Ref} className="marquee-track-left flex items-center gap-6 whitespace-nowrap">
          {Array.from({ length: 6 }).flatMap((_, loopIdx) =>
            row1Items.map((item, i) => (
              <span key={`r1-${loopIdx}-${i}`} className="inline-flex items-center gap-4">
                <span className="font-heading text-sm md:text-base text-accent-yellow tracking-wider">
                  {item}
                </span>
                <span className="text-accent-green text-xs font-pixel">✦</span>
              </span>
            ))
          )}
        </div>
      </div>

      {/* Track 2: Translates Right on Scroll */}
      <div className="flex overflow-hidden py-1 border-t-2 border-border/30">
        <div ref={track2Ref} className="marquee-track-right flex items-center gap-6 whitespace-nowrap">
          {Array.from({ length: 6 }).flatMap((_, loopIdx) =>
            row2Items.map((item, i) => (
              <span key={`r2-${loopIdx}-${i}`} className="inline-flex items-center gap-4">
                <span className="font-body text-xs md:text-sm text-text-on-deep font-bold tracking-widest uppercase">
                  {item}
                </span>
                <span className="text-accent-red text-xs font-pixel">■</span>
              </span>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
