import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: '#F5F0E8',
        'green-deep': '#1A3A2A',
        'green-mid': '#2D5A3D',
        gold: '#B8962E',
        'gold-light': '#D4AF5A',
      },
      fontFamily: {
        mono: ['var(--font-roboto-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
        sans: ['var(--font-roboto-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scrollBounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(8px)' },
        },
      },
      animation: {
        'fade-up':         'fadeUp 1s ease-out forwards',
        'fade-up-delay':   'fadeUp 1s ease-out 0.3s both',
        'fade-up-delay-2': 'fadeUp 1s ease-out 0.6s both',
        'fade-in':         'fadeIn 1.2s ease-out forwards',
        'scroll-bounce':   'scrollBounce 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
