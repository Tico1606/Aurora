'use client'

import { useSearchParams } from 'next/navigation'

export function useRegisterSuccessPage() {
  const searchParams = useSearchParams()

  return {
    email: searchParams.get('email') ?? '',
  }
}
