'use client'

import Link from 'next/link'
import { KeywayLogo } from './logo'

export function TopBanner() {
  return (
    <div className="top-banner">
      <Link href="/" className="top-banner-logo">
        <KeywayLogo className="w-4 h-4" />
        <span>Keyway</span>
      </Link>

      <div className="top-banner-alpha">
        <span className="alpha-badge">ALPHA</span>
        <span className="hidden sm:inline">Data loss may occur</span>
      </div>

      <Link href="/login" className="top-banner-signin">
        Sign in
      </Link>
    </div>
  )
}
