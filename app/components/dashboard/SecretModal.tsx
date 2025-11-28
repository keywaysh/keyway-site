'use client'

import { useState, useEffect } from 'react'
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
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

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30 dark:bg-black/50" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-md rounded-xl bg-white dark:bg-gray-900 shadow-xl ring-1 ring-gray-900/5 dark:ring-white/10">
          <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 px-6 py-4">
            <DialogTitle className="text-lg font-semibold text-gray-900 dark:text-white">
              {isEditing ? 'Edit Secret' : 'Create Secret'}
            </DialogTitle>
            <button
              onClick={onClose}
              className="rounded-md p-1 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6">
            {error && (
              <div className="mb-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-3 text-sm text-red-700 dark:text-red-400">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value.toUpperCase().replace(/[^A-Z0-9_]/g, '_'))}
                  onPaste={handlePaste}
                  placeholder="API_KEY"
                  disabled={isEditing}
                  className="block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:border-primary focus:outline-hidden focus:ring-1 focus:ring-primary font-mono text-sm disabled:bg-gray-100 dark:disabled:bg-gray-700 disabled:cursor-not-allowed"
                />
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Only uppercase letters, numbers, and underscores
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Value
                </label>
                <textarea
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  onPaste={handlePaste}
                  placeholder={isEditing ? '••••••••••••••••' : 'Enter secret value or paste KEY=value'}
                  rows={3}
                  className="block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:border-primary focus:outline-hidden focus:ring-1 focus:ring-primary font-mono text-sm resize-none"
                />
                {isEditing && (
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    Leave empty to keep the current value
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
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
                        autoFocus
                        className="flex-1 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:border-primary focus:outline-hidden focus:ring-1 focus:ring-primary text-sm"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setIsCreatingEnv(false)
                          setEnvironment(environments[0] || 'default')
                        }}
                        className="rounded-lg bg-gray-100 dark:bg-gray-700 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Lowercase letters, numbers, hyphens and underscores
                    </p>
                  </div>
                ) : (
                  <select
                    value={environment}
                    onChange={(e) => handleEnvironmentChange(e.target.value)}
                    disabled={isEditing}
                    className="block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-white focus:border-primary focus:outline-hidden focus:ring-1 focus:ring-primary text-sm disabled:bg-gray-100 dark:disabled:bg-gray-700 disabled:cursor-not-allowed"
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

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-gray-900 hover:bg-primary-strong transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Saving...' : isEditing ? 'Update' : 'Create'}
              </button>
            </div>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  )
}
