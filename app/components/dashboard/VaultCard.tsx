import Link from 'next/link'
import { TrashIcon, KeyIcon, LockClosedIcon, GlobeAltIcon } from '@heroicons/react/24/outline'
import { CheckBadgeIcon, CogIcon, PencilIcon, ClipboardDocumentCheckIcon, EyeIcon } from '@heroicons/react/24/solid'
import type { Vault, VaultPermission } from '@/lib/types'
import { trackEvent, AnalyticsEvents } from '@/lib/analytics'

interface VaultCardProps {
  vault: Vault
  onDelete?: (vault: Vault) => void
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

const permissionConfig: Record<VaultPermission, { icon: typeof CheckBadgeIcon; color: string; label: string }> = {
  admin: {
    icon: CheckBadgeIcon,
    color: 'text-amber-500',
    label: 'Admin',
  },
  maintain: {
    icon: CogIcon,
    color: 'text-purple-500',
    label: 'Maintain',
  },
  write: {
    icon: PencilIcon,
    color: 'text-emerald-500',
    label: 'Write',
  },
  triage: {
    icon: ClipboardDocumentCheckIcon,
    color: 'text-blue-500',
    label: 'Triage',
  },
  read: {
    icon: EyeIcon,
    color: 'text-gray-500',
    label: 'Read',
  },
}

export function VaultCard({ vault, onDelete }: VaultCardProps) {
  const permission = permissionConfig[vault.permission]
  const canDelete = vault.permission === 'admin'
  const PermissionIcon = permission.icon

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onDelete?.(vault)
  }

  return (
    <Link
      href={`/dashboard/vaults/${vault.repo_owner}/${vault.repo_name}`}
      className="block rounded-xl bg-white p-4 shadow ring-1 ring-gray-900/5 hover:ring-gray-900/10 transition-all group relative"
      onClick={() => trackEvent(AnalyticsEvents.VAULT_CARD_CLICK, {
        vaultId: vault.id,
        repoName: `${vault.repo_owner}/${vault.repo_name}`,
      })}
    >
      <div className="absolute top-3 right-3 flex items-center gap-2">
        {canDelete && onDelete && (
          <button
            onClick={handleDelete}
            className="p-1 text-gray-400 hover:text-red-500 transition-colors opacity-100 md:opacity-0 md:group-hover:opacity-100"
            title="Delete vault"
          >
            <TrashIcon className="h-4 w-4" />
          </button>
        )}
        <div className={permission.color} title={permission.label}>
          <PermissionIcon className="h-4 w-4" />
        </div>
      </div>

      <div className="flex items-start gap-3">
        <img
          src={vault.repo_avatar}
          alt={vault.repo_owner}
          className="w-10 h-10 rounded-lg ring-1 ring-gray-200"
        />
        <div className="flex-1 min-w-0 pr-6">
          <h3 className="font-semibold text-gray-900 truncate group-hover:text-primary transition-colors flex items-center gap-1.5">
            {vault.is_private ? (
              <LockClosedIcon className="h-3.5 w-3.5 text-gray-400 shrink-0" title="Private repository" />
            ) : (
              <GlobeAltIcon className="h-3.5 w-3.5 text-gray-400 shrink-0" title="Public repository" />
            )}
            <span className="truncate">{vault.repo_owner}/{vault.repo_name}</span>
          </h3>
          <div className="flex items-center gap-3 mt-1">
            <span className="text-xs text-gray-500 flex items-center gap-1">
              <KeyIcon className="h-3.5 w-3.5" />
              {vault.secrets_count} secrets
            </span>
            <span className="text-xs text-gray-500">
              {formatTimeAgo(vault.updated_at)}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {vault.environments.map((env) => (
          <span
            key={env}
            className="px-2 py-0.5 text-xs font-medium bg-gray-100 rounded-full text-gray-600"
          >
            {env}
          </span>
        ))}
      </div>
    </Link>
  )
}

export function VaultCardSkeleton() {
  return (
    <div className="rounded-xl bg-white p-4 shadow ring-1 ring-gray-900/5 animate-pulse">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-lg bg-gray-200" />
        <div className="flex-1">
          <div className="h-5 w-32 bg-gray-200 rounded mb-2" />
          <div className="h-3 w-24 bg-gray-200 rounded" />
        </div>
      </div>
      <div className="mt-3 flex gap-1.5">
        <div className="h-5 w-16 bg-gray-200 rounded-full" />
      </div>
    </div>
  )
}
