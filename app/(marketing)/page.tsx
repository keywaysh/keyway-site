import Link from 'next/link';
import { CopyCtaButton } from '../components/copy-cta';
import { InstallBlock } from '../components/install-block';

const problems = [
  {
    title: 'New Dev Onboarding = Broken Env',
    desc: 'Every new developer spends hours hunting down the right environment variables.',
    emoji: '🔐'
  },
  {
    title: 'Sharing .env Files is Painful',
    desc: '"Can you send me the .env?" "Which one?" "The updated one" "Check Slack"...',
    emoji: '😩'
  },
  {
    title: 'Local Setups Never Match',
    desc: 'Your local .env works. Your teammate\'s doesn\'t. Nobody knows which is right.',
    emoji: '🔄'
  },
  {
    title: 'Just Want It To Work',
    desc: 'You\'re building a product, not managing infrastructure. Environment variables shouldn\'t take 3 hours to set up.',
    emoji: '😤'
  }
];

const features = [
  {
    title: 'GitHub-Native Access',
    desc: 'If you can clone the repo, you can pull the variables. No invites. No admin approvals. Just clone and run keyway pull.',
    icon: '⚡'
  },
  {
    title: 'Works With Your Existing Workflow',
    desc: 'Keep using .env files. Keyway just makes sure everyone has the same values—without Slack or screenshots.',
    icon: '🔗'
  },
  {
    title: 'Three Commands. That\'s It.',
    desc: 'keyway init, keyway push, keyway pull. No config files. No YAML. No Docker. Just works.',
    icon: '🛡️'
  }
];

const steps = [
  { title: 'Init Your Project', desc: 'keyway init connects your repo to Keyway. One command.', code: 'keyway init' },
  { title: 'Push Your Variables', desc: 'keyway push uploads your .env values. Everyone gets them.', code: 'keyway push' },
  { title: 'Anyone Pulls', desc: 'New teammate? They run keyway pull. Their .env is ready.', code: 'keyway pull' }
];

const pricing = [
  {
    name: 'Free',
    price: 'Free',
    per: '',
    desc: 'Perfect for solo developers and side projects',
    featured: false,
    features: ['1 private repo', 'Unlimited public repos', 'Unlimited variables', 'Share with friends (pull-only)', 'Local development only', 'CLI access', 'No credit card'],
    cta: { label: 'Start Free', variant: 'secondary' as const }
  },
  {
    name: 'Pro',
    price: '9 €',
    per: '/month',
    desc: 'For freelancers managing multiple projects',
    featured: true,
    features: ['Unlimited private repos', 'Multiple environments (dev, staging, prod)', 'CI/CD integration (GitHub Actions, Vercel, Railway)', 'Web dashboard', 'Priority support'],
    cta: { label: 'Start Free Trial', variant: 'primary' as const }
  },
  {
    name: 'Team',
    price: '29 €',
    per: '/month (flat rate)',
    desc: 'For small teams (2-10 developers)',
    featured: false,
    features: ['Everything in Pro', 'Unlimited team members', 'Everyone can push & pull', 'Admin & member roles', 'Shared team dashboard', 'Team activity feed', 'Email support'],
    cta: { label: 'Start Free Trial', variant: 'secondary' as const }
  }
];

const terminalLines = [
  { text: 'npm install -g @keywaysh/cli', prompt: true },
  { text: 'added 1 package in 2s', output: true },
  { text: 'keyway init', prompt: true },
  { text: '✓ Project detected', success: true },
  { text: '✓ Vault created', success: true },
  { text: '✓ Local variables stored securely', success: true },
  { text: '# New dev joins', output: true },
  { text: 'keyway pull', prompt: true },
  { text: '✓ GitHub authenticated', success: true },
  { text: '✓ Variables synced', success: true },
  { text: '✓ .env updated', success: true }
];

export default function HomePage() {
  return (
    <>
      <div className="alpha-banner">
        <span className="alpha-badge">ALPHA</span>
        <span>Keyway is in early alpha. Data loss may occur. Use at your own risk.</span>
      </div>
      <section className="hero">
        <div className="badge">FREE FOR SOLO DEVS</div>
        <h1>Environment Variables That Sync Like GitHub</h1>
        <p className="subtitle">
          Clone the repo. Pull the variables. Start coding. It&apos;s that simple.
        </p>
        <div className="cta-group">
          <CopyCtaButton />
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
        <h2 className="section-title">The .env File Pain</h2>
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
          <h2 className="section-title">Three Commands. Zero Setup.</h2>
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
        <h2 className="section-title">Get Started in 30 Seconds</h2>
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
        <h2 className="section-title">Pricing for Small Teams</h2>
        <p style={{ color: 'var(--gray)', marginTop: '-1rem', marginBottom: '2rem' }}>
          Start free. Upgrade when you have a team.
        </p>
        <div className="pricing-grid">
          {pricing.map(plan => (
            <div className={`pricing-card ${plan.featured ? 'featured' : ''}`} key={plan.name}>
              <h3 className="pricing-name">{plan.name}</h3>
              {'desc' in plan && <p style={{ color: 'var(--gray)', fontSize: '0.9rem', marginBottom: '1rem' }}>{plan.desc}</p>}
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
        <h2>Ready to Stop Sharing .env Files?</h2>
        <p>Join 1,000+ developers who never ask &quot;Can you send me the .env?&quot; again.</p>
        <Link href="#demo" className="btn btn-primary" style={{ fontSize: '1.25rem', padding: '1.25rem 2.5rem' }}>
          Get Started Free
        </Link>
        <p style={{ marginTop: '1rem', fontSize: '0.9rem' }}>Free forever for solo developers • No credit card • 30 second setup</p>
      </section>

      <footer>
        <p>
          © 2025 Keyway. Built for developers, by developers.
          <br />
          <Link href="mailto:unlock@keyway.sh">unlock@keyway.sh</Link> • <Link href="https://github.com/keywaysh">GitHub</Link> •{' '}
          <Link href="https://www.npmjs.com/package/@keywaysh/cli">NPM</Link>
          <br />
          <span style={{ fontSize: '0.85rem', color: 'var(--gray)', marginTop: '0.5rem', display: 'inline-block' }}>
            Need more? Enterprise options available
          </span>
        </p>
      </footer>
    </>
  );
}
