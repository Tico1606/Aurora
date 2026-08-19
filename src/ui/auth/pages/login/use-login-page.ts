'use client'

import type { FormEvent } from 'react'
import { useState } from 'react'
import { useAuthContext } from '@/ui/auth/contexts/auth-context/hooks/use-auth-context'

type LoginFormErrors = {
  email?: string
  password?: string
  form?: string
}

export function useLoginPage() {
  const { login } = useAuthContext()
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formErrors, setFormErrors] = useState<LoginFormErrors>({})

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const nextFormErrors: LoginFormErrors = {}

    if (!email.trim()) {
      nextFormErrors.email = 'Informe seu email.'
    }

    if (!password.trim()) {
      nextFormErrors.password = 'Informe sua senha.'
    }

    setFormErrors(nextFormErrors)

    if (Object.keys(nextFormErrors).length > 0) {
      return
    }

    setIsSubmitting(true)

    try {
      await login({
        email,
        password,
      })
    } catch (error) {
      setFormErrors({
        form: error instanceof Error ? error.message : 'Nao foi possivel fazer login.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    email,
    formErrors,
    handleSubmit,
    isPasswordVisible,
    isSubmitting,
    password,
    setEmail,
    setFormErrors,
    setIsPasswordVisible,
    setPassword,
  }
}
