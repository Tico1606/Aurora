'use server'

import { getCurrentUser } from '@/server/auth/get-current-user'

export async function assertAdmin() {
  const currentUser = await getCurrentUser()

  if (!currentUser || currentUser.role !== 'admin') {
    throw new Error('Acesso negado')
  }

  return currentUser
}
