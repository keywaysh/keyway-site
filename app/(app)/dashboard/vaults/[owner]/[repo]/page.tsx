'use client'

import { useEffect, useState, useCallback } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { api } from '@/lib/api'
import type { Vault, Secret, VaultPermission } from '@/lib/types'
import {
  DashboardLayout,
  SecretRow,
  SecretRowSkeleton,
  SecretModal,
  ErrorState,
  EmptyState,
} from '@/app/components/dashboard'

// GitHub role config with Keyway-specific descriptions
const permissionConfig: Record<VaultPermission, {
  label: string
  color: string
  bgColor: string
  description: string
  canWrite: boolean
}> = {
  admin: {
    label: 'Admin',
    color: 'text-amber-400',
    bgColor: 'bg-amber-400/10',
    description: 'Full access to this repository on GitHub. Can manage secrets and vault settings.',
    canWrite: true,
  },
  maintain: {
    label: 'Maintain',
    color: 'text-purple-400',
    bgColor: 'bg-purple-400/10',
    description: 'Maintainer access on GitHub. Can manage secrets but not vault settings.',
    canWrite: true,
  },
  write: {
    label: 'Write',
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-400/10',
    description: 'Write access on GitHub. Can create, edit and delete secrets.',
    canWrite: true,
  },
  triage: {
    label: 'Triage',
    color: 'text-blue-400',
    bgColor: 'bg-blue-400/10',
    description: 'Triage access on GitHub. Can view secrets metadata only.',
    canWrite: false,
  },
  read: {
    label: 'Read',
    color: 'text-gray-400',
    bgColor: 'bg-gray-400/10',
    description: 'Read access on GitHub. Can view secrets metadata only.',
    canWrite: false,
  },
}

export default function VaultDetailPage() {
  const params = useParams()
  const owner = params.owner as string
  const repo = params.repo as string

  const [vault, setVault] = useState<Vault | null>(null)
  const [secrets, setSecrets] = useState<Secret[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingSecret, setEditingSecret] = useState<Secret | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const fetchData = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const [vaultData, secretsData] = await Promise.all([
        api.getVaultByRepo(owner, repo),
        api.getSecretsByRepo(owner, repo),
      ])
      setVault(vaultData)
      setSecrets(secretsData)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load vault')
    } finally {
      setIsLoading(false)
    }
  }, [owner, repo])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const handleCreateSecret = () => {
    setEditingSecret(null)
    setIsModalOpen(true)
  }

  const handleEditSecret = (secret: Secret) => {
    setEditingSecret(secret)
    setIsModalOpen(true)
  }

  const handleDeleteSecret = async (secret: Secret) => {
    if (!confirm(`Are you sure you want to delete "${secret.name}"?`)) return

    try {
      await api.deleteSecretByRepo(owner, repo, secret.id)
      setSecrets((prev) => prev.filter((s) => s.id !== secret.id))
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to delete secret')
    }
  }

  const handleSubmitSecret = async (data: { name: string; value: string; environment: string }) => {
    setIsSubmitting(true)
    try {
      if (editingSecret) {
        const updated = await api.updateSecretByRepo(owner, repo, editingSecret.id, {
          name: data.name,
          value: data.value || undefined,
        })
        setSecrets((prev) =>
          prev.map((s) => (s.id === editingSecret.id ? updated : s))
        )
      } else {
        const created = await api.createSecretByRepo(owner, repo, data)
        setSecrets((prev) => [...prev, created])
        // Add new environment to vault if it doesn't exist
        if (vault && !vault.environments.includes(data.environment)) {
          setVault({
            ...vault,
            environments: [...vault.environments, data.environment],
          })
        }
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  // Get unique environments from secrets + vault
  const allEnvironments = vault
    ? Array.from(new Set([...vault.environments, ...secrets.map((s) => s.environment)]))
    : ['default']

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-2">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 text-sm text-foreground-muted hover:text-foreground transition-colors py-2 pr-4"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
            </svg>
            Back to vaults
          </Link>
        </div>

        <div className="mb-6">
          {isLoading ? (
            <div className="animate-pulse">
              <div className="h-8 w-48 bg-card-border rounded mb-2" />
              <div className="h-4 w-32 bg-card-border rounded" />
            </div>
          ) : vault ? (
            <>
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={vault.repo_avatar}
                    alt={vault.repo_owner}
                    className="w-12 h-12 rounded-lg border border-card-border shrink-0"
                  />
                  <div className="min-w-0">
                    <h2 className="text-xl sm:text-2xl font-bold text-foreground break-words">
                      {vault.repo_owner}/{vault.repo_name}
                    </h2>
                    <p className="text-foreground-muted text-sm">
                      {vault.secrets_count} secrets · {vault.environments.join(', ')}
                    </p>
                  </div>
                </div>
                {permissionConfig[vault.permission].canWrite && (
                  <button
                    onClick={handleCreateSecret}
                    className="px-4 py-2 text-sm font-medium bg-primary text-dark rounded-lg hover:bg-primary-strong transition-colors flex items-center gap-2 cursor-pointer shrink-0 self-start"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add Secret
                  </button>
                )}
              </div>

              {/* Permission badge */}
              <div className={`mt-4 p-3 rounded-lg border ${permissionConfig[vault.permission].bgColor} border-card-border`}>
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-medium ${permissionConfig[vault.permission].color}`}>
                    {permissionConfig[vault.permission].label}
                  </span>
                  <span className="text-xs text-foreground-muted">on GitHub</span>
                </div>
                <p className="text-xs text-foreground-muted mt-1">
                  {permissionConfig[vault.permission].description}
                </p>
              </div>
            </>
          ) : null}
        </div>

        {error ? (
          <ErrorState message={error} onRetry={fetchData} />
        ) : (
          <div className="bg-card border border-card-border rounded-xl">
            <div className="px-4 py-3 border-b border-border">
              <h2 className="font-semibold text-foreground">Secrets</h2>
            </div>

            <div className="px-4">
              {isLoading ? (
                <>
                  {[...Array(5)].map((_, i) => (
                    <SecretRowSkeleton key={i} />
                  ))}
                </>
              ) : secrets.length === 0 ? (
                <div className="py-8">
                  <EmptyState
                    title="No secrets"
                    message="Add your first secret to this vault"
                    action={
                      <button
                        onClick={handleCreateSecret}
                        className="px-4 py-2 text-sm font-medium bg-primary text-dark rounded-lg hover:bg-primary-strong transition-colors cursor-pointer"
                      >
                        Add Secret
                      </button>
                    }
                  />
                </div>
              ) : (
                secrets.map((secret) => (
                  <SecretRow
                    key={secret.id}
                    secret={secret}
                    onEdit={vault && permissionConfig[vault.permission].canWrite ? handleEditSecret : undefined}
                    onDelete={vault && permissionConfig[vault.permission].canWrite ? handleDeleteSecret : undefined}
                  />
                ))
              )}
            </div>
          </div>
        )}

        <SecretModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmitSecret}
          secret={editingSecret}
          environments={allEnvironments}
          isLoading={isSubmitting}
        />
      </div>
    </DashboardLayout>
  )
}
