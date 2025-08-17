import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json()
    const { status } = data

    const submission = await prisma.submission.update({
      where: { id: params.id },
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
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const submission = await prisma.submission.findUnique({
      where: { id: params.id },
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
