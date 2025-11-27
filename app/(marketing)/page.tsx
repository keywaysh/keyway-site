'use client'

import { useId, useState } from 'react'
import Link from 'next/link'
import { Radio, RadioGroup } from '@headlessui/react'
import clsx from 'clsx'

import { Button } from '@/app/components/Button'
import { Container } from '@/app/components/Container'
import { CircleBackground } from '@/app/components/CircleBackground'

// Hero Section
function BackgroundIllustration(props: React.ComponentPropsWithoutRef<'div'>) {
  const id = useId()

  return (
    <div {...props}>
      <svg
        viewBox="0 0 1026 1026"
        fill="none"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full animate-spin-slow"
      >
        <path
          d="M1025 513c0 282.77-229.23 512-512 512S1 795.77 1 513 230.23 1 513 1s512 229.23 512 512Z"
          stroke="#D4D4D4"
          strokeOpacity="0.7"
        />
        <path
          d="M513 1025C230.23 1025 1 795.77 1 513"
          stroke={`url(#${id}-gradient-1)`}
          strokeLinecap="round"
        />
        <defs>
          <linearGradient
            id={`${id}-gradient-1`}
            x1="1"
            y1="513"
            x2="1"
            y2="1025"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#10b981" />
            <stop offset="1" stopColor="#10b981" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
      <svg
        viewBox="0 0 1026 1026"
        fill="none"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full animate-spin-reverse-slower"
      >
        <path
          d="M913 513c0 220.914-179.086 400-400 400S113 733.914 113 513s179.086-400 400-400 400 179.086 400 400Z"
          stroke="#D4D4D4"
          strokeOpacity="0.7"
        />
        <path
          d="M913 513c0 220.914-179.086 400-400 400"
          stroke={`url(#${id}-gradient-2)`}
          strokeLinecap="round"
        />
        <defs>
          <linearGradient
            id={`${id}-gradient-2`}
            x1="913"
            y1="513"
            x2="913"
            y2="913"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#10b981" />
            <stop offset="1" stopColor="#10b981" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}

function TerminalDemo() {
  const lines = [
    { type: 'prompt', text: 'npm install -g @keywaysh/cli' },
    { type: 'output', text: 'added 1 package in 2s' },
    { type: 'prompt', text: 'keyway init' },
    { type: 'success', text: '✓ Project detected' },
    { type: 'success', text: '✓ Vault created' },
    { type: 'success', text: '✓ Local variables stored securely' },
    { type: 'comment', text: '# New dev joins the team' },
    { type: 'prompt', text: 'keyway pull' },
    { type: 'success', text: '✓ GitHub authenticated' },
    { type: 'success', text: '✓ Variables synced' },
    { type: 'success', text: '✓ .env updated' },
  ]

  return (
    <div className="relative mx-auto w-full max-w-md rounded-2xl bg-gray-900 shadow-xl ring-1 ring-gray-800">
      <div className="flex items-center gap-2 border-b border-gray-800 px-4 py-3">
        <div className="h-3 w-3 rounded-full bg-red-500" />
        <div className="h-3 w-3 rounded-full bg-yellow-500" />
        <div className="h-3 w-3 rounded-full bg-green-500" />
        <span className="ml-2 text-xs text-gray-500">terminal</span>
      </div>
      <div className="p-4 font-mono text-sm">
        {lines.map((line, idx) => (
          <div
            key={idx}
            className={clsx(
              'py-0.5',
              line.type === 'prompt' && 'text-white',
              line.type === 'output' && 'text-gray-400',
              line.type === 'success' && 'text-emerald-400',
              line.type === 'comment' && 'text-gray-500',
            )}
          >
            {line.type === 'prompt' && <span className="text-emerald-400">$ </span>}
            {line.text}
          </div>
        ))}
      </div>
    </div>
  )
}

function Hero() {
  return (
    <div className="overflow-hidden py-20 sm:py-32 lg:pb-32 xl:pb-36">
      <Container>
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-8 lg:gap-y-20">
          <div className="relative z-10 mx-auto max-w-2xl lg:col-span-7 lg:max-w-none lg:pt-6 xl:col-span-6">
            <p className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-1.5 text-sm font-medium text-emerald-700 ring-1 ring-emerald-200 ring-inset">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Free for solo developers
            </p>
            <h1 className="mt-6 text-4xl font-medium tracking-tight text-gray-900">
              Environment Variables That Sync Like Git
            </h1>
            <p className="mt-6 text-lg text-gray-600">
              Clone the repo. Pull the variables. Start coding. No more Slack messages asking for
              .env files. No more broken local setups. Just one command.
            </p>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-4">
              <Button href="#demo" color="green">
                Get started free
              </Button>
              <Button href="#how-it-works" variant="outline">
                <span>See how it works</span>
              </Button>
            </div>
          </div>
          <div className="relative mt-10 sm:mt-20 lg:col-span-5 lg:row-span-2 lg:mt-0 xl:col-span-6">
            <BackgroundIllustration className="absolute top-4 left-1/2 h-[1026px] w-[1026px] -translate-x-1/3 mask-[linear-gradient(to_bottom,white_20%,transparent_75%)] stroke-gray-300/70 sm:top-16 sm:-translate-x-1/2 lg:-top-16 lg:ml-12 xl:-top-14 xl:ml-0" />
            <div className="-mx-4 h-[448px] mask-[linear-gradient(to_bottom,white_60%,transparent)] px-9 sm:mx-0 lg:absolute lg:-inset-x-10 lg:-top-10 lg:-bottom-20 lg:h-auto lg:px-0 lg:pt-10 xl:-bottom-32">
              <TerminalDemo />
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

// Problems Section
const problems = [
  {
    name: 'Onboarding Hell',
    description:
      'Every new developer spends hours hunting down environment variables from Slack, email, or outdated docs.',
    icon: DeviceAlertIcon,
  },
  {
    name: 'Slack Chaos',
    description:
      '"Can you send me the .env?" "Which one?" "The updated one" "Check #dev-secrets channel"...',
    icon: DeviceChatIcon,
  },
  {
    name: 'Config Drift',
    description:
      "Your local .env works. Your teammate's doesn't. Nobody knows which version is correct.",
    icon: DeviceSyncIcon,
  },
  {
    name: 'Wasted Time',
    description:
      "You're building a product, not managing infrastructure. Environment setup shouldn't take hours.",
    icon: DeviceClockIcon,
  },
]

function DeviceAlertIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" {...props}>
      <circle cx={16} cy={16} r={16} fill="#A3A3A3" fillOpacity={0.2} />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16 6a1 1 0 011 1v8a1 1 0 11-2 0V7a1 1 0 011-1zm0 14a1.5 1.5 0 100 3 1.5 1.5 0 000-3z"
        fill="#737373"
      />
    </svg>
  )
}

function DeviceChatIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" {...props}>
      <circle cx={16} cy={16} r={16} fill="#A3A3A3" fillOpacity={0.2} />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 10a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4v-4h-5a2 2 0 01-2-2v-8z"
        fill="#737373"
      />
    </svg>
  )
}

function DeviceSyncIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" {...props}>
      <circle cx={16} cy={16} r={16} fill="#A3A3A3" fillOpacity={0.2} />
      <path
        d="M10 16h12M10 16l3-3m-3 3l3 3m9-3l-3-3m3 3l-3 3"
        stroke="#737373"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function DeviceClockIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" {...props}>
      <circle cx={16} cy={16} r={16} fill="#A3A3A3" fillOpacity={0.2} />
      <circle cx={16} cy={16} r={8} stroke="#737373" strokeWidth={2} fill="none" />
      <path d="M16 12v4l3 3" stroke="#737373" strokeWidth={2} strokeLinecap="round" />
    </svg>
  )
}

function Problems() {
  return (
    <section id="problems" aria-label="The .env Problem" className="py-20 sm:py-32">
      <Container>
        <div className="mx-auto max-w-2xl sm:text-center">
          <h2 className="text-3xl font-medium tracking-tight text-gray-900">
            The .env Problem
          </h2>
          <p className="mt-2 text-lg text-gray-600">
            Every team deals with this. Environment variables are a mess that nobody wants to manage.
          </p>
        </div>
        <ul
          role="list"
          className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 text-sm sm:mt-20 sm:grid-cols-2 md:gap-y-10 lg:max-w-none lg:grid-cols-4"
        >
          {problems.map((problem) => (
            <li key={problem.name} className="rounded-2xl border border-gray-200 p-8">
              <problem.icon className="h-8 w-8" />
              <h3 className="mt-6 font-semibold text-gray-900">{problem.name}</h3>
              <p className="mt-2 text-gray-700">{problem.description}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}

// How it works Section
const steps = [
  { num: '01', title: 'Init', description: 'Connect your repo to Keyway', code: 'keyway init' },
  { num: '02', title: 'Push', description: 'Upload your .env values securely', code: 'keyway push' },
  { num: '03', title: 'Pull', description: 'Anyone on the team syncs instantly', code: 'keyway pull' },
]

function HowItWorks() {
  return (
    <section
      id="how-it-works"
      aria-label="How it works"
      className="bg-gray-900 py-20 sm:py-32"
    >
      <Container>
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-3xl">
          <h2 className="text-3xl font-medium tracking-tight text-white">
            Three Commands. That&apos;s It.
          </h2>
          <p className="mt-2 text-lg text-gray-400">
            No config files. No YAML. No Docker. Keyway works with your existing workflow and .env
            files.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {steps.map((step) => (
            <div key={step.num} className="relative">
              <div className="text-5xl font-bold text-gray-800">{step.num}</div>
              <h3 className="mt-4 text-xl font-semibold text-white">{step.title}</h3>
              <p className="mt-2 text-gray-400">{step.description}</p>
              <code className="mt-4 inline-block rounded-lg bg-gray-800 px-4 py-2 font-mono text-sm text-emerald-400">
                $ {step.code}
              </code>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

// Features Section
const features = [
  {
    name: 'GitHub-Native Access',
    description:
      'If you can clone the repo, you can pull the variables. No invites. No admin approvals. Access is managed through GitHub.',
    icon: GithubIcon,
  },
  {
    name: 'Zero Configuration',
    description:
      'Keep using .env files. Keyway syncs them automatically without YAML, Docker, or config files.',
    icon: ZeroConfigIcon,
  },
  {
    name: 'Encrypted at Rest',
    description:
      'AES-256-GCM encryption. Your secrets are encrypted before they leave your machine and stay encrypted.',
    icon: LockIcon,
  },
]

function GithubIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" {...props}>
      <circle cx={16} cy={16} r={16} fill="#A3A3A3" fillOpacity={0.2} />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16 8C11.58 8 8 11.58 8 16c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0024 16c0-4.42-3.58-8-8-8z"
        fill="#737373"
      />
    </svg>
  )
}

function ZeroConfigIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" {...props}>
      <circle cx={16} cy={16} r={16} fill="#A3A3A3" fillOpacity={0.2} />
      <path
        d="M10 16l4 4 8-8"
        stroke="#737373"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  )
}

function LockIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" {...props}>
      <circle cx={16} cy={16} r={16} fill="#A3A3A3" fillOpacity={0.2} />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 14v-2a4 4 0 118 0v2h1a1 1 0 011 1v6a1 1 0 01-1 1h-10a1 1 0 01-1-1v-6a1 1 0 011-1h1zm2-2a2 2 0 114 0v2h-4v-2z"
        fill="#737373"
      />
    </svg>
  )
}

function Features() {
  return (
    <section id="features" aria-label="Features" className="py-20 sm:py-32">
      <Container>
        <div className="mx-auto max-w-2xl sm:text-center">
          <h2 className="text-3xl font-medium tracking-tight text-gray-900">
            Built for Developer Experience
          </h2>
          <p className="mt-2 text-lg text-gray-600">
            We obsess over the details so you can focus on building your product.
          </p>
        </div>
        <ul
          role="list"
          className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 text-sm sm:mt-20 sm:grid-cols-2 md:gap-y-10 lg:max-w-none lg:grid-cols-3"
        >
          {features.map((feature) => (
            <li key={feature.name} className="rounded-2xl border border-gray-200 p-8">
              <feature.icon className="h-8 w-8" />
              <h3 className="mt-6 font-semibold text-gray-900">{feature.name}</h3>
              <p className="mt-2 text-gray-700">{feature.description}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}

// CTA Section
function CallToAction() {
  return (
    <section
      id="demo"
      className="relative overflow-hidden bg-gray-900 py-20 sm:py-28"
    >
      <div className="absolute top-1/2 left-20 -translate-y-1/2 sm:left-1/2 sm:-translate-x-1/2">
        <CircleBackground color="#10b981" className="animate-spin-slower" />
      </div>
      <Container className="relative">
        <div className="mx-auto max-w-md sm:text-center">
          <h2 className="text-3xl font-medium tracking-tight text-white sm:text-4xl">
            Ready to Stop Sharing .env Files?
          </h2>
          <p className="mt-4 text-lg text-gray-300">
            It takes 30 seconds to get started. Install the CLI and run keyway init in your
            project.
          </p>
          <div className="mt-8">
            <code className="block rounded-lg bg-gray-800 px-6 py-4 font-mono text-sm text-white">
              npm install -g @keywaysh/cli
            </code>
          </div>
          <div className="mt-8 flex justify-center">
            <Button href="https://www.npmjs.com/package/@keywaysh/cli" color="green">
              View on NPM
            </Button>
          </div>
          <p className="mt-4 text-sm text-gray-400">
            Free forever for solo devs • No credit card • 30 second setup
          </p>
        </div>
      </Container>
    </section>
  )
}

// Pricing Section
function CheckIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M9.307 12.248a.75.75 0 1 0-1.114 1.004l1.114-1.004ZM11 15.25l-.557.502a.75.75 0 0 0 1.15-.043L11 15.25Zm4.844-5.041a.75.75 0 0 0-1.188-.918l1.188.918Zm-7.651 3.043 2.25 2.5 1.114-1.004-2.25-2.5-1.114 1.004Zm3.4 2.457 4.25-5.5-1.187-.918-4.25 5.5 1.188.918Z"
        fill="currentColor"
      />
      <circle
        cx="12"
        cy="12"
        r="8.25"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

const plans = [
  {
    name: 'Free',
    featured: false,
    price: { Monthly: '0€', Annually: '0€' },
    description: 'Perfect for solo developers and side projects.',
    button: { label: 'Start free', href: '#demo' },
    features: [
      '1 private repo',
      'Unlimited public repos',
      'Unlimited variables',
      'CLI access',
      'No credit card required',
    ],
  },
  {
    name: 'Pro',
    featured: true,
    price: { Monthly: '9€', Annually: '90€' },
    description: 'For freelancers managing multiple projects.',
    button: { label: 'Start trial', href: '#demo' },
    features: [
      'Unlimited private repos',
      'Multiple environments',
      'CI/CD integration',
      'Web dashboard',
      'Priority support',
    ],
  },
  {
    name: 'Team',
    featured: false,
    price: { Monthly: '29€', Annually: '290€' },
    description: 'For small teams (2-10 developers).',
    button: { label: 'Start trial', href: '#demo' },
    features: [
      'Everything in Pro',
      'Unlimited team members',
      'Admin & member roles',
      'Activity feed',
      'Email support',
    ],
  },
]

function Plan({
  name,
  price,
  description,
  button,
  features,
  activePeriod,
  featured = false,
}: {
  name: string
  price: { Monthly: string; Annually: string }
  description: string
  button: { label: string; href: string }
  features: string[]
  activePeriod: 'Monthly' | 'Annually'
  featured?: boolean
}) {
  return (
    <section
      className={clsx(
        'flex flex-col overflow-hidden rounded-3xl p-6 shadow-lg shadow-gray-900/5',
        featured ? 'order-first bg-gray-900 lg:order-0' : 'bg-white',
      )}
    >
      <h3
        className={clsx(
          'flex items-center text-sm font-semibold',
          featured ? 'text-white' : 'text-gray-900',
        )}
      >
        <span>{name}</span>
      </h3>
      <p
        className={clsx(
          'relative mt-5 flex text-3xl tracking-tight',
          featured ? 'text-white' : 'text-gray-900',
        )}
      >
        {price.Monthly === price.Annually ? (
          price.Monthly
        ) : (
          <>
            <span
              aria-hidden={activePeriod === 'Annually'}
              className={clsx(
                'transition duration-300',
                activePeriod === 'Annually' &&
                  'pointer-events-none translate-x-6 opacity-0 select-none',
              )}
            >
              {price.Monthly}
            </span>
            <span
              aria-hidden={activePeriod === 'Monthly'}
              className={clsx(
                'absolute top-0 left-0 transition duration-300',
                activePeriod === 'Monthly' &&
                  'pointer-events-none -translate-x-6 opacity-0 select-none',
              )}
            >
              {price.Annually}
            </span>
          </>
        )}
      </p>
      <p
        className={clsx('mt-3 text-sm', featured ? 'text-gray-300' : 'text-gray-700')}
      >
        {description}
      </p>
      <div className="order-last mt-6">
        <ul
          role="list"
          className={clsx(
            '-my-2 divide-y text-sm',
            featured ? 'divide-gray-800 text-gray-300' : 'divide-gray-200 text-gray-700',
          )}
        >
          {features.map((feature) => (
            <li key={feature} className="flex py-2">
              <CheckIcon
                className={clsx('h-6 w-6 flex-none', featured ? 'text-white' : 'text-emerald-500')}
              />
              <span className="ml-4">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      <Button
        href={button.href}
        color={featured ? 'green' : 'gray'}
        className="mt-6"
      >
        {button.label}
      </Button>
    </section>
  )
}

function Pricing() {
  const [activePeriod, setActivePeriod] = useState<'Monthly' | 'Annually'>('Monthly')

  return (
    <section
      id="pricing"
      aria-labelledby="pricing-title"
      className="border-t border-gray-200 bg-gray-100 py-20 sm:py-32"
    >
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 id="pricing-title" className="text-3xl font-medium tracking-tight text-gray-900">
            Simple Pricing
          </h2>
          <p className="mt-2 text-lg text-gray-600">
            Start free. Upgrade when your team grows.
          </p>
        </div>

        <div className="mt-8 flex justify-center">
          <div className="relative">
            <RadioGroup
              value={activePeriod}
              onChange={setActivePeriod}
              className="grid grid-cols-2"
            >
              {['Monthly', 'Annually'].map((period) => (
                <Radio
                  key={period}
                  value={period}
                  className={clsx(
                    'cursor-pointer border border-gray-300 px-[calc(--spacing(3)-1px)] py-[calc(--spacing(2)-1px)] text-sm text-gray-700 transition-colors hover:border-gray-400 data-focus:outline-2 data-focus:outline-offset-2',
                    period === 'Monthly' ? 'rounded-l-lg' : '-ml-px rounded-r-lg',
                  )}
                >
                  {period}
                </Radio>
              ))}
            </RadioGroup>
            <div
              aria-hidden="true"
              className={clsx(
                'pointer-events-none absolute inset-0 z-10 grid grid-cols-2 overflow-hidden rounded-lg bg-emerald-500 transition-all duration-300',
                activePeriod === 'Monthly'
                  ? '[clip-path:inset(0_50%_0_0)]'
                  : '[clip-path:inset(0_0_0_calc(50%-1px))]',
              )}
            >
              {['Monthly', 'Annually'].map((period) => (
                <div
                  key={period}
                  className={clsx(
                    'py-2 text-center text-sm font-semibold text-white',
                    period === 'Annually' && '-ml-px',
                  )}
                >
                  {period}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 items-start gap-x-8 gap-y-10 sm:mt-20 lg:max-w-none lg:grid-cols-3">
          {plans.map((plan) => (
            <Plan key={plan.name} {...plan} activePeriod={activePeriod} />
          ))}
        </div>
      </Container>
    </section>
  )
}

// Main Page
export default function HomePage() {
  return (
    <>
      <Hero />
      <Problems />
      <HowItWorks />
      <Features />
      <CallToAction />
      <Pricing />
    </>
  )
}
