import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Nunito', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        quest: {
          ink: '#1e1b4b',
          blue: '#4f46e5',
          violet: '#7c3aed',
          mint: '#22c55e',
          gold: '#f59e0b',
          sky: '#38bdf8',
          rose: '#fb7185',
          cream: '#f5f3ff',
        },
      },
      boxShadow: {
        soft: '0 12px 36px rgba(30, 27, 75, 0.12)',
        card: '0 6px 20px rgba(30, 27, 75, 0.08)',
        glow: '0 0 0 4px rgba(79, 70, 229, 0.15)',
      },
      keyframes: {
        'pop-in': {
          '0%': { opacity: '0', transform: 'scale(0.92) translateY(10px)' },
          '100%': { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-4deg)' },
          '50%': { transform: 'rotate(4deg)' },
        },
        'bounce-soft': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-6px)' },
          '75%': { transform: 'translateX(6px)' },
        },
        'confetti-fall': {
          '0%': { transform: 'translateY(-10vh) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'translateY(105vh) rotate(720deg)', opacity: '0.3' },
        },
      },
      animation: {
        'pop-in': 'pop-in 0.35s ease-out both',
        'slide-up': 'slide-up 0.4s ease-out both',
        wiggle: 'wiggle 1.2s ease-in-out infinite',
        'bounce-soft': 'bounce-soft 1.6s ease-in-out infinite',
        shake: 'shake 0.35s ease-in-out',
        'confetti-fall': 'confetti-fall 3s linear forwards',
      },
    },
  },
  plugins: [],
} satisfies Config;
