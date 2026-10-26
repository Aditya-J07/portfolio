import { useEffect, useRef, useState } from 'react';

type Direction = 'NW' | 'N' | 'NE' | 'W' | 'CENTER' | 'E' | 'SW' | 'S' | 'SE';
type Emote = 'HAPPY' | 'SURPRISED' | 'SLEEPING' | 'WAVING' | 'DIZZY' | 'THUMBS_UP' | null;

const DIR_POSITIONS: Record<Direction, string> = {
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

const EMOTE_POSITIONS: Record<Exclude<Emote, null>, string> = {
  HAPPY: '0% 0%',
  SURPRISED: '50% 0%',
  SLEEPING: '100% 0%',
  WAVING: '0% 100%',
  DIZZY: '50% 100%',
  THUMBS_UP: '100% 100%',
};

export default function CursorBuddy() {
  const [isEnabled, setIsEnabled] = useState(() => {
    try {
      const saved = localStorage.getItem('cursor_buddy_enabled');
      return saved !== 'false';
    } catch {
      return true;
    }
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [speechText, setSpeechText] = useState<string | null>('Psst... try petting me!');

  const btnRef = useRef<HTMLButtonElement>(null);
  const spriteRef = useRef<HTMLDivElement>(null);

  const mousePos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const currentDirection = useRef<Direction>('CENTER');
  const currentEmote = useRef<Emote>(null);
  const emoteTimeout = useRef<number | null>(null);
  const idleTimeout = useRef<number | null>(null);
  const isSleeping = useRef(false);
  const isOffScreen = useRef(false);
  const rafId = useRef<number | null>(null);

  // Rubbing state
  const reversals = useRef<number[]>([]);
  const lastX = useRef<number | null>(null);
  const lastDir = useRef<number>(0);
  const petCount = useRef<number>(
    (() => {
      try {
        return parseInt(localStorage.getItem('cursor_buddy_pets') || '0', 10);
      } catch {
        return 0;
      }
    })()
  );

  // Floating hearts pool
  const heartsPoolRef = useRef<HTMLDivElement>(null);

  const spawnHearts = () => {
    if (!heartsPoolRef.current) return;
    const container = heartsPoolRef.current;
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        const heart = document.createElement('div');
        heart.className =
          'absolute pointer-events-none font-bold text-accent-red select-none text-xl';
        heart.textContent = '❤';
        heart.style.left = `${30 + Math.random() * 40}px`;
        heart.style.top = '25px';
        heart.style.setProperty('--tx', `${Math.random() * 40 - 20}px`);
        heart.style.animation = 'heartFloatUp 1.2s ease-out forwards';
        container.appendChild(heart);
        setTimeout(() => {
          heart.remove();
        }, 1200);
      }, i * 120);
    }
  };

  const setEmote = (
    emote: Emote,
    duration = 1500,
    withHearts = false,
    withHop = false,
    speech?: string
  ) => {
    if (!isEnabled || !spriteRef.current || !btnRef.current) return;

    currentEmote.current = emote;
    if (emoteTimeout.current) clearTimeout(emoteTimeout.current);

    if (emote) {
      spriteRef.current.style.backgroundImage = 'url(/buddy/emotes.png)';
      spriteRef.current.style.backgroundSize = '300% 200%';
      spriteRef.current.style.backgroundPosition = EMOTE_POSITIONS[emote];

      if (emote === 'SLEEPING') {
        btnRef.current.classList.add('cursor-sleeping');
      } else {
        btnRef.current.classList.remove('cursor-sleeping');
      }

      if (withHop) {
        btnRef.current.classList.add('anim-hop');
        setTimeout(() => btnRef.current?.classList.remove('anim-hop'), 600);
      }

      if (withHearts) {
        btnRef.current.classList.add('anim-squash');
        setTimeout(() => btnRef.current?.classList.remove('anim-squash'), 500);
        spawnHearts();
      }

      if (speech) {
        setSpeechText(speech);
      } else {
        setSpeechText(null);
      }

      emoteTimeout.current = window.setTimeout(() => {
        currentEmote.current = null;
        setSpeechText(null);
        if (btnRef.current) {
          btnRef.current.classList.remove('cursor-sleeping');
        }
        if (spriteRef.current) {
          spriteRef.current.style.backgroundImage = 'url(/buddy/directions.png)';
          spriteRef.current.style.backgroundSize = '300% 300%';
          spriteRef.current.style.backgroundPosition = DIR_POSITIONS[currentDirection.current];
        }
      }, duration);
    }
  };

  // Reset idle timer
  const resetIdle = () => {
    if (isSleeping.current) {
      isSleeping.current = false;
      setEmote('SURPRISED', 600, false, true);
    }
    if (idleTimeout.current) clearTimeout(idleTimeout.current);
    idleTimeout.current = window.setTimeout(() => {
      if (!currentEmote.current && isEnabled) {
        isSleeping.current = true;
        setEmote('SLEEPING', 12000, false, false, 'Zzz...');
      }
    }, 12000);
  };

  useEffect(() => {
    if (!isEnabled) return;

    let cachedRect = btnRef.current?.getBoundingClientRect();
    const updateRect = () => {
      if (btnRef.current) cachedRect = btnRef.current.getBoundingClientRect();
    };

    window.addEventListener('resize', updateRect, { passive: true });
    window.addEventListener('scroll', updateRect, { passive: true });

    // Pointer move listener
    const handlePointerMove = (e: PointerEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;
      resetIdle();
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    resetIdle();

    // First visit speech bubble auto-dismiss
    const firstVisitTimer = setTimeout(() => {
      if (speechText === 'Psst... try petting me!') {
        setSpeechText(null);
      }
    }, 6000);

    // Fast scroll detection for dizzy emote
    let lastScrollY = window.scrollY;
    let lastScrollTime = performance.now();
    const handleScrollSpeed = () => {
      const now = performance.now();
      const dt = now - lastScrollTime;
      if (dt > 50) {
        const dy = Math.abs(window.scrollY - lastScrollY);
        const speed = dy / dt;
        if (speed > 4.5 && !currentEmote.current) {
          setEmote('DIZZY', 1200, false, true, 'Whoa, dizzy!');
        }
        lastScrollY = window.scrollY;
        lastScrollTime = now;
      }
    };
    window.addEventListener('scroll', handleScrollSpeed, { passive: true });

    // Hover detection on projects / contact links
    const handleElementHover = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest('a, button');
      if (target && !currentEmote.current) {
        const text = target.textContent?.toLowerCase() || '';
        if (text.includes('live') || text.includes('source') || text.includes('connect')) {
          setEmote('THUMBS_UP', 1000, false, false);
        }
      }
    };
    document.addEventListener('mouseover', handleElementHover, { passive: true });

    // Look-at animation frame loop
    const loop = () => {
      if (isEnabled && !currentEmote.current && cachedRect && !document.hidden && !isOffScreen.current) {
        const centerX = cachedRect.left + cachedRect.width / 2;
        const centerY = cachedRect.top + cachedRect.height / 2;
        const dx = mousePos.current.x - centerX;
        const dy = mousePos.current.y - centerY;
        const dist = Math.hypot(dx, dy);

        let newDir: Direction = 'CENTER';

        if (dist >= 60) {
          let angle = (Math.atan2(dy, dx) * 180) / Math.PI;
          if (angle < 0) angle += 360;

          if (angle >= 337.5 || angle < 22.5) newDir = 'E';
          else if (angle >= 22.5 && angle < 67.5) newDir = 'SE';
          else if (angle >= 67.5 && angle < 112.5) newDir = 'S';
          else if (angle >= 112.5 && angle < 157.5) newDir = 'SW';
          else if (angle >= 157.5 && angle < 202.5) newDir = 'W';
          else if (angle >= 202.5 && angle < 247.5) newDir = 'NW';
          else if (angle >= 247.5 && angle < 292.5) newDir = 'N';
          else if (angle >= 292.5 && angle < 337.5) newDir = 'NE';
        }

        // Update DOM only when direction changes
        if (newDir !== currentDirection.current && spriteRef.current) {
          currentDirection.current = newDir;
          spriteRef.current.style.backgroundPosition = DIR_POSITIONS[newDir];

          // 3px micro-shift toward cursor
          if (btnRef.current) {
            const shiftX = dist < 60 ? 0 : Math.round((dx / dist) * 3);
            const shiftY = dist < 60 ? 0 : Math.round((dy / dist) * 3);
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
      window.removeEventListener('scroll', handleScrollSpeed);
      document.removeEventListener('mouseover', handleElementHover);
      clearTimeout(firstVisitTimer);
      if (idleTimeout.current) clearTimeout(idleTimeout.current);
      if (emoteTimeout.current) clearTimeout(emoteTimeout.current);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [isEnabled]);

  // Rub / Petting Detection
  const handlePointerOverBuddy = (e: React.PointerEvent) => {
    const curX = e.clientX;
    if (lastX.current !== null) {
      const delta = curX - lastX.current;
      if (Math.abs(delta) > 5) {
        const dir = delta > 0 ? 1 : -1;
        if (lastDir.current !== 0 && dir !== lastDir.current) {
          const now = performance.now();
          reversals.current.push(now);
          reversals.current = reversals.current.filter((t) => now - t <= 1200);

          if (reversals.current.length >= 4) {
            // Pet achieved!
            petCount.current++;
            try {
              localStorage.setItem('cursor_buddy_pets', petCount.current.toString());
            } catch {
              // ignore
            }

            setEmote('HAPPY', 1500, true, false, '❤ Purr...');
            reversals.current = [];

            // Achievement Toasts
            if (petCount.current === 5) {
              setToastMessage('🏆 ACHIEVEMENT: Buddy Apprentice (5 Pets)');
              setTimeout(() => setToastMessage(null), 3500);
            } else if (petCount.current === 15) {
              setToastMessage('🏆 ACHIEVEMENT: Best Friends Forever (15 Pets)');
              setTimeout(() => setToastMessage(null), 3500);
            }
          }
        }
        lastDir.current = dir;
      }
    }
    lastX.current = curX;
  };

  const handlePointerLeaveBuddy = () => {
    lastX.current = null;
    lastDir.current = 0;
    reversals.current = [];
  };

  const toggleBuddy = () => {
    const next = !isEnabled;
    setIsEnabled(next);
    try {
      localStorage.setItem('cursor_buddy_enabled', String(next));
    } catch {
      // ignore
    }
  };

  if (!isEnabled) {
    return (
      <div className="fixed bottom-4 right-4 z-40">
        <button
          type="button"
          onClick={toggleBuddy}
          className="px-2.5 py-1.5 bg-surface-deep text-accent-yellow border-2 border-border font-pixel text-[8px] uppercase shadow-brutal-sm hover:bg-accent-yellow hover:text-accent-ink transition-all cursor-pointer"
          title="Turn CursorBuddy Companion On"
        >
          Companion: OFF
        </button>
      </div>
    );
  }

  return (
    <>
      {/* Toast Notification Container */}
      {toastMessage && (
        <div className="fixed top-8 right-8 z-50 bg-surface-deep text-accent-yellow border-4 border-border p-4 shadow-brutal font-pixel text-xs animate-slide-up">
          {toastMessage}
        </div>
      )}

      {/* Floating Mascot Button */}
      <div
        className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-40 select-none hidden xs:block cursor-buddy-interactive"
        style={{ width: '104px', height: '104px' }}
      >
        {/* Speech Bubble */}
        {speechText && (
          <div
            role="status"
            aria-live="polite"
            className="speech-tail absolute -top-12 right-2 bg-surface-1 border-3 border-border px-3 py-1.5 shadow-[3px_3px_0px_var(--shadow)] whitespace-nowrap font-pixel text-[9px] text-ink z-50"
          >
            {speechText}
          </div>
        )}

        {/* Pooled Hearts Floating Container */}
        <div
          ref={heartsPoolRef}
          className="absolute inset-0 pointer-events-none overflow-visible z-50"
        />

        {/* Mascot Interactive Button */}
        <button
          ref={btnRef}
          type="button"
          aria-label="Pet Aditya's buddy"
          onClick={() => setEmote('SURPRISED', 600, false, true)}
          onDoubleClick={() => setEmote('WAVING', 1800, false, false, "Hi, I'm Aditya!")}
          onPointerMove={handlePointerOverBuddy}
          onPointerLeave={handlePointerLeaveBuddy}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setEmote('HAPPY', 1500, true, false, '❤ Purr...');
            }
          }}
          className="w-full h-full relative focus:outline-none focus:ring-4 focus:ring-focus pixelated block transition-transform duration-75 p-0 bg-transparent border-0 cursor-buddy-interactive"
        >
          <div
            ref={spriteRef}
            className="w-full h-full pixelated border-4 border-border bg-surface-1 shadow-brutal"
            style={{
              backgroundImage: 'url(/buddy/directions.png)',
              backgroundSize: '300% 300%',
              backgroundPosition: '50% 50%',
            }}
          />
        </button>

        {/* Mascot Mini Close/Off Pill */}
        <button
          type="button"
          onClick={toggleBuddy}
          className="absolute -bottom-2 -left-2 bg-surface-deep text-text-on-deep text-[7px] font-pixel px-1.5 py-0.5 border border-border shadow-[1px_1px_0px_var(--shadow)] hover:bg-accent-red hover:text-white transition-colors"
          title="Turn off companion"
        >
          [x]
        </button>
      </div>
    </>
  );
}
