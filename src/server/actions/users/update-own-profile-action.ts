'use server'

import { createSupabaseAdminClient } from '@/lib/supabase/admin'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { getCurrentUser } from '@/server/auth/get-current-user'

type UpdateOwnProfileInput = {
  name: string
  email: string
  phone: string
}

export async function updateOwnProfileAction({
  email,
  name,
  phone,
}: UpdateOwnProfileInput) {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return { ok: false, message: 'Sessao expirada.' }
  }

  const admin = createSupabaseAdminClient()
  const normalizedEmail = email.trim().toLowerCase()
  const { data: duplicatedProfile } = await admin
    .from('profiles')
    .select('id')
    .eq('email', normalizedEmail)
    .neq('id', currentUser.id)
    .maybeSingle()

  if (duplicatedProfile) {
    return { ok: false, message: 'Ja existe uma conta com este email.' }
  }

  const { error: authError } = await admin.auth.admin.updateUserById(currentUser.id, {
    email: normalizedEmail,
    user_metadata: {
      name,
      phone,
      role: currentUser.role,
    },
  })

  if (authError) {
    return { ok: false, message: authError.message }
  }

  const { error } = await admin
    .from('profiles')
    .update({
      name,
      email: normalizedEmail,
      phone,
    })
    .eq('id', currentUser.id)

  if (error) {
    return { ok: false, message: error.message }
  }

  const supabase = await createSupabaseServerClient()
  await supabase.auth.refreshSession()

  return { ok: true }
}
