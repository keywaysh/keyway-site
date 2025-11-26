import type { Secret } from '@/lib/types'

interface SecretRowProps {
  secret: Secret
  onEdit?: (secret: Secret) => void
  onDelete?: (secret: Secret) => void
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export function SecretRow({ secret, onEdit, onDelete }: SecretRowProps) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-border last:border-0">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3">
          <span className="font-mono text-sm font-medium text-foreground">
            {secret.name}
          </span>
          <span className="px-2 py-0.5 text-xs font-medium bg-card-border rounded-full text-foreground-muted">
            {secret.environment}
          </span>
        </div>
        <div className="mt-1 text-xs text-foreground-muted">
          Created {formatDate(secret.created_at)} · Updated {formatDate(secret.updated_at)}
        </div>
      </div>

      {(onEdit || onDelete) && (
        <div className="flex items-center gap-2">
          {onEdit && (
            <button
              onClick={() => onEdit(secret)}
              className="p-2 text-foreground-muted hover:text-foreground hover:bg-card-border rounded-lg transition-colors cursor-pointer"
              title="Edit secret"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(secret)}
              className="p-2 text-gray-muted hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
              title="Delete secret"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export function SecretRowSkeleton() {
  return (
    <div className="flex items-center justify-between py-3 border-b border-border last:border-0 animate-pulse">
      <div className="flex-1">
        <div className="flex items-center gap-3">
          <div className="h-4 w-32 bg-card-border rounded" />
          <div className="h-5 w-16 bg-card-border rounded-full" />
        </div>
        <div className="mt-2 h-3 w-48 bg-card-border rounded" />
      </div>
      <div className="flex gap-2">
        <div className="w-8 h-8 bg-card-border rounded-lg" />
        <div className="w-8 h-8 bg-card-border rounded-lg" />
      </div>
    </div>
  )
}
