'use server'

import { sendPasswordResetEmail } from '@/lib/auth/password-reset'
import { createSupabaseAdminClient } from '@/lib/supabase/admin'

export async function requestPasswordResetAction(email: string) {
  const admin = createSupabaseAdminClient()
  const normalizedEmail = email.trim().toLowerCase()
  const { data: profile } = await admin
    .from('profiles')
    .select('id, name, email, status')
    .eq('email', normalizedEmail)
    .maybeSingle()

  if (!profile || profile.status !== 'active') {
    return { ok: true }
  }

  await sendPasswordResetEmail({
    userId: profile.id,
    email: profile.email,
    name: profile.name,
  })

  return { ok: true }
}
