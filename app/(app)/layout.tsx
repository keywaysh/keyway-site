import Link from 'next/link';
import type { ReactNode } from 'react';

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="app-shell">
      <header className="app-nav">
        <Link href="/" className="app-brand">
          <span style={{ color: 'var(--primary)' }}>◆</span>
          <span>Keyway</span>
        </Link>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <Link href="/dashboard" className="btn btn-secondary" style={{ padding: '0.65rem 1rem' }}>
            Dashboard
          </Link>
          <Link href="/" className="btn btn-primary" style={{ padding: '0.65rem 1rem' }}>
            Marketing
          </Link>
        </div>
      </header>
      <main className="app-main">{children}</main>
    </div>
  );
}
