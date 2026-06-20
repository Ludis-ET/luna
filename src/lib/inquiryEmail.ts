import { SITE } from '../data/content'

export type InquiryPayload = {
  fullName: string
  phone: string
  email: string
  role: string
  message: string
  submittedAt: string
  pageUrl: string
  referrer: string
  language: string
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function fieldRow(label: string, value: string, href?: string) {
  const safeValue = escapeHtml(value)
  const content = href
    ? `<a href="${href}" style="color:#58217a;font-weight:600;text-decoration:none;">${safeValue}</a>`
    : safeValue

  return `
    <tr>
      <td style="padding:0 0 12px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#ffffff;border:1px solid rgba(197,168,128,0.35);border-left:3px solid #c5a880;border-radius:12px;">
          <tr>
            <td style="padding:14px 16px;font-family:Arial,Helvetica,sans-serif;">
              <div style="font-size:9px;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;color:#58217a;margin-bottom:5px;">${escapeHtml(label)}</div>
              <div style="font-size:14px;line-height:1.55;color:#2d2d2d;font-weight:500;">${content}</div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  `
}

function metaItem(label: string, value: string, full = false) {
  return `
    <td${full ? ' colspan="2"' : ''} style="padding:0 0 10px;${full ? '' : ' width:50%;'}">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:rgba(46,20,71,0.04);border:1px solid rgba(46,20,71,0.08);border-radius:10px;">
        <tr>
          <td style="padding:11px 13px;font-family:Arial,Helvetica,sans-serif;">
            <div style="font-size:8px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#a8885c;margin-bottom:3px;">${escapeHtml(label)}</div>
            <div style="font-size:11px;line-height:1.45;color:#5a5a5a;word-break:break-word;">${escapeHtml(value)}</div>
          </td>
        </tr>
      </table>
    </td>
  `
}

export function buildInquiryEmailHtml(payload: InquiryPayload): string {
  const phoneDigits = payload.phone.replace(/[^\d+]/g, '')
  const safeName = escapeHtml(payload.fullName)
  const safeMessage = escapeHtml(payload.message).replace(/\n/g, '<br />')

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Luna Cottage inquiry</title>
</head>
<body style="margin:0;padding:24px 12px;background:#e2dbd0;font-family:Arial,Helvetica,sans-serif;color:#2d2d2d;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;background:#faf7f2;border-radius:20px;overflow:hidden;border:1px solid rgba(197,168,128,0.35);box-shadow:0 20px 50px -24px rgba(45,45,45,0.28);">
          <tr>
            <td style="padding:28px 24px 32px;background:#faf7f2;border:1px solid rgba(197,168,128,0.25);">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding-bottom:22px;">
                    <table role="presentation" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="width:48px;height:48px;border-radius:50%;border:1.5px solid #c5a880;text-align:center;vertical-align:middle;font-family:Georgia,'Times New Roman',serif;font-size:22px;font-weight:700;color:#c5a880;background:rgba(46,20,71,0.04);">L</td>
                        <td style="padding-left:14px;vertical-align:middle;">
                          <div style="font-family:Georgia,'Times New Roman',serif;font-size:22px;font-weight:700;color:#2e1447;line-height:1.1;">${escapeHtml(SITE.name)}</div>
                          <div style="margin-top:3px;font-size:9px;font-weight:600;letter-spacing:0.22em;text-transform:uppercase;color:#c5a880;">${escapeHtml(SITE.tagline)}</div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding-bottom:22px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:linear-gradient(135deg,#2e1447,#58217a);border:1px solid rgba(197,168,128,0.45);border-radius:14px;">
                      <tr>
                        <td style="padding:14px 16px;color:#faf7f2;font-family:Arial,Helvetica,sans-serif;">
                          <div style="font-family:Georgia,'Times New Roman',serif;font-size:18px;font-weight:700;line-height:1.2;">New website inquiry</div>
                          <div style="margin-top:4px;font-size:12px;line-height:1.5;color:rgba(250,247,242,0.82);">A visitor submitted the contact form. Reply directly to their email or call the number below.</div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding-bottom:8px;font-size:9px;font-weight:700;letter-spacing:0.24em;text-transform:uppercase;color:#c5a880;">Visitor details</td>
                </tr>
                <tr>
                  <td style="padding-bottom:18px;font-family:Georgia,'Times New Roman',serif;font-size:24px;font-weight:700;color:#2e1447;">${safeName}</td>
                </tr>
                ${fieldRow('Full Name', payload.fullName)}
                ${fieldRow('Phone Number', payload.phone, phoneDigits ? `tel:${phoneDigits}` : undefined)}
                ${fieldRow('Email Address', payload.email, `mailto:${payload.email}`)}
                ${fieldRow('I am a', payload.role)}
                <tr>
                  <td style="padding:8px 0 18px;font-size:9px;font-weight:700;letter-spacing:0.24em;text-transform:uppercase;color:#c5a880;">Message</td>
                </tr>
                <tr>
                  <td style="padding-bottom:22px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:rgba(197,168,128,0.1);border:1px solid rgba(197,168,128,0.28);border-radius:12px;">
                      <tr>
                        <td style="padding:18px;font-family:Georgia,'Times New Roman',serif;font-size:14px;line-height:1.65;color:#2d2d2d;font-style:italic;">${safeMessage}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td>
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        ${metaItem('Submitted at', payload.submittedAt, true)}
                      </tr>
                      <tr>
                        ${metaItem('Page URL', payload.pageUrl, true)}
                      </tr>
                      <tr>
                        ${metaItem('Referrer', payload.referrer)}
                        ${metaItem('Browser language', payload.language)}
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top:24px;border-top:1px solid rgba(197,168,128,0.35);">
                    <table role="presentation" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding-right:10px;padding-bottom:10px;">
                          <a href="mailto:${escapeHtml(payload.email)}" style="display:inline-block;padding:9px 16px;border-radius:999px;background:#2e1447;color:#faf7f2;font-size:11px;font-weight:600;text-decoration:none;">Reply by email</a>
                        </td>
                        ${phoneDigits ? `<td style="padding-right:10px;padding-bottom:10px;"><a href="tel:${phoneDigits}" style="display:inline-block;padding:9px 16px;border-radius:999px;background:#ffffff;color:#2e1447;border:1px solid rgba(46,20,71,0.15);font-size:11px;font-weight:600;text-decoration:none;">Call visitor</a></td>` : ''}
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top:22px;border-top:1px solid rgba(197,168,128,0.35);text-align:center;font-size:10px;line-height:1.6;color:rgba(45,45,45,0.5);">
                    <strong style="color:#2e1447;">${escapeHtml(SITE.name)} ${escapeHtml(SITE.tagline)}</strong><br />
                    ${escapeHtml(SITE.address)} · Owner: ${escapeHtml(SITE.owner)}
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

export function buildInquirySubject(fullName: string): string {
  return `New Luna Cottage inquiry from ${fullName}`
}
