import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'
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
    <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700 last:border-0">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3">
          <span className="font-mono text-sm font-medium text-gray-900 dark:text-white">
            {secret.name}
          </span>
          <span className="px-2 py-0.5 text-xs font-medium bg-gray-100 dark:bg-gray-700 rounded-full text-gray-600 dark:text-gray-300">
            {secret.environment}
          </span>
        </div>
        <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          Created {formatDate(secret.created_at)} · Updated {formatDate(secret.updated_at)}
        </div>
      </div>

      {(onEdit || onDelete) && (
        <div className="flex items-center gap-1">
          {onEdit && (
            <button
              onClick={() => onEdit(secret)}
              className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              title="Edit secret"
            >
              <PencilSquareIcon className="h-4 w-4" />
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(secret)}
              className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
              title="Delete secret"
            >
              <TrashIcon className="h-4 w-4" />
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export function SecretRowSkeleton() {
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700 last:border-0 animate-pulse">
      <div className="flex-1">
        <div className="flex items-center gap-3">
          <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded" />
          <div className="h-5 w-16 bg-gray-200 dark:bg-gray-700 rounded-full" />
        </div>
        <div className="mt-2 h-3 w-48 bg-gray-200 dark:bg-gray-700 rounded" />
      </div>
      <div className="flex gap-1">
        <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-lg" />
        <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-lg" />
      </div>
    </div>
  )
}
