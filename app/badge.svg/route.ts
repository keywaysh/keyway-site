import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const svgTemplate = (label: string) => `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="180" height="32" role="img" aria-label="${label}">
  <linearGradient id="g" x2="0" y2="100%">
    <stop offset="0" stop-color="#444" stop-opacity=".2"/>
    <stop offset="1" stop-opacity=".2"/>
  </linearGradient>
  <rect rx="4" width="180" height="32" fill="#0a0e27"/>
  <rect rx="4" x="72" width="108" height="32" fill="#00dc82"/>
  <rect rx="4" width="180" height="32" fill="url(#g)"/>
  <g fill="#fff" text-anchor="middle"
     font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif"
     font-size="14">
    <text x="36" y="21" fill="#fff" opacity=".9">Keyway</text>
    <text x="126" y="21" fill="#0a0e27" font-weight="700">${label}</text>
  </g>
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

  const svg = svgTemplate(repo);
  return new NextResponse(svg, {
    status: 200,
    headers: {
      'Content-Type': 'image/svg+xml',
      // Short cache on edge/CDN so analytics still get traffic samples.
      'Cache-Control': 'public, max-age=0, s-maxage=600'
    }
  });
}
