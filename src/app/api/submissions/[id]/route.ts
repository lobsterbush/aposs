/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { sendEmail } from '@/lib/email'
import { generateStatusUpdateEmail } from '@/lib/email-templates/status-update'
import { requireAdmin } from '@/lib/auth'
import { z } from 'zod'

const submissionUpdateSchema = z.object({
  status: z.enum(['PENDING', 'UNDER_REVIEW', 'ACCEPTED', 'SCHEDULED', 'PRESENTED', 'REJECTED']),
  reviewerComments: z.string().optional().nullable(),
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
    const data = submissionUpdateSchema.parse(payload)
    const { status, reviewerComments } = data

    const submission = await prisma.submission.update({
      where: { id },
      data: {
        status,
        reviewedAt: ['ACCEPTED', 'REJECTED'].includes(status) ? new Date() : undefined,
        reviewerComments: reviewerComments || undefined
      },
      include: {
        event: true
      }
    })

    // Send status update email for relevant status changes
    if (['UNDER_REVIEW', 'ACCEPTED', 'REJECTED', 'SCHEDULED'].includes(status)) {
      const statusUpdateHtml = generateStatusUpdateEmail({
        authorName: submission.authorName,
        title: submission.title,
        status: status as 'UNDER_REVIEW' | 'ACCEPTED' | 'REJECTED' | 'SCHEDULED',
        reviewerComments: submission.reviewerComments || undefined,
        scheduledAt: submission.event?.scheduledAt,
        zoomJoinUrl: submission.event?.zoomJoinUrl
      })
      
      let emailSubject = ''
      switch (status) {
        case 'UNDER_REVIEW':
          emailSubject = 'Your APOSS submission is under review'
          break
        case 'ACCEPTED':
          emailSubject = 'Your APOSS submission has been accepted!'
          break
        case 'REJECTED':
          emailSubject = 'Update on your APOSS submission'
          break
        case 'SCHEDULED':
          emailSubject = 'Your APOSS presentation is scheduled!'
          break
      }
      
      await sendEmail({
        to: submission.authorEmail,
        subject: emailSubject,
        html: statusUpdateHtml
      })
    }

    return NextResponse.json({ 
      success: true, 
      submission,
      message: 'Submission updated successfully'
    })

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, message: 'Invalid request', issues: error.issues }, { status: 400 })
    }
    console.error('Error updating submission:', error)
    return NextResponse.json({ 
      success: false, 
      message: 'Failed to update submission' 
    }, { status: 500 })
  }
}

export async function GET(
  request: Request,
  context: any
) {
  const { id } = context.params
  try {
    const session = await requireAdmin()
    if (!session) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 })
    }
    const submission = await prisma.submission.findUnique({
      where: { id },
      include: {
        event: true
      }
    })

    if (!submission) {
      return NextResponse.json({ 
        success: false, 
        message: 'Submission not found' 
      }, { status: 404 })
    }

    return NextResponse.json({ success: true, submission })
  } catch (error) {
    console.error('Error fetching submission:', error)
    return NextResponse.json({ 
      success: false, 
      message: 'Failed to fetch submission' 
    }, { status: 500 })
  }
}
