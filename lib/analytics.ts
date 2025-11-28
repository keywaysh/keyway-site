/**
 * PostHog analytics helper for client-side event tracking
 */

declare global {
  interface Window {
    posthog?: {
      capture: (event: string, properties?: Record<string, unknown>) => void;
      identify: (distinctId: string, properties?: Record<string, unknown>) => void;
    };
  }
}

/**
 * Analytics event names for consistent tracking across the site
 */
export const AnalyticsEvents = {
  // Landing page
  LANDING_VIEW: 'landing_view',
  LANDING_CTA_CLICK: 'landing_cta_click',
  PRICING_VIEW: 'pricing_view',
  PRICING_PLAN_CLICK: 'pricing_plan_click',

  // Auth flow
  LOGIN_PAGE_VIEW: 'login_page_view',
  LOGIN_GITHUB_CLICK: 'login_github_click',
  AUTH_CALLBACK_SUCCESS: 'auth_callback_success',
  AUTH_CALLBACK_ERROR: 'auth_callback_error',

  // Dashboard
  DASHBOARD_VIEW: 'dashboard_view',
  VAULT_CARD_CLICK: 'vault_card_click',
  VAULT_DETAIL_VIEW: 'vault_detail_view',
  SECRET_MODAL_OPEN: 'secret_modal_open',
  SECRET_CREATE: 'secret_create',
  SECRET_EDIT: 'secret_edit',
  SECRET_DELETE: 'secret_delete',
  ACTIVITY_VIEW: 'activity_view',
} as const;

export type AnalyticsEvent = (typeof AnalyticsEvents)[keyof typeof AnalyticsEvents];

/**
 * Track a custom event in PostHog
 * Safe to call on server or before PostHog loads - will no-op gracefully
 */
export function trackEvent(event: AnalyticsEvent | string, properties?: Record<string, unknown>) {
  if (typeof window !== 'undefined' && window.posthog) {
    window.posthog.capture(event, properties);
  }
}

/**
 * Identify a user in PostHog with properties
 */
export function identifyUser(userId: string, properties?: Record<string, unknown>) {
  if (typeof window !== 'undefined' && window.posthog) {
    window.posthog.identify(userId, properties);
  }
}
