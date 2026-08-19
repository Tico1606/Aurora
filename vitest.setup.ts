import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

process.env.NEXT_PUBLIC_APP_URL ??= 'http://localhost:3000'
process.env.NEXT_PUBLIC_SUPABASE_URL ??= 'https://example.supabase.co'
process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??= 'test-key'
process.env.SUPABASE_SERVICE_ROLE_KEY ??= 'service-role-key'
process.env.RESEND_API_KEY ??= 're_test'
process.env.RESEND_FROM_EMAIL ??= 'noreply@example.com'

if (typeof window !== 'undefined' && !window.matchMedia) {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: () => {},
      removeEventListener: () => {},
      addListener: () => {},
      removeListener: () => {},
      dispatchEvent: () => false,
    }),
  })
}

if (typeof window !== 'undefined' && !window.open) {
  window.open = () => null
}

if (typeof window !== 'undefined' && !window.scrollTo) {
  window.scrollTo = () => {}
}

if (typeof window !== 'undefined' && !window.ResizeObserver) {
  class ResizeObserverMock {
    observe() {}
    unobserve() {}
    disconnect() {}
  }

  window.ResizeObserver = ResizeObserverMock
}

afterEach(() => {
  cleanup()
})
