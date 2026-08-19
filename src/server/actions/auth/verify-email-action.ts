'use server'

import { hashToken } from '@/lib/auth/tokens'
import { createSupabaseAdminClient } from '@/lib/supabase/admin'

export async function verifyEmailAction(token: string) {
  const admin = createSupabaseAdminClient()
  const tokenHash = hashToken(token)
  const now = new Date().toISOString()
  const { data: row, error } = await admin
    .from('email_verification_tokens')
    .select('id, user_id, expires_at, used_at')
    .eq('token_hash', tokenHash)
    .maybeSingle()

  if (error || !row || row.used_at || row.expires_at < now) {
    return { ok: false, message: 'Link de confirmação inválido ou expirado.' }
  }

  const { error: confirmError } = await admin.auth.admin.updateUserById(row.user_id, {
    email_confirm: true,
  })

  if (confirmError) {
    return { ok: false, message: confirmError.message }
  }

  const { error: profileError } = await admin
    .from('profiles')
    .update({
      email_verified: true,
      status: 'active',
    })
    .eq('id', row.user_id)

  if (profileError) {
    return { ok: false, message: profileError.message }
  }

  await admin
    .from('email_verification_tokens')
    .update({
      used_at: now,
    })
    .eq('id', row.id)

  return { ok: true }
}
