'use server'

import { sendVerificationEmail } from '@/lib/auth/verification'
import { createSupabaseAdminClient } from '@/lib/supabase/admin'

export async function resendVerificationAction(email: string) {
  const admin = createSupabaseAdminClient()
  const normalizedEmail = email.trim().toLowerCase()
  const { data: profile } = await admin
    .from('profiles')
    .select('id, name, email, status')
    .eq('email', normalizedEmail)
    .maybeSingle()

  if (!profile || profile.status !== 'pending') {
    return { ok: true }
  }

  await sendVerificationEmail({
    userId: profile.id,
    email: profile.email,
    name: profile.name,
  })

  return { ok: true }
}
