'use client'

import { useState, useEffect } from 'react'
import type { Vault } from '@/lib/types'

interface DeleteVaultModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => Promise<void>
  vault: Vault | null
}

export function DeleteVaultModal({ isOpen, onClose, onConfirm, vault }: DeleteVaultModalProps) {
  const [confirmText, setConfirmText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const hasSecrets = vault && vault.secrets_count > 0
  const expectedText = vault ? `${vault.repo_owner}/${vault.repo_name}` : ''
  const canDelete = !hasSecrets || confirmText === expectedText

  useEffect(() => {
    setConfirmText('')
    setError(null)
    setIsDeleting(false)
  }, [isOpen, vault])

  const handleDelete = async () => {
    if (!canDelete) return

    setIsDeleting(true)
    setError(null)

    try {
      await onConfirm()
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete vault')
      setIsDeleting(false)
    }
  }

  if (!isOpen || !vault) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-md bg-background border border-card-border rounded-xl shadow-2xl">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-semibold text-red-500">Delete Vault</h2>
          <button
            onClick={onClose}
            className="p-1 text-foreground-muted hover:text-foreground transition-colors cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-4">
          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-sm text-red-500">
              {error}
            </div>
          )}

          {hasSecrets ? (
            <>
              <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                <div className="flex gap-3">
                  <svg className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <div className="text-sm">
                    <p className="font-medium text-red-500">This action cannot be undone</p>
                    <p className="text-foreground-muted mt-1">
                      This will permanently delete the <span className="font-mono text-foreground">{vault.repo_owner}/{vault.repo_name}</span> vault and all <span className="font-semibold text-foreground">{vault.secrets_count} secret{vault.secrets_count > 1 ? 's' : ''}</span> it contains.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm text-foreground-muted mb-2">
                  To confirm, type <span className="font-mono text-foreground">{expectedText}</span> below:
                </label>
                <input
                  type="text"
                  value={confirmText}
                  onChange={(e) => setConfirmText(e.target.value)}
                  placeholder={expectedText}
                  className="w-full px-3 py-2 bg-background-secondary border border-card-border rounded-lg text-foreground placeholder-foreground-muted focus:outline-none focus:border-red-500/50 font-mono text-sm"
                  autoComplete="off"
                  spellCheck={false}
                />
              </div>
            </>
          ) : (
            <p className="text-foreground-muted mb-4">
              Are you sure you want to delete the vault <span className="font-mono text-foreground">{vault.repo_owner}/{vault.repo_name}</span>? This vault is empty.
            </p>
          )}

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 text-sm font-medium text-foreground bg-card border border-card-border hover:border-foreground-muted/30 rounded-lg transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleDelete}
              disabled={!canDelete || isDeleting}
              className="flex-1 px-4 py-2 text-sm font-medium bg-red-600 text-white rounded-lg hover:bg-red-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {isDeleting ? 'Deleting...' : 'Delete vault'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
