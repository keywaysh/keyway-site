'use client'

import { useEffect, type ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth'
import { Sidebar } from './Sidebar'
import { Topbar } from './Topbar'
import { LoadingSpinner } from './LoadingSpinner'

interface LayoutProps {
  children: ReactNode
}

export function DashboardLayout({ children }: LayoutProps) {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login')
    }
  }, [isLoading, user, router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-dark-darker flex items-center justify-center">
        <LoadingSpinner />
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-dark-darker flex overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        <Topbar />
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
