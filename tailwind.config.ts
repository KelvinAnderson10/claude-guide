import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#080d18',
          secondary: '#0f172a',
          card: '#1a2744',
          'card-hover': '#1e2f52',
          terminal: '#050a12',
        },
        border: { DEFAULT: '#1e3a5f', light: '#2d4a6e' },
        accent: {
          blue: '#3b82f6',
          'blue-dim': '#1d4ed8',
          orange: '#f97316',
          'orange-dim': '#ea580c',
          green: '#22c55e',
          yellow: '#eab308',
          red: '#ef4444',
          purple: '#a855f7',
          cyan: '#06b6d4',
        },
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Cascadia Code', 'monospace'],
      },
    },
  },
  plugins: [],
};

export default config;
