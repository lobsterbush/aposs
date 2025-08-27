import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    const events = await prisma.event.findMany({
      where: { status: { in: ['SCHEDULED', 'COMPLETED'] } },
      orderBy: { scheduledAt: 'asc' },
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
    return NextResponse.json({ success: true, events })
  } catch (error) {
    console.error('Error fetching public events:', error)
    return NextResponse.json({ success: false, message: 'Failed to fetch events' }, { status: 500 })
  }
}
