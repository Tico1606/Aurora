'use client'

import { ThemeProvider as NextThemesProvider, type ThemeProviderProps } from 'next-themes'
import type { ReactNode } from 'react'
import type { CurrentUser } from '@/types/auth'
import { AuthContextProvider } from '@/ui/auth/contexts/auth-context/auth-context'

export interface Props {
  children: ReactNode
  themeProps?: ThemeProviderProps
  initialUser: CurrentUser | null
}

export function ClientProvider({ children, initialUser, themeProps }: Props) {
  return (
    <NextThemesProvider
      attribute='class'
      defaultTheme='dark'
      enableSystem={false}
      forcedTheme='dark'
      disableTransitionOnChange
      {...themeProps}
    >
      <AuthContextProvider initialUser={initialUser}>{children}</AuthContextProvider>
    </NextThemesProvider>
  )
}
