import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#00dc82',
          strong: '#00c974',
        },
        dark: {
          DEFAULT: '#0a0e27',
          darker: '#050714',
        },
        gray: {
          muted: '#8b92a9',
          light: '#e8eaed',
        },
        card: {
          DEFAULT: 'rgba(255, 255, 255, 0.03)',
          border: 'rgba(255, 255, 255, 0.1)',
        },
        terminal: {
          bg: '#1e1e2e',
          green: '#00dc82',
        },
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
        mono: ['Monaco', 'Menlo', 'monospace'],
      },
    },
  },
  plugins: [],
}

export default config
