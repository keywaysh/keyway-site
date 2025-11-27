'use client'

import { useState, useEffect } from 'react'
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { ExclamationTriangleIcon, XMarkIcon } from '@heroicons/react/24/outline'
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

  if (!vault) return null

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30 dark:bg-black/50" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-md rounded-xl bg-white dark:bg-gray-900 shadow-xl ring-1 ring-gray-900/5 dark:ring-white/10">
          <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 px-6 py-4">
            <DialogTitle className="text-lg font-semibold text-red-600 dark:text-red-500">
              Delete Vault
            </DialogTitle>
            <button
              onClick={onClose}
              className="rounded-md p-1 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>

          <div className="p-6">
            {error && (
              <div className="mb-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-3 text-sm text-red-700 dark:text-red-400">
                {error}
              </div>
            )}

            {hasSecrets ? (
              <>
                <div className="mb-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-3">
                  <div className="flex gap-3">
                    <ExclamationTriangleIcon className="h-5 w-5 text-red-600 dark:text-red-500 flex-shrink-0 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium text-red-700 dark:text-red-400">This action cannot be undone</p>
                      <p className="text-gray-600 dark:text-gray-400 mt-1">
                        This will permanently delete the <span className="font-mono text-gray-900 dark:text-white">{vault.repo_owner}/{vault.repo_name}</span> vault and all <span className="font-semibold text-gray-900 dark:text-white">{vault.secrets_count} secret{vault.secrets_count > 1 ? 's' : ''}</span> it contains.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm text-gray-600 dark:text-gray-400 mb-2">
                    To confirm, type <span className="font-mono text-gray-900 dark:text-white">{expectedText}</span> below:
                  </label>
                  <input
                    type="text"
                    value={confirmText}
                    onChange={(e) => setConfirmText(e.target.value)}
                    placeholder={expectedText}
                    autoComplete="off"
                    spellCheck={false}
                    className="block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500 font-mono text-sm"
                  />
                </div>
              </>
            ) : (
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Are you sure you want to delete the vault <span className="font-mono text-gray-900 dark:text-white">{vault.repo_owner}/{vault.repo_name}</span>? This vault is empty.
              </p>
            )}

            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={!canDelete || isDeleting}
                className="flex-1 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isDeleting ? 'Deleting...' : 'Delete vault'}
              </button>
            </div>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  )
}
