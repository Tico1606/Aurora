'use server'

import { mapProfileToCurrentUser } from '@/lib/auth/user-mappers'
import { createSupabaseAdminClient } from '@/lib/supabase/admin'
import { assertAdmin } from '@/server/actions/utils/assert-admin'
import type { UserStatus } from '@/types/auth'

type GetCustomersInput = {
  search?: string
  status?: UserStatus | 'all'
}

export async function getCustomersAction(input: GetCustomersInput = {}) {
  await assertAdmin()

  const admin = createSupabaseAdminClient()
  let query = admin
    .from('profiles')
    .select(
      'id, name, email, phone, role, email_verified, status, created_at, updated_at',
    )
    .eq('role', 'client')
    .order('created_at', { ascending: false })

  if (input.status && input.status !== 'all') {
    query = query.eq('status', input.status)
  }

  if (input.search?.trim()) {
    const term = input.search.trim()
    query = query.or(`name.ilike.%${term}%,email.ilike.%${term}%,phone.ilike.%${term}%`)
  }

  const { data, error } = await query

  if (error) {
    return { ok: false, message: error.message }
  }

  return { ok: true, body: (data ?? []).map(mapProfileToCurrentUser) }
}
