import { createSupabaseAdminClient } from '@/lib/supabase/admin'

const EMAIL_COOLDOWN_IN_SECONDS = 60

export async function canSendEmailRequest(
  email: string,
  type: 'verification' | 'password_reset',
) {
  const supabase = createSupabaseAdminClient()
  const threshold = new Date(Date.now() - EMAIL_COOLDOWN_IN_SECONDS * 1000).toISOString()

  const { count, error } = await supabase
    .from('email_request_logs')
    .select('id', { count: 'exact', head: true })
    .eq('email', email)
    .eq('type', type)
    .gte('created_at', threshold)

  if (error) {
    throw new Error(error.message)
  }

  return (count ?? 0) === 0
}

export async function registerEmailRequest(
  email: string,
  type: 'verification' | 'password_reset',
) {
  const supabase = createSupabaseAdminClient()
  const { error } = await supabase.from('email_request_logs').insert({
    email,
    type,
  })

  if (error) {
    throw new Error(error.message)
  }
}

export { EMAIL_COOLDOWN_IN_SECONDS }
