import { Card, CardContent, CardHeader, CardTitle } from '@/ui/shadcn/components/card'

type Props = {
  summary: {
    adminsCount: number
    activeClientsCount: number
    customersCount: number
  }
}

const cards = [
  {
    key: 'adminsCount',
    title: 'Admins cadastrados',
    description: 'Contas administrativas com acesso ao painel.',
  },
  {
    key: 'activeClientsCount',
    title: 'Clientes ativos',
    description: 'Clientes que ja confirmaram o email e estao ativos.',
  },
  {
    key: 'customersCount',
    title: 'Clientes cadastrados',
    description: 'Base atual de clientes do dashboard.',
  },
] as const

export function DashboardPageView({ summary }: Props) {
  return (
    <div className='mx-auto w-full max-w-7xl space-y-6'>
      <div>
        <h1 className='text-2xl font-semibold text-foreground'>Dashboard</h1>
        <p className='text-sm text-muted-foreground'>
          Resumo rapido da administracao da plataforma.
        </p>
      </div>

      <div className='grid gap-4 md:grid-cols-3'>
        {cards.map((card) => (
          <Card key={card.key}>
            <CardHeader>
              <CardTitle className='text-base'>{card.title}</CardTitle>
            </CardHeader>
            <CardContent className='space-y-2'>
              <p className='text-3xl font-semibold text-foreground'>
                {summary[card.key]}
              </p>
              <p className='text-sm text-muted-foreground'>{card.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
