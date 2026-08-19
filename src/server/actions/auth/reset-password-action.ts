'use server'

import { hashToken } from '@/lib/auth/tokens'
import { createSupabaseAdminClient } from '@/lib/supabase/admin'

export async function resetPasswordAction(token: string, password: string) {
  const admin = createSupabaseAdminClient()
  const tokenHash = hashToken(token)
  const now = new Date().toISOString()
  const { data: row, error } = await admin
    .from('password_reset_tokens')
    .select('id, user_id, expires_at, used_at')
    .eq('token_hash', tokenHash)
    .maybeSingle()

  if (error || !row || row.used_at || row.expires_at < now) {
    return { ok: false, message: 'Link de redefinicao invalido ou expirado.' }
  }

  const { error: resetError } = await admin.auth.admin.updateUserById(row.user_id, {
    password,
  })

  if (resetError) {
    return { ok: false, message: resetError.message }
  }

  await admin
    .from('password_reset_tokens')
    .update({
      used_at: now,
    })
    .eq('id', row.id)

  return { ok: true }
}
