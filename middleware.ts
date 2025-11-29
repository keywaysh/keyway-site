import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const protectedPaths = ['/dashboard']
const authPaths = ['/login', '/auth/callback']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const loggedInCookie = request.cookies.get('keyway_logged_in')
  const isLoggedIn = loggedInCookie?.value === 'true'

  // Check if path is protected
  const isProtectedPath = protectedPaths.some(path => pathname.startsWith(path))
  const isAuthPath = authPaths.some(path => pathname.startsWith(path))

  // Redirect to login if accessing protected route without being logged in
  if (isProtectedPath && !isLoggedIn) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Redirect to dashboard if accessing auth pages while logged in
  if (isAuthPath && isLoggedIn) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // Create response with security headers
  const response = NextResponse.next()

  // Content Security Policy (CSP)
  // Allow PostHog analytics and GitHub avatars
  const apiUrl = process.env.NEXT_PUBLIC_KEYWAY_API_URL || 'https://api.keyway.sh'
  const cspDirectives = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://us.i.posthog.com https://app.posthog.com",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https: blob:",
    "font-src 'self' data:",
    `connect-src 'self' https://us.i.posthog.com https://app.posthog.com ${apiUrl} https://localhost`,
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'"
  ]
  response.headers.set('Content-Security-Policy', cspDirectives.join('; '))

  // Additional security headers
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-XSS-Protection', '1; mode=block')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')

  // CSRF protection via origin checking for state-changing methods
  const origin = request.headers.get('origin')
  const host = request.headers.get('host')
  const method = request.method

  // Check origin for state-changing requests
  if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(method)) {
    if (origin && host) {
      const originHost = new URL(origin).host
      if (originHost !== host) {
        // Reject cross-origin state-changing requests
        return new NextResponse('Forbidden: Invalid origin', { status: 403 })
      }
    }
  }

  return response
}

export const config = {
  matcher: [
    // Apply to all routes except static files and API routes
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
  ],
}
