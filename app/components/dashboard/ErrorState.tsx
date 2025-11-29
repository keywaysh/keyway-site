import { ExclamationTriangleIcon, InboxIcon } from '@heroicons/react/24/outline'

interface ErrorStateProps {
  title?: string
  message: string
  onRetry?: () => void
}

export function ErrorState({ title = 'Something went wrong', message, onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 gap-4">
      <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center">
        <ExclamationTriangleIcon className="h-6 w-6 text-red-500" />
      </div>
      <div className="text-center">
        <h3 className="font-medium text-gray-900 mb-1">{title}</h3>
        <p className="text-sm text-gray-500">{message}</p>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-lg transition-colors"
        >
          Try again
        </button>
      )}
    </div>
  )
}

export function EmptyState({ title, message, action }: { title: string; message: string; action?: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 gap-4">
      <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
        <InboxIcon className="h-6 w-6 text-gray-400" />
      </div>
      <div className="text-center">
        <h3 className="font-medium text-gray-900 mb-1">{title}</h3>
        <p className="text-sm text-gray-500">{message}</p>
      </div>
      {action}
    </div>
  )
}
