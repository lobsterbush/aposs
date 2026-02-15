/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { requireAdmin } from '@/lib/auth'
import { z } from 'zod'
import { sendEmail } from '@/lib/email'
import { generateSeminarAnnouncementEmail } from '@/lib/email-templates/seminar-announcement'

const notifySchema = z.object({
  section: z.string().optional(),
})

export async function POST(
  request: Request,
  context: any
) {
  const { id } = context.params
  try {
    const session = await requireAdmin()
    if (!session) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
    }

    const payload = await request.json().catch(() => ({}))
    const { section } = notifySchema.parse(payload || {})

    const event = await prisma.event.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        presenter: true,
        scheduledAt: true,
        zoomJoinUrl: true,
      }
    })

    if (!event) {
      return NextResponse.json({ success: false, message: 'Event not found' }, { status: 404 })
    }

    const registrations = section && section !== 'ALL'
      ? await prisma.registration.findMany({
          where: { sections: { has: section } },
          select: { email: true },
        })
      : await prisma.registration.findMany({
          select: { email: true },
        })

    const recipients = Array.from(new Set(registrations.map(r => r.email).filter(Boolean)))
    if (recipients.length === 0) {
      return NextResponse.json({ success: false, message: 'No recipients found for selected audience' }, { status: 400 })
    }

    const html = generateSeminarAnnouncementEmail({
      eventTitle: event.title,
      presenter: event.presenter,
      scheduledAt: event.scheduledAt,
      zoomJoinUrl: event.zoomJoinUrl || null,
    })

    let sent = 0
    const failures: string[] = []
    for (const to of recipients) {
      const result = await sendEmail({
        to,
        subject: `APOSS Seminar Invitation: ${event.title}`,
        html,
      })
      if (result.success) sent += 1
      else failures.push(to)
    }

    return NextResponse.json({
      success: true,
      sent,
      failed: failures.length,
      recipients: recipients.length,
      section: section || 'ALL',
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, message: 'Invalid request', issues: error.issues }, { status: 400 })
    }
    console.error('Error sending seminar announcements:', error)
    return NextResponse.json({ success: false, message: 'Failed to send seminar announcements' }, { status: 500 })
  }
}
