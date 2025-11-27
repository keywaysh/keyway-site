'use client'

import Link from 'next/link'
import { KeywayLogo } from './logo'
import { ThemeToggle } from './theme-toggle'

export function TopBanner() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-surface-900/80 backdrop-blur-lg">
      <div className="max-w-5xl mx-auto flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-text-primary">
          <KeywayLogo className="w-5 h-5 text-primary" />
          <span>Keyway</span>
        </Link>

        {/* Alpha badge - center */}
        <div className="hidden sm:flex items-center gap-2 absolute left-1/2 -translate-x-1/2">
          <span className="px-2 py-0.5 bg-amber-500/20 text-amber-400 rounded text-xs font-bold tracking-wide border border-amber-500/30">
            ALPHA
          </span>
          <span className="text-text-muted text-sm">Data loss may occur</span>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <Link
            href="https://github.com/keywaysh"
            className="text-text-muted hover:text-text-secondary transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
          </Link>
          <ThemeToggle />
          <Link
            href="/login"
            className="px-4 py-2 rounded-lg bg-surface-800 border border-border text-text-primary text-sm font-medium hover:bg-surface-700 hover:border-border-subtle transition-colors"
          >
            Sign in
          </Link>
        </div>
      </div>
    </header>
  )
}
