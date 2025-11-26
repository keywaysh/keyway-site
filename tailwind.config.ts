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
        // Primary colors (consistent across themes)
        primary: {
          DEFAULT: 'var(--primary)',
          strong: 'var(--primary-strong)',
        },
        // Theme-aware colors
        background: {
          DEFAULT: 'var(--bg)',
          secondary: 'var(--bg-secondary)',
        },
        foreground: {
          DEFAULT: 'var(--text)',
          muted: 'var(--text-muted)',
          light: 'var(--text-light)',
        },
        card: {
          DEFAULT: 'var(--card-bg)',
          border: 'var(--card-border)',
        },
        border: 'var(--border)',
        terminal: {
          bg: 'var(--terminal-bg)',
          green: 'var(--terminal-green)',
        },
        // Legacy aliases for compatibility
        dark: {
          DEFAULT: 'var(--bg-secondary)',
          darker: 'var(--bg)',
        },
        gray: {
          muted: 'var(--text-muted)',
          light: 'var(--text-light)',
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
