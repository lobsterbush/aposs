import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { sendEmail } from '@/lib/email'
import { generateStatusUpdateEmail } from '@/lib/email-templates/status-update'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const { submissionId, scheduledAt } = data

    // Get the submission details
    const submission = await prisma.submission.findUnique({
      where: { id: submissionId }
    })

    if (!submission) {
      return NextResponse.json({ 
        success: false, 
        message: 'Submission not found' 
      }, { status: 404 })
    }

    // Create the event
    const event = await prisma.event.create({
      data: {
        title: submission.title,
        description: `APOSS Seminar: ${submission.title}`,
        scheduledAt: new Date(scheduledAt),
        presenter: submission.authorName,
        presenterEmail: submission.authorEmail,
        status: 'SCHEDULED',
        submissionId: submission.id
      }
    })

    // Update the submission status
    const updatedSubmission = await prisma.submission.update({
      where: { id: submissionId },
      data: {
        status: 'SCHEDULED',
        scheduledAt: new Date(scheduledAt),
        eventId: event.id
      }
    })

    // Notify presenter
    const scheduleEmail = generateStatusUpdateEmail({
      authorName: updatedSubmission.authorName,
      title: updatedSubmission.title,
      status: 'SCHEDULED',
      scheduledAt: event.scheduledAt,
      zoomJoinUrl: event.zoomJoinUrl || undefined
    })

    await sendEmail({
      to: updatedSubmission.authorEmail,
      subject: 'Your APOSS presentation is scheduled',
      html: scheduleEmail
    })

    return NextResponse.json({ 
      success: true, 
      eventId: event.id,
      message: 'Event scheduled successfully'
    }, { status: 201 })

  } catch (error) {
    console.error('Error creating event:', error)
    return NextResponse.json({ 
      success: false, 
      message: 'Failed to schedule event' 
    }, { status: 500 })
  }
}

export async function GET() {
  try {
    const events = await prisma.event.findMany({
      orderBy: { scheduledAt: 'asc' },
      select: {
        id: true,
        title: true,
        scheduledAt: true,
        presenter: true,
        presenterEmail: true,
        status: true,
        zoomMeetingId: true,
        zoomJoinUrl: true,
        submission: {
          select: {
            id: true,
            authorName: true,
            authorEmail: true
          }
        }
      }
    })

    return NextResponse.json({ success: true, events })
  } catch (error) {
    console.error('Error fetching events:', error)
    return NextResponse.json({ 
      success: false, 
      message: 'Failed to fetch events' 
    }, { status: 500 })
  }
}
