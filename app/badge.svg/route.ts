import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const svgTemplate = () => `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="140" height="32" role="img" aria-label="Keyway badge">
  <defs>
    <linearGradient id="glow" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0%" stop-color="#1a1f3c" stop-opacity="0.9"/>
      <stop offset="100%" stop-color="#0a0e27" stop-opacity="1"/>
    </linearGradient>
  </defs>
  <rect rx="6" width="140" height="32" fill="url(#glow)"/>
  <rect rx="6" width="140" height="32" fill="rgba(255,255,255,0.04)"/>
  <g fill="#00dc82" transform="translate(12 8)">
    <rect x="0" y="0" width="6" height="16" rx="2"/>
    <rect x="8" y="0" width="6" height="16" rx="2" transform="rotate(45 11 8)"/>
  </g>
  <text x="40" y="21" fill="#e8eaed" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif" font-size="13" font-weight="700" letter-spacing="0.2">
    Keyway
  </text>
</svg>`;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const repo = searchParams.get('repo') ?? 'keyway.sh';
  const posthogKey = process.env.POSTHOG_SERVER_API_KEY;
  const posthogHost = (process.env.POSTHOG_HOST ?? 'https://app.posthog.com').replace(/\/$/, '');

  if (posthogKey) {
    const payload = {
      api_key: posthogKey,
      event: 'badge_view',
      properties: {
        repo,
        referer: request.headers.get('referer'),
        ua: request.headers.get('user-agent'),
        path: request.nextUrl.pathname + request.nextUrl.search,
        ts: Date.now()
      },
      distinct_id: repo
    };

    fetch(`${posthogHost}/capture/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }).catch(() => {});
  }

  const svg = svgTemplate();
  return new NextResponse(svg, {
    status: 200,
    headers: {
      'Content-Type': 'image/svg+xml',
      // Short cache on edge/CDN so analytics still get traffic samples.
      'Cache-Control': 'public, max-age=0, s-maxage=600'
    }
  });
}
