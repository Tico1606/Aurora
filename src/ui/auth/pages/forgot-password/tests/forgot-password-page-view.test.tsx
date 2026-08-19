import { describe, expect, it, vi } from 'vitest'
import { renderWithProviders, screen, userEvent } from '@/test/test-utils'
import { ForgotPasswordPageView } from '../forgot-password-page-view'

const { requestPasswordResetActionMock } = vi.hoisted(() => ({
  requestPasswordResetActionMock: vi.fn(),
}))

vi.mock('@/server/actions/auth/request-password-reset-action', () => ({
  requestPasswordResetAction: requestPasswordResetActionMock,
}))

describe('ForgotPasswordPageView', () => {
  it('mostra mensagem generica apos solicitar reset', async () => {
    const user = userEvent.setup()
    renderWithProviders(<ForgotPasswordPageView />)

    await user.type(screen.getByLabelText('Email'), 'user@example.com')
    await user.click(screen.getByRole('button', { name: 'Enviar email' }))

    expect(requestPasswordResetActionMock).toHaveBeenCalledWith('user@example.com')
    expect(
      await screen.findByText(
        'Se o email existir, enviaremos as instrucoes para redefinir sua senha.',
      ),
    ).toBeInTheDocument()
  })
})
