import { redirect } from 'next/navigation'
import { ROUTES } from '@/constants/routes'
import { getDashboardSummaryAction } from '@/server/actions/dashboard/get-dashboard-summary-action'
import { getCurrentUser } from '@/server/auth/get-current-user'
import { DashboardPage } from '@/ui/dashboard/pages'

export default async function Page() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(ROUTES.auth.login)
  }

  if (user.role !== 'admin') {
    redirect(ROUTES.private.profile)
  }

  const summary = await getDashboardSummaryAction()

  return <DashboardPage summary={summary ?? { adminsCount: 0, activeClientsCount: 0, customersCount: 0 }} />
}
