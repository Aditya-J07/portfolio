interface PixelHeartsProps {
  total?: number;
  count?: number; // how many filled hearts (can be integer or half)
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function PixelHearts({
  total = 10,
  count = 10,
  className = '',
  size = 'md',
}: PixelHeartsProps) {
  const pixelSizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  return (
    <div
      className={`inline-flex items-center gap-1 select-none ${className}`}
      aria-label={`${count} of ${total} hearts`}
    >
      {Array.from({ length: total }).map((_, i) => {
        const isFilled = i < Math.floor(count);
        const isHalf = !isFilled && i < count;

        return (
          <span
            key={i}
            className={`relative inline-block ${pixelSizes[size]} transition-transform hover:scale-125`}
            aria-hidden="true"
          >
            {/* Base Pixel Heart SVG */}
            <svg
              viewBox="0 0 16 16"
              className="w-full h-full"
              style={{ imageRendering: 'pixelated' }}
            >
              {/* Outer 1px black pixel border */}
              <path
                d="M3 1h3v2h4V1h3v2h2v4h-2v3h-2v2h-2v2h-2v-2H6v-2H4v-3H2V3h2V1h-1z"
                fill="var(--border)"
              />
              {/* Fill */}
              {isFilled ? (
                <>
                  <path
                    d="M4 3h2v2h4V3h2v3h-1v2h-1v2h-2v2h-2v-2H5V8H4V6H3V3h1z"
                    fill="var(--accent-red)"
                  />
                  {/* Pixel shine specular top-left */}
                  <rect x="4" y="3" width="1" height="1" fill="#FFFFFF" />
                  <rect x="10" y="3" width="1" height="1" fill="#FFFFFF" />
                </>
              ) : isHalf ? (
                <>
                  {/* Half fill left side */}
                  <path
                    d="M4 3h2v2h1v7H6v-2H5V8H4V6H3V3h1z"
                    fill="var(--accent-red)"
                  />
                  {/* Empty right side */}
                  <path
                    d="M7 5h3V3h2v3h-1v2h-1v2h-2v2h-1V5z"
                    fill="var(--surface-2)"
                  />
                  <rect x="4" y="3" width="1" height="1" fill="#FFFFFF" />
                </>
              ) : (
                /* Empty Heart */
                <path
                  d="M4 3h2v2h4V3h2v3h-1v2h-1v2h-2v2h-2v-2H5V8H4V6H3V3h1z"
                  fill="var(--surface-2)"
                />
              )}
            </svg>
          </span>
        );
      })}
    </div>
  );
}
