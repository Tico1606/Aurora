'use server'

import { createSupabaseServerClient } from '@/lib/supabase/server'
import { getCurrentUser } from '@/server/auth/get-current-user'

export async function updateOwnPasswordAction(password: string) {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return { ok: false, message: 'Sessão expirada.' }
  }

  const supabase = await createSupabaseServerClient()
  const { error } = await supabase.auth.updateUser({ password })

  if (error) {
    return { ok: false, message: error.message }
  }

  return { ok: true }
}
