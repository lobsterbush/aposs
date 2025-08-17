import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    const submission = await prisma.submission.create({
      data: {
        title: data.title,
        abstract: data.abstract,
        authorName: data.authorName,
        authorEmail: data.authorEmail,
        authorAffiliation: data.authorAffiliation,
        authorBio: data.authorBio || null,
        coAuthors: data.coAuthors || null,
        researchField: data.researchField,
        methodology: data.methodology || null,
        keywords: data.keywords,
        status: 'PENDING'
      }
    })

    return NextResponse.json({ 
      success: true, 
      submissionId: submission.id,
      message: 'Submission received successfully'
    }, { status: 201 })

  } catch (error) {
    console.error('Error creating submission:', error)
    return NextResponse.json({ 
      success: false, 
      message: 'Failed to submit proposal' 
    }, { status: 500 })
  }
}

export async function GET() {
  try {
    const submissions = await prisma.submission.findMany({
      orderBy: { submittedAt: 'desc' },
      select: {
        id: true,
        title: true,
        authorName: true,
        authorEmail: true,
        authorAffiliation: true,
        status: true,
        submittedAt: true,
        reviewedAt: true,
        scheduledAt: true
      }
    })

    return NextResponse.json({ success: true, submissions })
  } catch (error) {
    console.error('Error fetching submissions:', error)
    return NextResponse.json({ 
      success: false, 
      message: 'Failed to fetch submissions' 
    }, { status: 500 })
  }
}
