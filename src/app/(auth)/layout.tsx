import type { ReactNode } from 'react'
import { AuthLayout } from '@/ui/global/widgets/layouts/auth-layout/index'

export default function AuthLayoutWrapper({ children }: { children: ReactNode }) {
  return <AuthLayout>{children}</AuthLayout>
}
