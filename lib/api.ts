import type { User, Vault, Secret, ActivityEvent } from './types'

const API_BASE = process.env.NEXT_PUBLIC_KEYWAY_API_URL || 'https://api.keyway.sh'

const MOCK_MODE = false

// Mock data
const mockVaults: Vault[] = [
  {
    id: '1',
    repo_name: 'backend',
    repo_owner: 'acme',
    repo_avatar: 'https://avatars.githubusercontent.com/u/9919?v=4',
    environments: ['default'],
    secrets_count: 12,
    permission: 'admin',
    updated_at: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString(),
  },
  {
    id: '2',
    repo_name: 'frontend',
    repo_owner: 'acme',
    repo_avatar: 'https://avatars.githubusercontent.com/u/9919?v=4',
    environments: ['default'],
    secrets_count: 8,
    permission: 'maintain',
    updated_at: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 20).toISOString(),
  },
  {
    id: '3',
    repo_name: 'data-pipeline',
    repo_owner: 'acme',
    repo_avatar: 'https://avatars.githubusercontent.com/u/9919?v=4',
    environments: ['default'],
    secrets_count: 24,
    permission: 'write',
    updated_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 45).toISOString(),
  },
  {
    id: '4',
    repo_name: 'mobile-app',
    repo_owner: 'acme',
    repo_avatar: 'https://avatars.githubusercontent.com/u/9919?v=4',
    environments: ['default'],
    secrets_count: 6,
    permission: 'read',
    updated_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString(),
  },
]

const mockSecrets: Record<string, Secret[]> = {
  '1': [
    { id: 's1', name: 'DATABASE_URL', environment: 'default', created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString(), updated_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString() },
    { id: 's2', name: 'REDIS_URL', environment: 'default', created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString(), updated_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString() },
    { id: 's3', name: 'JWT_SECRET', environment: 'default', created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 28).toISOString(), updated_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 28).toISOString() },
    { id: 's4', name: 'STRIPE_SECRET_KEY', environment: 'default', created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 20).toISOString(), updated_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString() },
    { id: 's5', name: 'SENDGRID_API_KEY', environment: 'default', created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15).toISOString(), updated_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15).toISOString() },
    { id: 's6', name: 'AWS_ACCESS_KEY_ID', environment: 'default', created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString(), updated_at: new Date(Date.now() - 1000 * 60 * 5).toISOString() },
    { id: 's7', name: 'AWS_SECRET_ACCESS_KEY', environment: 'default', created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString(), updated_at: new Date(Date.now() - 1000 * 60 * 5).toISOString() },
  ],
  '2': [
    { id: 's8', name: 'NEXT_PUBLIC_API_URL', environment: 'default', created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 20).toISOString(), updated_at: new Date(Date.now() - 1000 * 60 * 30).toISOString() },
    { id: 's9', name: 'NEXT_PUBLIC_STRIPE_KEY', environment: 'default', created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 18).toISOString(), updated_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 18).toISOString() },
    { id: 's10', name: 'SENTRY_DSN', environment: 'default', created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 12).toISOString(), updated_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 12).toISOString() },
  ],
  '3': [
    { id: 's11', name: 'SNOWFLAKE_ACCOUNT', environment: 'default', created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 45).toISOString(), updated_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString() },
    { id: 's12', name: 'SNOWFLAKE_USER', environment: 'default', created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 45).toISOString(), updated_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString() },
    { id: 's13', name: 'SNOWFLAKE_PASSWORD', environment: 'default', created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 45).toISOString(), updated_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString() },
    { id: 's14', name: 'AIRFLOW_FERNET_KEY', environment: 'default', created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 40).toISOString(), updated_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 40).toISOString() },
  ],
  '4': [
    { id: 's15', name: 'EXPO_PUBLIC_API_URL', environment: 'default', created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString(), updated_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString() },
    { id: 's16', name: 'SENTRY_DSN', environment: 'default', created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 8).toISOString(), updated_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 8).toISOString() },
  ],
}

