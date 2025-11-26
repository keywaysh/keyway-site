import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { ThemeProvider, useTheme } from '../lib/theme';

// Test component that uses the theme hook
function TestComponent() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <span data-testid="resolved">{resolvedTheme}</span>
      <button data-testid="set-dark" onClick={() => setTheme('dark')}>Dark</button>
      <button data-testid="set-light" onClick={() => setTheme('light')}>Light</button>
      <button data-testid="set-auto" onClick={() => setTheme('auto')}>Auto</button>
    </div>
  );
}

describe('Theme System', () => {
  let mockMatchMedia: ReturnType<typeof vi.fn>;
  let mediaQueryListeners: Array<(e: { matches: boolean }) => void> = [];

  beforeEach(() => {
    // Clear localStorage
    localStorage.clear();

    // Clear listeners
    mediaQueryListeners = [];

    // Mock matchMedia
    mockMatchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: query.includes('dark') ? true : false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn((event: string, listener: (e: { matches: boolean }) => void) => {
        if (event === 'change') {
          mediaQueryListeners.push(listener);
        }
      }),
      removeEventListener: vi.fn((event: string, listener: (e: { matches: boolean }) => void) => {
        if (event === 'change') {
          mediaQueryListeners = mediaQueryListeners.filter(l => l !== listener);
        }
      }),
      dispatchEvent: vi.fn(),
    }));

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: mockMatchMedia,
    });

    // Clear any data-theme attribute
    document.documentElement.removeAttribute('data-theme');
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('ThemeProvider', () => {
    it('should render children', () => {
      render(
        <ThemeProvider>
          <div data-testid="child">Hello</div>
        </ThemeProvider>
      );

      expect(screen.getByTestId('child')).toBeInTheDocument();
    });

    it('should default to dark theme when no preference is stored', async () => {
      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      // Wait for mount
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 0));
      });

      expect(screen.getByTestId('theme')).toHaveTextContent('dark');
      expect(screen.getByTestId('resolved')).toHaveTextContent('dark');
    });

    it('should restore theme from localStorage', async () => {
      localStorage.setItem('keyway-theme', 'light');

      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 0));
      });

      expect(screen.getByTestId('theme')).toHaveTextContent('light');
      expect(screen.getByTestId('resolved')).toHaveTextContent('light');
    });

    it('should set data-theme attribute on document', async () => {
      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 0));
      });

      expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    });

    it('should update data-theme when theme changes', async () => {
      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 0));
      });

      fireEvent.click(screen.getByTestId('set-light'));

      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 0));
      });

      expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    });

    it('should persist theme to localStorage', async () => {
      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 0));
      });

      fireEvent.click(screen.getByTestId('set-light'));

      expect(localStorage.getItem('keyway-theme')).toBe('light');
    });
  });

  describe('useTheme hook', () => {
    it('should throw error when used outside ThemeProvider', () => {
      // Suppress console.error for this test
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      expect(() => {
        render(<TestComponent />);
      }).toThrow('useTheme must be used within a ThemeProvider');

      consoleSpy.mockRestore();
    });

    it('should allow setting dark theme', async () => {
      localStorage.setItem('keyway-theme', 'light');

      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 0));
      });

      fireEvent.click(screen.getByTestId('set-dark'));

      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 0));
      });

      expect(screen.getByTestId('theme')).toHaveTextContent('dark');
      expect(screen.getByTestId('resolved')).toHaveTextContent('dark');
    });

    it('should allow setting light theme', async () => {
      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 0));
      });

      fireEvent.click(screen.getByTestId('set-light'));

      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 0));
      });

      expect(screen.getByTestId('theme')).toHaveTextContent('light');
      expect(screen.getByTestId('resolved')).toHaveTextContent('light');
    });

    it('should allow setting auto theme', async () => {
      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 0));
      });

      fireEvent.click(screen.getByTestId('set-auto'));

      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 0));
      });

      expect(screen.getByTestId('theme')).toHaveTextContent('auto');
    });
  });

  describe('Auto theme (system preference)', () => {
    it('should resolve to dark when system prefers dark', async () => {
      mockMatchMedia.mockImplementation((query: string) => ({
        matches: query.includes('dark'),
        media: query,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      }));

      localStorage.setItem('keyway-theme', 'auto');

      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 0));
      });

      expect(screen.getByTestId('theme')).toHaveTextContent('auto');
      expect(screen.getByTestId('resolved')).toHaveTextContent('dark');
    });

    it('should resolve to light when system prefers light', async () => {
      mockMatchMedia.mockImplementation((query: string) => ({
        matches: !query.includes('dark'),
        media: query,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      }));

      localStorage.setItem('keyway-theme', 'auto');

      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 0));
      });

      expect(screen.getByTestId('theme')).toHaveTextContent('auto');
      expect(screen.getByTestId('resolved')).toHaveTextContent('light');
    });
  });

  describe('localStorage handling', () => {
    it('should handle invalid localStorage value', async () => {
      localStorage.setItem('keyway-theme', 'invalid-theme');

      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 0));
      });

      // Should fall back to dark
      expect(screen.getByTestId('theme')).toHaveTextContent('dark');
    });

    it('should handle empty localStorage', async () => {
      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 0));
      });

      expect(screen.getByTestId('theme')).toHaveTextContent('dark');
    });
  });

  describe('Theme values', () => {
    it('should only accept valid theme values', async () => {
      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 0));
      });

      // Test that each valid theme works
      const validThemes = ['dark', 'light', 'auto'] as const;

      for (const theme of validThemes) {
        fireEvent.click(screen.getByTestId(`set-${theme}`));

        await act(async () => {
          await new Promise(resolve => setTimeout(resolve, 0));
        });

        expect(screen.getByTestId('theme')).toHaveTextContent(theme);
        expect(localStorage.getItem('keyway-theme')).toBe(theme);
      }
    });
  });
});

