'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { useAuthContext } from '@/ui/auth/contexts/auth-context/hooks/use-auth-context'
import { digitsOnly, maskPhone } from '@/ui/global/utils/masks'
import { Button } from '@/ui/shadcn/components/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/ui/shadcn/components/card'
import { Input } from '@/ui/shadcn/components/input'
import { Label } from '@/ui/shadcn/components/label'
import { updateOwnPasswordAction } from '@/server/actions/users/update-own-password-action'
import { updateOwnProfileAction } from '@/server/actions/users/update-own-profile-action'

export function ProfilePageView() {
  const { refreshUser, user } = useAuthContext()
  const [name, setName] = useState(user?.name ?? '')
  const [email, setEmail] = useState(user?.email ?? '')
  const [phone, setPhone] = useState(maskPhone(user?.phone ?? ''))
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isSavingProfile, setIsSavingProfile] = useState(false)
  const [isSavingPassword, setIsSavingPassword] = useState(false)

  const saveProfile = async () => {
    setIsSavingProfile(true)
    const result = await updateOwnProfileAction({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: digitsOnly(phone),
    })
    setIsSavingProfile(false)

    if (!result.ok) {
      toast.error(result.message)
      return
    }

    await refreshUser()
    toast.success('Perfil atualizado com sucesso.')
  }

  const savePassword = async () => {
    if (password.length < 8) {
      toast.error('A senha deve ter no mínimo 8 caracteres.')
      return
    }

    if (password !== confirmPassword) {
      toast.error('As senhas precisam ser iguais.')
      return
    }

    setIsSavingPassword(true)
    const result = await updateOwnPasswordAction(password)
    setIsSavingPassword(false)

    if (!result.ok) {
      toast.error(result.message)
      return
    }

    setPassword('')
    setConfirmPassword('')
    toast.success('Senha atualizada com sucesso.')
  }

  return (
    <div className='mx-auto w-full max-w-4xl space-y-6'>
      <Card>
        <CardHeader>
          <CardTitle>Perfil</CardTitle>
          <CardDescription>Atualize seus dados principais de acesso.</CardDescription>
        </CardHeader>
        <CardContent className='grid gap-4 md:grid-cols-2'>
          <div className='space-y-2 md:col-span-2'>
            <Label htmlFor='profile-name'>Nome</Label>
            <Input id='profile-name' value={name} onChange={(event) => setName(event.target.value)} />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='profile-email'>Email</Label>
            <Input id='profile-email' type='email' value={email} onChange={(event) => setEmail(event.target.value)} />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='profile-phone'>Telefone</Label>
            <Input id='profile-phone' value={phone} onChange={(event) => setPhone(maskPhone(event.target.value))} />
          </div>
          <Button type='button' className='md:col-span-2 w-full cursor-pointer' disabled={isSavingProfile} onClick={() => void saveProfile()}>
            {isSavingProfile ? 'Salvando...' : 'Salvar perfil'}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Senha</CardTitle>
          <CardDescription>Altere sua senha sem sair da conta.</CardDescription>
        </CardHeader>
        <CardContent className='grid gap-4 md:grid-cols-2'>
          <div className='space-y-2'>
            <Label htmlFor='new-password-profile'>Nova senha</Label>
            <Input id='new-password-profile' type='password' value={password} onChange={(event) => setPassword(event.target.value)} />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='confirm-password-profile'>Confirmar senha</Label>
            <Input id='confirm-password-profile' type='password' value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} />
          </div>
          <Button type='button' className='md:col-span-2 w-full cursor-pointer' disabled={isSavingPassword} onClick={() => void savePassword()}>
            {isSavingPassword ? 'Salvando...' : 'Salvar nova senha'}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