const mockActivity: ActivityEvent[] = [
  { id: 'a1', type: 'pull', vault_id: '1', vault_name: 'acme/backend', user_name: 'nicolas', user_avatar: 'https://avatars.githubusercontent.com/u/1234567?v=4', timestamp: new Date(Date.now() - 1000 * 60 * 2).toISOString(), description: 'pulled secrets to local' },
  { id: 'a2', type: 'push', vault_id: '2', vault_name: 'acme/frontend', user_name: 'marie', user_avatar: 'https://avatars.githubusercontent.com/u/2345678?v=4', timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(), description: 'pushed 2 new secrets' },
  { id: 'a3', type: 'rotate', vault_id: '1', vault_name: 'acme/backend', user_name: 'alex', user_avatar: 'https://avatars.githubusercontent.com/u/3456789?v=4', timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(), description: 'rotated AWS_ACCESS_KEY_ID' },
  { id: 'a4', type: 'pull', vault_id: '3', vault_name: 'acme/data-pipeline', user_name: 'nicolas', user_avatar: 'https://avatars.githubusercontent.com/u/1234567?v=4', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), description: 'pulled secrets to CI' },
  { id: 'a5', type: 'push', vault_id: '1', vault_name: 'acme/backend', user_name: 'marie', user_avatar: 'https://avatars.githubusercontent.com/u/2345678?v=4', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), description: 'updated DATABASE_URL' },
  { id: 'a6', type: 'rotate', vault_id: '2', vault_name: 'acme/frontend', user_name: 'alex', user_avatar: 'https://avatars.githubusercontent.com/u/3456789?v=4', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(), description: 'rotated SENTRY_DSN' },
  { id: 'a7', type: 'pull', vault_id: '4', vault_name: 'acme/mobile-app', user_name: 'nicolas', user_avatar: 'https://avatars.githubusercontent.com/u/1234567?v=4', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), description: 'pulled secrets to local' },
  { id: 'a8', type: 'push', vault_id: '3', vault_name: 'acme/data-pipeline', user_name: 'marie', user_avatar: 'https://avatars.githubusercontent.com/u/2345678?v=4', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 30).toISOString(), description: 'added SNOWFLAKE_WAREHOUSE' },
]

// Mock delay helper
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

// Generate unique ID
const generateId = () => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

class ApiClient {
  private async request<T>(path: string, options?: RequestInit): Promise<T> {
    const headers: Record<string, string> = {
      ...options?.headers as Record<string, string>,
    }
    // Only set Content-Type for requests with body
    if (options?.body) {
      headers['Content-Type'] = 'application/json'
    }

    const res = await fetch(`${API_BASE}${path}`, {
      ...options,
      credentials: 'include',
      headers,
    })

    if (!res.ok) {
      const error = await res.json().catch(() => ({ message: 'Request failed' }))
      throw new Error(error.message || `Request failed: ${res.status}`)
    }

    // Handle 204 No Content responses
    if (res.status === 204) {
      return undefined as T
    }

    return res.json()
  }

  async getMe(): Promise<User> {
    if (MOCK_MODE) {
      await delay(300)
      return {
        id: '1',
        name: 'Nicolas',
        email: 'nicolas@keyway.sh',
        avatar_url: 'https://avatars.githubusercontent.com/u/1234567?v=4',
        github_username: 'nicolas',
      }
    }
    const response = await this.request<{
      data: {
        id: string | null
        githubId: number
        username: string
        email: string | null
        avatarUrl: string | null
        createdAt: string | null
      }
      meta: { requestId: string }
    }>('/v1/users/me')
    const data = response.data
    return {
      id: data.id || String(data.githubId),
      name: data.username,
      email: data.email || '',
      avatar_url: data.avatarUrl || '',
      github_username: data.username,
    }
  }

