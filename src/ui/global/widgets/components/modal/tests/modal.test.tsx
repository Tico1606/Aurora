import { useState } from 'react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { act, fireEvent, renderWithProviders, screen } from '@/test/test-utils'
import { Modal } from '..'

describe('Modal', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    document.body.style.overflow = ''
    document.body.style.paddingRight = ''

    Object.defineProperty(window, 'innerWidth', {
      configurable: true,
      writable: true,
      value: 1200,
    })

    Object.defineProperty(document.documentElement, 'clientWidth', {
      configurable: true,
      value: 1180,
    })
  })

  afterEach(() => {
    vi.runOnlyPendingTimers()
    vi.useRealTimers()
  })

  it('trava o scroll do body ao abrir e restaura ao fechar', () => {
    renderWithProviders(
      <Modal title='Teste' trigger={<button type='button'>Abrir modal</button>}>
        {() => <div>Conteudo do modal</div>}
      </Modal>,
    )

    act(() => {
      fireEvent.click(screen.getByRole('button', { name: 'Abrir modal' }))
      vi.advanceTimersByTime(10)
    })

    expect(document.body.style.overflow).toBe('hidden')
    expect(document.body.style.paddingRight).toBe('20px')
    expect(screen.getByText('Conteudo do modal')).toBeInTheDocument()

    act(() => {
      fireEvent.click(screen.getAllByRole('button', { name: 'Fechar modal' })[1])
    })

    expect(document.body.style.overflow).toBe('hidden')
    expect(document.body.style.paddingRight).toBe('20px')

    act(() => {
      vi.advanceTimersByTime(300)
    })

    expect(document.body.style.overflow).toBe('')
    expect(document.body.style.paddingRight).toBe('')
  })

  it('mantem o corpo do modal sem scroll antes do fim da animacao de abertura', () => {
    renderWithProviders(
      <Modal title='Teste' trigger={<button type='button'>Abrir modal</button>}>
        {() => <div>Conteudo do modal</div>}
      </Modal>,
    )

    act(() => {
      fireEvent.click(screen.getByRole('button', { name: 'Abrir modal' }))
    })

    const contentWrapper = screen.getByText('Conteudo do modal').parentElement

    expect(contentWrapper).toHaveClass('overflow-y-hidden')
    expect(contentWrapper).not.toHaveClass('overflow-y-auto')

    act(() => {
      vi.advanceTimersByTime(10)
    })

    expect(contentWrapper).toHaveClass('overflow-y-auto')
  })

  it('chama onClose apenas quando o modal transiciona de aberto para fechado', () => {
    const onClose = vi.fn()

    const ModalWithUnstableOnClose = () => {
      const [, setCount] = useState(0)

      return (
        <Modal
          title='Teste'
          trigger={<button type='button'>Abrir modal</button>}
          onClose={() => {
            onClose()
            setCount((current) => current + 1)
          }}
        >
          {() => <div>Conteudo do modal</div>}
        </Modal>
      )
    }

    renderWithProviders(<ModalWithUnstableOnClose />)

    expect(onClose).not.toHaveBeenCalled()

    act(() => {
      fireEvent.click(screen.getByRole('button', { name: 'Abrir modal' }))
      vi.advanceTimersByTime(10)
    })

    expect(onClose).not.toHaveBeenCalled()

    act(() => {
      fireEvent.click(screen.getAllByRole('button', { name: 'Fechar modal' })[1])
      vi.advanceTimersByTime(300)
    })

    expect(onClose).toHaveBeenCalledTimes(1)
  })
})
