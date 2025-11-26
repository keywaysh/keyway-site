import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// We test the API client by mocking fetch
describe('ApiClient', () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    vi.resetModules();
    global.fetch = vi.fn();
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  describe('request handling', () => {
    it('should set Content-Type only when body is present', async () => {
      const mockFetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({
          data: [],
          meta: { requestId: 'req-1', pagination: { total: 0, limit: 20, offset: 0, hasMore: false } },
        }),
      });
      global.fetch = mockFetch;

      // Import fresh to get clean module
      const { api } = await import('../lib/api');

      // GET request (no body)
      await api.getVaults();

      const getCall = mockFetch.mock.calls[0];
      expect(getCall[1].headers['Content-Type']).toBeUndefined();
    });

    it('should set Content-Type for POST requests with body', async () => {
      const mockFetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ data: { id: '123', status: 'created' }, meta: { requestId: 'req-1' } }),
      });
      global.fetch = mockFetch;

      const { api } = await import('../lib/api');

      await api.createSecretByRepo('owner', 'repo', {
        name: 'TEST_KEY',
        value: 'test-value',
        environment: 'default',
      });

      const postCall = mockFetch.mock.calls[0];
      expect(postCall[1].headers['Content-Type']).toBe('application/json');
      expect(postCall[1].body).toBeDefined();
    });

    it('should NOT set Content-Type for DELETE requests without body', async () => {
      const mockFetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({}),
      });
      global.fetch = mockFetch;

      const { api } = await import('../lib/api');

      await api.deleteVault('owner', 'repo');

      const deleteCall = mockFetch.mock.calls[0];
      expect(deleteCall[1].method).toBe('DELETE');
      expect(deleteCall[1].headers['Content-Type']).toBeUndefined();
      expect(deleteCall[1].body).toBeUndefined();
    });

    it('should include credentials in requests', async () => {
      const mockFetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({
          data: [],
          meta: { requestId: 'req-1', pagination: { total: 0, limit: 20, offset: 0, hasMore: false } },
        }),
      });
      global.fetch = mockFetch;

      const { api } = await import('../lib/api');
      await api.getVaults();

      expect(mockFetch.mock.calls[0][1].credentials).toBe('include');
    });

    it('should throw error on non-ok response', async () => {
      const mockFetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 404,
        json: () => Promise.resolve({ message: 'Vault not found' }),
      });
      global.fetch = mockFetch;

      const { api } = await import('../lib/api');

      await expect(api.getVaultByRepo('owner', 'nonexistent')).rejects.toThrow('Vault not found');
    });

    it('should handle JSON parse errors gracefully', async () => {
      const mockFetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 500,
        json: () => Promise.reject(new Error('Invalid JSON')),
      });
      global.fetch = mockFetch;

      const { api } = await import('../lib/api');

      await expect(api.getVaults()).rejects.toThrow('Request failed');
    });
  });

  describe('data transformation', () => {
    it('should transform vault response to frontend format', async () => {
      const mockFetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({
          data: [{
            id: 'vault-123',
            repoOwner: 'my-org',
            repoName: 'my-repo',
            repoAvatar: 'https://example.com/avatar.png',
            secretCount: 5,
            environments: ['default', 'production'],
            permission: 'admin',
            updatedAt: '2024-01-01T00:00:00Z',
          }],
          meta: {
            requestId: 'req-1',
            pagination: { total: 1, limit: 20, offset: 0, hasMore: false },
          },
        }),
      });
      global.fetch = mockFetch;

      const { api } = await import('../lib/api');
      const vaults = await api.getVaults();

      expect(vaults).toHaveLength(1);
      expect(vaults[0]).toEqual({
        id: 'vault-123',
        repo_name: 'my-repo',
        repo_owner: 'my-org',
        repo_avatar: 'https://example.com/avatar.png',
        secrets_count: 5,
        environments: ['default', 'production'],
        permission: 'admin',
        updated_at: '2024-01-01T00:00:00Z',
        created_at: '2024-01-01T00:00:00Z',
      });
    });

    it('should transform user response to frontend format', async () => {
      const mockFetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({
          data: {
            id: 'user-123',
            githubId: 12345,
            username: 'testuser',
            email: 'test@example.com',
            avatarUrl: 'https://example.com/avatar.png',
            createdAt: '2024-01-01T00:00:00Z',
          },
          meta: { requestId: 'req-1' },
        }),
      });
      global.fetch = mockFetch;

      const { api } = await import('../lib/api');
      const user = await api.getMe();

      expect(user).toEqual({
        id: 'user-123',
        name: 'testuser',
        email: 'test@example.com',
        avatar_url: 'https://example.com/avatar.png',
        github_username: 'testuser',
      });
    });

    it('should transform secrets response to frontend format', async () => {
      const mockFetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({
          data: [{
            id: 'secret-123',
            key: 'DATABASE_URL',
            environment: 'production',
            createdAt: '2024-01-01T00:00:00Z',
            updatedAt: '2024-01-15T00:00:00Z',
          }],
          meta: {
            requestId: 'req-1',
            pagination: { total: 1, limit: 20, offset: 0, hasMore: false },
          },
        }),
      });
      global.fetch = mockFetch;

      const { api } = await import('../lib/api');
      const secrets = await api.getSecretsByRepo('owner', 'repo');

      expect(secrets).toHaveLength(1);
      expect(secrets[0]).toEqual({
        id: 'secret-123',
        name: 'DATABASE_URL',
        environment: 'production',
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-15T00:00:00Z',
      });
    });

    it('should transform activity response with action mapping', async () => {
      const mockFetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({
          data: [
            {
              id: 'act-1',
              action: 'secrets_pulled',
              vaultId: 'vault-1',
              repoFullName: 'owner/repo',
              actor: { id: 'user-1', username: 'testuser', avatarUrl: 'https://example.com/avatar.png' },
              platform: 'cli',
              metadata: null,
              timestamp: '2024-01-01T00:00:00Z',
            },
            {
              id: 'act-2',
              action: 'secret_created',
              vaultId: 'vault-1',
              repoFullName: 'owner/repo',
              actor: { id: 'user-1', username: 'testuser', avatarUrl: null },
              platform: 'web',
              metadata: null,
              timestamp: '2024-01-02T00:00:00Z',
            },
          ],
          meta: {
            requestId: 'req-1',
            pagination: { total: 2, limit: 20, offset: 0, hasMore: false },
          },
        }),
      });
      global.fetch = mockFetch;

      const { api } = await import('../lib/api');
      const activity = await api.getActivity();

      expect(activity).toHaveLength(2);
      expect(activity[0].type).toBe('pull');
      expect(activity[1].type).toBe('push');
    });
  });
});
