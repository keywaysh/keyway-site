'use client'

import { useAuth } from '@/lib/auth'

interface TopbarProps {
  onMenuClick: () => void
}

export function Topbar({ onMenuClick }: TopbarProps) {
  const { user, isLoading, logout } = useAuth()

  return (
    <header className="h-14 min-h-[56px] shrink-0 border-b border-white/[0.08] bg-dark-darker/50 backdrop-blur-sm flex items-center justify-between px-4 md:px-6">
      <div className="flex items-center gap-3">
        {/* Hamburger menu - mobile only */}
        <button
          onClick={onMenuClick}
          className="md:hidden p-1 -ml-1 text-gray-muted hover:text-white transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div className="w-2 h-2 rounded-full bg-primary" />
        <span className="text-sm font-semibold text-white">Dashboard</span>
      </div>

      <div className="flex items-center gap-4">
        {isLoading ? (
          <div className="w-8 h-8 rounded-full bg-white/[0.08] animate-pulse" />
        ) : user ? (
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-muted hidden sm:block">
              {user.github_username || user.name}
            </span>
            <button
              onClick={logout}
              className="flex items-center gap-2 text-sm text-gray-muted hover:text-white transition-colors"
            >
              <img
                src={user.avatar_url}
                alt={user.name}
                className="w-8 h-8 rounded-full border border-white/[0.1]"
              />
            </button>
          </div>
        ) : null}
      </div>
    </header>
  )
}
