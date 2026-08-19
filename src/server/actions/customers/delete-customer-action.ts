'use server'

import { createSupabaseAdminClient } from '@/lib/supabase/admin'
import { assertAdmin } from '@/server/actions/utils/assert-admin'

export async function deleteCustomerAction(id: string) {
  await assertAdmin()
  const admin = createSupabaseAdminClient()

  const { data: profile, error: profileError } = await admin
    .from('profiles')
    .select('id')
    .eq('id', id)
    .eq('role', 'client')
    .maybeSingle()

  if (profileError) {
    return { ok: false, message: profileError.message }
  }

  if (!profile) {
    return { ok: false, message: 'Cliente não encontrado.' }
  }

  const { error } = await admin.auth.admin.deleteUser(id)

  if (error) {
    return { ok: false, message: error.message }
  }

  return { ok: true }
}
