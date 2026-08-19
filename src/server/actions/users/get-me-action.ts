'use server'

import { getCurrentUser } from '@/server/auth/get-current-user'

export async function getMeAction() {
  return getCurrentUser()
}
