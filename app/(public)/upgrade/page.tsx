import Link from 'next/link'
import { CheckIcon } from '@heroicons/react/24/solid'

const plans = [
  {
    name: 'Free',
    price: '$0',
    description: 'For personal projects',
    features: [
      'Unlimited public repositories',
      '1 private repository',
      'Unlimited team members',
      'CLI & Dashboard access',
    ],
    current: true,
  },
  {
    name: 'Pro',
    price: '$9',
    period: '/month',
    description: 'For professionals & small teams',
    features: [
      'Unlimited public repositories',
      'Unlimited private repositories',
      'Unlimited team members',
      'CLI & Dashboard access',
      'Priority support',
    ],
    highlighted: true,
  },
  {
    name: 'Team',
    price: '$29',
    period: '/month',
    description: 'For growing teams',
    features: [
      'Everything in Pro',
      'Audit logs',
      'SSO (coming soon)',
      'Dedicated support',
    ],
  },
]

export default function UpgradePage() {
  return (
    <div className="min-h-dvh bg-gray-950 flex flex-col">
      {/* Header */}
      <header className="border-b border-gray-800">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
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
            href="/dashboard"
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            Dashboard
          </Link>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 px-4 py-16">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Upgrade your plan
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Unlock unlimited private repositories and more features for your team.
            </p>
          </div>

          {/* Plans grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-2xl p-6 ${
                  plan.highlighted
                    ? 'bg-primary/10 border-2 border-primary'
                    : 'bg-gray-900 border border-gray-800'
                }`}
              >
                {plan.highlighted && (
                  <div className="text-primary text-sm font-medium mb-2">Most popular</div>
                )}
                <h2 className="text-xl font-bold text-white mb-1">{plan.name}</h2>
                <p className="text-gray-400 text-sm mb-4">{plan.description}</p>
                <div className="mb-6">
                  <span className="text-3xl font-bold text-white">{plan.price}</span>
                  {plan.period && <span className="text-gray-400">{plan.period}</span>}
                </div>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm">
                      <CheckIcon className="w-5 h-5 text-primary shrink-0" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                {plan.current ? (
                  <div className="w-full py-2 px-4 rounded-lg bg-gray-800 text-gray-400 text-center text-sm">
                    Current plan
                  </div>
                ) : (
                  <a
                    href="mailto:hello@keyway.sh?subject=Upgrade to Pro"
                    className={`block w-full py-2 px-4 rounded-lg text-center text-sm font-medium transition-colors ${
                      plan.highlighted
                        ? 'bg-primary hover:bg-primary/90 text-white'
                        : 'bg-gray-800 hover:bg-gray-700 text-white'
                    }`}
                  >
                    Contact us to upgrade
                  </a>
                )}
              </div>
            ))}
          </div>

          {/* Coming soon notice */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 text-center">
            <p className="text-gray-400 mb-2">
              Self-service billing is coming soon.
            </p>
            <p className="text-gray-500 text-sm">
              In the meantime, email us at{' '}
              <a href="mailto:hello@keyway.sh" className="text-primary hover:underline">
                hello@keyway.sh
              </a>{' '}
              to upgrade your plan.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-6">
        <div className="max-w-5xl mx-auto px-4 text-center text-sm text-gray-500">
          <p>
            Questions?{' '}
            <a href="mailto:hello@keyway.sh" className="text-primary hover:underline">
              Contact us
            </a>
          </p>
        </div>
      </footer>
    </div>
  )
}
