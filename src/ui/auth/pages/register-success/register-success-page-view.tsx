'use client'

import Link from 'next/link'
import { ROUTES } from '@/constants/routes'
import { resendVerificationAction } from '@/server/actions/auth/resend-verification-action'
import { Button } from '@/ui/shadcn/components/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/ui/shadcn/components/card'
import { useRegisterSuccessPage } from './use-register-success-page'

export const RegisterSuccessPageView = () => {
  const { email } = useRegisterSuccessPage()

  return (
    <Card className='mx-auto w-full bg-transparent p-4 shadow-none ring-0 scale-102'>
      <CardHeader className='items-center px-0 pb-6 text-center'>
        <CardTitle className='text-2xl font-semibold text-white md:text-3xl'>
          Confira seu email
        </CardTitle>
      </CardHeader>

      <CardContent className='space-y-4 px-0 text-center text-[#C8CED3]'>
        <p>Enviamos um link de confirmação para ativar sua conta.</p>
        {!!email && <p className='break-all text-sm text-[#C8CED3]/80'>{email}</p>}
      </CardContent>

      <CardFooter className='flex-col gap-3 px-0 pb-0 pt-6'>
        <Button
          type='button'
          variant='outline'
          className='w-full cursor-pointer'
          disabled={!email}
          onClick={() => void resendVerificationAction(email)}
        >
          Reenviar email de ativação
        </Button>
        <Button
          asChild
          type='button'
          className='h-11 w-full cursor-pointer rounded-xl font-semibold'
        >
          <Link href={ROUTES.auth.login}>Voltar para o login</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