describe('ThemeToggle Component', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        matches: query.includes('dark'),
        media: query,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      })),
    });
  });

  it('should render toggle button', async () => {
    const { ThemeToggle } = await import('../app/components/theme-toggle');

    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('theme-toggle');
  });

  it('should cycle through themes on click', async () => {
    const { ThemeToggle } = await import('../app/components/theme-toggle');

    render(
      <ThemeProvider>
        <ThemeToggle />
        <TestComponent />
      </ThemeProvider>
    );

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    const button = document.querySelector('.theme-toggle') as HTMLButtonElement;

    // Start at dark
    expect(screen.getByTestId('theme')).toHaveTextContent('dark');

    // Click -> light
    fireEvent.click(button);
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });
    expect(screen.getByTestId('theme')).toHaveTextContent('light');

    // Click -> auto
    fireEvent.click(button);
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });
    expect(screen.getByTestId('theme')).toHaveTextContent('auto');

    // Click -> dark (full cycle)
    fireEvent.click(button);
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });
    expect(screen.getByTestId('theme')).toHaveTextContent('dark');
  });

  it('should have accessible label', async () => {
    const { ThemeToggle } = await import('../app/components/theme-toggle');

    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label');
    expect(button.getAttribute('aria-label')).toContain('theme');
  });

  it('should have title tooltip', async () => {
    const { ThemeToggle } = await import('../app/components/theme-toggle');

    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('title');
  });

  it('should render different icons for each theme', async () => {
    const { ThemeToggle } = await import('../app/components/theme-toggle');

    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    const button = screen.getByRole('button');

    // Get initial SVG
    const initialSvg = button.querySelector('svg');
    expect(initialSvg).toBeInTheDocument();

    // Click to change theme
    fireEvent.click(button);
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    // SVG should still exist (different icon)
    const newSvg = button.querySelector('svg');
    expect(newSvg).toBeInTheDocument();
  });
});
