'use client'

import Link from 'next/link'

export function TopBanner() {
  return (
    <div className="top-banner">
      <Link href="/" className="top-banner-logo">
        <span>◆</span>
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
