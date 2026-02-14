/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import type { Prisma } from '@prisma/client'
import { sendEmail } from '@/lib/email'
import { generateStatusUpdateEmail } from '@/lib/email-templates/status-update'
import { requireAdmin } from '@/lib/auth'
import { z } from 'zod'

const eventUpdateSchema = z.object({
  zoomJoinUrl: z.union([z.string().url(), z.literal(''), z.null()]).optional(),
  scheduledAt: z.string().optional(),
  status: z.enum(['SCHEDULED', 'ONGOING', 'COMPLETED', 'CANCELLED']).optional(),
})

export async function PATCH(
  request: Request,
  context: any
) {
  const { id } = context.params
  try {
    const session = await requireAdmin()
    if (!session) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
    }
    const payload = await request.json()
    const data = eventUpdateSchema.parse(payload)
    const { zoomJoinUrl, scheduledAt, status } = data as {
      zoomJoinUrl?: string
      scheduledAt?: string
      status?: 'SCHEDULED' | 'ONGOING' | 'COMPLETED' | 'CANCELLED'
    }

    const updateData: Prisma.EventUpdateInput = {}
    if (typeof zoomJoinUrl !== 'undefined') updateData.zoomJoinUrl = zoomJoinUrl || null
    if (typeof scheduledAt !== 'undefined') updateData.scheduledAt = new Date(scheduledAt)
    if (typeof status !== 'undefined') updateData.status = status

    const event = await prisma.event.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        title: true,
        scheduledAt: true,
        presenter: true,
        presenterEmail: true,
        status: true,
        zoomJoinUrl: true,
        submissionId: true
      }
    })

    // Keep submission.scheduledAt in sync if event date changes
    if (event.submissionId && typeof scheduledAt !== 'undefined') {
      await prisma.submission.update({
        where: { id: event.submissionId },
        data: { scheduledAt: new Date(scheduledAt) }
      })
    }

    const shouldNotify = Boolean(event.submissionId && (typeof scheduledAt !== 'undefined' || typeof zoomJoinUrl !== 'undefined'))
    if (shouldNotify && event.submissionId) {
      const submission = await prisma.submission.findUnique({
        where: { id: event.submissionId },
        select: {
          authorName: true,
          authorEmail: true,
          title: true
        }
      })

      if (submission) {
        const emailHtml = generateStatusUpdateEmail({
          authorName: submission.authorName,
          title: submission.title,
          status: 'SCHEDULED',
          scheduledAt: event.scheduledAt,
          zoomJoinUrl: event.zoomJoinUrl || undefined
        })

        await sendEmail({
          to: submission.authorEmail,
          subject: typeof scheduledAt !== 'undefined' ? 'Your APOSS seminar date was updated' : 'Zoom link for your APOSS seminar',
          html: emailHtml
        })
      }
    }

    return NextResponse.json({ success: true, event })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, message: 'Invalid request', issues: error.issues }, { status: 400 })
    }
    console.error('Error updating event:', error)
    return NextResponse.json({ success: false, message: 'Failed to update event' }, { status: 500 })
  }
}
