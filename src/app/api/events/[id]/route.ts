import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params
  try {
    const data = await request.json()
    const { zoomJoinUrl, scheduledAt, status } = data as {
      zoomJoinUrl?: string
      scheduledAt?: string
      status?: 'SCHEDULED' | 'ONGOING' | 'COMPLETED' | 'CANCELLED'
    }

    const updateData: any = {}
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

    return NextResponse.json({ success: true, event })
  } catch (error) {
    console.error('Error updating event:', error)
    return NextResponse.json({ success: false, message: 'Failed to update event' }, { status: 500 })
  }
}
