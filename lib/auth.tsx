'use client'

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { api } from './api'
import type { User } from './types'

interface AuthContextValue {
  user: User | null
  isLoading: boolean
  error: string | null
  logout: () => void
  refetch: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

// Check if logged in cookie exists
function isLoggedIn(): boolean {
  if (typeof document === 'undefined') return false
  return document.cookie.includes('keyway_logged_in=true')
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchUser = async () => {
    setIsLoading(true)
    setError(null)

    // Skip API call if not logged in
    if (!isLoggedIn()) {
      setUser(null)
      setIsLoading(false)
      return
    }

    try {
      const userData = await api.getMe()
      setUser(userData)
    } catch (err) {
      setUser(null)
      setError(err instanceof Error ? err.message : 'Failed to fetch user')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchUser()
  }, [])

  const logout = () => {
    // Clear the logged_in cookie (session cookie is HttpOnly, handled by server)
    document.cookie = 'keyway_logged_in=; Path=/; Domain=.keyway.sh; Max-Age=0'
    setUser(null)
    window.location.href = '/'
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        error,
        logout,
        refetch: fetchUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