  async getVaults(): Promise<Vault[]> {
    if (MOCK_MODE) {
      await delay(600)
      return mockVaults
    }
    const response = await this.request<{
      data: Array<{
        id: string
        repoOwner: string
        repoName: string
        repoAvatar: string
        secretCount: number
        environments: string[]
        permission: string
        updatedAt: string
      }>
      meta: {
        requestId: string
        pagination: { total: number; limit: number; offset: number; hasMore: boolean }
      }
    }>('/v1/vaults')
    return response.data.map(v => ({
      id: v.id,
      repo_name: v.repoName,
      repo_owner: v.repoOwner,
      repo_avatar: v.repoAvatar,
      environments: v.environments,
      secrets_count: v.secretCount,
      permission: v.permission as Vault['permission'],
      updated_at: v.updatedAt,
      created_at: v.updatedAt, // API doesn't return createdAt for list
    }))
  }

  async getVaultByRepo(owner: string, repo: string): Promise<Vault> {
    if (MOCK_MODE) {
      await delay(400)
      const vault = mockVaults.find(v => v.repo_owner === owner && v.repo_name === repo)
      if (!vault) throw new Error('Vault not found')
      return vault
    }
    const response = await this.request<{
      data: {
        id: string
        repoFullName: string
        repoOwner: string
        repoName: string
        repoAvatar: string
        secretCount: number
        environments: string[]
        permission: string
        createdAt: string
        updatedAt: string
      }
      meta: { requestId: string }
    }>(`/v1/vaults/${owner}/${repo}`)
    const data = response.data
    return {
      id: data.id,
      repo_name: data.repoName,
      repo_owner: data.repoOwner,
      repo_avatar: data.repoAvatar,
      environments: data.environments,
      secrets_count: data.secretCount,
      permission: data.permission as Vault['permission'],
      updated_at: data.updatedAt,
      created_at: data.createdAt,
    }
  }

  async getSecretsByRepo(owner: string, repo: string): Promise<Secret[]> {
    if (MOCK_MODE) {
      await delay(500)
      const vault = mockVaults.find(v => v.repo_owner === owner && v.repo_name === repo)
      if (!vault) return []
      return mockSecrets[vault.id] || []
    }
    const response = await this.request<{
      data: Array<{ id: string; key: string; environment: string; createdAt: string; updatedAt: string }>
      meta: {
        requestId: string
        pagination: { total: number; limit: number; offset: number; hasMore: boolean }
      }
    }>(`/v1/vaults/${owner}/${repo}/secrets`)
    return response.data.map(s => ({
      id: s.id,
      name: s.key,
      environment: s.environment,
      created_at: s.createdAt,
      updated_at: s.updatedAt,
    }))
  }

