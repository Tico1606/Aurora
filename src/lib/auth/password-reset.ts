import { env } from '@/constants'
import { buildPasswordResetEmail, sendEmail } from '@/lib/auth/emails'
import { canSendEmailRequest, registerEmailRequest } from '@/lib/auth/rate-limit'
import { generateRawToken, hashToken } from '@/lib/auth/tokens'
import { createSupabaseAdminClient } from '@/lib/supabase/admin'

export async function sendPasswordResetEmail(params: {
  userId: string
  email: string
  name: string
}) {
  const normalizedEmail = params.email.trim().toLowerCase()
  const canSend = await canSendEmailRequest(normalizedEmail, 'password_reset')

  if (!canSend) {
    return false
  }

  const supabase = createSupabaseAdminClient()
  const rawToken = generateRawToken()
  const tokenHash = hashToken(rawToken)
  const expiresAt = new Date(Date.now() + 1000 * 60 * 30).toISOString()

  const { error } = await supabase.from('password_reset_tokens').insert({
    user_id: params.userId,
    token_hash: tokenHash,
    expires_at: expiresAt,
  })

  if (error) {
    throw new Error(error.message)
  }

  const resetUrl = `${env.NEXT_PUBLIC_APP_URL}/reset-password?token=${rawToken}`

  await sendEmail({
    to: normalizedEmail,
    subject: 'Redefina sua senha na Aurora',
    html: buildPasswordResetEmail(params.name, resetUrl),
    idempotencyKey: `password-reset/${params.userId}/${tokenHash}`,
  })

  await registerEmailRequest(normalizedEmail, 'password_reset')

  return true
}
