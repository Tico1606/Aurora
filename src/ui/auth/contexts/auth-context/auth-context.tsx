'use client'

import { usePathname, useRouter } from 'next/navigation'
import { createContext, type ReactNode, useCallback, useMemo, useState } from 'react'
import { ROUTES } from '@/constants/routes'
import { loginAction } from '@/server/actions/auth/login-action'
import { logoutAction } from '@/server/actions/auth/logout-action'
import { getMeAction } from '@/server/actions/users/get-me-action'
import type { CurrentUser } from '@/types/auth'
import type { AuthContextValue, LoginInput } from './types'

type Props = {
  children: ReactNode
  initialUser: CurrentUser | null
}

export const AuthContext = createContext<AuthContextValue | null>(null)

function getDefaultRedirect(user: CurrentUser) {
  return user.role === 'admin' ? ROUTES.private.dashboard : ROUTES.private.profile
}

export function AuthContextProvider({ children, initialUser }: Props) {
  const router = useRouter()
  const pathname = usePathname()
  const [user, setUser] = useState<CurrentUser | null>(initialUser)
  const [isLoading, setIsLoading] = useState(false)

  const hydrateFromServer = useCallback((nextUser: CurrentUser | null) => {
    setUser(nextUser)
  }, [])

  const refreshUser = useCallback(async () => {
    const nextUser = await getMeAction()
    setUser(nextUser)
    return nextUser
  }, [])

  const login = useCallback(
    async ({ email, password }: LoginInput) => {
      setIsLoading(true)
      const response = await loginAction({ email, password })
      setIsLoading(false)

      if (!response.ok) {
        throw new Error(response.message)
      }

      setUser(response.user)
      router.replace(getDefaultRedirect(response.user))
      router.refresh()
    },
    [router],
  )

  const logout = useCallback(async () => {
    setIsLoading(true)
    await logoutAction()
    setUser(null)
    setIsLoading(false)

    if (pathname !== ROUTES.auth.login) {
      router.replace(ROUTES.auth.login)
      router.refresh()
    }
  }, [pathname, router])

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      isLoading,
      login,
      logout,
      refreshUser,
      hydrateFromServer,
    }),
    [hydrateFromServer, isLoading, login, logout, refreshUser, user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
