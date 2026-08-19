'use server'

import { createSupabaseAdminClient } from '@/lib/supabase/admin'
import { assertAdmin } from '@/server/actions/utils/assert-admin'

type UpdateCustomerInput = {
  id: string
  name: string
  email: string
  phone: string
  status: 'active' | 'inactive' | 'pending'
}

export async function updateCustomerAction({ id, ...payload }: UpdateCustomerInput) {
  await assertAdmin()
  const admin = createSupabaseAdminClient()
  const normalizedEmail = payload.email.trim().toLowerCase()

  const { data: duplicatedProfile } = await admin
    .from('profiles')
    .select('id')
    .eq('email', normalizedEmail)
    .neq('id', id)
    .maybeSingle()

  if (duplicatedProfile) {
    return { ok: false, message: 'Ja existe uma conta com este email.' }
  }

  const { error: authError } = await admin.auth.admin.updateUserById(id, {
    email: normalizedEmail,
    user_metadata: {
      name: payload.name,
      phone: payload.phone,
      role: 'client',
    },
  })

  if (authError) {
    return { ok: false, message: authError.message }
  }

  const { error } = await admin
    .from('profiles')
    .update({
      name: payload.name,
      email: normalizedEmail,
      phone: payload.phone,
      role: 'client',
      status: payload.status,
    })
    .eq('id', id)
    .eq('role', 'client')

  if (error) {
    return { ok: false, message: error.message }
  }

  return { ok: true }
}
