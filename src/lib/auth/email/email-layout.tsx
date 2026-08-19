export const EMAIL_BRAND_NAME = 'Aurora'
export const EMAIL_BRAND_PRIMARY = '#0073C3'
export const EMAIL_BRAND_ACCENT = '#F5A438'
export const EMAIL_BRAND_DARK = '#071B2E'
export const EMAIL_BRAND_MUTED = '#5B6B7A'

type EmailLayoutInput = {
  preheader: string
  title: string
  contentHtml: string
}

export function renderEmailLayout({ preheader, title, contentHtml }: EmailLayoutInput) {
  return `<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${title}</title>
  </head>
  <body style="margin:0;padding:0;background-color:#F0F3F6;font-family:'Segoe UI', Arial, sans-serif;">
    <span style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0;">${preheader}</span>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#F0F3F6;padding:32px 16px;">
      <tbody>
        <tr>
          <td align="center">
            <table role="presentation" width="480" cellpadding="0" cellspacing="0" style="width:480px;max-width:100%;background-color:#FFFFFF;border-radius:16px;overflow:hidden;box-shadow:0 8px 24px rgba(7, 27, 46, 0.08);">
              <tbody>
                <tr>
                  <td style="background:linear-gradient(135deg, ${EMAIL_BRAND_DARK} 0%, #0F3A5C 100%);padding:28px 32px;">
                    <table role="presentation" cellpadding="0" cellspacing="0">
                      <tbody>
                        <tr>
                          <td style="width:36px;height:36px;border-radius:10px;background:linear-gradient(135deg, ${EMAIL_BRAND_PRIMARY} 0%, ${EMAIL_BRAND_ACCENT} 100%);text-align:center;vertical-align:middle;font-size:18px;font-weight:700;color:#FFFFFF;">A</td>
                          <td style="padding-left:12px;vertical-align:middle;">
                            <span style="font-size:14px;font-weight:700;letter-spacing:0.16em;color:#FFFFFF;">${EMAIL_BRAND_NAME.toUpperCase()}</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>

                <tr>
                  <td style="padding:36px 32px 32px;">${contentHtml}</td>
                </tr>

                <tr>
                  <td style="padding:20px 32px 28px;border-top:1px solid #EEF1F4;">
                    <p style="margin:0;font-size:12px;line-height:1.6;color:${EMAIL_BRAND_MUTED};">
                      Você está recebendo este email porque possui uma conta na ${EMAIL_BRAND_NAME}. Se não reconhece esta ação, pode ignorar esta mensagem com segurança.
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  </body>
</html>`
}

export function renderEmailButton(href: string, label: string) {
  return `<table role="presentation" cellpadding="0" cellspacing="0">
  <tbody>
    <tr>
      <td style="border-radius:10px;background:linear-gradient(135deg, ${EMAIL_BRAND_PRIMARY} 0%, #0089E8 100%);">
        <a href="${href}" style="display:inline-block;padding:13px 24px;font-size:14px;font-weight:600;color:#FFFFFF;text-decoration:none;border-radius:10px;">${label}</a>
      </td>
    </tr>
  </tbody>
</table>`
}
