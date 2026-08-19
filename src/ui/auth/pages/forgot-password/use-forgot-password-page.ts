'use client'

import { useState } from 'react'
import { requestPasswordResetAction } from '@/server/actions/auth/request-password-reset-action'

export function useForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [cooldown, setCooldown] = useState(0)
  const [message, setMessage] = useState('')

  const submit = async () => {
    if (!email.trim() || cooldown > 0) {
      return
    }

    setIsSubmitting(true)
    await requestPasswordResetAction(email)
    setIsSubmitting(false)
    setMessage('Se o email existir, enviaremos as instruções para redefinir sua senha.')
    setCooldown(60)

    const interval = window.setInterval(() => {
      setCooldown((current) => {
        if (current <= 1) {
          window.clearInterval(interval)
          return 0
        }

        return current - 1
      })
    }, 1000)
  }

  return {
    email,
    setEmail,
    isSubmitting,
    cooldown,
    message,
    submit,
  }
}
