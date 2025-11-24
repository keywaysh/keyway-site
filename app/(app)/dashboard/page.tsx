const sampleVaults = [
  { name: 'acme/backend', secrets: 23, updated: '3m ago', envs: ['prod', 'staging', 'local'] },
  { name: 'acme/mobile', secrets: 14, updated: '42m ago', envs: ['prod', 'staging'] },
  { name: 'acme/data-pipeline', secrets: 31, updated: '1h ago', envs: ['prod', 'dev'] }
];

const activity = [
  { action: 'Pulled secrets', user: 'nina', when: '2m ago' },
  { action: 'Pushed env vars', user: 'devin', when: '28m ago' },
  { action: 'Rotated API key', user: 'alex', when: '1h ago' },
  { action: 'Added vault', user: 'kristen', when: '4h ago' }
];

export default function DashboardPage() {
  return (
    <div className="dashboard">
      <div className="dash-header">
        <h1>Vaults</h1>
        <p>Front-only placeholder. Wire this to the Keyway API to fetch vaults, activity, and permissions.</p>
      </div>

      <div className="dashboard-grid">
        {sampleVaults.map(vault => (
          <div className="dash-card" key={vault.name}>
            <div className="pill">{vault.name}</div>
            <h3>{vault.secrets} secrets</h3>
            <p>Updated {vault.updated}</p>
            <div className="pill" style={{ background: 'rgba(0, 220, 130, 0.12)', color: '#fff' }}>
              {vault.envs.join(' · ')}
            </div>
          </div>
        ))}
      </div>

      <div className="activity-list">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
          <h3 style={{ margin: 0 }}>Recent activity</h3>
          <span className="muted">Backed by API soon</span>
        </div>
        {activity.map(item => (
          <div className="activity-row" key={`${item.action}-${item.when}`}>
            <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
              <span className="pill">{item.user}</span>
              <span>{item.action}</span>
            </div>
            <span>{item.when}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
