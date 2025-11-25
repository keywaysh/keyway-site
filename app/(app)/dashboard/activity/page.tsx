'use client'

import { useEffect, useState } from 'react'
import { api } from '@/lib/api'
import type { ActivityEvent } from '@/lib/types'
import {
  DashboardLayout,
  ErrorState,
  EmptyState,
} from '@/app/components/dashboard'

const activityTypeConfig = {
  pull: {
    label: 'Pull',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
      </svg>
    ),
    color: 'text-blue-400 bg-blue-400/10',
  },
  push: {
    label: 'Push',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
      </svg>
    ),
    color: 'text-green-400 bg-green-400/10',
  },
  rotate: {
    label: 'Rotate',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
    color: 'text-yellow-400 bg-yellow-400/10',
  },
}

function formatTimeAgo(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (diffInSeconds < 60) return 'just now'
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`
  return date.toLocaleDateString()
}

function ActivityRowSkeleton() {
  return (
    <div className="flex items-center gap-4 py-4 border-b border-white/[0.06] last:border-0 animate-pulse">
      <div className="w-8 h-8 rounded-full bg-white/[0.06]" />
      <div className="flex-1">
        <div className="h-4 w-48 bg-white/[0.06] rounded mb-2" />
        <div className="h-3 w-32 bg-white/[0.06] rounded" />
      </div>
      <div className="h-3 w-16 bg-white/[0.06] rounded" />
    </div>
  )
}

export default function ActivityPage() {
  const [events, setEvents] = useState<ActivityEvent[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchActivity = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await api.getActivity()
      setEvents(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load activity')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchActivity()
  }, [])

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-1 text-white">Activity</h2>
          <p className="text-gray-muted">Recent actions across all your vaults</p>
        </div>

        {error ? (
          <ErrorState message={error} onRetry={fetchActivity} />
        ) : (
          <div className="bg-card border border-card-border rounded-xl">
            <div className="px-4 py-3 border-b border-white/[0.08]">
              <h2 className="font-semibold">Recent Events</h2>
            </div>

            <div className="px-4">
              {isLoading ? (
                <>
                  {[...Array(8)].map((_, i) => (
                    <ActivityRowSkeleton key={i} />
                  ))}
                </>
              ) : events.length === 0 ? (
                <div className="py-8">
                  <EmptyState
                    title="No activity yet"
                    message="Activity will appear here when you start using Keyway"
                  />
                </div>
              ) : (
                events.map((event) => {
                  const config = activityTypeConfig[event.type]
                  return (
                    <div
                      key={event.id}
                      className="flex items-center gap-4 py-4 border-b border-white/[0.06] last:border-0"
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${config.color}`}>
                        {config.icon}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <img
                            src={event.user_avatar}
                            alt={event.user_name}
                            className="w-5 h-5 rounded-full"
                          />
                          <span className="font-medium">{event.user_name}</span>
                          <span className="text-gray-muted">{event.description}</span>
                        </div>
                        <div className="mt-1 text-xs text-gray-muted">
                          {event.vault_name}
                        </div>
                      </div>

                      <div className="text-xs text-gray-muted whitespace-nowrap">
                        {formatTimeAgo(event.timestamp)}
                      </div>
                    </div>
                  )
                })
              )}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
