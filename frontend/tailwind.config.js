/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          cyan: '#00e5ff',
          blue: '#3b82f6',
          purple: '#8b5cf6',
          dark: '#030303',
          card: '#09090b',
          emerald: '#10b981',
          crimson: '#f43f5e'
        },
        slate: {
          50: '#fafafa',
          100: '#f4f4f5',
          200: '#e4e4e7',
          300: '#d4d4d8',
          400: '#a1a1aa',
          500: '#71717a',
          600: '#52525b',
          700: '#3f3f46',
          800: '#27272a',
          900: '#18181b',
          950: '#09090b',
        }
      },
      fontFamily: {
        orbitron: ['Outfit', 'sans-serif'],
        rajdhani: ['Space Grotesk', 'sans-serif'],
        inter: ['Plus Jakarta Sans', 'sans-serif'],
        sans: ['Plus Jakarta Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace']
      },
      animation: {
        'neon-pulse': 'neonPulse 2s infinite alternate',
        'scan-line': 'scan 3s linear infinite',
        'slow-spin': 'spin 15s linear infinite',
        'float': 'float 4s ease-in-out infinite'
      },
      keyframes: {
        neonPulse: {
          '0%': { boxShadow: '0 0 4px #00f2fe, 0 0 10px #00f2fe' },
          '100%': { boxShadow: '0 0 12px #00f2fe, 0 0 25px #00f2fe, 0 0 35px #00f2fe' }
        },
        scan: {
          '0%': { top: '0%' },
          '50%': { top: '100%' },
          '100%': { top: '0%' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        }
      }
    },
  },
  plugins: [],
}
