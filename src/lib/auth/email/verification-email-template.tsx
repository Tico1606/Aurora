import {
  EMAIL_BRAND_DARK,
  EMAIL_BRAND_MUTED,
  EMAIL_BRAND_NAME,
  renderEmailButton,
  renderEmailLayout,
} from './email-layout'

export function renderVerificationEmail(name: string, verificationUrl: string) {
  const contentHtml = `
    <h1 style="margin:0 0 16px;font-size:22px;font-weight:700;color:${EMAIL_BRAND_DARK};">Confirme sua conta</h1>
    <p style="margin:0 0 12px;font-size:15px;line-height:1.6;color:${EMAIL_BRAND_DARK};">Olá, ${name}.</p>
    <p style="margin:0 0 28px;font-size:15px;line-height:1.6;color:${EMAIL_BRAND_DARK};">Confirme sua conta para ativar o acesso na plataforma ${EMAIL_BRAND_NAME}.</p>
    ${renderEmailButton(verificationUrl, 'Confirmar conta')}
    <p style="margin:28px 0 0;font-size:13px;line-height:1.6;color:${EMAIL_BRAND_MUTED};">Se você não solicitou este cadastro, ignore este email.</p>
  `

  return renderEmailLayout({
    preheader: `Confirme sua conta na ${EMAIL_BRAND_NAME} para ativar seu acesso.`,
    title: 'Confirmação de conta',
    contentHtml,
  })
}
