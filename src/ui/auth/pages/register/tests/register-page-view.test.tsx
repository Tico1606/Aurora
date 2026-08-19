import { describe, expect, it, vi } from 'vitest'
import { renderWithProviders, screen, userEvent } from '@/test/test-utils'
import { RegisterPageView } from '../register-page-view'

const { pushMock, registerUserActionMock } = vi.hoisted(() => ({
  pushMock: vi.fn(),
  registerUserActionMock: vi.fn(),
}))

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: pushMock }),
}))

vi.mock('@/server/actions/auth/register-user-action', () => ({
  registerUserAction: registerUserActionMock,
}))

describe('RegisterPageView', () => {
  it('mostra erro quando as senhas são diferentes', async () => {
    const user = userEvent.setup()
    renderWithProviders(<RegisterPageView />)

    await user.type(screen.getByLabelText('Nome'), 'Maria')
    await user.type(screen.getByLabelText('Email'), 'maria@example.com')
    await user.type(screen.getByLabelText('Telefone'), '11999999999')
    await user.type(screen.getByLabelText('Senha'), 'password123')
    await user.type(screen.getByLabelText('Confirmar senha'), 'password456')
    await user.click(screen.getByRole('button', { name: 'Criar conta' }))

    expect(screen.getByText('As senhas precisam ser iguais.')).toBeInTheDocument()
  })

  it('redireciona para a tela de sucesso ao cadastrar', async () => {
    registerUserActionMock.mockResolvedValue({ ok: true, email: 'maria@example.com' })
    const user = userEvent.setup()
    renderWithProviders(<RegisterPageView />)

    await user.type(screen.getByLabelText('Nome'), 'Maria')
    await user.type(screen.getByLabelText('Email'), 'maria@example.com')
    await user.type(screen.getByLabelText('Telefone'), '11999999999')
    await user.type(screen.getByLabelText('Senha'), 'password123')
    await user.type(screen.getByLabelText('Confirmar senha'), 'password123')
    await user.click(screen.getByRole('button', { name: 'Criar conta' }))

    expect(registerUserActionMock).toHaveBeenCalled()
    expect(pushMock).toHaveBeenCalledWith('/register-success?email=maria%40example.com')
  })
})
