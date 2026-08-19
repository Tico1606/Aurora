import { Resend } from 'resend'
import { env } from '@/constants'

const resend = new Resend(env.RESEND_API_KEY)

type SendEmailInput = {
  to: string
  subject: string
  html: string
  idempotencyKey: string
}

export async function sendEmail({ html, idempotencyKey, subject, to }: SendEmailInput) {
  const { error } = await resend.emails.send(
    {
      from: env.RESEND_FROM_EMAIL,
      to: [to],
      subject,
      html,
    },
    {
      idempotencyKey,
    },
  )

  if (error) {
    throw new Error(error.message)
  }
}

export { buildPasswordResetEmail, buildVerificationEmail } from './email'
