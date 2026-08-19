import { redirect } from 'next/navigation'
import { ROUTES } from '@/constants/routes'
import { getCurrentUser } from '@/server/auth/get-current-user'
import { CustomersPage } from '@/ui/customers/pages'

export default async function Page() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(ROUTES.auth.login)
  }

  if (user.role !== 'admin') {
    redirect(ROUTES.private.profile)
  }

  return <CustomersPage />
}
