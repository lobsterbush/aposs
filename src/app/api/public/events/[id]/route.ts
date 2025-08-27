/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(
  request: Request,
  context: any
) {
  // Next.js runtime will pass { params }
  const { id } = context.params
  try {
    const event = await prisma.event.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        description: true,
        scheduledAt: true,
        presenter: true,
        status: true,
        zoomJoinUrl: true,
      },
    })
    if (!event) {
      return NextResponse.json({ success: false, message: 'Event not found' }, { status: 404 })
    }
    return NextResponse.json({ success: true, event })
  } catch (error) {
    console.error('Error fetching public event:', error)
    return NextResponse.json({ success: false, message: 'Failed to fetch event' }, { status: 500 })
  }
}
