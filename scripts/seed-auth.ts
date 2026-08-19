import { createClient, type PostgrestError } from '@supabase/supabase-js'

type SeedUser = {
  name: string
  email: string
  password: string
  phone: string
  role: 'admin' | 'client'
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error('Defina NEXT_PUBLIC_SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY antes de rodar o seed.')
}

const seedUsers: SeedUser[] = [
  {
    name: 'Admin',
    email: 'delivered@resend.dev',
    password: 'Senha@123',
    phone: '11999990001',
    role: 'admin',
  },
  {
    name: 'Usuario Seed 1',
    email: 'bounced@resend.dev',
    password: 'User@123',
    phone: '11999990002',
    role: 'client',
  },
  {
    name: 'Usuario Seed 2',
    email: 'complained@resend.dev',
    password: 'User@123',
    phone: '11999990003',
    role: 'client',
  },
]

const legacySeedEmails = [
  'admin@example.com',
  'user1@example.com',
  'user2@example.com',
]

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})

const SCHEMA_CACHE_RETRY_ATTEMPTS = 10

function isSchemaCacheError(error: PostgrestError) {
  return error.code === 'PGRST205' || error.message.includes('schema cache')
}

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function withSchemaCacheRetry<T extends { error: PostgrestError | null }>(
  run: () => PromiseLike<T>,
): Promise<T> {
  for (let attempt = 1; attempt <= SCHEMA_CACHE_RETRY_ATTEMPTS; attempt++) {
    const result = await run()

    if (!result.error || !isSchemaCacheError(result.error) || attempt === SCHEMA_CACHE_RETRY_ATTEMPTS) {
      return result
    }

    console.log(
      `Schema cache do PostgREST ainda desatualizado, tentando novamente (${attempt}/${SCHEMA_CACHE_RETRY_ATTEMPTS})...`,
    )
    await wait(attempt * 1000)
  }

  throw new Error('unreachable')
}

async function getProfileIdByEmail(email: string) {
  const { data, error } = await withSchemaCacheRetry(() =>
    supabase.from('profiles').select('id').eq('email', email).maybeSingle(),
  )

  if (error) {
    throw new Error(`Falha ao buscar profile ${email}: ${error.message}`)
  }

  return data?.id ?? null
}

async function deleteLegacyUsers() {
  for (const email of legacySeedEmails) {
    const profileId = await getProfileIdByEmail(email)

    if (!profileId) {
      continue
    }

    const { error } = await supabase.auth.admin.deleteUser(profileId)

    if (error) {
      throw new Error(`Falha ao remover usuario legado ${email}: ${error.message}`)
    }
  }
}

async function ensureSeedUser(input: SeedUser) {
  const existingProfileId = await getProfileIdByEmail(input.email)

  if (existingProfileId) {
    const { error } = await supabase.auth.admin.updateUserById(existingProfileId, {
      email: input.email,
      password: input.password,
      email_confirm: true,
      user_metadata: {
        name: input.name,
        phone: input.phone,
        role: input.role,
      },
      app_metadata: {
        provider: 'email',
        providers: ['email'],
      },
    })

    if (error) {
      throw new Error(`Falha ao atualizar usuario ${input.email}: ${error.message}`)
    }

    await upsertProfile(existingProfileId, input)
    return
  }

  const { data, error } = await supabase.auth.admin.createUser({
    email: input.email,
    password: input.password,
    email_confirm: true,
    user_metadata: {
      name: input.name,
      phone: input.phone,
      role: input.role,
    },
    app_metadata: {
      provider: 'email',
      providers: ['email'],
    },
  })

  if (error || !data.user) {
    throw new Error(`Falha ao criar usuario ${input.email}: ${error?.message ?? 'erro desconhecido'}`)
  }

  await upsertProfile(data.user.id, input)
}

async function upsertProfile(userId: string, input: SeedUser) {
  const { error } = await withSchemaCacheRetry(() =>
    supabase.from('profiles').upsert({
      id: userId,
      name: input.name,
      email: input.email,
      phone: input.phone,
      role: input.role,
      email_verified: true,
      status: 'active',
    }),
  )

  if (error) {
    throw new Error(`Falha ao sincronizar profile ${input.email}: ${error.message}`)
  }
}

async function main() {
  await deleteLegacyUsers()

  for (const user of seedUsers) {
    await ensureSeedUser(user)
  }

  console.log('Seed de auth aplicado com sucesso.')
  console.log('Credenciais:')
  for (const user of seedUsers) {
    console.log(`- ${user.email} / ${user.password}`)
  }
}

await main()
