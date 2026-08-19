'use client'

import { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'
import { createCustomerAction } from '@/server/actions/customers/create-customer-action'
import { deleteCustomerAction } from '@/server/actions/customers/delete-customer-action'
import { getCustomersAction } from '@/server/actions/customers/get-customers-action'
import { updateCustomerAction } from '@/server/actions/customers/update-customer-action'
import type { Customer } from '@/types/customers'
import { Dropdown } from '@/ui/global/widgets/components/dropdown'
import { Modal, type ModalRef } from '@/ui/global/widgets/components/modal'
import { Button } from '@/ui/shadcn/components/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/ui/shadcn/components/card'
import { Input } from '@/ui/shadcn/components/input'
import { Label } from '@/ui/shadcn/components/label'

type FormState = {
  id?: string
  name: string
  email: string
  phone: string
  password: string
  status: 'active' | 'inactive' | 'pending'
}

const initialFormState: FormState = {
  name: '',
  email: '',
  phone: '',
  password: '',
  status: 'active',
}

const customerStatusOptions = [
  { value: 'active', label: 'Ativo' },
  { value: 'inactive', label: 'Inativo' },
  { value: 'pending', label: 'Pendente' },
] as const

const customerFilterOptions = [
  { value: 'all', label: 'Todos' },
  { value: 'active', label: 'Ativo' },
  { value: 'inactive', label: 'Inativo' },
  { value: 'pending', label: 'Pendente' },
] as const

function formatDate(value: string) {
  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(new Date(value))
}

export function CustomersPageView() {
  const customerModalRef = useRef<ModalRef>(null)
  const deleteModalRef = useRef<ModalRef>(null)
  const [customers, setCustomers] = useState<Customer[]>([])
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState<'all' | 'active' | 'inactive' | 'pending'>('all')
  const [form, setForm] = useState<FormState>(initialFormState)
  const [customerToDelete, setCustomerToDelete] = useState<Customer | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const loadCustomers = async () => {
    setIsLoading(true)
    const response = await getCustomersAction({ search, status })
    setIsLoading(false)

    if (!response.ok) {
      toast.error(response.message)
      return
    }

    setCustomers(response.body ?? [])
  }

  useEffect(() => {
    void loadCustomers()
  }, [search, status])

  const resetForm = () => setForm(initialFormState)

  const openCreateModal = () => {
    resetForm()
    customerModalRef.current?.open()
  }

  const openEditModal = (customer: Customer) => {
    setForm({
      id: customer.id,
      name: customer.name,
      email: customer.email,
      phone: customer.phone ?? '',
      password: '',
      status: customer.status,
    })
    customerModalRef.current?.open()
  }

  const openDeleteModal = (customer: Customer) => {
    setCustomerToDelete(customer)
    deleteModalRef.current?.open()
  }

  const confirmDelete = async (closeModal: () => void) => {
    if (!customerToDelete) return

    setIsDeleting(true)
    const result = await deleteCustomerAction(customerToDelete.id)
    setIsDeleting(false)

    if (!result.ok) {
      toast.error(result.message)
      return
    }

    toast.success('Cliente removido com sucesso.')
    setCustomerToDelete(null)
    closeModal()
    await loadCustomers()
  }

  const submit = async (closeModal: () => void) => {
    setIsSaving(true)
    const response = form.id
      ? await updateCustomerAction({
          id: form.id,
          name: form.name.trim(),
          email: form.email.trim().toLowerCase(),
          phone: form.phone.trim(),
          status: form.status,
        })
      : await createCustomerAction({
          name: form.name.trim(),
          email: form.email.trim().toLowerCase(),
          phone: form.phone.trim(),
          password: form.password,
        })
    setIsSaving(false)

    if (!response.ok) {
      toast.error(response.message)
      return
    }

    toast.success(
      response.message ??
        (form.id ? 'Cliente atualizado com sucesso.' : 'Cliente criado com sucesso.'),
    )
    resetForm()
    closeModal()
    await loadCustomers()
  }

  return (
    <div className='mx-auto w-full max-w-7xl space-y-6'>
      <Modal
        ref={customerModalRef}
        title={form.id ? 'Editar cliente' : 'Novo cliente'}
        size='2xl'
        onClose={resetForm}
      >
        {(closeModal) => (
          <div className='grid gap-4 md:grid-cols-2'>
            <div className='space-y-2'>
              <Label htmlFor='customer-name'>Nome</Label>
              <Input
                id='customer-name'
                value={form.name}
                onChange={(event) =>
                  setForm((current) => ({ ...current, name: event.target.value }))
                }
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='customer-email'>Email</Label>
              <Input
                id='customer-email'
                type='email'
                value={form.email}
                onChange={(event) =>
                  setForm((current) => ({ ...current, email: event.target.value }))
                }
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='customer-phone'>Telefone</Label>
              <Input
                id='customer-phone'
                value={form.phone}
                onChange={(event) =>
                  setForm((current) => ({ ...current, phone: event.target.value }))
                }
              />
            </div>
            {!form.id && (
              <div className='space-y-2'>
                <Label htmlFor='customer-password'>Senha inicial</Label>
                <Input
                  id='customer-password'
                  type='password'
                  value={form.password}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, password: event.target.value }))
                  }
                />
              </div>
            )}
            {form.id && (
              <div className='space-y-2'>
                <Label htmlFor='customer-status'>Status</Label>
                <Dropdown
                  value={form.status}
                  onValueChange={(value) =>
                    setForm((current) => ({
                      ...current,
                      status: value as FormState['status'],
                    }))
                  }
                  options={[...customerStatusOptions]}
                />
              </div>
            )}
            <div className='flex items-end gap-3 md:col-span-2'>
              <Button
                type='button'
                className='cursor-pointer'
                disabled={isSaving}
                onClick={() => void submit(closeModal)}
              >
                {isSaving
                  ? 'Salvando...'
                  : form.id
                    ? 'Salvar alterações'
                    : 'Criar cliente'}
              </Button>
              <Button
                type='button'
                variant='outline'
                className='cursor-pointer'
                onClick={() => {
                  resetForm()
                  closeModal()
                }}
              >
                Cancelar
              </Button>
            </div>
          </div>
        )}
      </Modal>

      <Modal
        ref={deleteModalRef}
        title='Excluir cliente'
        size='sm'
        onClose={() => setCustomerToDelete(null)}
      >
        {(closeModal) => (
          <div className='space-y-4'>
            <p className='text-sm text-muted-foreground'>
              Tem certeza que deseja excluir{' '}
              <span className='font-medium text-foreground'>
                {customerToDelete?.name}
              </span>
              ? Essa ação não pode ser desfeita.
            </p>
            <div className='flex items-center gap-3'>
              <Button
                type='button'
                variant='destructive'
                className='cursor-pointer'
                disabled={isDeleting}
                onClick={() => void confirmDelete(closeModal)}
              >
                {isDeleting ? 'Excluindo...' : 'Excluir'}
              </Button>
              <Button
                type='button'
                variant='outline'
                className='cursor-pointer'
                onClick={() => {
                  setCustomerToDelete(null)
                  closeModal()
                }}
              >
                Cancelar
              </Button>
            </div>
          </div>
        )}
      </Modal>

      <Card>
        <CardHeader>
          <div className='flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between'>
            <div>
              <CardTitle>Clientes</CardTitle>
              <CardDescription>
                Lista de perfis com role client, incluindo pendentes de confirmação.
              </CardDescription>
            </div>
            <Button type='button' className='cursor-pointer' onClick={openCreateModal}>
              Novo cliente
            </Button>
          </div>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='flex flex-col gap-3 lg:flex-row'>
            <Input
              placeholder='Buscar por nome, email ou telefone'
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
            <Dropdown
              value={status}
              onValueChange={(value) => setStatus(value as typeof status)}
              options={[...customerFilterOptions]}
              triggerClassName='w-full cursor-pointer lg:w-48'
            />
          </div>

          <div className='overflow-hidden rounded-lg border border-border bg-background'>
            <div className='overflow-x-auto'>
              <table className='min-w-220 w-full border-collapse text-sm'>
                <thead className='bg-muted/50'>
                  <tr className='text-left text-muted-foreground'>
                    <th className='px-4 py-3 font-medium'>Nome</th>
                    <th className='px-4 py-3 font-medium'>Email</th>
                    <th className='px-4 py-3 font-medium'>Telefone</th>
                    <th className='px-4 py-3 font-medium'>Status</th>
                    <th className='px-4 py-3 font-medium'>Criado em</th>
                    <th className='px-4 py-3 text-center font-medium'>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    <tr>
                      <td
                        colSpan={6}
                        className='px-4 py-8 text-center text-muted-foreground'
                      >
                        Carregando clientes...
                      </td>
                    </tr>
                  ) : customers.length > 0 ? (
                    customers.map((customer) => (
                      <tr key={customer.id} className='border-t border-border'>
                        <td className='px-4 py-4 font-medium'>{customer.name}</td>
                        <td className='px-4 py-4 text-muted-foreground'>
                          {customer.email}
                        </td>
                        <td className='px-4 py-4 text-muted-foreground'>
                          {customer.phone ?? '-'}
                        </td>
                        <td className='px-4 py-4'>
                          {customer.status === 'pending'
                            ? 'Pendente'
                            : customer.status === 'active'
                              ? 'Ativo'
                              : 'Inativo'}
                        </td>
                        <td className='px-4 py-4 text-muted-foreground'>
                          {formatDate(customer.createdAt)}
                        </td>
                        <td className='px-4 py-4'>
                          <div className='flex flex-wrap justify-center gap-2'>
                            <Button
                              type='button'
                              variant='outline'
                              size='sm'
                              className='cursor-pointer'
                              onClick={() => openEditModal(customer)}
                            >
                              Editar
                            </Button>
                            <Button
                              type='button'
                              variant='outline'
                              size='sm'
                              className='cursor-pointer text-rose-400 hover:text-rose-300'
                              onClick={() => openDeleteModal(customer)}
                            >
                              Excluir
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={6}
                        className='px-4 py-8 text-center text-muted-foreground'
                      >
                        Nenhum cliente encontrado.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
