import { Resend } from 'resend'

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null

export async function sendWelcomeEmail(
  email: string,
  name: string,
  password: string
) {
  if (!resend) {
    console.log(`[DEV] Email для ${email}: пароль ${password}`)
    return
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://sokol01.torbichev.com'

  await resend.emails.send({
    from: 'СОКОЛ 0→1 <noreply@torbichev.com>',
    to: email,
    subject: 'Допуск к полёту получен — СОКОЛ 0→1',
    html: `
      <div style="background:#0a0a0c;color:#e8e0d4;font-family:Georgia,serif;padding:40px;max-width:600px;margin:0 auto;">
        <h1 style="font-family:Arial,sans-serif;color:#f0c060;font-size:28px;margin-bottom:8px;">СОКОЛ 0→1</h1>
        <p style="color:#9a917e;font-size:14px;margin-bottom:32px;">Допуск к полёту получен</p>

        <p>Пилот <strong style="color:#d4a04a;">${name}</strong>,</p>
        <p>Ты зарегистрирован на борту Сокола. Твои данные для входа:</p>

        <div style="background:#111114;border:1px solid rgba(212,160,74,0.3);border-radius:4px;padding:20px;margin:24px 0;">
          <p style="margin:0 0 8px 0;color:#9a917e;font-size:13px;">Email</p>
          <p style="margin:0 0 16px 0;color:#e8e0d4;font-size:16px;">${email}</p>
          <p style="margin:0 0 8px 0;color:#9a917e;font-size:13px;">Пароль</p>
          <p style="margin:0;color:#f0c060;font-size:18px;font-family:monospace;">${password}</p>
        </div>

        <a href="${appUrl}" style="display:inline-block;padding:16px 36px;background:#d4a04a;color:#0a0a0c;text-decoration:none;font-family:Arial,sans-serif;font-weight:bold;font-size:16px;letter-spacing:0.1em;text-transform:uppercase;border-radius:2px;">Подняться на борт →</a>

        <p style="color:#9a917e;font-size:12px;margin-top:40px;">Если ты не регистрировался на СОКОЛ 0→1, проигнорируй это письмо.</p>
      </div>
    `,
  })
}
