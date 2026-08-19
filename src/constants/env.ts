import { z } from 'zod/v4'

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .or(z.literal(''))
    .default('development'),
  PORT: z.coerce.number().optional(),
  NEXT_PUBLIC_APP_URL: z.string(),
  NEXT_PUBLIC_SUPABASE_URL: z.string(),
  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: z.string().min(1),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),
  RESEND_API_KEY: z.string().min(1),
  RESEND_FROM_EMAIL: z.string(),
})

const validation = envSchema.safeParse(process.env)

if (validation.success === false) {
  console.error(validation.error.message)
  throw new Error('Variáveis de ambiente inválidas')
}

export const env = validation.data
