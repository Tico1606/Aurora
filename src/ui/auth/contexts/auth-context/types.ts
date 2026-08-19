import type { CurrentUser } from '@/types/auth'

export type LoginInput = {
  email: string
  password: string
}

export type AuthContextValue = {
  user: CurrentUser | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (input: LoginInput) => Promise<void>
  logout: () => Promise<void>
  refreshUser: () => Promise<CurrentUser | null>
  hydrateFromServer: (user: CurrentUser | null) => void
}
