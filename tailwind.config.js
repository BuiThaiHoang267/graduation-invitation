/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      colors: {
        ink: {
          950: '#050816',
          900: '#0a0f24',
          800: '#0f152e',
        },
        accent: {
          cyan: '#22d3ee',
          violet: '#a855f7',
          fuchsia: '#e879f9',
        },
      },
      animation: {
        'aurora-1': 'aurora1 18s ease-in-out infinite',
        'aurora-2': 'aurora2 22s ease-in-out infinite',
        'aurora-3': 'aurora3 26s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 4s ease-in-out infinite',
        'shimmer': 'shimmer 6s linear infinite',
      },
      keyframes: {
        aurora1: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '50%': { transform: 'translate(8%, -6%) scale(1.15)' },
        },
        aurora2: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '50%': { transform: 'translate(-10%, 8%) scale(1.2)' },
        },
        aurora3: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '50%': { transform: 'translate(6%, 10%) scale(1.1)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '0.55' },
          '50%': { opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '200% 50%' },
        },
      },
    },
  },
  plugins: [],
}
