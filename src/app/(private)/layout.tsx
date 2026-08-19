import { redirect } from 'next/navigation'
import type { ReactNode } from 'react'
import { ROUTES } from '@/constants/routes'
import { getCurrentUser } from '@/server/auth/get-current-user'
import { PrivateLayout } from '@/ui/global/widgets/layouts/private-layout'

export default async function PrivateLayoutWrapper({ children }: { children: ReactNode }) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(ROUTES.auth.login)
  }

  return <PrivateLayout>{children}</PrivateLayout>
}