  async createSecret(vaultId: string, data: { name: string; value: string; environment: string }): Promise<Secret> {
    if (MOCK_MODE) {
      await delay(400)
      const newSecret: Secret = {
        id: generateId(),
        name: data.name,
        environment: data.environment,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }
      if (!mockSecrets[vaultId]) mockSecrets[vaultId] = []
      mockSecrets[vaultId].push(newSecret)
      return newSecret
    }
    return this.request<Secret>(`/api/vaults/${vaultId}/secrets`, {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async createSecretByRepo(owner: string, repo: string, data: { name: string; value: string; environment: string }): Promise<Secret> {
    if (MOCK_MODE) {
      await delay(400)
      const vault = mockVaults.find(v => v.repo_owner === owner && v.repo_name === repo)
      if (!vault) throw new Error('Vault not found')
      const newSecret: Secret = {
        id: generateId(),
        name: data.name,
        environment: data.environment,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }
      if (!mockSecrets[vault.id]) mockSecrets[vault.id] = []
      mockSecrets[vault.id].push(newSecret)
      return newSecret
    }
    const response = await this.request<{
      data: { id: string; status: string }
      meta: { requestId: string }
    }>(`/v1/vaults/${owner}/${repo}/secrets`, {
      method: 'POST',
      body: JSON.stringify({ key: data.name, value: data.value, environment: data.environment }),
    })
    // Return a partial secret (we don't get full data back from create)
    return {
      id: response.data.id,
      name: data.name,
      environment: data.environment,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
  }

  async updateSecretByRepo(owner: string, repo: string, secretId: string, data: { name?: string; value?: string }): Promise<Secret> {
    if (MOCK_MODE) {
      await delay(400)
      const vault = mockVaults.find(v => v.repo_owner === owner && v.repo_name === repo)
      if (!vault) throw new Error('Vault not found')
      const secrets = mockSecrets[vault.id] || []
      const secret = secrets.find(s => s.id === secretId)
      if (!secret) throw new Error('Secret not found')
      if (data.name) secret.name = data.name
      secret.updated_at = new Date().toISOString()
      return secret
    }
    const response = await this.request<{
      data: { id: string; key: string; environment: string; createdAt: string; updatedAt: string }
      meta: { requestId: string }
    }>(`/v1/vaults/${owner}/${repo}/secrets/${secretId}`, {
      method: 'PATCH',
      body: JSON.stringify({ key: data.name, value: data.value }),
    })
    const res = response.data
    return {
      id: res.id,
      name: res.key,
      environment: res.environment,
      created_at: res.createdAt,
      updated_at: res.updatedAt,
    }
  }

  async deleteSecretByRepo(owner: string, repo: string, secretId: string): Promise<void> {
    if (MOCK_MODE) {
      await delay(300)
      const vault = mockVaults.find(v => v.repo_owner === owner && v.repo_name === repo)
      if (!vault) return
      const secrets = mockSecrets[vault.id] || []
      const index = secrets.findIndex(s => s.id === secretId)
      if (index !== -1) secrets.splice(index, 1)
      return
    }
    await this.request<void>(`/v1/vaults/${owner}/${repo}/secrets/${secretId}`, {
      method: 'DELETE',
    })
  }

  async updateSecret(vaultId: string, secretId: string, data: { name?: string; value?: string }): Promise<Secret> {
    if (MOCK_MODE) {
      await delay(400)
      const secrets = mockSecrets[vaultId] || []
      const secret = secrets.find(s => s.id === secretId)
      if (!secret) throw new Error('Secret not found')
      if (data.name) secret.name = data.name
      secret.updated_at = new Date().toISOString()
      return secret
    }
    return this.request<Secret>(`/api/vaults/${vaultId}/secrets/${secretId}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    })
  }

  async deleteSecret(vaultId: string, secretId: string): Promise<void> {
    if (MOCK_MODE) {
      await delay(300)
      const secrets = mockSecrets[vaultId] || []
      const index = secrets.findIndex(s => s.id === secretId)
      if (index !== -1) secrets.splice(index, 1)
      return
    }
    await this.request<void>(`/api/vaults/${vaultId}/secrets/${secretId}`, {
      method: 'DELETE',
    })
  }

  async deleteVault(owner: string, repo: string): Promise<void> {
    if (MOCK_MODE) {
      await delay(300)
      const index = mockVaults.findIndex(v => v.repo_owner === owner && v.repo_name === repo)
      if (index !== -1) mockVaults.splice(index, 1)
      return
    }
    await this.request<void>(`/v1/vaults/${owner}/${repo}`, {
      method: 'DELETE',
    })
  }

  async getActivity(): Promise<ActivityEvent[]> {
    if (MOCK_MODE) {
      await delay(500)
      return mockActivity
    }
    const response = await this.request<{
      data: Array<{
        id: string
        action: string
        vaultId: string | null
        repoFullName: string | null
        actor: { id: string; username: string; avatarUrl: string | null }
        platform: string
        metadata: Record<string, unknown> | null
        timestamp: string
      }>
      meta: {
        requestId: string
        pagination: { total: number; limit: number; offset: number; hasMore: boolean }
      }
    }>('/v1/activity')

    // Map backend action types to frontend types
    const actionToType = (action: string): 'pull' | 'push' | 'rotate' => {
      if (action.includes('pull')) return 'pull'
      if (action.includes('push') || action.includes('created') || action.includes('updated')) return 'push'
      if (action.includes('rotate') || action.includes('deleted')) return 'rotate'
      return 'push'
    }

    return response.data.map(a => ({
      id: a.id,
      type: actionToType(a.action),
      vault_id: a.vaultId || '',
      vault_name: a.repoFullName || '',
      user_name: a.actor.username,
      user_avatar: a.actor.avatarUrl || '',
      timestamp: a.timestamp,
      description: a.action.replace(/_/g, ' '),
    }))
  }
}

export const api = new ApiClient()
