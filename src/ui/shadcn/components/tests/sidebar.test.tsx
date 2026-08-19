import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'
import { fireEvent, renderWithProviders, screen, userEvent } from '@/test/test-utils'
import { Sidebar, SidebarProvider, SidebarTrigger } from '../sidebar'

beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation(() => ({
      matches: false,
      media: '',
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  })
})

beforeEach(() => {
  // biome-ignore lint/suspicious/noDocumentCookie: biome warning
  document.cookie = 'sidebar_state=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
})

function setViewport(width: number) {
  Object.defineProperty(window, 'innerWidth', {
    configurable: true,
    writable: true,
    value: width,
  })
}

function renderSidebarProvider(props?: { allowDesktopToggle?: boolean }) {
  renderWithProviders(
    <SidebarProvider allowDesktopToggle={props?.allowDesktopToggle}>
      <SidebarTrigger />
      <Sidebar>
        <div>Conteudo da sidebar</div>
      </Sidebar>
    </SidebarProvider>,
  )
}

describe('SidebarProvider', () => {
  it('nao fecha a sidebar no desktop quando o toggle estiver desabilitado', async () => {
    const user = userEvent.setup()

    setViewport(1280)
    renderSidebarProvider({ allowDesktopToggle: false })

    expect(document.cookie).toBe('')

    await user.click(screen.getByRole('button', { name: 'Toggle Sidebar' }))
    fireEvent.keyDown(window, { key: 'b', ctrlKey: true })

    expect(document.cookie).toBe('')
    expect(
      document.querySelector('[data-slot="sidebar"][data-state="expanded"]'),
    ).toBeInTheDocument()
    expect(
      document.querySelector('[data-slot="sidebar"][data-state="collapsed"]'),
    ).not.toBeInTheDocument()
  })

  it('mantem a sidebar mobile fechada por padrao e abre ao clicar no botao', async () => {
    const user = userEvent.setup()

    setViewport(375)
    renderSidebarProvider({ allowDesktopToggle: false })

    expect(screen.queryByText('Conteudo da sidebar')).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Toggle Sidebar' }))

    expect(await screen.findByText('Conteudo da sidebar')).toBeInTheDocument()
  })
})
