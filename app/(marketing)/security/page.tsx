'use client'

import Link from 'next/link'
import { useEffect } from 'react'
import { Container } from '@/app/components/Container'
import { Button } from '@/app/components/Button'
import { trackEvent, AnalyticsEvents } from '@/lib/analytics'

// Icons
function ShieldCheckIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function LockClosedIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function KeyIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ServerIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function EyeOffIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function GlobeIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

const securityFeatures = [
  {
    name: 'AES-256-GCM Encryption',
    description:
      'The same encryption standard used by banks and governments. Each secret is encrypted with a unique random IV, making brute-force attacks mathematically impossible.',
    icon: LockClosedIcon,
  },
  {
    name: 'Encrypted at Rest',
    description:
      'Secrets are encrypted using AES-256-GCM by a dedicated service isolated from the internet. Database backups contain only encrypted data.',
    icon: EyeOffIcon,
  },
  {
    name: 'GitHub-Native Access Control',
    description:
      'No separate user management to maintain. Access is automatically tied to your GitHub repository permissions. Remove someone from the repo, they lose access to secrets instantly.',
    icon: KeyIcon,
  },
  {
    name: 'TLS 1.3 Everywhere',
    description:
      'All data in transit is protected with TLS 1.3, the latest encryption protocol. Your secrets never travel unencrypted, even between our own services.',
    icon: GlobeIcon,
  },
  {
    name: 'Isolated Infrastructure',
    description:
      'Each customer\'s data is logically isolated. We run on hardened infrastructure with automatic security updates and 24/7 monitoring.',
    icon: ServerIcon,
  },
  {
    name: 'Minimal Data Collection',
    description:
      'We only collect what\'s necessary to provide the service: your GitHub username, repository names, and encrypted secrets. No tracking, no selling data, no BS.',
    icon: ShieldCheckIcon,
  },
]

const comparisonData = [
  { method: '.env in Slack/Email', encryption: 'None', accessControl: 'None', auditLog: 'No', revocation: 'Manual hunt' },
  { method: '1Password/LastPass', encryption: 'Yes', accessControl: 'Manual', auditLog: 'Yes', revocation: 'Manual' },
  { method: 'AWS Secrets Manager', encryption: 'Yes', accessControl: 'IAM (complex)', auditLog: 'Yes', revocation: 'Manual' },
  { method: 'Keyway', encryption: 'AES-256-GCM', accessControl: 'GitHub (automatic)', auditLog: 'Coming soon', revocation: 'Automatic' },
]

function SecurityFeature({
  name,
  description,
  icon: Icon,
}: {
  name: string
  description: string
  icon: React.ComponentType<React.ComponentPropsWithoutRef<'svg'>>
}) {
  return (
    <div className="relative rounded-2xl border border-gray-200 bg-white p-8">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10">
        <Icon className="h-6 w-6 text-emerald-600" />
      </div>
      <h3 className="mt-6 text-lg font-semibold text-gray-900">{name}</h3>
      <p className="mt-2 text-sm text-gray-600">{description}</p>
    </div>
  )
}

function ComparisonTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="py-4 pr-4 font-semibold text-gray-900">Method</th>
            <th className="px-4 py-4 font-semibold text-gray-900">Encryption</th>
            <th className="px-4 py-4 font-semibold text-gray-900">Access Control</th>
            <th className="px-4 py-4 font-semibold text-gray-900">Audit Log</th>
            <th className="pl-4 py-4 font-semibold text-gray-900">Revocation</th>
          </tr>
        </thead>
        <tbody>
          {comparisonData.map((row, idx) => (
            <tr
              key={row.method}
              className={`border-b border-gray-100 ${row.method === 'Keyway' ? 'bg-emerald-50' : ''}`}
            >
              <td className={`py-4 pr-4 ${row.method === 'Keyway' ? 'font-semibold text-emerald-700' : 'text-gray-900'}`}>
                {row.method}
              </td>
              <td className={`px-4 py-4 ${row.encryption === 'None' ? 'text-red-600' : 'text-gray-700'}`}>
                {row.encryption}
              </td>
              <td className={`px-4 py-4 ${row.accessControl === 'None' ? 'text-red-600' : 'text-gray-700'}`}>
                {row.accessControl}
              </td>
              <td className={`px-4 py-4 ${row.auditLog === 'No' ? 'text-red-600' : 'text-gray-700'}`}>
                {row.auditLog}
              </td>
              <td className={`pl-4 py-4 ${row.revocation === 'Manual hunt' ? 'text-red-600' : 'text-gray-700'}`}>
                {row.revocation}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function SecurityPage() {
  useEffect(() => {
    trackEvent(AnalyticsEvents.LANDING_VIEW, { page: 'security' })
  }, [])

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gray-900 py-20 sm:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(45%_40%_at_50%_60%,rgba(16,185,129,0.12),transparent)]" />
        <Container className="relative">
          <div className="mx-auto max-w-2xl text-center">
            <div className="flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/20">
                <ShieldCheckIcon className="h-8 w-8 text-emerald-400" />
              </div>
            </div>
            <h1 className="mt-8 text-4xl font-medium tracking-tight text-white sm:text-5xl">
              Security That Makes Sense
            </h1>
            <p className="mt-6 text-lg text-gray-300">
              Your secrets are too important to share over Slack. Keyway brings enterprise-grade encryption to every team, with the simplicity developers actually want to use.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Button href="/#demo" color="green">
                Get started free
              </Button>
              <Button href="https://docs.keyway.sh" variant="outline" className="text-white border-white/20 hover:bg-white/10">
                Read the docs
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Trust indicators */}
      <section className="border-b border-gray-100 bg-gray-50 py-8">
        <Container>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>AES-256-GCM encryption</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>TLS 1.3 in transit</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>Isolated crypto service</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>GitHub-based access</span>
            </div>
          </div>
        </Container>
      </section>

      {/* The real threat */}
      <section className="py-20 sm:py-28">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-medium tracking-tight text-gray-900">
              Let&apos;s Be Honest About the Real Threat
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Most dev teams don&apos;t get hacked by sophisticated attackers. They leak secrets through the most mundane channels imaginable.
            </p>
          </div>

          <div className="mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-2">
            <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
              <h3 className="text-lg font-semibold text-red-900">How secrets actually leak</h3>
              <ul className="mt-4 space-y-3 text-sm text-red-800">
                <li className="flex gap-2">
                  <span className="text-red-400">x</span>
                  Pasted in Slack, searchable forever
                </li>
                <li className="flex gap-2">
                  <span className="text-red-400">x</span>
                  Emailed to wrong person
                </li>
                <li className="flex gap-2">
                  <span className="text-red-400">x</span>
                  Committed to git history
                </li>
                <li className="flex gap-2">
                  <span className="text-red-400">x</span>
                  Left in a Google Doc &quot;temporarily&quot;
                </li>
                <li className="flex gap-2">
                  <span className="text-red-400">x</span>
                  Screenshot in Notion page
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
              <h3 className="text-lg font-semibold text-emerald-900">How Keyway prevents this</h3>
              <ul className="mt-4 space-y-3 text-sm text-emerald-800">
                <li className="flex gap-2">
                  <span className="text-emerald-500">+</span>
                  One secure channel, always encrypted
                </li>
                <li className="flex gap-2">
                  <span className="text-emerald-500">+</span>
                  Access tied to GitHub permissions
                </li>
                <li className="flex gap-2">
                  <span className="text-emerald-500">+</span>
                  Nothing to accidentally commit
                </li>
                <li className="flex gap-2">
                  <span className="text-emerald-500">+</span>
                  No copy-pasting between apps
                </li>
                <li className="flex gap-2">
                  <span className="text-emerald-500">+</span>
                  Pull fresh secrets, never stale docs
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* Security features grid */}
      <section className="bg-gray-50 py-20 sm:py-28">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-medium tracking-tight text-gray-900">
              How We Protect Your Secrets
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              We&apos;ve implemented security best practices so you don&apos;t have to. No security degree required.
            </p>
          </div>

          <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {securityFeatures.map((feature) => (
              <SecurityFeature key={feature.name} {...feature} />
            ))}
          </div>
        </Container>
      </section>

      {/* Comparison table */}
      <section className="py-20 sm:py-28">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-medium tracking-tight text-gray-900">
              Better Than the Alternatives
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Compare Keyway to how most teams actually share secrets today.
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-4xl rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
            <ComparisonTable />
          </div>
        </Container>
      </section>

      {/* Transparency section */}
      <section className="bg-gray-900 py-20 sm:py-28">
        <Container>
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-medium tracking-tight text-white text-center">
              What We&apos;re Building Towards
            </h2>
            <p className="mt-4 text-lg text-gray-400 text-center">
              We believe in transparency. Here&apos;s what&apos;s done and what&apos;s coming.
            </p>

            <div className="mt-12 space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500/20">
                  <svg className="h-4 w-4 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-white">AES-256-GCM encryption at rest</h3>
                  <p className="mt-1 text-sm text-gray-400">Built in Go for its audited standard library cryptography. Isolated from the internet, with unique IVs per secret.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500/20">
                  <svg className="h-4 w-4 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-white">GitHub OAuth authentication</h3>
                  <p className="mt-1 text-sm text-gray-400">No passwords to manage. Access follows your GitHub permissions.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500/20">
                  <svg className="h-4 w-4 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-white">TLS 1.3 for all connections</h3>
                  <p className="mt-1 text-sm text-gray-400">Latest protocol for data in transit. No exceptions.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-500/20">
                  <svg className="h-4 w-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-white">Audit logs</h3>
                  <p className="mt-1 text-sm text-gray-400">Coming soon. Track who accessed what and when.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-500/20">
                  <svg className="h-4 w-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-white">SOC 2 Type II certification</h3>
                  <p className="mt-1 text-sm text-gray-400">On our roadmap for enterprise customers.</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="py-20 sm:py-28">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-medium tracking-tight text-gray-900">
              Security Questions
            </h2>
          </div>

          <div className="mx-auto mt-12 max-w-3xl divide-y divide-gray-200">
            <div className="py-6">
              <h3 className="text-lg font-semibold text-gray-900">Can Keyway employees see my secrets?</h3>
              <p className="mt-2 text-gray-600">
                No. Your secrets are encrypted with AES-256-GCM before they reach our servers. We don&apos;t have access to the decryption keys for your data. Even if someone accessed our database, they&apos;d only see encrypted blobs.
              </p>
            </div>

            <div className="py-6">
              <h3 className="text-lg font-semibold text-gray-900">What happens if Keyway gets breached?</h3>
              <p className="mt-2 text-gray-600">
                Attackers would get encrypted data they can&apos;t read. We use unique IVs for each secret and authentication tags to detect tampering. Without the encryption keys, your secrets remain protected.
              </p>
            </div>

            <div className="py-6">
              <h3 className="text-lg font-semibold text-gray-900">Is this secure enough for production secrets?</h3>
              <p className="mt-2 text-gray-600">
                Yes, for the vast majority of teams. We use the same encryption standard as banks (AES-256-GCM). If you&apos;re a Fortune 500 with specific compliance requirements, you might need more. For everyone else, this is significantly better than Slack or shared docs.
              </p>
            </div>

            <div className="py-6">
              <h3 className="text-lg font-semibold text-gray-900">How does access control work?</h3>
              <p className="mt-2 text-gray-600">
                We verify access through GitHub&apos;s API in real-time. If you can push to the repo, you can access its secrets. Remove someone from the repo, and they immediately lose access. No manual revocation needed.
              </p>
            </div>

            <div className="py-6">
              <h3 className="text-lg font-semibold text-gray-900">Where is data stored?</h3>
              <p className="mt-2 text-gray-600">
                Our infrastructure runs on hardened servers with automatic security updates. Encrypted backups are stored in geographically distributed locations. We&apos;ll publish more details about our infrastructure as we grow.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="bg-emerald-600 py-16">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-medium text-white sm:text-3xl">
              Secure Your Secrets in 30 Seconds
            </h2>
            <p className="mt-4 text-emerald-100">
              Stop sharing .env files over Slack. Start using encryption that actually protects you.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button href="/#demo" color="white">
                Get started free
              </Button>
              <Button
                href="mailto:hello@keyway.sh?subject=Security%20Question"
                variant="outline"
                className="text-white border-white/30 hover:bg-white/10"
              >
                Ask a security question
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  )
}
