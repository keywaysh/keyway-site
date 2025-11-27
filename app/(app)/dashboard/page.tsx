'use client'

import { useEffect, useState } from 'react'
import { api } from '@/lib/api'
import type { Vault } from '@/lib/types'
import {
  DashboardLayout,
  VaultCard,
  VaultCardSkeleton,
  ErrorState,
  EmptyState,
  DeleteVaultModal,
} from '@/app/components/dashboard'

export default function DashboardPage() {
  const [vaults, setVaults] = useState<Vault[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [vaultToDelete, setVaultToDelete] = useState<Vault | null>(null)

  const fetchVaults = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await api.getVaults()
      setVaults(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load vaults')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchVaults()
  }, [])

  const handleDeleteVault = async () => {
    if (!vaultToDelete) return
    await api.deleteVault(vaultToDelete.repo_owner, vaultToDelete.repo_name)
    setVaults((prev) => prev.filter((v) => v.id !== vaultToDelete.id))
  }

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-1 text-foreground">Vaults</h2>
          <p className="text-gray-500 dark:text-gray-400">Manage secrets for your repositories</p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <VaultCardSkeleton key={i} />
            ))}
          </div>
        ) : error ? (
          <ErrorState message={error} onRetry={fetchVaults} />
        ) : vaults.length === 0 ? (
          <EmptyState
            title="No vaults yet"
            message="Connect a repository to get started with secret management"
            action={
              <a
                href="https://docs.keyway.sh/getting-started"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 text-sm font-medium bg-primary text-dark rounded-lg hover:bg-primary-strong transition-colors"
              >
                Get started
              </a>
            }
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {vaults.map((vault) => (
              <VaultCard key={vault.id} vault={vault} onDelete={setVaultToDelete} />
            ))}
          </div>
        )}
      </div>

      <DeleteVaultModal
        isOpen={!!vaultToDelete}
        onClose={() => setVaultToDelete(null)}
        onConfirm={handleDeleteVault}
        vault={vaultToDelete}
      />
    </DashboardLayout>
  )
}
