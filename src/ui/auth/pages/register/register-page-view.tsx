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
import { useRegisterPage } from './use-register-page'

export const RegisterPageView = () => {
  const { formData, formErrors, isSubmitting, submit, updateField } = useRegisterPage()

  return (
    <Card className='mx-auto w-full bg-transparent p-4 shadow-none ring-0 scale-102'>
      <CardHeader className='px-0 pb-6'>
        <CardTitle className='text-center text-2xl font-semibold text-white md:text-3xl'>
          Criar conta
        </CardTitle>
      </CardHeader>

      <CardContent className='space-y-4 px-0'>
        {formErrors.form && (
          <div className='rounded-xl border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-300'>
            {formErrors.form}
          </div>
        )}

        <div className='space-y-2'>
          <Label htmlFor='name' className='text-[#C8CED3]'>
            Nome
          </Label>
          <Input
            id='name'
            value={formData.name}
            onChange={(event) => updateField('name', event.target.value)}
          />
          {formErrors.name && (
            <span className='text-sm text-rose-400'>{formErrors.name}</span>
          )}
        </div>

        <div className='space-y-2'>
          <Label htmlFor='email' className='text-[#C8CED3]'>
            Email
          </Label>
          <Input
            id='email'
            type='email'
            value={formData.email}
            onChange={(event) => updateField('email', event.target.value)}
          />
          {formErrors.email && (
            <span className='text-sm text-rose-400'>{formErrors.email}</span>
          )}
        </div>

        <div className='space-y-2'>
          <Label htmlFor='phone' className='text-[#C8CED3]'>
            Telefone
          </Label>
          <Input
            id='phone'
            value={formData.phone}
            onChange={(event) => updateField('phone', event.target.value)}
          />
          {formErrors.phone && (
            <span className='text-sm text-rose-400'>{formErrors.phone}</span>
          )}
        </div>

        <div className='space-y-2'>
          <Label htmlFor='password' className='text-[#C8CED3]'>
            Senha
          </Label>
          <Input
            id='password'
            type='password'
            value={formData.password}
            onChange={(event) => updateField('password', event.target.value)}
          />
          {formErrors.password && (
            <span className='text-sm text-rose-400'>{formErrors.password}</span>
          )}
        </div>

        <div className='space-y-2'>
          <Label htmlFor='confirm-password' className='text-[#C8CED3]'>
            Confirmar senha
          </Label>
          <Input
            id='confirm-password'
            type='password'
            value={formData.confirmPassword}
            onChange={(event) => updateField('confirmPassword', event.target.value)}
          />
          {formErrors.confirmPassword && (
            <span className='text-sm text-rose-400'>{formErrors.confirmPassword}</span>
          )}
        </div>

        <Button
          type='button'
          className='h-11 w-full cursor-pointer rounded-xl font-semibold'
          disabled={isSubmitting}
          onClick={() => void submit()}
        >
          {isSubmitting ? 'Criando conta...' : 'Criar conta'}
        </Button>
      </CardContent>

      <CardFooter className='flex-col px-0 pb-0 pt-6 text-center text-sm text-[#C8CED3]'>
        <p>
          Ja tem uma conta?{' '}
          <Link
            href={ROUTES.auth.login}
            className='font-semibold text-[#4FB4F2] hover:underline'
          >
            Faça login aqui
          </Link>
        </p>
      </CardFooter>
    </Card>
  )
}
