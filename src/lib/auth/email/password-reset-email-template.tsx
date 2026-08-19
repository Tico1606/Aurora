import {
  EMAIL_BRAND_DARK,
  EMAIL_BRAND_MUTED,
  EMAIL_BRAND_NAME,
  renderEmailButton,
  renderEmailLayout,
} from './email-layout'

export function renderPasswordResetEmail(name: string, resetUrl: string) {
  const contentHtml = `
    <h1 style="margin:0 0 16px;font-size:22px;font-weight:700;color:${EMAIL_BRAND_DARK};">Redefinicao de senha</h1>
    <p style="margin:0 0 12px;font-size:15px;line-height:1.6;color:${EMAIL_BRAND_DARK};">Ola, ${name}.</p>
    <p style="margin:0 0 28px;font-size:15px;line-height:1.6;color:${EMAIL_BRAND_DARK};">Recebemos um pedido para redefinir sua senha.</p>
    ${renderEmailButton(resetUrl, 'Redefinir senha')}
    <p style="margin:28px 0 0;font-size:13px;line-height:1.6;color:${EMAIL_BRAND_MUTED};">Se voce nao solicitou esta alteracao, ignore este email.</p>
  `

  return renderEmailLayout({
    preheader: `Redefina sua senha na ${EMAIL_BRAND_NAME} com seguranca.`,
    title: 'Redefinicao de senha',
    contentHtml,
  })
}
