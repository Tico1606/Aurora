import { type RenderOptions, render } from '@testing-library/react'
import type { ReactElement } from 'react'

export function renderWithProviders(ui: ReactElement, options?: RenderOptions) {
  return render(ui, options)
}

export * from '@testing-library/react'
export { default as userEvent } from '@testing-library/user-event'
