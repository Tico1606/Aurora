import type { CurrentUser, UserRole, UserStatus } from '@/types/auth'

type ProfileRow = {
  id: string
  name: string
  email: string
  phone: string | null
  role: UserRole
  email_verified: boolean
  status: UserStatus
  created_at: string
  updated_at: string
}

export function mapProfileToCurrentUser(profile: ProfileRow): CurrentUser {
  return {
    id: profile.id,
    name: profile.name,
    email: profile.email,
    phone: profile.phone,
    role: profile.role,
    status: profile.status,
    emailVerified: profile.email_verified,
    createdAt: profile.created_at,
    updatedAt: profile.updated_at,
  }
}
