import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        quest: {
          ink: '#172033',
          blue: '#4f46e5',
          mint: '#22c55e',
          gold: '#f59e0b',
          sky: '#38bdf8',
          rose: '#fb7185',
        },
      },
      boxShadow: {
        soft: '0 12px 36px rgba(23, 32, 51, 0.12)',
      },
    },
  },
  plugins: [],
} satisfies Config;
