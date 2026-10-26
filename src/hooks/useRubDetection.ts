import { useRef, useCallback } from 'react';

interface UseRubDetectionOptions {
  onPet: () => void;
  reversalThreshold?: number; // default: 4 reversals
  timeWindowMs?: number;      // default: 1200ms (1.2s)
  minMovementDelta?: number;  // default: 5px
}

/**
 * Hook to detect tactile petting/rubbing gestures.
 * Tracks horizontal pointer reversals within a rolling time window.
 * Supports both mouse pointer scrub and touch swipes.
 */
export function useRubDetection({
  onPet,
  reversalThreshold = 4,
  timeWindowMs = 1200,
  minMovementDelta = 5,
}: UseRubDetectionOptions) {
  const reversals = useRef<number[]>([]);
  const lastX = useRef<number | null>(null);
  const lastDir = useRef<number>(0);

  const processMovement = useCallback(
    (clientX: number) => {
      if (lastX.current !== null) {
        const delta = clientX - lastX.current;
        if (Math.abs(delta) >= minMovementDelta) {
          const currentDir = delta > 0 ? 1 : -1;
          if (lastDir.current !== 0 && currentDir !== lastDir.current) {
            const now = performance.now();
            reversals.current.push(now);

            // Filter out reversals older than the time window (1.2s)
            reversals.current = reversals.current.filter((t) => now - t <= timeWindowMs);

            if (reversals.current.length >= reversalThreshold) {
              onPet();
              reversals.current = [];
              lastX.current = null;
              lastDir.current = 0;
              return;
            }
          }
          lastDir.current = currentDir;
        }
      }
      lastX.current = clientX;
    },
    [onPet, reversalThreshold, timeWindowMs, minMovementDelta]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      processMovement(e.clientX);
    },
    [processMovement]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (e.touches.length > 0) {
        processMovement(e.touches[0].clientX);
      }
    },
    [processMovement]
  );

  const resetRubbing = useCallback(() => {
    lastX.current = null;
    lastDir.current = 0;
    reversals.current = [];
  }, []);

  return {
    handlePointerMove,
    handleTouchMove,
    resetRubbing,
  };
}
