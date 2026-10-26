import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTheme } from '../context/ThemeContext';

gsap.registerPlugin(ScrollTrigger);

export default function ParallaxDecorations() {
  const { theme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Desktop: 3 tiers of parallax depth
      mm.add('(min-width: 768px)', () => {
        gsap.to('.parallax-tier-far', {
          yPercent: -30,
          ease: 'none',
          scrollTrigger: {
            trigger: document.body,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.5,
          },
        });

        gsap.to('.parallax-tier-mid', {
          yPercent: -65,
          ease: 'none',
          scrollTrigger: {
            trigger: document.body,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.4,
          },
        });

        gsap.to('.parallax-tier-near', {
          yPercent: -120,
          ease: 'none',
          scrollTrigger: {
            trigger: document.body,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.3,
          },
        });
      });

      // Mobile: subtle tier only
      mm.add('(max-width: 767px)', () => {
        gsap.to('.parallax-tier-mid', {
          yPercent: -35,
          ease: 'none',
          scrollTrigger: {
            trigger: document.body,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.5,
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const isDark = theme === 'dark';

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none"
      aria-hidden="true"
    >
      {isDark ? (
        /* Dark Theme: Flat Pixel Stars & Crescent Moon */
        <>
          {/* Moon top right (Tier Far) */}
          <div
            className="parallax-tier-far absolute top-12 right-12 w-14 h-14"
            style={{ willChange: 'transform' }}
          >
            <svg viewBox="0 0 16 16" className="w-full h-full fill-accent-yellow">
              <path d="M4 1h5v2h2v2h2v4h-2v2H9v2H4v-1h3v-2h2V8h1V6H9V4H7V2H4V1z" />
            </svg>
          </div>

          {/* Star 1 (Tier Mid) */}
          <div
            className="parallax-tier-mid absolute top-1/4 left-10 w-6 h-6 text-accent-yellow ambient-floating-cube"
            style={{ willChange: 'transform' }}
          >
            ✦
          </div>

          {/* Star 2 (Tier Far) */}
          <div
            className="parallax-tier-far absolute top-1/2 right-16 w-4 h-4 text-accent-teal"
            style={{ willChange: 'transform' }}
          >
            ★
          </div>

          {/* Star 3 (Tier Near) */}
          <div
            className="parallax-tier-near absolute top-3/4 left-20 w-8 h-8 text-accent-purple ambient-floating-cube hidden md:block"
            style={{ willChange: 'transform' }}
          >
            ✦
          </div>

          {/* Star 4 (Tier Mid) */}
          <div
            className="parallax-tier-mid absolute bottom-24 right-1/4 w-5 h-5 text-accent-green hidden md:block"
            style={{ willChange: 'transform' }}
          >
            ★
          </div>
        </>
      ) : (
        /* Light / Middle Theme: Flat Pixel Clouds & Voxel Cubes */
        <>
          {/* Cloud 1 (Tier Far) */}
          <div
            className="parallax-tier-far absolute top-16 left-8 opacity-60"
            style={{ willChange: 'transform' }}
          >
            <svg viewBox="0 0 32 16" className="w-24 h-12 fill-white">
              <path d="M6 6h4v-2h8v2h8v4h2v4H4v-4h2V6z" />
            </svg>
          </div>

          {/* Cloud 2 (Tier Far) */}
          <div
            className="parallax-tier-far absolute top-1/3 right-12 opacity-60 hidden md:block"
            style={{ willChange: 'transform' }}
          >
            <svg viewBox="0 0 32 16" className="w-32 h-16 fill-white">
              <path d="M4 8h6v-4h10v4h8v4h2v4H2v-4h2V8z" />
            </svg>
          </div>

          {/* Voxel Gold Cube (Tier Mid) */}
          <div
            className="parallax-tier-mid absolute top-1/2 left-12 w-10 h-10 ambient-floating-cube hidden md:block"
            style={{ willChange: 'transform' }}
          >
            <div className="w-8 h-8 bg-accent-yellow border-3 border-border shadow-[3px_3px_0px_var(--shadow)] flex items-center justify-center font-pixel text-[8px] text-accent-ink font-bold">
              AC
            </div>
          </div>

          {/* Voxel Grass Cube (Tier Near) */}
          <div
            className="parallax-tier-near absolute top-3/4 right-16 w-12 h-12 ambient-floating-cube hidden md:block"
            style={{ willChange: 'transform' }}
          >
            <div className="w-10 h-10 bg-accent-green border-3 border-border shadow-[4px_4px_0px_var(--shadow)] flex items-center justify-center font-pixel text-[8px] text-accent-ink font-bold">
              GRS
            </div>
          </div>
        </>
      )}
    </div>
  );
}
