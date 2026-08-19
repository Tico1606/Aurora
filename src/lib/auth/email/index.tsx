import { renderPasswordResetEmail } from './password-reset-email-template'
import { renderVerificationEmail } from './verification-email-template'

export function buildVerificationEmail(name: string, verificationUrl: string) {
  return renderVerificationEmail(name, verificationUrl)
}

export function buildPasswordResetEmail(name: string, resetUrl: string) {
  return renderPasswordResetEmail(name, resetUrl)
}
