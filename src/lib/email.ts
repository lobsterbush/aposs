import { Resend } from 'resend'

let resend: Resend | null = null

function getResendClient() {
  if (!process.env.RESEND_API_KEY) return null
  if (!resend) {
    resend = new Resend(process.env.RESEND_API_KEY)
  }
  return resend
}

interface EmailOptions {
  to: string | string[]
  subject: string
  html: string
  replyTo?: string
}

export async function sendEmail({ to, subject, html, replyTo }: EmailOptions) {
  try {
    const client = getResendClient()
    if (!client) {
      console.warn('Email skipped: RESEND_API_KEY is not configured')
      return { success: false, error: 'Email provider not configured' }
    }
    const from = process.env.EMAIL_FROM || 'APOSS <notifications@aposs.org>'
    
    const { data, error } = await client.emails.send({
      from,
      to: Array.isArray(to) ? to : [to],
      subject,
      html,
      replyTo,
    })

    if (error) {
      console.error('Error sending email:', error)
      return { success: false, error }
    }

    console.log('Email sent successfully:', data)
    return { success: true, data }
  } catch (error) {
    console.error('Failed to send email:', error)
    return { success: false, error }
  }
}

export function getAdminEmails(): string[] {
  const adminEmail = process.env.ADMIN_EMAIL || 'contact@aposs.org'
  return adminEmail.split(',').map(email => email.trim())
}
