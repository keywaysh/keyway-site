import Link from 'next/link';

const defaultClientId = 'Ov23lip9QfmquuSMsLAC';
const defaultRedirect = 'https://api.keyway.sh/auth/callback?action=waitlist';
const defaultScope = 'user:email';

const githubAuthUrl =
  process.env.NEXT_PUBLIC_GITHUB_OAUTH_URL ??
  `https://github.com/login/oauth/authorize?client_id=${
    process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID ?? defaultClientId
  }&redirect_uri=${encodeURIComponent(
    process.env.NEXT_PUBLIC_GITHUB_REDIRECT ?? defaultRedirect
  )}&scope=${encodeURIComponent(process.env.NEXT_PUBLIC_GITHUB_SCOPE ?? defaultScope)}`;

const problems = [
  {
    title: '2 Hours Onboarding',
    desc: '"Can you send me the .env?" "Which one?" "The updated one" "Check Slack"...',
    emoji: '😩'
  },
  {
    title: 'Sync Nightmare',
    desc: 'Production has new keys, staging is outdated, local is... who knows?',
    emoji: '🔄'
  },
  {
    title: 'Slack = Security Risk',
    desc: 'API keys in DMs, .env files in channels, secrets in search history forever.',
    emoji: '📱'
  },
  {
    title: 'Enterprise Overkill',
    desc: 'HashiCorp Vault needs a DevOps team. You just need your env vars.',
    emoji: '🔐'
  }
];

const features = [
  {
    title: 'GitHub-Native',
    desc: 'If you have access to the repo, you have access to its secrets. No extra permissions, no admin approvals.',
    icon: '🔗'
  },
  {
    title: '12ms to Pull',
    desc: 'One command, all secrets. Faster than opening Slack. Works with any language, any framework.',
    icon: '⚡'
  },
  {
    title: 'Secure Enough™',
    desc: 'AES encryption, TLS everywhere, audit logs. Not zero-trust, but 100x better than Slack.',
    icon: '🛡️'
  }
];

const steps = [
  { title: 'Initialize Your Vault', desc: 'Run init in your project. Keyway detects your repo and creates a vault.', code: 'keyway init' },
  { title: 'Push Your Secrets', desc: 'Keyway finds your .env files and pushes them securely to the vault.', code: 'keyway push' },
  { title: 'Team Pulls Automatically', desc: 'Anyone with GitHub access runs one command. No invites, no permissions.', code: 'keyway pull' }
];

const pricing = [
  {
    name: 'Hobby',
    price: '$0',
    per: '/month',
    featured: false,
    features: ['3 vaults', 'Unlimited secrets', 'Public repos only', 'Community support'],
    cta: { label: 'Start Free', variant: 'secondary' as const }
  },
  {
    name: 'Team',
    price: '$29',
    per: '/month',
    featured: true,
    features: ['Unlimited vaults', 'Private repos', 'Audit logs', 'Priority support', 'CI/CD tokens'],
    cta: { label: 'Get Started', variant: 'primary' as const }
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    per: '',
    featured: false,
    features: ['SSO/SAML', 'Advanced audit', 'SLA guarantee', 'Dedicated support', 'On-premise option'],
    cta: { label: 'Contact Sales', variant: 'secondary' as const }
  }
];

const terminalLines = [
  { text: 'npm install -g @keywaysh/cli', prompt: true },
  { text: 'added 1 package in 2s', output: true },
  { text: 'keyway init', prompt: true },
  { text: '✓ Vault created for acme/backend', success: true },
  { text: '📄 Update README.md? Yes', output: true },
  { text: '✓ README.md updated', success: true },
  { text: '🔍 Found .env (23 variables). Push to vault? Yes', output: true },
  { text: '✓ 23 secrets pushed to vault', success: true },
  { text: '# New developer joins...', output: true },
  { text: 'git clone github.com/acme/backend', prompt: true },
  { text: 'keyway pull', prompt: true },
  { text: '✓ Authenticated via GitHub', success: true },
  { text: '✓ 23 secrets pulled in 12ms', success: true },
  { text: '✓ .env created', success: true }
];

function GitHubIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  );
}

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="badge">NOW IN BETA</div>
        <h1>One Link to All Your Secrets</h1>
        <p className="subtitle">
          Stop sending .env files on Slack. With Keyway, if you have GitHub access, you have the secrets. Simple as that.
        </p>
        <div className="cta-group">
          <Link href={githubAuthUrl} className="btn btn-primary">
            <GitHubIcon />
            Join with GitHub
          </Link>
          <Link href="#demo" className="btn btn-secondary">
            See How It Works
          </Link>
        </div>

        <div className="terminal" id="demo">
          <div className="terminal-header">
            <div className="terminal-dot" />
            <div className="terminal-dot" />
            <div className="terminal-dot" />
          </div>
          <div className="terminal-content">
            {terminalLines.map((line, idx) => (
              <div key={idx} className={`terminal-line ${line.output ? 'terminal-output' : ''} ${line.success ? 'terminal-success' : ''}`}>
                {line.prompt && <span className="terminal-prompt">$ </span>}
                {line.text}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="problem">
        <h2 className="section-title">The Daily Struggle</h2>
        <div className="problem-grid">
          {problems.map(problem => (
            <div className="problem-card" key={problem.title}>
              <div className="problem-emoji" aria-hidden="true">
                {problem.emoji}
              </div>
              <h3 className="problem-title">{problem.title}</h3>
              <p className="problem-desc">{problem.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="solution">
        <div className="solution-content">
          <h2 className="section-title">Dead Simple by Design</h2>
          <div className="feature-grid">
            {features.map(feature => (
              <div className="feature" key={feature.title}>
                <div className="feature-icon" aria-hidden="true">
                  {feature.icon}
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-desc">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="how">
        <h2 className="section-title">Setup in 30 Seconds</h2>
        <div className="steps">
          {steps.map((step, index) => (
            <div className="step" key={step.title}>
              <div className="step-number">{index + 1}</div>
              <div className="step-content">
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
                <div className="code-block">$ {step.code}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="pricing">
        <h2 className="section-title">Simple Pricing</h2>
        <p style={{ color: 'var(--gray)', marginTop: '-1rem', marginBottom: '2rem' }}>
          Start free, upgrade when you need more
        </p>
        <div className="pricing-grid">
          {pricing.map(plan => (
            <div className={`pricing-card ${plan.featured ? 'featured' : ''}`} key={plan.name}>
              <h3 className="pricing-name">{plan.name}</h3>
              <div className="pricing-price">
                {plan.price}
                <span>{plan.per}</span>
              </div>
              <ul className="pricing-features">
                {plan.features.map(feature => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              <button className={`btn btn-${plan.cta.variant}`} style={{ width: '100%' }}>
                {plan.cta.label}
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="final-cta">
        <h2>Ready to Simplify Secret Management?</h2>
        <p>Join developers from companies already using Keyway</p>
        <Link href={githubAuthUrl} className="btn btn-primary" style={{ fontSize: '1.25rem', padding: '1.25rem 2.5rem' }}>
          Get Early Access
        </Link>
        <p style={{ marginTop: '1rem', fontSize: '0.9rem' }}>No credit card required • Setup in 30 seconds</p>
      </section>

      <footer>
        <p>
          © 2024 Keyway. Built for developers, by developers.
          <br />
          <Link href="mailto:unlock@keyway.sh">unlock@keyway.sh</Link> • <Link href="https://github.com/keywaysh">GitHub</Link> •{' '}
          <Link href="https://www.npmjs.com/package/@keywaysh/cli">NPM</Link>
        </p>
      </footer>
    </>
  );
}
