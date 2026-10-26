import { useEffect, useRef, useState, useCallback } from 'react';
import { useBuddyLookAt, DIR_POSITIONS } from '../hooks/useBuddyLookAt';
import { useRubDetection } from '../hooks/useRubDetection';
import '../styles/buddy.css';

type Emote = 'HAPPY' | 'SURPRISED' | 'SLEEPING' | 'WAVING' | 'DIZZY' | 'THUMBS_UP' | null;

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
  const [isSleepingState, setIsSleepingState] = useState(false);
  const [showXpOrb, setShowXpOrb] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const spriteRef = useRef<HTMLDivElement>(null);

  const currentEmote = useRef<Emote>(null);
  const emoteTimeout = useRef<number | null>(null);
  const idleTimeout = useRef<number | null>(null);
  const isSleeping = useRef(false);

  // Rewards session caps
  const achievementsAwarded = useRef<Set<number>>(new Set());
  const thumbsUpShown = useRef(false);

  // Persistent pet count
  const petCount = useRef<number>(
    (() => {
      try {
        return parseInt(localStorage.getItem('cursor_buddy_pets') || '0', 10);
      } catch {
        return 0;
      }
    })()
  );

  // Pool of 8 heart DOM element refs (never create or destroy nodes per event)
  const heartPoolRefs = useRef<(HTMLDivElement | null)[]>([]);

  const spawnPooledHearts = useCallback(() => {
    // Fire 5 pooled hearts with staggered timing
    const count = 5;
    for (let i = 0; i < count; i++) {
      const el = heartPoolRefs.current[i];
      if (!el) continue;

      const randomTx = (Math.random() * 40 - 20).toFixed(1);
      el.style.setProperty('--tx', `${randomTx}px`);

      window.setTimeout(() => {
        el.classList.remove('is-active');
        // Force reflow to re-trigger CSS keyframe animation
        void el.offsetWidth;
        el.classList.add('is-active');

        window.setTimeout(() => {
          el.classList.remove('is-active');
        }, 1250);
      }, i * 110);
    }
  }, []);

  // Set Emote handler
  const setEmote = useCallback(
    (
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
          isSleeping.current = true;
          setIsSleepingState(true);
          btnRef.current.classList.add('cursor-sleeping');
        } else {
          isSleeping.current = false;
          setIsSleepingState(false);
          btnRef.current.classList.remove('cursor-sleeping');
        }

        if (withHop) {
          btnRef.current.classList.add('anim-hop');
          window.setTimeout(() => btnRef.current?.classList.remove('anim-hop'), 600);
        }

        if (withHearts) {
          btnRef.current.classList.add('anim-squash');
          window.setTimeout(() => btnRef.current?.classList.remove('anim-squash'), 500);
          spawnPooledHearts();
        }

        if (speech !== undefined) {
          setSpeechText(speech);
        }

        emoteTimeout.current = window.setTimeout(() => {
          currentEmote.current = null;
          setSpeechText(null);
          setIsSleepingState(false);
          isSleeping.current = false;

          if (btnRef.current) {
            btnRef.current.classList.remove('cursor-sleeping');
          }
          if (spriteRef.current) {
            spriteRef.current.style.backgroundImage = 'url(/buddy/directions.png)';
            spriteRef.current.style.backgroundSize = '300% 300%';
            spriteRef.current.style.backgroundPosition = DIR_POSITIONS['CENTER'];
          }
        }, duration);
      }
    },
    [isEnabled, spawnPooledHearts]
  );

  // Idle timer reset
  const resetIdle = useCallback(() => {
    if (isSleeping.current) {
      isSleeping.current = false;
      setIsSleepingState(false);
      setEmote('SURPRISED', 600, false, true);
    }
    if (idleTimeout.current) clearTimeout(idleTimeout.current);
    idleTimeout.current = window.setTimeout(() => {
      if (!currentEmote.current && isEnabled) {
        setEmote('SLEEPING', 12000, false, false, 'Zzz...');
      }
    }, 12000);
  }, [isEnabled, setEmote]);

  // Handle petting / rub achieved
  const handlePet = useCallback(() => {
    if (!isEnabled) return;
    petCount.current++;

    try {
      localStorage.setItem('cursor_buddy_pets', petCount.current.toString());
    } catch {
      // ignore
    }

    setEmote('HAPPY', 1500, true, false, '❤ Purr...');

    // Achievement reward triggers
    if (petCount.current >= 5 && !achievementsAwarded.current.has(5)) {
      achievementsAwarded.current.add(5);
      setToastMessage('🏆 ACHIEVEMENT UNLOCKED: Good Buddy');
      window.setTimeout(() => setToastMessage(null), 3500);
    } else if (petCount.current >= 15 && !achievementsAwarded.current.has(15)) {
      achievementsAwarded.current.add(15);
      setToastMessage('🏆 ACHIEVEMENT UNLOCKED: Best Friends');
      setShowXpOrb(true);

      // Pulse top XP bar
      const xpBar = document.querySelector('[role="progressbar"]');
      if (xpBar) {
        xpBar.classList.add('animate-pulse');
        window.setTimeout(() => xpBar.classList.remove('animate-pulse'), 1200);
      }

      window.setTimeout(() => {
        setShowXpOrb(false);
        setToastMessage(null);
      }, 3500);
    }
  }, [isEnabled, setEmote]);

  // Hook 1: High performance rAF Look-At Loop
  useBuddyLookAt({
    containerRef,
    btnRef,
    spriteRef,
    isEnabled,
    isEmoting: currentEmote.current !== null,
    onActivity: resetIdle,
    innerRadius: 60,
  });

  // Hook 2: Rubbing / Pet gesture detection
  const { handlePointerMove: onBuddyPointerMove, resetRubbing } = useRubDetection({
    onPet: handlePet,
    reversalThreshold: 4,
    timeWindowMs: 1200,
    minMovementDelta: 5,
  });

  // Fast scroll & element hover listeners
  useEffect(() => {
    if (!isEnabled) return;

    resetIdle();

    // First visit speech bubble auto-dismiss after 4s
    const firstVisitTimer = window.setTimeout(() => {
      setSpeechText((prev) => (prev === 'Psst... try petting me!' ? null : prev));
    }, 4000);

    // Fast scroll detection (dizzy emote)
    let lastScrollY = window.scrollY;
    let lastScrollTime = performance.now();
    const handleScrollSpeed = () => {
      const now = performance.now();
      const dt = now - lastScrollTime;
      if (dt > 40) {
        const dy = Math.abs(window.scrollY - lastScrollY);
        const speed = dy / dt;
        if (speed > 3.5 && !currentEmote.current) {
          setEmote('DIZZY', 1000, false, true, 'Whoa, dizzy!');
        }
        lastScrollY = window.scrollY;
        lastScrollTime = now;
      }
    };
    window.addEventListener('scroll', handleScrollSpeed, { passive: true });

    // Hover detection on project cards and contact section (thumbs up once per visit)
    const handleHoverCheck = (e: MouseEvent) => {
      if (thumbsUpShown.current || currentEmote.current) return;
      const target = (e.target as HTMLElement)?.closest('.enchanted-card, a[href*="projects"], #contact, [href*="contact"]');
      if (target) {
        thumbsUpShown.current = true;
        setEmote('THUMBS_UP', 1200, false, false);
      }
    };
    document.addEventListener('mouseover', handleHoverCheck, { passive: true });

    // Listen to external toggle events from footer
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'cursor_buddy_enabled') {
        setIsEnabled(e.newValue !== 'false');
      }
    };
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('scroll', handleScrollSpeed);
      document.removeEventListener('mouseover', handleHoverCheck);
      window.removeEventListener('storage', handleStorageChange);
      clearTimeout(firstVisitTimer);
      if (idleTimeout.current) clearTimeout(idleTimeout.current);
      if (emoteTimeout.current) clearTimeout(emoteTimeout.current);
    };
  }, [isEnabled, resetIdle, setEmote]);

  // Click & Double Click reactions
  const clickTimer = useRef<number | null>(null);

  const handleClick = () => {
    if (clickTimer.current) {
      // Double click detected: WAVING
      clearTimeout(clickTimer.current);
      clickTimer.current = null;
      setEmote('WAVING', 1500, false, false, "Hi, I'm Aditya!");
    } else {
      // Single click delay to distinguish double-click
      clickTimer.current = window.setTimeout(() => {
        clickTimer.current = null;
        setEmote('SURPRISED', 600, false, true);
      }, 250);
    }
  };

  // Keyboard accessibility: Enter or Space triggers PETTED
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handlePet();
    }
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
    return null;
  }

  return (
    <>
      {/* Achievement Toast */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed top-8 right-8 z-50 bg-surface-deep text-accent-yellow border-4 border-border p-4 shadow-brutal font-pixel text-xs animate-slide-up"
        >
          {toastMessage}
        </div>
      )}

      {/* Floating Mascot Container */}
      <div
        ref={containerRef}
        className="cursor-buddy-wrapper fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-40 select-none hidden xs:block cursor-buddy-interactive"
        style={{ width: '112px', height: '112px' }}
      >
        {/* Speech Bubble (Design system: cream bg, 4px border, hard shadow, pixel font) */}
        {speechText && (
          <div role="status" aria-live="polite" className="buddy-speech-bubble">
            {speechText}
          </div>
        )}

        {/* 8 Pre-allocated Pooled Hearts (0 DOM creations/deletions during runtime) */}
        <div className="absolute inset-0 pointer-events-none overflow-visible z-50">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              ref={(el) => {
                heartPoolRefs.current[i] = el;
              }}
              className="buddy-heart"
              style={{
                left: `${25 + (i * 11) % 45}px`,
                top: `${20 + (i * 7) % 20}px`,
              }}
            >
              ❤
            </div>
          ))}
        </div>

        {/* Floating Z particles for sleep emote */}
        <div className="absolute -top-3 left-4 pointer-events-none z-50">
          <span
            className={`buddy-z-particle ${isSleepingState ? 'is-active' : ''}`}
            style={{ animationDelay: '0s' }}
          >
            Z
          </span>
          <span
            className={`buddy-z-particle ${isSleepingState ? 'is-active' : ''}`}
            style={{ animationDelay: '0.7s', left: '12px' }}
          >
            z
          </span>
          <span
            className={`buddy-z-particle ${isSleepingState ? 'is-active' : ''}`}
            style={{ animationDelay: '1.4s', left: '22px' }}
          >
            z
          </span>
        </div>

        {/* Popping XP Orb reward */}
        {showXpOrb && <div className="buddy-xp-orb" style={{ top: '30px', left: '40px' }} />}

        {/* Mascot Interactive Button (Keyboard accessible) */}
        <button
          ref={btnRef}
          type="button"
          aria-label="Pet Aditya's buddy"
          onClick={handleClick}
          onPointerMove={onBuddyPointerMove}
          onPointerLeave={resetRubbing}
          onKeyDown={handleKeyDown}
          className="w-full h-full relative focus:outline-none focus:ring-4 focus:ring-focus pixelated block transition-transform duration-75 p-0 bg-transparent border-0 cursor-buddy-interactive"
        >
          <div
            ref={spriteRef}
            className="w-full h-full pixelated border-4 border-border bg-surface-1 shadow-brutal"
            style={{
              backgroundImage: 'url(/buddy/directions.png)',
              backgroundSize: '300% 300%',
              backgroundPosition: DIR_POSITIONS['CENTER'],
            }}
          />
        </button>

        {/* Mascot Mini Close Button */}
        <button
          type="button"
          onClick={toggleBuddy}
          className="absolute -bottom-2 -left-2 bg-surface-deep text-text-on-deep text-[7px] font-pixel px-1.5 py-0.5 border border-border shadow-[1px_1px_0px_var(--shadow)] hover:bg-accent-red hover:text-white transition-colors cursor-pointer"
          title="Turn off mascot"
          aria-label="Turn off mascot"
        >
          [x]
        </button>
      </div>
    </>
  );
}
