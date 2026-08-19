import { describe, expect, it, vi } from 'vitest'
import { renderWithProviders, screen, userEvent } from '@/test/test-utils'
import type { CurrentUser } from '@/types/auth'
import { AuthContextProvider } from '../auth-context'
import { useAuthContext } from '../hooks/use-auth-context'

const replaceMock = vi.fn()
const refreshMock = vi.fn()

vi.mock('next/navigation', () => ({
  useRouter: () => ({ replace: replaceMock, refresh: refreshMock }),
  usePathname: () => '/login',
}))

vi.mock('@/server/actions/auth/login-action', () => ({
  loginAction: vi.fn(),
}))

vi.mock('@/server/actions/auth/logout-action', () => ({
  logoutAction: vi.fn(),
}))

vi.mock('@/server/actions/users/get-me-action', () => ({
  getMeAction: vi.fn(),
}))

function Probe() {
  const { isAuthenticated, user } = useAuthContext()
  return <div>{isAuthenticated ? user?.email : 'guest'}</div>
}

const initialUser: CurrentUser = {
  id: '1',
  name: 'Admin',
  email: 'admin@example.com',
  phone: '11999999999',
  role: 'admin',
  status: 'active',
  emailVerified: true,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}

describe('AuthContextProvider', () => {
  it('hidrata o usuario inicial', () => {
    renderWithProviders(
      <AuthContextProvider initialUser={initialUser}>
        <Probe />
      </AuthContextProvider>,
    )

    expect(screen.getByText('admin@example.com')).toBeInTheDocument()
  })

  it('remove o usuario ao fazer logout', async () => {
    const { logoutAction } = await import('@/server/actions/auth/logout-action')
    vi.mocked(logoutAction).mockResolvedValue(undefined)

    function LogoutProbe() {
      const { logout } = useAuthContext()
      return (
        <button type='button' onClick={() => void logout()}>
          Sair
        </button>
      )
    }

    const user = userEvent.setup()

    renderWithProviders(
      <AuthContextProvider initialUser={initialUser}>
        <Probe />
        <LogoutProbe />
      </AuthContextProvider>,
    )

    await user.click(screen.getByRole('button', { name: 'Sair' }))

    expect(await screen.findByText('guest')).toBeInTheDocument()
  })
})
