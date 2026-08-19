import { describe, expect, it, vi } from 'vitest'
import { renderWithProviders, screen, userEvent } from '@/test/test-utils'
import { LoginPageView } from '../login-page-view'

const loginMock = vi.fn()

vi.mock('@/ui/auth/contexts/auth-context/hooks/use-auth-context', () => ({
  useAuthContext: () => ({
    login: loginMock,
  }),
}))

describe('LoginPageView', () => {
  it('valida campos obrigatórios', async () => {
    const user = userEvent.setup()
    renderWithProviders(<LoginPageView />)

    await user.click(screen.getByRole('button', { name: 'Entrar' }))

    expect(screen.getByText('Informe seu email.')).toBeInTheDocument()
    expect(screen.getByText('Informe sua senha.')).toBeInTheDocument()
  })

  it('envia login quando o formulário está válido', async () => {
    const user = userEvent.setup()
    renderWithProviders(<LoginPageView />)

    await user.type(screen.getByLabelText('Email'), 'user@example.com')
    await user.type(screen.getByLabelText('Senha'), 'secret123')
    await user.click(screen.getByRole('button', { name: 'Entrar' }))

    expect(loginMock).toHaveBeenCalledWith({
      email: 'user@example.com',
      password: 'secret123',
    })
  })
})
