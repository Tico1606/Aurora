import { mapProfileToCurrentUser } from '@/lib/auth/user-mappers'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import type { CurrentUser } from '@/types/auth'

export async function getCurrentUser(): Promise<CurrentUser | null> {
  const supabase = await createSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return null
  }

  const { data: profile, error } = await supabase
    .from('profiles')
    .select(
      'id, name, email, phone, role, email_verified, status, created_at, updated_at',
    )
    .eq('id', user.id)
    .maybeSingle()

  if (error || !profile) {
    return null
  }

  return mapProfileToCurrentUser(profile)
}
