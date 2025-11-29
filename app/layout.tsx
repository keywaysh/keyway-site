import { type Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import clsx from 'clsx'

import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: {
    template: '%s - Keyway',
    default: 'Keyway - Environment Variables That Sync Like Git',
  },
  description:
    "The simplest way to manage your team's secrets. If you have GitHub access, you have the secrets. No more Slack. No more outdated .env files.",
  metadataBase: new URL('https://keyway.sh'),
  openGraph: {
    title: 'Keyway - Environment Variables That Sync Like Git',
    description: 'Stop sending .env files on Slack. One command and your team has all the secrets.',
    url: 'https://keyway.sh',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Keyway'
      }
    ],
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Keyway - Environment Variables That Sync Like Git',
    description: 'Stop sending .env files on Slack. One command and your team has all the secrets.',
    images: ['/og-image.png']
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY
  const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST ?? 'https://app.posthog.com'

  return (
    <html lang="en" className={clsx('bg-gray-50 antialiased', inter.variable)}>
      <head />
      <body>
        {children}
        {posthogKey ? (
          <>
            <Script
              id="posthog-js"
              src={`${posthogHost}/static/array.js`}
              strategy="afterInteractive"
            />
            <Script
              id="posthog-init"
              strategy="afterInteractive"
            >
              {`window.posthog && window.posthog.init('${posthogKey}', { api_host: '${posthogHost}', capture_pageview: true, capture_pageleave: true })`}
            </Script>
          </>
        ) : null}
      </body>
    </html>
  )
}
