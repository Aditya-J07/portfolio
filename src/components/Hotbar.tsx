import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface HotbarSlot {
  key: string;
  name: string;
  short: string;
  path: string;
  icon: string;
}

const HOTBAR_SLOTS: HotbarSlot[] = [
  { key: '1', name: 'HOME', short: 'HOME', path: '/', icon: '🏰' },
  { key: '2', name: 'PROJECTS', short: 'PROJ', path: '/projects', icon: '📦' },
  { key: '3', name: 'ABOUT', short: 'ABOUT', path: '/about', icon: '📜' },
  { key: '4', name: 'PICS', short: 'PICS', path: '/pics', icon: '📷' },
  { key: '5', name: 'CONTACT', short: 'MSG', path: '/contact', icon: '✉️' },
];

export default function Hotbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const activeIndex = HOTBAR_SLOTS.findIndex((s) => s.path === location.pathname);
  const currentSlotIndex = activeIndex >= 0 ? activeIndex : 0;

  // Keyboard shortcut listener: 1-5 keys
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input or textarea
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      const slot = HOTBAR_SLOTS.find((s) => s.key === e.key);
      if (slot) {
        e.preventDefault();
        navigate(slot.path);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  return (
    <aside
      aria-label="Quick hotbar navigation"
      className="fixed bottom-3 left-1/2 -translate-x-1/2 z-40 select-none max-w-[95vw]"
    >
      <div className="relative flex items-center p-1.5 bg-surface-deep border-4 border-border shadow-brutal gap-1 sm:gap-2">
        {/* Floating Gold Selection Frame */}
        <div
          className="absolute top-1.5 bottom-1.5 border-3 border-accent-yellow bg-accent-yellow/15 pointer-events-none transition-transform duration-200 ease-out z-10"
          style={{
            width: 'calc((100% - 12px - (4 * 4px)) / 5)',
            transform: `translateX(calc(${currentSlotIndex} * (100% + 4px)))`,
          }}
        />

        {HOTBAR_SLOTS.map((slot, i) => {
          const isActive = i === currentSlotIndex;
          return (
            <button
              key={slot.key}
              type="button"
              onClick={() => navigate(slot.path)}
              aria-label={`Go to ${slot.name} (Key ${slot.key})`}
              className={`relative flex flex-col items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-surface-1 border-2 transition-all ${
                isActive
                  ? 'border-accent-yellow bg-surface-1 text-accent-ink font-bold shadow-inner'
                  : 'border-border/60 text-ink hover:bg-surface-2'
              }`}
            >
              {/* Hotkey Number in top-left */}
              <span className="absolute top-0.5 left-1 font-pixel text-[7px] sm:text-[8px] text-ink/70">
                {slot.key}
              </span>

              {/* Slot Icon */}
              <span className="text-base sm:text-xl leading-none mt-1" aria-hidden="true">
                {slot.icon}
              </span>

              {/* Label */}
              <span className="font-pixel text-[7px] sm:text-[8px] uppercase mt-0.5 leading-tight truncate px-0.5">
                {slot.short}
              </span>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
