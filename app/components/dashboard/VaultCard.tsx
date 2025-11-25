import Link from 'next/link'
import type { Vault, VaultPermission } from '@/lib/types'

interface VaultCardProps {
  vault: Vault
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

// GitHub role configurations for display
const permissionConfig: Record<VaultPermission, { icon: React.ReactNode; color: string; label: string }> = {
  admin: {
    icon: (
      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
      </svg>
    ),
    color: 'text-amber-400',
    label: 'Admin',
  },
  maintain: {
    icon: (
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    color: 'text-purple-400',
    label: 'Maintain',
  },
  write: {
    icon: (
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
      </svg>
    ),
    color: 'text-emerald-400',
    label: 'Write',
  },
  triage: {
    icon: (
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
    color: 'text-blue-400',
    label: 'Triage',
  },
  read: {
    icon: (
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 6.523 5 10 5c3.477 0 6.268 2.943 7.542 7-.274.857-.63 1.67-1.058 2.422M15 12a3 3 0 01-3 3m0 0a3 3 0 01-3-3m3 3v3" />
      </svg>
    ),
    color: 'text-gray-400',
    label: 'Read',
  },
}

export function VaultCard({ vault }: VaultCardProps) {
  const permission = permissionConfig[vault.permission]

  return (
    <Link
      href={`/dashboard/vaults/${vault.repo_owner}/${vault.repo_name}`}
      className="block bg-card border border-card-border rounded-xl p-4 hover:border-white/20 transition-colors group relative"
    >
      <div className={`absolute top-3 right-3 ${permission.color}`} title={permission.label}>
        {permission.icon}
      </div>

      <div className="flex items-start gap-3">
        <img
          src={vault.repo_avatar}
          alt={vault.repo_owner}
          className="w-10 h-10 rounded-lg border border-white/[0.1]"
        />
        <div className="flex-1 min-w-0 pr-6">
          <h3 className="font-semibold text-white truncate group-hover:text-primary transition-colors">
            {vault.repo_owner}/{vault.repo_name}
          </h3>
          <div className="flex items-center gap-3 mt-1">
            <span className="text-xs text-gray-muted flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
              </svg>
              {vault.secrets_count} secrets
            </span>
            <span className="text-xs text-gray-muted">
              {formatTimeAgo(vault.updated_at)}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {vault.environments.map((env) => (
          <span
            key={env}
            className="px-2 py-0.5 text-xs font-medium bg-white/[0.06] rounded-full text-gray-light"
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
    <div className="bg-card border border-card-border rounded-xl p-4 animate-pulse">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-lg bg-white/[0.06]" />
        <div className="flex-1">
          <div className="h-5 w-32 bg-white/[0.06] rounded mb-2" />
          <div className="h-3 w-24 bg-white/[0.06] rounded" />
        </div>
      </div>
      <div className="mt-3 flex gap-1.5">
        <div className="h-5 w-16 bg-white/[0.06] rounded-full" />
      </div>
    </div>
  )
}
