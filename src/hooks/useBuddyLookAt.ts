import { useEffect, useRef, type RefObject } from 'react';

export type BuddyDirection = 'NW' | 'N' | 'NE' | 'W' | 'CENTER' | 'E' | 'SW' | 'S' | 'SE';

export const DIR_POSITIONS: Record<BuddyDirection, string> = {
  NW: '0% 0%',
  N: '50% 0%',
  NE: '100% 0%',
  W: '0% 50%',
  CENTER: '50% 50%',
  E: '100% 50%',
  SW: '0% 100%',
  S: '50% 100%',
  SE: '100% 100%',
};

interface UseBuddyLookAtOptions {
  containerRef: RefObject<HTMLDivElement | null>;
  btnRef: RefObject<HTMLButtonElement | null>;
  spriteRef: RefObject<HTMLDivElement | null>;
  isEnabled: boolean;
  isEmoting: boolean;
  onActivity?: () => void;
  innerRadius?: number; // default 60px
}

/**
 * High-performance rAF look-at loop.
 * Caches bounding rect, updates DOM ONLY when direction sector changes,
 * applies up to 3px head shift, pauses when hidden or offscreen.
 */
export function useBuddyLookAt({
  containerRef,
  btnRef,
  spriteRef,
  isEnabled,
  isEmoting,
  onActivity,
  innerRadius = 60,
}: UseBuddyLookAtOptions) {
  const mousePos = useRef({ x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0, y: 0 });
  const currentDirection = useRef<BuddyDirection>('CENTER');
  const cachedRect = useRef<DOMRect | null>(null);
  const isOffScreen = useRef(false);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    if (!isEnabled || typeof window === 'undefined') return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Cache rect on resize and scroll
    const updateRect = () => {
      if (containerRef.current) {
        cachedRect.current = containerRef.current.getBoundingClientRect();
      }
    };
    updateRect();

    window.addEventListener('resize', updateRect, { passive: true });
    window.addEventListener('scroll', updateRect, { passive: true });

    // Single passive pointermove listener
    const handlePointerMove = (e: PointerEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;
      onActivity?.();
    };

    // Touch support: look at tap point then reset to center
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mousePos.current.x = e.touches[0].clientX;
        mousePos.current.y = e.touches[0].clientY;
        onActivity?.();
      }
    };

    const handleTouchEnd = () => {
      // Fall back to center on touch release
      if (cachedRect.current) {
        mousePos.current.x = cachedRect.current.left + cachedRect.current.width / 2;
        mousePos.current.y = cachedRect.current.top + cachedRect.current.height / 2;
      }
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    // Pause when off-screen
    let observer: IntersectionObserver | null = null;
    if ('IntersectionObserver' in window && containerRef.current) {
      observer = new IntersectionObserver(
        (entries) => {
          isOffScreen.current = !entries[0]?.isIntersecting;
        },
        { threshold: 0.1 }
      );
      observer.observe(containerRef.current);
    }

    // Animation frame loop
    const loop = () => {
      if (
        isEnabled &&
        !isEmoting &&
        cachedRect.current &&
        !document.hidden &&
        !isOffScreen.current
      ) {
        const rect = cachedRect.current;
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const dx = mousePos.current.x - centerX;
        const dy = mousePos.current.y - centerY;
        const dist = Math.hypot(dx, dy);

        let newDir: BuddyDirection = 'CENTER';

        if (dist >= innerRadius) {
          // Compute angle in degrees: 0° is East, clockwise
          let angle = (Math.atan2(dy, dx) * 180) / Math.PI;
          if (angle < 0) angle += 360;

          // 8 directions (22.5° sectors)
          if (angle >= 337.5 || angle < 22.5) newDir = 'E';
          else if (angle >= 22.5 && angle < 67.5) newDir = 'SE';
          else if (angle >= 67.5 && angle < 112.5) newDir = 'S';
          else if (angle >= 112.5 && angle < 157.5) newDir = 'SW';
          else if (angle >= 157.5 && angle < 202.5) newDir = 'W';
          else if (angle >= 202.5 && angle < 247.5) newDir = 'NW';
          else if (angle >= 247.5 && angle < 292.5) newDir = 'N';
          else if (angle >= 292.5 && angle < 337.5) newDir = 'NE';
        }

        // Only update DOM when direction actually changes
        if (newDir !== currentDirection.current) {
          currentDirection.current = newDir;
          if (spriteRef.current) {
            spriteRef.current.style.backgroundPosition = DIR_POSITIONS[newDir];
          }

          // Subtle head shift up to 3px toward cursor (skipped if reduced motion)
          if (btnRef.current && !prefersReducedMotion) {
            const shiftX = dist < innerRadius ? 0 : Math.round((dx / dist) * 3);
            const shiftY = dist < innerRadius ? 0 : Math.round((dy / dist) * 3);
            btnRef.current.style.transform = `translate3d(${shiftX}px, ${shiftY}px, 0)`;
          }
        }
      }

      rafId.current = requestAnimationFrame(loop);
    };

    rafId.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('resize', updateRect);
      window.removeEventListener('scroll', updateRect);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
      if (observer) observer.disconnect();
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [containerRef, btnRef, spriteRef, isEnabled, isEmoting, onActivity, innerRadius]);

  return { currentDirection };
}
