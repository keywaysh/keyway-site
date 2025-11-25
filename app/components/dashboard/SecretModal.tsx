'use client'

import { useState, useEffect } from 'react'
import type { Secret } from '@/lib/types'

interface SecretModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: { name: string; value: string; environment: string }) => Promise<void>
  secret?: Secret | null
  environments?: string[]
  isLoading?: boolean
}

export function SecretModal({ isOpen, onClose, onSubmit, secret, environments = ['default'], isLoading }: SecretModalProps) {
  const [name, setName] = useState('')
  const [value, setValue] = useState('')
  const [environment, setEnvironment] = useState('default')
  const [isCreatingEnv, setIsCreatingEnv] = useState(false)
  const [newEnvName, setNewEnvName] = useState('')
  const [error, setError] = useState<string | null>(null)

  const isEditing = !!secret

  useEffect(() => {
    if (secret) {
      setName(secret.name)
      setValue('')
      setEnvironment(secret.environment)
      setIsCreatingEnv(false)
      setNewEnvName('')
    } else {
      setName('')
      setValue('')
      setEnvironment(environments[0] || 'default')
      setIsCreatingEnv(false)
      setNewEnvName('')
    }
    setError(null)
  }, [secret, isOpen, environments])

  const handleEnvironmentChange = (value: string) => {
    if (value === '__new__') {
      setIsCreatingEnv(true)
      setNewEnvName('')
    } else {
      setIsCreatingEnv(false)
      setEnvironment(value)
    }
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const pasted = e.clipboardData.getData('text')

    // Check if it looks like an env var (KEY=value)
    const match = pasted.match(/^([A-Za-z_][A-Za-z0-9_]*)=([\s\S]*)$/)
    if (match) {
      e.preventDefault()
      const [, key, val] = match
      setName(key.toUpperCase())
      setValue(val)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!name.trim()) {
      setError('Name is required')
      return
    }

    if (!isEditing && !value.trim()) {
      setError('Value is required')
      return
    }

    if (isCreatingEnv && !newEnvName.trim()) {
      setError('Environment name is required')
      return
    }

    const finalEnvironment = isCreatingEnv ? newEnvName.trim().toLowerCase() : environment

    try {
      await onSubmit({ name: name.trim(), value: value.trim(), environment: finalEnvironment })
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save secret')
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-md bg-dark border border-white/[0.1] rounded-xl shadow-2xl">
        <div className="flex items-center justify-between p-4 border-b border-white/[0.08]">
          <h2 className="text-lg font-semibold">
            {isEditing ? 'Edit Secret' : 'Create Secret'}
          </h2>
          <button
            onClick={onClose}
            className="p-1 text-gray-muted hover:text-white transition-colors cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4">
          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-sm text-red-400">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-light mb-1.5">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value.toUpperCase().replace(/[^A-Z0-9_]/g, '_'))}
                onPaste={handlePaste}
                placeholder="API_KEY"
                className="w-full px-3 py-2 bg-dark-darker border border-white/[0.1] rounded-lg text-white placeholder-gray-muted focus:outline-none focus:border-primary/50 font-mono text-sm"
                disabled={isEditing}
              />
              <p className="mt-1 text-xs text-gray-muted">
                Only uppercase letters, numbers, and underscores
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-light mb-1.5">
                Value
              </label>
              <textarea
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onPaste={handlePaste}
                placeholder={isEditing ? '••••••••••••••••' : 'Enter secret value or paste KEY=value'}
                rows={3}
                className="w-full px-3 py-2 bg-dark-darker border border-white/[0.1] rounded-lg text-white placeholder-gray-muted focus:outline-none focus:border-primary/50 font-mono text-sm resize-none"
              />
              {isEditing && (
                <p className="mt-1 text-xs text-gray-muted">
                  Leave empty to keep the current value
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-light mb-1.5">
                Environment
              </label>
              {isCreatingEnv ? (
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newEnvName}
                      onChange={(e) => setNewEnvName(e.target.value.toLowerCase().replace(/[^a-z0-9-_]/g, '-'))}
                      placeholder="production"
                      className="flex-1 px-3 py-2 bg-dark-darker border border-white/[0.1] rounded-lg text-white placeholder-gray-muted focus:outline-none focus:border-primary/50 text-sm"
                      autoFocus
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setIsCreatingEnv(false)
                        setEnvironment(environments[0] || 'default')
                      }}
                      className="px-3 py-2 text-sm text-gray-muted hover:text-white bg-white/[0.06] hover:bg-white/[0.1] rounded-lg transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                  <p className="text-xs text-gray-muted">
                    Lowercase letters, numbers, hyphens and underscores
                  </p>
                </div>
              ) : (
                <select
                  value={environment}
                  onChange={(e) => handleEnvironmentChange(e.target.value)}
                  className="w-full px-3 py-2 bg-dark-darker border border-white/[0.1] rounded-lg text-white focus:outline-none focus:border-primary/50 text-sm cursor-pointer"
                  disabled={isEditing}
                >
                  {environments.map((env) => (
                    <option key={env} value={env}>{env}</option>
                  ))}
                  {!isEditing && (
                    <option value="__new__">+ New environment...</option>
                  )}
                </select>
              )}
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 text-sm font-medium bg-white/[0.06] hover:bg-white/[0.1] rounded-lg transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 px-4 py-2 text-sm font-medium bg-primary text-dark rounded-lg hover:bg-primary-strong transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {isLoading ? 'Saving...' : isEditing ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
