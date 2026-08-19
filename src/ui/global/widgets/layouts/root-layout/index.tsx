import type { ReactNode } from 'react'
import { getCurrentUser } from '@/server/auth/get-current-user'
import { ClientProvider } from '@/ui/global/widgets/layouts/root-layout/client-provider/index'
import { Toaster } from '@/ui/shadcn/components/sonner'

type Props = { children: ReactNode }

export const RootLayout = async ({ children }: Props) => {
  const initialUser = await getCurrentUser()

  return (
    <body className='min-h-screen w-full bg-background' suppressHydrationWarning>
      <ClientProvider initialUser={initialUser}>
        {children}
        <Toaster duration={3500} />
      </ClientProvider>
    </body>
  )
}
