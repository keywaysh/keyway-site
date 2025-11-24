import Link from 'next/link';

const authUrl =
  process.env.NEXT_PUBLIC_KEYWAY_AUTH_URL ??
  'https://api.keyway.sh/auth/login?provider=github&return_to=https://keyway.sh';

export default function LoginPage() {
  return (
    <div className="login">
      <div className="login-card">
        <h1>Connect to Keyway</h1>
        <p>
          This front-end only build expects your API to handle OAuth and drop a session cookie (e.g. <code>keyway_session</code>).
          Replace the link below with your auth endpoint and hook middleware to your API.
        </p>
        <Link href={authUrl} className="btn btn-primary" style={{ justifyContent: 'center' }}>
          Continue with GitHub
        </Link>
        <p className="muted">
          After auth, redirect back here with a valid session. Update <code>middleware.ts</code> and add your callback route when ready.
        </p>
      </div>
    </div>
  );
}
