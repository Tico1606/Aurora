'use server'

import { createSupabaseAdminClient } from '@/lib/supabase/admin'
import { getCurrentUser } from '@/server/auth/get-current-user'

export async function getDashboardSummaryAction() {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return null
  }

  if (currentUser.role !== 'admin') {
    return {
      adminsCount: 0,
      activeClientsCount: 0,
      customersCount: 0,
    }
  }

  const admin = createSupabaseAdminClient()
  const [
    { count: adminsCount },
    { count: activeClientsCount },
    { count: customersCount },
  ] = await Promise.all([
    admin
      .from('profiles')
      .select('id', { count: 'exact', head: true })
      .eq('role', 'admin'),
    admin
      .from('profiles')
      .select('id', { count: 'exact', head: true })
      .eq('role', 'client')
      .eq('status', 'active'),
    admin
      .from('profiles')
      .select('id', { count: 'exact', head: true })
      .eq('role', 'client'),
  ])

  return {
    adminsCount: adminsCount ?? 0,
    activeClientsCount: activeClientsCount ?? 0,
    customersCount: customersCount ?? 0,
  }
}
