/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function PATCH(
  request: Request,
  context: any
) {
  const { id } = context.params
  try {
    const data = await request.json()
    const { status } = data as { status: 'PENDING' | 'UNDER_REVIEW' | 'ACCEPTED' | 'SCHEDULED' | 'PRESENTED' | 'REJECTED' }

    const submission = await prisma.submission.update({
      where: { id },
      data: {
        status,
        reviewedAt: ['ACCEPTED', 'REJECTED'].includes(status) ? new Date() : undefined
      }
    })

    return NextResponse.json({ 
      success: true, 
      submission,
      message: 'Submission updated successfully'
    })

  } catch (error) {
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
