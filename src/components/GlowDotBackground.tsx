import { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

export default function GlowDotBackground() {
  const { backgroundEffect } = useTheme();
  const glowLayerRef = useRef<HTMLDivElement>(null);
  const targetPos = useRef({ x: -1000, y: -1000 });
  const currentPos = useRef({ x: -1000, y: -1000 });
  const isRunning = useRef(false);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    if (!backgroundEffect) return;
    // Only enable on fine pointer / hover devices, and not reduced motion
    const hasFineHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!hasFineHover || isReducedMotion || !glowLayerRef.current) {
      return;
    }

    const glowLayer = glowLayerRef.current;

    const tick = () => {
      const dx = targetPos.current.x - currentPos.current.x;
      const dy = targetPos.current.y - currentPos.current.y;

      // Lerp with factor ~0.18
      currentPos.current.x += dx * 0.18;
      currentPos.current.y += dy * 0.18;

      glowLayer.style.setProperty('--mx', `${currentPos.current.x.toFixed(1)}px`);
      glowLayer.style.setProperty('--my', `${currentPos.current.y.toFixed(1)}px`);

      // If settled close enough, stop the loop to use 0% CPU
      if (Math.hypot(dx, dy) < 0.3) {
        isRunning.current = false;
        rafId.current = null;
        return;
      }

      rafId.current = requestAnimationFrame(tick);
    };

    const startLoop = () => {
      if (!isRunning.current) {
        isRunning.current = true;
        rafId.current = requestAnimationFrame(tick);
      }
    };

    const handlePointerMove = (e: PointerEvent) => {
      targetPos.current.x = e.clientX;
      targetPos.current.y = e.clientY;
      glowLayer.style.opacity = '1';
      startLoop();
    };

    const handlePointerLeave = () => {
      glowLayer.style.opacity = '0';
    };

    const handlePointerEnter = () => {
      glowLayer.style.opacity = '1';
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    document.addEventListener('pointerleave', handlePointerLeave, { passive: true });
    document.addEventListener('pointerenter', handlePointerEnter, { passive: true });

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerleave', handlePointerLeave);
      document.removeEventListener('pointerenter', handlePointerEnter);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [backgroundEffect]);

  if (!backgroundEffect) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* Layer 1: Base static dotted grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(circle, var(--dot) 2px, transparent 2px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* Layer 2: Glowing dotted grid masked around cursor */}
      <div
        ref={glowLayerRef}
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          backgroundImage: 'radial-gradient(circle, var(--dot-glow) 2.5px, transparent 2.5px)',
          backgroundSize: '24px 24px',
          maskImage:
            'radial-gradient(circle 150px at var(--mx, -1000px) var(--my, -1000px), #000 0%, transparent 100%)',
          WebkitMaskImage:
            'radial-gradient(circle 150px at var(--mx, -1000px) var(--my, -1000px), #000 0%, transparent 100%)',
          opacity: 0,
        }}
      />
    </div>
  );
}
