import { env } from '@/constants'
import { buildVerificationEmail, sendEmail } from '@/lib/auth/emails'
import { canSendEmailRequest, registerEmailRequest } from '@/lib/auth/rate-limit'
import { generateRawToken, hashToken } from '@/lib/auth/tokens'
import { createSupabaseAdminClient } from '@/lib/supabase/admin'

export async function sendVerificationEmail(params: {
  userId: string
  email: string
  name: string
}) {
  const normalizedEmail = params.email.trim().toLowerCase()
  const canSend = await canSendEmailRequest(normalizedEmail, 'verification')

  if (!canSend) {
    return false
  }

  const supabase = createSupabaseAdminClient()
  const rawToken = generateRawToken()
  const tokenHash = hashToken(rawToken)
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString()

  const { error } = await supabase.from('email_verification_tokens').insert({
    user_id: params.userId,
    token_hash: tokenHash,
    expires_at: expiresAt,
  })

  if (error) {
    throw new Error(error.message)
  }

  const verificationUrl = `${env.NEXT_PUBLIC_APP_URL}/verify-email?token=${rawToken}`

  await sendEmail({
    to: normalizedEmail,
    subject: 'Confirme sua conta na Aurora',
    html: buildVerificationEmail(params.name, verificationUrl),
    idempotencyKey: `verification/${params.userId}/${tokenHash}`,
  })

  await registerEmailRequest(normalizedEmail, 'verification')

  return true
}
