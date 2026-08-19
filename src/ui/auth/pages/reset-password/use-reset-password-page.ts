'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { ROUTES } from '@/constants/routes'
import { resetPasswordAction } from '@/server/actions/auth/reset-password-action'

export function useResetPasswordPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('token') ?? ''
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const submit = async () => {
    setError('')
    setMessage('')

    if (!token) {
      setError('Link de redefinicao invalido.')
      return
    }

    if (password.length < 8) {
      setError('A senha deve ter no minimo 8 caracteres.')
      return
    }

    if (password !== confirmPassword) {
      setError('As senhas precisam ser iguais.')
      return
    }

    setIsSubmitting(true)
    const result = await resetPasswordAction(token, password)
    setIsSubmitting(false)

    if (!result.ok) {
      setError(result.message ?? 'Nao foi possivel redefinir a senha.')
      return
    }

    setMessage('Senha redefinida com sucesso. Redirecionando para o login...')
    setTimeout(() => router.push(ROUTES.auth.login), 1500)
  }

  return {
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    isSubmitting,
    message,
    error,
    submit,
  }
}
