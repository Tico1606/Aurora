import type { Metadata } from 'next'
import { Geist, Geist_Mono, Inter } from 'next/font/google'
import '@/ui/global/styles/globals.css'
import { RootLayout as AppRootLayout } from '@/ui/global/widgets/layouts/root-layout/index'
import { cn } from '@/ui/shadcn/utils/utils'

export const runtime = 'edge'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
})

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Aurora | Gestão de Clientes',
  description:
    'Plataforma web para autenticação, dashboard, gestão de clientes e configurações de conta.',
  icons: {
    icon: [
      {
        url: '/favicon.svg?v=3',
        type: 'image/svg+xml',
      },
      {
        url: '/favicon.ico?v=3',
        type: 'image/x-icon',
      },
    ],
    shortcut: '/favicon.svg?v=3',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    // <html
    //   lang='en'
    //   className={cn(
    //     'h-full',
    //     'antialiased',
    //     geistSans.variable,
    //     geistMono.variable,
    //     'font-sans',
    //     inter.variable,
    //   )}
    // >
    //   <body className='min-h-full flex flex-col'>{children}</body>
    // </html>
    <html
      lang='pt-BR'
      suppressHydrationWarning
      className={cn(
        'h-full',
        'antialiased',
        geistSans.variable,
        geistMono.variable,
        'font-sans',
        inter.variable,
      )}
    >
      <AppRootLayout>{children}</AppRootLayout>
    </html>
  )
}
