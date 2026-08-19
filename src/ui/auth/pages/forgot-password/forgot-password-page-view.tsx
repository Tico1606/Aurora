'use client'

import Link from 'next/link'
import { ROUTES } from '@/constants/routes'
import { Button } from '@/ui/shadcn/components/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/ui/shadcn/components/card'
import { Input } from '@/ui/shadcn/components/input'
import { Label } from '@/ui/shadcn/components/label'
import { useForgotPasswordPage } from './use-forgot-password-page'

export const ForgotPasswordPageView = () => {
  const { email, setEmail, isSubmitting, cooldown, message, submit } =
    useForgotPasswordPage()

  return (
    <Card className='mx-auto w-full bg-transparent p-4 shadow-none ring-0 scale-102'>
      <CardHeader className='px-0 pb-6'>
        <CardTitle className='text-center text-2xl font-semibold text-white md:text-3xl'>
          Esqueci minha senha
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-4 px-0'>
        <div className='space-y-2'>
          <Label htmlFor='forgot-email' className='text-[#C8CED3]'>
            Email
          </Label>
          <Input
            id='forgot-email'
            type='email'
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>

        {message && (
          <div className='rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-300'>
            {message}
          </div>
        )}

        <Button
          type='button'
          className='w-full cursor-pointer'
          disabled={isSubmitting || cooldown > 0}
          onClick={() => void submit()}
        >
          {cooldown > 0
            ? `Aguarde ${cooldown}s`
            : isSubmitting
              ? 'Enviando...'
              : 'Enviar email'}
        </Button>
      </CardContent>
      <CardFooter className='justify-center px-0 pb-0 pt-6 text-sm text-[#C8CED3]'>
        <Link
          href={ROUTES.auth.login}
          className='font-semibold text-[#4FB4F2] hover:underline'
        >
          Voltar para o login
        </Link>
      </CardFooter>
    </Card>
  )
}
