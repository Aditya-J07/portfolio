// cursorStates.ts : toggles the "loading" and "sleeping" cursors.
// Cheap by design: passive listeners, one timer, no React state, no per-move work.

const IDLE_MS = 30_000;          // sleep after 30s of no activity
const root = document.documentElement;

let idleTimer: number | undefined;
let lastReset = 0;

function wake() {
  if (root.classList.contains('is-idle')) root.classList.remove('is-idle');
}

function resetIdle() {
  const now = performance.now();
  // throttle: only re-arm the timer once per second (or when waking up)
  if (now - lastReset < 1000 && !root.classList.contains('is-idle')) return;
  lastReset = now;
  wake();
  window.clearTimeout(idleTimer);
  idleTimer = window.setTimeout(() => root.classList.add('is-idle'), IDLE_MS);
}

export function initCursorStates(): () => void {
  // no custom sleeping cursor on touch devices or for reduced motion
  const skip =
    window.matchMedia('(hover: none)').matches ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (skip) return () => {};

  const events = ['pointermove', 'pointerdown', 'keydown', 'wheel', 'scroll'] as const;
  events.forEach((e) => window.addEventListener(e, resetIdle, { passive: true }));
  resetIdle();

  return () => {
    events.forEach((e) => window.removeEventListener(e, resetIdle));
    window.clearTimeout(idleTimer);
    root.classList.remove('is-idle');
  };
}

/** Show the hourglass cursor, e.g. around a route change or a form submit. */
export function setCursorLoading(on: boolean) {
  root.classList.toggle('is-loading', on);
}
