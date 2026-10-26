interface MarqueeProps {
  className?: string;
}

export default function Marquee({ className = '' }: MarqueeProps) {
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

  return (
    <div
      className={`w-full overflow-hidden bg-surface-deep border-y-4 border-border py-3 select-none ${className}`}
      aria-hidden="true"
    >
      {/* Track 1: Scrolling Left */}
      <div className="flex overflow-hidden py-1">
        <div className="marquee-track-left flex items-center gap-6 whitespace-nowrap">
          {Array.from({ length: 4 }).flatMap((_, loopIdx) =>
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

      {/* Track 2: Scrolling Right */}
      <div className="flex overflow-hidden py-1 border-t-2 border-border/30">
        <div className="marquee-track-right flex items-center gap-6 whitespace-nowrap">
          {Array.from({ length: 4 }).flatMap((_, loopIdx) =>
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
