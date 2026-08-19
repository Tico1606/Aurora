'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { ROUTES } from '@/constants/routes'
import { registerUserAction } from '@/server/actions/auth/register-user-action'
import { digitsOnly, maskPhone } from '@/ui/global/utils/masks'

export type RegisterFormData = {
  name: string
  email: string
  phone: string
  password: string
  confirmPassword: string
}

export type RegisterFormErrors = Partial<Record<keyof RegisterFormData | 'form', string>>

const initialFormData: RegisterFormData = {
  name: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
}

function isValidEmail(value: string) {
  return /^\S+@\S+\.\S+$/.test(value)
}

function isValidPassword(value: string) {
  return value.length >= 8
}

export function useRegisterPage() {
  const router = useRouter()
  const [formData, setFormData] = useState(initialFormData)
  const [formErrors, setFormErrors] = useState<RegisterFormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const updateField = (field: keyof RegisterFormData, value: string) => {
    setFormData((current) => ({
      ...current,
      [field]: field === 'phone' ? maskPhone(value) : value,
    }))
    setFormErrors((current) => ({ ...current, [field]: undefined, form: undefined }))
  }

  const submit = async () => {
    const errors: RegisterFormErrors = {}

    if (!formData.name.trim()) errors.name = 'Informe seu nome.'
    if (!formData.email.trim()) errors.email = 'Informe seu email.'
    else if (!isValidEmail(formData.email.trim())) errors.email = 'Email inválido.'
    if (!digitsOnly(formData.phone)) errors.phone = 'Informe seu telefone.'
    if (!formData.password) errors.password = 'Informe sua senha.'
    else if (!isValidPassword(formData.password))
      errors.password = 'A senha deve ter no mínimo 8 caracteres.'
    if (formData.confirmPassword !== formData.password) {
      errors.confirmPassword = 'As senhas precisam ser iguais.'
    }

    setFormErrors(errors)

    if (Object.keys(errors).length > 0) return

    setIsSubmitting(true)
    const result = await registerUserAction({
      name: formData.name.trim(),
      email: formData.email.trim().toLowerCase(),
      phone: digitsOnly(formData.phone),
      password: formData.password,
    })
    setIsSubmitting(false)

    if (!result.ok) {
      setFormErrors({ form: result.message })
      return
    }

    router.push(
      `${ROUTES.auth.registerSuccess}?email=${encodeURIComponent(result.email)}`,
    )
  }

  return {
    formData,
    formErrors,
    isSubmitting,
    updateField,
    submit,
  }
}
