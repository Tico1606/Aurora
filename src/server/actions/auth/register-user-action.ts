'use server'

import { sendVerificationEmail } from '@/lib/auth/verification'
import { createSupabaseAdminClient } from '@/lib/supabase/admin'

type RegisterUserInput = {
  name: string
  email: string
  phone: string
  password: string
}

type RegisterUserResult = { ok: true; email: string } | { ok: false; message: string }

export async function registerUserAction({
  email,
  name,
  password,
  phone,
}: RegisterUserInput): Promise<RegisterUserResult> {
  const admin = createSupabaseAdminClient()
  const normalizedEmail = email.trim().toLowerCase()

  const { data: existingProfile } = await admin
    .from('profiles')
    .select('id')
    .eq('email', normalizedEmail)
    .maybeSingle()

  if (existingProfile) {
    return { ok: false, message: 'Ja existe uma conta com este email.' }
  }

  const { count } = await admin
    .from('profiles')
    .select('id', { count: 'exact', head: true })
  const role = (count ?? 0) === 0 ? 'admin' : 'client'

  const { data, error } = await admin.auth.admin.createUser({
    email: normalizedEmail,
    password,
    email_confirm: false,
    user_metadata: {
      name,
      phone,
      role,
    },
  })

  if (error || !data.user) {
    return { ok: false, message: error?.message ?? 'Nao foi possivel criar a conta.' }
  }

  const { error: profileError } = await admin.from('profiles').upsert({
    id: data.user.id,
    name,
    email: normalizedEmail,
    phone,
    role,
    email_verified: false,
    status: 'pending',
  })

  if (profileError) {
    await admin.auth.admin.deleteUser(data.user.id)
    return { ok: false, message: profileError.message }
  }

  await sendVerificationEmail({
    userId: data.user.id,
    email: normalizedEmail,
    name,
  })

  return { ok: true, email: normalizedEmail }
}
