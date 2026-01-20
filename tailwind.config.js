/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Catppuccin Colors (mapped to CSS variables for theming)
        base: 'var(--color-base)',
        mantle: 'var(--color-mantle)',
        crust: 'var(--color-crust)',
        surface0: 'var(--color-surface0)',
        surface1: 'var(--color-surface1)',
        surface2: 'var(--color-surface2)',
        overlay0: 'var(--color-overlay0)',
        overlay1: 'var(--color-overlay1)',
        overlay2: 'var(--color-overlay2)',
        subtext0: 'var(--color-subtext0)',
        subtext1: 'var(--color-subtext1)',
        text: 'var(--color-text)',
        lavender: 'var(--color-lavender)',
        blue: 'var(--color-blue)',
        sapphire: 'var(--color-sapphire)',
        sky: 'var(--color-sky)',
        teal: 'var(--color-teal)',
        green: 'var(--color-green)',
        yellow: 'var(--color-yellow)',
        peach: 'var(--color-peach)',
        maroon: 'var(--color-maroon)',
        red: 'var(--color-red)',
        mauve: 'var(--color-mauve)',
        pink: 'var(--color-pink)',
        flamingo: 'var(--color-flamingo)',
        rosewater: 'var(--color-rosewater)',
        accent: 'var(--color-accent)',
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
}
