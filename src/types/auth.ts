export type UserRole = 'admin' | 'client'

export type UserStatus = 'active' | 'inactive' | 'pending'

export type CurrentUser = {
  id: string
  name: string
  email: string
  phone: string | null
  role: UserRole
  status: UserStatus
  emailVerified: boolean
  createdAt: string
  updatedAt: string
}

export type UserListItem = CurrentUser
