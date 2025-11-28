import Link from 'next/link'
import { KeyIcon, ArrowTopRightOnSquareIcon, LockClosedIcon } from '@heroicons/react/24/outline'

interface PageProps {
  params: Promise<{
    owner: string
    repo: string
  }>
}

export default async function PublicVaultPage({ params }: PageProps) {
  const { owner, repo } = await params
  const repoFullName = `${owner}/${repo}`

  return (
    <div className="min-h-dvh bg-gray-950 flex flex-col">
      {/* Header */}
      <header className="border-b border-gray-800">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-white font-bold text-lg">
            <div className="w-6 h-6 text-primary">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <rect x="2" y="4" width="8" height="16" rx="2" />
                <rect x="12" y="4" width="8" height="16" rx="2" transform="rotate(45 16 12)" />
              </svg>
            </div>
            Keyway
          </Link>
          <Link
            href="/login"
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            Sign in
          </Link>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="max-w-md w-full text-center">
          {/* Lock icon */}
          <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
            <LockClosedIcon className="w-8 h-8 text-primary" />
          </div>

          {/* Repository name */}
          <h1 className="text-2xl font-bold text-white mb-2">
            {repoFullName}
          </h1>
          <p className="text-gray-400 mb-8">
            This repository uses Keyway to manage its secrets securely.
          </p>

          {/* Info card */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-8 text-left">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center shrink-0">
                <KeyIcon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="font-semibold text-white mb-1">Secrets managed by Keyway</h2>
                <p className="text-sm text-gray-400">
                  Team members with repository access can sync secrets using the Keyway CLI or dashboard.
                </p>
              </div>
            </div>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href={`https://github.com/${repoFullName}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors"
            >
              View on GitHub
              <ArrowTopRightOnSquareIcon className="w-4 h-4" />
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg transition-colors"
            >
              Learn about Keyway
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-6">
        <div className="max-w-4xl mx-auto px-4 text-center text-sm text-gray-500">
          <p>
            Keyway is a GitHub-native secrets manager.{' '}
            <Link href="/" className="text-primary hover:underline">
              Get started for free
            </Link>
          </p>
        </div>
      </footer>
    </div>
  )
}
