import type { Metadata } from 'next';
import Script from 'next/script';
import type { ReactNode } from 'react';
import './globals.css';

export const metadata: Metadata = {
  title: 'Keyway - One Link to All Your Secrets',
  description:
    "The simplest way to manage your team's secrets. If you have GitHub access, you have the secrets. No more Slack. No more outdated .env files.",
  metadataBase: new URL('https://keyway.sh'),
  openGraph: {
    title: 'Keyway - One Link to All Your Secrets',
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
    title: 'Keyway - One Link to All Your Secrets',
    description: 'Stop sending .env files on Slack. One command and your team has all the secrets.',
    images: ['/og-image.png']
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST ?? 'https://app.posthog.com';

  return (
    <html lang="en">
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
  );
}
