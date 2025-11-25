export interface User {
  id: string
  name: string
  email: string
  avatar_url: string
  github_username: string
}

// Maps to GitHub repository roles
export type VaultPermission = 'admin' | 'maintain' | 'write' | 'triage' | 'read'

export interface Vault {
  id: string
  repo_name: string
  repo_owner: string
  repo_avatar: string
  environments: string[]
  secrets_count: number
  permission: VaultPermission
  updated_at: string
  created_at: string
}

export interface Secret {
  id: string
  name: string
  environment: string
  created_at: string
  updated_at: string
}

export interface ActivityEvent {
  id: string
  type: 'pull' | 'push' | 'rotate'
  vault_id: string
  vault_name: string
  user_name: string
  user_avatar: string
  timestamp: string
  description: string
}

export interface ApiError {
  message: string
  code?: string
}
