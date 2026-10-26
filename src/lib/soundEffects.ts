// soundEffects.ts : subtle tactile button click audio via Web Audio API.
// Zero dependencies, zero latency, warm & gentle mechanical switch sound.

let audioCtx: AudioContext | null = null;
let soundEnabled = true;

try {
  const saved = localStorage.getItem('portfolio_sfx_enabled');
  if (saved !== null) {
    soundEnabled = saved === 'true';
  }
} catch {
  soundEnabled = true;
}

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

export function isSoundEnabled(): boolean {
  return soundEnabled;
}

export function setSoundEnabled(enabled: boolean) {
  soundEnabled = enabled;
  try {
    localStorage.setItem('portfolio_sfx_enabled', String(enabled));
  } catch {
    // ignore
  }
}

/** Gentle, satisfying tactile button click (warm frequency drop, low volume) */
export function playButtonClick(volume = 0.08) {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;

    // Lowpass filter to ensure sound is warm and never harsh or piercing
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(2800, now);

    // Oscillator with gentle triangle wave
    const osc = ctx.createOscillator();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(720, now);
    osc.frequency.exponentialRampToValueAtTime(320, now + 0.032);

    // Smooth envelope with subtle volume
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(volume, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.038);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.04);
  } catch {
    // Graceful fallback if audio is blocked
  }
}

/** Subtle dull thud for disabled interactions */
export function playDisabledClick() {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(180, now);
    osc.frequency.exponentialRampToValueAtTime(90, now + 0.03);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.04, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.035);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.04);
  } catch {
    // ignore
  }
}

/** Initialize global pointerdown sound capture on interactive clickable elements */
export function initButtonSounds(): () => void {
  const handlePointerDown = (e: PointerEvent | MouseEvent) => {
    // Only trigger on primary click (left click)
    if (e.button !== 0) return;

    const target = e.target as HTMLElement | null;
    if (!target) return;

    // Check if target or any parent is a button or clickable control
    const clickable = target.closest<HTMLElement>(
      'button, a, [role="button"], [role="radio"], input[type="submit"], input[type="button"], input[type="checkbox"], select, .cursor-pointer'
    );
    if (!clickable) return;

    // Don't play normal sound if disabled
    const isDisabled =
      clickable.hasAttribute('disabled') ||
      clickable.getAttribute('aria-disabled') === 'true' ||
      clickable.classList.contains('cursor-not-allowed');

    if (isDisabled) {
      playDisabledClick();
    } else {
      playButtonClick();
    }
  };

  window.addEventListener('pointerdown', handlePointerDown, { passive: true });

  return () => {
    window.removeEventListener('pointerdown', handlePointerDown);
  };
}
