'use server'

import { sendVerificationEmail } from '@/lib/auth/verification'
import { createSupabaseAdminClient } from '@/lib/supabase/admin'
import { assertAdmin } from '@/server/actions/utils/assert-admin'

type CreateCustomerInput = {
  name: string
  email: string
  phone: string
  password: string
}

export async function createCustomerAction(input: CreateCustomerInput) {
  await assertAdmin()
  const admin = createSupabaseAdminClient()
  const normalizedEmail = input.email.trim().toLowerCase()

  const { data: existingProfile } = await admin
    .from('profiles')
    .select('id')
    .eq('email', normalizedEmail)
    .maybeSingle()

  if (existingProfile) {
    return { ok: false, message: 'Ja existe uma conta com este email.' }
  }

  const { data, error } = await admin.auth.admin.createUser({
    email: normalizedEmail,
    password: input.password,
    email_confirm: false,
    user_metadata: {
      name: input.name,
      phone: input.phone,
      role: 'client',
    },
  })

  if (error || !data.user) {
    return { ok: false, message: error?.message ?? 'Nao foi possivel criar o cliente.' }
  }

  const { error: profileError } = await admin.from('profiles').upsert({
    id: data.user.id,
    name: input.name,
    email: normalizedEmail,
    phone: input.phone,
    role: 'client',
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
    name: input.name,
  })

  return {
    ok: true,
    message: 'Cliente criado. Enviamos um email de confirmacao para ativar a conta.',
  }
}
