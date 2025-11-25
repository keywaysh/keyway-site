import Link from 'next/link'
import './terms.css'

export const metadata = {
  title: 'Terms of Service - Keyway',
  description: 'Terms of Service for Keyway',
}

export default function TermsPage() {
  return (
    <div className="terms-page">
      <div className="terms-container">
        <Link href="/" className="back-link">
          &larr; Back to home
        </Link>

        <h1>Terms of Service</h1>
        <p className="last-updated">Last updated: November 2024</p>

        <section>
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing or using Keyway, you agree to be bound by these Terms of Service.
            If you do not agree to these terms, please do not use our service.
          </p>
        </section>

        <section>
          <h2>2. Description of Service</h2>
          <p>
            Keyway is a secrets management platform that allows you to securely store and
            manage environment variables and secrets for your GitHub repositories. We provide
            tools to sync secrets between your local development environment and your repositories.
          </p>
        </section>

        <section>
          <h2>3. Account and Security</h2>
          <p>
            You are responsible for maintaining the security of your account and any activities
            that occur under your account. You must notify us immediately of any unauthorized
            use of your account.
          </p>
          <p>
            We use GitHub OAuth for authentication. By using Keyway, you also agree to
            GitHub&apos;s Terms of Service.
          </p>
        </section>

        <section>
          <h2>4. Data and Privacy</h2>
          <p>
            Your secrets are encrypted at rest using industry-standard encryption. We do not
            access, share, or sell your secret values. We only store metadata necessary to
            provide the service.
          </p>
          <p>
            We collect minimal usage data to improve the service. This includes authentication
            information from GitHub and basic usage metrics.
          </p>
        </section>

        <section>
          <h2>5. Acceptable Use</h2>
          <p>You agree not to:</p>
          <ul>
            <li>Use the service for any illegal purposes</li>
            <li>Store secrets that violate third-party rights</li>
            <li>Attempt to gain unauthorized access to our systems</li>
            <li>Interfere with or disrupt the service</li>
            <li>Reverse engineer or attempt to extract source code</li>
          </ul>
        </section>

        <section>
          <h2>6. Service Availability</h2>
          <p>
            Keyway is currently in alpha. We strive to maintain high availability but do not
            guarantee uninterrupted service. We may modify, suspend, or discontinue features
            at any time.
          </p>
        </section>

        <section>
          <h2>7. Limitation of Liability</h2>
          <p>
            Keyway is provided &quot;as is&quot; without warranties of any kind. We are not liable for
            any damages arising from your use of the service, including but not limited to
            data loss, security breaches, or service interruptions.
          </p>
        </section>

        <section>
          <h2>8. Changes to Terms</h2>
          <p>
            We may update these terms from time to time. We will notify users of significant
            changes. Continued use of the service after changes constitutes acceptance of the
            new terms.
          </p>
        </section>

        <section>
          <h2>9. Contact</h2>
          <p>
            For questions about these terms, contact us at{' '}
            <a href="mailto:hello@keyway.sh">hello@keyway.sh</a>.
          </p>
        </section>
      </div>
    </div>
  )
}
