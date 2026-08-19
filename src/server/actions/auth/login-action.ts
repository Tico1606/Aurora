'use server'

import { mapProfileToCurrentUser } from '@/lib/auth/user-mappers'
import { sendVerificationEmail } from '@/lib/auth/verification'
import { createSupabaseAdminClient } from '@/lib/supabase/admin'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import type { CurrentUser } from '@/types/auth'

type LoginInput = {
  email: string
  password: string
}

type LoginResult =
  | { ok: true; user: CurrentUser }
  | { ok: false; statusCode?: number; message: string }

export async function loginAction({ email, password }: LoginInput): Promise<LoginResult> {
  const normalizedEmail = email.trim().toLowerCase()
  const admin = createSupabaseAdminClient()
  const { data: profile, error: profileError } = await admin
    .from('profiles')
    .select(
      'id, name, email, phone, role, email_verified, status, created_at, updated_at',
    )
    .eq('email', normalizedEmail)
    .maybeSingle()

  if (profileError || !profile) {
    return { ok: false, statusCode: 401, message: 'Email ou senha inválidos.' }
  }

  if (profile.status === 'pending') {
    await sendVerificationEmail({
      userId: profile.id,
      email: profile.email,
      name: profile.name,
    })

    return {
      ok: false,
      statusCode: 403,
      message: 'Sua conta ainda está pendente. Enviamos um novo email de ativação.',
    }
  }

  if (profile.status === 'inactive') {
    return {
      ok: false,
      statusCode: 403,
      message: 'Sua conta está desativada. Fale com o administrador.',
    }
  }

  const supabase = await createSupabaseServerClient()
  const { error } = await supabase.auth.signInWithPassword({
    email: normalizedEmail,
    password,
  })

  if (error) {
    return { ok: false, statusCode: 401, message: 'Email ou senha inválidos.' }
  }

  return {
    ok: true,
    user: mapProfileToCurrentUser(profile),
  }
}
